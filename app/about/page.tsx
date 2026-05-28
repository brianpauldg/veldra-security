'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight, Check, Shield, Microscope, Users,
  HeartPulse, Stethoscope, UserCheck, Lock
} from 'lucide-react'
import Section, { SectionLabel, SectionTitle, SectionDescription } from '@/components/ui/Section'
import Card, { CardIcon } from '@/components/ui/Card'

export default function About() {
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
              About Bloom Metabolics
            </span>
            <h1 className="text-display-xl text-white mb-6">
              Built for men who take their health seriously
            </h1>
            <p className="text-xl text-[#8a8268] leading-relaxed max-w-2xl">
              Bloom Metabolics exists because the gap between what primary care offers
              and what informed patients need is wider than it should be. Efficient,
              evidence-based, and built around outcomes, not office visits.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>Our Mission</SectionLabel>
            <SectionTitle>Clinical care without the friction</SectionTitle>
            <SectionDescription>
              Traditional healthcare makes men wait weeks for appointments, sit in
              waiting rooms, and repeat their story to every new provider. We built
              Bloom Metabolics to eliminate that friction entirely.
            </SectionDescription>

            <div className="mt-8 space-y-6">
              <p className="text-[14px] text-[#a89878] leading-relaxed">
                Every treatment protocol at Bloom Metabolics is designed by board-certified
                medical providers and informed by your bloodwork and biomarkers, not
                generic guidelines or one-size-fits-all dosing.
              </p>
              <p className="text-[14px] text-[#a89878] leading-relaxed">
                Our platform combines the convenience of telehealth with the rigor of
                specialized medicine. Digital intake, video consultations, lab coordination,
                treatment delivery, and ongoing monitoring, all managed through a single,
                secure platform.
              </p>
            </div>
          </div>

          <div className="bg-[#050404] rounded-3xl p-8 lg:p-10">
            <h3 className="text-[14px] font-semibold text-[#8a8268] uppercase tracking-widest mb-8">
              What We Stand For
            </h3>
            <div className="space-y-6">
              {[
                { title: 'Medical Rigor First', desc: 'Every protocol is evidence-based and provider-supervised. No shortcuts, no exceptions.' },
                { title: 'Radical Transparency', desc: 'Clear pricing, honest timelines, and straightforward communication. Every cost disclosed upfront.' },
                { title: 'Personalized Protocols', desc: 'Your treatment is designed around your labs, your goals, and your medical history, not a template.' },
                { title: 'Ongoing Optimization', desc: 'We don\'t prescribe and disappear. Regular monitoring, check-ins, and adjustments are built into every program.' },
              ].map((item) => (
                <div key={item.title}>
                  <h4 className="text-[15px] font-semibold text-[#d8cfbe] mb-1">{item.title}</h4>
                  <p className="text-[13px] text-[#8a8268] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Why Bloom Metabolics */}
      <Section dark>
        <div className="text-center mb-16">
          <SectionLabel dark>Why Bloom Metabolics</SectionLabel>
          <SectionTitle dark>A different standard of care</SectionTitle>
          <SectionDescription dark className="mx-auto">
            We built Bloom Metabolics around the things that actually matter to patients:
            provider quality, treatment personalization, convenience, and accountability.
          </SectionDescription>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Stethoscope className="w-5 h-5" />,
              title: 'Licensed Clinicians',
              desc: 'Board-eligible providers who specialize in hormone optimization and metabolic health.',
            },
            {
              icon: <Microscope className="w-5 h-5" />,
              title: 'Lab-Informed Protocols',
              desc: 'Treatment decisions grounded in your bloodwork, not symptoms alone.',
            },
            {
              icon: <Users className="w-5 h-5" />,
              title: 'RN-Managed Operations',
              desc: 'Scheduling, intake coordination, patient education, and follow-ups, handled by our registered nurse-led operations team.',
            },
            {
              icon: <HeartPulse className="w-5 h-5" />,
              title: 'Continuous Monitoring',
              desc: 'Regular labs, provider check-ins, and protocol adjustments to keep you on track.',
            },
          ].map((item) => (
            <div key={item.title} className="glass rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-[#0d0c0a]/5 flex items-center justify-center text-[#8a8268] mb-4">
                {item.icon}
              </div>
              <h3 className="text-[15px] font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-[13px] text-[#8a8268] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Trust Signals */}
      <Section>
        <div className="text-center mb-16">
          <SectionLabel>Standards</SectionLabel>
          <SectionTitle>How we operate</SectionTitle>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: <UserCheck className="w-6 h-6" />,
              title: 'Licensed & Credentialed',
              points: [
                'Board-eligible medical providers',
                'Licensed in every state we serve',
                'Ongoing clinical education requirements',
                'Full regulatory compliance',
              ],
            },
            {
              icon: <Lock className="w-6 h-6" />,
              title: 'Secure & Compliant',
              points: [
                'HIPAA-compliant platform',
                'Encrypted data at rest and in transit',
                'PCI-compliant payment processing',
                'Regular security audits',
              ],
            },
            {
              icon: <Shield className="w-6 h-6" />,
              title: 'Ethical & Transparent',
              points: [
                'No guaranteed outcome promises',
                'Clear eligibility criteria',
                'Transparent pricing. Every cost disclosed upfront',
                'We say no when treatment isn\'t right',
              ],
            },
          ].map((item) => (
            <Card key={item.title}>
              <CardIcon>{item.icon}</CardIcon>
              <h3 className="text-headline text-[#d8cfbe] mb-4">{item.title}</h3>
              <ul className="space-y-3">
                {item.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-[13px] text-[#8a8268]">{point}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section dark className="gradient-hero">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-display-lg text-white mb-6">
            Clinical care, built around your biology.
          </h2>
          <p className="text-lg text-[#8a8268] leading-relaxed mb-10 max-w-xl mx-auto">
            Start with a consultation. A focused session with a licensed provider to
            discuss your health, your goals, and your options.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/join"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#0d0c0a] text-[#d8cfbe] text-[15px] font-semibold hover:bg-[#0d0c0a] transition-all shadow-lg"
            >
              Join Waitlist
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white text-[15px] font-medium hover:bg-[#0d0c0a]/5 transition-all"
            >
              Take the Assessment
            </Link>
          </div>
          <p className="text-[12px] text-[#8a8268] mt-6">
            All treatments require evaluation and approval by a licensed medical provider.
            Individual results vary.
          </p>
        </div>
      </Section>
    </>
  )
}
