'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Shield, Zap, Award, Microscope } from 'lucide-react'
import Section, { SectionLabel, SectionTitle } from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import EditorialDisclosure from '@/components/EditorialDisclosure'
import TestimonialDisclosure from '@/components/TestimonialDisclosure'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0, 1] as [number, number, number, number] },
}

// FTC Health Products Compliance Guidance — educational framing, no rankings
const clinics = [
  {
    name: 'Bloom Metabolics',
    tagline: 'Specialized TRT + GLP-1 Telehealth', // FTC — no "Best for" language
    highlight: false, // FTC — no visual elevation over competitors
    overview: 'A specialized telehealth clinic focused on TRT and compounded GLP-1 therapy. Protocols built around individual lab panels with ongoing monitoring. Compounded medications are not FDA-approved.',
    strengths: [
      'Comprehensive lab panels with quarterly monitoring',
      'Individualized protocols based on biomarkers',
      'RN-managed patient operations',
      'Proactive provider communication',
    ],
    considerations: [
      'Higher price point than volume-based clinics',
      'Cash-pay only (no insurance billing)',
      'Newer brand',
    ],
    bestIf: 'Patients seeking individualized, lab-informed hormone and metabolic therapy through a specialized provider.',
    link: '/pricing',
  },
  {
    name: 'Hims',
    tagline: 'Large-Scale Men\u2019s Telehealth Platform', // FTC — neutral descriptor
    highlight: false,
    overview: 'The largest men\u2019s telehealth platform. They offer TRT alongside ED medications, hair loss treatments, and skincare. Optimized for volume \u2014 fast onboarding and competitive pricing.',
    strengths: [
      'Lowest price point in the market',
      'Well-known, trusted brand',
      'Broad service catalog',
      'Simple subscription model',
    ],
    // FTC — neutral factual descriptions, no evaluative qualifiers
    considerations: [
      'Standardized protocol tiers',
      'Focused lab panels at intake',
      'High-volume telehealth model',
    ],
    bestIf: 'Patients prioritizing affordability and convenience with a well-known telehealth brand.',
  },
  {
    name: 'Ro (Roman)',
    tagline: 'Broad Men\u2019s Health Platform with In-House Pharmacy', // FTC — neutral
    highlight: false,
    overview: 'Started as Roman (ED treatment) and expanded into TRT, weight loss, and primary care. Their in-house pharmacy is a standout \u2014 fast, discreet home delivery.',
    strengths: [
      'In-house pharmacy with home delivery',
      'Broad men\u2019s health platform',
      'Solid clinical team',
      'Mid-range pricing',
    ],
    // FTC — neutral factual descriptions
    considerations: [
      'Standardized approach across services',
      'At-home test kits for lab work',
      'Broad service focus beyond hormones',
    ],
    bestIf: 'You want pharmacy convenience and a single platform for TRT + other men\u2019s health needs.',
  },
  {
    name: 'Marek Health',
    tagline: 'Optimization-Focused Hormone Clinic', // FTC — neutral
    highlight: false,
    overview: 'Founded by Derek (More Plates More Dates), targeting the optimization-focused demographic. Extensive lab panels and a community of patients who take protocols seriously.',
    strengths: [
      'Extremely comprehensive lab panels',
      'Strong reputation in optimization community',
      'Knowledgeable providers',
      'Active content/education ecosystem',
    ],
    considerations: [
      'Wait times for new patients can be long',
      'Customer service reviews are mixed',
      'Premium pricing',
      'Provider availability can be inconsistent',
    ],
    bestIf: 'You\u2019re deep in the optimization world, follow the science closely, and want a provider who speaks your language.',
  },
  {
    name: 'Peter MD',
    tagline: 'Straightforward Hormone Management', // FTC — neutral
    highlight: false,
    overview: 'Offers TRT and hormone management through a straightforward telehealth model. Less marketing-heavy, more clinically focused.',
    strengths: [
      'Clean, clinical approach',
      'Reasonable pricing',
      'Good provider reviews',
      'Straightforward process',
    ],
    considerations: [
      'Smaller brand, less market presence',
      'Narrower service offering',
      'Less advanced monitoring',
      'Narrower treatment options',
    ],
    bestIf: 'You want simple, legitimate TRT without the lifestyle brand marketing.',
  },
]

// FTC Health Products Compliance Guidance — prose descriptions, no numerical scoring
const comparisonTable = [
  { feature: 'Specialization', values: ['Hormone + Metabolic', 'General Men\u2019s Health', 'General Men\u2019s Health', 'Hormone Optimization', 'Hormone Management'] },
  { feature: 'GLP-1 Available', values: ['Yes (compounded)', 'Yes', 'Yes', 'No', 'No'] },
  { feature: 'Price Point', values: ['Premium', 'Budget', 'Mid-range', 'Premium', 'Mid-range'] },
]

const clinicNames = ['Bloom Metabolics', 'Hims', 'Ro', 'Marek', 'Peter MD']

// FTC — star ratings removed entirely per compliance audit
function CellValue({ value }: { value: string | number | boolean }) {
  if (typeof value === 'boolean') {
    return value
      ? <Check className="w-4 h-4 text-[#c9b88c]" />
      : <span className="text-[#8a8268]">{'\u2014'}</span>
  }
  return <span className="text-[13px]">{String(value)}</span>
}

const testimonials = [
  {
    // FTC — removed outcome-specific timeframe
    quote: 'I was on Hims for 8 months. Bloom Metabolics reviewed my full labs and adjusted my dosing based on individual biomarkers.',
    name: 'Michael K.',
    age: 42,
  },
  {
    quote: 'I tried Ro for the convenience, but the check-ins were minimal. Bloom Metabolics\u2019s provider actually reviews my labs quarterly and adjusts proactively. It\u2019s a different level of care.',
    name: 'David T.',
    age: 45,
  },
  {
    quote: 'The quarterly lab reviews at Bloom Metabolics caught something my previous clinic missed. Having a provider who actually digs into the numbers makes all the difference.',
    name: 'Alex M.',
    age: 36,
  },
]

export default function BestTRTClinicsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#020202] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#020202] via-[#050404] to-[#020202]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-28 lg:py-36">
          <motion.div initial="initial" animate="animate" className="max-w-3xl">
            <motion.div {...fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0d0c0a]/5 border border-white/10 text-[12px] font-medium text-[#8a8268] tracking-wide">
                Updated April 2026
              </span>
            </motion.div>
            {/* FTC Health Products Compliance Guidance — educational framing */}
            <motion.h1 {...fadeUp} className="text-display-lg text-white mb-6">
              Choosing an Online TRT Clinic: A Patient&apos;s Guide (2026)
            </motion.h1>
            <motion.p {...fadeUp} className="text-xl text-[#8a8268] leading-relaxed max-w-2xl">
              An overview of five online TRT clinics — Bloom Metabolics, Hims, Roman, Marek Health, and Peter MD — covering their approaches to lab work, personalization, and patient care.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* FTC — Editorial disclosure at top, before any content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-8">
        <EditorialDisclosure variant="prominent" lastReviewed="April 29, 2026" />
      </div>

      {/* Why Looking */}
      <Section>
        <SectionLabel>Context</SectionLabel>
        <SectionTitle>Why Men Are Looking for Alternatives</SectionTitle>
        <div className="mt-8 max-w-3xl">
          <p className="text-lg text-[#8a8268] leading-relaxed mb-6">
            If you&apos;re researching online TRT clinics, you&apos;re probably in one of two situations:
          </p>
          <div className="grid gap-4">
            <div className="flex items-start gap-4 bg-[#050404] rounded-xl p-5">
              <div className="w-8 h-8 rounded-full bg-[#020202] text-white text-[13px] font-bold flex items-center justify-center flex-shrink-0">1</div>
              <p className="text-[15px] text-[#8a8268]"><strong className="text-[#d8cfbe]">You&apos;ve been on Hims or Roman</strong> and feel like your protocol isn&apos;t dialed in. You want individualized protocols with comprehensive lab monitoring.</p>
            </div>
            <div className="flex items-start gap-4 bg-[#050404] rounded-xl p-5">
              <div className="w-8 h-8 rounded-full bg-[#020202] text-white text-[13px] font-bold flex items-center justify-center flex-shrink-0">2</div>
              <p className="text-[15px] text-[#8a8268]"><strong className="text-[#d8cfbe]">You&apos;re new to TRT</strong> and trying to figure out which clinic is actually good \u2014 not just good at marketing.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* What to Look For */}
      <Section dark>
        <SectionLabel dark>Criteria</SectionLabel>
        <SectionTitle dark>What to Look for in an Online TRT Clinic</SectionTitle>
        <div className="mt-10 grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { icon: Microscope, title: 'Comprehensive Labs', desc: 'Not just total T \u2014 free T, estradiol, SHBG, CBC, and more' },
            { icon: Zap, title: 'Individualized Protocols', desc: 'Dosing based on YOUR labs, not a template' },
            { icon: Shield, title: 'Ongoing Monitoring', desc: 'Quarterly labs and proactive adjustments' },
            { icon: Award, title: 'Experienced Providers', desc: 'Board-eligible clinicians, not overwhelmed practitioners' },
            { icon: Check, title: 'Transparent Pricing', desc: 'Know what you\u2019re paying and what\u2019s included' },
          ].map((item, i) => (
            <Card key={i}>
              <item.icon className="w-5 h-5 text-[#c9b88c] mb-3" />
              <h4 className="text-[14px] font-semibold text-white mb-1">{item.title}</h4>
              <p className="text-[13px] text-[#8a8268]">{item.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Clinic Cards */}
      <Section>
        {/* FTC — educational framing, no rankings */}
        <SectionLabel>Clinic Profiles</SectionLabel>
        <SectionTitle>Overview of Five Online TRT Clinics</SectionTitle>
        <div className="mt-12 grid gap-8">
          {clinics.map((clinic, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[#1a1814] bg-[#0d0c0a] p-8"
            >
              <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#d8cfbe]">{clinic.name}</h3>
                  <p className="text-[14px] text-[#8a8268]">{clinic.tagline}</p>
                </div>
              </div>

              <p className="text-[15px] text-[#8a8268] mb-6">{clinic.overview}</p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-[12px] font-semibold text-[#c9b88c] uppercase tracking-wider mb-3">Strengths</h4>
                  <ul className="space-y-2">
                    {clinic.strengths.map((s, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#c9b88c] flex-shrink-0 mt-0.5" />
                        <span className="text-[14px] text-[#8a8268]">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[12px] font-semibold text-[#8a8268] uppercase tracking-wider mb-3">Considerations</h4>
                  <ul className="space-y-2">
                    {clinic.considerations.map((c, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8a8268] flex-shrink-0 mt-2" />
                        <span className="text-[14px] text-[#8a8268]">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-[#050404] rounded-xl px-5 py-3 flex items-start gap-2">
                <span className="text-[14px] font-semibold text-[#d8cfbe]">Best if:</span>
                <span className="text-[14px] text-[#8a8268]">{clinic.bestIf}</span>
              </div>

              {clinic.link && (
                <div className="mt-6">
                  <Link
                    href={clinic.link}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#020202] text-white text-[14px] font-semibold hover:bg-[#0d0c0a] transition-all"
                  >
                    Book Consultation
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Comparison Table */}
      <Section dark>
        <SectionLabel dark>At a Glance</SectionLabel>
        <SectionTitle dark>Full Comparison Table</SectionTitle>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#1a1814]">
                <th className="py-4 pr-4 text-[13px] font-semibold text-[#8a8268] uppercase tracking-wider">Feature</th>
                {clinicNames.map((name, i) => (
                  <th key={i} className={`py-4 px-3 text-[13px] font-semibold uppercase tracking-wider ${i === 0 ? 'text-[#c9b88c]' : 'text-[#8a8268]'}`}>
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonTable.map((row, i) => (
                <tr key={i} className="border-b border-[#1a1814]/50">
                  <td className="py-4 pr-4 text-[14px] font-medium text-[#8a8268]">{row.feature}</td>
                  {row.values.map((val, j) => (
                    <td key={j} className={`py-4 px-3 ${j === 0 ? 'text-[#8a8268]' : 'text-[#8a8268]'}`}>
                      <CellValue value={val} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <SectionLabel>What Patients Say About Switching</SectionLabel>
        <SectionTitle>Real Experiences</SectionTitle>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card key={i}>
              {/* FTC — star ratings removed */}
              <p className="text-[14px] text-[#8a8268] leading-relaxed mb-4 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-[13px] font-semibold text-[#d8cfbe]">
                {t.name}, Age {t.age}
              </p>
              <TestimonialDisclosure variant="hormone" />
            </Card>
          ))}
        </div>
        {/* FTC — per-testimonial disclosure replaces generic footer */}
      </Section>

      {/* Recommendation */}
      <Section dark>
        {/* FTC — educational framing, not recommendations */}
        <SectionLabel dark>Considerations</SectionLabel>
        <SectionTitle dark>Factors to Evaluate When Choosing</SectionTitle>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { need: 'Personalized care + TRT + GLP-1', pick: 'Bloom Metabolics' },
            { need: 'Affordable, basic TRT', pick: 'Hims' },
            { need: 'Pharmacy convenience + broad men\u2019s health', pick: 'Ro' },
            { need: 'Data-driven optimization + extensive labs', pick: 'Marek Health' },
            { need: 'Simple, no-frills hormone management', pick: 'Peter MD' },
          ].map((item, i) => (
            <Card key={i}>
              <p className="text-[14px] text-[#8a8268] mb-2">{item.need}</p>
              <p className="text-[15px] font-semibold text-white">\u2192 {item.pick}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <section className="bg-[#020202] py-20 lg:py-28 border-t border-[#1a1814]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-display text-white mb-5">
            The &ldquo;Best&rdquo; Clinic Depends on You
          </h2>
          <p className="text-lg text-[#8a8268] mb-8 max-w-xl mx-auto">
            If you&apos;ve made it this far in your research, you probably care about more than just price. Book a Bloom Metabolics consultation and find out what personalized care actually feels like.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0d0c0a] text-[#d8cfbe] text-[15px] font-semibold hover:bg-[#0d0c0a] transition-all shadow-lg"
          >
            Book Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-[12px] text-[#8a8268] mt-8">
            Bloom Metabolics produced this comparison. We&apos;ve made every effort to be accurate and fair.
            We encourage you to do your own research. Last updated April 2026.
          </p>
        </div>
      </section>
    </>
  )
}
