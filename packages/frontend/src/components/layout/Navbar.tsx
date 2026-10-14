import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, User, LogOut, Briefcase, FileCode2, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/60 transition-colors">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                Proofly
                <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-normal border border-emerald-500/20">
                  verified
                </span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
              <Link to="/posts" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                <FileCode2 className="w-4 h-4 text-slate-400" />
                Case Studies
              </Link>
              {isAuthenticated && user?.role === 'STUDENT' && (
                <>
                  <Link to="/student/dashboard" className="hover:text-emerald-400 transition-colors">
                    Dashboard
                  </Link>
                  <Link to="/student/profile" className="hover:text-emerald-400 transition-colors">
                    My Profile
                  </Link>
                  <Link to="/student/projects" className="hover:text-emerald-400 transition-colors">
                    Projects
                  </Link>
                  <Link to="/student/evidence" className="hover:text-emerald-400 transition-colors">
                    Evidence & Certs
                  </Link>
                </>
              )}
              {isAuthenticated && user?.role === 'RECRUITER' && (
                <>
                  <Link to="/recruiter/dashboard" className="hover:text-emerald-400 transition-colors">
                    Recruiter Console
                  </Link>
                  <Link to="/recruiter/candidates" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    Discover Talent
                  </Link>
                  <Link to="/recruiter/jobs" className="hover:text-emerald-400 transition-colors">
                    Jobs
                  </Link>
                  <Link to="/recruiter/shortlists" className="hover:text-emerald-400 transition-colors">
                    Shortlists
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                {user.role === 'STUDENT' && user.studentProfile && (
                  <Link
                    to={`/u/${user.studentProfile.username}`}
                    target="_blank"
                    className="hidden sm:inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                  >
                    Public View
                  </Link>
                )}
                <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-semibold text-white leading-none">{user.name}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5 font-mono">
                      {user.role}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Log out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 rounded-md transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-medium bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-4 py-2 rounded-md font-semibold transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
