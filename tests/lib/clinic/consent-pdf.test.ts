import { describe, it, expect } from 'vitest'
import { generateConsentPDF } from '@/lib/clinic/consent-pdf'

describe('consent-pdf', () => {
  it('generates a valid PDF buffer', async () => {
    const pdf = await generateConsentPDF({
      templateTitle: 'Test Consent',
      templateBody: '# Test\n\nThis is a test consent document.\n\n## Section 1\n\nSome content here.',
      templateVersion: '1.0',
      patientName: 'Test Patient',
      signatureDataURL: '', // Empty signature for test
      signedAt: new Date().toISOString(),
      ipAddress: '127.0.0.1',
      contentHash: 'abc123def456',
    })

    expect(pdf).toBeInstanceOf(Buffer)
    expect(pdf.length).toBeGreaterThan(100) // PDF should have substantial content

    // Verify PDF magic number (%PDF-)
    const header = pdf.slice(0, 5).toString('ascii')
    expect(header).toBe('%PDF-')
  })

  it('generates PDF with signature image embedded', async () => {
    // 1x1 transparent PNG as base64
    const tinyPNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='

    const pdf = await generateConsentPDF({
      templateTitle: 'TRT Consent',
      templateBody: '## Risks\n\n- Polycythemia\n- Sleep apnea',
      templateVersion: '1.0',
      patientName: 'John Doe',
      signatureDataURL: tinyPNG,
      signedAt: '2026-04-28T12:00:00Z',
      ipAddress: '10.0.0.1',
      contentHash: 'deadbeef',
    })

    expect(pdf).toBeInstanceOf(Buffer)
    expect(pdf.length).toBeGreaterThan(500) // Should be larger with embedded image
    expect(pdf.slice(0, 5).toString('ascii')).toBe('%PDF-')
  })

  it('handles missing signature gracefully', async () => {
    const pdf = await generateConsentPDF({
      templateTitle: 'Telehealth Consent',
      templateBody: 'Simple consent text.',
      templateVersion: '1.0',
      patientName: 'Jane Smith',
      signatureDataURL: 'not-a-valid-data-url',
      signedAt: new Date().toISOString(),
      ipAddress: '',
      contentHash: 'hash123',
    })

    expect(pdf).toBeInstanceOf(Buffer)
    expect(pdf.slice(0, 5).toString('ascii')).toBe('%PDF-')
  })
})
