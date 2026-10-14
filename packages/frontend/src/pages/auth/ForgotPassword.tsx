import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Key, AlertCircle, ArrowLeft, CheckCircle2, Mail, ArrowRight } from 'lucide-react';
import { OrganicLeafLogo } from '../../components/common/CreativeArt';

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
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 bg-[#FAF7F2] text-[#1F2C23]">
      <div className="w-full max-w-md bg-[#FAF7F2] border border-[#EBE5D8] rounded-[36px] p-7 sm:p-9 shadow-sm relative space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center pb-1">
            <OrganicLeafLogo size={46} />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1F2C23]">
            Reset Password
          </h2>
          <p className="text-xs sm:text-sm text-[#586E5F]">
            Enter your email to receive a 6-digit verification code.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-[#FCE5DB] border border-[#F4CDBC] text-[#853C1E] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#C55F34]" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {successInfo ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#E4ECE6] border border-[#C7D9CD] text-[#24362A] text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#385241]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verification Code Sent!</span>
              </div>
              <p className="text-[#405446]">{successInfo.message}</p>
            </div>

            <button
              type="button"
              onClick={() => navigate(`/reset-password?email=${encodeURIComponent(email)}`)}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-[#D97043] hover:bg-[#C55F34] text-white font-semibold text-xs sm:text-sm transition-all shadow-sm"
            >
              <span>Enter Verification Code</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#2D3E32]">
                Your Registered Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#758C7D] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="builder@university.edu"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-[#DDD5C4] rounded-full text-xs text-[#1F2C23] placeholder-[#A3BFAC] focus:outline-none focus:border-[#74947F] shadow-2xs"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-full bg-[#D97043] hover:bg-[#C55F34] disabled:opacity-60 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm"
            >
              {isSubmitting ? 'Sending Code...' : 'Send Verification Code'}
            </button>
          </form>
        )}

        <div className="text-center pt-2">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs text-[#586E5F] hover:text-[#1F2C23] font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
