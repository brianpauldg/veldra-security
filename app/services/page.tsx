'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight, ChevronRight, Check, Syringe, TrendingUp,
  Stethoscope, Clock, Shield
} from 'lucide-react'
import Section, { SectionLabel, SectionTitle, SectionDescription } from '@/components/ui/Section'
import Card, { CardIcon } from '@/components/ui/Card'

const services = [
  {
    icon: <Syringe className="w-6 h-6" />,
    tag: 'TRT',
    title: 'TRT Optimization',
    description: 'Personalized TRT protocols designed around your bloodwork and health goals. For men experiencing fatigue, declining body composition, low motivation, or other signs of hormone imbalance.',
    pricing: '+$199/mo add-on to any membership tier. Medication included.',
    benefits: [
      'Testosterone cypionate, HCG, and anastrozole bundled via licensed 503A pharmacy partner',
      'Lab-informed dosing and monitoring',
      'Quarterly hormone panel interpretation',
      'Dose titration support based on lab response',
    ],
    ideal: 'Men 30+ experiencing symptoms of low testosterone who want evidence-based, provider-supervised hormone optimization.',
    href: '/trt',
    quizHref: '/quiz',
    quizLabel: 'Take the TRT Assessment',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    tag: 'GLP-1',
    title: 'GLP-1 Metabolic Program',
    // FDA April 1 2026 — compounded designation
    description: 'Physician-prescribed compounded GLP-1 receptor agonist therapy. Compounded medications are not FDA-approved. Individual medical evaluation required.',
    pricing: '+$299/mo add-on to any membership tier. Medication included.',
    benefits: [
      'Compounded semaglutide or tirzepatide formulations',
      'Physician-supervised protocols',
      'Monthly weight and metabolic check-in',
      'Side effect management included',
    ],
    ideal: 'Men with a BMI of 27+ who have struggled with traditional weight loss approaches and want medical-grade intervention.',
    href: '/glp1',
    quizHref: '/glp1-quiz',
    quizLabel: 'Take the GLP-1 Assessment',
  },
]

export default function Services() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#020202] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#020202] via-[#050404] to-[#020202]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(26,154,115,0.08),_transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-28 lg:py-36">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
            className="max-w-3xl"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#8a8268] mb-4 block">
              Treatment Programs
            </span>
            <h1 className="text-display-xl text-white mb-6">
              Our Treatment Programs
            </h1>
            <p className="text-xl text-[#8a8268] leading-relaxed max-w-2xl">
              Physician-guided treatment protocols — available as add-ons to any Bloom membership tier.
              Each individually tailored and designed for measurable outcomes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      {services.map((service, index) => (
        <Section key={service.tag} className={index % 2 === 1 ? 'bg-[#050404]' : ''}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <CardIcon className="!mb-0">{service.icon}</CardIcon>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#8a8268]">
                  {service.tag}
                </span>
              </div>

              <h2 className="text-display-sm text-[#d8cfbe] mb-4">{service.title}</h2>
              <p className="text-subheadline text-[#8a8268] mb-4">{service.description}</p>
              {'pricing' in service && service.pricing && (
                <p className="text-[14px] font-medium text-[#d8cfbe] mb-8 bg-[#050404] px-4 py-2 rounded-lg inline-block">{service.pricing}</p>
              )}

              <div className="flex flex-wrap gap-4">
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#020202] text-white text-[14px] font-medium hover:bg-[#0d0c0a] transition-all shadow-sm"
                >
                  Learn More <ChevronRight className="w-4 h-4" />
                </Link>
                {service.quizHref && (
                  <Link
                    href={service.quizHref}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#1a1814] text-[#d8cfbe] text-[14px] font-medium hover:bg-[#050404] transition-all"
                  >
                    {service.quizLabel}
                  </Link>
                )}
              </div>
            </div>

            <div>
              <Card hover={false}>
                <h3 className="text-[14px] font-semibold text-[#d8cfbe] mb-4">What&apos;s Included</h3>
                <ul className="space-y-3 mb-6">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#c9b88c] mt-0.5 flex-shrink-0" />
                      <span className="text-[14px] text-[#8a8268]">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-[#1a1814]">
                  <h4 className="text-[12px] font-semibold text-[#8a8268] uppercase tracking-widest mb-2">
                    Ideal For
                  </h4>
                  <p className="text-[13px] text-[#8a8268] leading-relaxed">{service.ideal}</p>
                </div>
              </Card>
            </div>
          </div>
        </Section>
      ))}

      {/* How to Get Started */}
      <Section dark>
        <div className="text-center mb-16">
          <SectionLabel dark>Getting Started</SectionLabel>
          <SectionTitle dark>Three steps to optimized health</SectionTitle>
          <SectionDescription dark className="mx-auto">
            The same process applies to all treatment programs. Simple, efficient,
            and designed around your schedule.
          </SectionDescription>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              step: '01',
              icon: <Stethoscope className="w-5 h-5" />,
              title: 'Apply',
              desc: 'Submit your application and a licensed provider will review your eligibility. No referral needed.',
            },
            {
              step: '02',
              icon: <Clock className="w-5 h-5" />,
              title: 'Get Your Protocol',
              desc: 'Complete intake, provide labs, and receive a personalized treatment plan designed around your biomarkers.',
            },
            {
              step: '03',
              icon: <Shield className="w-5 h-5" />,
              title: 'Start Treatment',
              desc: 'Treatment ships to your door. Ongoing monitoring, regular check-ins, and protocol adjustments included.',
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 rounded-xl bg-[#0d0c0a]/5 flex items-center justify-center text-[#8a8268] mx-auto mb-4">
                {item.icon}
              </div>
              <span className="text-[11px] font-semibold text-[#8a8268] tracking-widest">
                Step {item.step}
              </span>
              <h3 className="text-[16px] font-semibold text-white mt-2 mb-2">{item.title}</h3>
              <p className="text-[13px] text-[#8a8268] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#0d0c0a] text-[#d8cfbe] text-[15px] font-semibold hover:bg-[#0d0c0a] transition-all shadow-lg"
          >
            View Membership Pricing
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-[12px] text-[#8a8268] mt-4">
            All treatment protocols are available as add-ons to any Bloom membership tier. Evaluation by a licensed provider required. Individual results vary.
          </p>
        </div>
      </Section>
    </>
  )
}
