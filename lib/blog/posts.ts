/**
 * Bloom Metabolics — Blog Post Management
 * Reads MDX frontmatter for blog index and routing.
 */

export interface Post {
  slug: string
  title: string
  description: string
  author: string
  published_at: string
  updated_at?: string
  category: string
  tags: string[]
  reading_time: number
  draft: boolean
}

// Placeholder posts — in production, read from content/blog/*.mdx
const POSTS: Post[] = [
  {
    slug: 'real-benefits-of-trt',
    title: 'The Real Benefits of Testosterone Replacement Therapy (TRT)',
    description: 'Learn the real benefits of Testosterone Replacement Therapy (TRT), including improved energy, muscle growth, libido, mental clarity, and body composition. Explore TRT risks, side effects, and safety.',
    author: 'Bloom Metabolics Clinical Team',
    published_at: '2026-06-04',
    category: 'TRT',
    tags: ['trt', 'testosterone', 'hormone-optimization', 'mens-health', 'libido', 'muscle-growth'],
    reading_time: 9,
    draft: false,
  },
  {
    slug: 'what-is-retatrutide',
    title: 'What Is Retatrutide (Reta)?',
    description: 'Learn what retatrutide (Reta) is, how it works, and how it compares to semaglutide and tirzepatide for weight loss. Explore the latest clinical trial results, potential benefits, common side effects, risks, and FDA approval status of this next-generation obesity medication.',
    author: 'Bloom Metabolics Clinical Team',
    published_at: '2026-06-04',
    category: 'GLP-1',
    tags: ['retatrutide', 'glp-1', 'weight-loss', 'tirzepatide', 'semaglutide', 'obesity'],
    reading_time: 10,
    draft: false,
  },
  {
    slug: 'understanding-trt-eligibility',
    title: 'Understanding TRT Eligibility: What You Need to Know',
    description: 'A comprehensive guide to testosterone replacement therapy eligibility, lab requirements, and what to expect from the evaluation process.',
    author: 'Bloom Metabolics Clinical Team',
    published_at: '2026-05-01',
    category: 'TRT',
    tags: ['trt', 'testosterone', 'eligibility', 'labs'],
    reading_time: 8,
    draft: true,
  },
  {
    slug: 'compounded-vs-branded-glp-1-medications',
    title: 'Compounded vs Branded GLP-1 Medications: What Patients Should Know',
    description: 'Understanding the differences between compounded and FDA-approved GLP-1 receptor agonists, including regulatory status and clinical considerations.',
    author: 'Bloom Metabolics Clinical Team',
    published_at: '2026-05-01',
    category: 'GLP-1',
    tags: ['glp-1', 'compounded', 'semaglutide', 'tirzepatide'],
    reading_time: 10,
    draft: true,
  },
  {
    slug: 'what-to-expect-from-online-trt',
    title: 'What to Expect from Online TRT: A Patient Guide',
    description: 'Step-by-step walkthrough of the online TRT process, from consultation to ongoing monitoring.',
    author: 'Bloom Metabolics Clinical Team',
    published_at: '2026-05-01',
    category: 'TRT',
    tags: ['trt', 'telehealth', 'process', 'guide'],
    reading_time: 6,
    draft: true,
  },
]

export function getAllPosts(includeDrafts = false): Post[] {
  const posts = includeDrafts ? POSTS : POSTS.filter(p => !p.draft)
  return posts.sort((a, b) => b.published_at.localeCompare(a.published_at))
}

export function getPostBySlug(slug: string): Post | null {
  return POSTS.find(p => p.slug === slug) || null
}

export function getPostsByCategory(category: string): Post[] {
  return POSTS.filter(p => p.category === category && !p.draft)
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  return POSTS.filter(p => p.slug !== post.slug && !p.draft && p.tags.some(t => post.tags.includes(t))).slice(0, limit)
}
