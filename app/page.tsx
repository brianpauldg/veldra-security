'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight, ChevronRight,
  Syringe, TrendingUp,
  Stethoscope, Microscope, Package, MessageCircle,
} from 'lucide-react'
import Section, { SectionLabel, SectionTitle, SectionDescription } from '@/components/ui/Section'
import PricingTable from '@/components/PricingTable'
import GLP1ComplianceDisclosure from '@/components/GLP1ComplianceDisclosure'
import MedicalDirectorBio from '@/components/MedicalDirectorBio'
import PreLaunchWaitlist from '@/components/PreLaunchWaitlist'
import Meridian from '@/components/Meridian'
import WaitlistModal from '@/components/WaitlistModal'
import { CONSULTATION } from '@/lib/pricing'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0, 1] as [number, number, number, number] },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
}

export default function Home() {
  const [waitlistOpen, setWaitlistOpen] = useState(false)

  return (
    <>
      {/* Pre-launch disclosure banner */}
      <div className="bg-[#0a0906] border-b border-[#1a1814] py-3 px-6 text-center">
        <p className="text-[12px] text-[#d8cfbe] font-light leading-relaxed max-w-3xl mx-auto">
          <strong className="font-medium">Bloom Metabolics is in pre-launch. Enrollment opens early-to-mid June 2026.</strong>{' '}
          No medical services are currently provided and no health information is collected. Join the waitlist for priority access.
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-[#020202] overflow-hidden min-h-screen flex items-center">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-0 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="eyebrow mb-8">
                Precision Endocrinology · Telehealth · <span className="num">MMXXVI</span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-display-xl text-chrome mb-8"
                style={{ fontFamily: 'Fraunces, serif', fontWeight: 300 }}
              >
                Precision hormone &{' '}
                <em className="italic">metabolic</em>{' '}
                optimization.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-[17px] text-[#a89878] leading-relaxed max-w-lg mb-12 font-light"
              >
                A membership program with board-certified physicians, comprehensive bloodwork, and medication shipped to your door — no clinic visits, no cookie-cutter dosing.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 items-center">
                <button onClick={() => setWaitlistOpen(true)} className="bloom-btn">
                  Join the Waitlist — Lock In Founding-Member Pricing
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <Link
                  href="/how-it-works"
                  className="bloom-btn-ghost bloom-btn"
                >
                  Our Process
                </Link>
              </motion.div>
            </motion.div>

            {/* Meridian Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="hidden lg:flex items-center justify-center"
            >
              <Meridian size="lg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FOUNDER
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#020202] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden border border-[#1a1814]">
                <Image
                  src="/images/founder-brian.png"
                  alt="Brian DeGuzman, RN — Founder of Bloom Metabolics"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 288px, 320px"
                  priority
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0, 1] }}
            >
              <div className="eyebrow mb-4">Founder</div>
              <h2
                className="text-display-sm text-chrome mb-6"
                style={{ fontFamily: 'Fraunces, serif', fontWeight: 300 }}
              >
                Brian DeGuzman, <em className="italic">RN</em>
              </h2>
              <div className="space-y-4 max-w-lg">
                <p className="text-[15px] text-[#a89878] leading-relaxed font-light">
                  Registered Nurse. Pursuing Advanced Practice Nursing licensure.
                  Built Bloom Metabolics because the men he saw in clinical practice
                  deserved protocols informed by their labs — not a five-minute
                  telehealth script.
                </p>
                <p className="text-[15px] text-[#a89878] leading-relaxed font-light">
                  Every patient relationship at Bloom is physician-prescribed and
                  clinically overseen. Brian runs the operations, coordinates care,
                  and ensures the clinical standard holds.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          DIVIDER + MARQUEE
      ═══════════════════════════════════════════════════════ */}
      <div className="border-y border-[#1a1814] bg-[#020202] overflow-hidden py-4">
        <div className="marquee-track flex items-center gap-8 whitespace-nowrap" style={{ width: 'max-content' }}>
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8">
              {[
                'Board-Certified Physicians',
                'Comprehensive Lab Panels',
                'Compounded Prescriptions',
                'Licensed Pharmacy',
                'Proactive Monitoring',
                'HIPAA Compliant',
              ].map((item) => (
                <span key={`${i}-${item}`} className="flex items-center gap-2 font-mono text-[10px] text-[#8a8268] tracking-[0.2em] uppercase">
                  <span className="w-1 h-1 rounded-full bg-[#8a8268]" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          2. SERVICES
      ═══════════════════════════════════════════════════════ */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 mb-16">
          <div className="lg:col-span-1">
            <SectionLabel>Practice · <span className="num">02</span></SectionLabel>
            <SectionTitle>Five practice areas. <em className="italic">One precision standard.</em></SectionTitle>
          </div>
          <div className="lg:col-span-2 flex items-end">
            <SectionDescription className="lg:ml-auto lg:text-right max-w-md">
              Each protocol is physician-prescribed, informed by comprehensive labs, and dispensed by a state-licensed 503A compounding pharmacy.
            </SectionDescription>
          </div>
        </div>

        <hr className="bloom-divider mb-0" />

        <div className="divide-y divide-[#1a1814]">
          {[
            {
              num: '01',
              icon: <Syringe className="w-4 h-4" />,
              title: 'Testosterone Therapy',
              emphasis: 'Recalibrate',
              desc: 'Physician-prescribed TRT protocols. Labs every 90 days. Individually dosed and titrated.',
              href: '/trt',
              tag: 'TRT',
            },
            {
              num: '02',
              icon: <TrendingUp className="w-4 h-4" />,
              title: 'GLP-1 Weight Management',
              emphasis: 'Reshape',
              desc: 'Compounded GLP-1 receptor agonist therapy, prescribed based on individual medical evaluation by a licensed physician.',
              href: '/glp1',
              tag: 'GLP-1',
            },
            {
              num: '03',
              icon: <Stethoscope className="w-4 h-4" />,
              title: 'Sexual Health',
              emphasis: 'Restore',
              desc: 'Physician-evaluated protocols (PT-141, tadalafil, sildenafil). Discreet shipping, quarterly follow-up.',
              href: '/services',
              tag: 'Sexual Health',
            },
            {
              num: '04',
              icon: <Microscope className="w-4 h-4" />,
              title: 'Longevity',
              emphasis: 'Sustain',
              desc: 'Subcutaneous NAD+ and Glutathione protocols. Aging biomarker review quarterly.',
              href: '/services',
              tag: 'Longevity',
            },
            {
              num: '05',
              icon: <Package className="w-4 h-4" />,
              title: 'Peptide Therapy',
              emphasis: 'Refine',
              desc: 'Physician-prescribed peptide protocols (compounded). Service line launches with Bloom\u2019s initial offering.',
              href: '/peptides',
              tag: 'Peptides',
            },
          ].map((s) => (
            <Link key={s.tag} href={s.href} className="group block">
              <div className="grid grid-cols-[40px_1fr_auto] gap-4 items-center py-8">
                <span className="font-mono text-[11px] text-[#d8cfbe] tracking-[0.2em]">{s.num}</span>
                <div>
                  <h3 className="text-headline text-[#d8cfbe] mb-1 group-hover:text-[#f5ecd9] transition-colors" style={{ fontFamily: 'Fraunces, serif', fontWeight: 400 }}>
                    {s.title} — <em className="italic font-light">{s.emphasis}</em>
                  </h3>
                  <p className="text-[14px] text-[#8a8268] font-light">{s.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#2a2620] group-hover:text-[#8a8268] transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* GLP-1 compliance disclosure — FDA April 1 2026 */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <GLP1ComplianceDisclosure variant="compact" />
      </div>

      {/* ═══════════════════════════════════════════════════════
          3. HOW IT WORKS
      ═══════════════════════════════════════════════════════ */}
      <Section>
        <hr className="bloom-divider mb-[80px] lg:mb-[140px]" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-16">
          <div className="lg:col-span-1">
            <SectionLabel>Process · <span className="num">03</span> Steps</SectionLabel>
            <SectionTitle>From consultation to <em className="italic">compound.</em></SectionTitle>
          </div>
          <div className="lg:col-span-2 flex items-end">
            <SectionDescription className="lg:ml-auto lg:text-right max-w-md">
              Physician-prescribed. Labs-informed. Delivered.
            </SectionDescription>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1a1814] rounded-lg overflow-hidden">
          {[
            {
              step: '01',
              icon: <Stethoscope className="w-4 h-4" />,
              title: 'Consultation',
              desc: 'Meet with a licensed physician via secure video. Refundable if you do not qualify.',
            },
            {
              step: '02',
              icon: <Microscope className="w-4 h-4" />,
              title: 'Labs & Protocol',
              desc: 'Comprehensive panel at Quest or Labcorp. Results reviewed. Protocol designed around your biology.',
            },
            {
              step: '03',
              icon: <Package className="w-4 h-4" />,
              title: 'Treatment',
              desc: 'Medication shipped from a licensed compounding pharmacy. Ongoing monitoring and protocol adjustments included.',
            },
          ].map((s) => (
            <div key={s.step} className="bg-[#050404] p-8 lg:p-10">
              <div className="flex items-baseline justify-between mb-6">
                <span className="font-mono text-[11px] text-[#d8cfbe] tracking-[0.2em]">Step · {s.step}</span>
                <span className="text-[#2a2620]">{s.icon}</span>
              </div>
              <h3 className="text-[18px] text-[#d8cfbe] mb-3" style={{ fontFamily: 'Fraunces, serif', fontWeight: 400 }}>
                {s.title}
              </h3>
              <p className="text-[14px] text-[#8a8268] leading-relaxed font-light">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          4. PRICING
      ═══════════════════════════════════════════════════════ */}
      <Section>
        <hr className="bloom-divider mb-[80px] lg:mb-[140px]" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-16">
          <div className="lg:col-span-1">
            <SectionLabel>Membership · <span className="num">03</span> Tiers</SectionLabel>
            <SectionTitle>Three tiers of <em className="italic">precision</em> care.</SectionTitle>
          </div>
          <div className="lg:col-span-2 flex items-end">
            <SectionDescription className="lg:ml-auto lg:text-right max-w-md">
              Choose your membership level, then add treatment protocols as needed. Membership starts at $149/mo; adding TRT is $199/mo with medication included — most members&apos; all-in cost lands between $348 and $498/mo. Begin with a $49 initial evaluation, credited toward Month 1.
            </SectionDescription>
          </div>
        </div>

        <PricingTable showAddOns={false} showPeptideRoadmap={false} />

        <div className="text-center mt-14">
          <Link href="/pricing" className="bloom-btn bloom-btn-ghost bloom-btn text-[13px]">
            View Full Pricing & Add-Ons <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <div className="mt-4">
            <Link href="/join" className="bloom-btn">
              Apply Now — $49
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          5. SOCIAL PROOF
      ═══════════════════════════════════════════════════════ */}
      <Section>
        <hr className="bloom-divider mb-[80px] lg:mb-[140px]" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-16">
          <div className="lg:col-span-1">
            <SectionLabel>Clinical Oversight</SectionLabel>
            <SectionTitle>Medicine, not <em className="italic">marketing.</em></SectionTitle>
          </div>
          <div className="lg:col-span-2 flex items-end">
            <SectionDescription className="lg:ml-auto lg:text-right max-w-md">
              Every treatment is signed by a U.S.-licensed physician. Every medication comes from a licensed compounding pharmacy.
            </SectionDescription>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <MedicalDirectorBio />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1a1814] rounded-lg overflow-hidden">
          {[
            {
              icon: <Stethoscope className="w-4 h-4" />,
              title: 'Physician-led',
              desc: 'Every prescription signed by a licensed U.S. physician. No algorithms writing scripts.',
            },
            {
              icon: <Microscope className="w-4 h-4" />,
              title: 'Labs-informed',
              desc: 'Treatment decisions based on your bloodwork — not a five-question intake form.',
            },
            {
              icon: <MessageCircle className="w-4 h-4" />,
              title: 'Ongoing access',
              desc: 'Message your care team directly. No premium tier required to reach your physician.',
            },
          ].map((item) => (
            <div key={item.title} className="bg-[#050404] p-8">
              <span className="text-[#2a2620] mb-4 block">{item.icon}</span>
              <h3 className="text-[15px] text-[#d8cfbe] mb-2" style={{ fontFamily: 'Fraunces, serif', fontWeight: 400 }}>{item.title}</h3>
              <p className="text-[13px] text-[#8a8268] leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-center font-mono text-[10px] text-[#2a2620] tracking-[0.2em] uppercase mt-8">
          All treatments require evaluation and approval by a licensed medical provider. Individual results vary.
        </p>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          6. FAQ
      ═══════════════════════════════════════════════════════ */}
      <Section>
        <hr className="bloom-divider mb-[80px] lg:mb-[140px]" />

        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <SectionLabel>Frequently Asked</SectionLabel>
            <SectionTitle>Answers before you <em className="italic">commit.</em></SectionTitle>
          </div>

          <div className="divide-y divide-[#1a1814] border-y border-[#1a1814]">
            {[
              { q: 'What does a consultation cost?', a: `${CONSULTATION.display} for the Optimization Consultation. If you continue to a membership, it's credited toward your first month. If you don't qualify, it's refunded in full.` },
              { q: 'How does membership work?', a: 'Choose from three membership tiers (Essentials, Core, or Signature) for ongoing care access. Add treatment protocols — TRT, GLP-1, Sexual Health, or Longevity — as needed. All medication is included in add-on pricing.' },
              { q: 'Do I need bloodwork?', a: 'Yes. Bloodwork is required before treatment for both Testosterone Therapy and GLP-1 programs. Lab results from the past six months may be accepted; otherwise your physician will order a local draw through LabCorp or Quest Diagnostics.' },
              { q: 'What if I do not qualify for treatment?', a: 'You receive a full refund of the consultation fee. You still receive a physician-reviewed eligibility report.' },
              { q: 'Is this covered by insurance?', a: 'Bloom Metabolics operates on a cash-pay model. We do not bill insurance. Many patients find cash-pay simpler and more affordable than navigating insurance restrictions.' },
            ].map((faq) => (
              <div key={faq.q} className="py-6">
                <h3 className="text-[15px] text-[#d8cfbe] mb-2" style={{ fontFamily: 'Fraunces, serif', fontWeight: 400 }}>
                  {faq.q}
                </h3>
                <p className="text-[14px] text-[#8a8268] leading-relaxed font-light">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/faq" className="bloom-btn-ghost bloom-btn text-[12px]">
              All Questions <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          7. FINAL CTA
      ═══════════════════════════════════════════════════════ */}
      <Section>
        <hr className="bloom-divider mb-[80px] lg:mb-[140px]" />

        <div className="max-w-2xl mx-auto text-center">
          <Meridian size="md" className="mx-auto mb-12" />

          <h2 className="text-display-lg text-chrome mb-6" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300 }}>
            Stop guessing.{' '}
            <em className="italic">Start measuring.</em>
          </h2>
          <p className="text-[16px] text-[#8a8268] leading-relaxed mb-10 max-w-md mx-auto font-light">
            Licensed-physician consultation. Comprehensive labs. Compounded prescriptions. Delivered.
          </p>
          <div className="max-w-sm mx-auto">
            <PreLaunchWaitlist variant="compact" />
          </div>

          <p className="font-mono text-[10px] text-[#2a2620] tracking-[0.15em] uppercase mt-12 max-w-xl mx-auto">
            All treatments require evaluation and approval by a licensed medical provider. Individual results vary. Medication availability subject to state and federal regulations.
          </p>
        </div>
      </Section>

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  )
}
