import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { GitBranch, Github, Code2, RefreshCw, CheckCircle2, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { EvidenceBadge } from '../../components/common/EvidenceBadge';

export const StudentIntegrationsPage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncingGithub, setIsSyncingGithub] = useState(false);
  const [githubToken, setGithubToken] = useState('');
  const [githubMsg, setGithubMsg] = useState<string | null>(null);

  // Coding profile form
  const [platform, setPlatform] = useState<'LEETCODE' | 'HACKERRANK' | 'CODEFORCES'>('LEETCODE');
  const [codingUsername, setCodingUsername] = useState('');
  const [isAddingCoding, setIsAddingCoding] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await api.get<any>('/student/profile');
      setProfile(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSyncGithub = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSyncingGithub(true);
    setGithubMsg(null);

    try {
      const result = await api.post<any>('/integrations/github/sync', {
        token: githubToken || undefined,
        username: profile?.username,
      });
      setGithubMsg(`Successfully synced ${result.syncedCount} repositories.`);
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

  if (isLoading) {
    return <div className="p-8 text-center text-slate-400">Loading integrations...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">External Integrations</h1>
        <p className="text-sm text-slate-400 mt-1">
          Connect your GitHub repositories and coding platform handles to showcase real code and algorithmic problem solving.
        </p>
      </div>

      {/* GitHub Integration Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-white">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">GitHub Integration</h2>
              <p className="text-xs text-slate-400">
                Synchronize public repositories, stars, language statistics, and commit cadence.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {profile?.gitHubRepos?.length > 0 ? 'Connected' : 'Not Connected'}
          </span>
        </div>

        <form onSubmit={handleSyncGithub} className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Personal Access Token or Public Handle (Optional for higher rate limits)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
                placeholder="ghp_... or leave empty to sync by public username"
                className="flex-1 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={isSyncingGithub}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-bold text-xs transition-colors shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncingGithub ? 'animate-spin' : ''}`} />
                {isSyncingGithub ? 'Syncing...' : 'Sync Repositories'}
              </button>
            </div>
          </div>

          {githubMsg && (
            <p className="text-xs text-emerald-400 flex items-center gap-1.5 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> {githubMsg}
            </p>
          )}
        </form>

        {/* Repositories List */}
        {profile?.gitHubRepos?.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Imported Repositories ({profile.gitHubRepos.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {profile.gitHubRepos.map((repo: any) => (
                <div
                  key={repo.id}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3 text-xs"
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
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                      <span>★ {repo.starsCount}</span>
                      <span>{repo.primaryLanguage || 'Code'}</span>
                      <span>{repo.recentCommitCount} commits</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    Selected
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* LeetCode & HackerRank Coding Profiles */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Coding Platforms (LeetCode & HackerRank)</h2>
              <p className="text-xs text-slate-400">
                Link public handles to import verified problem solving stats and contest rankings.
              </p>
            </div>
          </div>
        </div>

        {/* Add Coding Profile Form */}
        <form onSubmit={handleAddCodingProfile} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
              >
                <option value="LEETCODE">LeetCode</option>
                <option value="HACKERRANK">HackerRank</option>
                <option value="CODEFORCES">Codeforces</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Profile Username / Handle
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={codingUsername}
                  onChange={(e) => setCodingUsername(e.target.value)}
                  placeholder="e.g. alexchen_dev"
                  className="flex-1 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  disabled={isAddingCoding}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-bold text-xs transition-colors shrink-0"
                >
                  {isAddingCoding ? 'Linking...' : 'Link Profile'}
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Connected Coding Profiles */}
        <div className="space-y-3">
          {profile?.codingProfiles?.map((cp: any) => (
            <div
              key={cp.id}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{cp.platform}</span>
                  <span className="text-xs text-slate-400 font-mono">@{cp.username}</span>
                  <EvidenceBadge status={cp.syncStatus} />
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-300">
                  <span>Solved: <strong className="text-white">{cp.totalSolved}</strong> problems</span>
                  {cp.rating && <span>Rating: <strong className="text-emerald-400">{cp.rating}</strong></span>}
                  {cp.ranking && <span>Global Rank: #{cp.ranking}</span>}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={cp.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  View Profile
                </a>
                <button
                  onClick={() => handleDeleteCodingProfile(cp.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
