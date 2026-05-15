# Pricing Page Copy Additions — Draft for Review

**Status:** DRAFT — awaiting Brian's review before committing to /pricing

---

## Line above pricing table

"Pricing reflected here is final as of pre-launch and may be refined before enrollment opens. Waitlist members will be the first to receive final pricing confirmation."

---

## Founder-direct note below pricing table

"Pricing built around clinical value, not subscription games. Every tier includes physician oversight and pharmacy fulfillment from a US-based 503A partner. Questions about the tier model? Reply directly to my welcome email — I read every one."

— Brian DeGuzman, RN

---

## CTA replacement

All tier CTAs ("Apply Now") become "Join Waitlist" routing to the PreLaunchWaitlist component (inline on the pricing page, scrolls to it).

---

## Implementation notes

- The line above appears as a single `<p>` in brass text, centered, above the PricingTable component
- The founder note appears as a styled blockquote-like element below the PricingTable, with Brian's name and credential
- Both use the warm palette (brass text on obsidian/ink background)
- No visual emphasis that reads as a disclaimer — this is a confident statement, not legal hedging
