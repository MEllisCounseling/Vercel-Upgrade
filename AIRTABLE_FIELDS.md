# Airtable Field Structure for Consultation Form

This document outlines the field structure expected by the Airtable base for the consultation form submissions.

## Field Mapping (Form Field → Airtable Column)

### Required Fields
- `firstName` → **First Name** (Single line text)
- `lastName` → **Last Name** (Single line text)
- `email` → **Email** (Email)
- `phone` → **Phone** (Phone number)
- `city` → **City** (Single line text)
- `state` → **State** (Single select: VA, MD, WV, DC)
- `gender` → **Gender** (Single select: Male, Female, Other, Prefer Not to Say)
- `reasonForVisit` → **Reason For Visit** (Single select: anxiety, depression, relationship, trauma, grief, stress, life-transition, family, work, self-esteem, exploring, other)
- `preferredDate` → **Preferred Date** (Date)
- `preferredTime` → **Preferred Time** (Single select: 9:00 AM, 9:30 AM, 10:00 AM, etc.)

### Optional Fields
- `birthMonth` + `birthYear` → **Date Of Birth** (Single line text, formatted as MM/YYYY)
- `zipCode` → **Zip Code** (Single line text)
- `address` → **Address** (Single line text)
- `sessionFormat` → **Session Format** (Single select: in-person, telehealth, either)
- `questions` → **Additional Information** (Long text)

### Consent Fields
- `consultationAgreement` → **Consultation Consent** (Checkbox)
- `confidentialityAgreement` → **Privacy Consent** (Checkbox)
- `contactConsent` → **Communication Consent** (Checkbox)

### Auto-Generated Fields
- **Submitted** - Computed field (not populated by form)
- **Status** - Set to "Pending Confirmation" (Single select: "Pending Confirmation", "Confirmed", "Completed", "Cancelled", "No Show")
- **Appointment Type** - Set to "Free 15-Minute Consultation" (Single line text)
- **End Time** - Not populated by form (likely calculated field)

### Field Type Notes
- **Checkboxes** are sent as boolean true/false values
- **Empty optional fields** are omitted from the submission to avoid Airtable validation issues
- **Date Of Birth** combines month/year as "MM/YYYY" format (e.g., "03/1990")

## Environment Variables
```
AIRTABLE_TOKEN=your_personal_access_token
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_TABLE_NAME=your_table_id
```

## Common Issues
1. **Field Names**: Ensure Airtable field names match exactly (case-sensitive)
2. **Field Types**: Single select fields must have matching options
3. **Permissions**: Token must have write permissions to the table
4. **Base/Table IDs**: Verify correct base ID and table ID

## Testing
Use the test environment variables in `.env.local` to avoid affecting production data.