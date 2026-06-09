import Link from 'next/link'
import { ArrowRight, ClipboardCheck } from 'lucide-react'

/**
 * SymptomChecklistCTA — secondary, low-commitment conversion.
 *
 * Pairs with the primary "Join Waitlist" CTA at the bottom of every
 * treatment page, city page, and city × service page. Captures the ~90%
 * of visitors who aren't ready to commit but ARE willing to spend 2 min
 * on a symptom assessment — turning bounces into nurturable email leads.
 *
 * Routes:
 *   - TRT / hormone optimization → /quiz       (TRT symptom checklist)
 *   - GLP-1 / weight loss        → /glp1-quiz  (GLP-1 symptom checklist)
 *
 * Both quizzes already exist and already capture email + TCPA consent.
 *
 * Source: Bloom-Metabolics/08_Copy/trt-page-copy.md §"Symptom Checklist"
 *   ("Take the Free Assessment") — adapted as a secondary CTA.
 */

export type SymptomChecklistVertical = 'trt' | 'glp1' | 'hormone'

interface SymptomChecklistCTAProps {
  vertical: SymptomChecklistVertical
  className?: string
  /** Optional override copy for the headline (default tuned per vertical). */
  headlineOverride?: string
}

const COPY: Record<
  SymptomChecklistVertical,
  { headline: string; sub: string; cta: string; href: string }
> = {
  trt: {
    headline: 'Not ready to commit? Take the symptom checklist instead.',
    sub: 'A 2-minute, physician-designed assessment. Find out whether low testosterone is likely driving your symptoms — before you book anything.',
    cta: 'Take the Free TRT Assessment',
    href: '/quiz',
  },
  glp1: {
    headline: 'Not ready to commit? Take the symptom checklist instead.',
    sub: "A 2-minute assessment to see whether GLP-1 therapy is a fit for your weight history, metabolic profile, and goals — before you book anything.",
    cta: 'Take the Free GLP-1 Assessment',
    href: '/glp1-quiz',
  },
  hormone: {
    headline: 'Not ready to commit? Take the symptom checklist instead.',
    sub: 'A 2-minute, physician-designed assessment of hormone-related symptoms — fatigue, focus, libido, body composition, recovery. See where you stand before booking anything.',
    cta: 'Take the Free Hormone Assessment',
    href: '/quiz',
  },
}

export default function SymptomChecklistCTA({
  vertical,
  className = '',
  headlineOverride,
}: SymptomChecklistCTAProps) {
  const copy = COPY[vertical]
  return (
    <section
      className={`py-12 sm:py-16 lg:py-20 bg-[#050404] border-t border-white/5 ${className}`.trim()}
      aria-label="Secondary conversion: symptom checklist"
    >
      <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-[#0d0c0a]/60 mb-5">
          <ClipboardCheck className="w-3.5 h-3.5 text-gold" />
          <span className="text-[11px] font-medium text-[#8a8268] tracking-[0.18em] uppercase">
            2-minute assessment
          </span>
        </div>

        <h2
          className="text-[24px] sm:text-[28px] lg:text-[32px] text-chrome leading-tight font-light mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {headlineOverride ?? copy.headline}
        </h2>

        <p className="text-[14px] sm:text-[15px] text-[#8a8268] leading-relaxed max-w-xl mx-auto mb-7">
          {copy.sub}
        </p>

        <Link
          href={copy.href}
          className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full border border-[#d8cfbe]/40 bg-transparent text-[#d8cfbe] text-[13px] sm:text-[14px] font-medium uppercase tracking-[0.1em] hover:bg-[#d8cfbe] hover:text-[#020202] hover:border-[#d8cfbe] transition-all"
        >
          {copy.cta} <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <p className="text-[11px] text-[#6d6552] mt-5 leading-relaxed">
          Free. No commitment. Results in 2 minutes.
        </p>
      </div>
    </section>
  )
}
