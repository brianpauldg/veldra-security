import { describe, it, expect } from 'vitest'
import { isEligibleState, ELIGIBLE_STATES, getStateName } from '@/config/eligible-states'

describe('StateGate logic', () => {
  it('CA is eligible', () => {
    expect(isEligibleState('CA')).toBe(true)
    expect(isEligibleState('ca')).toBe(true)
  })

  it('TX is not eligible', () => {
    expect(isEligibleState('TX')).toBe(false)
  })

  it('NY is not eligible', () => {
    expect(isEligibleState('NY')).toBe(false)
  })

  it('ELIGIBLE_STATES contains only CA at launch', () => {
    expect(ELIGIBLE_STATES).toEqual(['CA'])
  })

  it('getStateName returns full name', () => {
    expect(getStateName('CA')).toBe('California')
    expect(getStateName('TX')).toBe('Texas')
    expect(getStateName('NY')).toBe('New York')
  })

  it('getStateName handles lowercase via toUpperCase', () => {
    expect(getStateName('ca')).toBe('California')
  })
})
