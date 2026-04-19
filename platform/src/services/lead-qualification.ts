import { v4 as uuid } from 'uuid';
import { query } from '../db/client.js';
import { createLogger } from '../logger.js';
import { writeAudit } from '../core/audit.js';
import type { Lead, LeadQualification, LeadStatus, JsonValue, UUID } from '../core/types.js';
import { mapLeadRow } from './lead-intake.js';

const log = createLogger({ module: 'lead-qualification' });

// ── Licensed states for telehealth ──
const LICENSED_STATES = new Set([
  'AL','AZ','CA','CO','CT','FL','GA','ID','IL','IN','KS','KY','LA','MA','MD',
  'MI','MN','MO','MS','MT','NC','NE','NH','NJ','NM','NV','NY','OH','OK','OR',
  'PA','SC','SD','TN','TX','UT','VA','WA','WI','WV','WY'
]);

export interface QualificationResult {
  qualification: LeadQualification;
  routeTo: LeadStatus;
}

/**
 * Score and qualify a lead. Determines routing path.
 *
 * Scoring rubric (0-100):
 * - Email + phone provided: +15
 * - State provided and licensed: +15
 * - Age in target range: +15
 * - Clear service interest (not mixed): +10
 * - Goals provided: +10
 * - Symptoms match ICP: +20
 * - Consent opted in: +10
 * - No disqualifiers: +5
 */
export async function qualifyLead(leadId: UUID, runId: UUID): Promise<QualificationResult> {
  const result = await query<any>('SELECT * FROM leads WHERE id = $1', [leadId]);
  if (result.rows.length === 0) throw new Error(`Lead not found: ${leadId}`);

  const lead = mapLeadRow(result.rows[0]);

  // Run scoring
  let score = 0;
  const disqualifiers: string[] = [];
  const symptoms: string[] = lead.symptoms;

  // Contact completeness
  if (lead.email && lead.phone) score += 15;
  else if (lead.email) score += 8;

  // State licensing
  if (lead.state) {
    if (LICENSED_STATES.has(lead.state.toUpperCase())) {
      score += 15;
    } else {
      disqualifiers.push(`Unlicensed state: ${lead.state}`);
    }
  }

  // Age
  if (lead.age) {
    if (lead.serviceInterest === 'trt' && lead.age >= 25 && lead.age <= 60) score += 15;
    else if (lead.serviceInterest === 'glp1' && lead.age >= 25 && lead.age <= 65) score += 15;
    else if (lead.age >= 25 && lead.age <= 65) score += 10;
    if (lead.age < 18) disqualifiers.push('Under 18');
  }

  // Service interest clarity
  if (lead.serviceInterest !== 'mixed') score += 10;

  // Goals
  if (lead.goals && lead.goals.length > 10) score += 10;

  // Symptom match
  const icpSymptoms = ['fatigue', 'low energy', 'weight gain', 'low libido', 'brain fog', 'muscle loss', 'sleep'];
  const matchedSymptoms = symptoms.filter((s) =>
    icpSymptoms.some((icp) => s.toLowerCase().includes(icp))
  );
  score += Math.min(matchedSymptoms.length * 5, 20);

  // Consent
  if (lead.consentStatus === 'opted_in') score += 10;

  // No disqualifiers bonus
  if (disqualifiers.length === 0) score += 5;

  // Clamp
  score = Math.min(score, 100);

  // Segment
  const segment: 'HOT' | 'WARM' | 'COLD' = score >= 70 ? 'HOT' : score >= 40 ? 'WARM' : 'COLD';

  // Determine primary interest
  const primaryInterest = lead.serviceInterest === 'mixed' ? 'both' as const
    : lead.serviceInterest === 'peptides' ? 'both' as const
    : lead.serviceInterest as 'trt' | 'glp1';

  // Determine next action
  let nextAction: LeadQualification['nextAction'];
  let routeTo: LeadStatus;

  if (disqualifiers.length > 0) {
    nextAction = 'disqualify';
    routeTo = 'disqualified';
  } else if (score >= 70) {
    nextAction = 'book_consult';
    routeTo = 'book_now';
  } else if (score >= 40) {
    nextAction = 'nurture_sequence';
    routeTo = 'nurture';
  } else if (lead.consentStatus !== 'opted_in' || !lead.state) {
    nextAction = 'manual_review';
    routeTo = 'manual_review';
  } else {
    nextAction = 'nurture_sequence';
    routeTo = 'nurture';
  }

  // Build reasoning
  const reasoning = buildReasoning(score, segment, disqualifiers, matchedSymptoms, lead);

  // Persist qualification
  const qualId = uuid();
  const now = new Date().toISOString();

  const qualification: LeadQualification = {
    id: qualId,
    leadId,
    score,
    segment,
    primaryInterest,
    symptoms: matchedSymptoms,
    disqualifiers,
    nextAction,
    reasoning,
    qualifiedBy: 'qualifier',
    workflowRunId: runId,
    createdAt: now,
  };

  await query(
    `INSERT INTO lead_qualifications (id, lead_id, score, segment, primary_interest, symptoms, disqualifiers, next_action, reasoning, qualified_by, workflow_run_id, created_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
    [qualId, leadId, score, segment, primaryInterest, JSON.stringify(matchedSymptoms),
     JSON.stringify(disqualifiers), nextAction, reasoning, 'qualifier', runId, now]
  );

  // Update lead
  await query(
    `UPDATE leads SET status = $1, score = $2, segment = $3, disqualifiers = $4, updated_at = $5 WHERE id = $6`,
    [routeTo, score, segment, JSON.stringify(disqualifiers), now, leadId]
  );

  // Log event
  await query(
    `INSERT INTO lead_events (id, lead_id, event_type, data, created_at)
     VALUES ($1, $2, $3, $4, $5)`,
    [uuid(), leadId, 'lead_qualified', JSON.stringify({ score, segment, nextAction, runId }), now]
  );

  await writeAudit({
    entityType: 'lead',
    entityId: leadId,
    action: 'lead_qualified',
    actor: 'qualifier',
    after: { score, segment, nextAction, disqualifiers } as unknown as Record<string, JsonValue>,
    metadata: { runId, qualificationId: qualId } as Record<string, JsonValue>,
  });

  log.info({ leadId, score, segment, nextAction, runId }, 'Lead qualified');
  return { qualification, routeTo };
}

function buildReasoning(
  score: number,
  segment: string,
  disqualifiers: string[],
  matchedSymptoms: string[],
  lead: Lead
): string {
  const parts: string[] = [];
  parts.push(`Score: ${score}/100 (${segment})`);
  if (disqualifiers.length) parts.push(`Disqualifiers: ${disqualifiers.join(', ')}`);
  if (matchedSymptoms.length) parts.push(`ICP symptom matches: ${matchedSymptoms.join(', ')}`);
  parts.push(`Interest: ${lead.serviceInterest}`);
  if (lead.state) parts.push(`State: ${lead.state}`);
  if (lead.consentStatus !== 'opted_in') parts.push('Consent not confirmed');
  return parts.join('. ');
}
