import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, AlertCircle, Eye, EyeOff, User, Briefcase, Mail, Lock } from 'lucide-react';
import { GoogleIcon, BocSparkle, TactileSticker } from '../../components/common/CreativeArt';
import { PasswordStrengthMeter } from '../../components/common/PasswordStrengthMeter';

export const Register: React.FC = () => {
  const [role, setRole] = useState<'STUDENT' | 'RECRUITER'>('STUDENT');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [orgName, setOrgName] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const isPasswordValid =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isPasswordValid) {
      setError('Please provide a strong password meeting all complexity criteria.');
      return;
    }

    setIsSubmitting(true);

    try {
      await register({
        role,
        name,
        email,
        password,
        organizationName: role === 'RECRUITER' ? orgName : undefined,
        title: role === 'RECRUITER' ? title : undefined,
      });
      navigate(role === 'STUDENT' ? '/student/dashboard' : '/recruiter/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Registration failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = `/api/v1/auth/google?role=${role}`;
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-3 sm:p-4 relative overflow-hidden w-full max-w-full">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ff451a]/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#00f59b]/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="w-full max-w-md bg-[#0c1326]/90 border border-white/10 rounded-3xl p-6 sm:p-9 shadow-2xl backdrop-blur-2xl relative min-w-0">
        <div className="text-center mb-6">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#ff451a] via-[#ffb703] to-[#00f59b] p-0.5 shadow-glow-coral mx-auto flex items-center justify-center mb-4">
            <div className="w-full h-full bg-[#0c1326] rounded-[14px] flex items-center justify-center text-[#ff451a]">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <TactileSticker color="lime" text="JOIN THE NETWORK" />
            <BocSparkle size={14} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight font-sans">Create Your Handle</h1>
          <p className="text-xs text-slate-400 mt-1">Proof-verified technical identities for builders & scouts</p>
        </div>

        {/* Role Selection Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#101934] rounded-2xl border border-white/10 mb-5">
          <button
            type="button"
            onClick={() => setRole('STUDENT')}
            className={`py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              role === 'STUDENT'
                ? 'bg-gradient-to-r from-[#00f59b] to-emerald-400 text-slate-950 font-black shadow-glow-lime'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Student Builder</span>
          </button>
          <button
            type="button"
            onClick={() => setRole('RECRUITER')}
            className={`py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              role === 'RECRUITER'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black shadow-glow-cyan'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Talent Scout</span>
          </button>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span className="break-words">{error}</span>
          </div>
        )}

        {/* 1. Google OAuth 2.0 Sign Up Button */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center justify-center gap-2.5 transition-transform hover:scale-[1.01] shadow-md border border-slate-200"
        >
          <GoogleIcon size={18} />
          <span>Sign up with Google as {role === 'STUDENT' ? 'Builder' : 'Scout'}</span>
        </button>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-mono">
            <span className="bg-[#0c1326] px-3 text-slate-500 font-bold">Or register with email</span>
          </div>
        </div>

        {/* Standard Email & Password Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Full Legal Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. Alex Chen"
              className="w-full px-4 py-2.5 rounded-xl bg-[#101934] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00f59b] transition-colors"
            />
          </div>

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
              placeholder="you@university.edu"
              className="w-full px-4 py-2.5 rounded-xl bg-[#101934] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00f59b] transition-colors font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Strong Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-[#101934] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00f59b] transition-colors font-mono pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <PasswordStrengthMeter password={password} />
          </div>

          {role === 'RECRUITER' && (
            <>
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Organization / Company Name
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  required
                  placeholder="e.g. Stripe, Vanguard Tech"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#101934] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Your Job Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="e.g. Lead Technical Recruiter"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#101934] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !isPasswordValid}
            className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all mt-2 ${
              role === 'STUDENT'
                ? 'bg-gradient-to-r from-[#ff451a] to-[#ff7b00] text-white shadow-glow-coral hover:opacity-90 disabled:opacity-50'
                : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-glow-cyan hover:opacity-90 disabled:opacity-50'
            }`}
          >
            {isSubmitting ? 'Creating profile...' : 'Launch Verified Profile'}
          </button>
        </form>

        <p className="text-xs text-slate-400 text-center mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-[#00f59b] hover:text-emerald-300 font-bold ml-1">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
