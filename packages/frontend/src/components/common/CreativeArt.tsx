import React from 'react';

/**
 * Artisanal Organic Vector Art & Botanical SVGs
 * Inspired by the warm specialty studio aesthetic:
 * Sage greens (#74947F), terracotta (#D97043), warm cream (#FAF7F2), and deep forest (#1F2C23).
 */

// 1. Organic Botanical Leaf Circle Logo Mark
export const OrganicLeafLogo: React.FC<{ size?: number; className?: string }> = ({
  size = 38,
  className = '',
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-full bg-[#3D5645] flex items-center justify-center shrink-0 shadow-sm ${className}`}
    >
      <svg
        width={size * 0.58}
        height={size * 0.58}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FAF7F2"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    </div>
  );
};

// 2. 100% Authentic / Verified Stamp Badge
export const Stamp100Verified: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`inline-flex flex-col items-center justify-center px-4 py-2.5 rounded-2xl bg-[#FAF7F2]/95 border border-[#86A791]/40 shadow-sm backdrop-blur-md select-none ${className}`}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#4D6D58"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
      <span className="text-[11px] font-bold tracking-wider text-[#24362A] mt-1 font-mono uppercase">
        100%
      </span>
      <span className="text-[8px] font-medium tracking-tight text-[#586E5F] uppercase">
        Verified
      </span>
    </div>
  );
};

// 3. Four Delicate Feature Row Icons
// 3a. Selected Seeds / Verified Credentials
export const SeedSproutIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    stroke="#24362A"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`shrink-0 ${className}`}
  >
    <path d="M18 31V16" />
    <path d="M18 23C13 23 8 20 8 13C14 13 18 16 18 23Z" />
    <path d="M18 18C23 18 28 15 28 8C22 8 18 11 18 18Z" />
    <circle cx="18" cy="31" r="1.5" fill="#24362A" />
  </svg>
);

// 3b. Fresh Roasting / Live Telemetry Flask
export const BrewingFlaskIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    stroke="#24362A"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`shrink-0 ${className}`}
  >
    <path d="M15 6H21" />
    <path d="M18 6V14L10 27C9 28.5 10 30 12 30H24C26 30 27 28.5 26 27L18 14" />
    <path d="M13 22H23" strokeDasharray="2 2" />
    <circle cx="18" cy="25" r="1.5" fill="#D97043" stroke="none" />
    <circle cx="15" cy="27" r="1" fill="#74947F" stroke="none" />
  </svg>
);

// 3c. Experienced Barista / Elite Student Engineers
export const CraftsmanBaristaIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    stroke="#24362A"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`shrink-0 ${className}`}
  >
    <path d="M18 5C14.5 5 13 7.5 13 9H23C23 7.5 21.5 5 18 5Z" />
    <path d="M11 10H25" />
    <circle cx="18" cy="15" r="4" />
    <path d="M10 29C10 23 13.5 21 18 21C22.5 21 26 23 26 29" />
    <path d="M15 21V28" />
    <path d="M21 21V28" />
  </svg>
);

// 3d. Cozy Space / Signal-Rich Recruiter Workspace
export const CozySpaceCupIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    stroke="#24362A"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`shrink-0 ${className}`}
  >
    <path d="M8 14H24C24 20 20 24 16 24C12 24 8 20 8 14Z" />
    <path d="M24 16H26C27.5 16 28.5 17 28.5 18.5C28.5 20 27.5 21 26 21H23" />
    <path d="M7 27H25" />
    <path d="M13 7C13 9 14 10 14 11" stroke="#D97043" />
    <path d="M18 6C18 8 19 9 19 11" stroke="#D97043" />
  </svg>
);

// 4. Floral / Delicate Star Flourish
export const DelicateStarOrnament: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`inline-flex items-center gap-2 text-[#74947F] select-none ${className}`}>
    <span className="text-xs">✦</span>
    <span className="w-6 h-[1px] bg-[#C7D9CD]" />
  </div>
);

// 5. Official Google Vector Icon
export const GoogleIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 18,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`shrink-0 ${className}`}
  >
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.15z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.98 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

export const BocSparkle: React.FC<{
  size?: number;
  className?: string;
  color?: string;
}> = ({ size = 18, className = '', color = '#D97043' }) => {
  const fillColor = color.startsWith('#')
    ? color
    : color === 'coral'
    ? '#D97043'
    : color === 'lime'
    ? '#74947F'
    : color === 'cyan'
    ? '#5B8C85'
    : '#D97043';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fillColor}
      className={`shrink-0 ${className}`}
    >
      <path d="M12 0C12 7 17 12 24 12C17 12 12 17 12 24C12 17 7 12 0 12C7 12 12 7 12 0Z" />
    </svg>
  );
};

export const CyberCrosshair: React.FC<{ size?: number; className?: string }> = ({
  size = 18,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#74947F"
    strokeWidth="1.8"
    className={`shrink-0 ${className}`}
  >
    <path d="M12 2v20M2 12h20" />
    <circle cx="12" cy="12" r="5" />
  </svg>
);

export const BocStudioStamp: React.FC<{
  size?: number;
  className?: string;
  text?: string;
}> = ({ size = 80, className = '', text = '• 100% VERIFIED EVIDENCE • PROOFLY ' }) => (
  <div
    style={{ width: size, height: size }}
    className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
  >
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className="animate-spin-slow"
    >
      <defs>
        <path
          id="stamp-circle"
          d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
        />
      </defs>
      <text
        fontSize="8"
        fontWeight="700"
        fill="#4D6D58"
        letterSpacing="2.5"
      >
        <textPath href="#stamp-circle" startOffset="0%">
          {text}
        </textPath>
      </text>
    </svg>
    <div className="absolute inset-0 m-auto w-7 h-7 rounded-full bg-[#E2ECE5] flex items-center justify-center">
      <span className="text-[#385241] text-xs">✦</span>
    </div>
  </div>
);

export const CreativeSquiggle: React.FC<{ color?: string; width?: number; height?: number }> = ({
  color = '#D97043',
  width = 90,
  height = 14,
}) => (
  <svg width={width} height={height} viewBox="0 0 90 14" fill="none">
    <path
      d="M3 10C15 3 25 12 37 6C49 0 60 11 72 7C78 5 83 9 87 6"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

export const TactileSticker: React.FC<{
  text?: string;
  accent?: string;
  color?: string;
}> = ({ text = 'VERIFIED' }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E4ECE6] border border-[#C7D9CD] text-[#24362A] text-xs font-semibold">
    <span className="w-1.5 h-1.5 rounded-full bg-[#74947F]" />
    {text}
  </span>
);
