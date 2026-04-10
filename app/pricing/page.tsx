'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Shield, Clock, Stethoscope } from 'lucide-react'
import Section, { SectionLabel, SectionTitle, SectionDescription } from '@/components/ui/Section'

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-graphite-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-graphite-950 via-graphite-900 to-graphite-950" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[12px] font-medium text-graphite-300 tracking-wide uppercase mb-5">
              Pricing
            </span>
            <h1 className="text-display-lg text-white mb-5">
              Transparent pricing. No hidden fees.
            </h1>
            <p className="text-lg text-graphite-400 leading-relaxed">
              Start with a consultation. Your provider will recommend the right program
              based on your goals and medical evaluation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Consultation Card */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl border-2 border-graphite-200 p-10 lg:p-14">
            <div className="text-center">
              <SectionLabel>Start Here</SectionLabel>
              <h2 className="text-display-sm text-graphite-950 mb-2">Initial Consultation</h2>
              <p className="text-subheadline text-graphite-500 mb-8 max-w-lg mx-auto">
                A focused session with a licensed provider to evaluate your health,
                discuss treatment options, and determine eligibility.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              {[
                { icon: <Stethoscope className="w-5 h-5" />, title: 'Provider Evaluation', items: ['Health history review', 'Symptom assessment', 'Goal discussion'] },
                { icon: <Shield className="w-5 h-5" />, title: 'Treatment Planning', items: ['Eligibility determination', 'Protocol options', 'Lab order preparation'] },
                { icon: <Clock className="w-5 h-5" />, title: 'Next Steps', items: ['Personalized care plan', 'Lab work coordination', 'Follow-up scheduling'] },
              ].map((col) => (
                <div key={col.title}>
                  <div className="w-10 h-10 rounded-xl bg-graphite-100 flex items-center justify-center text-graphite-600 mb-3">
                    {col.icon}
                  </div>
                  <h3 className="text-[15px] font-semibold text-graphite-950 mb-2">{col.title}</h3>
                  <ul className="space-y-1.5">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[13px] text-graphite-500">
                        <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/checkout"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-graphite-950 text-white text-[15px] font-semibold hover:bg-graphite-800 transition-all shadow-lg hover:shadow-xl"
              >
                Book Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[12px] text-graphite-400 mt-4">
                Secure payment via Stripe. Subject to provider availability.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Treatment Programs */}
      <Section className="bg-graphite-50">
        <div className="text-center mb-14">
          <SectionLabel>Treatment Programs</SectionLabel>
          <SectionTitle>Ongoing care programs</SectionTitle>
          <SectionDescription className="mx-auto">
            After your consultation, your provider will recommend the appropriate program.
            All programs include ongoing medical oversight and support.
          </SectionDescription>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              name: 'TRT Program',
              desc: 'Testosterone Replacement',
              includes: [
                'Initial labs and biomarker panel',
                'Personalized TRT protocol',
                'Prescription management',
                'Regular follow-up consultations',
                'Quarterly lab monitoring',
                'AI-enhanced care coordination',
                'Direct provider messaging',
              ],
            },
            {
              name: 'GLP-1 Program',
              desc: 'Medical Weight Loss',
              featured: true,
              includes: [
                'Medical evaluation and labs',
                'GLP-1 medication prescription',
                'Titration schedule management',
                'Monthly provider check-ins',
                'Progress tracking and monitoring',
                'Nutrition and lifestyle guidance',
                'AI-enhanced follow-up system',
              ],
            },
            {
              name: 'Peptide Program',
              desc: 'Recovery & Performance',
              includes: [
                'Health assessment and goal review',
                'Custom peptide protocol design',
                'Prescription and sourcing',
                'Regular progress evaluations',
                'Protocol adjustments',
                'Educational resources',
                'Ongoing provider access',
              ],
            },
          ].map((program) => (
            <div
              key={program.name}
              className={`rounded-2xl p-8 ${
                program.featured
                  ? 'bg-graphite-950 text-white border-2 border-graphite-700 relative'
                  : 'bg-white border border-graphite-200'
              }`}
            >
              {program.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-graphite-950 text-[11px] font-semibold uppercase tracking-widest rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="text-headline mb-1">{program.name}</h3>
              <p className={`text-[13px] mb-6 ${program.featured ? 'text-graphite-400' : 'text-graphite-500'}`}>
                {program.desc}
              </p>
              <ul className="space-y-3 mb-8">
                {program.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${program.featured ? 'text-emerald-400' : 'text-emerald-500'}`} />
                    <span className={`text-[13px] ${program.featured ? 'text-graphite-300' : 'text-graphite-600'}`}>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/checkout"
                className={`block text-center py-3 rounded-full text-[14px] font-medium transition-all ${
                  program.featured
                    ? 'bg-white text-graphite-950 hover:bg-graphite-100'
                    : 'bg-graphite-950 text-white hover:bg-graphite-800'
                }`}
              >
                Start with Consultation
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-[12px] text-graphite-400 mt-8 max-w-xl mx-auto">
          Program pricing is discussed during your consultation. All programs require medical
          evaluation and provider approval. Treatment costs vary based on individual protocols.
        </p>
      </Section>

      {/* Membership / Continuity */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <SectionLabel>Continuity Care</SectionLabel>
          <SectionTitle>Ongoing optimization memberships</SectionTitle>
          <SectionDescription className="mx-auto mb-10">
            For patients on active treatment, our continuity programs include regular
            lab monitoring, protocol adjustments, and premium provider access.
          </SectionDescription>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {[
              { title: 'Follow-Up Care', desc: 'Regular check-ins with your provider to monitor progress and adjust protocols.' },
              { title: 'Lab Review Support', desc: 'Quarterly bloodwork with comprehensive review and treatment optimization.' },
              { title: 'Premium Monitoring', desc: 'Priority provider access, expanded lab panels, and proactive health insights.' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-graphite-100 p-6">
                <h3 className="text-[15px] font-semibold text-graphite-950 mb-2">{item.title}</h3>
                <p className="text-[13px] text-graphite-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section dark className="gradient-hero">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-display text-white mb-5">
            Start with a conversation
          </h2>
          <p className="text-lg text-graphite-400 leading-relaxed mb-8">
            Book a consultation to discuss your health goals with a licensed provider.
            No commitment beyond the visit.
          </p>
          <Link
            href="/checkout"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-graphite-950 text-[15px] font-semibold hover:bg-graphite-100 transition-all shadow-lg"
          >
            Book Your Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Section>
    </>
  )
}
