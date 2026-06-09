/**
 * FoundingMemberCounter — honest scarcity bar under the /join headline.
 *
 * Renders the founding-cohort counter in three states:
 *   1. spotsRemaining > 0  →  "Founding-member pricing is capped at our
 *                              first cohort of {N}. {M} spots remain."
 *                              + progress bar showing claimed-vs-total.
 *   2. spotsRemaining === 0 → "Founding-member cohort is closed — join
 *                              the waitlist for the next opening."
 *
 * Honest scarcity only. The number is read from lib/launch.ts —
 * update the constant there to change what visitors see. NEVER fake it.
 *
 * Server component (no client JS). Renders inline as a single block of
 * markup so it never causes layout shift and never delays first paint.
 */

import { Sparkles, Lock } from 'lucide-react'
import {
  FOUNDING_COHORT,
  claimedPercent,
  isCohortClosed,
} from '@/lib/launch'

interface FoundingMemberCounterProps {
  className?: string
}

export default function FoundingMemberCounter({
  className = '',
}: FoundingMemberCounterProps) {
  const closed = isCohortClosed()
  const pct = claimedPercent()
  const { cohortSize, spotsRemaining, lastUpdatedISO } = FOUNDING_COHORT

  return (
    <div
      className={`relative rounded-xl border border-gold/30 bg-[#0d0c0a]/80 px-4 py-3 sm:px-5 sm:py-4 ${className}`}
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex-shrink-0">
          {closed ? (
            <Lock className="w-4 h-4 text-gold" />
          ) : (
            <Sparkles className="w-4 h-4 text-gold" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          {closed ? (
            <p className="text-[13px] sm:text-[14px] text-[#d8cfbe] leading-snug">
              <strong className="font-semibold">Founding-member cohort is closed.</strong>{' '}
              <span className="text-[#a89878]">
                Join the waitlist for the next opening.
              </span>
            </p>
          ) : (
            <>
              <p className="text-[13px] sm:text-[14px] text-[#d8cfbe] leading-snug">
                Founding-member pricing is capped at our first cohort of{' '}
                <strong className="font-semibold">{cohortSize}</strong>.{' '}
                <span className="text-gold font-semibold">
                  {spotsRemaining} {spotsRemaining === 1 ? 'spot' : 'spots'} remain.
                </span>
              </p>

              {/* Progress bar — claimed (filled) vs remaining (track). */}
              <div
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={cohortSize}
                aria-valuenow={cohortSize - spotsRemaining}
                aria-label={`${cohortSize - spotsRemaining} of ${cohortSize} founding-member spots claimed`}
                className="mt-2.5 h-1.5 w-full rounded-full bg-[#1a1814] overflow-hidden"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold/80 to-gold transition-[width] duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </>
          )}

          <p className="mt-2 font-mono text-[10px] text-[#6d6552] tracking-[0.15em] uppercase">
            Updated {lastUpdatedISO}
          </p>
        </div>
      </div>
    </div>
  )
}
