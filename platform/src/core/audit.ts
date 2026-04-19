import { v4 as uuid } from 'uuid';
import { query } from '../db/client.js';
import { createLogger } from '../logger.js';
import type { AuditEntry, JsonValue, UUID } from './types.js';

const log = createLogger({ module: 'audit' });

export async function writeAudit(params: {
  entityType: AuditEntry['entityType'];
  entityId: UUID;
  action: string;
  actor: string;
  before?: Record<string, JsonValue> | null;
  after?: Record<string, JsonValue> | null;
  metadata?: Record<string, JsonValue>;
}): Promise<UUID> {
  const id = uuid();
  const now = new Date().toISOString();

  await query(
    `INSERT INTO audit_log (id, entity_type, entity_id, action, actor, before_state, after_state, metadata, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [
      id,
      params.entityType,
      params.entityId,
      params.action,
      params.actor,
      params.before ? JSON.stringify(params.before) : null,
      params.after ? JSON.stringify(params.after) : null,
      JSON.stringify(params.metadata ?? {}),
      now,
    ]
  );

  log.debug({ id, entityType: params.entityType, action: params.action }, 'Audit entry written');
  return id;
}

export async function getAuditTrail(entityType: string, entityId: UUID): Promise<AuditEntry[]> {
  const result = await query<any>(
    `SELECT * FROM audit_log WHERE entity_type = $1 AND entity_id = $2 ORDER BY created_at ASC`,
    [entityType, entityId]
  );

  return result.rows.map(mapAuditRow);
}

export async function getRecentAudit(limit = 50): Promise<AuditEntry[]> {
  const result = await query<any>(
    `SELECT * FROM audit_log ORDER BY created_at DESC LIMIT $1`,
    [limit]
  );
  return result.rows.map(mapAuditRow);
}

function mapAuditRow(row: any): AuditEntry {
  return {
    id: row.id,
    entityType: row.entity_type,
    entityId: row.entity_id,
    action: row.action,
    actor: row.actor,
    before: row.before_state,
    after: row.after_state,
    metadata: row.metadata ?? {},
    createdAt: row.created_at,
  };
}
