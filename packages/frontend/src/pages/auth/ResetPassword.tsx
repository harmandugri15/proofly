import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import { PasswordStrengthMeter } from '../../components/common/PasswordStrengthMeter';
import { BocSparkle, TactileSticker } from '../../components/common/CreativeArt';

export const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get('email');
    const otpParam = searchParams.get('otp');
    if (emailParam) setEmail(emailParam);
    if (otpParam) setOtp(otpParam);
  }, [searchParams]);

  const isPasswordValid =
    newPassword.length >= 8 &&
    /[A-Z]/.test(newPassword) &&
    /[a-z]/.test(newPassword) &&
    /[0-9]/.test(newPassword) &&
    /[^A-Za-z0-9]/.test(newPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (otp.trim().length !== 6) {
      setError('Please provide the full 6-digit verification code.');
      return;
    }

    if (!isPasswordValid) {
      setError('Your new password does not meet the strong password requirements.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please ensure both fields are identical.');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = searchParams.get('token') || undefined;
      await resetPassword({
        email: email.trim(),
        otp: otp.trim(),
        token,
        newPassword,
      });
      setIsSuccess(true);
    } catch (err: any) {
      setError(err?.message || 'Password reset failed. Code may have expired.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-3 sm:p-4 relative overflow-hidden w-full max-w-full">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00f59b]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="w-full max-w-md bg-[#0c1326]/90 border border-white/10 rounded-3xl p-6 sm:p-9 shadow-2xl backdrop-blur-2xl relative min-w-0">
        <div className="text-center mb-6">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#ff451a] via-[#ffb703] to-[#00f59b] p-0.5 shadow-glow-coral mx-auto flex items-center justify-center mb-4">
            <div className="w-full h-full bg-[#0c1326] rounded-[14px] flex items-center justify-center text-[#00f59b]">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <TactileSticker color="lime" text="VERIFICATION & RESET" />
            <BocSparkle size={14} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight font-sans">Set New Password</h1>
          <p className="text-xs text-slate-400 mt-1">
            Verify your 6-digit code and create a production-grade password.
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {isSuccess ? (
          <div className="text-center space-y-5 animate-fadeIn py-4">
            <div className="w-16 h-16 rounded-full bg-[#00f59b]/20 text-[#00f59b] mx-auto flex items-center justify-center border-2 border-[#00f59b]/50 shadow-glow-lime">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-lg font-black text-white font-sans">Password Successfully Reset!</h2>
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                Your credentials have been securely updated and all previous sessions revoked. You can now log in with your new password.
              </p>
            </div>

            <button
              onClick={() => navigate('/login')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00f59b] to-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all hover:scale-105 shadow-glow-lime"
            >
              Sign In to Workspace
            </button>
          </div>
        ) : (
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
                className="w-full px-4 py-2.5 rounded-xl bg-[#101934] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 transition-colors font-mono"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
                  6-Digit Verification Code (OTP)
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-mono text-[#ff451a] hover:underline"
                >
                  Resend Code
                </Link>
              </div>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                required
                placeholder="123456"
                className="w-full px-4 py-2.5 rounded-xl bg-[#101934] border border-white/10 text-white placeholder-slate-500 text-base font-black tracking-widest text-center focus:outline-none focus:border-[#ff451a] transition-colors font-mono select-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                New Strong Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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

              <PasswordStrengthMeter password={newPassword} />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#101934] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00f59b] transition-colors font-mono pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-[11px] text-rose-400 font-mono mt-1">Passwords do not match</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !isPasswordValid || newPassword !== confirmPassword}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff451a] to-[#ff7b00] hover:opacity-90 disabled:opacity-50 text-white font-black text-xs uppercase tracking-wider transition-all shadow-glow-coral mt-2"
            >
              {isSubmitting ? 'Verifying & Updating...' : 'Set New Password'}
            </button>
          </form>
        )}

        <div className="text-center mt-6 pt-5 border-t border-white/10">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
