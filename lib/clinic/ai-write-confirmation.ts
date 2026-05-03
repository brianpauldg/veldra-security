/**
 * Bloom Metabolics — AB 3030 AI Write Confirmation System
 * Every AI-suggested write requires explicit clinician confirmation via one-time token.
 */

import crypto from 'crypto'
import type { AIWriteConfirmationInput } from './types/compliance'

const DEFAULT_EXPIRY_MS = 60 * 60 * 1000 // 1 hour

/**
 * Generate a secure random hex token (32 bytes = 64 hex chars).
 */
function generateToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

/**
 * Create a confirmation record. Returns token + expiration.
 * In production, persists to ai_write_confirmations table.
 */
export function createConfirmationPayload(input: AIWriteConfirmationInput): {
  token: string
  expiresAt: Date
  record: Record<string, unknown>
} {
  const token = generateToken()
  const now = new Date()
  const expiresAt = new Date(now.getTime() + (input.expires_in_ms || DEFAULT_EXPIRY_MS))

  return {
    token,
    expiresAt,
    record: {
      token,
      ai_source: input.ai_source,
      write_action: input.write_action,
      write_payload: input.write_payload,
      patient_id: input.patient_id || null,
      suggested_at: now.toISOString(),
      expires_at: expiresAt.toISOString(),
    },
  }
}

/**
 * Verify a confirmation token is valid for execution.
 * Returns the payload if valid, or rejection reason.
 */
export function verifyConfirmationRecord(
  record: Record<string, unknown> | null,
  clinicianId: string
): { valid: boolean; payload?: Record<string, unknown>; reason?: string } {
  if (!record) {
    return { valid: false, reason: 'Confirmation token not found.' }
  }

  // Check expiration
  const expiresAt = new Date(record.expires_at as string)
  if (new Date() > expiresAt) {
    return { valid: false, reason: 'Confirmation token has expired.' }
  }

  // Check already confirmed
  if (record.confirmed_at) {
    return { valid: false, reason: 'Confirmation token has already been used.' }
  }

  // Check already rejected
  if (record.rejected_at) {
    return { valid: false, reason: 'Confirmation token was rejected.' }
  }

  // Check already executed
  if (record.executed_at) {
    return { valid: false, reason: 'This write has already been executed.' }
  }

  return {
    valid: true,
    payload: record.write_payload as Record<string, unknown>,
  }
}

/**
 * Check if a set of tokens are all unique (entropy verification).
 */
export function verifyTokenEntropy(tokens: string[]): boolean {
  return new Set(tokens).size === tokens.length
}
