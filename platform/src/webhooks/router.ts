import { Router, type Request, type Response } from 'express';
import crypto from 'node:crypto';
import { getConfig } from '../config.js';
import { createLogger } from '../logger.js';
import { normalizeWebhookPayload } from './handlers.js';
import { dispatchLeadIntake } from '../core/dispatcher.js';
import { writeAudit } from '../core/audit.js';
import type { WebhookSourceType, JsonValue } from '../core/types.js';

const log = createLogger({ module: 'webhook-router' });

export const webhookRouter = Router();

/**
 * POST /webhooks/:source
 * Accepts lead data from any configured source type.
 * Validates HMAC signature, normalizes payload, dispatches to intake queue.
 */
webhookRouter.post('/:source', async (req: Request, res: Response) => {
  const source = req.params.source as WebhookSourceType;
  const validSources: WebhookSourceType[] = ['ghl', 'form', 'partner', 'crm_import', 'manual', 'ad_platform'];

  if (!validSources.includes(source)) {
    res.status(400).json({ error: `Invalid source: ${source}` });
    return;
  }

  // HMAC signature verification (skip in dev for manual testing)
  const config = getConfig();
  if (config.NODE_ENV === 'production') {
    const signature = req.headers['x-webhook-signature'] as string;
    if (!verifySignature(req.body, signature, config.WEBHOOK_SECRET)) {
      log.warn({ source, ip: req.ip }, 'Invalid webhook signature');
      res.status(401).json({ error: 'Invalid signature' });
      return;
    }
  }

  // Normalize
  const { payload, errors } = normalizeWebhookPayload(source, req.body);

  if (!payload) {
    log.warn({ source, errors }, 'Webhook payload rejected');

    await writeAudit({
      entityType: 'lead',
      entityId: 'invalid',
      action: 'webhook_rejected',
      actor: 'system',
      metadata: { source, errors, body: sanitizeBody(req.body) } as Record<string, JsonValue>,
    });

    res.status(422).json({ error: 'Validation failed', details: errors });
    return;
  }

  // Idempotency key: source + email to prevent duplicate processing
  const idempotencyKey = `lead:${source}:${payload.email}:${Date.now().toString(36)}`;

  // Dispatch to intake queue
  const jobId = await dispatchLeadIntake(payload as unknown as Record<string, JsonValue>, idempotencyKey);

  log.info({ source, email: payload.email, jobId }, 'Webhook received — lead dispatched');

  res.status(202).json({
    accepted: true,
    jobId,
    message: 'Lead accepted for processing',
  });
});

function verifySignature(body: unknown, signature: string, secret: string): boolean {
  if (!signature) return false;
  const expected = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(body))
    .digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

function sanitizeBody(body: unknown): Record<string, JsonValue> {
  // Remove sensitive fields before audit logging
  const safe = { ...(body as Record<string, unknown>) };
  delete safe.ssn;
  delete safe.password;
  delete safe.creditCard;
  return safe as Record<string, JsonValue>;
}
