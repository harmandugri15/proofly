import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  User,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  FolderGit2,
  FileText,
  Settings,
  Users,
  Briefcase,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { OrganicLeafLogo } from '../common/CreativeArt';

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
      <nav className="fixed top-0 left-0 right-0 h-20 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-b-2 border-[#1F2C23] shadow-[0_3px_0px_rgba(31,44,35,0.08)] w-full transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between h-full items-center">
            {/* Brand Logo & Editorial Subtitle */}
            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 group shrink-0"
              >
                <div className="relative">
                  <OrganicLeafLogo size={42} className="group-hover:scale-105 transition-transform duration-200" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-2xl font-bold tracking-tight text-[#1F2C23] leading-none">
                    Proofly
                  </span>
                  <span className="text-[11px] font-sans font-semibold tracking-normal text-[#586E5F] mt-0.5">
                    verified builder platform
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-6 text-[13px] font-bold text-[#405446]">
              <Link
                to="/posts"
                className={`transition-all ${
                  isCurrent('/posts')
                    ? 'px-3.5 py-1.5 rounded-full border-2 border-[#1F2C23] bg-[#E4ECE6] text-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]'
                    : 'hover:text-[#1F2C23]'
                }`}
              >
                Community Feed
              </Link>

              {isAuthenticated && user?.role === 'STUDENT' && (
                <>
                  <Link
                    to="/student/dashboard"
                    className={`transition-all ${
                      isCurrent('/student/dashboard')
                        ? 'px-3.5 py-1.5 rounded-full border-2 border-[#1F2C23] bg-[#E4ECE6] text-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]'
                        : 'hover:text-[#1F2C23]'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/student/projects"
                    className={`transition-all ${
                      isCurrent('/student/projects')
                        ? 'px-3.5 py-1.5 rounded-full border-2 border-[#1F2C23] bg-[#E4ECE6] text-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]'
                        : 'hover:text-[#1F2C23]'
                    }`}
                  >
                    Projects
                  </Link>
                  <Link
                    to="/student/evidence"
                    className={`transition-all ${
                      isCurrent('/student/evidence')
                        ? 'px-3.5 py-1.5 rounded-full border-2 border-[#1F2C23] bg-[#E4ECE6] text-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]'
                        : 'hover:text-[#1F2C23]'
                    }`}
                  >
                    Evidence
                  </Link>
                </>
              )}

              {isAuthenticated && user?.role === 'RECRUITER' && (
                <>
                  <Link
                    to="/recruiter/dashboard"
                    className={`transition-all ${
                      isCurrent('/recruiter/dashboard')
                        ? 'px-3.5 py-1.5 rounded-full border-2 border-[#1F2C23] bg-[#E4ECE6] text-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]'
                        : 'hover:text-[#1F2C23]'
                    }`}
                  >
                    Radar
                  </Link>
                  <Link
                    to="/recruiter/candidates"
                    className={`transition-all ${
                      isCurrent('/recruiter/candidates')
                        ? 'px-3.5 py-1.5 rounded-full border-2 border-[#1F2C23] bg-[#E4ECE6] text-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]'
                        : 'hover:text-[#1F2C23]'
                    }`}
                  >
                    Candidates
                  </Link>
                  <Link
                    to="/recruiter/jobs"
                    className={`transition-all ${
                      isCurrent('/recruiter/jobs')
                        ? 'px-3.5 py-1.5 rounded-full border-2 border-[#1F2C23] bg-[#E4ECE6] text-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]'
                        : 'hover:text-[#1F2C23]'
                    }`}
                  >
                    Roles
                  </Link>
                </>
              )}
            </div>

            {/* Right Action Button */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <div className="flex items-center gap-2.5">
                  <Link
                    to={dashboardUrl}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E4ECE6] hover:bg-[#C7D9CD] text-[#24362A] text-xs font-bold border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] hover:shadow-[3px_3px_0px_#1F2C23] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>{user?.name || 'Workspace'}</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    title="Log Out"
                    className="p-2 rounded-full text-[#586E5F] hover:text-[#C55F34] hover:bg-[#FCE5DB] border-2 border-transparent hover:border-[#1F2C23] transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-full bg-white hover:bg-[#F4EFE6] text-[#1F2C23] text-xs font-bold border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] hover:shadow-[3px_3px_0px_#1F2C23] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2 rounded-full bg-[#D97043] hover:bg-[#C55F34] text-white text-xs font-bold border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] hover:shadow-[3px_3px_0px_#1F2C23] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  >
                    Get Verified
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-[#24362A] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] bg-white transition-all"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#EBE5D8] bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-3 shadow-lg">
            <Link
              to="/posts"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded-2xl text-[#24362A] font-medium hover:bg-[#F4EFE6]"
            >
              <span>Community Feed</span>
              <ChevronRight className="w-4 h-4 text-[#758C7D]" />
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to={dashboardUrl}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-2xl text-[#24362A] font-medium hover:bg-[#F4EFE6]"
                >
                  <div className="flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4 text-[#74947F]" />
                    <span>Workspace Dashboard</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#758C7D]" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 py-2.5 px-3 rounded-2xl text-[#C55F34] font-medium hover:bg-[#FCE5DB]"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out ({user?.name})</span>
                </button>
              </>
            ) : (
              <div className="pt-2 flex flex-col gap-2.5">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-full border border-[#DDD5C4] text-[#24362A] font-semibold text-sm hover:bg-white"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-full bg-[#D97043] text-white font-semibold text-sm shadow-md"
                >
                  Get Verified
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
};
