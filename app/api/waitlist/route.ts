import { NextRequest, NextResponse } from 'next/server'
import { waitlistServerSchema } from '@/lib/waitlist/schema'
import { PRIMARY_INTERESTS } from '@/lib/waitlist/constants'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { sendEmail } from '@/lib/email/resend'

const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL || ''
const BUSINESS_LEAD_EMAIL = process.env.BUSINESS_LEAD_EMAIL || process.env.LEAD_ALERT_EMAIL || ''
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || ''

// ─── Rate limiting via Upstash Redis ────────────────────────
async function getRateLimiter() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  const { Redis } = await import('@upstash/redis')
  return new Redis({ url, token })
}

async function checkRateLimit(ip: string): Promise<boolean> {
  const redis = await getRateLimiter()
  if (!redis) return true // No redis = allow
  const key = `waitlist:rate:${ip}`
  const count = await redis.incr(key)
  if (count === 1) await redis.expire(key, 3600) // 1 hour window
  return count <= 3
}

// ─── Turnstile verification ─────────────────────────────────
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  if (!TURNSTILE_SECRET_KEY) {
    console.warn('[WAITLIST] Turnstile not configured — skipping verification')
    return true
  }
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: ip,
      }),
    })
    const data = await res.json() as { success: boolean }
    return data.success
  } catch {
    console.error('[WAITLIST] Turnstile verification error')
    return false
  }
}

// ─── Interest slug → label ──────────────────────────────────
function interestLabel(slug: string): string {
  return PRIMARY_INTERESTS.find(i => i.value === slug)?.label || slug
}

// ─── Notification email HTML ────────────────────────────────
function buildNotificationHtml(d: Record<string, string | undefined>, timestamp: string): string {
  const rows = [
    ['Full Name', `${d.firstName} ${d.lastName}`],
    ['Email', d.email],
    ['Phone', d.phone],
    ['State', d.state],
    ['Primary Interest', interestLabel(d.primaryInterest || '')],
    ['Preferred Contact', d.preferredContact || 'Email'],
    ['Timeline', d.timeline || '—'],
    ['Notes / Goals', d.notes || '—'],
    ['UTM Source', d.utmSource || '—'],
    ['UTM Medium', d.utmMedium || '—'],
    ['UTM Campaign', d.utmCampaign || '—'],
    ['Referrer', d.referrer || '—'],
    ['Landing Page', d.landingPage || '—'],
    ['Timestamp', timestamp],
  ]
  return `<div style="font-family:system-ui,sans-serif;max-width:600px;">
    <h2 style="color:#020202;margin-bottom:4px;">New Waitlist Lead</h2>
    <hr style="border:none;border-top:1px solid #d8cfbe;margin:16px 0;" />
    ${rows.map(([k, v]) => `<p style="margin:6px 0;"><strong>${k}:</strong> ${v}</p>`).join('')}
    <hr style="border:none;border-top:1px solid #d8cfbe;margin:16px 0;" />
    <p style="color:#8a8268;font-size:12px;">Bloom Metabolics — Waitlist Pipeline</p>
  </div>`
}

function buildNotificationText(d: Record<string, string | undefined>, timestamp: string): string {
  return `New Waitlist Lead
──────────────────
Full Name: ${d.firstName} ${d.lastName}
Email: ${d.email}
Phone: ${d.phone}
State: ${d.state}
Primary Interest: ${interestLabel(d.primaryInterest || '')}
Preferred Contact: ${d.preferredContact || 'Email'}
Timeline: ${d.timeline || '—'}
Notes / Goals: ${d.notes || '—'}
UTM Source: ${d.utmSource || '—'}
UTM Medium: ${d.utmMedium || '—'}
UTM Campaign: ${d.utmCampaign || '—'}
Referrer: ${d.referrer || '—'}
Landing Page: ${d.landingPage || '—'}
Timestamp: ${timestamp}`
}

// ─── Confirmation email to submitter ────────────────────────
function buildConfirmationHtml(firstName: string): string {
  return `<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;background:#020202;padding:40px 32px;border-radius:8px;">
  <div style="text-align:center;margin-bottom:32px;">
    <span style="font-family:Georgia,serif;font-size:18px;color:#d8cfbe;letter-spacing:-0.02em;font-weight:300;">Bloom Metabolics</span>
    <div style="font-family:monospace;font-size:9px;color:#8a8268;letter-spacing:0.25em;text-transform:uppercase;margin-top:2px;">Est · MMXXVI</div>
  </div>
  <h1 style="font-family:Georgia,serif;font-size:24px;color:#d8cfbe;font-weight:300;margin-bottom:16px;">Welcome to the waitlist, ${firstName}.</h1>
  <p style="font-size:15px;color:#a89878;line-height:1.7;margin-bottom:20px;">Thank you for joining the Bloom Metabolics waitlist.</p>
  <p style="font-size:15px;color:#a89878;line-height:1.7;margin-bottom:20px;">We\u2019ve received your information and our team will be in touch with next steps as enrollment opens. In the meantime, no action is needed on your end.</p>
  <p style="font-size:13px;color:#8a8268;line-height:1.7;margin-bottom:32px;">A reminder: this waitlist submission does not establish a patient-provider relationship. A licensed provider will determine eligibility after formal intake and evaluation.</p>
  <hr style="border:none;border-top:1px solid #1a1814;margin:24px 0;" />
  <p style="font-size:12px;color:#8a8268;text-align:center;">\u2014 The Bloom Metabolics Team<br/><a href="https://bloommetabolics.com" style="color:#8a8268;">bloommetabolics.com</a></p>
</div>`
}

function buildConfirmationText(firstName: string): string {
  return `Welcome to the waitlist, ${firstName}.

Thank you for joining the Bloom Metabolics waitlist.

We've received your information and our team will be in touch with next steps as enrollment opens. In the meantime, no action is needed on your end.

A reminder: this waitlist submission does not establish a patient-provider relationship. A licensed provider will determine eligibility after formal intake and evaluation.

— The Bloom Metabolics Team
bloommetabolics.com`
}

// ─── POST handler ───────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

  // Rate limiting
  const allowed = await checkRateLimit(ip)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again later.' },
      { status: 429 }
    )
  }

  // Parse body
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Validate
  const parsed = waitlistServerSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const data = parsed.data

  // Honeypot check — return fake success
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true })
  }

  // Turnstile verification (required in production)
  const isProduction = process.env.NODE_ENV === 'production'
  if (isProduction) {
    if (!data.turnstileToken) {
      return NextResponse.json({ error: 'Bot verification required' }, { status: 400 })
    }
    const turnstileValid = await verifyTurnstile(data.turnstileToken, ip)
    if (!turnstileValid) {
      return NextResponse.json({ error: 'Bot verification failed' }, { status: 403 })
    }
  }

  const timestamp = new Date().toISOString()
  const d = data as unknown as Record<string, string | undefined>

  // ── Integration 1: GoHighLevel webhook ──────────────────
  let ghlOk = false
  try {
    if (GHL_WEBHOOK_URL) {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 5000)
      const res = await fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          state: data.state,
          primary_interest: interestLabel(data.primaryInterest),
          preferred_contact: data.preferredContact || 'email',
          timeline: data.timeline || '',
          notes: data.notes || '',
          tags: ['waitlist-lead', data.primaryInterest],
          utm_source: data.utmSource || '',
          utm_medium: data.utmMedium || '',
          utm_campaign: data.utmCampaign || '',
          referrer: data.referrer || '',
          landing_page: data.landingPage || '',
          submitted_at: timestamp,
        }),
      })
      clearTimeout(timeout)
      ghlOk = res.ok
      if (!res.ok) console.error(`[WAITLIST] GHL webhook failed: ${res.status}`)
    } else {
      console.warn('[WAITLIST] GHL_WEBHOOK_URL not configured')
    }
  } catch (err) {
    console.error('[WAITLIST] GHL webhook error:', err instanceof Error ? err.name : 'unknown')
  }

  // ── Integration 2: Notification email to owner ──────────
  let notifyOk = false
  try {
    if (BUSINESS_LEAD_EMAIL) {
      notifyOk = await sendEmail({
        to: BUSINESS_LEAD_EMAIL,
        subject: `New Bloom Metabolics Waitlist Lead — ${data.firstName} ${data.lastName} (${interestLabel(data.primaryInterest)})`,
        html: buildNotificationHtml(d, timestamp),
        replyTo: data.email,
      })
    } else {
      console.warn('[WAITLIST] BUSINESS_LEAD_EMAIL not configured')
    }
  } catch {
    console.error('[WAITLIST] Notification email error')
  }

  // ── Integration 3: Confirmation email to submitter ──────
  try {
    await sendEmail({
      to: data.email,
      subject: 'Welcome to the Bloom Metabolics waitlist',
      html: buildConfirmationHtml(data.firstName),
    })
  } catch {
    console.error('[WAITLIST] Confirmation email error')
  }

  // ── Integration 4: Supabase backup ─────────────────────
  try {
    const sb = getSupabaseAdmin()
    if (sb) {
      await sb.from('waitlist_leads').upsert(
        {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          state: data.state,
          primary_interest: data.primaryInterest,
          preferred_contact: data.preferredContact || 'email',
          timeline: data.timeline || null,
          notes: data.notes || null,
          utm_source: data.utmSource || null,
          utm_medium: data.utmMedium || null,
          utm_campaign: data.utmCampaign || null,
          utm_term: data.utmTerm || null,
          utm_content: data.utmContent || null,
          referrer: data.referrer || null,
          landing_page: data.landingPage || null,
          user_agent: data.userAgent || null,
          ip_address: ip !== 'unknown' ? ip : null,
        },
        { onConflict: 'email', ignoreDuplicates: false }
      )
    }
  } catch {
    console.error('[WAITLIST] Supabase backup error')
  }

  // ── Response ────────────────────────────────────────────
  if (!ghlOk && !notifyOk) {
    return NextResponse.json(
      { error: 'Submission failed. Please try again or contact us directly.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true })
}
