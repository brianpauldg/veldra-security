import { Worker, type Job } from 'bullmq';
import { getRedis } from './connection.js';
import { QUEUE_NAMES } from './queues.js';
import { createLogger } from '../logger.js';
import { processIntake } from '../services/lead-intake.js';
import { qualifyLead } from '../services/lead-qualification.js';
import { generateOutreach } from '../services/outreach-decision.js';
import { createBookingHandoff } from '../services/booking-handoff.js';
import { startRun, completeStep, failRun } from '../core/workflow-engine.js';
import { dispatchQualification, dispatchOutreach, dispatchBookingHandoff, dispatchToDeadLetter } from '../core/dispatcher.js';
import type { JsonValue, WebhookLeadPayload } from '../core/types.js';

const log = createLogger({ module: 'workers' });

const workers: Worker[] = [];

export function startWorkers(): void {
  const connection = getRedis();

  // ── Lead Intake Worker ──
  workers.push(
    new Worker(
      QUEUE_NAMES.LEAD_INTAKE,
      async (job: Job) => {
        const payload = job.data as WebhookLeadPayload;
        log.info({ jobId: job.id, email: payload.email }, 'Processing lead intake');

        // Start workflow run
        const run = await startRun('lead-intake-to-booking', 'webhook', payload as unknown as Record<string, JsonValue>);

        try {
          const start = Date.now();
          const result = await processIntake(payload, run.id);

          await completeStep(run.id, 'intake', {
            status: 'completed',
            output: { leadId: result.lead.id, isDuplicate: result.isDuplicate } as Record<string, JsonValue>,
            error: null,
            durationMs: Date.now() - start,
            attempts: job.attemptsMade + 1,
          });

          // Chain: dispatch qualification
          await dispatchQualification(result.lead.id, run.id);

          return { leadId: result.lead.id, runId: run.id };
        } catch (err) {
          await failRun(run.id, err instanceof Error ? err.message : String(err));
          throw err;
        }
      },
      { connection, concurrency: 5 }
    )
  );

  // ── Lead Qualification Worker ──
  workers.push(
    new Worker(
      QUEUE_NAMES.LEAD_QUALIFY,
      async (job: Job) => {
        const { leadId, runId } = job.data as { leadId: string; runId: string };
        log.info({ jobId: job.id, leadId }, 'Processing qualification');

        const start = Date.now();
        const result = await qualifyLead(leadId, runId);

        await completeStep(runId, 'qualify', {
          status: 'completed',
          output: {
            score: result.qualification.score,
            segment: result.qualification.segment,
            nextAction: result.qualification.nextAction,
            routeTo: result.routeTo,
          } as Record<string, JsonValue>,
          error: null,
          durationMs: Date.now() - start,
          attempts: job.attemptsMade + 1,
        });

        // Route based on qualification
        if (result.qualification.nextAction === 'book_consult') {
          await dispatchOutreach(leadId, runId, result.qualification.id);
          await dispatchBookingHandoff(leadId, runId, result.qualification.id);
        } else if (result.qualification.nextAction === 'nurture_sequence') {
          await dispatchOutreach(leadId, runId, result.qualification.id);
        }
        // manual_review and disqualify: no automatic dispatch, operator handles

        return { score: result.qualification.score, routeTo: result.routeTo };
      },
      { connection, concurrency: 5 }
    )
  );

  // ── Outreach Generation Worker ──
  workers.push(
    new Worker(
      QUEUE_NAMES.OUTREACH_GENERATE,
      async (job: Job) => {
        const { leadId, runId, qualificationId } = job.data as { leadId: string; runId: string; qualificationId: string };
        log.info({ jobId: job.id, leadId }, 'Generating outreach');

        const start = Date.now();
        const result = await generateOutreach(leadId, qualificationId, runId);

        await completeStep(runId, 'outreach', {
          status: result.approvalRequired ? 'waiting_approval' : 'completed',
          output: {
            decisionId: result.decision.id,
            channel: result.decision.channel,
            approvalRequired: result.approvalRequired,
            approvalId: result.approvalId,
          } as unknown as Record<string, JsonValue>,
          error: null,
          durationMs: Date.now() - start,
          attempts: job.attemptsMade + 1,
        });

        return { decisionId: result.decision.id, approvalRequired: result.approvalRequired };
      },
      { connection, concurrency: 3 }
    )
  );

  // ── Booking Handoff Worker ──
  workers.push(
    new Worker(
      QUEUE_NAMES.BOOKING_HANDOFF,
      async (job: Job) => {
        const { leadId, runId, qualificationId } = job.data as { leadId: string; runId: string; qualificationId: string };
        log.info({ jobId: job.id, leadId }, 'Processing booking handoff');

        const start = Date.now();
        const result = await createBookingHandoff(leadId, qualificationId, runId);

        await completeStep(runId, 'booking', {
          status: 'completed',
          output: {
            intentId: result.intent.id,
            bookingUrl: result.bookingUrl,
            ghlCreated: result.ghlAppointmentCreated,
          } as unknown as Record<string, JsonValue>,
          error: null,
          durationMs: Date.now() - start,
          attempts: job.attemptsMade + 1,
        });

        return { intentId: result.intent.id };
      },
      { connection, concurrency: 3 }
    )
  );

  // ── Dead Letter Worker ──
  workers.push(
    new Worker(
      QUEUE_NAMES.DEAD_LETTER,
      async (job: Job) => {
        log.error({ jobId: job.id, data: job.data }, 'Dead letter received — requires manual inspection');
        // Just log — operator will handle via dashboard
      },
      { connection, concurrency: 1 }
    )
  );

  // Attach error handlers
  for (const worker of workers) {
    worker.on('failed', (job, err) => {
      log.error({ jobId: job?.id, queue: worker.name, error: err.message }, 'Job failed');
    });

    worker.on('error', (err) => {
      log.error({ queue: worker.name, error: err.message }, 'Worker error');
    });
  }

  log.info({ count: workers.length }, 'All workers started');
}

export async function stopWorkers(): Promise<void> {
  for (const worker of workers) {
    await worker.close();
  }
  workers.length = 0;
  log.info('All workers stopped');
}
