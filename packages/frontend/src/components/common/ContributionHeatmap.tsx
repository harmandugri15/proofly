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
  0: 'bg-[#EAE4DC] border-[#DFD8CE]',
  1: 'bg-[#C6D8CB] border-[#B2C9B8]',
  2: 'bg-[#96B79F] border-[#7D9B86]',
  3: 'bg-[#5B8267] border-[#486D53]',
  4: 'bg-[#24422D] border-[#1B3423] shadow-sm',
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
    <div className={`w-full max-w-full min-w-0 overflow-hidden p-5 sm:p-6 rounded-3xl bg-sand-50/70 border border-sand-200/80 space-y-4 ${className}`}>
      {/* Header with Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-sage-100 text-sage-800 border border-sage-200">
            <GitCommit className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-serif font-normal uppercase tracking-wider text-forest-900 flex items-center gap-1.5">
              <span>GitHub Contribution Heatmap</span>
              <span className="w-1.5 h-1.5 rounded-full bg-sage-600 animate-pulse" />
            </h3>
            <p className="text-[11px] text-forest-700/60 font-mono">
              {username ? `@${username}'s` : 'Candidate'} verified commit and pull-request activity
            </p>
          </div>
        </div>

        {/* Streak Metrics Pills */}
        <div className="grid grid-cols-3 sm:flex sm:items-center gap-2 text-xs">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-sand-200 text-forest-800 shadow-2xs">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-sage-600" />
              <span className="text-[10px] text-forest-700/50">Year:</span>
            </div>
            <strong className="text-forest-900 font-mono text-xs">{totalCommitsLastYear.toLocaleString()}</strong>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-sand-200 text-forest-800 shadow-2xs">
            <div className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-terracotta-600" />
              <span className="text-[10px] text-forest-700/50">Streak:</span>
            </div>
            <strong className="text-terracotta-600 font-mono text-xs">{currentStreak}d</strong>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-sand-200 text-forest-800 shadow-2xs">
            <div className="flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[10px] text-forest-700/50">Best:</span>
            </div>
            <strong className="text-forest-900 font-mono text-xs">{longestStreak}d</strong>
          </div>
        </div>
      </div>

      {/* Mobile scroll hint */}
      <div className="flex items-center justify-between text-[10px] font-mono text-sage-700 sm:hidden">
        <span>↔ Scroll horizontally to explore full year</span>
      </div>

      {/* Heatmap Grid Container with strict horizontal overflow isolation */}
      <div className="w-full max-w-full overflow-x-auto pb-3 pt-1 select-none scrollbar-thin">
        {/* Month Labels aligned to 14px per column */}
        <div className="relative h-4 mb-1.5 ml-8 min-w-[760px]">
          {monthLabels.map((m, i) => (
            <span
              key={i}
              className="absolute text-[10px] text-forest-700/60 font-mono whitespace-nowrap"
              style={{ left: `${m.index * 14}px` }}
            >
              {m.label}
            </span>
          ))}
        </div>

        {/* Grid: Day-of-week labels + exact week columns */}
        <div className="flex gap-2 min-w-[760px]">
          {/* Day of week labels */}
          <div className="w-6 flex flex-col justify-between text-[9px] text-forest-700/50 font-mono py-0.5 h-[98px]">
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
                  className={`flex flex-col gap-[3px] ${isMonthStart ? 'border-l border-sand-300/80 pl-[2px] ml-[1px]' : ''}`}
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
            className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2 px-3 py-1.5 rounded-xl bg-forest-900 border border-sand-400 text-sand-50 text-[11px] shadow-xl font-mono whitespace-nowrap"
            style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y - 8}px` }}
          >
            <span className="font-bold text-sand-200">
              {hoveredDay.count === 0 ? 'No contributions' : `${hoveredDay.count} contribution${hoveredDay.count > 1 ? 's' : ''}`}
            </span>{' '}
            on {new Date(hoveredDay.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-forest-700/60 font-mono pt-2 border-t border-sand-200/80 gap-2">
        <span className="text-[10px] text-forest-700/50">
          Continuous 52-week telemetry directly from verified GitHub events
        </span>
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <span className="text-[10px] text-forest-700/50">Less</span>
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#EAE4DC] border border-[#DFD8CE]" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#C6D8CB] border border-[#B2C9B8]" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#96B79F] border border-[#7D9B86]" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#5B8267] border border-[#486D53]" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#24422D] border border-[#1B3423]" />
          <span className="text-[10px] text-forest-700/50">More</span>
        </div>
      </div>
    </div>
  );
};
