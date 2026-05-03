import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockUpdate = vi.fn().mockReturnValue({ eq: vi.fn().mockResolvedValue({ data: null }) })
const mockInsert = vi.fn().mockResolvedValue({ data: null })
const mockDownload = vi.fn()
const mockConsentData = vi.fn()

vi.mock('@/lib/supabase-admin', () => ({
  getSupabaseAdmin: () => ({
    from: (table: string) => {
      if (table === 'signed_consents') {
        return {
          select: () => ({
            eq: () => ({
              single: mockConsentData,
            }),
          }),
          update: mockUpdate,
        }
      }
      if (table === 'medical_director_review_queue') {
        return { insert: mockInsert }
      }
      return {}
    },
    storage: {
      from: () => ({ download: mockDownload }),
    },
  }),
}))

vi.mock('@/config/integrations/ehr', () => ({
  getEHRAdapter: () => ({
    pushSignedConsentPDF: vi.fn().mockResolvedValue({ ehrDocumentId: 'ehr_doc_1' }),
  }),
}))

vi.mock('@/lib/clinic/audit', () => ({ logAudit: vi.fn() }))

import { pushConsentToEHR } from '@/lib/clinic/consent-push'

describe('consent-push', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockConsentData.mockResolvedValue({
      data: {
        id: 'consent_1',
        patient_id: 'local_1',
        consent_type: 'trt',
        consent_version: '1.0',
        signed_at: '2026-01-01',
        patient_name: 'John Doe',
        ehr_document_id: null,
        pdf_path: 'consents/consent_1.pdf',
      },
    })
    mockDownload.mockResolvedValue({ data: new Blob(['pdf content']), error: null })
  })

  it('pushConsentToEHR succeeds and returns ehrDocumentId', async () => {
    const result = await pushConsentToEHR('consent_1')
    expect(result.pushed).toBe(true)
    expect(result.ehrDocumentId).toBe('ehr_doc_1')
  })

  it('updates signed_consents row with ehr_document_id', async () => {
    await pushConsentToEHR('consent_1')
    expect(mockUpdate).toHaveBeenCalled()
  })

  it('audit log captures push attempt', async () => {
    const { logAudit } = await import('@/lib/clinic/audit')
    await pushConsentToEHR('consent_1')
    expect(logAudit).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'consent_pushed_to_ehr' })
    )
  })

  it('failure records ehr_push_error and creates alert', async () => {
    mockDownload.mockResolvedValue({ data: null, error: { message: 'not found' } })
    const result = await pushConsentToEHR('consent_1')
    expect(result.pushed).toBe(false)
    expect(result.error).toContain('PDF download failed')
    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({ alert_type: 'consent_push_failed' })
    )
  })

  it('idempotent: returns existing ehrDocumentId without re-uploading', async () => {
    mockConsentData.mockResolvedValue({
      data: {
        id: 'consent_2',
        patient_id: 'local_1',
        ehr_document_id: 'already_pushed',
        pdf_path: 'x.pdf',
      },
    })
    const result = await pushConsentToEHR('consent_2')
    expect(result.pushed).toBe(true)
    expect(result.ehrDocumentId).toBe('already_pushed')
    expect(mockDownload).not.toHaveBeenCalled()
  })

  it('failure creates medical_director_review_queue alert', async () => {
    mockDownload.mockResolvedValue({ data: null, error: { message: 'storage error' } })
    await pushConsentToEHR('consent_1')
    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'medium' })
    )
  })
})
