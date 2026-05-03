'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Shield, Package, Microscope } from 'lucide-react'
import Section, { SectionLabel, SectionTitle, SectionDescription } from '@/components/ui/Section'
import PricingTable from '@/components/PricingTable'
import { primaryCtaLabel, primaryCtaSublabel } from '@/lib/pricing'

export default function PricingPage() {
  const ctaLabel = primaryCtaLabel()

  return (
    <>
      {/* Hero */}
      <section className="relative bg-graphite-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-graphite-950 via-graphite-900 to-graphite-950" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-graphite-300 uppercase tracking-[0.12em] mb-5">
              Pricing
            </span>
            <h1 className="text-display-lg text-chrome mb-5">
              Transparent pricing.<br />
              No hidden fees.
            </h1>
            <p className="text-lg text-graphite-400 leading-relaxed">
              Consultation up front. Program pricing confirmed by your physician before you pay.
              Refundable if you don&apos;t qualify.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing table */}
      <Section>
        <PricingTable />

        <div className="text-center mt-12">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-graphite-950 text-white text-[15px] font-semibold hover:bg-graphite-800 transition-all shadow-lg"
          >
            {ctaLabel} <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-[12px] text-graphite-500 mt-3">{primaryCtaSublabel()}</p>
        </div>
      </Section>

      {/* What you actually get */}
      <Section className="bg-graphite-50">
        <div className="text-center mb-12">
          <SectionLabel>What you get</SectionLabel>
          <SectionTitle>Every program includes</SectionTitle>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {[
            { icon: <Microscope className="w-5 h-5" />, title: 'Real bloodwork', desc: 'At-home kit or local draw. Results reviewed by your physician.' },
            { icon: <Package className="w-5 h-5" />, title: 'Licensed pharmacy', desc: 'Medication shipped from a U.S.-licensed compounding pharmacy. Free shipping.' },
            { icon: <Shield className="w-5 h-5" />, title: 'Ongoing access', desc: 'Message your care team directly. No premium tier required.' },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl border border-graphite-200 p-6">
              <div className="w-9 h-9 rounded-xl bg-graphite-950 text-white flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-[15px] font-semibold text-graphite-950 mb-2">{item.title}</h3>
              <p className="text-[13px] text-graphite-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Pricing FAQs */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <SectionLabel>Pricing FAQ</SectionLabel>
            <SectionTitle>Clear answers on cost</SectionTitle>
            <SectionDescription className="mx-auto">
              Pricing should never be a guessing game. Here&apos;s how it works.
            </SectionDescription>
          </div>

          <div className="divide-y divide-[#1a1814] border-y border-[#1a1814]">
            {[
              {
                q: 'How much is the consultation?',
                a: 'The consultation is $49, charged up front. If your physician determines you\'re not a candidate for treatment, we refund it in full. If you qualify and begin treatment within 7 days, the $49 is applied as a credit toward your first month.',
              },
              {
                q: 'Why is program pricing shown as "From"?',
                a: 'Medication price varies by dose and duration. Your physician will confirm your exact monthly cost during the consultation, before any treatment is prescribed.',
              },
              {
                q: 'Is bloodwork included?',
                a: 'Some state-required lab work may be billed separately. Your physician will tell you which labs are included and which are not before ordering.',
              },
              {
                q: 'Are there any hidden fees?',
                a: 'No. The consultation fee and program pricing are the only charges. Shipping from our licensed compounding pharmacy is free on all programs.',
              },
              {
                q: 'Do you accept insurance?',
                a: 'Bloom Metabolics is cash-pay. Payments run on Stripe. Many patients find cash-pay simpler and more affordable than navigating insurance restrictions.',
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes. Monthly programs can be cancelled anytime. You keep whatever medication you\'ve already received.',
              },
              {
                q: 'When will peptide therapy be available?',
                a: 'Peptide therapy is coming soon. Join the waitlist and we\'ll notify you as soon as enrollment opens. Pricing starts at $150/month as a standalone program or as an add-on to TRT or GLP-1.',
              },
            ].map((faq) => (
              <div key={faq.q} className="py-5">
                <h3 className="text-[15px] font-semibold text-white mb-1.5">{faq.q}</h3>
                <p className="text-[13px] text-[#d8cfbe] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section dark className="gradient-hero">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-display text-chrome mb-5">
            Start with a consultation.
          </h2>
          <p className="text-lg text-graphite-400 leading-relaxed mb-8">
            Talk to a licensed physician. Get clear on cost and eligibility before you commit.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-graphite-950 text-[15px] font-semibold hover:bg-graphite-100 transition-all shadow-lg"
          >
            {ctaLabel} <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-[12px] text-graphite-500 mt-4">{primaryCtaSublabel()}</p>
        </div>
      </Section>
    </>
  )
}
