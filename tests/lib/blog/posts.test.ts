import { describe, it, expect } from 'vitest'
import { getAllPosts, getPostBySlug, getPostsByCategory, getRelatedPosts } from '@/lib/blog/posts'

describe('blog posts', () => {
  it('getAllPosts excludes drafts by default', () => {
    const posts = getAllPosts()
    expect(posts.every(p => !p.draft)).toBe(true)
  })

  it('getAllPosts includes drafts when requested', () => {
    const posts = getAllPosts(true)
    expect(posts.length).toBeGreaterThan(0)
  })

  it('getPostBySlug returns a post', () => {
    const post = getPostBySlug('understanding-trt-eligibility')
    expect(post).not.toBeNull()
    expect(post!.title).toContain('TRT Eligibility')
  })

  it('getPostBySlug returns null for unknown slug', () => {
    expect(getPostBySlug('nonexistent')).toBeNull()
  })

  it('getPostsByCategory filters correctly', () => {
    const posts = getPostsByCategory('TRT')
    // All drafts, so should be empty (public only)
    expect(posts.every(p => p.category === 'TRT')).toBe(true)
  })

  it('getRelatedPosts finds related by tags', () => {
    const post = getPostBySlug('understanding-trt-eligibility')!
    const related = getRelatedPosts(post)
    expect(related.every(r => r.slug !== post.slug)).toBe(true)
  })
})
