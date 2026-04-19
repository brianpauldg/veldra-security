import { Redis } from 'ioredis';
import { getConfig } from '../config.js';
import { logger } from '../logger.js';

let connection: Redis | null = null;

export function getRedis(): Redis {
  if (!connection) {
    const config = getConfig();
    connection = new Redis(config.REDIS_URL, {
      maxRetriesPerRequest: null, // required by BullMQ
      enableReadyCheck: false,
      retryStrategy: (times) => Math.min(times * 200, 5000),
    });

    connection.on('error', (err) => {
      logger.error({ err }, 'Redis connection error');
    });

    connection.on('connect', () => {
      logger.info('Redis connected');
    });
  }
  return connection;
}

export async function closeRedis(): Promise<void> {
  if (connection) {
    await connection.quit();
    connection = null;
  }
}
