import { NextResponse } from 'next/server';
import { getAvailability } from '@/lib/availability-server';

export async function GET() {
  const availability = await getAvailability();
  return NextResponse.json(availability, {
    headers: {
      // Let browsers/CDN cache briefly; Airtable fetch itself is cached 5 min server-side.
      'Cache-Control': 'public, max-age=60, s-maxage=300',
    },
  });
}
