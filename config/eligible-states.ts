/**
 * Bloom Metabolics — Eligible States for Telehealth Services
 * Single source of truth. California only at launch.
 */

export const ELIGIBLE_STATES = ['CA'] as const

export type EligibleState = typeof ELIGIBLE_STATES[number]

export function isEligibleState(state: string): boolean {
  return ELIGIBLE_STATES.includes(state.toUpperCase() as EligibleState)
}

export function getStateName(code: string): string {
  const names: Record<string, string> = {
    CA: 'California',
    TX: 'Texas', NY: 'New York', FL: 'Florida', IL: 'Illinois',
    PA: 'Pennsylvania', OH: 'Ohio', GA: 'Georgia', NC: 'North Carolina',
    MI: 'Michigan', NJ: 'New Jersey', VA: 'Virginia', WA: 'Washington',
    AZ: 'Arizona', MA: 'Massachusetts', TN: 'Tennessee', IN: 'Indiana',
    MO: 'Missouri', MD: 'Maryland', WI: 'Wisconsin', CO: 'Colorado',
    MN: 'Minnesota', SC: 'South Carolina', AL: 'Alabama', LA: 'Louisiana',
    KY: 'Kentucky', OR: 'Oregon', OK: 'Oklahoma', CT: 'Connecticut',
    UT: 'Utah', IA: 'Iowa', NV: 'Nevada', AR: 'Arkansas', MS: 'Mississippi',
    KS: 'Kansas', NM: 'New Mexico', NE: 'Nebraska', ID: 'Idaho',
    WV: 'West Virginia', HI: 'Hawaii', NH: 'New Hampshire', ME: 'Maine',
    MT: 'Montana', RI: 'Rhode Island', DE: 'Delaware', SD: 'South Dakota',
    ND: 'North Dakota', AK: 'Alaska', VT: 'Vermont', WY: 'Wyoming',
    DC: 'District of Columbia',
  }
  return names[code.toUpperCase()] || code
}
