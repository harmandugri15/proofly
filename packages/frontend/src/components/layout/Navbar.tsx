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
      <nav className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EBE5D8] w-full transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Brand Logo & Editorial Subtitle */}
            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 group shrink-0"
              >
                <OrganicLeafLogo size={42} className="group-hover:scale-105 transition-transform duration-200" />
                <div className="flex flex-col">
                  <span className="font-serif text-2xl font-bold tracking-tight text-[#1F2C23] leading-none">
                    Proofly
                  </span>
                  <span className="text-[11px] font-sans font-medium tracking-normal text-[#586E5F] mt-0.5">
                    specialty student talent
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#405446]">
              <Link
                to="/posts"
                className={`transition-colors hover:text-[#1F2C23] ${
                  isCurrent('/posts') ? 'text-[#1F2C23] font-semibold underline underline-offset-8 decoration-[#D97043] decoration-2' : ''
                }`}
              >
                Community Feed
              </Link>

              {isAuthenticated && user?.role === 'STUDENT' && (
                <>
                  <Link
                    to="/student/dashboard"
                    className={`transition-colors hover:text-[#1F2C23] ${
                      isCurrent('/student/dashboard') ? 'text-[#1F2C23] font-semibold underline underline-offset-8 decoration-[#74947F] decoration-2' : ''
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/student/projects"
                    className={`transition-colors hover:text-[#1F2C23] ${
                      isCurrent('/student/projects') ? 'text-[#1F2C23] font-semibold' : ''
                    }`}
                  >
                    Projects
                  </Link>
                  <Link
                    to="/student/evidence"
                    className={`transition-colors hover:text-[#1F2C23] ${
                      isCurrent('/student/evidence') ? 'text-[#1F2C23] font-semibold' : ''
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
                    className={`transition-colors hover:text-[#1F2C23] ${
                      isCurrent('/recruiter/dashboard') ? 'text-[#1F2C23] font-semibold' : ''
                    }`}
                  >
                    Radar
                  </Link>
                  <Link
                    to="/recruiter/candidates"
                    className={`transition-colors hover:text-[#1F2C23] ${
                      isCurrent('/recruiter/candidates') ? 'text-[#1F2C23] font-semibold' : ''
                    }`}
                  >
                    Candidates
                  </Link>
                  <Link
                    to="/recruiter/jobs"
                    className={`transition-colors hover:text-[#1F2C23] ${
                      isCurrent('/recruiter/jobs') ? 'text-[#1F2C23] font-semibold' : ''
                    }`}
                  >
                    Roles
                  </Link>
                </>
              )}
            </div>

            {/* Right Action Button (Terracotta Pill) */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <Link
                    to={dashboardUrl}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E4ECE6] hover:bg-[#C7D9CD] text-[#24362A] text-xs font-semibold transition-all border border-[#A3BFAC]/40"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>{user?.name || 'Workspace'}</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    title="Log Out"
                    className="p-2.5 rounded-full text-[#586E5F] hover:text-[#C55F34] hover:bg-[#FCE5DB]/60 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="px-5 py-2.5 rounded-full text-[#405446] hover:text-[#1F2C23] text-sm font-semibold transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="terracotta-pill-btn text-sm shadow-sm hover:shadow-md"
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
                className="p-2.5 rounded-full text-[#24362A] hover:bg-[#EBE5D8] transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
