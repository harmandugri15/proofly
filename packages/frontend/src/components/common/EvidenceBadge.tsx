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
  const baseClasses = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] tracking-tight";

  switch (status) {
    case 'ISSUER_VERIFIED':
      return (
        <span className={`${baseClasses} bg-[#E4ECE6] text-[#1F2C23] ${className}`}>
          <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
          Issuer Verified
        </span>
      );

    case 'DEMO_VERIFIED':
      return (
        <span className={`${baseClasses} bg-[#E0F2FE] text-[#1F2C23] ${className}`}>
          <Globe className="w-3.5 h-3.5 text-[#0284C7]" />
          Demo Verified
        </span>
      );

    case 'CODE_VERIFIED':
      return (
        <span className={`${baseClasses} bg-[#FEF3C7] text-[#1F2C23] ${className}`}>
          <Code2 className="w-3.5 h-3.5 text-[#D97706]" />
          Code Verified
        </span>
      );

    case 'PENDING_REVIEW':
      return (
        <span className={`${baseClasses} bg-[#FEF9C3] text-[#1F2C23] ${className}`}>
          <Clock className="w-3.5 h-3.5 text-[#CA8A04]" />
          Pending Review
        </span>
      );

    case 'EXPIRED':
      return (
        <span className={`${baseClasses} bg-[#FEE2E2] text-[#1F2C23] ${className}`}>
          <AlertTriangle className="w-3.5 h-3.5 text-[#DC2626]" />
          Expired
        </span>
      );

    case 'FAILED_VERIFICATION':
      return (
        <span className={`${baseClasses} bg-[#FEE2E2] text-[#991B1B] ${className}`}>
          <XCircle className="w-3.5 h-3.5 text-[#DC2626]" />
          Verification Failed
        </span>
      );

    case 'SYNCED':
      return (
        <span className={`${baseClasses} bg-[#E4ECE6] text-[#1F2C23] ${className}`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
          Synced
        </span>
      );

    case 'RATE_LIMITED':
      return (
        <span className={`${baseClasses} bg-[#FFEDD5] text-[#1F2C23] ${className}`}>
          <Clock className="w-3.5 h-3.5 text-[#EA580C]" />
          Rate Limited
        </span>
      );

    default:
      return (
        <span className={`${baseClasses} bg-[#F4EFE6] text-[#1F2C23] ${className}`}>
          <Clock className="w-3.5 h-3.5 text-[#758C7D]" />
          Unverified
        </span>
      );
  }
};
