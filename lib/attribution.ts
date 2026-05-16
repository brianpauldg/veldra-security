// ─────────────────────────────────────────────────────────────
// Bloom Metabolics — Lead Attribution
// Client: captures UTM / referrer / session on first visit.
// Server: enriches inbound leads with geo (Vercel headers),
//         device, session_id (from cookie), and a server-generated
//         lead_id.
// ─────────────────────────────────────────────────────────────

const ATTR_KEY = 'nova_attribution'
const SID_KEY = 'nova_session_id'

export interface ClientAttribution {
  source: string
  medium?: string
  campaign?: string
  content?: string
  term?: string
  gclid?: string
  fbclid?: string
  landing_page: string
  referrer?: string
  captured_at: string
}

// Call once on first page load (in LayoutShell). Idempotent.
export function captureClientAttribution(): void {
  if (typeof window === 'undefined') return
  if (sessionStorage.getItem(ATTR_KEY)) return

  const params = new URLSearchParams(window.location.search)
  const utm_source = params.get('utm_source') || undefined
  const hasReferrer = !!document.referrer && !document.referrer.includes(window.location.host)

  const data: ClientAttribution = {
    source: utm_source || (hasReferrer ? 'referral' : 'direct'),
    medium: params.get('utm_medium') || undefined,
    campaign: params.get('utm_campaign') || undefined,
    content: params.get('utm_content') || undefined,
    term: params.get('utm_term') || undefined,
    gclid: params.get('gclid') || undefined,
    fbclid: params.get('fbclid') || undefined,
    landing_page: window.location.pathname + window.location.search,
    referrer: hasReferrer ? document.referrer : undefined,
    captured_at: new Date().toISOString(),
  }

  sessionStorage.setItem(ATTR_KEY, JSON.stringify(data))
  ensureSessionId()
}

export function getClientAttribution(): ClientAttribution | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(ATTR_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function ensureSessionId(): string {
  if (typeof window === 'undefined') return ''
  let id = sessionStorage.getItem(SID_KEY)
  if (!id) {
    id = typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `sid_${Date.now()}_${Math.random().toString(36).slice(2)}`
    sessionStorage.setItem(SID_KEY, id)
  }
  // Mirror to cookie so server can read it on API calls
  document.cookie = `nova_sid=${id}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`
  return id
}

// Client helper: merge current attribution into a payload before POSTing
export function withAttribution<T extends Record<string, unknown>>(payload: T): T & { attribution?: ClientAttribution; session_id?: string } {
  const attribution = getClientAttribution() || undefined
  const session_id = typeof window !== 'undefined' ? sessionStorage.getItem(SID_KEY) || undefined : undefined
  return { ...payload, attribution, session_id }
}

// ─── Server-side enrichment ────────────────────────────────
export interface EnrichedLead {
  lead_id: string
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  serviceInterest?: string
  variant?: string
  assessmentScore?: number
  assessmentTier?: string
  assessmentResult?: string
  source: string
  medium?: string
  campaign?: string
  content?: string
  term?: string
  gclid?: string
  fbclid?: string
  landing_page?: string
  referrer?: string
  session_id?: string
  user_agent?: string
  device: 'mobile' | 'tablet' | 'desktop'
  geo: { country?: string; region?: string; city?: string }
  timestamp: string
  raw: Record<string, unknown>
}

export function enrichServerLead(body: Record<string, unknown>, headers: Headers): EnrichedLead {
  const ua = headers.get('user-agent') || ''
  const device: EnrichedLead['device'] =
    /iPad|Tablet/i.test(ua) ? 'tablet' : /Mobi|Android|iPhone/i.test(ua) ? 'mobile' : 'desktop'

  const geo = {
    country: headers.get('x-vercel-ip-country') || undefined,
    region: headers.get('x-vercel-ip-country-region') || undefined,
    city: headers.get('x-vercel-ip-city') ? safeDecode(headers.get('x-vercel-ip-city')!) : undefined,
  }

  const cookie = headers.get('cookie') || ''
  const sidMatch = cookie.match(/nova_sid=([^;]+)/)
  const session_id = sidMatch?.[1]

  const attr = (body.attribution || {}) as Partial<ClientAttribution>
  const source =
    (body.source as string) ||
    attr.source ||
    'direct'

  return {
    lead_id: randomId(),
    email: String(body.email || ''),
    firstName: body.firstName as string | undefined,
    lastName: body.lastName as string | undefined,
    phone: body.phone as string | undefined,
    serviceInterest: body.serviceInterest as string | undefined,
    variant: body.variant as string | undefined,
    assessmentScore: body.assessmentScore as number | undefined,
    assessmentTier: body.assessmentTier as string | undefined,
    assessmentResult: body.assessmentResult as string | undefined,
    source,
    medium: attr.medium,
    campaign: attr.campaign,
    content: attr.content,
    term: attr.term,
    gclid: attr.gclid,
    fbclid: attr.fbclid,
    landing_page: attr.landing_page,
    referrer: attr.referrer,
    session_id,
    user_agent: ua,
    device,
    geo,
    timestamp: new Date().toISOString(),
    raw: body,
  }
}

function randomId(): string {
  try {
    return crypto.randomUUID()
  } catch {
    return `lead_${Date.now()}_${Math.random().toString(36).slice(2)}`
  }
}

function safeDecode(s: string): string {
  try {
    return decodeURIComponent(s)
  } catch {
    return s
  }
}
