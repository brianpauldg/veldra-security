'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Check, AlertTriangle } from 'lucide-react'
import { COMPOUNDABLE_DRUGS } from '@/config/clinical/compoundable-drugs'
import { validateClinicalRationale } from '@/lib/clinic/validation/justification-validator'

const DEVIATION_CATEGORIES = [
  { id: 'allergy', label: 'Allergy', prompt: 'Specify allergen and ingredient in FDA-approved formulation' },
  { id: 'concentration', label: 'Concentration', prompt: 'Specify clinical reason for concentration deviation' },
  { id: 'combination', label: 'Combination', prompt: 'Specify clinical rationale for combination' },
  { id: 'dosage_form', label: 'Dosage Form', prompt: 'Specify why FDA-approved form is inappropriate' },
  { id: 'other', label: 'Other', prompt: 'Describe deviation' },
] as const

interface Props {
  defaultPatientId?: string
}

export default function CompoundedRxJustificationForm({ defaultPatientId }: Props) {
  const router = useRouter()
  const [patientId, setPatientId] = useState(defaultPatientId || '')
  const [drug, setDrug] = useState<string>(COMPOUNDABLE_DRUGS[0].id)
  const [categories, setCategories] = useState<string[]>([])
  const [categoryDetails, setCategoryDetails] = useState<Record<string, string>>({})
  const [rationale, setRationale] = useState('')
  const [rationaleValidation, setRationaleValidation] = useState<{ valid: boolean; reason?: string; warnings?: string[] }>({ valid: false })
  const [attestation, setAttestation] = useState(false)
  const [hasSignature, setHasSignature] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Live rationale validation
  useEffect(() => {
    if (rationale.length >= 10) {
      setRationaleValidation(validateClinicalRationale(rationale))
    } else {
      setRationaleValidation({ valid: false })
    }
  }, [rationale])

  function toggleCategory(id: string) {
    setCategories(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id])
  }

  // Signature canvas handlers
  function startDraw(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current
    if (!canvas) return
    setIsDrawing(true)
    setHasSignature(true)
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.strokeStyle = '#d8cfbe'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    const rect = canvas.getBoundingClientRect()
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  function draw(e: React.MouseEvent | React.TouchEvent) {
    if (!isDrawing) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const rect = canvas.getBoundingClientRect()
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  function clearSignature() {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height)
    setHasSignature(false)
  }

  const isValid = patientId && drug && categories.length > 0 && rationaleValidation.valid && attestation && hasSignature &&
    categories.every(c => categoryDetails[c]?.trim().length > 0)

  async function handleSubmit() {
    if (!isValid) return
    setSubmitting(true)
    setError('')

    const signatureData = canvasRef.current?.toDataURL('image/png') || ''

    try {
      const res = await fetch('/api/clinic/rx-justifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: patientId,
          drug,
          deviation_categories: categories,
          deviation_details: Object.entries(categoryDetails).map(([k, v]) => `${k}: ${v}`).join('\n'),
          clinical_rationale: rationale,
          prescriber_id: 'current_prescriber', // resolved server-side
          prescriber_npi: '0000000000', // populated from provider record
          prescriber_signature: signatureData,
          ip_address: '',
          user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        }),
      })
      const result = await res.json()
      if (result.ok) {
        router.push(`/clinic/rx-justifications`)
      } else {
        setError(result.error || 'Failed to save justification')
      }
    } catch {
      setError('Network error')
    }
    setSubmitting(false)
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Patient */}
      <div>
        <label className="block text-[12px] text-[#8a8268] mb-1.5">Patient ID</label>
        <input value={patientId} onChange={e => setPatientId(e.target.value)} placeholder="Patient UUID"
          className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 focus:border-nova-500/50 focus:outline-none" />
      </div>

      {/* Drug */}
      <div>
        <label className="block text-[12px] text-[#8a8268] mb-1.5">Compounded Medication</label>
        <select value={drug} onChange={e => setDrug(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-nova-500/50 focus:outline-none">
          {COMPOUNDABLE_DRUGS.map(d => <option key={d.id} value={d.id}>{d.display_name}</option>)}
        </select>
      </div>

      {/* Deviation Categories */}
      <div>
        <label className="block text-[12px] text-[#8a8268] mb-2">Deviation Categories (select all that apply)</label>
        <div className="space-y-2">
          {DEVIATION_CATEGORIES.map(cat => (
            <div key={cat.id}>
              <button type="button" onClick={() => toggleCategory(cat.id)}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${categories.includes(cat.id) ? 'border-nova-500/30 bg-nova-500/5 text-white' : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'}`}>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center ${categories.includes(cat.id) ? 'bg-nova-500/30 border-nova-500/50' : 'border-zinc-700'}`}>
                    {categories.includes(cat.id) && <Check className="w-3 h-3 text-nova-400" />}
                  </div>
                  <span className="text-xs">{cat.label}</span>
                </div>
              </button>
              {categories.includes(cat.id) && (
                <textarea value={categoryDetails[cat.id] || ''} onChange={e => setCategoryDetails(prev => ({ ...prev, [cat.id]: e.target.value }))}
                  placeholder={cat.prompt} rows={2}
                  className="w-full mt-2 px-4 py-2.5 rounded-lg bg-zinc-800/50 border border-zinc-700 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-nova-500/50 resize-none" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Rationale */}
      <div>
        <label className="block text-[12px] text-[#8a8268] mb-1.5">Clinical Rationale</label>
        <textarea value={rationale} onChange={e => setRationale(e.target.value)} rows={5} placeholder="Document patient-specific medical necessity for compounded medication (minimum 100 characters)..."
          className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:border-nova-500/50 focus:outline-none resize-none" />
        <div className="flex items-center justify-between mt-1">
          <span className={`text-[10px] ${rationale.length >= 100 ? 'text-emerald-400' : 'text-zinc-500'}`}>{rationale.length}/100 characters</span>
          {rationaleValidation.warnings && (
            <span className="flex items-center gap-1 text-[10px] text-amber-400"><AlertTriangle className="w-3 h-3" /> Clinical rationale must demonstrate medical necessity, not cost or convenience</span>
          )}
        </div>
        {!rationaleValidation.valid && rationale.length >= 100 && rationaleValidation.reason && (
          <p className="text-[10px] text-red-400 mt-1">{rationaleValidation.reason}</p>
        )}
      </div>

      {/* Attestation */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input type="checkbox" checked={attestation} onChange={e => setAttestation(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-nova-500" />
        <span className="text-[11px] text-zinc-300 leading-relaxed">
          I have determined this compounded product produces a significant difference for this identified individual patient based on my clinical judgment.
        </span>
      </label>

      {/* Signature */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[12px] text-[#8a8268]">Prescriber Signature</label>
          {hasSignature && <button onClick={clearSignature} className="text-[10px] text-zinc-500 hover:text-white">Clear</button>}
        </div>
        <canvas ref={canvasRef} width={400} height={100}
          onMouseDown={startDraw} onMouseMove={draw} onMouseUp={() => setIsDrawing(false)} onMouseLeave={() => setIsDrawing(false)}
          onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={() => setIsDrawing(false)}
          className="w-full rounded-lg border border-zinc-800 bg-zinc-900 cursor-crosshair touch-none" style={{ height: 100 }} />
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <button onClick={handleSubmit} disabled={!isValid || submitting}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-colors disabled:opacity-50">
        {submitting ? 'Saving...' : 'Sign & Submit Justification'}
      </button>
    </div>
  )
}
