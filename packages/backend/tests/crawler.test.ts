import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';
import { GitHubService } from '../src/services/github.service.js';

describe('Auto-Fetch Crawler, Contribution Heatmap & Recruiter Fast-Pass', () => {
  let studentCookie: string;

  beforeAll(async () => {
    // Login as seeded student Alex Chen
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'alex.chen@university.edu', password: 'Password123!' });

    expect(res.status).toBe(200);
    const cookies = res.headers['set-cookie'];
    if (Array.isArray(cookies)) {
      studentCookie = cookies.map((c) => c.split(';')[0]).join('; ');
    } else if (cookies) {
      studentCookie = (cookies as string).split(';')[0];
    }
  });

  it('GitHubService: should generate 365 days contribution heatmap with 0-4 levels and streak metrics', async () => {
    const stats = await GitHubService.generateContributionHeatmap('alexchen');
    expect(stats.contributions.length).toBe(365);
    expect(stats.totalCommitsLastYear).toBeGreaterThan(0);
    expect(stats.currentStreak).toBeGreaterThanOrEqual(0);
    expect(stats.longestStreak).toBeGreaterThanOrEqual(stats.currentStreak);

    // Verify day format
    const sampleDay = stats.contributions[0];
    expect(sampleDay).toHaveProperty('date');
    expect(sampleDay).toHaveProperty('count');
    expect(sampleDay).toHaveProperty('level');
    expect([0, 1, 2, 3, 4]).toContain(sampleDay.level);
  });

  it('GitHubService: should auto-fetch project details from GitHub repo URL', async () => {
    const autoFetched = await GitHubService.autoFetchRepository('https://github.com/facebook/react');
    expect(autoFetched.title).toBeTruthy();
    expect(autoFetched.repositoryUrl).toBe('https://github.com/facebook/react');
    expect(autoFetched.description).toBeTruthy();
    expect(autoFetched.skills.length).toBeGreaterThan(0);
    expect(autoFetched.starsCount).toBeGreaterThanOrEqual(0);
    expect(autoFetched.isVerified).toBe(true);
  });

  it('API: POST /api/v1/student/projects/auto-fetch should crawl and return project metadata', async () => {
    const res = await request(app)
      .post('/api/v1/student/projects/auto-fetch')
      .set('Cookie', studentCookie)
      .send({ repositoryUrl: 'https://github.com/alexchen/syncflow-canvas' });

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('title');
    expect(res.body.data).toHaveProperty('tagline');
    expect(res.body.data).toHaveProperty('description');
    expect(res.body.data.repositoryUrl).toBe('https://github.com/alexchen/syncflow-canvas');
    expect(Array.isArray(res.body.data.skills)).toBe(true);
    expect(res.body.data.isVerified).toBe(true);
  });

  it('API: GET /api/v1/student/share-link should return recruiter fast-pass URL', async () => {
    const res = await request(app)
      .get('/api/v1/student/share-link')
      .set('Cookie', studentCookie);

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('shareToken');
    expect(res.body.data).toHaveProperty('shareUrl');
    expect(res.body.data).toHaveProperty('recruiterFastPassUrl');
    expect(res.body.data.username).toBe('alexchen');
    expect(res.body.data.recruiterFastPassUrl).toContain('pass=');
  });

  it('API: GET /api/v1/public/profile/:username?pass=:shareToken should allow access with valid fast-pass', async () => {
    const tokenRes = await request(app)
      .get('/api/v1/student/share-link')
      .set('Cookie', studentCookie);

    const { shareToken } = tokenRes.body.data;

    const publicRes = await request(app)
      .get(`/api/v1/public/profile/alexchen?pass=${shareToken}`);

    expect(publicRes.status).toBe(200);
    expect(publicRes.body.data.username).toBe('alexchen');
    expect(publicRes.body.data).toHaveProperty('githubStats');
    expect(publicRes.body.data.githubStats).toHaveProperty('contributions');
    expect(Array.isArray(publicRes.body.data.codingProfiles)).toBe(true);
  });
});
