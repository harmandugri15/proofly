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
      <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
        <Github className="w-10 h-10 text-slate-600 mx-auto" />
        <h3 className="text-sm font-bold text-white">No GitHub Profile Connected</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Connect your GitHub account or enter your public handle to import repositories, language distributions, and the 52-week contribution heatmap.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl space-y-6 p-6">
      {/* Top Banner / User Meta */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {githubStats?.avatarUrl ? (
            <img
              src={githubStats.avatarUrl}
              alt={effectiveUsername || 'GitHub User'}
              className="w-16 h-16 rounded-2xl border-2 border-slate-700 object-cover shadow-lg"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-white">
              <Github className="w-8 h-8" />
            </div>
          )}

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">
                {githubStats?.username || effectiveUsername}
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-3 h-3" /> Verified GitHub
              </span>
            </div>

            {githubStats?.bio && (
              <p className="text-xs text-slate-300 max-w-xl line-clamp-2">{githubStats.bio}</p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1 font-mono">
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                <strong className="text-white">{githubStats?.publicRepos ?? repos.length}</strong> repos
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400" />
                <strong className="text-white">{githubStats?.totalStars ?? 0}</strong> stars earned
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <strong className="text-white">{githubStats?.followers ?? 0}</strong> followers
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="w-3.5 h-3.5 text-slate-400" />
                <strong className="text-white">{githubStats?.totalForks ?? 0}</strong> forks
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {showSyncButton && onSync && (
            <button
              onClick={onSync}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Refresh Activity'}
            </button>
          )}

          <a
            href={`https://github.com/${effectiveUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>Open GitHub</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Language Distribution Bar */}
      {githubStats?.topLanguages && githubStats.topLanguages.length > 0 && (
        <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">Top Languages</span>
            <span className="text-[11px] text-slate-500 font-mono">By Byte Volume Across Repositories</span>
          </div>

          {/* Progress bar segments */}
          <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden flex">
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
          <div className="flex flex-wrap gap-4 pt-1">
            {githubStats.topLanguages.map((lang, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: lang.color || '#3b82f6' }}
                />
                <span className="text-slate-300 font-medium">{lang.language}</span>
                <span className="text-slate-500 font-mono text-[11px]">{lang.percentage}%</span>
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
