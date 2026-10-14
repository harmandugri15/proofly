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
import { DelicateStarOrnament } from '../../components/common/CreativeArt';

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

  const handleAutoFetch = async (urlToFetch: string) => {
    if (!urlToFetch || !urlToFetch.trim()) return;
    setIsAutoFetching(true);
    setCrawlerSuccessMsg(null);
    setCrawlerErrorMsg(null);

    try {
      const res = await api.post<{ project: AutoFetchedProjectData; message: string }>(
        '/student/projects/auto-fetch',
        { repositoryUrl: urlToFetch.trim() }
      );

      const p = res.project;
      setFetchedMeta(p);
      setTitle(p.title || '');
      setTagline(p.tagline || '');
      setDescription(p.description || '');
      setRepositoryUrl(p.repositoryUrl || urlToFetch.trim());
      if (p.demoUrl) setDemoUrl(p.demoUrl);
      if (p.skills && p.skills.length > 0) setSkillsStr(p.skills.join(', '));

      setCrawlerSuccessMsg(res.message || 'Auto-fetched repository details!');
      setShowModal(true);
    } catch (e: any) {
      console.error(e);
      setCrawlerErrorMsg(e?.message || 'Failed to auto-fetch repository. Ensure the URL is public.');
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
        title,
        tagline,
        description,
        repositoryUrl: repositoryUrl || null,
        demoUrl: demoUrl || null,
        skills,
        verifiedCommitCount: (fetchedMeta as any)?.commitCount || null,
      });

      setShowModal(false);
      resetForm();
      loadProjects();
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
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border-2 border-sage-500 border-t-terracotta-500 animate-spin flex items-center justify-center p-1">
          <Sparkles className="w-5 h-5 text-terracotta-500" />
        </div>
        <p className="text-xs font-mono text-forest-700/60 tracking-wider">RETRIEVING VERIFIED PROJECTS...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 overflow-hidden animate-fadeIn">
      {/* Top Header Banner */}
      <div className="relative rounded-3xl bg-[#7D9B86] text-white p-6 sm:p-8 overflow-hidden shadow-lg border border-sage-700/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/25">
              VERIFIED ARTIFACTS
            </span>
            <DelicateStarOrnament className="w-4 h-4 text-terracotta-300" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight text-white">
            Projects & Technical Evidence
          </h1>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl leading-relaxed">
            Showcase your best engineering work backed by verifiable repositories, live deployments, and automated code inspection.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="relative z-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-medium text-xs transition-transform hover:scale-105 shadow-sm shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project Manually</span>
        </button>
      </div>

      {/* 1-Click Crawler Banner */}
      <div className="p-6 rounded-3xl bg-white/95 border border-sand-200/80 shadow-sm space-y-3.5 relative overflow-hidden w-full max-w-full">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-sage-100 text-sage-800 border border-sage-200 shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-serif font-normal text-forest-900 flex items-center gap-2">
              <span>1-Click GitHub Repository Crawler</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sage-50 text-sage-800 border border-sage-200 font-bold">
                Auto-Telemetry
              </span>
            </h2>
            <p className="text-xs text-forest-700/75">
              Paste your repository link below. Proofly's crawler automatically extracts title, architecture summary from README, languages, stars, and live demo link.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-forest-700/50">
              <Github className="w-4 h-4" />
            </div>
            <input
              type="url"
              value={quickRepoUrl}
              onChange={(e) => setQuickRepoUrl(e.target.value)}
              placeholder="https://github.com/username/repository"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-sand-50/70 border border-sand-300 text-forest-900 placeholder:text-forest-700/40 text-xs focus:outline-none focus:border-sage-500 font-mono transition-colors"
            />
          </div>

          <button
            onClick={() => handleAutoFetch(quickRepoUrl)}
            disabled={isAutoFetching || !quickRepoUrl.trim()}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 disabled:opacity-50 text-white font-medium text-xs transition-all shrink-0 shadow-sm hover:scale-105"
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
          <p className="text-xs text-terracotta-600 flex items-center gap-1.5 pt-1 font-mono">
            <AlertCircle className="w-3.5 h-3.5" /> {crawlerErrorMsg}
          </p>
        )}
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-white/80 border border-sand-200 text-forest-700/60 space-y-3">
          <FolderGit2 className="w-12 h-12 text-forest-700/40 mx-auto" />
          <h3 className="text-base font-serif font-normal text-forest-900">No projects added yet</h3>
          <p className="text-xs text-forest-700/70 max-w-sm mx-auto leading-relaxed">
            Projects with repository links or live demos provide essential proof of work for recruiters. Paste a GitHub link above to get started instantly.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-3xl bg-white/95 border border-sand-200/80 flex flex-col justify-between space-y-4 hover:border-sage-400/60 transition-all shadow-sm hover:shadow-md group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-serif font-normal text-forest-900 leading-snug group-hover:text-terracotta-600 transition-colors">
                    {project.title}
                  </h3>
                  <EvidenceBadge status={project.verificationStatus} type="project" />
                </div>

                <p className="text-xs text-forest-800 font-medium">{project.tagline}</p>
                <p className="text-xs text-forest-700/70 leading-relaxed line-clamp-3">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.skills?.map((s: string) => (
                    <span
                      key={s}
                      className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-sand-100 text-forest-800 border border-sand-200"
                    >
                      #{s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-sand-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  {project.repositoryUrl && (
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-forest-700/75 hover:text-forest-900 flex items-center gap-1.5 transition-colors font-mono font-medium"
                    >
                      <Github className="w-3.5 h-3.5 text-forest-700/50" /> Source Code
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-terracotta-600 hover:text-terracotta-700 flex items-center gap-1.5 transition-colors font-mono font-bold"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleVerifyProject(project.id)}
                    disabled={verifyingId === project.id}
                    className="px-3.5 py-1.5 rounded-full bg-sand-100 hover:bg-sand-200 text-forest-900 text-[11px] font-mono font-medium border border-sand-200 transition-colors"
                  >
                    {verifyingId === project.id ? 'Checking...' : 'Re-verify'}
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="p-1.5 rounded-full text-forest-700/40 hover:text-terracotta-600 hover:bg-terracotta-50 transition-colors"
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
        <div className="fixed inset-0 bg-forest-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FAF7F2] border border-sand-300 rounded-3xl p-6 sm:p-7 w-full max-w-xl shadow-2xl max-h-[92vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-sand-200">
              <h3 className="text-base font-serif font-normal text-forest-900 flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-sage-600" />
                Add Project & Evidence
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="w-8 h-8 rounded-full bg-sand-200 hover:bg-sand-300 text-forest-800 flex items-center justify-center text-xs transition-colors"
              >
                ✕
              </button>
            </div>

            {/* In-Modal Crawler Input */}
            <div className="p-4 rounded-2xl bg-white border border-sand-200 space-y-2">
              <label className="block text-[11px] font-mono font-bold text-forest-800 uppercase tracking-wider">
                ⚡ Auto-Fetch from GitHub URL
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  value={modalRepoUrl}
                  onChange={(e) => setModalRepoUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="flex-1 px-3.5 py-2 rounded-xl bg-sand-50 border border-sand-300 text-forest-900 placeholder:text-forest-700/40 text-xs focus:outline-none focus:border-sage-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => handleAutoFetch(modalRepoUrl)}
                  disabled={isAutoFetching || !modalRepoUrl.trim()}
                  className="px-4 py-2 rounded-full bg-terracotta-500 hover:bg-terracotta-600 disabled:opacity-50 text-white font-medium text-xs transition-colors shrink-0 flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isAutoFetching ? 'animate-spin' : ''}`} />
                  {isAutoFetching ? 'Crawling...' : 'Auto-Fetch'}
                </button>
              </div>

              {crawlerSuccessMsg && (
                <p className="text-xs text-sage-700 flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  {crawlerSuccessMsg}
                </p>
              )}

              {crawlerErrorMsg && (
                <p className="text-xs text-terracotta-600 flex items-center gap-1.5 pt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {crawlerErrorMsg}
                </p>
              )}
            </div>

            {/* Fetched Highlights Badge */}
            {fetchedMeta && (
              <div className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-sage-50 border border-sage-200 text-xs text-sage-800 font-mono">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500" /> {fetchedMeta.starsCount} stars
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="w-3.5 h-3.5 text-forest-700/60" /> {fetchedMeta.forksCount} forks
                </span>
                {fetchedMeta.primaryLanguage && (
                  <span>Primary: <strong>{fetchedMeta.primaryLanguage}</strong></span>
                )}
                {fetchedMeta.license && <span>License: {fetchedMeta.license}</span>}
              </div>
            )}

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-forest-800 uppercase tracking-wider mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. SyncFlow — Real-Time Canvas"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sand-300 text-forest-900 text-sm focus:outline-none focus:border-sage-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-forest-800 uppercase tracking-wider">
                    Tagline / High-Level Pitch
                  </label>
                  <span className="text-[10px] font-mono text-forest-700/50">max 240 chars</span>
                </div>
                <input
                  type="text"
                  required
                  maxLength={240}
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Infinite collaborative canvas with CRDT-based multi-user synchronization."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sand-300 text-forest-900 text-sm focus:outline-none focus:border-sage-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-800 uppercase tracking-wider mb-1">
                  Detailed Technical Description & Architecture
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain the problem solved, architectural trade-offs, technologies used, and measurable results."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sand-300 text-forest-900 text-xs leading-relaxed focus:outline-none focus:border-sage-500 font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-forest-800 uppercase tracking-wider mb-1">
                    Repository URL (GitHub)
                  </label>
                  <input
                    type="url"
                    value={repositoryUrl}
                    onChange={(e) => setRepositoryUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sand-300 text-forest-900 text-xs font-mono focus:outline-none focus:border-sage-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-forest-800 uppercase tracking-wider mb-1">
                    Live Demo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="https://demo.app"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sand-300 text-forest-900 text-xs font-mono focus:outline-none focus:border-sage-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-800 uppercase tracking-wider mb-1">
                  Skills & Technologies (Comma-separated)
                </label>
                <input
                  type="text"
                  value={skillsStr}
                  onChange={(e) => setSkillsStr(e.target.value)}
                  placeholder="e.g. TypeScript, React, Node.js, WebSockets, PostgreSQL"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sand-300 text-forest-900 text-xs focus:outline-none focus:border-sage-500"
                />
              </div>

              {submitError && (
                <div className="p-3 rounded-xl bg-terracotta-50 border border-terracotta-200 text-xs text-terracotta-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-sand-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 rounded-full bg-sand-200 hover:bg-sand-300 text-forest-800 text-xs font-mono font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-medium disabled:opacity-50 flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105"
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
