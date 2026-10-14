import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { GitBranch, Github, Code2, RefreshCw, CheckCircle2, AlertCircle, Plus, Trash2, Sparkles, Linkedin, ExternalLink } from 'lucide-react';
import { GitHubProfileCard } from '../../components/common/GitHubProfileCard';
import { CodingProfileCard } from '../../components/common/CodingProfileCard';

export const StudentIntegrationsPage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncingGithub, setIsSyncingGithub] = useState(false);
  const [githubHandle, setGithubHandle] = useState('');
  const [githubToken, setGithubToken] = useState('');
  const [githubMsg, setGithubMsg] = useState<string | null>(null);

  // Coding profile form
  const [platform, setPlatform] = useState<'LEETCODE' | 'HACKERRANK' | 'CODEFORCES'>('LEETCODE');
  const [codingUsername, setCodingUsername] = useState('');
  const [isAddingCoding, setIsAddingCoding] = useState(false);

  // LinkedIn form
  const [linkedinInput, setLinkedinInput] = useState('');
  const [isConnectingLinkedin, setIsConnectingLinkedin] = useState(false);
  const [linkedinMsg, setLinkedinMsg] = useState<string | null>(null);
  const [linkedinError, setLinkedinError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await api.get<any>('/student/profile');
      setProfile(data);
      if (data.githubUsername) {
        setGithubHandle(data.githubUsername);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSyncGithub = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSyncingGithub(true);
    setGithubMsg(null);

    try {
      const result = await api.post<any>('/integrations/github/sync', {
        token: githubToken || undefined,
        username: githubHandle || profile?.githubUsername || profile?.username,
      });
      setGithubMsg(`Successfully synced ${result.syncedCount} repositories and updated contribution heatmap.`);
      await loadData();
    } catch (e: any) {
      setGithubMsg(`Sync failed: ${e.message}`);
    } finally {
      setIsSyncingGithub(false);
    }
  };

  const handleAddCodingProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingCoding(true);
    try {
      await api.post('/integrations/coding-profiles', {
        platform,
        username: codingUsername,
      });
      setCodingUsername('');
      await loadData();
    } catch (e) {
      console.error(e);
    } finally {
      setIsAddingCoding(false);
    }
  };

  const handleDeleteCodingProfile = async (id: string) => {
    try {
      await api.delete(`/integrations/coding-profiles/${id}`);
      await loadData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleConnectLinkedin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkedinInput.trim()) return;
    setIsConnectingLinkedin(true);
    setLinkedinMsg(null);
    setLinkedinError(null);
    try {
      const res = await api.post<any>('/integrations/linkedin', {
        linkedinUrl: linkedinInput.trim(),
      });
      setLinkedinMsg(res.message || 'LinkedIn connected and verified!');
      setLinkedinInput('');
      await loadData();
    } catch (e: any) {
      setLinkedinError(e?.message || 'Failed to connect LinkedIn. Please ensure it is a valid LinkedIn profile URL.');
    } finally {
      setIsConnectingLinkedin(false);
    }
  };

  const handleDisconnectLinkedin = async () => {
    if (!confirm('Are you sure you want to disconnect your LinkedIn profile?')) return;
    try {
      await api.delete('/integrations/linkedin');
      await loadData();
    } catch (e: any) {
      alert(e?.message || 'Failed to disconnect LinkedIn');
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-slate-400">Loading integrations...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">External Integrations & Deep Signals</h1>
        <p className="text-sm text-slate-400 mt-1">
          Connect your GitHub account and algorithmic coding profiles. Proofly crawls and aggregates deep evidence (contribution heatmaps, difficulty breakdown, streaks, acceptance rates) directly in-app so recruiters never have to leave the platform.
        </p>
      </div>

      {/* 1. GitHub Integration Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">GitHub Integration & Activity Heatmap</h2>
              <p className="text-xs text-slate-400">
                Live 52-week contribution graph, repositories, language percentages, and commit history.
              </p>
            </div>
          </div>
        </div>

        {/* Sync Controls Form */}
        <form onSubmit={handleSyncGithub} className="space-y-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                GitHub Username / Handle
              </label>
              <input
                type="text"
                value={githubHandle}
                onChange={(e) => setGithubHandle(e.target.value)}
                placeholder="e.g. alexchen"
                className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Personal Access Token (Optional for Private Repos / Rate Limits)
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                  placeholder="ghp_... or leave empty for public data"
                  className="flex-1 px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500 font-mono"
                />
                <button
                  type="submit"
                  disabled={isSyncingGithub}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-bold text-xs transition-colors shrink-0"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncingGithub ? 'animate-spin' : ''}`} />
                  {isSyncingGithub ? 'Syncing...' : 'Sync GitHub'}
                </button>
              </div>
            </div>
          </div>

          {githubMsg && (
            <p className="text-xs text-emerald-400 flex items-center gap-1.5 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> {githubMsg}
            </p>
          )}
        </form>

        {/* Rich GitHub Profile & Heatmap Display Card */}
        <GitHubProfileCard
          githubUsername={profile?.githubUsername}
          githubStats={profile?.githubStats}
          repos={profile?.gitHubRepos || []}
          onSync={() => handleSyncGithub()}
          isSyncing={isSyncingGithub}
          showSyncButton={true}
        />

        {/* Selected Repositories List */}
        {profile?.gitHubRepos?.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Synchronized Public Repositories ({profile.gitHubRepos.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {profile.gitHubRepos.map((repo: any) => (
                <div
                  key={repo.id}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-3 text-xs shadow-md"
                >
                  <div className="space-y-1">
                    <a
                      href={repo.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-white hover:text-emerald-400 transition-colors"
                    >
                      {repo.name}
                    </a>
                    <p className="text-slate-400 line-clamp-1">{repo.description || 'No description'}</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono pt-1">
                      <span>★ {repo.starsCount}</span>
                      <span>{repo.primaryLanguage || 'Code'}</span>
                      <span>{repo.recentCommitCount} commits</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. Coding Platforms Section (LeetCode, HackerRank, Codeforces) */}
      <div className="space-y-6 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Algorithmic Problem Solving Profiles</h2>
              <p className="text-xs text-slate-400">
                Connect LeetCode, HackerRank, and Codeforces handles. Renders verified problem breakdowns, difficulty distributions, acceptance rates, and recent submissions.
              </p>
            </div>
          </div>
        </div>

        {/* Link Handle Form */}
        <form onSubmit={handleAddCodingProfile} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
              >
                <option value="LEETCODE">LeetCode</option>
                <option value="HACKERRANK">HackerRank</option>
                <option value="CODEFORCES">Codeforces</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Profile Username / Handle
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={codingUsername}
                  onChange={(e) => setCodingUsername(e.target.value)}
                  placeholder="e.g. alexchen_dev or mayap_sys"
                  className="flex-1 px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500 font-mono"
                />
                <button
                  type="submit"
                  disabled={isAddingCoding}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  {isAddingCoding ? 'Linking...' : 'Link Platform Handle'}
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Coding Profile Cards List */}
        <div className="space-y-6">
          {profile?.codingProfiles && profile.codingProfiles.length > 0 ? (
            profile.codingProfiles.map((cp: any) => (
              <CodingProfileCard
                key={cp.id}
                profile={cp}
                onDelete={handleDeleteCodingProfile}
                showActions={true}
              />
            ))
          ) : (
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2">
              <Code2 className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400">
                No coding profiles linked yet. Add your LeetCode, HackerRank, or Codeforces handle above to display verified algorithmic problem counts and acceptance rates.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 3. LinkedIn Integration Section */}
      <div className="space-y-6 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0077b5]/15 border border-[#0077b5]/30 flex items-center justify-center text-[#0a66c2]">
              <Linkedin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">LinkedIn Profile & Verification</h2>
              <p className="text-xs text-slate-400">
                Connect your LinkedIn profile to display a verified badge on your public portfolio and recruiter candidate view.
              </p>
            </div>
          </div>
        </div>

        {profile?.linkedinUrl ? (
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0077b5]/20 flex items-center justify-center text-[#0a66c2] shrink-0">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-white hover:text-[#0a66c2] transition-colors flex items-center gap-1.5"
                  >
                    <span>{profile.linkedinUrl}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                  {profile.linkedinVerified && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400">
                  Visible to verified recruiters and linked on your public candidate portfolio.
                </p>
              </div>
            </div>

            <button
              onClick={handleDisconnectLinkedin}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 text-xs font-semibold border border-slate-700 transition-colors shrink-0"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <form onSubmit={handleConnectLinkedin} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                LinkedIn Profile URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  required
                  value={linkedinInput}
                  onChange={(e) => setLinkedinInput(e.target.value)}
                  placeholder="https://www.linkedin.com/in/your-handle"
                  className="flex-1 px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#0a66c2] font-mono"
                />
                <button
                  type="submit"
                  disabled={isConnectingLinkedin || !linkedinInput.trim()}
                  className="px-4 py-2 rounded-lg bg-[#0077b5] hover:bg-[#006097] disabled:opacity-50 text-white font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  {isConnectingLinkedin ? 'Connecting...' : 'Connect & Verify'}
                </button>
              </div>
            </div>

            {linkedinMsg && (
              <p className="text-xs text-emerald-400 flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {linkedinMsg}
              </p>
            )}

            {linkedinError && (
              <p className="text-xs text-rose-400 flex items-center gap-1.5 pt-1">
                <AlertCircle className="w-3.5 h-3.5" /> {linkedinError}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
