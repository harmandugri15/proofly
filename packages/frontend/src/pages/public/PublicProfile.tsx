import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { api } from '../../lib/api';
import {
  ShieldCheck,
  Github,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Code2,
  Share2,
  CheckCircle2,
  AlertCircle,
  FileText,
  Key,
  Copy,
  Lock,
  Sparkles,
} from 'lucide-react';
import { EvidenceBadge } from '../../components/common/EvidenceBadge';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { GitHubProfileCard } from '../../components/common/GitHubProfileCard';
import { CodingProfileCard } from '../../components/common/CodingProfileCard';

export const PublicProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Share Modal State
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedType, setCopiedType] = useState<'standard' | 'fastpass' | null>(null);

  useEffect(() => {
    loadPublicProfile();
  }, [username, searchParams]);

  const loadPublicProfile = async () => {
    try {
      const pass = searchParams.get('pass') || searchParams.get('token');
      const queryStr = pass ? `?pass=${encodeURIComponent(pass)}` : '';
      const data = await api.get<any>(`/public/profile/${username}${queryStr}`);
      setProfile(data);
    } catch (err: any) {
      setError(err?.message || 'Unable to view this profile.');
    } finally {
      setIsLoading(false);
    }
  };

  const standardUrl = `${window.location.origin}/u/${username}`;
  const fastPassUrl = profile?.shareToken
    ? `${window.location.origin}/u/${username}?pass=${profile.shareToken}`
    : standardUrl;

  const handleCopy = (type: 'standard' | 'fastpass', text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  if (isLoading) {
    return <div className="p-16 text-center text-slate-400">Loading verified portfolio...</div>;
  }

  if (error || !profile) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-400 mx-auto" />
        <h2 className="text-lg font-bold text-white">Profile Unavailable</h2>
        <p className="text-xs text-slate-400">{error || 'This profile is private or does not exist.'}</p>
        <Link
          to="/"
          className="inline-block px-4 py-2 rounded-lg bg-slate-800 text-xs font-semibold text-slate-200"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  // Prepare skill chart data
  const skillChartData =
    profile.skills?.slice(0, 6).map((s: any) => ({
      name: s.name,
      years: s.yearsOfExperience || 1,
    })) || [];

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-10">
      {/* Profile Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-850 border border-slate-800 flex flex-col md:flex-row md:items-start justify-between gap-6 shadow-xl">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {profile.user?.name}
            </h1>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
              {profile.completenessScore}% Proof Score
            </span>
            {searchParams.get('pass') && (
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20 flex items-center gap-1">
                <Key className="w-3 h-3" /> Recruiter Fast-Pass Active
              </span>
            )}
          </div>

          <p className="text-sm font-semibold text-slate-300 max-w-2xl">{profile.headline}</p>

          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed whitespace-pre-line">
            {profile.bio}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 font-mono">
            {profile.location && <span>Location: {profile.location}</span>}
            {profile.targetGraduationYear && <span>Class of {profile.targetGraduationYear}</span>}
            <span className="text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Candidate
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowShareModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold transition-colors shrink-0 shadow-lg shadow-emerald-500/10"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Recruiter Link</span>
        </button>
      </div>

      {/* Share Modal with Recruiter Fast-Pass Link */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Share2 className="w-5 h-5 text-emerald-400" />
                Share Candidate Profile
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-4">
              {/* Recruiter Fast-Pass Direct Link */}
              <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5" /> Recruiter Fast-Pass Link (Recommended)
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300">
                    Bypasses sign-in barrier
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Share this secure link with recruiters and hiring managers. It grants instant 1-click access to review your verified project evidence, repositories, and certifications.
                </p>
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    readOnly
                    value={fastPassUrl}
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white font-mono text-xs select-all focus:outline-none"
                  />
                  <button
                    onClick={() => handleCopy('fastpass', fastPassUrl)}
                    className="px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold text-xs transition-colors shrink-0 flex items-center gap-1"
                  >
                    {copiedType === 'fastpass' ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Link
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Standard Public Profile Link */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-slate-300">Standard Public Link</span>
                <p className="text-[11px] text-slate-400">
                  Standard public profile link for resumes and social bio.
                </p>
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    readOnly
                    value={standardUrl}
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white font-mono text-xs select-all focus:outline-none"
                  />
                  <button
                    onClick={() => handleCopy('standard', standardUrl)}
                    className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors shrink-0 flex items-center gap-1 border border-slate-700"
                  >
                    {copiedType === 'standard' ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GitHub Deep Activity & 52-Week Contribution Heatmap */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Github className="w-5 h-5 text-emerald-400" />
          GitHub Engineering Signals & Contribution Cadence
        </h2>

        <GitHubProfileCard
          githubUsername={profile.githubUsername}
          githubStats={profile.githubStats}
          repos={profile.gitHubRepos || []}
          showSyncButton={false}
        />
      </div>

      {/* Algorithmic Problem Solving Profiles (LeetCode, HackerRank, Codeforces) */}
      {profile.codingProfiles && profile.codingProfiles.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-amber-400" />
            Verified Algorithmic Problem Solving Profiles
          </h2>

          <div className="space-y-6">
            {profile.codingProfiles.map((cp: any) => (
              <CodingProfileCard key={cp.id} profile={cp} showActions={false} />
            ))}
          </div>
        </div>
      )}

      {/* Skills & Experience Visualizer */}
      {skillChartData.length > 0 && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Key Competencies (Years of Experience)
          </h2>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillChartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#10b981', fontSize: '12px' }}
                />
                <Bar dataKey="years" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Projects Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-emerald-400" />
          Featured Projects & Evidence
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.projects?.map((proj: any) => (
            <div
              key={proj.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3 shadow-lg"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-white">{proj.title}</h3>
                  <EvidenceBadge status={proj.verificationStatus} type="project" />
                </div>
                <p className="text-xs text-slate-300 font-medium">{proj.tagline}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.skills?.map((s: string) => (
                    <span
                      key={s}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center gap-4 text-xs">
                {proj.repositoryUrl && (
                  <a
                    href={proj.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    <Github className="w-3.5 h-3.5" /> Source Code
                  </a>
                )}
                {proj.demoUrl && (
                  <a
                    href={proj.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      {profile.certificates?.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Verified Certifications
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.certificates.map((cert: any) => (
              <div
                key={cert.id}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5 shadow-md"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-white">{cert.title}</span>
                  <EvidenceBadge status={cert.verificationStatus} type="certificate" />
                </div>
                <p className="text-slate-400">
                  {cert.issuer} {cert.credentialId && `• ID: ${cert.credentialId}`}
                </p>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline inline-flex items-center gap-1 pt-1"
                  >
                    View Credential Link <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Published Technical Articles */}
      {profile.posts?.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            Technical Case Studies
          </h2>

          <div className="space-y-3">
            {profile.posts.map((post: any) => (
              <Link
                key={post.id}
                to={`/posts/${post.slug}`}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 block transition-colors shadow-md"
              >
                <h3 className="text-sm font-bold text-white hover:text-emerald-400">{post.title}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{post.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
