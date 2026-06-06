import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, ArrowRight, ChevronRight, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'TRT Education: Testosterone Therapy Guides',
  description:
    'Physician-reviewed guides on testosterone replacement therapy: symptoms, diagnosis, protocols, labs, and long-term outcomes.',
  alternates: { canonical: '/learn/trt' },
}

interface Article {
  slug: string
  category: string
  title: string
  readingTime: string
  description: string
}

const basicsArticles: Article[] = [
  {
    slug: 'what-is-trt',
    category: 'TRT Basics',
    title: 'What Is Testosterone Replacement Therapy?',
    readingTime: '8 min',
    description: 'A comprehensive overview of TRT: how it works, who qualifies, and what to expect from physician-supervised hormone optimization.',
  },
  {
    slug: 'low-testosterone-symptoms',
    category: 'TRT Basics',
    title: 'Low Testosterone Symptoms: What to Watch For',
    readingTime: '6 min',
    description: 'Fatigue, brain fog, low libido. The clinical signs of low testosterone and when testing is warranted.',
  },
]

const treatmentArticles: Article[] = [
  {
    slug: 'trt-benefits-timeline',
    category: 'Treatment',
    title: 'TRT Benefits Timeline: What to Expect',
    readingTime: '7 min',
    description: 'A week-by-week breakdown of commonly reported outcomes, from energy changes to body composition shifts.',
  },
  {
    slug: 'trt-side-effects',
    category: 'Treatment',
    title: 'TRT Side Effects & Risk Management',
    readingTime: '9 min',
    description: 'Potential side effects of testosterone therapy, how they are monitored, and strategies providers use to manage them.',
  },
  {
    slug: 'trt-dosing-protocols',
    category: 'Treatment',
    title: 'TRT Dosing Protocols: A Clinical Overview',
    readingTime: '8 min',
    description: 'How physicians determine starting doses, adjust protocols, and individualize treatment based on labs and symptoms.',
  },
  {
    slug: 'hcg-and-trt',
    category: 'Treatment',
    title: 'HCG and TRT: Preserving Fertility on Therapy',
    readingTime: '7 min',
    description: 'Why some patients add HCG to their protocol, how it works, and current clinical considerations for fertility preservation.',
  },
]

const monitoringArticles: Article[] = [
  {
    slug: 'trt-blood-work',
    category: 'Labs & Monitoring',
    title: 'TRT Blood Work: What Your Labs Mean',
    readingTime: '10 min',
    description: 'A guide to the biomarkers tracked during TRT, including total testosterone, free testosterone, hematocrit, and estradiol.',
  },
]

const lifestyleArticles: Article[] = [
  {
    slug: 'testosterone-injections-guide',
    category: 'Lifestyle',
    title: 'Testosterone Injections: A Patient Guide',
    readingTime: '6 min',
    description: 'Injection technique, frequency options, and practical tips for patients self-administering testosterone.',
  },
  {
    slug: 'trt-body-composition',
    category: 'Lifestyle',
    title: 'TRT & Body Composition: What the Research Shows',
    readingTime: '8 min',
    description: 'How optimized testosterone levels may support lean muscle, fat loss, and metabolic health over time.',
  },
]

const costArticles: Article[] = [
  {
    slug: 'trt-cost-guide',
    category: 'Cost & Access',
    title: 'TRT Cost Guide: What to Expect in 2026',
    readingTime: '5 min',
    description: 'Transparent pricing breakdown for telehealth TRT, including consultations, labs, medications, and ongoing monitoring.',
  },
  {
    slug: 'online-trt-clinic',
    category: 'Cost & Access',
    title: 'Online TRT Clinics: How to Choose the Right One',
    readingTime: '7 min',
    description: 'What to look for in a telehealth TRT provider: credentials, lab protocols, medication sourcing, and red flags.',
  },
]

const faqs = [
  {
    question: 'What testosterone levels qualify for TRT?',
    answer: 'There is no single threshold. Most guidelines consider total testosterone below 300 ng/dL as potentially low, but diagnosis also depends on symptoms, free testosterone levels, and clinical context. Your provider will evaluate the full picture.',
  },
  {
    question: 'How long does TRT take to work?',
    answer: 'Many patients report improvements in energy and mood within 2-4 weeks. Changes in body composition, libido, and cognitive function typically develop over 3-6 months. Individual timelines vary based on starting levels and protocol.',
  },
  {
    question: 'Does TRT cause hair loss?',
    answer: 'TRT may accelerate hair loss in men who are genetically predisposed to androgenetic alopecia. Your provider can discuss risk factors and potential mitigation strategies during your consultation.',
  },
  {
    question: 'Can I stop TRT once I start?',
    answer: 'Yes, TRT can be discontinued. However, testosterone levels will typically return to pre-treatment baseline. Your provider will discuss tapering strategies and what to expect if you choose to stop.',
  },
  {
    question: 'Is TRT covered by insurance?',
    answer: 'Bloom Metabolics operates as a cash-pay telehealth clinic with transparent pricing. This eliminates insurance billing complexity and prior authorization delays. Many patients find this more convenient and predictable.',
  },
]

function ArticleCard({ slug, category, title, readingTime, description }: Article) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <div className="rounded-2xl bg-[#080808] border border-[#1a1814] p-6 transition-all duration-300 hover:border-gold/30 hover:bg-[#0a0a08] h-full">
        <span className="text-[10px] uppercase tracking-[0.15em] text-gold font-medium">
          {category}
        </span>
        <h3
          className="text-[16px] text-[#d8cfbe] mt-2 mb-2 group-hover:text-gold transition-colors leading-snug"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
        >
          {title}
        </h3>
        <div className="flex items-center gap-2 text-[11px] text-[#8a8268]/60 mb-3">
          <Clock className="w-3 h-3" />
          <span>{readingTime} read</span>
        </div>
        <p className="text-[13px] text-[#8a8268] leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>
    </Link>
  )
}

function ArticleCluster({ label, title, articles }: { label: string; title: string; articles: Article[] }) {
  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <span className="text-[10px] uppercase tracking-[0.15em] text-gold font-medium">
          {label}
        </span>
        <h2
          className="text-2xl md:text-3xl text-[#d8cfbe] mt-2 mb-8"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
        >
          {title}
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {articles.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function TRTPillarPage() {
  return (
    <main className="min-h-screen bg-[#020202]">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[12px] text-[#8a8268]/60 mb-8">
            <Link href="/learn" className="hover:text-gold transition-colors">Learn</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gold">Testosterone Therapy</span>
          </nav>

          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gold mb-5">
            <BookOpen className="w-4 h-4" />
            TRT Education
          </div>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl text-[#d8cfbe] mb-6 leading-[1.1]"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
          >
            Testosterone Replacement Therapy:<br className="hidden md:block" /> Physician-Reviewed Guides
          </h1>
          <p className="text-[16px] text-[#8a8268] max-w-2xl mb-10 leading-relaxed font-light">
            Everything you need to understand about TRT: recognizing symptoms, reading lab work, choosing protocols, and managing long-term health. Written by clinicians, reviewed by physicians.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/quiz" className="bloom-btn">
              Take the TRT Quiz
            </Link>
            <Link href="/join" className="bloom-btn-ghost">
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Basics */}
      <div className="bg-[#0E0E11]">
        <ArticleCluster label="Foundations" title="Understanding TRT" articles={basicsArticles} />
      </div>

      {/* Treatment */}
      <ArticleCluster label="Protocols" title="Treatment & Protocols" articles={treatmentArticles} />

      {/* Monitoring */}
      <div className="bg-[#0E0E11]">
        <ArticleCluster label="Clinical" title="Labs & Monitoring" articles={monitoringArticles} />
      </div>

      {/* Lifestyle */}
      <ArticleCluster label="Outcomes" title="Lifestyle & Outcomes" articles={lifestyleArticles} />

      {/* Cost */}
      <div className="bg-[#0E0E11]">
        <ArticleCluster label="Access" title="Cost & Access" articles={costArticles} />
      </div>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl md:text-3xl text-[#d8cfbe] mb-10 text-center"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl bg-[#080808] border border-[#1a1814] p-6">
                <h3
                  className="text-[15px] text-[#d8cfbe] mb-3"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
                >
                  {faq.question}
                </h3>
                <p className="text-[13px] text-[#8a8268] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0E0E11] px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl text-[#d8cfbe] mb-5"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
          >
            Not sure if TRT is right for you?
          </h2>
          <p className="text-[15px] text-[#8a8268] leading-relaxed font-light mb-8">
            Take our symptom quiz to see if a consultation might be appropriate. It takes less than 2 minutes.
          </p>
          <Link href="/quiz" className="bloom-btn">
            Take the TRT Quiz
          </Link>
        </div>
      </section>
    </main>
  )
}
