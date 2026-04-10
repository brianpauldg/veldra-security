'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Mail, FileText, Calendar } from 'lucide-react'

export default function SuccessPage() {
  return (
    <>
      <section className="bg-graphite-950 py-24 lg:py-32">
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
            <p className="text-lg text-graphite-400 leading-relaxed">
              Your consultation has been booked. Check your email for confirmation details
              and your digital intake form.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="text-display-sm text-graphite-950 text-center mb-12">What happens next</h2>

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
                  <div className="w-12 h-12 rounded-xl bg-graphite-100 flex items-center justify-center text-graphite-600">
                    {step.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-headline text-graphite-950 mb-1">{step.title}</h3>
                  <p className="text-[14px] text-graphite-500 leading-relaxed mb-1">{step.desc}</p>
                  <span className="text-[12px] font-medium text-graphite-400">{step.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-graphite-950 text-white text-[14px] font-medium hover:bg-graphite-800 transition-all"
            >
              Return to Home <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
