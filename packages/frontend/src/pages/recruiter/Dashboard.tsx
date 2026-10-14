import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api';
import { Users, Briefcase, BookmarkCheck, Sparkles, ArrowRight, ShieldCheck, Search } from 'lucide-react';
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
    return <div className="p-8 text-center text-slate-400">Loading recruiter console...</div>;
  }

  const orgName = user?.recruiterProfile?.organization?.name || 'Your Organization';

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-850 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {orgName}
            </span>
            <span className="text-xs text-slate-400">Recruiter Console</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Technical Talent Discovery</h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Evaluate engineering candidates by inspectable code commits, live demos, and verified certifications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/recruiter/candidates"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm transition-colors shadow-md shadow-emerald-500/10"
          >
            <Search className="w-4 h-4" />
            Discover Candidates
          </Link>
          <Link
            to="/recruiter/jobs"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors"
          >
            Post Job Spec
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium block">Active Job Postings</span>
            <span className="text-2xl font-extrabold text-white mt-1 block">{jobs.length}</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium block">Talent Shortlists</span>
            <span className="text-2xl font-extrabold text-white mt-1 block">{shortlists.length}</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <BookmarkCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium block">AI Research Assistant</span>
            <span className="text-xs text-emerald-400 font-medium mt-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Grounded Citations Enabled
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Users className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Featured Candidates */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Top Verified Candidates</h2>
          <Link to="/recruiter/candidates" className="text-xs font-semibold text-emerald-400 hover:underline">
            View All Candidates &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {candidates.map((candidate) => (
            <Link
              key={candidate.id}
              to={`/recruiter/candidates/${candidate.id}`}
              className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {candidate.user?.name}
                    </h3>
                    <p className="text-xs text-slate-400">@{candidate.username}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {candidate.completenessScore}% Proof Score
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2">{candidate.headline}</p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {candidate.skills?.slice(0, 4).map((s: any) => (
                    <span
                      key={s.id}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
                    >
                      {s.name}
                    </span>
                  ))}
                  {candidate.skills?.length > 4 && (
                    <span className="text-[10px] px-1.5 py-0.5 text-slate-500">
                      +{candidate.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>{candidate.projects?.length || 0} projects with evidence</span>
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  Inspect Evidence <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
