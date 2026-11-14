import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';
import { createTestRecruiter, createTestStudent } from './fixtures.js';
import { StudentService } from '../src/services/student.service.js';

describe('Recruiter Workspace & Permissions Tests', () => {
  let recruiterToken: string;
  let studentToken: string;
  let studentProfileId: string;
  let studentUsername: string;
  let shareToken: string;
  let cleanups: (() => Promise<void>)[] = [];

  beforeAll(async () => {
    const recruiter = await createTestRecruiter();
    const student = await createTestStudent();
    cleanups.push(recruiter.cleanup);
    cleanups.push(student.cleanup);

    recruiterToken = recruiter.token;
    studentToken = student.token;
    studentProfileId = student.profile.id;
    studentUsername = student.profile.username;

    // Generate public card fast-pass for the student
    const shareInfo = await StudentService.getOrCreateShareToken(student.user.id);
    shareToken = shareInfo.shareToken;
  });

  afterAll(async () => {
    for (const cleanup of cleanups) {
      await cleanup();
    }
  });

  it('should prevent recruiter from viewing unshared candidate (403 Forbidden)', async () => {
    const res = await request(app)
      .get(`/api/v1/recruiter/candidates/${studentProfileId}`)
      .set('Authorization', `Bearer ${recruiterToken}`);

    expect(res.status).toBe(403);
    expect(res.body.success).toBe(false);
  });

  it('should return 0 candidates in radar before candidate shares public card info', async () => {
    const res = await request(app)
      .get('/api/v1/recruiter/candidates?skills=TypeScript')
      .set('Authorization', `Bearer ${recruiterToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.candidates.length).toBe(0);
  });

  it('should unlock candidate access when recruiter inputs student public card info or fast-pass', async () => {
    const unlockRes = await request(app)
      .post('/api/v1/recruiter/candidates/unlock')
      .set('Authorization', `Bearer ${recruiterToken}`)
      .send({
        cardUrlOrToken: `https://proofly.app/u/${studentUsername}?pass=${shareToken}`,
      });

    expect(unlockRes.status).toBe(200);
    expect(unlockRes.body.success).toBe(true);
    expect(unlockRes.body.data.unlocked).toBe(true);
    expect(unlockRes.body.data.candidate.id).toBe(studentProfileId);
  });

  it('should unlock candidate access directly using the raw Access Hash code', async () => {
    const candidate2 = await createTestStudent();
    cleanups.push(candidate2.cleanup);
    const hash = candidate2.profile.shareToken!;

    const unlockRes = await request(app)
      .post('/api/v1/recruiter/candidates/unlock')
      .set('Authorization', `Bearer ${recruiterToken}`)
      .send({
        cardUrlOrToken: hash,
      });

    expect(unlockRes.status).toBe(200);
    expect(unlockRes.body.success).toBe(true);
    expect(unlockRes.body.data.unlocked).toBe(true);
    expect(unlockRes.body.data.candidate.id).toBe(candidate2.profile.id);
  });

  it('should now allow recruiter to search the unlocked candidate and filter by skills', async () => {
    const res = await request(app)
      .get('/api/v1/recruiter/candidates?skills=TypeScript')
      .set('Authorization', `Bearer ${recruiterToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.candidates.length).toBeGreaterThan(0);
    expect(res.body.data.candidates.some((c: any) => c.id === studentProfileId)).toBe(true);
  });

  it('should allow recruiter to view unlocked candidate dossier', async () => {
    const res = await request(app)
      .get(`/api/v1/recruiter/candidates/${studentProfileId}`)
      .set('Authorization', `Bearer ${recruiterToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(studentProfileId);
  });

  it('should prevent student from accessing recruiter candidate search (403 Forbidden)', async () => {
    const res = await request(app)
      .get('/api/v1/recruiter/candidates')
      .set('Authorization', `Bearer ${studentToken}`);

    expect(res.status).toBe(403);
    expect(res.body.success).toBe(false);
  });

  it('should create and retrieve organization-scoped job postings', async () => {
    const createRes = await request(app)
      .post('/api/v1/recruiter/jobs')
      .set('Authorization', `Bearer ${recruiterToken}`)
      .send({
        title: 'Cloud DevOps Engineer',
        description: 'Manage Terraform infrastructure, Kubernetes clusters, and CI/CD pipelines.',
        location: 'Remote',
        employmentType: 'Full-time',
        status: 'ACTIVE',
        requiredSkills: ['AWS', 'Docker', 'Kubernetes'],
        preferredSkills: ['Terraform', 'Go'],
      });

    expect(createRes.status).toBe(201);
    expect(createRes.body.data.title).toBe('Cloud DevOps Engineer');

    const listRes = await request(app)
      .get('/api/v1/recruiter/jobs')
      .set('Authorization', `Bearer ${recruiterToken}`);

    expect(listRes.status).toBe(200);
    expect(listRes.body.data.some((j: any) => j.title === 'Cloud DevOps Engineer')).toBe(true);
  });
});
