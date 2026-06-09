/**
 * LaunchBanner — top-of-page pre-launch banner.
 *
 * Renders three short lines:
 *   1. Launch date + entry membership price ("from $348/mo, all-in").
 *   2. Founding-member promo (gold accent) with an asterisk.
 *   3. Asterisk footnote (promo conditions) + the regulatory disclosure
 *      that no medical services are currently provided.
 *
 * All copy reads from `lib/launch.ts`. To change the date, price, promo
 * amount, or eligibility disclaimer, edit that one file — do not edit
 * this component. To pull the promo entirely, flip
 * `FIRST_MONTH_PROMO.active = false` in lib/launch.ts and the component
 * collapses to the date + price + disclosure only.
 *
 * Server component — zero client JS. Fixed in the document flow, so no
 * impact on LCP/CLS.
 */

import {
  LAUNCH_DATE_DISPLAY,
  MEMBERSHIP_FROM_DISPLAY,
  MEMBERSHIP_FROM_NOTE,
  FIRST_MONTH_PROMO,
} from '@/lib/launch'

export default function LaunchBanner() {
  const promoActive = FIRST_MONTH_PROMO.active

  return (
    <div className="bg-[#0a0906] border-b border-[#1a1814] py-3.5 px-6 text-center">
      {/* Line 1 — launch date + entry membership price */}
      <p className="text-[13px] text-[#d8cfbe] font-medium leading-relaxed max-w-3xl mx-auto">
        Bloom Metabolics launches {LAUNCH_DATE_DISPLAY}.{' '}
        <span className="font-light text-[#a89878]">
          Membership from{' '}
          <span className="text-[#d8cfbe] font-medium">{MEMBERSHIP_FROM_DISPLAY}</span>
          , {MEMBERSHIP_FROM_NOTE}.
        </span>
      </p>

      {/* Line 2 — founding-member promo (gold accent), with asterisk */}
      {promoActive ? (
        <p className="text-[12px] text-gold font-medium leading-relaxed max-w-3xl mx-auto mt-1.5">
          Founding-member offer: {FIRST_MONTH_PROMO.percentOff}% off{' '}
          {FIRST_MONTH_PROMO.applies}.<sup className="ml-0.5">*</sup>
        </p>
      ) : null}

      {/* Line 3 — combined asterisk footnote (if promo active) + regulatory disclosure */}
      <p className="text-[11px] text-[#8a8268] font-light leading-relaxed max-w-3xl mx-auto mt-1.5">
        {promoActive ? (
          <>
            <span className="text-[#a89878]">*</span>{' '}
            {FIRST_MONTH_PROMO.disclaimer}{' '}
          </>
        ) : null}
        No medical services are currently provided, and no health information is collected.
      </p>
    </div>
  )
}
