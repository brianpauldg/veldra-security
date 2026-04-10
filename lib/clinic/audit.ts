import type { AuditLog, UserRole } from './types'

// In-memory audit store for V1 — swap for Supabase/DB in production
const auditStore: AuditLog[] = []

export function logAudit(entry: Omit<AuditLog, 'id' | 'timestamp'>): AuditLog {
  const log: AuditLog = {
    ...entry,
    id: `audit_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
  }
  auditStore.unshift(log)
  // Keep last 10k entries in memory
  if (auditStore.length > 10000) auditStore.pop()
  return log
}

export function getAuditLogs(filters?: {
  userId?: string
  resourceType?: string
  resourceId?: string
  action?: string
  limit?: number
}): AuditLog[] {
  let results = [...auditStore]
  if (filters?.userId) results = results.filter(l => l.userId === filters.userId)
  if (filters?.resourceType) results = results.filter(l => l.resourceType === filters.resourceType)
  if (filters?.resourceId) results = results.filter(l => l.resourceId === filters.resourceId)
  if (filters?.action) results = results.filter(l => l.action === filters.action)
  return results.slice(0, filters?.limit ?? 100)
}

// PHI-conscious: strip sensitive fields from log details
export function sanitizeForLog(data: Record<string, unknown>): Record<string, unknown> {
  const sensitive = ['ssn', 'socialSecurity', 'password', 'token', 'secret', 'creditCard']
  const sanitized: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(data)) {
    if (sensitive.some(s => key.toLowerCase().includes(s))) {
      sanitized[key] = '[REDACTED]'
    } else {
      sanitized[key] = value
    }
  }
  return sanitized
}
