'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function UnsubscribeContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  const [confirmed, setConfirmed] = useState(false)
  const [processing, setProcessing] = useState(false)

  async function handleUnsubscribe() {
    setProcessing(true)
    try {
      await fetch('/api/communications/opt-out', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, channel: 'all' }),
      })
    } catch {}
    setConfirmed(true)
    setProcessing(false)
  }

  return (
    <section className="bg-[#020202] min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto px-6 text-center">
        {confirmed ? (
          <>
            <h1 className="text-[1.5rem] text-white font-light mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              You&apos;ve been unsubscribed
            </h1>
            <p className="text-[14px] text-[#8a8268] font-light">
              You will no longer receive marketing communications from Bloom Metabolics.
              Clinical communications related to active treatment are not affected.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-[1.5rem] text-white font-light mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Unsubscribe from Bloom Metabolics
            </h1>
            <p className="text-[14px] text-[#8a8268] font-light mb-6">
              Click below to stop receiving marketing emails and text messages.
              {email && <> This will unsubscribe <strong className="text-[#d8cfbe]">{email}</strong>.</>}
            </p>
            <button
              onClick={handleUnsubscribe}
              disabled={processing}
              className="bloom-btn disabled:opacity-50"
            >
              {processing ? 'Processing...' : 'Confirm Unsubscribe'}
            </button>
          </>
        )}
      </div>
    </section>
  )
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020202]" />}>
      <UnsubscribeContent />
    </Suspense>
  )
}
