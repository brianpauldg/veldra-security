'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, FlaskConical } from 'lucide-react'
import Section, { SectionLabel, SectionTitle, SectionDescription } from '@/components/ui/Section'
import PricingTable from '@/components/PricingTable'
import {
  PEPTIDE_ROADMAP_INTRO,
} from '@/lib/pricing'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0, 1] as [number, number, number, number] },
}

export default function PeptidesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#020202] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#020202] via-[#0d0c0a] to-[#020202]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-36">
          <motion.div initial="initial" animate="animate" className="max-w-3xl">
            <motion.div {...fadeUp} className="mb-5">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-[12px] font-medium text-gold tracking-wide uppercase">
                <Clock className="w-3.5 h-3.5" />
                Pending FDA 503A Pathway
              </span>
            </motion.div>
            <motion.h1 {...fadeUp} className="text-display-lg text-[#d8cfbe] mb-5" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300 }}>
              Peptide Therapy Roadmap
            </motion.h1>
            <motion.p {...fadeUp} className="text-lg text-[#8a8268] leading-relaxed max-w-2xl mb-8 font-light">
              {PEPTIDE_ROADMAP_INTRO}
            </motion.p>
            <motion.div {...fadeUp} className="flex flex-wrap gap-4">
              <Link
                href="/waitlist?service=peptides"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold/10 text-gold border border-gold/30 text-[15px] font-semibold hover:bg-gold/20 transition-all"
              >
                Join Peptide Roadmap Waitlist <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white text-[15px] font-medium hover:bg-white/5 transition-all"
              >
                View Membership Pricing
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Regulatory Context */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Regulatory Context</SectionLabel>
          <SectionTitle>Why a roadmap, not a menu</SectionTitle>
          <div className="mt-8 space-y-4">
            <p className="text-[15px] text-[#8a8268] leading-relaxed font-light">
              The FDA&apos;s April 2026 actions initiated a multi-tranche regulatory pathway for compounded peptide therapies.
              Rather than rushing to market with uncertain regulatory footing, Bloom has organized its peptide service lines
              into tranches aligned with anticipated FDA Category 1 designation, enforcement discretion announcements,
              and formal rulemaking timelines.
            </p>
            <p className="text-[15px] text-[#8a8268] leading-relaxed font-light">
              Each tranche below will launch as an add-on to any Bloom membership tier once regulatory clarity is established.
              Patients on the Peptide Roadmap waitlist will be notified at each tranche launch.
            </p>
            <p className="text-[15px] text-[#8a8268] leading-relaxed font-light">
              All peptide therapies are compounded by a US-based, state-licensed 503A pharmacy under individual patient
              prescription following physician evaluation. Compounded medications are not FDA-approved for safety or efficacy.
              Treatment is initiated only after physician evaluation. Results vary. This information is educational and does not
              constitute medical advice.
            </p>
            <p className="text-[15px] text-gold leading-relaxed font-light mt-4">
              Peptide therapies will be available to enrolled patients following physician consultation.
              Join the waitlist to be notified when enrollment opens.
            </p>
          </div>
        </div>
      </Section>

      {/* Peptide Roadmap — rendered from PricingTable */}
      <Section>
        <PricingTable
          showTiers={false}
          showAddOns={false}
          showPeptideRoadmap
        />
      </Section>

      {/* How It Will Work */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <SectionLabel>When Available</SectionLabel>
          <SectionTitle>How peptide add-ons will work</SectionTitle>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Membership Required',
                desc: 'Peptide protocols are available as add-ons to any Bloom membership tier (Essentials, Core, or Signature).',
              },
              {
                step: '02',
                title: 'Physician Evaluation',
                desc: 'Your provider evaluates appropriateness based on your health history, labs, and goals. Not all patients will qualify.',
              },
              {
                step: '03',
                title: 'Protocol & Monitoring',
                desc: 'Medication compounded by a licensed pharmacy. Ongoing monitoring, dose adjustments, and lab review included.',
              },
            ].map((s) => (
              <div key={s.step} className="bg-[#080808] border border-[#1a1814] rounded-xl p-6">
                <span className="font-mono text-[11px] text-gold tracking-[0.2em]">Step · {s.step}</span>
                <h3 className="text-[16px] text-[#d8cfbe] mt-2 mb-2" style={{ fontFamily: 'Fraunces, serif', fontWeight: 400 }}>
                  {s.title}
                </h3>
                <p className="text-[13px] text-[#8a8268] leading-relaxed font-light">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <hr className="bloom-divider mb-[80px] lg:mb-[140px]" />
        <div className="max-w-2xl mx-auto text-center">
          <FlaskConical className="w-8 h-8 text-gold mx-auto mb-6" />
          <h2 className="text-display text-[#d8cfbe] mb-5" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300 }}>
            Be first when peptides launch.
          </h2>
          <p className="text-[15px] text-[#8a8268] leading-relaxed mb-8 max-w-md mx-auto font-light">
            Join the Peptide Roadmap waitlist. We&apos;ll notify you as each tranche becomes available under FDA 503A pathway clarity.
          </p>
          <Link
            href="/waitlist?service=peptides"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold/10 text-gold border border-gold/30 text-[15px] font-semibold hover:bg-gold/20 transition-all"
          >
            Join Peptide Roadmap Waitlist <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="font-mono text-[10px] text-[#2a2620] tracking-[0.15em] uppercase mt-8 max-w-xl mx-auto">
            All treatments require evaluation and approval by a licensed medical provider. Individual results vary.
            Peptide availability contingent on FDA regulatory pathway. Target pricing subject to change.
          </p>
        </div>
      </Section>
    </>
  )
}
