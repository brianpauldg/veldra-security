'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Calendar, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Section from '@/components/ui/Section'

function BookingContent() {
  const searchParams = useSearchParams()
  const session = searchParams.get('session')

  return (
    <>
      {/* Success Banner */}
      <section className="bg-graphite-950 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 mb-6">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-display text-white mb-3">Payment Confirmed</h1>
            <p className="text-lg text-graphite-400">
              Your consultation has been purchased. Now let&apos;s get you booked.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Section */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-graphite-100 text-[12px] font-medium text-graphite-600 mb-4">
              <Calendar className="w-3.5 h-3.5" />
              Step 2 of 3
            </div>
            <h2 className="text-display-sm text-graphite-950 mb-3">Schedule Your Consultation</h2>
            <p className="text-subheadline text-graphite-500">
              Choose a time that works for you. Your provider will meet with you via secure video.
            </p>
          </div>

          {/* Calendly Embed Placeholder */}
          <div className="rounded-2xl border-2 border-dashed border-graphite-200 bg-graphite-50 p-12 text-center">
            <Calendar className="w-12 h-12 text-graphite-300 mx-auto mb-4" />
            <h3 className="text-headline text-graphite-700 mb-2">Booking Calendar</h3>
            <p className="text-[14px] text-graphite-500 mb-6 max-w-md mx-auto">
              This area will display your Calendly embed or custom booking component.
              Configure your <code className="text-[13px] bg-graphite-100 px-1.5 py-0.5 rounded">NEXT_PUBLIC_CALENDLY_URL</code> environment variable.
            </p>

            {process.env.NEXT_PUBLIC_CALENDLY_URL ? (
              <iframe
                src={process.env.NEXT_PUBLIC_CALENDLY_URL}
                className="w-full h-[600px] border-0 rounded-xl"
                title="Book appointment"
              />
            ) : (
              <Link
                href="/success"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-graphite-950 text-white text-[14px] font-medium hover:bg-graphite-800 transition-all"
              >
                Simulate Booking (Demo) <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* What to Expect */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Before Your Visit', desc: 'Complete the digital intake form sent to your email. This helps your provider prepare.' },
              { step: '2', title: 'During Your Visit', desc: 'Meet with your provider via secure video. Discuss your health, goals, and options.' },
              { step: '3', title: 'After Your Visit', desc: 'Receive your personalized care plan, lab orders, and next steps within 24 hours.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-10 h-10 rounded-full bg-graphite-950 text-white text-[14px] font-semibold flex items-center justify-center mx-auto mb-3">
                  {item.step}
                </div>
                <h4 className="text-[15px] font-semibold text-graphite-950 mb-1">{item.title}</h4>
                <p className="text-[13px] text-graphite-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-graphite-950" />}>
      <BookingContent />
    </Suspense>
  )
}
