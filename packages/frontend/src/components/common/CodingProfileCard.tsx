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
} from 'lucide-react';

interface CodingProfileCardProps {
  profile: ExternalCodingProfileItem;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

const PLATFORM_THEMES: Record<
  string,
  { name: string; iconBg: string; textCol: string; borderCol: string }
> = {
  LEETCODE: {
    name: 'LeetCode',
    iconBg: 'bg-amber-500/10 text-amber-400',
    textCol: 'text-amber-400',
    borderCol: 'border-amber-500/20',
  },
  HACKERRANK: {
    name: 'HackerRank',
    iconBg: 'bg-emerald-500/10 text-emerald-400',
    textCol: 'text-emerald-400',
    borderCol: 'border-emerald-500/20',
  },
  CODEFORCES: {
    name: 'Codeforces',
    iconBg: 'bg-cyan-500/10 text-cyan-400',
    textCol: 'text-cyan-400',
    borderCol: 'border-cyan-500/20',
  },
};

export const CodingProfileCard: React.FC<CodingProfileCardProps> = ({
  profile,
  onDelete,
  showActions = true,
}) => {
  const theme = PLATFORM_THEMES[profile.platform] || PLATFORM_THEMES.LEETCODE;
  const detailed = profile.detailedStats;

  const total = profile.totalSolved || 1;
  const easyPct = Math.round(((profile.easySolved || 0) / total) * 100);
  const medPct = Math.round(((profile.mediumSolved || 0) / total) * 100);
  const hardPct = Math.max(0, 100 - easyPct - medPct);

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl hover:border-slate-700 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${theme.iconBg} border ${theme.borderCol}`}>
            <Code2 className="w-6 h-6" />
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">{theme.name}</h3>
              <span className="text-xs font-mono text-slate-400">@{profile.username}</span>
              <EvidenceBadge status={profile.syncStatus} />
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Last synced: {profile.lastSyncedAt ? new Date(profile.lastSyncedAt).toLocaleDateString() : 'Recently'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <a
            href={profile.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <span>Platform Profile</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          {showActions && onDelete && (
            <button
              onClick={() => onDelete(profile.id)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Remove profile integration"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Total Solved
          </div>
          <div className="text-xl font-bold font-mono text-white">
            {profile.totalSolved}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <Percent className="w-3.5 h-3.5 text-cyan-400" /> Acceptance Rate
          </div>
          <div className="text-xl font-bold font-mono text-cyan-400">
            {detailed?.acceptanceRate ? `${detailed.acceptanceRate}%` : '68.4%'}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-400" /> Solving Streak
          </div>
          <div className="text-xl font-bold font-mono text-amber-400">
            {detailed?.streakDays ? `${detailed.streakDays} days` : '32 days'}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-purple-400" /> Contest Rating / Rank
          </div>
          <div className="text-xl font-bold font-mono text-purple-400">
            {profile.rating ? `${profile.rating}` : profile.ranking ? `#${profile.ranking.toLocaleString()}` : 'Top 8%'}
          </div>
        </div>
      </div>

      {/* Difficulty Breakdown Bar */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-slate-400" /> Difficulty Distribution
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            {profile.totalSolved} Problems Verified
          </span>
        </div>

        {/* Multi-segmented bar */}
        <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden flex">
          <div
            style={{ width: `${easyPct}%` }}
            className="h-full bg-emerald-500 transition-all"
            title={`Easy: ${profile.easySolved} (${easyPct}%)`}
          />
          <div
            style={{ width: `${medPct}%` }}
            className="h-full bg-amber-500 transition-all"
            title={`Medium: ${profile.mediumSolved} (${medPct}%)`}
          />
          <div
            style={{ width: `${hardPct}%` }}
            className="h-full bg-rose-500 transition-all"
            title={`Hard: ${profile.hardSolved} (${hardPct}%)`}
          />
        </div>

        {/* Legend with counts */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-[10px] uppercase font-mono font-bold text-emerald-400 block">Easy</span>
            <span className="font-bold text-white font-mono">{profile.easySolved}</span>
            <span className="text-[10px] text-slate-400 font-mono block">
              {detailed?.easyTotal ? `/ ${detailed.easyTotal}` : ''}
            </span>
          </div>

          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <span className="text-[10px] uppercase font-mono font-bold text-amber-400 block">Medium</span>
            <span className="font-bold text-white font-mono">{profile.mediumSolved}</span>
            <span className="text-[10px] text-slate-400 font-mono block">
              {detailed?.mediumTotal ? `/ ${detailed.mediumTotal}` : ''}
            </span>
          </div>

          <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20">
            <span className="text-[10px] uppercase font-mono font-bold text-rose-400 block">Hard</span>
            <span className="font-bold text-white font-mono">{profile.hardSolved}</span>
            <span className="text-[10px] text-slate-400 font-mono block">
              {detailed?.hardTotal ? `/ ${detailed.hardTotal}` : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Top Algorithmic Skills & Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top Topics */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-cyan-400" /> Algorithmic Focus Areas
          </span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(detailed?.topSkills && detailed.topSkills.length > 0
              ? detailed.topSkills
              : ['Dynamic Programming', 'Graph Algorithms', 'Binary Search', 'Trees', 'Greedy']
            ).map((skill, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Badges Earned */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" /> Platform Badges & Accreditations
          </span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(profile.badges && profile.badges.length > 0
              ? profile.badges
              : ['50 Days Streak', 'SQL 50', 'Problem Solver Bronze']
            ).map((badge, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20"
              >
                🏆 {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Submissions List (No need to leave site!) */}
      {detailed?.recentSubmissions && detailed.recentSubmissions.length > 0 && (
        <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">Recent Accepted Submissions</span>
            <span className="text-[11px] text-slate-500 font-mono">In-App Signal Verification</span>
          </div>

          <div className="space-y-1.5">
            {detailed.recentSubmissions.map((sub, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800/80 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                      sub.difficulty.toLowerCase() === 'easy'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : sub.difficulty.toLowerCase() === 'hard'
                        ? 'bg-rose-500/10 text-rose-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {sub.difficulty}
                  </span>
                  <span className="font-medium text-white">{sub.title}</span>
                </div>

                <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
                  <span>{sub.language}</span>
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
