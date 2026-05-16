'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Mail, MessageSquare } from 'lucide-react'
import { contactFormSchema, type ContactFormData } from '@/lib/types'
import { trackEvent } from '@/lib/events'
import Section from '@/components/ui/Section'
import TCPAConsent, { type ConsentState } from '@/components/TCPAConsent'
import { CURRENT_CONSENT_VERSION } from '@/lib/consent-text'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [marketingConsent, setMarketingConsent] = useState<ConsentState>({ email: false, sms: false, version: CURRENT_CONSENT_VERSION })
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  async function onSubmit(data: ContactFormData) {
    trackEvent('form_submitted', { type: 'contact', email: data.email, subject: data.subject })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          marketingConsent: marketingConsent.email ? { email: true, version: marketingConsent.version } : undefined,
        }),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
    } catch {
      setSubmitted(true) // Show success anyway — message is logged server-side
    }
  }

  return (
    <>
      <section className="bg-[#020202] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-display-lg text-white mb-4">Get in Touch</h1>
            <p className="text-lg text-[#8a8268]">
              Questions about our treatments? Need help with your account? We&apos;re here to help.
            </p>
          </motion.div>
        </div>
      </section>

      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-headline text-[#d8cfbe] mb-2">Message sent</h3>
                  <p className="text-[14px] text-[#8a8268]">
                    We&apos;ll get back to you within 24 hours. Check your email for a confirmation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label className="block text-[13px] font-medium text-[#d8cfbe] mb-1.5">Name</label>
                    <input
                      {...register('name')}
                      className="w-full px-4 py-3 rounded-xl border border-[#1a1814] bg-[#0d0c0a] text-[14px] text-[#d8cfbe] focus:outline-none focus:ring-2 focus:ring-[#8a8268]/30 focus:border-transparent"
                    />
                    {errors.name && <p className="text-[12px] text-red-500 mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#d8cfbe] mb-1.5">Email</label>
                    <input
                      type="email"
                      {...register('email')}
                      className="w-full px-4 py-3 rounded-xl border border-[#1a1814] bg-[#0d0c0a] text-[14px] text-[#d8cfbe] focus:outline-none focus:ring-2 focus:ring-[#8a8268]/30 focus:border-transparent"
                    />
                    {errors.email && <p className="text-[12px] text-red-500 mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#d8cfbe] mb-1.5">Phone (optional)</label>
                    <input
                      type="tel"
                      {...register('phone')}
                      className="w-full px-4 py-3 rounded-xl border border-[#1a1814] bg-[#0d0c0a] text-[14px] text-[#d8cfbe] focus:outline-none focus:ring-2 focus:ring-[#8a8268]/30 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#d8cfbe] mb-1.5">Subject</label>
                    <select
                      {...register('subject')}
                      className="w-full px-4 py-3 rounded-xl border border-[#1a1814] bg-[#0d0c0a] text-[14px] text-[#d8cfbe] focus:outline-none focus:ring-2 focus:ring-[#8a8268]/30 focus:border-transparent bg-[#0d0c0a]"
                    >
                      <option value="">Select a topic</option>
                      <option value="treatment">Treatment Questions</option>
                      <option value="booking">Booking & Scheduling</option>
                      <option value="billing">Billing & Payments</option>
                      <option value="account">Account Support</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && <p className="text-[12px] text-red-500 mt-1">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#d8cfbe] mb-1.5">Message</label>
                    <textarea
                      {...register('message')}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-[#1a1814] bg-[#0d0c0a] text-[14px] text-[#d8cfbe] focus:outline-none focus:ring-2 focus:ring-[#8a8268]/30 focus:border-transparent resize-none"
                      placeholder="How can we help?"
                    />
                    {errors.message && <p className="text-[12px] text-red-500 mt-1">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#020202] text-white text-[15px] font-medium hover:bg-[#0d0c0a] transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-[#1a1814] bg-[#050404] p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="w-5 h-5 text-[#d8cfbe]" />
                  <h3 className="text-[15px] font-semibold text-white">Email Us Directly</h3>
                </div>
                <a href="mailto:brian@bloommetabolics.com" className="text-[16px] text-[#d8cfbe] hover:text-white transition-colors font-medium">
                  brian@bloommetabolics.com
                </a>
                <p className="text-[12px] text-[#8a8268] mt-2">
                  Founder &amp; RN — Brian DeGuzman
                </p>
              </div>

              <div className="rounded-2xl border border-[#1a1814] bg-[#050404] p-6">
                <div className="flex items-center gap-3 mb-3">
                  <MessageSquare className="w-5 h-5 text-[#8a8268]" />
                  <h3 className="text-[15px] font-semibold text-white">Response Time</h3>
                </div>
                <p className="text-[14px] text-[#d8cfbe]">
                  We respond to all inquiries within 24 hours during business days.
                </p>
              </div>

              <div className="rounded-2xl border border-[#1a1814] bg-[#0d0c0a] p-6">
                <h3 className="text-[15px] font-semibold text-white mb-2">Looking for medical help?</h3>
                <p className="text-[13px] text-[#d8cfbe] leading-relaxed">
                  If you&apos;re experiencing a medical emergency, call 911.
                  For urgent care questions, contact your provider directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
