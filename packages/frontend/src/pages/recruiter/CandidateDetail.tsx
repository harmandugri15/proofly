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
import { DelicateStarOrnament } from '../../components/common/CreativeArt';

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
        candidateId: id,
      });
      alert('Candidate added to shortlist!');
    } catch (e: any) {
      alert(e?.message || 'Failed to add to shortlist');
    }
  };

  const handleResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!researchQuery.trim()) return;
    setIsResearching(true);
    try {
      const res = await api.post<RecruiterResearchResult>('/ai/recruiter-research', {
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
      const res = await api.post<CandidateMatchResult>('/ai/candidate-match', {
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
        <div className="w-12 h-12 rounded-full border-2 border-sage-500 border-t-terracotta-500 animate-spin flex items-center justify-center p-1">
          <Sparkles className="w-5 h-5 text-terracotta-500" />
        </div>
        <p className="text-xs font-mono text-forest-700/60 tracking-wider">RETRIEVING CANDIDATE EVIDENCE DOSSIER...</p>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="max-w-md mx-auto my-24 p-8 rounded-3xl bg-white/90 border border-sand-300 text-center space-y-4 shadow-sm">
        <p className="text-sm font-serif font-normal text-terracotta-600">Candidate record not found.</p>
        <Link to="/recruiter/candidates" className="text-xs font-mono text-forest-700/60 hover:text-forest-900">
          &larr; Return to Candidate Radar
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
      {/* Breadcrumb Header */}
      <div className="flex items-center gap-2 text-xs font-mono text-forest-700/60">
        <Link to="/recruiter/candidates" className="hover:text-terracotta-600 transition-colors">
          Candidates
        </Link>
        <ChevronRight className="w-3 h-3 text-sand-400" />
        <span className="text-forest-900 font-bold">{candidate.user?.name}</span>
      </div>

      {/* Candidate Hero Card */}
      <div className="relative rounded-3xl bg-[#7D9B86] text-white p-6 sm:p-8 overflow-hidden shadow-lg border border-sage-700/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative z-10 flex items-start gap-5">
          <div className="p-1 rounded-full bg-white/20 backdrop-blur-sm shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-forest-900 flex items-center justify-center text-xl sm:text-2xl font-serif text-sand-100">
              {candidate.user?.name ? candidate.user.name[0] : 'U'}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight text-white">
                {candidate.user?.name}
              </h1>
              <span className="text-xs font-mono font-bold text-white bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/25 flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                {candidate.completenessScore}% Proof Score
              </span>
            </div>

            <p className="text-sm font-medium text-white/90">{candidate.headline || 'Software Engineer'}</p>

            <p className="text-xs text-white/80 max-w-2xl leading-relaxed">
              {candidate.bio || 'No biography supplied.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-white/80 pt-1 font-mono">
              <span className="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                <MapPin className="w-3.5 h-3.5 text-white/70" /> {candidate.location || 'Remote'}
              </span>
              {candidate.targetGraduationYear && (
                <span className="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                  <Calendar className="w-3.5 h-3.5 text-terracotta-300" /> Class of {candidate.targetGraduationYear}
                </span>
              )}
              <span className="text-white font-bold">
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
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono font-medium text-xs border border-white/20 transition-colors"
            >
              <span>Public View</span>
              <ExternalLink className="w-3.5 h-3.5 text-white/70" />
            </Link>

            {candidate.linkedinUrl && (
              <a
                href={candidate.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono font-medium text-xs border border-white/20 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-white/80" />
                <span>LinkedIn</span>
                {candidate.linkedinVerified && (
                  <CheckCircle2 className="w-3 h-3 text-sand-200" />
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
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-mono font-medium text-xs shadow-sm transition-transform hover:scale-105"
            >
              <Key className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Pass Copied!' : 'Copy Fast-Pass'}</span>
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 space-y-2">
            <div className="text-[10px] font-mono font-bold text-white/80 uppercase tracking-wider">
              Add to Talent Pool:
            </div>
            <div className="flex gap-2">
              <select
                id="shortlist-select"
                className="flex-1 px-3 py-1.5 rounded-full bg-white/90 border border-white/30 text-forest-900 text-xs focus:outline-none font-mono"
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
                className="px-4 py-1.5 rounded-full bg-forest-900 hover:bg-forest-800 text-sand-50 font-medium text-xs transition-transform hover:scale-105 shrink-0 flex items-center gap-1 shadow-sm"
              >
                <BookmarkCheck className="w-3.5 h-3.5" /> Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Evidence) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Projects & Demonstrations */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white/95 border border-sand-200/80 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-sand-200">
              <h2 className="text-base font-serif font-normal text-forest-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-terracotta-600" />
                Verified Project Evidence ({candidate.projects?.length || 0})
              </h2>
              <span className="text-[11px] font-mono text-forest-700/60">Authenticated Artifacts</span>
            </div>

            <div className="space-y-4">
              {candidate.projects?.map((proj: any) => (
                <div key={proj.id} className="p-5 rounded-2xl bg-sand-50/60 border border-sand-200 space-y-2.5 hover:border-sage-400/50 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm sm:text-base font-serif font-normal text-forest-900">{proj.title}</h3>
                    <EvidenceBadge status={proj.verificationStatus} type="project" />
                  </div>

                  <p className="text-xs text-forest-800 font-medium">{proj.tagline}</p>
                  <p className="text-xs text-forest-700/70 leading-relaxed">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.skills?.map((s: string) => (
                      <span key={s} className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-sand-100 text-forest-800 border border-sand-200">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs pt-2.5 border-t border-sand-200">
                    {proj.repositoryUrl && (
                      <a
                        href={proj.repositoryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-forest-700/75 hover:text-forest-900 flex items-center gap-1.5 font-mono text-xs transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" /> Inspect Code
                      </a>
                    )}
                    {proj.demoUrl && (
                      <a
                        href={proj.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-terracotta-600 hover:text-terracotta-700 flex items-center gap-1.5 font-mono text-xs font-bold transition-colors"
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
          <div className="p-6 sm:p-7 rounded-3xl bg-white/95 border border-sand-200/80 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-sand-200">
              <h2 className="text-base font-serif font-normal text-forest-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-sage-600" />
                Certifications & Credential Records ({candidate.certificates?.length || 0})
              </h2>
            </div>

            <div className="space-y-3">
              {candidate.certificates?.map((cert: any) => (
                <div
                  key={cert.id}
                  className="p-4 sm:p-5 rounded-2xl bg-sand-50/60 border border-sand-200 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-normal text-forest-900 text-sm">{cert.title}</span>
                      <EvidenceBadge status={cert.verificationStatus} type="certificate" />
                    </div>
                    <p className="text-forest-700/70">
                      Issuer: <strong className="text-forest-900">{cert.issuer}</strong>
                      {cert.credentialId && ` • ID: ${cert.credentialId}`}
                    </p>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-terracotta-600 hover:text-terracotta-700 inline-flex items-center gap-1 font-mono font-bold"
                      >
                        Official Verification Link <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GitHub Activity Heatmap */}
          <div className="space-y-4">
            <h2 className="text-base font-serif font-normal text-forest-900 flex items-center gap-2">
              <Github className="w-4 h-4 text-forest-900" />
              GitHub Engineering Signals & Activity Heatmap
            </h2>

            <GitHubProfileCard
              githubUsername={candidate.githubUsername}
              githubStats={candidate.githubStats}
              repos={candidate.gitHubRepos || []}
              showSyncButton={false}
            />
          </div>

          {/* Algorithmic Problem Solving Profiles */}
          {candidate.codingProfiles && candidate.codingProfiles.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-base font-serif font-normal text-forest-900 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-amber-600" />
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
          <div className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-sand-200/80 space-y-4 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-sage-100 text-sage-800 border border-sage-200">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-serif font-normal text-forest-900">Explainable Job Matcher</h3>
                <p className="text-[11px] text-forest-700/60 font-mono">Evaluate against requirements</p>
              </div>
            </div>

            <div className="space-y-3">
              <select
                value={selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-sand-50/70 border border-sand-300 text-forest-900 text-xs focus:outline-none focus:border-sage-500 font-mono"
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
                className="w-full py-2.5 rounded-full bg-forest-900 hover:bg-forest-800 disabled:opacity-50 text-sand-50 font-medium text-xs transition-transform hover:scale-105 shadow-sm"
              >
                {isMatching ? 'Computing Match...' : 'Compute Match Breakdown'}
              </button>

              {matchResult && (
                <div className="p-4 rounded-2xl bg-sand-50/80 border border-sand-200 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-normal text-forest-900">Match Score:</span>
                    <span className="font-mono font-bold text-sage-700 text-sm">
                      {matchResult.matchScore}%
                    </span>
                  </div>
                  <p className="text-forest-700/70 text-[11px] leading-relaxed">{matchResult.summary}</p>
                  <div className="space-y-1 pt-1 border-t border-sand-200">
                    <span className="text-[10px] uppercase font-bold text-forest-700/60 font-mono">
                      Evidence Highlights:
                    </span>
                    {matchResult.evidenceHighlights.map((h, i) => (
                      <p key={i} className="text-forest-800 text-[11px] leading-relaxed">
                        • {h}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* AI Grounded Research Assistant */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-sand-200/80 space-y-4 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-terracotta-50 text-terracotta-600 border border-terracotta-200">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-serif font-normal text-forest-900">Recruiter Research Assistant</h3>
                <p className="text-[11px] text-forest-700/60 font-mono">Query verified proof artifacts</p>
              </div>
            </div>

            <form onSubmit={handleResearch} className="space-y-2.5">
              <input
                type="text"
                value={researchQuery}
                onChange={(e) => setResearchQuery(e.target.value)}
                placeholder="e.g. Has candidate built WebSocket or AWS projects?"
                className="w-full px-3.5 py-2.5 rounded-xl bg-sand-50/70 border border-sand-300 text-forest-900 placeholder:text-forest-700/40 text-xs focus:outline-none focus:border-sage-500"
              />
              <button
                type="submit"
                disabled={isResearching}
                className="w-full py-2 rounded-full bg-sand-100 hover:bg-sand-200 disabled:opacity-50 text-forest-900 text-xs font-mono font-medium border border-sand-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 text-terracotta-600" />
                {isResearching ? 'Searching evidence...' : 'Ask Assistant'}
              </button>
            </form>

            {researchResult && (
              <div className="p-4 rounded-2xl bg-sand-50/80 border border-sand-200 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[10px] font-mono text-terracotta-700">
                  <span>Confidence: {Math.round(researchResult.confidence * 100)}%</span>
                  <span>{researchResult.citations.length} citation(s)</span>
                </div>
                <div className="text-forest-800 leading-relaxed whitespace-pre-line text-[11px]">
                  {researchResult.answer}
                </div>
              </div>
            )}
          </div>

          {/* Organization Private Notes */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-sand-200/80 space-y-4 shadow-sm">
            <h3 className="text-sm font-serif font-normal text-forest-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-sage-600" />
              Team Notes (Private to your Org)
            </h3>

            <form onSubmit={handleAddNote} className="space-y-2.5">
              <textarea
                rows={3}
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Add private evaluation notes for your hiring team..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-sand-50/70 border border-sand-300 text-forest-900 placeholder:text-forest-700/40 text-xs focus:outline-none focus:border-sage-500"
              />
              <button
                type="submit"
                disabled={isSubmittingNote}
                className="w-full py-2 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-mono font-medium transition-colors"
              >
                {isSubmittingNote ? 'Saving...' : 'Add Note'}
              </button>
            </form>

            <div className="space-y-2.5 pt-1">
              {candidate.recruiterNotes?.map((note: any) => (
                <div key={note.id} className="p-3.5 rounded-2xl bg-sand-50/60 border border-sand-200 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-forest-700/60 font-mono">
                    <span className="font-bold text-forest-900">{note.recruiter?.fullName}</span>
                    <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-forest-800 text-[11px] leading-relaxed">{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
