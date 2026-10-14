import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';

describe('Auth & Session Integration Tests', () => {
  const testStudentEmail = `test.student.${Date.now()}@example.com`;
  const testPassword = 'Password123!';

  it('should register a new student successfully and set HTTP-only cookie', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: testStudentEmail,
        password: testPassword,
        name: 'Test Student',
        role: 'STUDENT',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe(testStudentEmail);
    expect(res.body.data.user.role).toBe('STUDENT');
    expect(res.body.data.token).toBeDefined();

    // Verify Set-Cookie header exists and contains proofly_session
    const cookies = res.headers['set-cookie'];
    expect(cookies).toBeDefined();
    expect(cookies[0]).toContain('proofly_session');
    expect(cookies[0]).toContain('HttpOnly');
  });

  it('should reject registration with duplicate email', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: testStudentEmail,
        password: testPassword,
        name: 'Duplicate Student',
        role: 'STUDENT',
      });

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('CONFLICT');
  });

  it('should log in an existing student and return current user profile on /me', async () => {
    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: testStudentEmail,
        password: testPassword,
      });

    expect(loginRes.status).toBe(200);
    expect(loginRes.body.success).toBe(true);

    const token = loginRes.body.data.token;

    // Use Bearer token to test /me
    const meRes = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(meRes.status).toBe(200);
    expect(meRes.body.data.user.email).toBe(testStudentEmail);
    expect(meRes.body.data.user.studentProfile).toBeDefined();
  });

  it('should reject invalid password login', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: testStudentEmail,
        password: 'WrongPassword!',
      });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
