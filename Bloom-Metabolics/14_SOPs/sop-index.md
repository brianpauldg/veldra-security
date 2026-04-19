# Standard Operating Procedures — Index & Critical SOPs

---

## SOP Index

| # | SOP | Status | Priority |
|---|-----|--------|----------|
| 1 | New Lead Processing | ✅ Written below | P0 — Launch |
| 2 | Consultation Booking | ✅ Written below | P0 — Launch |
| 3 | Patient Intake | ✅ Written below | P0 — Launch |
| 4 | Lab Order & Processing | ✅ Written below | P0 — Launch |
| 5 | Provider Review & Prescription | ✅ Written below | P0 — Launch |
| 6 | Medication Fulfillment | ✅ Written below | P0 — Launch |
| 7 | Patient Onboarding | Framework | P1 — Week 2 |
| 8 | Monthly Check-In | Framework | P1 — Week 3 |
| 9 | Refill Processing | Framework | P1 — Week 3 |
| 10 | Adverse Event Response | Framework | P0 — Launch |
| 11 | Patient Support Escalation | Framework | P1 — Week 2 |
| 12 | Cancellation & Retention | Framework | P1 — Week 3 |
| 13 | Billing & Subscription Mgmt | Framework | P1 — Week 2 |
| 14 | Data Breach Response | Framework | P0 — Launch |
| 15 | Provider Credentialing | Framework | P0 — Launch |
| 16 | Quality Assurance Review | Framework | P2 — Month 2 |
| 17 | Marketing Content Approval | Framework | P1 — Week 2 |
| 18 | Partner Onboarding | Framework | P2 — Week 3 |

---

## SOP 1: New Lead Processing

**Purpose:** Process every inbound lead within seconds and route to appropriate pipeline.
**Trigger:** Form submission on website (booking form, quiz, email capture, popup)
**Owner:** System (automated) + Ops (monitoring)

### Steps

1. **Lead data received** via POST `/api/leads`
   - Validate: email format, required fields present
   - Enrich: IP geolocation, device type, UTM params, referrer, landing page

2. **Multi-channel delivery** (parallel, automated):
   - GHL: Upsert contact with tags (source, medium, campaign, interest, device)
   - n8n: Emit `bloom.lead.captured` event
   - Telegram: Alert ops team (if high-intent signal)
   - Email: Send lead alert to ops email

3. **Qualifier Agent scoring** (automated via n8n):
   - Agent receives lead data
   - Scores 1-100 based on ICP fit
   - Assigns segment: HOT (80-100), WARM (50-79), COLD (0-49)
   - Updates GHL pipeline stage

4. **Route by segment:**
   - HOT → Fast-track email + priority booking CTA + ops follow-up task
   - WARM → Welcome email sequence (5 emails over 14 days)
   - COLD → Educational nurture sequence

5. **Ops monitoring:**
   - Check lead dashboard daily for stuck leads
   - Follow up manually on any HOT lead not booked within 48 hours

**Tools:** Next.js API, GHL, n8n, Telegram, SendGrid, Qualifier Agent
**Compliance:** Lead data is PII (not PHI). Store in GHL and Supabase. No medical data at this stage.

---

## SOP 2: Consultation Booking

**Purpose:** Convert qualified lead into paid consultation booking.
**Trigger:** Patient clicks "Book Consultation" and submits booking form
**Owner:** System (automated) + Ops (exception handling)

### Steps

1. **Patient submits booking form** (firstName, lastName, email, phone, serviceInterest)

2. **Stripe checkout session created:**
   - Product: Consultation ($49)
   - Success URL: `/book?session={session_id}`
   - Cancel URL: `/book`

3. **Payment processed:**
   - Stripe webhook confirms payment
   - GHL contact updated: tag `consultation-paid`, pipeline → "Booked"
   - Confirmation email sent (booking details + intake forms link)
   - Confirmation SMS sent

4. **Calendar booking:**
   - Patient directed to Calendly embed to select time slot
   - Calendly webhook confirms booking
   - GHL updated with appointment time
   - 24-hour reminder email + SMS scheduled

5. **Intake forms sent:**
   - Email with link to intake form portal
   - Forms: New Patient Intake, Medical History, Lifestyle & Goals, Service-Specific Intake
   - Reminder at 24hr, 48hr if forms incomplete

6. **Exception handling:**
   - Payment failure → retry message + support contact
   - No calendar booking within 48hr → ops follow-up email/call
   - Intake forms incomplete at appointment time → provider asks during consult

---

## SOP 3: Patient Intake

**Purpose:** Collect complete medical and demographic information before consultation.
**Trigger:** Patient receives intake forms link after booking
**Owner:** Patient (fills forms) + System (automation) + Clinical (review)

### Steps

1. **Patient accesses intake portal** via secure link in confirmation email

2. **Form completion order:**
   a. New Patient Intake (demographics, emergency contact, state verification)
   b. Medical History (medications, allergies, conditions, family history)
   c. Lifestyle & Goals (health goals, symptom severity, expectations)
   d. Service-Specific Intake (TRT, GLP-1, or Peptide-specific screening)
   e. Contraindication Screening (red-flag questions)

3. **Data processing:**
   - All data encrypted (AES-256-GCM for medical fields)
   - Stored in Supabase patient record + forwarded to EHR
   - Contraindication flags auto-detected

4. **Red flag handling:**
   - If any contraindication flagged → alert sent to provider
   - Patient sees: "For your safety, a provider will review your intake before we proceed."
   - Provider reviews within 24 hours
   - If safe to proceed: patient notified, consultation proceeds
   - If not safe: patient notified with referral recommendations, consultation fee refunded

5. **Completion confirmation:**
   - Patient receives "Intake Complete" email
   - Provider receives intake summary before consultation
   - GHL pipeline updated: "Intake Complete"

**Compliance:** All medical data is PHI. Encrypted at rest and in transit. Access logged.

---

## SOP 4: Lab Order & Processing

**Purpose:** Order, track, and process lab results for treatment planning.
**Trigger:** Provider orders labs during or after consultation
**Owner:** Provider (order) + Patient (draw) + Lab Partner (process) + System (track)

### Steps

1. **Provider orders lab panel** based on treatment track:
   - TRT Panel: Total T, Free T, Estradiol, PSA, Hematocrit, Hemoglobin, SHBG, LH, FSH, Lipids, CMP, Liver Function, Thyroid (TSH, Free T3, T4), CBC
   - GLP-1 Panel: Glucose, Insulin, HbA1c, Lipids, CMP, Liver Function, Kidney Function, Thyroid, CBC
   - Lab order placed in EHR (Cerbo)

2. **Patient receives lab instructions:**
   - Email with: requisition PDF, fasting instructions (12 hours, water only), Quest/Labcorp locator link, what to bring (photo ID)
   - SMS reminder: "Your labs are ready — visit any Quest/Labcorp location. No appointment needed."

3. **Patient completes blood draw** at walk-in lab location

4. **Results returned** (1-3 business days):
   - Electronic results received by EHR
   - System flags any values outside reference ranges
   - Dashboard alert created for out-of-range values
   - CRITICAL values (severe abnormalities) → immediate provider alert

5. **Provider reviews results:**
   - Provider opens lab review in EHR
   - Reviews all markers against clinical criteria
   - Documents assessment and treatment plan
   - If additional labs needed → back to step 1

6. **Patient notified:**
   - Email: "Your lab results are in — your provider has reviewed them"
   - Portal: Full lab results available with provider notes
   - If concerning results: provider contacts patient directly within 24 hours

7. **Tracking:**
   - Dashboard shows: labs ordered, pending, received, reviewed
   - Overdue labs (>7 days) → auto-reminder to patient
   - All lab orders and results logged in audit trail

---

## SOP 5: Provider Review & Prescription

**Purpose:** Convert completed intake + lab results into a treatment plan and prescription.
**Trigger:** Lab results received and intake complete
**Owner:** Provider (clinical decisions) + System (workflow)

### Steps

1. **Case lands in Provider Review Queue:**
   - Dashboard shows: patient name, treatment track, intake summary, lab summary, any red flags
   - Priority sorted by: wait time, red flags, service tier

2. **Provider reviews:**
   - Full intake summary (symptoms, history, goals, medications)
   - Complete lab panel with flagged values
   - Contraindication screening results
   - Previous treatment history (if any)

3. **Clinical decision:**
   - **Approve for treatment:** Select protocol from clinical templates
     - TRT: Testosterone cypionate [dose] mg/week, injection frequency, adjunct medications if needed
     - GLP-1: Semaglutide starting dose, titration schedule
     - Peptides: Protocol selection based on goals
   - **Request more information:** Send patient additional questions or request follow-up labs
   - **Refer out:** If contraindicated or outside scope, provide referral recommendation and refund consultation fee

4. **Prescription sent:**
   - E-prescription via EHR to pharmacy partner (EPCS for testosterone)
   - Prescription details logged in patient chart
   - Patient notified: "Your treatment plan is ready — medication is being prepared"

5. **Subscription activated:**
   - Stripe subscription started (or converted from consultation to treatment tier)
   - Patient selects Standard vs Premium (or Core vs Complete for GLP-1)
   - GHL pipeline updated: "Treatment Started"

6. **Documentation:**
   - Provider documents treatment rationale in EHR
   - Consent verified (medication acknowledgement, controlled substance acknowledgement for TRT)
   - Audit log entry created

---

## SOP 6: Medication Fulfillment

**Purpose:** Ensure prescribed medication reaches patient safely and on time.
**Trigger:** Provider sends e-prescription to pharmacy
**Owner:** Pharmacy Partner + System (tracking) + Ops (exceptions)

### Steps

1. **Prescription received by pharmacy:**
   - Pharmacy verifies: DEA number, provider license, patient info, medication, dose
   - Pharmacy checks: drug interactions, allergies (from patient profile)

2. **Medication prepared:**
   - Compounding pharmacy prepares custom formulation (for compounded meds)
   - Or: retail pharmacy fills brand-name prescription
   - Quality checks completed per pharmacy standards

3. **Shipment:**
   - Medication shipped via tracked carrier (USPS Priority, FedEx, or UPS)
   - Cold chain maintained if temperature-sensitive
   - Tracking number generated

4. **Patient notified:**
   - Email: "Your medication has shipped" with tracking number and expected delivery
   - SMS: "Your medication is on the way — tracking: {trackingLink}"

5. **Delivery confirmed:**
   - Tracking shows delivered
   - 24 hours after delivery: Email "Your medication has arrived — here's how to get started"
   - Include: administration instructions, storage instructions, when to contact provider

6. **Exception handling:**
   - Delivery failed → ops contacts patient for address update, reshipping
   - Pharmacy out of stock → ops contacts patient with timeline, considers backup pharmacy
   - Patient reports damaged shipment → replacement shipped, incident logged

7. **Tracking:**
   - Dashboard shows: prescribed, preparing, shipped, delivered
   - Average fulfillment time tracked (target: 2-5 business days)
   - All shipments logged in patient record

**Compliance:** Medication shipment must comply with state and federal shipping regulations. Controlled substances (testosterone) have additional requirements per DEA.
