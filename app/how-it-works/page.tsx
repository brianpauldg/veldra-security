'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight, Check, Stethoscope, Users, Clock,
  MessageSquare, Shield, FileText, Microscope, Package
} from 'lucide-react'
import Section, { SectionLabel, SectionTitle, SectionDescription } from '@/components/ui/Section'

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#020202] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#020202] via-[#050404] to-[#020202]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-36">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[12px] font-medium text-[#d8cfbe] tracking-wide uppercase mb-5">
              Physician-Led Care
            </span>
            <h1 className="text-display-lg text-white mb-5">
              How Bloom Metabolics works
            </h1>
            <p className="text-lg text-[#d8cfbe] leading-relaxed max-w-2xl">
              Every treatment is prescribed by a licensed physician, coordinated by our clinical team, and managed with hands-on patient care from consultation to ongoing monitoring.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Process */}
      <Section>
        <div className="text-center mb-14">
          <SectionLabel>The Process</SectionLabel>
          <SectionTitle>From consultation to <em className="italic">treatment</em> in four steps.</SectionTitle>
          <SectionDescription className="mx-auto">
            Simple, transparent, and designed around your schedule. Every step is guided by our clinical team.
          </SectionDescription>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1a1814] rounded-lg overflow-hidden">
          {[
            {
              step: '01',
              icon: <FileText className="w-4 h-4" />,
              title: 'Book & Intake',
              desc: 'Book your consultation online and complete a brief digital health intake. Your information is reviewed before your appointment.',
            },
            {
              step: '02',
              icon: <Stethoscope className="w-4 h-4" />,
              title: 'Physician Consultation',
              desc: 'Meet with a licensed physician via secure video. They review your history, discuss your goals, and determine if treatment is appropriate.',
            },
            {
              step: '03',
              icon: <Microscope className="w-4 h-4" />,
              title: 'Labs & Protocol',
              desc: 'Comprehensive lab panel at Quest or LabCorp. Your physician designs a treatment protocol based on your results and biology.',
            },
            {
              step: '04',
              icon: <Package className="w-4 h-4" />,
              title: 'Treatment & Monitoring',
              desc: 'Medication ships from a licensed compounding pharmacy. Ongoing monitoring, regular check-ins, and protocol adjustments are all included.',
            },
          ].map((s) => (
            <div key={s.step} className="bg-[#050404] p-8 lg:p-10">
              <div className="flex items-baseline justify-between mb-6">
                <span className="font-mono text-[11px] text-[#d8cfbe] tracking-[0.2em]">Step {s.step}</span>
                <span className="text-[#8a8268]">{s.icon}</span>
              </div>
              <h3 className="text-[18px] text-white mb-3" style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}>
                {s.title}
              </h3>
              <p className="text-[14px] text-[#d8cfbe] leading-relaxed font-light">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Who's Behind Your Care */}
      <Section>
        <hr className="bloom-divider mb-[80px] lg:mb-[140px]" />

        <div className="text-center mb-14">
          <SectionLabel>Your Care Team</SectionLabel>
          <SectionTitle>Physician-led. <em className="italic">Nurse-managed.</em></SectionTitle>
          <SectionDescription className="mx-auto">
            Every patient is supported by a licensed physician who prescribes and oversees treatment, and an RN-led operations team that coordinates your entire care experience.
          </SectionDescription>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-[#1a1814] bg-[#050404] p-8">
            <div className="flex items-center gap-3 mb-6">
              <Stethoscope className="w-5 h-5 text-[#d8cfbe]" />
              <h3 className="text-[14px] font-semibold text-[#d8cfbe] uppercase tracking-widest">Licensed Physician</h3>
            </div>
            <ul className="space-y-3">
              {[
                'Medical evaluation and diagnosis',
                'Prescription authority and dosing decisions',
                'Lab result interpretation',
                'Treatment plan design and modification',
                'Risk assessment and clinical oversight',
                'Eligibility determination',
                'Adverse event management',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#d8cfbe] mt-0.5 flex-shrink-0" />
                  <span className="text-[14px] text-[#d8cfbe]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#1a1814] bg-[#050404] p-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-5 h-5 text-[#d8cfbe]" />
              <h3 className="text-[14px] font-semibold text-[#d8cfbe] uppercase tracking-widest">RN &amp; Operations Team</h3>
            </div>
            <ul className="space-y-3">
              {[
                'Patient onboarding and intake coordination',
                'Appointment scheduling and reminders',
                'Lab coordination and follow-up',
                'Patient education and resources',
                'Care timeline management',
                'Pharmacy coordination and shipping',
                'Direct patient communication',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#8a8268] mt-0.5 flex-shrink-0" />
                  <span className="text-[14px] text-[#d8cfbe]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Patient Journey */}
      <Section>
        <hr className="bloom-divider mb-[80px] lg:mb-[140px]" />

        <div className="text-center mb-14">
          <SectionLabel>The Patient Journey</SectionLabel>
          <SectionTitle>Every touchpoint, <em className="italic">managed.</em></SectionTitle>
        </div>

        <div className="max-w-3xl mx-auto space-y-0">
          {[
            { actor: 'Patient', action: 'Books consultation online', system: 'Confirmation sent, intake form delivered' },
            { actor: 'Patient', action: 'Completes digital intake', system: 'Clinical team reviews before appointment' },
            { actor: 'Patient', action: 'Completes secure checkout', system: 'Account created, booking link sent' },
            { actor: 'Physician', action: 'Conducts video consultation', system: 'Reviews history, determines eligibility' },
            { actor: 'Physician', action: 'Orders labs, reviews results', system: 'Lab reminders sent, results tracked' },
            { actor: 'Physician', action: 'Designs personalized protocol', system: 'Onboarding materials sent to patient' },
            { actor: 'Patient', action: 'Begins treatment', system: 'Medication shipped, check-in scheduled' },
            { actor: 'Physician', action: 'Conducts follow-up, adjusts protocol', system: 'Next labs scheduled, care timeline updated' },
          ].map((step, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 py-5 border-b border-[#1a1814] last:border-0">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${step.actor === 'Physician' ? 'bg-[#d8cfbe]' : 'bg-[#8a8268]'}`} />
                <span className="text-[12px] font-semibold text-[#8a8268] uppercase tracking-wider">{step.actor}</span>
              </div>
              <div className="text-[14px] text-white font-medium">{step.action}</div>
              <div className="text-[13px] text-[#8a8268]">{step.system}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* What Sets Us Apart */}
      <Section>
        <hr className="bloom-divider mb-[80px] lg:mb-[140px]" />

        <div className="text-center mb-14">
          <SectionLabel>Our Standard</SectionLabel>
          <SectionTitle>What sets Bloom Metabolics <em className="italic">apart.</em></SectionTitle>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1a1814] rounded-lg overflow-hidden">
          {[
            {
              icon: <Shield className="w-4 h-4" />,
              title: 'Physician-led',
              desc: 'Every prescription is signed by a licensed U.S. physician. No algorithms. No shortcuts.',
            },
            {
              icon: <Microscope className="w-4 h-4" />,
              title: 'Labs-informed',
              desc: 'Comprehensive blood panels at intake and every 90 days. Treatment is based on your data.',
            },
            {
              icon: <MessageSquare className="w-4 h-4" />,
              title: 'Hands-on care',
              desc: 'Direct access to your care team. Proactive check-ins, not ticket queues. Managed by a registered nurse.',
            },
          ].map((item) => (
            <div key={item.title} className="bg-[#050404] p-8">
              <span className="text-[#8a8268] mb-4 block">{item.icon}</span>
              <h3 className="text-[15px] text-white mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}>{item.title}</h3>
              <p className="text-[13px] text-[#d8cfbe] leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <hr className="bloom-divider mb-[80px] lg:mb-[140px]" />

        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-display text-white mb-5" style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}>
            Experience healthcare built around <em className="italic">you.</em>
          </h2>
          <p className="text-lg text-[#d8cfbe] leading-relaxed mb-8">
            Start with a consultation. A focused session with a licensed physician to discuss your health, your goals, and your options.
          </p>
          <Link
            href="/join"
            className="bloom-btn"
          >
            Join Waitlist <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <p className="font-mono text-[10px] text-[#8a8268] tracking-[0.15em] uppercase mt-8">
            All treatments require evaluation and approval by a licensed medical provider. Individual results vary.
          </p>
        </div>
      </Section>
    </>
  )
}
