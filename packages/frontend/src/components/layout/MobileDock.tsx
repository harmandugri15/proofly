import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  FolderGit2,
  GitBranch,
  ShieldCheck,
  User,
  Users,
  Briefcase,
  BookmarkCheck,
  Compass,
} from 'lucide-react';

export const MobileDock: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) return null;

  const isStudent = user.role === 'STUDENT';

  const studentLinks = [
    { to: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/student/projects', label: 'Projects', icon: FolderGit2 },
    { to: '/student/integrations', label: 'Code & Heatmap', icon: GitBranch },
    { to: '/student/evidence', label: 'Certs', icon: ShieldCheck },
    { to: '/student/profile', label: 'Profile', icon: User },
  ];

  const recruiterLinks = [
    { to: '/recruiter/dashboard', label: 'Console', icon: LayoutDashboard },
    { to: '/recruiter/candidates', label: 'Radar', icon: Users },
    { to: '/recruiter/jobs', label: 'Jobs', icon: Briefcase },
    { to: '/recruiter/shortlists', label: 'Shortlists', icon: BookmarkCheck },
    { to: '/posts', label: 'Feed', icon: Compass },
  ];

  const links = isStudent ? studentLinks : recruiterLinks;

  return (
    <div className="fixed bottom-3 left-2.5 right-2.5 z-50 md:hidden max-w-[calc(100vw-1.25rem)] mx-auto">
      <nav className="border border-white/15 bg-[#0c1326]/95 backdrop-blur-2xl rounded-2xl p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.85)] flex items-center justify-around">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all relative ${
                  isActive
                    ? isStudent
                      ? 'text-[#00f59b] bg-emerald-500/15 font-bold shadow-[0_0_12px_rgba(0,245,155,0.35)] scale-105'
                      : 'text-[#00e5ff] bg-cyan-500/15 font-bold shadow-[0_0_12px_rgba(0,229,255,0.35)] scale-105'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 font-medium'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="w-5 h-5 mb-0.5" />
                  <span className="text-[10px] tracking-tight leading-none font-mono font-bold">
                    {link.label}
                  </span>
                  {isActive && (
                    <span
                      className={`w-1 h-1 rounded-full absolute -top-0.5 ${
                        isStudent ? 'bg-[#00f59b]' : 'bg-[#00e5ff]'
                      } animate-pulse`}
                    />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
