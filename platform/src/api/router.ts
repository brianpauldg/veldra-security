import { Router, type Request, type Response } from 'express';
import { createLogger } from '../logger.js';
import { getHealthStatus } from '../services/health.js';
import { getPendingApprovals, decideApproval } from '../core/approval-gate.js';
import { getRecentRuns, getRun } from '../core/workflow-engine.js';
import { listAgents } from '../core/agent-registry.js';
import { getRecentAudit, getAuditTrail } from '../core/audit.js';
import { listSchedules } from '../core/scheduler.js';
import { query } from '../db/client.js';
import { approvalDecisionSchema } from '../core/types.js';
import { dispatchLeadIntake } from '../core/dispatcher.js';
import type { JsonValue } from '../core/types.js';

const log = createLogger({ module: 'api' });

export const apiRouter = Router();

// ── Health ──
apiRouter.get('/health', async (_req, res) => {
  const status = await getHealthStatus();
  res.status(status.status === 'unhealthy' ? 503 : 200).json(status);
});

// ── Leads ──
apiRouter.get('/leads', async (req: Request, res: Response) => {
  const status = req.query.status as string;
  const limit = Math.min(parseInt(req.query.limit as string) || 50, 200);
  const offset = parseInt(req.query.offset as string) || 0;

  let sql = 'SELECT * FROM leads';
  const params: unknown[] = [];

  if (status) {
    sql += ' WHERE status = $1';
    params.push(status);
  }

  sql += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
  params.push(limit, offset);

  const result = await query(sql, params);
  const countResult = await query(
    status ? 'SELECT COUNT(*) FROM leads WHERE status = $1' : 'SELECT COUNT(*) FROM leads',
    status ? [status] : []
  );

  res.json({ leads: result.rows, total: parseInt(countResult.rows[0].count), limit, offset });
});

apiRouter.get('/leads/:id', async (req: Request, res: Response) => {
  const result = await query('SELECT * FROM leads WHERE id = $1', [req.params.id]);
  if (result.rows.length === 0) { res.status(404).json({ error: 'Not found' }); return; }

  // Include events and qualifications
  const events = await query('SELECT * FROM lead_events WHERE lead_id = $1 ORDER BY created_at', [req.params.id]);
  const quals = await query('SELECT * FROM lead_qualifications WHERE lead_id = $1 ORDER BY created_at DESC', [req.params.id]);

  res.json({ lead: result.rows[0], events: events.rows, qualifications: quals.rows });
});

// ── Manual Lead Submit ──
apiRouter.post('/leads/manual', async (req: Request, res: Response) => {
  const payload = { ...req.body, source: 'manual' };
  const jobId = await dispatchLeadIntake(payload as Record<string, JsonValue>);
  res.status(202).json({ accepted: true, jobId });
});

// ── Approvals ──
apiRouter.get('/approvals', async (_req, res) => {
  const approvals = await getPendingApprovals();
  res.json({ approvals });
});

apiRouter.post('/approvals/decide', async (req: Request, res: Response) => {
  const parsed = approvalDecisionSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid input', details: parsed.error.issues });
    return;
  }

  try {
    const result = await decideApproval(parsed.data);
    res.json({ approval: result });
  } catch (err) {
    res.status(404).json({ error: err instanceof Error ? err.message : 'Unknown error' });
  }
});

// ── Workflow Runs ──
apiRouter.get('/runs', async (req: Request, res: Response) => {
  const limit = Math.min(parseInt(req.query.limit as string) || 50, 200);
  const runs = await getRecentRuns(limit);
  res.json({ runs });
});

apiRouter.get('/runs/:id', async (req: Request, res: Response) => {
  const run = await getRun(req.params.id);
  if (!run) { res.status(404).json({ error: 'Not found' }); return; }

  const audit = await getAuditTrail('workflow_run', req.params.id);
  res.json({ run, audit });
});

// ── Agents ──
apiRouter.get('/agents', async (_req, res) => {
  const agents = await listAgents();
  res.json({ agents });
});

// ── Schedules ──
apiRouter.get('/schedules', async (_req, res) => {
  const schedules = await listSchedules();
  res.json({ schedules });
});

// ── Audit ──
apiRouter.get('/audit', async (req: Request, res: Response) => {
  const limit = Math.min(parseInt(req.query.limit as string) || 50, 200);
  const entries = await getRecentAudit(limit);
  res.json({ entries });
});

// ── Dashboard Aggregation ──
apiRouter.get('/dashboard/stats', async (_req, res) => {
  const [leads, pendingApprovals, activeRuns, failedRuns] = await Promise.all([
    query(`SELECT status, COUNT(*) as count FROM leads GROUP BY status`),
    query(`SELECT COUNT(*) as count FROM approvals WHERE status = 'pending'`),
    query(`SELECT COUNT(*) as count FROM workflow_runs WHERE status = 'running'`),
    query(`SELECT COUNT(*) as count FROM workflow_runs WHERE status = 'failed' AND created_at > NOW() - INTERVAL '24 hours'`),
  ]);

  res.json({
    leadsByStatus: leads.rows.reduce((acc: Record<string, number>, r: any) => {
      acc[r.status] = parseInt(r.count);
      return acc;
    }, {}),
    pendingApprovals: parseInt(pendingApprovals.rows[0].count),
    activeRuns: parseInt(activeRuns.rows[0].count),
    failedRuns24h: parseInt(failedRuns.rows[0].count),
  });
});
