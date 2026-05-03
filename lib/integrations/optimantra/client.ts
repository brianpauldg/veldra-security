/**
 * Bloom Metabolics — OptiMantra API Client
 * Type-safe REST client with retry, rate limiting, and audit logging.
 * All endpoint paths marked for verification against OptiMantra API docs.
 */

import { logAudit } from '@/lib/clinic/audit'
import { OPTIMANTRA_CONFIG, assertOptiMantraEnabled, assertOptiMantraConfigured } from './config'
import {
  OptiMantraError,
  OptiMantraNotFoundError,
  OptiMantraAuthError,
  OptiMantraRateLimitError,
  OptiMantraServerError,
  OptiMantraValidationError,
  isRetryable,
} from './errors'
import type {
  OptiMantraPatient,
  OptiMantraPatientInput,
  OptiMantraPrescription,
  OptiMantraLabResult,
  OptiMantraAppointment,
  OptiMantraDocument,
  OptiMantraProvider,
  DocumentMetadata,
  DateRange,
} from './types'

function generateRequestId(): string {
  return `omr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function buildDateParams(range?: DateRange): string {
  if (!range) return ''
  const params = new URLSearchParams()
  if (range.from) params.set('from', range.from)
  if (range.to) params.set('to', range.to)
  const str = params.toString()
  return str ? `?${str}` : ''
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  requestId?: string,
): Promise<T> {
  assertOptiMantraEnabled()
  assertOptiMantraConfigured()

  const rid = requestId || generateRequestId()
  const url = `${OPTIMANTRA_CONFIG.baseUrl}${path}`
  const { maxRetries, baseDelayMs, maxDelayMs } = OPTIMANTRA_CONFIG.retry

  let lastError: unknown

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const headers: Record<string, string> = {
        'Authorization': `Bearer ${OPTIMANTRA_CONFIG.apiKey}`,
        'Content-Type': 'application/json',
        'X-Request-Id': rid,
      }

      const fetchOpts: RequestInit = { method, headers }
      if (body && method !== 'GET') {
        fetchOpts.body = JSON.stringify(body)
      }

      const response = await fetch(url, fetchOpts)

      // Rate limit handling
      if (response.status === 429) {
        const retryAfter = parseInt(response.headers.get('Retry-After') || '60', 10) * 1000
        throw new OptiMantraRateLimitError(retryAfter, rid)
      }

      // Auth errors
      if (response.status === 401 || response.status === 403) {
        throw new OptiMantraAuthError(rid)
      }

      // Not found
      if (response.status === 404) {
        throw new OptiMantraNotFoundError('resource', path, rid)
      }

      // Validation errors
      if (response.status === 422) {
        const data = await response.json().catch(() => ({}))
        throw new OptiMantraValidationError(data.errors || {}, rid)
      }

      // Server errors (retryable)
      if (response.status >= 500) {
        throw new OptiMantraServerError(
          `Server returned ${response.status}`,
          response.status,
          rid,
        )
      }

      // Parse response
      const data = await response.json().catch(() => {
        throw new OptiMantraServerError('Malformed JSON response', response.status, rid)
      })

      // Log successful request
      logAudit({
        userId: 'system', userName: 'OptiMantra', userRole: 'super_admin',
        action: `optimantra_api:${method.toLowerCase()}`,
        resourceType: 'optimantra', resourceId: rid,
        details: { path, status: response.status },
      })

      return data as T
    } catch (error) {
      lastError = error

      // Only retry on server errors
      if (isRetryable(error) && attempt < maxRetries) {
        const delay = Math.min(baseDelayMs * Math.pow(2, attempt), maxDelayMs)
        await sleep(delay)
        continue
      }

      // Rate limit: respect Retry-After
      if (error instanceof OptiMantraRateLimitError && attempt < maxRetries) {
        await sleep(error.retryAfterMs)
        continue
      }

      // Non-retryable — log and throw
      logAudit({
        userId: 'system', userName: 'OptiMantra', userRole: 'super_admin',
        action: 'optimantra_api:error',
        resourceType: 'optimantra', resourceId: rid,
        details: {
          path, method,
          error: error instanceof Error ? error.message : 'unknown',
          statusCode: error instanceof OptiMantraError ? error.statusCode : undefined,
        },
      })

      throw error
    }
  }

  throw lastError
}

// ── Patient Operations ──────────────────────────────────────

/** VERIFY against OptiMantra API docs during integration testing */
export async function getPatient(patientId: string): Promise<OptiMantraPatient> {
  return request<OptiMantraPatient>('GET', `/patients/${patientId}`)
}

/** VERIFY against OptiMantra API docs during integration testing */
export async function findPatientByEmail(email: string): Promise<OptiMantraPatient | null> {
  try {
    const results = await request<{ patients: OptiMantraPatient[] }>('GET', `/patients?email=${encodeURIComponent(email)}`)
    return results.patients?.[0] || null
  } catch (error) {
    if (error instanceof OptiMantraNotFoundError) return null
    throw error
  }
}

/** VERIFY against OptiMantra API docs during integration testing */
export async function findPatientByExternalId(externalId: string): Promise<OptiMantraPatient | null> {
  try {
    const results = await request<{ patients: OptiMantraPatient[] }>('GET', `/patients?external_id=${encodeURIComponent(externalId)}`)
    return results.patients?.[0] || null
  } catch (error) {
    if (error instanceof OptiMantraNotFoundError) return null
    throw error
  }
}

/** VERIFY against OptiMantra API docs during integration testing */
export async function createPatient(data: OptiMantraPatientInput): Promise<OptiMantraPatient> {
  return request<OptiMantraPatient>('POST', '/patients', data)
}

/** VERIFY against OptiMantra API docs during integration testing */
export async function updatePatient(patientId: string, data: Partial<OptiMantraPatientInput>): Promise<OptiMantraPatient> {
  return request<OptiMantraPatient>('PATCH', `/patients/${patientId}`, data)
}

// ── Clinical Data ───────────────────────────────────────────

/** VERIFY against OptiMantra API docs during integration testing */
export async function getPrescriptions(patientId: string, dateRange?: DateRange): Promise<OptiMantraPrescription[]> {
  const params = buildDateParams(dateRange)
  const result = await request<{ prescriptions: OptiMantraPrescription[] }>('GET', `/patients/${patientId}/prescriptions${params}`)
  return result.prescriptions || []
}

/** VERIFY against OptiMantra API docs during integration testing */
export async function getLabResults(patientId: string, dateRange?: DateRange): Promise<OptiMantraLabResult[]> {
  const params = buildDateParams(dateRange)
  const result = await request<{ lab_results: OptiMantraLabResult[] }>('GET', `/patients/${patientId}/lab-results${params}`)
  return result.lab_results || []
}

/** VERIFY against OptiMantra API docs during integration testing */
export async function getAppointments(patientId: string, dateRange?: DateRange): Promise<OptiMantraAppointment[]> {
  const params = buildDateParams(dateRange)
  const result = await request<{ appointments: OptiMantraAppointment[] }>('GET', `/patients/${patientId}/appointments${params}`)
  return result.appointments || []
}

// ── Documents ───────────────────────────────────────────────

/** VERIFY against OptiMantra API docs during integration testing */
export async function uploadDocument(
  patientId: string,
  file: Buffer | string,
  metadata: DocumentMetadata,
): Promise<OptiMantraDocument> {
  // Document upload likely uses multipart/form-data — verify with OptiMantra docs
  // For now, use JSON with base64-encoded file
  const fileBase64 = typeof file === 'string' ? file : file.toString('base64')
  return request<OptiMantraDocument>('POST', `/patients/${patientId}/documents`, {
    ...metadata,
    file_content: fileBase64,
  })
}

/** VERIFY against OptiMantra API docs during integration testing */
export async function getDocument(documentId: string): Promise<OptiMantraDocument> {
  return request<OptiMantraDocument>('GET', `/documents/${documentId}`)
}

// ── Providers ───────────────────────────────────────────────

/** VERIFY against OptiMantra API docs during integration testing */
export async function getProvider(providerId: string): Promise<OptiMantraProvider> {
  return request<OptiMantraProvider>('GET', `/providers/${providerId}`)
}
