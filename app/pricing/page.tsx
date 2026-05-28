'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Package, Microscope } from 'lucide-react'
import Section, { SectionLabel, SectionTitle, SectionDescription } from '@/components/ui/Section'
import PricingTable from '@/components/PricingTable'
import { primaryCtaLabel, primaryCtaSublabel, CONSULTATION } from '@/lib/pricing'

export default function PricingPage() {
  const ctaLabel = primaryCtaLabel()

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#020202] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#020202] via-[#050404] to-[#020202]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d0c0a]/5 border border-white/10 text-[11px] font-medium text-[#8a8268] uppercase tracking-[0.12em] mb-5">
              Membership Pricing
            </span>
            <h1 className="text-display-lg text-chrome mb-5">
              Three tiers of<br />
              precision care.
            </h1>
            <p className="text-lg text-[#8a8268] leading-relaxed max-w-xl mx-auto">
              Choose your membership level. Add treatment protocols as needed.
              Every path starts with a {CONSULTATION.display} Optimization Consultation, credited toward your first month.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing table — full: tiers + add-ons + peptide roadmap */}
      <Section>
        <p className="text-center text-[14px] text-[#8a8268] mb-10 max-w-2xl mx-auto font-light">
          Pricing reflected here is final as of pre-launch and may be refined before enrollment opens.
          Waitlist members will be the first to receive final pricing confirmation.
        </p>

        <PricingTable showConsultation />

        <div className="text-center mt-12">
          <Link
            href="/join"
            className="bloom-btn"
          >
            {ctaLabel} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <p className="text-[12px] text-[#8a8268] mt-3">{primaryCtaSublabel()}</p>
        </div>

        {/* Founder-direct note */}
        <div className="mt-16 max-w-2xl mx-auto border-t border-[#1a1814] pt-10">
          <p className="text-[15px] text-[#8a8268] leading-relaxed font-light italic">
            &ldquo;Pricing built around clinical value, not subscription games. Every tier includes
            physician oversight and pharmacy fulfillment from a US-based 503A partner. Questions about
            the tier model? Reply directly to my welcome email, I read every one.&rdquo;
          </p>
          <p className="text-[13px] text-[#d8cfbe] mt-4 font-medium">
           , Brian DeGuzman, RN
          </p>
        </div>
      </Section>

      {/* What you actually get */}
      <Section className="bg-[#050404]">
        <div className="text-center mb-12">
          <SectionLabel>What you get</SectionLabel>
          <SectionTitle>Every membership includes</SectionTitle>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {[
            { icon: <Microscope className="w-5 h-5" />, title: 'Real bloodwork', desc: 'At-home kit or local draw. Results reviewed by your physician.' },
            { icon: <Package className="w-5 h-5" />, title: 'Licensed pharmacy', desc: 'Medication shipped from a U.S.-licensed compounding pharmacy. Free shipping.' },
            { icon: <Shield className="w-5 h-5" />, title: 'Ongoing access', desc: 'Message your care team directly. Response times based on your membership tier.' },
          ].map((item) => (
            <div key={item.title} className="bg-[#0d0c0a] rounded-2xl border border-[#1a1814] p-6">
              <div className="w-9 h-9 rounded-xl bg-[#020202] text-white flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-[15px] font-semibold text-[#d8cfbe] mb-2">{item.title}</h3>
              <p className="text-[13px] text-[#8a8268] leading-relaxed">{item.desc}</p>
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
                q: 'How does the consultation work?',
                a: `The Optimization Consultation is ${CONSULTATION.display}, charged up front. If your physician determines you're not a candidate for treatment, we refund it in full. If you continue to a membership, the ${CONSULTATION.display} is credited toward your first month.`,
              },
              {
                q: 'What is included in the membership?',
                a: 'Your membership covers care team access, messaging, lab review, and ongoing coordination. Treatment add-ons (TRT, GLP-1, Sexual Health, Longevity) are layered on top and include all medication and supplies.',
              },
              {
                q: 'Can I change tiers later?',
                a: 'Yes. You can upgrade or downgrade your membership tier at any billing cycle. Add-ons can be added or removed independently.',
              },
              {
                q: 'Is bloodwork included?',
                a: 'Bloom Signature includes quarterly comprehensive labs at no additional cost. Essentials and Core tiers include lab review, the lab draw itself may be billed separately depending on your state.',
              },
              {
                q: 'What are the total costs?',
                a: 'Membership, add-on, and consultation pricing are the only charges. Shipping from our licensed compounding pharmacy is included on all programs.',
              },
              {
                q: 'Do you accept insurance?',
                a: 'Bloom Metabolics is cash-pay. Secure payment processing. Many patients find cash-pay simpler and more affordable than navigating insurance restrictions.',
              },
              {
                q: 'What about the annual option?',
                a: 'Annual prepay saves approximately two months of membership (about 17% off). Billed in advance. See our Terms of Service for cancellation and refund policy.',
              },
              {
                q: 'When will peptide therapy be available?',
                a: 'Our peptide service line is sequenced to FDA 503A pathway events. Join the Peptide Roadmap waitlist and we\'ll notify you as each tranche becomes available.',
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
          <p className="text-lg text-[#8a8268] leading-relaxed mb-8">
            Talk to a licensed physician. Get clear on eligibility, membership, and your personalized protocol before you commit.
          </p>
          <Link
            href="/join"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#0d0c0a] text-[#d8cfbe] text-[15px] font-semibold hover:bg-[#0d0c0a] transition-all shadow-lg"
          >
            {ctaLabel} <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-[12px] text-[#8a8268] mt-4">{primaryCtaSublabel()}</p>
        </div>
      </Section>
    </>
  )
}
