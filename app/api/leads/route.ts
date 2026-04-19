import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { enrichServerLead, type EnrichedLead } from '@/lib/attribution'
import {
  sendTelegram,
  sendLeadEmail,
  emitN8n,
  formatTelegramLead,
  formatLeadEmail,
  isHighIntent,
  logLeadFailure,
} from '@/lib/notify'

type NotifyResult = { ok: boolean; skipped?: boolean; error?: string; status?: number }

const GHL_API_KEY = process.env.GHL_API_KEY || ''
const GHL_BASE_URL = process.env.GHL_BASE_URL || 'https://services.leadconnectorhq.com'
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || ''

const leadSchema = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  source: z.string().optional(),
  variant: z.enum(['quiz', 'guide']).optional(),
  serviceInterest: z.enum(['trt', 'glp1', 'peptides', 'general']).optional(),
  // Client-captured attribution (optional — server still enriches with geo/device/session)
  attribution: z
    .object({
      source: z.string().optional(),
      medium: z.string().optional(),
      campaign: z.string().optional(),
      content: z.string().optional(),
      term: z.string().optional(),
      gclid: z.string().optional(),
      fbclid: z.string().optional(),
      landing_page: z.string().optional(),
      referrer: z.string().optional(),
      captured_at: z.string().optional(),
    })
    .optional(),
  session_id: z.string().optional(),
})

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = leadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const lead = enrichServerLead(parsed.data as Record<string, unknown>, req.headers)

  // Fire all side effects in parallel. None blocks another.
  const [ghlRes, n8nRes, tgRes, emailRes] = await Promise.allSettled([
    upsertGhl(lead),
    emitN8n('nova.lead.captured', lead as unknown as Record<string, unknown>),
    isHighIntent(lead) ? sendTelegram(formatTelegramLead(lead)) : Promise.resolve<NotifyResult>({ ok: true, skipped: true }),
    sendLeadAlertEmail(lead),
  ])

  const failures: Array<{ channel: string; error: string }> = []
  if (ghlRes.status === 'rejected') failures.push({ channel: 'ghl', error: String(ghlRes.reason) })
  else if (!ghlRes.value.ok && !ghlRes.value.skipped) failures.push({ channel: 'ghl', error: ghlRes.value.error || 'ghl_failed' })

  if (n8nRes.status === 'rejected') failures.push({ channel: 'n8n', error: String(n8nRes.reason) })
  else if (!n8nRes.value.ok && !n8nRes.value.skipped) failures.push({ channel: 'n8n', error: n8nRes.value.error || 'n8n_failed' })

  if (tgRes.status === 'rejected') failures.push({ channel: 'telegram', error: String(tgRes.reason) })
  else if (!tgRes.value.ok && !tgRes.value.skipped) failures.push({ channel: 'telegram', error: tgRes.value.error || 'tg_failed' })

  if (emailRes.status === 'rejected') failures.push({ channel: 'email', error: String(emailRes.reason) })
  else if (!emailRes.value.ok && !emailRes.value.skipped) failures.push({ channel: 'email', error: emailRes.value.error || 'email_failed' })

  if (failures.length) logLeadFailure(lead, failures)

  return NextResponse.json({
    ok: true,
    lead_id: lead.lead_id,
    contactId: ghlRes.status === 'fulfilled' ? ghlRes.value.contactId : undefined,
    delivered: {
      ghl: ghlRes.status === 'fulfilled' && ghlRes.value.ok,
      n8n: n8nRes.status === 'fulfilled' && n8nRes.value.ok,
      telegram: tgRes.status === 'fulfilled' && tgRes.value.ok,
      email: emailRes.status === 'fulfilled' && emailRes.value.ok,
    },
  })
}

export async function GET() {
  return NextResponse.json({
    service: 'Bloom Metabolics — Lead Capture API',
    status: 'active',
    integrations: {
      ghl: Boolean(GHL_API_KEY && GHL_LOCATION_ID),
      telegram: Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID),
      n8n: Boolean(process.env.N8N_WEBHOOK_URL),
      email: Boolean(process.env.RESEND_API_KEY && process.env.LEAD_ALERT_EMAIL),
    },
  })
}

// ─── GHL upsert ─────────────────────────────────────────────
async function upsertGhl(lead: EnrichedLead): Promise<{ ok: boolean; skipped?: boolean; contactId?: string; error?: string }> {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    return { ok: true, skipped: true }
  }

  const tags = buildTags(lead)

  try {
    const res = await fetch(`${GHL_BASE_URL}/contacts/upsert`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        Version: '2021-07-28',
      },
      body: JSON.stringify({
        locationId: GHL_LOCATION_ID,
        email: lead.email,
        firstName: lead.firstName,
        lastName: lead.lastName,
        phone: lead.phone,
        source: lead.source || 'nova_health_website',
        tags,
        customFields: buildGhlCustomFields(lead),
      }),
    })

    const data = (await res.json().catch(() => ({}))) as { contact?: { id?: string }; id?: string }
    if (!res.ok) {
      return { ok: false, error: `ghl_${res.status}` }
    }
    return { ok: true, contactId: data.contact?.id || data.id }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'unknown' }
  }
}

function buildTags(lead: EnrichedLead): string[] {
  const tags = ['website-lead']
  if (lead.source) tags.push(`source-${lead.source}`)
  if (lead.medium) tags.push(`medium-${lead.medium}`)
  if (lead.campaign) tags.push(`campaign-${lead.campaign}`)
  if (lead.variant) tags.push(`popup-${lead.variant}`)
  if (lead.serviceInterest) tags.push(`interest-${lead.serviceInterest}`)
  else if (lead.variant === 'quiz') tags.push('interest-trt')
  if (lead.device) tags.push(`device-${lead.device}`)
  if (lead.gclid) tags.push('from-google-ads')
  if (lead.fbclid) tags.push('from-meta-ads')
  return tags
}

function buildGhlCustomFields(lead: EnrichedLead): Record<string, string | undefined> {
  return {
    landing_page: lead.landing_page,
    referrer: lead.referrer,
    gclid: lead.gclid,
    fbclid: lead.fbclid,
    lead_id: lead.lead_id,
    session_id: lead.session_id,
    geo_region: lead.geo?.region,
    geo_country: lead.geo?.country,
    geo_city: lead.geo?.city,
  }
}

async function sendLeadAlertEmail(lead: EnrichedLead) {
  const { subject, text } = formatLeadEmail(lead)
  return sendLeadEmail(subject, text)
}
