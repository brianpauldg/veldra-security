'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2 } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { waitlistSchema, type WaitlistFormData } from '@/lib/waitlist/schema'
import {
  US_STATES,
  PRIMARY_INTERESTS,
  CONTACT_METHODS,
  TIMELINES,
  SERVED_STATES,
} from '@/lib/waitlist/constants'

// ─── Turnstile ──────────────────────────────────────────────
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

function useTurnstile(containerId: string) {
  const [token, setToken] = useState<string | null>(null)
  const widgetRef = useRef<string | null>(null)

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return

    function render() {
      const container = document.getElementById(containerId)
      if (!container || widgetRef.current) return
      const w = (window as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      if (!w.turnstile) return
      widgetRef.current = w.turnstile.render(`#${containerId}`, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (t: string) => setToken(t),
        'error-callback': () => setToken(null),
        'expired-callback': () => setToken(null),
        theme: 'dark',
        size: 'flexible',
      })
    }

    // If script already loaded
    if ((window as any).turnstile) { render(); return }

    // Load script
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.onload = () => setTimeout(render, 100)
    document.head.appendChild(script)

    return () => {
      if (widgetRef.current && (window as any).turnstile) {
        try { (window as any).turnstile.remove(widgetRef.current) } catch {}
      }
      widgetRef.current = null
    }
  }, [containerId])

  return token
}

// ─── Phone formatter ────────────────────────────────────────
function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  if (digits.length <= 3) return digits.length ? `(${digits}` : ''
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

// ─── Types ──────────────────────────────────────────────────
interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error' | 'rate-limited'

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [hasDirtyData, setHasDirtyData] = useState(false)
  const [stateMessage, setStateMessage] = useState('')
  const firstFieldRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const turnstileToken = useTurnstile('turnstile-waitlist')

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      preferredContact: 'email',
      medicalDisclaimer: undefined,
      tcpaConsent: undefined,
      website: '',
    },
  })

  const watchPhone = watch('phone')
  const watchPreferredContact = watch('preferredContact')
  const watchState = watch('state')

  // Show TCPA checkbox when phone provided AND contact is Text or Phone
  const showTcpa = Boolean(watchPhone && watchPhone.length > 0 && (watchPreferredContact === 'text' || watchPreferredContact === 'phone'))

  // State restriction message
  useEffect(() => {
    if (SERVED_STATES.length > 0 && watchState && !SERVED_STATES.includes(watchState)) {
      setStateMessage("We're not yet operating in your state — submit anyway and we'll notify you when we expand.")
    } else {
      setStateMessage('')
    }
  }, [watchState])

  // Focus first field when modal opens
  useEffect(() => {
    if (isOpen) {
      setHasDirtyData(false)
      setTimeout(() => firstFieldRef.current?.focus(), 150)
    }
  }, [isOpen])

  // Track dirty state for close confirmation
  useEffect(() => {
    if (isDirty) setHasDirtyData(true)
  }, [isDirty])

  // Escape key close
  useEffect(() => {
    if (!isOpen) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  })

  // Focus trap
  useEffect(() => {
    if (!isOpen || !modalRef.current) return
    const modal = modalRef.current
    const focusables = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusables[0]
    const last = focusables[focusables.length - 1]

    function trap(e: KeyboardEvent) {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }
    document.addEventListener('keydown', trap)
    return () => document.removeEventListener('keydown', trap)
  }, [isOpen])

  const handleClose = useCallback(() => {
    if (submitState === 'success' || !hasDirtyData) {
      onClose()
      return
    }
    if (window.confirm('You have unsaved changes. Close the waitlist form?')) {
      onClose()
    }
  }, [submitState, hasDirtyData, onClose])

  // Capture UTM + referrer on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    setValue('utmSource', params.get('utm_source') || '')
    setValue('utmMedium', params.get('utm_medium') || '')
    setValue('utmCampaign', params.get('utm_campaign') || '')
    setValue('utmTerm', params.get('utm_term') || '')
    setValue('utmContent', params.get('utm_content') || '')
    setValue('referrer', document.referrer || '')
    setValue('landingPage', window.location.pathname + window.location.search)
    setValue('userAgent', navigator.userAgent)
  }, [setValue])

  const onSubmit = async (formData: WaitlistFormData) => {
    setSubmitState('submitting')

    // Attach turnstile token
    formData.turnstileToken = turnstileToken || undefined

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.status === 429) {
        setSubmitState('rate-limited')
        return
      }

      if (!res.ok) {
        setSubmitState('error')
        return
      }

      setSubmitState('success')
    } catch {
      setSubmitState('error')
    }
  }

  const businessEmail = 'hello@bloommetabolics.com'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto p-4 pt-12 pb-12"
          role="dialog"
          aria-modal="true"
          aria-label="Join the Bloom Metabolics Waitlist"
        >
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-[#020202]/80 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0, 1] }}
            className="relative bg-[#050404] border border-[#1a1814] rounded-xl w-full max-w-lg mx-auto shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-[#8a8268] hover:text-[#d8cfbe] transition-colors z-10"
              aria-label="Close waitlist form"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
              {/* ── Success state ────────────────────────────── */}
              {submitState === 'success' && (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-emerald-900/30 border border-emerald-700/40 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-display-sm text-[#d8cfbe] mb-3" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300 }}>
                    You&apos;re on the list.
                  </h2>
                  <p className="text-[15px] text-[#a89878] leading-relaxed max-w-sm mx-auto mb-8 font-light">
                    Thank you — you&apos;ve been added to the Bloom Metabolics waitlist. Check your inbox for confirmation. We&apos;ll contact you with next steps soon.
                  </p>
                  <button onClick={onClose} className="bloom-btn">
                    Close
                  </button>
                </div>
              )}

              {/* ── Rate-limited state ───────────────────────── */}
              {submitState === 'rate-limited' && (
                <div className="text-center py-8">
                  <h2 className="text-display-sm text-[#d8cfbe] mb-3" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300 }}>
                    Already submitted.
                  </h2>
                  <p className="text-[15px] text-[#a89878] leading-relaxed max-w-sm mx-auto mb-8 font-light">
                    You&apos;ve already submitted recently. We have your information and will be in touch.
                  </p>
                  <button onClick={onClose} className="bloom-btn">
                    Close
                  </button>
                </div>
              )}

              {/* ── Error state ──────────────────────────────── */}
              {submitState === 'error' && (
                <div className="text-center py-8">
                  <h2 className="text-display-sm text-[#d8cfbe] mb-3" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300 }}>
                    Something went wrong.
                  </h2>
                  <p className="text-[15px] text-[#a89878] leading-relaxed max-w-sm mx-auto mb-6 font-light">
                    Please try again or contact us directly at{' '}
                    <a href={`mailto:${businessEmail}`} className="text-[#d8cfbe] underline">{businessEmail}</a>.
                  </p>
                  <div className="flex justify-center gap-3">
                    <button onClick={() => setSubmitState('idle')} className="bloom-btn">
                      Try Again
                    </button>
                    <button onClick={onClose} className="bloom-btn bloom-btn-ghost">
                      Close
                    </button>
                  </div>
                </div>
              )}

              {/* ── Form ─────────────────────────────────────── */}
              {(submitState === 'idle' || submitState === 'submitting') && (
                <>
                  <div className="mb-6">
                    <div className="eyebrow mb-3">Waitlist</div>
                    <h2 className="text-display-sm text-[#d8cfbe] mb-2" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300 }}>
                      Join the Bloom Metabolics Waitlist
                    </h2>
                    <p className="text-[14px] text-[#a89878] leading-relaxed font-light">
                      Be first to access personalized metabolic health, hormone optimization, and longevity-focused care when enrollment opens.
                    </p>
                  </div>

                  <p className="text-[13px] text-[#8a8268] mb-5 font-light">
                    Submit your information below and our team will follow up with next steps.
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    {/* Honeypot — hidden from users */}
                    <div className="absolute -left-[9999px]" aria-hidden="true" tabIndex={-1}>
                      <label htmlFor="website">Website</label>
                      <input {...register('website')} id="website" type="text" tabIndex={-1} autoComplete="off" />
                    </div>

                    {/* Name row */}
                    <div className="grid grid-cols-2 gap-3">
                      <FieldGroup label="First Name" error={errors.firstName?.message} htmlFor="firstName">
                        <input
                          {...register('firstName')}
                          ref={(e) => {
                            register('firstName').ref(e)
                            ;(firstFieldRef as any).current = e
                          }}
                          id="firstName"
                          type="text"
                          autoComplete="given-name"
                          className="waitlist-input"
                          aria-invalid={!!errors.firstName}
                          aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                        />
                      </FieldGroup>
                      <FieldGroup label="Last Name" error={errors.lastName?.message} htmlFor="lastName">
                        <input
                          {...register('lastName')}
                          id="lastName"
                          type="text"
                          autoComplete="family-name"
                          className="waitlist-input"
                          aria-invalid={!!errors.lastName}
                          aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                        />
                      </FieldGroup>
                    </div>

                    {/* Email */}
                    <FieldGroup label="Email" error={errors.email?.message} htmlFor="email">
                      <input
                        {...register('email')}
                        id="email"
                        type="email"
                        autoComplete="email"
                        className="waitlist-input"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                    </FieldGroup>

                    {/* Phone */}
                    <FieldGroup label="Phone Number" error={errors.phone?.message} htmlFor="phone">
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <input
                            id="phone"
                            type="tel"
                            autoComplete="tel"
                            className="waitlist-input"
                            value={field.value || ''}
                            onChange={(e) => field.onChange(formatPhone(e.target.value))}
                            placeholder="(555) 123-4567"
                            aria-invalid={!!errors.phone}
                            aria-describedby={errors.phone ? 'phone-error' : undefined}
                          />
                        )}
                      />
                    </FieldGroup>

                    {/* State */}
                    <FieldGroup label="State" error={errors.state?.message} htmlFor="state">
                      <select
                        {...register('state')}
                        id="state"
                        autoComplete="address-level1"
                        className="waitlist-input"
                        defaultValue=""
                        aria-invalid={!!errors.state}
                        aria-describedby={errors.state ? 'state-error' : undefined}
                      >
                        <option value="" disabled>Select your state</option>
                        {US_STATES.map(s => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </FieldGroup>
                    {stateMessage && (
                      <p className="text-[12px] text-amber-500/80 -mt-2 px-1 font-light">{stateMessage}</p>
                    )}

                    {/* Primary Interest */}
                    <FieldGroup label="Primary Interest" error={errors.primaryInterest?.message} htmlFor="primaryInterest">
                      <select
                        {...register('primaryInterest')}
                        id="primaryInterest"
                        className="waitlist-input"
                        defaultValue=""
                        aria-invalid={!!errors.primaryInterest}
                        aria-describedby={errors.primaryInterest ? 'primaryInterest-error' : undefined}
                      >
                        <option value="" disabled>Select your primary interest</option>
                        {PRIMARY_INTERESTS.map(i => (
                          <option key={i.value} value={i.value}>{i.label}</option>
                        ))}
                      </select>
                    </FieldGroup>

                    {/* Preferred Contact Method */}
                    <fieldset>
                      <legend className="text-[12px] font-medium text-[#d8cfbe] mb-2">Preferred Contact Method</legend>
                      <div className="flex gap-4">
                        {CONTACT_METHODS.map(m => (
                          <label key={m.value} className="flex items-center gap-2 cursor-pointer">
                            <input
                              {...register('preferredContact')}
                              type="radio"
                              value={m.value}
                              className="w-4 h-4 accent-[#8a8268] bg-[#0d0c0a] border-[#2a2620]"
                            />
                            <span className="text-[13px] text-[#a89878] font-light">{m.label}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    {/* Timeline */}
                    <FieldGroup label="How soon are you looking to start?" htmlFor="timeline" optional>
                      <select
                        {...register('timeline')}
                        id="timeline"
                        className="waitlist-input"
                        defaultValue=""
                      >
                        <option value="">Select timeline</option>
                        {TIMELINES.map(t => (
                          <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                      </select>
                    </FieldGroup>

                    {/* Notes */}
                    <FieldGroup label="Notes / Health Goals" htmlFor="notes" optional>
                      <textarea
                        {...register('notes')}
                        id="notes"
                        rows={3}
                        maxLength={1000}
                        className="waitlist-input resize-none"
                        aria-describedby="notes-hint"
                      />
                      <p id="notes-hint" className="text-[11px] text-[#2a2620] mt-1">Max 1000 characters</p>
                    </FieldGroup>

                    {/* ── Checkboxes ─────────────────────────── */}
                    <div className="space-y-3 pt-2">
                      {/* Medical disclaimer — always required */}
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          {...register('medicalDisclaimer')}
                          type="checkbox"
                          className="mt-0.5 w-4 h-4 rounded accent-[#8a8268] bg-[#0d0c0a] border-[#2a2620] flex-shrink-0"
                        />
                        <span className="text-[12px] text-[#8a8268] leading-relaxed">
                          I understand this waitlist form does not establish a patient-provider relationship and is not for medical emergencies.
                        </span>
                      </label>
                      {errors.medicalDisclaimer && (
                        <p className="text-[12px] text-red-400 pl-7">{errors.medicalDisclaimer.message}</p>
                      )}

                      {/* TCPA consent — conditional */}
                      {showTcpa && (
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            {...register('tcpaConsent')}
                            type="checkbox"
                            className="mt-0.5 w-4 h-4 rounded accent-[#8a8268] bg-[#0d0c0a] border-[#2a2620] flex-shrink-0"
                          />
                          <span className="text-[12px] text-[#8a8268] leading-relaxed">
                            I consent to receive calls and text messages from Bloom Metabolics at the number provided, including via automated technology. Consent is not a condition of any service. Message and data rates may apply. Reply STOP to opt out.
                          </span>
                        </label>
                      )}
                    </div>

                    {/* Turnstile widget */}
                    {TURNSTILE_SITE_KEY && (
                      <div id="turnstile-waitlist" className="flex justify-center" />
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitState === 'submitting'}
                      className="bloom-btn w-full justify-center mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitState === 'submitting' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Join Waitlist'
                      )}
                    </button>

                    {/* CTA microcopy */}
                    <p className="text-[11px] text-[#2a2620] text-center font-light">
                      Limited early access availability. Joining the waitlist does not guarantee eligibility or treatment.
                    </p>
                  </form>

                  {/* Disclaimer */}
                  <div className="mt-6 pt-4 border-t border-[#1a1814]">
                    <p className="text-[10px] text-[#2a2620] leading-relaxed font-light">
                      Bloom Metabolics does not provide emergency medical care. This form is for waitlist and informational purposes only. A licensed provider will determine eligibility after formal intake and evaluation.
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Field wrapper component ────────────────────────────────
function FieldGroup({
  label,
  error,
  htmlFor,
  optional,
  children,
}: {
  label: string
  error?: string
  htmlFor: string
  optional?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-[12px] font-medium text-[#d8cfbe] mb-1.5">
        {label}
        {optional && <span className="text-[#2a2620] ml-1">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="text-[12px] text-red-400 mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
