import type { PermissionTier, ToolPermission } from '../core/types.js';

/**
 * Permission tier hierarchy. Higher tiers include all lower permissions.
 * read_only < internal_write < external_write < dangerous
 */
const TIER_ORDER: PermissionTier[] = ['read_only', 'internal_write', 'external_write', 'dangerous'];

export function tierLevel(tier: PermissionTier): number {
  return TIER_ORDER.indexOf(tier);
}

export function isTierAllowed(required: PermissionTier, granted: PermissionTier): boolean {
  return tierLevel(granted) >= tierLevel(required);
}

/**
 * Check if an agent has permission to execute a skill.
 */
export function checkPermission(
  agentSlug: string,
  skillId: string,
  permissions: ToolPermission[]
): { allowed: boolean; requiresApproval: boolean; reason?: string } {
  const perm = permissions.find((p) => p.skillId === skillId);

  if (!perm) {
    return { allowed: false, requiresApproval: false, reason: `No permission entry for skill: ${skillId}` };
  }

  // Check agent allowlist
  if (perm.allowedAgents.length > 0 && !perm.allowedAgents.includes(agentSlug)) {
    return { allowed: false, requiresApproval: false, reason: `Agent ${agentSlug} not in allowlist for ${skillId}` };
  }

  return {
    allowed: true,
    requiresApproval: perm.requiresApproval,
  };
}

/**
 * Default permission sets for common skill categories.
 */
export const DEFAULT_PERMISSIONS: Record<string, Partial<ToolPermission>> = {
  // Read CRM data — no approval needed
  'crm:read': {
    tier: 'read_only',
    requiresApproval: false,
    maxCallsPerRun: 50,
    rateLimitPerMinute: 30,
  },
  // Write to internal DB — no approval
  'db:write': {
    tier: 'internal_write',
    requiresApproval: false,
    maxCallsPerRun: 20,
    rateLimitPerMinute: 20,
  },
  // Send email/SMS — requires approval
  'outreach:send': {
    tier: 'external_write',
    requiresApproval: true,
    maxCallsPerRun: 5,
    rateLimitPerMinute: 5,
  },
  // Create GHL appointment — requires approval
  'booking:create': {
    tier: 'external_write',
    requiresApproval: true,
    maxCallsPerRun: 3,
    rateLimitPerMinute: 3,
  },
  // Delete or modify patient data — dangerous
  'patient:delete': {
    tier: 'dangerous',
    requiresApproval: true,
    maxCallsPerRun: 1,
    rateLimitPerMinute: 1,
  },
};
