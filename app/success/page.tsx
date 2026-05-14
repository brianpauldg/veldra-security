'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Mail, FileText, Calendar, Star } from 'lucide-react'

export default function SuccessPage() {
  return (
    <>
      <section className="bg-zinc-950 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 mb-8">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>
            <h1 className="text-display-lg text-white mb-4">You&apos;re all set</h1>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Your consultation has been booked. Check your email for confirmation details
              and your digital intake form.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="text-display-sm text-zinc-950 text-center mb-12">What happens next</h2>

          <div className="space-y-8">
            {[
              {
                icon: <Mail className="w-6 h-6" />,
                title: 'Check your email',
                desc: 'You\'ll receive a confirmation email with your appointment details, calendar invite, and a link to your digital intake form.',
                time: 'Within 5 minutes',
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: 'Complete your intake',
                desc: 'Fill out your health history, current symptoms, medications, and goals before your appointment. This helps your provider prepare.',
                time: 'Before your appointment',
              },
              {
                icon: <Calendar className="w-6 h-6" />,
                title: 'Attend your consultation',
                desc: 'Join your secure video consultation at the scheduled time. Your provider will review your health, discuss options, and create your care plan.',
                time: 'At your scheduled time',
              },
            ].map((step, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-600">
                    {step.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-headline text-zinc-950 mb-1">{step.title}</h3>
                  <p className="text-[14px] text-zinc-500 leading-relaxed mb-1">{step.desc}</p>
                  <span className="text-[12px] font-medium text-zinc-400">{step.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Review incentive */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 p-6 lg:p-8 rounded-xl bg-[#050404] border border-[#1a1814] text-center"
          >
            <p className="text-headline text-[#d8cfbe] mb-2" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300 }}>
              Get 10% off your next month
            </p>
            <p className="text-[14px] text-[#8a8268] leading-relaxed mb-5 max-w-md mx-auto font-light">
              After your treatment arrives, leave a quick review and we&apos;ll apply 10% off your next billing cycle. We&apos;ll send you a link once your order ships.
            </p>
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0d0c0a] border border-[#2a2620] text-[12px] text-[#8a8268] font-mono tracking-wide uppercase">
              <Star className="w-3.5 h-3.5" />
              Review discount applied automatically
            </span>
          </motion.div>

          <div className="mt-10 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-zinc-950 text-white text-[14px] font-medium hover:bg-zinc-800 transition-all"
            >
              Return to Home <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
