import { getPool } from '../db/client.js';
import { getRedis } from '../queue/connection.js';
import { createLogger } from '../logger.js';

const log = createLogger({ module: 'health' });

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  uptime: number;
  timestamp: string;
  checks: {
    database: { ok: boolean; latencyMs: number };
    redis: { ok: boolean; latencyMs: number };
  };
}

const startTime = Date.now();

export async function getHealthStatus(): Promise<HealthStatus> {
  const checks = await Promise.all([checkDatabase(), checkRedis()]);

  const allOk = checks.every((c) => c.ok);
  const anyOk = checks.some((c) => c.ok);

  return {
    status: allOk ? 'healthy' : anyOk ? 'degraded' : 'unhealthy',
    uptime: Date.now() - startTime,
    timestamp: new Date().toISOString(),
    checks: {
      database: checks[0],
      redis: checks[1],
    },
  };
}

async function checkDatabase(): Promise<{ ok: boolean; latencyMs: number }> {
  const start = Date.now();
  try {
    await getPool().query('SELECT 1');
    return { ok: true, latencyMs: Date.now() - start };
  } catch (err) {
    log.error({ err }, 'Database health check failed');
    return { ok: false, latencyMs: Date.now() - start };
  }
}

async function checkRedis(): Promise<{ ok: boolean; latencyMs: number }> {
  const start = Date.now();
  try {
    await getRedis().ping();
    return { ok: true, latencyMs: Date.now() - start };
  } catch (err) {
    log.error({ err }, 'Redis health check failed');
    return { ok: false, latencyMs: Date.now() - start };
  }
}
