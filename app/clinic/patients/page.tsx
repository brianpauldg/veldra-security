'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  Search, SlidersHorizontal, ArrowUpDown, ArrowRight,
  AlertTriangle, Pill, FlaskConical, CalendarClock, X,
} from 'lucide-react'
import { SEED_PATIENTS } from '@/lib/clinic/seed-data'
import type { Patient, PatientStatus, AdherenceLevel } from '@/lib/clinic/types'

type SortField = 'name' | 'risk' | 'lastVisit' | 'nextFollowUp' | 'adherence'
type SortDir = 'asc' | 'desc'

export default function PatientList() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<PatientStatus | 'all'>('all')
  const [adherenceFilter, setAdherenceFilter] = useState<AdherenceLevel | 'all'>('all')
  const [showAlerts, setShowAlerts] = useState(false)
  const [showOverdue, setShowOverdue] = useState(false)
  const [sortField, setSortField] = useState<SortField>('risk')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [showFilters, setShowFilters] = useState(false)

  const patients = useMemo(() => {
    let result = [...SEED_PATIENTS]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        `${p.firstName} ${p.lastName}`.toLowerCase().includes(q) ||
        p.mrn.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q)
      )
    }
    if (statusFilter !== 'all') result = result.filter(p => p.status === statusFilter)
    if (adherenceFilter !== 'all') result = result.filter(p => p.adherence === adherenceFilter)
    if (showAlerts) result = result.filter(p => p.activeAlertCount > 0)
    if (showOverdue) {
      const now = new Date()
      result = result.filter(p => new Date(p.nextFollowUpDate) < now || new Date(p.nextLabDueDate) < now)
    }

    result.sort((a, b) => {
      let cmp = 0
      switch (sortField) {
        case 'name': cmp = `${a.lastName}${a.firstName}`.localeCompare(`${b.lastName}${b.firstName}`); break
        case 'risk': cmp = a.riskScore - b.riskScore; break
        case 'lastVisit': cmp = a.lastVisitDate.localeCompare(b.lastVisitDate); break
        case 'nextFollowUp': cmp = a.nextFollowUpDate.localeCompare(b.nextFollowUpDate); break
        case 'adherence': {
          const order = { excellent: 4, good: 3, fair: 2, poor: 1, unknown: 0 }
          cmp = order[a.adherence] - order[b.adherence]
          break
        }
      }
      return sortDir === 'desc' ? -cmp : cmp
    })

    return result
  }, [search, statusFilter, adherenceFilter, showAlerts, showOverdue, sortField, sortDir])

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortField(field); setSortDir('desc') }
  }

  const activeFilterCount = [
    statusFilter !== 'all',
    adherenceFilter !== 'all',
    showAlerts,
    showOverdue,
  ].filter(Boolean).length

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Patients</h1>
        <p className="text-sm text-graphite-500 mt-1">{patients.length} of {SEED_PATIENTS.length} patients</p>
      </div>

      {/* Search + Filter bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, MRN, or email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-graphite-900 border border-graphite-800 text-sm text-white placeholder:text-graphite-600 focus:border-nova-500/50 focus:outline-none transition-colors"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-graphite-500 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            'flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm transition-colors',
            showFilters || activeFilterCount > 0
              ? 'bg-nova-500/10 border-nova-500/30 text-nova-400'
              : 'bg-graphite-900 border-graphite-800 text-graphite-400 hover:text-white'
          )}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-nova-500 text-[10px] text-white flex items-center justify-center font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-graphite-900 border border-graphite-800">
          <FilterSelect label="Status" value={statusFilter} onChange={v => setStatusFilter(v as PatientStatus | 'all')}
            options={[{ value: 'all', label: 'All' }, { value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }, { value: 'onboarding', label: 'Onboarding' }, { value: 'paused', label: 'Paused' }]} />
          <FilterSelect label="Adherence" value={adherenceFilter} onChange={v => setAdherenceFilter(v as AdherenceLevel | 'all')}
            options={[{ value: 'all', label: 'All' }, { value: 'excellent', label: 'Excellent' }, { value: 'good', label: 'Good' }, { value: 'fair', label: 'Fair' }, { value: 'poor', label: 'Poor' }]} />
          <ToggleChip active={showAlerts} onClick={() => setShowAlerts(!showAlerts)} icon={AlertTriangle} label="Has Alerts" />
          <ToggleChip active={showOverdue} onClick={() => setShowOverdue(!showOverdue)} icon={CalendarClock} label="Overdue" />
          {activeFilterCount > 0 && (
            <button
              onClick={() => { setStatusFilter('all'); setAdherenceFilter('all'); setShowAlerts(false); setShowOverdue(false) }}
              className="text-xs text-graphite-500 hover:text-white ml-auto transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-graphite-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-graphite-900/80 border-b border-graphite-800">
                <SortHeader field="name" current={sortField} dir={sortDir} onClick={toggleSort}>Patient</SortHeader>
                <th className="text-left px-4 py-3 text-xs font-medium text-graphite-500 uppercase tracking-wider">Protocol</th>
                <SortHeader field="risk" current={sortField} dir={sortDir} onClick={toggleSort}>Risk</SortHeader>
                <SortHeader field="adherence" current={sortField} dir={sortDir} onClick={toggleSort}>Adherence</SortHeader>
                <th className="text-left px-4 py-3 text-xs font-medium text-graphite-500 uppercase tracking-wider">Status</th>
                <SortHeader field="lastVisit" current={sortField} dir={sortDir} onClick={toggleSort}>Last Visit</SortHeader>
                <SortHeader field="nextFollowUp" current={sortField} dir={sortDir} onClick={toggleSort}>Next F/U</SortHeader>
                <th className="text-left px-4 py-3 text-xs font-medium text-graphite-500 uppercase tracking-wider">Flags</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-graphite-800/50">
              {patients.map(patient => (
                <PatientRow key={patient.id} patient={patient} />
              ))}
              {patients.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-graphite-500">No patients match your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ── Row ──────────────────────────────────────────────────────

function PatientRow({ patient }: { patient: Patient }) {
  const now = new Date()
  const isFollowUpOverdue = new Date(patient.nextFollowUpDate) < now
  const isLabOverdue = new Date(patient.nextLabDueDate) < now

  return (
    <tr className="hover:bg-graphite-900/50 transition-colors group">
      <td className="px-4 py-3">
        <Link href={`/clinic/patients/${patient.id}`} className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-graphite-800 border border-graphite-700 flex items-center justify-center text-xs font-bold text-white shrink-0">
            {patient.firstName[0]}{patient.lastName[0]}
          </div>
          <div>
            <p className="text-sm font-medium text-white group-hover:text-nova-300 transition-colors">
              {patient.firstName} {patient.lastName}
            </p>
            <p className="text-[11px] text-graphite-500">{patient.mrn}</p>
          </div>
        </Link>
      </td>
      <td className="px-4 py-3">
        <span className="text-xs text-graphite-300 capitalize">{patient.primaryProtocol.replace(/_/g, ' ')}</span>
      </td>
      <td className="px-4 py-3"><RiskBadge score={patient.riskScore} /></td>
      <td className="px-4 py-3"><AdherenceBadge level={patient.adherence} /></td>
      <td className="px-4 py-3"><StatusBadge status={patient.status} /></td>
      <td className="px-4 py-3 text-xs text-graphite-400">{patient.lastVisitDate}</td>
      <td className="px-4 py-3">
        <span className={cn('text-xs', isFollowUpOverdue ? 'text-red-400 font-medium' : 'text-graphite-400')}>
          {patient.nextFollowUpDate}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5">
          {patient.activeAlertCount > 0 && (
            <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
              <AlertTriangle className="w-2.5 h-2.5" />{patient.activeAlertCount}
            </span>
          )}
          {patient.pendingRefills > 0 && (
            <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Pill className="w-2.5 h-2.5" />{patient.pendingRefills}
            </span>
          )}
          {isLabOverdue && (
            <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
              <FlaskConical className="w-2.5 h-2.5" />
            </span>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <Link href={`/clinic/patients/${patient.id}`} className="opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowRight className="w-4 h-4 text-graphite-500 hover:text-white" />
        </Link>
      </td>
    </tr>
  )
}

// ── Shared badges ────────────────────────────────────────────

function RiskBadge({ score }: { score: number }) {
  const color = score >= 70 ? 'text-red-400 bg-red-500/10' :
    score >= 40 ? 'text-orange-400 bg-orange-500/10' :
    score >= 20 ? 'text-yellow-400 bg-yellow-500/10' :
    'text-emerald-400 bg-emerald-500/10'
  return <span className={cn('text-[11px] font-bold px-2 py-0.5 rounded-full', color)}>{score}</span>
}

function AdherenceBadge({ level }: { level: AdherenceLevel }) {
  const styles: Record<AdherenceLevel, string> = {
    excellent: 'text-emerald-400 bg-emerald-500/10',
    good: 'text-blue-400 bg-blue-500/10',
    fair: 'text-yellow-400 bg-yellow-500/10',
    poor: 'text-red-400 bg-red-500/10',
    unknown: 'text-graphite-400 bg-graphite-500/10',
  }
  return <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full capitalize', styles[level])}>{level}</span>
}

function StatusBadge({ status }: { status: PatientStatus }) {
  const styles: Record<PatientStatus, string> = {
    active: 'text-emerald-400 bg-emerald-500/10',
    inactive: 'text-graphite-400 bg-graphite-500/10',
    onboarding: 'text-blue-400 bg-blue-500/10',
    paused: 'text-yellow-400 bg-yellow-500/10',
    discharged: 'text-graphite-400 bg-graphite-500/10',
  }
  return <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full capitalize', styles[status])}>{status}</span>
}

// ── Filter helpers ───────────────────────────────────────────

function FilterSelect({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[]
}) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-[11px] text-graphite-500">{label}:</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="text-xs bg-graphite-800 border border-graphite-700 text-white rounded-lg px-2 py-1.5 focus:outline-none focus:border-nova-500/50"
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}

function ToggleChip({ active, onClick, icon: Icon, label }: {
  active: boolean; onClick: () => void; icon: React.ElementType; label: string
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs transition-colors',
        active ? 'bg-nova-500/10 border-nova-500/30 text-nova-400' : 'bg-graphite-800/50 border-graphite-700 text-graphite-400 hover:text-white'
      )}
    >
      <Icon className="w-3 h-3" />
      {label}
    </button>
  )
}

function SortHeader({ field, current, dir, onClick, children }: {
  field: SortField; current: SortField; dir: SortDir; onClick: (f: SortField) => void; children: React.ReactNode
}) {
  const isActive = current === field
  return (
    <th
      className="text-left px-4 py-3 text-xs font-medium text-graphite-500 uppercase tracking-wider cursor-pointer select-none hover:text-white transition-colors"
      onClick={() => onClick(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        <ArrowUpDown className={cn('w-3 h-3', isActive ? 'text-nova-400' : 'text-graphite-600')} />
      </div>
    </th>
  )
}
