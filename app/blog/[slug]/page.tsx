import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, getRelatedPosts, getAllPosts } from '@/lib/blog/posts'
import { getPostContent, markdownToHtml } from '@/lib/blog/content'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Not Found' }
  return {
    title: `${post.title} | Bloom Metabolics`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.published_at,
      authors: [post.author],
    },
  }
}

export function generateStaticParams() {
  return getAllPosts(true).map(p => ({ slug: p.slug }))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const related = getRelatedPosts(post)
  const rawContent = getPostContent(slug)
  const htmlContent = rawContent ? markdownToHtml(rawContent) : null

  return (
    <main className="min-h-screen bg-[#0E0E11] text-white pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[12px] text-[#8a8268] mb-8">
          <Link href="/learn" className="hover:text-gold transition-colors">Learn</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-gold transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-[#d8cfbe]">{post.category}</span>
        </nav>

        <article>
          {/* Header */}
          <header className="mb-12">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-[11px] font-medium text-gold uppercase tracking-widest mb-4">
              {post.category}
            </span>
            <h1
              className="text-3xl md:text-4xl text-[#d8cfbe] mb-4 leading-tight"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
            >
              {post.title}
            </h1>
            <p className="text-[16px] text-[#8a8268] leading-relaxed mb-6 font-light">
              {post.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-[12px] text-[#8a8268] border-t border-b border-[#1a1814] py-4">
              <span className="flex items-center gap-1.5">
                <span className="font-medium text-[#d8cfbe]">{post.author}</span>
              </span>
              {'medical_reviewer' in post && (post as any).medical_reviewer && (
                <span className="flex items-center gap-1.5">
                  Reviewed by <span className="font-medium text-[#d8cfbe]">{(post as any).medical_reviewer}</span>
                </span>
              )}
              <span>{post.reading_time} min read</span>
              <span>Published {post.published_at}</span>
            </div>
          </header>

          {/* Article Body */}
          {htmlContent ? (
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          ) : (
            <div className="text-[#8a8268] italic py-8">
              This article is currently in draft. Full content coming soon.
            </div>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-12 pt-6 border-t border-[#1a1814]">
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-[#1a1814] text-[11px] text-[#8a8268]">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </article>

        {/* Medical Disclaimer */}
        <div className="mt-12 p-5 rounded-xl bg-[#080808] border border-[#1a1814]">
          <p className="text-[11px] text-[#8a8268] leading-relaxed font-light">
            <strong className="text-[#d8cfbe]">Medical Disclaimer:</strong> This content is for informational and educational purposes only. It is not intended as medical advice, diagnosis, or treatment. All treatments require evaluation by a licensed medical provider. Individual results vary. Consult your physician before starting any treatment protocol.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="text-[14px] text-[#8a8268] mb-4 font-light">
            Ready to explore whether this is right for you?
          </p>
          <Link
            href="/join"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gold/10 text-gold border border-gold/30 text-[14px] font-semibold hover:bg-gold/20 transition-all"
          >
            Join Waitlist
          </Link>
          <p className="text-[11px] text-[#8a8268] mt-2">Enrollment opens July 15, 2026</p>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="mt-16 border-t border-[#1a1814] pt-10">
            <h3
              className="text-[18px] text-[#d8cfbe] mb-6"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
            >
              Related Articles
            </h3>
            <div className="space-y-4">
              {related.map(r => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="block p-4 rounded-xl bg-[#080808] border border-[#1a1814] hover:border-gold/30 transition-colors"
                >
                  <span className="text-[10px] uppercase tracking-widest text-gold">{r.category}</span>
                  <h4 className="text-[15px] text-[#d8cfbe] mt-1">{r.title}</h4>
                  <p className="text-[12px] text-[#8a8268] mt-1">{r.reading_time} min read</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
