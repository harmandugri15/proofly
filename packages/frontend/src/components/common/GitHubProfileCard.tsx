import React from 'react';
import { GitHubProfileStats, GitHubRepoItem } from '@proofly/shared';
import { Github, Users, Star, GitFork, BookOpen, ExternalLink, RefreshCw, CheckCircle2 } from 'lucide-react';
import { ContributionHeatmap } from './ContributionHeatmap';

interface GitHubProfileCardProps {
  githubUsername?: string | null;
  githubStats?: GitHubProfileStats | null;
  repos?: GitHubRepoItem[];
  onSync?: () => void;
  isSyncing?: boolean;
  showSyncButton?: boolean;
}

export const GitHubProfileCard: React.FC<GitHubProfileCardProps> = ({
  githubUsername,
  githubStats,
  repos = [],
  onSync,
  isSyncing = false,
  showSyncButton = false,
}) => {
  const effectiveUsername = githubStats?.username || githubUsername;

  if (!effectiveUsername && !githubStats) {
    return (
      <div className="w-full max-w-full min-w-0 p-8 rounded-3xl bg-[#0e1426]/80 border border-white/10 text-center space-y-3 shadow-xl">
        <Github className="w-10 h-10 text-slate-500 mx-auto" />
        <h3 className="text-sm font-bold text-white">No GitHub Profile Connected</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Connect your GitHub account or enter your public handle to import repositories, language distributions, and the 52-week contribution heatmap.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full min-w-0 rounded-3xl bg-[#0c1222]/95 border border-white/10 overflow-hidden shadow-2xl space-y-6 p-4 sm:p-7">
      {/* Top Banner / User Meta */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-4 min-w-0">
          {githubStats?.avatarUrl ? (
            <img
              src={githubStats.avatarUrl}
              alt={effectiveUsername || 'GitHub User'}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 border-emerald-500/40 object-cover shadow-lg shrink-0"
            />
          ) : (
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#141c34] border-2 border-white/10 flex items-center justify-center text-white shrink-0">
              <Github className="w-7 h-7 text-[#00f59b]" />
            </div>
          )}

          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-white truncate font-sans">
                {githubStats?.username || effectiveUsername}
              </h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-[#00f59b] border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3" /> Verified GitHub
              </span>
            </div>

            {githubStats?.bio && (
              <p className="text-xs text-slate-300 max-w-xl line-clamp-2 leading-relaxed">{githubStats.bio}</p>
            )}

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-400 pt-1 font-mono">
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                <strong className="text-white">{githubStats?.publicRepos ?? repos.length}</strong> repos
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400" />
                <strong className="text-white">{githubStats?.totalStars ?? 0}</strong> stars earned
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#00e5ff]" />
                <strong className="text-white">{githubStats?.followers ?? 0}</strong> followers
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="w-3.5 h-3.5 text-slate-400" />
                <strong className="text-white">{githubStats?.totalForks ?? 0}</strong> forks
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
          {showSyncButton && onSync && (
            <button
              onClick={onSync}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] disabled:opacity-50 text-white text-xs font-bold border border-white/10 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Refresh Activity'}
            </button>
          )}

          <a
            href={`https://github.com/${effectiveUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#141c34] hover:bg-[#1a2544] text-white text-xs font-bold border border-white/10 transition-colors"
          >
            <Github className="w-3.5 h-3.5 text-[#00f59b]" />
            <span>Open GitHub</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Language Distribution Bar */}
      {githubStats?.topLanguages && githubStats.topLanguages.length > 0 && (
        <div className="space-y-2 bg-[#090d18] p-4 rounded-2xl border border-white/5 w-full max-w-full overflow-hidden">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-200">Top Languages</span>
            <span className="text-[11px] text-slate-400 font-mono">By Byte Volume Across Repositories</span>
          </div>

          {/* Progress bar segments */}
          <div className="h-2.5 w-full rounded-full bg-[#151c30] overflow-hidden flex">
            {githubStats.topLanguages.map((lang, idx) => (
              <div
                key={idx}
                style={{
                  width: `${lang.percentage}%`,
                  backgroundColor: lang.color || '#3b82f6',
                }}
                className="h-full transition-all"
                title={`${lang.language}: ${lang.percentage}%`}
              />
            ))}
          </div>

          {/* Legend items */}
          <div className="flex flex-wrap gap-3 pt-1">
            {githubStats.topLanguages.map((lang, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                  style={{ backgroundColor: lang.color || '#3b82f6' }}
                />
                <span className="text-slate-300 font-semibold">{lang.language}</span>
                <span className="text-slate-400 font-mono text-[11px]">{lang.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 52-Week Contribution Activity Heatmap */}
      <ContributionHeatmap
        contributions={githubStats?.contributions || []}
        totalCommitsLastYear={githubStats?.totalCommitsLastYear || 0}
        currentStreak={githubStats?.currentStreak || 0}
        longestStreak={githubStats?.longestStreak || 0}
        username={effectiveUsername || undefined}
      />
    </div>
  );
};
