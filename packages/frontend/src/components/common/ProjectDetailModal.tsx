import React from 'react';
import {
  ExternalLink,
  Github,
  CheckCircle2,
  GitCommit,
  Layers,
  Sparkles,
  Trash2,
  RefreshCw,
  X,
  Code2,
  Globe,
  ShieldCheck,
} from 'lucide-react';
import { EvidenceBadge } from './EvidenceBadge';

export interface ProjectDetailModalProps {
  project: any | null;
  isOpen: boolean;
  onClose: () => void;
  onVerify?: (id: string) => void | Promise<void>;
  onDelete?: (id: string) => void | Promise<void>;
  isVerifying?: boolean;
  canManage?: boolean;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
  onVerify,
  onDelete,
  isVerifying = false,
  canManage = false,
}) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 bg-[#1F2C23]/75 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-[28px] bg-[#FAF7F2] border-2 border-[#1F2C23] shadow-[8px_8px_0px_#1F2C23] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#385241] text-white border-b-2 border-[#1F2C23] flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1.5 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-md bg-[#FFDE59] text-[#1F2C23] border border-[#1F2C23] shadow-[1px_1px_0px_#1F2C23]">
                PROJECT DOSSIER
              </span>
              <EvidenceBadge status={project.verificationStatus} type="project" />
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-black text-white leading-tight break-words">
              {project.title}
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

        {/* Modal Body (Scrollable) */}
        <div className="p-5 sm:p-7 space-y-6 overflow-y-auto flex-1">
          {/* Tagline Callout */}
          {project.tagline && (
            <div className="p-4 rounded-2xl bg-[#FEF9C3] border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23]">
              <span className="text-[10px] font-mono font-black uppercase tracking-wider text-[#1F2C23] block mb-1">
                Executive Hook & Overview
              </span>
              <p className="text-sm font-serif font-black text-[#1F2C23] leading-snug">
                {project.tagline}
              </p>
            </div>
          )}

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-[#E0F2FE] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-center">
              <div className="text-[10px] font-mono font-black uppercase text-[#586E5F]">
                Verified Commits
              </div>
              <div className="text-xl font-serif font-black text-[#1F2C23] mt-0.5">
                {project.verifiedCommitCount || 'Active'}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#DCFCE7] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-center">
              <div className="text-[10px] font-mono font-black uppercase text-[#586E5F]">
                Integrity Status
              </div>
              <div className="text-xs font-mono font-black text-[#1F2C23] mt-1.5 uppercase truncate">
                {project.verificationStatus || 'Verified'}
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-[#F3E8FF] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-center">
              <div className="text-[10px] font-mono font-black uppercase text-[#586E5F]">
                Stack Count
              </div>
              <div className="text-xl font-serif font-black text-[#1F2C23] mt-0.5">
                {project.skills?.length || 0} Techs
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-black uppercase tracking-wider text-[#1F2C23] flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#D97043]" />
              <span>Architecture & Engineering Notes</span>
            </h4>
            <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] text-xs sm:text-sm text-[#24362A] font-medium leading-relaxed whitespace-pre-line">
              {project.description || 'No detailed architecture description provided.'}
            </div>
          </div>

          {/* Technologies & Skills Chips */}
          {project.skills && project.skills.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-black uppercase tracking-wider text-[#1F2C23] flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-[#1F2C23]" />
                <span>Technologies & Verified Capabilities</span>
              </h4>
              <div className="flex flex-wrap gap-2 p-3.5 rounded-2xl bg-white border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]">
                {project.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="text-xs font-mono font-black px-3 py-1 rounded-xl bg-[#FEF9C3] text-[#1F2C23] border-2 border-[#1F2C23] shadow-[1px_1px_0px_#1F2C23]"
                  >
                    #{skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* External Links & Access */}
          <div className="space-y-2 pt-1">
            <h4 className="text-xs font-mono font-black uppercase tracking-wider text-[#1F2C23] flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#385241]" />
              <span>Live Demonstration & Source Repository</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.repositoryUrl ? (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#1F2C23] border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] font-mono font-black text-xs active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all group"
                >
                  <span className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-[#1F2C23]" />
                    <span>View Source Code</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#586E5F] group-hover:text-[#1F2C23]" />
                </a>
              ) : (
                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border-2 border-dashed border-[#1F2C23]/40 text-[#586E5F] font-mono text-xs flex items-center gap-2">
                  <Github className="w-4 h-4 text-[#758C7D]" />
                  <span>No repository linked</span>
                </div>
              )}

              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#FFDE59] hover:bg-[#FACC15] text-[#1F2C23] border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] font-mono font-black text-xs active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all group"
                >
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#1F2C23]" />
                    <span>Launch Live App</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#1F2C23]" />
                </a>
              ) : (
                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border-2 border-dashed border-[#1F2C23]/40 text-[#586E5F] font-mono text-xs flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#758C7D]" />
                  <span>No live demo deployment</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-white border-t-2 border-[#1F2C23] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            {canManage && onVerify && (
              <button
                type="button"
                onClick={() => onVerify(project.id)}
                disabled={isVerifying}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E0F2FE] hover:bg-[#BAE6FD] text-[#1F2C23] text-xs font-mono font-black border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
                <span>{isVerifying ? 'Re-verifying...' : 'Re-verify Proof'}</span>
              </button>
            )}

            {canManage && onDelete && (
              <button
                type="button"
                onClick={() => onDelete(project.id)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FEE2E2] hover:bg-[#FCA5A5] text-[#DC2626] text-xs font-mono font-black border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                title="Delete this project"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#1F2C23] hover:bg-[#385241] text-white text-xs font-mono font-black border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all ml-auto"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
