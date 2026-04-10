import type { CRMEvent, CRMEventType, LeadStage, ServiceInterest } from './types'

// ── Event Tracking System ─────────────────────────────────
// Centralized event bus for CRM, analytics, and automation hooks.
// Replace placeholder implementations with your CRM/analytics provider.

export function trackEvent(
  type: CRMEventType,
  data: Record<string, unknown> = {},
  leadId?: string
): void {
  const event: CRMEvent = {
    type,
    timestamp: new Date().toISOString(),
    data,
    leadId,
    sessionId: typeof window !== 'undefined' ? getSessionId() : undefined,
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Nova Event]', event)
  }

  // ── CRM Sync Placeholder ──
  // await fetch(process.env.CRM_API_URL + '/events', { ... })

  // ── Analytics Placeholder ──
  // window.gtag?.('event', type, data)
  // window.analytics?.track(type, data)
}

// ── Lifecycle Stage Updates ───────────────────────────────
export function updateLeadStage(leadId: string, stage: LeadStage, metadata?: Record<string, unknown>): void {
  trackEvent('stage_updated', { stage, ...metadata }, leadId)
  // Placeholder: POST to CRM API to update lead stage
}

// ── Automation Trigger Hooks ──────────────────────────────
// These functions represent automation triggers that would fire
// emails, SMS, or workflow actions in a connected CRM/email system.

export function triggerWelcomeEmail(email: string, firstName: string): void {
  trackEvent('lead_captured', { email, firstName, trigger: 'welcome_email' })
}

export function triggerBookingReminder(leadId: string, bookingDate: string): void {
  trackEvent('booking_completed', { bookingDate, trigger: 'booking_reminder' }, leadId)
}

export function triggerIntakeReminder(leadId: string): void {
  trackEvent('intake_started', { trigger: 'intake_reminder' }, leadId)
}

export function triggerAbandonedCheckout(email: string, service: ServiceInterest): void {
  trackEvent('checkout_abandoned', { email, service, trigger: 'abandoned_checkout' })
}

export function triggerPostConsultationFollowUp(leadId: string, service: ServiceInterest): void {
  trackEvent('consultation_started', { service, trigger: 'post_consultation_followup' }, leadId)
}

export function triggerNurtureSequence(email: string, segment: string): void {
  trackEvent('email_subscribed', { email, segment, trigger: 'nurture_sequence' })
}

export function triggerReactivationCampaign(leadId: string): void {
  trackEvent('stage_updated', { stage: 'reactivation_candidate', trigger: 'reactivation' }, leadId)
}

// ── Session ID ────────────────────────────────────────────
function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  let id = sessionStorage.getItem('nova_session_id')
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem('nova_session_id', id)
  }
  return id
}
