'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check, X, Star, Shield, Microscope, Activity, Users } from 'lucide-react'
import Section, { SectionLabel, SectionTitle, SectionDescription } from '@/components/ui/Section'
import Card from '@/components/ui/Card'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0, 1] as [number, number, number, number] },
}

const comparisonRows = [
  { feature: 'Approach', nova: 'Personalized, lab-informed protocols', hims: 'Standardized protocols at scale' },
  { feature: 'Providers', nova: 'Licensed, board-eligible clinicians', hims: 'Licensed providers (high patient volume)' },
  { feature: 'Lab Work', nova: 'Comprehensive panels + quarterly monitoring', hims: 'Basic labs, less frequent monitoring' },
  { feature: 'Treatment Customization', nova: 'Individualized dosing based on biomarkers', hims: 'Standardized dosing tiers' },
  { feature: 'Follow-up Cadence', nova: 'Regular check-ins, proactive adjustments', hims: 'Periodic check-ins, patient-initiated' },
  { feature: 'Services', nova: 'TRT, GLP-1, Peptides', hims: 'TRT, ED, hair loss, skincare, GLP-1' },
  { feature: 'Pricing', nova: 'Premium, consultation + program fee', hims: 'Subscription, lower price point' },
  { feature: 'Pharmacy', nova: 'Partner pharmacy network', hims: 'Third-party pharmacy' },
]

const detailedSections = [
  {
    title: 'Medical Oversight & Provider Access',
    icon: Shield,
    nova: 'Every patient is matched with a licensed clinician who manages their protocol end-to-end. Providers review comprehensive lab panels, adjust dosing based on individual biomarkers, and conduct regular check-ins. The care team is proactive — they reach out to you.',
    hims: 'Providers are licensed and legitimate, but the high-volume model means less time per patient. Consultations tend to be shorter and more standardized. Hims is optimized for throughput — which keeps prices low but limits personalization.',
    bottomLine: 'If you want a provider who knows your full lab picture and adjusts your protocol proactively, Bloom Metabolics offers a more hands-on experience.',
  },
  {
    title: 'Lab Work & Monitoring',
    icon: Microscope,
    nova: 'Comprehensive lab panels at intake, with quarterly bloodwork throughout treatment. Labs include total and free testosterone, estradiol, SHBG, CBC, metabolic panel, lipids, PSA, thyroid markers, and more. Every lab is reviewed with you by your provider.',
    hims: 'Basic lab work required at intake. Monitoring cadence is less frequent, and panels tend to cover fewer markers. Some patients report having to request additional labs.',
    bottomLine: 'If you want thorough, ongoing lab monitoring — not just a checkbox at intake — Bloom Metabolics\u2019s approach is more comprehensive.',
  },
  {
    title: 'Treatment Personalization',
    icon: Activity,
    nova: 'Protocols are built around your individual biomarkers, symptoms, and goals. Dosing is adjusted based on follow-up labs — not just how you feel (though that matters too). No one-size-fits-all.',
    hims: 'Tends to offer standardized protocol tiers. This works for many men, but may not account for individual variability in how patients metabolize testosterone or respond to specific dosing.',
    bottomLine: 'If your body doesn\u2019t respond to standard dosing — or you want optimization beyond \u201Cnormal\u201D — Bloom Metabolics\u2019s individualized approach matters.',
  },
  {
    title: 'Services Beyond TRT',
    icon: Users,
    nova: 'TRT, GLP-1 medical weight loss, and peptide therapy. Focused on hormone and metabolic optimization.',
    hims: 'Broader catalog — TRT, ED medications, hair loss treatments, skincare, mental health. A one-stop men\u2019s health brand.',
    bottomLine: 'If you want hormones and peptides from a specialized provider, Bloom Metabolics. If you want a general men\u2019s health subscription covering multiple categories, Hims.',
  },
]

const testimonials = [
  {
    quote: 'I was on Hims for 8 months. The price was great but I never felt like my protocol was dialed in. Bloom Metabolics actually looked at my full labs and adjusted my dosing \u2014 within a month I felt significantly better.',
    name: 'Michael K.',
    age: 42,
  },
  {
    quote: 'The difference is night and day. With Bloom Metabolics, my provider actually calls me to check in. On Hims, I had to chase someone down if I had a question.',
    name: 'Jason R.',
    age: 38,
  },
]

export default function VsHimsPage() {
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
              Bloom Metabolics vs Hims
            </motion.h1>
            <motion.p {...fadeUp} className="text-xl text-graphite-400 leading-relaxed max-w-2xl">
              Comparing personalized, lab-informed TRT with licensed providers to Hims&apos; high-volume telehealth model. An honest look at what each offers.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* TL;DR */}
      <Section>
        <SectionLabel>TL;DR</SectionLabel>
        <div className="max-w-3xl">
          <p className="text-lg text-graphite-600 leading-relaxed">
            Hims is the largest men&apos;s telehealth brand — affordable, fast, and familiar. Bloom Metabolics is a premium alternative built for men who want individualized protocols, comprehensive labs, and ongoing medical oversight rather than a standardized approach. <strong className="text-graphite-950">If cost is your primary concern, Hims is hard to beat. If quality of care and personalization matter more, Bloom Metabolics is designed for that.</strong>
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
                <th className="py-4 text-[13px] font-semibold text-graphite-400 uppercase tracking-wider w-[37.5%]">Hims</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={i} className="border-b border-graphite-800/50">
                  <td className="py-4 pr-6 text-[14px] font-medium text-graphite-300">{row.feature}</td>
                  <td className="py-4 pr-6 text-[14px] text-graphite-400">{row.nova}</td>
                  <td className="py-4 text-[14px] text-graphite-500">{row.hims}</td>
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
                  <div className="text-[12px] font-semibold text-graphite-400 uppercase tracking-wider mb-3">Hims</div>
                  <p className="text-[15px] text-graphite-600 leading-relaxed">{section.hims}</p>
                </Card>
              </div>
              <div className="bg-graphite-50 rounded-xl px-6 py-4">
                <p className="text-[14px] text-graphite-700"><strong>Bottom line:</strong> {section.bottomLine}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Who It's Best For */}
      <Section dark>
        <SectionLabel dark>Who It&apos;s Best For</SectionLabel>
        <SectionTitle dark>Choose Based on What You Value</SectionTitle>
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <Card dark>
            <div className="text-[13px] font-semibold text-emerald-400 uppercase tracking-wider mb-4">Bloom Metabolics Is Best For</div>
            <ul className="space-y-3">
              {[
                'Men who want individualized, lab-informed protocols',
                'Patients who value proactive medical oversight',
                'Those who want comprehensive labs with thorough review',
                'Men interested in peptide therapy',
                'Patients who\u2019ve tried high-volume telehealth and felt like a number',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-1" />
                  <span className="text-[14px] text-graphite-300">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card dark>
            <div className="text-[13px] font-semibold text-graphite-400 uppercase tracking-wider mb-4">Hims Is Best For</div>
            <ul className="space-y-3">
              {[
                'Men who prioritize affordability above all',
                'Those comfortable with standardized protocols',
                'Patients who want TRT, ED, and hair loss in one subscription',
                'Men starting their hormone journey with a low-commitment entry',
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
            <Card key={i} className="relative">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-[15px] text-graphite-600 leading-relaxed mb-4 italic">
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

      {/* Switching Steps */}
      <Section dark>
        <SectionLabel dark>Switching from Hims</SectionLabel>
        <SectionTitle dark>How to Transition to Bloom Metabolics</SectionTitle>
        <SectionDescription dark>No need to cancel Hims first. We coordinate a seamless transition.</SectionDescription>
        <div className="mt-10 grid md:grid-cols-4 gap-6">
          {[
            { step: '1', title: 'Book Consultation', desc: 'Schedule with a Bloom Metabolics provider' },
            { step: '2', title: 'Comprehensive Labs', desc: 'We expand your panel beyond what Hims checked' },
            { step: '3', title: 'Personalized Protocol', desc: 'Your provider builds an individualized plan' },
            { step: '4', title: 'Seamless Transition', desc: 'No gap in treatment, coordinated timing' },
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
            Ready to Experience the Difference?
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
