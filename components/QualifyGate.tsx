'use client'

/**
 * QualifyGate — 3-question pre-form micro-commitment.
 *
 * Renders three checkboxes ABOVE the waitlist form (Age 30+ / Symptoms from
 * list / California resident). When the visitor checks all three, the gate
 * collapses, a "You may be a fit. Lock founding pricing below." confirmation
 * line slides in, and the children (the actual waitlist form) reveal.
 *
 * COMPLIANCE: This is a UI gate, NOT data collection.
 *  - Checkbox state lives only in component memory (`useState`).
 *  - Nothing is POST'd to any endpoint when boxes are checked.
 *  - Nothing is written to localStorage, sessionStorage, cookies, or analytics.
 *  - No PHI / no health data ever leaves the browser.
 *  - The "symptoms" item lists categories generically; checking it asserts
 *    nothing legally and reports nothing.
 *
 * The form INSIDE this gate (passed as children) collects email + opt-in
 * preferences only — that's the existing PreLaunchWaitlist component, which
 * has its own consent flow and never collects health data. This gate sits
 * in front of it as a friction-removing micro-commitment, not a data step.
 *
 * Conversion thesis: small Yes-Yes-Yes commitments before the form lift form
 * completion. Visitors self-select as a fit before being asked to type
 * anything, which raises perceived value of completing the form below.
 */

import { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'

interface QualifyGateProps {
  /** The form to reveal once all three boxes are checked. */
  children: ReactNode
  /** Optional title override above the gate. */
  title?: string
  /** Optional className for the outer wrapper. */
  className?: string
}

const QUESTIONS: { id: 'age' | 'symptoms' | 'state'; label: ReactNode; sub?: string }[] = [
  {
    id: 'age',
    label: <>I'm <strong className="text-[#d8cfbe] font-semibold">30 or older</strong>.</>,
  },
  {
    id: 'symptoms',
    label: (
      <>
        I'm dealing with one or more of:
      </>
    ),
    sub: 'Low energy, brain fog, lower libido, slower recovery, body-composition changes, mood changes, sleep disruption, or persistent weight that won\'t shift with diet/exercise.',
  },
  {
    id: 'state',
    label: (
      <>
        I'm a <strong className="text-[#d8cfbe] font-semibold">California resident</strong>.
      </>
    ),
    sub: 'Bloom Metabolics begins enrollment in California at launch; additional states will follow.',
  },
]

export default function QualifyGate({ children, title, className = '' }: QualifyGateProps) {
  const [checked, setChecked] = useState<Record<'age' | 'symptoms' | 'state', boolean>>({
    age: false,
    symptoms: false,
    state: false,
  })

  const allChecked = checked.age && checked.symptoms && checked.state

  const toggle = (id: 'age' | 'symptoms' | 'state') => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className={className}>
      {/* ── Qualify gate ── */}
      <div
        className={[
          'bg-[#0d0c0a] border border-[#1a1814] rounded-2xl p-7 sm:p-8 transition-opacity duration-300',
          allChecked ? 'opacity-90' : 'opacity-100',
        ].join(' ')}
        aria-label="Self-qualification micro-commitment (no data is collected or transmitted)"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-mono text-gold tracking-[0.22em] uppercase">
            30-second check
          </span>
        </div>
        <h2
          className="text-[20px] sm:text-[22px] text-[#d8cfbe] mb-1"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
        >
          {title ?? 'Do I qualify?'}
        </h2>
        <p className="text-[12px] text-[#8a8268] font-light mb-6">
          Three quick yes/nos before the form. Nothing is stored or transmitted — this is just a UI check.
        </p>

        <ul className="space-y-3">
          {QUESTIONS.map((q) => {
            const isOn = checked[q.id]
            return (
              <li key={q.id}>
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={isOn}
                  onClick={() => toggle(q.id)}
                  className={[
                    'w-full text-left flex items-start gap-3 p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer',
                    isOn
                      ? 'bg-[#1a1814]/60 border-[#d8cfbe]/40'
                      : 'bg-transparent border-[#1a1814] hover:border-[#3a3630]',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-colors',
                      isOn
                        ? 'bg-gold/90 border-gold text-[#020202]'
                        : 'bg-transparent border-[#3a3630]',
                    ].join(' ')}
                    aria-hidden="true"
                  >
                    {isOn ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : null}
                  </span>
                  <span className="flex-1">
                    <span className="block text-[14px] sm:text-[15px] text-[#d8cfbe] leading-snug">
                      {q.label}
                    </span>
                    {q.sub ? (
                      <span className="block text-[11.5px] sm:text-[12px] text-[#8a8268] mt-1 font-light leading-relaxed">
                        {q.sub}
                      </span>
                    ) : null}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        {/* Hint chevron when not all checked */}
        {!allChecked ? (
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#6d6552] mt-6">
            <span>Check all three to unlock the form</span>
            <ChevronDown className="w-3 h-3" />
          </div>
        ) : null}
      </div>

      {/* ── Reveal: confirmation + form ── */}
      <div
        className={[
          'overflow-hidden transition-[max-height,opacity,margin] duration-500',
          allChecked ? 'max-h-[2400px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0',
        ].join(' ')}
        aria-hidden={!allChecked}
      >
        {/* Eligibility-confirmation flag, non-binding. */}
        <div className="bg-[#0d0c0a] border border-gold/30 rounded-2xl p-5 sm:p-6 mb-6">
          <p
            className="text-[15px] sm:text-[16px] text-[#d8cfbe]"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
          >
            You may be a fit. <em className="italic text-gold">Lock founding pricing below.</em>
          </p>
          <p className="text-[12px] text-[#8a8268] font-light mt-2 leading-relaxed">
            Final eligibility is determined by a licensed physician after evaluation. This 30-second
            check is a preview, not a prescription.
          </p>
        </div>

        {/* The actual form lives here */}
        <div className="bg-[#0d0c0a] border border-[#1a1814] rounded-2xl p-7 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
