'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { SEED_ALERTS } from '@/lib/clinic/seed-data'
import { severityColor, severityOrder } from '@/lib/clinic/alerts'
import type { AlertSeverity, AlertStatus } from '@/lib/clinic/types'

export default function AlertsPage() {
  const [severityFilter, setSeverityFilter] = useState<AlertSeverity | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<AlertStatus | 'all'>('active')

  const alerts = useMemo(() => {
    let result = [...SEED_ALERTS]
    if (severityFilter !== 'all') result = result.filter(a => a.severity === severityFilter)
    if (statusFilter !== 'all') result = result.filter(a => a.status === statusFilter)
    return result.sort((a, b) => severityOrder(a.severity) - severityOrder(b.severity))
  }, [severityFilter, statusFilter])

  const counts: Record<string, number> = {
    critical: SEED_ALERTS.filter(a => a.severity === 'critical' && a.status === 'active').length,
    high: SEED_ALERTS.filter(a => a.severity === 'high' && a.status === 'active').length,
    medium: SEED_ALERTS.filter(a => a.severity === 'medium' && a.status === 'active').length,
    low: SEED_ALERTS.filter(a => a.severity === 'low' && a.status === 'active').length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Alerts</h1>
        <p className="text-sm text-graphite-500 mt-1">Clinical safety alerts and risk flags</p>
      </div>

      {/* Severity summary */}
      <div className="grid grid-cols-4 gap-3">
        {(['critical', 'high', 'medium', 'low'] as AlertSeverity[]).map(sev => (
          <button
            key={sev}
            onClick={() => setSeverityFilter(severityFilter === sev ? 'all' : sev)}
            className={cn(
              'p-3 rounded-xl border text-left transition-all',
              severityFilter === sev ? 'ring-1 ring-nova-500' : '',
              sev === 'critical' ? 'bg-red-500/5 border-red-500/20' :
              sev === 'high' ? 'bg-orange-500/5 border-orange-500/20' :
              sev === 'medium' ? 'bg-yellow-500/5 border-yellow-500/20' :
              'bg-blue-500/5 border-blue-500/20'
            )}
          >
            <p className={cn('text-2xl font-bold',
              sev === 'critical' ? 'text-red-400' : sev === 'high' ? 'text-orange-400' :
              sev === 'medium' ? 'text-yellow-400' : 'text-blue-400'
            )}>{counts[sev]}</p>
            <p className="text-[11px] text-graphite-500 capitalize mt-0.5">{sev}</p>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-[11px] text-graphite-500">Status:</label>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as AlertStatus | 'all')}
            className="text-xs bg-graphite-900 border border-graphite-800 text-white rounded-lg px-2 py-1.5 focus:outline-none"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="acknowledged">Acknowledged</option>
            <option value="resolved">Resolved</option>
            <option value="dismissed">Dismissed</option>
          </select>
        </div>
        {(severityFilter !== 'all' || statusFilter !== 'active') && (
          <button
            onClick={() => { setSeverityFilter('all'); setStatusFilter('active') }}
            className="text-xs text-graphite-500 hover:text-white transition-colors"
          >
            Reset
          </button>
        )}
        <span className="ml-auto text-xs text-graphite-500">{alerts.length} alert{alerts.length !== 1 && 's'}</span>
      </div>

      {/* Alert list */}
      <div className="space-y-2">
        {alerts.map(alert => (
          <Link
            key={alert.id}
            href={`/clinic/patients/${alert.patientId}`}
            className="flex items-start gap-4 p-4 rounded-xl bg-graphite-900/50 border border-graphite-800 hover:border-graphite-700 transition-colors group"
          >
            <div className={cn('mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase border shrink-0', severityColor(alert.severity))}>
              {alert.severity}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">{alert.title}</p>
              <p className="text-xs text-graphite-400 mt-0.5">{alert.patientName} · {alert.category.replace(/_/g, ' ')}</p>
              <p className="text-[11px] text-graphite-500 mt-1">{alert.rationale}</p>
              {alert.triggerValue && (
                <p className="text-[10px] text-graphite-600 mt-1">
                  Value: {alert.triggerValue} (threshold: {alert.triggerThreshold})
                </p>
              )}
            </div>
            <div className="text-right shrink-0">
              <p className="text-[10px] text-graphite-600">{alert.createdAt}</p>
              <span className={cn('inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded capitalize',
                alert.status === 'active' ? 'bg-red-500/10 text-red-400' :
                alert.status === 'acknowledged' ? 'bg-yellow-500/10 text-yellow-400' :
                'bg-emerald-500/10 text-emerald-400'
              )}>{alert.status}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-graphite-600 group-hover:text-graphite-400 mt-1 shrink-0 transition-colors" />
          </Link>
        ))}
        {alerts.length === 0 && (
          <div className="text-center py-16 text-graphite-500">
            <CheckCircle className="w-8 h-8 mx-auto mb-3 text-emerald-400" />
            <p className="text-sm">No alerts match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
