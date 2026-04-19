import express from 'express';
import { getConfig } from './config.js';
import { logger } from './logger.js';
import { getPool, closePool } from './db/client.js';
import { getRedis, closeRedis } from './queue/connection.js';
import { closeQueues } from './queue/queues.js';
import { startWorkers, stopWorkers } from './queue/workers.js';
import { registerWorkflow } from './core/workflow-engine.js';
import { registerAgent } from './core/agent-registry.js';
import { syncSchedulesToQueues } from './core/scheduler.js';
import { processAutoApprovals } from './core/approval-gate.js';
import { webhookRouter } from './webhooks/router.js';
import { apiRouter } from './api/router.js';
import type { Workflow, RetryPolicy } from './core/types.js';

const config = getConfig();
const app = express();

// ── Middleware ──
app.use(express.json({ limit: '1mb' }));
app.use((req, _res, next) => {
  logger.debug({ method: req.method, path: req.path }, 'Request');
  next();
});

// ── Routes ──
app.use('/webhooks', webhookRouter);
app.use('/api', apiRouter);

// ── Default Retry Policy ──
const defaultRetry: RetryPolicy = {
  maxAttempts: 3,
  backoffType: 'exponential',
  initialDelayMs: 2000,
  maxDelayMs: 60000,
};

// ── Register Lead Workflow ──
const leadWorkflow: Workflow = {
  slug: 'lead-intake-to-booking',
  name: 'Lead Intake → Qualification → Follow-up → Booking',
  description: 'Full lead lifecycle from webhook to consultation booking',
  version: '1.0.0',
  triggerType: 'webhook',
  steps: [
    {
      key: 'intake',
      name: 'Lead Intake & Normalization',
      agentSlug: null,
      skillId: null,
      dependsOn: [],
      retryPolicy: defaultRetry,
      requiresApproval: false,
      approvalPolicy: null,
      timeoutMs: 30000,
      onFailure: 'retry',
    },
    {
      key: 'qualify',
      name: 'Lead Qualification & Scoring',
      agentSlug: 'qualifier',
      skillId: null,
      dependsOn: ['intake'],
      retryPolicy: defaultRetry,
      requiresApproval: false,
      approvalPolicy: null,
      timeoutMs: 30000,
      onFailure: 'manual_review',
    },
    {
      key: 'outreach',
      name: 'Outreach Decision & Content Generation',
      agentSlug: 'content',
      skillId: null,
      dependsOn: ['qualify'],
      retryPolicy: defaultRetry,
      requiresApproval: true,
      approvalPolicy: {
        type: 'auto_after_delay',
        autoApproveAfterMs: 30 * 60 * 1000,
        requiredRole: 'operator',
      },
      timeoutMs: 60000,
      onFailure: 'skip',
    },
    {
      key: 'booking',
      name: 'Consultation Booking Handoff',
      agentSlug: null,
      skillId: null,
      dependsOn: ['qualify'],
      retryPolicy: defaultRetry,
      requiresApproval: false,
      approvalPolicy: null,
      timeoutMs: 15000,
      onFailure: 'retry',
    },
  ],
};

async function boot() {
  logger.info({ env: config.NODE_ENV, port: config.PORT }, 'Starting Bloom Metabolics Platform');

  // Verify connections
  await getPool().query('SELECT 1');
  logger.info('Database connected');

  await getRedis().ping();
  logger.info('Redis connected');

  // Register workflow
  registerWorkflow(leadWorkflow);

  // Register agents from existing config
  const agentDefs = [
    { name: 'Qualifier Agent', slug: 'qualifier', description: 'Score, segment, ICP match', version: '1.0.0' },
    { name: 'Clinical Intake Agent', slug: 'clinical-intake', description: 'Symptom triage, lab flags', version: '1.0.0' },
    { name: 'Content Agent', slug: 'content', description: 'Emails, follow-ups, SMS', version: '1.0.0' },
    { name: 'Outreach Agent', slug: 'outreach', description: 'Lead research, cold emails', version: '1.0.0' },
  ];

  for (const def of agentDefs) {
    await registerAgent(def);
  }

  // Start workers
  startWorkers();

  // Sync schedules
  await syncSchedulesToQueues();

  // Auto-approval check every 5 minutes
  setInterval(() => {
    processAutoApprovals().catch((err) =>
      logger.error({ err }, 'Auto-approval processing failed')
    );
  }, 5 * 60 * 1000);

  // Start HTTP server
  app.listen(config.PORT, () => {
    logger.info({ port: config.PORT }, 'Platform server ready');
  });
}

// ── Graceful Shutdown ──
async function shutdown(signal: string) {
  logger.info({ signal }, 'Shutting down...');
  await stopWorkers();
  await closeQueues();
  await closeRedis();
  await closePool();
  process.exit(0);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

boot().catch((err) => {
  logger.fatal({ err }, 'Boot failed');
  process.exit(1);
});
