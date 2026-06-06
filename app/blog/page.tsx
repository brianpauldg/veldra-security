import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog/posts'

export const metadata: Metadata = {
  title: 'Blog: Evidence-Based Health Education',
  description:
    'Physician-reviewed guides on TRT, GLP-1 therapy, peptide research, and metabolic health from the Bloom Metabolics team.',
  alternates: { canonical: '/blog' },
}

export default function BlogIndexPage() {
  const posts = getAllPosts(process.env.NODE_ENV === 'development')

  return (
    <main className="min-h-screen bg-[#0E0E11] text-white pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <nav className="flex items-center gap-2 text-[12px] text-[#8a8268] mb-8">
          <Link href="/learn" className="hover:text-gold transition-colors">Learn</Link>
          <span>/</span>
          <span className="text-[#d8cfbe]">Blog</span>
        </nav>

        <h1
          className="text-3xl md:text-4xl text-[#d8cfbe] mb-3"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
        >
          Evidence-based education for the informed patient.
        </h1>
        <p className="text-[16px] text-[#8a8268] mb-4 font-light max-w-2xl">
          Physician-reviewed guides on testosterone therapy, GLP-1 weight management,
          peptide research, and longevity. Written by clinicians, not copywriters.
        </p>
        <p className="text-[11px] text-[#8a8268] mb-12">
          Medical review by <span className="text-[#d8cfbe]">Dr. Michael Napolitano, MD</span>
        </p>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#8a8268] font-light">New articles publishing soon.</p>
          </div>
        ) : (
          <div className="space-y-0 divide-y divide-[#1a1814]">
            {posts.map(post => (
              <article key={post.slug} className="py-8 first:pt-0">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-gold">{post.category}</span>
                    <span className="text-[10px] text-[#8a8268]">{post.reading_time} min read</span>
                  </div>
                  <h2
                    className="text-xl text-[#d8cfbe] group-hover:text-gold transition-colors mb-2"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-[14px] text-[#8a8268] leading-relaxed font-light max-w-2xl">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-3 mt-3 text-[11px] text-[#8a8268]">
                    <span>{post.author}</span>
                    <span>·</span>
                    <span>{post.published_at}</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* Browse by topic */}
        <div className="mt-16 pt-10 border-t border-[#1a1814]">
          <h3
            className="text-[16px] text-[#d8cfbe] mb-6"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
          >
            Browse by topic
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Testosterone Therapy', href: '/learn/trt' },
              { label: 'GLP-1 Weight Management', href: '/learn/glp1' },
              { label: 'Peptide Research', href: '/learn/peptides' },
              { label: 'All Guides', href: '/learn' },
            ].map(topic => (
              <Link
                key={topic.href}
                href={topic.href}
                className="px-4 py-2 rounded-full bg-[#080808] border border-[#1a1814] text-[13px] text-[#8a8268] hover:text-gold hover:border-gold/30 transition-colors"
              >
                {topic.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
