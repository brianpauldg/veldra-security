import { z } from 'zod';

// ══════════════════════════════════════════════════
// IDs & Primitives
// ══════════════════════════════════════════════════

export type UUID = string;
export type ISO8601 = string;
export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

// ══════════════════════════════════════════════════
// Agent System
// ══════════════════════════════════════════════════

export type AgentStatus = 'active' | 'disabled' | 'error';

export interface Agent {
  id: UUID;
  name: string;
  slug: string;
  description: string;
  version: string;
  status: AgentStatus;
  config: Record<string, JsonValue>;
  skillIds: string[];
  createdAt: ISO8601;
  updatedAt: ISO8601;
}

export type TaskStatus = 'pending' | 'queued' | 'running' | 'waiting_approval' | 'completed' | 'failed' | 'cancelled' | 'dead_letter';

export interface Task {
  id: UUID;
  workflowRunId: UUID;
  stepKey: string;
  agentSlug: string;
  status: TaskStatus;
  input: Record<string, JsonValue>;
  output: Record<string, JsonValue> | null;
  error: string | null;
  attempts: number;
  maxAttempts: number;
  scheduledAt: ISO8601;
  startedAt: ISO8601 | null;
  completedAt: ISO8601 | null;
  createdAt: ISO8601;
}

// ══════════════════════════════════════════════════
// Scheduling
// ══════════════════════════════════════════════════

export type ScheduleType = 'cron' | 'once' | 'interval';

export interface Schedule {
  id: UUID;
  name: string;
  workflowSlug: string;
  type: ScheduleType;
  expression: string;
  input: Record<string, JsonValue>;
  enabled: boolean;
  lastRunAt: ISO8601 | null;
  nextRunAt: ISO8601 | null;
  createdAt: ISO8601;
}

// ══════════════════════════════════════════════════
// Workflows
// ══════════════════════════════════════════════════

export type WorkflowStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled' | 'waiting_approval';

export interface Workflow {
  slug: string;
  name: string;
  description: string;
  version: string;
  steps: WorkflowStep[];
  triggerType: 'webhook' | 'schedule' | 'manual' | 'event';
}

export interface WorkflowStep {
  key: string;
  name: string;
  agentSlug: string | null;
  skillId: string | null;
  dependsOn: string[];
  retryPolicy: RetryPolicy;
  requiresApproval: boolean;
  approvalPolicy: ApprovalPolicy | null;
  timeoutMs: number;
  onFailure: 'fail_workflow' | 'skip' | 'retry' | 'manual_review';
}

export interface WorkflowRun {
  id: UUID;
  workflowSlug: string;
  status: WorkflowStatus;
  triggeredBy: 'webhook' | 'schedule' | 'manual' | 'event';
  triggerData: Record<string, JsonValue>;
  currentStepKey: string | null;
  stepResults: Record<string, StepResult>;
  error: string | null;
  startedAt: ISO8601;
  completedAt: ISO8601 | null;
  createdAt: ISO8601;
}

export interface StepResult {
  status: TaskStatus;
  output: Record<string, JsonValue> | null;
  error: string | null;
  durationMs: number;
  attempts: number;
}

// ══════════════════════════════════════════════════
// Approvals
// ══════════════════════════════════════════════════

export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'expired' | 'auto_approved';

export interface ApprovalPolicy {
  type: 'always' | 'conditional' | 'auto_after_delay';
  condition?: string;
  autoApproveAfterMs?: number;
  requiredRole: 'admin' | 'operator';
}

export interface Approval {
  id: UUID;
  workflowRunId: UUID;
  stepKey: string;
  status: ApprovalStatus;
  policyType: ApprovalPolicy['type'];
  context: Record<string, JsonValue>;
  decidedBy: string | null;
  reason: string | null;
  createdAt: ISO8601;
  decidedAt: ISO8601 | null;
  expiresAt: ISO8601 | null;
}

// ══════════════════════════════════════════════════
// Alerts
// ══════════════════════════════════════════════════

export type AlertSeverity = 'info' | 'warning' | 'error' | 'critical';

export interface Alert {
  id: UUID;
  severity: AlertSeverity;
  source: string;
  message: string;
  metadata: Record<string, JsonValue>;
  acknowledged: boolean;
  createdAt: ISO8601;
}

// ══════════════════════════════════════════════════
// OpenClaw / Skills
// ══════════════════════════════════════════════════

export type PermissionTier = 'read_only' | 'internal_write' | 'external_write' | 'dangerous';

export interface SkillDefinition {
  id: string;
  name: string;
  version: string;
  description: string;
  agentSlug: string;
  permissionTier: PermissionTier;
  inputSchema: Record<string, unknown>;
  outputSchema: Record<string, unknown>;
  requiresApproval: boolean;
  sandboxed: boolean;
  createdAt: ISO8601;
}

export interface ToolPermission {
  skillId: string;
  tier: PermissionTier;
  allowedAgents: string[];
  requiresApproval: boolean;
  maxCallsPerRun: number;
  rateLimitPerMinute: number;
}

export interface ExecutionContext {
  runId: UUID;
  workflowSlug: string;
  stepKey: string;
  agentSlug: string;
  leadId: UUID | null;
  permissions: ToolPermission[];
  approvedSkills: string[];
  metadata: Record<string, JsonValue>;
}

// ══════════════════════════════════════════════════
// Retry
// ══════════════════════════════════════════════════

export interface RetryPolicy {
  maxAttempts: number;
  backoffType: 'fixed' | 'exponential';
  initialDelayMs: number;
  maxDelayMs: number;
  retryableErrors?: string[];
}

// ══════════════════════════════════════════════════
// Webhooks
// ══════════════════════════════════════════════════

export type WebhookSourceType = 'ghl' | 'form' | 'partner' | 'crm_import' | 'manual' | 'ad_platform';

export interface WebhookTrigger {
  id: UUID;
  sourceType: WebhookSourceType;
  sourceId: string;
  secret: string;
  workflowSlug: string;
  enabled: boolean;
  lastReceivedAt: ISO8601 | null;
  createdAt: ISO8601;
}

// ══════════════════════════════════════════════════
// Lead Domain
// ══════════════════════════════════════════════════

export type LeadStatus = 'new' | 'normalized' | 'qualified' | 'nurture' | 'book_now' | 'manual_review' | 'disqualified' | 'booked' | 'lost';

export type ConsentStatus = 'pending' | 'opted_in' | 'opted_out' | 'unknown';

export interface Lead {
  id: UUID;
  externalId: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  state: string | null;
  age: number | null;
  serviceInterest: 'trt' | 'glp1' | 'mixed';
  status: LeadStatus;
  score: number | null;
  segment: 'HOT' | 'WARM' | 'COLD' | null;
  consentStatus: ConsentStatus;
  consentTimestamp: ISO8601 | null;
  sourceType: WebhookSourceType;
  sourceId: string | null;
  sourceAttribution: Record<string, JsonValue>;
  goals: string | null;
  symptoms: string[];
  disqualifiers: string[];
  metadata: Record<string, JsonValue>;
  createdAt: ISO8601;
  updatedAt: ISO8601;
}

export interface LeadSource {
  id: UUID;
  type: WebhookSourceType;
  name: string;
  webhookId: UUID | null;
  attribution: Record<string, JsonValue>;
  active: boolean;
  createdAt: ISO8601;
}

export interface LeadQualification {
  id: UUID;
  leadId: UUID;
  score: number;
  segment: 'HOT' | 'WARM' | 'COLD';
  primaryInterest: 'trt' | 'glp1' | 'both';
  symptoms: string[];
  disqualifiers: string[];
  nextAction: 'book_consult' | 'nurture_sequence' | 'manual_review' | 'disqualify';
  reasoning: string;
  qualifiedBy: string;
  workflowRunId: UUID;
  createdAt: ISO8601;
}

export interface OutreachDecision {
  id: UUID;
  leadId: UUID;
  workflowRunId: UUID;
  channel: 'email' | 'sms';
  messageType: string;
  subject: string | null;
  body: string;
  ctaText: string;
  ctaUrl: string;
  approvalId: UUID | null;
  approved: boolean;
  sentAt: ISO8601 | null;
  createdAt: ISO8601;
}

export interface BookingIntent {
  id: UUID;
  leadId: UUID;
  workflowRunId: UUID;
  qualificationId: UUID;
  bookingType: 'immediate' | 'scheduled' | 'callback';
  preferredDate: ISO8601 | null;
  ghlCalendarId: string | null;
  ghlAppointmentId: string | null;
  status: 'pending' | 'created' | 'confirmed' | 'no_show' | 'cancelled';
  handoffMethod: 'ghl_api' | 'booking_link' | 'manual';
  createdAt: ISO8601;
}

// ══════════════════════════════════════════════════
// Audit
// ══════════════════════════════════════════════════

export interface AuditEntry {
  id: UUID;
  entityType: 'lead' | 'workflow_run' | 'approval' | 'outreach' | 'booking' | 'skill_execution';
  entityId: UUID;
  action: string;
  actor: string;
  before: Record<string, JsonValue> | null;
  after: Record<string, JsonValue> | null;
  metadata: Record<string, JsonValue>;
  createdAt: ISO8601;
}

// ══════════════════════════════════════════════════
// Zod Validators
// ══════════════════════════════════════════════════

export const webhookLeadPayloadSchema = z.object({
  source: z.enum(['ghl', 'form', 'partner', 'crm_import', 'manual', 'ad_platform']),
  sourceId: z.string().optional(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  state: z.string().optional(),
  age: z.number().int().positive().optional(),
  serviceInterest: z.enum(['trt', 'glp1', 'mixed']).default('mixed'),
  goals: z.string().optional(),
  symptoms: z.array(z.string()).default([]),
  consent: z.boolean().default(false),
  attribution: z.record(z.unknown()).default({}),
  metadata: z.record(z.unknown()).default({}),
});

export type WebhookLeadPayload = z.infer<typeof webhookLeadPayloadSchema>;

export const approvalDecisionSchema = z.object({
  approvalId: z.string().uuid(),
  decision: z.enum(['approved', 'rejected']),
  reason: z.string().optional(),
  decidedBy: z.string(),
});

export type ApprovalDecisionInput = z.infer<typeof approvalDecisionSchema>;
