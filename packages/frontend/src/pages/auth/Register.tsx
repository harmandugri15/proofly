import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle, Eye, EyeOff, User, Briefcase, Mail, Lock } from 'lucide-react';
import { GoogleIcon, OrganicLeafLogo } from '../../components/common/CreativeArt';
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
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 bg-[#FAF7F2] text-[#1F2C23]">
      <div className="w-full max-w-lg bg-[#FAF7F2] border border-[#EBE5D8] rounded-[36px] p-7 sm:p-9 shadow-sm relative space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center pb-1">
            <OrganicLeafLogo size={46} />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1F2C23]">
            Create Your Proofly Account
          </h2>
          <p className="text-xs sm:text-sm text-[#586E5F]">
            Join the verified platform for real student builder evidence.
          </p>
        </div>

        {/* Role Selector Pill */}
        <div className="grid grid-cols-2 p-1.5 bg-[#F4EFE6] border border-[#DDD5C4] rounded-full">
          <button
            type="button"
            onClick={() => setRole('STUDENT')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-semibold transition-all ${
              role === 'STUDENT'
                ? 'bg-[#385241] text-white shadow-xs'
                : 'text-[#405446] hover:text-[#1F2C23]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Student Builder</span>
          </button>
          <button
            type="button"
            onClick={() => setRole('RECRUITER')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-semibold transition-all ${
              role === 'RECRUITER'
                ? 'bg-[#385241] text-white shadow-xs'
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
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-full bg-white hover:bg-[#F8F5EE] border border-[#DDD5C4] text-[#1F2C23] font-semibold text-xs sm:text-sm transition-all shadow-xs"
          >
            <GoogleIcon size={18} />
            <span>Sign Up with Google ({role === 'STUDENT' ? 'Student' : 'Recruiter'})</span>
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
          <div className="p-3.5 rounded-2xl bg-[#FCE5DB] border border-[#F4CDBC] text-[#853C1E] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#C55F34]" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#2D3E32]">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={role === 'STUDENT' ? 'Maya Lin' : 'Alex Mercer'}
              className="w-full px-4 py-3 bg-white border border-[#DDD5C4] rounded-full text-xs text-[#1F2C23] placeholder-[#A3BFAC] focus:outline-none focus:border-[#74947F] shadow-2xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#2D3E32]">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === 'STUDENT' ? 'maya@stanford.edu' : 'alex@company.com'}
              className="w-full px-4 py-3 bg-white border border-[#DDD5C4] rounded-full text-xs text-[#1F2C23] placeholder-[#A3BFAC] focus:outline-none focus:border-[#74947F] shadow-2xs"
            />
          </div>

          {role === 'RECRUITER' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#2D3E32]">
                  Organization Name
                </label>
                <input
                  type="text"
                  required
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="Acme Ventures"
                  className="w-full px-4 py-3 bg-white border border-[#DDD5C4] rounded-full text-xs text-[#1F2C23] placeholder-[#A3BFAC] focus:outline-none focus:border-[#74947F]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#2D3E32]">
                  Your Job Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Lead Tech Talent Partner"
                  className="w-full px-4 py-3 bg-white border border-[#DDD5C4] rounded-full text-xs text-[#1F2C23] placeholder-[#A3BFAC] focus:outline-none focus:border-[#74947F]"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#2D3E32]">
              Strong Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Must include uppercase, number, symbol"
                className="w-full pl-4 pr-11 py-3 bg-white border border-[#DDD5C4] rounded-full text-xs text-[#1F2C23] placeholder-[#A3BFAC] focus:outline-none focus:border-[#74947F] shadow-2xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#758C7D] hover:text-[#24362A]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <PasswordStrengthMeter password={password} />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || (password.length > 0 && !isPasswordValid)}
            className="w-full py-3.5 px-4 rounded-full bg-[#D97043] hover:bg-[#C55F34] disabled:opacity-60 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm"
          >
            {isSubmitting ? 'Creating Account...' : 'Get Verified Now'}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-xs text-[#586E5F]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#D97043] font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
