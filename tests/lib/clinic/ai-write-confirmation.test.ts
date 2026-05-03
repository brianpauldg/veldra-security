import { describe, it, expect } from 'vitest'
import { createConfirmationPayload, verifyConfirmationRecord, verifyTokenEntropy } from '@/lib/clinic/ai-write-confirmation'

describe('ai-write-confirmation', () => {
  it('createConfirmation returns valid token + expiration', () => {
    const result = createConfirmationPayload({
      ai_source: 'agents', write_action: 'create_alert',
      write_payload: { title: 'Test alert' },
    })
    expect(result.token).toHaveLength(64) // 32 bytes hex
    expect(result.expiresAt.getTime()).toBeGreaterThan(Date.now())
    expect(result.record.ai_source).toBe('agents')
  })

  it('verifyConfirmation with valid record returns payload', () => {
    const { record } = createConfirmationPayload({
      ai_source: 'mcp', write_action: 'create_task',
      write_payload: { title: 'Test task' },
    })
    const result = verifyConfirmationRecord(record, 'clinician-1')
    expect(result.valid).toBe(true)
    expect(result.payload).toEqual({ title: 'Test task' })
  })

  it('verifyConfirmation with expired token rejects', () => {
    const { record } = createConfirmationPayload({
      ai_source: 'agents', write_action: 'create_alert',
      write_payload: {}, expires_in_ms: -1000, // already expired
    })
    const result = verifyConfirmationRecord(record, 'clinician-1')
    expect(result.valid).toBe(false)
    expect(result.reason).toContain('expired')
  })

  it('verifyConfirmation with already-confirmed token rejects', () => {
    const { record } = createConfirmationPayload({
      ai_source: 'agents', write_action: 'create_alert',
      write_payload: {},
    })
    record.confirmed_at = new Date().toISOString()
    const result = verifyConfirmationRecord(record, 'clinician-1')
    expect(result.valid).toBe(false)
    expect(result.reason).toContain('already been used')
  })

  it('verifyConfirmation with rejected token rejects', () => {
    const { record } = createConfirmationPayload({
      ai_source: 'agents', write_action: 'create_alert',
      write_payload: {},
    })
    record.rejected_at = new Date().toISOString()
    const result = verifyConfirmationRecord(record, 'clinician-1')
    expect(result.valid).toBe(false)
    expect(result.reason).toContain('rejected')
  })

  it('verifyConfirmation with already-executed token rejects', () => {
    const { record } = createConfirmationPayload({
      ai_source: 'agents', write_action: 'create_alert',
      write_payload: {},
    })
    record.executed_at = new Date().toISOString()
    const result = verifyConfirmationRecord(record, 'clinician-1')
    expect(result.valid).toBe(false)
    expect(result.reason).toContain('already been executed')
  })

  it('null record rejects', () => {
    const result = verifyConfirmationRecord(null, 'clinician-1')
    expect(result.valid).toBe(false)
    expect(result.reason).toContain('not found')
  })

  it('token entropy: 100 generated tokens are all unique', () => {
    const tokens = Array.from({ length: 100 }, () =>
      createConfirmationPayload({ ai_source: 'agents', write_action: 'create_alert', write_payload: {} }).token
    )
    expect(verifyTokenEntropy(tokens)).toBe(true)
  })
})
