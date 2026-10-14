import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  ShieldCheck,
  User,
  LogOut,
  Flame,
  Sparkles,
  ExternalLink,
  Menu,
  X,
  LayoutDashboard,
  FolderGit2,
  GitBranch,
  FileText,
  Settings,
  Users,
  Briefcase,
  BookmarkCheck,
  ChevronRight,
  Zap,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    setMobileMenuOpen(false);
    await logout();
    navigate('/');
  };

  const isCurrent = (path: string) => location.pathname === path;

  const dashboardUrl =
    user?.role === 'STUDENT' ? '/student/dashboard' : '/recruiter/dashboard';

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#090e1c]/92 backdrop-blur-2xl w-full max-w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Brand Logo & Tag */}
            <div className="flex items-center gap-4 sm:gap-8">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 group shrink-0"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#ff451a] via-[#ff7700] to-[#00f59b] p-0.5 shadow-[0_0_15px_rgba(255,69,26,0.35)] group-hover:scale-105 transition-transform duration-200">
                  <div className="w-full h-full bg-[#0a0f1e] rounded-[10px] flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-[#00f59b]" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-xl tracking-tight text-white font-sans">
                    Proofly<span className="text-[#ff451a]">.</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#ff451a]/15 text-[#ff7043] border border-[#ff451a]/25">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff451a] animate-pulse" />
                    LIVE TELEMETRY
                  </span>
                </div>
              </Link>

              {/* Desktop Nav Links */}
              <div className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Link
                  to="/posts"
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                    isCurrent('/posts')
                      ? 'bg-white/10 text-white font-bold'
                      : 'hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-[#ffb703]" />
                  <span>Proof Feed</span>
                </Link>

                {isAuthenticated && user?.role === 'STUDENT' && (
                  <>
                    <Link
                      to="/student/dashboard"
                      className={`px-3 py-1.5 rounded-xl transition-all font-mono font-bold ${
                        isCurrent('/student/dashboard')
                          ? 'bg-[#00f59b]/15 text-[#00f59b] border border-[#00f59b]/30'
                          : 'hover:text-white hover:bg-white/5'
                      }`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/student/projects"
                      className={`px-3 py-1.5 rounded-xl transition-all ${
                        isCurrent('/student/projects')
                          ? 'bg-[#00f59b]/15 text-[#00f59b] font-bold border border-[#00f59b]/30'
                          : 'hover:text-white hover:bg-white/5'
                      }`}
                    >
                      Projects & Demos
                    </Link>
                    <Link
                      to="/student/integrations"
                      className={`px-3 py-1.5 rounded-xl transition-all ${
                        isCurrent('/student/integrations')
                          ? 'bg-[#00f59b]/15 text-[#00f59b] font-bold border border-[#00f59b]/30'
                          : 'hover:text-white hover:bg-white/5'
                      }`}
                    >
                      GitHub & Coding
                    </Link>
                    <Link
                      to="/student/evidence"
                      className={`px-3 py-1.5 rounded-xl transition-all ${
                        isCurrent('/student/evidence')
                          ? 'bg-[#00f59b]/15 text-[#00f59b] font-bold border border-[#00f59b]/30'
                          : 'hover:text-white hover:bg-white/5'
                      }`}
                    >
                      Certs & Badges
                    </Link>
                  </>
                )}

                {isAuthenticated && user?.role === 'RECRUITER' && (
                  <>
                    <Link
                      to="/recruiter/dashboard"
                      className={`px-3 py-1.5 rounded-xl transition-all font-mono font-bold ${
                        isCurrent('/recruiter/dashboard')
                          ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/25'
                          : 'hover:text-white hover:bg-white/5'
                      }`}
                    >
                      Console
                    </Link>
                    <Link
                      to="/recruiter/candidates"
                      className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                        isCurrent('/recruiter/candidates')
                          ? 'bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/25'
                          : 'hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Discover Radar</span>
                    </Link>
                    <Link
                      to="/recruiter/jobs"
                      className={`px-3 py-1.5 rounded-xl transition-all ${
                        isCurrent('/recruiter/jobs')
                          ? 'bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/25'
                          : 'hover:text-white hover:bg-white/5'
                      }`}
                    >
                      Jobs
                    </Link>
                    <Link
                      to="/recruiter/shortlists"
                      className={`px-3 py-1.5 rounded-xl transition-all ${
                        isCurrent('/recruiter/shortlists')
                          ? 'bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/25'
                          : 'hover:text-white hover:bg-white/5'
                      }`}
                    >
                      Shortlists
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Right Action Area */}
            <div className="flex items-center gap-2 sm:gap-3">
              {isAuthenticated && user ? (
                <div className="flex items-center gap-2 sm:gap-3">
                  {user.role === 'STUDENT' && user.studentProfile && (
                    <Link
                      to={`/u/${user.studentProfile.username}`}
                      target="_blank"
                      className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#ff451a]/20 to-[#00f59b]/20 hover:from-[#ff451a]/30 hover:to-[#00f59b]/30 text-white border border-white/10 transition-all hover:scale-105"
                    >
                      <span>Public Card</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </Link>
                  )}

                  {/* Clickable User Avatar -> Direct Dashboard Access */}
                  <Link
                    to={dashboardUrl}
                    className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-white/10 group cursor-pointer"
                    title={`Open ${user.name}'s Dashboard`}
                  >
                    <div className="story-ring group-hover:scale-105 transition-transform duration-200 shrink-0">
                      <div className="w-8 h-8 rounded-full bg-[#12192e] flex items-center justify-center text-xs font-black text-[#00f59b] uppercase font-mono">
                        {user.name ? user.name.slice(0, 2).toUpperCase() : 'PR'}
                      </div>
                    </div>
                    <div className="text-left hidden lg:block">
                      <p className="text-xs font-bold text-white leading-none group-hover:text-[#00f59b] transition-colors truncate max-w-[120px]">
                        {user.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono tracking-wider mt-0.5">
                        {user.role === 'STUDENT' ? 'BUILDER' : 'RECRUITER'}
                      </p>
                    </div>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="hidden sm:inline-flex p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>

                  {/* Mobile Hamburger Button */}
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/10 md:hidden transition-colors"
                    aria-label="Toggle navigation menu"
                  >
                    {mobileMenuOpen ? <X className="w-5 h-5 text-[#ff451a]" /> : <Menu className="w-5 h-5" />}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="text-xs font-bold text-slate-300 hover:text-white px-3 py-2 rounded-xl hover:bg-white/5 transition-all font-mono"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-1.5 text-xs font-black bg-gradient-to-r from-[#ff451a] via-[#ff5c26] to-[#ff8a00] text-white px-4 py-2 rounded-xl shadow-[0_0_15px_rgba(255,69,26,0.35)] transition-all hover:scale-105"
                  >
                    <span>Get Verified</span>
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 rounded-xl bg-white/[0.04] text-white border border-white/10 md:hidden ml-1"
                    aria-label="Toggle navigation menu"
                  >
                    {mobileMenuOpen ? <X className="w-5 h-5 text-[#ff451a]" /> : <Menu className="w-5 h-5" />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer / Slide-over Navigation Sheet */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden animate-fadeIn">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Menu Panel */}
          <div className="fixed right-0 top-0 bottom-0 w-[84%] max-w-sm bg-[#0c1326] border-l border-white/15 p-5 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              {/* Header with Close */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#ff451a] to-[#00f59b] p-0.5">
                    <div className="w-full h-full bg-[#0c1326] rounded-[6px] flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-[#00f59b]" />
                    </div>
                  </div>
                  <span className="font-black text-lg text-white font-sans">
                    Proofly<span className="text-[#ff451a]">.</span> Menu
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center text-sm transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* User Profile Card (if authenticated) */}
              {isAuthenticated && user && (
                <div className="p-4 rounded-2xl bg-[#131d36] border border-white/10 space-y-3 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="story-ring">
                      <div className="w-10 h-10 rounded-full bg-[#0a0f1e] flex items-center justify-center text-sm font-black text-[#00f59b] font-mono">
                        {user.name ? user.name.slice(0, 2).toUpperCase() : 'PR'}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white font-sans leading-tight">{user.name}</h4>
                      <p className="text-[10px] font-mono text-[#00f59b] font-bold uppercase mt-0.5">
                        {user.role === 'STUDENT' ? 'Verified Builder' : 'Technical Recruiter'}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={dashboardUrl}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#ff451a] via-[#ff5c26] to-[#ff8a00] text-white font-black text-xs text-center flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,69,26,0.35)]"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Open Dashboard</span>
                  </Link>

                  {user.role === 'STUDENT' && user.studentProfile && (
                    <Link
                      to={`/u/${user.studentProfile.username}`}
                      target="_blank"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-2 px-3 rounded-xl bg-[#0e1628] hover:bg-[#152038] text-[#00e5ff] font-mono font-bold text-xs text-center flex items-center justify-center gap-1.5 border border-white/10 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Public Card</span>
                    </Link>
                  )}
                </div>
              )}

              {/* Navigation Links */}
              <div className="space-y-4">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-1">
                  Workspace Navigation
                </div>

                <div className="space-y-1">
                  <Link
                    to="/posts"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white text-xs font-bold transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Flame className="w-4 h-4 text-amber-400" />
                      <span>Proof Feed & Case Studies</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </Link>

                  {isAuthenticated && user?.role === 'STUDENT' && (
                    <>
                      <Link
                        to="/student/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white text-xs font-bold transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                          <span>Student Dashboard</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                      </Link>

                      <Link
                        to="/student/projects"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white text-xs font-bold transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FolderGit2 className="w-4 h-4 text-emerald-400" />
                          <span>Projects & Repo Crawler</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                      </Link>

                      <Link
                        to="/student/integrations"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white text-xs font-bold transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <GitBranch className="w-4 h-4 text-cyan-400" />
                          <span>GitHub & Coding Stats</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                      </Link>

                      <Link
                        to="/student/evidence"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white text-xs font-bold transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          <span>Certifications & Badges</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                      </Link>

                      <Link
                        to="/student/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white text-xs font-bold transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <User className="w-4 h-4 text-slate-400" />
                          <span>Profile & Skills</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                      </Link>

                      <Link
                        to="/student/posts"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white text-xs font-bold transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-slate-400" />
                          <span>My Case Studies</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                      </Link>

                      <Link
                        to="/student/settings"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white text-xs font-bold transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Settings className="w-4 h-4 text-slate-400" />
                          <span>Privacy & Data Sovereignty</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                      </Link>
                    </>
                  )}

                  {isAuthenticated && user?.role === 'RECRUITER' && (
                    <>
                      <Link
                        to="/recruiter/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white text-xs font-bold transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                          <span>Recruiter Console</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                      </Link>

                      <Link
                        to="/recruiter/candidates"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white text-xs font-bold transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Users className="w-4 h-4 text-cyan-400" />
                          <span>Discover Candidates</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                      </Link>

                      <Link
                        to="/recruiter/jobs"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white text-xs font-bold transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Briefcase className="w-4 h-4 text-cyan-400" />
                          <span>Job Specs</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                      </Link>

                      <Link
                        to="/recruiter/shortlists"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white text-xs font-bold transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <BookmarkCheck className="w-4 h-4 text-cyan-400" />
                          <span>Talent Shortlists</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-rose-500/15 text-rose-400 hover:text-rose-300 font-mono font-bold text-xs flex items-center justify-center gap-2 border border-white/5 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 px-3 rounded-xl bg-white/5 text-white font-mono font-bold text-xs text-center"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-black text-xs text-center shadow-glow-emerald"
                  >
                    Join
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
