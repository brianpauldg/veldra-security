/**
 * Bloom Metabolics — UTM Parameter Handling
 */

export interface UTMParams {
  source?: string
  medium?: string
  campaign?: string
  content?: string
  term?: string
  gclid?: string
  fbclid?: string
  landing_page?: string
  referrer?: string
}

export function parseUTM(input: string | URLSearchParams): UTMParams {
  const params = typeof input === 'string' ? new URLSearchParams(new URL(input, 'https://x.com').search) : input
  return {
    source: params.get('utm_source') || undefined,
    medium: params.get('utm_medium') || undefined,
    campaign: params.get('utm_campaign') || undefined,
    content: params.get('utm_content') || undefined,
    term: params.get('utm_term') || undefined,
    gclid: params.get('gclid') || undefined,
    fbclid: params.get('fbclid') || undefined,
  }
}

export function serializeUTM(params: UTMParams): string {
  const entries: [string, string][] = []
  if (params.source) entries.push(['utm_source', params.source])
  if (params.medium) entries.push(['utm_medium', params.medium])
  if (params.campaign) entries.push(['utm_campaign', params.campaign])
  if (params.content) entries.push(['utm_content', params.content])
  if (params.term) entries.push(['utm_term', params.term])
  if (params.gclid) entries.push(['gclid', params.gclid])
  if (params.fbclid) entries.push(['fbclid', params.fbclid])
  return new URLSearchParams(entries).toString()
}

export interface Attribution extends UTMParams {
  at?: string
}

export function mergeAttribution(existing: Attribution, incoming: Attribution): Attribution {
  return {
    // First touch preserved
    source: existing.source || incoming.source,
    medium: existing.medium || incoming.medium,
    campaign: existing.campaign || incoming.campaign,
    content: existing.content || incoming.content,
    term: existing.term || incoming.term,
    gclid: existing.gclid || incoming.gclid,
    fbclid: existing.fbclid || incoming.fbclid,
    landing_page: existing.landing_page || incoming.landing_page,
    referrer: existing.referrer || incoming.referrer,
    // Last touch updated
    at: incoming.at || existing.at,
  }
}
