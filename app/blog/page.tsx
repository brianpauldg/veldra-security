import { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog/posts'

export const metadata: Metadata = {
  title: 'Blog | Bloom Metabolics',
  description: 'Evidence-based insights on TRT, GLP-1 therapy, and metabolic health from the Bloom Metabolics clinical team.',
}

export default function BlogIndexPage() {
  const posts = getAllPosts(process.env.NODE_ENV === 'development')

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-fraunces text-4xl md:text-5xl text-[#c9b88c] mb-4">Blog</h1>
        <p className="text-[#a0a0a0] mb-12">
          Evidence-based insights on hormone therapy, metabolic health, and clinical best practices.
        </p>

        {posts.length === 0 ? (
          <p className="text-[#a0a0a0]">New articles coming soon.</p>
        ) : (
          <div className="space-y-8">
            {posts.map(post => (
              <article key={post.slug} className="border-b border-[#333] pb-8">
                <Link href={`/blog/${post.slug}`} className="group">
                  <span className="text-xs uppercase tracking-wider text-[#c9b88c]">{post.category}</span>
                  <h2 className="font-fraunces text-2xl text-white group-hover:text-[#c9b88c] transition-colors mt-1">
                    {post.title}
                  </h2>
                  <p className="text-[#a0a0a0] mt-2">{post.description}</p>
                  <div className="flex gap-4 text-xs text-[#666] mt-3">
                    <span>{post.reading_time} min read</span>
                    <span>{post.published_at}</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
