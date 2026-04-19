import { query } from '../db/client.js';
import { createLogger } from '../logger.js';
import type { SkillDefinition, UUID } from '../core/types.js';

const log = createLogger({ module: 'skill-registry' });

const skillCache = new Map<string, SkillDefinition>();

export async function registerSkill(skill: SkillDefinition): Promise<void> {
  const now = new Date().toISOString();

  await query(
    `INSERT INTO skills (id, name, version, description, agent_slug, permission_tier, input_schema, output_schema, requires_approval, sandboxed, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
     ON CONFLICT (id) DO UPDATE SET version = $3, description = $4, permission_tier = $6, input_schema = $7, output_schema = $8, requires_approval = $9, sandboxed = $10`,
    [skill.id, skill.name, skill.version, skill.description, skill.agentSlug,
     skill.permissionTier, JSON.stringify(skill.inputSchema), JSON.stringify(skill.outputSchema),
     skill.requiresApproval, skill.sandboxed, now]
  );

  skillCache.set(skill.id, skill);
  log.info({ skillId: skill.id, name: skill.name, version: skill.version }, 'Skill registered');
}

export async function getSkill(id: string): Promise<SkillDefinition | null> {
  if (skillCache.has(id)) return skillCache.get(id)!;

  const result = await query<any>('SELECT * FROM skills WHERE id = $1', [id]);
  if (result.rows.length === 0) return null;

  const skill = mapSkillRow(result.rows[0]);
  skillCache.set(id, skill);
  return skill;
}

export async function listSkills(agentSlug?: string): Promise<SkillDefinition[]> {
  const result = agentSlug
    ? await query<any>('SELECT * FROM skills WHERE agent_slug = $1 ORDER BY name', [agentSlug])
    : await query<any>('SELECT * FROM skills ORDER BY name');
  return result.rows.map(mapSkillRow);
}

export async function listSkillsByTier(tier: string): Promise<SkillDefinition[]> {
  const result = await query<any>('SELECT * FROM skills WHERE permission_tier = $1 ORDER BY name', [tier]);
  return result.rows.map(mapSkillRow);
}

function mapSkillRow(row: any): SkillDefinition {
  return {
    id: row.id,
    name: row.name,
    version: row.version,
    description: row.description,
    agentSlug: row.agent_slug,
    permissionTier: row.permission_tier,
    inputSchema: row.input_schema ?? {},
    outputSchema: row.output_schema ?? {},
    requiresApproval: row.requires_approval,
    sandboxed: row.sandboxed,
    createdAt: row.created_at,
  };
}
