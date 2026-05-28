'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FileText, Plus, AlertTriangle } from 'lucide-react'

export default function RxJustificationsPage() {
  const [justifications, setJustifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'signed' | 'flagged'>('all')

  useEffect(() => {
    const params = filter !== 'all' ? `?status=${filter}` : ''
    fetch(`/api/clinic/rx-justifications${params}`)
      .then(r => r.json())
      .then(data => setJustifications(data.justifications || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [filter])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Compounded Rx Justifications</h1>
          <p className="text-sm text-zinc-500 mt-1">FDA April 2026, patient-specific medical necessity documentation</p>
        </div>
        <Link href="/clinic/rx-justifications/new" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors">
          <Plus className="w-3.5 h-3.5" /> New Justification
        </Link>
      </div>

      <div className="flex gap-2">
        {(['all', 'signed', 'flagged'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${filter === f ? 'bg-nova-500/10 border-nova-500/30 text-nova-400' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}>
            {f === 'all' ? 'All' : f === 'signed' ? 'Signed' : 'Flagged'}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-zinc-800 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-zinc-500 text-sm">Loading...</div>
        ) : justifications.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
            <p className="text-sm text-zinc-500">No justifications found.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead><tr className="bg-zinc-900/80 border-b border-zinc-800">
              <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase">Drug</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase">Patient</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase">Signed</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase">Status</th>
            </tr></thead>
            <tbody className="divide-y divide-zinc-800/50">
              {justifications.map(j => (
                <tr key={j.id} className="hover:bg-zinc-900/50">
                  <td className="px-4 py-3 text-white">{j.drug}</td>
                  <td className="px-4 py-3 text-zinc-400">{j.patient_id?.slice(0, 8)}...</td>
                  <td className="px-4 py-3 text-zinc-400">{new Date(j.signed_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${j.status === 'flagged' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                      {j.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
