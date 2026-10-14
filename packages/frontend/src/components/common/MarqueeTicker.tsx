import React from 'react';
import { ShieldCheck, Sparkles, Flame, GitCommit, Zap } from 'lucide-react';

interface MarqueeTickerProps {
  className?: string;
  variant?: 'emerald' | 'cyan' | 'brand';
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({ className = '', variant = 'emerald' }) => {
  const items = [
    { text: 'VERIFIED TALENT RADAR', icon: ShieldCheck, badge: 'LIVE_SYS' },
    { text: '52-WEEK COMMIT CADENCE', icon: GitCommit, badge: 'TELEMETRY' },
    { text: '0% RESUME FABRICATION', icon: Sparkles, badge: 'GROUNDED' },
    { text: 'RECRUITER FAST-PASS', icon: Zap, badge: '1-CLICK' },
    { text: 'CITED EVIDENCE PIPELINE', icon: Flame, badge: 'AUTHENTIC' },
    { text: 'IN-APP ALGORITHMIC PROOF', icon: ShieldCheck, badge: 'LEETCODE' },
    { text: 'AUTONOMOUS REPO CRAWLER', icon: Sparkles, badge: 'GITHUB_V3' },
  ];

  return (
    <div className={`w-full overflow-hidden border-y border-white/[0.08] bg-[#07090f]/90 backdrop-blur-md select-none py-2.5 ${className}`}>
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center text-xs font-mono font-bold tracking-wider">
        {/* Render twice for continuous loop */}
        {[...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-4 px-6 shrink-0 group cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:scale-150 transition-transform shadow-glow-emerald" />
              <span className="text-white group-hover:text-emerald-400 transition-colors uppercase flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5 text-emerald-400" />
                {item.text}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-400 border border-white/5">
                [{item.badge}]
              </span>
              <span className="text-slate-600 font-normal">/</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
