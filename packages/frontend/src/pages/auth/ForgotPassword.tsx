import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Key, AlertCircle, ArrowLeft, CheckCircle2, Sparkles, Mail, ArrowRight } from 'lucide-react';
import { BocSparkle, TactileSticker } from '../../components/common/CreativeArt';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{ message: string; devOtp?: string } | null>(null);

  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await forgotPassword(email);
      setSuccessInfo(res);
    } catch (err: any) {
      setError(err?.message || 'Unable to process password reset. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-3 sm:p-4 relative overflow-hidden w-full max-w-full">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ff451a]/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="w-full max-w-md bg-[#0c1326]/90 border border-white/10 rounded-3xl p-6 sm:p-9 shadow-2xl backdrop-blur-2xl relative min-w-0">
        <div className="text-center mb-6">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#ff451a] via-[#ffb703] to-[#00f59b] p-0.5 shadow-glow-coral mx-auto flex items-center justify-center mb-4">
            <div className="w-full h-full bg-[#0c1326] rounded-[14px] flex items-center justify-center text-[#ff451a]">
              <Key className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <TactileSticker color="coral" text="RECOVERY PROTOCOL" />
            <BocSparkle size={14} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight font-sans">Forgot Password?</h1>
          <p className="text-xs text-slate-400 mt-1">
            Enter your verified email to receive a single-use 6-digit verification code.
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {successInfo ? (
          <div className="space-y-5 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-[#00f59b]/10 border border-[#00f59b]/30 text-xs space-y-2">
              <div className="flex items-center gap-2 text-[#00f59b] font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verification Code Dispatched</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {successInfo.message}
              </p>
            </div>

            {/* Development Mode Helper */}
            {successInfo.devOtp && (
              <div className="p-4 rounded-2xl bg-[#101934] border-2 border-dashed border-[#ff451a]/40 text-center space-y-2">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center justify-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Dev Mode OTP Auto-Detected
                </span>
                <div className="text-2xl font-black font-mono tracking-widest text-[#ff451a]">
                  {successInfo.devOtp}
                </div>
                <p className="text-[10px] text-slate-400 font-mono">
                  SMTP is running in dev simulation mode. This code was also printed to the server terminal.
                </p>
              </div>
            )}

            <button
              onClick={() =>
                navigate(
                  `/reset-password?email=${encodeURIComponent(email)}${
                    successInfo.devOtp ? `&otp=${encodeURIComponent(successInfo.devOtp)}` : ''
                  }`
                )
              }
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff451a] to-[#ff7b00] text-white font-black text-xs uppercase tracking-wider transition-all hover:opacity-90 shadow-glow-coral flex items-center justify-center gap-2"
            >
              <span>Proceed to Enter Code</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setSuccessInfo(null)}
                className="text-xs text-slate-400 hover:text-white font-mono transition-colors"
              >
                Send to a different email
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>Your Email Address</span>
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff451a] to-[#ff7b00] hover:opacity-90 disabled:opacity-50 text-white font-black text-xs uppercase tracking-wider transition-all shadow-glow-coral mt-2"
            >
              {isSubmitting ? 'Dispatching Verification...' : 'Send 6-Digit Code'}
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
