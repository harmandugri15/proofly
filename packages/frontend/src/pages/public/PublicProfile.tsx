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
import { DelicateStarOrnament, OrganicLeafLogo, Stamp100Verified } from '../../components/common/CreativeArt';

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
        <div className="w-12 h-12 rounded-full border-2 border-sage-500 border-t-terracotta-500 animate-spin flex items-center justify-center p-1">
          <Sparkles className="w-5 h-5 text-terracotta-500" />
        </div>
        <p className="text-xs font-mono text-forest-700/60 tracking-wider">RETRIEVING VERIFIED SIGNALS...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-md mx-auto my-24 p-8 rounded-3xl bg-white/90 text-center space-y-5 border border-sand-300 shadow-sm">
        <div className="w-14 h-14 rounded-full bg-terracotta-50 border border-terracotta-200 mx-auto flex items-center justify-center">
          <AlertCircle className="w-7 h-7 text-terracotta-600" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-serif font-normal text-forest-900">Profile Unavailable</h2>
          <p className="text-xs text-forest-700/70 leading-relaxed">{error || 'This profile is private or does not exist.'}</p>
        </div>
        <Link
          to="/"
          className="inline-block px-5 py-2.5 rounded-full bg-sand-100 hover:bg-sand-200 text-xs font-mono font-bold text-forest-900 border border-sand-200 transition-colors"
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
    <div className="w-full max-w-6xl mx-auto p-3 sm:p-6 lg:p-8 space-y-8 animate-fadeIn min-w-0 overflow-x-hidden">
      {/* Top Fast-Pass Recruiter Banner (if active) */}
      {searchParams.get('pass') && (
        <div className="p-4 sm:p-5 rounded-3xl bg-[#7D9B86] text-white border border-sage-700/30 flex flex-wrap items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-white shrink-0">
              <Key className="w-5 h-5 text-terracotta-300" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-wide uppercase font-mono text-white">
                  Recruiter Fast-Pass Active
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
              </div>
              <p className="text-xs text-white/80 font-medium truncate sm:whitespace-normal">
                You have instant, verified access to candidate repositories, test proofs, and direct signals.
              </p>
            </div>
          </div>
          <button
            onClick={() => handleCopy('fastpass', fastPassUrl)}
            className="px-4 py-2 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-mono font-medium transition-transform hover:scale-105 flex items-center gap-1.5 shadow-sm shrink-0"
          >
            {copiedType === 'fastpass' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedType === 'fastpass' ? 'Copied' : 'Copy Pass URL'}
          </button>
        </div>
      )}

      {/* Artisanal Dossier Header */}
      <div className="relative rounded-3xl bg-white/95 border border-sand-200/80 p-6 sm:p-8 overflow-hidden shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 min-w-0">
            {/* Story-Ring Profile Avatar */}
            <div className="relative group shrink-0">
              <div className="p-1 rounded-full bg-gradient-to-tr from-sage-500 via-sand-300 to-terracotta-500 shadow-sm">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FAF7F2] border-2 border-white flex items-center justify-center text-2xl sm:text-3xl font-serif font-normal text-forest-900 overflow-hidden">
                  {profile.user?.name ? (
                    profile.user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
                  ) : (
                    <Sparkles className="w-8 h-8 text-terracotta-500" />
                  )}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-sage-600 text-white p-1.5 rounded-full border-2 border-white shadow-sm" title="Verified Proofly Builder">
                <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </div>

            {/* Candidate Identity */}
            <div className="space-y-2 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-serif font-normal text-forest-900 tracking-tight flex items-center gap-2 break-words">
                  <span>{profile.user?.name}</span>
                  <DelicateStarOrnament className="w-4 h-4 text-terracotta-500" />
                </h1>
                <span className="text-xs font-mono font-medium text-forest-700/60 bg-sand-100 px-2.5 py-1 rounded-full border border-sand-200">
                  @{username}
                </span>
                <span className="text-xs font-mono font-bold text-sage-800 bg-sage-50 px-3 py-1 rounded-full border border-sage-200">
                  {profile.completenessScore || 92}% PROOF SCORE
                </span>
              </div>

              <p className="text-sm font-medium text-forest-800 max-w-2xl leading-relaxed break-words">
                {profile.headline || 'Software Engineer & Builder'}
              </p>

              {profile.bio && (
                <p className="text-xs text-forest-700/70 max-w-2xl leading-relaxed whitespace-pre-line line-clamp-3 break-words">
                  {profile.bio}
                </p>
              )}

              {/* Badges / Links bar */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono">
                {profile.location && (
                  <span className="inline-flex items-center gap-1.5 bg-sand-50 text-forest-700/75 px-3 py-1 rounded-full border border-sand-200">
                    <MapPin className="w-3.5 h-3.5 text-sage-600" /> {profile.location}
                  </span>
                )}
                {profile.targetGraduationYear && (
                  <span className="inline-flex items-center gap-1.5 bg-sand-50 text-forest-700/75 px-3 py-1 rounded-full border border-sand-200">
                    <GraduationCap className="w-3.5 h-3.5 text-terracotta-500" /> Class of {profile.targetGraduationYear}
                  </span>
                )}

                {profile.githubUsername && (
                  <a
                    href={`https://github.com/${profile.githubUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-100 hover:bg-sand-200 text-forest-900 border border-sand-200 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5 text-forest-900" />
                    <span>github/{profile.githubUsername}</span>
                    <ArrowUpRight className="w-3 h-3 text-forest-700/50" />
                  </a>
                )}

                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0077b5]/10 hover:bg-[#0077b5]/15 text-[#0077b5] border border-[#0077b5]/20 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#0a66c2]" />
                    <span>LinkedIn</span>
                    {profile.linkedinVerified && (
                      <CheckCircle2 className="w-3 h-3 text-sage-600" />
                    )}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Quick Action Button: Share Proof Pass */}
          <div className="flex items-center gap-2 self-start shrink-0">
            <button
              onClick={() => setShowShareModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-medium transition-transform hover:scale-105 shadow-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Proof Pass</span>
            </button>
          </div>
        </div>

        {/* Quick Social Proof Stats Bar */}
        <div className="mt-6 pt-5 border-t border-sand-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-sand-50/80 border border-sand-200/80 text-center hover:border-sage-400/50 transition-colors">
            <div className="text-2xl font-serif font-normal text-forest-900">
              {profile.projects?.length || 0}
            </div>
            <div className="text-[10px] font-mono text-forest-700/60 uppercase tracking-wider font-bold">
              Verified Projects
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-sand-50/80 border border-sand-200/80 text-center hover:border-sage-400/50 transition-colors">
            <div className="text-2xl font-serif font-normal text-sage-700">
              {profile.gitHubRepos?.length || (profile.githubStats?.totalStars ? `${profile.githubStats.totalStars}★` : 'Active')}
            </div>
            <div className="text-[10px] font-mono text-forest-700/60 uppercase tracking-wider font-bold">
              Public Repositories
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-sand-50/80 border border-sand-200/80 text-center hover:border-sage-400/50 transition-colors">
            <div className="text-2xl font-serif font-normal text-terracotta-600">
              {profile.codingProfiles?.reduce((acc: number, cp: any) => acc + (cp.solvedCount || 0), 0) || 0}
            </div>
            <div className="text-[10px] font-mono text-forest-700/60 uppercase tracking-wider font-bold">
              Problems Solved
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-sand-50/80 border border-sand-200/80 text-center hover:border-sage-400/50 transition-colors">
            <div className="text-2xl font-serif font-normal text-forest-900">
              {profile.certificates?.length || 0}
            </div>
            <div className="text-[10px] font-mono text-forest-700/60 uppercase tracking-wider font-bold">
              Credentials
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal with Recruiter Fast-Pass Link */}
      {showShareModal && (
        <div className="fixed inset-0 bg-forest-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
          <div className="bg-[#FAF7F2] border border-sand-300 rounded-3xl p-6 sm:p-7 w-full max-w-lg shadow-2xl space-y-5 min-w-0">
            <div className="flex items-center justify-between pb-3 border-b border-sand-200">
              <h3 className="text-base font-serif font-normal text-forest-900 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-terracotta-600" />
                Share Candidate Proof Pass
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-8 h-8 rounded-full bg-sand-200 hover:bg-sand-300 text-forest-800 flex items-center justify-center text-sm transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Recruiter Fast-Pass Direct Link */}
              <div className="p-4 rounded-2xl bg-white border-2 border-sage-500 space-y-2.5">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <span className="text-xs font-bold text-sage-800 flex items-center gap-1.5 font-mono">
                    <Key className="w-4 h-4 text-terracotta-600" /> Recruiter Fast-Pass Link (Recommended)
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-sage-100 text-sage-800 border border-sage-300">
                    Bypasses Auth Barrier
                  </span>
                </div>
                <p className="text-[11px] text-forest-700/75 leading-relaxed">
                  Share this secure link with recruiters, engineering leads, and hiring managers. It grants instant 1-click access to review verified project evidence, repositories, and certifications.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <input
                    type="text"
                    readOnly
                    value={fastPassUrl}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-sand-50 border border-sand-300 text-forest-900 font-mono text-xs select-all focus:outline-none"
                  />
                  <button
                    onClick={() => handleCopy('fastpass', fastPassUrl)}
                    className="px-4 py-2.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-medium text-xs transition-transform hover:scale-105 shrink-0 flex items-center justify-center gap-1.5 shadow-sm"
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
              <div className="p-4 rounded-2xl bg-white border border-sand-200 space-y-2">
                <span className="text-xs font-bold text-forest-900">Standard Public Link</span>
                <p className="text-[11px] text-forest-700/60">
                  Standard public profile link suitable for resumes, X bio, and LinkedIn summaries.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <input
                    type="text"
                    readOnly
                    value={standardUrl}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-sand-50 border border-sand-300 text-forest-900 font-mono text-xs select-all focus:outline-none"
                  />
                  <button
                    onClick={() => handleCopy('standard', standardUrl)}
                    className="px-4 py-2.5 rounded-full bg-sand-100 hover:bg-sand-200 text-forest-900 font-mono font-medium text-xs transition-colors shrink-0 flex items-center justify-center gap-1.5 border border-sand-200"
                  >
                    {copiedType === 'standard' ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-sage-600" /> Copied!
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

            <div className="flex justify-end pt-2 border-t border-sand-200">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-5 py-2 rounded-full bg-sand-200 hover:bg-sand-300 text-forest-900 text-xs font-mono font-medium transition-colors"
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
          <h2 className="text-lg font-serif font-normal text-forest-900 flex items-center gap-2">
            <Github className="w-5 h-5 text-forest-900" />
            GitHub Verified Activity & Commit Heatmap
          </h2>
          <span className="text-[11px] font-mono text-sage-800 bg-sage-50 px-3 py-1 rounded-full border border-sage-200">
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
            <h2 className="text-lg font-serif font-normal text-forest-900 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-terracotta-600" />
              Verified Algorithmic Solving Stats
            </h2>
            <span className="text-[11px] font-mono text-terracotta-800 bg-terracotta-50 px-3 py-1 rounded-full border border-terracotta-200">
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
        <div className="p-6 rounded-3xl bg-white/95 border border-sand-200/80 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-forest-900 uppercase tracking-wider font-mono flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sage-600" />
              Key Competencies & Practical Tenor
            </h2>
            <span className="text-[10px] font-mono text-forest-700/60">Years of Applied Experience</span>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillChartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#68786B" fontSize={11} tickLine={false} />
                <YAxis stroke="#68786B" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FAF7F2', borderColor: '#E5DFD5', borderRadius: '12px', color: '#1F2C23' }}
                  itemStyle={{ color: '#D97043', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Bar dataKey="years" fill="#7D9B86" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Featured Projects Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-serif font-normal text-forest-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-terracotta-600" />
            <span>Verified Projects & Production Artifacts</span>
            <DelicateStarOrnament className="w-4 h-4 text-terracotta-500" />
          </h2>
          <span className="text-[11px] font-mono text-forest-700/60 font-bold">
            {profile.projects?.length || 0} Showcased
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {profile.projects?.map((proj: any, idx: number) => (
            <div
              key={proj.id}
              className="p-6 rounded-3xl bg-white/95 border border-sand-200/80 flex flex-col justify-between space-y-4 hover:border-sage-400/60 transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md group min-w-0"
            >
              <div className="space-y-3 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[11px] font-mono text-terracotta-700 font-bold bg-terracotta-50 px-2.5 py-0.5 rounded-full border border-terracotta-200 shrink-0">
                      #{idx + 1}
                    </span>
                    <h3 className="text-base font-serif font-normal text-forest-900 group-hover:text-terracotta-600 transition-colors truncate">
                      {proj.title}
                    </h3>
                  </div>
                  <EvidenceBadge status={proj.verificationStatus} type="project" />
                </div>

                {proj.tagline && (
                  <p className="text-xs text-forest-800 font-medium line-clamp-1 break-words">{proj.tagline}</p>
                )}

                <p className="text-xs text-forest-700/70 leading-relaxed line-clamp-3 break-words">{proj.description}</p>

                {proj.skills && proj.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.skills.map((s: string) => (
                      <span
                        key={s}
                        className="text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-sand-100 text-forest-800 border border-sand-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-sand-100 flex items-center justify-between text-xs flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  {proj.repositoryUrl && (
                    <a
                      href={proj.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-forest-700/75 hover:text-forest-900 flex items-center gap-1.5 font-mono font-medium transition-colors"
                    >
                      <Github className="w-3.5 h-3.5 text-forest-700/60" /> Source
                    </a>
                  )}
                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-terracotta-600 hover:text-terracotta-700 flex items-center gap-1.5 font-mono font-bold transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                    </a>
                  )}
                </div>

                <div className="text-[10px] font-mono text-forest-700/60 font-bold">
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
          <h2 className="text-lg font-serif font-normal text-forest-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-sage-600" />
            <span>Verified Credentials & Accreditations</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.certificates.map((cert: any) => (
              <div
                key={cert.id}
                className="p-5 rounded-3xl bg-white/95 border border-sand-200/80 text-xs space-y-2 shadow-sm hover:border-sage-400/60 transition-all min-w-0"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-serif font-normal text-forest-900 text-sm truncate">{cert.title}</span>
                  <EvidenceBadge status={cert.verificationStatus} type="certificate" />
                </div>
                <p className="text-forest-700/70 text-xs break-words">
                  {cert.issuer} {cert.credentialId && `• ID: ${cert.credentialId}`}
                </p>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terracotta-600 hover:text-terracotta-700 inline-flex items-center gap-1 pt-1 font-mono font-bold"
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
          <h2 className="text-lg font-serif font-normal text-forest-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-sage-600" />
            Engineering Case Studies & Write-ups
          </h2>

          <div className="space-y-3">
            {profile.posts.map((post: any) => (
              <Link
                key={post.id}
                to={`/posts/${post.slug}`}
                className="p-5 rounded-3xl bg-white/95 border border-sand-200/80 hover:border-sage-400/60 block transition-all shadow-sm hover:shadow-md group"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-serif font-normal text-forest-900 group-hover:text-terracotta-600 transition-colors">
                    {post.title}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-forest-700/50 group-hover:text-terracotta-600 transition-colors" />
                </div>
                <p className="text-xs text-forest-700/70 mt-1.5 line-clamp-2 leading-relaxed">{post.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
