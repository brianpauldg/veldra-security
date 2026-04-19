import pino from 'pino';
import { getConfig } from './config.js';

const config = getConfig();

export const logger = pino({
  level: config.LOG_LEVEL,
  transport: config.NODE_ENV === 'development'
    ? { target: 'pino-pretty', options: { colorize: true, translateTime: 'HH:MM:ss' } }
    : undefined,
  base: { service: 'nova-platform' },
  timestamp: pino.stdTimeFunctions.isoTime,
});

export function createLogger(context: Record<string, unknown>) {
  return logger.child(context);
}

// Convenience: create a logger scoped to a workflow run
export function runLogger(runId: string, workflowSlug: string) {
  return logger.child({ runId, workflow: workflowSlug });
}
