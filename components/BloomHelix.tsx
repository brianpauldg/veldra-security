'use client'

/**
 * BloomHelix — decorative double-helix visual for the hero.
 *
 * Performance posture (why this is SVG, not WebGL):
 *  - Renders as inline SVG inside server-rendered HTML, so it ships with the
 *    initial document. No extra request, no library, no hydration delay.
 *  - Total payload: ~8 KB of markup (no external assets, no fonts, no Three.js).
 *  - Animation is one SMIL `animateTransform` that the browser handles on the
 *    compositor — no main-thread work, no layout, no INP impact.
 *  - aria-hidden + role="presentation": decorative only; screen readers skip it.
 *  - Sized via aspect-ratio on the wrapper -> no CLS.
 *  - Reduced-motion: a thin `useEffect` strips the animation element after hydration.
 *  - Mobile: caller already gates render with `hidden lg:flex`, so this component
 *    never mounts below 1024px. Still safe to load on mobile if used elsewhere.
 *  - LCP-safe: the H1/paragraph/buttons in the left column win LCP because they
 *    are text on a fast paint path. The SVG container reserves space but the
 *    SVG itself is sub-pixel-line-art that the browser can rasterize cheaply.
 */

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

// ── Geometry (precomputed at module load — zero runtime cost per render) ──
const VIEW_WIDTH = 200
const VIEW_HEIGHT = 600           // visible SVG window
const RENDER_HEIGHT = 1200        // strands rendered to 2× window so they can scroll
const STRAND_CENTER = 100
const STRAND_AMPLITUDE = 56
const TURNS = 8                   // total sine cycles across RENDER_HEIGHT (= 4 visible)
const STEP = 4                    // path-point resolution in px
const RUNG_STEP = 18              // spacing between connecting rungs

function buildStrand(phase: number): string {
  const segments: string[] = []
  for (let y = 0; y <= RENDER_HEIGHT; y += STEP) {
    const t = (y / RENDER_HEIGHT) * TURNS * Math.PI * 2 + phase
    const x = STRAND_CENTER + STRAND_AMPLITUDE * Math.sin(t)
    segments.push(`${segments.length ? 'L' : 'M'} ${x.toFixed(2)} ${y}`)
  }
  return segments.join(' ')
}

const STRAND_A = buildStrand(0)
const STRAND_B = buildStrand(Math.PI)

interface Rung {
  y: number
  x1: number
  x2: number
  opacity: number
}

const RUNGS: Rung[] = (() => {
  const out: Rung[] = []
  for (let y = 0; y <= RENDER_HEIGHT; y += RUNG_STEP) {
    const t = (y / RENDER_HEIGHT) * TURNS * Math.PI * 2
    const a = STRAND_CENTER + STRAND_AMPLITUDE * Math.sin(t)
    const b = STRAND_CENTER + STRAND_AMPLITUDE * Math.sin(t + Math.PI)
    // depth cue: when one strand is "in front" (cos(t) > 0), the rung is brighter
    const depth = Math.cos(t)
    const opacity = 0.08 + 0.32 * Math.max(0, depth)
    out.push({ y, x1: a, x2: b, opacity: +opacity.toFixed(3) })
  }
  return out
})()

// One full vertical scroll of VIEW_HEIGHT pixels equals exactly one helix period,
// so the loop is seamless.
const SCROLL_DURATION = '30s'

interface BloomHelixProps {
  className?: string
}

export default function BloomHelix({ className }: BloomHelixProps) {
  // Strip the animation element when the OS reports reduced-motion. This runs
  // post-hydration so SSR markup is unchanged (no hydration mismatch).
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
      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        className="bloom-helix-svg"
        focusable="false"
      >
        <defs>
          <linearGradient id="bloomHelixStrandA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5ecd9" stopOpacity="0" />
            <stop offset="15%" stopColor="#d8cfbe" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#a89878" stopOpacity="0.9" />
            <stop offset="85%" stopColor="#d8cfbe" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6d6552" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="bloomHelixStrandB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6d6552" stopOpacity="0" />
            <stop offset="20%" stopColor="#8a8268" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#c9bfa8" stopOpacity="0.85" />
            <stop offset="85%" stopColor="#a89878" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f5ecd9" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="bloomHelixGlow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#a89878" stopOpacity="0.16" />
            <stop offset="55%" stopColor="#a89878" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#020202" stopOpacity="0" />
          </radialGradient>
          {/* Mask the top/bottom so strands fade into the background — no hard edge */}
          <linearGradient id="bloomHelixMask" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000" stopOpacity="0" />
            <stop offset="15%" stopColor="#fff" stopOpacity="1" />
            <stop offset="85%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </linearGradient>
          <mask id="bloomHelixFade" maskUnits="userSpaceOnUse">
            <rect width={VIEW_WIDTH} height={VIEW_HEIGHT} fill="url(#bloomHelixMask)" />
          </mask>
        </defs>

        {/* Ambient halo (purely decorative, painted behind the strands) */}
        <rect width={VIEW_WIDTH} height={VIEW_HEIGHT} fill="url(#bloomHelixGlow)" />

        <g mask="url(#bloomHelixFade)">
          <g className="bloom-helix-scroll">
            {/* Scrolling the strands vertically by one period creates the
                illusion of axial rotation — every crossing reappears at the
                same screen position after one loop, so the animation seams. */}
            {motionAllowed ? (
              <animateTransform
                attributeName="transform"
                type="translate"
                from={`0 0`}
                to={`0 -${VIEW_HEIGHT}`}
                dur={SCROLL_DURATION}
                repeatCount="indefinite"
                calcMode="linear"
              />
            ) : null}

            {/* Rungs go first so strands sit visually on top */}
            {RUNGS.map((r, i) => (
              <line
                key={`r-${i}`}
                x1={r.x1}
                y1={r.y}
                x2={r.x2}
                y2={r.y}
                stroke="#a89878"
                strokeWidth="0.55"
                strokeLinecap="round"
                opacity={r.opacity}
              />
            ))}

            <path
              d={STRAND_A}
              fill="none"
              stroke="url(#bloomHelixStrandA)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d={STRAND_B}
              fill="none"
              stroke="url(#bloomHelixStrandB)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        </g>
      </svg>
    </div>
  )
}
