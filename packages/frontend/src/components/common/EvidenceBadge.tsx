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
  const baseClasses =
    'inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-black border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] tracking-wide uppercase select-none transition-all';

  switch (status) {
    case 'ISSUER_VERIFIED':
      return (
        <span className={`${baseClasses} bg-[#86EFAC] text-[#1F2C23] ${className}`}>
          <ShieldCheck className="w-3.5 h-3.5 text-[#1F2C23] stroke-[3]" />
          Issuer Verified
        </span>
      );

    case 'DEMO_VERIFIED':
      return (
        <span className={`${baseClasses} bg-[#70D6FF] text-[#1F2C23] ${className}`}>
          <Globe className="w-3.5 h-3.5 text-[#1F2C23] stroke-[3]" />
          Demo Verified
        </span>
      );

    case 'CODE_VERIFIED':
      return (
        <span className={`${baseClasses} bg-[#FFDE59] text-[#1F2C23] ${className}`}>
          <Code2 className="w-3.5 h-3.5 text-[#1F2C23] stroke-[3]" />
          Code Verified
        </span>
      );

    case 'PENDING_REVIEW':
      return (
        <span className={`${baseClasses} bg-[#FEF08A] text-[#1F2C23] ${className}`}>
          <Clock className="w-3.5 h-3.5 text-[#1F2C23] stroke-[3]" />
          Pending Review
        </span>
      );

    case 'EXPIRED':
      return (
        <span className={`${baseClasses} bg-[#FF8A65] text-[#1F2C23] ${className}`}>
          <AlertTriangle className="w-3.5 h-3.5 text-[#1F2C23] stroke-[3]" />
          Expired
        </span>
      );

    case 'FAILED_VERIFICATION':
      return (
        <span className={`${baseClasses} bg-[#FEE2E2] text-[#DC2626] ${className}`}>
          <XCircle className="w-3.5 h-3.5 text-[#DC2626] stroke-[3]" />
          Failed
        </span>
      );

    case 'SYNCED':
      return (
        <span className={`${baseClasses} bg-[#86EFAC] text-[#1F2C23] ${className}`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-[#1F2C23] stroke-[3]" />
          Synced
        </span>
      );

    case 'RATE_LIMITED':
      return (
        <span className={`${baseClasses} bg-[#FED7AA] text-[#1F2C23] ${className}`}>
          <Clock className="w-3.5 h-3.5 text-[#1F2C23] stroke-[3]" />
          Rate Limited
        </span>
      );

    default:
      return (
        <span className={`${baseClasses} bg-white text-[#1F2C23] ${className}`}>
          <Clock className="w-3.5 h-3.5 text-[#586E5F]" />
          Unverified
        </span>
      );
  }
};
