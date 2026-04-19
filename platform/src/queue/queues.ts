import { Queue } from 'bullmq';
import { getRedis } from './connection.js';

// ── Queue Names ──
export const QUEUE_NAMES = {
  LEAD_INTAKE: 'lead:intake',
  LEAD_NORMALIZE: 'lead:normalize',
  LEAD_QUALIFY: 'lead:qualify',
  LEAD_ROUTE: 'lead:route',
  APPROVAL_CHECK: 'approval:check',
  OUTREACH_GENERATE: 'outreach:generate',
  OUTREACH_SEND: 'outreach:send',
  BOOKING_HANDOFF: 'booking:handoff',
  WORKFLOW_STEP: 'workflow:step',
  DEAD_LETTER: 'dead-letter',
} as const;

export type QueueName = (typeof QUEUE_NAMES)[keyof typeof QUEUE_NAMES];

const queues = new Map<string, Queue>();

export function getQueue(name: QueueName): Queue {
  if (!queues.has(name)) {
    queues.set(
      name,
      new Queue(name, {
        connection: getRedis(),
        defaultJobOptions: {
          removeOnComplete: { age: 7 * 24 * 3600, count: 10000 },
          removeOnFail: { age: 30 * 24 * 3600, count: 50000 },
          attempts: 3,
          backoff: { type: 'exponential', delay: 2000 },
        },
      })
    );
  }
  return queues.get(name)!;
}

export async function closeQueues(): Promise<void> {
  for (const q of queues.values()) {
    await q.close();
  }
  queues.clear();
}
