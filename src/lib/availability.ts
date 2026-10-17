// Shared availability types + helpers. Pure/isomorphic — safe to import from
// client components. Server-side Airtable fetching lives in availability-server.ts.

export const PRACTICE_TIMEZONE = 'America/New_York';

// Consultations must be requested at least this far ahead (12 hours).
// Anything sooner is handled by phone.
export const MIN_LEAD_MINUTES = 12 * 60;
export const SESSION_FORMATS = ['in-person', 'telehealth', 'either'] as const;

export interface DaySchedule {
  available: boolean;
  start: string | null; // e.g. "9:00 AM" (Eastern Time)
  end: string | null;   // e.g. "5:00 PM" (Eastern Time)
}

export interface OutOfOfficePeriod {
  start: string; // YYYY-MM-DD
  end: string;   // YYYY-MM-DD (inclusive)
  // Optional partial-day window (Eastern Time). Both blank = whole day off.
  // Only startTime = out from that time onward; only endTime = out until then.
  startTime?: string | null; // e.g. "1:00 PM"
  endTime?: string | null;   // e.g. "5:00 PM"
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
function periodCoversDate(dateStr: string, period: OutOfOfficePeriod): boolean {
  return Boolean(period.start && period.end && dateStr >= period.start && dateStr <= period.end);
}

// True when the entire day is blocked (an OOO period with no time window)
export function isDateOutOfOffice(dateStr: string, outOfOffice: OutOfOfficePeriod[]): boolean {
  return outOfOffice.some(p => periodCoversDate(dateStr, p) && !p.startTime && !p.endTime);
}

// True when a partial-day OOO window applies to this date
export function hasPartialOutOfOffice(dateStr: string, outOfOffice: OutOfOfficePeriod[]): boolean {
  return outOfOffice.some(p => periodCoversDate(dateStr, p) && Boolean(p.startTime || p.endTime));
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

// Bookable slots for a date: the weekday's working hours minus any
// out-of-office windows. Empty when the day is off or fully blocked.
export function availableSlotsForDate(dateStr: string, availability: Availability): string[] {
  const dayName = dayNameForDate(dateStr);
  const day = dayName ? availability.schedule[dayName] : null;
  if (!day?.available || !day.start || !day.end) return [];

  let slots = generateTimeSlots(day.start, day.end);
  for (const period of availability.outOfOffice) {
    if (!periodCoversDate(dateStr, period)) continue;
    if (!period.startTime && !period.endTime) return [];
    // Missing start = out from the beginning of the day; missing end = out
    // for the rest of the day. Bounds are inclusive (conservative).
    const blockStart = period.startTime ? parseTimeToMinutes(period.startTime) ?? -Infinity : -Infinity;
    const blockEnd = period.endTime ? parseTimeToMinutes(period.endTime) ?? Infinity : Infinity;
    slots = slots.filter(slot => {
      const minutes = parseTimeToMinutes(slot);
      return minutes !== null && (minutes < blockStart || minutes > blockEnd);
    });
  }
  return slots;
}

export interface EasternMoment {
  date: string;    // YYYY-MM-DD
  minutes: number; // minutes since midnight
}

function addDaysToDateString(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d + days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

// The earliest moment a consultation may be requested for: now plus the lead
// time, rolled forward across midnight as needed.
export function earliestBookableMoment(now: EasternMoment, leadMinutes = MIN_LEAD_MINUTES): EasternMoment {
  let minutes = now.minutes + leadMinutes;
  let date = now.date;
  while (minutes >= 24 * 60) {
    minutes -= 24 * 60;
    date = addDaysToDateString(date, 1);
  }
  return { date, minutes };
}

// True when a slot on dateStr satisfies the lead time.
export function isSlotBookable(dateStr: string, timeString: string, now: EasternMoment): boolean {
  const slotMinutes = parseTimeToMinutes(timeString);
  if (slotMinutes === null) return false;
  const earliest = earliestBookableMoment(now);
  if (dateStr < earliest.date) return false;
  if (dateStr > earliest.date) return true;
  return slotMinutes >= earliest.minutes;
}

// Working-hours slots for a date that also satisfy the lead time.
export function bookableSlotsForDate(dateStr: string, availability: Availability, now: EasternMoment): string[] {
  return availableSlotsForDate(dateStr, availability).filter(slot => isSlotBookable(dateStr, slot, now));
}

export function isDateSelectable(
  dateStr: string,
  availability: Availability,
  now: EasternMoment,
): boolean {
  if (dateStr < now.date) return false;
  return bookableSlotsForDate(dateStr, availability, now).length > 0;
}
