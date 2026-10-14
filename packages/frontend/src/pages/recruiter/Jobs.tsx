import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { Briefcase, Plus, Trash2, MapPin, Clock, CheckCircle2, Sparkles } from 'lucide-react';
import { DelicateStarOrnament } from '../../components/common/CreativeArt';

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
        <div className="w-12 h-12 rounded-full border-2 border-sage-500 border-t-terracotta-500 animate-spin flex items-center justify-center p-1">
          <Sparkles className="w-5 h-5 text-terracotta-500" />
        </div>
        <p className="text-xs font-mono text-forest-700/60 tracking-wider">RETRIEVING ACTIVE JOB SPECS...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-[#7D9B86] text-white p-6 sm:p-8 overflow-hidden shadow-lg border border-sage-700/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/25 text-xs font-mono font-bold">
            <Briefcase className="w-3.5 h-3.5 text-terracotta-300" />
            <span>TALENT REQUISITIONS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight text-white">
            Job Profiles & Target Requirements
          </h1>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl leading-relaxed">
            Define requirements to power the AI candidate matcher and surface verifiable student matches.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="relative z-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-medium text-xs transition-transform hover:scale-105 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" /> Post New Job
        </button>
      </div>

      <div className="space-y-4">
        {jobs.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white/80 border border-sand-200 text-forest-700/60 font-mono text-xs">
            No job profiles posted yet. Create your first opening to activate explainable candidate matching.
          </div>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="p-6 rounded-3xl bg-white/95 border border-sand-200/80 space-y-3 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:border-sage-400/60 transition-all shadow-sm hover:shadow-md group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-sage-50 text-sage-800 border border-sage-200">
                    {job.status}
                  </span>
                  <h3 className="text-base sm:text-lg font-serif font-normal text-forest-900">{job.title}</h3>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-forest-700/60 font-mono">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-forest-700/50" /> {job.location || 'Remote'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-forest-700/50" /> {job.employmentType}
                  </span>
                  {job.minGraduationYear && (
                    <>
                      <span>•</span>
                      <span>Min Class: {job.minGraduationYear}</span>
                    </>
                  )}
                </div>

                <p className="text-xs text-forest-700/70 leading-relaxed max-w-2xl">{job.description}</p>

                <div className="space-y-1.5 pt-1">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
                    <span className="text-forest-700/60 font-bold mr-1 text-[11px]">Required:</span>
                    {job.requiredSkills?.map((s: string) => (
                      <span
                        key={s}
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-sage-50 text-sage-800 border border-sage-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {job.preferredSkills?.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
                      <span className="text-forest-700/60 font-bold mr-1 text-[11px]">Preferred:</span>
                      {job.preferredSkills?.map((s: string) => (
                        <span
                          key={s}
                          className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-sand-100 text-forest-800 border border-sand-200"
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
                className="p-2 rounded-full text-forest-700/40 hover:text-terracotta-600 hover:bg-terracotta-50 transition-colors shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Post Job Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-forest-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FAF7F2] border border-sand-300 rounded-3xl p-6 sm:p-7 w-full max-w-xl shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-serif font-normal text-forest-900">Create Job Specification</h3>
            <form onSubmit={handleCreateJob} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-mono font-bold text-forest-800 uppercase tracking-wider mb-1.5">
                  Job Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Distributed Backend Engineer (Intern / New Grad)"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-sand-300 text-forest-900 text-xs sm:text-sm focus:outline-none focus:border-sage-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-forest-800 uppercase tracking-wider mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. San Francisco / Remote"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-sand-300 text-forest-900 text-xs sm:text-sm focus:outline-none focus:border-sage-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold text-forest-800 uppercase tracking-wider mb-1.5">
                    Employment Type
                  </label>
                  <select
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sand-300 text-forest-900 text-xs focus:outline-none focus:border-sage-500 font-mono"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-forest-800 uppercase tracking-wider mb-1.5">
                  Role Description & Scope
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summarize the core technical challenges, stack, and mission for this engineer..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-sand-300 text-forest-900 text-xs sm:text-sm focus:outline-none focus:border-sage-500 font-mono leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-forest-800 uppercase tracking-wider mb-1.5">
                    Required Skills (Comma-sep)
                  </label>
                  <input
                    type="text"
                    value={reqSkillsStr}
                    onChange={(e) => setReqSkillsStr(e.target.value)}
                    placeholder="TypeScript, PostgreSQL, Docker"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-sand-300 text-forest-900 text-xs focus:outline-none focus:border-sage-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold text-forest-800 uppercase tracking-wider mb-1.5">
                    Preferred Skills (Comma-sep)
                  </label>
                  <input
                    type="text"
                    value={prefSkillsStr}
                    onChange={(e) => setPrefSkillsStr(e.target.value)}
                    placeholder="Rust, Kubernetes, GraphQL"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-sand-300 text-forest-900 text-xs focus:outline-none focus:border-sage-500 font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-sand-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-full bg-sand-200 text-forest-800 text-xs font-mono font-medium hover:bg-sand-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-medium shadow-sm transition-transform hover:scale-105"
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
