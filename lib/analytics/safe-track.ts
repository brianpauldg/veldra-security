/**
 * Bloom Metabolics — Safe Analytics Tracking
 * Default-deny: only allowlisted fields pass to analytics provider.
 * NO PHI ever reaches PostHog.
 */

const ALLOWED_FIELDS = new Set([
  'event_type', 'source', 'medium', 'campaign', 'content', 'term',
  'landing_page', 'referrer', 'session_id', 'page_url', 'page_title',
  'treatment_type', 'quiz_tier', 'form_id', 'variant',
  'template_id', 'category', 'funnel_step',
])

const PHI_PATTERNS = /email|phone|name|first_name|last_name|dob|date_of_birth|address|ssn|npi|dea/i

export function safeTrack(event: string, params: Record<string, unknown>): Record<string, unknown> {
  const safe: Record<string, unknown> = { event }

  for (const [key, value] of Object.entries(params)) {
    if (PHI_PATTERNS.test(key)) continue // reject PHI fields
    if (!ALLOWED_FIELDS.has(key)) continue // default-deny
    safe[key] = value
  }

  return safe
}

export function isPublicPage(pathname: string): boolean {
  return !pathname.startsWith('/clinic') && !pathname.startsWith('/portal')
}
