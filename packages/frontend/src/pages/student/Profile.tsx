import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { User, GraduationCap, Briefcase, Plus, Trash2, CheckCircle2, Award, Sparkles, MapPin, Calendar, FileText } from 'lucide-react';
import { SkillCategory, ProficiencyLevel } from '@proofly/shared';
import { BocSparkle, TactileSticker } from '../../components/common/CreativeArt';

export const StudentProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states
  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [gradYear, setGradYear] = useState<number | ''>('');

  // Modals / sub-items
  const [showEduModal, setShowEduModal] = useState(false);
  const [eduForm, setEduForm] = useState({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    grade: '',
  });

  const [showSkillModal, setShowSkillModal] = useState(false);
  const [skillForm, setSkillForm] = useState<{
    name: string;
    category: SkillCategory;
    proficiencyLevel: ProficiencyLevel;
    yearsOfExperience?: number;
  }>({
    name: '',
    category: 'LANGUAGE',
    proficiencyLevel: 'INTERMEDIATE',
    yearsOfExperience: 2,
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await api.get<any>('/student/profile');
      setProfile(data);
      setHeadline(data.headline || '');
      setBio(data.bio || '');
      setLocation(data.location || '');
      setGradYear(data.targetGraduationYear || '');
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveBasic = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const updated = await api.put<any>('/student/profile', {
        headline,
        bio,
        location: location || null,
        targetGraduationYear: gradYear ? Number(gradYear) : null,
      });
      setProfile(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/student/education', {
        ...eduForm,
        startDate: eduForm.startDate || '2022-09-01',
        isCurrent: !eduForm.endDate,
      });
      setShowEduModal(false);
      setEduForm({ institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', grade: '' });
      loadProfile();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteEducation = async (id: string) => {
    try {
      await api.delete(`/student/education/${id}`);
      loadProfile();
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/student/skills', skillForm);
      setShowSkillModal(false);
      setSkillForm({ name: '', category: 'LANGUAGE', proficiencyLevel: 'INTERMEDIATE', yearsOfExperience: 2 });
      loadProfile();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    try {
      await api.delete(`/student/skills/${id}`);
      loadProfile();
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#ff451a] via-[#ffb703] to-[#00f59b] animate-spin flex items-center justify-center p-1">
          <div className="w-full h-full bg-[#080c16] rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#ff451a] animate-pulse" />
          </div>
        </div>
        <p className="text-xs font-mono text-slate-400 tracking-wider">LOADING BUILDER IDENTITY...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-3 sm:p-6 lg:p-8 space-y-8 animate-fadeIn min-w-0 overflow-x-hidden">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-[#0c1326]/90 border border-white/10 p-5 sm:p-8 overflow-hidden shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#ff451a]/15 via-[#00f59b]/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <TactileSticker color="flame" text="BUILDER IDENTITY" />
            <BocSparkle size={18} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-sans">
            Profile Bio & Technical Competencies
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Curate your professional story, core competencies, and academic background. Recruiters inspect these signals alongside your verified code repositories.
          </p>
        </div>
      </div>

      {/* Basic Profile Form */}
      <form onSubmit={handleSaveBasic} className="p-5 sm:p-7 rounded-3xl bg-[#0c1326]/90 border border-white/10 space-y-5 shadow-xl min-w-0">
        <div className="flex items-center justify-between pb-2 border-b border-white/10 flex-wrap gap-2">
          <h2 className="text-base font-black text-white flex items-center gap-2 font-sans">
            <User className="w-4 h-4 text-[#00f59b]" />
            General Overview
          </h2>
          <span className="text-[11px] font-mono text-slate-400 font-bold">Publicly visible on your fast-pass link</span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Professional Headline
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. Distributed Systems Engineer | High-Throughput TypeScript & Rust"
              className="w-full px-4 py-2.5 rounded-xl bg-[#101934] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-[#00f59b] transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. San Francisco, CA / Remote"
                className="w-full px-4 py-2.5 rounded-xl bg-[#101934] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-[#00f59b] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Target Graduation Year
              </label>
              <input
                type="number"
                value={gradYear}
                onChange={(e) => setGradYear(e.target.value ? Number(e.target.value) : '')}
                placeholder="e.g. 2026"
                className="w-full px-4 py-2.5 rounded-xl bg-[#101934] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-[#00f59b] transition-colors font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-400" /> Technical Bio / Summary
            </label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Describe your technical architecture focus, the systems you enjoy constructing, and what excites you about software engineering."
              className="w-full px-4 py-2.5 rounded-xl bg-[#101934] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-[#00f59b] transition-colors leading-relaxed"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/10 flex-wrap gap-2">
          {saveSuccess ? (
            <span className="text-xs font-mono font-bold text-[#00f59b] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Changes saved successfully!
            </span>
          ) : <div />}
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#ff451a] to-[#ff7b00] text-white font-black text-xs transition-transform hover:scale-105 shadow-glow-coral disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Overview'}
          </button>
        </div>
      </form>

      {/* Skills Section */}
      <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/10 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <h2 className="text-base font-black text-white font-sans">
              Skills & Competencies ({profile?.skills?.length || 0})
            </h2>
          </div>
          <button
            onClick={() => setShowSkillModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-mono font-bold border border-white/10 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" /> Add Skill
          </button>
        </div>

        <div className="flex flex-wrap gap-2.5 pt-1">
          {profile?.skills?.length === 0 ? (
            <p className="text-xs text-slate-500 font-mono">No skills added yet. Add languages and frameworks to power recruiter matching.</p>
          ) : (
            profile?.skills?.map((skill: any) => (
              <div
                key={skill.id}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs hover:border-emerald-500/30 transition-colors group"
              >
                <span className="font-bold text-white">{skill.name}</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  {skill.proficiencyLevel}
                </span>
                <button
                  onClick={() => handleDeleteSkill(skill.id)}
                  className="text-slate-500 hover:text-rose-400 ml-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Education Section */}
      <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/10 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <h2 className="text-base font-black text-white font-sans">
              Education & Degrees ({profile?.educations?.length || 0})
            </h2>
          </div>
          <button
            onClick={() => setShowEduModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-mono font-bold border border-white/10 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" /> Add Education
          </button>
        </div>

        <div className="space-y-3 pt-1">
          {profile?.educations?.length === 0 ? (
            <p className="text-xs text-slate-500 font-mono">No education history recorded.</p>
          ) : (
            profile?.educations?.map((edu: any) => (
              <div
                key={edu.id}
                className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start justify-between gap-4 hover:border-white/10 transition-colors"
              >
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">{edu.institution}</h4>
                  <p className="text-xs text-slate-300">
                    {edu.degree} in {edu.fieldOfStudy}
                  </p>
                  {edu.grade && <p className="text-xs text-emerald-400 font-mono">{edu.grade}</p>}
                </div>
                <button
                  onClick={() => handleDeleteEducation(edu.id)}
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Skill Modal */}
      {showSkillModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="glass-panel border border-white/15 rounded-3xl p-6 sm:p-7 w-full max-w-md shadow-2xl space-y-4">
            <h3 className="text-base font-black text-white font-sans">Add Technical Skill</h3>
            <form onSubmit={handleAddSkill} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Skill Name
                </label>
                <input
                  type="text"
                  required
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  placeholder="e.g. TypeScript, React, Go, Kafka"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <select
                    value={skillForm.category}
                    onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500 font-mono"
                  >
                    <option value="LANGUAGE">Language</option>
                    <option value="FRAMEWORK">Framework</option>
                    <option value="DATABASE">Database</option>
                    <option value="TOOL">Tool / DevOps</option>
                    <option value="CONCEPT">Concept</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Proficiency
                  </label>
                  <select
                    value={skillForm.proficiencyLevel}
                    onChange={(e) => setSkillForm({ ...skillForm, proficiencyLevel: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500 font-mono"
                  >
                    <option value="BEGINNER">Beginner</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="ADVANCED">Advanced</option>
                    <option value="EXPERT">Expert</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowSkillModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.04] text-slate-300 text-xs font-bold hover:bg-white/[0.08]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 text-xs font-black shadow-glow-emerald hover:scale-105 transition-transform"
                >
                  Add Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Education Modal */}
      {showEduModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="glass-panel border border-white/15 rounded-3xl p-6 sm:p-7 w-full max-w-md shadow-2xl space-y-4">
            <h3 className="text-base font-black text-white font-sans">Add Education Record</h3>
            <form onSubmit={handleAddEducation} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Institution
                </label>
                <input
                  type="text"
                  required
                  value={eduForm.institution}
                  onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                  placeholder="e.g. UC Berkeley, IIT Delhi, Waterloo"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Degree
                  </label>
                  <input
                    type="text"
                    required
                    value={eduForm.degree}
                    onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                    placeholder="e.g. B.S."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    required
                    value={eduForm.fieldOfStudy}
                    onChange={(e) => setEduForm({ ...eduForm, fieldOfStudy: e.target.value })}
                    placeholder="e.g. Computer Science"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  GPA / Honors (Optional)
                </label>
                <input
                  type="text"
                  value={eduForm.grade}
                  onChange={(e) => setEduForm({ ...eduForm, grade: e.target.value })}
                  placeholder="e.g. 3.9 GPA / Dean's List"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowEduModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.04] text-slate-300 text-xs font-bold hover:bg-white/[0.08]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 text-xs font-black shadow-glow-cyan hover:scale-105 transition-transform"
                >
                  Add Education
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
