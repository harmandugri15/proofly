import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';
import { createTestRecruiter, createTestStudent, grantCandidateAccess } from './fixtures.js';

describe('AI Assistants & Grounding Tests', () => {
  let studentToken: string;
  let recruiterToken: string;
  let organizationId: string;
  let candidateId: string;
  let cleanups: (() => Promise<void>)[] = [];

  beforeAll(async () => {
    const student = await createTestStudent();
    const recruiter = await createTestRecruiter();
    cleanups.push(student.cleanup);
    cleanups.push(recruiter.cleanup);

    studentToken = student.token;
    recruiterToken = recruiter.token;
    organizationId = recruiter.organization.id;
    candidateId = student.profile.id;
  });

  afterAll(async () => {
    for (const cleanup of cleanups) {
      await cleanup();
    }
  });

  it('Agent 1: should generate actionable profile completeness checklist for student', async () => {
    const res = await request(app)
      .post('/api/v1/ai/profile-completeness')
      .set('Authorization', `Bearer ${studentToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.score).toBeGreaterThan(0);
    expect(res.body.data.strengths.length).toBeGreaterThan(0);
    expect(Array.isArray(res.body.data.checklist)).toBe(true);
  });

  it('Agent 4: should reject research request if candidate has not shared access (403 Forbidden)', async () => {
    const res = await request(app)
      .post('/api/v1/ai/research-candidate')
      .set('Authorization', `Bearer ${recruiterToken}`)
      .send({
        candidateId,
        query: 'What projects has this candidate built with React and WebSockets?',
      });

    expect(res.status).toBe(403);
    expect(res.body.success).toBe(false);
  });

  it('Agent 5: should reject match request if candidate has not shared access (403 Forbidden)', async () => {
    const res = await request(app)
      .post('/api/v1/ai/match-candidate')
      .set('Authorization', `Bearer ${recruiterToken}`)
      .send({
        candidateId,
        requiredSkills: ['TypeScript', 'React', 'Node.js'],
        preferredSkills: ['AWS'],
      });

    expect(res.status).toBe(403);
    expect(res.body.success).toBe(false);
  });

  it('Agent 4: Recruiter Research Assistant should return answers with valid evidence citations after access granted', async () => {
    await grantCandidateAccess(organizationId, candidateId);

    const res = await request(app)
      .post('/api/v1/ai/research-candidate')
      .set('Authorization', `Bearer ${recruiterToken}`)
      .send({
        candidateId,
        query: 'What projects has this candidate built with React and WebSockets?',
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.answer).toBeDefined();
    expect(res.body.data.citations.length).toBeGreaterThan(0);

    const firstCitation = res.body.data.citations[0];
    expect(firstCitation.sourceType).toBeDefined();
    expect(firstCitation.title).toBeDefined();
    expect(firstCitation.snippet).toBeDefined();
  });

  it('Agent 5: Candidate Matching Assistant should provide explainable skill matching breakdown', async () => {
    const res = await request(app)
      .post('/api/v1/ai/match-candidate')
      .set('Authorization', `Bearer ${recruiterToken}`)
      .send({
        candidateId,
        requiredSkills: ['TypeScript', 'React', 'Node.js'],
        preferredSkills: ['AWS'],
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.matchScore).toBeGreaterThanOrEqual(70);
    expect(res.body.data.requiredSkillsMatchedCount).toBe(3);
    expect(res.body.data.evidenceHighlights.length).toBeGreaterThan(0);
  });
});
