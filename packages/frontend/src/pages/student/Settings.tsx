import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { Settings, Shield, Eye, Lock, Download, CheckCircle2, AlertTriangle, Sparkles, UserCheck } from 'lucide-react';
import { ProfileVisibility } from '@proofly/shared';

export const StudentSettingsPage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [visibility, setVisibility] = useState<ProfileVisibility>('PUBLIC');
  const [isOpenToWork, setIsOpenToWork] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await api.get<any>('/student/profile');
      setProfile(data);
      setVisibility(data.visibility);
      setIsOpenToWork(data.isOpenToWork);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveVisibility = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.put('/student/profile', {
        visibility,
        isOpenToWork,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportData = () => {
    const jsonStr = JSON.stringify(profile, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `proofly-portfolio-${profile?.username || 'candidate'}.json`;
    a.click();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
            <Shield className="w-3.5 h-3.5" />
            <span>SOVEREIGN DATA CONTROLS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-sans">
            Privacy & Identity Sovereignty
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
            You own your telemetry and portfolio. Toggle discovery permissions, recruiter visibility, and export your machine-readable dossier.
          </p>
        </div>
      </div>

      {/* Visibility Controls */}
      <form onSubmit={handleSaveVisibility} className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/10 space-y-6 shadow-xl">
        <div>
          <h2 className="text-base font-black text-white flex items-center gap-2 font-sans mb-1">
            <Shield className="w-4 h-4 text-emerald-400" />
            Candidate Discovery Level
          </h2>
          <p className="text-xs text-slate-400">
            Control who can view your repositories, certifications, and algorithmic problem proofs.
          </p>
        </div>

        <div className="space-y-3">
          <label
            className={`p-4 sm:p-5 rounded-2xl border flex items-start gap-3.5 cursor-pointer transition-all ${
              visibility === 'PUBLIC'
                ? 'bg-emerald-500/[0.08] border-emerald-500/40 shadow-glow-emerald'
                : 'bg-white/[0.02] border-white/5 hover:border-white/10'
            }`}
          >
            <input
              type="radio"
              name="visibility"
              value="PUBLIC"
              checked={visibility === 'PUBLIC'}
              onChange={() => setVisibility('PUBLIC')}
              className="mt-1 text-emerald-400 focus:ring-0"
            />
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-400" /> Public (Recommended)
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Anyone with your shareable URL (<span className="font-mono text-emerald-300">/u/{profile?.username}</span>) and all verified recruiters can view your full portfolio.
              </p>
            </div>
          </label>

          <label
            className={`p-4 sm:p-5 rounded-2xl border flex items-start gap-3.5 cursor-pointer transition-all ${
              visibility === 'RECRUITER_ONLY'
                ? 'bg-cyan-500/[0.08] border-cyan-500/40 shadow-glow-cyan'
                : 'bg-white/[0.02] border-white/5 hover:border-white/10'
            }`}
          >
            <input
              type="radio"
              name="visibility"
              value="RECRUITER_ONLY"
              checked={visibility === 'RECRUITER_ONLY'}
              onChange={() => setVisibility('RECRUITER_ONLY')}
              className="mt-1 text-cyan-400 focus:ring-0"
            />
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-cyan-400" /> Verified Recruiters Only
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Only authenticated recruiters from verified organizations can discover you. Anonymous public link visitors will see a restricted access screen unless they have a fast-pass link.
              </p>
            </div>
          </label>

          <label
            className={`p-4 sm:p-5 rounded-2xl border flex items-start gap-3.5 cursor-pointer transition-all ${
              visibility === 'PRIVATE'
                ? 'bg-slate-800/40 border-slate-700 shadow-md'
                : 'bg-white/[0.02] border-white/5 hover:border-white/10'
            }`}
          >
            <input
              type="radio"
              name="visibility"
              value="PRIVATE"
              checked={visibility === 'PRIVATE'}
              onChange={() => setVisibility('PRIVATE')}
              className="mt-1 text-slate-400 focus:ring-0"
            />
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-slate-500" /> Private (Stealth Mode)
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Hidden from public discovery and general recruiter search. Accessible only to hiring teams with your direct recruiter fast-pass URL.
              </p>
            </div>
          </label>
        </div>

        {/* Open to Work Toggle */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-sm font-bold text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-400" /> Open to Work Signals
            </span>
            <p className="text-xs text-slate-400">
              Signal to scouts that you are actively seeking internships or new-grad full-time roles.
            </p>
          </div>
          <input
            type="checkbox"
            checked={isOpenToWork}
            onChange={(e) => setIsOpenToWork(e.target.checked)}
            className="w-5 h-5 rounded-lg border-white/20 bg-slate-950 text-emerald-500 focus:ring-0 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          {saveSuccess ? (
            <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Preferences updated!
            </span>
          ) : <div />}

          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-black text-xs transition-transform hover:scale-105 shadow-glow-emerald disabled:opacity-50"
          >
            {isSaving ? 'Updating...' : 'Save Settings'}
          </button>
        </div>
      </form>

      {/* Data Export / Portability */}
      <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/10 space-y-4 shadow-xl">
        <h2 className="text-base font-black text-white flex items-center gap-2 font-sans">
          <Download className="w-4 h-4 text-cyan-400" />
          Export Candidate Dossier (JSON)
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Download your complete profile data, verified repository statistics, certificates, and skills in a portable, machine-readable JSON archive.
        </p>

        <button
          onClick={handleExportData}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-mono font-bold text-xs border border-white/10 transition-colors"
        >
          <Download className="w-4 h-4 text-cyan-400" /> Download Dossier JSON
        </button>
      </div>
    </div>
  );
};
