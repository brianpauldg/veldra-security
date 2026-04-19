import { createLogger } from '../logger.js';
import { getConfig } from '../config.js';
import { writeAudit } from '../core/audit.js';
import { checkPermission } from './permissions.js';
import { getSkill } from './skill-registry.js';
import type { ExecutionContext, JsonValue, SkillDefinition } from '../core/types.js';

const log = createLogger({ module: 'openclaw-adapter' });

export interface SkillExecutionResult {
  success: boolean;
  output: Record<string, unknown>;
  error?: string;
  durationMs: number;
  skillId: string;
  version: string;
}

/**
 * Execute an OpenClaw skill within a controlled execution context.
 * Checks permissions, sandboxing, and audit-logs the execution.
 */
export async function executeSkill(
  skillId: string,
  input: Record<string, unknown>,
  ctx: ExecutionContext
): Promise<SkillExecutionResult> {
  const start = Date.now();

  // 1. Resolve skill
  const skill = await getSkill(skillId);
  if (!skill) {
    return { success: false, output: {}, error: `Skill not found: ${skillId}`, durationMs: 0, skillId, version: 'unknown' };
  }

  // 2. Permission check
  const permCheck = checkPermission(ctx.agentSlug, skillId, ctx.permissions);
  if (!permCheck.allowed) {
    log.warn({ skillId, agentSlug: ctx.agentSlug, reason: permCheck.reason }, 'Skill execution denied');
    return { success: false, output: {}, error: permCheck.reason, durationMs: 0, skillId, version: skill.version };
  }

  if (permCheck.requiresApproval && !ctx.approvedSkills.includes(skillId)) {
    log.info({ skillId, agentSlug: ctx.agentSlug }, 'Skill requires approval — not pre-approved');
    return { success: false, output: {}, error: 'Skill requires approval', durationMs: 0, skillId, version: skill.version };
  }

  // 3. Execute via OpenClaw API or local handler
  try {
    const output = await callOpenClaw(skill, input, ctx);
    const durationMs = Date.now() - start;

    // 4. Audit
    await writeAudit({
      entityType: 'skill_execution',
      entityId: ctx.runId,
      action: 'skill_executed',
      actor: ctx.agentSlug,
      metadata: {
        skillId,
        version: skill.version,
        durationMs,
        success: true,
      } as Record<string, JsonValue>,
    });

    log.info({ skillId, durationMs, runId: ctx.runId }, 'Skill executed successfully');
    return { success: true, output, durationMs, skillId, version: skill.version };
  } catch (err) {
    const durationMs = Date.now() - start;
    const error = err instanceof Error ? err.message : String(err);

    await writeAudit({
      entityType: 'skill_execution',
      entityId: ctx.runId,
      action: 'skill_execution_failed',
      actor: ctx.agentSlug,
      metadata: { skillId, error, durationMs } as Record<string, JsonValue>,
    });

    log.error({ skillId, error, durationMs, runId: ctx.runId }, 'Skill execution failed');
    return { success: false, output: {}, error, durationMs, skillId, version: skill.version };
  }
}

/**
 * Call the OpenClaw runtime API.
 * In MVP, this is a simple HTTP POST. Can be extended for gRPC, local execution, etc.
 */
async function callOpenClaw(
  skill: SkillDefinition,
  input: Record<string, unknown>,
  ctx: ExecutionContext
): Promise<Record<string, unknown>> {
  const config = getConfig();

  // If no OpenClaw API configured, use local stub
  if (!config.OPENCLAW_API_URL || !config.OPENCLAW_API_KEY) {
    log.warn({ skillId: skill.id }, 'OpenClaw not configured — using local stub');
    return localStub(skill, input);
  }

  const response = await fetch(`${config.OPENCLAW_API_URL}/v1/skills/${skill.id}/execute`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.OPENCLAW_API_KEY}`,
      'X-Run-Id': ctx.runId,
      'X-Agent-Slug': ctx.agentSlug,
    },
    body: JSON.stringify({ input, context: ctx.metadata }),
    signal: AbortSignal.timeout(30000),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`OpenClaw API error ${response.status}: ${body}`);
  }

  return response.json() as Promise<Record<string, unknown>>;
}

/**
 * Local stub for development when OpenClaw is not running.
 * Returns mock responses based on skill ID patterns.
 */
async function localStub(skill: SkillDefinition, input: Record<string, unknown>): Promise<Record<string, unknown>> {
  log.debug({ skillId: skill.id, input }, 'Local stub execution');

  // Simulate some processing time
  await new Promise((r) => setTimeout(r, 100));

  return {
    _stub: true,
    skillId: skill.id,
    message: `Stub response for ${skill.name}`,
    input,
  };
}
