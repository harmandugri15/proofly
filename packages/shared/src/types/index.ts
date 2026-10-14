// ============================================================================
// Proofly Core Domain Types & Enums
// ============================================================================

export type UserRole = 'STUDENT' | 'RECRUITER' | 'ADMIN';

export type ProfileVisibility = 'PUBLIC' | 'RECRUITER_ONLY' | 'PRIVATE';

export type SkillCategory =
  | 'LANGUAGE'
  | 'FRAMEWORK'
  | 'DATABASE'
  | 'TOOL'
  | 'CLOUD_DEVOPS'
  | 'CONCEPT';

export type ProficiencyLevel =
  | 'BEGINNER'
  | 'INTERMEDIATE'
  | 'ADVANCED'
  | 'EXPERT';

export type VerificationStatus =
  | 'UNVERIFIED'
  | 'ISSUER_VERIFIED'
  | 'PENDING_REVIEW'
  | 'FAILED_VERIFICATION'
  | 'EXPIRED';

export type VerificationType =
  | 'URL_CHECK'
  | 'ISSUER_API'
  | 'MANUAL_REVIEW'
  | 'UNSUPPORTED';

export type ProjectVerificationStatus =
  | 'UNVERIFIED'
  | 'CODE_VERIFIED'
  | 'DEMO_VERIFIED'
  | 'ISSUER_VERIFIED';

export type CodingPlatform = 'LEETCODE' | 'HACKERRANK' | 'CODEFORCES';

export type SyncStatus = 'SYNCED' | 'PENDING' | 'FAILED' | 'RATE_LIMITED';

export type JobStatus = 'DRAFT' | 'ACTIVE' | 'CLOSED';

export type PostStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export type ShortlistStatus =
  | 'REVIEWING'
  | 'INTERVIEW_SCHEDULED'
  | 'OFFERED'
  | 'REJECTED'
  | 'ARCHIVED';

// ============================================================================
// Domain Entities
// ============================================================================

export interface UserSummary {
  id: string;
  email: string;
  role: UserRole;
  isEmailVerified: boolean;
  createdAt: string;
}

export interface StudentProfileSummary {
  id: string;
  userId: string;
  username: string;
  headline: string;
  bio: string;
  avatarUrl?: string | null;
  location?: string | null;
  visibility: ProfileVisibility;
  isOpenToWork: boolean;
  preferredRoles: string[];
  targetGraduationYear?: number | null;
  completenessScore: number;
  githubUsername?: string | null;
  githubStats?: GitHubProfileStats | null;
  shareToken?: string | null;
  user?: UserSummary;
}

export interface EducationItem {
  id: string;
  studentProfileId: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  grade?: string | null;
  activities?: string | null;
}

export interface ExperienceItem {
  id: string;
  studentProfileId: string;
  company: string;
  title: string;
  location?: string | null;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  description: string;
}

export interface SkillItem {
  id: string;
  studentProfileId: string;
  name: string;
  category: SkillCategory;
  proficiencyLevel: ProficiencyLevel;
  yearsOfExperience?: number | null;
  isVerified: boolean;
  verifiedByCount: number;
}

export interface ProjectItem {
  id: string;
  studentProfileId: string;
  title: string;
  tagline: string;
  description: string;
  demoUrl?: string | null;
  repositoryUrl?: string | null;
  skills: string[];
  isFeatured: boolean;
  verificationStatus: ProjectVerificationStatus;
  verificationNotes?: string | null;
  evidenceMetadata?: Record<string, any> | null;
  createdAt: string;
  updatedAt: string;
}

export interface CertificateItem {
  id: string;
  studentProfileId: string;
  title: string;
  issuer: string;
  credentialId?: string | null;
  credentialUrl?: string | null;
  issueDate: string;
  expiryDate?: string | null;
  doesNotExpire: boolean;
  verificationStatus: VerificationStatus;
  verificationType: VerificationType;
  lastVerifiedAt?: string | null;
  verificationLog?: string | null;
}

export interface ExternalCodingProfileItem {
  id: string;
  studentProfileId: string;
  platform: CodingPlatform;
  username: string;
  profileUrl: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking?: number | null;
  rating?: number | null;
  badges: string[];
  lastSyncedAt?: string | null;
  syncStatus: SyncStatus;
  syncError?: string | null;
  detailedStats?: CodingProfileDetailedStats | null;
}

export interface GitHubRepoItem {
  id: string;
  studentProfileId: string;
  githubRepoId: string;
  name: string;
  fullName: string;
  description?: string | null;
  htmlUrl: string;
  primaryLanguage?: string | null;
  languages?: Record<string, number> | null;
  starsCount: number;
  forksCount: number;
  isFork: boolean;
  isSelectedForProfile: boolean;
  lastCommitAt?: string | null;
  recentCommitCount: number;
  lastSyncedAt?: string | null;
}

export interface PostItem {
  id: string;
  studentProfileId: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  tags: string[];
  status: PostStatus;
  publishedAt?: string | null;
  readTimeMinutes: number;
  createdAt: string;
  updatedAt: string;
  authorName?: string;
  authorUsername?: string;
  authorAvatar?: string | null;
}

export interface OrganizationSummary {
  id: string;
  name: string;
  slug: string;
  websiteUrl?: string | null;
  logoUrl?: string | null;
  verifiedAt?: string | null;
}

export interface RecruiterProfileSummary {
  id: string;
  userId: string;
  organizationId: string;
  fullName: string;
  title: string;
  department?: string | null;
  organization?: OrganizationSummary;
  user?: UserSummary;
}

export interface JobPostingItem {
  id: string;
  organizationId: string;
  title: string;
  description: string;
  location: string;
  employmentType: string;
  status: JobStatus;
  requiredSkills: string[];
  preferredSkills: string[];
  minGraduationYear?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface ShortlistItem {
  id: string;
  organizationId: string;
  title: string;
  description?: string | null;
  createdAt: string;
  candidatesCount?: number;
}

export interface RecruiterNoteItem {
  id: string;
  organizationId: string;
  recruiterId: string;
  studentProfileId: string;
  content: string;
  tags: string[];
  createdAt: string;
  recruiterName?: string;
}

// ============================================================================
// AI Agent Types & Responses
// ============================================================================

export interface ProfileChecklistItem {
  id: string;
  category: 'PROJECTS' | 'CERTIFICATES' | 'SKILLS' | 'EXPERIENCE' | 'GITHUB';
  title: string;
  description: string;
  actionUrl: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  isResolved: boolean;
}

export interface ProfileCompletenessResult {
  score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  checklist: ProfileChecklistItem[];
}

export interface EvidenceVerificationResult {
  targetId: string;
  targetType: 'CERTIFICATE' | 'PROJECT';
  status: VerificationStatus | ProjectVerificationStatus;
  confidence: number; // 0.0 - 1.0
  reasons: string[];
  evidenceFound: {
    sourceUrl?: string;
    lastChecked: string;
    details: string;
  };
}

export interface SkillMatchDetail {
  skill: string;
  required: boolean;
  matched: boolean;
  evidenceSource?: string;
  evidenceType?: string;
  confidence: number;
}

export interface CandidateMatchResult {
  candidateId: string;
  candidateName: string;
  matchScore: number; // 0 - 100
  requiredSkillsMatchedCount: number;
  totalRequiredSkillsCount: number;
  preferredSkillsMatchedCount: number;
  totalPreferredSkillsCount: number;
  summary: string;
  skillDetails: SkillMatchDetail[];
  evidenceHighlights: string[];
  missingEvidence: string[];
}

export interface ResearchCitation {
  sourceId: string;
  sourceType: 'PROJECT' | 'CERTIFICATE' | 'GITHUB_REPO' | 'CODING_PROFILE';
  title: string;
  url?: string;
  snippet: string;
}

export interface RecruiterResearchResult {
  query: string;
  answer: string;
  confidence: number;
  citations: ResearchCitation[];
  limitations?: string[];
}

// ============================================================================
// Extended GitHub & Coding Stats & Heatmap Types
// ============================================================================

export interface ContributionDay {
  date: string; // YYYY-MM-DD
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // 0: 0 commits, 1: 1-2, 2: 3-5, 3: 6-9, 4: 10+
}

export interface GitHubProfileStats {
  username: string;
  avatarUrl?: string;
  bio?: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalForks: number;
  totalCommitsLastYear: number;
  currentStreak: number;
  longestStreak: number;
  topLanguages: Array<{ language: string; percentage: number; color?: string }>;
  contributions: ContributionDay[];
  lastSyncedAt?: string;
}

export interface CodingProfileDetailedStats {
  acceptanceRate?: number | null;
  streakDays?: number | null;
  percentileRank?: number | null;
  easyTotal?: number;
  mediumTotal?: number;
  hardTotal?: number;
  topSkills?: string[];
  recentSubmissions?: Array<{
    title: string;
    difficulty: string;
    timestamp: string;
    language: string;
  }>;
}

export interface AutoFetchedProjectData {
  title: string;
  tagline: string;
  description: string;
  repositoryUrl: string;
  demoUrl?: string;
  skills: string[];
  languages: Record<string, number>;
  primaryLanguage?: string;
  starsCount: number;
  forksCount: number;
  openIssuesCount: number;
  license?: string;
  lastCommitDate?: string;
  readmeExcerpt?: string;
  isVerified: boolean;
}

export interface ShareProfileInfo {
  shareUrl: string;
  recruiterFastPassUrl: string;
  username: string;
  shareToken: string;
  visibility: ProfileVisibility;
}

