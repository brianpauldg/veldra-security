'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Shield, Plus } from 'lucide-react'

export default function CURESPage() {
  const [queries, setQueries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/clinic/cures')
      .then(r => r.json())
      .then(data => setQueries(data.queries || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">CURES PMP Attestations</h1>
          <p className="text-sm text-graphite-500 mt-1">California PDMP queries for Schedule III TRT prescriptions</p>
        </div>
        <Link href="/clinic/cures/new" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors">
          <Plus className="w-3.5 h-3.5" /> New Attestation
        </Link>
      </div>

      <div className="rounded-xl border border-graphite-800 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-graphite-500 text-sm">Loading...</div>
        ) : queries.length === 0 ? (
          <div className="p-8 text-center">
            <Shield className="w-8 h-8 text-graphite-600 mx-auto mb-2" />
            <p className="text-sm text-graphite-500">No CURES attestations found.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead><tr className="bg-graphite-900/80 border-b border-graphite-800">
              <th className="text-left px-4 py-3 text-xs font-medium text-graphite-500 uppercase">Patient</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-graphite-500 uppercase">Method</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-graphite-500 uppercase">Date</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-graphite-500 uppercase">Risk</th>
            </tr></thead>
            <tbody className="divide-y divide-graphite-800/50">
              {queries.map(q => (
                <tr key={q.id} className="hover:bg-graphite-900/50">
                  <td className="px-4 py-3 text-graphite-400">{q.patient_id?.slice(0, 8)}...</td>
                  <td className="px-4 py-3 text-white">{q.query_method}</td>
                  <td className="px-4 py-3 text-graphite-400">{new Date(q.query_datetime).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${q.risk_stratification === 'high' ? 'bg-red-500/10 text-red-400' : q.risk_stratification === 'moderate' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                      {q.risk_stratification}
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
