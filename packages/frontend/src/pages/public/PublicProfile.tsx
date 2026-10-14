import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
} from 'lucide-react';
import { EvidenceBadge } from '../../components/common/EvidenceBadge';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export const PublicProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadPublicProfile();
  }, [username]);

  const loadPublicProfile = async () => {
    try {
      const data = await api.get<any>(`/public/profile/${username}`);
      setProfile(data);
    } catch (err: any) {
      setError(err?.message || 'Unable to view this profile.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
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
  const skillChartData = profile.skills?.slice(0, 6).map((s: any) => ({
    name: s.name,
    years: s.yearsOfExperience || 1,
  })) || [];

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
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
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors shrink-0"
        >
          {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          {copied ? 'Link Copied!' : 'Share Portfolio'}
        </button>
      </div>

      {/* Skills & Experience Visualizer */}
      {skillChartData.length > 0 && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
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
            <div key={proj.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-white">{proj.title}</h3>
                  <EvidenceBadge status={proj.verificationStatus} type="project" />
                </div>
                <p className="text-xs text-slate-300 font-medium">{proj.tagline}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.skills?.map((s: string) => (
                    <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
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
              <div key={cert.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
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
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 block transition-colors"
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
