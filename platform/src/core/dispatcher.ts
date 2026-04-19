import { getQueue, QUEUE_NAMES, type QueueName } from '../queue/queues.js';
import { createLogger } from '../logger.js';
import type { JsonValue, UUID } from './types.js';

const log = createLogger({ module: 'dispatcher' });

export interface DispatchOptions {
  jobId?: string; // for idempotency
  delay?: number; // ms
  priority?: number; // lower = higher priority
  attempts?: number;
}

/**
 * Dispatch a job to a named queue. Central routing point for all work.
 */
export async function dispatch(
  queueName: QueueName,
  data: Record<string, JsonValue>,
  options: DispatchOptions = {}
): Promise<string> {
  const queue = getQueue(queueName);

  const job = await queue.add(queueName, data, {
    jobId: options.jobId,
    delay: options.delay,
    priority: options.priority,
    attempts: options.attempts,
  });

  log.info({ queue: queueName, jobId: job.id, dataKeys: Object.keys(data) }, 'Job dispatched');
  return job.id!;
}

/**
 * Dispatch the first step of the lead intake workflow.
 */
export async function dispatchLeadIntake(payload: Record<string, JsonValue>, idempotencyKey?: string): Promise<string> {
  return dispatch(QUEUE_NAMES.LEAD_INTAKE, payload, {
    jobId: idempotencyKey,
    priority: 1, // high priority
  });
}

/**
 * Dispatch lead qualification after intake.
 */
export async function dispatchQualification(leadId: UUID, runId: UUID): Promise<string> {
  return dispatch(QUEUE_NAMES.LEAD_QUALIFY, { leadId, runId } as Record<string, JsonValue>);
}

/**
 * Dispatch outreach generation after qualification.
 */
export async function dispatchOutreach(leadId: UUID, runId: UUID, qualificationId: UUID): Promise<string> {
  return dispatch(QUEUE_NAMES.OUTREACH_GENERATE, { leadId, runId, qualificationId } as Record<string, JsonValue>);
}

/**
 * Dispatch booking handoff for qualified leads.
 */
export async function dispatchBookingHandoff(leadId: UUID, runId: UUID, qualificationId: UUID): Promise<string> {
  return dispatch(QUEUE_NAMES.BOOKING_HANDOFF, { leadId, runId, qualificationId } as Record<string, JsonValue>);
}

/**
 * Move a failed job to the dead-letter queue for manual inspection.
 */
export async function dispatchToDeadLetter(
  originalQueue: string,
  jobData: Record<string, JsonValue>,
  error: string
): Promise<string> {
  return dispatch(QUEUE_NAMES.DEAD_LETTER, {
    originalQueue,
    jobData,
    error,
    failedAt: new Date().toISOString(),
  } as unknown as Record<string, JsonValue>);
}
