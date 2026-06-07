'use client'

/**
 * BloomHelix — decorative DNA-helix visual for the hero.
 *
 * Renders a 3D-rendered helix image (warm cream backdrop, bronze rungs, glass
 * strands) and adds subtle motion + a fade mask so it integrates with the
 * dark hero background while preserving its 3D character. Positioned
 * diagonally across the hero by the caller via `.bloom-helix-diagonal`.
 *
 * Performance posture (Lighthouse must stay ≥90 mobile & desktop):
 *  - next/image with a static import → automatic AVIF/WebP variants + inline
 *    blurDataURL placeholder (paints instantly, upgrades to optimized image).
 *  - NOT marked `priority` — the hero H1 must win LCP, not the helix.
 *  - `sizes` returns 0 px below 1024 px so mobile fetches no bytes (matches
 *    the `hidden lg:flex` gate on the parent — belt + suspenders).
 *  - aria-hidden + role=presentation → decorative; screen readers skip it.
 *  - aspect-ratio on the wrapper reserves space → CLS = 0.
 *  - contain: layout paint isolates the subtree from the rest of the page.
 *  - Animation is pure compositor work (`transform`, `filter`) — no main-thread
 *    work, no INP impact.
 *  - Reduced-motion: a CSS media query strips the animation; the client effect
 *    also flips a class for completeness.
 */

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import dnaHelix from '../public/images/dna-helix.png'

interface BloomHelixProps {
  className?: string
}

export default function BloomHelix({ className }: BloomHelixProps) {
  const [motionAllowed, setMotionAllowed] = useState(true)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setMotionAllowed(!mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={cn('bloom-helix-wrap', className)}
    >
      <div className={cn('bloom-helix-frame', motionAllowed && 'is-animated')}>
        <Image
          src={dnaHelix}
          alt=""
          fill
          // Caller renders the helix only at lg+ via `hidden lg:flex`. Tell the
          // optimizer mobile needs 0 px so it never generates a mobile variant.
          // Desktop sizes match the wrapper's display widths (DPR-scaled by Next).
          sizes="(max-width: 1024px) 0px, (max-width: 1280px) 520px, 720px"
          quality={75}
          // No `priority` and explicit lazy loading + low fetch priority so the
          // browser deprioritizes this image vs. the H1's font/text paint.
          // The helix must not become the LCP element — that's the H1's job.
          loading="lazy"
          fetchPriority="low"
          className="bloom-helix-img"
        />
      </div>
    </div>
  )
}
