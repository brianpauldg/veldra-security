'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import Section, { SectionLabel, SectionTitle, SectionDescription } from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import GLP1ComplianceDisclosure from '@/components/GLP1ComplianceDisclosure'
import SymptomChecklistCTA, { type SymptomChecklistVertical } from '@/components/SymptomChecklistCTA'
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
  addOnPricing?: string
  disclaimer: string
  /**
   * Which symptom-checklist quiz to point the secondary CTA at.
   * - 'trt'     → /quiz       (TRT / hormone assessment)
   * - 'glp1'    → /glp1-quiz  (GLP-1 / weight-loss assessment)
   * - 'hormone' → /quiz       (broad hormone assessment)
   * If omitted, the secondary CTA is hidden (back-compat for legacy callers).
   */
  checklistVertical?: SymptomChecklistVertical
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0, 1] as [number, number, number, number] },
}

export default function TreatmentPage({
  tag, title, headline, description,
  benefits, process, faqs, idealFor, addOnPricing, disclaimer,
  checklistVertical,
}: TreatmentPageProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#020202] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#020202] via-[#050404] to-[#020202]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(26,154,115,0.06),_transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-36">
          <motion.div initial="initial" animate="animate" className="max-w-3xl">
            <motion.div {...fadeUp} className="mb-5">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0d0c0a]/5 border border-white/10 text-[12px] font-medium text-[#8a8268] tracking-wide uppercase">
                {tag}
              </span>
            </motion.div>
            <motion.h1 {...fadeUp} className="text-display-lg text-white mb-5">
              {headline}
            </motion.h1>
            <motion.p {...fadeUp} className="text-lg text-[#8a8268] leading-relaxed max-w-2xl mb-8">
              {description}
            </motion.p>
            {addOnPricing && (
              <motion.div {...fadeUp} className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0d0c0a]/5 border border-white/10 text-[13px] text-[#8a8268]">
                  {addOnPricing}
                </span>
              </motion.div>
            )}

            <motion.div {...fadeUp} className="flex flex-wrap gap-4">
              <Link
                href="/join"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0d0c0a] text-[#d8cfbe] text-[15px] font-semibold hover:bg-[#0d0c0a] transition-all shadow-lg"
              >
                Join Waitlist <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white text-[15px] font-medium hover:bg-[#0d0c0a]/5 transition-all"
              >
                How It Works
              </Link>
            </motion.div>

            {/* FDA April 1 2026 — compounded disclosure on GLP-1 pages */}
            {tag.toLowerCase().includes('glp') && (
              <motion.div {...fadeUp} className="mt-6">
                <GLP1ComplianceDisclosure variant="full" />
              </motion.div>
            )}
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
              <div className="w-10 h-10 rounded-xl bg-[#0d0c0a] flex items-center justify-center text-[#d8cfbe] mb-4">
                {b.icon}
              </div>
              <h3 className="text-[16px] font-semibold text-[#d8cfbe] mb-2">{b.title}</h3>
              <p className="text-[13px] text-[#8a8268] leading-relaxed">{b.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section className="bg-[#050404]">
        <div className="text-center mb-14">
          <SectionLabel>The Process</SectionLabel>
          <SectionTitle>How {title} works at Bloom Metabolics</SectionTitle>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {process.map((p) => (
            <div key={p.step}>
              <span className="text-[56px] font-bold text-[#1a1814] leading-none">{p.step}</span>
              <h3 className="text-headline mt-2 mb-2">{p.title}</h3>
              <p className="text-[14px] text-[#8a8268] leading-relaxed">{p.description}</p>
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
                  <Check className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-[15px] text-[#8a8268]">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[12px] text-[#8a8268] mt-6">
              Eligibility is determined by a licensed provider. Not everyone qualifies.
            </p>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-[#050404]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <SectionLabel>{title} FAQ</SectionLabel>
            <SectionTitle>Common questions about {title.toLowerCase()}</SectionTitle>
          </div>

          <div className="space-y-0 divide-y divide-[#1a1814]">
            {faqs.map((faq) => (
              <div key={faq.question} className="py-6">
                <h3 className="text-[16px] font-semibold text-[#d8cfbe] mb-2">{faq.question}</h3>
                <p className="text-[14px] text-[#8a8268] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section dark className="gradient-hero">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-display text-white mb-5">
            Considering {title.toLowerCase()}?
          </h2>
          <p className="text-lg text-[#8a8268] leading-relaxed mb-8">
            Start with a consultation. A licensed provider will review your health,
            discuss your goals, and determine if {title.toLowerCase()} is right for you.
          </p>
          <Link
            href="/join"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#0d0c0a] text-[#d8cfbe] text-[15px] font-semibold hover:bg-[#0d0c0a] transition-all shadow-lg"
          >
            Join Waitlist <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-[12px] text-[#8a8268] mt-5">{disclaimer}</p>
        </div>
      </Section>

      {/* Secondary conversion — captures the visitors not ready to commit. */}
      {checklistVertical ? <SymptomChecklistCTA vertical={checklistVertical} /> : null}
    </>
  )
}
