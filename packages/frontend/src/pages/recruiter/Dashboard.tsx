import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api';
import { Users, Briefcase, BookmarkCheck, Sparkles, ArrowRight, ShieldCheck, Search, Zap, Layers } from 'lucide-react';
import { EvidenceBadge } from '../../components/common/EvidenceBadge';

export const RecruiterDashboard: React.FC = () => {
  const { user } = useAuth();
  const [candidates, setCandidates] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [shortlists, setShortlists] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [candidatesData, jobsData, shortlistsData] = await Promise.all([
        api.get<any>('/recruiter/candidates?limit=4'),
        api.get<any[]>('/recruiter/jobs'),
        api.get<any[]>('/recruiter/shortlists'),
      ]);

      setCandidates(candidatesData.candidates || []);
      setJobs(jobsData || []);
      setShortlists(shortlistsData || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
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
        <p className="text-xs font-mono text-slate-400 tracking-wider">LOADING RECRUITER CONSOLE...</p>
      </div>
    );
  }

  const orgName = user?.recruiterProfile?.organization?.name || 'Your Organization';

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="relative rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              {orgName}
            </span>
            <span className="text-xs font-mono text-slate-400">Scout Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-sans">
            Technical Talent Discovery
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
            Evaluate engineering candidates by inspectable code commits, live demos, and verified certifications.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <Link
            to="/recruiter/candidates"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-black text-xs transition-transform hover:scale-105 shadow-glow-emerald"
          >
            <Search className="w-4 h-4" />
            Discover Candidates
          </Link>
          <Link
            to="/recruiter/jobs"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-mono font-bold text-xs border border-white/10 transition-colors"
          >
            <Briefcase className="w-4 h-4 text-cyan-400" />
            Post Job Spec
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl glass-panel border border-white/10 flex items-center justify-between shadow-md">
          <div>
            <span className="text-xs font-mono text-slate-400 font-bold block">ACTIVE JOB SPECS</span>
            <span className="text-2xl font-black text-white mt-1 block font-sans">{jobs.length}</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-3xl glass-panel border border-white/10 flex items-center justify-between shadow-md">
          <div>
            <span className="text-xs font-mono text-slate-400 font-bold block">SAVED TALENT POOLS</span>
            <span className="text-2xl font-black text-white mt-1 block font-sans">{shortlists.length}</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <BookmarkCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-3xl glass-panel border border-white/10 flex items-center justify-between shadow-md">
          <div>
            <span className="text-xs font-mono text-slate-400 font-bold block">GROUNDED AI ENGINE</span>
            <span className="text-xs font-mono text-emerald-400 font-bold mt-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Cited Evidence Active
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Zap className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Featured Candidates */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-white font-sans flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Top Verified Candidates
          </h2>
          <Link to="/recruiter/candidates" className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
            <span>View All Radar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {candidates.map((candidate) => (
            <Link
              key={candidate.id}
              to={`/recruiter/candidates/${candidate.id}`}
              className="p-5 sm:p-6 rounded-3xl glass-panel border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between space-y-3 group shadow-md hover:-translate-y-0.5"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="story-ring p-0.5 rounded-full shrink-0">
                      <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-xs font-black text-emerald-400">
                        {candidate.user?.name ? candidate.user.name[0] : 'U'}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-black text-white group-hover:text-emerald-300 transition-colors font-sans">
                        {candidate.user?.name}
                      </h3>
                      <p className="text-xs font-mono text-slate-400">@{candidate.username}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-black text-emerald-300 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    {candidate.completenessScore}% Proof
                  </span>
                </div>

                <p className="text-xs text-slate-300 font-medium line-clamp-1">
                  {candidate.headline || 'Software Engineer'}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {candidate.skills?.slice(0, 4).map((s: any) => (
                    <span
                      key={s.id}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-white/[0.04] text-slate-300 border border-white/5"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono text-[11px]">
                  {candidate.projects?.length || 0} projects • {candidate.certificates?.length || 0} credentials
                </span>
                <span className="text-emerald-400 font-mono font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Inspect <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
