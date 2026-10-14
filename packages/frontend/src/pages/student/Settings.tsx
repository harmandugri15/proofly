import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { Settings, Shield, Eye, Lock, Download, CheckCircle2, AlertTriangle, Sparkles, UserCheck } from 'lucide-react';
import { ProfileVisibility } from '@proofly/shared';
import { DelicateStarOrnament } from '../../components/common/CreativeArt';

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
    <div className="w-full max-w-4xl mx-auto p-3 sm:p-6 lg:p-8 space-y-8 animate-fadeIn min-w-0 overflow-x-hidden">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-[#7D9B86] text-white p-6 sm:p-8 overflow-hidden shadow-lg border border-sage-700/30">
        <div className="relative z-10 space-y-2 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/25">
              SOVEREIGN DATA CONTROLS
            </span>
            <DelicateStarOrnament className="w-4 h-4 text-terracotta-300" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight text-white">
            Privacy & Identity Sovereignty
          </h1>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl leading-relaxed">
            You own your telemetry and portfolio. Toggle discovery permissions, recruiter visibility, and export your machine-readable dossier.
          </p>
        </div>
      </div>

      {/* Visibility Controls */}
      <form onSubmit={handleSaveVisibility} className="p-6 sm:p-7 rounded-3xl bg-white/95 border border-sand-200/80 space-y-6 shadow-sm">
        <div>
          <h2 className="text-base font-serif font-normal text-forest-900 flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-sage-600" />
            Candidate Discovery Level
          </h2>
          <p className="text-xs text-forest-700/60">
            Control who can view your repositories, certifications, and algorithmic problem proofs.
          </p>
        </div>

        <div className="space-y-3">
          <label
            className={`p-4 sm:p-5 rounded-2xl border flex items-start gap-3.5 cursor-pointer transition-all ${
              visibility === 'PUBLIC'
                ? 'bg-sage-50/80 border-sage-400 shadow-2xs'
                : 'bg-sand-50/50 border-sand-200 hover:border-sand-300'
            }`}
          >
            <input
              type="radio"
              name="visibility"
              value="PUBLIC"
              checked={visibility === 'PUBLIC'}
              onChange={() => setVisibility('PUBLIC')}
              className="mt-1 text-sage-600 focus:ring-0"
            />
            <div>
              <div className="text-sm font-medium text-forest-900 flex items-center gap-2">
                <Eye className="w-4 h-4 text-sage-600" /> Public (Recommended)
              </div>
              <p className="text-xs text-forest-700/70 mt-1 leading-relaxed">
                Anyone with your shareable URL (<span className="font-mono text-sage-800 font-bold">/u/{profile?.username}</span>) and all verified recruiters can view your full portfolio.
              </p>
            </div>
          </label>

          <label
            className={`p-4 sm:p-5 rounded-2xl border flex items-start gap-3.5 cursor-pointer transition-all ${
              visibility === 'RECRUITER_ONLY'
                ? 'bg-sage-50/80 border-sage-400 shadow-2xs'
                : 'bg-sand-50/50 border-sand-200 hover:border-sand-300'
            }`}
          >
            <input
              type="radio"
              name="visibility"
              value="RECRUITER_ONLY"
              checked={visibility === 'RECRUITER_ONLY'}
              onChange={() => setVisibility('RECRUITER_ONLY')}
              className="mt-1 text-sage-600 focus:ring-0"
            />
            <div>
              <div className="text-sm font-medium text-forest-900 flex items-center gap-2">
                <Lock className="w-4 h-4 text-terracotta-600" /> Verified Recruiters Only
              </div>
              <p className="text-xs text-forest-700/70 mt-1 leading-relaxed">
                Only authenticated recruiters from verified organizations can discover you. Anonymous public link visitors will see a restricted access screen unless they have a fast-pass link.
              </p>
            </div>
          </label>

          <label
            className={`p-4 sm:p-5 rounded-2xl border flex items-start gap-3.5 cursor-pointer transition-all ${
              visibility === 'PRIVATE'
                ? 'bg-sand-100 border-sand-400 shadow-2xs'
                : 'bg-sand-50/50 border-sand-200 hover:border-sand-300'
            }`}
          >
            <input
              type="radio"
              name="visibility"
              value="PRIVATE"
              checked={visibility === 'PRIVATE'}
              onChange={() => setVisibility('PRIVATE')}
              className="mt-1 text-forest-700/60 focus:ring-0"
            />
            <div>
              <div className="text-sm font-medium text-forest-900 flex items-center gap-2">
                <Lock className="w-4 h-4 text-forest-700/50" /> Private (Stealth Mode)
              </div>
              <p className="text-xs text-forest-700/70 mt-1 leading-relaxed">
                Hidden from public discovery and general recruiter search. Accessible only to hiring teams with your direct recruiter fast-pass URL.
              </p>
            </div>
          </label>
        </div>

        {/* Open to Work Toggle */}
        <div className="p-4 sm:p-5 rounded-2xl bg-sand-50/60 border border-sand-200 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-sm font-medium text-forest-900 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-sage-600" /> Open to Work Signals
            </span>
            <p className="text-xs text-forest-700/60">
              Signal to scouts that you are actively seeking internships or new-grad full-time roles.
            </p>
          </div>
          <input
            type="checkbox"
            checked={isOpenToWork}
            onChange={(e) => setIsOpenToWork(e.target.checked)}
            className="w-5 h-5 rounded-lg border-sand-300 text-sage-600 focus:ring-0 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-sand-200">
          {saveSuccess ? (
            <span className="text-xs font-mono font-bold text-sage-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Preferences updated!
            </span>
          ) : <div />}

          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-medium text-xs transition-transform hover:scale-105 shadow-sm disabled:opacity-50"
          >
            {isSaving ? 'Updating...' : 'Save Settings'}
          </button>
        </div>
      </form>

      {/* Data Export / Portability */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white/95 border border-sand-200/80 space-y-4 shadow-sm">
        <h2 className="text-base font-serif font-normal text-forest-900 flex items-center gap-2">
          <Download className="w-4 h-4 text-sage-600" />
          Export Candidate Dossier (JSON)
        </h2>
        <p className="text-xs text-forest-700/70 leading-relaxed">
          Download your complete profile data, verified repository statistics, certificates, and skills in a portable, machine-readable JSON archive.
        </p>

        <button
          onClick={handleExportData}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sand-100 hover:bg-sand-200 text-forest-900 font-mono font-medium text-xs border border-sand-200 transition-colors"
        >
          <Download className="w-4 h-4 text-forest-700/60" /> Download Dossier JSON
        </button>
      </div>
    </div>
  );
};
