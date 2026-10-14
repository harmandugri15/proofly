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
    { to: '/student/integrations', label: 'Code', icon: GitBranch },
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
    <div className="fixed bottom-3 left-3 right-3 z-50 md:hidden max-w-[calc(100vw-1.5rem)] mx-auto">
      <nav className="border border-[#DDD5C4] bg-[#FAF7F2]/95 backdrop-blur-2xl rounded-full p-1.5 shadow-[0_8px_24px_rgba(31,44,35,0.12)] flex items-center justify-around">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all relative ${
                  isActive
                    ? 'text-[#24362A] bg-[#E4ECE6] font-bold shadow-2xs'
                    : 'text-[#758C7D] hover:text-[#1F2C23] font-medium'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="w-4 h-4 mb-0.5" />
                  <span className="text-[10px] tracking-tight leading-none font-sans font-semibold">
                    {link.label}
                  </span>
                  {isActive && (
                    <span className="w-1 h-1 rounded-full absolute -top-0.5 bg-[#D97043]" />
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
