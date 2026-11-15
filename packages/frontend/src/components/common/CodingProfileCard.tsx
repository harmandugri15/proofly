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
    <div className="w-full max-w-full min-w-0 p-6 sm:p-8 rounded-[28px] bg-white border-2 border-[#1F2C23] shadow-[5px_5px_0px_#1F2C23] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg bg-[#FFDE59] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] shrink-0">
            <Code2 className="w-7 h-7 text-[#1F2C23]" />
          </div>

          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-serif font-black text-[#1F2C23]">{theme.name}</h3>
              <span className="text-xs font-mono font-bold text-[#586E5F]">@{profile.username}</span>
              <EvidenceBadge status={profile.syncStatus} />
            </div>
            <p className="text-[11px] text-[#586E5F] font-mono font-bold">
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
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#1F2C23] text-xs font-mono font-black border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] transition-all"
          >
            <span>Platform Profile</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#1F2C23]" />
          </a>

          {showActions && onSync && (
            <button
              onClick={() => onSync(profile.id)}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#FEF9C3] hover:bg-[#FACC15] text-[#1F2C23] text-xs font-mono font-black border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] transition-all disabled:opacity-50"
              title="Sync latest platform statistics"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sync</span>
            </button>
          )}

          {showActions && onDelete && (
            <button
              onClick={() => onDelete(profile.id)}
              className="p-2.5 rounded-xl text-[#1F2C23] hover:text-[#DC2626] hover:bg-white border-2 border-transparent hover:border-[#1F2C23] transition-all"
              title="Remove profile integration"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Metrics Row (Neo-Brutalist Multi-Color Tiles) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-[#FEF9C3] border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] space-y-1">
          <div className="text-[11px] font-mono font-black text-[#1F2C23] uppercase flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] stroke-[3]" /> Total Solved
          </div>
          <div className="text-3xl font-serif font-black text-[#1F2C23]">
            {profile.totalSolved}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#DCFCE7] border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] space-y-1">
          <div className="text-[11px] font-mono font-black text-[#1F2C23] uppercase flex items-center gap-1.5">
            <Percent className="w-3.5 h-3.5 text-[#16A34A] stroke-[3]" /> Acceptance
          </div>
          <div className="text-3xl font-serif font-black text-[#166534]">
            {detailed?.acceptanceRate != null ? `${detailed.acceptanceRate}%` : (profile.totalSolved > 0 ? '--' : '0%')}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#FFEDD5] border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] space-y-1">
          <div className="text-[11px] font-mono font-black text-[#1F2C23] uppercase flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-[#D97043] stroke-[3]" /> Streak
          </div>
          <div className="text-3xl font-serif font-black text-[#D97043]">
            {detailed?.streakDays != null ? `${detailed.streakDays}d` : '0d'}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#E0F2FE] border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] space-y-1">
          <div className="text-[11px] font-mono font-black text-[#1F2C23] uppercase flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-[#0284C7] stroke-[3]" /> Rating / Rank
          </div>
          <div className="text-2xl font-serif font-black text-[#0369A1] truncate">
            {profile.rating ? `${profile.rating}` : profile.ranking ? `#${profile.ranking.toLocaleString()}` : detailed?.percentileRank != null ? `Top ${Math.max(1, 100 - detailed.percentileRank)}%` : (profile.totalSolved > 0 ? 'Active' : 'Unrated')}
          </div>
        </div>
      </div>

      {/* Difficulty Breakdown Bar */}
      <div className="p-5 rounded-2xl bg-[#FAF7F2] border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-serif font-black text-sm text-[#1F2C23] flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-[#D97043]" /> Difficulty Distribution
          </span>
          <span className="text-[11px] text-[#586E5F] font-mono font-bold">
            {profile.totalSolved} Problems Verified
          </span>
        </div>

        {/* Multi-segmented bar */}
        <div className="h-4 w-full rounded-xl bg-white border-2 border-[#1F2C23] overflow-hidden flex">
          <div
            style={{ width: `${easyPct}%` }}
            className="h-full bg-[#86EFAC] transition-all border-r border-[#1F2C23]"
            title={`Easy: ${profile.easySolved} (${easyPct}%)`}
          />
          <div
            style={{ width: `${medPct}%` }}
            className="h-full bg-[#FFDE59] transition-all border-r border-[#1F2C23]"
            title={`Medium: ${profile.mediumSolved} (${medPct}%)`}
          />
          <div
            style={{ width: `${hardPct}%` }}
            className="h-full bg-[#FF8A65] transition-all"
            title={`Hard: ${profile.hardSolved} (${hardPct}%)`}
          />
        </div>

        {/* Legend with counts */}
        <div className="grid grid-cols-3 gap-3 text-center text-xs pt-1">
          <div className="p-3 rounded-xl bg-white border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]">
            <span className="text-[10px] uppercase font-mono font-black text-[#166534] block">Easy</span>
            <span className="font-serif font-black text-[#1F2C23] text-base">{profile.easySolved}</span>
            <span className="text-[10px] text-[#586E5F] font-mono font-bold block">
              {detailed?.easyTotal ? `/ ${detailed.easyTotal}` : ''}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]">
            <span className="text-[10px] uppercase font-mono font-black text-[#854D0E] block">Medium</span>
            <span className="font-serif font-black text-[#1F2C23] text-base">{profile.mediumSolved}</span>
            <span className="text-[10px] text-[#586E5F] font-mono font-bold block">
              {detailed?.mediumTotal ? `/ ${detailed.mediumTotal}` : ''}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]">
            <span className="text-[10px] uppercase font-mono font-black text-[#9A3412] block">Hard</span>
            <span className="font-serif font-black text-[#1F2C23] text-base">{profile.hardSolved}</span>
            <span className="text-[10px] text-[#586E5F] font-mono font-bold block">
              {detailed?.hardTotal ? `/ ${detailed.hardTotal}` : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Top Algorithmic Skills & Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top Topics */}
        <div className="p-5 rounded-2xl bg-[#FAF7F2] border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] space-y-2">
          <span className="text-xs font-serif font-black text-[#1F2C23] flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-[#385241]" /> Algorithmic Focus Areas
          </span>
          <div className="flex flex-wrap gap-2 pt-1">
            {detailed?.topSkills && detailed.topSkills.length > 0 ? (
              detailed.topSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono font-black px-3 py-1 rounded-xl bg-white text-[#1F2C23] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]"
                >
                  #{skill}
                </span>
              ))
            ) : (
              <span className="text-xs font-mono text-[#586E5F] font-bold py-1">
                {profile.totalSolved > 0 ? 'Algorithms & Problem Solving' : 'No topics recorded'}
              </span>
            )}
          </div>
        </div>

        {/* Badges Earned */}
        <div className="p-5 rounded-2xl bg-[#FAF7F2] border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] space-y-2">
          <span className="text-xs font-serif font-black text-[#1F2C23] flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#D97043]" /> Platform Badges & Accreditations
          </span>
          <div className="flex flex-wrap gap-2 pt-1">
            {profile.badges && profile.badges.length > 0 ? (
              profile.badges.map((badge: string, idx: number) => (
                <span
                  key={idx}
                  className="text-xs font-mono font-black px-3 py-1 rounded-xl bg-[#FEF9C3] text-[#1F2C23] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]"
                >
                  🏆 {badge}
                </span>
              ))
            ) : (
              <span className="text-xs font-mono text-[#586E5F] font-bold py-1">
                {profile.totalSolved > 0 ? '🏆 Verified Platform Solver' : 'No badges recorded'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Recent Submissions List */}
      {detailed?.recentSubmissions && detailed.recentSubmissions.length > 0 && (
        <div className="space-y-3 bg-[#FAF7F2] p-5 rounded-2xl border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] w-full max-w-full overflow-hidden">
          <div className="flex items-center justify-between text-xs pb-1 border-b-2 border-[#1F2C23]/10">
            <span className="font-serif font-black text-sm text-[#1F2C23]">Recent Accepted Submissions</span>
            <span className="text-[11px] text-[#586E5F] font-mono font-bold">In-App Signal Verification</span>
          </div>

          <div className="space-y-2 pt-1">
            {detailed.recentSubmissions.map((sub, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-white border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-xs hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`text-[10px] font-mono px-2.5 py-0.5 rounded-md font-black shrink-0 border border-[#1F2C23] shadow-[1px_1px_0px_#1F2C23] ${
                      sub.difficulty.toLowerCase() === 'easy'
                        ? 'bg-[#86EFAC] text-[#1F2C23]'
                        : sub.difficulty.toLowerCase() === 'hard'
                        ? 'bg-[#FF8A65] text-[#1F2C23]'
                        : 'bg-[#FFDE59] text-[#1F2C23]'
                    }`}
                  >
                    {sub.difficulty}
                  </span>
                  <span className="font-black text-[#1F2C23] truncate max-w-[200px] sm:max-w-xs">{sub.title}</span>
                </div>

                <div className="flex items-center gap-2.5 font-mono text-[11px] font-bold text-[#586E5F] self-end sm:self-auto shrink-0">
                  <span className="px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#1F2C23] border border-[#1F2C23] shadow-[1px_1px_0px_#1F2C23]">{sub.language}</span>
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
