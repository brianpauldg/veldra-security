/**
 * Bloom Metabolics — Compoundable Drugs Registry
 * Drugs requiring patient-specific medical necessity justification per FDA April 2026.
 * Peptides excluded pending FDA PCAC. Retatrutide explicitly banned.
 */

export const COMPOUNDABLE_DRUGS = [
  { id: 'compounded_semaglutide', display_name: 'Compounded Semaglutide', requires_justification: true },
  { id: 'compounded_tirzepatide', display_name: 'Compounded Tirzepatide', requires_justification: true },
] as const

export type CompoundableDrugId = typeof COMPOUNDABLE_DRUGS[number]['id']

export function getDrugById(id: string) {
  return COMPOUNDABLE_DRUGS.find(d => d.id === id) || null
}

export function requiresJustification(drugId: string): boolean {
  const drug = getDrugById(drugId)
  return drug?.requires_justification ?? false
}
