import React, { useState } from 'react';
import { ContributionDay } from '@proofly/shared';
import { Flame, Trophy, Calendar, GitCommit } from 'lucide-react';

interface ContributionHeatmapProps {
  contributions?: ContributionDay[];
  totalCommitsLastYear?: number;
  currentStreak?: number;
  longestStreak?: number;
  username?: string;
  className?: string;
}

const LEVEL_COLORS: Record<number, string> = {
  0: 'bg-[#151c30] border-[#1e2a4a]',
  1: 'bg-[#064e3b] border-[#047857]',
  2: 'bg-[#059669] border-[#10b981]',
  3: 'bg-[#10b981] border-[#34d399]',
  4: 'bg-[#00f59b] border-[#00f59b] shadow-[0_0_8px_rgba(0,245,155,0.6)]',
};

export const ContributionHeatmap: React.FC<ContributionHeatmapProps> = ({
  contributions = [],
  totalCommitsLastYear = 0,
  currentStreak = 0,
  longestStreak = 0,
  username,
  className = '',
}) => {
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // Group days into weeks (columns of 7 days)
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  let effectiveContributions = contributions;
  if (!effectiveContributions || effectiveContributions.length === 0) {
    const emptyDays: ContributionDay[] = [];
    const today = new Date();
    for (let i = 363; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      emptyDays.push({
        date: d.toISOString().split('T')[0],
        count: 0,
        level: 0,
      });
    }
    effectiveContributions = emptyDays;
  }

  effectiveContributions.forEach((day, index) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || index === effectiveContributions.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  // Calculate month labels with exact column indices
  const monthLabels: { index: number; label: string }[] = [];
  let lastMonth = -1;

  weeks.forEach((week, weekIdx) => {
    if (week.length > 0) {
      const date = new Date(week[0].date);
      const month = date.getMonth();
      if (month !== lastMonth) {
        // Prevent squishing month labels if too close to the end (within 1 week)
        if (weeks.length - weekIdx > 1) {
          monthLabels.push({
            index: weekIdx,
            label: date.toLocaleString('en-US', { month: 'short' }),
          });
        }
        lastMonth = month;
      }
    }
  });

  const newMonthIndices = new Set(monthLabels.map((m) => m.index));

  return (
    <div className={`w-full max-w-full min-w-0 overflow-hidden p-4 sm:p-6 rounded-3xl bg-[#0c1222]/90 border border-white/10 space-y-4 shadow-xl ${className}`}>
      {/* Header with Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/15 text-[#00f59b] border border-emerald-500/20 shadow-glow-emerald">
            <GitCommit className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-white font-sans flex items-center gap-1.5">
              <span>GitHub Contribution Heatmap</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f59b] animate-pulse" />
            </h3>
            <p className="text-[11px] text-slate-400">
              {username ? `@${username}'s` : 'Candidate'} verified commit and pull-request activity
            </p>
          </div>
        </div>

        {/* Streak Metrics Pills (grid on mobile, flex on desktop) */}
        <div className="grid grid-cols-3 sm:flex sm:items-center gap-2 text-xs">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#131b32] border border-white/5 text-slate-300">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#00f59b]" />
              <span className="text-[10px] text-slate-400">Year:</span>
            </div>
            <strong className="text-white font-mono text-xs">{totalCommitsLastYear.toLocaleString()}</strong>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#131b32] border border-white/5 text-slate-300">
            <div className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-[#ff451a]" />
              <span className="text-[10px] text-slate-400">Streak:</span>
            </div>
            <strong className="text-[#ff7043] font-mono text-xs">{currentStreak}d</strong>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#131b32] border border-white/5 text-slate-300">
            <div className="flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-[#00e5ff]" />
              <span className="text-[10px] text-slate-400">Best:</span>
            </div>
            <strong className="text-[#00e5ff] font-mono text-xs">{longestStreak}d</strong>
          </div>
        </div>
      </div>

      {/* Mobile scroll hint */}
      <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 sm:hidden">
        <span>↔ Scroll horizontally to explore full year</span>
      </div>

      {/* Heatmap Grid Container with strict horizontal overflow isolation */}
      <div className="w-full max-w-full overflow-x-auto pb-3 pt-1 select-none scrollbar-thin">
        {/* Month Labels aligned to 14px per column */}
        <div className="relative h-4 mb-1.5 ml-8 min-w-[760px]">
          {monthLabels.map((m, i) => (
            <span
              key={i}
              className="absolute text-[10px] text-slate-400 font-mono whitespace-nowrap"
              style={{ left: `${m.index * 14}px` }}
            >
              {m.label}
            </span>
          ))}
        </div>

        {/* Grid: Day-of-week labels + exact week columns */}
        <div className="flex gap-2 min-w-[760px]">
          {/* Day of week labels */}
          <div className="w-6 flex flex-col justify-between text-[9px] text-slate-500 font-mono py-0.5 h-[98px]">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          {/* 52 Columns (11px cell + 3px gap = 14px per column) */}
          <div className="flex gap-[3px]">
            {weeks.map((week, wIdx) => {
              const isMonthStart = newMonthIndices.has(wIdx) && wIdx !== 0;
              return (
                <div
                  key={wIdx}
                  className={`flex flex-col gap-[3px] ${isMonthStart ? 'border-l border-slate-700/60 pl-[2px] ml-[1px]' : ''}`}
                >
                  {week.map((day, dIdx) => (
                    <div
                      key={`${wIdx}-${dIdx}`}
                      onMouseEnter={(e) => {
                        setHoveredDay(day);
                        const rect = e.currentTarget.getBoundingClientRect();
                        setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top });
                      }}
                      onMouseLeave={() => setHoveredDay(null)}
                      className={`w-[11px] h-[11px] rounded-[2px] border transition-transform hover:scale-150 hover:z-10 cursor-pointer ${
                        LEVEL_COLORS[day.level] || LEVEL_COLORS[0]
                      }`}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Tooltip */}
        {hoveredDay && tooltipPos && (
          <div
            className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2 px-3 py-1.5 rounded-xl bg-[#0e1628] border border-cyan-500/40 text-white text-[11px] shadow-2xl font-mono whitespace-nowrap"
            style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y - 8}px` }}
          >
            <span className="font-bold text-[#00f59b]">
              {hoveredDay.count === 0 ? 'No contributions' : `${hoveredDay.count} contribution${hoveredDay.count > 1 ? 's' : ''}`}
            </span>{' '}
            on {new Date(hoveredDay.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-400 font-mono pt-2 border-t border-white/5 gap-2">
        <span className="text-[10px] text-slate-500">
          Continuous 52-week telemetry directly from verified GitHub events
        </span>
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <span className="text-[10px] text-slate-500">Less</span>
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#151c30] border border-[#1e2a4a]" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#064e3b] border border-[#047857]" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#059669] border border-[#10b981]" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#10b981] border border-[#34d399]" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#00f59b] border border-[#00f59b]" />
          <span className="text-[10px] text-slate-500">More</span>
        </div>
      </div>
    </div>
  );
};
