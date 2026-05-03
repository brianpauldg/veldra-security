import { describe, it, expect } from 'vitest'
import { createReviewAlert, getOpenAlerts, acknowledgeReviewAlert, resolveReviewAlert, dismissReviewAlert } from '@/lib/clinic/review-queue'

describe('review-queue', () => {
  it('createAlert with PHI in summary throws', () => {
    expect(() => createReviewAlert({
      alert_type: 'compounded_rx_flagged',
      severity: 'high',
      summary: 'John Smith has a flagged prescription for semaglutide',
    })).toThrow('PHI')
  })

  it('createAlert with redacted summary persists', () => {
    const alert = createReviewAlert({
      alert_type: 'compounded_rx_flagged',
      severity: 'high',
      summary: 'Patient [REDACTED] has a flagged compounded Rx justification for semaglutide.',
      patient_id: 'pat-1',
    })
    expect(alert.id).toBeDefined()
    expect(alert.status).toBe('open')
    expect(alert.severity).toBe('high')
  })

  it('getOpenAlerts filters by severity', () => {
    createReviewAlert({ alert_type: 'cures_outage', severity: 'critical', summary: 'CURES system outage detected.' })
    const critical = getOpenAlerts({ severity: 'critical' })
    expect(critical.length).toBeGreaterThanOrEqual(1)
    expect(critical.every(a => a.severity === 'critical')).toBe(true)
  })

  it('acknowledgeAlert updates status', () => {
    const alert = createReviewAlert({ alert_type: 'credential_expiring', severity: 'medium', summary: 'Provider credential expiring in 30 days.' })
    acknowledgeReviewAlert(alert.id, 'doc-1')
    const open = getOpenAlerts()
    expect(open.find(a => a.id === alert.id)).toBeUndefined() // no longer open
  })

  it('resolveAlert requires resolution_notes', () => {
    const alert = createReviewAlert({ alert_type: 'other', severity: 'low', summary: 'Routine compliance check.' })
    expect(() => resolveReviewAlert(alert.id, 'doc-1', '')).toThrow('Resolution notes')
  })

  it('dismissAlert persists dismissal', () => {
    const alert = createReviewAlert({ alert_type: 'other', severity: 'low', summary: 'Test alert for dismissal.' })
    dismissReviewAlert(alert.id, 'doc-1', 'False positive')
    const open = getOpenAlerts()
    expect(open.find(a => a.id === alert.id)).toBeUndefined()
  })
})
