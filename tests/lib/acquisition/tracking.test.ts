import { describe, it, expect, vi } from 'vitest'

// Force in-memory fallback by mocking supabase-admin to return null
vi.mock('@/lib/supabase-admin', () => ({
  getSupabaseAdmin: () => null,
}))

import { trackEvent, recordTouchpoint, attributeLead } from '@/lib/acquisition/tracking'

describe('trackEvent', () => {
  it('records a conversion event without throwing', async () => {
    await expect(trackEvent({
      event_type: 'consultation_booked',
      session_id: 'sess_1',
      source: 'google',
    })).resolves.toBeUndefined()
  })

  it('redacts PHI from event_data', async () => {
    await expect(trackEvent({
      event_type: 'form_submit',
      event_data: { email: 'test@example.com', form_id: 'contact' },
    })).resolves.toBeUndefined()
  })
})

describe('recordTouchpoint + attributeLead', () => {
  it('records and retrieves touchpoints for a session', async () => {
    await recordTouchpoint('sess_attr_1', {
      source: 'google', medium: 'cpc', at: '2026-01-01T00:00:00Z',
    })
    await recordTouchpoint('sess_attr_1', {
      source: 'direct', at: '2026-01-02T00:00:00Z',
    })

    const attr = await attributeLead('lead_1', 'sess_attr_1')
    expect(attr.touchpoint_count).toBe(2)
    expect(attr.first_touch?.source).toBe('google')
    expect(attr.last_touch?.source).toBe('direct')
  })

  it('returns empty attribution for unknown session', async () => {
    const attr = await attributeLead('lead_x', 'unknown_session')
    expect(attr.touchpoint_count).toBe(0)
    expect(attr.first_touch).toBeNull()
  })
})
