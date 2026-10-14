import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { Settings, Shield, Eye, Lock, Download, CheckCircle2, AlertTriangle } from 'lucide-react';
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
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Privacy & Settings</h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage your candidate portfolio visibility, recruiter discovery preferences, and data sovereignty.
        </p>
      </div>

      {/* Visibility Controls */}
      <form onSubmit={handleSaveVisibility} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-emerald-400" />
            Profile Visibility Level
          </h2>
          <p className="text-xs text-slate-400">
            Control who can discover and view your projects, certificates, and code statistics.
          </p>
        </div>

        <div className="space-y-3">
          <label
            className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
              visibility === 'PUBLIC'
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
            }`}
          >
            <input
              type="radio"
              name="visibility"
              value="PUBLIC"
              checked={visibility === 'PUBLIC'}
              onChange={() => setVisibility('PUBLIC')}
              className="mt-1 text-emerald-500 focus:ring-0"
            />
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-400" /> Public (Recommended)
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Anyone with your shareable URL (<span className="font-mono text-slate-300">/u/{profile?.username}</span>) and all verified recruiters can discover and view your portfolio.
              </p>
            </div>
          </label>

          <label
            className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
              visibility === 'RECRUITER_ONLY'
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
            }`}
          >
            <input
              type="radio"
              name="visibility"
              value="RECRUITER_ONLY"
              checked={visibility === 'RECRUITER_ONLY'}
              onChange={() => setVisibility('RECRUITER_ONLY')}
              className="mt-1 text-emerald-500 focus:ring-0"
            />
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-teal-400" /> Verified Recruiters Only
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Only authenticated recruiters from verified organizations can discover you. Anonymous public link visitors will see a restricted access screen.
              </p>
            </div>
          </label>

          <label
            className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
              visibility === 'PRIVATE'
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
            }`}
          >
            <input
              type="radio"
              name="visibility"
              value="PRIVATE"
              checked={visibility === 'PRIVATE'}
              onChange={() => setVisibility('PRIVATE')}
              className="mt-1 text-emerald-500 focus:ring-0"
            />
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-slate-400" /> Private (Draft Mode)
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Hidden from search and recruiter candidate pools. Only you can view this profile while you draft evidence.
              </p>
            </div>
          </label>
        </div>

        <div className="pt-2 flex items-center justify-between">
          {saveSuccess && (
            <span className="text-xs text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Preferences updated!
            </span>
          )}
          <div className="ml-auto">
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm transition-colors"
            >
              {isSaving ? 'Saving...' : 'Save Preferences'}
            </button>
          </div>
        </div>
      </form>

      {/* Data Sovereignty & Export */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2 mb-1">
            <Download className="w-4 h-4 text-emerald-400" />
            Export Your Evidence & Candidate Summary
          </h2>
          <p className="text-xs text-slate-400">
            Export a complete JSON archive of all your verified credentials, projects, and metadata.
          </p>
        </div>

        <button
          onClick={handleExportData}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
        >
          <Download className="w-4 h-4" /> Export Candidate Profile (JSON)
        </button>
      </div>
    </div>
  );
};
