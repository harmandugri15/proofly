import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import {
  FolderGit2,
  Plus,
  ExternalLink,
  Github,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Zap,
  ArrowRight,
  AlertCircle,
  RefreshCw,
  Star,
  GitFork,
} from 'lucide-react';
import { EvidenceBadge } from '../../components/common/EvidenceBadge';
import { AutoFetchedProjectData } from '@proofly/shared';

export const StudentProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  // Crawler / Auto-Fetch State
  const [quickRepoUrl, setQuickRepoUrl] = useState('');
  const [modalRepoUrl, setModalRepoUrl] = useState('');
  const [isAutoFetching, setIsAutoFetching] = useState(false);
  const [crawlerSuccessMsg, setCrawlerSuccessMsg] = useState<string | null>(null);
  const [crawlerErrorMsg, setCrawlerErrorMsg] = useState<string | null>(null);
  const [fetchedMeta, setFetchedMeta] = useState<AutoFetchedProjectData | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [repositoryUrl, setRepositoryUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [skillsStr, setSkillsStr] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await api.get<any>('/student/profile');
      setProjects(data.projects || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAutoFetch = async (repoUrlToFetch: string) => {
    if (!repoUrlToFetch || !repoUrlToFetch.trim()) {
      setCrawlerErrorMsg('Please enter a valid GitHub repository URL.');
      return;
    }

    setIsAutoFetching(true);
    setCrawlerSuccessMsg(null);
    setCrawlerErrorMsg(null);
    setSubmitError(null);

    try {
      const fetched = await api.post<AutoFetchedProjectData>('/student/projects/auto-fetch', {
        repositoryUrl: repoUrlToFetch.trim(),
      });

      setFetchedMeta(fetched);
      setTitle(fetched.title);
      setTagline(fetched.tagline);
      setDescription(fetched.description);
      setRepositoryUrl(fetched.repositoryUrl);
      setDemoUrl(fetched.demoUrl || '');
      setSkillsStr(fetched.skills.join(', '));
      setModalRepoUrl(fetched.repositoryUrl);

      setCrawlerSuccessMsg(
        `Auto-fetched "${fetched.title}"! Crawled repo metadata, README, ${fetched.starsCount} stars, and ${fetched.skills.length} technology tags.`
      );
      setShowModal(true);
    } catch (e: any) {
      setCrawlerErrorMsg(e?.message || 'Failed to crawl repository. Please check URL or enter manually.');
    } finally {
      setIsAutoFetching(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const skills = skillsStr
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      await api.post('/student/projects', {
        title: title.trim().slice(0, 120),
        tagline: tagline.trim().slice(0, 480),
        description: description.trim(),
        repositoryUrl: repositoryUrl.trim() || null,
        demoUrl: demoUrl.trim() || null,
        skills,
        isFeatured: true,
      });

      setShowModal(false);
      resetForm();
      await loadProjects();
    } catch (e: any) {
      console.error(e);
      setSubmitError(e?.message || 'Failed to save project. Please check fields.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setTagline('');
    setDescription('');
    setRepositoryUrl('');
    setDemoUrl('');
    setSkillsStr('');
    setCrawlerSuccessMsg(null);
    setCrawlerErrorMsg(null);
    setFetchedMeta(null);
    setQuickRepoUrl('');
    setModalRepoUrl('');
    setSubmitError(null);
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await api.delete(`/student/projects/${id}`);
      loadProjects();
    } catch (e) {
      console.error(e);
    }
  };

  const handleVerifyProject = async (id: string) => {
    setVerifyingId(id);
    try {
      await api.post(`/student/projects/${id}/verify`);
      await loadProjects();
    } catch (e) {
      console.error(e);
    } finally {
      setVerifyingId(null);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-slate-400">Loading projects...</div>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full max-w-full">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00f59b] px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/25">
              Verified Work
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-sans">Projects & Evidence</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Showcase your best engineering work backed by verifiable repositories, live deployments, and automated code inspection.
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-bold text-xs border border-white/10 transition-all hover:scale-105 shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#00f59b]" />
          <span>Add Project Manually</span>
        </button>
      </div>

      {/* 1-Click Crawler Banner */}
      <div className="p-6 rounded-3xl bg-[#0c1326]/95 border border-white/10 shadow-2xl space-y-3.5 relative overflow-hidden w-full max-w-full">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#ff451a]/15 via-[#00f59b]/15 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-[#ff451a]/20 to-[#00f59b]/20 border border-white/10 text-[#00f59b] shrink-0">
            <Zap className="w-4 h-4 text-[#00f59b]" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white font-sans flex items-center gap-2">
              <span>1-Click GitHub Repository Crawler</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-[#00e5ff] border border-cyan-500/25 font-bold">
                Auto-Telemetry
              </span>
            </h2>
            <p className="text-xs text-slate-300">
              Paste your repository link below. Proofly's crawler automatically extracts title, architecture summary from README, languages, stars, and live demo link.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Github className="w-4 h-4" />
            </div>
            <input
              type="url"
              value={quickRepoUrl}
              onChange={(e) => setQuickRepoUrl(e.target.value)}
              placeholder="https://github.com/username/repository"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#090f1e] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00f59b] font-mono transition-colors"
            />
          </div>

          <button
            onClick={() => handleAutoFetch(quickRepoUrl)}
            disabled={isAutoFetching || !quickRepoUrl.trim()}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ff451a] via-[#ff5c26] to-[#ff8a00] hover:opacity-95 disabled:opacity-50 text-white font-black text-xs uppercase tracking-wider transition-all shrink-0 shadow-[0_0_20px_rgba(255,69,26,0.35)] hover:scale-105"
          >
            {isAutoFetching ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Crawling Repo...
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" /> Auto-Fetch & Add
              </>
            )}
          </button>
        </div>

        {crawlerErrorMsg && (
          <p className="text-xs text-rose-400 flex items-center gap-1.5 pt-1 font-mono">
            <AlertCircle className="w-3.5 h-3.5" /> {crawlerErrorMsg}
          </p>
        )}
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-[#0c0f18]/80 border border-white/10 space-y-3">
          <FolderGit2 className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white font-sans">No projects added yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            Projects with repository links or live demos provide essential proof of work for recruiters. Paste a GitHub link above to get started instantly.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-3xl bg-[#0c0f18]/90 border border-white/10 flex flex-col justify-between space-y-4 hover:border-white/20 transition-all duration-300 shadow-2xl group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-black text-white leading-snug group-hover:text-emerald-300 transition-colors">
                    {project.title}
                  </h3>
                  <EvidenceBadge status={project.verificationStatus} type="project" />
                </div>

                <p className="text-xs text-slate-300 font-semibold">{project.tagline}</p>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.skills?.map((s: string) => (
                    <span
                      key={s}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-black/40 text-slate-300 border border-white/5"
                    >
                      #{s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  {project.repositoryUrl && (
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors font-mono font-semibold"
                    >
                      <Github className="w-3.5 h-3.5" /> Source Code
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors font-mono font-bold"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleVerifyProject(project.id)}
                    disabled={verifyingId === project.id}
                    className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-[11px] font-mono font-bold border border-white/10 transition-colors"
                  >
                    {verifyingId === project.id ? 'Checking...' : 'Re-verify'}
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="p-1.5 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Delete project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Project Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#0c1326] border border-white/15 rounded-3xl p-6 sm:p-7 w-full max-w-xl shadow-2xl max-h-[92vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-[#00f59b]" />
                Add Project & Evidence
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center text-xs transition-colors"
              >
                ✕
              </button>
            </div>

            {/* In-Modal Crawler Input */}
            <div className="p-4 rounded-2xl bg-[#090f1e] border border-white/10 space-y-2">
              <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
                ⚡ Auto-Fetch from GitHub URL
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  value={modalRepoUrl}
                  onChange={(e) => setModalRepoUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="flex-1 px-3.5 py-2 rounded-xl bg-[#0e1628] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00f59b] font-mono"
                />
                <button
                  type="button"
                  onClick={() => handleAutoFetch(modalRepoUrl)}
                  disabled={isAutoFetching || !modalRepoUrl.trim()}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff451a] to-[#ff7700] hover:opacity-90 disabled:opacity-50 text-white font-black text-xs transition-colors shrink-0 flex items-center justify-center gap-1.5 shadow-md"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isAutoFetching ? 'animate-spin' : ''}`} />
                  {isAutoFetching ? 'Crawling...' : 'Auto-Fetch'}
                </button>
              </div>

              {crawlerSuccessMsg && (
                <p className="text-xs text-[#00f59b] flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  {crawlerSuccessMsg}
                </p>
              )}

              {crawlerErrorMsg && (
                <p className="text-xs text-rose-400 flex items-center gap-1.5 pt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {crawlerErrorMsg}
                </p>
              )}
            </div>

            {/* Fetched Highlights Badge */}
            {fetchedMeta && (
              <div className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs text-[#00f59b] font-mono">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-300" /> {fetchedMeta.starsCount} stars
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="w-3.5 h-3.5 text-slate-300" /> {fetchedMeta.forksCount} forks
                </span>
                {fetchedMeta.primaryLanguage && (
                  <span>Primary: <strong>{fetchedMeta.primaryLanguage}</strong></span>
                )}
                {fetchedMeta.license && <span>License: {fetchedMeta.license}</span>}
              </div>
            )}

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. SyncFlow — Real-Time Canvas"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090f1e] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00f59b]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Tagline / High-Level Pitch
                  </label>
                  <span className="text-[10px] font-mono text-slate-400">max 240 chars</span>
                </div>
                <input
                  type="text"
                  required
                  maxLength={240}
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Infinite collaborative canvas with CRDT-based multi-user synchronization."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090f1e] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00f59b]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Detailed Technical Description & Architecture
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain the problem solved, architectural trade-offs, technologies used, and measurable results."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090f1e] border border-white/10 text-white text-xs leading-relaxed focus:outline-none focus:border-[#00f59b] font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Repository URL (GitHub)
                  </label>
                  <input
                    type="url"
                    value={repositoryUrl}
                    onChange={(e) => setRepositoryUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090f1e] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#00f59b]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Live Demo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="https://demo.app"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090f1e] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#00f59b]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Skills & Technologies (Comma-separated)
                </label>
                <input
                  type="text"
                  value={skillsStr}
                  onChange={(e) => setSkillsStr(e.target.value)}
                  placeholder="e.g. TypeScript, React, Node.js, WebSockets, PostgreSQL"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090f1e] border border-white/10 text-white text-xs focus:outline-none focus:border-[#00f59b]"
                />
              </div>

              {submitError && (
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#ff451a] via-[#ff5c26] to-[#ff8a00] text-white text-xs font-black hover:opacity-95 disabled:opacity-50 flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,69,26,0.35)]"
                >
                  {isSubmitting ? 'Saving & Verifying...' : 'Save Project & Verify'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
