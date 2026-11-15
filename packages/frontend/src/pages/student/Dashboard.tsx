import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api';
import {
  FolderGit2,
  ShieldCheck,
  GitBranch,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Key,
  Copy,
  Linkedin,
} from 'lucide-react';
import { ProfileCompletenessResult } from '@proofly/shared';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [aiAnalysis, setAiAnalysis] = useState<ProfileCompletenessResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [copiedFastPass, setCopiedFastPass] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await api.get<any>('/student/profile');
      setProfile(data);
      runAiAssistant();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const runAiAssistant = async () => {
    setIsAiLoading(true);
    try {
      const data = await api.post<ProfileCompletenessResult>('/ai/profile-completeness');
      setAiAnalysis(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-12 text-center text-[#586E5F] font-sans">
        <div className="w-8 h-8 border-2 border-[#74947F] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        Loading your candidate workspace...
      </div>
    );
  }

  const score = profile?.completenessScore || 0;

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 bg-[#FAF7F2] text-[#1F2C23]">
      {/* Top Profile Banner (Editorial warm cream card) */}
      <div className="relative overflow-hidden rounded-[28px] bg-white border-2 border-[#1F2C23] p-6 sm:p-8 shadow-[4px_4px_0px_#1F2C23]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
          <div className="flex items-start sm:items-center gap-4 sm:gap-5 min-w-0">
            {/* Vibrant Avatar */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#FFDE59] border-2 border-[#1F2C23] flex items-center justify-center text-xl sm:text-2xl font-serif font-black text-[#1F2C23] shrink-0 shadow-[3px_3px_0px_#1F2C23] relative">
              {user?.name?.slice(0, 2).toUpperCase() || 'PR'}
              <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#86EFAC] text-[#1F2C23] border border-[#1F2C23] shadow-[1px_1px_0px_#1F2C23]" title="Verified Builder">
                <ShieldCheck className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            </div>

            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="font-serif text-2xl sm:text-3xl font-black text-[#1F2C23] truncate">
                  {user?.name}
                </h1>
                <span className="text-xs font-mono font-black text-[#1F2C23] bg-[#BAE6FD] px-2.5 py-0.5 rounded-full border border-[#1F2C23] shadow-[1px_1px_0px_#1F2C23]">
                  @{profile?.username}
                </span>
                <span className="text-[11px] font-sans font-bold px-3 py-0.5 rounded-full bg-[#86EFAC] text-[#1F2C23] border border-[#1F2C23] shadow-[1px_1px_0px_#1F2C23] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1F2C23]" /> Verified Builder
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#405446] max-w-xl font-medium leading-relaxed">
                {profile?.headline || 'Add a punchy headline to showcase your engineering expertise to top recruiters.'}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#586E5F] pt-1 font-mono font-bold">
                <span>{profile?.location || 'Remote'}</span>
                {profile?.targetGraduationYear && (
                  <span>Class of {profile.targetGraduationYear}</span>
                )}
                <span className="text-[#1F2C23] font-black bg-[#E4ECE6] px-2 py-0.5 rounded-md border border-[#1F2C23]">{score}% Proof Score</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 self-start md:self-auto">
            <Link
              to={`/u/${profile?.username}`}
              target="_blank"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#1F2C23] text-xs font-bold border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
            >
              <span>Public Card</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#1F2C23]" />
            </Link>
            <Link
              to="/student/projects"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#D97043] hover:bg-[#C55F34] text-white text-xs font-bold border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
            >
              <span>Add Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recruiter Fast-Pass Access Hash & Link Banner */}
      <div className="p-6 rounded-[28px] bg-[#FFDE59] border-2 border-[#1F2C23] flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-[5px_5px_0px_#1F2C23]">
        <div className="space-y-1.5 min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="p-1.5 rounded-xl bg-white text-[#1F2C23] shrink-0 border-2 border-[#1F2C23] shadow-[1px_1px_0px_#1F2C23]">
              <Key className="w-4 h-4 text-[#D97043]" />
            </span>
            <h2 className="font-serif text-base font-black text-[#1F2C23]">Public Card Access Hash & Fast-Pass™</h2>
            <span className="text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full bg-white text-[#1F2C23] border border-[#1F2C23] shadow-[1px_1px_0px_#1F2C23]">
              Recruiter Unlock Code
            </span>
          </div>
          <p className="text-xs text-[#1F2C23] leading-relaxed max-w-2xl font-bold">
            Give this <strong>Access Hash</strong> or link to recruiters so they can instantly unlock your verified dossier, GitHub heatmap, and project code in their portal with zero login barriers.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          {/* Hash Pill */}
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]">
            <span className="text-[11px] font-black text-[#1F2C23] uppercase tracking-wider">Hash:</span>
            <span className="font-mono text-xs font-black text-[#D97043] select-all tracking-wider">
              {profile?.shareToken || 'PRF-SYNCING'}
            </span>
            <button
              type="button"
              onClick={() => {
                if (profile?.shareToken) {
                  navigator.clipboard.writeText(profile.shareToken);
                  setCopiedHash(true);
                  setTimeout(() => setCopiedHash(false), 2000);
                }
              }}
              className="ml-1 p-1 rounded-md text-[#1F2C23] hover:bg-[#FAF7F2] transition-colors"
              title="Copy Access Hash"
            >
              {copiedHash ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Copy Link Button */}
          <button
            onClick={() => {
              const url = `${window.location.origin}/u/${profile?.username}?pass=${profile?.shareToken || ''}`;
              navigator.clipboard.writeText(url);
              setCopiedFastPass(true);
              setTimeout(() => setCopiedFastPass(false), 2000);
            }}
            className="px-5 py-2.5 rounded-xl bg-[#1F2C23] hover:bg-[#385241] text-white font-black text-xs border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all shrink-0 flex items-center justify-center gap-1.5"
          >
            {copiedFastPass ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#86EFAC]" /> Link Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy Pass Link
              </>
            )}
          </button>
        </div>
      </div>

      {/* Metrics Row (5 Multi-Color Neo-Brutalist Pop Tiles) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Tile 1: Canary Yellow */}
        <div className="p-5 rounded-[22px] bg-[#FEF08A] border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] hover:shadow-[5px_5px_0px_#1F2C23] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
          <div className="flex items-center justify-between text-[#1F2C23] mb-2 font-black">
            <span className="text-xs uppercase tracking-wider font-mono">Proof Score</span>
            <TrendingUp className="w-4 h-4 text-[#1F2C23]" />
          </div>
          <div className="font-serif text-3xl font-black text-[#1F2C23]">{score}%</div>
          <div className="w-full bg-white h-2.5 rounded-full mt-2.5 overflow-hidden border-2 border-[#1F2C23]">
            <div className="bg-[#1F2C23] h-full rounded-full transition-all" style={{ width: `${score}%` }} />
          </div>
        </div>

        {/* Tile 2: Electric Cyan */}
        <div className="p-5 rounded-[22px] bg-[#BAE6FD] border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] hover:shadow-[5px_5px_0px_#1F2C23] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
          <div className="flex items-center justify-between text-[#1F2C23] mb-2 font-black">
            <span className="text-xs uppercase tracking-wider font-mono">Projects</span>
            <FolderGit2 className="w-4 h-4 text-[#1F2C23]" />
          </div>
          <div className="font-serif text-3xl font-black text-[#1F2C23]">{profile?.projects?.length || 0}</div>
          <p className="text-[11px] text-[#1F2C23] mt-1 font-mono font-bold">
            {profile?.projects?.filter((p: any) => p.verificationStatus !== 'UNVERIFIED').length || 0} code-verified
          </p>
        </div>

        {/* Tile 3: Fresh Mint */}
        <div className="p-5 rounded-[22px] bg-[#BBF7D0] border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] hover:shadow-[5px_5px_0px_#1F2C23] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
          <div className="flex items-center justify-between text-[#1F2C23] mb-2 font-black">
            <span className="text-xs uppercase tracking-wider font-mono">Certificates</span>
            <ShieldCheck className="w-4 h-4 text-[#1F2C23]" />
          </div>
          <div className="font-serif text-3xl font-black text-[#1F2C23]">{profile?.certificates?.length || 0}</div>
          <p className="text-[11px] text-[#1F2C23] mt-1 font-mono font-bold">
            {profile?.certificates?.filter((c: any) => c.verificationStatus === 'ISSUER_VERIFIED').length || 0} issuer-checked
          </p>
        </div>

        {/* Tile 4: Retro Lavender */}
        <div className="p-5 rounded-[22px] bg-[#DDD6FE] border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] hover:shadow-[5px_5px_0px_#1F2C23] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
          <div className="flex items-center justify-between text-[#1F2C23] mb-2 font-black">
            <span className="text-xs uppercase tracking-wider font-mono">GitHub Repos</span>
            <GitBranch className="w-4 h-4 text-[#1F2C23]" />
          </div>
          <div className="font-serif text-3xl font-black text-[#1F2C23]">{profile?.gitHubRepos?.length || 0}</div>
          <p className="text-[11px] text-[#1F2C23] mt-1 font-mono font-bold">Live Synchronized</p>
        </div>

        {/* Tile 5: Coral Peach */}
        <div className="p-5 rounded-[22px] bg-[#FFEDD5] border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] hover:shadow-[5px_5px_0px_#1F2C23] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
          <div className="flex items-center justify-between text-[#1F2C23] mb-2 font-black">
            <span className="text-xs uppercase tracking-wider font-mono">LinkedIn</span>
            <Linkedin className="w-4 h-4 text-[#0077b5]" />
          </div>
          <div className="text-sm font-bold text-[#1F2C23] flex items-center gap-1.5 mt-1">
            {profile?.linkedinVerified ? (
              <span className="text-[#2E7D32] text-xs flex items-center gap-1 font-mono font-black">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
              </span>
            ) : profile?.linkedinUrl ? (
              <span className="text-[#1F2C23] text-xs font-mono font-bold">Linked</span>
            ) : (
              <span className="text-[#758C7D] text-xs font-mono">Not Linked</span>
            )}
          </div>
          <p className="text-[11px] text-[#1F2C23] mt-1">
            <Link to="/student/integrations" className="text-[#D97043] hover:underline font-mono font-black">
              {profile?.linkedinUrl ? 'Manage' : 'Connect'}
            </Link>
          </p>
        </div>
      </div>

      {/* AI Assistant Checklist */}
      <div className="p-6 sm:p-8 rounded-[28px] bg-white border-2 border-[#1F2C23] space-y-4 shadow-[4px_4px_0px_#1F2C23]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E4ECE6] border-2 border-[#1F2C23] text-[#1F2C23] flex items-center justify-center shadow-[2px_2px_0px_#1F2C23]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-black text-[#1F2C23]">AI Profile Completeness Assistant</h2>
              <p className="text-xs text-[#586E5F]">Actionable, evidence-grounded suggestions to maximize recruiter views</p>
            </div>
          </div>
          <button
            onClick={runAiAssistant}
            disabled={isAiLoading}
            className="text-xs font-bold px-5 py-2.5 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#1F2C23] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all shrink-0 self-start sm:self-auto"
          >
            {isAiLoading ? 'Analyzing...' : 'Re-analyze Profile'}
          </button>
        </div>

        {aiAnalysis ? (
          <div className="space-y-4 pt-2">
            <p className="text-xs text-[#1F2C23] bg-[#FAF7F2] p-4 rounded-xl border-2 border-[#1F2C23] leading-relaxed font-medium">
              {aiAnalysis.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              {aiAnalysis.checklist.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-[#FAF7F2] border-2 border-[#1F2C23] flex items-start justify-between gap-3 shadow-[2px_2px_0px_#1F2C23] hover:shadow-[3px_3px_0px_#1F2C23] transition-all"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-md border border-[#1F2C23] ${
                          item.priority === 'HIGH'
                            ? 'bg-[#FCE5DB] text-[#853C1E]'
                            : item.priority === 'MEDIUM'
                            ? 'bg-[#FAF2DF] text-[#785918]'
                            : 'bg-[#E4ECE6] text-[#24362A]'
                        }`}
                      >
                        {item.priority}
                      </span>
                      <h4 className="font-serif text-xs font-black text-[#1F2C23] truncate">{item.title}</h4>
                    </div>
                    <p className="text-xs text-[#586E5F] leading-relaxed">{item.description}</p>
                  </div>
                  <Link
                    to={item.actionUrl}
                    className="p-2 rounded-xl bg-[#E4ECE6] hover:bg-[#C7D9CD] text-[#1F2C23] border-2 border-[#1F2C23] shadow-[1px_1px_0px_#1F2C23] shrink-0 transition-transform hover:scale-105 active:scale-95"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-xs text-[#758C7D] font-mono">Click "Re-analyze Profile" to generate your custom evidence roadmap.</p>
        )}
      </div>

      {/* Featured Projects Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-black text-[#1F2C23]">Featured Project Evidence</h3>
          <Link to="/student/projects" className="text-xs font-bold text-[#D97043] hover:underline font-mono">
            Manage All Projects &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile?.projects?.slice(0, 2).map((project: any) => (
            <div key={project.id} className="p-6 rounded-[24px] bg-white border-2 border-[#1F2C23] space-y-3 shadow-[3px_3px_0px_#1F2C23] hover:shadow-[4px_4px_0px_#1F2C23] transition-all">
              <div className="flex items-start justify-between gap-2 min-w-0">
                <h4 className="font-serif text-base font-black text-[#1F2C23] leading-snug truncate">{project.title}</h4>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#E4ECE6] text-[#1F2C23] border border-[#1F2C23] shadow-[1px_1px_0px_#1F2C23] font-bold shrink-0">
                  {project.verificationStatus}
                </span>
              </div>
              <p className="text-xs text-[#586E5F] line-clamp-2 leading-relaxed">{project.tagline}</p>
              <div className="flex flex-wrap gap-1.5 pt-2 border-t-2 border-[#FAF7F2]">
                {project.skills?.map((s: string) => (
                  <span key={s} className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-[#FAF7F2] text-[#1F2C23] border border-[#1F2C23] font-bold">
                    #{s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
