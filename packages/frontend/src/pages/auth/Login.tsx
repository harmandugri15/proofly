import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, AlertCircle, Eye, EyeOff, Sparkles, Mail, Lock } from 'lucide-react';
import { GoogleIcon, BocSparkle, TactileSticker } from '../../components/common/CreativeArt';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      if (errorParam.includes('not configured')) {
        setError('Google OAuth is not configured with client credentials yet.');
      } else {
        setError(decodeURIComponent(errorParam));
      }
    }
  }, [searchParams]);

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

  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth initiation route
    window.location.href = '/api/v1/auth/google';
  };

  const handleFillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('Password123!');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-3 sm:p-4 relative overflow-hidden w-full max-w-full">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ff451a]/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="w-full max-w-md bg-[#0c1326]/90 border border-white/10 rounded-3xl p-6 sm:p-9 shadow-2xl backdrop-blur-2xl relative min-w-0">
        <div className="text-center mb-6">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#ff451a] via-[#ffb703] to-[#00f59b] p-0.5 shadow-glow-coral mx-auto flex items-center justify-center mb-4">
            <div className="w-full h-full bg-[#0c1326] rounded-[14px] flex items-center justify-center text-[#ff451a]">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <TactileSticker color="coral" text="AUTHENTICATED ACCESS" />
            <BocSparkle size={14} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight font-sans">Welcome Back</h1>
          <p className="text-xs text-slate-400 mt-1">Sign in to your candidate or recruiter portal</p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span className="break-words">{error}</span>
          </div>
        )}

        {/* 1. Google OAuth 2.0 Sign In Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center justify-center gap-2.5 transition-transform hover:scale-[1.01] shadow-md border border-slate-200"
        >
          <GoogleIcon size={18} />
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-mono">
            <span className="bg-[#0c1326] px-3 text-slate-500 font-bold">Or with email & password</span>
          </div>
        </div>

        {/* Standard Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-xl bg-[#101934] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#ff451a] transition-colors font-mono"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Password</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-[11px] font-mono font-bold text-[#ff451a] hover:text-[#ff7b00] hover:underline transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-[#101934] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#ff451a] transition-colors font-mono pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff451a] to-[#ff7b00] hover:opacity-90 disabled:opacity-50 text-white font-black text-xs uppercase tracking-wider transition-all shadow-glow-coral mt-2"
          >
            {isSubmitting ? 'Authenticating...' : 'Sign In to Workspace'}
          </button>
        </form>

        {/* Quick Demo Credentials */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <p className="text-[11px] font-mono text-slate-400 font-bold mb-2.5 text-center flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>1-Click Verified Demo Profiles</span>
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleFillDemo('alex.chen@university.edu')}
              className="p-3 rounded-2xl bg-[#101934] hover:bg-[#141d3b] border border-[#00f59b]/30 text-slate-200 text-left transition-all group"
            >
              <span className="font-bold text-[#00f59b] text-xs block group-hover:underline">Student Builder</span>
              <span className="text-[11px] text-slate-300">Alex Chen</span>
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo('recruiter@vanguard.com')}
              className="p-3 rounded-2xl bg-[#101934] hover:bg-[#141d3b] border border-cyan-400/30 text-slate-200 text-left transition-all group"
            >
              <span className="font-bold text-cyan-400 text-xs block group-hover:underline">Talent Scout</span>
              <span className="text-[11px] text-slate-300">Elena Rostova</span>
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-400 text-center mt-6">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-[#00f59b] hover:text-emerald-300 font-bold ml-1">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};
