import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle, Eye, EyeOff, Mail, Lock, ShieldCheck, Sparkles } from 'lucide-react';
import { GoogleIcon, OrganicLeafLogo, DelicateStarOrnament } from '../../components/common/CreativeArt';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [searchParams] = useSearchParams();
  const { login, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectParam = searchParams.get('redirect');
      if (redirectParam) {
        navigate(redirectParam, { replace: true });
      } else {
        navigate(user.role === 'RECRUITER' ? '/recruiter/dashboard' : '/student/dashboard', { replace: true });
      }
    }
  }, [isAuthenticated, user, searchParams, navigate]);

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
    setUnverifiedEmail(null);
    setIsSubmitting(true);

    try {
      const loggedInUser = await login(email, password, rememberMe);
      const redirectParam = searchParams.get('redirect');
      if (redirectParam) {
        navigate(redirectParam, { replace: true });
      } else {
        navigate(loggedInUser.role === 'RECRUITER' ? '/recruiter/dashboard' : '/student/dashboard', { replace: true });
      }
    } catch (err: any) {
      if (err?.details?.code === 'EMAIL_NOT_VERIFIED' || err?.message?.toLowerCase().includes('verify your email')) {
        setUnverifiedEmail(email);
        setError(err?.message || 'Please verify your email address before logging in. We have sent a 6-digit confirmation code to your inbox.');
      } else {
        setError(err?.message || 'Login failed. Please check your email and password.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = '/api/v1/auth/google';
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 bg-transparent text-[#1F2C23] relative overflow-hidden">
      {/* High-Energy Ambient Mesh Glow Blobs */}
      <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] bg-[#FFDE59]/40 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-20 w-[450px] h-[450px] bg-[#70D6FF]/40 rounded-full blur-[110px] pointer-events-none -z-10" />
      <div className="absolute -top-10 right-1/3 w-[350px] h-[350px] bg-[#D8B4FE]/30 rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="w-full max-w-md bg-white border-2 border-[#1F2C23] rounded-[28px] p-7 sm:p-9 shadow-[6px_6px_0px_#1F2C23] relative space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center pb-1">
            <OrganicLeafLogo size={46} />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black tracking-tight text-[#1F2C23]">
            Welcome Back
          </h2>
          <p className="text-xs sm:text-sm text-[#586E5F] font-medium">
            Sign in to access your verified telemetry and workspace.
          </p>
        </div>

        {/* Google OAuth Button */}
        <div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white hover:bg-[#FAF7F2] border-2 border-[#1F2C23] text-[#1F2C23] font-bold text-xs sm:text-sm transition-all shadow-[3px_3px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          >
            <GoogleIcon size={18} />
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-[2px] bg-[#1F2C23]/20" />
          <span className="text-[11px] font-mono font-bold text-[#1F2C23] uppercase">or with email</span>
          <div className="flex-1 h-[2px] bg-[#1F2C23]/20" />
        </div>

        {/* Unverified Email Alert Banner */}
        {unverifiedEmail ? (
          <div className="p-4 rounded-xl bg-[#FEF3C7] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-[#1F2C23] space-y-2.5 text-xs animate-fadeIn">
            <div className="flex items-center gap-2 font-black">
              <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0" />
              <span>Email Verification Required</span>
            </div>
            <p className="text-[11px] leading-relaxed font-medium">
              Your email address <strong className="text-[#1F2C23]">{unverifiedEmail}</strong> is not verified yet. We dispatched a fresh 6-digit confirmation code to your inbox.
            </p>
            <div className="pt-1">
              <Link
                to={`/verify-email?email=${encodeURIComponent(unverifiedEmail)}`}
                className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#D97043] text-white font-bold text-xs hover:bg-[#C55F34] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
              >
                Enter 6-Digit Code →
              </Link>
            </div>
          </div>
        ) : error && (
          <div className="p-3.5 rounded-xl bg-[#FEE2E2] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-[#991B1B] text-xs flex items-center gap-2 animate-fadeIn font-bold">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#DC2626]" />
            <span>{error}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-black text-[#1F2C23]">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#758C7D] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="builder@university.edu"
                className="w-full pl-11 pr-4 py-3 bg-[#FAF7F2] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] rounded-xl text-xs text-[#1F2C23] placeholder-[#758C7D] focus:outline-none focus:shadow-[3px_3px_0px_#1F2C23] font-medium transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-black text-[#1F2C23]">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-[#D97043] hover:text-[#C55F34] font-bold transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#758C7D] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-11 py-3 bg-[#FAF7F2] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] rounded-xl text-xs text-[#1F2C23] placeholder-[#758C7D] focus:outline-none focus:shadow-[3px_3px_0px_#1F2C23] font-medium transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#758C7D] hover:text-[#1F2C23] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between text-xs pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer select-none text-[#1F2C23] font-medium">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-2 border-[#1F2C23] text-[#385241] focus:ring-0 cursor-pointer"
              />
              <span>Keep me signed in for 30 days</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 rounded-xl bg-[#D97043] hover:bg-[#C55F34] disabled:opacity-60 text-white font-black text-xs sm:text-sm transition-all border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            {isSubmitting ? 'Authenticating Session...' : 'Sign In'}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-xs text-[#586E5F]">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-[#D97043] font-black hover:underline">
            Get Verified
          </Link>
        </div>
      </div>
    </div>
  );
};
