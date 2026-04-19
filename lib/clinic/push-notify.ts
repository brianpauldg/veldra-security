/**
 * Bloom Metabolics — Push Notification Dispatcher
 *
 * Routes critical notifications to external channels:
 * - Email via GHL
 * - SMS via GHL
 * - Dashboard (always)
 *
 * Called by the n8n webhook handler, MCP tools, and alert engine
 * when events meet the push threshold.
 */

import { createNotification, type Notification } from './mcp-adapter'
import { logAudit } from './audit'

// Brian's GHL contact ID for push notifications
const BRIAN_GHL_CONTACT_ID = process.env.GHL_ADMIN_CONTACT_ID || 'VS9MpDTN1ySXSYLUkEsN'
const GHL_API_KEY = process.env.GHL_API_KEY || ''
const GHL_BASE_URL = process.env.GHL_BASE_URL || 'https://services.leadconnectorhq.com'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://bloommetabolics-one.vercel.app'

export type PushChannel = 'email' | 'sms' | 'dashboard'

export type PushSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info'

// Which severities trigger which channels
const CHANNEL_RULES: Record<PushSeverity, PushChannel[]> = {
  critical: ['dashboard', 'sms', 'email'],
  high:     ['dashboard', 'email'],
  medium:   ['dashboard'],
  low:      ['dashboard'],
  info:     ['dashboard'],
}

export interface PushNotification {
  title: string
  message: string
  severity: PushSeverity
  patientId?: string
  patientName?: string
  actionUrl?: string
  source?: string
}

export interface PushResult {
  dashboard: boolean
  email: boolean
  sms: boolean
  errors: string[]
}

export async function pushNotify(notif: PushNotification): Promise<PushResult> {
  const channels = CHANNEL_RULES[notif.severity]
  const result: PushResult = { dashboard: false, email: false, sms: false, errors: [] }

  // Always push to dashboard
  try {
    createNotification({
      recipientId: 'usr_admin_001',
      type: notif.severity === 'critical' ? 'alert' : 'system',
      title: notif.title,
      message: notif.message,
      patientId: notif.patientId,
      severity: notif.severity,
      actionUrl: notif.actionUrl,
    })
    result.dashboard = true
  } catch (err) {
    result.errors.push(`Dashboard: ${err instanceof Error ? err.message : 'unknown'}`)
  }

  // Email for critical + high
  if (channels.includes('email') && GHL_API_KEY) {
    try {
      const emailHtml = buildEmailHtml(notif)
      const res = await fetch(`${GHL_BASE_URL}/conversations/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
          'Version': '2021-04-15',
        },
        body: JSON.stringify({
          type: 'Email',
          contactId: BRIAN_GHL_CONTACT_ID,
          subject: `[Bloom Metabolics ${notif.severity.toUpperCase()}] ${notif.title}`,
          html: emailHtml,
          emailTo: 'brian@bloommetabolics.com',
        }),
      })
      if (res.ok) {
        result.email = true
      } else {
        const errBody = await res.text()
        result.errors.push(`Email: ${res.status} — ${errBody}`)
      }
    } catch (err) {
      result.errors.push(`Email: ${err instanceof Error ? err.message : 'unknown'}`)
    }
  }

  // SMS for critical only
  if (channels.includes('sms') && GHL_API_KEY) {
    try {
      const smsBody = buildSmsBody(notif)
      const res = await fetch(`${GHL_BASE_URL}/conversations/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
          'Version': '2021-04-15',
        },
        body: JSON.stringify({
          type: 'SMS',
          contactId: BRIAN_GHL_CONTACT_ID,
          message: smsBody,
        }),
      })
      if (res.ok) {
        result.sms = true
      } else {
        const errBody = await res.text()
        result.errors.push(`SMS: ${res.status} — ${errBody}`)
      }
    } catch (err) {
      result.errors.push(`SMS: ${err instanceof Error ? err.message : 'unknown'}`)
    }
  }

  // Audit the push
  logAudit({
    userId: 'system',
    userName: 'Push Notification System',
    userRole: 'super_admin',
    action: 'push_notification',
    resourceType: 'notification',
    resourceId: notif.patientId || 'global',
    details: {
      title: notif.title,
      severity: notif.severity,
      channels: channels,
      result: { dashboard: result.dashboard, email: result.email, sms: result.sms },
      errors: result.errors,
    },
  })

  return result
}

// ── Email Template ───────────────────────────────────────────

function buildEmailHtml(notif: PushNotification): string {
  const severityColors: Record<string, string> = {
    critical: '#ef4444',
    high: '#f97316',
    medium: '#eab308',
    low: '#3b82f6',
    info: '#71717a',
  }
  const color = severityColors[notif.severity] || '#71717a'
  const dashboardUrl = notif.actionUrl
    ? `${APP_URL}${notif.actionUrl}`
    : `${APP_URL}/clinic`

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#f8f8f9;font-family:-apple-system,BlinkMacSystemFont,'Inter',sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:32px 16px;">
    <div style="background:#ffffff;border-radius:12px;border:1px solid #e2e2e6;overflow:hidden;">
      <!-- Header -->
      <div style="background:#09090b;padding:20px 24px;display:flex;align-items:center;">
        <div style="width:32px;height:32px;background:#1a9a73;border-radius:8px;display:inline-block;vertical-align:middle;text-align:center;line-height:32px;color:white;font-weight:bold;font-size:14px;margin-right:12px;">N</div>
        <span style="color:#ffffff;font-size:15px;font-weight:600;vertical-align:middle;">Bloom Metabolics Clinical OS</span>
      </div>

      <!-- Severity Banner -->
      <div style="background:${color};padding:10px 24px;">
        <span style="color:white;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;">${notif.severity} ALERT</span>
      </div>

      <!-- Content -->
      <div style="padding:24px;">
        <h2 style="margin:0 0 8px;font-size:18px;font-weight:600;color:#18181b;">${notif.title}</h2>
        ${notif.patientName ? `<p style="margin:0 0 12px;font-size:13px;color:#71717a;">Patient: ${notif.patientName}</p>` : ''}
        <p style="margin:0 0 20px;font-size:14px;color:#3f3f46;line-height:1.6;">${notif.message.replace(/\n/g, '<br>')}</p>

        <a href="${dashboardUrl}" style="display:inline-block;background:#1a9a73;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;">
          Open Dashboard →
        </a>
      </div>

      <!-- Footer -->
      <div style="padding:16px 24px;background:#f8f8f9;border-top:1px solid #e2e2e6;">
        <p style="margin:0;font-size:11px;color:#a0a0ab;">
          Bloom Metabolics Clinical OS · ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} CT
          ${notif.source ? ` · Source: ${notif.source}` : ''}
        </p>
        <p style="margin:4px 0 0;font-size:11px;color:#a0a0ab;">
          This is an automated clinical notification. Do not reply to this email.
        </p>
      </div>
    </div>
  </div>
</body>
</html>`
}

// ── SMS Template ─────────────────────────────────────────────

function buildSmsBody(notif: PushNotification): string {
  const prefix = `[Nova ${notif.severity.toUpperCase()}]`
  const patient = notif.patientName ? ` | ${notif.patientName}` : ''
  const url = notif.actionUrl
    ? `\n${APP_URL}${notif.actionUrl}`
    : `\n${APP_URL}/clinic`

  // SMS max ~160 chars per segment, keep it tight
  let msg = `${prefix} ${notif.title}${patient}`
  if (msg.length > 120) msg = msg.slice(0, 117) + '...'
  return `${msg}${url}`
}
