import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { GitBranch, Github, Code2, RefreshCw, CheckCircle2, AlertCircle, Plus, Trash2, Sparkles, Linkedin, ExternalLink, Zap } from 'lucide-react';
import { GitHubProfileCard } from '../../components/common/GitHubProfileCard';
import { CodingProfileCard } from '../../components/common/CodingProfileCard';
import { DelicateStarOrnament } from '../../components/common/CreativeArt';

export const StudentIntegrationsPage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncingGithub, setIsSyncingGithub] = useState(false);
  const [githubHandle, setGithubHandle] = useState('');
  const [githubToken, setGithubToken] = useState('');
  const [githubMsg, setGithubMsg] = useState<string | null>(null);
  const [isDisconnectingGithub, setIsDisconnectingGithub] = useState(false);

  // Coding profile form
  const [platform, setPlatform] = useState<'LEETCODE' | 'HACKERRANK' | 'CODEFORCES'>('LEETCODE');
  const [codingUsername, setCodingUsername] = useState('');
  const [isAddingCoding, setIsAddingCoding] = useState(false);
  const [syncingProfileId, setSyncingProfileId] = useState<string | null>(null);

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

  const handleDisconnectGithub = async () => {
    if (!window.confirm('Are you sure you want to disconnect GitHub? All auto-synced repositories and projects from this account will be removed.')) {
      return;
    }
    setIsDisconnectingGithub(true);
    setGithubMsg(null);
    try {
      await api.delete('/integrations/github');
      setGithubHandle('');
      setGithubToken('');
      setGithubMsg('GitHub account disconnected. Synced projects and repositories have been removed.');
      await loadData();
    } catch (e: any) {
      setGithubMsg(`Failed to disconnect GitHub: ${e.message}`);
    } finally {
      setIsDisconnectingGithub(false);
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

  const handleSyncCodingProfile = async (id: string) => {
    setSyncingProfileId(id);
    try {
      await api.post(`/integrations/coding-profiles/${id}/sync`);
      await loadData();
    } catch (e: any) {
      console.error(e);
    } finally {
      setSyncingProfileId(null);
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
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border-2 border-sage-500 border-t-terracotta-500 animate-spin flex items-center justify-center p-1">
          <Sparkles className="w-5 h-5 text-terracotta-500" />
        </div>
        <p className="text-xs font-mono text-forest-700/60 tracking-wider">SYNCING INTEGRATED SIGNAL PROVIDERS...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-10 overflow-hidden animate-fadeIn">
      {/* Header Banner */}
      <div className="relative rounded-[28px] bg-[#385241] text-white p-6 sm:p-8 overflow-hidden shadow-[4px_4px_0px_#1F2C23] border-2 border-[#1F2C23] w-full max-w-full">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/40 shadow-[1px_1px_0px_rgba(0,0,0,0.3)] text-xs font-mono font-bold">
            <Zap className="w-3.5 h-3.5 text-[#FCE5DB]" />
            <span>REAL-TIME PLATFORM ORCHESTRATION</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-white">
            External Integrations & Verified Signals
          </h1>
          <p className="text-xs sm:text-sm text-white/90 max-w-3xl leading-relaxed font-medium">
            Connect GitHub and algorithmic platforms. Proofly crawls and aggregates deep evidence (contribution heatmaps, difficulty breakdown, streaks, acceptance rates) directly in-app so scouts never have to tab out.
          </p>
        </div>
      </div>

      {/* 1. GitHub Integration Section */}
      <div className="space-y-6 w-full max-w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#1F2C23] flex items-center justify-center text-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]">
              <Github className="w-5 h-5 text-[#1F2C23]" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-black text-[#1F2C23]">GitHub Activity & 52-Week Heatmap</h2>
              <p className="text-xs text-[#586E5F]">
                Live contribution graph, repositories, language metrics, and verified commit history.
              </p>
            </div>
          </div>
        </div>

        {/* Sync Controls Form */}
        <form onSubmit={handleSyncGithub} className="space-y-3 bg-white p-5 sm:p-6 rounded-[24px] border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] w-full max-w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono font-black text-[#1F2C23] uppercase tracking-wider mb-1.5">
                GitHub Username / Handle
              </label>
              <input
                type="text"
                value={githubHandle}
                onChange={(e) => setGithubHandle(e.target.value)}
                placeholder="e.g. harmandugri15"
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-[#1F2C23] placeholder:text-[#758C7D] text-xs focus:outline-none focus:shadow-[3px_3px_0px_#1F2C23] font-mono transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono font-black text-[#1F2C23] uppercase tracking-wider mb-1.5">
                Personal Access Token (Optional for Private Repos / Rate Limits)
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="password"
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                  placeholder="ghp_... or github_pat_..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#FAF7F2] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-[#1F2C23] placeholder:text-[#758C7D] text-xs focus:outline-none focus:shadow-[3px_3px_0px_#1F2C23] font-mono transition-all"
                />
                <button
                  type="submit"
                  disabled={isSyncingGithub}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1F2C23] hover:bg-[#385241] disabled:opacity-50 text-white font-bold text-xs border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all shrink-0"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-white ${isSyncingGithub ? 'animate-spin' : ''}`} />
                  <span className="text-white font-bold">{isSyncingGithub ? 'Syncing...' : 'Sync GitHub'}</span>
                </button>
              </div>
            </div>
          </div>

          {githubMsg && (
            <p className="text-xs font-mono text-sage-800 flex items-center gap-1.5 pt-2">
              <CheckCircle2 className="w-4 h-4 text-sage-600" /> {githubMsg}
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
          <div className="space-y-3 pt-2 w-full max-w-full">
            <h3 className="text-xs font-mono font-black uppercase tracking-wider text-[#1F2C23]">
              Synchronized Public Repositories ({profile.gitHubRepos.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profile.gitHubRepos.map((repo: any, idx: number) => {
                const cardTints = ['bg-white', 'bg-[#FEF9C3]', 'bg-[#E0F2FE]', 'bg-[#DCFCE7]'];
                const cardTint = cardTints[idx % cardTints.length];
                return (
                  <div
                    key={repo.id}
                    className={`p-5 rounded-[22px] ${cardTint} border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] flex items-start justify-between gap-3 text-xs transition-transform hover:-translate-y-0.5`}
                  >
                    <div className="space-y-1.5 min-w-0">
                      <a
                        href={repo.htmlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-black text-[#1F2C23] hover:underline text-sm truncate block"
                      >
                        {repo.name}
                      </a>
                      <p className="text-[#385241] line-clamp-1 font-medium">{repo.description || 'No description provided'}</p>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono pt-1">
                        <span className="bg-[#FFDE59] px-2 py-0.5 rounded-lg border-2 border-[#1F2C23] font-black text-[#1F2C23] shadow-[1px_1px_0px_#1F2C23]">
                          ★ {repo.starsCount}
                        </span>
                        <span className="bg-white px-2 py-0.5 rounded-lg text-[#1F2C23] border-2 border-[#1F2C23] font-black shadow-[1px_1px_0px_#1F2C23]">
                          {repo.primaryLanguage || 'Code'}
                        </span>
                        <span className="font-bold text-[#1F2C23]">{repo.recentCommitCount} commits</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#1F2C23] font-mono bg-[#86EFAC] px-2.5 py-0.5 rounded-lg border-2 border-[#1F2C23] shadow-[1px_1px_0px_#1F2C23] shrink-0 font-black uppercase">
                      Live
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 2. Coding Platforms Section (LeetCode, HackerRank, Codeforces) */}
      <div className="space-y-6 pt-6 border-t-2 border-[#1F2C23]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FEF9C3] border-2 border-[#1F2C23] flex items-center justify-center text-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]">
              <Code2 className="w-5 h-5 text-[#1F2C23]" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-black text-[#1F2C23]">Algorithmic Problem Solving Profiles</h2>
              <p className="text-xs text-[#586E5F]">
                Connect LeetCode, HackerRank, and Codeforces handles. Renders verified problem breakdowns, difficulty distributions, and streaks.
              </p>
            </div>
          </div>
        </div>

        {/* Link Handle Form */}
        <form onSubmit={handleAddCodingProfile} className="bg-white p-5 sm:p-6 rounded-[24px] border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] space-y-3 w-full max-w-full">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-mono font-black text-[#1F2C23] uppercase tracking-wider mb-1.5">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-[#1F2C23] text-xs focus:outline-none focus:shadow-[3px_3px_0px_#1F2C23] font-mono font-bold"
              >
                <option value="LEETCODE">LeetCode</option>
                <option value="HACKERRANK">HackerRank</option>
                <option value="CODEFORCES">Codeforces</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-mono font-black text-[#1F2C23] uppercase tracking-wider mb-1.5">
                Profile Username / Handle
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  required
                  value={codingUsername}
                  onChange={(e) => setCodingUsername(e.target.value)}
                  placeholder="e.g. harmandugri15 or dev_solver"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#FAF7F2] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-[#1F2C23] placeholder:text-[#758C7D] text-xs focus:outline-none focus:shadow-[3px_3px_0px_#1F2C23] font-mono"
                />
                <button
                  type="submit"
                  disabled={isAddingCoding}
                  className="px-5 py-2.5 rounded-xl bg-[#FFDE59] hover:bg-[#FACC15] disabled:opacity-50 text-[#1F2C23] font-black text-xs border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all shrink-0 flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4 text-[#1F2C23]" />
                  <span>{isAddingCoding ? 'Linking...' : 'Link Handle'}</span>
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Coding Profile Cards List */}
        <div className="space-y-6 w-full max-w-full">
          {profile?.codingProfiles && profile.codingProfiles.length > 0 ? (
            profile.codingProfiles.map((cp: any) => (
              <CodingProfileCard
                key={cp.id}
                profile={cp}
                onDelete={handleDeleteCodingProfile}
                onSync={handleSyncCodingProfile}
                isSyncing={syncingProfileId === cp.id}
                showActions={true}
              />
            ))
          ) : (
            <div className="p-8 rounded-[24px] bg-[#FEF9C3]/40 border-2 border-dashed border-[#1F2C23] text-center space-y-2">
              <Code2 className="w-8 h-8 text-[#1F2C23] mx-auto" />
              <p className="text-xs text-[#1F2C23] font-bold">
                No coding profiles linked yet. Add your LeetCode, HackerRank, or Codeforces handle above to display verified algorithmic problem counts and acceptance rates.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 3. LinkedIn Integration Section */}
      <div className="space-y-6 pt-6 border-t-2 border-[#1F2C23] w-full max-w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#70D6FF] border-2 border-[#1F2C23] flex items-center justify-center text-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]">
              <Linkedin className="w-5 h-5 text-[#1F2C23]" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-black text-[#1F2C23]">LinkedIn Profile & Verification</h2>
              <p className="text-xs text-[#586E5F]">
                Connect your LinkedIn profile to display a verified badge on your public portfolio and recruiter candidate view.
              </p>
            </div>
          </div>
        </div>

        {profile?.linkedinUrl ? (
          <div className="p-5 rounded-[24px] bg-white border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full max-w-full">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#70D6FF] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] flex items-center justify-center text-[#1F2C23] shrink-0">
                <Linkedin className="w-5 h-5 text-[#1F2C23]" />
              </div>
              <div className="space-y-0.5 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-black text-[#1F2C23] hover:underline flex items-center gap-1.5 truncate"
                  >
                    <span className="truncate">{profile.linkedinUrl}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#1F2C23] shrink-0" />
                  </a>
                  {profile.linkedinVerified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#86EFAC] border-2 border-[#1F2C23] shadow-[1px_1px_0px_#1F2C23] text-[#1F2C23] text-[10px] font-mono font-black shrink-0 uppercase">
                      <CheckCircle2 className="w-3 h-3 text-[#1F2C23]" /> Verified
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#586E5F] font-medium">
                  Visible to verified recruiters and linked on your public candidate portfolio.
                </p>
              </div>
            </div>

            <button
              onClick={handleDisconnectLinkedin}
              className="px-4 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#FEE2E2] text-[#1F2C23] text-xs font-mono font-black border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all shrink-0 self-start sm:self-auto"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <form onSubmit={handleConnectLinkedin} className="bg-white p-5 sm:p-6 rounded-[24px] border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] space-y-3 w-full max-w-full">
            <div>
              <label className="block text-[11px] font-mono font-black text-[#1F2C23] uppercase tracking-wider mb-1.5">
                LinkedIn Profile URL
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  required
                  value={linkedinInput}
                  onChange={(e) => setLinkedinInput(e.target.value)}
                  placeholder="https://www.linkedin.com/in/your-handle"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#FAF7F2] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-[#1F2C23] placeholder:text-[#758C7D] text-xs focus:outline-none focus:shadow-[3px_3px_0px_#1F2C23] font-mono"
                />
                <button
                  type="submit"
                  disabled={isConnectingLinkedin || !linkedinInput.trim()}
                  className="px-5 py-2.5 rounded-xl bg-[#70D6FF] hover:bg-[#38BDF8] disabled:opacity-50 text-[#1F2C23] font-black text-xs border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all shrink-0 flex items-center justify-center gap-1.5"
                >
                  <Linkedin className="w-4 h-4 text-[#1F2C23]" />
                  <span>{isConnectingLinkedin ? 'Connecting...' : 'Connect & Verify'}</span>
                </button>
              </div>
            </div>

            {linkedinMsg && (
              <p className="text-xs font-mono font-bold text-[#1F2C23] flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> {linkedinMsg}
              </p>
            )}

            {linkedinError && (
              <p className="text-xs font-mono font-bold text-[#DC2626] flex items-center gap-1.5 pt-1">
                <AlertCircle className="w-4 h-4 text-[#DC2626]" /> {linkedinError}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
