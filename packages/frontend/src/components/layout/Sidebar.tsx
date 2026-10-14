import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  FolderGit2,
  ShieldCheck,
  GitBranch,
  FileText,
  Settings,
  Users,
  Briefcase,
  BookmarkCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const isStudent = user?.role === 'STUDENT';

  const studentLinks = [
    { to: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/student/profile', label: 'Profile & Skills', icon: User },
    { to: '/student/projects', label: 'Projects & Demos', icon: FolderGit2 },
    { to: '/student/evidence', label: 'Certs & Credentials', icon: ShieldCheck },
    { to: '/student/integrations', label: 'GitHub & Coding', icon: GitBranch },
    { to: '/student/posts', label: 'Case Studies', icon: FileText },
    { to: '/student/settings', label: 'Settings & Privacy', icon: Settings },
  ];

  const recruiterLinks = [
    { to: '/recruiter/dashboard', label: 'Console', icon: LayoutDashboard },
    { to: '/recruiter/candidates', label: 'Discover Candidates', icon: Users },
    { to: '/recruiter/jobs', label: 'Job Requirements', icon: Briefcase },
    { to: '/recruiter/shortlists', label: 'Shortlists', icon: BookmarkCheck },
  ];

  const links = isStudent ? studentLinks : recruiterLinks;

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900/50 p-4 shrink-0 hidden md:block min-h-[calc(100vh-4rem)]">
      <div className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {link.label}
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
};
