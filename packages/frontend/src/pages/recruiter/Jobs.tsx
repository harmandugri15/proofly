import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { Briefcase, Plus, Trash2, MapPin, Clock, CheckCircle2, Sparkles } from 'lucide-react';

export const RecruiterJobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [employmentType, setEmploymentType] = useState('Full-time');
  const [reqSkillsStr, setReqSkillsStr] = useState('');
  const [prefSkillsStr, setPrefSkillsStr] = useState('');
  const [minGradYear, setMinGradYear] = useState<number | ''>('');

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await api.get<any[]>('/recruiter/jobs');
      setJobs(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const requiredSkills = reqSkillsStr
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const preferredSkills = prefSkillsStr
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      await api.post('/recruiter/jobs', {
        title,
        description,
        location,
        employmentType,
        status: 'ACTIVE',
        requiredSkills,
        preferredSkills,
        minGraduationYear: minGradYear ? Number(minGradYear) : null,
      });

      setShowModal(false);
      setTitle('');
      setDescription('');
      setLocation('');
      setReqSkillsStr('');
      setPrefSkillsStr('');
      setMinGradYear('');
      loadJobs();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteJob = async (id: string) => {
    try {
      await api.delete(`/recruiter/jobs/${id}`);
      loadJobs();
    } catch (e) {
      console.error(e);
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
        <p className="text-xs font-mono text-slate-400 tracking-wider">RETRIEVING ACTIVE JOB SPECS...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 overflow-hidden shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>TALENT REQUISITIONS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-sans">
            Job Profiles & Target Requirements
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
            Define requirements to power the AI candidate matcher and surface verifiable student matches.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="relative z-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-black text-xs transition-transform hover:scale-105 shadow-glow-emerald shrink-0"
        >
          <Plus className="w-4 h-4" /> Post New Job
        </button>
      </div>

      <div className="space-y-4">
        {jobs.length === 0 ? (
          <div className="p-12 text-center rounded-3xl glass-panel border border-white/10 text-slate-400 font-mono text-xs">
            No job profiles posted yet. Create your first opening to activate explainable candidate matching.
          </div>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="p-6 rounded-3xl glass-panel border border-white/10 space-y-3 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:border-emerald-500/30 transition-all shadow-md group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    {job.status}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-white font-sans">{job.title}</h3>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" /> {job.location || 'Remote'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" /> {job.employmentType}
                  </span>
                  {job.minGraduationYear && (
                    <>
                      <span>•</span>
                      <span>Min Class: {job.minGraduationYear}</span>
                    </>
                  )}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">{job.description}</p>

                <div className="space-y-1.5 pt-1">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
                    <span className="text-slate-400 font-bold mr-1 text-[11px]">Required:</span>
                    {job.requiredSkills?.map((s: string) => (
                      <span
                        key={s}
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {job.preferredSkills?.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
                      <span className="text-slate-400 font-bold mr-1 text-[11px]">Preferred:</span>
                      {job.preferredSkills?.map((s: string) => (
                        <span
                          key={s}
                          className="text-[10px] font-mono px-2.5 py-0.5 rounded-lg bg-white/[0.04] text-slate-300 border border-white/5"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleDeleteJob(job.id)}
                className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Post Job Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="glass-panel border border-white/15 rounded-3xl p-6 sm:p-7 w-full max-w-xl shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-black text-white font-sans">Create Job Specification</h3>
            <form onSubmit={handleCreateJob} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Job Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Distributed Backend Engineer (Intern / New Grad)"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. San Francisco / Remote"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Employment Type
                  </label>
                  <select
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500 font-mono"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Role Description & Scope
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summarize the core technical challenges, stack, and mission for this engineer..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500 font-mono leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Required Skills (Comma-sep)
                  </label>
                  <input
                    type="text"
                    value={reqSkillsStr}
                    onChange={(e) => setReqSkillsStr(e.target.value)}
                    placeholder="TypeScript, PostgreSQL, Docker"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Preferred Skills (Comma-sep)
                  </label>
                  <input
                    type="text"
                    value={prefSkillsStr}
                    onChange={(e) => setPrefSkillsStr(e.target.value)}
                    placeholder="Rust, Kubernetes, GraphQL"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.04] text-slate-300 text-xs font-bold hover:bg-white/[0.08]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 text-xs font-black shadow-glow-emerald hover:scale-105 transition-transform"
                >
                  Post Job Spec
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
