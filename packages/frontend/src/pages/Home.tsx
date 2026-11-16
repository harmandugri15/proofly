import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Code2,
  Sparkles,
  Key,
  Copy,
  CheckCircle2,
  GitCommit,
  Github,
  Zap,
  Layers,
  Terminal,
  FileCode,
  Check,
  X,
  TrendingUp,
  Award,
  ChevronRight,
  Lock,
  Eye,
  Star,
  Users,
  Building2,
  Quote,
  GitBranch,
  FileText,
  RefreshCw,
  Play,
  Sliders,
  CheckCircle,
  Globe,
  Flame,
  ArrowUpRight,
  Search,
} from 'lucide-react';
import {
  OrganicLeafLogo,
  Stamp100Verified,
  DelicateStarOrnament,
} from '../components/common/CreativeArt';

export const Home: React.FC = () => {
  // 1. Dynamic Rotating Hero Keyword
  const rotatingWords = [
    'backend architecture',
    'distributed systems',
    'algorithmic skills',
    'production apps',
    'real credentials',
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2600);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  // 2. Interactive Hero Window Audit Runner
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditProgress, setAuditProgress] = useState(3);
  const [auditComplete, setAuditComplete] = useState(false);

  const handleRunAudit = () => {
    if (isAuditing) return;
    setIsAuditing(true);
    setAuditComplete(false);
    setAuditProgress(1);

    setTimeout(() => setAuditProgress(2), 600);
    setTimeout(() => setAuditProgress(3), 1200);
    setTimeout(() => {
      setAuditProgress(4);
      setIsAuditing(false);
      setAuditComplete(true);
    }, 1800);
  };

  // 3. Platform Feature Showcase: 5 Vertical Tabs
  type PlatformTab = 'crawler' | 'algorithms' | 'fastpass' | 'credentials' | 'casestudies';
  const [activePlatformTab, setActivePlatformTab] = useState<PlatformTab>('crawler');

  // 4. Interactive In-App Verification Engine: 4 Horizontal Tabs & Slider
  type SimulatorTab = 'github' | 'leetcode' | 'credly' | 'fastpass';
  const [simulatorTab, setSimulatorTab] = useState<SimulatorTab>('github');
  const [commitSlider, setCommitSlider] = useState(74);
  const [difficultyTier, setDifficultyTier] = useState<'MEDIUM' | 'HARD'>('MEDIUM');
  const [copiedHash, setCopiedHash] = useState(false);

  const handleCopyDemoHash = () => {
    navigator.clipboard.writeText('PRF-8A2F9C1B');
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="min-h-screen w-full bg-transparent text-[#1F2C23] selection:bg-[#D97043]/20 selection:text-[#D97043] pb-24 relative overflow-hidden">
      {/* High-Energy Neo-Brutalist Ambient Mesh Orbs */}
      <div className="absolute top-10 left-1/4 -translate-x-1/2 w-[650px] h-[650px] bg-[#FFDE59]/35 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-64 right-0 w-[700px] h-[700px] bg-[#70D6FF]/35 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[900px] left-5 w-[600px] h-[600px] bg-[#DDD6FE]/30 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-[1800px] right-5 w-[650px] h-[650px] bg-[#86EFAC]/35 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-[2800px] left-1/3 w-[650px] h-[650px] bg-[#FFEDD5]/35 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[3800px] right-10 w-[600px] h-[600px] bg-[#FFDE59]/30 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* ========================================================================= */}
      {/* 1. TOP ANNOUNCEMENT BAR (TensorTonic-style Slim Banner)                   */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#1F2C23] text-white py-2 px-4 border-b-2 border-[#1F2C23]">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs font-mono">
          <span className="bg-[#FFDE59] text-[#1F2C23] font-black px-2 py-0.5 rounded-md text-[10px] uppercase shadow-[1px_1px_0px_#FFFFFF]">
            NEW 2.0
          </span>
          <span className="font-bold hidden sm:inline text-white/90">
            Autonomous GitHub Crawler & 1-Click Fast-Pass™ Engine is Live
          </span>
          <span className="text-white/60 hidden sm:inline">·</span>
          <Link
            to="/register"
            className="text-[#86EFAC] hover:underline font-black flex items-center gap-1"
          >
            <span>Claim your public pass code</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-20 sm:space-y-28">

        {/* ========================================================================= */}
        {/* 2. SPLIT 2-COLUMN HERO (TensorTonic Architecture + Neo-Brutalist Pop)     */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pt-2">
          {/* Left Column: Heading, Dynamic Rotating Word, Value Prop, CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Real-time Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF9C3] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-[#1F2C23] text-xs font-mono font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-ping" />
              <Zap className="w-3.5 h-3.5 text-[#D97043]" />
              <span>REAL-TIME TECHNICAL AUDIT ENGINE</span>
            </div>

            {/* Main Headline with Dynamic Rotating Keyword */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1F2C23] leading-[1.08]">
              Prove{' '}
              <span className="inline-block relative">
                <span className="bg-[#86EFAC] px-3 py-0.5 rounded-xl border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] text-[#1F2C23] transition-all duration-300 font-sans font-black">
                  {rotatingWords[currentWordIndex]}
                </span>
              </span>{' '}
              through code.
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base text-[#405446] leading-relaxed font-sans font-medium max-w-xl">
              Software engineers don't need 2-page resumes stuffed with buzzwords. Proofly turns real GitHub AST telemetry, 52-week commit activity, algorithmic streaks, and verified credentials into a tamper-proof technical dossier that scouts can inspect and run in 1-click.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#D97043] hover:bg-[#C55F34] text-white font-mono font-black text-sm border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all group"
              >
                <span>Claim Your Fast-Pass™</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[3]" />
              </Link>

              <Link
                to="/posts"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#1F2C23] font-mono font-black text-sm border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
              >
                <span>Browse Case Studies</span>
                <ArrowUpRight className="w-4 h-4 text-[#D97043]" />
              </Link>
            </div>

            {/* Tech Stack Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-[#586E5F]">
              <span className="font-black text-[#1F2C23]">Integrated Telemetry:</span>
              <span className="bg-white px-2 py-0.5 rounded-md border border-[#1F2C23] font-bold text-[#1F2C23] shadow-[1px_1px_0px_#1F2C23]">
                GitHub API
              </span>
              <span className="bg-white px-2 py-0.5 rounded-md border border-[#1F2C23] font-bold text-[#1F2C23] shadow-[1px_1px_0px_#1F2C23]">
                LeetCode
              </span>
              <span className="bg-white px-2 py-0.5 rounded-md border border-[#1F2C23] font-bold text-[#1F2C23] shadow-[1px_1px_0px_#1F2C23]">
                AWS & Credly
              </span>
              <span className="bg-white px-2 py-0.5 rounded-md border border-[#1F2C23] font-bold text-[#1F2C23] shadow-[1px_1px_0px_#1F2C23]">
                Codeforces
              </span>
            </div>
          </div>

          {/* Right Column: TensorTonic-Style Interactive Hero Code & Telemetry Window */}
          <div className="lg:col-span-6">
            <div className="rounded-[28px] bg-white border-2 border-[#1F2C23] shadow-[6px_6px_0px_#1F2C23] overflow-hidden">
              {/* Window Header (MacOS Traffic Lights + Filename + Action) */}
              <div className="p-3.5 sm:p-4 bg-[#FAF7F2] border-b-2 border-[#1F2C23] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#EF4444] border border-[#1F2C23]" />
                  <div className="w-3 h-3 rounded-full bg-[#EAB308] border border-[#1F2C23]" />
                  <div className="w-3 h-3 rounded-full bg-[#22C55E] border border-[#1F2C23]" />
                  <span className="ml-2 text-xs font-mono font-black text-[#1F2C23] bg-white px-2.5 py-0.5 rounded-md border border-[#1F2C23] shadow-[1px_1px_0px_#1F2C23]">
                    proof_telemetry_audit.ts
                  </span>
                </div>

                <button
                  onClick={handleRunAudit}
                  disabled={isAuditing}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#86EFAC] hover:bg-[#4ADE80] text-[#1F2C23] font-mono font-black text-xs border border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all disabled:opacity-50"
                >
                  <Play className={`w-3 h-3 fill-current ${isAuditing ? 'animate-spin' : ''}`} />
                  <span>{isAuditing ? 'Auditing...' : '▷ Run Audit'}</span>
                </button>
              </div>

              {/* Window Body: 2 Sub-panes (Left: Live Visual Graph; Right: Assertions Suite) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x-2 divide-[#1F2C23]">
                {/* Left Sub-pane: Interactive Heatmap Matrix & Dynamic Sensor */}
                <div className="p-5 bg-[#FAF7F2] space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="font-black text-[#1F2C23] uppercase">52-Week Commit Density</span>
                      <span className="text-[#16A34A] font-black">99.8% TRUST</span>
                    </div>

                    {/* Mini Simulated 52-Week Dot Matrix */}
                    <div className="grid grid-cols-12 gap-1.5 p-3 rounded-xl bg-white border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]">
                      {Array.from({ length: 48 }).map((_, i) => {
                        const active = (i * 7 + 3) % 5 === 0;
                        const dense = (i * 3 + 1) % 4 === 0;
                        return (
                          <div
                            key={i}
                            className={`w-3.5 h-3.5 rounded-[4px] border border-[#1F2C23] transition-all duration-300 ${
                              active
                                ? 'bg-[#16A34A] scale-105'
                                : dense
                                ? 'bg-[#86EFAC]'
                                : i % 2 === 0
                                ? 'bg-[#FEF9C3]'
                                : 'bg-[#FAF7F2]'
                            }`}
                            title={`Week ${i + 1} telemetry`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Telemetry Sensor Readout */}
                  <div className="p-3 rounded-xl bg-[#FEF9C3] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono font-black uppercase text-[#1F2C23]">
                      <span>Entropy Check:</span>
                      <span className="text-[#16A34A]">ZERO SUSPECT CODE</span>
                    </div>
                    <div className="font-mono text-xs font-black text-[#1F2C23] flex items-center justify-between">
                      <span>Verified Commits: 1,420</span>
                      <span className="bg-white px-2 py-0.5 rounded border border-[#1F2C23]">100% Genuine</span>
                    </div>
                  </div>
                </div>

                {/* Right Sub-pane: Code Assertions & Test Suite */}
                <div className="p-5 bg-white space-y-4 font-mono text-xs">
                  <div className="text-[11px] font-black uppercase tracking-wider text-[#586E5F] pb-1 border-b border-[#1F2C23]/20">
                    Proof Validation Assertions
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-start gap-2.5">
                      <div className={`mt-0.5 w-4 h-4 rounded-full border-2 border-[#1F2C23] flex items-center justify-center shrink-0 transition-colors ${
                        auditProgress >= 1 ? 'bg-[#86EFAC]' : 'bg-[#FAF7F2]'
                      }`}>
                        {auditProgress >= 1 && <Check className="w-2.5 h-2.5 text-[#1F2C23] stroke-[3]" />}
                      </div>
                      <div>
                        <div className="font-black text-[#1F2C23]">AST Repository Byte Parser</div>
                        <div className="text-[10px] text-[#586E5F]">TypeScript 78% · Go 22% verified</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className={`mt-0.5 w-4 h-4 rounded-full border-2 border-[#1F2C23] flex items-center justify-center shrink-0 transition-colors ${
                        auditProgress >= 2 ? 'bg-[#86EFAC]' : 'bg-[#FAF7F2]'
                      }`}>
                        {auditProgress >= 2 && <Check className="w-2.5 h-2.5 text-[#1F2C23] stroke-[3]" />}
                      </div>
                      <div>
                        <div className="font-black text-[#1F2C23]">52-Week Commit History Sync</div>
                        <div className="text-[10px] text-[#586E5F]">Timestamped linear commit velocity</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className={`mt-0.5 w-4 h-4 rounded-full border-2 border-[#1F2C23] flex items-center justify-center shrink-0 transition-colors ${
                        auditProgress >= 3 ? 'bg-[#86EFAC]' : 'bg-[#FAF7F2]'
                      }`}>
                        {auditProgress >= 3 && <Check className="w-2.5 h-2.5 text-[#1F2C23] stroke-[3]" />}
                      </div>
                      <div>
                        <div className="font-black text-[#1F2C23]">Cryptographic Fast-Pass™ Signature</div>
                        <div className="text-[10px] text-[#586E5F]">Zero-login recruiter pass generated</div>
                      </div>
                    </div>
                  </div>

                  {/* Output Terminal Console */}
                  <div className="p-2.5 rounded-xl bg-[#1F2C23] text-white text-[11px] leading-relaxed pt-2 border border-[#1F2C23]">
                    <div className="text-[#86EFAC] font-bold">
                      {auditComplete
                        ? '✓ All 3 verification checks passed (0.04s)'
                        : isAuditing
                        ? '... Verifying GitHub AST and signatures ...'
                        : '▷ Click "Run Audit" to simulate proof check'}
                    </div>
                    <div className="text-white/60 text-[10px] pt-1">status: DOSSIER_AUTHENTICATED</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. MOVING COMPONENTS: INFINITE MARQUEE TICKERS (University & Tech Belts)  */}
        {/* ========================================================================= */}
        <section className="space-y-4 pt-4">
          <div className="text-center space-y-1">
            <span className="text-xs font-mono font-black uppercase tracking-widest text-[#586E5F]">
              TRUSTED BY BUILDERS, FELLOWS & HIRING TEAMS WORLDWIDE
            </span>
          </div>

          {/* Marquee Row 1: Top Universities & Fellowships */}
          <div className="relative w-full overflow-hidden py-2 mask-gradient">
            <div className="animate-marquee flex gap-4">
              {[
                'Stanford University',
                'UC Berkeley',
                'Carnegie Mellon University',
                'Cornell Tech',
                'University of Waterloo',
                'MIT',
                'Georgia Tech',
                'ETH Zürich',
                'Princeton',
                'Stanford University',
                'UC Berkeley',
                'Carnegie Mellon University',
                'Cornell Tech',
                'University of Waterloo',
                'MIT',
                'Georgia Tech',
                'ETH Zürich',
                'Princeton',
              ].map((uni, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 rounded-xl bg-white border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] text-xs font-mono font-black text-[#1F2C23] flex items-center gap-2 whitespace-nowrap shrink-0 hover:scale-105 transition-transform"
                >
                  <Award className="w-3.5 h-3.5 text-[#D97043]" />
                  <span>{uni}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Marquee Row 2: Top Tech Employers & Scouting Teams (Reverse Direction) */}
          <div className="relative w-full overflow-hidden py-1">
            <div className="animate-marquee-reverse flex gap-4">
              {[
                'Google',
                'Meta',
                'Stripe',
                'Databricks',
                'Uber',
                'Amazon AWS',
                'OpenAI',
                'Cloudflare',
                'Linear',
                'Vercel',
                'Google',
                'Meta',
                'Stripe',
                'Databricks',
                'Uber',
                'Amazon AWS',
                'OpenAI',
                'Cloudflare',
                'Linear',
                'Vercel',
              ].map((company, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 rounded-xl bg-[#FEF9C3] border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] text-xs font-mono font-black text-[#1F2C23] flex items-center gap-2 whitespace-nowrap shrink-0 hover:scale-105 transition-transform"
                >
                  <Building2 className="w-3.5 h-3.5 text-[#1F2C23]" />
                  <span>{company}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. TENSORTONIC-STYLE 5-TAB FEATURE SHOWCASE: "The Complete Proof Engine"  */}
        {/* ========================================================================= */}
        <section className="space-y-8 pt-6">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F2FE] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-xs font-mono font-black text-[#1F2C23]">
              <Layers className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>THE COMPLETE VERIFICATION SUITE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1F2C23] tracking-tight">
              One unified platform for every technical signal.
            </h2>
            <p className="text-sm text-[#405446] font-medium leading-relaxed">
              Explore how Proofly pulls, aggregates, and verifies deep telemetry so engineering leads never have to ask for resume references.
            </p>
          </div>

          {/* Two-Column Split Feature Tabs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: 5 Vertical Interactive Selectors */}
            <div className="lg:col-span-5 space-y-3">
              {[
                {
                  id: 'crawler',
                  title: '1-Click GitHub Repository Crawler',
                  desc: 'Auto-fetches README, stars, AST language volume & live commit counts.',
                  icon: GitBranch,
                  tint: 'bg-[#FEF9C3]',
                },
                {
                  id: 'algorithms',
                  title: 'Algorithmic Performance & Streaks',
                  desc: 'Direct sync with LeetCode, Codeforces, and HackerRank solving metrics.',
                  icon: Code2,
                  tint: 'bg-[#DCFCE7]',
                },
                {
                  id: 'fastpass',
                  title: 'Cryptographic Fast-Pass™ Dossier',
                  desc: 'Zero-login access pass with tamper-proof token for engineering leads.',
                  icon: Key,
                  tint: 'bg-[#E0F2FE]',
                },
                {
                  id: 'credentials',
                  title: 'Verified Certificates & Proofs',
                  desc: 'Real URL and issuer API check for AWS, CNCF, Meta, and Coursera.',
                  icon: ShieldCheck,
                  tint: 'bg-[#F3E8FF]',
                },
                {
                  id: 'casestudies',
                  title: 'Technical Case Studies & Postmortems',
                  desc: 'Markdown engineering logs detailing architecture decisions & benchmarks.',
                  icon: FileText,
                  tint: 'bg-[#FFEDD5]',
                },
              ].map((tab) => {
                const IconComponent = tab.icon;
                const isSelected = activePlatformTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActivePlatformTab(tab.id as PlatformTab)}
                    className={`w-full text-left p-4 sm:p-5 rounded-[22px] border-2 border-[#1F2C23] transition-all flex items-start gap-4 ${
                      isSelected
                        ? `${tab.tint} shadow-[5px_5px_0px_#1F2C23] translate-x-1`
                        : 'bg-white shadow-[2px_2px_0px_#1F2C23] hover:shadow-[4px_4px_0px_#1F2C23] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="p-2.5 rounded-xl bg-white border-2 border-[#1F2C23] shadow-[1px_1px_0px_#1F2C23] shrink-0 text-[#1F2C23]">
                      <IconComponent className="w-5 h-5 text-[#1F2C23]" />
                    </div>
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-sm font-black text-[#1F2C23] truncate">
                          {tab.title}
                        </h4>
                        <ChevronRight className={`w-4 h-4 text-[#1F2C23] transition-transform ${isSelected ? 'translate-x-1' : ''}`} />
                      </div>
                      <p className="text-xs text-[#586E5F] font-medium leading-relaxed line-clamp-2">
                        {tab.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Dynamic Live Morphing Card */}
            <div className="lg:col-span-7">
              <div className="rounded-[28px] bg-white border-2 border-[#1F2C23] shadow-[6px_6px_0px_#1F2C23] p-6 sm:p-8 space-y-6 min-h-[460px] flex flex-col justify-between">
                {activePlatformTab === 'crawler' && (
                  <div className="space-y-5 animate-fadeIn">
                    <div className="flex items-center justify-between border-b-2 border-[#1F2C23]/10 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] bg-white">
                          <img src="/images/crawler-bot.jpg" alt="Crawler Mascot" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-serif text-lg font-black text-[#1F2C23]">1-Click GitHub Repository Crawler</h3>
                          <span className="text-xs font-mono font-bold text-[#16A34A] flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> AST Telemetry Active
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-md bg-[#FEF9C3] border border-[#1F2C23] shadow-[1px_1px_0px_#1F2C23]">
                        Auto-Fetched
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#405446] leading-relaxed font-medium">
                      Paste any public repository URL. Proofly's crawler automatically extracts architecture summaries from the README, calculates byte distribution across languages, and records commits in real-time.
                    </p>

                    <div className="p-4 rounded-2xl bg-[#FEF9C3] border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-[#1F2C23]">repo: harmandugri/distributed-kv</span>
                        <span className="bg-[#86EFAC] px-2 py-0.5 rounded border border-[#1F2C23] text-[10px] font-bold">142 Commits</span>
                      </div>
                      <div className="h-3 w-full bg-white rounded-lg border border-[#1F2C23] overflow-hidden flex">
                        <div className="bg-[#FFDE59] h-full w-[65%]" title="Rust 65%" />
                        <div className="bg-[#70D6FF] h-full w-[25%]" title="Go 25%" />
                        <div className="bg-[#86EFAC] h-full w-[10%]" title="Shell 10%" />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[#586E5F]">
                        <span>Rust: 65% · Go: 25% · Shell: 10%</span>
                        <span className="text-[#1F2C23] font-bold">★ 84 Stars</span>
                      </div>
                    </div>
                  </div>
                )}

                {activePlatformTab === 'algorithms' && (
                  <div className="space-y-5 animate-fadeIn">
                    <div className="flex items-center justify-between border-b-2 border-[#1F2C23]/10 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-[#DCFCE7] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]">
                          <Code2 className="w-6 h-6 text-[#1F2C23]" />
                        </div>
                        <div>
                          <h3 className="font-serif text-lg font-black text-[#1F2C23]">Algorithmic Problem Solving Radar</h3>
                          <span className="text-xs font-mono font-bold text-[#16A34A]">Direct LeetCode & Codeforces API</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-md bg-[#DCFCE7] border border-[#1F2C23] shadow-[1px_1px_0px_#1F2C23]">
                        624 Solved
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-4 rounded-xl bg-[#DCFCE7] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-center">
                        <div className="text-[10px] font-mono font-black text-[#586E5F] uppercase">Easy</div>
                        <div className="text-2xl font-serif font-black text-[#1F2C23] mt-1">210</div>
                      </div>
                      <div className="p-4 rounded-xl bg-[#FEF9C3] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-center">
                        <div className="text-[10px] font-mono font-black text-[#586E5F] uppercase">Medium</div>
                        <div className="text-2xl font-serif font-black text-[#1F2C23] mt-1">340</div>
                      </div>
                      <div className="p-4 rounded-xl bg-[#FFEDD5] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-center">
                        <div className="text-[10px] font-mono font-black text-[#586E5F] uppercase">Hard</div>
                        <div className="text-2xl font-serif font-black text-[#1F2C23] mt-1">74</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAF7F2] border-2 border-[#1F2C23] space-y-1 font-mono text-xs">
                      <div className="flex items-center justify-between font-bold">
                        <span>Contest Rating: 1,842 (Top 6%)</span>
                        <span className="text-[#16A34A]">Streak: 48 Days</span>
                      </div>
                      <p className="text-[11px] text-[#586E5F]">
                        Live difficulty metrics allow recruiters to assess genuine problem-solving capabilities without administering tedious take-home tests.
                      </p>
                    </div>
                  </div>
                )}

                {activePlatformTab === 'fastpass' && (
                  <div className="space-y-5 animate-fadeIn">
                    <div className="flex items-center justify-between border-b-2 border-[#1F2C23]/10 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-[#E0F2FE] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]">
                          <Key className="w-6 h-6 text-[#1F2C23]" />
                        </div>
                        <div>
                          <h3 className="font-serif text-lg font-black text-[#1F2C23]">Cryptographic Fast-Pass™ Dossier</h3>
                          <span className="text-xs font-mono font-bold text-[#0284C7]">Instant Zero-Login Recruiter Unlock</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-md bg-[#E0F2FE] border border-[#1F2C23] shadow-[1px_1px_0px_#1F2C23]">
                        Shareable
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#E0F2FE] border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-black text-[#1F2C23] uppercase">Fast-Pass Code:</span>
                        <span className="text-xs font-mono font-black text-[#D97043] bg-white px-2.5 py-1 rounded-md border border-[#1F2C23]">
                          PRF-8A2F9C1B
                        </span>
                      </div>
                      <p className="text-xs text-[#24362A] font-medium leading-relaxed">
                        Recruiters and hiring managers bypass public auth barriers and directly inspect your complete verified technical records with 1-click.
                      </p>
                      <button
                        onClick={handleCopyDemoHash}
                        className="w-full py-2.5 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#1F2C23] font-mono font-black text-xs border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] flex items-center justify-center gap-2 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                      >
                        {copiedHash ? <Check className="w-4 h-4 text-[#16A34A]" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedHash ? 'Fast-Pass Copied to Clipboard!' : 'Copy Demo Fast-Pass Hash'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {activePlatformTab === 'credentials' && (
                  <div className="space-y-5 animate-fadeIn">
                    <div className="flex items-center justify-between border-b-2 border-[#1F2C23]/10 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-[#F3E8FF] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]">
                          <ShieldCheck className="w-6 h-6 text-[#1F2C23]" />
                        </div>
                        <div>
                          <h3 className="font-serif text-lg font-black text-[#1F2C23]">Verified Credential Vault</h3>
                          <span className="text-xs font-mono font-bold text-[#7E22CE]">Official Issuer API Validation</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-md bg-[#F3E8FF] border border-[#1F2C23] shadow-[1px_1px_0px_#1F2C23]">
                        Tamper-Proof
                      </span>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      <div className="p-4 rounded-xl bg-[#F3E8FF] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] flex items-center justify-between">
                        <div>
                          <div className="font-black text-[#1F2C23]">AWS Certified Solutions Architect</div>
                          <div className="text-[10px] text-[#586E5F]">Issuer: Amazon Web Services · ID: AWS-99421</div>
                        </div>
                        <span className="text-[10px] font-black bg-[#86EFAC] px-2 py-0.5 rounded border border-[#1F2C23]">
                          VERIFIED
                        </span>
                      </div>

                      <div className="p-4 rounded-xl bg-[#FEF9C3] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] flex items-center justify-between">
                        <div>
                          <div className="font-black text-[#1F2C23]">Deep Learning Specialization</div>
                          <div className="text-[10px] text-[#586E5F]">Issuer: DeepLearning.AI via Coursera</div>
                        </div>
                        <span className="text-[10px] font-black bg-[#86EFAC] px-2 py-0.5 rounded border border-[#1F2C23]">
                          VERIFIED
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activePlatformTab === 'casestudies' && (
                  <div className="space-y-5 animate-fadeIn">
                    <div className="flex items-center justify-between border-b-2 border-[#1F2C23]/10 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-[#FFEDD5] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]">
                          <FileText className="w-6 h-6 text-[#1F2C23]" />
                        </div>
                        <div>
                          <h3 className="font-serif text-lg font-black text-[#1F2C23]">Technical Case Studies & Postmortems</h3>
                          <span className="text-xs font-mono font-bold text-[#D97043]">Architectural Depth & Writing</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-md bg-[#FFEDD5] border border-[#1F2C23] shadow-[1px_1px_0px_#1F2C23]">
                        Published
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#FFEDD5] border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] space-y-2">
                      <span className="text-[10px] font-mono font-black text-[#D97043] uppercase">#DISTRIBUTED-SYSTEMS</span>
                      <h4 className="font-serif text-base font-black text-[#1F2C23]">
                        Scaling WebSocket Gateway to 50k Concurrent Sessions
                      </h4>
                      <p className="text-xs text-[#24362A] font-medium leading-relaxed">
                        A detailed breakdown of epoll memory bottlenecks, Go goroutine pooling, and horizontal Redis PubSub synchronization benchmarks.
                      </p>
                    </div>
                  </div>
                )}

                {/* Bottom Card Footer Navigation */}
                <div className="pt-4 border-t-2 border-[#1F2C23]/15 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#586E5F] font-bold">
                    Proofly Verification Protocol v2.4
                  </span>
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-black text-[#D97043] hover:underline"
                  >
                    <span>Connect your profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. 3x2 ILLUSTRATED BENTO GRID (TensorTonic Topic Cards + Rich Graphics)  */}
        {/* ========================================================================= */}
        <section className="space-y-8 pt-6">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF9C3] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-xs font-mono font-black text-[#1F2C23]">
              <Sparkles className="w-3.5 h-3.5 text-[#D97043]" />
              <span>THE 6 PILLARS OF EVIDENCE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1F2C23] tracking-tight">
              Engineered to replace subjective claims.
            </h2>
            <p className="text-sm text-[#405446] font-medium leading-relaxed">
              Every card on Proofly connects directly to third-party APIs and cryptographic hashes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Bento Card 1: Automated Git Telemetry */}
            <div className="p-6 rounded-[28px] bg-[#FEF9C3] border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] space-y-4 hover:shadow-[6px_6px_0px_#1F2C23] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-40 rounded-2xl border-2 border-[#1F2C23] overflow-hidden bg-white shadow-[2px_2px_0px_#1F2C23]">
                  <img src="/images/hero-workspace.jpg" alt="Developer Workspace" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-white border border-[#1F2C23]">
                    TELEMETRY
                  </span>
                  <span className="text-xs font-mono font-bold text-[#16A34A]">52-Week Depth</span>
                </div>
                <h3 className="font-serif text-lg font-black text-[#1F2C23]">Automated Git Telemetry</h3>
                <p className="text-xs text-[#24362A] font-medium leading-relaxed">
                  Real commits, byte volume, language ratios, and contribution graphs crawled directly from GitHub.
                </p>
              </div>
              <div className="pt-2 text-xs font-mono font-black text-[#1F2C23] flex items-center gap-1">
                <span>Direct GitHub OAuth Sync</span> &rarr;
              </div>
            </div>

            {/* Bento Card 2: Algorithmic Problem Solving */}
            <div className="p-6 rounded-[28px] bg-[#DCFCE7] border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] space-y-4 hover:shadow-[6px_6px_0px_#1F2C23] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-40 rounded-2xl border-2 border-[#1F2C23] overflow-hidden bg-white shadow-[2px_2px_0px_#1F2C23] p-4 flex flex-col justify-center space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono font-black">
                    <span>LeetCode / Codeforces</span>
                    <span className="text-[#16A34A]">Rating 1,842</span>
                  </div>
                  <div className="space-y-1.5 font-mono text-[10px]">
                    <div className="flex items-center justify-between"><span>Easy: 210</span><span className="text-[#16A34A]">100%</span></div>
                    <div className="flex items-center justify-between"><span>Medium: 340</span><span className="text-[#D97043]">78%</span></div>
                    <div className="flex items-center justify-between"><span>Hard: 74</span><span className="text-[#DC2626]">35%</span></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-white border border-[#1F2C23]">
                    PROBLEM SOLVING
                  </span>
                  <span className="text-xs font-mono font-bold text-[#16A34A]">Live API Sync</span>
                </div>
                <h3 className="font-serif text-lg font-black text-[#1F2C23]">Algorithmic Radar</h3>
                <p className="text-xs text-[#24362A] font-medium leading-relaxed">
                  Difficulty distributions, streaks, and contest ratings verified live from LeetCode, HackerRank, and Codeforces.
                </p>
              </div>
              <div className="pt-2 text-xs font-mono font-black text-[#1F2C23] flex items-center gap-1">
                <span>View Algorithmic Signals</span> &rarr;
              </div>
            </div>

            {/* Bento Card 3: Fast-Pass Recruiter Portal */}
            <div className="p-6 rounded-[28px] bg-[#E0F2FE] border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] space-y-4 hover:shadow-[6px_6px_0px_#1F2C23] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-40 rounded-2xl border-2 border-[#1F2C23] overflow-hidden bg-white shadow-[2px_2px_0px_#1F2C23]">
                  <img src="/images/fastpass-radar.jpg" alt="FastPass Radar" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-white border border-[#1F2C23]">
                    RECRUITER ACCESS
                  </span>
                  <span className="text-xs font-mono font-bold text-[#0284C7]">Zero-Login</span>
                </div>
                <h3 className="font-serif text-lg font-black text-[#1F2C23]">Fast-Pass™ Access Key</h3>
                <p className="text-xs text-[#24362A] font-medium leading-relaxed">
                  Provide your unique 8-character hash to recruiters so they instantly unlock your full code audit without login gates.
                </p>
              </div>
              <div className="pt-2 text-xs font-mono font-black text-[#1F2C23] flex items-center gap-1">
                <span>Learn about Fast-Pass</span> &rarr;
              </div>
            </div>

            {/* Bento Card 4: AI Completeness Assistant */}
            <div className="p-6 rounded-[28px] bg-[#F3E8FF] border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] space-y-4 hover:shadow-[6px_6px_0px_#1F2C23] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-40 rounded-2xl border-2 border-[#1F2C23] overflow-hidden bg-white shadow-[2px_2px_0px_#1F2C23] p-4 flex flex-col justify-center space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#7E22CE]" />
                    <span className="font-mono text-xs font-black">AI Profile Auditor</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#1F2C23] text-[11px] font-mono">
                    "Add 1 distributed systems project with benchmark data to boost your hiring view score to 98%."
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-white border border-[#1F2C23]">
                    AI AUDIT
                  </span>
                  <span className="text-xs font-mono font-bold text-[#7E22CE]">Gemini Engine</span>
                </div>
                <h3 className="font-serif text-lg font-black text-[#1F2C23]">AI Completeness Assistant</h3>
                <p className="text-xs text-[#24362A] font-medium leading-relaxed">
                  Actionable, evidence-grounded recommendations tailored to get your portfolio noticed by high-tier recruiters.
                </p>
              </div>
              <div className="pt-2 text-xs font-mono font-black text-[#1F2C23] flex items-center gap-1">
                <span>View Completeness Roadmap</span> &rarr;
              </div>
            </div>

            {/* Bento Card 5: Collaborative Student Builders */}
            <div className="p-6 rounded-[28px] bg-[#FFEDD5] border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] space-y-4 hover:shadow-[6px_6px_0px_#1F2C23] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-40 rounded-2xl border-2 border-[#1F2C23] overflow-hidden bg-white shadow-[2px_2px_0px_#1F2C23]">
                  <img src="/images/student-builders.jpg" alt="Student Builders" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-white border border-[#1F2C23]">
                    COMMUNITY
                  </span>
                  <span className="text-xs font-mono font-bold text-[#D97043]">Peer Proofs</span>
                </div>
                <h3 className="font-serif text-lg font-black text-[#1F2C23]">Team Project Attribution</h3>
                <p className="text-xs text-[#24362A] font-medium leading-relaxed">
                  Co-author projects with clear git attribution so teammates get proportional recognition for commits and architecture.
                </p>
              </div>
              <div className="pt-2 text-xs font-mono font-black text-[#1F2C23] flex items-center gap-1">
                <span>Explore Community Builds</span> &rarr;
              </div>
            </div>

            {/* Bento Card 6: Cryptographic Credential Vault */}
            <div className="p-6 rounded-[28px] bg-[#FAF7F2] border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] space-y-4 hover:shadow-[6px_6px_0px_#1F2C23] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-40 rounded-2xl border-2 border-[#1F2C23] overflow-hidden bg-white shadow-[2px_2px_0px_#1F2C23] p-4 flex flex-col justify-center space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-[#1F2C23]">SHA-256 Issuer Hash</span>
                    <span className="text-[#16A34A] font-black">VALID</span>
                  </div>
                  <div className="p-2 bg-[#FAF7F2] rounded border border-[#1F2C23] text-[10px] truncate select-all">
                    a8f3b2c9e7d1...99e2f
                  </div>
                  <div className="text-[10px] text-[#586E5F]">Reachable URL & expiry confirmed</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-white border border-[#1F2C23]">
                    ACCREDITATION
                  </span>
                  <span className="text-xs font-mono font-bold text-[#16A34A]">API Verified</span>
                </div>
                <h3 className="font-serif text-lg font-black text-[#1F2C23]">Accreditation Vault</h3>
                <p className="text-xs text-[#24362A] font-medium leading-relaxed">
                  Official certificates from AWS, Coursera, Meta, and universities verified with live endpoints.
                </p>
              </div>
              <div className="pt-2 text-xs font-mono font-black text-[#1F2C23] flex items-center gap-1">
                <span>Add Your Credentials</span> &rarr;
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. INTERACTIVE IN-APP SIMULATOR: "Try the Verification Engine"            */}
        {/* ========================================================================= */}
        <section className="space-y-8 pt-6">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFDE59] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-xs font-mono font-black text-[#1F2C23]">
              <Play className="w-3.5 h-3.5 fill-current text-[#1F2C23]" />
              <span>LIVE INTERACTIVE SIMULATOR</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1F2C23] tracking-tight">
              Try the verification engine in real-time.
            </h2>
            <p className="text-sm text-[#405446] font-medium leading-relaxed">
              Test how Proofly's verification algorithms calculate trust scores and generate verified dossiers.
            </p>
          </div>

          <div className="rounded-[28px] bg-white border-2 border-[#1F2C23] shadow-[6px_6px_0px_#1F2C23] overflow-hidden">
            {/* Top Sub-tabs */}
            <div className="p-3 bg-[#FAF7F2] border-b-2 border-[#1F2C23] flex flex-wrap gap-2">
              {[
                { id: 'github', label: 'GitHub Commit Velocity' },
                { id: 'leetcode', label: 'LeetCode Problem Ratios' },
                { id: 'credly', label: 'Credential Hash Audit' },
                { id: 'fastpass', label: 'Fast-Pass Access Resolver' },
              ].map((subtab) => (
                <button
                  key={subtab.id}
                  onClick={() => setSimulatorTab(subtab.id as SimulatorTab)}
                  className={`px-4 py-1.5 rounded-xl font-mono text-xs font-black border-2 border-[#1F2C23] transition-all ${
                    simulatorTab === subtab.id
                      ? 'bg-[#FFDE59] text-[#1F2C23] shadow-[2px_2px_0px_#1F2C23]'
                      : 'bg-white text-[#586E5F] hover:bg-[#FAF7F2]'
                  }`}
                >
                  {subtab.label}
                </button>
              ))}
            </div>

            {/* Split Simulator Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x-2 divide-[#1F2C23]">
              {/* Left Side: Interactive Sliders & Live Math Formula */}
              <div className="p-6 sm:p-8 space-y-6 bg-[#FAF7F2]">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono font-black">
                    <span className="text-[#1F2C23]">WEEKLY COMMIT VELOCITY</span>
                    <span className="text-[#D97043] bg-white px-2.5 py-0.5 rounded border border-[#1F2C23]">
                      {commitSlider} commits / month
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="150"
                    value={commitSlider}
                    onChange={(e) => setCommitSlider(Number(e.target.value))}
                    className="w-full accent-[#D97043] cursor-pointer"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-white border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] space-y-2 font-mono text-xs">
                  <div className="text-[10px] uppercase font-black text-[#586E5F]">Verification Trust Formula:</div>
                  <div className="p-2.5 rounded-lg bg-[#FEF9C3] text-[#1F2C23] font-black text-center border border-[#1F2C23]">
                    TrustScore = (Commits × 0.45) + (Streak × 0.35) + (Checks × 0.20)
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span>Simulated Integrity Output:</span>
                    <strong className="text-[#16A34A] font-black">
                      {(Math.min(99.9, 85 + commitSlider * 0.1)).toFixed(1)}% CONFIRMED
                    </strong>
                  </div>
                </div>
              </div>

              {/* Right Side: Live Syntax-Highlighted Execution Console */}
              <div className="p-6 sm:p-8 bg-[#1F2C23] text-white font-mono text-xs space-y-4">
                <div className="flex items-center justify-between text-[11px] text-[#86EFAC] pb-2 border-b border-white/10">
                  <span>proofly_audit_engine.ts</span>
                  <span>STATUS: 200 OK</span>
                </div>

                <pre className="text-white/90 leading-relaxed overflow-x-auto text-[11px]">
{`>>> auditRepository({
  repo: "harmandugri/proofly-engine",
  monthlyVelocity: ${commitSlider},
  language: "TypeScript",
  authenticityEntropy: 0.998
})

[OK] AST Syntax Trees Authenticated
[OK] Linear Git Graph: ${Math.round(commitSlider * 1.4)} commits confirmed
[OK] Author Fingerprint: Cryptographically Verified
Integrity Score: ${(Math.min(99.9, 85 + commitSlider * 0.1)).toFixed(1)}%`}
                </pre>

                <div className="p-3 rounded-xl bg-white/10 border border-white/20 text-[#86EFAC] text-[11px] flex items-center justify-between">
                  <span>Fast-Pass Generated: PRF-VERIFIED</span>
                  <span className="text-white font-bold">1-Click Ready</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. SOCIAL PROOF, STATS COUNTERS & COMMUNITY TESTIMONIAL TICKER            */}
        {/* ========================================================================= */}
        <section className="space-y-10 pt-6">
          {/* Metric Stats Banner */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-[24px] bg-[#FEF9C3] border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] text-center space-y-1">
              <div className="font-serif text-3xl sm:text-4xl font-black text-[#1F2C23]">50,000+</div>
              <div className="text-xs font-mono font-black uppercase text-[#586E5F]">Verified Commits</div>
            </div>
            <div className="p-6 rounded-[24px] bg-[#E0F2FE] border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] text-center space-y-1">
              <div className="font-serif text-3xl sm:text-4xl font-black text-[#1F2C23]">99.8%</div>
              <div className="text-xs font-mono font-black uppercase text-[#586E5F]">Accuracy Score</div>
            </div>
            <div className="p-6 rounded-[24px] bg-[#DCFCE7] border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] text-center space-y-1">
              <div className="font-serif text-3xl sm:text-4xl font-black text-[#1F2C23]">4,200+</div>
              <div className="text-xs font-mono font-black uppercase text-[#586E5F]">Fast-Pass Unlocks</div>
            </div>
            <div className="p-6 rounded-[24px] bg-[#F3E8FF] border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] text-center space-y-1">
              <div className="font-serif text-3xl sm:text-4xl font-black text-[#1F2C23]">0%</div>
              <div className="text-xs font-mono font-black uppercase text-[#586E5F]">Resume Buzzwords</div>
            </div>
          </div>

          {/* Testimonial Cards Infinite Marquee */}
          <div className="relative w-full overflow-hidden py-3">
            <div className="animate-marquee flex gap-6">
              {[
                {
                  quote: "Proofly completely replaced our tedious take-home coding rounds. The Fast-Pass card lets us inspect actual GitHub commits and verified problem solving in 30 seconds.",
                  author: "Sarah Lin",
                  role: "Head of Engineering, HyperScale",
                  avatar: "SL",
                  tint: "bg-white",
                },
                {
                  quote: "Students who share their Proofly Fast-Pass skip our initial screening call entirely. We can immediately verify their architectural depth from genuine git history.",
                  author: "Marcus Thorne",
                  role: "Lead Tech Scout, NextGen Capital",
                  avatar: "MT",
                  tint: "bg-[#FEF9C3]",
                },
                {
                  quote: "I landed my distributed systems role because the hiring manager opened my Proofly dossier and reviewed my WebSockets postmortem live on the interview call.",
                  author: "Devon Miller",
                  role: "Systems Engineer, Waterloo Alumni",
                  avatar: "DM",
                  tint: "bg-[#E0F2FE]",
                },
                {
                  quote: "Proofly is essentially LeetCode plus GitHub provenance built into one seamless, verifiable developer card. Every builder should have one.",
                  author: "Elena Rostova",
                  role: "Staff Engineer, CloudMesh",
                  avatar: "ER",
                  tint: "bg-[#DCFCE7]",
                },
                {
                  quote: "Proofly completely replaced our tedious take-home coding rounds. The Fast-Pass card lets us inspect actual GitHub commits and verified problem solving in 30 seconds.",
                  author: "Sarah Lin",
                  role: "Head of Engineering, HyperScale",
                  avatar: "SL",
                  tint: "bg-white",
                },
                {
                  quote: "Students who share their Proofly Fast-Pass skip our initial screening call entirely. We can immediately verify their architectural depth from genuine git history.",
                  author: "Marcus Thorne",
                  role: "Lead Tech Scout, NextGen Capital",
                  avatar: "MT",
                  tint: "bg-[#FEF9C3]",
                },
              ].map((t, idx) => (
                <div
                  key={idx}
                  className={`w-[360px] sm:w-[400px] p-6 rounded-[24px] ${t.tint} border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] shrink-0 space-y-4 hover:scale-[1.02] transition-transform`}
                >
                  <p className="text-xs sm:text-sm text-[#24362A] font-medium leading-relaxed italic">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t-2 border-[#1F2C23]/10">
                    <div className="w-10 h-10 rounded-xl bg-[#1F2C23] text-white flex items-center justify-center font-serif font-black text-sm border border-[#1F2C23]">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-serif font-black text-sm text-[#1F2C23]">{t.author}</div>
                      <div className="text-[11px] font-mono text-[#586E5F] font-bold">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. PRICING PLANS (Free / Pro / Recruiter - TensorTonic Match)              */}
        {/* ========================================================================= */}
        <section className="space-y-8 pt-6">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DCFCE7] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-xs font-mono font-black text-[#1F2C23]">
              <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>TRANSPARENT PLANS FOR BUILDERS & SCOUTS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1F2C23] tracking-tight">
              Start free. Upgrade as you scale.
            </h2>
            <p className="text-sm text-[#405446] font-medium leading-relaxed">
              No hidden fees or locked resumes. Choose the tier that matches your engineering journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tier 1: Builder Free */}
            <div className="p-6 sm:p-8 rounded-[28px] bg-white border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-black text-[#1F2C23]">Student Builder</h3>
                  <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#1F2C23]">
                    FREE
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-4xl font-serif font-black text-[#1F2C23]">$0</div>
                  <div className="text-xs font-mono text-[#586E5F] font-bold">Free forever for verified students</div>
                </div>
                <div className="space-y-2.5 pt-4 border-t-2 border-[#1F2C23]/10 font-mono text-xs">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#16A34A] stroke-[3]" /> <span>Public Verified Portfolio Card</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#16A34A] stroke-[3]" /> <span>GitHub 52-Week Activity Heatmap</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#16A34A] stroke-[3]" /> <span>Up to 5 Auto-Crawled Repositories</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#16A34A] stroke-[3]" /> <span>LeetCode & HackerRank Sync</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#16A34A] stroke-[3]" /> <span>Recruiter Fast-Pass™ Access Code</span></div>
                </div>
              </div>
              <Link
                to="/register"
                className="w-full py-3 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#1F2C23] font-mono font-black text-xs border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] text-center active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
              >
                Start Free &rarr;
              </Link>
            </div>

            {/* Tier 2: Pro Candidate */}
            <div className="p-6 sm:p-8 rounded-[28px] bg-white border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-black text-[#1F2C23]">Pro Candidate</h3>
                  <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-full bg-[#DCFCE7] border border-[#1F2C23]">
                    ACTIVE
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-4xl font-serif font-black text-[#1F2C23]">$12<span className="text-base font-normal font-sans text-[#586E5F]">/mo</span></div>
                  <div className="text-xs font-mono text-[#586E5F] font-bold">Billed annually or $15 monthly</div>
                </div>
                <div className="space-y-2.5 pt-4 border-t-2 border-[#1F2C23]/10 font-mono text-xs">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#16A34A] stroke-[3]" /> <span>Everything in Student Builder</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#16A34A] stroke-[3]" /> <span>Unlimited Project Crawls & Evidence</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#16A34A] stroke-[3]" /> <span>AI Completeness Recommendations</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#16A34A] stroke-[3]" /> <span>Priority Recruiter Radar Ranking</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#16A34A] stroke-[3]" /> <span>Custom Vanity Username URL</span></div>
                </div>
              </div>
              <Link
                to="/register"
                className="w-full py-3 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#1F2C23] font-mono font-black text-xs border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] text-center active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
              >
                Claim Pro Dossier &rarr;
              </Link>
            </div>

            {/* Tier 3: Recruiter & Scout Team (Featured Card with POPULAR badge) */}
            <div className="p-6 sm:p-8 rounded-[28px] bg-[#FEF9C3] border-2 border-[#1F2C23] shadow-[6px_6px_0px_#1F2C23] flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-black text-[#1F2C23]">Recruiter & Scouts</h3>
                  <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-full bg-[#FFDE59] border-2 border-[#1F2C23] shadow-[1px_1px_0px_#1F2C23]">
                    ✨ POPULAR
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-4xl font-serif font-black text-[#1F2C23]">$99<span className="text-base font-normal font-sans text-[#586E5F]">/mo</span></div>
                  <div className="text-xs font-mono text-[#586E5F] font-bold">Per recruiting seat with unlimited unlocks</div>
                </div>
                <div className="space-y-2.5 pt-4 border-t-2 border-[#1F2C23]/10 font-mono text-xs">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#16A34A] stroke-[3]" /> <span>Unlimited Fast-Pass™ Unlocks</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#16A34A] stroke-[3]" /> <span>Explainable AI Job Matcher</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#16A34A] stroke-[3]" /> <span>Private Team Evaluation Notes</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#16A34A] stroke-[3]" /> <span>Custom Candidate Shortlists</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#16A34A] stroke-[3]" /> <span>Verified Direct Outreach Links</span></div>
                </div>
              </div>
              <Link
                to="/register"
                className="w-full py-3 rounded-xl bg-[#D97043] hover:bg-[#C55F34] text-white font-mono font-black text-xs border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] text-center active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
              >
                Access Recruiter Portal &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. FINAL HIGH-ENERGY CALLOUT & FOOTER                                     */}
        {/* ========================================================================= */}
        <section className="rounded-[32px] bg-[#385241] text-white border-2 border-[#1F2C23] shadow-[6px_6px_0px_#1F2C23] p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
          <div className="space-y-3 relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 border border-white/30 text-xs font-mono font-bold text-white">
              <Zap className="w-3.5 h-3.5 text-[#FFDE59]" />
              <span>REPLACE YOUR RESUME TODAY</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-white leading-tight">
              Ready to verify your engineering proof?
            </h2>
            <p className="text-sm sm:text-base text-white/90 font-medium">
              Join over 50,000 engineers and top technical recruiters building the new standard of authenticated talent evaluation.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/register"
              className="px-8 py-3.5 rounded-xl bg-[#FFDE59] hover:bg-[#FACC15] text-[#1F2C23] font-mono font-black text-sm border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
            >
              Get Started Free &rarr;
            </Link>
            <Link
              to="/posts"
              className="px-8 py-3.5 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#1F2C23] font-mono font-black text-sm border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
            >
              Read Community Studies
            </Link>
          </div>
        </section>

        {/* 4-Column Neo-Brutalist Footer */}
        <footer className="pt-8 border-t-2 border-[#1F2C23]/20 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-3 col-span-2 md:col-span-1">
              <div className="flex items-center gap-3">
                <OrganicLeafLogo size={36} />
                <span className="font-serif text-xl font-bold text-[#1F2C23]">Proofly</span>
              </div>
              <p className="text-xs text-[#586E5F] leading-relaxed font-medium">
                The authenticated proof-of-work platform for software engineers, algorithmic problem solvers, and technical scouts.
              </p>
              <div className="text-[11px] font-mono text-[#586E5F]">
                © {new Date().getFullYear()} Proofly, Inc. All rights reserved.
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="font-black text-[#1F2C23] uppercase">Platform</div>
              <div className="space-y-1.5 text-[#586E5F]">
                <div><Link to="/register" className="hover:text-[#1F2C23]">GitHub Crawler</Link></div>
                <div><Link to="/register" className="hover:text-[#1F2C23]">LeetCode Telemetry</Link></div>
                <div><Link to="/register" className="hover:text-[#1F2C23]">Fast-Pass Access</Link></div>
                <div><Link to="/posts" className="hover:text-[#1F2C23]">Case Studies</Link></div>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="font-black text-[#1F2C23] uppercase">Recruiters</div>
              <div className="space-y-1.5 text-[#586E5F]">
                <div><Link to="/login" className="hover:text-[#1F2C23]">Recruiter Portal</Link></div>
                <div><Link to="/login" className="hover:text-[#1F2C23]">Unlock Fast-Pass</Link></div>
                <div><Link to="/login" className="hover:text-[#1F2C23]">AI Job Matcher</Link></div>
                <div><Link to="/login" className="hover:text-[#1F2C23]">Candidate Shortlists</Link></div>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="font-black text-[#1F2C23] uppercase">System Status</div>
              <div className="space-y-2 text-[#586E5F]">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#DCFCE7] text-[#16A34A] border border-[#1F2C23] font-bold text-[10px]">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-ping" />
                  <span>ALL SYSTEMS OPERATIONAL</span>
                </div>
                <div className="text-[11px]">API Version: 2.4.0 (Stable)</div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
