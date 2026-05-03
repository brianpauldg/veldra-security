/**
 * Bloom Metabolics — PMP/CURES Attestation Validator
 * California CURES PDMP compliance for Schedule III TRT prescriptions.
 */

import type { PMPQueryInput, ValidationResult } from '../types/compliance'

/**
 * Check if any finding in the checklist is true.
 */
function hasAnyFinding(checklist: PMPQueryInput['findings_checklist']): boolean {
  return Object.values(checklist).some(Boolean)
}

/**
 * Validate PMP query/attestation input.
 */
export function validatePMPInput(input: PMPQueryInput): ValidationResult {
  const warnings: string[] = []

  if (!input.patient_id) return { valid: false, reason: 'Patient ID is required.' }
  if (!input.prescriber_id) return { valid: false, reason: 'Prescriber ID is required.' }
  if (!input.prescriber_dea) return { valid: false, reason: 'Prescriber DEA number is required.' }
  if (!input.attestation_signature) return { valid: false, reason: 'Attestation signature is required.' }

  // dosespot_pmp requires query_reference
  if (input.query_method === 'dosespot_pmp' && !input.query_reference) {
    return { valid: false, reason: 'DoseSpot PMP queries require a query reference ID.' }
  }

  // If any finding is true, clinical_judgment_text is required (min 50 chars)
  if (hasAnyFinding(input.findings_checklist)) {
    if (!input.clinical_judgment_text || input.clinical_judgment_text.trim().length < 50) {
      return {
        valid: false,
        reason: 'Clinical judgment text is required (minimum 50 characters) when concerning findings are present.',
      }
    }
  }

  // Risk stratification alignment check (warning, not blocking)
  if (hasAnyFinding(input.findings_checklist) && input.risk_stratification === 'none') {
    const activeFindings = Object.entries(input.findings_checklist)
      .filter(([, v]) => v)
      .map(([k]) => k)
    warnings.push(
      `Risk stratification is 'none' but findings are present: ${activeFindings.join(', ')}. Consider reassessing risk level.`
    )
  }

  // High-risk combination check
  if (
    input.findings_checklist.multiple_prescribers &&
    input.findings_checklist.concurrent_benzo_or_opioid
  ) {
    if (input.risk_stratification !== 'high' && input.risk_stratification !== 'declined_to_prescribe') {
      warnings.push(
        'Multiple prescribers AND concurrent benzodiazepine/opioid detected. Risk stratification should typically be "high" or "declined_to_prescribe".'
      )
    }
  }

  // Outage attestation requires details
  if (input.outage_attested && (!input.outage_details || input.outage_details.trim().length === 0)) {
    return { valid: false, reason: 'Outage details are required when CURES outage is attested.' }
  }

  return { valid: true, warnings: warnings.length > 0 ? warnings : undefined }
}

/**
 * Determine if a PMP query requires medical director review.
 */
export function requiresMedDirectorReview(input: PMPQueryInput): boolean {
  // High or declined_to_prescribe always needs review
  if (input.risk_stratification === 'high' || input.risk_stratification === 'declined_to_prescribe') {
    return true
  }

  // Multiple high-risk findings
  const findingCount = Object.values(input.findings_checklist).filter(Boolean).length
  if (findingCount >= 3) return true

  // Specific dangerous combinations
  if (input.findings_checklist.concurrent_benzo_or_opioid) return true
  if (input.findings_checklist.recent_decline_elsewhere) return true

  // Outage attestation
  if (input.outage_attested) return true

  return false
}
