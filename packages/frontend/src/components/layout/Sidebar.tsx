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
  Sparkles,
  ExternalLink,
  Zap,
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
    <aside className="w-64 border-r border-white/[0.07] bg-[#090b14]/70 backdrop-blur-xl p-4 shrink-0 hidden md:flex flex-col justify-between min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        {sections.map((sec, sIdx) => (
          <div key={sIdx} className="space-y-1.5">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3">
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
                      `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                        isActive
                          ? isStudent
                            ? 'bg-gradient-to-r from-emerald-500/15 to-emerald-500/5 text-emerald-400 border border-emerald-500/25 shadow-glow-emerald'
                            : 'bg-gradient-to-r from-cyan-500/15 to-cyan-500/5 text-cyan-400 border border-cyan-500/25 shadow-glow-cyan'
                          : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                      <span>{link.label}</span>
                    </div>
                    {link.badge && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-white/[0.06] text-slate-400 font-bold">
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

      {/* Bottom Promo / Link Pill */}
      {isStudent && user?.studentProfile && (
        <div className="pt-4 border-t border-white/[0.06]">
          <Link
            to={`/u/${user.studentProfile.username}`}
            target="_blank"
            className="p-3 rounded-xl bg-gradient-to-br from-slate-900 to-[#121624] border border-white/10 hover:border-emerald-500/30 flex items-center justify-between gap-2 group transition-all"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-white leading-tight group-hover:text-emerald-400 transition-colors">
                  Live Public Card
                </p>
                <p className="text-[10px] text-slate-400 font-mono">@{user.studentProfile.username}</p>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
          </Link>
        </div>
      )}
    </aside>
  );
};
