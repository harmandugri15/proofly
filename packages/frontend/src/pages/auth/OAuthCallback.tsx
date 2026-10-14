import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';
import { BocSparkle, GoogleIcon } from '../../components/common/CreativeArt';

export const OAuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleCallback();
  }, [searchParams]);

  const handleCallback = async () => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      if (errorParam.includes('not configured')) {
        setError('Google OAuth is not configured with client credentials yet.');
      } else {
        setError(errorParam);
      }
      return;
    }

    const token = searchParams.get('token');
    const redirect = searchParams.get('redirect') || '/student/dashboard';

    if (token) {
      localStorage.setItem('proofly_token', token);
      await refreshUser();
      navigate(redirect, { replace: true });
    } else {
      setError('No session authorization was received from the identity provider.');
    }
  };

  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0c1326] border border-rose-500/30 rounded-3xl p-8 shadow-2xl text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 mx-auto flex items-center justify-center">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-xl font-black text-white font-sans">Authentication Incomplete</h2>
            <p className="text-xs text-slate-300 leading-relaxed">{error}</p>
          </div>
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
          >
            <span>Return to Login</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#ff451a] via-[#ffb703] to-[#00f59b] animate-spin flex items-center justify-center p-1 shadow-glow-coral">
        <div className="w-full h-full bg-[#080c16] rounded-xl flex items-center justify-center">
          <GoogleIcon size={24} />
        </div>
      </div>
      <div className="text-center space-y-1">
        <p className="text-xs font-mono font-bold text-white tracking-widest flex items-center justify-center gap-1.5">
          <span>VERIFYING GOOGLE IDENTITY SIGNALS</span>
          <BocSparkle size={14} />
        </p>
        <p className="text-[11px] font-mono text-slate-400">Minting secure encrypted workspace session...</p>
      </div>
    </div>
  );
};
