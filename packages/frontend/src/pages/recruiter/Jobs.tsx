import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { Briefcase, Plus, Trash2, MapPin, Clock, CheckCircle2 } from 'lucide-react';

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
    return <div className="p-8 text-center text-slate-400">Loading job postings...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Organization Job Profiles</h1>
          <p className="text-sm text-slate-400 mt-1">
            Define requirements to power the AI candidate matcher and discover tailored talent.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm transition-colors shadow-md shadow-emerald-500/10"
        >
          <Plus className="w-4 h-4" /> Post New Job
        </button>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {job.status}
                </span>
                <h3 className="text-base font-bold text-white">{job.title}</h3>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {job.employmentType}
                </span>
                {job.minGraduationYear && <span>Min Grad: {job.minGraduationYear}</span>}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">{job.description}</p>

              <div className="space-y-1.5 pt-1">
                <div className="flex flex-wrap items-center gap-1 text-xs">
                  <span className="text-slate-400 font-semibold mr-1">Required:</span>
                  {job.requiredSkills?.map((s: string) => (
                    <span
                      key={s}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-emerald-400 border border-emerald-500/30"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {job.preferredSkills?.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1 text-xs">
                    <span className="text-slate-400 font-semibold mr-1">Preferred:</span>
                    {job.preferredSkills?.map((s: string) => (
                      <span
                        key={s}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
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
              className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors shrink-0"
              title="Delete Job"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Post Job Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-white mb-4">Post New Job Specification</h3>
            <form onSubmit={handleCreateJob} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Full-Stack Software Engineer"
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. San Francisco / Remote"
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Employment Type
                  </label>
                  <input
                    type="text"
                    required
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                    placeholder="e.g. Full-time, Internship"
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Required Skills (Comma-separated)
                </label>
                <input
                  type="text"
                  required
                  value={reqSkillsStr}
                  onChange={(e) => setReqSkillsStr(e.target.value)}
                  placeholder="e.g. TypeScript, React, Node.js, PostgreSQL"
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Preferred Skills (Optional, comma-separated)
                </label>
                <input
                  type="text"
                  value={prefSkillsStr}
                  onChange={(e) => setPrefSkillsStr(e.target.value)}
                  placeholder="e.g. AWS, Docker, GraphQL"
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Job Description
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail the responsibilities, project scope, and team mission."
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-600"
                >
                  Create Job Spec
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
