import { describe, it, expect } from 'vitest'
import { getConsentTemplate, getCurrentConsentTemplates } from '@/lib/clinic/consent-templates'

describe('consent-templates', () => {
  it('getConsentTemplate returns TRT template for version 1.0', () => {
    const template = getConsentTemplate('trt-informed-consent', '1.0')
    expect(template).not.toBeNull()
    expect(template!.id).toBe('trt-informed-consent')
    expect(template!.version).toBe('1.0')
    expect(template!.title).toContain('Testosterone')
    expect(template!.body).toContain('Polycythemia')
    expect(template!.body).toContain('Schedule III')
    expect(template!.esignature_required).toBe(true)
  })

  it('getConsentTemplate returns GLP-1 template', () => {
    const template = getConsentTemplate('glp1-informed-consent')
    expect(template).not.toBeNull()
    expect(template!.body).toContain('Compounded medications are NOT FDA-approved')
    expect(template!.body).toContain('Thyroid C-cell')
    expect(template!.body).toContain('CONTRAINDICATED')
  })

  it('getConsentTemplate returns telehealth template', () => {
    const template = getConsentTemplate('telehealth-informed-consent')
    expect(template).not.toBeNull()
    expect(template!.body).toContain('call 911')
    expect(template!.body).toContain('not recorded')
  })

  it('getConsentTemplate returns null for unknown template', () => {
    expect(getConsentTemplate('nonexistent')).toBeNull()
  })

  it('getCurrentConsentTemplates returns all current versions', () => {
    const templates = getCurrentConsentTemplates()
    expect(templates.length).toBe(3)
    const ids = templates.map(t => t.id)
    expect(ids).toContain('trt-informed-consent')
    expect(ids).toContain('glp1-informed-consent')
    expect(ids).toContain('telehealth-informed-consent')
  })
})
