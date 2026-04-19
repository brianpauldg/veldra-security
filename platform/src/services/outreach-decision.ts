import { v4 as uuid } from 'uuid';
import { query } from '../db/client.js';
import { createLogger } from '../logger.js';
import { writeAudit } from '../core/audit.js';
import { checkApproval } from '../core/approval-gate.js';
import { mapLeadRow } from './lead-intake.js';
import type { Lead, LeadQualification, OutreachDecision, ApprovalPolicy, JsonValue, UUID } from '../core/types.js';

const log = createLogger({ module: 'outreach-decision' });

// Outreach requires approval for first contact
const OUTREACH_APPROVAL_POLICY: ApprovalPolicy = {
  type: 'auto_after_delay',
  autoApproveAfterMs: 30 * 60 * 1000, // auto-approve after 30 min if no operator action
  requiredRole: 'operator',
};

export interface OutreachResult {
  decision: OutreachDecision;
  approvalRequired: boolean;
  approvalId: UUID | null;
}

/**
 * Generate compliant outreach decision based on qualification.
 */
export async function generateOutreach(
  leadId: UUID,
  qualificationId: UUID,
  runId: UUID
): Promise<OutreachResult> {
  // Load lead + qualification
  const leadResult = await query<any>('SELECT * FROM leads WHERE id = $1', [leadId]);
  if (leadResult.rows.length === 0) throw new Error(`Lead not found: ${leadId}`);
  const lead = mapLeadRow(leadResult.rows[0]);

  const qualResult = await query<any>('SELECT * FROM lead_qualifications WHERE id = $1', [qualificationId]);
  if (qualResult.rows.length === 0) throw new Error(`Qualification not found: ${qualificationId}`);
  const qualification = mapQualRow(qualResult.rows[0]);

  // Consent gate: do not generate outreach without consent
  if (lead.consentStatus !== 'opted_in') {
    log.warn({ leadId, consentStatus: lead.consentStatus }, 'Cannot generate outreach — consent not opted in');

    const holdDecision = createHoldDecision(lead, runId, 'Consent not confirmed — outreach held');
    await persistDecision(holdDecision);

    return { decision: holdDecision, approvalRequired: false, approvalId: null };
  }

  // Generate message based on routing
  const message = generateMessage(lead, qualification);

  const decisionId = uuid();
  const now = new Date().toISOString();

  const decision: OutreachDecision = {
    id: decisionId,
    leadId,
    workflowRunId: runId,
    channel: message.channel,
    messageType: message.type,
    subject: message.subject,
    body: message.body,
    ctaText: message.ctaText,
    ctaUrl: message.ctaUrl,
    approvalId: null,
    approved: false,
    sentAt: null,
    createdAt: now,
  };

  // Check approval requirement
  const approval = await checkApproval({
    workflowRunId: runId,
    stepKey: 'outreach_send',
    policy: OUTREACH_APPROVAL_POLICY,
    context: {
      leadId,
      leadEmail: lead.email,
      leadName: `${lead.firstName} ${lead.lastName}`,
      channel: message.channel,
      messageType: message.type,
      subject: message.subject ?? '',
      bodyPreview: message.body.slice(0, 200),
      score: qualification.score,
      segment: qualification.segment,
    } as Record<string, JsonValue>,
  });

  if (approval) {
    decision.approvalId = approval.id;
  } else {
    decision.approved = true;
  }

  await persistDecision(decision);

  await writeAudit({
    entityType: 'outreach',
    entityId: decisionId,
    action: 'outreach_generated',
    actor: 'content',
    after: {
      channel: message.channel,
      messageType: message.type,
      approvalRequired: !!approval,
    } as Record<string, JsonValue>,
    metadata: { runId, leadId, qualificationId } as Record<string, JsonValue>,
  });

  log.info({ leadId, channel: message.channel, approvalRequired: !!approval }, 'Outreach decision generated');

  return {
    decision,
    approvalRequired: !!approval,
    approvalId: approval?.id ?? null,
  };
}

// ── Message Generation ──

interface GeneratedMessage {
  type: string;
  channel: 'email' | 'sms';
  subject: string | null;
  body: string;
  ctaText: string;
  ctaUrl: string;
}

function generateMessage(lead: Lead, qual: LeadQualification): GeneratedMessage {
  const firstName = lead.firstName;
  const interest = qual.primaryInterest === 'trt' ? 'testosterone optimization'
    : qual.primaryInterest === 'glp1' ? 'medical weight management'
    : 'health optimization';

  if (qual.nextAction === 'book_consult') {
    return {
      type: 'welcome_book_consult',
      channel: 'email',
      subject: `${firstName}, your ${interest} consultation is ready`,
      body: `Hi ${firstName},\n\nThank you for your interest in ${interest} with Bloom Metabolics. Based on your profile, you may be a great candidate for our program.\n\nOur board-certified providers specialize in personalized treatment plans tailored to your goals. Many patients commonly report improved energy, focus, and overall well-being.\n\nBook your free consultation to discuss your options with a licensed provider.\n\nIndividual results vary. This is not a guarantee of any specific outcome.\n\nBest,\nBloom Metabolics Team`,
      ctaText: 'Book Free Consultation',
      ctaUrl: 'https://bloommetabolics.com/booking',
    };
  }

  if (qual.nextAction === 'nurture_sequence') {
    return {
      type: 'welcome_nurture',
      channel: 'email',
      subject: `Welcome to Bloom Metabolics, ${firstName}`,
      body: `Hi ${firstName},\n\nWelcome to Bloom Metabolics. We're glad you're exploring ${interest}.\n\nOver the next few days, we'll share some helpful information about how our programs work, what to expect, and how our providers may be able to help you reach your health goals.\n\nIf you have questions at any time, our team is here to help.\n\nIndividual results vary. All treatments require provider evaluation.\n\nBest,\nBloom Metabolics Team`,
      ctaText: 'Learn More',
      ctaUrl: 'https://bloommetabolics.com/how-it-works',
    };
  }

  // Default: informational
  return {
    type: 'welcome_general',
    channel: 'email',
    subject: `Welcome to Bloom Metabolics, ${firstName}`,
    body: `Hi ${firstName},\n\nThank you for your interest in Bloom Metabolics. A member of our team will be in touch to discuss how we can help you with your health goals.\n\nBest,\nBloom Metabolics Team`,
    ctaText: 'Visit Bloom Metabolics',
    ctaUrl: 'https://bloommetabolics.com',
  };
}

function createHoldDecision(lead: Lead, runId: UUID, reason: string): OutreachDecision {
  return {
    id: uuid(),
    leadId: lead.id,
    workflowRunId: runId,
    channel: 'email',
    messageType: 'hold',
    subject: null,
    body: reason,
    ctaText: '',
    ctaUrl: '',
    approvalId: null,
    approved: false,
    sentAt: null,
    createdAt: new Date().toISOString(),
  };
}

async function persistDecision(decision: OutreachDecision): Promise<void> {
  await query(
    `INSERT INTO outreach_decisions (id, lead_id, workflow_run_id, channel, message_type, subject, body, cta_text, cta_url, approval_id, approved, sent_at, created_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
    [decision.id, decision.leadId, decision.workflowRunId, decision.channel,
     decision.messageType, decision.subject, decision.body, decision.ctaText,
     decision.ctaUrl, decision.approvalId, decision.approved, decision.sentAt, decision.createdAt]
  );
}

function mapQualRow(row: any): LeadQualification {
  return {
    id: row.id,
    leadId: row.lead_id,
    score: row.score,
    segment: row.segment,
    primaryInterest: row.primary_interest,
    symptoms: row.symptoms ?? [],
    disqualifiers: row.disqualifiers ?? [],
    nextAction: row.next_action,
    reasoning: row.reasoning,
    qualifiedBy: row.qualified_by,
    workflowRunId: row.workflow_run_id,
    createdAt: row.created_at,
  };
}
