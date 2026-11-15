import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { User, GraduationCap, Briefcase, Plus, Trash2, CheckCircle2, Award, Sparkles, MapPin, Calendar, FileText } from 'lucide-react';
import { SkillCategory, ProficiencyLevel } from '@proofly/shared';
import { DelicateStarOrnament } from '../../components/common/CreativeArt';

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
        <div className="w-12 h-12 rounded-full border-2 border-sage-500 border-t-terracotta-500 animate-spin flex items-center justify-center p-1">
          <Sparkles className="w-5 h-5 text-terracotta-500" />
        </div>
        <p className="text-xs font-mono text-forest-700/60 tracking-wider">LOADING BUILDER IDENTITY...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-3 sm:p-6 lg:p-8 space-y-8 animate-fadeIn min-w-0 overflow-x-hidden">
      {/* Header Banner */}
      <div className="relative rounded-[28px] bg-[#385241] text-white p-6 sm:p-8 overflow-hidden shadow-[5px_5px_0px_#1F2C23] border-2 border-[#1F2C23]">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-[#FFDE59]/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-[#70D6FF]/30 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-black uppercase px-3 py-1 rounded-xl bg-[#FFDE59] text-[#1F2C23] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]">
              BUILDER IDENTITY
            </span>
            <DelicateStarOrnament className="w-4 h-4 text-[#FCE5DB]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-white">
            Profile Bio & Technical Competencies
          </h1>
          <p className="text-xs sm:text-sm text-white/90 max-w-2xl leading-relaxed font-medium">
            Curate your professional story, core competencies, and academic background. Recruiters inspect these signals alongside your verified code repositories.
          </p>
        </div>
      </div>

      {/* Basic Profile Form */}
      <form onSubmit={handleSaveBasic} className="p-6 sm:p-8 rounded-[28px] bg-white border-2 border-[#1F2C23] shadow-[5px_5px_0px_#1F2C23] space-y-6 min-w-0">
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#1F2C23]/10 flex-wrap gap-2">
          <h2 className="text-base font-serif font-black text-[#1F2C23] flex items-center gap-2">
            <User className="w-4 h-4 text-[#D97043]" />
            General Overview
          </h2>
          <span className="text-[11px] font-mono text-[#586E5F] font-bold">Publicly visible on your fast-pass link</span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono font-black text-[#1F2C23] uppercase tracking-wider mb-1.5">
              Professional Headline
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. Distributed Systems Engineer | High-Throughput TypeScript & Rust"
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-[#1F2C23] placeholder:text-[#758C7D] text-xs sm:text-sm focus:outline-none focus:shadow-[3px_3px_0px_#1F2C23] font-bold transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono font-black text-[#1F2C23] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D97043]" /> Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. San Francisco, CA / Remote"
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-[#1F2C23] placeholder:text-[#758C7D] text-xs sm:text-sm focus:outline-none focus:shadow-[3px_3px_0px_#1F2C23] font-bold transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-black text-[#1F2C23] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#385241]" /> Target Graduation Year
              </label>
              <input
                type="number"
                value={gradYear}
                onChange={(e) => setGradYear(e.target.value ? Number(e.target.value) : '')}
                placeholder="e.g. 2026"
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-[#1F2C23] placeholder:text-[#758C7D] text-xs sm:text-sm focus:outline-none focus:shadow-[3px_3px_0px_#1F2C23] font-mono font-bold transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono font-black text-[#1F2C23] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#1F2C23]" /> Technical Bio / Summary
            </label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Describe your technical architecture focus, the systems you enjoy constructing, and what excites you about software engineering."
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-[#1F2C23] placeholder:text-[#758C7D] text-xs sm:text-sm focus:outline-none focus:shadow-[3px_3px_0px_#1F2C23] font-medium transition-all leading-relaxed"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t-2 border-[#1F2C23]/10 flex-wrap gap-2">
          {saveSuccess ? (
            <span className="text-xs font-mono font-black text-[#16A34A] flex items-center gap-1.5 bg-[#DCFCE7] px-3 py-1 rounded-lg border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Changes saved successfully!
            </span>
          ) : <div />}
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-[#D97043] hover:bg-[#C55F34] text-white font-black text-xs border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Overview'}
          </button>
        </div>
      </form>

      {/* Skills Section (Neo-Brutalist Pop Pastel Pills) */}
      <div className="p-6 sm:p-8 rounded-[28px] bg-white border-2 border-[#1F2C23] shadow-[5px_5px_0px_#1F2C23] space-y-5">
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#1F2C23]/10">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#D97043]" />
            <h2 className="text-base font-serif font-black text-[#1F2C23]">
              Skills & Competencies ({profile?.skills?.length || 0})
            </h2>
          </div>
          <button
            onClick={() => setShowSkillModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFDE59] hover:bg-[#FACC15] text-[#1F2C23] text-xs font-mono font-black border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-[#1F2C23] stroke-[3]" /> Add Skill
          </button>
        </div>

        <div className="flex flex-wrap gap-2.5 pt-1">
          {profile?.skills?.length === 0 ? (
            <p className="text-xs text-[#586E5F] font-mono font-bold">No skills added yet. Add languages and frameworks to power recruiter matching.</p>
          ) : (
            profile?.skills?.map((skill: any, sIdx: number) => {
              const pillBgs = ['bg-[#FEF9C3]', 'bg-[#E0F2FE]', 'bg-[#DCFCE7]', 'bg-[#F3E8FF]'];
              const pillBg = pillBgs[sIdx % pillBgs.length];

              return (
                <div
                  key={skill.id}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl ${pillBg} border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-xs font-black text-[#1F2C23] hover:shadow-[3px_3px_0px_#1F2C23] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all group`}
                >
                  <span className="font-mono">{skill.name}</span>
                  <span className="text-[10px] font-mono font-black text-[#1F2C23] bg-white px-2 py-0.5 rounded-md border border-[#1F2C23] shadow-[1px_1px_0px_#1F2C23]">
                    {skill.proficiencyLevel}
                  </span>
                  <button
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="text-[#1F2C23] hover:text-[#DC2626] ml-1 transition-colors"
                    title="Remove skill"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Education Section */}
      <div className="p-6 sm:p-8 rounded-[28px] bg-white border-2 border-[#1F2C23] shadow-[5px_5px_0px_#1F2C23] space-y-5">
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#1F2C23]/10">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#385241]" />
            <h2 className="text-base font-serif font-black text-[#1F2C23]">
              Education & Degrees ({profile?.educations?.length || 0})
            </h2>
          </div>
          <button
            onClick={() => setShowEduModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#70D6FF] hover:bg-[#58C4F0] text-[#1F2C23] text-xs font-mono font-black border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-[#1F2C23] stroke-[3]" /> Add Education
          </button>
        </div>

        <div className="space-y-3 pt-1">
          {profile?.educations?.length === 0 ? (
            <p className="text-xs text-[#586E5F] font-mono font-bold">No education history recorded.</p>
          ) : (
            profile?.educations?.map((edu: any) => (
              <div
                key={edu.id}
                className="p-5 rounded-2xl bg-[#FEF9C3] border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] flex items-start justify-between gap-4 hover:shadow-[5px_5px_0px_#1F2C23] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
              >
                <div className="space-y-1">
                  <h4 className="text-sm font-serif font-black text-[#1F2C23]">{edu.institution}</h4>
                  <p className="text-xs text-[#24362A] font-bold">
                    {edu.degree} in {edu.fieldOfStudy}
                  </p>
                  {edu.grade && (
                    <p className="text-xs text-[#1F2C23] font-mono font-black bg-white inline-block px-2 py-0.5 rounded-md border border-[#1F2C23] shadow-[1px_1px_0px_#1F2C23]">
                      {edu.grade}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteEducation(edu.id)}
                  className="p-2 rounded-xl text-[#1F2C23] hover:text-[#DC2626] hover:bg-white border-2 border-transparent hover:border-[#1F2C23] transition-all"
                  title="Remove education"
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
        <div className="fixed inset-0 bg-[#1F2C23]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FAF7F2] border-2 border-[#1F2C23] rounded-[28px] p-6 sm:p-7 w-full max-w-md shadow-[8px_8px_0px_#1F2C23] space-y-4">
            <h3 className="text-base font-serif font-black text-[#1F2C23]">Add Technical Skill</h3>
            <form onSubmit={handleAddSkill} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono font-black text-[#1F2C23] uppercase tracking-wider mb-1.5">
                  Skill Name
                </label>
                <input
                  type="text"
                  required
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  placeholder="e.g. TypeScript, React, Go, Kafka"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-[#1F2C23] text-xs sm:text-sm focus:outline-none focus:shadow-[3px_3px_0px_#1F2C23] font-mono font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-black text-[#1F2C23] uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <select
                    value={skillForm.category}
                    onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-[#1F2C23] text-xs focus:outline-none focus:shadow-[3px_3px_0px_#1F2C23] font-mono font-bold"
                  >
                    <option value="LANGUAGE">Language</option>
                    <option value="FRAMEWORK">Framework</option>
                    <option value="DATABASE">Database</option>
                    <option value="TOOL">Tool / DevOps</option>
                    <option value="CONCEPT">Concept</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-black text-[#1F2C23] uppercase tracking-wider mb-1.5">
                    Proficiency
                  </label>
                  <select
                    value={skillForm.proficiencyLevel}
                    onChange={(e) => setSkillForm({ ...skillForm, proficiencyLevel: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-[#1F2C23] text-xs focus:outline-none focus:shadow-[3px_3px_0px_#1F2C23] font-mono font-bold"
                  >
                    <option value="BEGINNER">Beginner</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="ADVANCED">Advanced</option>
                    <option value="EXPERT">Expert</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t-2 border-[#1F2C23]/10">
                <button
                  type="button"
                  onClick={() => setShowSkillModal(false)}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#1F2C23] text-xs font-mono font-black border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D97043] hover:bg-[#C55F34] text-white text-xs font-black border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
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
        <div className="fixed inset-0 bg-[#1F2C23]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FAF7F2] border-2 border-[#1F2C23] rounded-[28px] p-6 sm:p-7 w-full max-w-md shadow-[8px_8px_0px_#1F2C23] space-y-4">
            <h3 className="text-base font-serif font-black text-[#1F2C23]">Add Education Record</h3>
            <form onSubmit={handleAddEducation} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-mono font-black text-[#1F2C23] uppercase tracking-wider mb-1.5">
                  Institution
                </label>
                <input
                  type="text"
                  required
                  value={eduForm.institution}
                  onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                  placeholder="e.g. UC Berkeley, IIT Delhi, Waterloo"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-[#1F2C23] text-xs sm:text-sm focus:outline-none focus:shadow-[3px_3px_0px_#1F2C23] font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-black text-[#1F2C23] uppercase tracking-wider mb-1.5">
                    Degree
                  </label>
                  <input
                    type="text"
                    required
                    value={eduForm.degree}
                    onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                    placeholder="e.g. B.S."
                    className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-[#1F2C23] text-xs sm:text-sm focus:outline-none focus:shadow-[3px_3px_0px_#1F2C23] font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-black text-[#1F2C23] uppercase tracking-wider mb-1.5">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    required
                    value={eduForm.fieldOfStudy}
                    onChange={(e) => setEduForm({ ...eduForm, fieldOfStudy: e.target.value })}
                    placeholder="e.g. Computer Science"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-[#1F2C23] text-xs sm:text-sm focus:outline-none focus:shadow-[3px_3px_0px_#1F2C23] font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-black text-[#1F2C23] uppercase tracking-wider mb-1.5">
                  GPA / Honors (Optional)
                </label>
                <input
                  type="text"
                  value={eduForm.grade}
                  onChange={(e) => setEduForm({ ...eduForm, grade: e.target.value })}
                  placeholder="e.g. 3.9 GPA / Dean's List"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-[#1F2C23] text-xs sm:text-sm focus:outline-none focus:shadow-[3px_3px_0px_#1F2C23] font-mono font-bold"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t-2 border-[#1F2C23]/10">
                <button
                  type="button"
                  onClick={() => setShowEduModal(false)}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#1F2C23] text-xs font-mono font-black border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D97043] hover:bg-[#C55F34] text-white text-xs font-black border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
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
