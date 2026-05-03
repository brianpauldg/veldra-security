import { describe, it, expect } from 'vitest'
import { enrollInSequence, exitSequence, getActiveEnrollments, getDueEnrollments } from '@/lib/email/sequence-engine'

describe('sequence engine', () => {
  const steps = [
    { id: 'step_1', delay_hours: 0, template_id: 'welcome-after-lead' },
    { id: 'step_2', delay_hours: 24, template_id: 'quiz-completion-followup' },
  ]

  it('enrolls a lead in a sequence', () => {
    const enrollment = enrollInSequence('lead_seq_1', 'lead_nurture_v1', steps)
    expect(enrollment.status).toBe('active')
    expect(enrollment.sequence_id).toBe('lead_nurture_v1')
    expect(enrollment.current_step_id).toBe('step_1')
  })

  it('exits a sequence', () => {
    enrollInSequence('lead_seq_2', 'lead_nurture_v1', steps)
    exitSequence('lead_seq_2', 'lead_nurture_v1', 'converted')
    const active = getActiveEnrollments().filter(e => e.lead_id === 'lead_seq_2')
    expect(active).toHaveLength(0)
  })

  it('getDueEnrollments returns enrollments past their next_step_at', () => {
    // Enroll with 0 delay — should be immediately due
    enrollInSequence('lead_seq_3', 'immediate_test', [
      { id: 'step_now', delay_hours: 0, template_id: 'test' },
    ])
    const due = getDueEnrollments()
    expect(due.some(e => e.lead_id === 'lead_seq_3')).toBe(true)
  })
})
