import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  GitBranch,
  ArrowRight,
  ExternalLink,
  Flame,
  Sparkles,
  Zap,
  Code2,
  CheckCircle2,
  Star,
  Eye,
  Terminal,
} from 'lucide-react';
import { MarqueeTicker } from '../components/common/MarqueeTicker';
import {
  BocSparkle,
  BocStudioStamp,
  CreativeSquiggle,
  TactileSticker,
} from '../components/common/CreativeArt';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden text-slate-100 selection:bg-[#ff451a]/30 selection:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 w-full max-w-full">
        {/* Energetic Ambient Background Glows */}
        <div className="absolute top-1/6 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#ff451a]/15 via-[#00f59b]/15 to-[#00e5ff]/15 blur-[130px] pointer-events-none -z-10 rounded-full" />
        <div className="absolute top-10 right-10 hidden xl:block pointer-events-none">
          <BocStudioStamp size={110} accent="coral" text="• VERIFIED CODE EVIDENCE • GROUNDED TALENT • NO BS " />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            {/* Playful Boc.Studio Style Badge Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12192e] border border-white/10 backdrop-blur-md text-xs font-mono font-bold tracking-wider hover:border-[#ff451a]/40 transition-all hover:scale-105 cursor-default shadow-lg">
              <BocSparkle size={14} color="coral" />
              <span className="text-[#ff7043]">PROOF-FIRST TALENT RADAR</span>
              <span className="text-slate-600">|</span>
              <span className="text-[#00f59b] font-semibold">ZERO RESUME FLUFF</span>
            </div>

            {/* Giant Title with Electric Gradient */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] font-sans">
                Ditch the boring PDF.{' '}
                <br />
                <span className="gradient-text-flame">Your code is your proof.</span>
              </h1>
              <div className="flex justify-center pt-1">
                <CreativeSquiggle color="#ff451a" width={110} height={20} />
              </div>
            </div>

            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Proofly unifies live GitHub contribution heatmaps, algorithmic problem solving metrics, verified credentials, and real architecture write-ups into one high-voltage profile.
            </p>

            {/* CTAs */}
            <div className="pt-3 flex flex-wrap justify-center items-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#ff451a] via-[#ff5c26] to-[#ff8a00] text-white font-black text-sm transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,69,26,0.45)] hover:shadow-[0_0_40px_rgba(255,69,26,0.6)]"
              >
                <span>Claim Your Proof Handle</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </Link>
              <Link
                to="/posts"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-[#12192e] hover:bg-[#182342] text-white font-bold text-sm border border-white/10 transition-all hover:scale-105 shadow-md"
              >
                <Flame className="w-4 h-4 text-[#ffb703]" />
                <span>Explore Community Feed</span>
              </Link>
            </div>

            {/* Quick Live Preview Links */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400 font-mono">
              <span className="text-slate-500">Live Seeded Proofs:</span>
              <Link
                to="/u/alexchen"
                className="px-3.5 py-1.5 rounded-xl bg-[#12192e] hover:bg-[#182342] border border-white/10 text-[#00f59b] flex items-center gap-1.5 transition-all font-bold"
              >
                <span>@alexchen (Full-Stack)</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </Link>
              <Link
                to="/u/mayapatel"
                className="px-3.5 py-1.5 rounded-xl bg-[#12192e] hover:bg-[#182342] border border-white/10 text-[#00e5ff] flex items-center gap-1.5 transition-all font-bold"
              >
                <span>@mayapatel (Rust Systems)</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </Link>
            </div>
          </div>

          {/* Interactive Mock Social Card (Instagram + Reddit + Studio Vibes) */}
          <div className="mt-14 max-w-3xl mx-auto relative group w-full max-w-full">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#ff451a]/30 via-[#00f59b]/30 to-[#00e5ff]/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-500" />

            <div className="relative rounded-3xl bg-[#0e1529]/95 border border-white/15 p-5 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6 w-full max-w-full overflow-hidden">
              {/* Header: Story-ring avatar + verified handles */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="story-ring story-ring-active shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#12192e] flex items-center justify-center text-sm font-black text-white">
                      AC
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-extrabold text-white font-sans">Alex Chen</h3>
                      <span className="text-xs font-mono text-slate-400">@alexchen</span>
                      <ShieldCheck className="w-4 h-4 text-[#00f59b]" />
                    </div>
                    <p className="text-xs text-slate-300">
                      Distributed Systems & Full-Stack • Class of 2025
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  <span className="text-xs font-mono font-black px-3 py-1 rounded-full bg-[#00f59b]/15 text-[#00f59b] border border-[#00f59b]/30 flex items-center gap-1 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f59b] animate-ping" />
                    95% PROOF SCORE
                  </span>
                </div>
              </div>

              {/* Featured Project Showcase */}
              <div className="p-5 rounded-2xl bg-[#141d38] border border-white/10 space-y-3.5 shadow-lg">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[#00f59b] uppercase font-bold tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" /> Featured Evidence Project
                  </span>
                  <span className="text-[#00e5ff] font-mono font-bold text-[11px] px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                    1-Click Auto Crawled
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white font-sans">
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
                      className="text-[10px] font-mono px-2.5 py-0.5 rounded-lg bg-[#0e1529] text-slate-200 border border-white/10"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Social Proof Bar */}
                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="flex items-center gap-1 font-mono text-amber-300 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-300" /> 248 stars
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[#ff7043] font-semibold">
                      <Flame className="w-3.5 h-3.5" /> 400 annual commits
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[#00e5ff]">
                      <Eye className="w-3.5 h-3.5" /> 18 recruiters viewed
                    </span>
                  </div>
                  <span className="text-[#00f59b] text-[11px] font-bold font-mono">
                    ✓ Code Verified
                  </span>
                </div>
              </div>

              {/* Verified External Signals Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs font-mono">
                <div className="p-3 rounded-xl bg-[#12192e] border border-white/10">
                  <p className="text-slate-400 text-[10px] uppercase font-bold">GitHub Heatmap</p>
                  <p className="text-[#00f59b] font-black text-sm mt-0.5">52 Weeks Live</p>
                </div>
                <div className="p-3 rounded-xl bg-[#12192e] border border-white/10">
                  <p className="text-slate-400 text-[10px] uppercase font-bold">LeetCode Solved</p>
                  <p className="text-[#ffb703] font-black text-sm mt-0.5">245 Verified</p>
                </div>
                <div className="p-3 rounded-xl bg-[#12192e] border border-white/10">
                  <p className="text-slate-400 text-[10px] uppercase font-bold">LinkedIn</p>
                  <p className="text-[#00e5ff] font-black text-sm mt-0.5">Verified Link</p>
                </div>
                <div className="p-3 rounded-xl bg-[#12192e] border border-white/10">
                  <p className="text-slate-400 text-[10px] uppercase font-bold">AWS Credly Cert</p>
                  <p className="text-[#c084fc] font-black text-sm mt-0.5">Issuer Checked</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Boc.Studio High-Energy Marquee Ticker Strip */}
      <MarqueeTicker />

      {/* Real Talk Comparison: Old Way vs Proofly */}
      <section className="py-20 border-b border-white/10 bg-[#0a0f1d]/70 backdrop-blur-lg w-full max-w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 w-full max-w-full">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff451a]/15 text-[#ff7043] border border-[#ff451a]/30 text-xs font-mono font-bold uppercase">
              <Flame className="w-3.5 h-3.5" />
              <span>THE REALITY CHECK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-sans">
              Why the resume is dead in 2026
            </h2>
            <p className="text-slate-300 text-sm max-w-lg mx-auto">
              Hiring students shouldn't feel like reading fictional creative writing. Proofly provides cryptographically and crawler-grounded proof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Old Way */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#14121a]/90 border border-rose-500/25 space-y-5 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black text-rose-400 uppercase tracking-wider">
                  😴 THE LEGACY RESUME EXPERIENCE
                </span>
                <span className="text-rose-400 text-xs font-mono bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20 font-bold">
                  Obsolete
                </span>
              </div>
              <ul className="space-y-4 text-xs text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold text-base shrink-0">✕</span>
                  <span><strong>Static 2-Page PDFs:</strong> Word salads packed with buzzwords and exaggerated claims with zero proof of craft.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold text-base shrink-0">✕</span>
                  <span><strong>The 8-Tab Nightmare:</strong> Recruiters have to hunt across GitHub, LeetCode, LinkedIn, Medium, and broken Vercel demo URLs.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold text-base shrink-0">✕</span>
                  <span><strong>Ghosting Black Holes:</strong> Students send 300 generic applications into ATS filters without ever showcasing their actual skills.</span>
                </li>
              </ul>
            </div>

            {/* Proofly Way */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0e1a26]/95 border border-[#00f59b]/40 space-y-5 shadow-[0_0_30px_rgba(0,245,155,0.2)]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black text-[#00f59b] uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> THE PROOFLY VERIFIED WAY
                </span>
                <span className="text-[#00f59b] text-xs font-mono bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold">
                  Active Signals
                </span>
              </div>
              <ul className="space-y-4 text-xs text-slate-200">
                <li className="flex items-start gap-3">
                  <span className="text-[#00f59b] font-bold text-base shrink-0">✓</span>
                  <span><strong>Automated Code Provenance:</strong> Live GitHub commit heatmaps, authentic language distributions, and repository crawlers.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#00f59b] font-bold text-base shrink-0">✓</span>
                  <span><strong>All-In-One Unified Signals:</strong> LeetCode solving streaks, Credly issuer checks, and LinkedIn identity in one screen.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#00f59b] font-bold text-base shrink-0">✓</span>
                  <span><strong>Recruiter Fast-Pass Link:</strong> Share one unique URL on your resume. Hiring teams get instant 1-click access with zero login walls.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section className="py-24 w-full max-w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 w-full max-w-full">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 text-[#00e5ff] border border-cyan-500/30 text-xs font-mono font-bold uppercase">
              <Terminal className="w-3.5 h-3.5" />
              <span>CRAFTED FOR BUILDERS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-sans">
              Engineered to prove real ability
            </h2>
            <p className="text-slate-300 text-sm max-w-md mx-auto">
              Everything you need to prove your engineering talent and get hired by high-conviction teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-[#0e1628]/90 border border-white/10 space-y-4 hover:border-[#00f59b]/40 transition-all shadow-xl group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-[#00f59b] flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <GitBranch className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-white font-sans">1-Click GitHub Crawler</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Just paste your repo link. Our crawler extracts your architecture summary from your README, star count, tech stack tags, and demo links automatically.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#0e1628]/90 border border-white/10 space-y-4 hover:border-[#00e5ff]/40 transition-all shadow-xl group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 text-[#00e5ff] flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-white font-sans">In-App Coding Radar</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect LeetCode, HackerRank, and Codeforces handles. Recruiters see verified Easy/Medium/Hard problem splits, rankings, and active streaks.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#0e1628]/90 border border-white/10 space-y-4 hover:border-[#c084fc]/40 transition-all shadow-xl group">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/15 text-[#c084fc] flex items-center justify-center border border-purple-500/20 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-white font-sans">Grounded AI Matchmaker</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Recruiters query candidate depth and receive transparent answers strictly backed by cited repositories and verifiable project artifacts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Marquee Strip */}
      <MarqueeTicker />

      {/* Big Action Footer Banner */}
      <section className="py-24 border-t border-white/10 bg-gradient-to-b from-transparent to-[#0a0f1d] w-full max-w-full">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 w-full max-w-full">
          <BocSparkle size={28} color="coral" className="mx-auto" />
          <h2 className="text-3xl sm:text-5xl font-black text-white font-sans tracking-tight">
            Ready to stand out with verified proof?
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Create your free builder profile in under 2 minutes. Sync your GitHub, link your problem solving accounts, and share your fast-pass link.
          </p>
          <div className="pt-3 flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#ff451a] via-[#ff5c26] to-[#ff8a00] text-white font-black text-sm shadow-[0_0_25px_rgba(255,69,26,0.45)] hover:scale-105 transition-transform"
            >
              Get Started Now
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 rounded-2xl bg-[#141d38] hover:bg-[#1a264a] text-white font-bold text-sm border border-white/10 hover:scale-105 transition-transform"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
