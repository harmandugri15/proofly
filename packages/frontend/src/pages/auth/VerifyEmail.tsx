import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle2, AlertCircle, Mail, ArrowRight, RefreshCw } from 'lucide-react';
import { OrganicLeafLogo } from '../../components/common/CreativeArt';

export const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyEmail, resendVerification, user, isAuthenticated } = useAuth();

  const emailParam = searchParams.get('email') || '';
  const otpParam = searchParams.get('otp') || '';
  const tokenParam = searchParams.get('token') || '';

  const [email, setEmail] = useState(emailParam);
  const [otp, setOtp] = useState(otpParam);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendStatus, setResendStatus] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Auto-redirect if already verified and authenticated
  useEffect(() => {
    if (isAuthenticated && user?.isEmailVerified) {
      navigate(user.role === 'RECRUITER' ? '/recruiter/dashboard' : '/student/dashboard', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  // Handle countdown timer for resend
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Automatically attempt verification if email and (otp or token) are in query params
  useEffect(() => {
    if (emailParam && (otpParam || tokenParam)) {
      handleAutoVerify(emailParam, otpParam, tokenParam);
    }
  }, [emailParam, otpParam, tokenParam]);

  const handleAutoVerify = async (eEmail: string, eOtp: string, eToken: string) => {
    setIsVerifying(true);
    setError(null);
    try {
      const verifiedUser = await verifyEmail({
        email: eEmail,
        otp: eOtp || undefined,
        token: eToken || undefined,
      });
      setIsSuccess(true);
      setTimeout(() => {
        navigate(verifiedUser.role === 'RECRUITER' ? '/recruiter/dashboard' : '/student/dashboard', { replace: true });
      }, 1500);
    } catch (err: any) {
      setError(err?.message || 'Verification failed. Please check the code or request a new one.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !otp) {
      setError('Please provide your email address and the 6-digit confirmation code.');
      return;
    }

    setIsVerifying(true);
    setError(null);
    try {
      const verifiedUser = await verifyEmail({
        email: email.trim(),
        otp: otp.trim(),
      });
      setIsSuccess(true);
      setTimeout(() => {
        navigate(verifiedUser.role === 'RECRUITER' ? '/recruiter/dashboard' : '/student/dashboard', { replace: true });
      }, 1500);
    } catch (err: any) {
      setError(err?.message || 'Invalid or expired confirmation code.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setError('Please provide your email address to resend the confirmation code.');
      return;
    }
    setError(null);
    setResendStatus(null);
    try {
      const result = await resendVerification(email.trim());
      setResendStatus(result.message || 'A new 6-digit code has been dispatched to your email.');
      setResendCooldown(60);
    } catch (err: any) {
      setError(err?.message || 'Failed to resend confirmation code.');
    }
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
            Verify Your Email
          </h2>
          <p className="text-xs sm:text-sm text-[#586E5F]">
            Confirm your email to activate your account and start building verified credentials.
          </p>
        </div>

        {/* Success State */}
        {isSuccess ? (
          <div className="p-6 rounded-3xl bg-[#EAF5EE] border border-[#BDE0C8] text-[#1F2C23] text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#2E7D46] mx-auto animate-bounce" />
            <h3 className="font-serif text-lg font-bold text-[#1B4D2B]">Email Confirmed!</h3>
            <p className="text-xs text-[#385241]">
              Your account is now activated. Launching your workspace...
            </p>
          </div>
        ) : (
          <>
            {/* Feedback & Alerts */}
            {error && (
              <div className="p-3.5 rounded-2xl bg-[#FCE5DB] border border-[#F4CDBC] text-[#853C1E] text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#C55F34]" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            {resendStatus && (
              <div className="p-3.5 rounded-2xl bg-[#EAF5EE] border border-[#BDE0C8] text-[#1B4D2B] text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#2E7D46]" />
                <span className="font-medium">{resendStatus}</span>
              </div>
            )}

            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#2D3E32]">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-[#DDD5C4] rounded-full text-xs text-[#1F2C23] placeholder-[#A3BFAC] focus:outline-none focus:border-[#74947F] shadow-2xs"
                  />
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#758C7D]" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#2D3E32]">
                  6-Digit Confirmation Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="• • • • • •"
                  className="w-full px-4 py-3 bg-white border border-[#DDD5C4] rounded-full text-center text-lg font-mono tracking-[0.4em] text-[#1F2C23] placeholder-[#A3BFAC] focus:outline-none focus:border-[#74947F] shadow-2xs"
                />
              </div>

              <button
                type="submit"
                disabled={isVerifying || otp.length !== 6 || !email}
                className="w-full py-3.5 px-4 rounded-full bg-[#D97043] hover:bg-[#C55F34] disabled:opacity-60 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Launch Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Resend Action */}
            <div className="pt-2 text-center text-xs text-[#586E5F]">
              <span>Didn't receive the code? </span>
              <button
                type="button"
                onClick={handleResend}
                disabled={resendCooldown > 0}
                className="text-[#D97043] font-bold hover:underline disabled:text-[#A3BFAC] disabled:no-underline"
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
              </button>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-[#586E5F] border-t border-[#EBE5D8] pt-4">
          <Link to="/login" className="text-[#385241] font-medium hover:underline">
            ← Return to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
