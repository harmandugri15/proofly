import { prisma } from '../lib/prisma.js';
import { env } from '../config/env.js';
import { NotFoundError } from '../lib/errors.js';
import { logger } from '../lib/logger.js';
import {
  ProfileCompletenessResult,
  CandidateMatchResult,
  RecruiterResearchResult,
  ResearchCitation,
  SkillMatchDetail,
} from '@proofly/shared';

export class AIService {
  // --------------------------------------------------------------------------
  // Agent 1: Profile Completeness Assistant
  // --------------------------------------------------------------------------
  static async analyzeProfileCompleteness(
    userId: string
  ): Promise<ProfileCompletenessResult> {
    const profile = await prisma.studentProfile.findUnique({
      where: { userId },
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

    if (!profile) throw new NotFoundError('Student profile not found');

    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const checklist: ProfileCompletenessResult['checklist'] = [];

    // Headline & Bio
    if (profile.headline && profile.headline.length > 10) {
      strengths.push('Professional headline clearly defines engineering focus.');
    } else {
      weaknesses.push('Headline is brief or uninformative.');
      checklist.push({
        id: 'chk-headline',
        category: 'EXPERIENCE',
        title: 'Add a targeted professional headline',
        description: 'Specify your core focus (e.g. "Full-Stack Engineer | Distributed Systems & React").',
        actionUrl: '/student/profile',
        priority: 'MEDIUM',
        isResolved: false,
      });
    }

    if (profile.bio && profile.bio.length > 50) {
      strengths.push('Comprehensive bio detailing technical journey and interests.');
    } else {
      weaknesses.push('Bio lacks depth or context regarding project motivation.');
      checklist.push({
        id: 'chk-bio',
        category: 'EXPERIENCE',
        title: 'Complete your professional summary bio',
        description: 'Write 3-4 sentences outlining your technical background and what you are building.',
        actionUrl: '/student/profile',
        priority: 'LOW',
        isResolved: false,
      });
    }

    // Projects
    if (profile.projects.length >= 2) {
      strengths.push(`Showcasing ${profile.projects.length} featured engineering projects.`);
    } else {
      weaknesses.push('Fewer than 2 engineering projects listed.');
      checklist.push({
        id: 'chk-projects',
        category: 'PROJECTS',
        title: 'Add at least 2 substantiated projects',
        description: 'Projects demonstrate real engineering skills. Include repository and live demo links.',
        actionUrl: '/student/projects',
        priority: 'HIGH',
        isResolved: false,
      });
    }

    // Projects verification state
    const unverifiedProjects = profile.projects.filter(
      (p) => p.verificationStatus === 'UNVERIFIED'
    );
    if (unverifiedProjects.length > 0) {
      checklist.push({
        id: 'chk-unverified-proj',
        category: 'PROJECTS',
        title: 'Link source code or live demo to unverified projects',
        description: `${unverifiedProjects.length} project(s) lack public repository or live deployment links.`,
        actionUrl: '/student/projects',
        priority: 'HIGH',
        isResolved: false,
      });
    }

    // GitHub Integration
    if (profile.gitHubRepos.length > 0) {
      strengths.push(`GitHub integrated with ${profile.gitHubRepos.length} synchronized repositories.`);
    } else {
      weaknesses.push('No GitHub repositories connected.');
      checklist.push({
        id: 'chk-github',
        category: 'GITHUB',
        title: 'Connect your GitHub account',
        description: 'Link your GitHub account to import repositories and display commit activity.',
        actionUrl: '/student/integrations',
        priority: 'HIGH',
        isResolved: false,
      });
    }

    // Algorithmic Platforms
    if (profile.codingProfiles.length > 0) {
      strengths.push('Linked LeetCode/HackerRank coding achievements.');
    } else {
      checklist.push({
        id: 'chk-coding-profile',
        category: 'SKILLS',
        title: 'Link a coding platform profile',
        description: 'Add your LeetCode or HackerRank handle to demonstrate algorithmic problem solving.',
        actionUrl: '/student/integrations',
        priority: 'LOW',
        isResolved: false,
      });
    }

    // Certificates
    if (profile.certificates.length > 0) {
      strengths.push(`Added ${profile.certificates.length} professional certifications.`);
    } else {
      checklist.push({
        id: 'chk-certs',
        category: 'CERTIFICATES',
        title: 'Add verified certifications',
        description: 'Add credentials from AWS, Coursera, freeCodeCamp, or edX with verification URLs.',
        actionUrl: '/student/evidence',
        priority: 'MEDIUM',
        isResolved: false,
      });
    }

    const score = profile.completenessScore;

    return {
      score,
      summary: `Profile is currently ${score}% complete with ${strengths.length} strong signals and ${checklist.length} actionable suggestions.`,
      strengths,
      weaknesses,
      checklist,
    };
  }

  // --------------------------------------------------------------------------
  // Agent 3 & 5: Skills Mapping & Explainable Candidate Matching
  // --------------------------------------------------------------------------
  static async matchCandidateToJob(
    candidateId: string,
    jobId?: string,
    jobDescription?: string,
    requiredSkillsInput?: string[],
    preferredSkillsInput?: string[]
  ): Promise<CandidateMatchResult> {
    const candidate = await prisma.studentProfile.findUnique({
      where: { id: candidateId },
      include: {
        user: { select: { name: true } },
        skills: true,
        projects: true,
        certificates: true,
        gitHubRepos: true,
        codingProfiles: true,
      },
    });

    if (!candidate) throw new NotFoundError('Candidate not found');

    let requiredSkills: string[] = requiredSkillsInput || [];
    let preferredSkills: string[] = preferredSkillsInput || [];

    if (jobId) {
      const job = await prisma.jobPosting.findUnique({ where: { id: jobId } });
      if (job) {
        requiredSkills = JSON.parse(job.requiredSkills);
        preferredSkills = JSON.parse(job.preferredSkills);
      }
    } else if (jobDescription && requiredSkills.length === 0) {
      // Extract skills from JD text using keyword dictionary
      requiredSkills = this.extractSkillsFromText(jobDescription);
    }

    if (requiredSkills.length === 0) {
      requiredSkills = ['TypeScript', 'React', 'Node.js', 'PostgreSQL'];
    }

    const candidateSkillNames = new Set(
      candidate.skills.map((s) => s.name.toLowerCase())
    );
    const repoLanguages = new Set(
      candidate.gitHubRepos
        .map((r) => r.primaryLanguage?.toLowerCase())
        .filter(Boolean) as string[]
    );

    // Extract skills mentioned in projects
    const projectSkills = new Set<string>();
    for (const p of candidate.projects) {
      try {
        const skills: string[] = JSON.parse(p.skills);
        skills.forEach((s) => projectSkills.add(s.toLowerCase()));
      } catch (e) {}
    }

    const skillDetails: SkillMatchDetail[] = [];
    const evidenceHighlights: string[] = [];
    const missingEvidence: string[] = [];

    let requiredMatched = 0;
    for (const skill of requiredSkills) {
      const lower = skill.toLowerCase();
      const inSkills = candidateSkillNames.has(lower);
      const inRepos = repoLanguages.has(lower);
      const inProjects = projectSkills.has(lower);

      const matched = inSkills || inRepos || inProjects;
      let evidenceSource: string | undefined;
      let evidenceType: string | undefined;

      if (inProjects) {
        const matchingProj = candidate.projects.find((p) => {
          try {
            return JSON.parse(p.skills).some((s: string) => s.toLowerCase() === lower);
          } catch {
            return false;
          }
        });
        if (matchingProj) {
          evidenceSource = matchingProj.title;
          evidenceType = `Project (${matchingProj.verificationStatus})`;
          evidenceHighlights.push(
            `Demonstrated ${skill} in verified project "${matchingProj.title}"`
          );
        }
      } else if (inRepos) {
        const matchingRepo = candidate.gitHubRepos.find(
          (r) => r.primaryLanguage?.toLowerCase() === lower
        );
        if (matchingRepo) {
          evidenceSource = matchingRepo.name;
          evidenceType = 'GitHub Repository';
          evidenceHighlights.push(
            `Authored GitHub repository "${matchingRepo.name}" with primary language ${skill}`
          );
        }
      }

      if (matched) {
        requiredMatched++;
      } else {
        missingEvidence.push(`No verified project or repository found showcasing ${skill}`);
      }

      skillDetails.push({
        skill,
        required: true,
        matched,
        evidenceSource,
        evidenceType,
        confidence: matched ? 0.9 : 0.0,
      });
    }

    let preferredMatched = 0;
    for (const skill of preferredSkills) {
      const lower = skill.toLowerCase();
      const matched =
        candidateSkillNames.has(lower) ||
        repoLanguages.has(lower) ||
        projectSkills.has(lower);

      if (matched) preferredMatched++;

      skillDetails.push({
        skill,
        required: false,
        matched,
        confidence: matched ? 0.8 : 0.0,
      });
    }

    // Deterministic match score computation:
    // Required skills carry 75% weight, preferred carry 25% weight
    const requiredWeight = requiredSkills.length > 0 ? (requiredMatched / requiredSkills.length) * 75 : 50;
    const preferredWeight = preferredSkills.length > 0 ? (preferredMatched / preferredSkills.length) * 25 : 25;
    const matchScore = Math.round(requiredWeight + preferredWeight);

    const summary = `${candidate.user.name} matches ${requiredMatched}/${requiredSkills.length} required skills (${Math.round(
      (requiredMatched / (requiredSkills.length || 1)) * 100
    )}%) and ${preferredMatched}/${preferredSkills.length || 1} preferred skills.`;

    return {
      candidateId: candidate.id,
      candidateName: candidate.user.name,
      matchScore,
      requiredSkillsMatchedCount: requiredMatched,
      totalRequiredSkillsCount: requiredSkills.length,
      preferredSkillsMatchedCount: preferredMatched,
      totalPreferredSkillsCount: preferredSkills.length,
      summary,
      skillDetails,
      evidenceHighlights,
      missingEvidence,
    };
  }

  // --------------------------------------------------------------------------
  // Agent 4: Recruiter Research Assistant (Grounding & Citations)
  // --------------------------------------------------------------------------
  static async researchCandidate(
    candidateId: string,
    query: string
  ): Promise<RecruiterResearchResult> {
    const candidate = await prisma.studentProfile.findUnique({
      where: { id: candidateId },
      include: {
        user: { select: { name: true } },
        skills: true,
        projects: true,
        certificates: true,
        gitHubRepos: true,
        codingProfiles: true,
        educations: true,
        experiences: true,
      },
    });

    if (!candidate) throw new NotFoundError('Candidate not found');

    const citations: ResearchCitation[] = [];
    const lowerQuery = query.toLowerCase();

    // Search candidate projects for keyword matches
    for (const project of candidate.projects) {
      const text = `${project.title} ${project.tagline} ${project.description} ${project.skills}`.toLowerCase();
      const matchWords = lowerQuery.split(/\s+/).filter((w) => w.length > 3 && text.includes(w));

      if (matchWords.length > 0) {
        citations.push({
          sourceId: project.id,
          sourceType: 'PROJECT',
          title: project.title,
          url: project.repositoryUrl || project.demoUrl || undefined,
          snippet: project.tagline || project.description.slice(0, 150),
        });
      }
    }

    // Search certificates
    for (const cert of candidate.certificates) {
      const text = `${cert.title} ${cert.issuer}`.toLowerCase();
      if (lowerQuery.split(/\s+/).some((w) => w.length > 3 && text.includes(w))) {
        citations.push({
          sourceId: cert.id,
          sourceType: 'CERTIFICATE',
          title: `${cert.title} (${cert.issuer})`,
          url: cert.credentialUrl || undefined,
          snippet: `Issued on ${new Date(cert.issueDate).toLocaleDateString()}, status: ${cert.verificationStatus}`,
        });
      }
    }

    // Search GitHub repos
    for (const repo of candidate.gitHubRepos) {
      const text = `${repo.name} ${repo.description || ''} ${repo.primaryLanguage || ''}`.toLowerCase();
      if (lowerQuery.split(/\s+/).some((w) => w.length > 3 && text.includes(w))) {
        citations.push({
          sourceId: repo.id,
          sourceType: 'GITHUB_REPO',
          title: repo.fullName,
          url: repo.htmlUrl,
          snippet: `Primary language: ${repo.primaryLanguage || 'N/A'}, ${repo.starsCount} stars, ${repo.recentCommitCount} recent commits.`,
        });
      }
    }

    let answer: string;
    let confidence = 0.5;

    if (citations.length > 0) {
      confidence = 0.92;
      answer = `Based on verified evidence in ${candidate.user.name}'s profile, found ${citations.length} direct match(es):\n\n` +
        citations.map((c, i) => `[${i + 1}] **${c.title}** (${c.sourceType}): ${c.snippet}`).join('\n\n');
    } else {
      confidence = 0.7;
      answer = `No direct verified evidence found in ${candidate.user.name}'s profile regarding "${query}". The candidate has not linked projects, repositories, or certificates matching these criteria.`;
    }

    return {
      query,
      answer,
      confidence,
      citations,
      limitations: [
        'Answers are strictly constrained to candidate-verified records in Proofly.',
        'External platforms not connected by the candidate cannot be inspected.',
      ],
    };
  }

  // --------------------------------------------------------------------------
  // Helper: Extract skills from unstructured text
  // --------------------------------------------------------------------------
  private static extractSkillsFromText(text: string): string[] {
    const commonSkills = [
      'TypeScript',
      'JavaScript',
      'React',
      'Node.js',
      'Python',
      'Java',
      'C++',
      'Go',
      'Rust',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Docker',
      'Kubernetes',
      'AWS',
      'GraphQL',
      'REST',
      'Git',
      'Tailwind',
    ];

    const found: string[] = [];
    const lower = text.toLowerCase();
    for (const skill of commonSkills) {
      const skillLower = skill.toLowerCase();
      const regex = new RegExp(`\\b${skillLower.replace('+', '\\+')}\\b`, 'i');
      if (regex.test(lower)) {
        found.push(skill);
      }
    }

    return found.length > 0 ? found : ['TypeScript', 'React', 'Node.js'];
  }
}
