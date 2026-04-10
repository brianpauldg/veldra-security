'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { ArrowRight, Lock, Shield, Check } from 'lucide-react'
import { consultationSchema, type ConsultationData } from '@/lib/types'
import { trackEvent } from '@/lib/events'

export default function CheckoutPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConsultationData>({
    resolver: zodResolver(consultationSchema),
    defaultValues: { serviceInterest: 'general' },
  })

  async function onSubmit(data: ConsultationData) {
    setLoading(true)
    setError('')

    trackEvent('checkout_initiated', {
      email: data.email,
      service: data.serviceInterest,
    })

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (result.url) {
        window.location.href = result.url
      } else {
        // Fallback: redirect to success for demo purposes
        router.push('/booking?session=demo')
      }
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <>
      <section className="bg-graphite-950 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h1 className="text-display text-white mb-3">Book Your Consultation</h1>
            <p className="text-lg text-graphite-400">Complete your details below to proceed to secure checkout.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-graphite-700 mb-1.5">First Name</label>
                    <input
                      {...register('firstName')}
                      className="w-full px-4 py-3 rounded-xl border border-graphite-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-graphite-300 focus:border-transparent"
                    />
                    {errors.firstName && <p className="text-[12px] text-red-500 mt-1">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-graphite-700 mb-1.5">Last Name</label>
                    <input
                      {...register('lastName')}
                      className="w-full px-4 py-3 rounded-xl border border-graphite-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-graphite-300 focus:border-transparent"
                    />
                    {errors.lastName && <p className="text-[12px] text-red-500 mt-1">{errors.lastName.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-graphite-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full px-4 py-3 rounded-xl border border-graphite-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-graphite-300 focus:border-transparent"
                  />
                  {errors.email && <p className="text-[12px] text-red-500 mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-graphite-700 mb-1.5">Phone</label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className="w-full px-4 py-3 rounded-xl border border-graphite-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-graphite-300 focus:border-transparent"
                  />
                  {errors.phone && <p className="text-[12px] text-red-500 mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-graphite-700 mb-1.5">Primary Interest</label>
                  <select
                    {...register('serviceInterest')}
                    className="w-full px-4 py-3 rounded-xl border border-graphite-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-graphite-300 focus:border-transparent bg-white"
                  >
                    <option value="general">General Consultation</option>
                    <option value="trt">Testosterone Replacement (TRT)</option>
                    <option value="glp1">GLP-1 Weight Loss</option>
                    <option value="peptides">Peptide Therapy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-graphite-700 mb-1.5">What are your health goals?</label>
                  <textarea
                    {...register('goals')}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-graphite-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-graphite-300 focus:border-transparent resize-none"
                    placeholder="Tell us about your symptoms, goals, and what you'd like to address..."
                  />
                  {errors.goals && <p className="text-[12px] text-red-500 mt-1">{errors.goals.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-graphite-700 mb-1.5">Age (optional)</label>
                    <input
                      {...register('age')}
                      className="w-full px-4 py-3 rounded-xl border border-graphite-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-graphite-300 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-graphite-700 mb-1.5">State (optional)</label>
                    <input
                      {...register('state')}
                      placeholder="e.g. CA, TX, FL"
                      className="w-full px-4 py-3 rounded-xl border border-graphite-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-graphite-300 focus:border-transparent"
                    />
                  </div>
                </div>

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
                  {loading ? 'Processing...' : 'Continue to Payment'}
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>

                <div className="flex items-center justify-center gap-4 text-[12px] text-graphite-400">
                  <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Encrypted</span>
                  <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> HIPAA-Compliant</span>
                </div>
              </form>
            </div>

            {/* Summary */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-graphite-200 p-6 sticky top-28">
                <h3 className="text-[15px] font-semibold text-graphite-950 mb-4">Consultation Includes</h3>
                <ul className="space-y-3 mb-6">
                  {[
                    'Licensed provider evaluation',
                    'Health history and symptom review',
                    'Treatment option discussion',
                    'Eligibility determination',
                    'Lab order preparation',
                    'Personalized care plan',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-[13px] text-graphite-600">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-graphite-100 pt-4">
                  <p className="text-[11px] text-graphite-400 leading-relaxed">
                    Your information is transmitted securely. Payment is processed via Stripe.
                    Subject to provider availability and eligibility review.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
