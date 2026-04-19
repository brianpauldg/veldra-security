import { v4 as uuid } from 'uuid';
import { query, transaction } from '../db/client.js';
import { createLogger } from '../logger.js';
import { writeAudit } from '../core/audit.js';
import type { Lead, WebhookLeadPayload, JsonValue, UUID } from '../core/types.js';

const log = createLogger({ module: 'lead-intake' });

export interface IntakeResult {
  lead: Lead;
  isDuplicate: boolean;
  merged: boolean;
}

/**
 * Process a raw lead payload:
 * 1. Normalize name/email/phone
 * 2. Check for duplicates (email + phone)
 * 3. Persist or merge
 * 4. Audit log
 */
export async function processIntake(payload: WebhookLeadPayload, runId: UUID): Promise<IntakeResult> {
  // Normalize
  const email = payload.email.toLowerCase().trim();
  const phone = normalizePhone(payload.phone);
  const firstName = normalizeName(payload.firstName);
  const lastName = normalizeName(payload.lastName);

  // Duplicate check
  const existing = await findDuplicate(email, phone);

  if (existing) {
    log.info({ email, existingId: existing.id }, 'Duplicate lead detected — merging');

    const merged = await mergeLead(existing, payload, runId);
    return { lead: merged, isDuplicate: true, merged: true };
  }

  // Consent check
  const consentStatus = payload.consent ? 'opted_in' : 'pending';

  // Create new lead
  const id = uuid();
  const now = new Date().toISOString();

  const lead: Lead = {
    id,
    externalId: payload.sourceId ?? null,
    firstName,
    lastName,
    email,
    phone,
    state: payload.state ?? null,
    age: payload.age ?? null,
    serviceInterest: payload.serviceInterest,
    status: 'normalized',
    score: null,
    segment: null,
    consentStatus,
    consentTimestamp: payload.consent ? now : null,
    sourceType: payload.source,
    sourceId: payload.sourceId ?? null,
    sourceAttribution: payload.attribution as Record<string, JsonValue>,
    goals: payload.goals ?? null,
    symptoms: payload.symptoms,
    disqualifiers: [],
    metadata: payload.metadata as Record<string, JsonValue>,
    createdAt: now,
    updatedAt: now,
  };

  await query(
    `INSERT INTO leads (id, external_id, first_name, last_name, email, phone, state, age,
     service_interest, status, consent_status, consent_timestamp, source_type, source_id,
     source_attribution, goals, symptoms, disqualifiers, metadata, created_at, updated_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)`,
    [id, lead.externalId, firstName, lastName, email, phone, lead.state, lead.age,
     lead.serviceInterest, 'normalized', consentStatus, lead.consentTimestamp,
     lead.sourceType, lead.sourceId, JSON.stringify(lead.sourceAttribution),
     lead.goals, JSON.stringify(lead.symptoms), JSON.stringify([]),
     JSON.stringify(lead.metadata), now, now]
  );

  // Log the lead event
  await query(
    `INSERT INTO lead_events (id, lead_id, event_type, data, created_at)
     VALUES ($1, $2, $3, $4, $5)`,
    [uuid(), id, 'lead_created', JSON.stringify({ source: payload.source, runId }), now]
  );

  await writeAudit({
    entityType: 'lead',
    entityId: id,
    action: 'lead_ingested',
    actor: 'system',
    after: { email, source: payload.source, consentStatus } as Record<string, JsonValue>,
    metadata: { runId } as Record<string, JsonValue>,
  });

  log.info({ leadId: id, email, source: payload.source }, 'New lead ingested');
  return { lead, isDuplicate: false, merged: false };
}

async function findDuplicate(email: string, phone: string | null): Promise<Lead | null> {
  // Primary: exact email match
  let result = await query<any>(
    'SELECT * FROM leads WHERE email = $1 ORDER BY created_at DESC LIMIT 1',
    [email]
  );

  if (result.rows.length > 0) return mapLeadRow(result.rows[0]);

  // Secondary: phone match (if available)
  if (phone) {
    result = await query<any>(
      'SELECT * FROM leads WHERE phone = $1 ORDER BY created_at DESC LIMIT 1',
      [phone]
    );
    if (result.rows.length > 0) return mapLeadRow(result.rows[0]);
  }

  return null;
}

async function mergeLead(existing: Lead, payload: WebhookLeadPayload, runId: UUID): Promise<Lead> {
  const now = new Date().toISOString();
  const updates: Record<string, unknown> = {};

  // Only fill in missing data, don't overwrite
  if (!existing.phone && payload.phone) updates.phone = normalizePhone(payload.phone);
  if (!existing.state && payload.state) updates.state = payload.state;
  if (!existing.age && payload.age) updates.age = payload.age;
  if (!existing.goals && payload.goals) updates.goals = payload.goals;
  if (payload.symptoms.length > 0) {
    const merged = [...new Set([...existing.symptoms, ...payload.symptoms])];
    updates.symptoms = JSON.stringify(merged);
  }

  // Merge source attribution
  const mergedAttribution = {
    ...existing.sourceAttribution,
    [`${payload.source}_${Date.now()}`]: payload.attribution,
  };
  updates.source_attribution = JSON.stringify(mergedAttribution);
  updates.updated_at = now;

  if (Object.keys(updates).length > 1) {
    const setClauses = Object.keys(updates).map((k, i) => `${k} = $${i + 2}`);
    const values = Object.values(updates);
    await query(
      `UPDATE leads SET ${setClauses.join(', ')} WHERE id = $1`,
      [existing.id, ...values]
    );
  }

  // Log merge event
  await query(
    `INSERT INTO lead_events (id, lead_id, event_type, data, created_at)
     VALUES ($1, $2, $3, $4, $5)`,
    [uuid(), existing.id, 'lead_merged', JSON.stringify({ source: payload.source, runId, updates: Object.keys(updates) }), now]
  );

  await writeAudit({
    entityType: 'lead',
    entityId: existing.id,
    action: 'lead_merged',
    actor: 'system',
    before: { email: existing.email, source: existing.sourceType } as Record<string, JsonValue>,
    after: { mergedFrom: payload.source, fieldsUpdated: Object.keys(updates) } as unknown as Record<string, JsonValue>,
    metadata: { runId } as Record<string, JsonValue>,
  });

  return { ...existing, ...updates } as Lead;
}

function normalizePhone(phone?: string): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return digits.length >= 10 ? `+${digits}` : null;
}

function normalizeName(name: string): string {
  return name.trim().replace(/\s+/g, ' ').split(' ').map(
    (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
  ).join(' ');
}

function mapLeadRow(row: any): Lead {
  return {
    id: row.id,
    externalId: row.external_id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    state: row.state,
    age: row.age,
    serviceInterest: row.service_interest,
    status: row.status,
    score: row.score,
    segment: row.segment,
    consentStatus: row.consent_status,
    consentTimestamp: row.consent_timestamp,
    sourceType: row.source_type,
    sourceId: row.source_id,
    sourceAttribution: row.source_attribution ?? {},
    goals: row.goals,
    symptoms: row.symptoms ?? [],
    disqualifiers: row.disqualifiers ?? [],
    metadata: row.metadata ?? {},
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export { mapLeadRow };
