/**
 * Bloom Metabolics — Referral Code System
 */

import crypto from 'crypto'

const codeStore = new Map<string, string>() // code → patient_id

export function generateReferralCode(patientId: string): string {
  // Check if patient already has a code
  for (const [code, pid] of codeStore) {
    if (pid === patientId) return code
  }

  // Generate 8-char alphanumeric code
  let code: string
  do {
    code = crypto.randomBytes(4).toString('hex').toUpperCase().slice(0, 8)
  } while (codeStore.has(code))

  codeStore.set(code, patientId)
  return code
}

export function lookupByCode(code: string): { patient_id: string } | null {
  const patientId = codeStore.get(code.toUpperCase())
  return patientId ? { patient_id: patientId } : null
}

export function isCodeActive(code: string): boolean {
  return codeStore.has(code.toUpperCase())
}
