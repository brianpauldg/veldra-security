'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight, Check, Bot, Stethoscope, Users, Clock,
  MessageSquare, BarChart3, Mail, Shield, Brain, Workflow,
  FileText, Bell, Lightbulb, LineChart
} from 'lucide-react'
import Section, { SectionLabel, SectionTitle, SectionDescription } from '@/components/ui/Section'
import Card from '@/components/ui/Card'

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-graphite-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-graphite-950 via-graphite-900 to-graphite-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(26,154,115,0.06),_transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-36">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[12px] font-medium text-graphite-300 tracking-wide uppercase mb-5">
              AI-Enhanced Operations
            </span>
            <h1 className="text-display-lg text-white mb-5">
              Intelligent infrastructure for modern healthcare
            </h1>
            <p className="text-lg text-graphite-400 leading-relaxed max-w-2xl">
              Our AI systems handle the operational complexity so your care team can focus
              on what matters — clinical decision-making and patient outcomes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Clear Distinction */}
      <Section>
        <div className="text-center mb-14">
          <SectionLabel>The Principle</SectionLabel>
          <SectionTitle>AI supports operations. Clinicians make decisions.</SectionTitle>
          <SectionDescription className="mx-auto">
            We believe AI should enhance — never replace — the clinician-patient relationship.
            Here&apos;s exactly what AI does and doesn&apos;t do at Bloom Metabolics.
          </SectionDescription>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* AI Does */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Bot className="w-5 h-5 text-emerald-600" />
              <h3 className="text-[14px] font-semibold text-emerald-700 uppercase tracking-widest">AI-Assisted</h3>
            </div>
            <ul className="space-y-3">
              {[
                'Intake form guidance and workflow routing',
                'Appointment scheduling and reminders',
                'FAQ and educational content delivery',
                'Patient communication and follow-ups',
                'Support request triage and routing',
                'Operational analytics and reporting',
                'Lead segmentation and nurture sequences',
                'Care journey orchestration',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-[14px] text-graphite-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Provider Only */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Stethoscope className="w-5 h-5 text-amber-600" />
              <h3 className="text-[14px] font-semibold text-amber-700 uppercase tracking-widest">Provider Only</h3>
            </div>
            <ul className="space-y-3">
              {[
                'Medical diagnosis and evaluation',
                'Prescription authority and dosing decisions',
                'Lab result interpretation and clinical judgment',
                'Treatment plan design and modification',
                'Risk assessment and contraindication review',
                'Patient eligibility determination',
                'Adverse event management',
                'Clinical oversight of all treatments',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Shield className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span className="text-[14px] text-graphite-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* AI Workflow Map */}
      <Section dark>
        <div className="text-center mb-14">
          <SectionLabel dark>Infrastructure Map</SectionLabel>
          <SectionTitle dark>How AI powers patient operations</SectionTitle>
          <SectionDescription dark className="mx-auto">
            Nine operational layers, each designed to reduce friction and improve the care experience.
          </SectionDescription>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: <FileText className="w-5 h-5" />, title: 'Intake Guidance', desc: 'AI-guided intake forms that adapt to patient responses, route to the right care pathway, and flag incomplete information.' },
            { icon: <MessageSquare className="w-5 h-5" />, title: 'FAQ Assistance', desc: 'Intelligent FAQ system that answers common patient questions about treatments, processes, and what to expect.' },
            { icon: <Users className="w-5 h-5" />, title: 'Lead Segmentation', desc: 'Automatic classification of patient interests and intent level to ensure personalized communication and care routing.' },
            { icon: <Workflow className="w-5 h-5" />, title: 'Support Triage', desc: 'Incoming support requests automatically categorized and routed to the right team member based on urgency and topic.' },
            { icon: <Bell className="w-5 h-5" />, title: 'Smart Reminders', desc: 'Personalized appointment reminders, follow-up prompts, and care milestones delivered at the right time.' },
            { icon: <Lightbulb className="w-5 h-5" />, title: 'Educational Sequences', desc: 'Automated delivery of treatment-specific educational content to keep patients informed and engaged.' },
            { icon: <Brain className="w-5 h-5" />, title: 'Journey Orchestration', desc: 'End-to-end patient journey management from first visit to ongoing care, ensuring no step is missed.' },
            { icon: <LineChart className="w-5 h-5" />, title: 'Conversion Analytics', desc: 'Insight layer that tracks funnel performance, identifies drop-off points, and surfaces optimization opportunities.' },
            { icon: <BarChart3 className="w-5 h-5" />, title: 'Operational Reporting', desc: 'Automated dashboards for care team performance, patient volume, treatment outcomes, and operational efficiency.' },
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

      {/* Patient Journey */}
      <Section>
        <div className="text-center mb-14">
          <SectionLabel>The Patient Journey</SectionLabel>
          <SectionTitle>Every touchpoint, orchestrated</SectionTitle>
        </div>

        <div className="max-w-3xl mx-auto space-y-0">
          {[
            { actor: 'Patient', action: 'Visits website, explores treatments', system: 'AI tracks page views, segments interest' },
            { actor: 'Patient', action: 'Submits lead capture or books consultation', system: 'AI routes lead, triggers welcome sequence' },
            { actor: 'Patient', action: 'Completes Stripe checkout', system: 'CRM updated, booking link sent, reminders scheduled' },
            { actor: 'Patient', action: 'Completes digital intake form', system: 'AI validates data, flags for clinical review' },
            { actor: 'Provider', action: 'Reviews intake, orders labs', system: 'AI schedules lab reminders, tracks completion' },
            { actor: 'Provider', action: 'Designs personalized treatment plan', system: 'AI generates onboarding materials, schedules follow-ups' },
            { actor: 'Patient', action: 'Begins treatment', system: 'AI monitors milestones, sends educational content' },
            { actor: 'Provider', action: 'Conducts follow-up, adjusts protocol', system: 'AI schedules next labs, updates care timeline' },
          ].map((step, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 py-5 border-b border-graphite-100 last:border-0">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${step.actor === 'Provider' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                <span className="text-[12px] font-semibold text-graphite-400 uppercase tracking-wider">{step.actor}</span>
              </div>
              <div className="text-[14px] text-graphite-900 font-medium">{step.action}</div>
              <div className="text-[13px] text-graphite-500">{step.system}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section dark className="gradient-hero">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-display text-white mb-5">
            Experience healthcare that runs on intelligence
          </h2>
          <p className="text-lg text-graphite-400 leading-relaxed mb-8">
            Start with a consultation and see what premium, AI-enhanced telehealth feels like.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-graphite-950 text-[15px] font-semibold hover:bg-graphite-100 transition-all shadow-lg"
          >
            Book Your Consultation <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-[12px] text-graphite-600 mt-5">
            AI supports operational workflows only. All medical decisions are made by licensed providers.
          </p>
        </div>
      </Section>
    </>
  )
}
