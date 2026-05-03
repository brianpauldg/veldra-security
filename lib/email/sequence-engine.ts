/**
 * Bloom Metabolics — Email Sequence Engine
 * Manages nurture sequences with step scheduling and exit conditions.
 */

import { logAudit } from '@/lib/clinic/audit'

export interface SequenceStep {
  id: string
  delay_hours: number
  template_id: string
}

export interface Sequence {
  id: string
  name: string
  trigger_event: string
  exit_events: string[]
  steps: SequenceStep[]
}

export interface Enrollment {
  id: string
  lead_id: string
  sequence_id: string
  current_step_id: string | null
  status: 'active' | 'completed' | 'exited' | 'paused'
  enrolled_at: string
  next_step_at: string | null
}

// In-memory store for V1
const enrollmentStore: Enrollment[] = []
let enrollmentCounter = 0

export function enrollInSequence(leadId: string, sequenceId: string, steps: SequenceStep[]): Enrollment {
  const firstStep = steps[0]
  const enrollment: Enrollment = {
    id: `enr_${++enrollmentCounter}`,
    lead_id: leadId,
    sequence_id: sequenceId,
    current_step_id: firstStep?.id || null,
    status: 'active',
    enrolled_at: new Date().toISOString(),
    next_step_at: firstStep ? new Date(Date.now() + firstStep.delay_hours * 3600000).toISOString() : null,
  }
  enrollmentStore.push(enrollment)

  logAudit({
    userId: 'system', userName: 'Sequences', userRole: 'super_admin',
    action: 'sequence_enrolled', resourceType: 'sequence_enrollments',
    resourceId: enrollment.id, details: { sequence_id: sequenceId },
  })

  return enrollment
}

export function exitSequence(leadId: string, sequenceId: string, reason: string): void {
  const enrollment = enrollmentStore.find(e => e.lead_id === leadId && e.sequence_id === sequenceId && e.status === 'active')
  if (enrollment) {
    enrollment.status = 'exited'

    logAudit({
      userId: 'system', userName: 'Sequences', userRole: 'super_admin',
      action: 'sequence_exited', resourceType: 'sequence_enrollments',
      resourceId: enrollment.id, details: { reason },
    })
  }
}

export function getActiveEnrollments(): Enrollment[] {
  return enrollmentStore.filter(e => e.status === 'active')
}

export function getDueEnrollments(): Enrollment[] {
  const now = new Date()
  return enrollmentStore.filter(e =>
    e.status === 'active' && e.next_step_at && new Date(e.next_step_at) <= now
  )
}
