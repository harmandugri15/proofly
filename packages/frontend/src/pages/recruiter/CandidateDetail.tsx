import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../lib/api';
import {
  User,
  ShieldCheck,
  Github,
  ExternalLink,
  Sparkles,
  BookmarkCheck,
  FileText,
  Clock,
  Send,
  MessageSquare,
  Award,
  ChevronRight,
  TrendingUp,
  Code2,
  Share2,
  CheckCircle2,
  Key,
  Linkedin,
  MapPin,
  Calendar,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { EvidenceBadge } from '../../components/common/EvidenceBadge';
import { RecruiterResearchResult, CandidateMatchResult } from '@proofly/shared';
import { GitHubProfileCard } from '../../components/common/GitHubProfileCard';
import { CodingProfileCard } from '../../components/common/CodingProfileCard';

export const RecruiterCandidateDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [candidate, setCandidate] = useState<any>(null);
  const [shortlists, setShortlists] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Recruiter Note Form
  const [noteContent, setNoteContent] = useState('');
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);

  // AI Research Assistant Form
  const [researchQuery, setResearchQuery] = useState('');
  const [isResearching, setIsResearching] = useState(false);
  const [researchResult, setResearchResult] = useState<RecruiterResearchResult | null>(null);

  // Candidate Matcher
  const [selectedJobId, setSelectedJobId] = useState('');
  const [isMatching, setIsMatching] = useState(false);
  const [matchResult, setMatchResult] = useState<CandidateMatchResult | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    loadCandidate();
  }, [id]);

  const loadCandidate = async () => {
    try {
      const [candData, shortlistsData, jobsData] = await Promise.all([
        api.get<any>(`/recruiter/candidates/${id}`),
        api.get<any[]>('/recruiter/shortlists'),
        api.get<any[]>('/recruiter/jobs'),
      ]);
      setCandidate(candData);
      setShortlists(shortlistsData || []);
      setJobs(jobsData || []);
      if (jobsData && jobsData.length > 0) {
        setSelectedJobId(jobsData[0].id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;
    setIsSubmittingNote(true);
    try {
      await api.post('/recruiter/notes', {
        studentProfileId: id,
        content: noteContent,
        tags: ['Candidate Review'],
      });
      setNoteContent('');
      loadCandidate();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmittingNote(false);
    }
  };

  const handleAddToShortlist = async (shortlistId: string) => {
    try {
      await api.post(`/recruiter/shortlists/${shortlistId}/candidates`, {
        studentProfileId: id,
      });
      alert('Candidate added to shortlist successfully!');
    } catch (e: any) {
      alert(e.message || 'Failed to add to shortlist');
    }
  };

  const handleResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!researchQuery.trim()) return;
    setIsResearching(true);
    try {
      const res = await api.post<RecruiterResearchResult>('/ai/research-candidate', {
        candidateId: id,
        query: researchQuery,
      });
      setResearchResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsResearching(false);
    }
  };

  const handleMatchJob = async () => {
    setIsMatching(true);
    try {
      const res = await api.post<CandidateMatchResult>('/ai/match-candidate', {
        candidateId: id,
        jobId: selectedJobId || undefined,
      });
      setMatchResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsMatching(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 animate-spin flex items-center justify-center p-1">
          <div className="w-full h-full bg-[#0a0d14] rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
          </div>
        </div>
        <p className="text-xs font-mono text-slate-400 tracking-wider">RETRIEVING CANDIDATE EVIDENCE DOSSIER...</p>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="max-w-md mx-auto my-24 p-8 rounded-3xl glass-panel border border-rose-500/20 text-center space-y-4">
        <p className="text-sm font-bold text-rose-400 font-sans">Candidate record not found.</p>
        <Link to="/recruiter/candidates" className="text-xs font-mono text-slate-400 hover:text-white">
          &larr; Return to Candidate Radar
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
      {/* Breadcrumb Header */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <Link to="/recruiter/candidates" className="hover:text-emerald-400 transition-colors">
          Candidates
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-600" />
        <span className="text-white font-bold">{candidate.user?.name}</span>
      </div>

      {/* Candidate Hero Card */}
      <div className="relative rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-start gap-5">
          <div className="story-ring p-1 rounded-full shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-900 flex items-center justify-center text-xl sm:text-2xl font-black text-emerald-400">
              {candidate.user?.name ? candidate.user.name[0] : 'U'}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-sans">
                {candidate.user?.name}
              </h1>
              <span className="text-xs font-mono font-black text-emerald-300 bg-emerald-500/15 px-3 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {candidate.completenessScore}% Proof Score
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-200">{candidate.headline || 'Software Engineer'}</p>

            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              {candidate.bio || 'No biography supplied.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1 font-mono">
              <span className="inline-flex items-center gap-1 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {candidate.location || 'Remote'}
              </span>
              {candidate.targetGraduationYear && (
                <span className="inline-flex items-center gap-1 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Class of {candidate.targetGraduationYear}
                </span>
              )}
              <span className="text-emerald-400 font-bold">
                {candidate.isOpenToWork ? '● Open to offers' : '○ Not actively looking'}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="relative z-10 flex flex-col gap-3 shrink-0">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to={`/u/${candidate.username}${candidate.shareToken ? `?pass=${candidate.shareToken}` : ''}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-mono font-bold text-xs border border-white/10 transition-colors"
            >
              <span>Public View</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            {candidate.linkedinUrl && (
              <a
                href={candidate.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0077b5]/15 hover:bg-[#0077b5]/25 text-[#38bdf8] font-mono font-bold text-xs border border-[#0077b5]/30 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#0a66c2]" />
                <span>LinkedIn</span>
                {candidate.linkedinVerified && (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                )}
              </a>
            )}

            <button
              onClick={() => {
                const url = `${window.location.origin}/u/${candidate.username}${candidate.shareToken ? `?pass=${candidate.shareToken}` : ''}`;
                navigator.clipboard.writeText(url);
                setCopiedLink(true);
                setTimeout(() => setCopiedLink(false), 2000);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-300 font-mono font-bold text-xs border border-cyan-400/30 transition-colors"
            >
              <Key className="w-3.5 h-3.5 text-cyan-400" />
              <span>{copiedLink ? 'Pass Copied!' : 'Copy Fast-Pass'}</span>
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              Add to Talent Pool:
            </div>
            <div className="flex gap-2">
              <select
                id="shortlist-select"
                className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500 font-mono"
              >
                {shortlists.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  const sel = (document.getElementById('shortlist-select') as HTMLSelectElement)?.value;
                  if (sel) handleAddToShortlist(sel);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-black text-xs transition-transform hover:scale-105 shrink-0 flex items-center gap-1 shadow-glow-emerald"
              >
                <BookmarkCheck className="w-3.5 h-3.5" /> Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Left = Verified Signals; Right = AI Assistants & Recruiter Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Evidence) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Projects & Demonstrations */}
          <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <h2 className="text-base font-black text-white flex items-center gap-2 font-sans">
                <Layers className="w-4 h-4 text-emerald-400" />
                Verified Project Evidence ({candidate.projects?.length || 0})
              </h2>
              <span className="text-[11px] font-mono text-slate-400">Authenticated Artifacts</span>
            </div>

            <div className="space-y-4">
              {candidate.projects?.map((proj: any) => (
                <div key={proj.id} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5 hover:border-emerald-500/30 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm sm:text-base font-black text-white">{proj.title}</h3>
                    <EvidenceBadge status={proj.verificationStatus} type="project" />
                  </div>

                  <p className="text-xs text-slate-300 font-semibold">{proj.tagline}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.skills?.map((s: string) => (
                      <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-white/[0.04] text-slate-300 border border-white/5">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs pt-2.5 border-t border-white/5">
                    {proj.repositoryUrl && (
                      <a
                        href={proj.repositoryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white flex items-center gap-1.5 font-mono text-xs transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" /> Inspect Code
                      </a>
                    )}
                    {proj.demoUrl && (
                      <a
                        href={proj.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 font-mono text-xs font-bold transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Live Deployment
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <h2 className="text-base font-black text-white flex items-center gap-2 font-sans">
                <Award className="w-4 h-4 text-emerald-400" />
                Certifications & Credential Records ({candidate.certificates?.length || 0})
              </h2>
            </div>

            <div className="space-y-3">
              {candidate.certificates?.map((cert: any) => (
                <div
                  key={cert.id}
                  className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{cert.title}</span>
                      <EvidenceBadge status={cert.verificationStatus} type="certificate" />
                    </div>
                    <p className="text-slate-400">
                      Issuer: <strong className="text-slate-200">{cert.issuer}</strong>
                      {cert.credentialId && ` • ID: ${cert.credentialId}`}
                    </p>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 font-mono font-bold"
                      >
                        Official Verification Link <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GitHub Engineering Signals & 52-Week Contribution Heatmap */}
          <div className="space-y-4">
            <h2 className="text-base font-black text-white flex items-center gap-2 font-sans">
              <Github className="w-4 h-4 text-emerald-400" />
              GitHub Engineering Signals & Activity Heatmap
            </h2>

            <GitHubProfileCard
              githubUsername={candidate.githubUsername}
              githubStats={candidate.githubStats}
              repos={candidate.gitHubRepos || []}
              showSyncButton={false}
            />
          </div>

          {/* Algorithmic Problem Solving Profiles (LeetCode, HackerRank, Codeforces) */}
          {candidate.codingProfiles && candidate.codingProfiles.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-base font-black text-white flex items-center gap-2 font-sans">
                <Code2 className="w-4 h-4 text-amber-400" />
                Verified Algorithmic Solving Profiles ({candidate.codingProfiles.length})
              </h2>

              <div className="space-y-4">
                {candidate.codingProfiles.map((cp: any) => (
                  <CodingProfileCard key={cp.id} profile={cp} showActions={false} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (AI Assistant & Private Notes) */}
        <div className="space-y-6">
          {/* AI Explainable Candidate Matcher */}
          <div className="p-5 sm:p-6 rounded-3xl glass-panel border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white font-sans">Explainable Job Matcher</h3>
                <p className="text-[11px] text-slate-400 font-mono">Evaluate against requirements</p>
              </div>
            </div>

            <div className="space-y-3">
              <select
                value={selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500 font-mono"
              >
                {jobs.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.title}
                  </option>
                ))}
              </select>

              <button
                onClick={handleMatchJob}
                disabled={isMatching}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 disabled:opacity-50 text-slate-950 font-black text-xs transition-transform hover:scale-105 shadow-glow-emerald"
              >
                {isMatching ? 'Computing Match...' : 'Compute Match Breakdown'}
              </button>

              {matchResult && (
                <div className="p-4 rounded-2xl bg-[#090d16] border border-emerald-500/30 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-300">Match Score:</span>
                    <span className="font-mono font-black text-emerald-400 text-sm">
                      {matchResult.matchScore}%
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{matchResult.summary}</p>
                  <div className="space-y-1 pt-1 border-t border-white/5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">
                      Evidence Highlights:
                    </span>
                    {matchResult.evidenceHighlights.map((h, i) => (
                      <p key={i} className="text-slate-300 text-[11px] leading-relaxed">
                        • {h}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* AI Grounded Research Assistant */}
          <div className="p-5 sm:p-6 rounded-3xl glass-panel border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white font-sans">Recruiter Research Assistant</h3>
                <p className="text-[11px] text-slate-400 font-mono">Query verified proof artifacts</p>
              </div>
            </div>

            <form onSubmit={handleResearch} className="space-y-2.5">
              <input
                type="text"
                value={researchQuery}
                onChange={(e) => setResearchQuery(e.target.value)}
                placeholder="e.g. Has candidate built WebSocket or AWS projects?"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                disabled={isResearching}
                className="w-full py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] disabled:opacity-50 text-white text-xs font-mono font-bold border border-white/10 transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 text-cyan-400" />
                {isResearching ? 'Searching evidence...' : 'Ask Assistant'}
              </button>
            </form>

            {researchResult && (
              <div className="p-4 rounded-2xl bg-[#090d16] border border-cyan-500/30 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400">
                  <span>Confidence: {Math.round(researchResult.confidence * 100)}%</span>
                  <span>{researchResult.citations.length} citation(s)</span>
                </div>
                <div className="text-slate-300 leading-relaxed whitespace-pre-line text-[11px]">
                  {researchResult.answer}
                </div>
              </div>
            )}
          </div>

          {/* Organization Private Notes */}
          <div className="p-5 sm:p-6 rounded-3xl glass-panel border border-white/10 space-y-4 shadow-xl">
            <h3 className="text-sm font-black text-white flex items-center gap-2 font-sans">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Team Notes (Private to your Org)
            </h3>

            <form onSubmit={handleAddNote} className="space-y-2.5">
              <textarea
                rows={3}
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Add private evaluation notes for your hiring team..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={isSubmittingNote}
                className="w-full py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-mono font-bold border border-white/10 transition-colors"
              >
                {isSubmittingNote ? 'Saving...' : 'Add Note'}
              </button>
            </form>

            <div className="space-y-2.5 pt-1">
              {candidate.recruiterNotes?.map((note: any) => (
                <div key={note.id} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span className="font-bold text-white">{note.recruiter?.fullName}</span>
                    <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
