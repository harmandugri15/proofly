import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api';
import {
  FolderGit2,
  ShieldCheck,
  GitBranch,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Key,
  Copy,
  Linkedin,
} from 'lucide-react';
import { ProfileCompletenessResult } from '@proofly/shared';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [aiAnalysis, setAiAnalysis] = useState<ProfileCompletenessResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [copiedFastPass, setCopiedFastPass] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await api.get<any>('/student/profile');
      setProfile(data);
      runAiAssistant();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const runAiAssistant = async () => {
    setIsAiLoading(true);
    try {
      const data = await api.post<ProfileCompletenessResult>('/ai/profile-completeness');
      setAiAnalysis(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-slate-400">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        Loading your candidate dashboard...
      </div>
    );
  }

  const score = profile?.completenessScore || 0;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Top Profile Banner (Instagram style builder header) */}
      <div className="relative overflow-hidden rounded-3xl bg-[#0c0f18]/90 border border-white/10 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-emerald-500/10 via-cyan-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            {/* Story Ring Avatar */}
            <div className="story-ring story-ring-active shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#121624] flex items-center justify-center text-xl sm:text-2xl font-black text-white font-mono uppercase">
                {user?.name?.slice(0, 2) || 'PR'}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-sans">
                  {user?.name}
                </h1>
                <span className="text-xs font-mono font-bold text-slate-400">@{profile?.username}</span>
                <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Builder
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-medium leading-relaxed">
                {profile?.headline || 'Add a punchy headline to showcase your engineering expertise to top recruiters.'}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono pt-1">
                <span>{profile?.location || 'Remote'}</span>
                {profile?.targetGraduationYear && (
                  <span>Class of {profile.targetGraduationYear}</span>
                )}
                <span className="text-emerald-400 font-bold">{score}% Proof Completeness</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to={`/u/${profile?.username}`}
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs font-bold border border-white/10 transition-all hover:scale-105"
            >
              <span>Public Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              to="/student/projects"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 text-xs font-black transition-all hover:scale-105 shadow-glow-emerald"
            >
              <span>Add Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recruiter Fast-Pass Link Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-[#0c1424] via-[#0e1628] to-[#0c1424] border border-cyan-500/30 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Key className="w-4 h-4" />
            </span>
            <h2 className="text-sm font-bold text-white font-sans">Recruiter Fast-Pass Link</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-bold">
              Zero Login Wall
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Include this link on your resume. Hiring teams can directly view your verified portfolio, GitHub heatmap, and project code with one click.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto shrink-0">
          <input
            type="text"
            readOnly
            value={`${window.location.origin}/u/${profile?.username}?pass=${profile?.shareToken || ''}`}
            className="px-3.5 py-2.5 rounded-xl bg-[#080b14] border border-cyan-500/30 text-cyan-300 font-mono text-xs w-full sm:w-64 select-all focus:outline-none"
          />
          <button
            onClick={() => {
              const url = `${window.location.origin}/u/${profile?.username}?pass=${profile?.shareToken || ''}`;
              navigator.clipboard.writeText(url);
              setCopiedFastPass(true);
              setTimeout(() => setCopiedFastPass(false), 2000);
            }}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all shrink-0 flex items-center justify-center gap-1.5 shadow-glow-cyan"
          >
            {copiedFastPass ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy Link
              </>
            )}
          </button>
        </div>
      </div>

      {/* Metrics Row (5 High-impact tiles) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="p-4 rounded-2xl bg-[#0c0f18]/80 border border-white/10 hover:border-emerald-500/30 transition-all group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Proof Score</span>
            <TrendingUp className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white font-sans">{score}%</div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-full rounded-full transition-all" style={{ width: `${score}%` }}></div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0c0f18]/80 border border-white/10 hover:border-teal-500/30 transition-all group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Projects</span>
            <FolderGit2 className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white font-sans">{profile?.projects?.length || 0}</div>
          <p className="text-[11px] text-slate-400 mt-1 font-mono">
            {profile?.projects?.filter((p: any) => p.verificationStatus !== 'UNVERIFIED').length || 0} code-verified
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0c0f18]/80 border border-white/10 hover:border-purple-500/30 transition-all group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Certifications</span>
            <ShieldCheck className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white font-sans">{profile?.certificates?.length || 0}</div>
          <p className="text-[11px] text-slate-400 mt-1 font-mono">
            {profile?.certificates?.filter((c: any) => c.verificationStatus === 'ISSUER_VERIFIED').length || 0} issuer-checked
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0c0f18]/80 border border-white/10 hover:border-cyan-500/30 transition-all group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">GitHub Repos</span>
            <GitBranch className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white font-sans">{profile?.gitHubRepos?.length || 0}</div>
          <p className="text-[11px] text-slate-400 mt-1 font-mono">Live Synchronized</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0c0f18]/80 border border-white/10 hover:border-[#0077b5]/40 transition-all group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">LinkedIn</span>
            <Linkedin className="w-4 h-4 text-[#0a66c2] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-sm font-bold text-white flex items-center gap-1.5 mt-1 font-sans">
            {profile?.linkedinVerified ? (
              <span className="text-emerald-400 text-xs flex items-center gap-1 font-mono font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
              </span>
            ) : profile?.linkedinUrl ? (
              <span className="text-cyan-400 text-xs font-mono">Linked</span>
            ) : (
              <span className="text-slate-500 text-xs font-mono">Not Linked</span>
            )}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            <Link to="/student/integrations" className="text-emerald-400 hover:underline font-mono">
              {profile?.linkedinUrl ? 'Manage' : 'Connect'}
            </Link>
          </p>
        </div>
      </div>

      {/* AI Assistant Checklist */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#0c0f18]/90 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-sans">AI Profile Completeness Assistant</h2>
              <p className="text-xs text-slate-400">Actionable, evidence-grounded suggestions to maximize recruiter views</p>
            </div>
          </div>
          <button
            onClick={runAiAssistant}
            disabled={isAiLoading}
            className="text-xs font-bold px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 border border-white/10 transition-all hover:scale-105"
          >
            {isAiLoading ? 'Analyzing...' : 'Re-analyze Profile'}
          </button>
        </div>

        {aiAnalysis ? (
          <div className="space-y-4 pt-2">
            <p className="text-xs text-slate-300 bg-[#121624] p-4 rounded-2xl border border-white/5 leading-relaxed">
              {aiAnalysis.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              {aiAnalysis.checklist.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-[#121624]/80 border border-white/5 flex items-start justify-between gap-3 hover:border-white/15 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
                          item.priority === 'HIGH'
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/25'
                            : item.priority === 'MEDIUM'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/25'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {item.priority}
                      </span>
                      <h4 className="text-xs font-bold text-slate-200">{item.title}</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                  <Link
                    to={item.actionUrl}
                    className="p-2 rounded-xl bg-[#090b14] hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-400 border border-white/5 shrink-0 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-500 font-mono">Click "Re-analyze Profile" to generate your custom evidence roadmap.</p>
        )}
      </div>

      {/* Featured Projects Preview (Reddit Card Format) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white font-sans">Featured Project Evidence</h3>
          <Link to="/student/projects" className="text-xs font-bold text-emerald-400 hover:underline">
            Manage All Projects &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile?.projects?.slice(0, 2).map((project: any) => (
            <div key={project.id} className="p-6 rounded-3xl bg-[#0c0f18]/80 border border-white/10 space-y-3 hover:border-white/20 transition-all">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-base font-bold text-white leading-snug">{project.title}</h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  {project.verificationStatus}
                </span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{project.tagline}</p>
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                {project.skills?.map((s: string) => (
                  <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-black/40 text-slate-300 border border-white/5">
                    #{s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
