'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Check } from 'lucide-react'
import { emailCaptureSchema, type EmailCaptureData } from '@/lib/types'
import { trackEvent, triggerNurtureSequence } from '@/lib/events'
import TCPAConsent, { type ConsentState, isConsentValid } from '@/components/TCPAConsent'
import { CURRENT_CONSENT_VERSION } from '@/lib/consent-text'

export default function EmailCapture() {
  const [submitted, setSubmitted] = useState(false)
  const [consent, setConsent] = useState<ConsentState>({ email: false, sms: false, version: CURRENT_CONSENT_VERSION })
  const [consentError, setConsentError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailCaptureData>({
    resolver: zodResolver(emailCaptureSchema),
  })

  async function onSubmit(data: EmailCaptureData) {
    if (!isConsentValid(consent, true, false)) {
      setConsentError('Please agree to receive email communications.')
      return
    }
    setConsentError('')

    trackEvent('email_subscribed', { email: data.email, serviceInterest: data.serviceInterest })
    triggerNurtureSequence(data.email, data.serviceInterest || 'general')

    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        source: 'email_capture',
        serviceInterest: data.serviceInterest || 'general',
        consent: { email: consent.email, version: consent.version },
      }),
    }).catch(() => {})

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center gap-2 py-4 text-[14px] font-medium text-emerald-600">
        <Check className="w-4 h-4" />
        You&apos;re in. Watch your inbox.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="email"
            placeholder="Enter your email"
            {...register('email')}
            className="w-full px-5 py-3 rounded-full border border-graphite-200 text-[14px] text-graphite-900 placeholder:text-graphite-400 focus:outline-none focus:ring-2 focus:ring-graphite-300 focus:border-transparent transition-all"
          />
          {errors.email && (
            <p className="text-[12px] text-red-500 mt-1.5 pl-5">{errors.email.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-graphite-950 text-white text-[14px] font-medium hover:bg-graphite-800 transition-all disabled:opacity-50 flex-shrink-0"
        >
          Subscribe
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
      <TCPAConsent formId="email_capture" requiresEmail={true} requiresSMS={false} onChange={setConsent} />
      {consentError && <p className="text-[12px] text-red-400 mt-2 text-center">{consentError}</p>}
    </form>
  )
}
