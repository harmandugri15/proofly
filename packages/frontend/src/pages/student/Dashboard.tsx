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
      <div className="relative overflow-hidden rounded-[36px] bg-[#FAF7F2] border border-[#EBE5D8] p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
          <div className="flex items-start sm:items-center gap-4 sm:gap-5 min-w-0">
            {/* Organic Avatar */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E4ECE6] border-2 border-[#C7D9CD] flex items-center justify-center text-xl sm:text-2xl font-serif font-bold text-[#24362A] shrink-0 shadow-xs">
              {user?.name?.slice(0, 2).toUpperCase() || 'PR'}
            </div>

            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2C23] truncate">
                  {user?.name}
                </h1>
                <span className="text-xs font-mono font-medium text-[#586E5F] bg-[#F4EFE6] px-2.5 py-0.5 rounded-full border border-[#DDD5C4]">
                  @{profile?.username}
                </span>
                <span className="text-[11px] font-sans font-semibold px-3 py-0.5 rounded-full bg-[#E4ECE6] text-[#24362A] border border-[#C7D9CD] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#385241]" /> Verified Builder
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#405446] max-w-xl font-medium leading-relaxed">
                {profile?.headline || 'Add a punchy headline to showcase your engineering expertise to top recruiters.'}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#586E5F] pt-1 font-mono">
                <span>{profile?.location || 'Remote'}</span>
                {profile?.targetGraduationYear && (
                  <span>Class of {profile.targetGraduationYear}</span>
                )}
                <span className="text-[#385241] font-bold">{score}% Proof Completeness</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 self-start md:self-auto">
            <Link
              to={`/u/${profile?.username}`}
              target="_blank"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#F8F5EE] text-[#1F2C23] text-xs font-semibold border border-[#DDD5C4] transition-all shadow-xs"
            >
              <span>Public Card</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#586E5F]" />
            </Link>
            <Link
              to="/student/projects"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#D97043] hover:bg-[#C55F34] text-white text-xs font-semibold transition-all shadow-sm"
            >
              <span>Add Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recruiter Fast-Pass Link Banner */}
      <div className="p-6 rounded-[32px] bg-[#E4ECE6] border border-[#C7D9CD] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="p-1.5 rounded-full bg-[#FAF7F2] text-[#385241] shrink-0 border border-[#C7D9CD]">
              <Key className="w-4 h-4" />
            </span>
            <h2 className="font-serif text-sm font-bold text-[#1F2C23]">Recruiter Fast-Pass Link</h2>
            <span className="text-[10px] font-sans font-bold px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#385241] border border-[#C7D9CD]">
              Zero Login Wall
            </span>
          </div>
          <p className="text-xs text-[#405446]">
            Place this link on your resume. Hiring teams can directly view your verified portfolio, GitHub heatmap, and project code with one click.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto shrink-0">
          <input
            type="text"
            readOnly
            value={`${window.location.origin}/u/${profile?.username}?pass=${profile?.shareToken || ''}`}
            className="px-4 py-2.5 rounded-full bg-white border border-[#C7D9CD] text-[#24362A] font-mono text-xs w-full sm:w-64 select-all focus:outline-none"
          />
          <button
            onClick={() => {
              const url = `${window.location.origin}/u/${profile?.username}?pass=${profile?.shareToken || ''}`;
              navigator.clipboard.writeText(url);
              setCopiedFastPass(true);
              setTimeout(() => setCopiedFastPass(false), 2000);
            }}
            className="px-5 py-2.5 rounded-full bg-[#385241] hover:bg-[#24362A] text-white font-semibold text-xs transition-all shrink-0 flex items-center justify-center gap-1.5 shadow-sm"
          >
            {copiedFastPass ? (
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

      {/* Metrics Row (5 Soft Cream Tiles) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="p-5 rounded-[28px] bg-[#FAF7F2] border border-[#EBE5D8] hover:border-[#74947F] transition-all shadow-sm">
          <div className="flex items-center justify-between text-[#586E5F] mb-2">
            <span className="text-xs font-semibold">Proof Score</span>
            <TrendingUp className="w-4 h-4 text-[#385241]" />
          </div>
          <div className="font-serif text-2xl font-bold text-[#1F2C23]">{score}%</div>
          <div className="w-full bg-[#EBE5D8] h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#74947F] h-full rounded-full transition-all" style={{ width: `${score}%` }} />
          </div>
        </div>

        <div className="p-5 rounded-[28px] bg-[#FAF7F2] border border-[#EBE5D8] hover:border-[#74947F] transition-all shadow-sm">
          <div className="flex items-center justify-between text-[#586E5F] mb-2">
            <span className="text-xs font-semibold">Projects</span>
            <FolderGit2 className="w-4 h-4 text-[#74947F]" />
          </div>
          <div className="font-serif text-2xl font-bold text-[#1F2C23]">{profile?.projects?.length || 0}</div>
          <p className="text-[11px] text-[#586E5F] mt-1 font-mono">
            {profile?.projects?.filter((p: any) => p.verificationStatus !== 'UNVERIFIED').length || 0} code-verified
          </p>
        </div>

        <div className="p-5 rounded-[28px] bg-[#FAF7F2] border border-[#EBE5D8] hover:border-[#74947F] transition-all shadow-sm">
          <div className="flex items-center justify-between text-[#586E5F] mb-2">
            <span className="text-xs font-semibold">Certifications</span>
            <ShieldCheck className="w-4 h-4 text-[#74947F]" />
          </div>
          <div className="font-serif text-2xl font-bold text-[#1F2C23]">{profile?.certificates?.length || 0}</div>
          <p className="text-[11px] text-[#586E5F] mt-1 font-mono">
            {profile?.certificates?.filter((c: any) => c.verificationStatus === 'ISSUER_VERIFIED').length || 0} issuer-checked
          </p>
        </div>

        <div className="p-5 rounded-[28px] bg-[#FAF7F2] border border-[#EBE5D8] hover:border-[#74947F] transition-all shadow-sm">
          <div className="flex items-center justify-between text-[#586E5F] mb-2">
            <span className="text-xs font-semibold">GitHub Repos</span>
            <GitBranch className="w-4 h-4 text-[#74947F]" />
          </div>
          <div className="font-serif text-2xl font-bold text-[#1F2C23]">{profile?.gitHubRepos?.length || 0}</div>
          <p className="text-[11px] text-[#586E5F] mt-1 font-mono">Live Synchronized</p>
        </div>

        <div className="p-5 rounded-[28px] bg-[#FAF7F2] border border-[#EBE5D8] hover:border-[#74947F] transition-all shadow-sm">
          <div className="flex items-center justify-between text-[#586E5F] mb-2">
            <span className="text-xs font-semibold">LinkedIn</span>
            <Linkedin className="w-4 h-4 text-[#0077b5]" />
          </div>
          <div className="text-sm font-bold text-[#1F2C23] flex items-center gap-1.5 mt-1">
            {profile?.linkedinVerified ? (
              <span className="text-[#385241] text-xs flex items-center gap-1 font-mono font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
              </span>
            ) : profile?.linkedinUrl ? (
              <span className="text-[#586E5F] text-xs font-mono font-semibold">Linked</span>
            ) : (
              <span className="text-[#758C7D] text-xs font-mono">Not Linked</span>
            )}
          </div>
          <p className="text-[11px] text-[#586E5F] mt-1">
            <Link to="/student/integrations" className="text-[#D97043] hover:underline font-mono font-bold">
              {profile?.linkedinUrl ? 'Manage' : 'Connect'}
            </Link>
          </p>
        </div>
      </div>

      {/* AI Assistant Checklist */}
      <div className="p-6 sm:p-8 rounded-[36px] bg-[#FAF7F2] border border-[#EBE5D8] space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E4ECE6] border border-[#C7D9CD] text-[#385241] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#1F2C23]">AI Profile Completeness Assistant</h2>
              <p className="text-xs text-[#586E5F]">Actionable, evidence-grounded suggestions to maximize recruiter views</p>
            </div>
          </div>
          <button
            onClick={runAiAssistant}
            disabled={isAiLoading}
            className="text-xs font-semibold px-5 py-2.5 rounded-full bg-white hover:bg-[#F8F5EE] text-[#1F2C23] border border-[#DDD5C4] transition-all shrink-0 self-start sm:self-auto shadow-2xs"
          >
            {isAiLoading ? 'Analyzing...' : 'Re-analyze Profile'}
          </button>
        </div>

        {aiAnalysis ? (
          <div className="space-y-4 pt-2">
            <p className="text-xs text-[#24362A] bg-[#F4EFE6] p-4 rounded-2xl border border-[#E0D9CD] leading-relaxed font-medium">
              {aiAnalysis.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              {aiAnalysis.checklist.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white border border-[#EBE5D8] flex items-start justify-between gap-3 hover:border-[#74947F] transition-all shadow-2xs"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
                          item.priority === 'HIGH'
                            ? 'bg-[#FCE5DB] text-[#853C1E] border border-[#F4CDBC]'
                            : item.priority === 'MEDIUM'
                            ? 'bg-[#FAF2DF] text-[#785918] border border-[#EADBB7]'
                            : 'bg-[#E4ECE6] text-[#24362A]'
                        }`}
                      >
                        {item.priority}
                      </span>
                      <h4 className="font-serif text-xs font-bold text-[#1F2C23] truncate">{item.title}</h4>
                    </div>
                    <p className="text-xs text-[#586E5F] leading-relaxed">{item.description}</p>
                  </div>
                  <Link
                    to={item.actionUrl}
                    className="p-2 rounded-full bg-[#E4ECE6] hover:bg-[#C7D9CD] text-[#24362A] border border-[#C7D9CD] shrink-0 transition-colors"
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
          <h3 className="font-serif text-xl font-bold text-[#1F2C23]">Featured Project Evidence</h3>
          <Link to="/student/projects" className="text-xs font-semibold text-[#D97043] hover:underline">
            Manage All Projects &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile?.projects?.slice(0, 2).map((project: any) => (
            <div key={project.id} className="p-6 rounded-[32px] bg-[#FAF7F2] border border-[#EBE5D8] space-y-3 hover:border-[#74947F] transition-all shadow-xs">
              <div className="flex items-start justify-between gap-2 min-w-0">
                <h4 className="font-serif text-base font-bold text-[#1F2C23] leading-snug truncate">{project.title}</h4>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#E4ECE6] text-[#24362A] border border-[#C7D9CD] font-bold shrink-0">
                  {project.verificationStatus}
                </span>
              </div>
              <p className="text-xs text-[#586E5F] line-clamp-2 leading-relaxed">{project.tagline}</p>
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#EBE5D8]">
                {project.skills?.map((s: string) => (
                  <span key={s} className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#F4EFE6] text-[#24362A] border border-[#DDD5C4]">
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
