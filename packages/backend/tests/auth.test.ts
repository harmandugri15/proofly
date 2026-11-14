import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';

describe('Auth & Session Integration Tests', () => {
  const testStudentEmail = `test.student.${Date.now()}@example.com`;
  const testPassword = 'Password123!';
  let verificationOtp: string;

  it('should register a new student successfully and dispatch email confirmation code', async () => {
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
    expect(res.body.data.requiresEmailVerification).toBe(true);
    expect(res.body.data.email).toBe(testStudentEmail);
    expect(res.body.data.role).toBe('STUDENT');
    expect(res.body.data.devOtp).toBeDefined();

    verificationOtp = res.body.data.devOtp;
  });

  it('should reject login attempt before email is confirmed', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: testStudentEmail,
        password: testPassword,
      });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.error.message).toContain('verify your email');
  });

  it('should confirm email with 6-digit OTP, create session in database, and set HTTP-only cookie', async () => {
    const res = await request(app)
      .post('/api/v1/auth/verify-email')
      .send({
        email: testStudentEmail,
        otp: verificationOtp,
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe(testStudentEmail);
    expect(res.body.data.user.isEmailVerified).toBe(true);
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

  it('should reject registration with a weak password missing required complexity', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: `weak.${Date.now()}@example.com`,
        password: 'weakpassword',
        name: 'Weak Password Tester',
        role: 'STUDENT',
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('should complete production-ready OTP generation, verification, and password reset lifecycle', async () => {
    // 1. Request forgot password OTP
    const forgotRes = await request(app)
      .post('/api/v1/auth/forgot-password')
      .send({ email: testStudentEmail });

    expect(forgotRes.status).toBe(200);
    expect(forgotRes.body.success).toBe(true);
    expect(forgotRes.body.data.message).toBeDefined();

    const devOtp = forgotRes.body.data.devOtp;
    expect(devOtp).toBeDefined();
    expect(devOtp).toHaveLength(6);

    // 2. Reject verification with wrong OTP code
    const badVerifyRes = await request(app)
      .post('/api/v1/auth/verify-reset-otp')
      .send({
        email: testStudentEmail,
        otp: '000000',
      });

    expect(badVerifyRes.status).toBe(400);
    expect(badVerifyRes.body.success).toBe(false);

    // 3. Verify OTP successfully
    const goodVerifyRes = await request(app)
      .post('/api/v1/auth/verify-reset-otp')
      .send({
        email: testStudentEmail,
        otp: devOtp,
      });

    expect(goodVerifyRes.status).toBe(200);
    expect(goodVerifyRes.body.success).toBe(true);
    expect(goodVerifyRes.body.data.valid).toBe(true);
    expect(goodVerifyRes.body.data.resetToken).toBeDefined();

    // 4. Reset password with new strong password
    const newStrongPassword = 'NewStrongPassword2026!';
    const resetRes = await request(app)
      .post('/api/v1/auth/reset-password')
      .send({
        email: testStudentEmail,
        otp: devOtp,
        newPassword: newStrongPassword,
      });

    expect(resetRes.status).toBe(200);
    expect(resetRes.body.success).toBe(true);

    // 5. Old password must no longer work
    const oldLoginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: testStudentEmail,
        password: testPassword,
      });

    expect(oldLoginRes.status).toBe(401);

    // 6. New password must authenticate successfully
    const newLoginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: testStudentEmail,
        password: newStrongPassword,
      });

    expect(newLoginRes.status).toBe(200);
    expect(newLoginRes.body.data.token).toBeDefined();
  });

  it('should track sessions in database, allow listing active sessions, and revoke session on logout', async () => {
    // 1. Log in student
    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: testStudentEmail,
        password: 'NewStrongPassword2026!',
      });

    expect(loginRes.status).toBe(200);
    const token = loginRes.body.data.token;

    // 2. Fetch active sessions via GET /api/v1/auth/sessions
    const sessionsRes = await request(app)
      .get('/api/v1/auth/sessions')
      .set('Authorization', `Bearer ${token}`);

    expect(sessionsRes.status).toBe(200);
    expect(sessionsRes.body.success).toBe(true);
    expect(Array.isArray(sessionsRes.body.data.sessions)).toBe(true);
    expect(sessionsRes.body.data.sessions.length).toBeGreaterThanOrEqual(1);

    const currentSession = sessionsRes.body.data.sessions.find((s: any) => s.isCurrent);
    expect(currentSession).toBeDefined();

    // 3. Log out via POST /api/v1/auth/logout with token
    const logoutRes = await request(app)
      .post('/api/v1/auth/logout')
      .set('Authorization', `Bearer ${token}`);

    expect(logoutRes.status).toBe(200);

    // 4. Calling /api/v1/auth/me with that logged-out token must now be rejected (401)
    const afterLogoutRes = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(afterLogoutRes.status).toBe(401);
  });
});
