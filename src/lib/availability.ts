// Shared availability types + helpers. Pure/isomorphic — safe to import from
// client components. Server-side Airtable fetching lives in availability-server.ts.

export const PRACTICE_TIMEZONE = 'America/New_York';

export interface DaySchedule {
  available: boolean;
  start: string | null; // e.g. "9:00 AM" (Eastern Time)
  end: string | null;   // e.g. "5:00 PM" (Eastern Time)
}

export interface OutOfOfficePeriod {
  start: string; // YYYY-MM-DD
  end: string;   // YYYY-MM-DD (inclusive)
  reason?: string;
}

export interface Availability {
  timezone: string;
  schedule: Record<string, DaySchedule>; // keyed by "Monday".."Sunday"
  outOfOffice: OutOfOfficePeriod[];
  fallback?: boolean; // true when Airtable was unreachable and defaults were used
}

// Index matches Date.getDay()
export const DAY_NAMES = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
] as const;

export const DEFAULT_SCHEDULE: Record<string, DaySchedule> = {
  Monday: { available: true, start: '9:00 AM', end: '5:00 PM' },
  Tuesday: { available: true, start: '9:00 AM', end: '5:00 PM' },
  Wednesday: { available: true, start: '9:00 AM', end: '5:00 PM' },
  Thursday: { available: true, start: '9:00 AM', end: '5:00 PM' },
  Friday: { available: true, start: '9:00 AM', end: '5:00 PM' },
  Saturday: { available: false, start: null, end: null },
  Sunday: { available: false, start: null, end: null },
};

export function parseTimeToMinutes(timeString: string): number | null {
  const match = timeString.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

export function minutesToTimeString(totalMinutes: number): string {
  const hours24 = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const period = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
}

// 30-minute slots from start through end inclusive (matches the original
// hardcoded 9:00 AM–5:00 PM list, which included the 5:00 PM slot).
export function generateTimeSlots(start: string, end: string): string[] {
  const startMinutes = parseTimeToMinutes(start);
  const endMinutes = parseTimeToMinutes(end);
  if (startMinutes === null || endMinutes === null || endMinutes < startMinutes) return [];
  const slots: string[] = [];
  for (let m = startMinutes; m <= endMinutes; m += 30) {
    slots.push(minutesToTimeString(m));
  }
  return slots;
}

// dateStr is YYYY-MM-DD; string comparison is safe for that format.
export function isDateOutOfOffice(dateStr: string, outOfOffice: OutOfOfficePeriod[]): boolean {
  return outOfOffice.some(({ start, end }) => start && end && dateStr >= start && dateStr <= end);
}

// Weekday name for a YYYY-MM-DD string, independent of the runtime timezone.
export function dayNameForDate(dateStr: string): string | null {
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return DAY_NAMES[date.getDay()];
}

// Current date (YYYY-MM-DD) and minutes-since-midnight in Eastern Time.
export function nowInEastern(): { date: string; minutes: number } {
  const now = new Date();
  const date = new Intl.DateTimeFormat('en-CA', {
    timeZone: PRACTICE_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: PRACTICE_TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  const hour = Number(parts.find(p => p.type === 'hour')?.value ?? 0);
  const minute = Number(parts.find(p => p.type === 'minute')?.value ?? 0);
  return { date, minutes: hour * 60 + minute };
}

export function isDateSelectable(
  dateStr: string,
  availability: Availability,
  todayEastern: string,
): boolean {
  if (dateStr < todayEastern) return false;
  if (isDateOutOfOffice(dateStr, availability.outOfOffice)) return false;
  const dayName = dayNameForDate(dateStr);
  if (!dayName) return false;
  const day = availability.schedule[dayName];
  return Boolean(day?.available && day.start && day.end);
}
