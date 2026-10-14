import React from 'react';
import { Check, X } from 'lucide-react';

interface PasswordStrengthMeterProps {
  password: string;
  showCriteria?: boolean;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
  showCriteria = true,
}) => {
  const criteria = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter (A-Z)', met: /[A-Z]/.test(password) },
    { label: 'One lowercase letter (a-z)', met: /[a-z]/.test(password) },
    { label: 'One numeric digit (0-9)', met: /[0-9]/.test(password) },
    { label: 'One special symbol (!@#$%^&*)', met: /[^A-Za-z0-9]/.test(password) },
  ];

  const metCount = criteria.filter((c) => c.met).length;

  let strengthLabel = 'Too Weak';
  let barColor = 'bg-rose-500';
  let textColor = 'text-rose-400';

  if (metCount === 5) {
    strengthLabel = 'Military Grade (Strong)';
    barColor = 'bg-[#00f59b] shadow-[0_0_12px_rgba(0,245,155,0.6)]';
    textColor = 'text-[#00f59b]';
  } else if (metCount >= 4) {
    strengthLabel = 'Good';
    barColor = 'bg-cyan-400 shadow-[0_0_10px_rgba(0,229,255,0.5)]';
    textColor = 'text-cyan-400';
  } else if (metCount >= 3) {
    strengthLabel = 'Fair';
    barColor = 'bg-[#ffb703]';
    textColor = 'text-[#ffb703]';
  } else if (metCount >= 1) {
    strengthLabel = 'Weak';
    barColor = 'bg-[#ff451a]';
    textColor = 'text-[#ff7043]';
  }

  if (!password) {
    return null;
  }

  return (
    <div className="space-y-2.5 pt-1.5 animate-fadeIn">
      {/* 4-segment meter */}
      <div className="flex items-center justify-between text-[11px] font-mono">
        <span className="text-slate-400 font-bold uppercase tracking-wider">Password Strength:</span>
        <span className={`font-black ${textColor}`}>{strengthLabel}</span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 h-1.5">
        {[1, 2, 3, 4].map((step) => {
          const isActive = metCount >= step + 1 || (step === 1 && metCount >= 1);
          return (
            <div
              key={step}
              className={`rounded-full transition-all duration-300 ${
                isActive ? barColor : 'bg-slate-800/80'
              }`}
            />
          );
        })}
      </div>

      {/* Checklist */}
      {showCriteria && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1.5 text-[11px] font-mono">
          {criteria.map((c, i) => (
            <div
              key={i}
              className={`flex items-center gap-1.5 transition-colors ${
                c.met ? 'text-slate-200' : 'text-slate-500'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${
                  c.met ? 'bg-[#00f59b]/20 text-[#00f59b]' : 'bg-white/5 text-slate-600'
                }`}
              >
                {c.met ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : <X className="w-2.5 h-2.5 stroke-[3]" />}
              </div>
              <span>{c.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
