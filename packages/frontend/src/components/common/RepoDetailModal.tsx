import React from 'react';
import {
  Github,
  ExternalLink,
  Star,
  GitFork,
  CheckCircle2,
  GitCommit,
  X,
  Code2,
  Calendar,
  AlertCircle,
} from 'lucide-react';

export interface RepoDetailModalProps {
  repo: any | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RepoDetailModal: React.FC<RepoDetailModalProps> = ({
  repo,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !repo) return null;

  return (
    <div className="fixed inset-0 bg-[#1F2C23]/75 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div
        className="relative w-full max-w-xl max-h-[90vh] flex flex-col rounded-[28px] bg-[#FAF7F2] border-2 border-[#1F2C23] shadow-[8px_8px_0px_#1F2C23] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#385241] text-white border-b-2 border-[#1F2C23] flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-md bg-[#86EFAC] text-[#1F2C23] border border-[#1F2C23] shadow-[1px_1px_0px_#1F2C23]">
                SYNCHRONIZED REPOSITORY
              </span>
              {repo.isPrivate && (
                <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-md bg-[#FEF9C3] text-[#1F2C23] border border-[#1F2C23]">
                  PRIVATE
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-black text-white leading-tight truncate">
              {repo.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-xl bg-white hover:bg-[#FEF9C3] text-[#1F2C23] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] flex items-center justify-center active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all shrink-0"
          >
            <X className="w-5 h-5 text-[#1F2C23]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {/* Description */}
          <div className="p-4 rounded-2xl bg-white border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23]">
            <span className="text-[10px] font-mono font-black uppercase text-[#586E5F] block mb-1">
              Repository Synopsis
            </span>
            <p className="text-xs sm:text-sm text-[#1F2C23] font-medium leading-relaxed">
              {repo.description || 'No description provided on GitHub.'}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-[#FEF9C3] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-center">
              <div className="text-[10px] font-mono font-black uppercase text-[#586E5F] flex items-center justify-center gap-1">
                <Star className="w-3 h-3 text-[#EAB308]" /> Stars
              </div>
              <div className="text-lg font-serif font-black text-[#1F2C23] mt-0.5">
                {repo.starsCount ?? 0}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#DCFCE7] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-center">
              <div className="text-[10px] font-mono font-black uppercase text-[#586E5F] flex items-center justify-center gap-1">
                <GitCommit className="w-3 h-3 text-[#16A34A]" /> Commits
              </div>
              <div className="text-lg font-serif font-black text-[#1F2C23] mt-0.5">
                {repo.recentCommitCount ?? 'Synced'}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#E0F2FE] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-center">
              <div className="text-[10px] font-mono font-black uppercase text-[#586E5F] flex items-center justify-center gap-1">
                <Code2 className="w-3 h-3 text-[#0284C7]" /> Language
              </div>
              <div className="text-xs font-mono font-black text-[#1F2C23] mt-1.5 truncate">
                {repo.primaryLanguage || 'General'}
              </div>
            </div>
          </div>

          {/* Telemetry info */}
          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border-2 border-[#1F2C23] flex items-center justify-between text-xs font-mono">
            <span className="text-[#586E5F] font-bold">Sync Status:</span>
            <span className="inline-flex items-center gap-1 text-[#16A34A] font-black uppercase">
              <CheckCircle2 className="w-3.5 h-3.5" /> Authenticated via GitHub API
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t-2 border-[#1F2C23] flex items-center justify-between gap-3 shrink-0">
          {repo.htmlUrl ? (
            <a
              href={repo.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1F2C23] hover:bg-[#385241] text-white font-mono font-black text-xs border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
            >
              <Github className="w-4 h-4 text-white" />
              <span>Open on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 text-white" />
            </a>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#1F2C23] text-xs font-mono font-black border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
