# QA Report: Winchester Therapy Services LLC
Date: 2026-10-16
Reviewer: Independent QA Agent

## Verdict: PASS

## Issues Found

### Critical (must fix before deploy)
- None. Name, phone (540) 431-7376, email, address (1220 Amherst Street, Floor 2, Winchester, VA 22601), Headway URL, approach wording, eleven areas of focus, and biography dates/places all trace to gathered-content.md or to the original site. Map pin verified visually on Amherst St, Winchester VA. GALLERY_VOID_PCT=0. Mobile overflow JSON = []. No em/en dashes in visitor-facing copy, no \u20 escapes, no fontFamily overrides, no "Scroll" cue, no demo/preview wording.

### Minor (should fix)
- Approach portrait caption "Michael Ellis, LCSW" renders on top of the decorative offset outline's bottom edge (src/components/sections/approach.tsx lines 28 and 38). Also it is a <figcaption> with no <figure> parent (invalid HTML), same lines.
- Several biography sentences are not in gathered-content.md (it condenses them) but ARE verbatim/near-verbatim in the original site's about.tsx: "true calling lay elsewhere", "required supervision", "empathy and expertise", "unique strengths and challenges" (src/components/sections/story.tsx lines 10, 20, 35). Traceable, so not critical; gathered-content.md is just incomplete.
- Invented explanatory copy for the three modalities (CBT/SFBT/MI notes) is not in gathered-content.md (src/components/sections/approach.tsx lines 7, 12, 17). Generic and accurate, but the clinician should approve it. Same for story.tsx line 40 ("built around the conviction...") and hero.tsx line 63 / 67 phrasing.
- Footer has no Privacy Policy, Terms of Service or Contact link, which the global footer standard requires (src/components/sections/footer.tsx). A "Contact" anchor exists in the footer nav list, but no privacy/terms pages exist. For a therapy practice collecting intake data, a privacy policy is advisable.
- Modal claim "This form is securely encrypted" (src/components/ui/consultation-modal.tsx line 226) is carried over from the old site; it is only TLS-in-transit. Consider softer wording for a health-adjacent form.
- Hero image preload warning in console ("preloaded but not used", boat-on-lake w=420) and 404s for /_vercel/insights and /_vercel/speed-insights scripts locally. The 404s are expected off-Vercel and should disappear on deploy.
- Left column under the portrait in the Approach section is a large empty area on desktop (cosmetic).

## Checklist Results
Photos: 7/7 checks passed (all 3 local photos used: hero lake, portrait, bench; no crop problems; portrait in 3/4 frame)
Content: 11/11 checks passed
Design: 20/22 checks passed (caption overlap, footer legal links)

## Overall Assessment
A calm, bespoke-feeling editorial site: plum/sand/caramel palette, Crimson Pro with Albert Sans, strong hero contrast, clean timeline, working modal and calendar at desktop and mobile widths, flush mobile CTA bar that hides over the hero. Facts are accurate and no invented credentials, reviews or ratings. Remaining items are polish only.
