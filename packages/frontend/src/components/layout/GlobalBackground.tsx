import React from 'react';

/**
 * GlobalBackground Component
 * Renders a vibrant, multi-color ambient mesh gradient canvas layered with
 * authentic Neo-Brutalist geometric vector graphics, starbursts, tactile stickers,
 * graph gridlines, and developer telemetry glyphs across the entire application.
 */
export const GlobalBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-40 overflow-hidden select-none"
    >
      {/* ========================================================================= */}
      {/* 1. VIBRANT MULTI-STOP AMBIENT MESH GRADIENTS                              */}
      {/* ========================================================================= */}
      {/* Top-Left Canary Yellow Orb */}
      <div className="absolute -top-24 -left-24 w-[620px] h-[620px] rounded-full bg-[#FFDE59]/50 blur-[130px]" />
      
      {/* Top-Right Electric Cyan Orb */}
      <div className="absolute -top-20 -right-20 w-[680px] h-[680px] rounded-full bg-[#38BDF8]/45 blur-[140px]" />
      
      {/* Mid-Left Lilac Lavender Orb */}
      <div className="absolute top-[35%] -left-32 w-[600px] h-[600px] rounded-full bg-[#C084FC]/40 blur-[130px]" />

      {/* Mid-Center Soft Coral Rose Orb */}
      <div className="absolute top-[50%] left-[45%] -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-[#FB7185]/30 blur-[140px]" />

      {/* Mid-Right Neon Mint Green Orb */}
      <div className="absolute top-[40%] -right-28 w-[640px] h-[640px] rounded-full bg-[#4ADE80]/45 blur-[130px]" />

      {/* Bottom-Left Warm Tangerine Coral Orb */}
      <div className="absolute -bottom-28 left-[5%] w-[680px] h-[680px] rounded-full bg-[#FB923C]/45 blur-[140px]" />

      {/* Bottom-Right Golden Sunshine Orb */}
      <div className="absolute -bottom-24 -right-20 w-[620px] h-[620px] rounded-full bg-[#FDE047]/45 blur-[130px]" />

      {/* ========================================================================= */}
      {/* 2. ARCHITECTURAL GRAPH GRID & DOTTED BLUEPRINT MATRIX                     */}
      {/* ========================================================================= */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.065]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 32px Grid Pattern */}
          <pattern id="global-neo-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#1F2C23" strokeWidth="1" />
          </pattern>
          {/* Halftone Dot Pattern */}
          <pattern id="global-neo-dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.5" fill="#1F2C23" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#global-neo-grid)" />
        <rect width="100%" height="100%" fill="url(#global-neo-dots)" opacity="0.6" />
      </svg>

      {/* ========================================================================= */}
      {/* 3. TACTILE NEO-BRUTALIST GRAPHICS & FLOATING MARGIN ELEMENTS             */}
      {/* ========================================================================= */}
      {/* --- TOP-LEFT CLUSTER --- */}
      <div className="hidden xl:flex flex-col items-start gap-4 absolute top-28 left-6 opacity-85">
        {/* Tilted Starburst Chip */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FFDE59] border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] text-[11px] font-mono font-black text-[#1F2C23] -rotate-6">
          <span className="text-sm">✦</span>
          <span>PROOFLY // ENGINE</span>
        </div>
        {/* Geometric Plus Crosses Grid */}
        <div className="font-mono text-xs font-black text-[#1F2C23]/35 tracking-widest leading-none pl-1">
          + &nbsp; + &nbsp; +<br />
          + &nbsp; + &nbsp; +<br />
          + &nbsp; + &nbsp; +
        </div>
      </div>

      {/* --- TOP-RIGHT CLUSTER --- */}
      <div className="hidden xl:flex flex-col items-end gap-3.5 absolute top-28 right-6 opacity-85">
        {/* Fast-Pass Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#70D6FF] border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] text-[11px] font-mono font-black text-[#1F2C23] rotate-3">
          <span className="w-2 h-2 rounded-full bg-[#1F2C23] animate-pulse" />
          <span>FAST-PASS™ READY</span>
        </div>
        {/* Diamond Geometric Shape */}
        <div className="w-7 h-7 bg-[#86EFAC] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] rotate-45 mr-3" />
      </div>

      {/* --- MID-LEFT CLUSTER --- */}
      <div className="hidden 2xl:flex flex-col items-start gap-4 absolute top-[45%] left-6 opacity-80">
        {/* Wireframe Box Graphic */}
        <div className="p-2.5 rounded-xl bg-[#D8B4FE] border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] -rotate-3">
          <svg className="w-7 h-7 text-[#1F2C23]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        </div>
        <div className="text-[10px] font-mono font-bold text-[#1F2C23]/50 pl-1 uppercase tracking-wider">
          // SHA-256 VERIFIED
        </div>
      </div>

      {/* --- MID-RIGHT CLUSTER --- */}
      <div className="hidden 2xl:flex flex-col items-end gap-3.5 absolute top-[48%] right-6 opacity-80">
        {/* Squiggle Vector Ribbon */}
        <div className="p-2 rounded-xl bg-[#FEF08A] border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] rotate-6">
          <svg className="w-8 h-4 text-[#1F2C23]" viewBox="0 0 40 16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M2 8 Q 11 0 20 8 T 38 8" />
          </svg>
        </div>
        {/* Code Bracket Chip */}
        <div className="px-2.5 py-1 rounded-lg bg-[#FF8A65] border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] text-[10px] font-mono font-black text-white">
          &lt;ast_crawler/&gt;
        </div>
      </div>

      {/* --- BOTTOM-LEFT CLUSTER --- */}
      <div className="hidden xl:flex flex-col items-start gap-3 absolute bottom-12 left-6 opacity-85">
        {/* Diagonal Hazard Stripe Bar */}
        <div className="h-4 w-28 rounded-md border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] overflow-hidden bg-[#FFDE59]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #1F2C23, #1F2C23 6px, transparent 6px, transparent 12px)',
            }}
          />
        </div>
        <div className="text-[11px] font-mono font-black text-[#1F2C23] bg-white px-2.5 py-1 rounded-lg border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] rotate-2">
          ★ 100% CRAWLER GROUNDED
        </div>
      </div>

      {/* --- BOTTOM-RIGHT CLUSTER --- */}
      <div className="hidden xl:flex flex-col items-end gap-3 absolute bottom-12 right-6 opacity-85">
        {/* Mini Retro Starburst */}
        <div className="w-8 h-8 rounded-full bg-[#86EFAC] border-2 border-[#1F2C23] shadow-[3px_3px_0px_#1F2C23] flex items-center justify-center font-black text-base text-[#1F2C23] -rotate-12">
          ★
        </div>
        <div className="text-[10px] font-mono font-black text-[#1F2C23] bg-[#FEF08A] px-2.5 py-1 rounded-lg border-2 border-[#1F2C23] shadow-[2px_2px_0px_#1F2C23] -rotate-3">
          ZERO RESUME FLUFF
        </div>
      </div>
    </div>
  );
};
