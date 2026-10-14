import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, GitBranch, Cpu, Search, CheckCircle, ArrowRight, ExternalLink } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-28 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-8">
            <ShieldCheck className="w-4 h-4" />
            Verified Technical Signals for Modern Hiring
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Stop guessing from resumes. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Verify real engineering evidence.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Proofly unifies student project repositories, commit cadences, official certification checks, and algorithmic benchmarks into one shareable, tamper-evident portfolio.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-emerald-500/10"
            >
              Build Your Verified Profile
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all"
            >
              Sign In to Demo Workspace
            </Link>
          </div>

          {/* Quick Demo Preview Links */}
          <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
            <span className="text-slate-500">Explore Seeded Live Profiles:</span>
            <Link
              to="/u/alexchen"
              className="px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-emerald-400 flex items-center gap-1.5 transition-colors"
            >
              Alex Chen (Full-Stack & AWS) <ExternalLink className="w-3 h-3" />
            </Link>
            <Link
              to="/u/mayapatel"
              className="px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-emerald-400 flex items-center gap-1.5 transition-colors"
            >
              Maya Patel (Rust Systems & LSM) <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Value Props */}
      <section className="py-20 border-b border-slate-800 bg-slate-900/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5">
                <GitBranch className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Automated Code Provenance</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Connect GitHub to verify commit cadence, code distribution by language, and authentic authorship without vanity metrics.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="w-12 h-12 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Honest Credential Checks</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Distinguish directly between self-reported URLs, reachable issuer endpoints, and validated credentials from Credly, AWS, and Coursera.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Grounded AI Research Assistant</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Recruiters can query candidate depth and receive transparent answers with clickable links to verified records and commit history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recruiter Workflow Spotlight */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Evaluate candidates by proof of work, not keyword stuffing.
              </h2>
              <p className="mt-4 text-slate-400 text-sm leading-relaxed">
                Screening technical talent shouldn't involve hunting through 6 different browser tabs. Proofly provides structured side-by-side candidate comparison, explainable job skill matching, and private team notes.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  Multi-attribute search across verified skills and graduation years
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  Side-by-side comparison on transparent, job-relevant criteria
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  Zero demographic bias in algorithmic matching
                </div>
              </div>
              <div className="mt-8">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  Log in as Recruiter (recruiter@vanguard.com) <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="w-full md:w-96 p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl">
              <div className="text-xs font-mono text-slate-400 mb-4 flex items-center justify-between">
                <span>AI Candidate Matcher</span>
                <span className="text-emerald-400 font-bold">92% Match</span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/50">
                  <span className="text-slate-300 font-semibold block mb-1">TypeScript & React</span>
                  <p className="text-slate-400">Verified via 2 projects (SyncFlow Canvas) + 84 stars repo.</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/50">
                  <span className="text-slate-300 font-semibold block mb-1">PostgreSQL</span>
                  <p className="text-slate-400">Verified in PgPulse Analyzer with custom index optimization.</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/50">
                  <span className="text-slate-300 font-semibold block mb-1">AWS Cloud</span>
                  <p className="text-slate-400">Verified AWS Solutions Architect Associate (Credly ID: 839201).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
