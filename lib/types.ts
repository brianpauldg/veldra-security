import { z } from 'zod'

// ── Lead / Patient Lifecycle ──────────────────────────────
export type LeadStage =
  | 'new_lead'
  | 'engaged'
  | 'consultation_purchased'
  | 'booking_pending'
  | 'booked'
  | 'intake_pending'
  | 'intake_completed'
  | 'medical_review'
  | 'qualified'
  | 'treatment_plan_presented'
  | 'active_patient'
  | 'ongoing_member'
  | 'upsell_candidate'
  | 'reactivation_candidate'
  | 'lost'
  | 'unqualified'

export type ServiceInterest = 'trt' | 'glp1' | 'mixed'

export type LeadSegment =
  | 'trt_interest'
  | 'glp1_interest'
  | 'mixed_interest'
  | 'high_intent_buyer'
  | 'nurture_subscriber'

// ── Form Schemas ──────────────────────────────────────────
export const leadCaptureSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  serviceInterest: z.enum(['trt', 'glp1', 'general']),
  goals: z.string().optional(),
})

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export const emailCaptureSchema = z.object({
  email: z.string().email('Valid email is required'),
  serviceInterest: z.enum(['trt', 'glp1', 'general']).optional(),
})

export const consultationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  serviceInterest: z.enum(['trt', 'glp1', 'general']),
  goals: z.string().optional(),
  age: z.string().optional(),
  state: z.string().optional(),
})

export type LeadCaptureData = z.infer<typeof leadCaptureSchema>
export type ContactFormData = z.infer<typeof contactFormSchema>
export type EmailCaptureData = z.infer<typeof emailCaptureSchema>
export type ConsultationData = z.infer<typeof consultationSchema>

// ── CRM Events ────────────────────────────────────────────
export type CRMEventType =
  | 'lead_captured'
  | 'email_subscribed'
  | 'consultation_started'
  | 'checkout_initiated'
  | 'checkout_completed'
  | 'checkout_abandoned'
  | 'booking_completed'
  | 'intake_started'
  | 'intake_completed'
  | 'form_submitted'
  | 'page_viewed'
  | 'stage_updated'
  | 'quiz_completed'
  | 'popup_shown'
  | 'popup_dismissed'
  | 'popup_cta_clicked'

export interface CRMEvent {
  type: CRMEventType
  timestamp: string
  data: Record<string, unknown>
  leadId?: string
  sessionId?: string
}

// ── Treatment Types ───────────────────────────────────────
export interface Treatment {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  benefits: string[]
  process: { step: number; title: string; description: string }[]
  faqs: { question: string; answer: string }[]
}
