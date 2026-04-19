'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Star, Shield, Zap, Award, Microscope } from 'lucide-react'
import Section, { SectionLabel, SectionTitle } from '@/components/ui/Section'
import Card from '@/components/ui/Card'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0, 1] as [number, number, number, number] },
}

const clinics = [
  {
    name: 'Bloom Metabolics',
    tagline: 'Best for Personalized, Premium Care',
    highlight: true,
    overview: 'A specialized telehealth clinic focused on TRT, GLP-1 weight loss, and peptide therapy. Every protocol is built around individual lab panels and adjusted through ongoing monitoring.',
    strengths: [
      'Comprehensive lab panels with quarterly monitoring',
      'Individualized protocols based on biomarkers',
      'Offers peptide therapy alongside TRT and GLP-1',
      'AI-enhanced care operations',
      'Proactive provider communication',
    ],
    considerations: [
      'Higher price point than volume-based clinics',
      'Cash-pay only (no insurance billing)',
      'Newer brand with less name recognition',
    ],
    bestIf: 'You\u2019ve tried high-volume telehealth and want an upgrade in care quality \u2014 or you want TRT, GLP-1, and peptides under one specialized provider.',
    link: '/pricing',
  },
  {
    name: 'Hims',
    tagline: 'Best for Affordable Convenience',
    highlight: false,
    overview: 'The largest men\u2019s telehealth platform. They offer TRT alongside ED medications, hair loss treatments, and skincare. Optimized for volume \u2014 fast onboarding and competitive pricing.',
    strengths: [
      'Lowest price point in the market',
      'Well-known, trusted brand',
      'Broad service catalog',
      'Simple subscription model',
    ],
    considerations: [
      'Standardized protocols \u2014 less personalization',
      'Basic lab panels, less frequent monitoring',
      'High patient volume per provider',
      'No peptide therapy',
    ],
    bestIf: 'Cost is your primary concern and you want a simple, no-frills TRT subscription.',
  },
  {
    name: 'Ro (Roman)',
    tagline: 'Best for All-in-One Men\u2019s Health',
    highlight: false,
    overview: 'Started as Roman (ED treatment) and expanded into TRT, weight loss, and primary care. Their in-house pharmacy is a standout \u2014 fast, discreet home delivery.',
    strengths: [
      'In-house pharmacy with home delivery',
      'Broad men\u2019s health platform',
      'Solid clinical team',
      'Mid-range pricing',
    ],
    considerations: [
      'More standardized than specialized clinics',
      'At-home test kits may miss markers',
      'No peptide therapy',
      'Less focus on hormone optimization specifically',
    ],
    bestIf: 'You want pharmacy convenience and a single platform for TRT + other men\u2019s health needs.',
  },
  {
    name: 'Marek Health',
    tagline: 'Best for Data-Driven Optimization',
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
    tagline: 'Best for Straightforward Hormone Management',
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
      'Limited peptide options',
    ],
    bestIf: 'You want simple, legitimate TRT without the lifestyle brand marketing.',
  },
]

const comparisonTable = [
  { feature: 'Specialization', values: ['Hormone + Metabolic', 'General Men\u2019s Health', 'General Men\u2019s Health', 'Hormone Optimization', 'Hormone Management'] },
  { feature: 'Lab Depth', values: [5, 2, 3, 5, 3] },
  { feature: 'Personalization', values: [5, 2, 3, 4, 3] },
  { feature: 'Provider Access', values: [5, 3, 3, 4, 4] },
  { feature: 'Peptide Therapy', values: [true, false, false, true, 'Limited'] },
  { feature: 'GLP-1', values: [true, true, true, false, false] },
  { feature: 'Pharmacy Convenience', values: [3, 4, 5, 3, 3] },
  { feature: 'Price Point', values: ['Premium', 'Budget', 'Mid-range', 'Premium', 'Mid-range'] },
]

const clinicNames = ['Bloom Metabolics', 'Hims', 'Ro', 'Marek', 'Peter MD']

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i <= count ? 'text-amber-400 fill-amber-400' : 'text-graphite-300'}`} />
      ))}
    </div>
  )
}

function CellValue({ value }: { value: string | number | boolean }) {
  if (typeof value === 'boolean') {
    return value
      ? <Check className="w-4 h-4 text-emerald-500" />
      : <span className="text-graphite-400">\u2014</span>
  }
  if (typeof value === 'number') return <StarRating count={value} />
  return <span className="text-[13px]">{value}</span>
}

const testimonials = [
  {
    quote: 'I was on Hims for 8 months. The price was great but I never felt like my protocol was dialed in. Bloom Metabolics actually looked at my full labs and adjusted my dosing \u2014 within a month I felt significantly better.',
    name: 'Michael K.',
    age: 42,
  },
  {
    quote: 'I tried Ro for the convenience, but the check-ins were minimal. Bloom Metabolics\u2019s provider actually reviews my labs quarterly and adjusts proactively. It\u2019s a different level of care.',
    name: 'David T.',
    age: 45,
  },
  {
    quote: 'I\u2019d been sourcing peptides from research chem sites for a year. Switching to Bloom Metabolics gave me legitimate, pharmaceutical-grade protocols with actual medical oversight. Not worth the risk doing it any other way.',
    name: 'Alex M.',
    age: 36,
  },
]

export default function BestTRTClinicsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-graphite-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-graphite-950 via-graphite-900 to-graphite-950" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-28 lg:py-36">
          <motion.div initial="initial" animate="animate" className="max-w-3xl">
            <motion.div {...fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[12px] font-medium text-graphite-300 tracking-wide">
                Updated April 2026
              </span>
            </motion.div>
            <motion.h1 {...fadeUp} className="text-display-lg text-white mb-6">
              5 Best Online TRT Clinics in 2026
            </motion.h1>
            <motion.p {...fadeUp} className="text-xl text-graphite-400 leading-relaxed max-w-2xl">
              An honest comparison of the top online TRT clinics: Bloom Metabolics, Hims, Roman, Marek Health, and Peter MD. Pricing, lab work, personalization, and care quality.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Why Looking */}
      <Section>
        <SectionLabel>Context</SectionLabel>
        <SectionTitle>Why Men Are Looking for Alternatives</SectionTitle>
        <div className="mt-8 max-w-3xl">
          <p className="text-lg text-graphite-600 leading-relaxed mb-6">
            If you&apos;re researching online TRT clinics, you&apos;re probably in one of two situations:
          </p>
          <div className="grid gap-4">
            <div className="flex items-start gap-4 bg-graphite-50 rounded-xl p-5">
              <div className="w-8 h-8 rounded-full bg-graphite-950 text-white text-[13px] font-bold flex items-center justify-center flex-shrink-0">1</div>
              <p className="text-[15px] text-graphite-600"><strong className="text-graphite-950">You&apos;ve been on Hims or Roman</strong> and feel like your protocol isn&apos;t dialed in. You want more personalized care with better lab monitoring.</p>
            </div>
            <div className="flex items-start gap-4 bg-graphite-50 rounded-xl p-5">
              <div className="w-8 h-8 rounded-full bg-graphite-950 text-white text-[13px] font-bold flex items-center justify-center flex-shrink-0">2</div>
              <p className="text-[15px] text-graphite-600"><strong className="text-graphite-950">You&apos;re new to TRT</strong> and trying to figure out which clinic is actually good \u2014 not just good at marketing.</p>
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
            <Card key={i} dark>
              <item.icon className="w-5 h-5 text-emerald-400 mb-3" />
              <h4 className="text-[14px] font-semibold text-white mb-1">{item.title}</h4>
              <p className="text-[13px] text-graphite-400">{item.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Clinic Cards */}
      <Section>
        <SectionLabel>The Rankings</SectionLabel>
        <SectionTitle>The 5 Best Online TRT Clinics</SectionTitle>
        <div className="mt-12 grid gap-8">
          {clinics.map((clinic, i) => (
            <div
              key={i}
              className={`rounded-2xl border p-8 ${
                clinic.highlight
                  ? 'border-emerald-200 bg-emerald-50/30 relative'
                  : 'border-graphite-100 bg-white'
              }`}
            >
              {clinic.highlight && (
                <div className="absolute -top-3 left-6 px-3 py-1 bg-graphite-950 text-white text-[11px] font-semibold uppercase tracking-wider rounded-full">
                  Our Pick
                </div>
              )}
              <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                <div>
                  <div className="text-[12px] font-semibold text-graphite-400 uppercase tracking-wider mb-1">#{i + 1}</div>
                  <h3 className="text-xl font-semibold text-graphite-950">{clinic.name}</h3>
                  <p className="text-[14px] text-graphite-500">{clinic.tagline}</p>
                </div>
              </div>

              <p className="text-[15px] text-graphite-600 mb-6">{clinic.overview}</p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-[12px] font-semibold text-emerald-600 uppercase tracking-wider mb-3">Strengths</h4>
                  <ul className="space-y-2">
                    {clinic.strengths.map((s, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-[14px] text-graphite-600">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[12px] font-semibold text-graphite-400 uppercase tracking-wider mb-3">Considerations</h4>
                  <ul className="space-y-2">
                    {clinic.considerations.map((c, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-graphite-300 flex-shrink-0 mt-2" />
                        <span className="text-[14px] text-graphite-500">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-graphite-50 rounded-xl px-5 py-3 flex items-start gap-2">
                <span className="text-[14px] font-semibold text-graphite-950">Best if:</span>
                <span className="text-[14px] text-graphite-600">{clinic.bestIf}</span>
              </div>

              {clinic.link && (
                <div className="mt-6">
                  <Link
                    href={clinic.link}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-graphite-950 text-white text-[14px] font-semibold hover:bg-graphite-800 transition-all"
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
              <tr className="border-b border-graphite-800">
                <th className="py-4 pr-4 text-[13px] font-semibold text-graphite-400 uppercase tracking-wider">Feature</th>
                {clinicNames.map((name, i) => (
                  <th key={i} className={`py-4 px-3 text-[13px] font-semibold uppercase tracking-wider ${i === 0 ? 'text-emerald-400' : 'text-graphite-400'}`}>
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonTable.map((row, i) => (
                <tr key={i} className="border-b border-graphite-800/50">
                  <td className="py-4 pr-4 text-[14px] font-medium text-graphite-300">{row.feature}</td>
                  {row.values.map((val, j) => (
                    <td key={j} className={`py-4 px-3 ${j === 0 ? 'text-graphite-300' : 'text-graphite-500'}`}>
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
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-[14px] text-graphite-600 leading-relaxed mb-4 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-[13px] font-semibold text-graphite-950">
                {t.name}, Age {t.age}
              </p>
            </Card>
          ))}
        </div>
        <p className="text-[12px] text-graphite-400 mt-6">
          Testimonials reflect individual patient experiences. Results vary. All treatments supervised by licensed providers.
        </p>
      </Section>

      {/* Recommendation */}
      <Section dark>
        <SectionLabel dark>Our Recommendation</SectionLabel>
        <SectionTitle dark>Choose Based on What Matters Most</SectionTitle>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { need: 'Personalized care + peptides + TRT + GLP-1', pick: 'Bloom Metabolics' },
            { need: 'Affordable, basic TRT', pick: 'Hims' },
            { need: 'Pharmacy convenience + broad men\u2019s health', pick: 'Ro' },
            { need: 'Data-driven optimization + extensive labs', pick: 'Marek Health' },
            { need: 'Simple, no-frills hormone management', pick: 'Peter MD' },
          ].map((item, i) => (
            <Card key={i} dark>
              <p className="text-[14px] text-graphite-400 mb-2">{item.need}</p>
              <p className="text-[15px] font-semibold text-white">\u2192 {item.pick}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <section className="bg-graphite-950 py-20 lg:py-28 border-t border-graphite-800">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-display text-white mb-5">
            The &ldquo;Best&rdquo; Clinic Depends on You
          </h2>
          <p className="text-lg text-graphite-400 mb-8 max-w-xl mx-auto">
            If you&apos;ve made it this far in your research, you probably care about more than just price. Book a Bloom Metabolics consultation and find out what personalized care actually feels like.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-graphite-950 text-[15px] font-semibold hover:bg-graphite-100 transition-all shadow-lg"
          >
            Book Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-[12px] text-graphite-400 mt-8">
            Bloom Metabolics produced this comparison. We&apos;ve made every effort to be accurate and fair.
            We encourage you to do your own research. Last updated April 2026.
          </p>
        </div>
      </section>
    </>
  )
}
