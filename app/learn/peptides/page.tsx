import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, ChevronRight, BookOpen, FlaskConical } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Peptide Education: Research & Regulatory Guides',
  description:
    'Educational guides on therapeutic peptides, preclinical research, and the FDA 503A regulatory pathway. For informational purposes.',
  alternates: { canonical: '/learn/peptides' },
}

interface Article {
  slug: string
  category: string
  title: string
  readingTime: string
  description: string
  bookingCta?: boolean
}

const foundationsArticles: Article[] = [
  {
    slug: 'what-is-peptide-therapy',
    category: 'Peptide Foundations',
    title: 'What Is Peptide Therapy?',
    readingTime: '8 min',
    description: 'An introduction to therapeutic peptides: the science behind them, current research directions, and the regulatory landscape.',
  },
  {
    slug: 'peptide-compounding-fda',
    category: 'Regulatory',
    title: 'Peptide Compounding & the FDA 503A Pathway',
    readingTime: '7 min',
    description: 'Understanding the evolving regulatory framework for compounded peptides and what it means for patient access.',
  },
  {
    slug: 'peptide-safety-quality',
    category: 'Safety',
    title: 'Peptide Safety & Quality Considerations',
    readingTime: '6 min',
    description: 'What patients should understand about peptide sourcing, purity testing, and the importance of physician oversight.',
  },
]

const recoveryArticles: Article[] = [
  {
    slug: 'bpc157-research',
    category: 'Recovery Research',
    title: 'BPC-157: Current Research Overview',
    readingTime: '10 min',
    description: 'What the preclinical literature shows about BPC-157, its proposed mechanisms of action, and what remains unknown.',
  },
  {
    slug: 'tb500-research',
    category: 'Recovery Research',
    title: 'TB-500 (Thymosin Beta-4): Research Overview',
    readingTime: '9 min',
    description: 'A review of preclinical research on TB-500, its proposed role in tissue repair, and current limitations of the evidence.',
  },
]

const longevityArticles: Article[] = [
  {
    slug: 'nad-plus-longevity',
    category: 'Longevity',
    title: 'NAD+ & Longevity: What the Research Shows',
    readingTime: '8 min',
    description: 'An overview of NAD+ supplementation research, cellular energy metabolism, and the emerging longevity science.',
    bookingCta: true,
  },
]

const advancedArticles: Article[] = [
  {
    slug: 'growth-hormone-peptides',
    category: 'Advanced Protocols',
    title: 'Growth Hormone Peptides: A Research Overview',
    readingTime: '11 min',
    description: 'What the research shows about growth hormone secretagogues, including CJC-1295, ipamorelin, and related compounds.',
  },
]

const regulatoryArticles: Article[] = [
  {
    slug: 'peptide-therapy-future',
    category: 'Regulatory Outlook',
    title: 'The Future of Peptide Therapy: Regulatory & Clinical Landscape',
    readingTime: '7 min',
    description: 'Where peptide therapy is headed: FDA pathway updates, clinical trial activity, and what patients should watch for.',
  },
]

function PendingBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-3 py-1">
      <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
      <span className="text-[10px] uppercase tracking-[0.15em] text-gold/80 font-medium">
        Pending FDA 503A Pathway
      </span>
    </div>
  )
}

function ArticleCard({ slug, category, title, readingTime, description, bookingCta }: Article) {
  return (
    <div className="rounded-2xl bg-[#080808] border border-[#1a1814] p-6 transition-all duration-300 hover:border-gold/30 hover:bg-[#0a0a08] h-full flex flex-col">
      <Link href={`/blog/${slug}`} className="group block flex-1">
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
      </Link>
      {bookingCta ? (
        <div className="mt-4 pt-4 border-t border-[#1a1814]">
          <span className="text-[10px] text-gold/60 uppercase tracking-wider block mb-2">Available Now via Longevity Stack</span>
          <Link href="/join" className="text-[12px] text-gold hover:text-[#d8cfbe] transition-colors font-medium">
            Book Consultation &rarr;
          </Link>
        </div>
      ) : (
        <div className="mt-4 pt-4 border-t border-[#1a1814]">
          <Link href="/waitlist?service=peptides" className="text-[12px] text-[#8a8268] hover:text-gold transition-colors font-medium">
            Join Waitlist &rarr;
          </Link>
        </div>
      )}
    </div>
  )
}

function ArticleCluster({ label, title, articles, showBadge = true }: { label: string; title: string; articles: Article[]; showBadge?: boolean }) {
  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center gap-4 mb-2">
          <span className="text-[10px] uppercase tracking-[0.15em] text-gold font-medium">
            {label}
          </span>
          {showBadge && <PendingBadge />}
        </div>
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

export default function PeptidePillarPage() {
  return (
    <main className="min-h-screen bg-[#020202]">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[12px] text-[#8a8268]/60 mb-8">
            <Link href="/learn" className="hover:text-gold transition-colors">Learn</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gold">Peptide Therapy</span>
          </nav>

          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gold mb-5">
            <FlaskConical className="w-4 h-4" />
            Peptide Education
          </div>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl text-[#d8cfbe] mb-5 leading-[1.1]"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
          >
            Peptide Therapy:<br className="hidden md:block" /> Research & Education
          </h1>
          <div className="mb-6">
            <PendingBadge />
          </div>
          <p className="text-[16px] text-[#8a8268] max-w-2xl mb-10 leading-relaxed font-light">
            Educational content on therapeutic peptides, preclinical research, and the evolving FDA regulatory framework. This content is for informational purposes only and does not constitute medical advice or an offer to sell.
          </p>
          <Link href="/waitlist?service=peptides" className="bloom-btn">
            Join the Peptide Waitlist
          </Link>
        </div>
      </section>

      {/* Foundations */}
      <div className="bg-[#0E0E11]">
        <ArticleCluster label="Foundations" title="Peptide Science & Regulation" articles={foundationsArticles} />
      </div>

      {/* Recovery & Repair, Tranche 1 */}
      <ArticleCluster label="Tranche 1" title="Recovery & Repair Research" articles={recoveryArticles} />

      {/* Longevity & Energy */}
      <div className="bg-[#0E0E11]">
        <ArticleCluster label="Longevity" title="Longevity & Cellular Energy" articles={longevityArticles} />
      </div>

      {/* Advanced Protocols, Tranche 2-3 */}
      <ArticleCluster label="Tranche 2-3" title="Advanced Protocols" articles={advancedArticles} />

      {/* Regulatory Outlook */}
      <div className="bg-[#0E0E11]">
        <ArticleCluster label="Outlook" title="Regulatory & Clinical Landscape" articles={regulatoryArticles} />
      </div>

      {/* Tranche Timeline */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <h2
              className="text-2xl md:text-3xl text-[#d8cfbe]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
            >
              Peptide Roadmap
            </h2>
            <PendingBadge />
          </div>
          <div className="space-y-0">
            {/* Tranche 1 */}
            <div className="relative pl-8 pb-10 border-l border-[#1a1814]">
              <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-gold/40 border-2 border-gold/60 -translate-x-[7px]" />
              <div className="rounded-2xl bg-[#080808] border border-[#1a1814] p-5">
                <span className="text-[10px] uppercase tracking-[0.15em] text-gold font-medium">Tranche 1</span>
                <h3 className="text-[15px] text-[#d8cfbe] mt-1 mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}>
                  Recovery & Repair Peptides
                </h3>
                <p className="text-[13px] text-[#8a8268] leading-relaxed">
                  BPC-157, TB-500, pending FDA 503A pathway clearance. Waitlist open for patient interest.
                </p>
              </div>
            </div>
            {/* Tranche 2 */}
            <div className="relative pl-8 pb-10 border-l border-[#1a1814]">
              <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-[#8a8268]/30 border-2 border-[#8a8268]/40 -translate-x-[7px]" />
              <div className="rounded-2xl bg-[#080808] border border-[#1a1814] p-5">
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#8a8268] font-medium">Tranche 2</span>
                <h3 className="text-[15px] text-[#d8cfbe] mt-1 mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}>
                  Growth Hormone Secretagogues
                </h3>
                <p className="text-[13px] text-[#8a8268] leading-relaxed">
                  CJC-1295, Ipamorelin, dependent on regulatory pathway and clinical evidence review.
                </p>
              </div>
            </div>
            {/* Tranche 3 */}
            <div className="relative pl-8">
              <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-[#8a8268]/20 border-2 border-[#8a8268]/30 -translate-x-[7px]" />
              <div className="rounded-2xl bg-[#080808] border border-[#1a1814] p-5">
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#8a8268]/60 font-medium">Tranche 3</span>
                <h3 className="text-[15px] text-[#d8cfbe] mt-1 mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}>
                  Advanced Research Peptides
                </h3>
                <p className="text-[13px] text-[#8a8268] leading-relaxed">
                  Additional peptide candidates under evaluation. Timeline dependent on FDA regulatory developments and emerging clinical data.
                </p>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-[#8a8268]/50 mt-8 leading-relaxed">
            Timeline is subject to change based on FDA regulatory decisions. All peptide therapies are compounded by a US-based, state-licensed 503A pharmacy under individual patient prescription following physician evaluation. Compounded medications are not FDA-approved for safety or efficacy. Individual results vary. This content is educational and does not constitute medical advice.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0E0E11] px-6">
        <div className="max-w-3xl mx-auto text-center">
          <PendingBadge />
          <h2
            className="text-3xl md:text-4xl text-[#d8cfbe] mt-6 mb-5"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
          >
            Join the Peptide Roadmap Waitlist
          </h2>
          <p className="text-[15px] text-[#8a8268] leading-relaxed font-light mb-8">
            Be the first to know when peptide therapies become available through Bloom Metabolics. We will notify you as each tranche clears the regulatory pathway.
          </p>
          <Link href="/waitlist?service=peptides" className="bloom-btn">
            Join the Waitlist
          </Link>
        </div>
      </section>
    </main>
  )
}
