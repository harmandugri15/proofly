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
      <div className="w-full max-w-full min-w-0 p-8 rounded-3xl bg-white/95 border border-sand-200/80 text-center space-y-3 shadow-sm">
        <Github className="w-10 h-10 text-forest-700/40 mx-auto" />
        <h3 className="text-sm font-serif font-normal text-forest-900">No GitHub Profile Connected</h3>
        <p className="text-xs text-forest-700/70 max-w-md mx-auto">
          Connect your GitHub account or enter your public handle to import repositories, language distributions, and the 52-week contribution heatmap.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full min-w-0 rounded-3xl bg-white/95 border border-sand-200/80 overflow-hidden shadow-sm space-y-6 p-5 sm:p-7">
      {/* Top Banner / User Meta */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-4 min-w-0">
          {githubStats?.avatarUrl ? (
            <img
              src={githubStats.avatarUrl}
              alt={effectiveUsername || 'GitHub User'}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 border-sage-300 object-cover shadow-sm shrink-0"
            />
          ) : (
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-sand-100 border-2 border-sand-200 flex items-center justify-center text-forest-900 shrink-0">
              <Github className="w-7 h-7 text-forest-900" />
            </div>
          )}

          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base sm:text-lg font-serif font-normal text-forest-900 truncate">
                {githubStats?.username || effectiveUsername}
              </h3>
              <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sage-50 text-sage-800 border border-sage-200">
                <CheckCircle2 className="w-3 h-3 text-sage-600" /> Verified GitHub
              </span>
            </div>

            {githubStats?.bio && (
              <p className="text-xs text-forest-700/80 max-w-xl line-clamp-2 leading-relaxed">{githubStats.bio}</p>
            )}

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-forest-700/60 pt-1 font-mono">
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-forest-700/50" />
                <strong className="text-forest-900 font-bold">{githubStats?.publicRepos ?? repos.length}</strong> repos
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-500" />
                <strong className="text-forest-900 font-bold">{githubStats?.totalStars ?? 0}</strong> stars earned
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-sage-600" />
                <strong className="text-forest-900 font-bold">{githubStats?.followers ?? 0}</strong> followers
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="w-3.5 h-3.5 text-forest-700/50" />
                <strong className="text-forest-900 font-bold">{githubStats?.totalForks ?? 0}</strong> forks
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
          {showSyncButton && onSync && (
            <button
              onClick={onSync}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-sand-100 hover:bg-sand-200 disabled:opacity-50 text-forest-900 text-xs font-mono font-medium border border-sand-200 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Refresh Activity'}
            </button>
          )}

          <a
            href={`https://github.com/${effectiveUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-forest-900 hover:bg-forest-800 text-white text-xs font-mono font-medium transition-colors shadow-sm"
          >
            <Github className="w-3.5 h-3.5 text-sand-200" />
            <span className="text-white">Open GitHub</span>
            <ExternalLink className="w-3 h-3 text-sand-200" />
          </a>
        </div>
      </div>

      {/* Language Distribution Bar */}
      {githubStats?.topLanguages && githubStats.topLanguages.length > 0 && (
        <div className="space-y-2 bg-sand-50/80 p-4 rounded-2xl border border-sand-200/80 w-full max-w-full overflow-hidden">
          <div className="flex items-center justify-between text-xs">
            <span className="font-serif font-normal text-forest-900">Top Languages</span>
            <span className="text-[11px] text-forest-700/60 font-mono">By Byte Volume Across Repositories</span>
          </div>

          {/* Progress bar segments */}
          <div className="h-2.5 w-full rounded-full bg-sand-200 overflow-hidden flex">
            {githubStats.topLanguages.map((lang, idx) => (
              <div
                key={idx}
                style={{
                  width: `${lang.percentage}%`,
                  backgroundColor: lang.color || '#7D9B86',
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
                  style={{ backgroundColor: lang.color || '#7D9B86' }}
                />
                <span className="text-forest-900 font-medium">{lang.language}</span>
                <span className="text-forest-700/60 font-mono text-[11px]">{lang.percentage}%</span>
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
