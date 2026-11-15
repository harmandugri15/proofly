import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Code2,
  Sparkles,
  Search,
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
} from 'lucide-react';
import {
  OrganicLeafLogo,
  Stamp100Verified,
  DelicateStarOrnament,
} from '../components/common/CreativeArt';

type FeatureTab = 'fastpass' | 'crawler' | 'radar' | 'ai';

export const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FeatureTab>('fastpass');
  const [copiedDemoHash, setCopiedDemoHash] = useState(false);

  const handleCopyDemoHash = () => {
    navigator.clipboard.writeText('PRF-8A2F9C1B');
    setCopiedDemoHash(true);
    setTimeout(() => setCopiedDemoHash(false), 2000);
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] text-[#1F2C23] selection:bg-[#D97043]/20 selection:text-[#D97043] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-16 sm:space-y-24">
        
        {/* ========================================================================= */}
        {/* 1. HERO SECTION (Brevo-Style: Bold Typo + High-Energy Product Canvas)    */}
        {/* ========================================================================= */}
        <section className="space-y-10 sm:space-y-12">
          {/* Hero Header Content */}
          <div className="max-w-4xl mx-auto text-center space-y-6 pt-4">
            {/* Announcement Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E4ECE6] border border-[#C7D9CD] text-[#24362A] text-xs font-semibold shadow-2xs hover:border-[#74947F] transition-colors">
              <span className="flex h-2 w-2 rounded-full bg-[#385241] animate-pulse" />
              <span className="tracking-wide uppercase font-mono text-[11px]">The New Technical Standard</span>
              <span className="text-[#586E5F] hidden sm:inline">•</span>
              <span className="text-[#385241] hidden sm:inline">Replacing Fluff with Proof</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#385241]" />
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1F2C23] leading-[1.08]">
              The all-in-one platform to{' '}
              <span className="text-[#385241] italic font-normal">verify</span>, showcase, and scout{' '}
              <span className="relative inline-block text-[#D97043]">
                real code.
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#D97043]/40" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 15 Q 50 0 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-xl text-[#586E5F] max-w-2xl mx-auto leading-relaxed font-sans font-normal">
              Say goodbye to 2-page PDF resumes stuffed with buzzwords. Proofly turns genuine GitHub commits, algorithmic problem solving, and verified credentials into a high-trust technical dossier with 1-click Fast-Pass™ access.
            </p>

            {/* Primary Action Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#D97043] hover:bg-[#C55F34] text-white font-semibold text-sm transition-all shadow-[0_4px_16px_rgba(217,112,67,0.32)] hover:shadow-[0_6px_22px_rgba(217,112,67,0.44)] hover:-translate-y-0.5"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
              <Link
                to="/posts"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white hover:bg-[#F8F5EE] text-[#1F2C23] font-semibold text-sm border border-[#DDD5C4] transition-all shadow-xs hover:-translate-y-0.5"
              >
                <span>Explore Verified Community</span>
                <ExternalLink className="w-4 h-4 text-[#758C7D]" />
              </Link>
            </div>

            {/* Trust Bullet Chips */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-medium text-[#586E5F]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#385241]" />
                <span>100% Free for Student Builders</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#385241]" />
                <span>Zero Login Wall with Fast-Pass™</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#385241]" />
                <span>SHA-256 Commit Grounding</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Brevo-Style Hero Product Canvas (Interactive Multi-Layer Mockup)         */}
          {/* ========================================================================= */}
          <div className="relative rounded-[36px] sm:rounded-[44px] bg-[#EAE4D7]/60 border border-[#DDD5C4] p-3 sm:p-6 lg:p-8 shadow-xl overflow-hidden">
            {/* Background Texture & Glow */}
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-[#74947F]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-[#D97043]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Master Application Window */}
            <div className="relative rounded-[28px] sm:rounded-[36px] bg-[#FAF7F2] border border-[#DDD5C4] shadow-md overflow-hidden">
              
              {/* Window Top Bar */}
              <div className="px-5 py-3.5 bg-white border-b border-[#EBE5D8] flex flex-wrap items-center justify-between gap-3 text-xs">
                {/* Traffic lights + simulated address */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#E57373]" />
                    <span className="w-3 h-3 rounded-full bg-[#FFB74D]" />
                    <span className="w-3 h-3 rounded-full bg-[#81C784]" />
                  </div>
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#DDD5C4] font-mono text-[11px] text-[#586E5F]">
                    <Lock className="w-3 h-3 text-[#385241]" />
                    <span>proofly.app/u/alexrivera?pass=PRF-8A2F9C1B</span>
                  </div>
                </div>

                {/* System Status Pill */}
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#E4ECE6] text-[#24362A] font-mono text-[10px] font-bold border border-[#C7D9CD]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#385241] animate-ping" />
                    LIVE TELEMETRY ACTIVE
                  </span>
                </div>
              </div>

              {/* Window Content: Live Verified Specimen Composite */}
              <div className="p-5 sm:p-8 lg:p-10 space-y-8">
                {/* Top Profile Summary Strip */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#EBE5D8]">
                  <div className="flex items-center gap-4 sm:gap-5">
                    {/* Story Ring Avatar */}
                    <div className="relative">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E4ECE6] border-2 border-[#385241] flex items-center justify-center font-serif text-xl sm:text-2xl font-bold text-[#24362A] shadow-xs">
                        AR
                      </div>
                      <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#385241] text-white border-2 border-white shadow-xs" title="Verified Builder">
                        <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1F2C23]">Alex Rivera</h2>
                        <span className="text-xs font-mono font-medium text-[#586E5F] bg-[#F4EFE6] px-2.5 py-0.5 rounded-full border border-[#DDD5C4]">
                          @alexrivera
                        </span>
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#E4ECE6] text-[#24362A] border border-[#C7D9CD]">
                          Systems & Cloud Eng
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#405446] font-medium">
                        Building distributed consensus engines and verifiable cloud primitives.
                      </p>
                    </div>
                  </div>

                  {/* Fast-Pass Hash Box */}
                  <div className="flex items-center gap-3 bg-[#E4ECE6]/80 p-3 rounded-2xl border border-[#C7D9CD] shrink-0">
                    <div>
                      <div className="text-[10px] font-mono uppercase font-bold text-[#586E5F]">Access Hash</div>
                      <div className="font-mono text-sm font-bold text-[#1F2C23]">PRF-8A2F9C1B</div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyDemoHash}
                      className="px-3 py-1.5 rounded-full bg-[#385241] text-white text-xs font-semibold hover:bg-[#24362A] transition-colors flex items-center gap-1 shadow-2xs"
                    >
                      {copiedDemoHash ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedDemoHash ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Split Composite: 365-Day Commit Heatmap & Verified Project */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left: Genuine GitHub Commit Cadence (7 Cols) */}
                  <div className="lg:col-span-7 rounded-3xl bg-white p-5 sm:p-6 border border-[#DDD5C4] space-y-4 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Github className="w-4 h-4 text-[#1F2C23]" />
                        <span className="font-serif text-sm font-bold text-[#1F2C23]">365-Day Commit Velocity</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#385241]">
                        482 verified commits
                      </span>
                    </div>

                    {/* Simulated Authentic Heatmap Grid */}
                    <div className="space-y-1.5 pt-1 overflow-x-auto pb-1">
                      <div className="grid grid-flow-col grid-rows-7 gap-1 w-max min-w-full">
                        {Array.from({ length: 52 * 7 }).map((_, i) => {
                          const level =
                            i % 17 === 0 ? 4 :
                            i % 7 === 0 ? 3 :
                            i % 3 === 0 ? 2 :
                            i % 2 === 0 ? 1 : 0;
                          return (
                            <div
                              key={i}
                              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-xs transition-colors ${
                                level === 4 ? 'bg-[#24362A]' :
                                level === 3 ? 'bg-[#385241]' :
                                level === 2 ? 'bg-[#74947F]' :
                                level === 1 ? 'bg-[#A3BFAC]' :
                                'bg-[#EDE8DF]'
                              }`}
                              title={`Telemetry Day ${i + 1}`}
                            />
                          );
                        })}
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[#758C7D] font-mono pt-1">
                        <span>142-day active streak</span>
                        <div className="flex items-center gap-1 text-[10px]">
                          <span>Less</span>
                          <span className="w-2 h-2 bg-[#EDE8DF] rounded-xs" />
                          <span className="w-2 h-2 bg-[#A3BFAC] rounded-xs" />
                          <span className="w-2 h-2 bg-[#74947F] rounded-xs" />
                          <span className="w-2 h-2 bg-[#385241] rounded-xs" />
                          <span className="w-2 h-2 bg-[#24362A] rounded-xs" />
                          <span>More</span>
                        </div>
                      </div>
                    </div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['Go (82%)', 'Rust (12%)', 'Docker (6%)', 'Raft Consensus', 'Kubernetes'].map((sk) => (
                        <span key={sk} className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#24362A] border border-[#DDD5C4]">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Verified Project Evidence Card (5 Cols) */}
                  <div className="lg:col-span-5 rounded-3xl bg-white p-5 sm:p-6 border border-[#DDD5C4] flex flex-col justify-between space-y-4 shadow-xs">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E4ECE6] text-[#24362A] text-[10px] font-bold border border-[#C7D9CD]">
                          <ShieldCheck className="w-3 h-3 text-[#385241]" /> CODE_VERIFIED
                        </span>
                        <span className="text-[11px] font-mono text-[#758C7D]">SHA: a8f3b9c</span>
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-serif text-base font-bold text-[#1F2C23]">
                          Raft-Go: Distributed Consensus Engine
                        </h3>
                        <p className="text-xs text-[#586E5F] leading-relaxed">
                          Complete Raft implementation with leader election, atomic log replication, and zero data-loss failover.
                        </p>
                      </div>

                      {/* Evidence Stats Strip */}
                      <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                        <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EBE5D8]">
                          <div className="text-[10px] text-[#758C7D] font-mono uppercase">Test Coverage</div>
                          <div className="font-mono font-bold text-[#385241]">99.4% Passed</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EBE5D8]">
                          <div className="text-[10px] text-[#758C7D] font-mono uppercase">Repo Commits</div>
                          <div className="font-mono font-bold text-[#1F2C23]">184 Commits</div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#EBE5D8] flex items-center justify-between text-xs font-semibold text-[#D97043]">
                      <span>Inspect Commit Signatures</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Floating Brevo-Style Badges Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-white border border-[#DDD5C4] flex items-center gap-3 shadow-2xs">
                    <div className="w-8 h-8 rounded-full bg-[#E4ECE6] flex items-center justify-center text-[#385241] shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div className="text-xs">
                      <div className="font-bold text-[#1F2C23]">AWS Certified Developer</div>
                      <div className="text-[10px] text-[#758C7D]">Verified via Credly API</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-[#DDD5C4] flex items-center gap-3 shadow-2xs">
                    <div className="w-8 h-8 rounded-full bg-[#FCE5DB] flex items-center justify-center text-[#D97043] shrink-0">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div className="text-xs">
                      <div className="font-bold text-[#1F2C23]">LeetCode Top 3.2%</div>
                      <div className="text-[10px] text-[#758C7D]">340+ Algorithmic Solves</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-[#DDD5C4] flex items-center gap-3 shadow-2xs">
                    <div className="w-8 h-8 rounded-full bg-[#E4ECE6] flex items-center justify-center text-[#385241] shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="text-xs">
                      <div className="font-bold text-[#1F2C23]">Gemini AI Assistant</div>
                      <div className="text-[10px] text-[#758C7D]">Cites Evidence Directly</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. TRUSTED BY / SOCIAL PROOF TICKER                                       */}
        {/* ========================================================================= */}
        <section className="text-center space-y-4 pt-2">
          <p className="text-xs uppercase font-mono tracking-widest text-[#758C7D]">
            Engineering talent trained at world-class institutions • Scouted by high-velocity teams
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2">
            {[
              'MIT CSAIL',
              'Stanford Eng',
              'UC Berkeley EECS',
              'Carnegie Mellon',
              'Chitkara University',
              'Stripe Tech',
              'Linear',
              'Cloudflare',
              'Vercel',
            ].map((name) => (
              <span
                key={name}
                className="px-4 py-2 rounded-full bg-white border border-[#DDD5C4] text-xs font-semibold text-[#405446] shadow-2xs hover:border-[#74947F] transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. BREVO-STYLE "ALL-IN-ONE PLATFORM" INTERACTIVE TABBED SHOWCASE          */}
        {/* ========================================================================= */}
        <section className="space-y-10">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-mono uppercase font-bold text-[#D97043] tracking-wider">
              Complete Evidence Infrastructure
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1F2C23] tracking-tight">
              One platform. Four layers of verifiable signal.
            </h2>
            <p className="text-xs sm:text-sm text-[#586E5F] leading-relaxed">
              Explore how Proofly transforms raw engineering labor into frictionless hiring decisions for both candidates and recruiters.
            </p>
          </div>

          {/* Brevo-Style Tab Navigation Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto p-1.5 rounded-full bg-white border border-[#DDD5C4] shadow-xs">
            <button
              onClick={() => setActiveTab('fastpass')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'fastpass'
                  ? 'bg-[#385241] text-white shadow-2xs'
                  : 'text-[#586E5F] hover:text-[#1F2C23] hover:bg-[#FAF7F2]'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span>Fast-Pass™ Hash</span>
            </button>

            <button
              onClick={() => setActiveTab('crawler')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'crawler'
                  ? 'bg-[#385241] text-white shadow-2xs'
                  : 'text-[#586E5F] hover:text-[#1F2C23] hover:bg-[#FAF7F2]'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Evidence Engine</span>
            </button>

            <button
              onClick={() => setActiveTab('radar')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'radar'
                  ? 'bg-[#385241] text-white shadow-2xs'
                  : 'text-[#586E5F] hover:text-[#1F2C23] hover:bg-[#FAF7F2]'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Scout Radar</span>
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'ai'
                  ? 'bg-[#385241] text-white shadow-2xs'
                  : 'text-[#586E5F] hover:text-[#1F2C23] hover:bg-[#FAF7F2]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gemini AI Grounding</span>
            </button>
          </div>

          {/* Dynamic Interactive Tab Card (Brevo Feature Card) */}
          <div className="rounded-[36px] sm:rounded-[44px] bg-white border border-[#DDD5C4] p-6 sm:p-10 lg:p-12 shadow-md">
            {activeTab === 'fastpass' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-6 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCE5DB] text-[#853C1E] text-xs font-bold border border-[#F4CDBC]">
                    <Key className="w-3.5 h-3.5 text-[#D97043]" />
                    <span>ZERO LOGIN WALLS</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#1F2C23] leading-snug">
                    Share your unique Access Hash on your resume.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#586E5F] leading-relaxed">
                    Hiring managers don't have time to create new accounts just to evaluate your projects. Every Proofly candidate receives a cryptographic Access Hash (like <code className="bg-[#FAF7F2] px-1.5 py-0.5 rounded font-mono font-bold text-[#1F2C23] border border-[#DDD5C4]">PRF-981D2F8E</code>). Recruiters paste it and inspect your verified dossier in seconds.
                  </p>
                  <ul className="space-y-2.5 text-xs text-[#405446]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#385241]" />
                      <span>Direct 1-click dossier unlocking in recruiter portal</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#385241]" />
                      <span>Full permission gating ensures your private info stays protected</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#385241]" />
                      <span>Compatible with paper resumes, LinkedIn profiles, and emails</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      to="/register"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#385241] hover:bg-[#24362A] text-white text-xs font-semibold transition-all shadow-sm"
                    >
                      <span>Claim Your Fast-Pass™ Hash</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-6 rounded-3xl bg-[#FAF7F2] border border-[#DDD5C4] p-6 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-[#EBE5D8]">
                    <span className="font-serif text-xs font-bold text-[#1F2C23]">Public Card Access Hash</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E4ECE6] text-[#24362A] font-bold">ACTIVE</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-[#DDD5C4] space-y-3">
                    <div className="text-[11px] text-[#586E5F]">Copy this code directly into your PDF resume header:</div>
                    <div className="flex items-center justify-between bg-[#FAF7F2] px-4 py-2.5 rounded-xl border border-[#DDD5C4]">
                      <span className="font-mono text-base font-bold text-[#1F2C23]">PRF-981D2F8E</span>
                      <span className="text-xs text-[#385241] font-semibold">1-Click Fast-Pass</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#E4ECE6] border border-[#C7D9CD] text-xs text-[#24362A] space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#385241]" /> Foolproof Recruiter Permission Guard
                    </div>
                    <p className="text-[11px] text-[#405446]">
                      Only recruiters who have received your hash can view your complete engineering dossier.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'crawler' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-6 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E4ECE6] text-[#24362A] text-xs font-bold border border-[#C7D9CD]">
                    <Terminal className="w-3.5 h-3.5 text-[#385241]" />
                    <span>AUTONOMOUS CRAWLER V3</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#1F2C23] leading-snug">
                    Real code inspection. Never self-reported checkboxes.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#586E5F] leading-relaxed">
                    Our autonomous repository engine connects directly to GitHub. It calculates authentic commit density, scans test coverage ratios, parses language percentages, and verifies credentials from official issuers like Credly and AWS.
                  </p>
                  <ul className="space-y-2.5 text-xs text-[#405446]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#385241]" />
                      <span>Automated 365-day contribution heatmap calculation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#385241]" />
                      <span>LeetCode & HackerRank acceptance rate verification</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#385241]" />
                      <span>Tamper-proof Credly badge authentication</span>
                    </li>
                  </ul>
                </div>

                <div className="lg:col-span-6 rounded-3xl bg-[#1F2C23] text-white p-6 space-y-4 shadow-sm font-mono text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[11px] text-[#A3BFAC]">
                    <span>PROOF ENGINE CRAWLER // SHA-256</span>
                    <span className="text-emerald-400">● CRAWLER_ONLINE</span>
                  </div>
                  <div className="space-y-2 text-[#DDD5C4]">
                    <div>&gt; target: github.com/user/raft-engine</div>
                    <div>&gt; analyzing 184 commits across 8 branches...</div>
                    <div className="text-emerald-400">&gt; verified test suite: 42/42 tests passing (99.4%)</div>
                    <div className="text-emerald-400">&gt; language distribution: Go (84%), gRPC (11%), Docker (5%)</div>
                    <div className="text-amber-300">&gt; cryptographic signature: verified via Git commit hash</div>
                    <div className="pt-2 text-white font-bold">&gt;&gt; PROOF SCORE COMPUTED: 98 / 100 [MAX_SIGNAL]</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'radar' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-6 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E4ECE6] text-[#24362A] text-xs font-bold border border-[#C7D9CD]">
                    <Search className="w-3.5 h-3.5 text-[#385241]" />
                    <span>SCOUT RADAR DIRECTORY</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#1F2C23] leading-snug">
                    Compare student engineers side-by-side on real craft.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#586E5F] leading-relaxed">
                    Recruiters can filter candidates by specific verified languages, compare up to 4 candidates side-by-side, add internal hiring team notes, and manage interview shortlists without spamming unverified candidates.
                  </p>
                  <ul className="space-y-2.5 text-xs text-[#405446]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#385241]" />
                      <span>Multi-candidate side-by-side comparison matrix</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#385241]" />
                      <span>Strict permission gating: only see candidates who unlocked access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#385241]" />
                      <span>Job posting spec matching with skill weight calculations</span>
                    </li>
                  </ul>
                </div>

                <div className="lg:col-span-6 rounded-3xl bg-[#FAF7F2] border border-[#DDD5C4] p-6 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between pb-2 border-b border-[#EBE5D8] text-xs">
                    <span className="font-serif font-bold text-[#1F2C23]">Comparison Matrix (Sample)</span>
                    <span className="text-[11px] text-[#385241] font-semibold">2 Selected</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-2xl bg-white border border-[#DDD5C4] space-y-1.5">
                      <div className="font-bold text-[#1F2C23]">Alex R.</div>
                      <div className="text-[10px] text-[#586E5F]">Systems & Cloud</div>
                      <div className="font-mono text-xs font-bold text-[#385241]">98% Proof</div>
                      <div className="text-[10px] text-[#758C7D]">482 commits • Go & Rust</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white border border-[#DDD5C4] space-y-1.5">
                      <div className="font-bold text-[#1F2C23]">Maya P.</div>
                      <div className="text-[10px] text-[#586E5F]">Full-Stack & React</div>
                      <div className="font-mono text-xs font-bold text-[#385241]">96% Proof</div>
                      <div className="text-[10px] text-[#758C7D]">390 commits • TS & Python</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ai' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-6 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCE5DB] text-[#853C1E] text-xs font-bold border border-[#F4CDBC]">
                    <Sparkles className="w-3.5 h-3.5 text-[#D97043]" />
                    <span>GOOGLE GEMINI POWERED</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#1F2C23] leading-snug">
                    AI research assistant with 100% cited evidence.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#586E5F] leading-relaxed">
                    Ask natural questions about any unlocked candidate: <em>"Has this engineer built production distributed consensus?"</em> or <em>"What AWS credentials do they hold?"</em> Gemini scans their verified repositories and cites the exact project and commit evidence.
                  </p>
                  <ul className="space-y-2.5 text-xs text-[#405446]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#385241]" />
                      <span>Zero hallucination: restricted strictly to candidate-verified proof</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#385241]" />
                      <span>Explainable skill match scoring (75% required / 25% preferred)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#385241]" />
                      <span>Student profile completeness coaching checklist</span>
                    </li>
                  </ul>
                </div>

                <div className="lg:col-span-6 rounded-3xl bg-white border border-[#DDD5C4] p-6 space-y-3 shadow-sm text-xs">
                  <div className="flex items-center gap-2 text-[#385241] font-bold">
                    <Sparkles className="w-4 h-4 text-[#D97043]" /> Recruiter Intelligence Query
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#DDD5C4] font-medium text-[#1F2C23]">
                    "Has Alex built any high-concurrency systems in Go?"
                  </div>
                  <div className="p-4 rounded-xl bg-[#E4ECE6] border border-[#C7D9CD] text-[#24362A] space-y-2">
                    <div className="font-bold flex items-center justify-between">
                      <span>Gemini Synthesis (Grounded):</span>
                      <span className="text-[10px] font-mono text-[#385241]">Confidence: 94%</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      "Yes. In project <strong>Raft-Go Consensus</strong> (verified SHA a8f3b9c), Alex implemented distributed leader election in Go with 99.4% test coverage and 184 commits."
                    </p>
                    <div className="text-[10px] font-mono text-[#586E5F] pt-1">
                      [1] Project: Raft-Go Consensus Engine (Go, gRPC)
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. "WHY PROOFLY WINS" — VISUAL COMPARISON MATRIX (Brevo-Style)            */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <div className="max-w-3xl mx-auto text-center space-y-2">
            <span className="text-xs font-mono uppercase font-bold text-[#385241] tracking-wider">
              The Evolution of Technical Evaluation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F2C23]">
              Traditional PDF Resumes vs. Proofly Verified Cards
            </h2>
            <p className="text-xs sm:text-sm text-[#586E5F]">
              Why leading engineering teams are abandoning static resume screens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* The Old Way: Resume PDFs */}
            <div className="rounded-[32px] bg-white border border-red-200/80 p-6 sm:p-8 space-y-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-red-100">
                <span className="font-serif text-base font-bold text-red-900">Traditional Resume PDFs</span>
                <span className="text-[11px] font-mono font-bold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                  THE BROKEN PAST
                </span>
              </div>
              <ul className="space-y-3 text-xs text-[#586E5F]">
                <li className="flex items-start gap-3">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Unverifiable bullet points and self-proclaimed "expert" keyword lists</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Easily inflated by AI chatbots to trick applicant tracking systems (ATS)</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Requires 4 to 5 interview stages just to catch candidates who cannot code</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Cluttered attachments lost in recruiter inbox threads</span>
                </li>
              </ul>
            </div>

            {/* The Proofly Way: Verified Cards */}
            <div className="rounded-[32px] bg-[#E4ECE6]/60 border border-[#385241] p-6 sm:p-8 space-y-5 shadow-md relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-[#C7D9CD]">
                <span className="font-serif text-base font-bold text-[#1F2C23]">Proofly Verified Cards</span>
                <span className="text-[11px] font-mono font-bold text-[#24362A] bg-[#FAF7F2] px-2.5 py-0.5 rounded-full border border-[#C7D9CD]">
                  THE VERIFIED STANDARD
                </span>
              </div>
              <ul className="space-y-3 text-xs text-[#24362A] font-medium">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#385241] shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>Real commit cadence, pull request reviews, and 365-day git streaks</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#385241] shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>Cryptographically verified certifications from Credly and AWS APIs</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#385241] shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>1-click Fast-Pass™ Access Hash (zero login wall for hiring managers)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#385241] shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>Grounded AI recruiter research that cites real repository proof lines</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. 3-STEP USER JOURNEY ("HOW PROOFLY WORKS")                              */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <span className="text-xs font-mono uppercase font-bold text-[#D97043] tracking-wider">
              Three Simple Steps
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F2C23]">
              From code editor to interview in minutes.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="p-7 rounded-[32px] bg-white border border-[#DDD5C4] space-y-4 shadow-xs hover:border-[#74947F] transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#E4ECE6] text-[#24362A] flex items-center justify-center font-mono font-bold text-sm">
                01
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1F2C23]">
                Connect Your Stack
              </h3>
              <p className="text-xs text-[#586E5F] leading-relaxed">
                Link your GitHub profile, LeetCode handle, and Credly certifications. Proofly's autonomous crawler auto-syncs your projects in 60 seconds.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-7 rounded-[32px] bg-white border border-[#DDD5C4] space-y-4 shadow-xs hover:border-[#74947F] transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#FCE5DB] text-[#853C1E] flex items-center justify-center font-mono font-bold text-sm">
                02
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1F2C23]">
                Get Your Fast-Pass™ Hash
              </h3>
              <p className="text-xs text-[#586E5F] leading-relaxed">
                Proofly computes your Proof Score and issues a clean, copyable Access Hash (e.g. <code className="bg-[#FAF7F2] px-1 rounded font-mono font-bold text-[#1F2C23]">PRF-XXXXXXXX</code>) ready for resumes and LinkedIn.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-7 rounded-[32px] bg-white border border-[#DDD5C4] space-y-4 shadow-xs hover:border-[#74947F] transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#E4ECE6] text-[#24362A] flex items-center justify-center font-mono font-bold text-sm">
                03
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1F2C23]">
                Land High-Signal Roles
              </h3>
              <p className="text-xs text-[#586E5F] leading-relaxed">
                Hiring managers unlock your card with zero login friction, evaluate your authentic commits, and fast-track you directly to final-round interviews.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. BIG IMPACT METRICS GRID (Brevo-Style Bold Numbers)                     */}
        {/* ========================================================================= */}
        <section className="rounded-[36px] bg-[#E4ECE6] border border-[#C7D9CD] p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div className="space-y-1">
              <div className="font-serif text-3xl sm:text-5xl font-bold text-[#1F2C23]">365</div>
              <div className="text-xs font-semibold text-[#385241]">Days Git Telemetry</div>
              <div className="text-[11px] text-[#586E5F]">Live commit cadence</div>
            </div>

            <div className="space-y-1">
              <div className="font-serif text-3xl sm:text-5xl font-bold text-[#1F2C23]">100%</div>
              <div className="text-xs font-semibold text-[#385241]">Grounded Proof</div>
              <div className="text-[11px] text-[#586E5F]">SHA-256 repo hashes</div>
            </div>

            <div className="space-y-1">
              <div className="font-serif text-3xl sm:text-5xl font-bold text-[#1F2C23]">0%</div>
              <div className="text-xs font-semibold text-[#385241]">Resume Fluff</div>
              <div className="text-[11px] text-[#586E5F]">Verified signals only</div>
            </div>

            <div className="space-y-1">
              <div className="font-serif text-3xl sm:text-5xl font-bold text-[#D97043]">3.8x</div>
              <div className="text-xs font-semibold text-[#853C1E]">Faster Screening</div>
              <div className="text-[11px] text-[#586E5F]">Direct Fast-Pass access</div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. CURATED TESTIMONIALS & PROOF STORIES                                   */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase font-bold text-[#385241] tracking-wider">
              From Builders & Hiring Teams
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2C23]">
              What engineers and recruiters say about Proofly
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Student Testimonial */}
            <div className="p-7 rounded-[32px] bg-white border border-[#DDD5C4] space-y-4 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <Quote className="w-6 h-6 text-[#74947F]" />
                <p className="text-xs sm:text-sm text-[#405446] leading-relaxed italic">
                  "Recruiters bypassed the generic algorithmic phone screen because my Raft consensus project had 99.4% test coverage and 184 inspectable commits verified on Proofly. It completely changed my job search."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-[#EBE5D8]">
                <div className="w-10 h-10 rounded-full bg-[#E4ECE6] flex items-center justify-center font-bold text-xs text-[#24362A]">
                  AR
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1F2C23]">Alex Rivera</div>
                  <div className="text-[11px] text-[#758C7D]">CS Senior @ UC Berkeley • Hired as Cloud Engineer</div>
                </div>
              </div>
            </div>

            {/* Recruiter Testimonial */}
            <div className="p-7 rounded-[32px] bg-white border border-[#DDD5C4] space-y-4 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <Quote className="w-6 h-6 text-[#D97043]" />
                <p className="text-xs sm:text-sm text-[#405446] leading-relaxed italic">
                  "Instead of wasting weeks reviewing 300 keyword-stuffed resumes, we unlocked 10 verified Fast-Pass cards on Proofly. We hired our top two distributed systems interns in less than seven days."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-[#EBE5D8]">
                <div className="w-10 h-10 rounded-full bg-[#FCE5DB] flex items-center justify-center font-bold text-xs text-[#853C1E]">
                  SL
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1F2C23]">Sarah Lin</div>
                  <div className="text-[11px] text-[#758C7D]">Head of Technical Talent @ Series B Infrastructure Startup</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. HIGH-IMPACT FINAL CTA BANNER (Brevo-Style Conversion)                 */}
        {/* ========================================================================= */}
        <section className="rounded-[36px] sm:rounded-[44px] bg-[#385241] text-white p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-[#74947F]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 bg-[#D97043]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#E8865D]" />
              <span>JOIN 10,000+ VERIFIED STUDENT BUILDERS</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Ready to replace your resume with verifiable engineering proof?
            </h2>

            <p className="text-xs sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
              Create your account in under 2 minutes. Connect your GitHub repositories, claim your Fast-Pass™ Access Hash, and let your craft speak for itself.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#D97043] hover:bg-[#C55F34] text-white font-semibold text-xs sm:text-sm transition-all shadow-md hover:-translate-y-0.5"
              >
                <span>Create Student Account Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/25 transition-all hover:-translate-y-0.5 backdrop-blur-sm"
              >
                <span>Hire Verified Talent</span>
                <Users className="w-4 h-4" />
              </Link>
            </div>

            <p className="text-[11px] text-white/60 font-mono pt-2">
              No credit card required • Cryptographically grounded • Free forever for students
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. REFINED EDITORIAL FOOTER                                              */}
        {/* ========================================================================= */}
        <footer className="pt-8 border-t border-[#EBE5D8] text-xs text-[#586E5F] space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <OrganicLeafLogo size={32} />
              <div className="flex flex-col">
                <span className="font-serif text-base font-bold text-[#1F2C23]">Proofly</span>
                <span className="text-[10px] text-[#758C7D]">Verified Technical Builder Identity</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#405446]">
              <Link to="/posts" className="hover:text-[#1F2C23] transition-colors">Community Feed</Link>
              <Link to="/login" className="hover:text-[#1F2C23] transition-colors">Candidate Sign In</Link>
              <Link to="/register" className="hover:text-[#1F2C23] transition-colors">Recruiter Access</Link>
              <a href="mailto:hs2643686@gmail.com" className="hover:text-[#1F2C23] transition-colors">Contact Support</a>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E4ECE6] text-[#24362A] text-[10px] font-mono font-bold border border-[#C7D9CD]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#385241]" />
              <span>ALL VERIFICATION SYSTEMS OPERATIONAL</span>
            </div>
          </div>

          <div className="text-center sm:text-left text-[11px] text-[#758C7D] pt-2">
            © {new Date().getFullYear()} Proofly Inc. Built for authentic software craftsmanship. Zero resume padding.
          </div>
        </footer>

      </div>
    </div>
  );
};
