# Design decisions: Winchester Therapy Services (Klaudius rebuild, 2026-10-16)

## What /ui-ux-pro-max recommended
`search.py "therapy counseling private practice calm warm trustworthy" --design-system`
returned: pattern "Social Proof-Focused + Conversion", style "Soft UI Evolution",
palette sky blue #0EA5E9 / #38BDF8 with yellow #FBBF24 CTA on #F0F9FF, fonts
Varela Round / Nunito Sans.

Rejected: two rounded sans faces break the build skill's serif/sans mandate and
read as a children's or SaaS product; the blue-and-yellow palette discards the
practice's existing plum-and-sand identity; "social proof-focused" is wrong for a
therapy practice that cannot ethically show client testimonials.

## Typography search
`--domain typography` for "therapy counseling warm editorial humanist" and
"wellness clinic calm literary serif" surfaced Literata/Mulish ("Wellness Calm"),
Cormorant Garamond/Public Sans, Newsreader/Source Sans 3, Libre Bodoni/Public Sans.

- Literata and Newsreader are already the heading faces on other client sites
  (uniqueness rule), Cormorant is too thin and "luxury" for body-adjacent sizes,
  Bodoni is too fashion.
- Chosen: **Crimson Pro** (headings, with true italics for the tagline) and
  **Albert Sans** (body). Crimson Pro is on the build skill's distinctive list and
  unused by any other client site; its literary warmth suits a clinician whose
  path runs through pastoral work, social work and nine years in foster care.
  Albert Sans is a soft humanist-geometric sans, on no banned list, unused
  elsewhere.

## Palette (brand-colour override: keep the practice's own identity)
- plum ink  #3E3346  dark sections, headings
- plum      #6B5B73  mid accent (the current theme colour, kept)
- mauve     #8A7A94  secondary text on dark
- parchment #F6F1EA  page background
- cream     #FDFBF7  cards
- sand      #D9C7AC  rules, chips
- caramel   #8F6236  primary CTA (white text, 5.5:1)
- lake      #5B7A94  secondary accent, links on light (4.6:1)
- ink       #2B2530  body text

No purple gradients on white: plum is used as a solid dark field and the hero
photo carries a uniform plum wash. Sand and caramel are the warm counterweight.

## Layout
Editorial one-pager, section rhythm alternates full-bleed photo, split text and
portrait, dark field, timeline:
1. Fixed parchment nav with phone and a "Free consultation" CTA
2. Hero: lake photo under a 72% plum wash, eyebrow, Crimson Pro headline,
   welcome paragraph, two CTAs (free consultation, Headway)
3. Promise strip: three commitments lifted from the approach copy
4. Approach: portrait beside the CBT / SFBT / MI copy, three modality notes
5. Areas of focus: the intake form's eleven concerns as a chip list
6. Booking: the two real paths, Headway and the site's own consultation form
   (existing Airtable calendar, restyled, logic untouched)
7. Story: a vertical timeline of the published biography
8. Personal life pull-quote over the bench photo
9. Location and contact with an exact-address map embed
10. Footer with the referral-stamped "Built with Web Launch Academy" text link
Mobile: flush bottom CTA bar, hidden while the hero is on screen.

## Kept from the current site (not redesigned)
Airtable API routes and availability library, consultation form fields and
consent copy (the form posts to Mike's Airtable base), JSON-LD, robots, sitemap,
security headers, Vercel analytics.
