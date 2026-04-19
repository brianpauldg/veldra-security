'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight, ChevronRight, Check, Syringe, TrendingUp,
  FlaskConical, Stethoscope, Clock, Shield
} from 'lucide-react'
import Section, { SectionLabel, SectionTitle, SectionDescription } from '@/components/ui/Section'
import Card, { CardIcon } from '@/components/ui/Card'

const services = [
  {
    icon: <Syringe className="w-6 h-6" />,
    tag: 'TRT',
    title: 'Testosterone Replacement Therapy',
    description: 'Personalized TRT protocols designed around your bloodwork and health goals. For men experiencing fatigue, declining body composition, low motivation, or other signs of hormone imbalance.',
    benefits: [
      'Lab-informed dosing and monitoring',
      'Personalized to your biomarkers',
      'Ongoing protocol adjustments',
      'Treatment shipped to your door',
    ],
    ideal: 'Men 30+ experiencing symptoms of low testosterone who want evidence-based, provider-supervised hormone optimization.',
    href: '/trt',
    quizHref: '/quiz',
    quizLabel: 'Take the TRT Assessment',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    tag: 'GLP-1',
    title: 'GLP-1 Medical Weight Loss',
    description: 'Clinician-supervised weight loss with GLP-1 receptor agonists including semaglutide and tirzepatide. Medical-grade protocols for sustainable body composition change.',
    benefits: [
      'Semaglutide and tirzepatide options',
      'Physician-supervised protocols',
      'Regular monitoring and adjustments',
      'Patients commonly report 15-20% body weight reduction',
    ],
    ideal: 'Men with a BMI of 27+ who have struggled with traditional weight loss approaches and want medical-grade intervention.',
    href: '/glp1',
    quizHref: '/glp1-quiz',
    quizLabel: 'Take the GLP-1 Assessment',
  },
  {
    icon: <FlaskConical className="w-6 h-6" />,
    tag: 'Peptides',
    title: 'Peptide Therapy',
    description: 'BPC-157/TB-500, MOTS-c, and GHK-Cu — now available as add-ons. These peptides have been removed from the FDA ban list and are available through our licensed pharmacy partners.',
    benefits: [
      'BPC-157/TB-500 — recovery and tissue repair',
      'MOTS-c — metabolic optimization',
      'GHK-Cu — skin health and anti-aging',
      '$100/mo per peptide, combinable with TRT or GLP-1',
    ],
    ideal: 'Adults focused on recovery, metabolic optimization, skin health, or overall wellness — as a standalone or add-on to TRT/GLP-1.',
    href: '/peptides',
    quizHref: null,
    quizLabel: null,
  },
]

export default function Services() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-graphite-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-graphite-950 via-graphite-900 to-graphite-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(26,154,115,0.08),_transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-28 lg:py-36">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
            className="max-w-3xl"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-graphite-400 mb-4 block">
              Treatment Programs
            </span>
            <h1 className="text-display-xl text-white mb-6">
              Our Treatment Programs
            </h1>
            <p className="text-xl text-graphite-400 leading-relaxed max-w-2xl">
              Three pillars of men&apos;s health optimization — each physician-guided,
              individually tailored, and designed for measurable outcomes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      {services.map((service, index) => (
        <Section key={service.tag} className={index % 2 === 1 ? 'bg-graphite-50' : ''}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <CardIcon className="!mb-0">{service.icon}</CardIcon>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-graphite-400">
                  {service.tag}
                </span>
              </div>

              <h2 className="text-display-sm text-graphite-950 mb-4">{service.title}</h2>
              <p className="text-subheadline text-graphite-500 mb-8">{service.description}</p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-graphite-950 text-white text-[14px] font-medium hover:bg-graphite-800 transition-all shadow-sm"
                >
                  Learn More <ChevronRight className="w-4 h-4" />
                </Link>
                {service.quizHref && (
                  <Link
                    href={service.quizHref}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-graphite-200 text-graphite-700 text-[14px] font-medium hover:bg-graphite-50 transition-all"
                  >
                    {service.quizLabel}
                  </Link>
                )}
              </div>
            </div>

            <div>
              <Card hover={false}>
                <h3 className="text-[14px] font-semibold text-graphite-950 mb-4">What&apos;s Included</h3>
                <ul className="space-y-3 mb-6">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-[14px] text-graphite-600">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-graphite-100">
                  <h4 className="text-[12px] font-semibold text-graphite-400 uppercase tracking-widest mb-2">
                    Ideal For
                  </h4>
                  <p className="text-[13px] text-graphite-500 leading-relaxed">{service.ideal}</p>
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
              title: 'Book a Consultation',
              desc: 'Schedule a paid consultation with a licensed provider. Quick online booking, no referral needed.',
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
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-graphite-300 mx-auto mb-4">
                {item.icon}
              </div>
              <span className="text-[11px] font-semibold text-graphite-500 tracking-widest">
                Step {item.step}
              </span>
              <h3 className="text-[16px] font-semibold text-white mt-2 mb-2">{item.title}</h3>
              <p className="text-[13px] text-graphite-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-graphite-950 text-[15px] font-semibold hover:bg-graphite-100 transition-all shadow-lg"
          >
            Book Your Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-[12px] text-graphite-600 mt-4">
            All treatments require evaluation by a licensed provider. Individual results vary.
          </p>
        </div>
      </Section>
    </>
  )
}
