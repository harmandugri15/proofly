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
  let barColor = 'bg-[#D97043]';
  let textColor = 'text-[#D97043]';

  if (metCount === 5) {
    strengthLabel = 'Verified Strong';
    barColor = 'bg-[#385241]';
    textColor = 'text-[#385241]';
  } else if (metCount >= 4) {
    strengthLabel = 'Good';
    barColor = 'bg-[#5F826B]';
    textColor = 'text-[#5F826B]';
  } else if (metCount >= 3) {
    strengthLabel = 'Fair';
    barColor = 'bg-[#D4A359]';
    textColor = 'text-[#D4A359]';
  } else if (metCount >= 1) {
    strengthLabel = 'Weak';
    barColor = 'bg-[#E28461]';
    textColor = 'text-[#E28461]';
  }

  if (!password) {
    return null;
  }

  return (
    <div className="space-y-2 pt-1 animate-fadeIn">
      {/* 4-segment meter */}
      <div className="flex items-center justify-between text-[11px] font-mono">
        <span className="text-[#586E5F] font-semibold uppercase tracking-wider">Strength:</span>
        <span className={`font-bold ${textColor}`}>{strengthLabel}</span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 h-1.5">
        {[1, 2, 3, 4].map((step) => {
          const isActive = metCount >= step + 1 || (step === 1 && metCount >= 1);
          return (
            <div
              key={step}
              className={`rounded-full transition-all duration-300 ${
                isActive ? barColor : 'bg-[#EBE5D8]'
              }`}
            />
          );
        })}
      </div>

      {/* Checklist */}
      {showCriteria && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1.5 text-[11px]">
          {criteria.map((c, i) => (
            <div
              key={i}
              className={`flex items-center gap-1.5 transition-colors ${
                c.met ? 'text-[#24362A] font-medium' : 'text-[#758C7D]'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${
                  c.met ? 'bg-[#E4ECE6] text-[#385241]' : 'bg-[#EBE5D8] text-[#758C7D]'
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
