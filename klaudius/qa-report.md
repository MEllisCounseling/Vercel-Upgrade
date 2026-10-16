# QA Report: Winchester Therapy Services LLC
Date: 2026-10-16
Reviewer: Independent QA Agent
Project: /tmp/claude-1000/-home-ellis-clients-winchester-therapy/e50fc439-f136-488d-b2a2-56ff43c585bc/scratchpad/rebuild

## Verdict: PASS (with minor issues; owner approval items below)

Build succeeded (13 static pages), `next start` served HTTP 200, 6 standard + 3 extra screenshots captured and viewed. Mobile overflow check returned `[]`. No fontFamily overrides, no `\u20` escapes, no em/en dashes in src. Referral stamp check: ref=YMQMF83P OK. One h1, html lang="en", overflow-x: clip present, no multi-column galleries, no scroll animations.

## Issues Found
### Critical (must fix before deploy)
- None.

### Minor (should fix)
- Consultation modal does not close on the Escape key (`src/components/ui/consultation-modal.tsx`; no keydown/Escape handler, verified: pressing Escape leaves `[role=dialog]` count at 1). The X ("Close", line ~211) and Cancel buttons do close it (verified, dialog count 0). Also no focus trap/initial focus management found. Keyboard users are affected.
- Only `.btn:focus-visible` is styled in `src/app/globals.css` (line 86); no general focus ring for text links, nav links, form inputs found by grep.
- Map pin not visually verified: the location section was not captured (scrollIntoView on the extra capture did not move the page). Embed uses an exact street address (`site.ts` mapEmbedUrl `q=1220 Amherst Street, Winchester, VA 22601`), which is the correct kind of embed, but the pin should be eyeballed once.
- Console noise in local run only: 404s for `/_vercel/insights/script.js` and `/_vercel/speed-insights/script.js` (expected off Vercel, fine in production); a preload warning for `/_next/image?url=/images/boat-on-lake.jpg` ("preloaded but not used"), minor perf warning.
- Photos: 3 gathered photos, all 3 used (hero lake, bench, portrait). Portrait is 322px wide, shown at max 320px, OK. `public/images/` still holds unused large originals (Boat_on_lake.jpg, Bench_Scene.jpg, Profile_Aug2018.jpg, WLA logos); not a rendering problem, only repo weight.
- Mobile top: hero "Contact" fact is cut by the fold at 844px height (acceptable, scrolls).
- Privacy/Terms behave correctly: solid header, readable ~48rem column, footer links (Privacy, Terms, Contact `/#contact`, nav `/#...`) are root-relative; brand/logo link back home should be confirmed by owner (not separately clicked). Content consistent with backend (Airtable form, Vercel Analytics + Speed Insights, Google Maps, Headway). No contradictions found. Privacy says calendar view "sends nothing about you" which matches the read-only GET /api/availability.

### Needs owner approval (new wording or unverifiable claims)
Wording not in `gathered-content.md` (some may exist on the live site, but is not in the gathered file):
- Booking intro: "Ready to take the next step in your healing journey? Choose your preferred way to book your appointment."
- Headings: "Free 15-Minute Consultation", "Book Through Headway", "What would you like to discuss?" (areas heading, disclosed in design notes), "Location and Contact", "Schedule Your Appointment", "My Counseling Approach", "More About Michael Ellis, LCSW" (the last three are named as original in design notes but not in the gathered file).
- Hero facts strip: "Michael Ellis, LCSW, Licensed Clinical Social Worker"; footer: "Michael Ellis, LCSW | Licensed Clinical Social Worker".
- Booking card note: "Questions? Call (540) 431-7376"; buttons "Get directions", "Call the office"; mobile bar "Call" / "Free Consultation".
- Modal: "Sent over a secure connection and used only to schedule your consultation. No insurance information is needed."; "Required information"; "Optional, but helpful"; "These fields help us better prepare for your consultation, but are not required."; "Loading calendar..."; consent checkbox lines ("I understand this is a free 15-minute consultation ...", "I understand that my information will be kept confidential ...", "I consent to being contacted ...") are said to be kept from the form but the gathered file does not quote them. The "secure connection" and "No insurance information" claims are new.
- About timeline: gathered file only summarises; these full paragraphs are not in it and need checking against the live site: "From an early age, Michael was actively involved in his community... His innate desire to support and uplift others became a defining part of his character."; "Michael continued to refine these qualities during his college years..."; "Seeking a new path, Michael transitioned into law enforcement... However, he soon realized that his true calling lay elsewhere..."; "Building on his experience, Michael shifted into a therapeutic role in 2016..."; "After completing the necessary supervision and obtaining his Licensed Clinical Social Worker (LCSW) title ... helping individuals navigate life's challenges with empathy and expertise." Timeline labels "Early years" and "Background".
- Footer labels/phrases: "On this page", "Reach the office".
- Legal pages: all of /privacy and /terms is new text (e.g. "Effective October 16, 2026", "We do not sell your information, share it with advertisers, or add you to a mailing list", "These tools do not use cookies", "We keep consultation requests for as long as needed...", "call or text 988 ... or call 911", Governing law "Commonwealth of Virginia ... courts serving Winchester, Virginia", "Your consultation is confirmed only when we contact you to confirm it.", "We may decline or cancel a consultation when the practice is not the right fit..."). Retention, no-cookie, no-sale, governing-law and liability statements are factual or legal claims the owner/counsel must confirm before launch.
- Hero alt text and bench alt text ("A wooden bench beneath trees overlooking open country") are new.
- Metadata: description prefixed with "Renew Your Mind, Heal Your Soul. " (published description otherwise). JSON-LD type MedicalBusiness.

## Checklist Results
Photos: 5/6 checks passed (map/pin not visually checked is counted under Design)
Content: 8/9 checks passed (new wording listed above; no testimonials, no invented ratings; name, phone, address, email correct)
Design: 17/20 checks passed (Escape key, focus styles, map pin unverified)

## Overall Assessment
A polished, bespoke editorial one-pager: Crimson Pro / Albert Sans, plum-and-caramel identity, uniform plum wash keeps hero text readable, sticky mobile bar is hidden over the hero and flush to the edges, nothing overflows at 390px. Legal pages render cleanly and match the site's actual behavior. Remaining work is keyboard accessibility of the modal and getting the owner to approve the new wording and legal text.
