import { v4 as uuid } from 'uuid';
import { query } from '../db/client.js';
import { createLogger } from '../logger.js';
import { writeAudit } from './audit.js';
import { getConfig } from '../config.js';
import type { Approval, ApprovalDecisionInput, ApprovalPolicy, ApprovalStatus, JsonValue, UUID } from './types.js';

const log = createLogger({ module: 'approval-gate' });

/**
 * Check if a step requires approval. If yes, create a pending approval and return it.
 * If no approval needed, returns null (caller proceeds immediately).
 */
export async function checkApproval(params: {
  workflowRunId: UUID;
  stepKey: string;
  policy: ApprovalPolicy | null;
  context: Record<string, JsonValue>;
}): Promise<Approval | null> {
  if (!params.policy) return null;

  const config = getConfig();
  const id = uuid();
  const now = new Date().toISOString();

  // Auto-approve-after-delay: set expiry
  let expiresAt: string | null = null;
  if (params.policy.type === 'auto_after_delay' && params.policy.autoApproveAfterMs) {
    expiresAt = new Date(Date.now() + params.policy.autoApproveAfterMs).toISOString();
  } else if (config.APPROVAL_DEFAULT_EXPIRY_MS > 0) {
    expiresAt = new Date(Date.now() + config.APPROVAL_DEFAULT_EXPIRY_MS).toISOString();
  }

  const approval: Approval = {
    id,
    workflowRunId: params.workflowRunId,
    stepKey: params.stepKey,
    status: 'pending',
    policyType: params.policy.type,
    context: params.context,
    decidedBy: null,
    reason: null,
    createdAt: now,
    decidedAt: null,
    expiresAt,
  };

  await query(
    `INSERT INTO approvals (id, workflow_run_id, step_key, status, policy_type, context, expires_at, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [id, approval.workflowRunId, approval.stepKey, 'pending', approval.policyType,
     JSON.stringify(approval.context), expiresAt, now]
  );

  await writeAudit({
    entityType: 'approval',
    entityId: id,
    action: 'approval_requested',
    actor: 'system',
    after: approval as unknown as Record<string, JsonValue>,
  });

  log.info({ approvalId: id, stepKey: params.stepKey, runId: params.workflowRunId }, 'Approval requested');
  return approval;
}

/**
 * Process an operator's decision on a pending approval.
 */
export async function decideApproval(input: ApprovalDecisionInput): Promise<Approval> {
  const now = new Date().toISOString();

  const result = await query<any>(
    'SELECT * FROM approvals WHERE id = $1 AND status = $2',
    [input.approvalId, 'pending']
  );

  if (result.rows.length === 0) {
    throw new Error(`No pending approval found: ${input.approvalId}`);
  }

  const before = result.rows[0];
  const newStatus: ApprovalStatus = input.decision === 'approved' ? 'approved' : 'rejected';

  await query(
    `UPDATE approvals SET status = $1, decided_by = $2, reason = $3, decided_at = $4 WHERE id = $5`,
    [newStatus, input.decidedBy, input.reason ?? null, now, input.approvalId]
  );

  const updated: Approval = {
    ...mapApprovalRow(before),
    status: newStatus,
    decidedBy: input.decidedBy,
    reason: input.reason ?? null,
    decidedAt: now,
  };

  await writeAudit({
    entityType: 'approval',
    entityId: input.approvalId,
    action: `approval_${newStatus}`,
    actor: input.decidedBy,
    before: before as Record<string, JsonValue>,
    after: updated as unknown as Record<string, JsonValue>,
  });

  log.info({ approvalId: input.approvalId, decision: newStatus, decidedBy: input.decidedBy }, 'Approval decided');
  return updated;
}

export async function getPendingApprovals(): Promise<Approval[]> {
  const result = await query<any>(
    `SELECT * FROM approvals WHERE status = 'pending' ORDER BY created_at ASC`
  );
  return result.rows.map(mapApprovalRow);
}

export async function getApproval(id: UUID): Promise<Approval | null> {
  const result = await query<any>('SELECT * FROM approvals WHERE id = $1', [id]);
  return result.rows.length > 0 ? mapApprovalRow(result.rows[0]) : null;
}

/**
 * Check and auto-approve expired auto_after_delay approvals.
 * Should be called on a periodic schedule.
 */
export async function processAutoApprovals(): Promise<number> {
  const now = new Date().toISOString();
  const result = await query<any>(
    `UPDATE approvals SET status = 'auto_approved', decided_by = 'system', decided_at = $1
     WHERE status = 'pending' AND policy_type = 'auto_after_delay' AND expires_at <= $1
     RETURNING id`,
    [now]
  );
  if (result.rowCount && result.rowCount > 0) {
    log.info({ count: result.rowCount }, 'Auto-approved expired approvals');
  }
  return result.rowCount ?? 0;
}

function mapApprovalRow(row: any): Approval {
  return {
    id: row.id,
    workflowRunId: row.workflow_run_id,
    stepKey: row.step_key,
    status: row.status,
    policyType: row.policy_type,
    context: row.context ?? {},
    decidedBy: row.decided_by,
    reason: row.reason,
    createdAt: row.created_at,
    decidedAt: row.decided_at,
    expiresAt: row.expires_at,
  };
}
