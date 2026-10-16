# Gathered Content: Winchester Therapy Services LLC

Source: the business's own published website (this repository, deployed at
https://www.winchestertherapyservices.org) plus the live page fetched 2026-10-16.
No third-party sources were used: the Google Places lookup needs
GOOGLE_PLACES_API_KEY, which is not configured on this machine, and a therapy
practice should not display client testimonials anyway (NASW Code of Ethics 4.07
on testimonials). Every fact below is traceable to the existing site.

## Identity
- Name: Winchester Therapy Services LLC
- Owner / clinician: Michael Ellis, LCSW (Licensed Clinical Social Worker)
- Category: Individual therapy / counseling private practice
- Tagline: "Renew Your Mind, Heal Your Soul"
- Welcome copy: "Welcome to a therapy experience designed just for you. I'm Michael Ellis, LCSW, committed to helping you broaden your perspective and discover peace and purpose as you move forward in your life."
- Meta description on the live site: "Professional therapy services in Winchester, VA with Michael Ellis, LCSW. Specializing in anxiety, depression, trauma, and relationship issues."

## Contact
- Address: 1220 Amherst Street, Floor 2, Winchester, VA 22601
- Phone: (540) 431-7376  (tel:+15404317376)
- Email: Michaelfellislcsw@gmail.com
- Hours: not published on the site. (The consultation calendar reads Mike's weekly schedule and out-of-office dates live from Airtable; the code fallback is Mon-Fri 9:00 AM-5:00 PM Eastern.)
- Session formats offered in the intake form: In-Person, Telehealth/Video, Either.
- Intake form state options (where clients live): VA, MD, WV, DC. No licensure claim beyond LCSW is published, so the site must not claim multi-state licensure.

## Services / what the practice offers
- Ongoing therapy sessions booked through Headway (billing, insurance, scheduling):
  https://care.headway.co/providers/michael-ellis-2?utm_source=pem&utm_medium=direct_link&utm_campaign=46377
  Copy: "We partner with Headway.co for billing, insurance, and scheduling. Their team is highly responsive. If you have any questions about appointments or billing, feel free to give us a call, we'll get back to you within 24 hours."
- Free 15-minute consultation: "Not sure if we're the right fit? Schedule a complimentary 15-minute consultation to meet Michael, discuss your goals, and see if his approach aligns with your needs, no commitment required."
  Booked through the site's own form (Airtable backend): required name, email, phone, city, state, gender, reason for visit, preferred date + time (Eastern); optional DOB month/year, ZIP, address, session format, questions; three consent checkboxes. Success message: "Thank you! Your consultation request has been submitted. We'll contact you within 24 hours to confirm your appointment."
- Areas of concern listed in the intake form: Anxiety; Depression; Relationship Issues; Trauma/PTSD; Grief/Loss; Stress Management; Life Transitions; Family Issues; Work/Career Issues; Self-Esteem; Just exploring therapy options.

## Approach (verbatim from the site)
"My counseling approach combines elements of Cognitive Behavioral Therapy (CBT) and Solution-Focused Brief Therapy (SFBT), with additional influence from Motivational Interviewing techniques."

"Above all, I want you to feel truly cared for, heard, and valued during our time together. If, at the end of a session, you don't feel that way, then I want to know, because something has gone wrong. My priority is to get it right for you, and if I'm not the best fit, I'll gladly connect you with a trusted therapist in my network who can better meet your needs."

## About: Background (verbatim from the site)
- Born in Alexandria, VA, in 1981; moved to Mentor, OH (a Cleveland suburb) in 1985. Grew up in a loving home with his parents and two younger brothers.
- Church emphasized monthly service projects; developed a deep appreciation for people of all backgrounds, compassion for individuals regardless of gender, nationality, or identity.
- Baptist Bible College, Clarks Summit, PA: Bachelor of Science in Bible, 2003.
- Assistant Pastor, Front Royal, VA, 2003-2005.
- Police Officer, Winchester, VA, 2005-2007.
- Winchester Department of Social Services, Foster Care Worker, 2007-2016 (nine years helping vulnerable children and families).
- Master of Social Work, West Virginia University, 2011.
- 2016: Therapeutic Day Treatment Counselor, National Counseling Group (NCG); over the next three years also In-Home Counselor and Clinical Supervisor.
- Obtained LCSW; joined Exhale Behavioral Health in 2019, Independent Therapist until 2025.
- 2025: Winchester Therapy Services LLC (this practice).

## About: Personal Life (verbatim)
"Michael married Jennifer in 2003, and together they have raised five wonderful children, who now range in age from 11 to 19. Reflecting on his family's impact, Michael shares, 'My family and children take up the bulk of my time, and I am grateful for their support. They have given me invaluable experience that strengthens my ability to help others as a counselor.'"

## Photos (all owned by the business, shipped in this repo)
- /images/boat-on-lake.jpg  2000x1215 landscape  (current hero; alt "Peaceful therapy environment")
- /images/bench-scene.jpg   2000x1333 landscape  (in the repo but unused on the live site)
- /images/michael-ellis.jpg 322x519 portrait     (profile photo, low resolution; keep display width <= 320px)
Originals: Boat_on_lake.jpg (8.8 MB), Bench_Scene.jpg (5.7 MB), Profile_Aug2018.jpg, left in place.

## Brand
- Current palette: plum #6b5b73 (primary, theme colour), light plum #8a7a94, parchment #f7f5f3 background, text #4a4a4a, sand #d4c4a8 / caramel #c8a882 / brown #8b6f47 (buttons, hero gradient), lake blue #6b8db5 / #7a8ca8.
- Current fonts: Inter only (a build-skill banned font).
- Logo: none. Favicon is a plum monogram "W" (src/app/icon.svg).

## Reviews / social proof
None gathered, none to display. Rating and review counts must not be invented.

## Social media
None published on the site. Do not add icons.

## Location embed
No Google Maps CID available (no Places key). The live site embeds a coordinate-based iframe whose embedded DMS string decodes to 38°07'N, not Winchester (39.18°N). Use an exact-street-address embed instead and verify the pin visually.

## Backend already in place (keep, do not rebuild)
- POST /api/consultation -> Airtable (consultation requests)
- GET /api/availability -> Airtable Weekly Schedule + Out of Office, 5-minute cache, default-schedule fallback
- src/lib/availability.ts, src/lib/availability-server.ts, src/components/ui/booking-calendar.tsx
- Env: AIRTABLE_TOKEN, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME (Vercel, Mike's account)
