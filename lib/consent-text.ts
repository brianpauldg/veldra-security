/**
 * Bloom Metabolics — TCPA Consent Text (Versioned)
 * All consent language is centralized here for audit trail.
 * NEVER delete a historical version — old records reference them.
 */

export const CURRENT_CONSENT_VERSION = '2.0.0'

export interface ConsentText {
  version: string
  sms_text: string
  email_text: string
  effective_from: string
  effective_until: string | null
}

/**
 * Active consent text — used in all new forms.
 */
const ACTIVE_VERSION: ConsentText = {
  version: '2.0.0',
  effective_from: '2026-05-03',
  effective_until: null,
  sms_text:
    'By checking this box, I consent to receive recurring automated SMS and text messages from Bloom Metabolics at the phone number provided, including appointment reminders, care updates, and intake follow-ups. Message frequency varies. Message and data rates may apply. Reply STOP to cancel or HELP for assistance at any time. Consent to marketing messages is not required to receive care or purchase services. View our Privacy Policy and Terms of Service.',
  email_text:
    'I agree to receive emails from Bloom Metabolics at the email address provided, including health information, appointment reminders, and educational content. You may unsubscribe at any time. View our Privacy Policy at bloommetabolics.com/privacy.',
}

/**
 * Legacy versions — retained for audit trail. Never delete entries.
 * Records in consent_records referencing these versions remain valid.
 */
const LEGACY_VERSIONS: ConsentText[] = [
  {
    version: '1.0.0',
    effective_from: '2026-04-28',
    effective_until: '2026-05-02',
    sms_text:
      'I agree to receive text messages from Bloom Metabolics at the phone number provided. Message frequency varies. Message and data rates may apply. Reply STOP to unsubscribe. Reply HELP for help. View our Terms of Service at bloommetabolics.com/terms.',
    email_text:
      'I agree to receive emails from Bloom Metabolics at the email address provided, including health information, appointment reminders, and educational content. You may unsubscribe at any time. View our Privacy Policy at bloommetabolics.com/privacy.',
  },
]

const ALL_VERSIONS: ConsentText[] = [ACTIVE_VERSION, ...LEGACY_VERSIONS]

export function getConsentTextByVersion(version: string): ConsentText | null {
  return ALL_VERSIONS.find((v) => v.version === version) || null
}

export function getCurrentConsentText(): ConsentText {
  return ACTIVE_VERSION
}
