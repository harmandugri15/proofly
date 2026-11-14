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
      setError(err?.message || 'Login failed. Please check your email and password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = '/api/v1/auth/google';
  };

  const handleFillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('Password123!');
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 bg-[#FAF7F2] text-[#1F2C23]">
      <div className="w-full max-w-md bg-[#FAF7F2] border border-[#EBE5D8] rounded-[36px] p-7 sm:p-9 shadow-sm relative space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center pb-1">
            <OrganicLeafLogo size={46} />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1F2C23]">
            Welcome Back
          </h2>
          <p className="text-xs sm:text-sm text-[#586E5F]">
            Sign in to access your verified telemetry and workspace.
          </p>
        </div>

        {/* Google OAuth Button */}
        <div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-full bg-white hover:bg-[#F8F5EE] border border-[#DDD5C4] text-[#1F2C23] font-semibold text-xs sm:text-sm transition-all shadow-xs hover:border-sage-400"
          >
            <GoogleIcon size={18} />
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-[1px] bg-[#EBE5D8]" />
          <span className="text-[11px] font-mono text-[#758C7D] uppercase">or with email</span>
          <div className="flex-1 h-[1px] bg-[#EBE5D8]" />
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-[#FCE5DB] border border-[#F4CDBC] text-[#853C1E] text-xs flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#C55F34]" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#2D3E32]">
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
                className="w-full pl-11 pr-4 py-3 bg-white border border-[#DDD5C4] rounded-full text-xs text-[#1F2C23] placeholder-[#A3BFAC] focus:outline-none focus:border-[#74947F] shadow-2xs font-sans transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-[#2D3E32]">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-[#D97043] hover:text-[#C55F34] font-medium transition-colors"
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
                className="w-full pl-11 pr-11 py-3 bg-white border border-[#DDD5C4] rounded-full text-xs text-[#1F2C23] placeholder-[#A3BFAC] focus:outline-none focus:border-[#74947F] shadow-2xs transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#758C7D] hover:text-[#24362A] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between text-xs pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer select-none text-[#586E5F]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-[#74947F] focus:ring-0 border-[#DDD5C4] cursor-pointer"
              />
              <span>Keep me signed in for 30 days</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 rounded-full bg-[#D97043] hover:bg-[#C55F34] disabled:opacity-60 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm hover:scale-[1.01]"
          >
            {isSubmitting ? 'Authenticating Session...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Fast Fill */}
        <div className="pt-2 border-t border-[#EBE5D8] text-center space-y-2">
          <span className="text-[11px] font-mono text-[#758C7D]">
            Quick Demo Autofill:
          </span>
          <div className="flex justify-center gap-2">
            <button
              type="button"
              onClick={() => handleFillDemo('alex.chen@university.edu')}
              className="px-3.5 py-1.5 rounded-full bg-[#E4ECE6] hover:bg-[#C7D9CD] text-[#24362A] text-[11px] font-mono font-medium border border-[#C7D9CD] transition-colors flex items-center gap-1.5"
            >
              <span>Alex Chen (Student)</span>
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo('recruiter@vanguard.com')}
              className="px-3.5 py-1.5 rounded-full bg-[#E4ECE6] hover:bg-[#C7D9CD] text-[#24362A] text-[11px] font-mono font-medium border border-[#C7D9CD] transition-colors flex items-center gap-1.5"
            >
              <span>Elena Rostova (Recruiter)</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-[#586E5F]">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-[#D97043] font-bold hover:underline">
            Get Verified
          </Link>
        </div>
      </div>
    </div>
  );
};
