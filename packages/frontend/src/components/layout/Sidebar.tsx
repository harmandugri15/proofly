import React from 'react';
import { NavLink, Link } from 'react-router-dom';
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
  ExternalLink,
  Code2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const isStudent = user?.role === 'STUDENT';

  const studentSections = [
    {
      title: 'OVERVIEW',
      links: [
        { to: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/student/profile', label: 'Profile & Skills', icon: User },
      ],
    },
    {
      title: 'VERIFIED EVIDENCE',
      links: [
        { to: '/student/projects', label: 'Projects & Demos', icon: FolderGit2, badge: 'Live' },
        { to: '/student/integrations', label: 'GitHub & Coding', icon: GitBranch, badge: 'Heatmap' },
        { to: '/student/evidence', label: 'Certs & Badges', icon: ShieldCheck },
      ],
    },
    {
      title: 'WRITING & SYSTEM',
      links: [
        { to: '/student/posts', label: 'Case Studies', icon: FileText },
        { to: '/student/settings', label: 'Settings & Privacy', icon: Settings },
      ],
    },
  ];

  const recruiterSections = [
    {
      title: 'TALENT INTELLIGENCE',
      links: [
        { to: '/recruiter/dashboard', label: 'Console', icon: LayoutDashboard },
        { to: '/recruiter/candidates', label: 'Discover Candidates', icon: Users, badge: 'AI Match' },
      ],
    },
    {
      title: 'RECRUITING PIPELINE',
      links: [
        { to: '/recruiter/jobs', label: 'Job Openings', icon: Briefcase },
        { to: '/recruiter/shortlists', label: 'Saved Shortlists', icon: BookmarkCheck },
      ],
    },
  ];

  const sections = isStudent ? studentSections : recruiterSections;

  return (
    <aside className="w-64 border-r border-[#EBE5D8] bg-[#FAF7F2] p-4 shrink-0 hidden md:flex flex-col justify-between min-h-[calc(100vh-5rem)]">
      <div className="space-y-6">
        {sections.map((sec, sIdx) => (
          <div key={sIdx} className="space-y-1.5">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#758C7D] px-3">
              {sec.title}
            </h4>
            <div className="space-y-1">
              {sec.links.map((link: any) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3.5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 group ${
                        isActive
                          ? 'bg-[#E4ECE6] text-[#24362A] border border-[#C7D9CD] shadow-2xs'
                          : 'text-[#586E5F] hover:text-[#1F2C23] hover:bg-[#F4EFE6]'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                      <span>{link.label}</span>
                    </div>
                    {link.badge && (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#EBE5D8] text-[#2D3E32] font-bold">
                        {link.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Profile Quick Link */}
      {isStudent && user?.studentProfile && (
        <div className="pt-4 border-t border-[#EBE5D8]">
          <Link
            to={`/u/${user.studentProfile.username}`}
            target="_blank"
            className="p-3.5 rounded-2xl bg-[#F4EFE6] border border-[#DDD5C4] hover:border-[#D97043] flex items-center justify-between gap-2 group transition-all shadow-xs"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#FCE5DB] text-[#D97043] flex items-center justify-center border border-[#F4CDBC]">
                <Code2 className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-[#1F2C23] leading-tight group-hover:text-[#D97043] transition-colors">
                  Live Public Card
                </p>
                <p className="text-[10px] text-[#758C7D] font-mono">@{user.studentProfile.username}</p>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-[#758C7D] group-hover:text-[#D97043] transition-colors" />
          </Link>
        </div>
      )}
    </aside>
  );
};
