/**
 * Bloom Metabolics — Waitlist Zod Schema
 */

import { z } from 'zod'
import { STATE_CODES, INTEREST_VALUES } from './constants'

const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/

export const waitlistSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(phoneRegex, 'Please enter a valid US phone number'),
  state: z.string().refine(v => (STATE_CODES as readonly string[]).includes(v), 'Please select a state'),
  primaryInterest: z.string().refine(v => (INTEREST_VALUES as readonly string[]).includes(v), 'Please select your primary interest'),
  preferredContact: z.enum(['email', 'text', 'phone']),
  timeline: z.string().optional(),
  notes: z.string().max(1000, 'Notes must be under 1000 characters').optional(),
  medicalDisclaimer: z.literal(true, { errorMap: () => ({ message: 'You must acknowledge this disclaimer' }) }),
  tcpaConsent: z.boolean().optional(),
  // Hidden fields
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
  referrer: z.string().optional(),
  landingPage: z.string().optional(),
  userAgent: z.string().optional(),
  // Honeypot
  website: z.string().optional(),
  // Turnstile token
  turnstileToken: z.string().optional(),
})

export type WaitlistFormData = z.infer<typeof waitlistSchema>

/** Server-side schema — stricter validation */
export const waitlistServerSchema = z.object({
  firstName: z.string().min(1).max(100).trim(),
  lastName: z.string().min(1).max(100).trim(),
  email: z.string().email().trim().toLowerCase(),
  phone: z.string().regex(phoneRegex),
  state: z.string().refine(v => (STATE_CODES as readonly string[]).includes(v)),
  primaryInterest: z.string().refine(v => (INTEREST_VALUES as readonly string[]).includes(v)),
  preferredContact: z.enum(['email', 'text', 'phone']).default('email'),
  timeline: z.string().max(50).optional(),
  notes: z.string().max(1000).optional(),
  medicalDisclaimer: z.literal(true),
  tcpaConsent: z.boolean().optional(),
  utmSource: z.string().max(500).optional(),
  utmMedium: z.string().max(500).optional(),
  utmCampaign: z.string().max(500).optional(),
  utmTerm: z.string().max(500).optional(),
  utmContent: z.string().max(500).optional(),
  referrer: z.string().max(2000).optional(),
  landingPage: z.string().max(2000).optional(),
  userAgent: z.string().max(1000).optional(),
  website: z.string().optional(),
  turnstileToken: z.string().optional(),
})
