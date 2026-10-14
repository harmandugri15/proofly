import React from 'react';
import { ShieldCheck, Flame, GitCommit, Zap } from 'lucide-react';
import { BocSparkle } from './CreativeArt';

interface MarqueeTickerProps {
  className?: string;
  variant?: 'coral' | 'lime' | 'cyan' | 'brand';
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({ className = '', variant = 'coral' }) => {
  const items = [
    { text: 'VERIFIED TALENT RADAR', icon: ShieldCheck, badge: 'LIVE_SYS', col: 'text-[#00f59b]' },
    { text: '52-WEEK COMMIT CADENCE', icon: GitCommit, badge: 'TELEMETRY', col: 'text-[#00e5ff]' },
    { text: '0% RESUME FABRICATION', badge: 'GROUNDED', col: 'text-[#ff451a]' },
    { text: 'RECRUITER FAST-PASS', icon: Zap, badge: '1-CLICK', col: 'text-[#ffb703]' },
    { text: 'CITED EVIDENCE PIPELINE', icon: Flame, badge: 'AUTHENTIC', col: 'text-[#ff451a]' },
    { text: 'IN-APP ALGORITHMIC PROOF', icon: ShieldCheck, badge: 'LEETCODE', col: 'text-[#00f59b]' },
    { text: 'AUTONOMOUS REPO CRAWLER', badge: 'GITHUB_V3', col: 'text-[#00e5ff]' },
  ];

  return (
    <div className={`w-full max-w-full overflow-hidden border-y border-white/10 bg-[#0a0f1d]/90 backdrop-blur-md select-none py-3 ${className}`}>
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center text-xs font-mono font-bold tracking-wider">
        {/* Render twice for continuous loop */}
        {[...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-4 px-6 shrink-0 group cursor-default">
              <BocSparkle size={12} color={idx % 3 === 0 ? 'coral' : idx % 3 === 1 ? 'lime' : 'cyan'} />
              <span className="text-white group-hover:text-white transition-colors uppercase flex items-center gap-1.5 font-sans font-extrabold tracking-wide">
                {Icon && <Icon className={`w-3.5 h-3.5 ${item.col}`} />}
                {item.text}
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] ${item.col} border border-white/10`}>
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
