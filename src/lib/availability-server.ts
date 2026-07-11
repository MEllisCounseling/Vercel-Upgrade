// Server-only: fetches Mike's weekly schedule and out-of-office periods from
// Airtable. Falls back to the default Mon–Fri 9–5 schedule if Airtable is
// unreachable so the booking form never hard-fails.

import {
  Availability,
  DaySchedule,
  DEFAULT_SCHEDULE,
  OutOfOfficePeriod,
  PRACTICE_TIMEZONE,
} from './availability';

const SCHEDULE_TABLE = 'Weekly Schedule';
const OUT_OF_OFFICE_TABLE = 'Out of Office';
const CACHE_SECONDS = 300;

interface AirtableRecord {
  id: string;
  fields: Record<string, unknown>;
}

async function fetchTable(tableName: string): Promise<AirtableRecord[]> {
  const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}?maxRecords=100`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}` },
    next: { revalidate: CACHE_SECONDS },
  });
  if (!response.ok) {
    throw new Error(`Airtable ${tableName} fetch failed: ${response.status}`);
  }
  const data = await response.json();
  return data.records ?? [];
}

export async function getAvailability(): Promise<Availability> {
  try {
    const [scheduleRecords, oooRecords] = await Promise.all([
      fetchTable(SCHEDULE_TABLE),
      fetchTable(OUT_OF_OFFICE_TABLE),
    ]);

    const schedule: Record<string, DaySchedule> = { ...DEFAULT_SCHEDULE };
    for (const record of scheduleRecords) {
      const day = record.fields['Day'];
      if (typeof day !== 'string' || !(day in schedule)) continue;
      const available = record.fields['Available'] === true;
      const start = typeof record.fields['Start Time'] === 'string' ? (record.fields['Start Time'] as string) : null;
      const end = typeof record.fields['End Time'] === 'string' ? (record.fields['End Time'] as string) : null;
      schedule[day] = {
        available: available && Boolean(start && end),
        start,
        end,
      };
    }

    const outOfOffice: OutOfOfficePeriod[] = [];
    for (const record of oooRecords) {
      const start = record.fields['Start Date'];
      const end = record.fields['End Date'] ?? start;
      if (typeof start !== 'string') continue;
      outOfOffice.push({
        start,
        end: typeof end === 'string' ? end : start,
        reason: typeof record.fields['Reason'] === 'string' ? (record.fields['Reason'] as string) : undefined,
      });
    }

    return { timezone: PRACTICE_TIMEZONE, schedule, outOfOffice };
  } catch (error) {
    console.error('Availability fetch failed, using default schedule:', error);
    return {
      timezone: PRACTICE_TIMEZONE,
      schedule: DEFAULT_SCHEDULE,
      outOfOffice: [],
      fallback: true,
    };
  }
}
