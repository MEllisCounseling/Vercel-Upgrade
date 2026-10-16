# Is the Klaudius /booking skill useful for Winchester Therapy Services?

Assessed 2026-10-16 against `~/.claude/skills/booking/SKILL.md` (appointments archetype)
and the site as it stands on `main`.

## What the site does today
- Paid therapy sessions are booked on Headway (insurance, billing, scheduling). The
  site links out. Nothing on the site can replace this.
- The free 15-minute consultation is a request form on the site. It POSTs to Airtable,
  Mike confirms by phone or email within 24 hours. The calendar in the form reads his
  weekly hours and out-of-office dates live from two Airtable tables that he edits
  himself. Nothing is confirmed instantly, nothing prevents two people requesting the
  same slot, no confirmation or reminder email is sent.

## What /booking (appointments mode) would install
Supabase tables prefixed `winchester_therapy_` (settings, services, staff, staff_hours,
closures, appointments), a create RPC with an advisory lock (no double booking), a
public /book page restyled to the site, instant confirmation emails with a self-service
cancel link, owner notification emails, a password-protected /admin/bookings dashboard
(phone bookings, cancellations, closures), and a 9am Vercel cron for day-of reminders.
One service row: "Free 15-minute consultation", 15 minutes, with a buffer. One staff
row (Mike), so the staff picker hides itself.

## Side by side

| | Today (Airtable request form) | After /booking |
|---|---|---|
| Confirmation | Manual, within 24 hours | Instant, by email, with a cancel link |
| Double booking | Possible (requests only) | Prevented in the database |
| Reminders | None | Day-of email via cron |
| Owner alerts | None (Mike checks Airtable) | Email per booking and cancellation |
| Hours changes | Mike edits an Airtable table he already knows | SQL UPDATE on the settings row (by us), closures in the dashboard (by Mike) |
| Intake detail | Reason for visit, gender, DOB, address, session format, consents | Name, phone, email, notes |
| Infrastructure | Three Airtable env vars already on Mike's Vercel | A Supabase project, service-role key, SMTP or Resend, admin password, cron secret, all on Mike's Vercel |
| Cost | Free | Free at this volume (Supabase, Resend and Vercel Hobby tiers) |

## Verdict
Useful, as a targeted upgrade to the free-consultation flow, not as a general
replacement for anything. Headway stays. The gain is real (instant confirmation, no
double booking, reminders, fewer no-shows) but so is the trade: Mike would stop
managing hours in Airtable, and the install needs access to his Vercel project, which
our MCP cannot see (see the deployment-domains note).

It was not installed on this branch, for three reasons:
1. The skill's contract starts with a discovery conversation the user must answer:
   owner notification inbox, Resend key or SMTP mailbox, which Supabase project hosts
   the tables, grid granularity and buffer, and whether the intake fields above should
   be dropped. Guessing those would produce a system that emails the wrong inbox.
2. It is a retrofit for a deployed site and writes secrets to the live Vercel project.
   That is a production change, not something to hide inside a design branch.
3. Step 0 would also want the repo linked (`.vercel/project.json`), which it is not here.

## Recommended path if Mike wants it
1. Merge or discard this redesign first, so /booking restyles the final design.
2. Run `/booking` from the repo root with these answers ready: appointments archetype,
   live business, service "Free 15-minute consultation" 15 min + 15 min buffer, staff
   Mike only, hours from the current Airtable schedule, timezone America/New_York,
   locale en-US, ref prefix WTS, owner inbox Michaelfellislcsw@gmail.com, production
   email mode on winchestertherapyservices.org (needs a free Resend account), test inbox
   the user's own address.
3. Keep the clinical questions (reason for visit, DOB, address) out of the booking
   form. Neither Airtable nor Supabase free tiers carry a HIPAA BAA, and Headway
   already collects the clinical and insurance details.
4. Leave Airtable in place until the new flow has handled a few real bookings, then
   remove the /api/consultation and /api/availability routes.

## Lighter alternative
If the only pain is "people hear nothing until Mike calls back", add a Resend
confirmation email to the existing /api/consultation route (about forty lines) and keep
everything else as is. That gets most of the felt benefit without moving the schedule
out of Airtable.
