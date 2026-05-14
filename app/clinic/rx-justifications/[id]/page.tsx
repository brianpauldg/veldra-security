'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, FileText, AlertTriangle } from 'lucide-react'

export default function JustificationDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/clinic/rx-justifications/${id}`)
      .then(r => r.json())
      .then(d => setData(d))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="text-zinc-500 py-8">Loading...</div>
  if (!data || data.error) return <div className="text-red-400 py-8">Justification not found.</div>

  return (
    <div className="space-y-6 max-w-2xl">
      <Link href="/clinic/rx-justifications" className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      <div className="flex items-center gap-3">
        <FileText className="w-5 h-5 text-zinc-500" />
        <h1 className="text-xl font-bold text-white">Justification Detail</h1>
        <span className={`text-[10px] px-2 py-0.5 rounded-full ${data.status === 'flagged' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>{data.status}</span>
      </div>

      {data.status === 'flagged' && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5" />
          <div><p className="text-xs text-red-400 font-medium">Flagged: {data.flagged_reason}</p>
            <p className="text-[10px] text-zinc-500 mt-1">Flagged at {data.flagged_at ? new Date(data.flagged_at).toLocaleString() : 'N/A'}</p></div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {[
          ['Drug', data.drug],
          ['Patient', data.patient_id?.slice(0, 12) + '...'],
          ['Prescriber NPI', data.prescriber_npi],
          ['Prescriber DEA', data.prescriber_dea || 'N/A'],
          ['Signed At', data.signed_at ? new Date(data.signed_at).toLocaleString() : 'N/A'],
          ['Status', data.status],
        ].map(([label, value]) => (
          <div key={label as string} className="p-3 rounded-lg bg-zinc-800/30">
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{label}</p>
            <p className="text-xs text-white mt-1">{value}</p>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-lg bg-zinc-800/30">
        <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">Deviation Categories</p>
        <p className="text-xs text-white">{JSON.stringify(data.deviation_categories)}</p>
        {data.deviation_details && <p className="text-xs text-zinc-400 mt-2">{data.deviation_details}</p>}
      </div>

      <div className="p-4 rounded-lg bg-zinc-800/30">
        <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">Clinical Rationale</p>
        <p className="text-xs text-white whitespace-pre-wrap">{data.clinical_rationale}</p>
      </div>
    </div>
  )
}
