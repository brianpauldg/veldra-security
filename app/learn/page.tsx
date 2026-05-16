import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Shield, Clock, ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Learn — Evidence-Based Men\'s Health Education | Bloom Metabolics',
  description: 'Physician-reviewed guides on testosterone therapy, GLP-1 weight management, and peptide research. Evidence-based education for the informed patient.',
}

const trtArticles = [
  {
    slug: 'what-is-trt',
    category: 'TRT Basics',
    title: 'What Is Testosterone Replacement Therapy?',
    readingTime: '8 min',
    description: 'A comprehensive overview of TRT — how it works, who qualifies, and what to expect from physician-supervised hormone optimization.',
  },
  {
    slug: 'low-testosterone-symptoms',
    category: 'TRT Basics',
    title: 'Low Testosterone Symptoms: What to Watch For',
    readingTime: '6 min',
    description: 'Fatigue, brain fog, low libido — learn the clinical signs of low testosterone and when to get tested.',
  },
  {
    slug: 'trt-benefits-timeline',
    category: 'Treatment',
    title: 'TRT Benefits Timeline: What to Expect',
    readingTime: '7 min',
    description: 'A week-by-week breakdown of commonly reported TRT outcomes, from energy changes to body composition shifts.',
  },
]

const glp1Articles = [
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
    description: 'A side-by-side comparison of the two leading GLP-1 medications — mechanisms, outcomes, and clinical considerations.',
  },
  {
    slug: 'compounded-glp1-explained',
    category: 'GLP-1 Basics',
    title: 'Compounded GLP-1 Medications Explained',
    readingTime: '6 min',
    description: 'What compounded medications are, how they differ from brand-name drugs, and what patients should understand before starting.',
  },
]

const peptideArticles = [
  {
    slug: 'what-is-peptide-therapy',
    category: 'Peptide Foundations',
    title: 'What Is Peptide Therapy?',
    readingTime: '8 min',
    description: 'An introduction to therapeutic peptides — the science behind them, current research, and the regulatory landscape.',
  },
  {
    slug: 'bpc157-research',
    category: 'Recovery Research',
    title: 'BPC-157: Current Research Overview',
    readingTime: '10 min',
    description: 'What the preclinical literature shows about BPC-157, its proposed mechanisms, and what remains unknown.',
  },
  {
    slug: 'peptide-compounding-fda',
    category: 'Regulatory',
    title: 'Peptide Compounding & the FDA 503A Pathway',
    readingTime: '7 min',
    description: 'Understanding the evolving regulatory framework for compounded peptides and what it means for patient access.',
  },
]

function ArticleCard({ slug, category, title, readingTime, description }: {
  slug: string
  category: string
  title: string
  readingTime: string
  description: string
}) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <div className="rounded-2xl bg-[#080808] border border-[#1a1814] p-6 transition-all duration-300 hover:border-gold/30 hover:bg-[#0a0a08]">
        <span className="text-[10px] uppercase tracking-[0.15em] text-gold font-medium">
          {category}
        </span>
        <h3
          className="text-[17px] text-[#d8cfbe] mt-2 mb-2 group-hover:text-gold transition-colors leading-snug"
          style={{ fontFamily: 'Fraunces, serif', fontWeight: 400 }}
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

export default function LearnHubPage() {
  return (
    <main className="min-h-screen bg-[#020202]">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gold mb-6">
            <BookOpen className="w-4 h-4" />
            Learn
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#d8cfbe] mb-6 leading-[1.1]"
            style={{ fontFamily: 'Fraunces, serif', fontWeight: 300 }}
          >
            Evidence-based education<br className="hidden md:block" /> for the informed patient.
          </h1>
          <p className="text-[16px] text-[#8a8268] max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Physician-reviewed guides on hormone therapy, metabolic health, and peptide research.
            Written for patients who want to understand the science behind their treatment.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link href="/learn/trt" className="bloom-btn">
              Browse TRT
            </Link>
            <Link href="/learn/glp1" className="bloom-btn-ghost">
              Browse GLP-1
            </Link>
            <Link href="/learn/peptides" className="bloom-btn-ghost">
              Browse Peptides
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2 text-[12px] text-[#8a8268]/70">
            <Shield className="w-3.5 h-3.5 text-gold/50" />
            <span>Physician-Reviewed &middot; 30+ Guides</span>
          </div>
        </div>
      </section>

      {/* TRT Section */}
      <section className="py-20 bg-[#0E0E11] px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <span className="text-[10px] uppercase tracking-[0.15em] text-gold font-medium">
              Hormone Optimization
            </span>
            <h2
              className="text-3xl md:text-4xl text-[#d8cfbe] mt-2 mb-4"
              style={{ fontFamily: 'Fraunces, serif', fontWeight: 300 }}
            >
              Testosterone Therapy
            </h2>
            <p className="text-[15px] text-[#8a8268] leading-relaxed max-w-2xl font-light">
              Understand the science behind TRT, from symptoms and diagnosis through treatment protocols and long-term monitoring.
              Every guide is reviewed by our clinical team.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {trtArticles.map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
          <Link
            href="/learn/trt"
            className="inline-flex items-center gap-2 text-[13px] text-gold hover:text-[#d8cfbe] transition-colors"
          >
            View all TRT guides <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* GLP-1 Section */}
      <section className="py-20 bg-[#020202] px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <span className="text-[10px] uppercase tracking-[0.15em] text-gold font-medium">
              Medical Weight Loss
            </span>
            <h2
              className="text-3xl md:text-4xl text-[#d8cfbe] mt-2 mb-4"
              style={{ fontFamily: 'Fraunces, serif', fontWeight: 300 }}
            >
              GLP-1 Weight Management
            </h2>
            <p className="text-[15px] text-[#8a8268] leading-relaxed max-w-2xl font-light">
              Explore how GLP-1 receptor agonists support physician-supervised weight management.
              Our guides cover both brand-name and compounded medication options, including key differences patients should understand.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {glp1Articles.map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
          <Link
            href="/learn/glp1"
            className="inline-flex items-center gap-2 text-[13px] text-gold hover:text-[#d8cfbe] transition-colors"
          >
            View all GLP-1 guides <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Peptides Section */}
      <section className="py-20 bg-[#0E0E11] px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <span className="text-[10px] uppercase tracking-[0.15em] text-gold font-medium">
              Research & Education
            </span>
            <h2
              className="text-3xl md:text-4xl text-[#d8cfbe] mt-2 mb-4"
              style={{ fontFamily: 'Fraunces, serif', fontWeight: 300 }}
            >
              Peptide Research
            </h2>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-3 py-1 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-gold/80 font-medium">
                Pending FDA 503A Pathway
              </span>
            </div>
            <p className="text-[15px] text-[#8a8268] leading-relaxed max-w-2xl font-light">
              Educational content on therapeutic peptides, current preclinical research, and the evolving FDA regulatory framework.
              This content is for informational purposes only.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {peptideArticles.map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
          <Link
            href="/learn/peptides"
            className="inline-flex items-center gap-2 text-[13px] text-gold hover:text-[#d8cfbe] transition-colors"
          >
            View all peptide guides <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Editorial Standards */}
      <section className="py-20 bg-[#020202] px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Shield className="w-8 h-8 text-gold/40 mx-auto mb-5" />
          <h2
            className="text-2xl md:text-3xl text-[#d8cfbe] mb-5"
            style={{ fontFamily: 'Fraunces, serif', fontWeight: 300 }}
          >
            Our Editorial Standards
          </h2>
          <p className="text-[15px] text-[#8a8268] leading-relaxed font-light mb-8">
            Every guide in the Learn hub is written with clinical accuracy in mind and reviewed by a licensed physician before publication.
            We cite peer-reviewed research, disclose limitations in the evidence, and update content as new data becomes available.
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="rounded-2xl bg-[#080808] border border-[#1a1814] p-6">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-4 h-4 text-gold/60" />
                <span className="text-[13px] text-[#d8cfbe] font-medium">Written By</span>
              </div>
              <p className="text-[13px] text-[#8a8268] leading-relaxed">
                Brian DeGuzman, RN — Clinical content lead with direct patient care experience in hormone therapy and metabolic health.
              </p>
            </div>
            <div className="rounded-2xl bg-[#080808] border border-[#1a1814] p-6">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-4 h-4 text-gold/60" />
                <span className="text-[13px] text-[#d8cfbe] font-medium">Medical Review</span>
              </div>
              <p className="text-[13px] text-[#8a8268] leading-relaxed">
                Dr. Michael Napolitano, MD — U.S.-licensed physician responsible for clinical accuracy review of all published guides.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0E0E11] px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl text-[#d8cfbe] mb-5"
            style={{ fontFamily: 'Fraunces, serif', fontWeight: 300 }}
          >
            Ready to start?
          </h2>
          <p className="text-[15px] text-[#8a8268] leading-relaxed font-light mb-8">
            Book a consultation with a licensed provider to discuss your symptoms, review your labs, and explore treatment options.
          </p>
          <Link href="/join" className="bloom-btn">
            Book Your Consultation
          </Link>
        </div>
      </section>
    </main>
  )
}
