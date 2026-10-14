import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  GitBranch,
  Cpu,
  ArrowRight,
  ExternalLink,
  Flame,
  Sparkles,
  Zap,
  Code2,
  CheckCircle2,
  Share2,
  Star,
  MessageSquare,
  TrendingUp,
  Heart,
  Eye,
} from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-500/15 via-cyan-500/15 to-purple-500/15 blur-[120px] pointer-events-none -z-10 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            {/* Pill Banner */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-emerald-400 text-xs font-mono font-bold tracking-wider hover:border-emerald-500/40 transition-all hover:scale-105 cursor-default">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>THE PROOF-FIRST TALENT ECOSYSTEM</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300">NO RESUME FLUFF</span>
            </div>

            {/* Giant Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] font-sans">
              Ditch the boring PDF.{' '}
              <br />
              <span className="gradient-text-emerald">Your code is your proof.</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Proofly unifies live GitHub contribution heatmaps, algorithmic coding profiles, verified credentials, and real architecture write-ups into one shareable profile.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap justify-center items-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 font-black text-sm transition-all hover:scale-105 shadow-glow-emerald"
              >
                <span>Claim Your Proof Handle</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/posts"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.08] text-white font-bold text-sm border border-white/10 transition-all hover:scale-105"
              >
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Explore Community Feed</span>
              </Link>
            </div>

            {/* Quick Live Preview Links */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400 font-mono">
              <span className="text-slate-500">Live Seeded Proofs:</span>
              <Link
                to="/u/alexchen"
                className="px-3 py-1 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-emerald-400 flex items-center gap-1.5 transition-all"
              >
                <span>@alexchen (Full-Stack)</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </Link>
              <Link
                to="/u/mayapatel"
                className="px-3 py-1 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-cyan-400 flex items-center gap-1.5 transition-all"
              >
                <span>@mayapatel (Rust Systems)</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </Link>
            </div>
          </div>

          {/* Interactive Mock Social Card (Instagram + Reddit Vibes) */}
          <div className="mt-16 max-w-3xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-500" />

            <div className="relative rounded-3xl bg-[#0c0f18]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
              {/* Header: Story-ring avatar + verified handles */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="story-ring story-ring-active">
                    <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-sm font-black text-white">
                      AC
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-extrabold text-white">Alex Chen</h3>
                      <span className="text-xs font-mono text-slate-400">@alexchen</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-xs text-slate-400">
                      Distributed Systems & Full-Stack • Class of 2025
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    95% Proof Score
                  </span>
                </div>
              </div>

              {/* Substantiated Project Showcase (Instagram/Reddit Post Format) */}
              <div className="p-5 rounded-2xl bg-[#121624] border border-white/5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-emerald-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" /> Featured Evidence Project
                  </span>
                  <span className="text-slate-400 font-mono">1-Click Crawled</span>
                </div>

                <h4 className="text-lg font-bold text-white">
                  SyncFlow — Real-Time Canvas with CRDT Concurrency
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Infinite collaborative whiteboard built with WebSockets, CRDT conflict-free replication, and PostgreSQL persistence. Handles 1,000+ concurrent state mutations per room under 15ms latency.
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['TypeScript', 'React', 'CRDT', 'WebSockets', 'PostgreSQL', 'Docker'].map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-black/40 text-slate-300 border border-white/5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Micro Reddit-style Social Proof Bar */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 font-mono text-emerald-400 font-bold">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> 248 stars
                    </span>
                    <span className="flex items-center gap-1 font-mono text-slate-300">
                      <Flame className="w-3.5 h-3.5 text-rose-400" /> 400 annual commits
                    </span>
                    <span className="flex items-center gap-1 font-mono text-cyan-400">
                      <Eye className="w-3.5 h-3.5" /> 18 recruiters viewed
                    </span>
                  </div>
                  <span className="text-emerald-400 text-[11px] font-bold font-mono">
                    ✓ Code Verified
                  </span>
                </div>
              </div>

              {/* Verified External Signals Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-slate-400 text-[10px]">GitHub Heatmap</p>
                  <p className="text-emerald-400 font-bold text-sm mt-0.5">52 Weeks Live</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-slate-400 text-[10px]">LeetCode Solved</p>
                  <p className="text-amber-400 font-bold text-sm mt-0.5">245 Verified</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-slate-400 text-[10px]">LinkedIn</p>
                  <p className="text-cyan-400 font-bold text-sm mt-0.5">Verified Link</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-slate-400 text-[10px]">AWS Credly Cert</p>
                  <p className="text-purple-400 font-bold text-sm mt-0.5">Issuer Checked</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Talk Comparison: Old Way vs Proofly */}
      <section className="py-20 border-y border-white/[0.07] bg-[#0a0d16]/60 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-white font-sans">
              The Reality Check
            </h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              Hiring students shouldn't feel like reading fictional creative writing. Proofly fixes the broken talent signal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Old Way */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0f121d]/80 border border-rose-500/20 space-y-5">
              <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">
                <span>😴 THE LEGACY RESUME EXPERIENCE</span>
              </div>
              <ul className="space-y-3.5 text-xs text-slate-400">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 text-sm">✕</span>
                  <span><strong>Static 2-Page PDFs:</strong> Word salads packed with buzzwords and exaggerated claims with zero proof.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 text-sm">✕</span>
                  <span><strong>The 8-Tab Nightmare:</strong> Recruiters have to manually hunt through GitHub, LeetCode, LinkedIn, Medium, and dead demo links.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 text-sm">✕</span>
                  <span><strong>Ghosting Black Holes:</strong> Students send 300 generic applications into ATS filters without ever showcasing their actual craft.</span>
                </li>
              </ul>
            </div>

            {/* Proofly Way */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0f1922]/90 border border-emerald-500/30 space-y-5 shadow-glow-emerald">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                <span>⚡ THE PROOFLY VERIFIED WAY</span>
              </div>
              <ul className="space-y-3.5 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 text-sm">✓</span>
                  <span><strong>Automated Code Provenance:</strong> Live GitHub commit heatmaps, authentic language distributions, and repository crawlers.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 text-sm">✓</span>
                  <span><strong>All-In-One Unified Signals:</strong> LeetCode solving streaks, Credly issuer checks, and LinkedIn identity in one screen.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 text-sm">✓</span>
                  <span><strong>Recruiter Fast-Pass Link:</strong> Share one unique URL on your resume. Hiring teams get instant 1-click access with zero login walls.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-white font-sans">
              Engineered for Real Builders
            </h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Everything you need to prove your engineering talent and get hired by high-conviction teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/5 space-y-4 hover:border-emerald-500/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <GitBranch className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">1-Click GitHub Crawler</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Just paste your repo link. Our crawler extracts your architecture summary from your README, star count, tech stack tags, and demo links automatically.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/5 space-y-4 hover:border-cyan-500/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">In-App Coding Radar</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect LeetCode, HackerRank, and Codeforces handles. Recruiters see verified Easy/Medium/Hard problem splits, rankings, and active streaks.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/5 space-y-4 hover:border-purple-500/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Grounded AI Matchmaker</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Recruiters query candidate depth and receive transparent answers strictly backed by cited repositories and verifiable project artifacts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Big Action Footer Banner */}
      <section className="py-20 border-t border-white/[0.07] bg-gradient-to-b from-transparent to-[#0e1220]/80">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-white font-sans">
            Ready to stand out with verified proof?
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Create your free builder profile in under 2 minutes. Sync your GitHub, link your problem solving accounts, and share your fast-pass link.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 font-black text-sm shadow-glow-emerald hover:scale-105 transition-transform"
            >
              Get Started Now
            </Link>
            <Link
              to="/login"
              className="px-8 py-3.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.08] text-white font-bold text-sm border border-white/10 hover:scale-105 transition-transform"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
