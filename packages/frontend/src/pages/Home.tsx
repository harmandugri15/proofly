import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ExternalLink,
  Plus,
  Maximize2,
  Heart,
  CheckCircle,
  Shield,
  Coffee,
  Code2,
  Sparkles,
  MapPin,
  Clock,
  Phone,
  Search,
} from 'lucide-react';
import {
  OrganicLeafLogo,
  Stamp100Verified,
  SeedSproutIcon,
  BrewingFlaskIcon,
  CraftsmanBaristaIcon,
  CozySpaceCupIcon,
  DelicateStarOrnament,
} from '../components/common/CreativeArt';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] text-[#1F2C23] selection:bg-[#D97043]/20 selection:text-[#D97043] pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-12 sm:space-y-16">
        
        {/* ========================================================================= */}
        {/* HERO SECTION (Artisanal Sage Container with Cream Organic Cutout)        */}
        {/* ========================================================================= */}
        <section className="bg-[#7D9B86] rounded-[36px] sm:rounded-[44px] p-6 sm:p-10 lg:p-14 relative overflow-hidden shadow-sm">
          {/* Subtle decorative texture */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#142017] leading-[1.12]">
                  Code you trust from the very first commit.
                </h1>
                <p className="text-base sm:text-lg text-[#28382C] max-w-xl leading-relaxed font-sans font-medium">
                  Specialty student engineers, live verified telemetry, and an honest atmosphere in the heart of engineering.
                </p>
              </div>

              {/* Action CTA */}
              <div className="pt-2">
                <Link
                  to="/posts"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#D97043] hover:bg-[#C55F34] text-white font-semibold text-sm transition-all shadow-[0_4px_16px_rgba(217,112,67,0.32)] hover:shadow-[0_6px_22px_rgba(217,112,67,0.44)] hover:-translate-y-0.5"
                >
                  <span>Explore Builders</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              </div>

              {/* Bottom 3 Feature Pills */}
              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#1F2C23]">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2]/40 backdrop-blur-sm border border-[#FAF7F2]/50">
                  <span className="w-2 h-2 rounded-full bg-[#1F2C23]" />
                  <span>Specialty Code</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2]/40 backdrop-blur-sm border border-[#FAF7F2]/50">
                  <Heart className="w-3.5 h-3.5 text-[#D97043] fill-[#D97043]" />
                  <span>Proof over Claims</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2]/40 backdrop-blur-sm border border-[#FAF7F2]/50">
                  <CheckCircle className="w-3.5 h-3.5 text-[#1F2C23]" />
                  <span>100% Real Signals</span>
                </div>
              </div>
            </div>

            {/* Right Visual Montage (Cream Organic Cutout Card) */}
            <div className="lg:col-span-5 relative">
              <div className="bg-[#FAF7F2] rounded-[36px] sm:rounded-[40px] p-6 sm:p-8 shadow-md border border-[#EAE4D7] relative flex flex-col justify-between min-h-[360px] sm:min-h-[420px]">
                {/* Visual Content: Artisanal Builder Elements & Evidence */}
                <div className="space-y-4">
                  {/* Visual Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#EBE5D8]">
                    <div className="flex items-center gap-2.5">
                      <OrganicLeafLogo size={32} />
                      <span className="font-serif text-sm font-bold text-[#1F2C23]">
                        Verified Specimen #108
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E4ECE6] text-[#24362A] font-bold">
                      LIVE
                    </span>
                  </div>

                  {/* Simulated Code Telemetry & Artifact Card */}
                  <div className="bg-[#F4EFE6] rounded-2xl p-4 border border-[#E0D9CD] space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#586E5F]">
                      <span className="font-mono text-[11px] font-semibold text-[#1F2C23]">
                        proofly/core-engine
                      </span>
                      <span className="text-[10px] text-[#74947F]">284 commits</span>
                    </div>
                    {/* Simulated Mini Heatmap */}
                    <div className="grid grid-cols-12 gap-1 pt-1">
                      {Array.from({ length: 36 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-2.5 rounded-sm ${
                            i % 5 === 0
                              ? 'bg-[#4D6D58]'
                              : i % 3 === 0
                              ? 'bg-[#74947F]'
                              : i % 2 === 0
                              ? 'bg-[#A3BFAC]'
                              : 'bg-[#D8D2C4]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Specimen Bottle / Credential Card */}
                  <div className="bg-white rounded-2xl p-4 border border-[#EBE5D8] flex items-center gap-3 shadow-xs">
                    <div className="w-12 h-12 rounded-xl bg-[#F4CDBC]/60 flex items-center justify-center text-[#D97043] shrink-0">
                      <Code2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1F2C23]">
                        Distributed Consensus in Go
                      </div>
                      <div className="text-[11px] text-[#586E5F]">
                        Raft Algorithm • 99.8% Test Coverage
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating 100% Verified Badge */}
                <div className="pt-4 flex justify-end">
                  <Stamp100Verified />
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* 4-COLUMN VALUE HIGHLIGHTS STRIP                                           */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-2">
          {/* Feature 1 */}
          <div className="bg-[#F8F5EE] border border-[#EBE5D8] rounded-[28px] p-6 space-y-3 hover:border-[#86A791] transition-colors">
            <SeedSproutIcon />
            <h3 className="font-serif text-lg font-bold text-[#1F2C23]">
              Selected Credentials
            </h3>
            <p className="text-xs text-[#586E5F] leading-relaxed">
              Curated university credentials and cryptographic badges from verified issuers.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-[#F8F5EE] border border-[#EBE5D8] rounded-[28px] p-6 space-y-3 hover:border-[#86A791] transition-colors">
            <BrewingFlaskIcon />
            <h3 className="font-serif text-lg font-bold text-[#1F2C23]">
              Fresh Telemetry
            </h3>
            <p className="text-xs text-[#586E5F] leading-relaxed">
              Auto-synced GitHub streaks, genuine pull requests, and real commit velocity.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-[#F8F5EE] border border-[#EBE5D8] rounded-[28px] p-6 space-y-3 hover:border-[#86A791] transition-colors">
            <CraftsmanBaristaIcon />
            <h3 className="font-serif text-lg font-bold text-[#1F2C23]">
              Craftsman Builders
            </h3>
            <p className="text-xs text-[#586E5F] leading-relaxed">
              Student engineers who build with deep architectural care and clean documentation.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-[#F8F5EE] border border-[#EBE5D8] rounded-[28px] p-6 space-y-3 hover:border-[#86A791] transition-colors">
            <CozySpaceCupIcon />
            <h3 className="font-serif text-lg font-bold text-[#1F2C23]">
              Quiet Workspace
            </h3>
            <p className="text-xs text-[#586E5F] leading-relaxed">
              Calm, signal-dense recruiter discovery with zero fake claims and zero noise.
            </p>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* POPULAR DISCIPLINES CARD (Sage Green Container with Circular Showcase)    */}
        {/* ========================================================================= */}
        <section className="bg-[#74947F] rounded-[36px] sm:rounded-[44px] p-8 sm:p-12 text-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Description */}
            <div className="lg:col-span-4 space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#142017]">
                Popular Disciplines
              </h2>
              <p className="text-xs sm:text-sm text-[#25362C] leading-relaxed font-medium">
                Classic engineering foundations and specialized modern stacks for high-impact teams.
              </p>
              <div className="pt-2">
                <Link
                  to="/posts"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#FAF7F2] text-[#1F2C23] font-semibold text-xs hover:bg-white transition-all shadow-sm"
                >
                  View All Disciplines
                </Link>
              </div>
            </div>

            {/* Right: 3 Circular Candidate Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Discipline 1 */}
              <div className="flex flex-col items-center text-center space-y-3 bg-[#63836E]/60 rounded-3xl p-5 border border-white/10 hover:bg-[#63836E] transition-all">
                <div className="w-24 h-24 rounded-full bg-[#FAF7F2] p-1.5 shadow-md flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#24362A] font-serif text-lg font-bold">
                    FS
                  </div>
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#142017]">
                    Full-Stack Engineer
                  </h4>
                  <p className="text-[11px] text-[#28382C]">
                    React, TypeScript & Node
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-[#FAF7F2] bg-[#385241]/70 px-3 py-1 rounded-full">
                  98% Proof
                </span>
              </div>

              {/* Discipline 2 */}
              <div className="flex flex-col items-center text-center space-y-3 bg-[#63836E]/60 rounded-3xl p-5 border border-white/10 hover:bg-[#63836E] transition-all">
                <div className="w-24 h-24 rounded-full bg-[#FAF7F2] p-1.5 shadow-md flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full rounded-full bg-[#C7D9CD] flex items-center justify-center text-[#24362A] font-serif text-lg font-bold">
                    SYS
                  </div>
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#142017]">
                    Systems & Cloud
                  </h4>
                  <p className="text-[11px] text-[#28382C]">
                    Go, Rust & Kubernetes
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-[#FAF7F2] bg-[#385241]/70 px-3 py-1 rounded-full">
                  96% Proof
                </span>
              </div>

              {/* Discipline 3 */}
              <div className="flex flex-col items-center text-center space-y-3 bg-[#63836E]/60 rounded-3xl p-5 border border-white/10 hover:bg-[#63836E] transition-all">
                <div className="w-24 h-24 rounded-full bg-[#FAF7F2] p-1.5 shadow-md flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full rounded-full bg-[#F4CDBC] flex items-center justify-center text-[#853C1E] font-serif text-lg font-bold">
                    AI
                  </div>
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#142017]">
                    AI & ML Architect
                  </h4>
                  <p className="text-[11px] text-[#28382C]">
                    PyTorch & LangChain
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-[#FAF7F2] bg-[#385241]/70 px-3 py-1 rounded-full">
                  94% Proof
                </span>
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* RECOMMENDED TO TRY SECTION ("Рекомендуем попробовать" Style)              */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          {/* Section Header with Delicate Star Ornament */}
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-3">
              <DelicateStarOrnament />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1F2C23]">
                Proofly Recommended Builders
              </h2>
              <DelicateStarOrnament />
            </div>
            <p className="text-xs text-[#586E5F]">
              Handcrafted verified profiles ready for interviews
            </p>
          </div>

          {/* 3 Horizontal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#FAF7F2] border border-[#EBE5D8] rounded-[28px] p-5 flex items-center justify-between gap-4 shadow-sm hover:border-[#74947F] transition-all">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-[#E4ECE6] flex items-center justify-center font-serif text-base font-bold text-[#24362A] shrink-0 border border-[#C7D9CD]">
                  AR
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#1F2C23]">
                    Alex Rivera
                  </h4>
                  <p className="text-[11px] text-[#586E5F]">
                    Distributed Systems & Go
                  </p>
                  <span className="text-xs font-mono font-bold text-[#D97043] mt-1 inline-block">
                    240 Verified Signals
                  </span>
                </div>
              </div>
              <Link
                to="/u/alexchen"
                aria-label="View Profile"
                className="w-9 h-9 rounded-full bg-[#4D6D58] hover:bg-[#385241] text-white flex items-center justify-center shrink-0 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-[#FAF7F2] border border-[#EBE5D8] rounded-[28px] p-5 flex items-center justify-between gap-4 shadow-sm hover:border-[#74947F] transition-all">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-[#FCE5DB] flex items-center justify-center font-serif text-base font-bold text-[#853C1E] shrink-0 border border-[#F4CDBC]">
                  PS
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#1F2C23]">
                    Priya Sharma
                  </h4>
                  <p className="text-[11px] text-[#586E5F]">
                    Full-Stack & React Native
                  </p>
                  <span className="text-xs font-mono font-bold text-[#D97043] mt-1 inline-block">
                    280 Verified Signals
                  </span>
                </div>
              </div>
              <Link
                to="/u/mayapatel"
                aria-label="View Profile"
                className="w-9 h-9 rounded-full bg-[#4D6D58] hover:bg-[#385241] text-white flex items-center justify-center shrink-0 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-[#FAF7F2] border border-[#EBE5D8] rounded-[28px] p-5 flex items-center justify-between gap-4 shadow-sm hover:border-[#74947F] transition-all">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-[#EDE8DF] flex items-center justify-center font-serif text-base font-bold text-[#405446] shrink-0 border border-[#DDD5C4]">
                  DC
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#1F2C23]">
                    David Chen
                  </h4>
                  <p className="text-[11px] text-[#586E5F]">
                    ML Infrastructure & CUDA
                  </p>
                  <span className="text-xs font-mono font-bold text-[#D97043] mt-1 inline-block">
                    190 Verified Signals
                  </span>
                </div>
              </div>
              <Link
                to="/posts"
                aria-label="View Profile"
                className="w-9 h-9 rounded-full bg-[#4D6D58] hover:bg-[#385241] text-white flex items-center justify-center shrink-0 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* SPOTLIGHT BANNER ("Зёрна, которыми гордимся" Style)                       */}
        {/* ========================================================================= */}
        <section className="bg-[#E4ECE6] rounded-[36px] sm:rounded-[44px] p-8 sm:p-12 border border-[#C7D9CD] shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-[#1F2C23]">
                  Evidence we are proud of.
                </h2>
                <p className="text-xs sm:text-sm text-[#405446] max-w-xl leading-relaxed">
                  We verify deep code contributions directly from repositories, examine cryptographic certificate hashes, and reveal genuine builder talent without resume inflation.
                </p>
              </div>

              {/* Action Button */}
              <div>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#385241] hover:bg-[#24362A] text-white font-semibold text-xs transition-all shadow-sm"
                >
                  <span>Verify Your Credentials</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* 3 Bullet Micro-Features */}
              <div className="grid grid-cols-3 gap-4 pt-2 text-center sm:text-left">
                <div className="space-y-1">
                  <div className="w-6 h-6 rounded-full bg-[#FAF7F2] flex items-center justify-center mx-auto sm:mx-0 text-[#385241]">
                    ✦
                  </div>
                  <div className="text-[11px] font-bold text-[#1F2C23]">Direct Git Sync</div>
                  <div className="text-[10px] text-[#586E5F]">From GitHub repos</div>
                </div>

                <div className="space-y-1">
                  <div className="w-6 h-6 rounded-full bg-[#FAF7F2] flex items-center justify-center mx-auto sm:mx-0 text-[#385241]">
                    ✦
                  </div>
                  <div className="text-[11px] font-bold text-[#1F2C23]">Tamper-Proof</div>
                  <div className="text-[10px] text-[#586E5F]">SHA-256 verification</div>
                </div>

                <div className="space-y-1">
                  <div className="w-6 h-6 rounded-full bg-[#FAF7F2] flex items-center justify-center mx-auto sm:mx-0 text-[#385241]">
                    ✦
                  </div>
                  <div className="text-[11px] font-bold text-[#1F2C23]">Real Streaks</div>
                  <div className="text-[10px] text-[#586E5F]">Live 365-day telemetry</div>
                </div>
              </div>
            </div>

            {/* Right Collage Preview */}
            <div className="lg:col-span-5 relative">
              <div className="bg-[#FAF7F2] rounded-[32px] p-6 shadow-sm border border-[#C7D9CD] relative">
                {/* Visual Artifact Mockup */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-xs font-bold text-[#1F2C23]">
                      Proofly Specimen Pack
                    </span>
                    <span className="text-[10px] text-[#586E5F] font-mono">
                      BATCH #2026.10
                    </span>
                  </div>

                  {/* Sample Project Card */}
                  <div className="rounded-2xl bg-[#F8F5EE] border border-[#EBE5D8] p-4 space-y-2">
                    <div className="text-xs font-bold text-[#1F2C23]">
                      Raft-Go: High-Throughput Consensus
                    </div>
                    <p className="text-[11px] text-[#586E5F]">
                      Implemented leader election, log replication, and atomic cluster state machine transitions.
                    </p>
                    <div className="flex gap-2 pt-1">
                      <span className="text-[10px] bg-[#E4ECE6] text-[#24362A] px-2 py-0.5 rounded-full font-semibold">
                        Go
                      </span>
                      <span className="text-[10px] bg-[#E4ECE6] text-[#24362A] px-2 py-0.5 rounded-full font-semibold">
                        gRPC
                      </span>
                      <span className="text-[10px] bg-[#E4ECE6] text-[#24362A] px-2 py-0.5 rounded-full font-semibold">
                        Docker
                      </span>
                    </div>
                  </div>
                </div>

                {/* Corner Expand Badge */}
                <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full bg-[#1F2C23] text-white flex items-center justify-center shadow-md">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* FOOTER & NEWSLETTER BAR ("Ждём вас в гости!" Style)                       */}
        {/* ========================================================================= */}
        <footer className="bg-[#FAF7F2] border border-[#EBE5D8] rounded-[36px] sm:rounded-[44px] p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Contact Info */}
            <div className="lg:col-span-4 space-y-3">
              <h3 className="font-serif text-xl font-bold text-[#1F2C23]">
                Welcome to Proofly!
              </h3>
              <div className="space-y-2 text-xs text-[#586E5F]">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#74947F] shrink-0" />
                  <span>San Francisco, CA & Global Remote</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#74947F] shrink-0" />
                  <span>Telemetry Live: 24/7/365</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#74947F] shrink-0" />
                  <span>hs2643686@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Middle: Newsletter / Updates Subscribe Form */}
            <div className="lg:col-span-5 space-y-3">
              <h4 className="font-serif text-sm font-bold text-[#1F2C23]">
                Stay in touch with rising student talent & updates
              </h4>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for subscribing to Proofly Talent Dispatch!');
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-full bg-white border border-[#DDD5C4] text-xs text-[#1F2C23] placeholder-[#A3BFAC] focus:outline-none focus:border-[#74947F]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#D97043] hover:bg-[#C55F34] text-white text-xs font-semibold transition-all shrink-0 shadow-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Right: Studio Aesthetic Badge & Search / Help */}
            <div className="lg:col-span-3 flex items-center justify-end gap-3">
              <div className="text-right hidden sm:block">
                <div className="font-serif text-xs font-bold text-[#1F2C23]">Proofly Studio</div>
                <div className="text-[10px] text-[#758C7D]">Verified Builder Platform</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#E4ECE6] border border-[#C7D9CD] flex items-center justify-center text-[#24362A] shadow-xs">
                <Search className="w-5 h-5 text-[#385241]" />
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};
