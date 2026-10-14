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
    return <div className="p-8 text-center text-slate-400">Loading candidate profile and evidence...</div>;
  }

  if (!candidate) {
    return <div className="p-8 text-center text-rose-400">Candidate not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Breadcrumb Header */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/recruiter/candidates" className="hover:text-white">
          Candidates
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-white font-semibold">{candidate.user?.name}</span>
      </div>

      {/* Candidate Hero Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-850 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white tracking-tight">{candidate.user?.name}</h1>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
              {candidate.completenessScore}% Proof Score
            </span>
          </div>

          <p className="text-sm font-semibold text-slate-300">{candidate.headline}</p>

          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            {candidate.bio || 'No biography supplied.'}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 font-mono">
            <span>Location: {candidate.location || 'Remote'}</span>
            {candidate.targetGraduationYear && (
              <span>Graduation: Class of {candidate.targetGraduationYear}</span>
            )}
            <span>Status: {candidate.isOpenToWork ? 'Open to offers' : 'Not actively looking'}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5 shrink-0">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to={`/u/${candidate.username}${candidate.shareToken ? `?pass=${candidate.shareToken}` : ''}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
            >
              <span>Public Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            {candidate.linkedinUrl && (
              <a
                href={candidate.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0077b5]/15 hover:bg-[#0077b5]/25 text-[#38bdf8] font-semibold text-xs border border-[#0077b5]/30 transition-colors"
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
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 font-semibold text-xs border border-cyan-500/30 transition-colors"
            >
              <Key className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Fast-Pass Copied!' : 'Copy Fast-Pass'}</span>
            </button>
          </div>

          <div className="text-xs text-slate-400 font-semibold">Add to Shortlist:</div>
          <div className="flex gap-2">
            <select
              id="shortlist-select"
              className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
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
              className="px-3 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs transition-colors shrink-0 flex items-center gap-1"
            >
              <BookmarkCheck className="w-3.5 h-3.5" /> Save
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Left = Verified Signals; Right = AI Assistants & Recruiter Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Evidence) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Projects & Demonstrations */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verified Project Evidence ({candidate.projects?.length || 0})
            </h2>

            <div className="space-y-4">
              {candidate.projects?.map((proj: any) => (
                <div key={proj.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-white">{proj.title}</h3>
                    <EvidenceBadge status={proj.verificationStatus} type="project" />
                  </div>

                  <p className="text-xs text-slate-300 font-medium">{proj.tagline}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.skills?.map((s: string) => (
                      <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs pt-2 border-t border-slate-800/80">
                    {proj.repositoryUrl && (
                      <a
                        href={proj.repositoryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white flex items-center gap-1"
                      >
                        <Github className="w-3.5 h-3.5" /> Inspect Repository
                      </a>
                    )}
                    {proj.demoUrl && (
                      <a
                        href={proj.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Live Deployment
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              Certifications & Credential Records
            </h2>

            <div className="space-y-3">
              {candidate.certificates?.map((cert: any) => (
                <div
                  key={cert.id}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{cert.title}</span>
                      <EvidenceBadge status={cert.verificationStatus} type="certificate" />
                    </div>
                    <p className="text-slate-400">
                      Issuer: <strong className="text-slate-300">{cert.issuer}</strong>
                      {cert.credentialId && ` • ID: ${cert.credentialId}`}
                    </p>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:underline inline-flex items-center gap-1"
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
            <h2 className="text-base font-bold text-white flex items-center gap-2">
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
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-amber-400" />
                Verified Algorithmic Problem Solving Profiles ({candidate.codingProfiles.length})
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
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Explainable Job Matcher</h3>
                <p className="text-[11px] text-slate-400">Evaluate fit against open job requirements</p>
              </div>
            </div>

            <div className="space-y-3">
              <select
                value={selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
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
                className="w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-bold text-xs transition-colors"
              >
                {isMatching ? 'Matching...' : 'Compute Match Breakdown'}
              </button>

              {matchResult && (
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-300">Match Score:</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">
                      {matchResult.matchScore}%
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{matchResult.summary}</p>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">
                      Evidence Highlights:
                    </span>
                    {matchResult.evidenceHighlights.map((h, i) => (
                      <p key={i} className="text-slate-300 text-[11px]">
                        • {h}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* AI Grounded Research Assistant */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Recruiter Research Assistant</h3>
                <p className="text-[11px] text-slate-400">Ask questions grounded in verified evidence</p>
              </div>
            </div>

            <form onSubmit={handleResearch} className="space-y-2">
              <input
                type="text"
                value={researchQuery}
                onChange={(e) => setResearchQuery(e.target.value)}
                placeholder="e.g. Has candidate built WebSocket or AWS projects?"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                disabled={isResearching}
                className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-3 h-3" />
                {isResearching ? 'Searching evidence...' : 'Ask Assistant'}
              </button>
            </form>

            {researchResult && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400">
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
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Team Notes (Private to your Org)
            </h3>

            <form onSubmit={handleAddNote} className="space-y-2">
              <textarea
                rows={3}
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Add private evaluation notes for your hiring team..."
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={isSubmittingNote}
                className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
              >
                {isSubmittingNote ? 'Saving...' : 'Add Note'}
              </button>
            </form>

            <div className="space-y-2">
              {candidate.recruiterNotes?.map((note: any) => (
                <div key={note.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-300">{note.recruiter?.fullName}</span>
                    <span className="font-mono">{new Date(note.createdAt).toLocaleDateString()}</span>
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
