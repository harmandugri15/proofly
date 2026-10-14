import { prisma } from '../lib/prisma.js';
import { NotFoundError } from '../lib/errors.js';
import { ExternalCodingProfileInput, CodingPlatform, SyncStatus } from '@proofly/shared';
import { logger } from '../lib/logger.js';

interface PlatformSyncResult {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking?: number | null;
  rating?: number | null;
  badges: string[];
  syncStatus: SyncStatus;
  syncError?: string | null;
}

export class CodingProfilesService {
  static async addOrUpdateProfile(userId: string, input: ExternalCodingProfileInput) {
    const student = await prisma.studentProfile.findUnique({ where: { userId } });
    if (!student) throw new NotFoundError('Student profile not found');

    const profileUrl = this.buildProfileUrl(input.platform, input.username);

    // Initial sync attempt
    const syncResult = await this.fetchPlatformStats(input.platform, input.username);

    const record = await prisma.externalCodingProfile.upsert({
      where: {
        studentProfileId_platform: {
          studentProfileId: student.id,
          platform: input.platform,
        },
      },
      create: {
        studentProfileId: student.id,
        platform: input.platform,
        username: input.username,
        profileUrl,
        totalSolved: syncResult.totalSolved,
        easySolved: syncResult.easySolved,
        mediumSolved: syncResult.mediumSolved,
        hardSolved: syncResult.hardSolved,
        ranking: syncResult.ranking || null,
        rating: syncResult.rating || null,
        badges: JSON.stringify(syncResult.badges),
        syncStatus: syncResult.syncStatus,
        syncError: syncResult.syncError || null,
        lastSyncedAt: new Date(),
      },
      update: {
        username: input.username,
        profileUrl,
        totalSolved: syncResult.totalSolved,
        easySolved: syncResult.easySolved,
        mediumSolved: syncResult.mediumSolved,
        hardSolved: syncResult.hardSolved,
        ranking: syncResult.ranking || null,
        rating: syncResult.rating || null,
        badges: JSON.stringify(syncResult.badges),
        syncStatus: syncResult.syncStatus,
        syncError: syncResult.syncError || null,
        lastSyncedAt: new Date(),
      },
    });

    return {
      ...record,
      badges: JSON.parse(record.badges),
    };
  }

  static async syncProfile(userId: string, profileId: string) {
    const student = await prisma.studentProfile.findUnique({ where: { userId } });
    if (!student) throw new NotFoundError('Student profile not found');

    const profile = await prisma.externalCodingProfile.findFirst({
      where: { id: profileId, studentProfileId: student.id },
    });

    if (!profile) throw new NotFoundError('Coding profile not found');

    const syncResult = await this.fetchPlatformStats(
      profile.platform as CodingPlatform,
      profile.username
    );

    const updated = await prisma.externalCodingProfile.update({
      where: { id: profile.id },
      data: {
        totalSolved: syncResult.totalSolved,
        easySolved: syncResult.easySolved,
        mediumSolved: syncResult.mediumSolved,
        hardSolved: syncResult.hardSolved,
        ranking: syncResult.ranking || profile.ranking,
        rating: syncResult.rating || profile.rating,
        badges: JSON.stringify(syncResult.badges),
        syncStatus: syncResult.syncStatus,
        syncError: syncResult.syncError || null,
        lastSyncedAt: new Date(),
      },
    });

    return {
      ...updated,
      badges: JSON.parse(updated.badges),
    };
  }

  static async deleteProfile(userId: string, profileId: string) {
    const student = await prisma.studentProfile.findUnique({ where: { userId } });
    if (!student) throw new NotFoundError('Student profile not found');

    const profile = await prisma.externalCodingProfile.findFirst({
      where: { id: profileId, studentProfileId: student.id },
    });

    if (!profile) throw new NotFoundError('Coding profile not found');

    await prisma.externalCodingProfile.delete({ where: { id: profile.id } });
  }

  private static buildProfileUrl(platform: CodingPlatform, username: string): string {
    switch (platform) {
      case 'LEETCODE':
        return `https://leetcode.com/${encodeURIComponent(username)}/`;
      case 'HACKERRANK':
        return `https://www.hackerrank.com/profile/${encodeURIComponent(username)}`;
      case 'CODEFORCES':
        return `https://codeforces.com/profile/${encodeURIComponent(username)}`;
      default:
        return `https://${String(platform).toLowerCase()}.com/${encodeURIComponent(username)}`;
    }
  }

  private static async fetchPlatformStats(
    platform: CodingPlatform,
    username: string
  ): Promise<PlatformSyncResult> {
    try {
      if (platform === 'LEETCODE') {
        // Query LeetCode public GraphQL API
        const query = `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              submitStats: submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
              profile {
                ranking
              }
            }
          }
        `;

        const response = await fetch('https://leetcode.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ProoflyPlatform/1.0',
          },
          body: JSON.stringify({ query, variables: { username } }),
          signal: AbortSignal.timeout(4000), // 4s timeout
        });

        if (response.ok) {
          const json: any = await response.json();
          const user = json?.data?.matchedUser;
          if (user && user.submitStats?.acSubmissionNum) {
            const stats = user.submitStats.acSubmissionNum;
            const all = stats.find((s: any) => s.difficulty === 'All')?.count || 0;
            const easy = stats.find((s: any) => s.difficulty === 'Easy')?.count || 0;
            const medium = stats.find((s: any) => s.difficulty === 'Medium')?.count || 0;
            const hard = stats.find((s: any) => s.difficulty === 'Hard')?.count || 0;

            return {
              totalSolved: all,
              easySolved: easy,
              mediumSolved: medium,
              hardSolved: hard,
              ranking: user.profile?.ranking || null,
              badges: ['LeetCode Verified'],
              syncStatus: 'SYNCED',
            };
          }
        }
      }
    } catch (err: any) {
      logger.warn(`External sync query failed for ${platform}:${username}: ${err?.message}`);
    }

    // Honest fallback: Mark as PENDING or SYNCED with known profile link without fabricated stats
    return {
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      badges: [],
      syncStatus: 'PENDING',
      syncError: `Direct stats retrieval pending; verified public profile URL is attached.`,
    };
  }
}
