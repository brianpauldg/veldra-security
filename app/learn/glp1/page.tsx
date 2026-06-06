import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, ChevronRight, BookOpen } from 'lucide-react'
import GLP1ComplianceDisclosure from '@/components/GLP1ComplianceDisclosure'

export const metadata: Metadata = {
  title: 'GLP-1 Education: Medical Weight Loss Guides',
  description:
    'Physician-reviewed guides on GLP-1 receptor agonists for medical weight management, including semaglutide and tirzepatide.',
  alternates: { canonical: '/learn/glp1' },
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
    slug: 'what-are-glp1-medications',
    category: 'GLP-1 Basics',
    title: 'What Are GLP-1 Medications?',
    readingTime: '7 min',
    description: 'How GLP-1 receptor agonists work, what the research shows, and how they fit into a physician-supervised weight management program.',
  },
  {
    slug: 'semaglutide-vs-tirzepatide',
    category: 'GLP-1 Basics',
    title: 'Semaglutide vs. Tirzepatide: Key Differences',
    readingTime: '9 min',
    description: 'A side-by-side comparison of mechanisms, clinical outcomes, and considerations for each medication class.',
  },
  {
    slug: 'compounded-glp1-explained',
    category: 'GLP-1 Basics',
    title: 'Compounded GLP-1 Medications Explained',
    readingTime: '6 min',
    description: 'What compounded medications are, how they differ from brand-name drugs, and what patients should understand.',
  },
]

const treatmentArticles: Article[] = [
  {
    slug: 'glp1-side-effects',
    category: 'Treatment',
    title: 'GLP-1 Side Effects: What to Know',
    readingTime: '8 min',
    description: 'Common and less common side effects of GLP-1 medications, how they are managed, and when to contact your provider.',
  },
  {
    slug: 'glp1-dosing-titration',
    category: 'Treatment',
    title: 'GLP-1 Dosing & Titration Schedules',
    readingTime: '7 min',
    description: 'How physicians titrate GLP-1 medications over time, why gradual dose increases matter, and what to expect at each stage.',
  },
  {
    slug: 'glp1-injection-guide',
    category: 'Treatment',
    title: 'GLP-1 Injection Guide for Patients',
    readingTime: '5 min',
    description: 'Step-by-step instructions for subcutaneous GLP-1 injections, site rotation, storage, and practical tips.',
  },
]

const outcomesArticles: Article[] = [
  {
    slug: 'glp1-metabolic-health',
    category: 'Outcomes',
    title: 'GLP-1 & Metabolic Health Beyond Weight Loss',
    readingTime: '9 min',
    description: 'Research on the broader metabolic effects of GLP-1 therapy, including cardiovascular, glycemic, and inflammatory markers.',
  },
  {
    slug: 'glp1-exercise-nutrition',
    category: 'Outcomes',
    title: 'Exercise & Nutrition on GLP-1 Therapy',
    readingTime: '7 min',
    description: 'How to optimize diet and training while on GLP-1 medications to preserve lean mass and support long-term results.',
  },
  {
    slug: 'glp1-maintenance-strategy',
    category: 'Outcomes',
    title: 'GLP-1 Maintenance: Sustaining Your Results',
    readingTime: '8 min',
    description: 'What the evidence shows about weight maintenance after GLP-1 therapy, dose adjustments, and lifestyle strategies.',
  },
]

const costArticles: Article[] = [
  {
    slug: 'medical-weight-loss-cost',
    category: 'Cost & Access',
    title: 'Medical Weight Loss Cost: What to Expect',
    readingTime: '5 min',
    description: 'A transparent breakdown of GLP-1 therapy costs, including consultations, medications, lab work, and ongoing monitoring.',
  },
  {
    slug: 'online-glp1-telehealth',
    category: 'Cost & Access',
    title: 'Online GLP-1 Telehealth: How It Works',
    readingTime: '6 min',
    description: 'How telehealth GLP-1 programs work, what to look for in a provider, and how Bloom Metabolics structures patient care.',
  },
]

const faqs = [
  {
    question: 'Who qualifies for GLP-1 therapy?',
    answer: 'GLP-1 medications are typically prescribed for patients with a BMI of 30+ (or 27+ with weight-related comorbidities). Qualification requires a medical evaluation by a licensed provider who will assess your health history, current medications, and treatment goals.',
  },
  {
    question: 'Are compounded GLP-1 medications safe?',
    answer: 'Compounded medications are prepared by licensed 503A pharmacies according to FDA regulations. However, compounded drugs are not FDA-approved. Your provider will discuss the differences between compounded and brand-name medications during your consultation.',
  },
  {
    question: 'How much weight can I expect to lose?',
    answer: 'Individual results vary significantly based on starting weight, medication, dosing, adherence, diet, and exercise. Clinical trials have shown average weight loss of 15-22% of body weight over 68 weeks, but individual outcomes differ from trial averages.',
  },
  {
    question: 'What are the most common side effects?',
    answer: 'Nausea, constipation, and diarrhea are the most commonly reported side effects, particularly during dose titration. Most side effects are mild to moderate and often improve over time. Your provider will monitor your response and adjust your protocol as needed.',
  },
  {
    question: 'Will I regain weight if I stop GLP-1 therapy?',
    answer: 'Research suggests that weight regain may occur after discontinuation if lifestyle changes are not maintained. Your provider will work with you on a maintenance strategy, which may include dose adjustments, nutritional support, and long-term monitoring.',
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function GLP1PillarPage() {
  return (
    <main className="min-h-screen bg-[#020202]">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[12px] text-[#8a8268]/60 mb-8">
            <Link href="/learn" className="hover:text-gold transition-colors">Learn</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gold">GLP-1 Therapy</span>
          </nav>

          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gold mb-5">
            <BookOpen className="w-4 h-4" />
            GLP-1 Education
          </div>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl text-[#d8cfbe] mb-6 leading-[1.1]"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
          >
            GLP-1 Weight Management:<br className="hidden md:block" /> Physician-Reviewed Guides
          </h1>
          <p className="text-[16px] text-[#8a8268] max-w-2xl mb-8 leading-relaxed font-light">
            Understand how GLP-1 receptor agonists work, what the evidence supports, and what to expect from physician-supervised medical weight management. Guides cover both brand-name and compounded medication options.
          </p>

          <GLP1ComplianceDisclosure variant="compact" />

          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="/glp1-quiz" className="bloom-btn">
              Take the GLP-1 Quiz
            </Link>
            <Link href="/join" className="bloom-btn-ghost">
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Basics */}
      <div className="bg-[#0E0E11]">
        <ArticleCluster label="Foundations" title="Understanding GLP-1 Medications" articles={basicsArticles} />
      </div>

      {/* Treatment */}
      <ArticleCluster label="Protocols" title="Treatment & Administration" articles={treatmentArticles} />

      {/* Outcomes */}
      <div className="bg-[#0E0E11]">
        <ArticleCluster label="Results" title="Outcomes & Optimization" articles={outcomesArticles} />
      </div>

      {/* Cost */}
      <ArticleCluster label="Access" title="Cost & Access" articles={costArticles} />

      {/* FAQ */}
      <section className="py-20 bg-[#0E0E11] px-6">
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
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl text-[#d8cfbe] mb-5"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
          >
            Find out if GLP-1 therapy is right for you.
          </h2>
          <p className="text-[15px] text-[#8a8268] leading-relaxed font-light mb-8">
            Take our screening quiz to see if you may qualify for physician-supervised GLP-1 weight management.
          </p>
          <Link href="/glp1-quiz" className="bloom-btn">
            Take the GLP-1 Quiz
          </Link>
        </div>
      </section>
    </main>
  )
}
