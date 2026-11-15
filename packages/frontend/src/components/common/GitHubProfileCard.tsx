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
      <div className="w-full max-w-full min-w-0 p-8 rounded-[28px] bg-white border-2 border-[#1F2C23] shadow-[5px_5px_0px_#1F2C23] text-center space-y-3">
        <Github className="w-12 h-12 text-[#1F2C23] mx-auto" />
        <h3 className="text-base font-serif font-black text-[#1F2C23]">No GitHub Profile Connected</h3>
        <p className="text-xs text-[#586E5F] max-w-md mx-auto font-medium leading-relaxed">
          Connect your GitHub account or enter your public handle to import repositories, language distributions, and the 52-week contribution heatmap.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full min-w-0 rounded-[28px] bg-white border-2 border-[#1F2C23] shadow-[5px_5px_0px_#1F2C23] space-y-6 p-6 sm:p-8">
      {/* Top Banner / User Meta */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-4 min-w-0">
          {githubStats?.avatarUrl ? (
            <img
              src={githubStats.avatarUrl}
              alt={effectiveUsername || 'GitHub User'}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] object-cover shrink-0"
            />
          ) : (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#FFDE59] border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] flex items-center justify-center text-[#1F2C23] shrink-0">
              <Github className="w-8 h-8 text-[#1F2C23]" />
            </div>
          )}

          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg sm:text-xl font-serif font-black text-[#1F2C23] truncate">
                {githubStats?.username || effectiveUsername}
              </h3>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-mono font-black bg-[#86EFAC] text-[#1F2C23] border-2 border-[#1F2C23] shadow-[1px_1px_0px_#1F2C23]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1F2C23] stroke-[3]" /> VERIFIED GITHUB
              </span>
            </div>

            {githubStats?.bio && (
              <p className="text-xs text-[#24362A] max-w-xl font-medium line-clamp-2 leading-relaxed">{githubStats.bio}</p>
            )}

            <div className="flex flex-wrap items-center gap-2.5 pt-1.5 font-mono">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#FEF9C3] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-xs font-black text-[#1F2C23]">
                <BookOpen className="w-3.5 h-3.5 text-[#1F2C23]" />
                <span>{githubStats?.publicRepos ?? repos.length} Repos</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#FFEDD5] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-xs font-black text-[#1F2C23]">
                <Star className="w-3.5 h-3.5 text-[#D97043]" />
                <span>{githubStats?.totalStars ?? 0} Stars</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#E0F2FE] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-xs font-black text-[#1F2C23]">
                <Users className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>{githubStats?.followers ?? 0} Followers</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#DCFCE7] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-xs font-black text-[#1F2C23]">
                <GitFork className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>{githubStats?.totalForks ?? 0} Forks</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
          {showSyncButton && onSync && (
            <button
              onClick={onSync}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-[#FAF7F2] disabled:opacity-50 text-[#1F2C23] text-xs font-mono font-black border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Refresh Activity'}
            </button>
          )}

          <a
            href={`https://github.com/${effectiveUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1F2C23] hover:bg-[#385241] text-white text-xs font-mono font-black border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          >
            <Github className="w-3.5 h-3.5 text-white" />
            <span className="text-white">Open GitHub</span>
            <ExternalLink className="w-3 h-3 text-white" />
          </a>
        </div>
      </div>

      {/* Language Distribution Bar */}
      {githubStats?.topLanguages && githubStats.topLanguages.length > 0 && (
        <div className="space-y-3 bg-[#FAF7F2] p-5 rounded-2xl border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] w-full max-w-full overflow-hidden">
          <div className="flex items-center justify-between text-xs">
            <span className="font-serif font-black text-sm text-[#1F2C23]">Language Distribution</span>
            <span className="text-[11px] text-[#586E5F] font-mono font-bold">By Byte Volume Across Repositories</span>
          </div>

          {/* Progress bar segments */}
          <div className="h-4 w-full rounded-xl bg-white border-2 border-[#1F2C23] overflow-hidden flex">
            {githubStats.topLanguages.map((lang, idx) => (
              <div
                key={idx}
                style={{
                  width: `${lang.percentage}%`,
                  backgroundColor: lang.color || '#86EFAC',
                }}
                className="h-full transition-all border-r border-[#1F2C23] last:border-r-0"
                title={`${lang.language}: ${lang.percentage}%`}
              />
            ))}
          </div>

          {/* Legend items */}
          <div className="flex flex-wrap gap-3 pt-1">
            {githubStats.topLanguages.map((lang, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs font-mono font-bold">
                <span
                  className="w-3 h-3 rounded-md border border-[#1F2C23] inline-block shrink-0 shadow-[1px_1px_0px_#1F2C23]"
                  style={{ backgroundColor: lang.color || '#86EFAC' }}
                />
                <span className="text-[#1F2C23] font-black">{lang.language}</span>
                <span className="text-[#586E5F]">{lang.percentage}%</span>
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
