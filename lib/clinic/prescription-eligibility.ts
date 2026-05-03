/**
 * Bloom Metabolics — Prescription Eligibility Gates
 * TRT: CURES/PMP gate (Schedule III)
 * GLP-1: Compounded Rx justification gate (FDA April 2026)
 */

import type { EligibilityResult, Provider } from './types/compliance'

const CURES_QUERY_VALIDITY_DAYS = 120
const JUSTIFICATION_VALIDITY_DAYS = 90

/**
 * Check TRT prescription eligibility (CURES gate).
 */
export function getTRTEligibility(
  provider: Provider | null,
  lastQueryDate: string | null,
  lastQueryOutageAttested?: boolean
): EligibilityResult {
  // Provider checks
  if (!provider) {
    return { status: 'BLOCKED_PROVIDER_INELIGIBLE', reason: 'Provider record not found.' }
  }

  if (!provider.cures_enrolled) {
    return { status: 'BLOCKED_PROVIDER_INELIGIBLE', reason: 'Provider is not enrolled in California CURES.', provider_issue: 'cures_not_enrolled' }
  }

  if (provider.dea_expiration) {
    const deaExp = new Date(provider.dea_expiration)
    if (deaExp < new Date()) {
      return { status: 'BLOCKED_PROVIDER_INELIGIBLE', reason: `DEA registration expired on ${provider.dea_expiration}.`, provider_issue: 'dea_expired' }
    }
  }

  if (provider.ca_license_expiration) {
    const licExp = new Date(provider.ca_license_expiration)
    if (licExp < new Date()) {
      return { status: 'BLOCKED_PROVIDER_INELIGIBLE', reason: `California medical license expired on ${provider.ca_license_expiration}.`, provider_issue: 'license_expired' }
    }
  }

  // If NP, check furnishing license
  if (provider.ca_furnishing_license && provider.ca_furnishing_expiration) {
    const furnExp = new Date(provider.ca_furnishing_expiration)
    if (furnExp < new Date()) {
      return { status: 'BLOCKED_PROVIDER_INELIGIBLE', reason: `Furnishing license expired on ${provider.ca_furnishing_expiration}.`, provider_issue: 'furnishing_expired' }
    }
  }

  // PMP query checks
  if (!lastQueryDate) {
    return { status: 'REQUIRES_FIRST_QUERY', reason: 'No prior CURES/PMP query on file. A query is required before the first TRT prescription.' }
  }

  const queryDate = new Date(lastQueryDate)
  const now = new Date()
  const daysSince = Math.floor((now.getTime() - queryDate.getTime()) / (1000 * 60 * 60 * 24))

  if (lastQueryOutageAttested) {
    return { status: 'BLOCKED_OVERRIDE_REQUIRED', reason: 'Most recent CURES query was attested during an outage. Medical director override required.', last_query_date: lastQueryDate, days_since_query: daysSince }
  }

  if (daysSince < CURES_QUERY_VALIDITY_DAYS) {
    return { status: 'ELIGIBLE', last_query_date: lastQueryDate, days_since_query: daysSince }
  }

  return { status: 'REQUIRES_REFRESH', reason: `CURES query is ${daysSince} days old (${CURES_QUERY_VALIDITY_DAYS}-day maximum). A new query is required.`, last_query_date: lastQueryDate, days_since_query: daysSince }
}

/**
 * Check compounded GLP-1 prescription eligibility (justification gate).
 */
export function getCompoundedGLP1Eligibility(
  lastJustificationDate: string | null,
  lastJustificationStatus: string | null
): EligibilityResult {
  if (!lastJustificationDate || lastJustificationStatus !== 'signed') {
    return { status: 'REQUIRES_JUSTIFICATION', reason: 'No signed compounded Rx justification on file. A patient-specific medical necessity justification is required.' }
  }

  const justDate = new Date(lastJustificationDate)
  const now = new Date()
  const daysSince = Math.floor((now.getTime() - justDate.getTime()) / (1000 * 60 * 60 * 24))

  if (daysSince < JUSTIFICATION_VALIDITY_DAYS) {
    return { status: 'ELIGIBLE', last_query_date: lastJustificationDate, days_since_query: daysSince }
  }

  return { status: 'REQUIRES_JUSTIFICATION', reason: `Justification is ${daysSince} days old (${JUSTIFICATION_VALIDITY_DAYS}-day maximum). A new justification is required.`, last_query_date: lastJustificationDate, days_since_query: daysSince }
}
