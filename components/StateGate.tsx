'use client'

import { useState, type ReactNode } from 'react'
import { isEligibleState, ELIGIBLE_STATES, getStateName } from '@/config/eligible-states'
import { ArrowRight, MapPin } from 'lucide-react'

interface StateGateProps {
  children: ReactNode
  source?: string
}

const ALL_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY',
  'LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
  'OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC',
]

export default function StateGate({ children, source = 'intake' }: StateGateProps) {
  const [selectedState, setSelectedState] = useState('')
  const [gateResult, setGateResult] = useState<'pending' | 'eligible' | 'ineligible'>('pending')
  const [waitlistEmail, setWaitlistEmail] = useState('')
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false)

  function handleStateSubmit() {
    if (!selectedState) return
    if (isEligibleState(selectedState)) {
      setGateResult('eligible')
    } else {
      setGateResult('ineligible')
    }
  }

  async function handleWaitlist() {
    if (!waitlistEmail) return
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: waitlistEmail,
          source: `waitlist_${source}`,
          serviceInterest: 'general',
        }),
      })
    } catch {}
    setWaitlistSubmitted(true)
  }

  if (gateResult === 'eligible') {
    return <>{children}</>
  }

  if (gateResult === 'ineligible') {
    return (
      <div className="max-w-lg mx-auto text-center py-16 px-6">
        <MapPin className="w-8 h-8 text-[#8a8268] mx-auto mb-4" />
        <h2 className="text-[1.5rem] text-white font-light mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          We&apos;re not in {getStateName(selectedState)} yet
        </h2>
        <p className="text-[14px] text-[#d8cfbe] mb-2 font-light">
          Bloom Metabolics currently serves patients in {ELIGIBLE_STATES.map(s => getStateName(s)).join(', ')} only.
        </p>
        <p className="text-[13px] text-[#8a8268] mb-8 font-light">
          We&apos;re expanding as physician licensure allows. Join the waitlist and we&apos;ll notify you when we reach {getStateName(selectedState)}.
        </p>

        {waitlistSubmitted ? (
          <div className="rounded-xl border border-[#1a1814] bg-[#0d0c0a] p-6">
            <p className="text-[14px] text-[#d8cfbe]">You&apos;re on the list. We&apos;ll email you when we launch in {getStateName(selectedState)}.</p>
          </div>
        ) : (
          <div className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              value={waitlistEmail}
              onChange={(e) => setWaitlistEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 px-4 py-3 rounded-xl bg-[#0d0c0a] border border-[#1a1814] text-[14px] text-[#d8cfbe] placeholder-[#8a8268]/50 focus:outline-none focus:border-[#8a8268]"
            />
            <button
              onClick={handleWaitlist}
              className="bloom-btn"
            >
              Notify Me
            </button>
          </div>
        )}

        <button
          onClick={() => { setGateResult('pending'); setSelectedState('') }}
          className="text-[12px] text-[#8a8268] hover:text-[#d8cfbe] mt-6 transition-colors"
        >
          Select a different state
        </button>
      </div>
    )
  }

  // Pending — show state selector
  return (
    <div className="max-w-lg mx-auto text-center py-16 px-6">
      <MapPin className="w-8 h-8 text-[#8a8268] mx-auto mb-4" />
      <h2 className="text-[1.5rem] text-white font-light mb-3" style={{ fontFamily: 'var(--font-display)' }}>
        Where are you located?
      </h2>
      <p className="text-[14px] text-[#8a8268] mb-8 font-light">
        Bloom Metabolics is currently available to patients in select states. Let us know where you are.
      </p>

      <div className="flex gap-2 max-w-sm mx-auto">
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl bg-[#0d0c0a] border border-[#1a1814] text-[14px] text-[#d8cfbe] focus:outline-none focus:border-[#8a8268] appearance-none"
        >
          <option value="">Select your state</option>
          {ALL_STATES.map(s => (
            <option key={s} value={s}>{getStateName(s)}</option>
          ))}
        </select>
        <button
          onClick={handleStateSubmit}
          disabled={!selectedState}
          className="bloom-btn disabled:opacity-50"
        >
          Continue <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
