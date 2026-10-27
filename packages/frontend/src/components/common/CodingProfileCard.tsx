import React from 'react';
import { ExternalCodingProfileItem } from '@proofly/shared';
import { EvidenceBadge } from './EvidenceBadge';
import {
  Code2,
  ExternalLink,
  Flame,
  Percent,
  Trophy,
  Award,
  CheckCircle2,
  Trash2,
  Activity,
  Layers,
  RefreshCw,
} from 'lucide-react';

interface CodingProfileCardProps {
  profile: ExternalCodingProfileItem;
  onDelete?: (id: string) => void;
  onSync?: (id: string) => void | Promise<void>;
  isSyncing?: boolean;
  showActions?: boolean;
}

const PLATFORM_THEMES: Record<
  string,
  { name: string; iconBg: string; textCol: string; borderCol: string }
> = {
  LEETCODE: {
    name: 'LeetCode',
    iconBg: 'bg-amber-50 text-amber-700',
    textCol: 'text-amber-800',
    borderCol: 'border-amber-200',
  },
  HACKERRANK: {
    name: 'HackerRank',
    iconBg: 'bg-sage-50 text-sage-700',
    textCol: 'text-sage-800',
    borderCol: 'border-sage-200',
  },
  CODEFORCES: {
    name: 'Codeforces',
    iconBg: 'bg-sky-50 text-sky-700',
    textCol: 'text-sky-800',
    borderCol: 'border-sky-200',
  },
};

export const CodingProfileCard: React.FC<CodingProfileCardProps> = ({
  profile,
  onDelete,
  onSync,
  isSyncing = false,
  showActions = true,
}) => {
  const theme = PLATFORM_THEMES[profile.platform] || PLATFORM_THEMES.LEETCODE;
  const detailed = profile.detailedStats;

  const total = profile.totalSolved || 1;
  const easyPct = Math.round(((profile.easySolved || 0) / total) * 100);
  const medPct = Math.round(((profile.mediumSolved || 0) / total) * 100);
  const hardPct = Math.max(0, 100 - easyPct - medPct);

  return (
    <div className="w-full max-w-full min-w-0 p-5 sm:p-7 rounded-3xl bg-white/95 border border-sand-200/80 space-y-6 shadow-sm hover:border-sage-400/60 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${theme.iconBg} border ${theme.borderCol} shrink-0 shadow-2xs`}>
            <Code2 className="w-6 h-6" />
          </div>

          <div className="space-y-0.5 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-serif font-normal text-forest-900">{theme.name}</h3>
              <span className="text-xs font-mono text-forest-700/60">@{profile.username}</span>
              <EvidenceBadge status={profile.syncStatus} />
            </div>
            <p className="text-[11px] text-forest-700/50 font-mono">
              Last synced: {profile.lastSyncedAt ? new Date(profile.lastSyncedAt).toLocaleDateString() : 'Recently'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
          <a
            href={profile.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-sand-100 hover:bg-sand-200 text-forest-900 text-xs font-mono font-medium border border-sand-200 transition-colors"
          >
            <span>Platform Profile</span>
            <ExternalLink className="w-3.5 h-3.5 text-forest-700/50" />
          </a>

          {showActions && onSync && (
            <button
              onClick={() => onSync(profile.id)}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-sand-100 hover:bg-sand-200 text-forest-900 text-xs font-mono font-medium border border-sand-200 transition-colors disabled:opacity-50"
              title="Sync latest platform statistics"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sync</span>
            </button>
          )}

          {showActions && onDelete && (
            <button
              onClick={() => onDelete(profile.id)}
              className="p-2 rounded-full text-forest-700/60 hover:text-terracotta-600 hover:bg-terracotta-50 transition-colors border border-sand-200"
              title="Remove profile integration"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5">
        <div className="p-3.5 rounded-2xl bg-sand-50/80 border border-sand-200/80 space-y-1">
          <div className="text-[11px] font-mono text-forest-700/60 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-sage-600" /> Total Solved
          </div>
          <div className="text-2xl font-serif font-normal text-forest-900">
            {profile.totalSolved}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-sand-50/80 border border-sand-200/80 space-y-1">
          <div className="text-[11px] font-mono text-forest-700/60 flex items-center gap-1">
            <Percent className="w-3.5 h-3.5 text-sage-600" /> Acceptance Rate
          </div>
          <div className="text-2xl font-serif font-normal text-sage-700">
            {detailed?.acceptanceRate != null ? `${detailed.acceptanceRate}%` : (profile.totalSolved > 0 ? '--' : '0%')}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-sand-50/80 border border-sand-200/80 space-y-1">
          <div className="text-[11px] font-mono text-forest-700/60 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-terracotta-600" /> Solving Streak
          </div>
          <div className="text-2xl font-serif font-normal text-terracotta-600">
            {detailed?.streakDays != null ? `${detailed.streakDays} days` : '0 days'}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-sand-50/80 border border-sand-200/80 space-y-1">
          <div className="text-[11px] font-mono text-forest-700/60 flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-amber-600" /> Contest Rating
          </div>
          <div className="text-2xl font-serif font-normal text-amber-700">
            {profile.rating ? `${profile.rating}` : profile.ranking ? `#${profile.ranking.toLocaleString()}` : detailed?.percentileRank != null ? `Top ${Math.max(1, 100 - detailed.percentileRank)}%` : (profile.totalSolved > 0 ? 'Active' : 'Unrated')}
          </div>
        </div>
      </div>

      {/* Difficulty Breakdown Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-sand-50/80 border border-sand-200/80 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-serif font-normal text-forest-900 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-forest-700/60" /> Difficulty Distribution
          </span>
          <span className="text-[11px] text-forest-700/60 font-mono">
            {profile.totalSolved} Problems Verified
          </span>
        </div>

        {/* Multi-segmented bar */}
        <div className="h-3 w-full rounded-full bg-sand-200 overflow-hidden flex">
          <div
            style={{ width: `${easyPct}%` }}
            className="h-full bg-[#7D9B86] transition-all"
            title={`Easy: ${profile.easySolved} (${easyPct}%)`}
          />
          <div
            style={{ width: `${medPct}%` }}
            className="h-full bg-[#E5A93C] transition-all"
            title={`Medium: ${profile.mediumSolved} (${medPct}%)`}
          />
          <div
            style={{ width: `${hardPct}%` }}
            className="h-full bg-[#D97043] transition-all"
            title={`Hard: ${profile.hardSolved} (${hardPct}%)`}
          />
        </div>

        {/* Legend with counts */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
          <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-sand-200">
            <span className="text-[10px] uppercase font-mono font-bold text-sage-800 block">Easy</span>
            <span className="font-serif font-normal text-forest-900 text-sm">{profile.easySolved}</span>
            <span className="text-[10px] text-forest-700/50 font-mono block">
              {detailed?.easyTotal ? `/ ${detailed.easyTotal}` : ''}
            </span>
          </div>

          <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-sand-200">
            <span className="text-[10px] uppercase font-mono font-bold text-amber-800 block">Medium</span>
            <span className="font-serif font-normal text-forest-900 text-sm">{profile.mediumSolved}</span>
            <span className="text-[10px] text-forest-700/50 font-mono block">
              {detailed?.mediumTotal ? `/ ${detailed.mediumTotal}` : ''}
            </span>
          </div>

          <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-sand-200">
            <span className="text-[10px] uppercase font-mono font-bold text-terracotta-800 block">Hard</span>
            <span className="font-serif font-normal text-forest-900 text-sm">{profile.hardSolved}</span>
            <span className="text-[10px] text-forest-700/50 font-mono block">
              {detailed?.hardTotal ? `/ ${detailed.hardTotal}` : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Top Algorithmic Skills & Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top Topics */}
        <div className="p-4 rounded-2xl bg-sand-50/80 border border-sand-200/80 space-y-2">
          <span className="text-xs font-serif font-normal text-forest-900 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-sage-600" /> Algorithmic Focus Areas
          </span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {detailed?.topSkills && detailed.topSkills.length > 0 ? (
              detailed.topSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-mono px-3 py-1 rounded-full bg-white text-forest-800 border border-sand-200"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-xs font-mono text-forest-700/50 py-1">
                {profile.totalSolved > 0 ? 'Algorithms & Problem Solving' : 'No topics recorded'}
              </span>
            )}
          </div>
        </div>

        {/* Badges Earned */}
        <div className="p-4 rounded-2xl bg-sand-50/80 border border-sand-200/80 space-y-2">
          <span className="text-xs font-serif font-normal text-forest-900 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-600" /> Platform Badges & Accreditations
          </span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {profile.badges && profile.badges.length > 0 ? (
              profile.badges.map((badge, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-mono px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200"
                >
                  🏆 {badge}
                </span>
              ))
            ) : (
              <span className="text-xs font-mono text-forest-700/50 py-1">
                {profile.totalSolved > 0 ? '🏆 Verified Platform Solver' : 'No badges recorded'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Recent Submissions List */}
      {detailed?.recentSubmissions && detailed.recentSubmissions.length > 0 && (
        <div className="space-y-2 bg-sand-50/80 p-4 sm:p-5 rounded-2xl border border-sand-200/80 w-full max-w-full overflow-hidden">
          <div className="flex items-center justify-between text-xs pb-1">
            <span className="font-serif font-normal text-forest-900">Recent Accepted Submissions</span>
            <span className="text-[11px] text-forest-700/60 font-mono">In-App Signal Verification</span>
          </div>

          <div className="space-y-2">
            {detailed.recentSubmissions.map((sub, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 p-3 rounded-xl bg-white border border-sand-200 text-xs hover:border-sage-400/50 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold shrink-0 ${
                      sub.difficulty.toLowerCase() === 'easy'
                        ? 'bg-sage-50 text-sage-800 border border-sage-200'
                        : sub.difficulty.toLowerCase() === 'hard'
                        ? 'bg-terracotta-50 text-terracotta-800 border border-terracotta-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {sub.difficulty}
                  </span>
                  <span className="font-medium text-forest-900 truncate max-w-[200px] sm:max-w-xs">{sub.title}</span>
                </div>

                <div className="flex items-center gap-2.5 font-mono text-[11px] text-forest-700/60 self-end sm:self-auto shrink-0">
                  <span className="px-2 py-0.5 rounded-full bg-sand-100 text-forest-800 border border-sand-200">{sub.language}</span>
                  <span>{sub.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
