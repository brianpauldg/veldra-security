/**
 * Bloom Metabolics — OptiMantra Integration Config
 * Centralized configuration for OptiMantra EHR integration.
 */

export const OPTIMANTRA_CONFIG = {
  /** Base URL for OptiMantra API. VERIFY against OptiMantra API docs during integration testing */
  baseUrl: process.env.OPTIMANTRA_BASE_URL || 'https://api.optimantra.com/v1',

  /** API key for authentication */
  apiKey: process.env.OPTIMANTRA_API_KEY || '',

  /** Webhook signing secret for HMAC-SHA256 verification */
  webhookSecret: process.env.OPTIMANTRA_WEBHOOK_SECRET || '',

  /** Feature flag: when false, all OptiMantra methods throw "not yet activated" */
  enabled: process.env.OPTIMANTRA_ENABLED === 'true',

  /** Retry policy for 5xx errors */
  retry: {
    maxRetries: 3,
    baseDelayMs: 1000,
    maxDelayMs: 10000,
  },

  /** Rate limit policy */
  rateLimit: {
    maxConcurrent: 5,
    requestsPerMinute: 60,
  },

  /** Webhook replay protection window (milliseconds) */
  webhookMaxAgeMs: 5 * 60 * 1000, // 5 minutes
} as const

export function assertOptiMantraEnabled(): void {
  if (!OPTIMANTRA_CONFIG.enabled) {
    throw new Error('OptiMantra integration not yet activated. Set OPTIMANTRA_ENABLED=true after BAA is confirmed.')
  }
}

export function assertOptiMantraConfigured(): void {
  if (!OPTIMANTRA_CONFIG.apiKey) {
    throw new Error('OPTIMANTRA_API_KEY environment variable is required for OptiMantra integration.')
  }
}
