import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ContributionHeatmap } from './components/common/ContributionHeatmap';
import { GitHubProfileCard } from './components/common/GitHubProfileCard';
import { CodingProfileCard } from './components/common/CodingProfileCard';
import { ExternalCodingProfileItem, GitHubProfileStats, ContributionDay } from '@proofly/shared';

describe('Deep Signals & Rich Coding UI Component Tests', () => {
  it('ContributionHeatmap: renders 52-week activity, streaks, and commit statistics', () => {
    const mockContributions: ContributionDay[] = [
      { date: '2026-10-12', count: 5, level: 2 },
      { date: '2026-10-13', count: 8, level: 3 },
      { date: '2026-10-14', count: 12, level: 4 },
    ];

    const html = renderToString(
      <ContributionHeatmap
        contributions={mockContributions}
        totalCommitsLastYear={342}
        currentStreak={19}
        longestStreak={45}
        username="alexchen"
      />
    );

    expect(html).toContain('GitHub Contribution Heatmap');
    expect(html).toContain('alexchen');
    expect(html).toContain('342');
    expect(html).toContain('19');
    expect(html).toContain('45');
    expect(html).toContain('Mon');
    expect(html).toContain('Wed');
    expect(html).toContain('Fri');
    expect(html).toContain('Less');
    expect(html).toContain('More');
  });

  it('GitHubProfileCard: renders complete GitHub signals, followers, language bar and heatmap', () => {
    const mockStats: GitHubProfileStats = {
      username: 'alexchen',
      bio: 'Distributed systems & performant TypeScript tools.',
      publicRepos: 18,
      followers: 48,
      following: 34,
      totalStars: 142,
      totalForks: 29,
      totalCommitsLastYear: 412,
      currentStreak: 21,
      longestStreak: 50,
      topLanguages: [
        { language: 'TypeScript', percentage: 65, color: '#3178c6' },
        { language: 'Go', percentage: 35, color: '#00ADD8' },
      ],
      contributions: [
        { date: '2026-10-14', count: 4, level: 2 },
      ],
    };

    const html = renderToString(
      <GitHubProfileCard
        githubUsername="alexchen"
        githubStats={mockStats}
      />
    );

    expect(html).toContain('alexchen');
    expect(html).toContain('Verified GitHub');
    expect(html).toContain('Distributed systems &amp; performant TypeScript tools.');
    expect(html).toContain('142');
    expect(html).toContain('stars earned');
    expect(html).toContain('48');
    expect(html).toContain('followers');
    expect(html).toContain('TypeScript');
    expect(html).toContain('65%');
    expect(html).toContain('Go');
    expect(html).toContain('35%');
  });

  it('CodingProfileCard: renders LeetCode difficulty breakdown, acceptance rate, streak, and recent submissions', () => {
    const mockProfile: ExternalCodingProfileItem = {
      id: 'cp-1',
      studentProfileId: 'sp-1',
      platform: 'LEETCODE',
      username: 'alexchen_dev',
      profileUrl: 'https://leetcode.com/alexchen_dev/',
      totalSolved: 312,
      easySolved: 120,
      mediumSolved: 160,
      hardSolved: 32,
      ranking: 42100,
      rating: 1920.5,
      badges: ['Knight', '50 Days 2024'],
      syncStatus: 'SYNCED',
      detailedStats: {
        acceptanceRate: 68.4,
        streakDays: 45,
        percentileRank: 92.5,
        easyTotal: 830,
        mediumTotal: 1740,
        hardTotal: 720,
        topSkills: ['Dynamic Programming', 'Graph Theory', 'Trees'],
        recentSubmissions: [
          { title: 'LRU Cache', difficulty: 'Medium', timestamp: '2026-10-12', language: 'TypeScript' },
          { title: 'Trapping Rain Water', difficulty: 'Hard', timestamp: '2026-10-10', language: 'TypeScript' },
        ],
      },
    };

    const html = renderToString(
      <CodingProfileCard profile={mockProfile} showActions={false} />
    );

    expect(html).toContain('LeetCode');
    expect(html).toContain('alexchen_dev');
    expect(html).toContain('312');
    expect(html).toContain('68.4%');
    expect(html).toContain('45 days');
    expect(html).toContain('1920.5');
    expect(html).toContain('120');
    expect(html).toContain('160');
    expect(html).toContain('32');
    expect(html).toContain('Dynamic Programming');
    expect(html).toContain('Graph Theory');
    expect(html).toContain('LRU Cache');
    expect(html).toContain('Trapping Rain Water');
    expect(html).toContain('Knight');
  });
});
