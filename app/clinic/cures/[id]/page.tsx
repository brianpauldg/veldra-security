'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Shield } from 'lucide-react'

export default function CURESDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/clinic/cures/${id}`)
      .then(r => r.json())
      .then(d => setData(d))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="text-zinc-500 py-8">Loading...</div>
  if (!data || data.error) return <div className="text-red-400 py-8">Attestation not found.</div>

  return (
    <div className="space-y-6 max-w-2xl">
      <Link href="/clinic/cures" className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>
      <div className="flex items-center gap-3">
        <Shield className="w-5 h-5 text-zinc-500" />
        <h1 className="text-xl font-bold text-white">CURES Attestation Detail</h1>
        <span className={`text-[10px] px-2 py-0.5 rounded-full ${data.risk_stratification === 'high' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>{data.risk_stratification}</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[['Patient', data.patient_id?.slice(0, 12) + '...'], ['Method', data.query_method], ['Query Date', new Date(data.query_datetime).toLocaleString()], ['Risk', data.risk_stratification], ['Outage', data.outage_attested ? 'Yes' : 'No']].map(([l, v]) => (
          <div key={l as string} className="p-3 rounded-lg bg-zinc-800/30">
            <p className="text-[10px] text-zinc-500 uppercase">{l}</p>
            <p className="text-xs text-white mt-1">{v}</p>
          </div>
        ))}
      </div>
      {data.clinical_judgment_text && (
        <div className="p-4 rounded-lg bg-zinc-800/30">
          <p className="text-[10px] text-zinc-500 uppercase mb-2">Clinical Judgment</p>
          <p className="text-xs text-white">{data.clinical_judgment_text}</p>
        </div>
      )}
    </div>
  )
}
