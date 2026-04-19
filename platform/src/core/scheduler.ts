import { v4 as uuid } from 'uuid';
import { Queue } from 'bullmq';
import { getRedis } from '../queue/connection.js';
import { query } from '../db/client.js';
import { createLogger } from '../logger.js';
import { getQueue, QUEUE_NAMES } from '../queue/queues.js';
import type { JsonValue, Schedule, ScheduleType, UUID } from './types.js';

const log = createLogger({ module: 'scheduler' });

/**
 * Create or update a schedule.
 */
export async function upsertSchedule(params: {
  name: string;
  workflowSlug: string;
  type: ScheduleType;
  expression: string;
  input?: Record<string, JsonValue>;
  enabled?: boolean;
}): Promise<Schedule> {
  const now = new Date().toISOString();

  // Check existing
  const existing = await query<any>(
    'SELECT * FROM schedules WHERE name = $1',
    [params.name]
  );

  if (existing.rows.length > 0) {
    await query(
      `UPDATE schedules SET workflow_slug = $1, type = $2, expression = $3, input = $4, enabled = $5, updated_at = $6 WHERE name = $7`,
      [params.workflowSlug, params.type, params.expression, JSON.stringify(params.input ?? {}),
       params.enabled ?? true, now, params.name]
    );
    log.info({ name: params.name }, 'Schedule updated');
    return mapScheduleRow({ ...existing.rows[0], ...params, updated_at: now });
  }

  const id = uuid();
  await query(
    `INSERT INTO schedules (id, name, workflow_slug, type, expression, input, enabled, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [id, params.name, params.workflowSlug, params.type, params.expression,
     JSON.stringify(params.input ?? {}), params.enabled ?? true, now]
  );

  log.info({ name: params.name, type: params.type, expression: params.expression }, 'Schedule created');

  return {
    id,
    name: params.name,
    workflowSlug: params.workflowSlug,
    type: params.type,
    expression: params.expression,
    input: params.input ?? {},
    enabled: params.enabled ?? true,
    lastRunAt: null,
    nextRunAt: null,
    createdAt: now,
  };
}

/**
 * Set up BullMQ repeatable jobs for all enabled cron schedules.
 */
export async function syncSchedulesToQueues(): Promise<void> {
  const result = await query<any>(
    `SELECT * FROM schedules WHERE enabled = true AND type = 'cron'`
  );

  const queue = getQueue(QUEUE_NAMES.WORKFLOW_STEP);

  for (const row of result.rows) {
    const schedule = mapScheduleRow(row);
    await queue.add(
      `schedule:${schedule.name}`,
      { workflowSlug: schedule.workflowSlug, input: schedule.input, scheduleId: schedule.id },
      {
        repeat: { pattern: schedule.expression },
        jobId: `schedule:${schedule.id}`,
      }
    );
    log.debug({ name: schedule.name, cron: schedule.expression }, 'Cron schedule synced');
  }

  log.info({ count: result.rows.length }, 'All cron schedules synced');
}

export async function listSchedules(): Promise<Schedule[]> {
  const result = await query<any>('SELECT * FROM schedules ORDER BY name');
  return result.rows.map(mapScheduleRow);
}

export async function toggleSchedule(id: UUID, enabled: boolean): Promise<void> {
  await query('UPDATE schedules SET enabled = $1 WHERE id = $2', [enabled, id]);
}

function mapScheduleRow(row: any): Schedule {
  return {
    id: row.id,
    name: row.name,
    workflowSlug: row.workflow_slug,
    type: row.type,
    expression: row.expression,
    input: row.input ?? {},
    enabled: row.enabled,
    lastRunAt: row.last_run_at,
    nextRunAt: row.next_run_at,
    createdAt: row.created_at,
  };
}
