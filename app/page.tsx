'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight, Check, ChevronRight,
  Syringe, TrendingUp, FlaskConical,
  Stethoscope, Microscope, Package, MessageCircle,
  Shield, Lock, Truck, UserCheck,
} from 'lucide-react'
import Section, { SectionLabel, SectionTitle, SectionDescription } from '@/components/ui/Section'
import PricingTable from '@/components/PricingTable'
import MedicalDirectorBio from '@/components/MedicalDirectorBio'
import EmailCapture from '@/components/EmailCapture'
import { primaryCtaLabel, primaryCtaSublabel, CONSULTATION } from '@/lib/pricing'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0, 1] as [number, number, number, number] },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
}

export default function Home() {
  const ctaLabel = primaryCtaLabel()

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-graphite-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-graphite-950 via-graphite-900 to-graphite-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.06),_transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-36">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-4xl"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-graphite-300 tracking-[0.12em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Metabolic Health · Telehealth · Licensed Physicians
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-display-xl text-chrome mb-6">
              Your Metabolism,<br />
              Optimized.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl text-graphite-400 leading-relaxed max-w-2xl mb-10"
            >
              Premium telehealth for testosterone therapy, GLP-1 weight loss, and peptide protocols — backed by comprehensive labs and real physician oversight.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 items-center">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-graphite-950 text-[15px] font-semibold hover:bg-graphite-100 transition-all shadow-lg hover:shadow-xl"
              >
                {ctaLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/15 text-white text-[15px] font-medium hover:bg-white/5 transition-all"
              >
                See Pricing
              </Link>
            </motion.div>

            <motion.p variants={fadeUp} className="text-[12px] text-graphite-500 mt-6">
              {primaryCtaSublabel()} · HIPAA-compliant · Stripe-secured
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TRUST STRIP
      ═══════════════════════════════════════════════════════ */}
      <div className="border-b border-graphite-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              { icon: <UserCheck className="w-4 h-4" />, text: 'Board-Certified Physicians' },
              { icon: <Microscope className="w-4 h-4" />, text: 'Real Bloodwork, Real Rx' },
              { icon: <Lock className="w-4 h-4" />, text: 'HIPAA-Compliant' },
              { icon: <Truck className="w-4 h-4" />, text: 'Shipped from Licensed Pharmacy' },
              { icon: <Shield className="w-4 h-4" />, text: 'Stripe-Secured Checkout' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-[12px] font-medium text-graphite-600">
                <span className="text-graphite-500">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          2. SERVICES
      ═══════════════════════════════════════════════════════ */}
      <Section>
        <SectionLabel>Programs</SectionLabel>
        <SectionTitle>Three core therapies</SectionTitle>
        <SectionDescription>
          Each program is physician-prescribed, labs-informed, and shipped from a licensed pharmacy.
        </SectionDescription>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: <Syringe className="w-5 h-5" />,
              title: 'Testosterone Therapy',
              desc: 'Physician-prescribed TRT protocols. Labs every 90 days. Individually dosed.',
              href: '/trt',
              tag: 'TRT',
            },
            {
              icon: <TrendingUp className="w-5 h-5" />,
              title: 'GLP-1 Weight Loss',
              desc: 'Semaglutide or Tirzepatide, supervised by a physician with monthly check-ins.',
              href: '/glp1',
              tag: 'GLP-1',
            },
            {
              icon: <FlaskConical className="w-5 h-5" />,
              title: 'Peptide Therapy',
              desc: 'Recovery, performance, and longevity protocols — provider-managed.',
              href: '/peptides',
              tag: 'Peptides',
            },
          ].map((s) => (
            <Link key={s.title} href={s.href} className="group">
              <div className="h-full rounded-2xl border border-graphite-200 bg-white p-6 transition-all group-hover:border-graphite-950 group-hover:shadow-lg">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-graphite-100 text-graphite-950 flex items-center justify-center group-hover:bg-graphite-950 group-hover:text-white transition-colors">
                    {s.icon}
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-graphite-400">{s.tag}</span>
                </div>
                <h3 className="text-[18px] font-semibold text-graphite-950 mb-2">{s.title}</h3>
                <p className="text-[13px] text-graphite-600 leading-relaxed mb-5">{s.desc}</p>
                <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-graphite-950 group-hover:gap-2 transition-all">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          3. HOW IT WORKS — 3 STEPS
      ═══════════════════════════════════════════════════════ */}
      <Section className="bg-graphite-50">
        <div className="text-center mb-14">
          <SectionLabel>How it works</SectionLabel>
          <SectionTitle>Three steps. Physician-prescribed.</SectionTitle>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              step: '01',
              icon: <Stethoscope className="w-5 h-5" />,
              title: 'Book a consultation',
              desc: 'Meet with a licensed physician via secure video. Refundable if you don\'t qualify.',
            },
            {
              step: '02',
              icon: <Microscope className="w-5 h-5" />,
              title: 'Labs & intake',
              desc: 'At-home kit or local draw. Results reviewed by your physician in 3–5 days.',
            },
            {
              step: '03',
              icon: <Package className="w-5 h-5" />,
              title: 'Treatment delivered',
              desc: 'Medication shipped from a licensed pharmacy. Ongoing provider access by message.',
            },
          ].map((s) => (
            <div key={s.step} className="bg-white rounded-2xl border border-graphite-200 p-7">
              <div className="flex items-baseline justify-between mb-5">
                <span className="text-[44px] font-bold text-graphite-200 leading-none tracking-tight">{s.step}</span>
                <div className="w-9 h-9 rounded-xl bg-graphite-950 text-white flex items-center justify-center">
                  {s.icon}
                </div>
              </div>
              <h3 className="text-[17px] font-semibold text-graphite-950 mb-2">{s.title}</h3>
              <p className="text-[13px] text-graphite-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          4. PRICING (transparent, on the homepage)
      ═══════════════════════════════════════════════════════ */}
      <Section>
        <div className="text-center mb-12">
          <SectionLabel>Pricing</SectionLabel>
          <SectionTitle>Transparent pricing. No surprises.</SectionTitle>
          <SectionDescription className="mx-auto">
            Pay only after a physician confirms you&apos;re a candidate. Consultation is refundable if you&apos;re not.
          </SectionDescription>
        </div>

        <PricingTable />

        <div className="text-center mt-10">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-graphite-950 text-white text-[14px] font-semibold hover:bg-graphite-800 transition-all"
          >
            {ctaLabel}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-[12px] text-graphite-500 mt-3">{primaryCtaSublabel()}</p>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          5. SOCIAL PROOF — MD + PLATFORM (NO FAKE TESTIMONIALS)
      ═══════════════════════════════════════════════════════ */}
      <Section className="bg-graphite-50">
        <div className="text-center mb-12">
          <SectionLabel>Real providers</SectionLabel>
          <SectionTitle>Medicine, not marketing.</SectionTitle>
          <SectionDescription className="mx-auto">
            Every treatment is signed by a U.S.-licensed physician. Every medication comes from a licensed pharmacy.
          </SectionDescription>
        </div>

        <div className="max-w-3xl mx-auto">
          <MedicalDirectorBio />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto mt-10">
          {[
            {
              icon: <Stethoscope className="w-5 h-5" />,
              title: 'Physician-led',
              desc: 'Every prescription signed by a licensed U.S. physician. No chatbots writing scripts.',
            },
            {
              icon: <Microscope className="w-5 h-5" />,
              title: 'Labs-informed',
              desc: 'Treatment decisions based on your bloodwork — not a 5-question quiz.',
            },
            {
              icon: <MessageCircle className="w-5 h-5" />,
              title: 'Ongoing access',
              desc: 'Message your care team directly. No premium tier required to reach your physician.',
            },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl border border-graphite-200 p-6">
              <div className="w-9 h-9 rounded-xl bg-graphite-100 text-graphite-950 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-[15px] font-semibold text-graphite-950 mb-1.5">{item.title}</h3>
              <p className="text-[13px] text-graphite-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-[11px] text-graphite-400 mt-8">
          All treatments require evaluation and approval by a licensed medical provider. Individual results vary.
        </p>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          6. FAQ PREVIEW + EMAIL CAPTURE
      ═══════════════════════════════════════════════════════ */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <SectionLabel>Frequently asked</SectionLabel>
            <SectionTitle>Answers before you book</SectionTitle>
          </div>

          <div className="divide-y divide-graphite-100 border-y border-graphite-100">
            {[
              { q: 'How much does Bloom Metabolics cost?', a: `${CONSULTATION.display} for the consultation. Program pricing is set by your physician based on the medication and dose prescribed — and confirmed before you pay. Nothing hidden.` },
              { q: 'Who are the prescribing physicians?', a: 'Every prescription is evaluated and signed by a U.S.-licensed physician. Your physician will be introduced to you at the consultation.' },
              { q: 'Do I need bloodwork?', a: 'Yes, for TRT. Results from the past 6 months are usually sufficient; otherwise your physician will order an at-home kit or local draw.' },
              { q: 'What if I don\'t qualify for treatment?', a: 'You receive a full refund of the consultation fee. You still walk away with a physician-reviewed eligibility report.' },
              { q: 'Is this covered by insurance?', a: 'Bloom Metabolics operates on a cash-pay model. Payments are processed by Stripe. We do not bill insurance.' },
            ].map((faq) => (
              <div key={faq.q} className="py-5">
                <h3 className="text-[15px] font-semibold text-graphite-950 mb-1.5">{faq.q}</h3>
                <p className="text-[13px] text-graphite-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/faq" className="inline-flex items-center gap-1 text-[13px] font-semibold text-graphite-950 hover:gap-2 transition-all">
              See all FAQ <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          7. FINAL CTA + EMAIL CAPTURE
      ═══════════════════════════════════════════════════════ */}
      <Section dark className="gradient-hero">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-display-lg text-chrome mb-6">
            Stop guessing. Start measuring.
          </h2>
          <p className="text-lg text-graphite-400 leading-relaxed mb-10 max-w-xl mx-auto">
            Licensed-physician consultation. Real labs. Real prescriptions. Delivered.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-graphite-950 text-[15px] font-semibold hover:bg-graphite-100 transition-all shadow-lg"
            >
              {ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-[12px] text-graphite-500 mb-14">{primaryCtaSublabel()}</p>

          <div className="pt-10 border-t border-white/10 max-w-md mx-auto">
            <p className="text-[13px] text-graphite-400 mb-4">
              Not ready to book? Get the free TRT eligibility checklist.
            </p>
            <EmailCapture />
          </div>

          <p className="text-[11px] text-graphite-600 mt-10 max-w-xl mx-auto">
            All treatments require evaluation and approval by a licensed medical provider. Individual results vary. Medication availability subject to state and federal regulations.
          </p>
        </div>
      </Section>
    </>
  )
}
