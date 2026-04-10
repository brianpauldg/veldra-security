'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  CheckSquare, Clock, AlertCircle, User, CalendarClock,
  ArrowRight, Plus, Pill,
} from 'lucide-react'
import { SEED_TASKS, SEED_REFILLS } from '@/lib/clinic/seed-data'
import type { TaskStatus, TaskPriority, TaskType } from '@/lib/clinic/types'

type Tab = 'tasks' | 'refills'

export default function TasksPage() {
  const [tab, setTab] = useState<Tab>('tasks')
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all')
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all')

  const tasks = useMemo(() => {
    let result = [...SEED_TASKS]
    if (statusFilter !== 'all') result = result.filter(t => t.status === statusFilter)
    if (priorityFilter !== 'all') result = result.filter(t => t.priority === priorityFilter)
    const order = { urgent: 0, high: 1, normal: 2, low: 3 }
    return result.sort((a, b) => order[a.priority] - order[b.priority])
  }, [statusFilter, priorityFilter])

  const pendingCount = SEED_TASKS.filter(t => t.status === 'pending').length
  const inProgressCount = SEED_TASKS.filter(t => t.status === 'in_progress').length
  const pendingRefills = SEED_REFILLS.filter(r => r.status === 'pending').length

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Tasks & Workflows</h1>
          <p className="text-sm text-graphite-500 mt-1">Manage clinical and operational tasks</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-graphite-900 rounded-xl border border-graphite-800 w-fit">
        <TabButton active={tab === 'tasks'} onClick={() => setTab('tasks')} count={pendingCount + inProgressCount}>
          <CheckSquare className="w-3.5 h-3.5" /> Tasks
        </TabButton>
        <TabButton active={tab === 'refills'} onClick={() => setTab('refills')} count={pendingRefills}>
          <Pill className="w-3.5 h-3.5" /> Refills
        </TabButton>
      </div>

      {tab === 'tasks' ? (
        <>
          {/* Task stats */}
          <div className="grid grid-cols-4 gap-3">
            <StatCard label="Pending" value={pendingCount} onClick={() => setStatusFilter(statusFilter === 'pending' ? 'all' : 'pending')} active={statusFilter === 'pending'} />
            <StatCard label="In Progress" value={inProgressCount} onClick={() => setStatusFilter(statusFilter === 'in_progress' ? 'all' : 'in_progress')} active={statusFilter === 'in_progress'} />
            <StatCard label="Urgent" value={SEED_TASKS.filter(t => t.priority === 'urgent' && t.status !== 'completed').length} variant="danger" onClick={() => setPriorityFilter(priorityFilter === 'urgent' ? 'all' : 'urgent')} active={priorityFilter === 'urgent'} />
            <StatCard label="Completed" value={SEED_TASKS.filter(t => t.status === 'completed').length} variant="success" onClick={() => setStatusFilter(statusFilter === 'completed' ? 'all' : 'completed')} active={statusFilter === 'completed'} />
          </div>

          {/* Task list */}
          <div className="space-y-2">
            {tasks.map(task => (
              <div
                key={task.id}
                className="flex items-start gap-4 p-4 rounded-xl bg-graphite-900/50 border border-graphite-800 hover:border-graphite-700 transition-colors"
              >
                <PriorityIndicator priority={task.priority} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-white">{task.title}</p>
                    <TypeBadge type={task.type} />
                  </div>
                  <p className="text-xs text-graphite-400">{task.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-[11px] text-graphite-500">
                    {task.patientName && (
                      <Link href={`/clinic/patients/${task.patientId}`} className="flex items-center gap-1 hover:text-nova-400 transition-colors">
                        <User className="w-3 h-3" /> {task.patientName}
                      </Link>
                    )}
                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {task.assigneeName}</span>
                    <span className="flex items-center gap-1"><CalendarClock className="w-3 h-3" /> Due {task.dueDate}</span>
                  </div>
                </div>
                <StatusPill status={task.status} />
              </div>
            ))}
            {tasks.length === 0 && (
              <div className="text-center py-16 text-graphite-500">
                <CheckSquare className="w-8 h-8 mx-auto mb-3 text-emerald-400" />
                <p className="text-sm">No tasks match your filters.</p>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Refills tab */
        <div className="space-y-2">
          {SEED_REFILLS.map(refill => (
            <div
              key={refill.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-graphite-900/50 border border-graphite-800 hover:border-graphite-700 transition-colors"
            >
              <RefillStatusIcon status={refill.status} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">{refill.medicationName}</p>
                <Link href={`/clinic/patients/${refill.patientId}`} className="text-xs text-graphite-400 hover:text-nova-400 transition-colors">
                  {refill.patientName}
                </Link>
              </div>
              <div className="text-right">
                <span className={cn('text-[10px] px-1.5 py-0.5 rounded capitalize',
                  refill.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
                  refill.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' :
                  refill.status === 'shipped' ? 'bg-blue-500/10 text-blue-400' :
                  'bg-graphite-500/10 text-graphite-400'
                )}>{refill.status}</span>
                <p className="text-[10px] text-graphite-600 mt-0.5">{refill.requestedAt}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Sub-components ───────────────────────────────────────────

function TabButton({ active, onClick, children, count }: {
  active: boolean; onClick: () => void; children: React.ReactNode; count: number
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors',
        active ? 'bg-graphite-800 text-white' : 'text-graphite-500 hover:text-white'
      )}
    >
      {children}
      <span className={cn(
        'text-[10px] px-1.5 py-0.5 rounded-full',
        active ? 'bg-nova-500/20 text-nova-400' : 'bg-graphite-800 text-graphite-500'
      )}>{count}</span>
    </button>
  )
}

function StatCard({ label, value, variant = 'default', onClick, active }: {
  label: string; value: number; variant?: 'default' | 'danger' | 'success'; onClick: () => void; active: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'p-3 rounded-xl border text-left transition-all',
        active && 'ring-1 ring-nova-500',
        variant === 'danger' ? 'bg-red-500/5 border-red-500/20' :
        variant === 'success' ? 'bg-emerald-500/5 border-emerald-500/20' :
        'bg-graphite-900 border-graphite-800'
      )}
    >
      <p className={cn('text-2xl font-bold',
        variant === 'danger' ? 'text-red-400' :
        variant === 'success' ? 'text-emerald-400' : 'text-white'
      )}>{value}</p>
      <p className="text-[11px] text-graphite-500 mt-0.5">{label}</p>
    </button>
  )
}

function PriorityIndicator({ priority }: { priority: TaskPriority }) {
  const styles: Record<TaskPriority, string> = {
    urgent: 'bg-red-400', high: 'bg-orange-400', normal: 'bg-blue-400', low: 'bg-graphite-400',
  }
  return <div className={cn('w-1 h-full min-h-[40px] rounded-full shrink-0', styles[priority])} />
}

function TypeBadge({ type }: { type: TaskType }) {
  const labels: Record<TaskType, string> = {
    followup_review: 'Follow-up', refill_review: 'Refill', lab_review: 'Lab',
    protocol_review: 'Protocol', patient_outreach: 'Outreach', admin_ops: 'Admin',
  }
  return (
    <span className="text-[10px] px-1.5 py-0.5 rounded bg-graphite-800 text-graphite-400 border border-graphite-700 capitalize">
      {labels[type]}
    </span>
  )
}

function StatusPill({ status }: { status: TaskStatus }) {
  const styles: Record<TaskStatus, string> = {
    pending: 'bg-yellow-500/10 text-yellow-400',
    in_progress: 'bg-blue-500/10 text-blue-400',
    completed: 'bg-emerald-500/10 text-emerald-400',
    cancelled: 'bg-graphite-500/10 text-graphite-400',
  }
  return <span className={cn('text-[10px] px-2 py-0.5 rounded-full capitalize shrink-0', styles[status])}>{status.replace('_', ' ')}</span>
}

function RefillStatusIcon({ status }: { status: string }) {
  const color = status === 'pending' ? 'text-yellow-400 bg-yellow-500/10' :
    status === 'approved' ? 'text-emerald-400 bg-emerald-500/10' :
    status === 'shipped' ? 'text-blue-400 bg-blue-500/10' : 'text-graphite-400 bg-graphite-500/10'
  return (
    <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center shrink-0', color)}>
      <Pill className="w-4 h-4" />
    </div>
  )
}
