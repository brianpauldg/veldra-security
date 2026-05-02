/**
 * Bloom Metabolics — Email Template Categories
 * TCPA + CAN-SPAM categorization for every email template.
 */

export type EmailCategory = 'transactional' | 'healthcare_exempt' | 'marketing'

export interface TemplateMetadata {
  id: string
  category: EmailCategory
  requires_consent: boolean
  requires_human_review: boolean // AB 3030 clinical flag
  description: string
}

const TEMPLATES: TemplateMetadata[] = [
  { id: 'welcome-after-lead', category: 'marketing', requires_consent: true, requires_human_review: false, description: 'Welcome email after lead capture' },
  { id: 'quiz-completion-followup', category: 'marketing', requires_consent: true, requires_human_review: false, description: 'Follow-up after quiz if no consult booked' },
  { id: 'consult-confirmation', category: 'transactional', requires_consent: false, requires_human_review: false, description: 'Consultation booking confirmation' },
  { id: 'consult-reminder', category: 'transactional', requires_consent: false, requires_human_review: false, description: '24h consultation reminder' },
  { id: 'consult-followup', category: 'marketing', requires_consent: true, requires_human_review: false, description: 'Post-consult follow-up' },
  { id: 'referral-invitation', category: 'marketing', requires_consent: true, requires_human_review: false, description: 'Referral invitation to referee' },
  { id: 'order-thank-you', category: 'transactional', requires_consent: false, requires_human_review: false, description: 'Post-order thank-you with review incentive' },
]

export function getTemplateMetadata(templateId: string): TemplateMetadata | null {
  return TEMPLATES.find(t => t.id === templateId) || null
}

export function requiresConsent(templateId: string): boolean {
  const meta = getTemplateMetadata(templateId)
  return meta?.requires_consent ?? true // default: require consent
}

export function requiresHumanReview(templateId: string): boolean {
  const meta = getTemplateMetadata(templateId)
  return meta?.requires_human_review ?? false
}
