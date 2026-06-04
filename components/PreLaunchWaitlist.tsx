'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Loader2, CheckCircle } from 'lucide-react'

const INTERESTS = [
  { value: '', label: 'Select area of interest (optional)' },
  { value: 'trt', label: 'Testosterone Therapy (TRT)' },
  { value: 'glp1', label: 'GLP-1 Weight Management' },
  { value: 'sexual-health', label: 'Sexual Health' },
  { value: 'longevity', label: 'Longevity (NAD+, Glutathione)' },
  { value: 'peptides', label: 'Peptide Therapy' },
  { value: 'not-sure', label: 'Not sure yet' },
]

const SOURCES = [
  { value: '', label: 'How did you find us? (optional)' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'google', label: 'Google' },
  { value: 'referral', label: 'Referral' },
  { value: 'other', label: 'Other' },
]

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

interface PreLaunchWaitlistProps {
  /** Compact = inline form (home page section). Full = standalone (/join page). */
  variant?: 'compact' | 'full'
  className?: string
}

export default function PreLaunchWaitlist({ variant = 'compact', className }: PreLaunchWaitlistProps) {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [interest, setInterest] = useState('')
  const [source, setSource] = useState('')
  const [submitState, setSubmitState] = useState<SubmitState>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setSubmitState('submitting')

    try {
      const res = await fetch('/api/prelaunch-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName: firstName || undefined,
          interest: interest || undefined,
          source: source || undefined,
          landingPage: window.location.pathname,
          referrer: document.referrer || undefined,
        }),
      })

      if (res.ok) {
        setSubmitState('success')
      } else {
        setSubmitState('error')
      }
    } catch {
      setSubmitState('error')
    }
  }

  if (submitState === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={className}
      >
        <div className="flex items-center gap-3 mb-3">
          <CheckCircle className="w-5 h-5 text-gold" />
          <span className="text-[15px] text-[#d8cfbe] font-medium">You&apos;re on the list.</span>
        </div>
        <p className="text-[14px] text-[#8a8268] leading-relaxed font-light">
          Check your inbox for a welcome email from Brian. Enrollment opens July 15, 2026.
        </p>
      </motion.div>
    )
  }

  const isCompact = variant === 'compact'

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      <div className={isCompact ? 'space-y-3' : 'space-y-4'}>
        {/* Email — required */}
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="waitlist-input w-full"
          aria-label="Email address"
        />

        {/* First name — optional */}
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name (optional)"
          className="waitlist-input w-full"
          aria-label="First name"
        />

        {!isCompact && (
          <>
            {/* Interest — optional */}
            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="waitlist-input w-full"
              aria-label="Area of interest"
            >
              {INTERESTS.map((i) => (
                <option key={i.value} value={i.value}>{i.label}</option>
              ))}
            </select>

            {/* Source — optional */}
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="waitlist-input w-full"
              aria-label="How did you find us"
            >
              {SOURCES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </>
        )}

        <button
          type="submit"
          disabled={submitState === 'submitting' || !email}
          className="bloom-btn w-full justify-center disabled:opacity-50"
        >
          {submitState === 'submitting' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Joining...
            </>
          ) : (
            <>
              Join Waitlist
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>

        {submitState === 'error' && (
          <p className="text-[12px] text-red-400 text-center">
            Something went wrong. Please try again or email brian@bloommetabolics.com directly.
          </p>
        )}

        <p className="text-[11px] text-[#2a2620] text-center font-light leading-relaxed">
          No health information collected. Email and optional preferences only.
          Unsubscribe anytime.
        </p>
      </div>
    </form>
  )
}
