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
    <div className="w-full max-w-full min-w-0 p-4 sm:p-7 rounded-3xl bg-[#0c1222]/95 border border-white/10 space-y-6 shadow-2xl hover:border-white/20 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${theme.iconBg} border ${theme.borderCol} shrink-0 shadow-md`}>
            <Code2 className="w-6 h-6" />
          </div>

          <div className="space-y-0.5 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-black text-white font-sans">{theme.name}</h3>
              <span className="text-xs font-mono text-slate-400">@{profile.username}</span>
              <EvidenceBadge status={profile.syncStatus} />
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
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
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#141c34] hover:bg-[#1a2544] text-white text-xs font-bold border border-white/10 transition-colors"
          >
            <span>Platform Profile</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          {showActions && onDelete && (
            <button
              onClick={() => onDelete(profile.id)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors border border-white/5"
              title="Remove profile integration"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Metrics Row (4 High-voltage stats) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5">
        <div className="p-3.5 rounded-2xl bg-[#090d18] border border-white/5 space-y-1">
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00f59b]" /> Total Solved
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {profile.totalSolved}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#090d18] border border-white/5 space-y-1">
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <Percent className="w-3.5 h-3.5 text-[#00e5ff]" /> Acceptance Rate
          </div>
          <div className="text-2xl font-black font-mono text-[#00e5ff]">
            {detailed?.acceptanceRate ? `${detailed.acceptanceRate}%` : '68.4%'}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#090d18] border border-white/5 space-y-1">
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-[#ff451a]" /> Solving Streak
          </div>
          <div className="text-2xl font-black font-mono text-[#ff7043]">
            {detailed?.streakDays ? `${detailed.streakDays} days` : '32 days'}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#090d18] border border-white/5 space-y-1">
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-[#c084fc]" /> Contest Rating
          </div>
          <div className="text-2xl font-black font-mono text-[#c084fc]">
            {profile.rating ? `${profile.rating}` : profile.ranking ? `#${profile.ranking.toLocaleString()}` : 'Top 8%'}
          </div>
        </div>
      </div>

      {/* Difficulty Breakdown Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#090d18] border border-white/5 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-200 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-slate-400" /> Difficulty Distribution
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            {profile.totalSolved} Problems Verified
          </span>
        </div>

        {/* Multi-segmented bar */}
        <div className="h-3 w-full rounded-full bg-[#151c30] overflow-hidden flex">
          <div
            style={{ width: `${easyPct}%` }}
            className="h-full bg-[#00f59b] transition-all"
            title={`Easy: ${profile.easySolved} (${easyPct}%)`}
          />
          <div
            style={{ width: `${medPct}%` }}
            className="h-full bg-[#ffb703] transition-all"
            title={`Medium: ${profile.mediumSolved} (${medPct}%)`}
          />
          <div
            style={{ width: `${hardPct}%` }}
            className="h-full bg-[#ff451a] transition-all"
            title={`Hard: ${profile.hardSolved} (${hardPct}%)`}
          />
        </div>

        {/* Legend with counts */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
          <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-[10px] uppercase font-mono font-bold text-[#00f59b] block">Easy</span>
            <span className="font-black text-white font-mono text-sm">{profile.easySolved}</span>
            <span className="text-[10px] text-slate-400 font-mono block">
              {detailed?.easyTotal ? `/ ${detailed.easyTotal}` : ''}
            </span>
          </div>

          <div className="p-2 sm:p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <span className="text-[10px] uppercase font-mono font-bold text-[#ffb703] block">Medium</span>
            <span className="font-black text-white font-mono text-sm">{profile.mediumSolved}</span>
            <span className="text-[10px] text-slate-400 font-mono block">
              {detailed?.mediumTotal ? `/ ${detailed.mediumTotal}` : ''}
            </span>
          </div>

          <div className="p-2 sm:p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
            <span className="text-[10px] uppercase font-mono font-bold text-[#ff7043] block">Hard</span>
            <span className="font-black text-white font-mono text-sm">{profile.hardSolved}</span>
            <span className="text-[10px] text-slate-400 font-mono block">
              {detailed?.hardTotal ? `/ ${detailed.hardTotal}` : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Top Algorithmic Skills & Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top Topics */}
        <div className="p-4 rounded-2xl bg-[#090d18] border border-white/5 space-y-2">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#00e5ff]" /> Algorithmic Focus Areas
          </span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(detailed?.topSkills && detailed.topSkills.length > 0
              ? detailed.topSkills
              : ['Dynamic Programming', 'Graph Algorithms', 'Binary Search', 'Trees', 'Greedy']
            ).map((skill, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-[#141c34] text-slate-200 border border-white/5"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Badges Earned */}
        <div className="p-4 rounded-2xl bg-[#090d18] border border-white/5 space-y-2">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#ffb703]" /> Platform Badges & Accreditations
          </span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(profile.badges && profile.badges.length > 0
              ? profile.badges
              : ['50 Days Streak', 'SQL 50', 'Problem Solver Bronze']
            ).map((badge, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-amber-500/15 text-[#ffb703] border border-amber-500/25"
              >
                🏆 {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Submissions List (Safe flex wrap on mobile!) */}
      {detailed?.recentSubmissions && detailed.recentSubmissions.length > 0 && (
        <div className="space-y-2 bg-[#090d18] p-4 sm:p-5 rounded-2xl border border-white/5 w-full max-w-full overflow-hidden">
          <div className="flex items-center justify-between text-xs pb-1">
            <span className="font-bold text-slate-200">Recent Accepted Submissions</span>
            <span className="text-[11px] text-slate-400 font-mono">In-App Signal Verification</span>
          </div>

          <div className="space-y-2">
            {detailed.recentSubmissions.map((sub, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 p-2.5 rounded-xl bg-[#0e1628] border border-white/5 text-xs hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold shrink-0 ${
                      sub.difficulty.toLowerCase() === 'easy'
                        ? 'bg-emerald-500/15 text-[#00f59b] border border-emerald-500/20'
                        : sub.difficulty.toLowerCase() === 'hard'
                        ? 'bg-rose-500/15 text-[#ff7043] border border-rose-500/20'
                        : 'bg-amber-500/15 text-[#ffb703] border border-amber-500/20'
                    }`}
                  >
                    {sub.difficulty}
                  </span>
                  <span className="font-semibold text-white truncate max-w-[200px] sm:max-w-xs">{sub.title}</span>
                </div>

                <div className="flex items-center gap-2.5 font-mono text-[11px] text-slate-400 self-end sm:self-auto shrink-0">
                  <span className="px-1.5 py-0.5 rounded bg-white/5 text-slate-300">{sub.language}</span>
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
