import React from 'react';
import { ShieldCheck, CheckCircle2, Clock, AlertTriangle, XCircle, Code2, Globe } from 'lucide-react';

interface EvidenceBadgeProps {
  status: string;
  type?: 'certificate' | 'project' | 'profile';
  className?: string;
}

export const EvidenceBadge: React.FC<EvidenceBadgeProps> = ({
  status,
  type = 'certificate',
  className = '',
}) => {
  switch (status) {
    case 'ISSUER_VERIFIED':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 ${className}`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          Issuer Verified
        </span>
      );

    case 'DEMO_VERIFIED':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-500/10 text-teal-400 border border-teal-500/20 ${className}`}
        >
          <Globe className="w-3.5 h-3.5" />
          Demo Verified
        </span>
      );

    case 'CODE_VERIFIED':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 ${className}`}
        >
          <Code2 className="w-3.5 h-3.5" />
          Code Verified
        </span>
      );

    case 'PENDING_REVIEW':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 ${className}`}
        >
          <Clock className="w-3.5 h-3.5" />
          Pending Review
        </span>
      );

    case 'EXPIRED':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20 ${className}`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          Expired
        </span>
      );

    case 'FAILED_VERIFICATION':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 ${className}`}
        >
          <XCircle className="w-3.5 h-3.5" />
          Verification Failed
        </span>
      );

    case 'SYNCED':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 ${className}`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          Synced
        </span>
      );

    case 'RATE_LIMITED':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20 ${className}`}
        >
          <Clock className="w-3.5 h-3.5" />
          Rate Limited
        </span>
      );

    default:
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700 ${className}`}
        >
          <Clock className="w-3.5 h-3.5" />
          Unverified
        </span>
      );
  }
};
