import { prisma } from '../src/lib/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../src/config/env.js';
import crypto from 'crypto';

export async function createTestStudent(customUsername?: string) {
  const email = `test.student.${Date.now()}.${crypto.randomBytes(4).toString('hex')}@proofly-test.internal`;
  const username = customUsername || `test_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
  const passwordHash = await bcrypt.hash('Password123!', 8);

  const user = await prisma.user.create({
    data: {
      email,
      name: 'Test Student User',
      passwordHash,
      role: 'STUDENT',
      isEmailVerified: true,
      studentProfile: {
        create: {
          username,
          githubUsername: 'torvalds',
          githubStats: JSON.stringify({
            contributions: [{ date: '2026-01-01', count: 5, level: 2 }],
            totalCommitsLastYear: 5,
            currentStreak: 1,
            longestStreak: 1,
            languages: { C: 100 },
          }),
          headline: 'Full-Stack Test Engineer',
          bio: 'Building test-driven scalable systems with verified evidence.',
          location: 'San Francisco, CA',
          completenessScore: 85,
          skills: {
            create: [
              { name: 'TypeScript', category: 'LANGUAGES', proficiencyLevel: 'ADVANCED' },
              { name: 'React', category: 'FRONTEND', proficiencyLevel: 'ADVANCED' },
              { name: 'Node.js', category: 'BACKEND', proficiencyLevel: 'INTERMEDIATE' },
            ],
          },
          projects: {
            create: [
              {
                title: 'Test Evidence Project',
                tagline: 'High-throughput real-time engine',
                description: 'Full-stack application built with React, WebSockets, and database transactions.',
                repositoryUrl: `https://github.com/${username}/test-evidence-project`,
                verificationStatus: 'CODE_VERIFIED',
                skills: JSON.stringify(['TypeScript', 'React', 'Node.js']),
              },
            ],
          },
          certificates: {
            create: [
              {
                title: 'AWS Certified Cloud Practitioner',
                issuer: 'Amazon Web Services',
                credentialUrl: 'https://www.credly.com/badges/aws-certified-cloud-practitioner-test',
                issueDate: new Date('2024-01-01'),
                verificationStatus: 'ISSUER_VERIFIED',
                doesNotExpire: true,
              },
            ],
          },
        },
      },
    },
    include: {
      studentProfile: {
        include: {
          skills: true,
          projects: true,
          certificates: true,
        },
      },
    },
  });

  const token = jwt.sign(
    { userId: user.id, role: user.role, email: user.email, jti: crypto.randomUUID() },
    env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  await prisma.session.create({
    data: {
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      userAgent: 'Proofly-Test-Runner',
    },
  });

  const cleanup = async () => {
    try {
      const studentProfile = user.studentProfile;
      if (studentProfile) {
        await prisma.certificate.deleteMany({ where: { studentProfileId: studentProfile.id } });
        await prisma.project.deleteMany({ where: { studentProfileId: studentProfile.id } });
        await prisma.skill.deleteMany({ where: { studentProfileId: studentProfile.id } });
        await prisma.gitHubRepo.deleteMany({ where: { studentProfileId: studentProfile.id } });
        await prisma.externalCodingProfile.deleteMany({ where: { studentProfileId: studentProfile.id } });
        await prisma.recruiterNote.deleteMany({ where: { studentProfileId: studentProfile.id } });
        await prisma.shortlistCandidate.deleteMany({ where: { studentProfileId: studentProfile.id } });
        await prisma.studentProfile.delete({ where: { id: studentProfile.id } });
      }
      await prisma.session.deleteMany({ where: { userId: user.id } });
      await prisma.auditEvent.deleteMany({ where: { actorId: user.id } });
      await prisma.user.delete({ where: { id: user.id } });
    } catch (e) {
      // Ignore if already deleted
    }
  };

  return { user, profile: user.studentProfile!, token, cleanup };
}

export async function createTestRecruiter() {
  const email = `test.recruiter.${Date.now()}.${crypto.randomBytes(4).toString('hex')}@proofly-test.internal`;
  const passwordHash = await bcrypt.hash('Password123!', 8);
  const slug = `test-org-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;

  const org = await prisma.organization.create({
    data: {
      name: `Test Organization ${slug}`,
      slug,
      websiteUrl: 'https://test-org.internal',
      verifiedAt: new Date(),
    },
  });

  const user = await prisma.user.create({
    data: {
      email,
      name: 'Test Recruiter User',
      passwordHash,
      role: 'RECRUITER',
      isEmailVerified: true,
      recruiterProfile: {
        create: {
          organizationId: org.id,
          fullName: 'Test Recruiter User',
          title: 'Technical Talent Lead',
          department: 'Engineering Talent',
        },
      },
    },
    include: {
      recruiterProfile: true,
    },
  });

  const token = jwt.sign(
    { userId: user.id, role: user.role, email: user.email, jti: crypto.randomUUID() },
    env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  await prisma.session.create({
    data: {
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      userAgent: 'Proofly-Test-Runner',
    },
  });

  const cleanup = async () => {
    try {
      await prisma.jobPosting.deleteMany({ where: { organizationId: org.id } });
      await prisma.shortlistCandidate.deleteMany({ where: { shortlist: { organizationId: org.id } } });
      await prisma.shortlist.deleteMany({ where: { organizationId: org.id } });
      if (user.recruiterProfile) {
        await prisma.recruiterNote.deleteMany({ where: { recruiterId: user.recruiterProfile.id } });
        await prisma.recruiterProfile.delete({ where: { id: user.recruiterProfile.id } });
      }
      await prisma.session.deleteMany({ where: { userId: user.id } });
      await prisma.auditEvent.deleteMany({ where: { actorId: user.id } });
      await prisma.user.delete({ where: { id: user.id } });
      await prisma.organization.delete({ where: { id: org.id } });
    } catch (e) {
      // Ignore if already deleted
    }
  };

  return { user, profile: user.recruiterProfile!, organization: org, token, cleanup };
}
