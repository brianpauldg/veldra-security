/**
 * Bloom Metabolics — Compounded Rx Justification Validator
 * FDA April 1 2026 — validates clinical rationale for patient-specific medical necessity.
 * Rejects cost-only or convenience-only justifications.
 */

import type { CompoundedRxJustificationInput, ValidationResult } from '../types/compliance'

// Cost/convenience denylist — case-insensitive, includes common inflections
const DENYLIST_STEMS = [
  'cost', 'cheap', 'afford', 'sav', 'expens', 'price', 'budget',
  'conveni', 'prefer', 'easier', 'simple',
]

const DENYLIST_EXACT = new Set([
  'cost', 'costs', 'cheaper', 'cheapest', 'affordable', 'affordability',
  'saving', 'savings', 'save', 'saves', 'expensive', 'less expensive',
  'more affordable', 'lower price', 'lower cost', 'save money',
  'convenience', 'convenient', 'preference', 'prefer', 'prefers',
  'preferred', 'easier', 'simpler', 'budget',
])

/**
 * Tokenize text into lowercase words.
 */
export function tokenize(text: string): string[] {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean)
}

/**
 * Check if a token matches the denylist (exact match or stem match).
 */
function isDenylistToken(token: string): boolean {
  if (DENYLIST_EXACT.has(token)) return true
  return DENYLIST_STEMS.some(stem => token.startsWith(stem))
}

/**
 * Validate clinical rationale text.
 * Rejects if: empty, too short, or >50% denylist content.
 */
export function validateClinicalRationale(text: string): ValidationResult {
  if (!text || text.trim().length === 0) {
    return { valid: false, reason: 'Clinical rationale is required.' }
  }

  if (text.trim().length < 100) {
    return { valid: false, reason: `Clinical rationale must be at least 100 characters. Current: ${text.trim().length}.` }
  }

  const tokens = tokenize(text)
  if (tokens.length === 0) {
    return { valid: false, reason: 'Clinical rationale contains no meaningful content.' }
  }

  const denylistTokens = tokens.filter(isDenylistToken)
  const denylistRatio = denylistTokens.length / tokens.length

  if (denylistRatio > 0.5) {
    return {
      valid: false,
      reason: `Clinical rationale appears to be primarily cost or convenience-based (${Math.round(denylistRatio * 100)}% flagged content). Patient-specific medical necessity must be the primary justification.`,
      offending_phrases: [...new Set(denylistTokens)],
    }
  }

  if (denylistTokens.length > 0 && denylistRatio <= 0.5) {
    return {
      valid: true,
      warnings: [`Rationale contains cost/convenience language (${denylistTokens.join(', ')}). Ensure clinical necessity is the primary justification.`],
      offending_phrases: [...new Set(denylistTokens)],
    }
  }

  return { valid: true }
}

/**
 * Validate full justification input.
 */
export function validateJustificationInput(input: CompoundedRxJustificationInput): ValidationResult {
  if (!input.patient_id) return { valid: false, reason: 'Patient ID is required.' }
  if (!input.drug) return { valid: false, reason: 'Drug name is required.' }
  if (!input.deviation_categories || input.deviation_categories.length === 0) {
    return { valid: false, reason: 'At least one deviation category is required.' }
  }
  if (!input.prescriber_id) return { valid: false, reason: 'Prescriber ID is required.' }
  if (!input.prescriber_npi) return { valid: false, reason: 'Prescriber NPI is required.' }
  if (!input.prescriber_signature) return { valid: false, reason: 'Prescriber signature is required.' }

  return validateClinicalRationale(input.clinical_rationale)
}
