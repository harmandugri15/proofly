import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, AlertCircle, ArrowRight, Zap, Sparkles } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('Password123!');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="w-full max-w-md bg-[#0c0f18]/85 border border-white/10 rounded-3xl p-7 sm:p-9 shadow-2xl backdrop-blur-2xl relative">
        <div className="text-center mb-7">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 p-0.5 shadow-glow-emerald mx-auto flex items-center justify-center mb-4">
            <div className="w-full h-full bg-[#0c0f18] rounded-[14px] flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight font-sans">Welcome Back</h1>
          <p className="text-xs text-slate-400 mt-1">Sign in to your candidate or recruiter portal</p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-xl bg-[#121624] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400 transition-colors font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl bg-[#121624] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400 transition-colors font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:opacity-90 disabled:opacity-50 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-glow-emerald"
          >
            {isSubmitting ? 'Authenticating...' : 'Sign In to Workspace'}
          </button>
        </form>

        {/* Quick Demo Credentials */}
        <div className="mt-7 pt-5 border-t border-white/10">
          <p className="text-[11px] font-mono text-slate-400 font-bold mb-2.5 text-center flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>1-Click Demo Profiles</span>
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleFillDemo('alex.chen@university.edu')}
              className="p-3 rounded-xl bg-[#121624]/90 hover:bg-[#181d2e] border border-emerald-500/20 hover:border-emerald-500/40 text-slate-200 text-left transition-all"
            >
              <span className="font-bold text-emerald-400 text-xs block">Student Builder</span>
              <span className="text-[11px] text-slate-300">Alex Chen</span>
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo('recruiter@vanguard.com')}
              className="p-3 rounded-xl bg-[#121624]/90 hover:bg-[#181d2e] border border-cyan-500/20 hover:border-cyan-500/40 text-slate-200 text-left transition-all"
            >
              <span className="font-bold text-cyan-400 text-xs block">Talent Scout</span>
              <span className="text-[11px] text-slate-300">Elena Rostova</span>
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-400 text-center mt-6">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-emerald-400 hover:text-emerald-300 font-bold ml-1">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};
