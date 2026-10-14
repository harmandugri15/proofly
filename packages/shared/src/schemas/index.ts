import { z } from 'zod';

// ============================================================================
// Auth Schemas
// ============================================================================

export const StrongPasswordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(100, 'Password must be under 100 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character (!@#$%^&* etc.)');

export const RegisterSchema = z.object({
  email: z.string().email('Invalid email address').max(255),
  password: StrongPasswordSchema,
  role: z.enum(['STUDENT', 'RECRUITER']),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  // Optional recruiter fields
  organizationName: z.string().min(2).max(100).optional(),
  organizationWebsite: z.string().url().optional().or(z.literal('')),
  title: z.string().max(100).optional(),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const ForgotPasswordSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
});

export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;

export const VerifyResetOtpSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  otp: z.string().length(6, 'Verification code must be exactly 6 digits'),
});

export type VerifyResetOtpInput = z.infer<typeof VerifyResetOtpSchema>;

export const ResetPasswordSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  otp: z.string().length(6, 'Verification code must be exactly 6 digits').optional(),
  token: z.string().optional(),
  newPassword: StrongPasswordSchema,
});

export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;

export const GoogleAuthTokenSchema = z.object({
  credential: z.string().min(1, 'Google credential token is required'),
  role: z.enum(['STUDENT', 'RECRUITER']).optional().default('STUDENT'),
});

export type GoogleAuthTokenInput = z.infer<typeof GoogleAuthTokenSchema>;

// ============================================================================
// Student Profile Schemas
// ============================================================================

export const UpdateProfileSchema = z.object({
  headline: z.string().max(200).optional(),
  bio: z.string().max(5000).optional(),
  location: z.string().max(100).optional().nullable(),
  visibility: z.enum(['PUBLIC', 'RECRUITER_ONLY', 'PRIVATE']).optional(),
  isOpenToWork: z.boolean().optional(),
  preferredRoles: z.array(z.string()).optional(),
  targetGraduationYear: z
    .number()
    .int()
    .min(2000)
    .max(2040)
    .optional()
    .nullable(),
  linkedinUrl: z.string().max(300).optional().nullable(),
});

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;

export const EducationSchema = z.object({
  institution: z.string().min(1, 'Institution is required').max(150),
  degree: z.string().min(1, 'Degree is required').max(100),
  fieldOfStudy: z.string().min(1, 'Field of study is required').max(100),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional().nullable(),
  isCurrent: z.boolean().default(false),
  grade: z.string().max(20).optional().nullable(),
  activities: z.string().max(500).optional().nullable(),
});

export type EducationInput = z.infer<typeof EducationSchema>;

export const ExperienceSchema = z.object({
  company: z.string().min(1, 'Company is required').max(150),
  title: z.string().min(1, 'Title is required').max(100),
  location: z.string().max(100).optional().nullable(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional().nullable(),
  isCurrent: z.boolean().default(false),
  description: z.string().max(3000),
});

export type ExperienceInput = z.infer<typeof ExperienceSchema>;

export const SkillSchema = z.object({
  name: z.string().min(1, 'Skill name is required').max(50),
  category: z.enum([
    'LANGUAGE',
    'FRAMEWORK',
    'DATABASE',
    'TOOL',
    'CLOUD_DEVOPS',
    'CONCEPT',
  ]),
  proficiencyLevel: z.enum([
    'BEGINNER',
    'INTERMEDIATE',
    'ADVANCED',
    'EXPERT',
  ]),
  yearsOfExperience: z.number().min(0).max(50).optional().nullable(),
});

export type SkillInput = z.infer<typeof SkillSchema>;

export const ProjectSchema = z.object({
  title: z.string().min(1, 'Project title is required').max(120),
  tagline: z.string().min(1, 'Tagline is required').max(500),
  description: z.string().min(10, 'Description must be at least 10 characters').max(10000),
  demoUrl: z.string().url('Must be a valid URL').optional().nullable().or(z.literal('')),
  repositoryUrl: z.string().url('Must be a valid URL').optional().nullable().or(z.literal('')),
  skills: z.array(z.string()).default([]),
  isFeatured: z.boolean().default(false),
});

export type ProjectInput = z.infer<typeof ProjectSchema>;

export const AutoFetchRepoSchema = z.object({
  repositoryUrl: z.string().url('Must be a valid repository URL'),
});

export type AutoFetchRepoInput = z.infer<typeof AutoFetchRepoSchema>;

export const ConnectLinkedInSchema = z.object({
  linkedinUrl: z.string().min(1, 'LinkedIn profile URL is required').max(300),
});

export type ConnectLinkedInInput = z.infer<typeof ConnectLinkedInSchema>;

export const CertificateSchema = z.object({
  title: z.string().min(1, 'Certificate title is required').max(150),
  issuer: z.string().min(1, 'Issuer name is required').max(100),
  credentialId: z.string().max(100).optional().nullable(),
  credentialUrl: z.string().url('Must be a valid URL').optional().nullable().or(z.literal('')),
  issueDate: z.string().min(1, 'Issue date is required'),
  expiryDate: z.string().optional().nullable(),
  doesNotExpire: z.boolean().default(false),
});

export type CertificateInput = z.infer<typeof CertificateSchema>;

export const ExternalCodingProfileSchema = z.object({
  platform: z.enum(['LEETCODE', 'HACKERRANK', 'CODEFORCES']),
  username: z.string().min(1, 'Username is required').max(100),
});

export type ExternalCodingProfileInput = z.infer<typeof ExternalCodingProfileSchema>;

export const PostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(180),
  summary: z.string().min(10, 'Summary must be at least 10 characters').max(400),
  content: z.string().min(20, 'Content must be at least 20 characters').max(50000),
  tags: z.array(z.string()).default([]),
  status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
});

export type PostInput = z.infer<typeof PostSchema>;

// ============================================================================
// Recruiter Schemas
// ============================================================================

export const JobPostingSchema = z.object({
  title: z.string().min(2, 'Job title is required').max(120),
  description: z.string().min(20, 'Job description must be at least 20 characters').max(15000),
  location: z.string().min(1, 'Location is required').max(100),
  employmentType: z.string().min(1, 'Employment type is required').max(50),
  status: z.enum(['DRAFT', 'ACTIVE', 'CLOSED']).default('ACTIVE'),
  requiredSkills: z.array(z.string()).min(1, 'At least one required skill is needed'),
  preferredSkills: z.array(z.string()).default([]),
  minGraduationYear: z.number().int().min(2000).max(2040).optional().nullable(),
});

export type JobPostingInput = z.infer<typeof JobPostingSchema>;

export const ShortlistSchema = z.object({
  title: z.string().min(1, 'Shortlist title is required').max(100),
  description: z.string().max(500).optional().nullable(),
});

export type ShortlistInput = z.infer<typeof ShortlistSchema>;

export const RecruiterNoteSchema = z.object({
  studentProfileId: z.string().min(1, 'Student ID is required'),
  content: z.string().min(1, 'Note content is required').max(5000),
  tags: z.array(z.string()).default([]),
});

export type RecruiterNoteInput = z.infer<typeof RecruiterNoteSchema>;

export const CandidateSearchQuerySchema = z.object({
  query: z.string().optional(),
  skills: z.string().optional(), // Comma-separated or array
  graduationYear: z.coerce.number().optional(),
  minProjects: z.coerce.number().optional(),
  isVerifiedOnly: z.coerce.boolean().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
});

export type CandidateSearchQuery = z.infer<typeof CandidateSearchQuerySchema>;

// ============================================================================
// AI Agent Schemas
// ============================================================================

export const RecruiterResearchQuerySchema = z.object({
  candidateId: z.string().min(1, 'Candidate ID is required'),
  query: z.string().min(3, 'Question must be at least 3 characters').max(500),
});

export type RecruiterResearchQuery = z.infer<typeof RecruiterResearchQuerySchema>;

export const CandidateMatchQuerySchema = z.object({
  candidateId: z.string().min(1, 'Candidate ID is required'),
  jobId: z.string().optional(),
  jobDescription: z.string().optional(),
  requiredSkills: z.array(z.string()).optional(),
  preferredSkills: z.array(z.string()).optional(),
});

export type CandidateMatchQuery = z.infer<typeof CandidateMatchQuerySchema>;
