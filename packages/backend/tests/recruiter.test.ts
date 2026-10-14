import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';

describe('Recruiter Workspace & Permissions Tests', () => {
  let recruiterToken: string;
  let studentToken: string;

  beforeAll(async () => {
    // Recruiter login
    const recRes = await request(app).post('/api/v1/auth/login').send({
      email: 'recruiter@vanguard.com',
      password: 'Password123!',
    });
    recruiterToken = recRes.body.data.token;

    // Student login
    const stuRes = await request(app).post('/api/v1/auth/login').send({
      email: 'alex.chen@university.edu',
      password: 'Password123!',
    });
    studentToken = stuRes.body.data.token;
  });

  it('should allow recruiter to search candidates and filter by skills', async () => {
    const res = await request(app)
      .get('/api/v1/recruiter/candidates?skills=TypeScript')
      .set('Authorization', `Bearer ${recruiterToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.candidates.length).toBeGreaterThan(0);
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
