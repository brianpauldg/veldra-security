/**
 * Bloom Metabolics — Medical Director Review Queue
 * Centralized compliance alert queue for flagged items requiring MD review.
 */

import { redactPHI } from './phi-redaction'
import { logAudit } from './audit'
import type { MedicalDirectorAlert, AlertType, AlertSeverityLevel } from './types/compliance'

// In-memory store for V1 — swap for Supabase in production
const alertStore: MedicalDirectorAlert[] = []

/**
 * Create a new alert in the review queue.
 * Summary MUST be PHI-redacted before calling this function.
 * Throws if summary contains PHI patterns.
 */
export function createReviewAlert(input: {
  alert_type: AlertType
  severity: AlertSeverityLevel
  patient_id?: string
  prescriber_id?: string
  triggered_by_id?: string
  triggered_by_type?: string
  summary: string
  details?: Record<string, unknown>
}): MedicalDirectorAlert {
  // Verify summary is redacted — check for common PHI patterns
  const phiPatterns = /\b[A-Z][a-z]+ [A-Z][a-z]+\b|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/
  if (phiPatterns.test(input.summary)) {
    throw new Error('Summary appears to contain PHI (name, email, or phone pattern). Redact before creating alert.')
  }

  const alert: MedicalDirectorAlert = {
    id: `mdr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    alert_type: input.alert_type,
    severity: input.severity,
    patient_id: input.patient_id,
    prescriber_id: input.prescriber_id,
    triggered_by_id: input.triggered_by_id,
    triggered_by_type: input.triggered_by_type,
    summary: input.summary,
    details: input.details ? redactPHI(input.details, 'permissive') : undefined,
    status: 'open',
    created_at: new Date().toISOString(),
  }

  alertStore.unshift(alert)

  logAudit({
    userId: 'system',
    userName: 'System',
    userRole: 'super_admin',
    action: 'review_alert_created',
    resourceType: 'medical_director_review_queue',
    resourceId: alert.id,
    details: { alert_type: input.alert_type, severity: input.severity },
  })

  return alert
}

/**
 * Get open alerts, optionally filtered by severity or type.
 */
export function getOpenAlerts(filters?: {
  severity?: AlertSeverityLevel
  alert_type?: AlertType
}): MedicalDirectorAlert[] {
  let results = alertStore.filter(a => a.status === 'open')
  if (filters?.severity) results = results.filter(a => a.severity === filters.severity)
  if (filters?.alert_type) results = results.filter(a => a.alert_type === filters.alert_type)
  return results
}

/**
 * Acknowledge an alert (marks as seen, not resolved).
 */
export function acknowledgeReviewAlert(alertId: string, userId: string): void {
  const alert = alertStore.find(a => a.id === alertId)
  if (!alert) throw new Error('Alert not found.')
  alert.status = 'acknowledged'
  alert.acknowledged_at = new Date().toISOString()
  alert.acknowledged_by = userId

  logAudit({
    userId, userName: userId, userRole: 'physician',
    action: 'review_alert_acknowledged', resourceType: 'medical_director_review_queue', resourceId: alertId,
    details: {},
  })
}

/**
 * Resolve an alert with notes.
 */
export function resolveReviewAlert(alertId: string, userId: string, resolutionNotes: string): void {
  if (!resolutionNotes || resolutionNotes.trim().length === 0) {
    throw new Error('Resolution notes are required.')
  }
  const alert = alertStore.find(a => a.id === alertId)
  if (!alert) throw new Error('Alert not found.')
  alert.status = 'resolved'
  alert.resolved_at = new Date().toISOString()
  alert.resolved_by = userId
  alert.resolution_notes = resolutionNotes

  logAudit({
    userId, userName: userId, userRole: 'physician',
    action: 'review_alert_resolved', resourceType: 'medical_director_review_queue', resourceId: alertId,
    details: { status: 'resolved' },
  })
}

/**
 * Dismiss an alert with reason.
 */
export function dismissReviewAlert(alertId: string, userId: string, reason: string): void {
  const alert = alertStore.find(a => a.id === alertId)
  if (!alert) throw new Error('Alert not found.')
  alert.status = 'dismissed'
  alert.resolved_at = new Date().toISOString()
  alert.resolved_by = userId
  alert.resolution_notes = reason

  logAudit({
    userId, userName: userId, userRole: 'physician',
    action: 'review_alert_dismissed', resourceType: 'medical_director_review_queue', resourceId: alertId,
    details: { status: 'dismissed' },
  })
}
