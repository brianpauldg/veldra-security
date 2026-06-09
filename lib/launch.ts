// ─────────────────────────────────────────────────────────────
// Bloom Metabolics — Launch / Founding Cohort Config
// ─────────────────────────────────────────────────────────────
// Single source of truth for the launch banner, the founding-member
// scarcity counter, the hero pricing anchor, and any other launch-time
// promotion copy. Every place on the site that shows the launch date,
// the "from $348/mo" line, the founding-member promo, or the cohort
// counter reads from this file.
//
// ─── HOW TO UPDATE ──────────────────────────────────────────
//
// Launch date moves:    edit LAUNCH_DATE_ISO + LAUNCH_DATE_DISPLAY.
// Price changes:        edit MEMBERSHIP_FROM_DISPLAY + MEMBERSHIP_FROM_NOTE.
// Promo on/off:         toggle FIRST_MONTH_PROMO.active (true|false).
// Promo amount/copy:    edit FIRST_MONTH_PROMO.{percentOff,applies,disclaimer}.
// Cohort counter:       decrement FOUNDING_COHORT.spotsRemaining +
//                       bump FOUNDING_COHORT.lastUpdatedISO. Weekly cadence.
//
// Commit + push to main. Vercel deploys in ~60s.
//
// HONEST SCARCITY ONLY. Never fake the cohort number or back-date the
// promo. The cohort cap is real because:
//   - It protects the response-time promise (founders' tier comes with
//     "first in line for physician availability").
//   - It bounds onboarding load for the small clinical team at launch.
//   - It justifies the locked founding-member price for the early cohort.
//
// If `spotsRemaining` hits 0, the counter component displays "Cohort
// closed — join the waitlist for the next opening." No code change
// needed for that transition.
//
// ─────────────────────────────────────────────────────────────

// ─── Launch date ────────────────────────────────────────────
/** ISO date the consumer-facing waitlist converts to enrollment. */
export const LAUNCH_DATE_ISO = '2026-07-15'
/** Human-formatted version used in copy (e.g. banner, hero). */
export const LAUNCH_DATE_DISPLAY = 'July 15, 2026'

// ─── Membership entry-price anchor ──────────────────────────
/** Lowest practical all-in monthly figure across published tiers + add-ons.
 *  Source: lib/pricing.ts (Essentials $149 + TRT add-on $199 = $348). If
 *  pricing changes, sync this constant — the hero pricing line, launch
 *  banner, and any other on-site price anchor all read from it. */
export const MEMBERSHIP_FROM_DISPLAY = '$348/mo'
/** Short clarifier appended after the price. */
export const MEMBERSHIP_FROM_NOTE = 'all-in, medication included'

// ─── First-month promotional discount ───────────────────────
export interface LaunchPromo {
  /** Toggle to hide the promo without removing the code. */
  active: boolean
  /** Whole-number percent off (e.g. 20 → "20% off"). */
  percentOff: number
  /** What the discount applies to. Used inline in banner copy. */
  applies: string
  /** Asterisk footnote rendered under the promo line. Should cover ALL
   *  conditions — medical eligibility, qualifying tiers, etc. */
  disclaimer: string
}

/** Active at launch: 20% off first month for founding members. The
 *  promo is applicable when the visitor either (a) medically qualifies
 *  for treatment OR (b) joins at a qualifying membership tier. */
export const FIRST_MONTH_PROMO: LaunchPromo = {
  active: true,
  percentOff: 20,
  applies: 'your first month',
  disclaimer:
    'Applicable if eligible for treatment, or qualifying membership tiers (qualifying membership tiers start at flagship).',
}

// ─── Founding cohort scarcity counter ───────────────────────
export interface FoundingCohort {
  /** Total seats in the founding-member cohort. Fixed at launch design time. */
  cohortSize: number
  /** Seats currently still available. Update by hand. */
  spotsRemaining: number
  /** ISO date (YYYY-MM-DD) of the most recent honest update to the count. */
  lastUpdatedISO: string
}

export const FOUNDING_COHORT: FoundingCohort = {
  cohortSize: 50,
  spotsRemaining: 50, // ← UPDATE WEEKLY BY HAND
  lastUpdatedISO: '2026-06-09',
}

/** Convenience: derived spots claimed (cohortSize - spotsRemaining). */
export function spotsClaimed(c: FoundingCohort = FOUNDING_COHORT): number {
  return Math.max(0, c.cohortSize - c.spotsRemaining)
}

/** Convenience: claimed-percentage 0–100 for the progress bar fill. */
export function claimedPercent(c: FoundingCohort = FOUNDING_COHORT): number {
  if (c.cohortSize <= 0) return 0
  return Math.min(100, Math.max(0, (spotsClaimed(c) / c.cohortSize) * 100))
}

/** Whether the cohort is fully claimed (counter displays the closed state). */
export function isCohortClosed(c: FoundingCohort = FOUNDING_COHORT): boolean {
  return c.spotsRemaining <= 0
}
