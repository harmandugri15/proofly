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
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-850 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Student Candidate
            </span>
            <span className="text-xs text-slate-400">@{profile?.username}</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Welcome back, {user?.name}</h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            {profile?.headline || 'Add a professional headline to stand out to verified recruiters.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={`/u/${profile?.username}`}
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition-colors"
          >
            Preview Public Portfolio
            <ExternalLink className="w-4 h-4" />
          </Link>
          <Link
            to="/student/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-sm font-bold transition-colors shadow-md shadow-emerald-500/10"
          >
            Add Project
          </Link>
        </div>
      </div>

      {/* Recruiter Fast-Pass Link Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-950/30 via-slate-900 to-slate-900 border border-cyan-500/30 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
              <Key className="w-4 h-4" />
            </span>
            <h2 className="text-sm font-bold text-white">Your Recruiter Fast-Pass Share Link</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              Direct Recruiter Access
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Share this link on your resume or directly with hiring teams. Recruiters can instantly inspect your complete verified portfolio, GitHub heatmap, and problem-solving stats without authentication barriers.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <input
            type="text"
            readOnly
            value={`${window.location.origin}/u/${profile?.username}?pass=${profile?.shareToken || ''}`}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs w-60 select-all focus:outline-none"
          />
          <button
            onClick={() => {
              const url = `${window.location.origin}/u/${profile?.username}?pass=${profile?.shareToken || ''}`;
              navigator.clipboard.writeText(url);
              setCopiedFastPass(true);
              setTimeout(() => setCopiedFastPass(false), 2000);
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5 shadow-md shadow-cyan-500/10"
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

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Profile Proof Score</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{score}%</div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${score}%` }}></div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Projects & Demos</span>
            <FolderGit2 className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{profile?.projects?.length || 0}</div>
          <p className="text-[11px] text-slate-400 mt-1">
            {profile?.projects?.filter((p: any) => p.verificationStatus !== 'UNVERIFIED').length || 0} verified
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Certifications</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{profile?.certificates?.length || 0}</div>
          <p className="text-[11px] text-slate-400 mt-1">
            {profile?.certificates?.filter((c: any) => c.verificationStatus === 'ISSUER_VERIFIED').length || 0} issuer checked
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">GitHub Repos</span>
            <GitBranch className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{profile?.gitHubRepos?.length || 0}</div>
          <p className="text-[11px] text-slate-400 mt-1">Synchronized</p>
        </div>
      </div>

      {/* AI Assistant Checklist */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">AI Profile Completeness Assistant</h2>
              <p className="text-xs text-slate-400">Evidence grounded recommendations to maximize recruiter discovery</p>
            </div>
          </div>
          <button
            onClick={runAiAssistant}
            disabled={isAiLoading}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            {isAiLoading ? 'Analyzing...' : 'Re-analyze'}
          </button>
        </div>

        {aiAnalysis ? (
          <div className="space-y-4">
            <p className="text-sm text-slate-300 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
              {aiAnalysis.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              {aiAnalysis.checklist.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                          item.priority === 'HIGH'
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            : item.priority === 'MEDIUM'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
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
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 border border-slate-800 shrink-0 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-500">Click Re-analyze to generate your tailored evidence roadmap.</p>
        )}
      </div>

      {/* Featured Projects Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Featured Project Evidence</h3>
          <Link to="/student/projects" className="text-xs font-semibold text-emerald-400 hover:underline">
            Manage All Projects &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile?.projects?.slice(0, 2).map((project: any) => (
            <div key={project.id} className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-sm font-bold text-white">{project.title}</h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {project.verificationStatus}
                </span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-2">{project.tagline}</p>
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/60">
                {project.skills?.map((s: string) => (
                  <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {s}
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
