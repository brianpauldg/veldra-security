// lib/validation.ts — request validation helpers using zod
import { z } from 'zod'

export const clientSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  notes: z.string().optional(),
})

export function validateRequest(schema: z.ZodTypeAny, data: unknown) {
  const result = schema.safeParse(data)
  if (!result.success) {
    const errors = result.error.errors.map(e => `${e.path.join('.')} ${e.message`).join('; ')
    throw new Error('Validation failed: ' + errors)
  }
  return result.data
}

export function isValidUUID(id?: string) {
  if (!id) return false
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)
}
