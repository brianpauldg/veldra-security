'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CURRENT_CONSENT_VERSION, getCurrentConsentText } from '@/lib/consent-text'

export interface ConsentState {
  email: boolean
  sms: boolean
  version: string
}

interface TCPAConsentProps {
  formId: string
  requiresSMS?: boolean
  requiresEmail?: boolean
  onChange: (consent: ConsentState) => void
}

/**
 * Renders the SMS consent text with inline <Link> elements for
 * "Privacy Policy" and "Terms of Service" at the end.
 */
function SMSConsentLabel({ text }: { text: string }) {
  // The consent text ends with "View our Privacy Policy and Terms of Service."
  // Split on that phrase and render it with clickable links.
  const linkPhrase = 'View our Privacy Policy and Terms of Service.'
  const idx = text.indexOf('View our Privacy Policy')

  if (idx === -1) {
    // Fallback: render as plain text if phrase not found
    return <>{text}</>
  }

  const before = text.slice(0, idx)

  return (
    <>
      {before}
      View our{' '}
      <Link href="/privacy" className="underline hover:text-[#d8cfbe]" target="_blank">
        Privacy Policy
      </Link>{' '}
      and{' '}
      <Link href="/terms" className="underline hover:text-[#d8cfbe]" target="_blank">
        Terms of Service
      </Link>
      .
    </>
  )
}

export default function TCPAConsent({ formId, requiresSMS = false, requiresEmail = true, onChange }: TCPAConsentProps) {
  const text = getCurrentConsentText()
  const [emailConsent, setEmailConsent] = useState(false)
  const [smsConsent, setSmsConsent] = useState(false)

  function update(field: 'email' | 'sms', value: boolean) {
    const newState = {
      email: field === 'email' ? value : emailConsent,
      sms: field === 'sms' ? value : smsConsent,
      version: CURRENT_CONSENT_VERSION,
    }
    if (field === 'email') setEmailConsent(value)
    if (field === 'sms') setSmsConsent(value)
    onChange(newState)
  }

  return (
    <div className="space-y-3 mt-4">
      {requiresEmail && (
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={emailConsent}
            onChange={(e) => update('email', e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-[#2a2620] bg-[#0d0c0a] text-[#8a8268] focus:ring-[#8a8268] focus:ring-offset-0"
          />
          <span className="text-[11px] text-[#8a8268] leading-relaxed group-hover:text-[#d8cfbe] transition-colors">
            {text.email_text}
          </span>
        </label>
      )}

      {requiresSMS && (
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={smsConsent}
            onChange={(e) => update('sms', e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-[#2a2620] bg-[#0d0c0a] text-[#8a8268] focus:ring-[#8a8268] focus:ring-offset-0"
          />
          <span className="text-[14px] leading-relaxed text-[#8a8268] group-hover:text-[#d8cfbe] transition-colors">
            <SMSConsentLabel text={text.sms_text} />
          </span>
        </label>
      )}
    </div>
  )
}

/**
 * Check if required consent has been granted.
 */
export function isConsentValid(
  consent: ConsentState,
  requiresEmail: boolean,
  requiresSMS: boolean
): boolean {
  if (requiresEmail && !consent.email) return false
  if (requiresSMS && !consent.sms) return false
  return true
}
