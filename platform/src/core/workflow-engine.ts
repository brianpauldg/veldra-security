import { v4 as uuid } from 'uuid';
import { query, transaction } from '../db/client.js';
import { createLogger } from '../logger.js';
import { writeAudit } from './audit.js';
import { checkApproval, getApproval } from './approval-gate.js';
// dispatcher imported by callers, not needed here directly
import type { JsonValue, StepResult, UUID, Workflow, WorkflowRun, WorkflowStatus, WorkflowStep } from './types.js';

const log = createLogger({ module: 'workflow-engine' });

// Workflow registry (in-memory, loaded at boot)
const workflows = new Map<string, Workflow>();

export function registerWorkflow(workflow: Workflow): void {
  workflows.set(workflow.slug, workflow);
  log.info({ slug: workflow.slug, steps: workflow.steps.length }, 'Workflow registered');
}

export function getWorkflow(slug: string): Workflow | null {
  return workflows.get(slug) ?? null;
}

/**
 * Start a new workflow run.
 */
export async function startRun(
  workflowSlug: string,
  triggeredBy: WorkflowRun['triggeredBy'],
  triggerData: Record<string, JsonValue>
): Promise<WorkflowRun> {
  const workflow = workflows.get(workflowSlug);
  if (!workflow) throw new Error(`Unknown workflow: ${workflowSlug}`);

  const id = uuid();
  const now = new Date().toISOString();
  const firstStep = workflow.steps[0];

  const run: WorkflowRun = {
    id,
    workflowSlug,
    status: 'running',
    triggeredBy,
    triggerData,
    currentStepKey: firstStep?.key ?? null,
    stepResults: {},
    error: null,
    startedAt: now,
    completedAt: null,
    createdAt: now,
  };

  await query(
    `INSERT INTO workflow_runs (id, workflow_slug, status, triggered_by, trigger_data, current_step_key, step_results, started_at, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [id, workflowSlug, 'running', triggeredBy, JSON.stringify(triggerData),
     firstStep?.key ?? null, JSON.stringify({}), now, now]
  );

  await writeAudit({
    entityType: 'workflow_run',
    entityId: id,
    action: 'run_started',
    actor: 'system',
    after: { workflowSlug, triggeredBy, triggerData } as Record<string, JsonValue>,
  });

  log.info({ runId: id, workflow: workflowSlug, triggeredBy }, 'Workflow run started');
  return run;
}

/**
 * Record a step result and advance the workflow.
 */
export async function completeStep(
  runId: UUID,
  stepKey: string,
  result: StepResult
): Promise<{ nextStep: WorkflowStep | null; run: WorkflowRun }> {
  const run = await getRun(runId);
  if (!run) throw new Error(`Run not found: ${runId}`);

  const workflow = workflows.get(run.workflowSlug);
  if (!workflow) throw new Error(`Workflow not found: ${run.workflowSlug}`);

  // Update step results
  run.stepResults[stepKey] = result;

  // Find next step
  const currentIndex = workflow.steps.findIndex((s) => s.key === stepKey);
  const nextStep = currentIndex < workflow.steps.length - 1 ? workflow.steps[currentIndex + 1] : null;

  // Determine run status
  let newStatus: WorkflowStatus = 'running';
  if (result.status === 'failed' && workflow.steps[currentIndex]?.onFailure === 'fail_workflow') {
    newStatus = 'failed';
  } else if (!nextStep) {
    newStatus = 'completed';
  }

  const now = new Date().toISOString();
  await query(
    `UPDATE workflow_runs SET status = $1, current_step_key = $2, step_results = $3, completed_at = $4 WHERE id = $5`,
    [newStatus, nextStep?.key ?? null, JSON.stringify(run.stepResults), newStatus !== 'running' ? now : null, runId]
  );

  run.status = newStatus;
  run.currentStepKey = nextStep?.key ?? null;
  if (newStatus !== 'running') run.completedAt = now;

  await writeAudit({
    entityType: 'workflow_run',
    entityId: runId,
    action: `step_${result.status}`,
    actor: 'system',
    metadata: { stepKey, durationMs: result.durationMs } as Record<string, JsonValue>,
  });

  log.info({ runId, stepKey, status: result.status, nextStep: nextStep?.key ?? 'none' }, 'Step completed');
  return { nextStep, run };
}

/**
 * Fail the entire workflow run.
 */
export async function failRun(runId: UUID, error: string): Promise<void> {
  const now = new Date().toISOString();
  await query(
    `UPDATE workflow_runs SET status = 'failed', error = $1, completed_at = $2 WHERE id = $3`,
    ['failed', error, now, runId]
  );

  await writeAudit({
    entityType: 'workflow_run',
    entityId: runId,
    action: 'run_failed',
    actor: 'system',
    metadata: { error } as Record<string, JsonValue>,
  });

  log.error({ runId, error }, 'Workflow run failed');
}

export async function getRun(id: UUID): Promise<WorkflowRun | null> {
  const result = await query<any>('SELECT * FROM workflow_runs WHERE id = $1', [id]);
  return result.rows.length > 0 ? mapRunRow(result.rows[0]) : null;
}

export async function getRecentRuns(limit = 50): Promise<WorkflowRun[]> {
  const result = await query<any>(
    'SELECT * FROM workflow_runs ORDER BY created_at DESC LIMIT $1',
    [limit]
  );
  return result.rows.map(mapRunRow);
}

function mapRunRow(row: any): WorkflowRun {
  return {
    id: row.id,
    workflowSlug: row.workflow_slug,
    status: row.status,
    triggeredBy: row.triggered_by,
    triggerData: row.trigger_data ?? {},
    currentStepKey: row.current_step_key,
    stepResults: row.step_results ?? {},
    error: row.error,
    startedAt: row.started_at,
    completedAt: row.completed_at,
    createdAt: row.created_at,
  };
}
