import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  AlertCircle,
  Eye,
  EyeOff,
  User,
  Briefcase,
  Mail,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { GoogleIcon, OrganicLeafLogo } from '../../components/common/CreativeArt';
import { PasswordStrengthMeter } from '../../components/common/PasswordStrengthMeter';

export const Register: React.FC = () => {
  const [step, setStep] = useState<'REGISTER' | 'VERIFY_OTP'>('REGISTER');
  const [role, setRole] = useState<'STUDENT' | 'RECRUITER'>('STUDENT');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [orgName, setOrgName] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Verification step state
  const [otp, setOtp] = useState('');
  const [resendStatus, setResendStatus] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  const { register, verifyEmail, resendVerification, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user?.isEmailVerified) {
      navigate(user.role === 'RECRUITER' ? '/recruiter/dashboard' : '/student/dashboard', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const isPasswordValid =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isPasswordValid) {
      setError('Please provide a strong password meeting all complexity criteria.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await register({
        role,
        name,
        email,
        password,
        organizationName: role === 'RECRUITER' ? orgName : undefined,
        title: role === 'RECRUITER' ? title : undefined,
      });

      if (res.requiresEmailVerification) {
        setStep('VERIFY_OTP');
        setResendCooldown(60);
      } else {
        navigate(role === 'STUDENT' ? '/student/dashboard' : '/recruiter/dashboard');
      }
    } catch (err: any) {
      setError(err?.message || 'Registration failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (otp.trim().length !== 6) {
      setError('Please enter the 6-digit confirmation code.');
      return;
    }

    setIsSubmitting(true);

    try {
      const verifiedUser = await verifyEmail({
        email: email.trim(),
        otp: otp.trim(),
      });
      navigate(verifiedUser.role === 'RECRUITER' ? '/recruiter/dashboard' : '/student/dashboard', { replace: true });
    } catch (err: any) {
      setError(err?.message || 'Invalid or expired confirmation code.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    setError(null);
    setResendStatus(null);
    try {
      const res = await resendVerification(email.trim());
      setResendStatus(res.message || 'A fresh 6-digit code has been sent to your email.');
      setResendCooldown(60);
    } catch (err: any) {
      setError(err?.message || 'Failed to resend confirmation code.');
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = `/api/v1/auth/google?role=${role}`;
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 bg-transparent text-[#1F2C23] relative overflow-hidden">
      {/* High-Energy Ambient Mesh Glow Blobs */}
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-[#FFDE59]/40 rounded-full blur-[110px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 -left-20 w-[500px] h-[500px] bg-[#70D6FF]/40 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute -top-10 left-1/3 w-[380px] h-[380px] bg-[#86EFAC]/35 rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="w-full max-w-lg bg-white border-2 border-[#1F2C23] rounded-[28px] p-7 sm:p-9 shadow-[6px_6px_0px_#1F2C23] relative space-y-6">
        {step === 'REGISTER' ? (
          <>
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="flex justify-center pb-1">
                <OrganicLeafLogo size={46} />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-black tracking-tight text-[#1F2C23]">
                Create Your Proofly Account
              </h2>
              <p className="text-xs sm:text-sm text-[#586E5F] font-medium">
                Join the verified platform for real student builder evidence.
              </p>
            </div>

            {/* Role Selector Pill */}
            <div className="grid grid-cols-2 p-1.5 bg-[#FAF7F2] border-2 border-[#1F2C23] rounded-xl shadow-[2px_2px_0px_#1F2C23]">
              <button
                type="button"
                onClick={() => setRole('STUDENT')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  role === 'STUDENT'
                    ? 'bg-[#385241] text-white shadow-[2px_2px_0px_#1F2C23] border border-[#1F2C23]'
                    : 'text-[#405446] hover:text-[#1F2C23]'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Student Builder</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('RECRUITER')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  role === 'RECRUITER'
                    ? 'bg-[#385241] text-white shadow-[2px_2px_0px_#1F2C23] border border-[#1F2C23]'
                    : 'text-[#405446] hover:text-[#1F2C23]'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Recruiter / Founder</span>
              </button>
            </div>

            {/* Google Signup Button */}
            <div>
              <button
                type="button"
                onClick={handleGoogleSignup}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white hover:bg-[#FAF7F2] border-2 border-[#1F2C23] text-[#1F2C23] font-bold text-xs sm:text-sm transition-all shadow-[3px_3px_0px_#1F2C23] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              >
                <GoogleIcon size={18} />
                <span>Sign Up with Google ({role === 'STUDENT' ? 'Student' : 'Recruiter'})</span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-[2px] bg-[#1F2C23]/20" />
              <span className="text-[11px] font-mono font-bold text-[#1F2C23] uppercase">or with email</span>
              <div className="flex-1 h-[2px] bg-[#1F2C23]/20" />
            </div>

            {/* Error Alert */}
            {error && (
              <div className="p-3.5 rounded-xl bg-[#FEE2E2] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-[#991B1B] text-xs flex items-center gap-2 font-bold">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#DC2626]" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-[#1F2C23]">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 bg-[#FAF7F2] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] rounded-xl text-xs text-[#1F2C23] placeholder-[#758C7D] focus:outline-none focus:shadow-[3px_3px_0px_#1F2C23] font-medium transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-black text-[#1F2C23]">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === 'STUDENT' ? 'student@university.edu' : 'recruiter@company.com'}
                  className="w-full px-4 py-3 bg-[#FAF7F2] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] rounded-xl text-xs text-[#1F2C23] placeholder-[#758C7D] focus:outline-none focus:shadow-[3px_3px_0px_#1F2C23] font-medium transition-all"
                />
              </div>

              {role === 'RECRUITER' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-black text-[#1F2C23]">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      required
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="Company or Studio Name"
                      className="w-full px-4 py-3 bg-[#FAF7F2] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] rounded-xl text-xs text-[#1F2C23] placeholder-[#758C7D] focus:outline-none focus:shadow-[3px_3px_0px_#1F2C23] font-medium transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-black text-[#1F2C23]">
                      Your Job Title
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Technical Talent Lead / CTO"
                      className="w-full px-4 py-3 bg-[#FAF7F2] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] rounded-xl text-xs text-[#1F2C23] placeholder-[#758C7D] focus:outline-none focus:shadow-[3px_3px_0px_#1F2C23] font-medium transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-xs font-black text-[#1F2C23]">
                  Strong Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Must include uppercase, number, symbol"
                    className="w-full pl-4 pr-11 py-3 bg-[#FAF7F2] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] rounded-xl text-xs text-[#1F2C23] placeholder-[#758C7D] focus:outline-none focus:shadow-[3px_3px_0px_#1F2C23] font-medium transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#758C7D] hover:text-[#1F2C23]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <PasswordStrengthMeter password={password} />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || (password.length > 0 && !isPasswordValid)}
                className="w-full py-3.5 px-4 rounded-xl bg-[#D97043] hover:bg-[#C55F34] disabled:opacity-60 text-white font-black text-xs sm:text-sm transition-all border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                {isSubmitting ? 'Creating Account...' : 'Continue to Verification'}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center text-xs text-[#586E5F]">
              Already have an account?{' '}
              <Link to="/login" className="text-[#D97043] font-black hover:underline">
                Sign In
              </Link>
            </div>
          </>
        ) : (
          /* STEP 2: VERIFY EMAIL OTP */
          <div className="space-y-5">
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-2xl bg-[#E4ECE6] border-2 border-[#1F2C23] text-[#1F2C23] mb-1 shadow-[2px_2px_0px_#1F2C23]">
                <Mail className="w-8 h-8" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-[#FAF7F2] text-[#1F2C23] border border-[#1F2C23] text-[11px] font-mono font-black uppercase tracking-wider shadow-[1px_1px_0px_#1F2C23]">
                Step 2 of 2: Confirm Email
              </div>
              <h2 className="font-serif text-2xl font-black tracking-tight text-[#1F2C23]">
                Check Your Inbox
              </h2>
              <p className="text-xs text-[#586E5F] max-w-sm mx-auto font-medium">
                We've sent a 6-digit confirmation code to{' '}
                <strong className="text-[#1F2C23] font-black">{email}</strong>. Please enter it below to confirm your account.
              </p>
            </div>

            {/* Feedback Alerts */}
            {error && (
              <div className="p-3.5 rounded-xl bg-[#FEE2E2] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-[#991B1B] text-xs flex items-center gap-2 font-bold">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#DC2626]" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            {resendStatus && (
              <div className="p-3.5 rounded-xl bg-[#E4ECE6] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-[#1F2C23] text-xs flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#2E7D32]" />
                <span className="font-medium">{resendStatus}</span>
              </div>
            )}

            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-[#1F2C23] text-center">
                  6-Digit Confirmation Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  autoFocus
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="• • • • • •"
                  className="w-full px-4 py-3.5 bg-[#FAF7F2] border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] rounded-xl text-center text-xl font-mono tracking-[0.4em] text-[#1F2C23] placeholder-[#758C7D] focus:outline-none focus:shadow-[4px_4px_0px_#1F2C23] font-bold"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || otp.length !== 6}
                className="w-full py-3.5 px-4 rounded-xl bg-[#D97043] hover:bg-[#C55F34] disabled:opacity-60 text-white font-black text-xs sm:text-sm transition-all border-2 border-[#1F2C23] shadow-[4px_4px_0px_#1F2C23] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Verify & Launch Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Resend and Back Actions */}
            <div className="space-y-3 pt-2 text-center text-xs text-[#586E5F]">
              <div>
                <span>Didn't receive the code? </span>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendCooldown > 0}
                  className="text-[#D97043] font-bold hover:underline disabled:text-[#A3BFAC] disabled:no-underline"
                >
                  {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
                </button>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => {
                    setStep('REGISTER');
                    setError(null);
                  }}
                  className="text-[#385241] font-medium hover:underline text-[11px]"
                >
                  ← Edit details or change email
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
