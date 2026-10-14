import { prisma } from '../lib/prisma.js';
import { NotFoundError, ForbiddenError } from '../lib/errors.js';
import {
  JobPostingInput,
  ShortlistInput,
  RecruiterNoteInput,
  CandidateSearchQuery,
} from '@proofly/shared';

export class RecruiterService {
  // Candidate Search & Discovery
  static async searchCandidates(query: CandidateSearchQuery) {
    const { query: searchStr, skills, graduationYear, minProjects, isVerifiedOnly, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where: any = {
      visibility: { in: ['PUBLIC', 'RECRUITER_ONLY'] },
    };

    if (graduationYear) {
      where.targetGraduationYear = graduationYear;
    }

    if (searchStr) {
      where.OR = [
        { headline: { contains: searchStr } },
        { bio: { contains: searchStr } },
        { username: { contains: searchStr } },
        { user: { name: { contains: searchStr } } },
      ];
    }

    if (minProjects && minProjects > 0) {
      where.projects = { some: {} };
    }

    const [total, candidates] = await Promise.all([
      prisma.studentProfile.count({ where }),
      prisma.studentProfile.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: { select: { name: true, email: true } },
          skills: true,
          projects: {
            where: isVerifiedOnly ? { verificationStatus: { not: 'UNVERIFIED' } } : {},
            take: 3,
            orderBy: { createdAt: 'desc' },
          },
          certificates: {
            where: isVerifiedOnly ? { verificationStatus: 'ISSUER_VERIFIED' } : {},
            take: 3,
          },
          codingProfiles: true,
          gitHubRepos: { where: { isSelectedForProfile: true }, take: 3, orderBy: { starsCount: 'desc' } },
        },
        orderBy: [{ completenessScore: 'desc' }, { updatedAt: 'desc' }],
      }),
    ]);

    // In-memory skill filtering if skills query provided
    let results = candidates;
    if (skills) {
      const requiredSkills = skills
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);

      if (requiredSkills.length > 0) {
        results = results.filter((candidate) => {
          const candidateSkills = candidate.skills.map((s) => s.name.toLowerCase());
          return requiredSkills.some((req) => candidateSkills.includes(req));
        });
      }
    }

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      candidates: results.map((c) => ({
        ...c,
        preferredRoles: c.preferredRoles ? JSON.parse(c.preferredRoles) : [],
        projects: c.projects.map((p) => ({
          ...p,
          skills: p.skills ? JSON.parse(p.skills) : [],
        })),
      })),
    };
  }

  // Deep Candidate Inspection
  static async getCandidateProfile(candidateId: string, organizationId: string) {
    const candidate = await prisma.studentProfile.findUnique({
      where: { id: candidateId },
      include: {
        user: { select: { id: true, name: true, email: true, createdAt: true } },
        educations: { orderBy: { startDate: 'desc' } },
        experiences: { orderBy: { startDate: 'desc' } },
        skills: { orderBy: { proficiencyLevel: 'asc' } },
        projects: { orderBy: { createdAt: 'desc' } },
        certificates: { orderBy: { issueDate: 'desc' } },
        codingProfiles: true,
        gitHubRepos: { where: { isSelectedForProfile: true }, orderBy: { starsCount: 'desc' } },
        posts: { where: { status: 'PUBLISHED' }, orderBy: { publishedAt: 'desc' } },
        recruiterNotes: {
          where: { organizationId },
          include: { recruiter: { select: { fullName: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!candidate) throw new NotFoundError('Candidate profile not found');
    if (candidate.visibility === 'PRIVATE') {
      throw new ForbiddenError('Candidate profile is marked private');
    }

    let parsedGithubStats = null;
    if (candidate.githubStats) {
      try {
        parsedGithubStats = JSON.parse(candidate.githubStats);
      } catch (e) {}
    }

    return {
      ...candidate,
      githubStats: parsedGithubStats,
      preferredRoles: candidate.preferredRoles ? JSON.parse(candidate.preferredRoles) : [],
      projects: candidate.projects.map((p) => ({
        ...p,
        skills: p.skills ? JSON.parse(p.skills) : [],
        evidenceMetadata: p.evidenceMetadata ? JSON.parse(p.evidenceMetadata) : null,
      })),
      codingProfiles: candidate.codingProfiles.map((cp) => ({
        ...cp,
        badges: cp.badges ? JSON.parse(cp.badges) : [],
        detailedStats: cp.detailedStats ? JSON.parse(cp.detailedStats) : null,
      })),
      gitHubRepos: candidate.gitHubRepos.map((gh) => ({
        ...gh,
        languages: gh.languages ? JSON.parse(gh.languages) : {},
      })),
      recruiterNotes: candidate.recruiterNotes.map((n) => ({
        ...n,
        tags: n.tags ? JSON.parse(n.tags) : [],
      })),
    };
  }

  // Candidate Comparison
  static async compareCandidates(candidateIds: string[], organizationId: string) {
    if (!candidateIds || candidateIds.length === 0) return [];

    const candidates = await Promise.all(
      candidateIds.slice(0, 4).map((id) => this.getCandidateProfile(id, organizationId))
    );

    return candidates;
  }

  // Job Postings CRUD
  static async listJobs(organizationId: string) {
    const jobs = await prisma.jobPosting.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });

    return jobs.map((j) => ({
      ...j,
      requiredSkills: JSON.parse(j.requiredSkills),
      preferredSkills: JSON.parse(j.preferredSkills),
    }));
  }

  static async createJob(organizationId: string, input: JobPostingInput) {
    const job = await prisma.jobPosting.create({
      data: {
        organizationId,
        title: input.title,
        description: input.description,
        location: input.location,
        employmentType: input.employmentType,
        status: input.status,
        requiredSkills: JSON.stringify(input.requiredSkills),
        preferredSkills: JSON.stringify(input.preferredSkills || []),
        minGraduationYear: input.minGraduationYear || null,
      },
    });

    return {
      ...job,
      requiredSkills: JSON.parse(job.requiredSkills),
      preferredSkills: JSON.parse(job.preferredSkills),
    };
  }

  static async deleteJob(organizationId: string, jobId: string) {
    const job = await prisma.jobPosting.findFirst({
      where: { id: jobId, organizationId },
    });
    if (!job) throw new NotFoundError('Job posting not found');

    await prisma.jobPosting.delete({ where: { id: job.id } });
  }

  // Shortlists CRUD
  static async listShortlists(organizationId: string) {
    const shortlists = await prisma.shortlist.findMany({
      where: { organizationId },
      include: {
        candidates: {
          include: {
            studentProfile: {
              include: { user: { select: { name: true, email: true } } },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return shortlists.map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      createdAt: s.createdAt,
      candidatesCount: s.candidates.length,
      candidates: s.candidates.map((c) => ({
        id: c.id,
        candidateId: c.studentProfileId,
        name: c.studentProfile.user.name,
        username: c.studentProfile.username,
        headline: c.studentProfile.headline,
        status: c.status,
        addedAt: c.addedAt,
      })),
    }));
  }

  static async createShortlist(organizationId: string, input: ShortlistInput) {
    return prisma.shortlist.create({
      data: {
        organizationId,
        title: input.title,
        description: input.description || null,
      },
    });
  }

  static async addCandidateToShortlist(
    organizationId: string,
    shortlistId: string,
    studentProfileId: string
  ) {
    const shortlist = await prisma.shortlist.findFirst({
      where: { id: shortlistId, organizationId },
    });
    if (!shortlist) throw new NotFoundError('Shortlist not found');

    return prisma.shortlistCandidate.upsert({
      where: {
        shortlistId_studentProfileId: {
          shortlistId,
          studentProfileId,
        },
      },
      create: {
        shortlistId,
        studentProfileId,
        status: 'REVIEWING',
      },
      update: {},
    });
  }

  static async removeCandidateFromShortlist(
    organizationId: string,
    shortlistId: string,
    studentProfileId: string
  ) {
    const shortlist = await prisma.shortlist.findFirst({
      where: { id: shortlistId, organizationId },
    });
    if (!shortlist) throw new NotFoundError('Shortlist not found');

    await prisma.shortlistCandidate.deleteMany({
      where: { shortlistId, studentProfileId },
    });
  }

  // Recruiter Private Notes
  static async addNote(
    organizationId: string,
    recruiterProfileId: string,
    input: RecruiterNoteInput
  ) {
    const note = await prisma.recruiterNote.create({
      data: {
        organizationId,
        recruiterId: recruiterProfileId,
        studentProfileId: input.studentProfileId,
        content: input.content,
        tags: JSON.stringify(input.tags || []),
      },
      include: {
        recruiter: { select: { fullName: true } },
      },
    });

    return {
      ...note,
      tags: JSON.parse(note.tags),
      recruiterName: note.recruiter.fullName,
    };
  }
}
