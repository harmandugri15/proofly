import React from 'react';

/**
 * High-voltage creative SVG vector art inspired by boc.studio
 * Brings vibrant energy, tactile studio stamps, and eliminates dull gloom.
 */

// 1. Geometric 4-Point Studio Starburst
export const BocSparkle: React.FC<{
  className?: string;
  size?: number;
  color?: 'coral' | 'lime' | 'cyan' | 'yellow' | 'violet';
}> = ({ className = '', size = 20, color = 'coral' }) => {
  const gradientMap = {
    coral: ['#ff451a', '#ffb703'],
    lime: ['#00f59b', '#00e5ff'],
    cyan: ['#00e5ff', '#3b82f6'],
    yellow: ['#ffb703', '#ff451a'],
    violet: ['#c084fc', '#ff451a'],
  };

  const [from, to] = gradientMap[color] || gradientMap.coral;
  const gradId = `sparkle-grad-${color}-${size}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`shrink-0 transition-transform duration-300 hover:rotate-45 hover:scale-125 ${className}`}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <path
        d="M12 0C12 7 17 12 24 12C17 12 12 17 12 24C12 17 7 12 0 12C7 12 12 7 12 0Z"
        fill={`url(#${gradId})`}
      />
    </svg>
  );
};

// 2. Boc.Studio Circular Typographic Rotating Stamp Badge
export const BocStudioStamp: React.FC<{
  className?: string;
  size?: number;
  text?: string;
  accent?: 'coral' | 'lime' | 'cyan';
}> = ({
  className = '',
  size = 90,
  text = '• VERIFIED CODE PROOF • 100% GROUNDED • NO FLUFF ',
  accent = 'coral',
}) => {
  const colorMap = {
    coral: { text: '#ff7043', border: 'border-orange-500/30', bg: 'bg-orange-500/10', glow: '#ff451a' },
    lime: { text: '#00f59b', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', glow: '#00f59b' },
    cyan: { text: '#00e5ff', border: 'border-cyan-500/30', bg: 'bg-cyan-500/10', glow: '#00e5ff' },
  };

  const cfg = colorMap[accent] || colorMap.coral;
  const pathId = `stamp-circle-${accent}-${size}`;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none group ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer Rotating Text Ring */}
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="animate-spin-slow transition-transform group-hover:scale-105"
      >
        <defs>
          <path
            id={pathId}
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
        </defs>
        <text
          fontSize="8.5"
          fontWeight="800"
          fontFamily="JetBrains Mono, monospace"
          fill={cfg.text}
          letterSpacing="2.8"
        >
          <textPath href={`#${pathId}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      {/* Center Tactile Icon */}
      <div
        className={`absolute inset-0 m-auto w-[42%] h-[42%] rounded-full ${cfg.bg} border ${cfg.border} flex items-center justify-center shadow-lg transition-transform group-hover:rotate-12`}
        style={{ boxShadow: `0 0 15px ${cfg.glow}40` }}
      >
        <BocSparkle size={size * 0.22} color={accent === 'lime' ? 'lime' : accent === 'cyan' ? 'cyan' : 'coral'} />
      </div>
    </div>
  );
};

// 3. Playful Vector Squiggle Accent
export const CreativeSquiggle: React.FC<{
  className?: string;
  color?: string;
  width?: number;
  height?: number;
}> = ({ className = '', color = '#ff451a', width = 80, height = 18 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 18"
      fill="none"
      className={className}
    >
      <path
        d="M2 9C9 2 17 2 24 9C31 16 39 16 46 9C53 2 61 2 68 9C72 13 76 15 78 14"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

// 4. Cyber Technical Crosshair (+) Accent
export const CyberCrosshair: React.FC<{ className?: string; color?: string; size?: number }> = ({
  className = '',
  color = '#38bdf8',
  size = 14,
}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
      <path d="M7 0V14M0 7H14" stroke={color} strokeWidth="1.5" strokeOpacity="0.7" />
    </svg>
  );
};

// 5. Tactile Studio Sticker Pill
export const TactileSticker: React.FC<{
  label?: string;
  text?: string;
  icon?: React.ReactNode;
  color?: 'coral' | 'flame' | 'lime' | 'cyan' | 'yellow' | 'violet';
  className?: string;
}> = ({ label, text, icon, color = 'coral', className = '' }) => {
  const displayLabel = label || text || '';
  const resolvedColor = color === 'flame' ? 'coral' : color;
  const styles = {
    coral: 'bg-[#ff451a]/15 text-[#ff7043] border-[#ff451a]/30 shadow-[0_0_15px_rgba(255,69,26,0.25)]',
    lime: 'bg-[#00f59b]/15 text-[#00f59b] border-[#00f59b]/30 shadow-[0_0_15px_rgba(0,245,155,0.25)]',
    cyan: 'bg-[#00e5ff]/15 text-[#00e5ff] border-[#00e5ff]/30 shadow-[0_0_15px_rgba(0,229,255,0.25)]',
    yellow: 'bg-[#ffb703]/15 text-[#ffb703] border-[#ffb703]/30 shadow-[0_0_15px_rgba(255,183,3,0.25)]',
    violet: 'bg-[#8b5cf6]/15 text-[#c084fc] border-[#8b5cf6]/30 shadow-[0_0_15px_rgba(139,92,246,0.25)]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border backdrop-blur-md transition-all hover:scale-105 select-none ${styles[resolvedColor]} ${className}`}
    >
      {icon}
      <span>{displayLabel}</span>
    </span>
  );
};
