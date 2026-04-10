'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  ArrowLeft, User, Activity, FlaskConical, Pill, AlertTriangle,
  CalendarClock, FileText, Bot, Heart, TrendingUp, Shield,
  Clock, CheckCircle2, Phone, Mail, MapPin, Calendar,
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Area, AreaChart,
} from 'recharts'
import {
  SEED_PATIENTS, SEED_LABS, SEED_VITALS, SEED_ALERTS, SEED_TASKS,
  SEED_REFILLS, SEED_MEDICATIONS, SEED_ENCOUNTERS, SEED_SYMPTOMS,
  SEED_INSIGHTS,
} from '@/lib/clinic/seed-data'
import { LAB_REFERENCE_RANGES, VITAL_METADATA } from '@/lib/clinic/types'
import type { LabMarker, VitalType } from '@/lib/clinic/types'
import { severityColor } from '@/lib/clinic/alerts'

export default function PatientProfile() {
  const { id } = useParams<{ id: string }>()
  const patient = SEED_PATIENTS.find(p => p.id === id)

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <User className="w-12 h-12 text-graphite-600 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Patient Not Found</h2>
        <Link href="/clinic/patients" className="text-sm text-nova-400 hover:text-nova-300">Back to patients</Link>
      </div>
    )
  }

  const labs = SEED_LABS.filter(l => l.patientId === id)
  const vitals = SEED_VITALS.filter(v => v.patientId === id)
  const alerts = SEED_ALERTS.filter(a => a.patientId === id)
  const tasks = SEED_TASKS.filter(t => t.patientId === id)
  const refills = SEED_REFILLS.filter(r => r.patientId === id)
  const medications = SEED_MEDICATIONS.filter(m => m.patientId === id)
  const encounters = SEED_ENCOUNTERS.filter(e => e.patientId === id)
  const symptoms = SEED_SYMPTOMS.filter(s => s.patientId === id)
  const insights = SEED_INSIGHTS.filter(i => i.patientId === id)
  const activeAlerts = alerts.filter(a => a.status === 'active')
  const activeMeds = medications.filter(m => m.isActive)

  const age = Math.floor((Date.now() - new Date(patient.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000))

  return (
    <div className="space-y-6">
      {/* Back + header */}
      <div>
        <Link href="/clinic/patients" className="inline-flex items-center gap-1.5 text-sm text-graphite-500 hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to patients
        </Link>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-graphite-800 border border-graphite-700 flex items-center justify-center text-lg font-bold text-white">
              {patient.firstName[0]}{patient.lastName[0]}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{patient.firstName} {patient.lastName}</h1>
              <div className="flex items-center gap-3 mt-1 text-sm text-graphite-400">
                <span>{patient.mrn}</span>
                <span>·</span>
                <span>{age}y {patient.gender}</span>
                <span>·</span>
                <span className="capitalize">{patient.status}</span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-xs text-graphite-500">
                <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{patient.email}</span>
                <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{patient.phone}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{patient.state}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <StatPill label="Risk" value={patient.riskScore} variant={patient.riskScore >= 50 ? 'danger' : patient.riskScore >= 25 ? 'warning' : 'good'} />
            <StatPill label="Adherence" value={patient.adherence} variant={patient.adherence === 'excellent' || patient.adherence === 'good' ? 'good' : patient.adherence === 'fair' ? 'warning' : 'danger'} />
            <StatPill label="Alerts" value={activeAlerts.length} variant={activeAlerts.length > 0 ? 'danger' : 'good'} />
          </div>
        </div>
      </div>

      {/* Active alerts banner */}
      {activeAlerts.length > 0 && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-sm font-semibold text-red-400">{activeAlerts.length} Active Alert{activeAlerts.length !== 1 && 's'}</span>
          </div>
          <div className="space-y-2">
            {activeAlerts.map(a => (
              <div key={a.id} className="flex items-start gap-3 p-2.5 rounded-lg bg-graphite-900/50">
                <span className={cn('text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border', severityColor(a.severity))}>
                  {a.severity}
                </span>
                <div className="flex-1">
                  <p className="text-xs font-medium text-white">{a.title}</p>
                  <p className="text-[11px] text-graphite-400 mt-0.5">{a.rationale}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Protocol + Meds + Encounters + Symptoms */}
        <div className="space-y-6">
          <ProfileCard title="Current Protocol" icon={Shield}>
            <div className="space-y-2">
              <p className="text-sm font-medium text-white capitalize">{patient.primaryProtocol.replace(/_/g, ' ')}</p>
              <p className="text-xs text-graphite-500">Enrolled: {patient.enrollmentDate}</p>
            </div>
          </ProfileCard>

          <ProfileCard title="Active Medications" icon={Pill}>
            {activeMeds.length > 0 ? (
              <div className="space-y-2.5">
                {activeMeds.map(med => (
                  <div key={med.id} className="p-2.5 rounded-lg bg-graphite-800/30 border border-graphite-800/50">
                    <p className="text-xs font-medium text-white">{med.name}</p>
                    <p className="text-[11px] text-graphite-400">{med.dosage} — {med.frequency}</p>
                    <p className="text-[10px] text-graphite-600">{med.route} · Since {med.startDate}</p>
                  </div>
                ))}
              </div>
            ) : <p className="text-xs text-graphite-500">No active medications</p>}
          </ProfileCard>

          <ProfileCard title="Recent Visits" icon={CalendarClock}>
            {encounters.length > 0 ? (
              <div className="space-y-3">
                {encounters.map(enc => (
                  <div key={enc.id} className="p-2.5 rounded-lg bg-graphite-800/20">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-medium text-white capitalize">{enc.type.replace(/_/g, ' ')}</span>
                      <span className="text-[10px] text-graphite-600">{enc.date}</span>
                    </div>
                    <p className="text-[11px] text-graphite-400 line-clamp-3">{enc.assessment}</p>
                    <p className="text-[10px] text-nova-400/80 mt-1">Plan: {enc.plan}</p>
                  </div>
                ))}
              </div>
            ) : <p className="text-xs text-graphite-500">No encounters recorded</p>}
          </ProfileCard>

          <ProfileCard title="Symptom Assessment" icon={Heart}>
            {symptoms.length > 0 ? (
              <div className="space-y-3">
                {symptoms.map(s => (
                  <div key={s.id}>
                    <p className="text-[10px] text-graphite-600 mb-2">{s.date}</p>
                    <div className="grid grid-cols-3 gap-2">
                      <SymptomBar label="Energy" value={s.energyLevel} />
                      <SymptomBar label="Libido" value={s.libido} />
                      <SymptomBar label="Mood" value={s.mood} />
                      <SymptomBar label="Sleep" value={s.sleepQuality} />
                      <SymptomBar label="Clarity" value={s.mentalClarity} />
                      <SymptomBar label="Physical" value={s.physicalPerformance} />
                    </div>
                    {s.sideEffects.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {s.sideEffects.map(se => (
                          <span key={se} className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">{se}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : <p className="text-xs text-graphite-500">No assessments recorded</p>}
          </ProfileCard>
        </div>

        {/* Center: Labs + Vitals charts */}
        <div className="space-y-6">
          <ProfileCard title="Lab Trends" icon={FlaskConical}>
            <div className="space-y-5">
              {patient.primaryProtocol.startsWith('trt') && (
                <>
                  <LabTrendChart marker="total_testosterone" labs={labs} />
                  <LabTrendChart marker="free_testosterone" labs={labs} />
                  <LabTrendChart marker="estradiol" labs={labs} />
                  <LabTrendChart marker="hematocrit" labs={labs} />
                  <LabTrendChart marker="psa" labs={labs} />
                </>
              )}
              {patient.primaryProtocol.startsWith('glp1') && (
                <>
                  <LabTrendChart marker="a1c" labs={labs} />
                  <LabTrendChart marker="fasting_glucose" labs={labs} />
                  <LabTrendChart marker="triglycerides" labs={labs} />
                </>
              )}
              <LabTrendChart marker="alt" labs={labs} />
              <LabTrendChart marker="total_cholesterol" labs={labs} />
              <LabTrendChart marker="tsh" labs={labs} />
            </div>
          </ProfileCard>

          <ProfileCard title="Vitals" icon={Activity}>
            <div className="space-y-5">
              <VitalTrendChart type="bp_systolic" vitals={vitals} />
              <VitalTrendChart type="heart_rate" vitals={vitals} />
              <VitalTrendChart type="weight" vitals={vitals} />
              <VitalTrendChart type="body_fat_pct" vitals={vitals} />
            </div>
          </ProfileCard>
        </div>

        {/* Right: AI + Tasks + Refills + Key dates */}
        <div className="space-y-6">
          {/* AI Panel */}
          <ProfileCard title="AI Review Support" icon={Bot} variant="accent">
            {insights.length > 0 ? (
              <div className="space-y-3">
                {insights.map(i => (
                  <div key={i.id} className="p-2.5 rounded-lg bg-graphite-800/30 border border-nova-500/10">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-medium text-nova-300 capitalize">{i.type.replace(/_/g, ' ')}</span>
                      <span className="text-[9px] text-graphite-600">· {Math.round(i.confidence * 100)}% confidence</span>
                    </div>
                    <p className="text-xs text-graphite-300">{i.content}</p>
                    <p className="text-[9px] text-graphite-600 mt-1.5">{i.generatedAt}</p>
                  </div>
                ))}
                <p className="text-[10px] text-graphite-600 italic">AI outputs are review support — not clinical decisions.</p>
              </div>
            ) : (
              <div className="text-center py-4">
                <Bot className="w-8 h-8 text-graphite-700 mx-auto mb-2" />
                <p className="text-xs text-graphite-500">No AI insights generated yet.</p>
                <button className="mt-2 text-[11px] text-nova-400 hover:text-nova-300 transition-colors">Generate chart review</button>
              </div>
            )}
          </ProfileCard>

          {/* Tasks */}
          <ProfileCard title="Tasks" icon={CheckCircle2}>
            {tasks.length > 0 ? (
              <div className="space-y-2">
                {tasks.map(t => (
                  <div key={t.id} className="flex items-start gap-2 p-2 rounded-lg bg-graphite-800/20">
                    <PriorityDot priority={t.priority} />
                    <div>
                      <p className="text-xs font-medium text-white">{t.title}</p>
                      <p className="text-[10px] text-graphite-500">{t.assigneeName} · Due {t.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : <p className="text-xs text-graphite-500">No tasks</p>}
          </ProfileCard>

          {/* Refills */}
          <ProfileCard title="Refill Requests" icon={Pill}>
            {refills.length > 0 ? (
              <div className="space-y-2">
                {refills.map(r => (
                  <div key={r.id} className="flex items-center gap-3 p-2 rounded-lg bg-graphite-800/20">
                    <RefillStatusDot status={r.status} />
                    <div>
                      <p className="text-xs font-medium text-white">{r.medicationName}</p>
                      <p className="text-[10px] text-graphite-500 capitalize">{r.status} · {r.requestedAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : <p className="text-xs text-graphite-500">No pending refills</p>}
          </ProfileCard>

          {/* Key dates */}
          <ProfileCard title="Key Dates" icon={Calendar}>
            <div className="space-y-2">
              <DateRow label="Date of Birth" value={patient.dateOfBirth} />
              <DateRow label="Enrolled" value={patient.enrollmentDate} />
              <DateRow label="Last Visit" value={patient.lastVisitDate} />
              <DateRow label="Next Follow-up" value={patient.nextFollowUpDate} overdue={new Date(patient.nextFollowUpDate) < new Date()} />
              <DateRow label="Last Labs" value={patient.lastLabDate} />
              <DateRow label="Next Labs Due" value={patient.nextLabDueDate} overdue={new Date(patient.nextLabDueDate) < new Date()} />
            </div>
          </ProfileCard>
        </div>
      </div>
    </div>
  )
}

// ── Lab Trend Chart ──────────────────────────────────────────

function LabTrendChart({ marker, labs }: { marker: LabMarker; labs: typeof SEED_LABS }) {
  const ref = LAB_REFERENCE_RANGES[marker]
  const data = labs
    .filter(l => l.marker === marker)
    .sort((a, b) => a.collectedAt.localeCompare(b.collectedAt))
    .map(l => ({
      date: l.collectedAt.slice(5),
      value: l.value,
      abnormal: l.isAbnormal,
    }))

  if (data.length === 0) return null

  const latest = data[data.length - 1]
  const isAbnormal = latest.value < ref.min || latest.value > ref.max

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-graphite-300">{ref.label}</span>
        <span className={cn('text-xs font-bold', isAbnormal ? 'text-red-400' : 'text-white')}>
          {latest.value} {ref.unit}
        </span>
      </div>
      <div className="h-24 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id={`grad-${marker}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isAbnormal ? '#ef4444' : '#1a9a73'} stopOpacity={0.3} />
                <stop offset="100%" stopColor={isAbnormal ? '#ef4444' : '#1a9a73'} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#71717a' }} axisLine={false} tickLine={false} />
            <YAxis domain={['auto', 'auto']} tick={{ fontSize: 9, fill: '#71717a' }} axisLine={false} tickLine={false} width={35} />
            <Tooltip
              contentStyle={{ background: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px', fontSize: '11px' }}
              labelStyle={{ color: '#71717a' }}
              itemStyle={{ color: '#fff' }}
            />
            <ReferenceLine y={ref.max} stroke="#3f3f46" strokeDasharray="4 4" />
            <ReferenceLine y={ref.min} stroke="#3f3f46" strokeDasharray="4 4" />
            <Area
              type="monotone"
              dataKey="value"
              stroke={isAbnormal ? '#ef4444' : '#1a9a73'}
              fill={`url(#grad-${marker})`}
              strokeWidth={1.5}
              dot={{ r: 2, fill: isAbnormal ? '#ef4444' : '#1a9a73' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-between mt-0.5">
        <span className="text-[9px] text-graphite-600">Ref: {ref.min} – {ref.max} {ref.unit}</span>
      </div>
    </div>
  )
}

// ── Vital Trend Chart ────────────────────────────────────────

function VitalTrendChart({ type, vitals }: { type: VitalType; vitals: typeof SEED_VITALS }) {
  const meta = VITAL_METADATA[type]
  const data = vitals
    .filter(v => v.type === type)
    .sort((a, b) => a.recordedAt.localeCompare(b.recordedAt))
    .map(v => ({ date: v.recordedAt.slice(5), value: v.value }))

  if (data.length === 0) return null

  const latest = data[data.length - 1]
  const isAbnormal = meta.max !== undefined && meta.min !== undefined &&
    (latest.value > meta.max || latest.value < meta.min)

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-graphite-300">{meta.label}</span>
        <span className={cn('text-xs font-bold', isAbnormal ? 'text-red-400' : 'text-white')}>
          {latest.value} {meta.unit}
        </span>
      </div>
      <div className="h-20 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#71717a' }} axisLine={false} tickLine={false} />
            <YAxis domain={['auto', 'auto']} tick={{ fontSize: 9, fill: '#71717a' }} axisLine={false} tickLine={false} width={35} />
            <Tooltip
              contentStyle={{ background: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px', fontSize: '11px' }}
              labelStyle={{ color: '#71717a' }}
              itemStyle={{ color: '#fff' }}
            />
            {meta.max && <ReferenceLine y={meta.max} stroke="#3f3f46" strokeDasharray="4 4" />}
            {meta.min && <ReferenceLine y={meta.min} stroke="#3f3f46" strokeDasharray="4 4" />}
            <Line type="monotone" dataKey="value" stroke={isAbnormal ? '#ef4444' : '#4db393'} strokeWidth={1.5} dot={{ r: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// ── Sub-components ───────────────────────────────────────────

function ProfileCard({ title, icon: Icon, children, variant = 'default' }: {
  title: string; icon: React.ElementType; children: React.ReactNode; variant?: 'default' | 'accent'
}) {
  return (
    <div className={cn(
      'rounded-xl border p-4',
      variant === 'accent' ? 'bg-graphite-900/50 border-nova-500/10' : 'bg-graphite-900/50 border-graphite-800'
    )}>
      <div className="flex items-center gap-2 mb-3">
        <Icon className={cn('w-4 h-4', variant === 'accent' ? 'text-nova-400' : 'text-graphite-500')} />
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function StatPill({ label, value, variant }: { label: string; value: string | number; variant: 'good' | 'warning' | 'danger' }) {
  const colors = {
    good: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    danger: 'bg-red-500/10 text-red-400 border-red-500/20',
  }
  return (
    <div className={cn('px-3 py-1.5 rounded-lg border text-center', colors[variant])}>
      <p className="text-lg font-bold capitalize">{value}</p>
      <p className="text-[10px] opacity-70">{label}</p>
    </div>
  )
}

function SymptomBar({ label, value }: { label: string; value: number }) {
  const pct = (value / 10) * 100
  const color = value >= 7 ? 'bg-emerald-400' : value >= 5 ? 'bg-yellow-400' : 'bg-red-400'
  return (
    <div>
      <div className="flex items-center justify-between mb-0.5">
        <span className="text-[10px] text-graphite-500">{label}</span>
        <span className="text-[10px] font-bold text-white">{value}</span>
      </div>
      <div className="h-1 rounded-full bg-graphite-800">
        <div className={cn('h-full rounded-full transition-all', color)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

function PriorityDot({ priority }: { priority: string }) {
  const color = priority === 'urgent' ? 'bg-red-400' : priority === 'high' ? 'bg-orange-400' : priority === 'normal' ? 'bg-blue-400' : 'bg-graphite-400'
  return <div className={cn('w-1.5 h-1.5 rounded-full shrink-0 mt-1.5', color)} />
}

function RefillStatusDot({ status }: { status: string }) {
  const color = status === 'pending' ? 'bg-yellow-400' : status === 'approved' ? 'bg-emerald-400' : status === 'shipped' ? 'bg-blue-400' : 'bg-graphite-400'
  return <div className={cn('w-2 h-2 rounded-full shrink-0', color)} />
}

function DateRow({ label, value, overdue = false }: { label: string; value: string; overdue?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-[11px] text-graphite-500">{label}</span>
      <span className={cn('text-xs', overdue ? 'text-red-400 font-medium' : 'text-white')}>{value}</span>
    </div>
  )
}
