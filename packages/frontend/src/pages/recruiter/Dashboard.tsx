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
        <div className="w-12 h-12 rounded-full border-2 border-sage-500 border-t-terracotta-500 animate-spin flex items-center justify-center p-1">
          <Sparkles className="w-5 h-5 text-terracotta-500" />
        </div>
        <p className="text-xs font-mono text-forest-700/60 tracking-wider">LOADING RECRUITER CONSOLE...</p>
      </div>
    );
  }

  const orgName = user?.recruiterProfile?.organization?.name || 'Your Organization';

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="relative rounded-[28px] bg-[#385241] text-white p-6 sm:p-8 overflow-hidden shadow-[4px_4px_0px_#1F2C23] border-2 border-[#1F2C23] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-black uppercase px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/40 shadow-[1px_1px_0px_rgba(0,0,0,0.3)]">
              {orgName}
            </span>
            <span className="text-xs font-mono text-white/90 font-bold">Scout Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white">
            Technical Talent Discovery
          </h1>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl leading-relaxed font-medium">
            Evaluate engineering candidates by inspectable code commits, live demos, and verified certifications.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <Link
            to="/recruiter/candidates"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D97043] hover:bg-[#C55F34] text-white font-bold text-xs border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          >
            <Search className="w-4 h-4" />
            Discover Candidates
          </Link>
          <Link
            to="/recruiter/jobs"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#1F2C23] font-mono font-bold text-xs border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          >
            <Briefcase className="w-4 h-4 text-[#D97043]" />
            Post Job Spec
          </Link>
        </div>
      </div>

      {/* Metrics Row with Neo-Brutalist Colors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-[22px] bg-[#BAE6FD] border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-[#1F2C23] font-black block">ACTIVE JOB SPECS</span>
            <span className="text-3xl font-serif font-black text-[#1F2C23] mt-1 block">{jobs.length}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] flex items-center justify-center text-[#1F2C23]">
            <Briefcase className="w-6 h-6 text-[#1F2C23]" />
          </div>
        </div>

        <div className="p-5 rounded-[22px] bg-[#FFEDD5] border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-[#1F2C23] font-black block">SAVED TALENT POOLS</span>
            <span className="text-3xl font-serif font-black text-[#1F2C23] mt-1 block">{shortlists.length}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] flex items-center justify-center text-[#D97043]">
            <BookmarkCheck className="w-6 h-6 text-[#D97043]" />
          </div>
        </div>

        <div className="p-5 rounded-[22px] bg-[#FEF08A] border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-[#1F2C23] font-black block">GROUNDED AI ENGINE</span>
            <span className="text-xs font-mono text-[#1F2C23] font-black mt-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D97043]" /> Cited Evidence Active
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] flex items-center justify-center text-[#CA8A04]">
            <Zap className="w-6 h-6 text-[#D97043]" />
          </div>
        </div>
      </div>

      {/* Featured Candidates */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-serif font-normal text-forest-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sage-600" />
            Top Verified Candidates
          </h2>
          <Link to="/recruiter/candidates" className="text-xs font-mono font-bold text-terracotta-600 hover:text-terracotta-700 flex items-center gap-1">
            <span>View All Radar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {candidates.length === 0 ? (
          <div className="p-10 text-center rounded-3xl bg-white/80 border border-sand-200/80 text-forest-700/60 text-xs space-y-3">
            <p className="font-serif text-sm font-semibold text-forest-900">
              No candidates unlocked in your Radar yet
            </p>
            <p className="max-w-md mx-auto text-forest-700/70 text-xs leading-relaxed">
              In Proofly, recruiters only see candidates who have shared their Public Card or Fast-Pass code with your organization.
            </p>
            <Link
              to="/recruiter/candidates"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest-900 hover:bg-forest-800 text-sand-50 font-medium text-xs transition-colors shadow-2xs"
            >
              <Zap className="w-3.5 h-3.5 text-terracotta-400" />
              Unlock Candidate with Public Card
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {candidates.map((candidate) => (
              <Link
                key={candidate.id}
                to={`/recruiter/candidates/${candidate.id}`}
                className="p-5 sm:p-6 rounded-3xl bg-white/90 border border-sand-200/80 hover:border-sage-400/60 transition-all flex flex-col justify-between space-y-3 group shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="p-0.5 rounded-full shrink-0 bg-sand-200">
                        <div className="w-8 h-8 rounded-full bg-forest-900 flex items-center justify-center text-xs font-bold text-sand-100">
                          {candidate.user?.name ? candidate.user.name[0] : 'U'}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-serif font-normal text-forest-900 group-hover:text-terracotta-600 transition-colors">
                          {candidate.user?.name}
                        </h3>
                        <p className="text-xs font-mono text-forest-700/60">@{candidate.username}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-sage-800 bg-sage-50 px-2.5 py-0.5 rounded-full border border-sage-200">
                      {candidate.completenessScore}% Proof
                    </span>
                  </div>

                  <p className="text-xs text-forest-700/80 font-medium line-clamp-1">
                    {candidate.headline || 'Software Engineer'}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {candidate.skills?.slice(0, 4).map((s: any) => (
                      <span
                        key={s.id}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sand-100 text-forest-800 border border-sand-200"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-sand-100 flex items-center justify-between text-xs">
                  <span className="text-forest-700/60 font-mono text-[11px]">
                    {candidate.projects?.length || 0} projects • {candidate.certificates?.length || 0} credentials
                  </span>
                  <span className="text-terracotta-600 font-mono font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Inspect <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
