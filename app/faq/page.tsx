'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ArrowRight } from 'lucide-react'
import Section, { SectionLabel, SectionTitle } from '@/components/ui/Section'
import type { Metadata } from 'next'

const faqCategories = [
  {
    category: 'General',
    items: [
      { q: 'What is Nova Health?', a: 'Nova Health is a premium telehealth clinic specializing in testosterone replacement therapy (TRT), GLP-1 medical weight loss, and peptide therapy. All treatments are prescribed and supervised by licensed medical providers through secure, convenient telehealth.' },
      { q: 'Is this legitimate medical care?', a: 'Yes. Every treatment is prescribed by a licensed, board-eligible medical provider. We operate within all applicable telehealth regulations and maintain the same clinical standards as in-person care.' },
      { q: 'What states do you serve?', a: 'Our service area varies by treatment type and provider licensing. During your consultation, we\'ll confirm availability in your state and ensure you can be treated by a properly licensed provider.' },
      { q: 'How is Nova Health different from other online clinics?', a: 'We combine premium medical oversight with AI-enhanced operational systems. This means personalized care, lab-informed protocols, proactive follow-up, and a care experience designed for people who take their health seriously — not a prescription mill.' },
    ],
  },
  {
    category: 'Consultations & Getting Started',
    items: [
      { q: 'How does the consultation work?', a: 'You book a paid consultation online, complete a digital intake form, and meet with a licensed provider via secure video. During the consultation, your provider reviews your health history, discusses symptoms and goals, and determines the best path forward.' },
      { q: 'What happens after my consultation?', a: 'Your provider will create a personalized care plan. If treatment is appropriate, they\'ll order labs, design your protocol, and guide you through next steps. If treatment isn\'t right for you, they\'ll explain why and suggest alternatives.' },
      { q: 'Do I need to prepare anything before my consultation?', a: 'After booking, you\'ll receive a digital intake form to complete before your appointment. Having recent lab work is helpful but not required — your provider can order new labs if needed.' },
      { q: 'Can I get a refund if I\'m not eligible for treatment?', a: 'The consultation fee covers the provider\'s time for evaluation and medical advice, regardless of treatment eligibility. However, the consultation itself is valuable — you\'ll receive personalized health guidance either way.' },
    ],
  },
  {
    category: 'Treatments',
    items: [
      { q: 'Who is eligible for TRT?', a: 'Eligibility is determined by your provider based on symptoms, lab results (testosterone levels), health history, and goals. Low testosterone is diagnosed through blood tests — not everyone with symptoms qualifies for treatment.' },
      { q: 'What GLP-1 medications do you prescribe?', a: 'Our providers evaluate each patient individually. Options may include semaglutide, tirzepatide, or other GLP-1 receptor agonists based on your medical profile, goals, and current availability.' },
      { q: 'Are peptides safe?', a: 'When prescribed and supervised by a licensed provider with appropriate monitoring, peptide therapy is generally well-tolerated. Your provider will discuss specific risks, benefits, and monitoring plans during your consultation.' },
      { q: 'Can I combine treatments?', a: 'Yes, many patients benefit from combined protocols (e.g., TRT with peptide therapy). Your provider will design a coordinated plan that accounts for all treatments and potential interactions.' },
      { q: 'How long until I see results?', a: 'Timelines vary by treatment and individual. TRT patients often notice initial improvements in 2-4 weeks; GLP-1 patients may see weight changes within the first month; peptide effects vary by protocol. Your provider will set realistic expectations.' },
    ],
  },
  {
    category: 'AI & Technology',
    items: [
      { q: 'What does AI do at Nova Health?', a: 'AI supports our operations — scheduling, reminders, intake workflows, patient education, and care coordination. AI does not diagnose, prescribe, or make clinical decisions. All medical decisions are made exclusively by licensed providers.' },
      { q: 'Is my data safe?', a: 'We use HIPAA-compliant systems, encrypted data transmission, and secure storage. Your health information is protected with the same standards used by major healthcare systems. Payments are processed securely through Stripe.' },
      { q: 'Do you share my data?', a: 'We do not sell your data. Health information is shared only with your care team and as required by law. See our Privacy Policy for complete details.' },
    ],
  },
  {
    category: 'Billing & Insurance',
    items: [
      { q: 'Do you accept insurance?', a: 'Nova Health operates as a cash-pay telehealth clinic. We provide transparent pricing without the complexity of insurance billing. Many patients find this more convenient and cost-effective than navigating insurance restrictions.' },
      { q: 'What forms of payment do you accept?', a: 'We accept all major credit and debit cards through Stripe, our secure payment processor.' },
      { q: 'Are there any hidden fees?', a: 'No. We believe in transparent pricing. Your consultation fee, treatment costs, and any lab fees are discussed upfront. There are no surprise charges.' },
    ],
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-graphite-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-[15px] font-semibold text-graphite-950 pr-4 group-hover:text-graphite-700 transition-colors">{q}</span>
        <ChevronDown className={`w-4 h-4 text-graphite-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-[14px] text-graphite-500 leading-relaxed pb-5">{a}</p>
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
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-display-lg text-white mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-graphite-400">
              Everything you need to know about Nova Health, our treatments, and how we work.
            </p>
          </motion.div>
        </div>
      </section>

      <Section>
        <div className="max-w-3xl mx-auto">
          {faqCategories.map((cat) => (
            <div key={cat.category} className="mb-12 last:mb-0">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-graphite-400 mb-4">{cat.category}</h2>
              <div>
                {cat.items.map((faq) => (
                  <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-graphite-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-display-sm text-graphite-950 mb-4">Still have questions?</h2>
          <p className="text-subheadline text-graphite-500 mb-8">
            Our team is here to help. Reach out and we&apos;ll get back to you within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-graphite-950 text-white text-[14px] font-medium hover:bg-graphite-800 transition-all"
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-graphite-200 text-graphite-700 text-[14px] font-medium hover:bg-graphite-50 transition-all"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
