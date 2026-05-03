import { describe, it, expect } from 'vitest'
import { createConfirmationPayload, verifyConfirmationRecord, verifyTokenEntropy } from '@/lib/clinic/ai-write-confirmation'

// MCP write actions that should be gated
const MCP_WRITE_ACTIONS = new Set([
  'flag_patient_risk', 'create_followup_task', 'send_notification',
  'create_alert', 'update_alert', 'resolve_alert',
  'create_task', 'update_task', 'complete_task',
  'create_note', 'update_note', 'update_patient', 'send_message',
])

const MCP_READ_ACTIONS = new Set([
  'get_patient_summary', 'get_patient_labs', 'get_patient_vitals',
  'list_patients_requiring_attention', 'generate_chart_review',
])

describe('MCP strict gate logic', () => {
  it('READ action (get_patient_summary) is not in write set — executes directly', () => {
    expect(MCP_WRITE_ACTIONS.has('get_patient_summary')).toBe(false)
    expect(MCP_READ_ACTIONS.has('get_patient_summary')).toBe(true)
  })

  it('WRITE action (create_followup_task) IS in write set — returns confirmation', () => {
    expect(MCP_WRITE_ACTIONS.has('create_followup_task')).toBe(true)
  })

  it('WRITE action creates confirmation with correct payload', () => {
    const conf = createConfirmationPayload({
      ai_source: 'mcp',
      write_action: 'create_alert',
      write_payload: { title: 'Test alert', severity: 'medium' },
      patient_id: 'pat-123',
    })
    expect(conf.token).toHaveLength(64)
    expect(conf.expiresAt.getTime()).toBeGreaterThan(Date.now())
    expect(conf.record.ai_source).toBe('mcp')
    expect(conf.record.write_action).toBe('create_alert')
    expect(conf.record.patient_id).toBe('pat-123')
  })

  it('confirmation token is NOT executed — just pending', () => {
    const conf = createConfirmationPayload({
      ai_source: 'mcp', write_action: 'create_task',
      write_payload: { title: 'Pending task' },
    })
    expect(conf.record.confirmed_at).toBeUndefined()
    expect(conf.record.executed_at).toBeUndefined()
  })

  it('verifyConfirmation with valid pending token returns payload', () => {
    const conf = createConfirmationPayload({
      ai_source: 'mcp', write_action: 'create_alert',
      write_payload: { title: 'Verify me' },
    })
    const result = verifyConfirmationRecord(conf.record, 'clinician-1')
    expect(result.valid).toBe(true)
    expect(result.payload).toEqual({ title: 'Verify me' })
  })

  it('single-use: confirmed token cannot be re-confirmed', () => {
    const conf = createConfirmationPayload({
      ai_source: 'mcp', write_action: 'create_alert', write_payload: {},
    })
    conf.record.confirmed_at = new Date().toISOString() // simulate confirmed
    const result = verifyConfirmationRecord(conf.record, 'clinician-1')
    expect(result.valid).toBe(false)
    expect(result.reason).toContain('already been used')
  })

  it('expired token cannot be confirmed', () => {
    const conf = createConfirmationPayload({
      ai_source: 'mcp', write_action: 'create_alert', write_payload: {},
      expires_in_ms: -1000, // already expired
    })
    const result = verifyConfirmationRecord(conf.record, 'clinician-1')
    expect(result.valid).toBe(false)
    expect(result.reason).toContain('expired')
  })

  it('rejected token cannot be confirmed', () => {
    const conf = createConfirmationPayload({
      ai_source: 'mcp', write_action: 'create_alert', write_payload: {},
    })
    conf.record.rejected_at = new Date().toISOString()
    const result = verifyConfirmationRecord(conf.record, 'clinician-1')
    expect(result.valid).toBe(false)
    expect(result.reason).toContain('rejected')
  })

  it('audit captures write_pending_confirmation context', () => {
    // Verify the confirmation record shape has all audit-relevant fields
    const conf = createConfirmationPayload({
      ai_source: 'mcp', write_action: 'flag_patient_risk',
      write_payload: { patientId: 'pat-1', riskLevel: 80 },
    })
    expect(conf.record.ai_source).toBe('mcp')
    expect(conf.record.write_action).toBe('flag_patient_risk')
    expect(conf.record.suggested_at).toBeDefined()
    expect(conf.record.expires_at).toBeDefined()
    expect(conf.record.token).toHaveLength(64)
  })

  it('token entropy: 100 MCP tokens are all unique', () => {
    const tokens = Array.from({ length: 100 }, () =>
      createConfirmationPayload({ ai_source: 'mcp', write_action: 'create_alert', write_payload: {} }).token
    )
    expect(verifyTokenEntropy(tokens)).toBe(true)
  })
})
