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
  Linkedin,
  MapPin,
  Calendar,
  Layers,
  ArrowUpRight,
  TrendingUp,
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
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 animate-spin flex items-center justify-center p-1">
          <div className="w-full h-full bg-[#0a0d14] rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
          </div>
        </div>
        <p className="text-xs font-mono text-slate-400 tracking-wider">DECRYPTING VERIFIED SIGNALS...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-md mx-auto my-24 p-8 rounded-3xl glass-panel text-center space-y-5 border border-rose-500/20 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 mx-auto flex items-center justify-center">
          <AlertCircle className="w-7 h-7 text-rose-400" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-black text-white font-sans">Profile Unavailable</h2>
          <p className="text-xs text-slate-400 leading-relaxed">{error || 'This profile is private or does not exist.'}</p>
        </div>
        <Link
          to="/"
          className="inline-block px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-bold text-white border border-white/10 transition-colors"
        >
          Return to Discover
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
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
      {/* Top Fast-Pass Recruiter Banner (if active) */}
      {searchParams.get('pass') && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500/15 via-teal-500/10 to-emerald-500/15 border border-cyan-500/30 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 shadow-lg shadow-cyan-950/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-wide text-cyan-300 uppercase font-mono">
                  Recruiter Fast-Pass Active
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <p className="text-xs text-slate-300 font-medium">
                You have instant, verified access to candidate repositories, test proofs, and direct signals.
              </p>
            </div>
          </div>
          <button
            onClick={() => handleCopy('fastpass', fastPassUrl)}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-400/20 hover:bg-cyan-400/30 text-cyan-200 border border-cyan-400/40 text-xs font-bold font-mono transition-colors flex items-center gap-1.5"
          >
            {copiedType === 'fastpass' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedType === 'fastpass' ? 'Copied' : 'Copy Pass URL'}
          </button>
        </div>
      )}

      {/* Instagram/Reddit-Inspired Builder Header */}
      <div className="relative rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 overflow-hidden shadow-2xl">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-transparent blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Story-Ring Profile Avatar */}
            <div className="relative group shrink-0">
              <div className="story-ring p-1 rounded-full cursor-pointer hover:scale-105 transition-transform duration-300 shadow-glow-emerald">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#0e1422] border-2 border-slate-900 flex items-center justify-center text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-emerald-400 via-teal-300 to-cyan-400 overflow-hidden">
                  {profile.user?.name ? (
                    profile.user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
                  ) : (
                    <Sparkles className="w-8 h-8 text-emerald-400" />
                  )}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 p-1.5 rounded-full border-2 border-slate-950 shadow-md" title="Verified Proofly Builder">
                <ShieldCheck className="w-3.5 h-3.5 font-black stroke-[3]" />
              </div>
            </div>

            {/* Candidate Identity */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-sans">
                  {profile.user?.name}
                </h1>
                <span className="text-xs font-mono font-bold text-slate-400 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/10">
                  @{username}
                </span>
                <span className="text-xs font-mono font-black text-emerald-300 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {profile.completenessScore || 92}% PROOF SCORE
                </span>
              </div>

              <p className="text-sm font-semibold text-slate-200 max-w-2xl leading-relaxed">
                {profile.headline || 'Software Engineer & Builder'}
              </p>

              {profile.bio && (
                <p className="text-xs text-slate-400 max-w-2xl leading-relaxed whitespace-pre-line line-clamp-3">
                  {profile.bio}
                </p>
              )}

              {/* Badges / Links bar */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs text-slate-300 font-mono">
                {profile.location && (
                  <span className="inline-flex items-center gap-1 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {profile.location}
                  </span>
                )}
                {profile.targetGraduationYear && (
                  <span className="inline-flex items-center gap-1 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/5">
                    <GraduationCap className="w-3.5 h-3.5 text-cyan-400" /> Class of {profile.targetGraduationYear}
                  </span>
                )}

                {profile.githubUsername && (
                  <a
                    href={`https://github.com/${profile.githubUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5 text-emerald-400" />
                    <span>github/{profile.githubUsername}</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-400" />
                  </a>
                )}

                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0077b5]/15 hover:bg-[#0077b5]/25 text-[#38bdf8] border border-[#0077b5]/30 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#0a66c2]" />
                    <span>LinkedIn</span>
                    {profile.linkedinVerified && (
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    )}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Quick Action Button */}
          <div className="flex items-center gap-2 self-start shrink-0">
            <button
              onClick={() => setShowShareModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 text-xs font-black transition-transform hover:scale-105 shadow-glow-emerald"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Proof Pass</span>
            </button>
          </div>
        </div>

        {/* Quick Social Proof Stats Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
            <div className="text-lg font-black text-white font-sans">
              {profile.projects?.length || 0}
            </div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              Verified Projects
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
            <div className="text-lg font-black text-emerald-400 font-sans">
              {profile.gitHubRepos?.length || (profile.githubStats?.totalStars ? `${profile.githubStats.totalStars}★` : 'Active')}
            </div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              Public Repositories
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
            <div className="text-lg font-black text-cyan-400 font-sans">
              {profile.codingProfiles?.reduce((acc: number, cp: any) => acc + (cp.solvedCount || 0), 0) || 0}
            </div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              Problems Solved
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
            <div className="text-lg font-black text-violet-400 font-sans">
              {profile.certificates?.length || 0}
            </div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              Credentials
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal with Recruiter Fast-Pass Link */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="glass-panel border border-white/15 rounded-3xl p-6 sm:p-7 w-full max-w-lg shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Share2 className="w-5 h-5 text-emerald-400" />
                Share Candidate Proof Pass
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center text-sm transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Recruiter Fast-Pass Direct Link */}
              <div className="p-4 rounded-2xl bg-[#090d16] border border-cyan-500/40 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-cyan-300 flex items-center gap-1.5">
                    <Key className="w-4 h-4 text-cyan-400" /> Recruiter Fast-Pass Link (Recommended)
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Bypasses Auth Barrier
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Share this secure link with recruiters, engineering leads, and hiring managers. It grants instant 1-click access to review your verified project evidence, repositories, and certifications.
                </p>
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    readOnly
                    value={fastPassUrl}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white font-mono text-xs select-all focus:outline-none"
                  />
                  <button
                    onClick={() => handleCopy('fastpass', fastPassUrl)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black text-xs transition-transform hover:scale-105 shrink-0 flex items-center gap-1.5"
                  >
                    {copiedType === 'fastpass' ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Copy Pass
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Standard Public Profile Link */}
              <div className="p-4 rounded-2xl bg-[#090d16] border border-white/10 space-y-2">
                <span className="text-xs font-bold text-slate-300">Standard Public Link</span>
                <p className="text-[11px] text-slate-400">
                  Standard public profile link suitable for resumes, X bio, and LinkedIn summaries.
                </p>
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    readOnly
                    value={standardUrl}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white font-mono text-xs select-all focus:outline-none"
                  />
                  <button
                    onClick={() => handleCopy('standard', standardUrl)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5 border border-white/10"
                  >
                    {copiedType === 'standard' ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-white/10">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-bold transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GitHub Deep Activity & 52-Week Contribution Heatmap */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-white flex items-center gap-2 font-sans">
            <Github className="w-5 h-5 text-emerald-400" />
            GitHub Verified Activity & Commit Heatmap
          </h2>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            Real GitHub Data
          </span>
        </div>

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
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-white flex items-center gap-2 font-sans">
              <Code2 className="w-5 h-5 text-amber-400" />
              Verified Algorithmic Solving Stats
            </h2>
            <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
              Direct API Sync
            </span>
          </div>

          <div className="space-y-6">
            {profile.codingProfiles.map((cp: any) => (
              <CodingProfileCard key={cp.id} profile={cp} showActions={false} />
            ))}
          </div>
        </div>
      )}

      {/* Skills & Experience Visualizer */}
      {skillChartData.length > 0 && (
        <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Key Competencies & Practical Tenor
            </h2>
            <span className="text-[10px] font-mono text-slate-400">Years of Applied Experience</span>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillChartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0a0d14', borderColor: '#334155', borderRadius: '12px' }}
                  itemStyle={{ color: '#34d399', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Bar dataKey="years" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Featured Projects Section - Reddit/Substack Card Layout */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-white flex items-center gap-2 font-sans">
            <Layers className="w-5 h-5 text-emerald-400" />
            Verified Projects & Production Artifacts
          </h2>
          <span className="text-[11px] font-mono text-slate-400">
            {profile.projects?.length || 0} Showcased
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {profile.projects?.map((proj: any, idx: number) => (
            <div
              key={proj.id}
              className="p-6 rounded-3xl glass-panel border border-white/10 flex flex-col justify-between space-y-4 hover:border-emerald-500/30 transition-all hover:-translate-y-1 shadow-lg group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                      #{idx + 1}
                    </span>
                    <h3 className="text-base font-black text-white group-hover:text-emerald-300 transition-colors">
                      {proj.title}
                    </h3>
                  </div>
                  <EvidenceBadge status={proj.verificationStatus} type="project" />
                </div>

                {proj.tagline && (
                  <p className="text-xs text-slate-300 font-semibold line-clamp-1">{proj.tagline}</p>
                )}

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{proj.description}</p>

                {proj.skills && proj.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.skills.map((s: string) => (
                      <span
                        key={s}
                        className="text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-lg bg-white/[0.04] text-slate-300 border border-white/5"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  {proj.repositoryUrl && (
                    <a
                      href={proj.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white flex items-center gap-1.5 font-mono font-semibold transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" /> Source
                    </a>
                  )}
                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 font-mono font-bold transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                    </a>
                  )}
                </div>

                <div className="text-[10px] font-mono text-slate-400">
                  {proj.verifiedCommitCount ? `${proj.verifiedCommitCount} commits` : 'Verified'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      {profile.certificates?.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-black text-white flex items-center gap-2 font-sans">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Verified Credentials & Accreditations
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.certificates.map((cert: any) => (
              <div
                key={cert.id}
                className="p-5 rounded-2xl glass-panel border border-white/10 text-xs space-y-2 shadow-md hover:border-cyan-500/30 transition-all"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-white text-sm">{cert.title}</span>
                  <EvidenceBadge status={cert.verificationStatus} type="certificate" />
                </div>
                <p className="text-slate-400 text-xs">
                  {cert.issuer} {cert.credentialId && `• ID: ${cert.credentialId}`}
                </p>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 pt-1 font-mono font-bold"
                  >
                    View Credential Proof <ExternalLink className="w-3 h-3" />
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
          <h2 className="text-lg font-black text-white flex items-center gap-2 font-sans">
            <FileText className="w-5 h-5 text-emerald-400" />
            Engineering Case Studies & Write-ups
          </h2>

          <div className="space-y-3">
            {profile.posts.map((post: any) => (
              <Link
                key={post.id}
                to={`/posts/${post.slug}`}
                className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-emerald-500/30 block transition-all shadow-md group"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {post.title}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </div>
                <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">{post.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
