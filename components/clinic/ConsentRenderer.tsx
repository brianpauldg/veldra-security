'use client'

import { useState, useRef, useEffect } from 'react'
import { Check, FileText } from 'lucide-react'

interface ConsentRendererProps {
  templateId: string
  version?: string
  patientId?: string
  onComplete: (data: { consentId: string; contentHash: string }) => void
}

export default function ConsentRenderer({ templateId, version, patientId, onComplete }: ConsentRendererProps) {
  const [template, setTemplate] = useState<{ id: string; version: string; title: string; body: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [signing, setSigning] = useState(false)
  const [signed, setSigned] = useState(false)
  const [signatureName, setSignatureName] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hasDrawn, setHasDrawn] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    fetch(`/api/clinic/consents?id=${templateId}${version ? `&version=${version}` : ''}`)
      .then(r => r.json())
      .then(data => {
        if (data.id) setTemplate(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [templateId, version])

  // Canvas signature pad handlers
  function startDrawing(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current
    if (!canvas) return
    setIsDrawing(true)
    setHasDrawn(true)
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

  function stopDrawing() {
    setIsDrawing(false)
  }

  function clearSignature() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasDrawn(false)
  }

  async function handleSubmit() {
    if (!template || !signatureName || !hasDrawn) return
    setSigning(true)

    const canvas = canvasRef.current
    const signatureData = canvas?.toDataURL('image/png') || ''

    try {
      const res = await fetch('/api/clinic/consents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: patientId,
          document_id: template.id,
          document_version: template.version,
          signature_data: signatureData,
          ip_address: '',
          user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        }),
      })
      const result = await res.json()
      if (result.ok) {
        setSigned(true)
        onComplete({ consentId: result.consent_id, contentHash: result.content_hash })
      }
    } catch {
      // Handle error
    }
    setSigning(false)
  }

  if (loading) {
    return <div className="text-[#8a8268] text-sm py-8 text-center">Loading consent document...</div>
  }

  if (!template) {
    return <div className="text-red-400 text-sm py-8 text-center">Consent template not found.</div>
  }

  if (signed) {
    return (
      <div className="rounded-xl border border-[#1a1814] bg-[#050404] p-8 text-center">
        <Check className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
        <h3 className="text-white text-[15px] font-semibold mb-1">Consent Signed</h3>
        <p className="text-[#8a8268] text-[13px]">{template.title}, signed and recorded.</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-[#1a1814] bg-[#050404] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-[#1a1814]">
        <FileText className="w-4 h-4 text-[#8a8268]" />
        <h3 className="text-white text-[14px] font-semibold">{template.title}</h3>
        <span className="text-[10px] text-[#8a8268] ml-auto">v{template.version}</span>
      </div>

      {/* Consent body — rendered as HTML from markdown-like content */}
      <div className="px-6 py-6 max-h-[400px] overflow-y-auto">
        <div className="prose prose-sm prose-invert max-w-none text-[13px] text-[#d8cfbe] leading-relaxed space-y-4">
          {template.body.split('\n\n').map((paragraph, i) => {
            if (paragraph.startsWith('# ')) {
              return <h2 key={i} className="text-white text-[16px] font-light" style={{ fontFamily: 'Fraunces, serif' }}>{paragraph.replace('# ', '')}</h2>
            }
            if (paragraph.startsWith('## ')) {
              return <h3 key={i} className="text-white text-[14px] font-semibold mt-4">{paragraph.replace('## ', '')}</h3>
            }
            if (paragraph.startsWith('### ')) {
              return <h4 key={i} className="text-[#d8cfbe] text-[13px] font-semibold mt-3">{paragraph.replace('### ', '')}</h4>
            }
            if (paragraph.startsWith('- ')) {
              return (
                <ul key={i} className="list-disc pl-5 space-y-1">
                  {paragraph.split('\n').map((line, j) => (
                    <li key={j} className="text-[12px]">{line.replace('- ', '')}</li>
                  ))}
                </ul>
              )
            }
            if (paragraph.startsWith('**')) {
              return <p key={i} className="text-[#d8cfbe] font-semibold text-[12px]">{paragraph.replace(/\*\*/g, '')}</p>
            }
            if (paragraph.includes('<!--')) return null // Skip HTML comments
            return <p key={i} className="text-[12px]">{paragraph}</p>
          })}
        </div>
      </div>

      {/* Signature area */}
      <div className="px-6 py-6 border-t border-[#1a1814] space-y-4">
        <div>
          <label className="block text-[12px] text-[#8a8268] mb-1.5">Full Legal Name</label>
          <input
            type="text"
            value={signatureName}
            onChange={(e) => setSignatureName(e.target.value)}
            placeholder="Type your full legal name"
            className="w-full px-4 py-2.5 rounded-lg bg-[#0d0c0a] border border-[#1a1814] text-[13px] text-[#d8cfbe] placeholder-[#8a8268]/50 focus:outline-none focus:border-[#8a8268]"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[12px] text-[#8a8268]">Signature</label>
            {hasDrawn && (
              <button onClick={clearSignature} className="text-[10px] text-[#8a8268] hover:text-[#d8cfbe]">Clear</button>
            )}
          </div>
          <canvas
            ref={canvasRef}
            width={400}
            height={120}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full rounded-lg border border-[#1a1814] bg-[#0d0c0a] cursor-crosshair touch-none"
            style={{ height: 120 }}
          />
          {!hasDrawn && <p className="text-[10px] text-[#8a8268] mt-1">Draw your signature above</p>}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!signatureName || !hasDrawn || signing}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[13px] font-medium hover:bg-emerald-500/20 transition-colors disabled:opacity-50"
        >
          {signing ? 'Signing...' : 'Sign Consent Document'}
          {!signing && <Check className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  )
}
