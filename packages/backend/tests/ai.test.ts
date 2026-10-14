import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';
import { prisma } from '../src/lib/prisma.js';

describe('AI Assistants & Grounding Tests', () => {
  let studentToken: string;
  let recruiterToken: string;
  let candidateId: string;

  beforeAll(async () => {
    // Log in student
    const stuRes = await request(app).post('/api/v1/auth/login').send({
      email: 'alex.chen@university.edu',
      password: 'Password123!',
    });
    studentToken = stuRes.body.data.token;

    // Log in recruiter
    const recRes = await request(app).post('/api/v1/auth/login').send({
      email: 'recruiter@vanguard.com',
      password: 'Password123!',
    });
    recruiterToken = recRes.body.data.token;

    const studentProfile = await prisma.studentProfile.findFirst({
      where: { username: 'alexchen' },
    });
    candidateId = studentProfile!.id;
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

  it('Agent 4: Recruiter Research Assistant should return answers with valid evidence citations', async () => {
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
        requiredSkills: ['TypeScript', 'React', 'PostgreSQL'],
        preferredSkills: ['AWS', 'Docker'],
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.matchScore).toBeGreaterThanOrEqual(70);
    expect(res.body.data.requiredSkillsMatchedCount).toBe(3);
    expect(res.body.data.evidenceHighlights.length).toBeGreaterThan(0);
  });
});
