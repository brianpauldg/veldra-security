// ─────────────────────────────────────────────────────────────
// Bloom Metabolics — Outbound Notifications
// Every function is env-gated: missing creds = silent no-op (skipped=true).
// Nothing throws. All failures return { ok: false }.
// ─────────────────────────────────────────────────────────────

import type { EnrichedLead } from './attribution'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || ''
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || ''
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || ''
const LEAD_ALERT_EMAIL = process.env.LEAD_ALERT_EMAIL || ''
const RESEND_API_KEY = process.env.RESEND_API_KEY || ''
const RESEND_FROM = process.env.RESEND_FROM || 'Bloom Metabolics Leads <leads@bloommetabolics.com>'

type Result = { ok: boolean; skipped?: boolean; error?: string; status?: number }

// ─── Telegram ──────────────────────────────────────────────
export async function sendTelegram(message: string): Promise<Result> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return { ok: true, skipped: true }
  try {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
      }),
    })
    return { ok: res.ok, status: res.status }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'unknown' }
  }
}

// ─── n8n webhook ───────────────────────────────────────────
export async function emitN8n(event: string, payload: Record<string, unknown>): Promise<Result> {
  if (!N8N_WEBHOOK_URL) return { ok: true, skipped: true }
  try {
    const res = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, ...payload }),
    })
    return { ok: res.ok, status: res.status }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'unknown' }
  }
}

// ─── Email (Resend) ─────────────────────────────────────────
export async function sendLeadEmail(subject: string, text: string, html?: string): Promise<Result> {
  if (!RESEND_API_KEY || !LEAD_ALERT_EMAIL) return { ok: true, skipped: true }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: [LEAD_ALERT_EMAIL],
        subject,
        text,
        html: html || text.replace(/\n/g, '<br>'),
      }),
    })
    return { ok: res.ok, status: res.status }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'unknown' }
  }
}

// ─── Formatters ────────────────────────────────────────────
export function formatTelegramLead(lead: EnrichedLead): string {
  const tag = lead.serviceInterest ? lead.serviceInterest.toUpperCase() : 'LEAD'
  const geoBits = [lead.geo?.city, lead.geo?.region, lead.geo?.country].filter(Boolean).join(', ')
  return [
    `🔔 *NEW ${tag} LEAD*`,
    '',
    `*${[lead.firstName, lead.lastName].filter(Boolean).join(' ') || '(no name)'}*`,
    `📧 ${lead.email}`,
    lead.phone ? `📱 ${lead.phone}` : null,
    geoBits ? `📍 ${geoBits}` : null,
    '',
    `Source: \`${lead.source}\``,
    lead.campaign ? `Campaign: \`${lead.campaign}\`` : null,
    lead.medium ? `Medium: \`${lead.medium}\`` : null,
    lead.landing_page ? `Landing: \`${lead.landing_page}\`` : null,
    '',
    `Device: ${lead.device}`,
    `ID: \`${lead.lead_id}\``,
  ]
    .filter(Boolean)
    .join('\n')
}

export function formatLeadEmail(lead: EnrichedLead): { subject: string; text: string } {
  const tag = lead.serviceInterest ? lead.serviceInterest.toUpperCase() : 'general'
  const subject = `New ${tag} lead — ${lead.email}`
  const text = [
    `New lead captured at ${lead.timestamp}`,
    '',
    `Name:      ${[lead.firstName, lead.lastName].filter(Boolean).join(' ') || '(not provided)'}`,
    `Email:     ${lead.email}`,
    `Phone:     ${lead.phone || '(not provided)'}`,
    `Interest:  ${lead.serviceInterest || '(not specified)'}`,
    '',
    `Source:    ${lead.source}`,
    `Medium:    ${lead.medium || '-'}`,
    `Campaign:  ${lead.campaign || '-'}`,
    `Referrer:  ${lead.referrer || '-'}`,
    `Landing:   ${lead.landing_page || '-'}`,
    `Device:    ${lead.device}`,
    `Location:  ${[lead.geo?.city, lead.geo?.region, lead.geo?.country].filter(Boolean).join(', ') || '-'}`,
    '',
    `Lead ID:   ${lead.lead_id}`,
    `Session:   ${lead.session_id || '-'}`,
  ].join('\n')
  return { subject, text }
}

// ─── Routing logic ─────────────────────────────────────────
export function isHighIntent(lead: EnrichedLead): boolean {
  if (lead.source === 'book_form' || lead.source === 'checkout' || lead.source === 'quiz_completed') return true
  if (lead.phone && (lead.serviceInterest === 'trt' || lead.serviceInterest === 'glp1')) return true
  return false
}

// ─── Failure logging (fallback) ────────────────────────────
// In production, swap to a persistence layer (DB / Redis / queue).
// For now: server console only — Vercel captures these.
export function logLeadFailure(lead: EnrichedLead, failures: Array<{ channel: string; error: string }>): void {
  console.error('[nova.leads.failure]', JSON.stringify({ lead_id: lead.lead_id, email: lead.email, failures }))
}
