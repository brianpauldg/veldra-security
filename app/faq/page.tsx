'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ArrowRight } from 'lucide-react'
import Section from '@/components/ui/Section'
import { CONSULTATION, primaryCtaLabel, primaryCtaSublabel } from '@/lib/pricing'

const faqCategories = [
  {
    category: 'Pricing & Cost',
    items: [
      {
        q: 'How much does Bloom Metabolics cost?',
        a: `${CONSULTATION.display} for the consultation. Program pricing is confirmed by your physician based on the medication and dose prescribed, before you commit. ${primaryCtaSublabel()}.`,
      },
      {
        q: 'What if I don\'t qualify for treatment?',
        a: 'You receive a full refund of the consultation fee. You still walk away with a physician-reviewed eligibility report.',
      },
      {
        q: 'Are there hidden fees?',
        a: 'No. The consultation fee and program pricing are the only charges. Shipping from our licensed compounding pharmacy is free on all programs. Some state-required lab work may be billed separately — your physician will tell you upfront.',
      },
      {
        q: 'Do you accept insurance?',
        a: 'Bloom Metabolics is cash-pay. We don\'t bill insurance. Payments run on Stripe.',
      },
      {
        q: 'Can I cancel anytime?',
        a: 'Yes. Monthly programs can be cancelled anytime. You keep any medication you\'ve already received.',
      },
    ],
  },
  {
    category: 'Providers & Medicine',
    items: [
      {
        q: 'Who are the prescribing physicians?',
        a: 'Every prescription is evaluated and signed by a U.S.-licensed physician. You\'ll be introduced to your physician at the consultation.',
      },
      {
        q: 'Is this real medical care?',
        a: 'Yes. Treatment is prescribed by licensed physicians and dispensed by licensed pharmacies. We operate within all applicable telehealth regulations.',
      },
      {
        q: 'What pharmacy fills the medication?',
        a: 'Medication is dispensed by a U.S.-licensed compounding pharmacy partner. Your physician will discuss the specific pharmacy during the consultation.',
      },
      {
        q: 'What states do you serve?',
        a: 'Availability varies by treatment and physician licensing. We\'ll confirm coverage for your state before charging you for a consultation.',
      },
    ],
  },
  {
    category: 'Consultation & Intake',
    items: [
      {
        q: 'How does the consultation work?',
        a: 'You book a consultation, complete a short digital intake, and meet with a physician via secure video. The physician reviews your history, answers questions, and confirms whether treatment is appropriate.',
      },
      {
        q: 'How long does the consultation take?',
        a: 'Typically 15 minutes. You\'ll have the physician\'s full attention and can ask anything — there is no "upsell" script.',
      },
      {
        q: 'Do I need bloodwork?',
        a: 'Yes. Bloodwork is required before treatment for both Testosterone Therapy and GLP-1 programs. For TRT, a comprehensive hormone panel including total testosterone, free testosterone, estradiol, PSA, CBC, and metabolic panel is required. For GLP-1 therapy, a metabolic panel including A1C, fasting glucose, lipid panel, and liver function tests is required. Lab results from the past six months may be accepted; otherwise your physician will order a local draw through LabCorp or Quest Diagnostics. Lab costs may be billed separately.',
      },
      {
        q: 'How quickly will I hear back after booking?',
        a: 'You\'ll get a confirmation email instantly and can typically book a consultation within 24–48 hours.',
      },
    ],
  },
  {
    category: 'Treatments',
    items: [
      {
        q: 'Who qualifies for TRT?',
        a: 'Eligibility is determined by your physician based on symptoms, lab results (testosterone levels), and medical history. Low testosterone is diagnosed by blood test — not every patient with symptoms qualifies.',
      },
      {
        q: 'What GLP-1 medications do you offer?',
        // FDA April 1 2026 — compounded designation + medical necessity
        a: 'Your physician evaluates each patient individually. Based on clinician-determined medical necessity, the physician may prescribe compounded semaglutide or tirzepatide. Compounded medications are not FDA-approved and are prepared by a licensed compounding pharmacy.',
      },
      {
        q: 'Can I combine treatments?',
        a: 'Yes, some patients benefit from combined protocols. Your physician designs a coordinated plan tailored to your goals.',
      },
      {
        q: 'How long until I see results?',
        a: 'Timelines vary. TRT patients often notice initial changes within 2–4 weeks. GLP-1 weight changes typically appear within the first month. Your physician will set realistic expectations.',
      },
    ],
  },
  {
    category: 'Privacy & Data',
    items: [
      {
        q: 'Is my health information protected?',
        a: 'Yes. We use HIPAA-compliant systems, encrypted data transmission, and secure storage. Payments are processed by Stripe.',
      },
      {
        q: 'Do you share my data?',
        a: 'We do not sell patient data. Health information is shared only with your care team and as required by law. See our Privacy Policy for full details.',
      },
    ],
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#1a1814] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-[15px] font-semibold text-white pr-4 group-hover:text-[#d8cfbe] transition-colors">{q}</span>
        <ChevronDown className={`w-4 h-4 text-[#8a8268] flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="text-[14px] text-[#d8cfbe] leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQPage() {
  return (
    <>
      <section className="bg-graphite-950 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-display-lg text-chrome mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-graphite-400">
              Pricing, providers, treatment — answered plainly.
            </p>
          </motion.div>
        </div>
      </section>

      <Section>
        <div className="max-w-3xl mx-auto">
          {faqCategories.map((cat) => (
            <div key={cat.category} className="mb-12 last:mb-0">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#8a8268] mb-4">{cat.category}</h2>
              <div>
                {cat.items.map((faq) => (
                  <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <hr className="bloom-divider mb-[80px] lg:mb-[140px]" />
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-display-sm text-white mb-4" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300 }}>Still have questions?</h2>
          <p className="text-[15px] text-[#8a8268] mb-8 font-light">
            The fastest answer is the consultation itself. {primaryCtaSublabel()}.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/book"
              className="bloom-btn"
            >
              {primaryCtaLabel()} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/contact"
              className="bloom-btn bloom-btn-ghost"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
