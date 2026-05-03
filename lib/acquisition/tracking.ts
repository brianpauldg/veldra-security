/**
 * Bloom Metabolics — Server-Side Conversion Event Tracking
 * Persists to Supabase (conversion_events + lead_attribution).
 * Falls back to in-memory when Supabase is unavailable.
 */

import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { logAudit } from '@/lib/clinic/audit'
import { redactPHI } from '@/lib/clinic/phi-redaction'

export interface ConversionEvent {
  event_type: string
  lead_id?: string
  patient_id?: string
  session_id?: string
  event_data?: Record<string, unknown>
  source?: string
  medium?: string
  campaign?: string
  content?: string
  term?: string
  referrer?: string
  landing_page?: string
}

export interface Touchpoint {
  source?: string
  medium?: string
  campaign?: string
  content?: string
  term?: string
  landing_page?: string
  at: string
}

// In-memory fallback when Supabase is unavailable
const eventStore: ConversionEvent[] = []
const touchpointStore: Map<string, Touchpoint[]> = new Map()

export async function trackEvent(event: ConversionEvent): Promise<void> {
  // Redact PHI from event_data
  if (event.event_data) {
    event.event_data = redactPHI(event.event_data, 'permissive')
  }

  const sb = getSupabaseAdmin()
  if (sb) {
    await sb.from('conversion_events').insert({
      event_type: event.event_type,
      lead_id: event.lead_id || null,
      patient_id: event.patient_id || null,
      session_id: event.session_id || null,
      event_data: event.event_data || null,
      source: event.source || null,
      medium: event.medium || null,
      campaign: event.campaign || null,
      content: event.content || null,
      term: event.term || null,
      referrer: event.referrer || null,
      landing_page: event.landing_page || null,
    })
  } else {
    eventStore.push({ ...event })
  }

  logAudit({
    userId: 'system', userName: 'Tracking', userRole: 'super_admin',
    action: `conversion_event:${event.event_type}`,
    resourceType: 'conversion_events', resourceId: event.session_id || '',
    details: { event_type: event.event_type },
  })
}

export async function recordTouchpoint(sessionId: string, tp: Touchpoint): Promise<void> {
  const sb = getSupabaseAdmin()
  if (sb) {
    // Upsert lead_attribution — first touch preserved, last touch updated
    const { data: existing } = await sb
      .from('lead_attribution')
      .select('id, touchpoint_count, conversion_path')
      .eq('lead_id', sessionId)
      .single()

    if (existing) {
      const path = (existing.conversion_path as Touchpoint[] || [])
      path.push(tp)
      await sb.from('lead_attribution').update({
        last_touch_source: tp.source || null,
        last_touch_medium: tp.medium || null,
        last_touch_campaign: tp.campaign || null,
        last_touch_content: tp.content || null,
        last_touch_term: tp.term || null,
        last_touch_at: tp.at,
        last_touch_landing_page: tp.landing_page || null,
        touchpoint_count: (existing.touchpoint_count || 1) + 1,
        conversion_path: path,
        updated_at: new Date().toISOString(),
      }).eq('id', existing.id)
    } else {
      await sb.from('lead_attribution').insert({
        lead_id: sessionId,
        first_touch_source: tp.source || null,
        first_touch_medium: tp.medium || null,
        first_touch_campaign: tp.campaign || null,
        first_touch_content: tp.content || null,
        first_touch_term: tp.term || null,
        first_touch_at: tp.at,
        first_touch_landing_page: tp.landing_page || null,
        last_touch_source: tp.source || null,
        last_touch_medium: tp.medium || null,
        last_touch_campaign: tp.campaign || null,
        last_touch_content: tp.content || null,
        last_touch_term: tp.term || null,
        last_touch_at: tp.at,
        last_touch_landing_page: tp.landing_page || null,
        touchpoint_count: 1,
        conversion_path: [tp],
      })
    }
  } else {
    const existing = touchpointStore.get(sessionId) || []
    existing.push(tp)
    touchpointStore.set(sessionId, existing)
  }
}

export async function attributeLead(leadId: string, sessionId: string): Promise<{
  first_touch: Touchpoint | null
  last_touch: Touchpoint | null
  conversion_path: Touchpoint[]
  touchpoint_count: number
}> {
  const sb = getSupabaseAdmin()
  if (sb) {
    const { data } = await sb
      .from('lead_attribution')
      .select('*')
      .eq('lead_id', sessionId)
      .single()

    if (data) {
      return {
        first_touch: {
          source: data.first_touch_source,
          medium: data.first_touch_medium,
          campaign: data.first_touch_campaign,
          content: data.first_touch_content,
          term: data.first_touch_term,
          landing_page: data.first_touch_landing_page,
          at: data.first_touch_at,
        },
        last_touch: {
          source: data.last_touch_source,
          medium: data.last_touch_medium,
          campaign: data.last_touch_campaign,
          content: data.last_touch_content,
          term: data.last_touch_term,
          landing_page: data.last_touch_landing_page,
          at: data.last_touch_at,
        },
        conversion_path: data.conversion_path || [],
        touchpoint_count: data.touchpoint_count || 0,
      }
    }
  }

  // Fallback to in-memory
  const touchpoints = touchpointStore.get(sessionId) || []
  return {
    first_touch: touchpoints[0] || null,
    last_touch: touchpoints[touchpoints.length - 1] || null,
    conversion_path: touchpoints,
    touchpoint_count: touchpoints.length,
  }
}

export async function getLeadAttribution(leadId: string): Promise<Record<string, unknown> | null> {
  const sb = getSupabaseAdmin()
  if (sb) {
    const { data } = await sb
      .from('lead_attribution')
      .select('*')
      .eq('lead_id', leadId)
      .single()
    return data
  }
  return null
}
