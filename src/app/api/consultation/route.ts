import { NextRequest, NextResponse } from 'next/server';
import { getAvailability } from '@/lib/availability-server';
import {
  SESSION_FORMATS,
  bookableSlotsForDate,
  dayNameForDate,
  isDateOutOfOffice,
  isSlotBookable,
  nowInEastern,
} from '@/lib/availability';

// Returns an error message if the requested slot conflicts with Mike's
// schedule, out-of-office dates or the 12-hour lead time; null if the slot
// is valid. The lead time is enforced even when availability came from the
// fallback; the schedule checks are skipped in that case.
async function validateRequestedSlot(preferredDate: string, preferredTime: string): Promise<string | null> {
  const now = nowInEastern();
  if (preferredDate < now.date) {
    return 'The requested date is in the past.';
  }
  if (!isSlotBookable(preferredDate, preferredTime, now)) {
    return 'Consultations must be requested at least 12 hours in advance. Please choose a later time or call the office.';
  }

  const availability = await getAvailability();
  if (availability.fallback) return null;

  if (isDateOutOfOffice(preferredDate, availability.outOfOffice)) {
    return 'The requested date falls on an out-of-office day.';
  }
  const dayName = dayNameForDate(preferredDate);
  const day = dayName ? availability.schedule[dayName] : null;
  if (!day?.available || !day.start || !day.end) {
    return 'The requested date is not a working day.';
  }
  // Working hours minus any partial-day out-of-office windows and the lead time
  if (!bookableSlotsForDate(preferredDate, availability, now).includes(preferredTime)) {
    return 'The requested time is not available that day.';
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    if (typeof formData.preferredDate !== 'string' || typeof formData.preferredTime !== 'string') {
      return NextResponse.json({ error: 'Please choose a date and time for your consultation.' }, { status: 400 });
    }
    const conflict = await validateRequestedSlot(formData.preferredDate, formData.preferredTime);
    if (conflict) {
      return NextResponse.json({ error: conflict }, { status: 400 });
    }
    if (!SESSION_FORMATS.includes(formData.sessionFormat)) {
      return NextResponse.json({ error: 'Please select a session format preference.' }, { status: 400 });
    }

    // Debug logging
    console.log('Environment variables:', {
      hasToken: !!process.env.AIRTABLE_TOKEN,
      hasBaseId: !!process.env.AIRTABLE_BASE_ID,
      hasTableName: !!process.env.AIRTABLE_TABLE_NAME,
      baseId: process.env.AIRTABLE_BASE_ID,
      tableName: process.env.AIRTABLE_TABLE_NAME
    });
    
    console.log('Form data received:', Object.keys(formData));
    
    // Map form fields to Airtable column names
    const airtableFields: Record<string, string | boolean> = {
      'Last Name': formData.lastName,
      'First Name': formData.firstName,
      'Preferred Date': formData.preferredDate,
      'Preferred Time': formData.preferredTime,
      'City': formData.city,
      'State': formData.state,
      'Phone': formData.phone,
      'Email': formData.email,
      'Date Of Birth': formData.birthMonth && formData.birthYear ? `${formData.birthMonth}/${formData.birthYear}` : '',
      'Gender': formData.gender,
      'Address': formData.address || '',
      'Zip Code': formData.zipCode || '',
      'Session Format': formData.sessionFormat || '',
      'Reason For Visit': formData.reasonForVisit,
      'Additional Information': formData.questions || '',
      'Consultation Consent': Boolean(formData.consultationAgreement),
      'Communication Consent': Boolean(formData.contactConsent),
      'Privacy Consent': Boolean(formData.confidentialityAgreement),
      'Status': 'Pending Confirmation',
      'Appointment Type': 'Free 15-Minute Consultation'
    };

    // Remove empty optional fields to avoid sending empty strings to Airtable
    Object.keys(airtableFields).forEach(key => {
      if (airtableFields[key] === '' || airtableFields[key] === null || airtableFields[key] === undefined) {
        delete airtableFields[key];
      }
    });
    
    console.log('Mapped Airtable fields:', Object.keys(airtableFields));
    
    const airtableUrl = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`;
    console.log('Airtable URL:', airtableUrl);
    
    const airtableResponse = await fetch(airtableUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields: airtableFields
      })
    });

    console.log('Airtable response status:', airtableResponse.status);

    if (airtableResponse.ok) {
      const responseData = await airtableResponse.json();
      console.log('Airtable success:', responseData);
      return NextResponse.json({ success: true });
    } else {
      const errorText = await airtableResponse.text();
      console.error('Airtable error:', errorText);
      console.error('Response status:', airtableResponse.status);
      return NextResponse.json({ 
        error: 'Failed to submit to Airtable', 
        details: errorText,
        status: airtableResponse.status 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}