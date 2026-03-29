// lib/validation.ts — Input sanitization and validation
// Use on ALL API routes and server actions

import { z } from 'zod'

// ── SANITIZE STRING INPUT ─────────────────────────────────────────────────────
export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '')           // Remove HTML brackets
    .replace(/javascript:/gi, '')   // Remove JS protocol
    .replace(/on\w+=/gi, '')        // Remove event handlers
    .substring(0, 10000)            // Limit length
}

// ── SANITIZE EMAIL ────────────────────────────────────────────────────────────
export function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase().substring(0, 255)
}

// ── VALIDATE UUID ─────────────────────────────────────────────────────────────
export function isValidUUID(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
}

// ── ZOD SCHEMAS FOR API VALIDATION ───────────────────────────────────────────

// Client creation/update
export const clientSchema = z.object({
  name: z.string().min(1).max(200).transform(sanitizeString),
  contact_name: z.string().max(200).optional().transform(v => v ? sanitizeString(v) : v),
  contact_email: z.string().email().max(255).optional().transform(v => v ? sanitizeEmail(v) : v),
  industry: z.enum(['accounting', 'legal', 'hr', 'other']).optional(),
  employee_count: z.number().int().min(1).max(100000).optional(),
  baa_status: z.enum(['pending', 'signed', 'expired', 'not_required']).optional(),
  status: z.enum(['active', 'review', 'onboarding', 'inactive']).optional(),
  frameworks: z.array(z.string().max(50)).max(20).optional(),
})

// Compliance alert creation
export const alertSchema = z.object({
  title: z.string().min(1).max(500).transform(sanitizeString),
  category: z.string().min(1).max(100).transform(sanitizeString),
  severity: z.enum(['high', 'medium', 'low']),
  summary: z.string().max(5000).optional().transform(v => v ? sanitizeString(v) : v),
  action_checklist: z.string().max(10000).optional(),
  source_url: z.string().url().max(2000).optional(),
  effective_date: z.string().datetime().optional(),
})

// Message creation
export const messageSchema = z.object({
  content: z.string().min(1).max(10000).transform(sanitizeString),
  recipient_id: z.string().uuid().optional(),
  client_id: z.string().uuid().optional(),
})

// Document upload metadata
export const documentSchema = z.object({
  name: z.string().min(1).max(500).transform(sanitizeString),
  doc_type: z.enum(['baa', 'policy', 'contract', 'report', 'form', 'other']),
  client_id: z.string().uuid().optional(),
})

// Onboarding form
export const onboardingSchema = z.object({
  firm_name: z.string().min(1).max(200).transform(sanitizeString),
  firm_type: z.enum(['accounting', 'hr_consultancy', 'staffing', 'legal', 'other']),
  state: z.string().length(2).toUpperCase(),
  headcount: z.number().int().min(1).max(100000),
})

// Password validation (for custom password change)
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128)
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')

// ── API ROUTE VALIDATOR ────────────────────────────────────────────────────────
export function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data)
  if (!result.success) {
    throw new Error(`Validation failed: ${result.error.message}`)
  }
  return result.data
}
