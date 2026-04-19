'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import Section, { SectionLabel, SectionTitle, SectionDescription } from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import type { ReactNode } from 'react'

interface TreatmentPageProps {
  tag: string
  title: string
  headline: string
  description: string
  icon: ReactNode
  benefits: { title: string; description: string; icon: ReactNode }[]
  process: { step: string; title: string; description: string }[]
  faqs: { question: string; answer: string }[]
  idealFor: string[]
  disclaimer: string
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0, 1] as [number, number, number, number] },
}

export default function TreatmentPage({
  tag, title, headline, description,
  benefits, process, faqs, idealFor, disclaimer,
}: TreatmentPageProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-graphite-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-graphite-950 via-graphite-900 to-graphite-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(26,154,115,0.06),_transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-36">
          <motion.div initial="initial" animate="animate" className="max-w-3xl">
            <motion.div {...fadeUp} className="mb-5">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[12px] font-medium text-graphite-300 tracking-wide uppercase">
                {tag}
              </span>
            </motion.div>
            <motion.h1 {...fadeUp} className="text-display-lg text-white mb-5">
              {headline}
            </motion.h1>
            <motion.p {...fadeUp} className="text-lg text-graphite-400 leading-relaxed max-w-2xl mb-8">
              {description}
            </motion.p>
            <motion.div {...fadeUp} className="flex flex-wrap gap-4">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-graphite-950 text-[15px] font-semibold hover:bg-graphite-100 transition-all shadow-lg"
              >
                Book Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white text-[15px] font-medium hover:bg-white/5 transition-all"
              >
                How It Works
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <Section>
        <SectionLabel>Benefits</SectionLabel>
        <SectionTitle>What {title} can support</SectionTitle>
        <SectionDescription>
          Results vary by individual. All treatments require evaluation and supervision by a licensed provider.
        </SectionDescription>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b) => (
            <Card key={b.title}>
              <div className="w-10 h-10 rounded-xl bg-graphite-100 flex items-center justify-center text-graphite-700 mb-4">
                {b.icon}
              </div>
              <h3 className="text-[16px] font-semibold text-graphite-950 mb-2">{b.title}</h3>
              <p className="text-[13px] text-graphite-500 leading-relaxed">{b.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section className="bg-graphite-50">
        <div className="text-center mb-14">
          <SectionLabel>The Process</SectionLabel>
          <SectionTitle>How {title} works at Bloom Metabolics</SectionTitle>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {process.map((p) => (
            <div key={p.step}>
              <span className="text-[56px] font-bold text-graphite-100 leading-none">{p.step}</span>
              <h3 className="text-headline mt-2 mb-2">{p.title}</h3>
              <p className="text-[14px] text-graphite-500 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Ideal For */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>Is This Right For You?</SectionLabel>
            <SectionTitle>{title} may be right if you&apos;re experiencing</SectionTitle>
          </div>
          <div>
            <ul className="space-y-4">
              {idealFor.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-[15px] text-graphite-600">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[12px] text-graphite-400 mt-6">
              Eligibility is determined by a licensed provider. Not everyone qualifies.
            </p>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-graphite-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <SectionLabel>{title} FAQ</SectionLabel>
            <SectionTitle>Common questions about {title.toLowerCase()}</SectionTitle>
          </div>

          <div className="space-y-0 divide-y divide-graphite-200">
            {faqs.map((faq) => (
              <div key={faq.question} className="py-6">
                <h3 className="text-[16px] font-semibold text-graphite-950 mb-2">{faq.question}</h3>
                <p className="text-[14px] text-graphite-500 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section dark className="gradient-hero">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-display text-white mb-5">
            Ready to explore {title.toLowerCase()}?
          </h2>
          <p className="text-lg text-graphite-400 leading-relaxed mb-8">
            Start with a consultation. A licensed provider will review your health,
            discuss your goals, and determine if {title.toLowerCase()} is right for you.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-graphite-950 text-[15px] font-semibold hover:bg-graphite-100 transition-all shadow-lg"
          >
            Book Your Consultation <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-[12px] text-graphite-600 mt-5">{disclaimer}</p>
        </div>
      </Section>
    </>
  )
}
