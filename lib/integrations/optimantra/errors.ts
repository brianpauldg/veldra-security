/**
 * Bloom Metabolics — OptiMantra Error Types
 */

export class OptiMantraError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly requestId?: string,
  ) {
    super(message)
    this.name = 'OptiMantraError'
  }
}

export class OptiMantraNotFoundError extends OptiMantraError {
  constructor(resource: string, id: string, requestId?: string) {
    super(`OptiMantra: ${resource} '${id}' not found`, 404, requestId)
    this.name = 'OptiMantraNotFoundError'
  }
}

export class OptiMantraAuthError extends OptiMantraError {
  constructor(requestId?: string) {
    super('OptiMantra: authentication failed, check OPTIMANTRA_API_KEY', 401, requestId)
    this.name = 'OptiMantraAuthError'
  }
}

export class OptiMantraRateLimitError extends OptiMantraError {
  constructor(
    public readonly retryAfterMs: number,
    requestId?: string,
  ) {
    super(`OptiMantra: rate limited, retry after ${retryAfterMs}ms`, 429, requestId)
    this.name = 'OptiMantraRateLimitError'
  }
}

export class OptiMantraServerError extends OptiMantraError {
  constructor(message: string, statusCode: number, requestId?: string) {
    super(`OptiMantra server error: ${message}`, statusCode, requestId)
    this.name = 'OptiMantraServerError'
  }
}

export class OptiMantraValidationError extends OptiMantraError {
  constructor(
    public readonly errors: Record<string, string>,
    requestId?: string,
  ) {
    super(`OptiMantra validation failed: ${JSON.stringify(errors)}`, 422, requestId)
    this.name = 'OptiMantraValidationError'
  }
}

export function isRetryable(error: unknown): boolean {
  if (error instanceof OptiMantraError) {
    return error.statusCode >= 500 && error.statusCode < 600
  }
  return false
}
