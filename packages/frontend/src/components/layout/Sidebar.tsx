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
  ArrowUp,
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
        { to: '/student/projects', label: 'Projects & Apps', icon: FolderGit2, badge: 'Live' },
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
    <aside className="w-64 border-r-2 border-[#1F2C23] bg-[#FAF7F2] p-4 shrink-0 hidden md:flex flex-col justify-between fixed left-0 top-20 bottom-0 overflow-y-auto z-30 select-none">
      <div className="space-y-6">
        {sections.map((sec, sIdx) => (
          <div key={sIdx} className="space-y-1.5">
            <h4 className="text-[10px] font-mono font-black uppercase tracking-wider text-[#1F2C23] px-3">
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
                      `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 group ${
                        isActive
                          ? 'bg-[#E4ECE6] text-[#1F2C23] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]'
                          : 'text-[#586E5F] hover:text-[#1F2C23] hover:bg-[#F4EFE6] border-2 border-transparent'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                      <span>{link.label}</span>
                    </div>
                    {link.badge && (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#1F2C23] font-black border border-[#1F2C23] shadow-[1px_1px_0px_#1F2C23]">
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

      {/* Bottom Actions: Scroll to Top & Profile Quick Link */}
      <div className="pt-4 border-t-2 border-[#1F2C23] space-y-2.5">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-full py-2 px-3 rounded-xl bg-[#E4ECE6] hover:bg-[#C7D9CD] text-[#1F2C23] text-[11px] font-black flex items-center justify-center gap-1.5 transition-all border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          title="Scroll page to top"
        >
          <ArrowUp className="w-3.5 h-3.5 text-[#1F2C23]" />
          <span>Scroll to Top</span>
        </button>

        {isStudent && user?.studentProfile && (
          <Link
            to={`/u/${user.studentProfile.username}`}
            target="_blank"
            className="p-3 rounded-2xl bg-white border-2 border-[#1F2C23] hover:bg-[#FAF7F2] shadow-[2px_2px_0px_#1F2C23] hover:shadow-[3px_3px_0px_#1F2C23] flex items-center justify-between gap-2 group transition-all"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#FCE5DB] text-[#D97043] flex items-center justify-center border-2 border-[#1F2C23] shrink-0">
                <Code2 className="w-3.5 h-3.5" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-xs font-black text-[#1F2C23] leading-tight group-hover:text-[#D97043] transition-colors truncate">
                  Live Public Card
                </p>
                <p className="text-[10px] text-[#758C7D] font-mono truncate">@{user.studentProfile.username}</p>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-[#1F2C23] group-hover:text-[#D97043] transition-colors shrink-0" />
          </Link>
        )}
      </div>
    </aside>
  );
};
