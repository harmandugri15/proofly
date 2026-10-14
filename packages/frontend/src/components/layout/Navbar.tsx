import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, User, LogOut, Flame, Sparkles, ExternalLink, Compass } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isCurrent = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#08090e]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand Logo & Tag */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 p-0.5 shadow-glow-emerald group-hover:scale-105 transition-transform duration-200">
                <div className="w-full h-full bg-[#090b12] rounded-[10px] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                  Proofly<span className="text-emerald-400">.</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  LIVE SIGNALS
                </span>
              </div>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <Link
                to="/posts"
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  isCurrent('/posts')
                    ? 'bg-white/10 text-white font-bold'
                    : 'hover:text-white hover:bg-white/5'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Proof Feed</span>
              </Link>

              {isAuthenticated && user?.role === 'STUDENT' && (
                <>
                  <Link
                    to="/student/dashboard"
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      isCurrent('/student/dashboard')
                        ? 'bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/25'
                        : 'hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/student/projects"
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      isCurrent('/student/projects')
                        ? 'bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/25'
                        : 'hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Projects & Demos
                  </Link>
                  <Link
                    to="/student/integrations"
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      isCurrent('/student/integrations')
                        ? 'bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/25'
                        : 'hover:text-white hover:bg-white/5'
                    }`}
                  >
                    GitHub & Coding
                  </Link>
                  <Link
                    to="/student/evidence"
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      isCurrent('/student/evidence')
                        ? 'bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/25'
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
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      isCurrent('/recruiter/dashboard')
                        ? 'bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/25'
                        : 'hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Console
                  </Link>
                  <Link
                    to="/recruiter/candidates"
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                      isCurrent('/recruiter/candidates')
                        ? 'bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/25'
                        : 'hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Discover Talent</span>
                  </Link>
                  <Link
                    to="/recruiter/jobs"
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      isCurrent('/recruiter/jobs')
                        ? 'bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/25'
                        : 'hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Jobs
                  </Link>
                  <Link
                    to="/recruiter/shortlists"
                    className={`px-3 py-1.5 rounded-lg transition-all ${
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
          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                {user.role === 'STUDENT' && user.studentProfile && (
                  <Link
                    to={`/u/${user.studentProfile.username}`}
                    target="_blank"
                    className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 hover:from-emerald-500/30 hover:to-cyan-500/30 text-emerald-300 border border-emerald-500/30 transition-all hover:scale-105"
                  >
                    <span>My Public Card</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                )}

                {/* Story-ring User Avatar */}
                <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-white/10">
                  <div className="story-ring">
                    <div className="w-8 h-8 rounded-full bg-[#0e111a] flex items-center justify-center text-xs font-bold text-white uppercase font-mono">
                      {user.name?.slice(0, 2) || 'PR'}
                    </div>
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-bold text-white leading-none">{user.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono tracking-wider mt-0.5">
                      {user.role === 'STUDENT' ? 'BUILDER' : 'RECRUITER'}
                    </p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors ml-1"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  to="/login"
                  className="text-xs font-bold text-slate-300 hover:text-white px-3.5 py-2 rounded-xl hover:bg-white/5 transition-all"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:opacity-90 text-slate-950 px-4 py-2 rounded-xl shadow-glow-emerald transition-all hover:scale-105"
                >
                  <span>Join Proofly</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
