import { v4 as uuid } from 'uuid';
import { query } from '../db/client.js';
import { createLogger } from '../logger.js';
import { writeAudit } from '../core/audit.js';
import { getConfig } from '../config.js';
import { mapLeadRow } from './lead-intake.js';
import type { BookingIntent, JsonValue, UUID } from '../core/types.js';

const log = createLogger({ module: 'booking-handoff' });

export interface BookingResult {
  intent: BookingIntent;
  bookingUrl: string | null;
  ghlAppointmentCreated: boolean;
}

/**
 * Create a booking intent and attempt GHL calendar integration.
 * For HOT leads with book_consult action.
 */
export async function createBookingHandoff(
  leadId: UUID,
  qualificationId: UUID,
  runId: UUID
): Promise<BookingResult> {
  const config = getConfig();

  // Load lead
  const leadResult = await query<any>('SELECT * FROM leads WHERE id = $1', [leadId]);
  if (leadResult.rows.length === 0) throw new Error(`Lead not found: ${leadId}`);
  const lead = mapLeadRow(leadResult.rows[0]);

  const intentId = uuid();
  const now = new Date().toISOString();

  const intent: BookingIntent = {
    id: intentId,
    leadId,
    workflowRunId: runId,
    qualificationId,
    bookingType: 'immediate',
    preferredDate: null,
    ghlCalendarId: config.GHL_CALENDAR_ID || null,
    ghlAppointmentId: null,
    status: 'pending',
    handoffMethod: config.GHL_API_KEY ? 'ghl_api' : 'booking_link',
    createdAt: now,
  };

  let bookingUrl: string | null = null;
  let ghlCreated = false;

  // Try GHL API if configured
  if (config.GHL_API_KEY && config.GHL_CALENDAR_ID) {
    try {
      const ghlResult = await createGHLAppointment(lead, config);
      intent.ghlAppointmentId = ghlResult.appointmentId;
      intent.status = 'created';
      ghlCreated = true;
      bookingUrl = ghlResult.bookingUrl;
      log.info({ leadId, appointmentId: ghlResult.appointmentId }, 'GHL appointment created');
    } catch (err) {
      const error = err instanceof Error ? err.message : String(err);
      log.error({ leadId, error }, 'GHL appointment creation failed — falling back to booking link');
      intent.handoffMethod = 'booking_link';
    }
  }

  // Fallback: generate booking link
  if (!bookingUrl) {
    bookingUrl = generateBookingLink(lead, config);
  }

  // Persist
  await query(
    `INSERT INTO booking_intents (id, lead_id, workflow_run_id, qualification_id, booking_type,
     preferred_date, ghl_calendar_id, ghl_appointment_id, status, handoff_method, created_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
    [intentId, leadId, runId, qualificationId, intent.bookingType,
     intent.preferredDate, intent.ghlCalendarId, intent.ghlAppointmentId,
     intent.status, intent.handoffMethod, now]
  );

  // Update lead status
  await query(
    `UPDATE leads SET status = 'booked', updated_at = $1 WHERE id = $2 AND status = 'book_now'`,
    [now, leadId]
  );

  // Log event
  await query(
    `INSERT INTO lead_events (id, lead_id, event_type, data, created_at)
     VALUES ($1, $2, $3, $4, $5)`,
    [uuid(), leadId, 'booking_created', JSON.stringify({
      intentId, handoffMethod: intent.handoffMethod, ghlCreated, runId
    }), now]
  );

  await writeAudit({
    entityType: 'booking',
    entityId: intentId,
    action: 'booking_handoff_created',
    actor: 'system',
    after: {
      leadId,
      handoffMethod: intent.handoffMethod,
      ghlCreated,
      status: intent.status,
    } as Record<string, JsonValue>,
    metadata: { runId, qualificationId } as Record<string, JsonValue>,
  });

  log.info({ leadId, intentId, method: intent.handoffMethod, ghlCreated }, 'Booking handoff completed');
  return { intent, bookingUrl, ghlAppointmentCreated: ghlCreated };
}

// ── GHL Integration ──

async function createGHLAppointment(
  lead: { firstName: string; lastName: string; email: string; phone: string | null },
  config: { GHL_API_URL: string; GHL_API_KEY: string; GHL_CALENDAR_ID: string; GHL_LOCATION_ID: string }
): Promise<{ appointmentId: string; bookingUrl: string }> {
  const response = await fetch(`${config.GHL_API_URL}/calendars/${config.GHL_CALENDAR_ID}/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.GHL_API_KEY}`,
      'Version': '2021-07-28',
    },
    body: JSON.stringify({
      locationId: config.GHL_LOCATION_ID,
      calendarId: config.GHL_CALENDAR_ID,
      contactId: null, // will be created/matched by GHL
      firstName: lead.firstName,
      lastName: lead.lastName,
      email: lead.email,
      phone: lead.phone,
      title: `Consultation - ${lead.firstName} ${lead.lastName}`,
      appointmentStatus: 'new',
    }),
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GHL API ${response.status}: ${body}`);
  }

  const data = await response.json() as any;
  return {
    appointmentId: data.id ?? data.appointmentId,
    bookingUrl: data.bookingUrl ?? `https://bloommetabolics.com/booking?ref=${data.id}`,
  };
}

function generateBookingLink(
  lead: { firstName: string; email: string; serviceInterest: string },
  config: { GHL_CALENDAR_ID: string }
): string {
  const params = new URLSearchParams({
    name: lead.firstName,
    email: lead.email,
    service: lead.serviceInterest,
  });
  if (config.GHL_CALENDAR_ID) params.set('calendar', config.GHL_CALENDAR_ID);
  return `https://bloommetabolics.com/booking?${params.toString()}`;
}
