'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { ArrowRight, Lock, Shield, Check, CheckCircle, Calendar } from 'lucide-react'
import { trackEvent } from '@/lib/events'
import { withAttribution } from '@/lib/attribution'
import { CONSULTATION, primaryCtaSublabel } from '@/lib/pricing'
import TCPAConsent, { type ConsentState, isConsentValid } from '@/components/TCPAConsent'

// Compressed from 8 → 4 fields. The rest moves to post-payment intake.
const bookSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(7, 'Valid phone number is required'),
  serviceInterest: z.enum(['trt', 'glp1', 'general']),
})

type BookFormData = z.infer<typeof bookSchema>

function BookContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const paid = searchParams.get('session') // Stripe session id (or 'demo')
  const serviceParam = searchParams.get('service') // Pre-select from pricing card
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || ''

  const defaultService = serviceParam === 'trt' ? 'trt' : serviceParam === 'glp1' ? 'glp1' : 'general'

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [consent, setConsent] = useState<ConsentState>({ email: false, sms: false, version: '1.0.0' })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: { serviceInterest: defaultService as 'trt' | 'glp1' | 'general' },
  })

  async function onSubmit(data: BookFormData) {
    setLoading(true)
    setError('')

    if (!isConsentValid(consent, true, false)) {
      setError('Please agree to receive email communications to continue.')
      setLoading(false)
      return
    }

    trackEvent('checkout_initiated', { email: data.email, service: data.serviceInterest })

    // Fire a lead event in parallel — captures attribution even if checkout drops
    void fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        withAttribution({
          ...data,
          source: 'book_form',
        })
      ),
    }).catch(() => {})

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, goals: '' }),
      })
      const result = await res.json()
      if (result.url) {
        window.location.href = result.url
      } else if (result.error) {
        setError(result.error)
        setLoading(false)
      } else {
        setError('Unable to create checkout session. Please try again.')
        setLoading(false)
      }
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  // ─── Post-payment: show Calendly (or simulate in demo) ───
  if (paid) {
    return (
      <>
        <section className="bg-graphite-950 py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 mb-5">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-display text-white mb-3">Payment Confirmed</h1>
            <p className="text-lg text-graphite-400">
              Pick a time that works for you. Your physician will meet you via secure video.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-4 text-[12px] font-medium text-graphite-500">
              <Calendar className="w-3.5 h-3.5" />
              Step 2 of 2 — Schedule your consultation
            </div>

            {calendlyUrl ? (
              <iframe
                src={calendlyUrl}
                className="w-full h-[720px] border border-graphite-200 rounded-2xl"
                title="Book appointment"
              />
            ) : (
              <div className="rounded-2xl border-2 border-dashed border-graphite-200 bg-graphite-50 p-12 text-center">
                <Calendar className="w-12 h-12 text-graphite-400 mx-auto mb-4" />
                <h3 className="text-headline text-graphite-950 mb-2">Calendar coming online</h3>
                <p className="text-[14px] text-graphite-600 mb-6 max-w-md mx-auto">
                  Your booking calendar will embed here once{' '}
                  <code className="text-[12px] bg-white border border-graphite-200 px-1.5 py-0.5 rounded">NEXT_PUBLIC_CALENDLY_URL</code>{' '}
                  is configured.
                </p>
                <button
                  onClick={() => router.push('/success')}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-graphite-950 text-white text-[14px] font-semibold hover:bg-graphite-800 transition-all"
                >
                  Continue (demo) <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </section>
      </>
    )
  }

  // ─── Pre-payment: 4-field form ───
  return (
    <>
      <section className="bg-graphite-950 py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-graphite-400 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Step 1 of 2
            </div>
            <h1 className="text-display-lg text-white mb-3">Book your consultation</h1>
            <p className="text-lg text-graphite-400 max-w-xl mx-auto">
              {CONSULTATION.tagline} {primaryCtaSublabel()}.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-14 lg:py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-graphite-700 mb-1.5">First name</label>
                  <input
                    {...register('firstName')}
                    className="w-full px-4 py-3 rounded-xl border border-graphite-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-graphite-950/10 focus:border-graphite-400"
                  />
                  {errors.firstName && <p className="text-[12px] text-red-500 mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-graphite-700 mb-1.5">Last name</label>
                  <input
                    {...register('lastName')}
                    className="w-full px-4 py-3 rounded-xl border border-graphite-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-graphite-950/10 focus:border-graphite-400"
                  />
                  {errors.lastName && <p className="text-[12px] text-red-500 mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-graphite-700 mb-1.5">Email</label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full px-4 py-3 rounded-xl border border-graphite-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-graphite-950/10 focus:border-graphite-400"
                />
                {errors.email && <p className="text-[12px] text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-[13px] font-medium text-graphite-700 mb-1.5">Phone</label>
                <input
                  type="tel"
                  {...register('phone')}
                  placeholder="(555) 555-5555"
                  className="w-full px-4 py-3 rounded-xl border border-graphite-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-graphite-950/10 focus:border-graphite-400"
                />
                {errors.phone && <p className="text-[12px] text-red-500 mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-[13px] font-medium text-graphite-700 mb-1.5">What are you interested in?</label>
                <select
                  {...register('serviceInterest')}
                  className="w-full px-4 py-3 rounded-xl border border-graphite-200 text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-graphite-950/10 focus:border-graphite-400"
                >
                  <option value="general">Not sure yet — help me decide</option>
                  <option value="trt">Testosterone Therapy (TRT)</option>
                  <option value="glp1">GLP-1 Weight Loss</option>
                </select>
              </div>

              <TCPAConsent
                formId="book_form"
                requiresEmail={true}
                requiresSMS={false}
                onChange={setConsent}
              />

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-[13px] text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-graphite-950 text-white text-[15px] font-semibold hover:bg-graphite-800 transition-all disabled:opacity-50 shadow-lg"
              >
                {loading ? 'Processing…' : 'Continue to Payment'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>

              <div className="flex items-center justify-center gap-5 text-[11px] text-graphite-500 pt-2">
                <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Encrypted</span>
                <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> HIPAA</span>
                <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Stripe</span>
              </div>
            </form>
          </div>

          <aside className="lg:col-span-2">
            <div className="rounded-2xl border border-graphite-200 p-6 lg:sticky lg:top-28">
              <h3 className="text-[15px] font-semibold text-graphite-950 mb-1">{CONSULTATION.name}</h3>
              <div className="text-[22px] font-bold text-graphite-950 mb-4">{CONSULTATION.display}</div>
              <ul className="space-y-2.5 mb-4">
                {CONSULTATION.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-graphite-950 mt-0.5 flex-shrink-0" />
                    <span className="text-[13px] text-graphite-600">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-graphite-500 leading-relaxed border-t border-graphite-100 pt-4">
                Payment is processed via Stripe. All treatment is subject to physician evaluation and eligibility.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-graphite-950" />}>
      <BookContent />
    </Suspense>
  )
}
