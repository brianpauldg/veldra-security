import { v4 as uuid } from 'uuid';
import { query } from '../db/client.js';
import { createLogger } from '../logger.js';
import type { Agent, AgentStatus, JsonValue, UUID } from './types.js';

const log = createLogger({ module: 'agent-registry' });

// In-memory cache for hot path lookups
const agentCache = new Map<string, Agent>();

export async function registerAgent(params: {
  name: string;
  slug: string;
  description: string;
  version: string;
  config?: Record<string, JsonValue>;
  skillIds?: string[];
}): Promise<Agent> {
  const now = new Date().toISOString();
  const existing = await getAgentBySlug(params.slug);

  if (existing) {
    // Update version + config if re-registering
    await query(
      `UPDATE agents SET version = $1, config = $2, skill_ids = $3, updated_at = $4 WHERE slug = $5`,
      [params.version, JSON.stringify(params.config ?? {}), JSON.stringify(params.skillIds ?? []), now, params.slug]
    );
    const updated = { ...existing, version: params.version, config: params.config ?? {}, skillIds: params.skillIds ?? [], updatedAt: now };
    agentCache.set(params.slug, updated);
    log.info({ slug: params.slug, version: params.version }, 'Agent re-registered');
    return updated;
  }

  const id = uuid();
  const agent: Agent = {
    id,
    name: params.name,
    slug: params.slug,
    description: params.description,
    version: params.version,
    status: 'active',
    config: params.config ?? {},
    skillIds: params.skillIds ?? [],
    createdAt: now,
    updatedAt: now,
  };

  await query(
    `INSERT INTO agents (id, name, slug, description, version, status, config, skill_ids, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [id, agent.name, agent.slug, agent.description, agent.version, agent.status,
     JSON.stringify(agent.config), JSON.stringify(agent.skillIds), now, now]
  );

  agentCache.set(params.slug, agent);
  log.info({ slug: params.slug, id }, 'Agent registered');
  return agent;
}

export async function getAgentBySlug(slug: string): Promise<Agent | null> {
  if (agentCache.has(slug)) return agentCache.get(slug)!;

  const result = await query<any>('SELECT * FROM agents WHERE slug = $1', [slug]);
  if (result.rows.length === 0) return null;

  const agent = mapAgentRow(result.rows[0]);
  agentCache.set(slug, agent);
  return agent;
}

export async function listAgents(status?: AgentStatus): Promise<Agent[]> {
  const result = status
    ? await query<any>('SELECT * FROM agents WHERE status = $1 ORDER BY name', [status])
    : await query<any>('SELECT * FROM agents ORDER BY name');
  return result.rows.map(mapAgentRow);
}

export async function updateAgentStatus(slug: string, status: AgentStatus): Promise<void> {
  await query('UPDATE agents SET status = $1, updated_at = $2 WHERE slug = $3', [status, new Date().toISOString(), slug]);
  agentCache.delete(slug);
}

export function clearAgentCache(): void {
  agentCache.clear();
}

function mapAgentRow(row: any): Agent {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    version: row.version,
    status: row.status,
    config: row.config ?? {},
    skillIds: row.skill_ids ?? [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
