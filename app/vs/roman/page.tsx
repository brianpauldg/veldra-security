'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Shield, Microscope, Package } from 'lucide-react'
import Section, { SectionLabel, SectionTitle, SectionDescription } from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import EditorialDisclosure from '@/components/EditorialDisclosure'
import TestimonialDisclosure from '@/components/TestimonialDisclosure'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0, 1] as [number, number, number, number] },
}

const comparisonRows = [
  { feature: 'Approach', nova: 'Specialized hormone optimization', ro: 'Broad men\u2019s digital health' },
  { feature: 'Providers', nova: 'Dedicated clinicians, low patient ratio', ro: 'Licensed providers, high volume' },
  { feature: 'Lab Work', nova: 'Comprehensive panels + quarterly monitoring', ro: 'At-home test kits, basic panels' },
  { feature: 'Treatment Customization', nova: 'Individualized by biomarkers', ro: 'Protocol-based with some flexibility' },
  { feature: 'Follow-up', nova: 'Proactive provider outreach', ro: 'Mostly patient-initiated' },
  { feature: 'Services', nova: 'TRT, GLP-1', ro: 'TRT, ED, hair loss, weight loss, primary care' },
  { feature: 'Pricing', nova: 'Premium, consultation-based', ro: 'Mid-range subscription' },
  { feature: 'Pharmacy', nova: 'Partner pharmacy network', ro: 'In-house Ro Pharmacy (home delivery)' },
]

const detailedSections = [
  {
    title: 'Clinical Approach',
    icon: Shield,
    nova: 'Specialized in hormone and metabolic optimization. Every protocol starts with a comprehensive lab panel and clinical evaluation. Treatment is individualized \u2014 your dosing, frequency, and ancillary medications are calibrated to your specific biomarkers and symptoms.',
    ro: 'Offers TRT as part of a broader digital health platform. The clinical approach is solid but more standardized. Ro\u2019s in-house pharmacy model prioritizes speed and convenience of medication delivery.',
    // FTC — factual description
    bottomLine: 'Bloom Metabolics specializes in hormone optimization. Ro offers a broader range of men\u2019s health services.',
  },
  {
    title: 'Lab Work',
    icon: Microscope,
    nova: 'In-person lab draw at a partner lab. Comprehensive panel including total/free testosterone, estradiol, SHBG, CBC, CMP, lipids, PSA, thyroid, and more. Quarterly monitoring with full provider review.',
    ro: 'Offers at-home test kits for convenience. Panels are more basic. Some patients find they need to supplement with additional labs from their PCP for a complete picture.',
    // FTC — factual description
    bottomLine: 'Bloom Metabolics includes comprehensive lab panels as part of its standard intake. Ro offers at-home test kits for convenience.',
  },
  {
    title: 'Medication & Delivery',
    icon: Package,
    nova: 'Prescriptions filled through partner pharmacies. Focus is on getting the right protocol \u2014 not on delivery speed as a primary differentiator.',
    ro: 'In-house Ro Pharmacy with discreet home delivery. Fast, convenient, well-branded packaging. This is a genuine advantage for patients who value frictionless fulfillment.',
    // FTC — factual description
    bottomLine: 'Ro emphasizes pharmacy delivery speed. Bloom Metabolics emphasizes protocol customization based on biomarker analysis.',
  },
]

const testimonials = [
  {
    quote: 'I liked Ro\u2019s delivery system, but I never felt like my protocol was truly mine. Bloom Metabolics\u2019s provider spent 30 minutes reviewing my full lab panel on the first call \u2014 that never happened at Ro.',
    name: 'David T.',
    age: 45,
  },
  {
    // FTC — removed outcome-specific timeframe and comparative
    quote: 'Bloom Metabolics ordered comprehensive labs including estradiol, found a marker that needed attention, and adjusted my protocol accordingly.',
    name: 'Mark S.',
    age: 41,
  },
]

export default function VsRomanPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-graphite-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-graphite-950 via-graphite-900 to-graphite-950" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-28 lg:py-36">
          <motion.div initial="initial" animate="animate" className="max-w-3xl">
            <motion.div {...fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[12px] font-medium text-graphite-300 tracking-wide">
                Honest Comparison \u2014 Updated 2026
              </span>
            </motion.div>
            <motion.h1 {...fadeUp} className="text-display-lg text-white mb-6">
              Bloom Metabolics vs Ro (Roman)
            </motion.h1>
            <motion.p {...fadeUp} className="text-xl text-graphite-400 leading-relaxed max-w-2xl">
              Comparing personalized protocols and ongoing optimization to Ro&apos;s convenient digital health model. An honest look at what each offers.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* FTC — Editorial disclosure at top */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-8">
        <EditorialDisclosure variant="prominent" lastReviewed="April 29, 2026" />
      </div>

      {/* TL;DR */}
      <Section>
        <SectionLabel>TL;DR</SectionLabel>
        <div className="max-w-3xl">
          <p className="text-lg text-graphite-600 leading-relaxed">
            Ro (formerly Roman) is a well-known digital health platform offering TRT alongside ED, hair loss, and weight loss treatments. Bloom Metabolics is a specialized clinic focused on hormone optimization and GLP-1 therapy with personalized protocols and ongoing monitoring. <strong className="text-graphite-950">Ro offers broad convenience at scale; Bloom Metabolics offers depth and personalization in a narrower lane.</strong>
          </p>
        </div>
      </Section>

      {/* Comparison Table */}
      <Section dark>
        <SectionLabel dark>At a Glance</SectionLabel>
        <SectionTitle dark>Side-by-Side Comparison</SectionTitle>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-graphite-800">
                <th className="py-4 pr-6 text-[13px] font-semibold text-graphite-400 uppercase tracking-wider w-1/4">Feature</th>
                <th className="py-4 pr-6 text-[13px] font-semibold text-emerald-400 uppercase tracking-wider w-[37.5%]">Bloom Metabolics</th>
                <th className="py-4 text-[13px] font-semibold text-graphite-400 uppercase tracking-wider w-[37.5%]">Ro (Roman)</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={i} className="border-b border-graphite-800/50">
                  <td className="py-4 pr-6 text-[14px] font-medium text-graphite-300">{row.feature}</td>
                  <td className="py-4 pr-6 text-[14px] text-graphite-400">{row.nova}</td>
                  <td className="py-4 text-[14px] text-graphite-500">{row.ro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Detailed Comparisons */}
      <Section>
        <SectionLabel>Detailed Comparison</SectionLabel>
        <SectionTitle>Where the Differences Matter</SectionTitle>
        <div className="mt-12 grid gap-12">
          {detailedSections.map((section, i) => (
            <div key={i}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-graphite-100 flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-graphite-700" />
                </div>
                <h3 className="text-xl font-semibold text-graphite-950">{section.title}</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <Card>
                  <div className="text-[12px] font-semibold text-emerald-600 uppercase tracking-wider mb-3">Bloom Metabolics</div>
                  <p className="text-[15px] text-graphite-600 leading-relaxed">{section.nova}</p>
                </Card>
                <Card>
                  <div className="text-[12px] font-semibold text-graphite-400 uppercase tracking-wider mb-3">Ro (Roman)</div>
                  <p className="text-[15px] text-graphite-600 leading-relaxed">{section.ro}</p>
                </Card>
              </div>
              <div className="bg-graphite-50 rounded-xl px-6 py-4">
                <p className="text-[14px] text-graphite-700"><strong>Bottom line:</strong> {section.bottomLine}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* FTC — educational framing */}
      <Section dark>
        <SectionLabel dark>Who Each May Suit</SectionLabel>
        <SectionTitle dark>Choose Based on What You Value</SectionTitle>
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <Card dark>
            <div className="text-[13px] font-semibold text-emerald-400 uppercase tracking-wider mb-4">Bloom Metabolics May Suit</div>
            <ul className="space-y-3">
              {[
                'Men who want specialized hormone and metabolic optimization',
                'Patients who value comprehensive labs and proactive monitoring',
                'Those looking for individualized protocols',
                'Patients who want a provider-patient relationship, not a platform',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-1" />
                  <span className="text-[14px] text-graphite-300">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card dark>
            <div className="text-[13px] font-semibold text-graphite-400 uppercase tracking-wider mb-4">Ro May Suit</div>
            <ul className="space-y-3">
              {[
                'Men who want broad health services under one roof',
                'Those who prioritize pharmacy convenience and home delivery',
                'Patients comfortable with a more standardized approach',
                'Men looking for a mid-range price point',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-graphite-500 flex-shrink-0 mt-1" />
                  <span className="text-[14px] text-graphite-400">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <SectionLabel>What Patients Say About Switching</SectionLabel>
        <SectionTitle>Real Experiences</SectionTitle>
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <Card key={i}>
              {/* FTC — star ratings removed */}
              <p className="text-[15px] text-graphite-600 leading-relaxed mb-4 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-[13px] font-semibold text-graphite-950">
                {t.name}, Age {t.age}
              </p>
              <TestimonialDisclosure variant="hormone" />
            </Card>
          ))}
        </div>
        {/* FTC — per-testimonial disclosure replaces generic footer */}
      </Section>

      {/* Switching Steps */}
      <Section dark>
        <SectionLabel dark>Switching from Ro</SectionLabel>
        <SectionTitle dark>How to Transition to Bloom Metabolics</SectionTitle>
        <div className="mt-10 grid md:grid-cols-4 gap-6">
          {[
            { step: '1', title: 'Book Consultation', desc: 'No need to cancel Ro first' },
            { step: '2', title: 'Comprehensive Labs', desc: 'We expand your panel beyond what Ro checked' },
            { step: '3', title: 'Personalized Protocol', desc: 'Built around your full lab picture' },
            { step: '4', title: 'Seamless Transition', desc: 'Coordinated timing, no gap in treatment' },
          ].map((item, i) => (
            <Card key={i} dark>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4 text-[15px] font-bold text-white">
                {item.step}
              </div>
              <h4 className="text-[15px] font-semibold text-white mb-2">{item.title}</h4>
              <p className="text-[14px] text-graphite-400">{item.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <section className="bg-graphite-950 py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-display text-white mb-5">
            Ready for More Personalized Care?
          </h2>
          <p className="text-lg text-graphite-400 mb-8 max-w-xl mx-auto">
            Book a consultation with a Bloom Metabolics provider. We&apos;ll review your health history, order comprehensive labs, and build a protocol around your individual biomarkers.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-graphite-950 text-[15px] font-semibold hover:bg-graphite-100 transition-all shadow-lg"
          >
            Book Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
