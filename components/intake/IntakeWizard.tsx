'use client'

import { useState, useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check } from 'lucide-react'

export interface StepConfig {
  title: string
  subtitle?: string
  requiredFields?: string[]
  content: (props: {
    data: Record<string, unknown>
    update: (field: string, value: unknown) => void
    errors: Record<string, string>
  }) => ReactNode
}

interface IntakeWizardProps {
  intakeType: 'trt' | 'glp1'
  steps: StepConfig[]
  sessionId: string
  email?: string
  onComplete: (data: Record<string, unknown>) => void
}

export default function IntakeWizard({ intakeType, steps, sessionId, email, onComplete }: IntakeWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, unknown>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)

  // Warn on page refresh/close if form has data
  useEffect(() => {
    const hasData = Object.keys(formData).length > 0
    if (!hasData) return
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [formData])

  const step = steps[currentStep]
  const isLast = currentStep === steps.length - 1
  const progress = ((currentStep + 1) / steps.length) * 100

  function update(field: string, value: unknown) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  async function saveProgress(stepIndex: number) {
    try {
      await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          intake_type: intakeType,
          current_step: stepIndex,
          form_data: formData,
          email,
        }),
      })
    } catch {
      // Silent fail — progress save is best-effort
    }
  }

  function validateStep(): boolean {
    const required = step.requiredFields || []
    const newErrors: Record<string, string> = {}

    for (const field of required) {
      const value = formData[field]
      if (value === undefined || value === null || value === '') {
        newErrors[field] = 'This field is required'
      } else if (Array.isArray(value) && value.length === 0) {
        newErrors[field] = 'Please select at least one option'
      }
    }

    // Phone validation on Step 1 (if phone field is present)
    if (required.includes('phone') && formData.phone) {
      const phone = String(formData.phone).replace(/[\s\-\(\)\.]/g, '')
      if (!/^(\+?1)?[2-9]\d{9}$/.test(phone)) {
        newErrors.phone = 'Please enter a valid US phone number'
      }
    }

    // SMS consent validation on Step 1 (if smsConsent field is present)
    if (required.includes('smsConsent') && !formData.smsConsent) {
      newErrors.smsConsent = 'SMS consent is required to proceed'
    }

    // On the consent step, check all three checkboxes
    if (isLast) {
      if (!formData.risksAcknowledged) newErrors.risksAcknowledged = 'You must acknowledge the risks'
      if (!formData.treatmentConsent) newErrors.treatmentConsent = 'Consent is required'
      if (!formData.teleheathConsent) newErrors.teleheathConsent = 'Consent is required'
      if (!formData.signatureName || (formData.signatureName as string).trim().length < 2) newErrors.signatureName = 'Full legal name is required'
      if (!formData.signatureDate) newErrors.signatureDate = 'Date is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      // Scroll to first error
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return false
    }
    return true
  }

  async function handleNext() {
    setErrors({})

    if (!validateStep()) return

    setSaving(true)

    if (isLast) {
      await saveProgress(currentStep)
      onComplete(formData)
    } else {
      await saveProgress(currentStep + 1)
      setCurrentStep((s) => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    setSaving(false)
  }

  function handleBack() {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10px] text-[#8a8268] tracking-[0.2em] uppercase">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="font-mono text-[10px] text-[#8a8268] tracking-[0.2em]">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-[2px] bg-[#1a1814] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#d8cfbe]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        {/* Step dots */}
        <div className="flex gap-1.5 mt-3">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all ${
                i < currentStep
                  ? 'bg-[#8a8268] flex-1'
                  : i === currentStep
                  ? 'bg-[#d8cfbe] flex-[2]'
                  : 'bg-[#1a1814] flex-1'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step title */}
      <div className="mb-8">
        <h2 className="text-[1.5rem] text-white font-light" style={{ fontFamily: 'Fraunces, serif' }}>
          {step.title}
        </h2>
        {step.subtitle && (
          <p className="text-[14px] text-[#8a8268] mt-2 font-light">{step.subtitle}</p>
        )}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step.content({ data: formData, update, errors })}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10 pt-8 border-t border-[#1a1814]">
        {currentStep > 0 ? (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-[13px] text-[#8a8268] hover:text-[#d8cfbe] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
        ) : (
          <div />
        )}

        <button
          onClick={handleNext}
          disabled={saving}
          className="bloom-btn disabled:opacity-50"
        >
          {saving ? 'Saving...' : isLast ? 'Submit & Schedule' : 'Continue'}
          {!saving && (isLast ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />)}
        </button>
      </div>
    </div>
  )
}

// ── Shared form field components ────────────────────────────

export function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <div className="mb-5">
      <label className="block text-[13px] text-[#d8cfbe] mb-1.5 font-light">{label}</label>
      {children}
      {error && <p className="text-[12px] text-red-400 mt-1">{error}</p>}
    </div>
  )
}

export function TextInput({ value, onChange, placeholder, type = 'text' }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string
}) {
  return (
    <input
      type={type}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl bg-[#0d0c0a] border border-[#1a1814] text-[14px] text-[#d8cfbe] placeholder-[#8a8268]/50 focus:outline-none focus:border-[#8a8268] transition-colors"
    />
  )
}

export function TextArea({ value, onChange, placeholder, rows = 3 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number
}) {
  return (
    <textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-4 py-3 rounded-xl bg-[#0d0c0a] border border-[#1a1814] text-[14px] text-[#d8cfbe] placeholder-[#8a8268]/50 focus:outline-none focus:border-[#8a8268] transition-colors resize-none"
    />
  )
}

export function Select({ value, onChange, options, placeholder }: {
  value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; placeholder?: string
}) {
  return (
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-xl bg-[#0d0c0a] border border-[#1a1814] text-[14px] text-[#d8cfbe] focus:outline-none focus:border-[#8a8268] transition-colors appearance-none"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}

export function RadioGroup({ value, onChange, options }: {
  value: string; onChange: (v: string) => void; options: { value: string; label: string; desc?: string }[]
}) {
  return (
    <div className="space-y-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
            value === o.value
              ? 'border-[#8a8268] bg-[#1a1814]'
              : 'border-[#1a1814] bg-[#0d0c0a] hover:border-[#2a2620]'
          }`}
        >
          <span className={`text-[14px] ${value === o.value ? 'text-[#d8cfbe]' : 'text-[#8a8268]'}`}>
            {o.label}
          </span>
          {o.desc && <span className="block text-[12px] text-[#8a8268]/70 mt-0.5">{o.desc}</span>}
        </button>
      ))}
    </div>
  )
}

export function CheckboxGroup({ values, onChange, options }: {
  values: string[]; onChange: (v: string[]) => void; options: { value: string; label: string }[]
}) {
  const toggle = (val: string) => {
    onChange(
      (values || []).includes(val)
        ? (values || []).filter((v) => v !== val)
        : [...(values || []), val]
    )
  }

  return (
    <div className="space-y-2">
      {options.map((o) => {
        const checked = (values || []).includes(o.value)
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => toggle(o.value)}
            className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center gap-3 ${
              checked
                ? 'border-[#8a8268] bg-[#1a1814]'
                : 'border-[#1a1814] bg-[#0d0c0a] hover:border-[#2a2620]'
            }`}
          >
            <div className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center ${
              checked ? 'bg-[#8a8268] border-[#8a8268]' : 'border-[#2a2620]'
            }`}>
              {checked && <Check className="w-3 h-3 text-[#020202]" />}
            </div>
            <span className={`text-[14px] ${checked ? 'text-[#d8cfbe]' : 'text-[#8a8268]'}`}>
              {o.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export function ScaleSelector({ value, onChange, labels }: {
  value: string; onChange: (v: string) => void; labels: string[]
}) {
  return (
    <div className="flex gap-2">
      {labels.map((label, i) => {
        const val = String(i)
        const selected = value === val
        return (
          <button
            key={i}
            type="button"
            onClick={() => onChange(val)}
            className={`flex-1 py-3 px-2 rounded-xl border text-center transition-all ${
              selected
                ? 'border-[#8a8268] bg-[#1a1814]'
                : 'border-[#1a1814] bg-[#0d0c0a] hover:border-[#2a2620]'
            }`}
          >
            <span className={`text-[11px] leading-tight ${selected ? 'text-[#d8cfbe]' : 'text-[#8a8268]'}`}>
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export function Checkbox({ checked, onChange, label }: {
  checked: boolean; onChange: (v: boolean) => void; label: string
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-start gap-3 text-left w-full"
    >
      <div className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center mt-0.5 ${
        checked ? 'bg-[#8a8268] border-[#8a8268]' : 'border-[#2a2620]'
      }`}>
        {checked && <Check className="w-3 h-3 text-[#020202]" />}
      </div>
      <span className="text-[13px] text-[#d8cfbe] leading-relaxed">{label}</span>
    </button>
  )
}
