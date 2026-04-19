import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const configSchema = z.object({
  // Database
  DATABASE_URL: z.string().default('postgresql://nova:nova@localhost:5432/nova_platform'),
  DATABASE_POOL_MIN: z.coerce.number().default(2),
  DATABASE_POOL_MAX: z.coerce.number().default(10),

  // Redis
  REDIS_URL: z.string().default('redis://localhost:6379'),

  // Server
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),

  // OpenClaw
  OPENCLAW_API_URL: z.string().default('http://localhost:8080'),
  OPENCLAW_API_KEY: z.string().default(''),

  // GHL
  GHL_API_URL: z.string().default('https://services.leadconnectorhq.com'),
  GHL_API_KEY: z.string().default(''),
  GHL_LOCATION_ID: z.string().default(''),
  GHL_PIPELINE_ID: z.string().default('m57zaE23IRPcQ3EflzDV'),
  GHL_CALENDAR_ID: z.string().default(''),

  // Anthropic
  ANTHROPIC_API_KEY: z.string().default(''),

  // Webhooks
  WEBHOOK_SECRET: z.string().default('change-me-in-production'),

  // Approvals
  APPROVAL_AUTO_APPROVE_AFTER_MS: z.coerce.number().default(0),
  APPROVAL_DEFAULT_EXPIRY_MS: z.coerce.number().default(86400000),
});

export type Config = z.infer<typeof configSchema>;

let _config: Config | null = null;

export function getConfig(): Config {
  if (!_config) {
    const result = configSchema.safeParse(process.env);
    if (!result.success) {
      console.error('Invalid configuration:', result.error.flatten().fieldErrors);
      process.exit(1);
    }
    _config = result.data;
  }
  return _config;
}

export function isDev(): boolean {
  return getConfig().NODE_ENV === 'development';
}

export function isProd(): boolean {
  return getConfig().NODE_ENV === 'production';
}
