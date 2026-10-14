import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Proofly database with realistic demo talent and recruiter data...');

  // Clean existing records
  await prisma.auditEvent.deleteMany();
  await prisma.recruiterNote.deleteMany();
  await prisma.shortlistCandidate.deleteMany();
  await prisma.shortlist.deleteMany();
  await prisma.jobPosting.deleteMany();
  await prisma.post.deleteMany();
  await prisma.gitHubRepo.deleteMany();
  await prisma.externalCodingProfile.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.project.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.education.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.recruiterProfile.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash('Password123!', 10);

  // 1. Create Organization & Recruiter
  const org = await prisma.organization.create({
    data: {
      name: 'Vanguard Tech Partners',
      slug: 'vanguard-tech',
      websiteUrl: 'https://vanguardtech.example.com',
      verifiedAt: new Date(),
    },
  });

  const recruiterUser = await prisma.user.create({
    data: {
      email: 'recruiter@vanguard.com',
      passwordHash,
      name: 'Elena Rostova',
      role: 'RECRUITER',
      isEmailVerified: true,
    },
  });

  const recruiterProfile = await prisma.recruiterProfile.create({
    data: {
      userId: recruiterUser.id,
      organizationId: org.id,
      fullName: 'Elena Rostova',
      title: 'Principal Technical Recruiter',
      department: 'Engineering Talent',
    },
  });

  // 2. Create Job Postings
  const jobFullStack = await prisma.jobPosting.create({
    data: {
      organizationId: org.id,
      title: 'Full-Stack Software Engineer (Early Career)',
      description:
        'We are seeking a talented full-stack engineer proficient in TypeScript, React, Node.js, and PostgreSQL to build scalable web applications. Experience with cloud platforms (AWS) and demonstrated open-source project evidence are strongly valued.',
      location: 'San Francisco, CA / Remote',
      employmentType: 'Full-time',
      status: 'ACTIVE',
      requiredSkills: JSON.stringify(['TypeScript', 'React', 'Node.js', 'PostgreSQL']),
      preferredSkills: JSON.stringify(['AWS', 'Docker', 'GraphQL', 'Tailwind']),
      minGraduationYear: 2024,
    },
  });

  const jobSystems = await prisma.jobPosting.create({
    data: {
      organizationId: org.id,
      title: 'Backend Systems Engineer',
      description:
        'Join our core platform infrastructure team. Looking for engineers with strong foundations in distributed systems, Rust/Go, concurrency, and database query optimization.',
      location: 'New York, NY / Hybrid',
      employmentType: 'Full-time',
      status: 'ACTIVE',
      requiredSkills: JSON.stringify(['Rust', 'Go', 'PostgreSQL', 'Docker']),
      preferredSkills: JSON.stringify(['Redis', 'Kubernetes', 'gRPC']),
      minGraduationYear: 2024,
    },
  });

  // 3. Create Student 1: Alex Chen (Star Full-Stack Candidate)
  const alexUser = await prisma.user.create({
    data: {
      email: 'alex.chen@university.edu',
      passwordHash,
      name: 'Alex Chen',
      role: 'STUDENT',
      isEmailVerified: true,
    },
  });

  const alexProfile = await prisma.studentProfile.create({
    data: {
      userId: alexUser.id,
      username: 'alexchen',
      headline: 'Full-Stack Software Engineer & Open Source Contributor',
      bio: 'Computer Science senior passionate about developer tooling, real-time collaboration, and performant web architecture. Built and scaled applications with React, Node.js, and PostgreSQL.',
      location: 'Seattle, WA',
      visibility: 'PUBLIC',
      isOpenToWork: true,
      preferredRoles: JSON.stringify(['Full-Stack Engineer', 'Frontend Engineer', 'Backend Engineer']),
      targetGraduationYear: 2025,
      completenessScore: 92,
    },
  });

  // Alex Education & Experience
  await prisma.education.create({
    data: {
      studentProfileId: alexProfile.id,
      institution: 'University of Washington',
      degree: 'B.S. in Computer Science',
      fieldOfStudy: 'Software Systems',
      startDate: new Date('2021-09-01'),
      endDate: new Date('2025-06-15'),
      isCurrent: true,
      grade: '3.88 GPA',
      activities: 'ACM Chapter Lead, Hackathon Organizer',
    },
  });

  await prisma.experience.create({
    data: {
      studentProfileId: alexProfile.id,
      company: 'Dataspire Labs',
      title: 'Software Engineering Intern',
      location: 'Remote',
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-09-01'),
      isCurrent: false,
      description:
        'Engineered real-time telemetry dashboard using React, TypeScript, and WebSockets. Reduced bundle load time by 34% through dynamic code-splitting and optimized PostgreSQL query indexing.',
    },
  });

  // Alex Skills
  const alexSkills = [
    { name: 'TypeScript', category: 'LANGUAGE', proficiencyLevel: 'ADVANCED', years: 3 },
    { name: 'React', category: 'FRAMEWORK', proficiencyLevel: 'EXPERT', years: 3.5 },
    { name: 'Node.js', category: 'FRAMEWORK', proficiencyLevel: 'ADVANCED', years: 3 },
    { name: 'PostgreSQL', category: 'DATABASE', proficiencyLevel: 'INTERMEDIATE', years: 2 },
    { name: 'AWS', category: 'CLOUD_DEVOPS', proficiencyLevel: 'INTERMEDIATE', years: 1.5 },
    { name: 'Docker', category: 'TOOL', proficiencyLevel: 'INTERMEDIATE', years: 2 },
    { name: 'Tailwind', category: 'FRAMEWORK', proficiencyLevel: 'EXPERT', years: 2.5 },
  ];

  for (const s of alexSkills) {
    await prisma.skill.create({
      data: {
        studentProfileId: alexProfile.id,
        name: s.name,
        category: s.category,
        proficiencyLevel: s.proficiencyLevel,
        yearsOfExperience: s.years,
        isVerified: true,
        verifiedByCount: 2,
      },
    });
  }

  // Alex Projects (with Verified Evidence)
  await prisma.project.create({
    data: {
      studentProfileId: alexProfile.id,
      title: 'SyncFlow — Real-Time Collaborative Canvas',
      tagline: 'Infinite collaborative canvas with CRDT-based multi-user synchronization.',
      description:
        'Designed and implemented an infinite canvas enabling hundreds of concurrent users to diagram and brainstorm. Built with React, TypeScript, Vite, Node.js, and WebSocket rooms backed by Redis pub/sub. Achieved sub-30ms operational transformation latency.',
      repositoryUrl: 'https://github.com/alexchen/syncflow-canvas',
      demoUrl: 'https://syncflow.demo.app',
      skills: JSON.stringify(['TypeScript', 'React', 'Node.js', 'WebSocket', 'Redis']),
      isFeatured: true,
      verificationStatus: 'DEMO_VERIFIED',
      verificationNotes: 'Verified public GitHub repository and live deployment reachability.',
      evidenceMetadata: JSON.stringify({
        commitCount: 142,
        stars: 84,
        reachable: true,
        license: 'MIT',
      }),
    },
  });

  await prisma.project.create({
    data: {
      studentProfileId: alexProfile.id,
      title: 'PgPulse — PostgreSQL Query Performance Analyzer',
      tagline: 'CLI & Web UI for visualizing EXPLAIN plans and detecting slow missing indexes.',
      description:
        'Parsed PostgreSQL query execution plans to identify table sequential scans and index bloat. Created interactive visual DAGs using React Flow and generated automated index suggestions.',
      repositoryUrl: 'https://github.com/alexchen/pgpulse-analyzer',
      demoUrl: 'https://pgpulse.example.org',
      skills: JSON.stringify(['TypeScript', 'PostgreSQL', 'React', 'Docker']),
      isFeatured: true,
      verificationStatus: 'CODE_VERIFIED',
      verificationNotes: 'Public GitHub repository code verified.',
    },
  });

  // Alex Certificates (Verified via Issuer API)
  await prisma.certificate.create({
    data: {
      studentProfileId: alexProfile.id,
      title: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      credentialId: 'AWS-SAA-839201',
      credentialUrl: 'https://www.credly.com/badges/aws-solutions-architect-associate',
      issueDate: new Date('2024-03-15'),
      expiryDate: new Date('2027-03-15'),
      doesNotExpire: false,
      verificationStatus: 'ISSUER_VERIFIED',
      verificationType: 'ISSUER_API',
      lastVerifiedAt: new Date(),
      verificationLog: 'Validated against Credly badge metadata record.',
    },
  });

  // Alex GitHub Repos
  await prisma.gitHubRepo.create({
    data: {
      studentProfileId: alexProfile.id,
      githubRepoId: 'repo-101',
      name: 'syncflow-canvas',
      fullName: 'alexchen/syncflow-canvas',
      description: 'Infinite collaborative canvas with CRDT-based multi-user synchronization.',
      htmlUrl: 'https://github.com/alexchen/syncflow-canvas',
      primaryLanguage: 'TypeScript',
      languages: JSON.stringify({ TypeScript: 85000, CSS: 12000, HTML: 3000 }),
      starsCount: 84,
      forksCount: 16,
      isSelectedForProfile: true,
      lastCommitAt: new Date('2026-10-10'),
      recentCommitCount: 38,
      lastSyncedAt: new Date(),
    },
  });

  await prisma.gitHubRepo.create({
    data: {
      studentProfileId: alexProfile.id,
      githubRepoId: 'repo-102',
      name: 'pgpulse-analyzer',
      fullName: 'alexchen/pgpulse-analyzer',
      description: 'CLI & Web UI for visualizing EXPLAIN plans and detecting slow missing indexes.',
      htmlUrl: 'https://github.com/alexchen/pgpulse-analyzer',
      primaryLanguage: 'TypeScript',
      languages: JSON.stringify({ TypeScript: 62000, SQL: 18000 }),
      starsCount: 42,
      forksCount: 7,
      isSelectedForProfile: true,
      lastCommitAt: new Date('2026-10-04'),
      recentCommitCount: 19,
      lastSyncedAt: new Date(),
    },
  });

  // Alex LeetCode Stats
  await prisma.externalCodingProfile.create({
    data: {
      studentProfileId: alexProfile.id,
      platform: 'LEETCODE',
      username: 'alexchen_dev',
      profileUrl: 'https://leetcode.com/alexchen_dev/',
      totalSolved: 312,
      easySolved: 120,
      mediumSolved: 160,
      hardSolved: 32,
      ranking: 42100,
      rating: 1920.5,
      badges: JSON.stringify(['Knight', '50 Days 2024', 'SQL 50']),
      syncStatus: 'SYNCED',
      lastSyncedAt: new Date(),
    },
  });

  // Alex Technical Post
  await prisma.post.create({
    data: {
      studentProfileId: alexProfile.id,
      title: 'Taming CRDTs for Real-Time Canvas Collaboration',
      slug: 'taming-crdts-realtime-collaboration',
      summary:
        'A deep dive into how we achieved conflict-free document replication and sub-30ms visual latency in SyncFlow using state vectors and WebSockets.',
      content: `## The Challenge of Multi-User Whiteboarding

When two users drag the same canvas node at the same instant across high latency networks, traditional client-server locks introduce jarring stutters.

In building **SyncFlow**, we evaluated three synchronization models:
1. Centralized server authority with lock acquisition
2. Operational Transformation (OT)
3. Conflict-Free Replicated Data Types (CRDTs)

\`\`\`typescript
interface CanvasNodeUpdate {
  nodeId: string;
  position: { x: number; y: number };
  lamportTimestamp: number;
  clientId: string;
}
\`\`\`

By pairing fractional indexing with client-side optimistic reconciliation, we eliminated rubber-banding while keeping memory footprints below 15MB.`,
      tags: JSON.stringify(['TypeScript', 'WebSockets', 'Distributed Systems', 'Architecture']),
      status: 'PUBLISHED',
      publishedAt: new Date('2026-09-28'),
      readTimeMinutes: 5,
    },
  });

  // 4. Create Student 2: Maya Patel (Systems & Backend Specialist)
  const mayaUser = await prisma.user.create({
    data: {
      email: 'maya.patel@tech.edu',
      passwordHash,
      name: 'Maya Patel',
      role: 'STUDENT',
      isEmailVerified: true,
    },
  });

  const mayaProfile = await prisma.studentProfile.create({
    data: {
      userId: mayaUser.id,
      username: 'mayapatel',
      headline: 'Systems & Infrastructure Engineer | Rust, Go & Distributed Databases',
      bio: 'Junior CS student researching concurrent data structures, LSM trees, and Raft consensus implementations.',
      location: 'San Francisco, CA',
      visibility: 'PUBLIC',
      isOpenToWork: true,
      preferredRoles: JSON.stringify(['Backend Systems Engineer', 'Infrastructure Engineer']),
      targetGraduationYear: 2026,
      completenessScore: 88,
    },
  });

  await prisma.education.create({
    data: {
      studentProfileId: mayaProfile.id,
      institution: 'UC Berkeley',
      degree: 'B.S. in Electrical Engineering & Computer Sciences (EECS)',
      fieldOfStudy: 'Computer Systems',
      startDate: new Date('2022-08-20'),
      endDate: new Date('2026-05-20'),
      isCurrent: true,
      grade: '3.94 GPA',
    },
  });

  for (const s of [
    { name: 'Rust', category: 'LANGUAGE', level: 'ADVANCED', years: 2.5 },
    { name: 'Go', category: 'LANGUAGE', level: 'ADVANCED', years: 2 },
    { name: 'PostgreSQL', category: 'DATABASE', level: 'ADVANCED', years: 2 },
    { name: 'Docker', category: 'TOOL', level: 'INTERMEDIATE', years: 2 },
    { name: 'Redis', category: 'DATABASE', level: 'ADVANCED', years: 1.5 },
  ]) {
    await prisma.skill.create({
      data: {
        studentProfileId: mayaProfile.id,
        name: s.name,
        category: s.category,
        proficiencyLevel: s.level,
        yearsOfExperience: s.years,
        isVerified: true,
        verifiedByCount: 1,
      },
    });
  }

  await prisma.project.create({
    data: {
      studentProfileId: mayaProfile.id,
      title: 'RustKV — Embeddable Log-Structured Merge Key-Value Store',
      tagline: 'LSM-tree storage engine in Rust with write-ahead logging and Bloom filters.',
      description:
        'Engineered an embeddable storage engine inspired by RocksDB in safe Rust. Includes memtable flushing, tiered SSTable compaction, CRC32 checksums, and lock-free read operations.',
      repositoryUrl: 'https://github.com/mayapatel/rust-kv-engine',
      skills: JSON.stringify(['Rust', 'Systems Programming', 'Storage Engines']),
      isFeatured: true,
      verificationStatus: 'CODE_VERIFIED',
      verificationNotes: 'GitHub repository code and unit tests verified.',
    },
  });

  // 5. Shortlist Alex Chen in Vanguard Tech's Candidate Pool
  const shortlist = await prisma.shortlist.create({
    data: {
      organizationId: org.id,
      title: '2025 Early Career Engineering Finalists',
      description: 'Candidates with verified full-stack project evidence and verified certifications.',
    },
  });

  await prisma.shortlistCandidate.create({
    data: {
      shortlistId: shortlist.id,
      studentProfileId: alexProfile.id,
      status: 'INTERVIEW_SCHEDULED',
    },
  });

  await prisma.recruiterNote.create({
    data: {
      organizationId: org.id,
      recruiterId: recruiterProfile.id,
      studentProfileId: alexProfile.id,
      content:
        'Superb project evidence in SyncFlow canvas repository. The commit cadence demonstrates consistent architectural discipline. AWS SAA certificate verified on Credly.',
      tags: JSON.stringify(['Strong Hire', 'Technical Depth', 'Full-Stack']),
    },
  });

  console.log('✅ Proofly database seeded successfully!');
  console.log('   Demo Recruiter: recruiter@vanguard.com / Password123!');
  console.log('   Demo Student 1: alex.chen@university.edu / Password123! (username: alexchen)');
  console.log('   Demo Student 2: maya.patel@tech.edu / Password123! (username: mayapatel)');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
