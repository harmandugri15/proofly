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
  0: 'bg-[#161b22] border-[#21262d]',
  1: 'bg-[#0e4429] border-[#0e4429]',
  2: 'bg-[#006d32] border-[#006d32]',
  3: 'bg-[#26a641] border-[#26a641]',
  4: 'bg-[#39d353] border-[#39d353]',
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
    <div className={`p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 ${className}`}>
      {/* Header with Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <GitCommit className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              GitHub Contribution Heatmap
            </h3>
            <p className="text-[11px] text-slate-400">
              {username ? `@${username}'s` : 'Candidate'} verified commit and pull-request activity
            </p>
          </div>
        </div>

        {/* Streak Metrics Pills */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px]">Last Year:</span>
            <strong className="text-white font-mono">{totalCommitsLastYear.toLocaleString()}</strong>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px]">Current:</span>
            <strong className="text-amber-400 font-mono">{currentStreak}d</strong>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
            <Trophy className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px]">Best:</span>
            <strong className="text-cyan-400 font-mono">{longestStreak}d</strong>
          </div>
        </div>
      </div>

      {/* Heatmap Grid Container with horizontal scroll */}
      <div className="relative overflow-x-auto pb-2 pt-1 select-none">
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
                  className={`flex flex-col gap-[3px] ${isMonthStart ? 'border-l border-slate-800/80 pl-[2px] ml-[1px]' : ''}`}
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
                      className={`w-[11px] h-[11px] rounded-[2px] border transition-transform hover:scale-125 cursor-pointer ${
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
            className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-[11px] shadow-xl font-mono whitespace-nowrap"
            style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y - 8}px` }}
          >
            <span className="font-bold text-emerald-400">
              {hoveredDay.count === 0 ? 'No contributions' : `${hoveredDay.count} contribution${hoveredDay.count > 1 ? 's' : ''}`}
            </span>{' '}
            on {new Date(hoveredDay.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1 border-t border-slate-900">
        <span className="text-[10px] text-slate-500">
          Showing 52 weeks of continuous code commit history
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-slate-500">Less</span>
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#161b22] border border-[#21262d]" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#0e4429] border border-[#0e4429]" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#006d32] border border-[#006d32]" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#26a641] border border-[#26a641]" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#39d353] border border-[#39d353]" />
          <span className="text-[10px] text-slate-500">More</span>
        </div>
      </div>
    </div>
  );
};
