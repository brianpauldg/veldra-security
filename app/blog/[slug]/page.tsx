import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, getRelatedPosts, getAllPosts } from '@/lib/blog/posts'

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

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="text-[#c9b88c] text-sm hover:underline">&larr; Back to Blog</Link>

        <article className="mt-8">
          <span className="text-xs uppercase tracking-wider text-[#c9b88c]">{post.category}</span>
          <h1 className="font-fraunces text-3xl md:text-4xl text-white mt-2">{post.title}</h1>
          <div className="flex gap-4 text-sm text-[#a0a0a0] mt-3">
            <span>{post.author}</span>
            <span>{post.reading_time} min read</span>
            <span>{post.published_at}</span>
          </div>

          <div className="prose prose-invert mt-10 max-w-none">
            <p className="text-[#a0a0a0] italic">Full article content coming soon. This post is currently in draft.</p>
          </div>
        </article>

        {related.length > 0 && (
          <section className="mt-16 border-t border-[#333] pt-8">
            <h3 className="font-fraunces text-xl text-[#c9b88c] mb-4">Related Articles</h3>
            <div className="space-y-4">
              {related.map(r => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="block hover:text-[#c9b88c] transition-colors">
                  {r.title}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
