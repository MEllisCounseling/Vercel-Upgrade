'use client';

import { useState } from 'react';
import {
  Availability,
  dayNameForDate,
  hasPartialOutOfOffice,
  isDateOutOfOffice,
  isDateSelectable,
} from '@/lib/availability';

interface BookingCalendarProps {
  selectedDate: string;
  onSelect: (date: string) => void;
  availability: Availability | null; // null while loading
  todayEastern: string; // YYYY-MM-DD in Eastern Time
  maxDaysAhead?: number;
}

const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTH_LABELS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function toDateString(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function addDays(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d + days);
  return toDateString(date.getFullYear(), date.getMonth(), date.getDate());
}

export default function BookingCalendar({
  selectedDate,
  onSelect,
  availability,
  todayEastern,
  maxDaysAhead = 90,
}: BookingCalendarProps) {
  const [todayYear, todayMonth] = todayEastern.split('-').map(Number);
  const [view, setView] = useState({ year: todayYear, month: todayMonth - 1 });

  const maxDate = addDays(todayEastern, maxDaysAhead);
  const [maxYear, maxMonth] = maxDate.split('-').map(Number);

  const atFirstMonth = view.year === todayYear && view.month === todayMonth - 1;
  const atLastMonth = view.year === maxYear && view.month === maxMonth - 1;

  const changeMonth = (delta: number) => {
    setView(({ year, month }) => {
      const date = new Date(year, month + delta, 1);
      return { year: date.getFullYear(), month: date.getMonth() };
    });
  };

  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const firstWeekday = new Date(view.year, view.month, 1).getDay();

  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="border border-border rounded-md p-3 bg-card">
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          disabled={atFirstMonth}
          aria-label="Previous month"
          className="px-2 py-1 rounded text-foreground/70 hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ‹
        </button>
        <span className="text-sm font-semibold text-foreground">
          {MONTH_LABELS[view.month]} {view.year}
        </span>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          disabled={atLastMonth}
          aria-label="Next month"
          className="px-2 py-1 rounded text-foreground/70 hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAY_LABELS.map(label => (
          <div key={label} className="text-xs font-medium text-foreground/50 py-1">
            {label}
          </div>
        ))}

        {cells.map((day, index) => {
          if (day === null) return <div key={`empty-${index}`} />;

          const dateStr = toDateString(view.year, view.month, day);
          const inRange = dateStr >= todayEastern && dateStr <= maxDate;
          const isOoo = availability ? isDateOutOfOffice(dateStr, availability.outOfOffice) : false;
          const selectable = Boolean(
            availability && inRange && isDateSelectable(dateStr, availability, todayEastern)
          );
          const isSelected = dateStr === selectedDate;

          let title: string | undefined;
          if (isOoo) {
            title = 'Out of office';
          } else if (availability && inRange && hasPartialOutOfOffice(dateStr, availability.outOfOffice)) {
            title = selectable ? 'Limited hours this day' : 'Out of office';
          } else if (availability && inRange && !selectable) {
            const dayName = dayNameForDate(dateStr);
            title = dayName && !availability.schedule[dayName]?.available ? 'Not available this day' : undefined;
          }

          return (
            <button
              key={dateStr}
              type="button"
              onClick={() => selectable && onSelect(dateStr)}
              disabled={!selectable}
              title={title}
              aria-label={`${MONTH_LABELS[view.month]} ${day}${isOoo ? ' — out of office' : ''}`}
              className={`text-sm rounded py-1.5 transition-colors ${
                isSelected
                  ? 'bg-primary text-white font-semibold'
                  : selectable
                    ? 'text-foreground hover:bg-muted cursor-pointer'
                    : isOoo && inRange
                      ? 'text-foreground/35 line-through decoration-2 cursor-not-allowed'
                      : 'text-foreground/25 cursor-not-allowed'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <p className="mt-2 text-xs text-foreground/50">
        {availability
          ? 'Crossed-out dates are out of office. All times are Eastern Time (ET).'
          : 'Loading availability…'}
      </p>
    </div>
  );
}
