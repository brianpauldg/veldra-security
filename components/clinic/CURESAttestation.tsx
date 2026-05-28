'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'

const FINDINGS = [
  { id: 'multiple_prescribers', label: 'Multiple prescribers in last 6 months (>3 different)' },
  { id: 'multiple_pharmacies', label: 'Multiple dispensing pharmacies (>3 different)' },
  { id: 'overlapping_testosterone_rx', label: 'Overlapping testosterone prescriptions from different prescribers' },
  { id: 'concurrent_benzo_or_opioid', label: 'Concurrent benzodiazepine or opioid prescriptions' },
  { id: 'recent_er_substance', label: 'Recent ER visit for substance-related concern' },
  { id: 'recent_decline_elsewhere', label: 'Patient declined controlled prescriptions elsewhere recently' },
] as const

interface Props { defaultPatientId?: string }

export default function CURESAttestationForm({ defaultPatientId }: Props) {
  const router = useRouter()
  const [patientId, setPatientId] = useState(defaultPatientId || '')
  const [queryMethod, setQueryMethod] = useState<'manual_portal' | 'dosespot_pmp'>('dosespot_pmp')
  const [queryRef, setQueryRef] = useState('')
  const [queryDatetime, setQueryDatetime] = useState(new Date().toISOString().slice(0, 16))
  const [riskStrat, setRiskStrat] = useState('low')
  const [findings, setFindings] = useState<Record<string, boolean>>(Object.fromEntries(FINDINGS.map(f => [f.id, false])))
  const [clinicalJudgment, setClinicalJudgment] = useState('')
  const [outageAttested, setOutageAttested] = useState(false)
  const [outageDetails, setOutageDetails] = useState('')
  const [hasSignature, setHasSignature] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const hasAnyFinding = Object.values(findings).some(Boolean)
  const judgmentValid = !hasAnyFinding || clinicalJudgment.trim().length >= 50
  const refValid = queryMethod !== 'dosespot_pmp' || queryRef.trim().length > 0
  const outageValid = !outageAttested || outageDetails.trim().length > 0
  const isValid = patientId && hasSignature && judgmentValid && refValid && outageValid

  function startDraw(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current; if (!canvas) return
    setIsDrawing(true); setHasSignature(true)
    const ctx = canvas.getContext('2d'); if (!ctx) return
    ctx.strokeStyle = '#d8cfbe'; ctx.lineWidth = 2; ctx.lineCap = 'round'
    const rect = canvas.getBoundingClientRect()
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top
    ctx.beginPath(); ctx.moveTo(x, y)
  }
  function draw(e: React.MouseEvent | React.TouchEvent) {
    if (!isDrawing) return; const canvas = canvasRef.current; const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return; const rect = canvas.getBoundingClientRect()
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top
    ctx.lineTo(x, y); ctx.stroke()
  }

  async function handleSubmit() {
    if (!isValid) return; setSubmitting(true); setError('')
    try {
      const res = await fetch('/api/clinic/cures', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: patientId, prescriber_id: 'current', prescriber_dea: 'AA0000000',
          query_datetime: new Date(queryDatetime).toISOString(), query_method: queryMethod,
          query_reference: queryRef || undefined, risk_stratification: riskStrat,
          findings_checklist: findings, clinical_judgment_text: clinicalJudgment || undefined,
          attestation_signature: canvasRef.current?.toDataURL('image/png') || '',
          outage_attested: outageAttested, outage_details: outageDetails || undefined,
        }),
      })
      const result = await res.json()
      if (result.ok) router.push('/clinic/cures')
      else setError(result.error || 'Failed')
    } catch { setError('Network error') }
    setSubmitting(false)
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <label className="block text-[12px] text-[#8a8268] mb-1.5">Patient ID</label>
        <input value={patientId} onChange={e => setPatientId(e.target.value)} placeholder="Patient UUID"
          className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 focus:outline-none" />
      </div>

      <div>
        <label className="block text-[12px] text-[#8a8268] mb-1.5">Query Method</label>
        <div className="flex gap-3">
          {(['dosespot_pmp', 'manual_portal'] as const).map(m => (
            <button key={m} type="button" onClick={() => setQueryMethod(m)}
              className={`px-4 py-2 rounded-lg text-xs border transition-all ${queryMethod === m ? 'border-nova-500/30 bg-nova-500/5 text-white' : 'border-zinc-800 text-zinc-400'}`}>
              {m === 'dosespot_pmp' ? 'DoseSpot PMP' : 'Manual Portal'}
            </button>
          ))}
        </div>
      </div>

      {queryMethod === 'dosespot_pmp' && (
        <div>
          <label className="block text-[12px] text-[#8a8268] mb-1.5">Query Reference ID</label>
          <input value={queryRef} onChange={e => setQueryRef(e.target.value)} placeholder="DoseSpot query reference"
            className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 focus:outline-none" />
        </div>
      )}

      <div>
        <label className="block text-[12px] text-[#8a8268] mb-1.5">Query Date/Time</label>
        <input type="datetime-local" value={queryDatetime} onChange={e => setQueryDatetime(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none" />
      </div>

      <div>
        <label className="block text-[12px] text-[#8a8268] mb-1.5">Risk Stratification</label>
        <select value={riskStrat} onChange={e => setRiskStrat(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none">
          <option value="none">None</option><option value="low">Low</option><option value="moderate">Moderate</option>
          <option value="high">High</option><option value="declined_to_prescribe">Declined to Prescribe</option>
        </select>
      </div>

      <div>
        <label className="block text-[12px] text-[#8a8268] mb-2">Findings Checklist</label>
        <div className="space-y-2">
          {FINDINGS.map(f => (
            <label key={f.id} className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={findings[f.id]} onChange={e => setFindings(prev => ({ ...prev, [f.id]: e.target.checked }))}
                className="mt-0.5 w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-red-500" />
              <span className="text-xs text-zinc-300">{f.label}</span>
            </label>
          ))}
        </div>
      </div>

      {hasAnyFinding && (
        <div>
          <label className="block text-[12px] text-[#8a8268] mb-1.5">Clinical Judgment (required, min 50 chars)</label>
          <textarea value={clinicalJudgment} onChange={e => setClinicalJudgment(e.target.value)} rows={3}
            placeholder="Document clinical reasoning for proceeding despite concerning findings..."
            className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none resize-none" />
          <span className={`text-[10px] ${clinicalJudgment.length >= 50 ? 'text-emerald-400' : 'text-zinc-500'}`}>{clinicalJudgment.length}/50</span>
        </div>
      )}

      <label className="flex items-start gap-3 cursor-pointer">
        <input type="checkbox" checked={outageAttested} onChange={e => setOutageAttested(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-amber-500" />
        <span className="text-xs text-zinc-300">CURES system was experiencing an outage at time of query</span>
      </label>

      {outageAttested && (
        <textarea value={outageDetails} onChange={e => setOutageDetails(e.target.value)} rows={2} placeholder="Describe outage circumstances..."
          className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none resize-none" />
      )}

      <div>
        <label className="block text-[12px] text-[#8a8268] mb-1.5">Attestation Signature</label>
        <canvas ref={canvasRef} width={400} height={100}
          onMouseDown={startDraw} onMouseMove={draw} onMouseUp={() => setIsDrawing(false)} onMouseLeave={() => setIsDrawing(false)}
          onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={() => setIsDrawing(false)}
          className="w-full rounded-lg border border-zinc-800 bg-zinc-900 cursor-crosshair touch-none" style={{ height: 100 }} />
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <button onClick={handleSubmit} disabled={!isValid || submitting}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-colors disabled:opacity-50">
        {submitting ? 'Saving...' : 'Sign & Submit CURES Attestation'}
      </button>
    </div>
  )
}
