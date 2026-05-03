'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  Users, AlertTriangle, FlaskConical, Pill, CalendarClock,
  TrendingUp, Activity, Bot, ArrowRight, Clock, CheckCircle2,
  AlertCircle, ShieldAlert, UserCheck, ArrowUpRight,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { severityColor } from '@/lib/clinic/alerts'

export default function CommandCenter() {
  const [counts, setCounts] = useState({ total: 0, trt: 0, glp1: 0, peptide: 0, onboarding: 0, active: 0 })
  const [patients, setPatients] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/clinic/patients')
      .then(r => r.json())
      .then(data => {
        if (data.patients) setPatients(data.patients)
        if (data.counts) setCounts(data.counts)
      })
      .catch(() => {})
  }, [])

  const activePatients = counts.active
  const criticalAlerts = 0
  const highAlerts = 0
  const activeAlerts = 0
  const pendingTasks = 0
  const urgentTasks = 0
  const pendingRefills = 0
  const overdueFollowUps = 0
  const overdueLabs = 0
  const highRiskPatients = patients.filter(p => p.riskScore >= 50)
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Command Center</h1>
          <p className="text-sm text-graphite-500 mt-1">Real-time clinical operations overview</p>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-graphite-500">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <MetricCard label="Active Patients" value={activePatients} icon={Users} href="/clinic/patients" />
        <MetricCard label="Active Alerts" value={activeAlerts} icon={AlertTriangle} variant={activeAlerts > 0 ? 'danger' : 'default'} href="/clinic/alerts" />
        <MetricCard label="Pending Tasks" value={pendingTasks} icon={CheckCircle2} variant={urgentTasks > 0 ? 'warning' : 'default'} href="/clinic/tasks" />
        <MetricCard label="Pending Refills" value={pendingRefills} icon={Pill} variant={pendingRefills > 5 ? 'warning' : 'default'} href="/clinic/tasks" />
        <MetricCard label="Overdue Labs" value={overdueLabs} icon={FlaskConical} variant={overdueLabs > 0 ? 'warning' : 'default'} href="/clinic/patients" />
        <MetricCard label="Overdue F/U" value={overdueFollowUps} icon={CalendarClock} variant={overdueFollowUps > 0 ? 'warning' : 'default'} href="/clinic/patients" />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column — Critical Alerts + High Risk Patients */}
        <div className="lg:col-span-2 space-y-6">
          {/* Alerts requiring immediate attention */}
          <DashboardCard
            title="Alerts Requiring Attention"
            subtitle={`${criticalAlerts} critical, ${highAlerts} high`}
            icon={ShieldAlert}
            href="/clinic/alerts"
            variant="danger"
          >
            <div className="space-y-2">
              {([] as any[]).filter(a => a.status === 'active' && (a.severity === 'critical' || a.severity === 'high'))
                .slice(0, 6)
                .map(alert => (
                  <Link
                    key={alert.id}
                    href={`/clinic/patients/${alert.patientId}`}
                    className="flex items-start gap-3 p-3 rounded-lg bg-graphite-800/30 hover:bg-graphite-800/60 border border-graphite-800/50 transition-colors group"
                  >
                    <div className={cn('mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase border', severityColor(alert.severity))}>
                      {alert.severity}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{alert.title}</p>
                      <p className="text-xs text-graphite-400 mt-0.5">{alert.patientName}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-graphite-600 group-hover:text-graphite-400 mt-1 shrink-0 transition-colors" />
                  </Link>
                ))}
            </div>
          </DashboardCard>

          {/* High risk patients */}
          <DashboardCard
            title="High-Risk Patients"
            subtitle={`${highRiskPatients.length} patients above risk threshold`}
            icon={AlertCircle}
            href="/clinic/patients"
          >
            <div className="space-y-2">
              {highRiskPatients.sort((a, b) => b.riskScore - a.riskScore).map(patient => (
                <Link
                  key={patient.id}
                  href={`/clinic/patients/${patient.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-graphite-800/30 hover:bg-graphite-800/60 border border-graphite-800/50 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full bg-graphite-800 border border-graphite-700 flex items-center justify-center text-xs font-bold text-white">
                    {patient.firstName[0]}{patient.lastName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{patient.firstName} {patient.lastName}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-graphite-500">{patient.primaryProtocol.replace(/_/g, ' ')}</span>
                      {patient.activeAlertCount > 0 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                          {patient.activeAlertCount} alerts
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <RiskBadge score={patient.riskScore} />
                  </div>
                </Link>
              ))}
            </div>
          </DashboardCard>

          {/* Recent activity */}
          <DashboardCard title="Recent Activity" subtitle="Last 7 days" icon={Activity}>
            <div className="space-y-3">
              {([] as any[]).slice(0, 4).map(enc => (
                <div key={enc.id} className="flex items-start gap-3 p-3 rounded-lg bg-graphite-800/20">
                  <div className="w-8 h-8 rounded-full bg-nova-500/10 border border-nova-500/20 flex items-center justify-center shrink-0">
                    <UserCheck className="w-3.5 h-3.5 text-nova-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white">{enc.type.replace(/_/g, ' ')} — {enc.providerName}</p>
                    <p className="text-[11px] text-graphite-400 mt-0.5 line-clamp-2">{enc.assessment}</p>
                    <p className="text-[10px] text-graphite-600 mt-1">{enc.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        {/* Right column — Tasks, Refills, AI, KPIs */}
        <div className="space-y-6">
          {/* Urgent tasks */}
          <DashboardCard
            title="Pending Tasks"
            subtitle={`${urgentTasks} urgent`}
            icon={CheckCircle2}
            href="/clinic/tasks"
            variant={urgentTasks > 0 ? 'warning' : 'default'}
          >
            <div className="space-y-2">
              {([] as any[]).filter(t => t.status !== 'completed' && t.status !== 'cancelled')
                .sort((a, b) => {
                  const order: Record<string, number> = { urgent: 0, high: 1, normal: 2, low: 3 }
                  return (order[a.priority] ?? 4) - (order[b.priority] ?? 4)
                })
                .slice(0, 5)
                .map(task => (
                  <div key={task.id} className="p-2.5 rounded-lg bg-graphite-800/30 border border-graphite-800/50">
                    <div className="flex items-center gap-2 mb-1">
                      <PriorityDot priority={task.priority} />
                      <span className="text-xs font-medium text-white truncate">{task.title}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-graphite-500">
                      <span>{task.assigneeName}</span>
                      <span>·</span>
                      <span>Due {task.dueDate}</span>
                    </div>
                  </div>
                ))}
            </div>
          </DashboardCard>

          {/* Pending refills */}
          <DashboardCard title="Pending Refills" subtitle={`${pendingRefills} awaiting review`} icon={Pill} href="/clinic/tasks">
            <div className="space-y-2">
              {([] as any[]).filter(r => r.status === 'pending').slice(0, 5).map(refill => (
                <div key={refill.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-graphite-800/30 border border-graphite-800/50">
                  <Pill className="w-3.5 h-3.5 text-graphite-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white truncate">{refill.medicationName}</p>
                    <p className="text-[10px] text-graphite-500">{refill.patientName}</p>
                  </div>
                  <span className="text-[10px] text-graphite-600 shrink-0">{refill.requestedAt}</span>
                </div>
              ))}
            </div>
          </DashboardCard>

          {/* AI Insights */}
          <DashboardCard title="AI Review Support" subtitle="Agent-generated insights" icon={Bot} variant="accent">
            <div className="space-y-2">
              {([] as any[]).slice(0, 3).map(insight => (
                <Link
                  key={insight.id}
                  href={`/clinic/patients/${insight.patientId}`}
                  className="block p-2.5 rounded-lg bg-graphite-800/30 border border-nova-500/10 hover:border-nova-500/30 transition-colors"
                >
                  <p className="text-xs font-medium text-nova-300">{insight.title}</p>
                  <p className="text-[11px] text-graphite-400 mt-1 line-clamp-2">{insight.content}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[9px] text-graphite-600">Confidence: {Math.round(insight.confidence * 100)}%</span>
                    <span className="text-[9px] text-graphite-600">·</span>
                    <span className="text-[9px] text-graphite-600">{insight.generatedAt}</span>
                  </div>
                </Link>
              ))}
              <p className="text-[10px] text-graphite-600 italic pt-1">AI outputs are review support only — not autonomous clinical decisions.</p>
            </div>
          </DashboardCard>

          {/* Ops KPIs */}
          <DashboardCard title="Operations Snapshot" icon={TrendingUp}>
            <div className="grid grid-cols-2 gap-3">
              <MiniKPI label="Avg Response Time" value="< 4h" />
              <MiniKPI label="Retention Rate" value="94%" />
              <MiniKPI label="Protocol Adherence" value="87%" />
              <MiniKPI label="NPS Score" value="72" />
              <MiniKPI label="Refill Turnaround" value="1.2d" />
              <MiniKPI label="Lab Completion" value="91%" />
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  )
}

// ── Sub-components ───────────────────────────────────────────

function MetricCard({ label, value, icon: Icon, variant = 'default', href }: {
  label: string; value: number | string; icon: React.ElementType; variant?: 'default' | 'danger' | 'warning'; href?: string
}) {
  const card = (
    <div className={cn(
      'p-4 rounded-xl border transition-all',
      variant === 'danger' ? 'bg-red-500/5 border-red-500/20' :
      variant === 'warning' ? 'bg-yellow-500/5 border-yellow-500/20' :
      'bg-graphite-900 border-graphite-800',
      href && 'hover:border-graphite-600 cursor-pointer'
    )}>
      <div className="flex items-center justify-between mb-2">
        <Icon className={cn(
          'w-4 h-4',
          variant === 'danger' ? 'text-red-400' :
          variant === 'warning' ? 'text-yellow-400' :
          'text-graphite-500'
        )} />
        {href && <ArrowUpRight className="w-3 h-3 text-graphite-600" />}
      </div>
      <p className={cn(
        'text-2xl font-bold',
        variant === 'danger' ? 'text-red-400' :
        variant === 'warning' ? 'text-yellow-400' :
        'text-white'
      )}>{value}</p>
      <p className="text-[11px] text-graphite-500 mt-0.5">{label}</p>
    </div>
  )
  return href ? <Link href={href}>{card}</Link> : card
}

function DashboardCard({ title, subtitle, icon: Icon, children, href, variant = 'default' }: {
  title: string; subtitle?: string; icon: React.ElementType; children: React.ReactNode; href?: string; variant?: 'default' | 'danger' | 'warning' | 'accent'
}) {
  return (
    <div className={cn(
      'rounded-xl border p-5',
      variant === 'danger' ? 'bg-graphite-900/50 border-red-500/10' :
      variant === 'warning' ? 'bg-graphite-900/50 border-yellow-500/10' :
      variant === 'accent' ? 'bg-graphite-900/50 border-nova-500/10' :
      'bg-graphite-900/50 border-graphite-800'
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className={cn(
            'w-4 h-4',
            variant === 'danger' ? 'text-red-400' :
            variant === 'warning' ? 'text-yellow-400' :
            variant === 'accent' ? 'text-nova-400' :
            'text-graphite-500'
          )} />
          <div>
            <h3 className="text-sm font-semibold text-white">{title}</h3>
            {subtitle && <p className="text-[10px] text-graphite-500">{subtitle}</p>}
          </div>
        </div>
        {href && (
          <Link href={href} className="text-[11px] text-graphite-500 hover:text-white transition-colors flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>
      {children}
    </div>
  )
}

function RiskBadge({ score }: { score: number }) {
  const color = score >= 70 ? 'text-red-400 bg-red-500/10' :
    score >= 40 ? 'text-orange-400 bg-orange-500/10' :
    score >= 20 ? 'text-yellow-400 bg-yellow-500/10' :
    'text-emerald-400 bg-emerald-500/10'
  return (
    <span className={cn('text-[11px] font-bold px-2 py-0.5 rounded-full', color)}>
      {score}
    </span>
  )
}

function PriorityDot({ priority }: { priority: string }) {
  const color = priority === 'urgent' ? 'bg-red-400' :
    priority === 'high' ? 'bg-orange-400' :
    priority === 'normal' ? 'bg-blue-400' : 'bg-graphite-400'
  return <div className={cn('w-1.5 h-1.5 rounded-full shrink-0', color)} />
}

function MiniKPI({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-2.5 rounded-lg bg-graphite-800/30">
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="text-[10px] text-graphite-500">{label}</p>
    </div>
  )
}
