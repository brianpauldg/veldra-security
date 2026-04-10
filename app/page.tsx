'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Shield, Activity, Zap, Lock, Clock, UserCheck,
  ArrowRight, Check, ChevronRight, Star, Microscope,
  Brain, Syringe, FlaskConical, HeartPulse, TrendingUp,
  Bot, Stethoscope
} from 'lucide-react'
import Section, { SectionLabel, SectionTitle, SectionDescription } from '@/components/ui/Section'
import Card, { CardIcon } from '@/components/ui/Card'
import EmailCapture from '@/components/EmailCapture'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0, 1] as [number, number, number, number] },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
}

export default function Home() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-graphite-950 overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-graphite-950 via-graphite-900 to-graphite-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(26,154,115,0.08),_transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-28 lg:py-40">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-4xl"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[12px] font-medium text-graphite-300 tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Now accepting new patients
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-display-xl text-white mb-6"
            >
              The Modern Standard{'\n'}
              <br />
              in Medical Optimization
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl text-graphite-400 leading-relaxed max-w-2xl mb-10"
            >
              Premium telehealth for TRT, GLP-1 weight loss, and peptide therapy.
              Licensed providers, personalized protocols, and AI-enhanced care
              operations — designed for people who demand more from their health.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-graphite-950 text-[15px] font-semibold hover:bg-graphite-100 transition-all shadow-lg hover:shadow-xl"
              >
                Book Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/trt"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white text-[15px] font-medium hover:bg-white/5 transition-all"
              >
                Explore Treatments
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TRUST BAR
      ═══════════════════════════════════════════════════════ */}
      <div className="border-b border-graphite-100 bg-graphite-50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              { icon: <UserCheck className="w-4 h-4" />, text: 'Licensed Medical Providers' },
              { icon: <Lock className="w-4 h-4" />, text: 'HIPAA-Compliant Platform' },
              { icon: <Activity className="w-4 h-4" />, text: 'Personalized Care Pathways' },
              { icon: <Shield className="w-4 h-4" />, text: 'Stripe-Secured Payments' },
              { icon: <Bot className="w-4 h-4" />, text: 'AI-Enhanced Operations' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-[12px] font-medium text-graphite-500">
                {item.icon}
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          SERVICE PILLARS
      ═══════════════════════════════════════════════════════ */}
      <Section>
        <SectionLabel>Treatment Programs</SectionLabel>
        <SectionTitle>Three pillars of optimization</SectionTitle>
        <SectionDescription>
          Each program is physician-guided, individually tailored, and designed for
          measurable, sustainable outcomes.
        </SectionDescription>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Syringe className="w-6 h-6" />,
              title: 'Testosterone Replacement',
              description: 'Clinician-guided TRT protocols to restore energy, drive, body composition, and overall vitality. Lab-informed. Individually dosed.',
              href: '/trt',
              tag: 'TRT',
            },
            {
              icon: <TrendingUp className="w-6 h-6" />,
              title: 'GLP-1 Weight Loss',
              description: 'Medical weight management with GLP-1 receptor agonists. Physician-supervised protocols for sustainable body composition change.',
              href: '/glp1',
              tag: 'GLP-1',
            },
            {
              icon: <FlaskConical className="w-6 h-6" />,
              title: 'Peptide Therapy',
              description: 'Targeted peptide protocols for recovery, performance, sleep, and cellular optimization. Research-informed. Provider-managed.',
              href: '/peptides',
              tag: 'Peptides',
            },
          ].map((service) => (
            <Link key={service.title} href={service.href} className="group">
              <Card className="h-full group-hover:border-graphite-300">
                <div className="flex items-center gap-3 mb-5">
                  <CardIcon className="group-hover:bg-graphite-950 group-hover:text-white transition-colors">
                    {service.icon}
                  </CardIcon>
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-graphite-400">{service.tag}</span>
                </div>
                <h3 className="text-headline text-graphite-950 mb-3">{service.title}</h3>
                <p className="text-[14px] text-graphite-500 leading-relaxed mb-5">{service.description}</p>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-graphite-950 group-hover:gap-3 transition-all">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          POSITIONING — BUILT FOR MODERN OPTIMIZATION
      ═══════════════════════════════════════════════════════ */}
      <Section dark className="gradient-hero">
        <div className="max-w-3xl mx-auto text-center">
          <SectionLabel dark>Why Nova Health</SectionLabel>
          <h2 className="text-display-lg text-white mb-6">
            Built for people who refuse to settle for average health
          </h2>
          <p className="text-lg text-graphite-400 leading-relaxed mb-12">
            Most telehealth clinics are transactional. We built a system — premium medical
            oversight, AI-enhanced operations, and a care experience that feels like it
            was designed by people who actually care about outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Stethoscope className="w-5 h-5" />, title: 'Licensed Clinicians', desc: 'Every protocol designed and supervised by board-eligible providers' },
            { icon: <Microscope className="w-5 h-5" />, title: 'Lab-Informed Protocols', desc: 'Treatment decisions grounded in your bloodwork and biomarkers' },
            { icon: <Brain className="w-5 h-5" />, title: 'AI-Enhanced Ops', desc: 'Intelligent workflows that keep your care on track, automatically' },
            { icon: <HeartPulse className="w-5 h-5" />, title: 'Ongoing Optimization', desc: 'Not one-and-done. Continuous monitoring, adjustment, and support' },
          ].map((item) => (
            <div key={item.title} className="glass rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-graphite-300 mb-4">
                {item.icon}
              </div>
              <h3 className="text-[15px] font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-[13px] text-graphite-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          AI INFRASTRUCTURE PREVIEW
      ═══════════════════════════════════════════════════════ */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>Intelligent Infrastructure</SectionLabel>
            <SectionTitle>AI that supports your care — not replaces your clinician</SectionTitle>
            <SectionDescription>
              Our AI systems handle scheduling, reminders, intake guidance, and operational
              workflows. Your clinician handles medical decisions. That&apos;s the way it should be.
            </SectionDescription>

            <ul className="mt-8 space-y-4">
              {[
                'Automated intake and onboarding workflows',
                'Intelligent appointment reminders and follow-ups',
                'Educational content personalized to your program',
                'Operational analytics for care continuity',
                'Support triage and routing to the right team',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-[14px] text-graphite-600">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 mt-8 text-[14px] font-medium text-graphite-950 hover:gap-3 transition-all"
            >
              See how our AI systems work <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* AI Visual */}
          <div className="bg-graphite-950 rounded-3xl p-8 lg:p-10">
            <div className="space-y-4">
              {[
                { label: 'Intake Guidance', status: 'AI-Assisted', color: 'bg-emerald-400' },
                { label: 'Lab Review Routing', status: 'AI-Assisted', color: 'bg-emerald-400' },
                { label: 'Clinical Decision', status: 'Provider Only', color: 'bg-amber-400' },
                { label: 'Prescription Authority', status: 'Provider Only', color: 'bg-amber-400' },
                { label: 'Follow-Up Scheduling', status: 'AI-Assisted', color: 'bg-emerald-400' },
                { label: 'Patient Education', status: 'AI-Assisted', color: 'bg-emerald-400' },
                { label: 'Dosage Adjustment', status: 'Provider Only', color: 'bg-amber-400' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3 border-b border-graphite-800 last:border-0">
                  <span className="text-[13px] text-graphite-300">{item.label}</span>
                  <span className="flex items-center gap-2 text-[12px] font-medium text-graphite-400">
                    <span className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════════════════════ */}
      <Section className="bg-graphite-50">
        <div className="text-center mb-16">
          <SectionLabel>Your Journey</SectionLabel>
          <SectionTitle>Six steps to optimized health</SectionTitle>
          <SectionDescription className="mx-auto">
            A streamlined, modern care experience from first click to ongoing optimization.
          </SectionDescription>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Book Consultation', desc: 'Schedule a paid consultation with a licensed provider. Quick, secure, no obligation beyond the visit.' },
            { step: '02', title: 'Complete Intake', desc: 'Fill out your health history, symptoms, and goals through our secure digital intake system.' },
            { step: '03', title: 'Medical Review', desc: 'A licensed clinician reviews your intake, orders appropriate labs, and evaluates your eligibility.' },
            { step: '04', title: 'Lab & Diagnostics', desc: 'Complete bloodwork at a convenient lab location. Results are reviewed by your care team.' },
            { step: '05', title: 'Personalized Protocol', desc: 'Receive a tailored treatment plan designed around your biomarkers, goals, and medical history.' },
            { step: '06', title: 'Ongoing Optimization', desc: 'Regular check-ins, lab monitoring, and protocol adjustments to keep you progressing.' },
          ].map((item) => (
            <div key={item.step} className="relative">
              <span className="text-[64px] font-bold text-graphite-100 leading-none">{item.step}</span>
              <h3 className="text-headline mt-2 mb-2">{item.title}</h3>
              <p className="text-[14px] text-graphite-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          OUTCOMES / BENEFITS
      ═══════════════════════════════════════════════════════ */}
      <Section>
        <div className="text-center mb-16">
          <SectionLabel>What Patients Experience</SectionLabel>
          <SectionTitle>Real outcomes. Responsible medicine.</SectionTitle>
          <SectionDescription className="mx-auto">
            Results vary by individual. All outcomes are subject to clinician evaluation
            and ongoing medical supervision.
          </SectionDescription>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: <Zap className="w-5 h-5" />, title: 'Restored Energy', desc: 'Patients commonly report improved energy levels and reduced fatigue within weeks of treatment initiation.' },
            { icon: <TrendingUp className="w-5 h-5" />, title: 'Body Composition', desc: 'Medically supervised protocols designed to support lean mass, metabolic health, and sustainable weight management.' },
            { icon: <Brain className="w-5 h-5" />, title: 'Mental Clarity', desc: 'Hormone optimization may support cognitive performance, focus, and mood stability.' },
            { icon: <HeartPulse className="w-5 h-5" />, title: 'Improved Recovery', desc: 'Peptide and hormone protocols that support faster recovery, better sleep, and reduced inflammation.' },
            { icon: <Activity className="w-5 h-5" />, title: 'Libido & Vitality', desc: 'TRT patients frequently report improvements in libido, sexual health, and overall vitality.' },
            { icon: <Clock className="w-5 h-5" />, title: 'Convenience', desc: 'No waiting rooms. No scheduling battles. Premium telehealth from your home, on your time.' },
          ].map((item) => (
            <Card key={item.title}>
              <CardIcon>{item.icon}</CardIcon>
              <h3 className="text-[16px] font-semibold text-graphite-950 mb-2">{item.title}</h3>
              <p className="text-[13px] text-graphite-500 leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </div>

        <p className="text-center text-[12px] text-graphite-400 mt-8">
          Individual results vary. All treatments are subject to medical evaluation by a licensed provider.
        </p>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          COMPARISON — TRADITIONAL VS NOVA
      ═══════════════════════════════════════════════════════ */}
      <Section dark>
        <div className="text-center mb-16">
          <SectionLabel dark>The Difference</SectionLabel>
          <SectionTitle dark>Not your average telehealth clinic</SectionTitle>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Traditional */}
          <div className="rounded-2xl border border-graphite-800 p-8">
            <h3 className="text-[14px] font-semibold text-graphite-400 uppercase tracking-widest mb-6">Traditional Clinic</h3>
            <ul className="space-y-4">
              {[
                'Long wait times and scheduling friction',
                'Generic protocols, one-size-fits-all',
                'Reactive care — see you in 6 months',
                'Paper forms and outdated systems',
                'No transparency on process or pricing',
                'Minimal follow-up or accountability',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-graphite-600 mt-0.5">&#x2717;</span>
                  <span className="text-[14px] text-graphite-500">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Nova */}
          <div className="rounded-2xl border border-emerald-800/30 bg-emerald-900/10 p-8">
            <h3 className="text-[14px] font-semibold text-emerald-400 uppercase tracking-widest mb-6">Nova Health</h3>
            <ul className="space-y-4">
              {[
                'Book online in under 2 minutes',
                'Personalized, lab-informed protocols',
                'Proactive monitoring and regular check-ins',
                'Fully digital intake and care management',
                'Transparent pricing, no hidden fees',
                'AI-enhanced follow-up and care continuity',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-[14px] text-graphite-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          CONSULTATION OFFER
      ═══════════════════════════════════════════════════════ */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl border border-graphite-200 p-10 lg:p-14 text-center">
            <SectionLabel>Your First Step</SectionLabel>
            <h2 className="text-display-sm text-graphite-950 mb-4">
              Start with a consultation
            </h2>
            <p className="text-subheadline text-graphite-500 mb-8 max-w-xl mx-auto">
              A focused session with a licensed provider to review your health goals,
              discuss treatment options, and determine eligibility. No commitment beyond the visit.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 text-left">
              {[
                { title: 'Health History Review', desc: 'Your symptoms, goals, and medical background' },
                { title: 'Treatment Discussion', desc: 'Options, protocols, and what to expect' },
                { title: 'Next-Step Plan', desc: 'Lab orders, intake, or referral as appropriate' },
              ].map((item) => (
                <div key={item.title}>
                  <h4 className="text-[14px] font-semibold text-graphite-950 mb-1">{item.title}</h4>
                  <p className="text-[13px] text-graphite-500">{item.desc}</p>
                </div>
              ))}
            </div>

            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-graphite-950 text-white text-[15px] font-semibold hover:bg-graphite-800 transition-all shadow-lg hover:shadow-xl"
            >
              Book Your Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>

            <p className="text-[12px] text-graphite-400 mt-4">
              Secure payment via Stripe. Subject to provider availability and eligibility review.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          TESTIMONIALS PLACEHOLDER
      ═══════════════════════════════════════════════════════ */}
      <Section className="bg-graphite-50">
        <div className="text-center mb-14">
          <SectionLabel>Patient Experiences</SectionLabel>
          <SectionTitle>What our patients are saying</SectionTitle>
          <SectionDescription className="mx-auto">
            Real feedback from real patients. Individual results may vary.
          </SectionDescription>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: 'The entire process felt premium — from the consultation to the follow-up. My energy and focus have improved significantly in the first 8 weeks.',
              initials: 'MK',
              name: 'Michael K.',
              detail: 'TRT Patient, Age 42',
            },
            {
              quote: 'I lost 28 lbs in 12 weeks on the GLP-1 program. The medical oversight gave me confidence this was done right, not like the online clinics I tried before.',
              initials: 'JR',
              name: 'Jason R.',
              detail: 'GLP-1 Patient, Age 38',
            },
            {
              quote: 'The convenience is unmatched. Digital intake, video consultations, automatic refills. It feels like healthcare should have always been this way.',
              initials: 'DT',
              name: 'David T.',
              detail: 'Peptide Therapy Patient, Age 45',
            },
          ].map((testimonial) => (
            <Card key={testimonial.name} className="bg-white">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-[14px] text-graphite-600 leading-relaxed mb-6 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-graphite-950 flex items-center justify-center text-white text-[12px] font-semibold">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-graphite-950">{testimonial.name}</div>
                  <div className="text-[12px] text-graphite-400">{testimonial.detail}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <p className="text-center text-[11px] text-graphite-400 mt-6">
          Testimonials reflect individual patient experiences. Results vary. All treatments supervised by licensed providers.
        </p>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          FAQ PREVIEW
      ═══════════════════════════════════════════════════════ */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <SectionLabel>Common Questions</SectionLabel>
            <SectionTitle>Frequently asked questions</SectionTitle>
          </div>

          <div className="space-y-0 divide-y divide-graphite-100">
            {[
              { q: 'Who is eligible for treatment?', a: 'Eligibility is determined by a licensed medical provider based on your health history, symptoms, lab results, and goals. Not everyone qualifies for every treatment.' },
              { q: 'How does the consultation work?', a: 'You book a paid consultation online, complete a digital intake form, and meet with a provider via secure video. They review your health, discuss options, and determine next steps.' },
              { q: 'Is this legitimate medical care?', a: 'Yes. All treatments are prescribed and supervised by licensed, board-eligible medical providers. We operate within all applicable telehealth regulations.' },
              { q: 'What does AI do in your system?', a: 'AI supports operations — scheduling, reminders, intake workflows, and patient education. It does not make clinical decisions, diagnose, or prescribe. All medical decisions are made by licensed providers.' },
            ].map((faq) => (
              <div key={faq.q} className="py-6">
                <h3 className="text-[16px] font-semibold text-graphite-950 mb-2">{faq.q}</h3>
                <p className="text-[14px] text-graphite-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/faq" className="inline-flex items-center gap-2 text-[14px] font-medium text-graphite-950 hover:gap-3 transition-all">
              View all FAQ <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          EMAIL CAPTURE
      ═══════════════════════════════════════════════════════ */}
      <Section className="bg-graphite-50">
        <div className="max-w-2xl mx-auto text-center">
          <SectionLabel>Stay Informed</SectionLabel>
          <SectionTitle>Get insights on optimization</SectionTitle>
          <SectionDescription className="mx-auto mb-8">
            Evidence-based content on hormone health, medical weight loss, and peptide science.
            No spam. Unsubscribe anytime.
          </SectionDescription>
          <EmailCapture />
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════════ */}
      <Section dark className="gradient-hero">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-display-lg text-white mb-6">
            Your health deserves a modern approach
          </h2>
          <p className="text-lg text-graphite-400 leading-relaxed mb-10 max-w-xl mx-auto">
            Premium care, licensed providers, and systems built for people who take
            their health seriously. Start with a consultation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-graphite-950 text-[15px] font-semibold hover:bg-graphite-100 transition-all shadow-lg"
            >
              Book Your Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white text-[15px] font-medium hover:bg-white/5 transition-all"
            >
              Contact Us
            </Link>
          </div>
          <p className="text-[12px] text-graphite-600 mt-6">
            All treatments require evaluation and approval by a licensed medical provider.
            Individual results vary.
          </p>
        </div>
      </Section>
    </>
  )
}
