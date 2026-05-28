'use client'

import { useMemo, useState, useEffect } from 'react'
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
import type { Patient } from '@/lib/clinic/types'
import { LAB_REFERENCE_RANGES, VITAL_METADATA } from '@/lib/clinic/types'
import type { LabMarker, VitalType } from '@/lib/clinic/types'
import { severityColor } from '@/lib/clinic/alerts'

export default function PatientProfile() {
  const { id } = useParams<{ id: string }>()
  const [patient, setPatient] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/clinic/patients?id=${id}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) setPatient(null)
        else {
          // Map snake_case to camelCase for the template
          setPatient({
            ...data,
            firstName: data.first_name || data.firstName || '',
            lastName: data.last_name || data.lastName || '',
            dateOfBirth: data.date_of_birth || data.dateOfBirth || '',
            primaryProtocol: data.current_protocol || data.primaryProtocol || 'custom',
            riskScore: data.risk_score || data.riskScore || 0,
            activeAlertCount: data.active_alert_count || data.activeAlertCount || 0,
            pendingRefills: data.pending_refills || data.pendingRefills || 0,
            adherence: data.adherence || 'unknown',
            enrollmentDate: data.enrollment_date || data.enrollmentDate || '',
            lastVisitDate: data.last_visit_date || data.lastVisitDate || '',
            nextFollowUpDate: data.next_follow_up_date || data.nextFollowUpDate || '',
            nextLabDueDate: data.next_lab_due_date || data.nextLabDueDate || '',
            treatmentType: data.treatment_type || data.treatmentType || '',
            mrn: data.mrn || '',
          })
        }
      })
      .catch(() => setPatient(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="text-zinc-500">Loading patient...</div></div>
  }

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <User className="w-12 h-12 text-zinc-600 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Patient Not Found</h2>
        <Link href="/clinic/patients" className="text-sm text-nova-400 hover:text-nova-300">Back to patients</Link>
      </div>
    )
  }

  // For new patients from Supabase, related data may be empty
  const labs: any[] = []
  const vitals: any[] = []
  const alerts: any[] = []
  const tasks: any[] = []
  const refills: any[] = []
  const medications: any[] = []
  const encounters: any[] = []
  const symptoms: any[] = []
  const insights: any[] = []
  const activeAlerts = alerts.filter((a: any) => a.status === 'active')
  const activeMeds = medications.filter((m: any) => m.isActive)

  const age = patient.dateOfBirth ? Math.floor((Date.now() - new Date(patient.dateOfBirth as string).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : 0

  return (
    <div className="space-y-6">
      {/* Back + header */}
      <div>
        <Link href="/clinic/patients" className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to patients
        </Link>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-lg font-bold text-white">
              {patient.firstName[0]}{patient.lastName[0]}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{patient.firstName} {patient.lastName}</h1>
              <div className="flex items-center gap-3 mt-1 text-sm text-zinc-400">
                <span>{patient.mrn}</span>
                <span>·</span>
                <span>{age}y {patient.gender}</span>
                <span>·</span>
                <span className="capitalize">{patient.status}</span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-xs text-zinc-500">
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
              <div key={a.id} className="flex items-start gap-3 p-2.5 rounded-lg bg-zinc-900/50">
                <span className={cn('text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border', severityColor(a.severity))}>
                  {a.severity}
                </span>
                <div className="flex-1">
                  <p className="text-xs font-medium text-white">{a.title}</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">{a.rationale}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Intake Form Data */}
      {patient.intake && (
        <IntakeDataPanel intake={patient.intake} />
      )}

      {/* Billing & Subscription Panel */}
      <BillingPanel patientId={id} patientStatus={patient.status} treatmentType={patient.treatmentType || patient.primaryProtocol?.split('_')[0] || 'trt'} />

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Protocol + Meds + Encounters + Symptoms */}
        <div className="space-y-6">
          <ProfileCard title="Current Protocol" icon={Shield}>
            <div className="space-y-2">
              <p className="text-sm font-medium text-white capitalize">{patient.primaryProtocol.replace(/_/g, ' ')}</p>
              <p className="text-xs text-zinc-500">Enrolled: {patient.enrollmentDate}</p>
            </div>
          </ProfileCard>

          <ProfileCard title="Active Medications" icon={Pill}>
            {activeMeds.length > 0 ? (
              <div className="space-y-2.5">
                {activeMeds.map(med => (
                  <div key={med.id} className="p-2.5 rounded-lg bg-zinc-800/30 border border-zinc-800/50">
                    <p className="text-xs font-medium text-white">{med.name}</p>
                    <p className="text-[11px] text-zinc-400">{med.dosage}, {med.frequency}</p>
                    <p className="text-[10px] text-zinc-600">{med.route} · Since {med.startDate}</p>
                  </div>
                ))}
              </div>
            ) : <p className="text-xs text-zinc-500">No active medications</p>}
          </ProfileCard>

          <ProfileCard title="Recent Visits" icon={CalendarClock}>
            {encounters.length > 0 ? (
              <div className="space-y-3">
                {encounters.map(enc => (
                  <div key={enc.id} className="p-2.5 rounded-lg bg-zinc-800/20">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-medium text-white capitalize">{enc.type.replace(/_/g, ' ')}</span>
                      <span className="text-[10px] text-zinc-600">{enc.date}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 line-clamp-3">{enc.assessment}</p>
                    <p className="text-[10px] text-nova-400/80 mt-1">Plan: {enc.plan}</p>
                  </div>
                ))}
              </div>
            ) : <p className="text-xs text-zinc-500">No encounters recorded</p>}
          </ProfileCard>

          <ProfileCard title="Symptom Assessment" icon={Heart}>
            {symptoms.length > 0 ? (
              <div className="space-y-3">
                {symptoms.map(s => (
                  <div key={s.id}>
                    <p className="text-[10px] text-zinc-600 mb-2">{s.date}</p>
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
                        {s.sideEffects.map((se: string) => (
                          <span key={se} className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">{se}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : <p className="text-xs text-zinc-500">No assessments recorded</p>}
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
                  <div key={i.id} className="p-2.5 rounded-lg bg-zinc-800/30 border border-nova-500/10">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-medium text-nova-300 capitalize">{i.type.replace(/_/g, ' ')}</span>
                      <span className="text-[9px] text-zinc-600">· {Math.round(i.confidence * 100)}% confidence</span>
                    </div>
                    <p className="text-xs text-zinc-300">{i.content}</p>
                    <p className="text-[9px] text-zinc-600 mt-1.5">{i.generatedAt}</p>
                  </div>
                ))}
                <p className="text-[10px] text-zinc-600 italic">AI outputs are review support, not clinical decisions.</p>
              </div>
            ) : (
              <div className="text-center py-4">
                <Bot className="w-8 h-8 text-zinc-700 mx-auto mb-2" />
                <p className="text-xs text-zinc-500">No AI insights generated yet.</p>
                <button className="mt-2 text-[11px] text-nova-400 hover:text-nova-300 transition-colors">Generate chart review</button>
              </div>
            )}
          </ProfileCard>

          {/* Tasks */}
          <ProfileCard title="Tasks" icon={CheckCircle2}>
            {tasks.length > 0 ? (
              <div className="space-y-2">
                {tasks.map(t => (
                  <div key={t.id} className="flex items-start gap-2 p-2 rounded-lg bg-zinc-800/20">
                    <PriorityDot priority={t.priority} />
                    <div>
                      <p className="text-xs font-medium text-white">{t.title}</p>
                      <p className="text-[10px] text-zinc-500">{t.assigneeName} · Due {t.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : <p className="text-xs text-zinc-500">No tasks</p>}
          </ProfileCard>

          {/* Refills */}
          <ProfileCard title="Refill Requests" icon={Pill}>
            {refills.length > 0 ? (
              <div className="space-y-2">
                {refills.map(r => (
                  <div key={r.id} className="flex items-center gap-3 p-2 rounded-lg bg-zinc-800/20">
                    <RefillStatusDot status={r.status} />
                    <div>
                      <p className="text-xs font-medium text-white">{r.medicationName}</p>
                      <p className="text-[10px] text-zinc-500 capitalize">{r.status} · {r.requestedAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : <p className="text-xs text-zinc-500">No pending refills</p>}
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

function LabTrendChart({ marker, labs }: { marker: LabMarker; labs: any[] }) {
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
        <span className="text-xs font-medium text-zinc-300">{ref.label}</span>
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
        <span className="text-[9px] text-zinc-600">Ref: {ref.min} – {ref.max} {ref.unit}</span>
      </div>
    </div>
  )
}

// ── Vital Trend Chart ────────────────────────────────────────

function VitalTrendChart({ type, vitals }: { type: VitalType; vitals: any[] }) {
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
        <span className="text-xs font-medium text-zinc-300">{meta.label}</span>
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
      variant === 'accent' ? 'bg-zinc-900/50 border-nova-500/10' : 'bg-zinc-900/50 border-zinc-800'
    )}>
      <div className="flex items-center gap-2 mb-3">
        <Icon className={cn('w-4 h-4', variant === 'accent' ? 'text-nova-400' : 'text-zinc-500')} />
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
        <span className="text-[10px] text-zinc-500">{label}</span>
        <span className="text-[10px] font-bold text-white">{value}</span>
      </div>
      <div className="h-1 rounded-full bg-zinc-800">
        <div className={cn('h-full rounded-full transition-all', color)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

function PriorityDot({ priority }: { priority: string }) {
  const color = priority === 'urgent' ? 'bg-red-400' : priority === 'high' ? 'bg-orange-400' : priority === 'normal' ? 'bg-blue-400' : 'bg-zinc-400'
  return <div className={cn('w-1.5 h-1.5 rounded-full shrink-0 mt-1.5', color)} />
}

function RefillStatusDot({ status }: { status: string }) {
  const color = status === 'pending' ? 'bg-yellow-400' : status === 'approved' ? 'bg-emerald-400' : status === 'shipped' ? 'bg-blue-400' : 'bg-zinc-400'
  return <div className={cn('w-2 h-2 rounded-full shrink-0', color)} />
}

function DateRow({ label, value, overdue = false }: { label: string; value: string; overdue?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-[11px] text-zinc-500">{label}</span>
      <span className={cn('text-xs', overdue ? 'text-red-400 font-medium' : 'text-white')}>{value}</span>
    </div>
  )
}

// ── Intake Data Panel ─────────────────────────────────────────

function IntakeDataPanel({ intake }: { intake: any }) {
  const data = intake.form_data || {}
  const type = intake.intake_type === 'glp1' ? 'GLP-1 / GIP' : 'TRT'
  const symptomLabels: Record<string, string> = {
    fatigue: 'Fatigue', libido: 'Libido', moodChanges: 'Mood', sleepIssues: 'Sleep',
    bodyComposition: 'Body Comp', brainFog: 'Brain Fog', recoveryTime: 'Recovery', morningErections: 'Morning Erections',
  }
  const scaleLabels = ['None', 'Mild', 'Moderate', 'Severe']

  const sections: { title: string; fields: { label: string; value: string }[] }[] = []

  // Personal Info
  sections.push({
    title: 'Personal Information',
    fields: [
      { label: 'Date of Birth', value: data.dateOfBirth || '—' },
      { label: 'State', value: data.state || '—' },
      { label: 'Sex', value: data.biologicalSex || '—' },
      { label: 'Height', value: data.heightFeet ? `${data.heightFeet}'${data.heightInches || 0}"` : '—' },
      { label: 'Weight', value: data.weight ? `${data.weight} lbs` : '—' },
    ],
  })

  // Symptoms (TRT)
  if (intake.intake_type === 'trt') {
    const symptomFields = Object.entries(symptomLabels).map(([key, label]) => ({
      label,
      value: data[key] !== undefined ? scaleLabels[parseInt(data[key])] || data[key] : '—',
    }))
    sections.push({ title: 'Symptom Assessment', fields: symptomFields })
  }

  // Weight History (GLP-1)
  if (intake.intake_type === 'glp1') {
    sections.push({
      title: 'Weight History',
      fields: [
        { label: 'Current Weight', value: data.currentWeight ? `${data.currentWeight} lbs` : '—' },
        { label: 'Goal Weight', value: data.goalWeight ? `${data.goalWeight} lbs` : '—' },
        { label: 'Highest Weight', value: data.highestWeight ? `${data.highestWeight} lbs` : '—' },
        { label: 'Duration at Current', value: data.durationAtCurrentWeight || '—' },
        { label: 'Prior Attempts', value: Array.isArray(data.priorWeightLossAttempts) ? data.priorWeightLossAttempts.join(', ') : '—' },
      ],
    })
  }

  // Medical History
  sections.push({
    title: 'Medical History',
    fields: [
      { label: 'Medications', value: data.currentMedications || 'None listed' },
      { label: 'Allergies', value: data.allergies || 'None listed' },
      ...(Array.isArray(data.priorDiagnoses) && data.priorDiagnoses.length > 0
        ? [{ label: 'Diagnoses', value: data.priorDiagnoses.join(', ') }] : []),
      ...(data.priorSurgeries ? [{ label: 'Surgeries', value: data.priorSurgeries }] : []),
      ...(data.diabetesStatus ? [{ label: 'Diabetes', value: data.diabetesStatus }] : []),
      ...(data.thyroidConditions ? [{ label: 'Thyroid', value: data.thyroidConditions }] : []),
      ...(data.pancreatitisHistory === 'yes' ? [{ label: 'Pancreatitis', value: 'YES, history' }] : []),
      ...(data.familyThyroidCancer === 'yes' ? [{ label: 'Family Thyroid Cancer', value: 'YES, FLAGGED' }] : []),
      ...(data.familyMEN2 === 'yes' ? [{ label: 'Family MEN2', value: 'YES, CONTRAINDICATION' }] : []),
    ],
  })

  // Hormone History (TRT) or Prior GLP-1 Use
  if (intake.intake_type === 'trt') {
    sections.push({
      title: 'Hormone History',
      fields: [
        { label: 'Prior TRT Use', value: data.priorTRTUse || '—' },
        ...(data.priorTRTDetails ? [{ label: 'Details', value: data.priorTRTDetails }] : []),
        { label: 'Recent Bloodwork', value: data.recentBloodwork || '—' },
        ...(data.knownTestosteroneLevel ? [{ label: 'Testosterone Level', value: `${data.knownTestosteroneLevel} ng/dL` }] : []),
      ],
    })
  } else {
    sections.push({
      title: 'Prior GLP-1 Use',
      fields: [
        { label: 'Prior Use', value: data.priorGLP1Use || '—' },
        ...(Array.isArray(data.priorGLP1Which) ? [{ label: 'Which', value: data.priorGLP1Which.join(', ') }] : []),
        ...(data.priorGLP1Dosage ? [{ label: 'Dosage', value: data.priorGLP1Dosage }] : []),
        ...(data.priorGLP1Duration ? [{ label: 'Duration', value: data.priorGLP1Duration }] : []),
        ...(data.priorGLP1StopReason ? [{ label: 'Reason Stopped', value: data.priorGLP1StopReason }] : []),
        ...(data.priorGLP1SideEffects ? [{ label: 'Side Effects', value: data.priorGLP1SideEffects }] : []),
      ],
    })
  }

  // Lifestyle
  sections.push({
    title: 'Lifestyle',
    fields: [
      { label: 'Exercise', value: data.exerciseFrequency ? `${data.exerciseFrequency} days/week` : '—' },
      { label: 'Sleep', value: data.sleepHours ? `${data.sleepHours} hrs, ${data.sleepQuality || ''}` : '—' },
      { label: 'Alcohol', value: data.alcoholUse || '—' },
      { label: 'Tobacco', value: data.tobaccoUse || '—' },
      { label: 'Diet', value: data.dietDescription || '—' },
    ],
  })

  // Goals
  sections.push({
    title: 'Goals & Expectations',
    fields: [
      { label: 'Goals', value: Array.isArray(data.primaryGoals) ? data.primaryGoals.join(', ') : '—' },
      ...(data.expectations ? [{ label: 'Notes', value: data.expectations }] : []),
      { label: 'Timeline', value: data.timelineExpectation || '—' },
    ],
  })

  // Consent
  sections.push({
    title: 'Consent',
    fields: [
      { label: 'Risks Acknowledged', value: intake.consent_signed ? 'Yes' : 'No' },
      { label: 'Signature', value: intake.signature_name || '—' },
      { label: 'Signed At', value: intake.consent_signed_at ? new Date(intake.consent_signed_at).toLocaleString() : '—' },
      { label: 'Status', value: intake.status },
    ],
  })

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-zinc-500" />
          <h3 className="text-sm font-semibold text-white">Intake Form, {type}</h3>
        </div>
        <span className={cn('text-[10px] px-2 py-0.5 rounded-full',
          intake.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'
        )}>
          {intake.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section) => (
          <div key={section.title} className="p-3 rounded-lg bg-zinc-800/20 border border-zinc-800/30">
            <h4 className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">{section.title}</h4>
            <div className="space-y-1.5">
              {section.fields.map((field) => (
                <div key={field.label} className="flex justify-between gap-2">
                  <span className="text-[11px] text-zinc-500 shrink-0">{field.label}</span>
                  <span className={cn('text-[11px] text-right',
                    field.value.includes('FLAGGED') || field.value.includes('CONTRAINDICATION') ? 'text-red-400 font-bold' :
                    field.value === 'Severe' ? 'text-red-400' :
                    field.value === 'Moderate' ? 'text-yellow-400' : 'text-white'
                  )}>{field.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Billing Panel ─────────────────────────────────────────────

function BillingPanel({ patientId, patientStatus, treatmentType }: { patientId: string; patientStatus: string; treatmentType: string }) {
  const [billing, setBilling] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState('')

  useEffect(() => {
    fetch(`/api/clinic/billing?patient_id=${patientId}`)
      .then(r => r.json())
      .then(data => setBilling(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [patientId])

  async function handleAction(action: string, extra: Record<string, unknown> = {}) {
    setActionLoading(action)
    try {
      const res = await fetch('/api/clinic/billing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, patient_id: patientId, treatment_type: treatmentType, ...extra }),
      })
      const result = await res.json()
      if (result.mode === 'receipt_sent') {
        alert(`Payment marked as collected. Receipt sent to ${result.sent_to}.\n\nAmount: $${result.amount_charged}${result.credit_applied ? ' ($49 consultation credit applied)' : ''}\nRecurring: $${result.recurring}/mo`)
      } else if (result.mode === 'subscription_created') {
        alert(`Subscription created and charged. Confirmation sent to ${result.sent_to}.\n\nFirst charge: $${result.first_charge}${result.credit_applied ? ' ($49 credit applied)' : ''}\nRecurring: $${result.recurring}/mo`)
      } else if (result.checkout_url) {
        navigator.clipboard?.writeText(result.checkout_url)
        alert(`Subscription link copied!\n\nSend to patient:\n${result.checkout_url}`)
      } else if (result.invoice_url) {
        alert(`Invoice sent to patient email.\n\nInvoice URL: ${result.invoice_url}`)
      } else if (result.ok) {
        alert('Action completed.')
      } else {
        alert(result.error || 'Something went wrong')
      }
      // Refresh billing status
      const updated = await fetch(`/api/clinic/billing?patient_id=${patientId}`).then(r => r.json())
      setBilling(updated)
    } catch {
      alert('Failed to process billing action')
    }
    setActionLoading('')
  }

  const type = treatmentType === 'glp1' ? 'GLP-1' : 'TRT'
  const price = treatmentType === 'glp1' ? '$249' : '$299'

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-zinc-500" />
          <h3 className="text-sm font-semibold text-white">Billing &amp; Subscription</h3>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 uppercase">
          {type} · {price}/mo
        </span>
      </div>

      {loading ? (
        <p className="text-xs text-zinc-500">Loading billing...</p>
      ) : billing?.has_subscription ? (
        <div className="space-y-3">
          {billing.subscriptions.map((sub: any) => (
            <div key={sub.id} className="p-3 rounded-lg bg-zinc-800/30 border border-zinc-800/50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-white">${sub.amount}/mo</span>
                <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full',
                  sub.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' :
                  sub.status === 'canceled' ? 'bg-red-500/10 text-red-400' :
                  'bg-yellow-500/10 text-yellow-400'
                )}>{sub.status}</span>
              </div>
              <p className="text-[10px] text-zinc-500">
                Next billing: {new Date(sub.current_period_end).toLocaleDateString()}
                {sub.cancel_at_period_end && ' (cancels at end of period)'}
              </p>
              {sub.status === 'active' && !sub.cancel_at_period_end && (
                <button
                  onClick={() => handleAction('cancel_subscription', { subscription_id: sub.id })}
                  disabled={actionLoading === 'cancel_subscription'}
                  className="mt-2 text-[10px] text-red-400 hover:text-red-300 transition-colors"
                >
                  {actionLoading === 'cancel_subscription' ? 'Cancelling...' : 'Cancel at end of period'}
                </button>
              )}
            </div>
          ))}

          {billing.invoices?.length > 0 && (
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">Recent Invoices</p>
              {billing.invoices.slice(0, 3).map((inv: any) => (
                <div key={inv.id} className="flex items-center justify-between py-1.5 border-b border-zinc-800/30 last:border-0">
                  <span className="text-[11px] text-zinc-400">{new Date(inv.created).toLocaleDateString()}</span>
                  <span className="text-[11px] text-white">${inv.amount_paid || inv.amount_due}</span>
                  <span className={cn('text-[10px]', inv.status === 'paid' ? 'text-emerald-400' : 'text-yellow-400')}>{inv.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-zinc-800/30 border border-zinc-800/50">
            <p className="text-[11px] font-medium text-white mb-1">Post-Consultation Workflow</p>
            <ol className="text-[10px] text-zinc-400 space-y-1 list-decimal list-inside">
              <li>Physician approves treatment eligibility</li>
              <li>Schedule protocol call (assign to Brian or Mahshad below)</li>
              <li>Call patient, review protocol, discuss add-ons, verbally confirm recurring fee</li>
              <li>After verbal confirmation, approve payment and send invoice</li>
            </ol>
          </div>

          {/* Step 1: Schedule protocol call */}
          <div className="p-3 rounded-lg border border-zinc-800/50 bg-zinc-800/20">
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">Step 1, Protocol Call</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleAction('schedule_protocol_call', { assignee: 'Brian DeGuzman, RN' })}
                disabled={!!actionLoading}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800/50 border border-zinc-800 text-zinc-300 text-xs font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50"
              >
                {actionLoading === 'schedule_protocol_call' ? 'Creating...' : 'Assign to Brian'}
              </button>
              <button
                onClick={() => handleAction('schedule_protocol_call', { assignee: 'Mahshad Nejad, Patient Coordinator' })}
                disabled={!!actionLoading}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800/50 border border-zinc-800 text-zinc-300 text-xs font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50"
              >
                {actionLoading === 'schedule_protocol_call' ? 'Creating...' : 'Assign to Mahshad'}
              </button>
            </div>
          </div>

          {/* Step 2: After verbal confirmation + payment collected on phone */}
          <div className="p-3 rounded-lg border border-zinc-800/50 bg-zinc-800/20">
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">Step 2, Payment Collected on Phone</p>
            <p className="text-[10px] text-zinc-400 mb-2">After you have collected payment over the phone, click below to mark as paid and send a receipt + recurring confirmation to the patient&apos;s email.</p>
            <button
              onClick={() => {
                if (confirm(`Confirm:\n\n1. Protocol reviewed with patient\n2. Payment collected verbally on phone\n3. Patient confirmed ${price}/mo recurring for ${type}\n\nThis will mark the invoice as paid and send a receipt to the patient's email.`)) {
                  handleAction('approve_and_invoice', { apply_consultation_credit: true })
                }
              }}
              disabled={!!actionLoading}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors disabled:opacity-50"
            >
              {actionLoading === 'approve_and_invoice' ? 'Processing...' : `Mark Paid & Send Receipt · ${type} ${price}/mo`}
            </button>
          </div>

          <p className="text-[10px] text-zinc-500">
            $49 consultation credit applies within 7 days of approved eligibility. After 7 days, patient requires re-evaluation ($49 consultation fee). Invoice is only sent after manual approval.
          </p>
        </div>
      )}
    </div>
  )
}
