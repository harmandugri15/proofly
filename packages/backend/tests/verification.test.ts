import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';
import { createTestStudent } from './fixtures.js';

describe('Evidence Verification Engine Tests', () => {
  let studentToken: string;
  let cleanupStudent: () => Promise<void>;

  beforeAll(async () => {
    const student = await createTestStudent();
    studentToken = student.token;
    cleanupStudent = student.cleanup;
  });

  afterAll(async () => {
    if (cleanupStudent) {
      await cleanupStudent();
    }
  });

  it('should verify a Credly certificate URL with ISSUER_VERIFIED status and confidence >= 0.9', async () => {
    // Create certificate with valid Credly URL
    const createRes = await request(app)
      .post('/api/v1/student/certificates')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({
        title: 'AWS Certified Developer Associate',
        issuer: 'Amazon Web Services',
        credentialUrl: 'https://www.credly.com/badges/aws-certified-developer-associate-12345',
        issueDate: '2024-05-10',
        doesNotExpire: true,
      });

    expect(createRes.status).toBe(201);
    const certId = createRes.body.data.id;

    // Trigger verification
    const verifyRes = await request(app)
      .post(`/api/v1/student/certificates/${certId}/verify`)
      .set('Authorization', `Bearer ${studentToken}`);

    expect(verifyRes.status).toBe(200);
    expect(verifyRes.body.data.status).toBe('ISSUER_VERIFIED');
    expect(verifyRes.body.data.confidence).toBeGreaterThanOrEqual(0.9);
  });

  it('should mark an expired credential as EXPIRED with honest reporting', async () => {
    const createRes = await request(app)
      .post('/api/v1/student/certificates')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({
        title: 'Old Expired Certification',
        issuer: 'Test Academy',
        credentialUrl: 'https://example.com/verify/old-cert',
        issueDate: '2020-01-01',
        expiryDate: '2022-01-01', // Already expired
        doesNotExpire: false,
      });

    expect(createRes.status).toBe(201);
    const certId = createRes.body.data.id;

    const verifyRes = await request(app)
      .post(`/api/v1/student/certificates/${certId}/verify`)
      .set('Authorization', `Bearer ${studentToken}`);

    expect(verifyRes.status).toBe(200);
    expect(verifyRes.body.data.status).toBe('EXPIRED');
  });

  it('should mark an unverified URL without known issuer as PENDING_REVIEW', async () => {
    const createRes = await request(app)
      .post('/api/v1/student/certificates')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({
        title: 'Custom University Diploma',
        issuer: 'Local University',
        credentialUrl: 'https://university.example.edu/verify/99281',
        issueDate: '2023-06-01',
        doesNotExpire: true,
      });

    const certId = createRes.body.data.id;
    const verifyRes = await request(app)
      .post(`/api/v1/student/certificates/${certId}/verify`)
      .set('Authorization', `Bearer ${studentToken}`);

    expect(verifyRes.status).toBe(200);
    expect(verifyRes.body.data.status).toBe('PENDING_REVIEW');
  });
});
