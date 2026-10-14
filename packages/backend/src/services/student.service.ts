import { prisma } from '../lib/prisma.js';
import { NotFoundError, ForbiddenError } from '../lib/errors.js';
import {
  UpdateProfileInput,
  EducationInput,
  ExperienceInput,
  SkillInput,
  ProjectInput,
  CertificateInput,
} from '@proofly/shared';

export class StudentService {
  static async getProfileByUserId(userId: string) {
    const profile = await prisma.studentProfile.findUnique({
      where: { userId },
      include: {
        educations: { orderBy: { startDate: 'desc' } },
        experiences: { orderBy: { startDate: 'desc' } },
        skills: { orderBy: { proficiencyLevel: 'asc' } },
        projects: { orderBy: { createdAt: 'desc' } },
        certificates: { orderBy: { issueDate: 'desc' } },
        codingProfiles: true,
        gitHubRepos: { where: { isSelectedForProfile: true }, orderBy: { starsCount: 'desc' } },
        user: { select: { id: true, email: true, name: true, createdAt: true } },
      },
    });

    if (!profile) {
      throw new NotFoundError('Student profile not found');
    }

    return this.formatProfile(profile);
  }

  static async updateProfile(userId: string, input: UpdateProfileInput) {
    const profile = await prisma.studentProfile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundError('Student profile not found');

    const updated = await prisma.studentProfile.update({
      where: { id: profile.id },
      data: {
        headline: input.headline !== undefined ? input.headline : profile.headline,
        bio: input.bio !== undefined ? input.bio : profile.bio,
        location: input.location !== undefined ? input.location : profile.location,
        visibility: input.visibility || profile.visibility,
        isOpenToWork: input.isOpenToWork !== undefined ? input.isOpenToWork : profile.isOpenToWork,
        preferredRoles: input.preferredRoles ? JSON.stringify(input.preferredRoles) : profile.preferredRoles,
        targetGraduationYear: input.targetGraduationYear !== undefined ? input.targetGraduationYear : profile.targetGraduationYear,
        linkedinUrl: (input as any).linkedinUrl !== undefined ? (input as any).linkedinUrl : profile.linkedinUrl,
      },
    });

    await this.updateCompletenessScore(profile.id);
    return this.getProfileByUserId(userId);
  }

  // Education CRUD
  static async addEducation(userId: string, input: EducationInput) {
    const profile = await this.requireProfile(userId);
    const item = await prisma.education.create({
      data: {
        studentProfileId: profile.id,
        institution: input.institution,
        degree: input.degree,
        fieldOfStudy: input.fieldOfStudy,
        startDate: new Date(input.startDate),
        endDate: input.endDate ? new Date(input.endDate) : null,
        isCurrent: input.isCurrent,
        grade: input.grade || null,
        activities: input.activities || null,
      },
    });
    await this.updateCompletenessScore(profile.id);
    return item;
  }

  static async deleteEducation(userId: string, id: string) {
    const profile = await this.requireProfile(userId);
    const item = await prisma.education.findFirst({
      where: { id, studentProfileId: profile.id },
    });
    if (!item) throw new NotFoundError('Education record not found');
    await prisma.education.delete({ where: { id } });
    await this.updateCompletenessScore(profile.id);
  }

  // Experience CRUD
  static async addExperience(userId: string, input: ExperienceInput) {
    const profile = await this.requireProfile(userId);
    const item = await prisma.experience.create({
      data: {
        studentProfileId: profile.id,
        company: input.company,
        title: input.title,
        location: input.location || null,
        startDate: new Date(input.startDate),
        endDate: input.endDate ? new Date(input.endDate) : null,
        isCurrent: input.isCurrent,
        description: input.description,
      },
    });
    await this.updateCompletenessScore(profile.id);
    return item;
  }

  static async deleteExperience(userId: string, id: string) {
    const profile = await this.requireProfile(userId);
    const item = await prisma.experience.findFirst({
      where: { id, studentProfileId: profile.id },
    });
    if (!item) throw new NotFoundError('Experience record not found');
    await prisma.experience.delete({ where: { id } });
    await this.updateCompletenessScore(profile.id);
  }

  // Skill CRUD
  static async addSkill(userId: string, input: SkillInput) {
    const profile = await this.requireProfile(userId);
    const item = await prisma.skill.create({
      data: {
        studentProfileId: profile.id,
        name: input.name,
        category: input.category,
        proficiencyLevel: input.proficiencyLevel,
        yearsOfExperience: input.yearsOfExperience || null,
      },
    });
    await this.updateCompletenessScore(profile.id);
    return item;
  }

  static async deleteSkill(userId: string, id: string) {
    const profile = await this.requireProfile(userId);
    const item = await prisma.skill.findFirst({
      where: { id, studentProfileId: profile.id },
    });
    if (!item) throw new NotFoundError('Skill not found');
    await prisma.skill.delete({ where: { id } });
    await this.updateCompletenessScore(profile.id);
  }

  // Project CRUD
  static async addProject(userId: string, input: ProjectInput) {
    const profile = await this.requireProfile(userId);
    
    // Automatically verify code if a valid repository link is provided
    const isRepoValid = input.repositoryUrl && input.repositoryUrl.includes('github.com');
    const isDemoValid = input.demoUrl && input.demoUrl.startsWith('http');
    let verificationStatus = 'UNVERIFIED';
    if (isRepoValid && isDemoValid) {
      verificationStatus = 'DEMO_VERIFIED';
    } else if (isRepoValid) {
      verificationStatus = 'CODE_VERIFIED';
    }

    const item = await prisma.project.create({
      data: {
        studentProfileId: profile.id,
        title: input.title,
        tagline: input.tagline,
        description: input.description,
        demoUrl: input.demoUrl || null,
        repositoryUrl: input.repositoryUrl || null,
        skills: JSON.stringify(input.skills || []),
        isFeatured: input.isFeatured || false,
        verificationStatus,
        evidenceMetadata: JSON.stringify({
          hasRepo: !!isRepoValid,
          hasDemo: !!isDemoValid,
          createdAt: new Date().toISOString(),
        }),
      },
    });
    await this.updateCompletenessScore(profile.id);
    return this.formatProject(item);
  }

  static async deleteProject(userId: string, id: string) {
    const profile = await this.requireProfile(userId);
    const item = await prisma.project.findFirst({
      where: { id, studentProfileId: profile.id },
    });
    if (!item) throw new NotFoundError('Project not found');
    await prisma.project.delete({ where: { id } });
    await this.updateCompletenessScore(profile.id);
  }

  // Certificate CRUD
  static async addCertificate(userId: string, input: CertificateInput) {
    const profile = await this.requireProfile(userId);
    const item = await prisma.certificate.create({
      data: {
        studentProfileId: profile.id,
        title: input.title,
        issuer: input.issuer,
        credentialId: input.credentialId || null,
        credentialUrl: input.credentialUrl || null,
        issueDate: new Date(input.issueDate),
        expiryDate: input.expiryDate ? new Date(input.expiryDate) : null,
        doesNotExpire: input.doesNotExpire || false,
        verificationStatus: 'UNVERIFIED',
        verificationType: 'URL_CHECK',
      },
    });
    await this.updateCompletenessScore(profile.id);
    return item;
  }

  static async deleteCertificate(userId: string, id: string) {
    const profile = await this.requireProfile(userId);
    const item = await prisma.certificate.findFirst({
      where: { id, studentProfileId: profile.id },
    });
    if (!item) throw new NotFoundError('Certificate not found');
    await prisma.certificate.delete({ where: { id } });
    await this.updateCompletenessScore(profile.id);
  }

  // Public Profile lookup
  static async getPublicProfileByUsername(username: string, viewerRole?: string, shareToken?: string) {
    const profile = await prisma.studentProfile.findUnique({
      where: { username },
      include: {
        educations: { orderBy: { startDate: 'desc' } },
        experiences: { orderBy: { startDate: 'desc' } },
        skills: true,
        projects: { orderBy: { createdAt: 'desc' } },
        certificates: { orderBy: { issueDate: 'desc' } },
        codingProfiles: true,
        gitHubRepos: { where: { isSelectedForProfile: true }, orderBy: { starsCount: 'desc' } },
        posts: { where: { status: 'PUBLISHED' }, orderBy: { publishedAt: 'desc' } },
        user: { select: { name: true, createdAt: true } },
      },
    });

    if (!profile) {
      throw new NotFoundError('Candidate profile not found');
    }

    const hasValidShareToken = shareToken && profile.shareToken && profile.shareToken === shareToken;

    if (profile.visibility === 'PRIVATE' && viewerRole !== 'ADMIN' && !hasValidShareToken) {
      throw new ForbiddenError('This profile is set to private');
    }

    if (
      profile.visibility === 'RECRUITER_ONLY' &&
      viewerRole !== 'RECRUITER' &&
      viewerRole !== 'ADMIN' &&
      !hasValidShareToken
    ) {
      throw new ForbiddenError('This profile is only visible to verified recruiters');
    }

    return this.formatProfile(profile);
  }

  // Generate / Retrieve Shareable Link with Fast-Pass Token for recruiters
  static async getOrCreateShareToken(userId: string) {
    const profile = await this.requireProfile(userId);
    let token = profile.shareToken;

    if (!token) {
      token = (await import('crypto')).randomBytes(16).toString('hex');
      await prisma.studentProfile.update({
        where: { id: profile.id },
        data: { shareToken: token },
      });
    }

    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    return {
      username: profile.username,
      shareToken: token,
      visibility: profile.visibility,
      shareUrl: `${baseUrl}/u/${profile.username}`,
      recruiterFastPassUrl: `${baseUrl}/u/${profile.username}?pass=${token}`,
    };
  }

  // Profile Completeness Heuristic (0 - 100%)
  static async updateCompletenessScore(profileId: string): Promise<number> {
    const profile = await prisma.studentProfile.findUnique({
      where: { id: profileId },
      include: {
        educations: true,
        experiences: true,
        skills: true,
        projects: true,
        certificates: true,
        gitHubRepos: true,
        codingProfiles: true,
      },
    });

    if (!profile) return 0;

    let score = 0;
    if (profile.headline && profile.headline.length > 5) score += 10;
    if (profile.bio && profile.bio.length > 20) score += 10;
    if (profile.educations.length > 0) score += 15;
    if (profile.skills.length >= 3) score += 15;
    if (profile.projects.length >= 1) score += 20;
    if (profile.projects.some((p) => p.verificationStatus !== 'UNVERIFIED')) score += 10;
    if (profile.certificates.length > 0) score += 10;
    if (profile.gitHubRepos.length > 0 || profile.codingProfiles.length > 0) score += 10;
    if (profile.linkedinVerified) score += 5;

    const finalScore = Math.min(100, score);
    await prisma.studentProfile.update({
      where: { id: profileId },
      data: { completenessScore: finalScore },
    });

    return finalScore;
  }

  private static async requireProfile(userId: string) {
    const profile = await prisma.studentProfile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundError('Student profile not found');
    return profile;
  }

  private static formatProfile(profile: any) {
    return {
      ...profile,
      preferredRoles: profile.preferredRoles ? JSON.parse(profile.preferredRoles) : [],
      githubStats: profile.githubStats ? JSON.parse(profile.githubStats) : null,
      projects: profile.projects?.map(this.formatProject) || [],
      codingProfiles:
        profile.codingProfiles?.map((cp: any) => ({
          ...cp,
          badges: cp.badges ? JSON.parse(cp.badges) : [],
          detailedStats: cp.detailedStats ? JSON.parse(cp.detailedStats) : null,
        })) || [],
      gitHubRepos:
        profile.gitHubRepos?.map((gh: any) => ({
          ...gh,
          languages: gh.languages ? JSON.parse(gh.languages) : {},
        })) || [],
    };
  }

  private static formatProject(p: any) {
    return {
      ...p,
      skills: p.skills ? JSON.parse(p.skills) : [],
      evidenceMetadata: p.evidenceMetadata ? JSON.parse(p.evidenceMetadata) : null,
    };
  }
}
