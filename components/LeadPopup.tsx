'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { trackEvent, triggerNurtureSequence } from '@/lib/events'
import { CURRENT_CONSENT_VERSION } from '@/lib/consent-text'

const popupSchema = z.object({
  email: z.string().email('Please enter a valid email'),
})

type PopupFormData = z.infer<typeof popupSchema>

interface LeadPopupProps {
  /** 'scroll' triggers at scroll depth, 'exit' triggers on exit intent */
  trigger?: 'scroll' | 'exit'
  /** Scroll depth percentage to trigger (0-100). Only used when trigger='scroll' */
  scrollDepth?: number
  /** Delay in seconds before popup can show */
  delay?: number
  /** Variant changes the copy */
  variant?: 'quiz' | 'guide'
}

export default function LeadPopup({
  trigger = 'scroll',
  scrollDepth = 60,
  delay = 45,
  variant = 'quiz',
}: LeadPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [emailConsent, setEmailConsent] = useState(false)
  const [consentError, setConsentError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PopupFormData>({
    resolver: zodResolver(popupSchema),
  })

  const showPopup = useCallback(() => {
    if (hasShown) return

    // Show after first page view
    const visitCount = parseInt(sessionStorage.getItem('bloom_visits') || '0', 10)
    if (visitCount < 0) return

    // Don't show if already a lead
    if (localStorage.getItem('bloom_lead')) return

    // Don't show if dismissed this session (per-variant)
    if (sessionStorage.getItem(`bloom_popup_dismissed_${variant}`)) return

    setIsOpen(true)
    setHasShown(true)
    trackEvent('popup_shown', { trigger, variant })
  }, [hasShown, trigger, variant])

  useEffect(() => {
    // Track page visits
    const visits = parseInt(sessionStorage.getItem('bloom_visits') || '0', 10)
    sessionStorage.setItem('bloom_visits', String(visits + 1))
  }, [])

  // Scroll trigger
  useEffect(() => {
    if (trigger !== 'scroll') return

    let timeoutReached = false
    const timer = setTimeout(() => { timeoutReached = true }, delay * 1000)

    const handleScroll = () => {
      if (!timeoutReached) return
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      if (scrollPercent >= scrollDepth) {
        showPopup()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [trigger, scrollDepth, delay, showPopup])

  // Exit intent trigger
  useEffect(() => {
    if (trigger !== 'exit') return

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        showPopup()
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [trigger, showPopup])

  const handleClose = () => {
    setIsOpen(false)
    sessionStorage.setItem(`bloom_popup_dismissed_${variant}`, 'true')
    trackEvent('popup_dismissed', { trigger, variant })
  }

  const onSubmit = async (data: PopupFormData) => {
    if (!emailConsent) {
      setConsentError('Please agree to receive emails to continue.')
      return
    }
    setConsentError('')
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          source: `popup_${variant}`,
          variant,
          serviceInterest: variant === 'quiz' ? 'trt' : 'general',
          consent: { email: true, version: CURRENT_CONSENT_VERSION },
        }),
      })
      trackEvent('lead_captured', { source: `popup_${variant}`, email: data.email })
      triggerNurtureSequence(data.email, variant === 'quiz' ? 'trt' : 'general')
      localStorage.setItem('bloom_lead', 'true')
      setIsSubmitted(true)
    } catch {
      // Silently handle — form still shows success
      setIsSubmitted(true)
    }
  }

  const copy = variant === 'quiz'
    ? {
        headline: 'Curious if you\'re a candidate?',
        body: 'Take our 2-minute clinical assessment. Science-backed questions designed to help you understand your options.',
        cta: 'Start the Free Assessment',
        ctaHref: '/quiz',
        dismiss: 'No thanks, I\'ll keep reading',
      }
    : {
        headline: 'Before you go',
        body: 'Get the free Hormone Optimization Guide — the same resource our providers recommend to new patients.',
        cta: 'Send the Guide',
        ctaHref: null,
        dismiss: 'Maybe later',
      }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-graphite-950/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0, 1] }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 lg:p-10"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-graphite-400 hover:text-graphite-600 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <>
                <h2 className="text-display-sm text-graphite-950 mb-3">
                  {copy.headline}
                </h2>
                <p className="text-[14px] text-graphite-500 leading-relaxed mb-6">
                  {copy.body}
                </p>

                {copy.ctaHref ? (
                  // Quiz variant — just a CTA button
                  <div className="space-y-4">
                    <a
                      href={copy.ctaHref}
                      onClick={() => {
                        trackEvent('popup_cta_clicked', { variant })
                        handleClose()
                      }}
                      className="block w-full text-center px-6 py-3.5 rounded-full bg-graphite-950 text-white text-[14px] font-semibold hover:bg-graphite-800 transition-all"
                    >
                      {copy.cta}
                    </a>
                    <button
                      onClick={handleClose}
                      className="block w-full text-center text-[13px] text-graphite-400 hover:text-graphite-600 transition-colors"
                    >
                      {copy.dismiss}
                    </button>
                  </div>
                ) : (
                  // Guide variant — email form
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="Your email address"
                        className="w-full px-4 py-3 rounded-xl border border-graphite-200 text-[14px] text-graphite-950 placeholder:text-graphite-400 focus:outline-none focus:ring-2 focus:ring-graphite-300 focus:border-transparent transition-all"
                      />
                      {errors.email && (
                        <p className="text-[12px] text-red-500 mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={emailConsent}
                        onChange={(e) => { setEmailConsent(e.target.checked); setConsentError('') }}
                        className="mt-0.5 w-4 h-4 rounded border-graphite-300 text-graphite-950 focus:ring-graphite-500"
                      />
                      <span className="text-[10px] text-graphite-400 leading-relaxed">
                        I agree to receive emails from Bloom Metabolics. Unsubscribe anytime. <a href="/privacy" className="underline">Privacy Policy</a>.
                      </span>
                    </label>
                    {consentError && <p className="text-[11px] text-red-500">{consentError}</p>}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3.5 rounded-full bg-graphite-950 text-white text-[14px] font-semibold hover:bg-graphite-800 transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : copy.cta}
                    </button>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="block w-full text-center text-[13px] text-graphite-400 hover:text-graphite-600 transition-colors"
                    >
                      {copy.dismiss}
                    </button>
                  </form>
                )}
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-headline text-graphite-950 mb-2">Your guide is on the way</h3>
                <p className="text-[14px] text-graphite-500">Check your inbox in the next few minutes.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
