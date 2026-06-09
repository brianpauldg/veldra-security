// ─────────────────────────────────────────────────────────────
// Bloom Metabolics — Launch / Founding Cohort Config
// ─────────────────────────────────────────────────────────────
// Single source of truth for the founding-member scarcity counter.
// Every place on the site that shows "{N} spots remain" reads from here.
// ─────────────────────────────────────────────────────────────
//
// HOW TO UPDATE THE COUNTER (weekly cadence):
//
//   1. Decrement `FOUNDING_COHORT.spotsRemaining` to the new honest count.
//   2. Update `lastUpdatedISO` to today's date (YYYY-MM-DD).
//   3. Commit + push to main. Vercel deploys in ~60s.
//
// Honest scarcity only. NEVER fake the number — the cohort cap is real
// because:
//   - It protects the response-time promise (founders' tier comes with
//     "first in line for physician availability").
//   - It bounds onboarding load for the small clinical team at launch.
//   - It justifies the locked founding-member price for the early cohort.
//
// If `spotsRemaining` hits 0, the counter will display "Cohort closed —
// join the waitlist for the next opening." Behavior baked into the
// component, no code change needed.
//
// ─────────────────────────────────────────────────────────────

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
