# Data Classification — Bloom Metabolics

## Classification Levels

### PHI (Protected Health Information) — Encrypted at Rest
- Medical history, symptoms, diagnoses
- Lab results, vital signs
- Medications, prescriptions, dosages
- Intake form responses (form_data)
- Informed consent signature data
- Treatment plans, protocols

### PII (Personally Identifiable Information) — Encrypted at Rest
- Phone numbers (in consent_records.user_phone)
- Date of birth
- Physical address
- Social Security Number (not collected)

### PII — Stored Unencrypted (Intentional Tradeoff)
- **Email addresses**: Stored unencrypted because email is the primary lookup key for:
  - Opt-out/unsubscribe flows (TCPA compliance requires honoring opt-out within 10 business days)
  - Patient record linkage across intake, consent, and billing
  - Stripe customer identification
  - Communication preference management
- **Patient first/last name**: Stored unencrypted for display in clinical dashboard and task assignment
- **Tradeoff rationale**: Encrypting email would require full-table scans for every lookup, making opt-out processing and patient search impractical at any scale. RLS + service-role-only access provides access control.

### Marketing Data — Not PHI, Not Encrypted
- UTM parameters, referrer, landing page
- Device type, browser, approximate geo (state level)
- Lead source, campaign attribution
- Out-of-state waitlist (email + state only)

### Financial Data — Not Stored
- Credit card numbers: Never stored. Stripe handles all card data.
- Bank account / routing numbers: Never collected.
