import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';
import { GoogleIcon, DelicateStarOrnament } from '../../components/common/CreativeArt';

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
        <div className="w-full max-w-md bg-white/95 border border-sand-300 rounded-3xl p-8 shadow-sm text-center space-y-5">
          <div className="w-14 h-14 rounded-full bg-terracotta-50 border border-terracotta-200 text-terracotta-600 mx-auto flex items-center justify-center">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-xl font-serif font-normal text-forest-900">Authentication Incomplete</h2>
            <p className="text-xs text-forest-700/70 leading-relaxed">{error}</p>
          </div>
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-sand-100 hover:bg-sand-200 text-forest-900 font-medium text-xs border border-sand-200 transition-colors"
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
      <div className="w-14 h-14 rounded-full border-2 border-sage-500 border-t-terracotta-500 animate-spin flex items-center justify-center p-1">
        <GoogleIcon size={24} />
      </div>
      <div className="text-center space-y-1">
        <p className="text-xs font-mono font-bold text-forest-900 tracking-widest flex items-center justify-center gap-1.5">
          <span>VERIFYING GOOGLE IDENTITY SIGNALS</span>
          <DelicateStarOrnament className="w-3.5 h-3.5 text-terracotta-500" />
        </p>
        <p className="text-[11px] font-mono text-forest-700/60">Minting secure encrypted workspace session...</p>
      </div>
    </div>
  );
};
