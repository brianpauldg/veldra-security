# Intake Forms & Consent Stack — Complete Specification

---

## 1. Lead Capture Form

**Location:** Homepage, landing pages, footer
**Purpose:** Capture email for nurture sequence
**Conversion goal:** Enter email pipeline

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| email | email | Yes | Valid email format |
| serviceInterest | select | No | Options: general, trt, glp1, peptides |

**Branching:** None
**Data destination:** POST `/api/leads` → GHL contact upsert
**Automations triggered:** Welcome email sequence (5 emails over 14 days)
**Compliance:** CAN-SPAM compliant, includes unsubscribe mechanism
**UX notes:** Single field visible (email), service interest appears after email entered. Max 2 seconds to complete.

---

## 2. Consultation Booking Form

**Location:** `/book` page
**Purpose:** Collect info for consultation + Stripe checkout
**Conversion goal:** Paid consultation booking

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| firstName | text | Yes | Min 1 char |
| lastName | text | Yes | Min 1 char |
| email | email | Yes | Valid email |
| phone | tel | Yes | Min 7 digits |
| serviceInterest | select | Yes | trt, glp1, peptides, general |

**Branching:** None at this stage
**Data destination:** POST `/api/leads` (lead capture) + POST `/api/checkout` (Stripe session)
**Automations triggered:**
- Lead created in GHL with tags (source, interest, device)
- Telegram alert for high-intent leads
- On payment success: Calendly booking embed appears
- Booking confirmation email + SMS
- 24hr pre-appointment reminder

**Compliance:** Financial consent checkbox required before checkout ("I agree to the Terms of Service and understand the cancellation policy")
**UX notes:** All 5 fields visible at once. Large touch targets on mobile. Auto-format phone number. Clear pricing displayed above form.

---

## 3. New Patient Intake Form

**Location:** Post-booking, sent via email link
**Purpose:** Collect demographic and administrative information
**Conversion goal:** Complete patient record

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| legalFirstName | text | Yes | Min 1 char |
| legalLastName | text | Yes | Min 1 char |
| preferredName | text | No | — |
| dateOfBirth | date | Yes | Must be 18+ years old |
| biologicalSex | select | Yes | Male, Female |
| genderIdentity | select | No | Man, Woman, Non-binary, Prefer not to say |
| streetAddress | text | Yes | — |
| city | text | Yes | — |
| state | select | Yes | US states dropdown |
| zipCode | text | Yes | 5-digit US zip |
| emergencyContactName | text | Yes | — |
| emergencyContactPhone | tel | Yes | — |
| emergencyContactRelation | text | Yes | — |
| insuranceStatus | radio | Yes | "I understand this is a cash-pay service and insurance is not billed" |
| howDidYouHearAboutUs | select | No | Google, Social media, Friend/family, Doctor referral, Ad, Other |
| referralSource | text | No | If "Other" or "Friend" selected |

**Branching:**
- If state is NY, NJ, or MA → display notice: "We are currently expanding to your state. We'll notify you when available." (if those states aren't yet supported)
- If age < 18 → STOP: "Our services are for adults 18 and older."
- If age > 75 → Flag for provider review (higher monitoring needs)

**Data destination:** Patient record in Supabase (encrypted fields) + EHR record creation
**Compliance:** State verification for licensing compliance. Identity attestation checkbox.
**UX notes:** Progressive disclosure — show in 3 sections (Personal, Address, Emergency). Progress bar at top.

---

## 4. Medical History Form

**Location:** Post-booking intake flow (page 2)
**Purpose:** Collect medical background for provider review

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| currentMedications | textarea | Yes | "None" acceptable |
| pastMedications | textarea | No | — |
| allergies | textarea | Yes | "NKDA" or list |
| pastSurgeries | textarea | No | — |
| chronicConditions | multi-select | No | Diabetes, Hypertension, Heart disease, Thyroid disorder, Sleep apnea, Depression/anxiety, Kidney disease, Liver disease, Cancer (current/past), Blood clotting disorder, Autoimmune condition, Other |
| familyHistory | multi-select | No | Heart disease, Diabetes, Cancer, Blood clots, Stroke, Prostate cancer, Breast cancer, Other |
| supplements | textarea | No | — |
| alcoholUse | select | Yes | Never, Occasional (1-3/week), Moderate (4-7/week), Heavy (8+/week) |
| tobaccoUse | select | Yes | Never, Former, Current |
| recreationalDrugUse | select | Yes | Never, Occasional, Regular |
| exerciseFrequency | select | Yes | None, 1-2x/week, 3-4x/week, 5+/week |

**Branching:**
- If "Cancer (current)" selected → RED FLAG: Route to provider review before proceeding
- If "Blood clotting disorder" selected → RED FLAG for TRT patients
- If "Liver disease" or "Kidney disease" selected → RED FLAG: Additional labs required
- If "Heavy" alcohol use → Provider notification

**Data destination:** Encrypted patient record (AES-256-GCM)
**Compliance:** All medical data encrypted at rest. Minimum necessary principle.
**UX notes:** Multi-select chips for conditions. "None of the above" clear option. Tooltips explaining why each question matters.

---

## 5. Lifestyle & Goals Form

**Location:** Post-booking intake flow (page 3)
**Purpose:** Understand patient goals for treatment planning

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| primaryGoals | multi-select | Yes | Increase energy, Improve body composition, Lose weight, Build muscle, Improve mood, Better sleep, Sharpen mental focus, Increase libido, Improve recovery, General wellness optimization |
| energyLevel | slider | Yes | 1-10 |
| sleepQuality | slider | Yes | 1-10 |
| moodStability | slider | Yes | 1-10 |
| libido | slider | Yes | 1-10 (label: "Sex drive") |
| stressLevel | slider | Yes | 1-10 |
| dietDescription | select | Yes | Standard American, Mediterranean, Keto/Low-carb, Vegetarian/Vegan, Intermittent fasting, No specific diet |
| weightGoal | select | No | Lose weight, Gain muscle, Maintain, Not a priority |
| timelineExpectation | select | Yes | 1-3 months, 3-6 months, 6-12 months, No rush |
| previousTreatmentExperience | textarea | No | Any previous experience with TRT, GLP-1, or peptides |
| anythingElse | textarea | No | Open text for provider |

**Data destination:** Patient profile (non-encrypted, used for treatment planning)
**UX notes:** Slider inputs feel interactive and fast. Show summary at end: "Here's what you told us" recap before submission.

---

## 6. TRT-Specific Intake

**Location:** Shown when serviceInterest = "trt" or provider selects TRT track
**Purpose:** TRT-specific clinical screening

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| symptomChecklist | multi-select | Yes | Low energy/fatigue, Low libido, Erectile dysfunction, Mood changes/irritability, Difficulty concentrating, Decreased muscle mass, Increased body fat, Poor sleep, Reduced motivation, Brain fog, Hot flashes, Night sweats |
| symptomDuration | select | Yes | Less than 3 months, 3-6 months, 6-12 months, 1-2 years, 2+ years |
| symptomSeverity | select | Yes | Mild, Moderate, Severe |
| previousTRT | radio | Yes | Yes/No |
| previousTRTDetails | textarea | Conditional | If Yes: what, when, why stopped |
| previousLabResults | file upload | No | Accept PDF, JPG, PNG |
| previousTestosteroneLevel | number | No | ng/dL |
| fertilityPlans | radio | Yes | "Do you plan to have children in the near future?" Yes/No/Unsure |
| prostateHistory | radio | Yes | "Have you ever been diagnosed with prostate cancer or elevated PSA?" Yes/No |

**Branching:**
- If prostateHistory = Yes → **STOP**: "For your safety, we require a urology clearance before starting TRT. We can help coordinate this."
- If age > 50 → Auto-add PSA to lab order
- If fertilityPlans = Yes → Flag for provider (TRT may affect fertility; discuss HCG or alternatives)
- If previousTRT = Yes → Provider reviews prior protocol for context

**Compliance:** Never diagnose. Frame as screening. "This assessment helps your provider create a personalized treatment plan."

---

## 7. GLP-1-Specific Intake

**Location:** Shown when serviceInterest = "glp1"
**Purpose:** GLP-1 eligibility and clinical screening

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| currentWeight | number | Yes | lbs, reasonable range |
| height | number (ft/in) | Yes | — |
| bmiCalculated | auto | — | Auto-calculated, displayed to patient |
| weightLossGoal | number | No | lbs |
| previousWeightLossAttempts | multi-select | No | Diet alone, Exercise alone, Diet + exercise, Weight loss supplements, Prescription medication, Bariatric surgery consideration, Other |
| previousGLP1Use | radio | Yes | Yes/No |
| previousGLP1Details | textarea | Conditional | If Yes: which medication, dose, duration, why stopped |
| metabolicConditions | multi-select | No | Type 2 diabetes, Pre-diabetes, PCOS, Thyroid disorder, Insulin resistance |
| eatingPatterns | select | Yes | Regular meals, Frequent snacking, Binge eating episodes, Emotional eating, Irregular schedule |
| gastroparesisHistory | radio | Yes | "Have you been diagnosed with gastroparesis or severe stomach/digestive issues?" |
| pancreatitisHistory | radio | Yes | "Have you ever had pancreatitis?" |
| thyroidCancerHistory | radio | Yes | "Do you have a personal or family history of medullary thyroid cancer or MEN 2?" |

**Branching:**
- If BMI < 25 → "Based on your BMI, you may not be a candidate for GLP-1 therapy. Your provider will discuss alternatives during your consultation."
- If pancreatitisHistory = Yes → RED FLAG: Provider must review before prescribing
- If thyroidCancerHistory = Yes → **STOP**: "GLP-1 medications carry a boxed warning for medullary thyroid carcinoma. Your provider will discuss this with you."
- If gastroparesisHistory = Yes → RED FLAG: GLP-1 may worsen condition

---

## 8. Peptide Interest Screening

**Location:** Shown when serviceInterest = "peptides"
**Purpose:** Gauge interest areas and basic screening

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| interestAreas | multi-select | Yes | Recovery/healing (BPC-157), Growth hormone optimization (sermorelin, ipamorelin), Longevity/anti-aging, Skin health/collagen, Gut health, Sleep improvement, Cognitive enhancement, Sexual health |
| currentHealthStatus | select | Yes | Excellent, Good, Fair, Poor |
| previousPeptideUse | radio | Yes | Yes/No |
| previousPeptideDetails | textarea | Conditional | If Yes: which peptides, experience |
| expectations | textarea | No | "What are you hoping to achieve?" |

**Branching:** Advisory only — all peptide protocols require provider review and approval.
**Note:** Peptide offerings are subject to regulatory changes. Frame as "wellness protocols" not "treatments."

---

## 9. Contraindication / Red-Flag Screening

**Location:** Embedded within medical history form or as standalone pre-consultation check
**Purpose:** Identify absolute and relative contraindications

| Field | Type | Required |
|-------|------|----------|
| activeCancer | radio | Yes — "Do you currently have active cancer or are undergoing cancer treatment?" |
| uncontrolledHypertension | radio | Yes — "Do you have uncontrolled high blood pressure (consistently above 160/100)?" |
| recentCardiacEvent | radio | Yes — "Have you had a heart attack or stroke in the last 6 months?" |
| severeLiverDisease | radio | Yes — "Have you been diagnosed with severe liver disease or liver failure?" |
| severeKidneyDisease | radio | Yes — "Have you been diagnosed with severe kidney disease requiring dialysis?" |
| bloodClottingDisorder | radio | Yes — "Do you have a blood clotting disorder or history of DVT/PE?" |
| pregnantOrBreastfeeding | radio | Yes — "Are you currently pregnant, breastfeeding, or planning pregnancy in the next 3 months?" |
| psychiatricMedications | radio | Yes — "Are you currently taking lithium, MAOIs, or antipsychotic medications?" |

**Branching:**
- ANY "Yes" answer → **IMMEDIATE FLAG**: Patient sees: "Thank you for sharing this information. For your safety, a provider will review your intake before we proceed. You'll hear from us within 24 hours."
- Multiple "Yes" → Higher priority flag
- Route to provider review queue with specific flag details

---

## 10. Consent Forms by Service

### TRT Track
1. ☐ Telehealth informed consent
2. ☐ Financial consent / payment authorization
3. ☐ Communication consent
4. ☐ Lab consent
5. ☐ Testosterone medication acknowledgement
6. ☐ Controlled substance acknowledgement (Schedule III)
7. ☐ Fertility impact disclosure (TRT may reduce sperm count)

### GLP-1 Track
1. ☐ Telehealth informed consent
2. ☐ Financial consent / payment authorization
3. ☐ Communication consent
4. ☐ Lab consent
5. ☐ GLP-1 medication acknowledgement (including compounded status if applicable)
6. ☐ Injection self-administration consent

### Peptide Track
1. ☐ Telehealth informed consent
2. ☐ Financial consent / payment authorization
3. ☐ Communication consent
4. ☐ Peptide protocol acknowledgement
5. ☐ Off-label/compounded use disclosure

---

## 11. Payment Intake Flow

**Step 1:** Select plan from pricing page or treatment page
**Step 2:** Booking form (5 fields) → POST `/api/leads` + `/api/checkout`
**Step 3:** Stripe Checkout (card details, billing address)
**Step 4:** Success redirect → Calendly booking embed
**Step 5:** Booking confirmation email + intake forms link

---

## 12. Lab Order Workflow

| Step | Action | Owner | Automation |
|------|--------|-------|------------|
| 1 | Provider orders lab panel in EHR | Provider | — |
| 2 | Requisition sent to patient (email + portal) | System | Auto-email with lab instructions |
| 3 | Patient visits Quest/Labcorp location | Patient | — |
| 4 | Results returned to EHR (1-3 business days) | Lab Partner | Webhook notification |
| 5 | Dashboard flags out-of-range values | System | Auto-alert generation |
| 6 | Provider reviews results | Provider | Task created in queue |
| 7 | Patient notified of results and next steps | Provider + System | Email/portal notification |

**Form fields for patient:**
- labLocationPreference: select (Quest, Labcorp, Nearest to me)
- preferredDates: date range (availability for walk-in)
- fastingAcknowledgment: checkbox ("I understand I need to fast for 12 hours before my lab draw")

---

## 13. Follow-Up Form (Monthly Check-In)

| Field | Type | Required |
|-------|------|----------|
| overallWellbeing | slider 1-10 | Yes |
| energyLevel | slider 1-10 | Yes |
| sleepQuality | slider 1-10 | Yes |
| moodStability | slider 1-10 | Yes |
| symptomImprovement | select | Yes — Much better, Somewhat better, Same, Somewhat worse, Much worse |
| sideEffects | multi-select | No — None, Acne, Mood swings, Water retention, Injection site pain, Nausea, Headache, Fatigue, Hair changes, Other |
| sideEffectDetails | textarea | Conditional |
| medicationAdherence | select | Yes — Taking as prescribed, Missed 1-2 doses, Missed several doses, Stopped taking |
| missedDoseReason | textarea | Conditional |
| satisfactionScore | slider 1-10 | Yes |
| questionsForProvider | textarea | No |

**Frequency:** Monthly for first 3 months, then quarterly
**Automation:** If sideEffects reported → route to provider. If satisfaction < 5 → trigger retention workflow.

---

## 14. Refill Request Form

| Field | Type | Required |
|-------|------|----------|
| currentMedication | select | Yes — Pre-populated from patient record |
| dosesRemaining | select | Yes — 0, 1-3, 4-7, 7+ |
| sideEffectsSinceLastRefill | radio | Yes — Yes/No |
| sideEffectDetails | textarea | Conditional |
| shippingAddressConfirm | radio | Yes — Same address / Update address |
| newAddress | address fields | Conditional |

**Automation:** If no side effects → auto-approve, forward to pharmacy. If side effects → route to provider first.

---

## 15. Support / Escalation Form

| Field | Type | Required |
|-------|------|----------|
| issueType | select | Yes — Billing, Clinical question, Technical issue, Medication concern, Side effect, General |
| urgency | select | Yes — Routine, Urgent, Emergency |
| description | textarea | Yes |
| preferredContactMethod | select | No — Email, Phone, In-app message |

**Branching:**
- Emergency → Immediate display: "If you are experiencing a medical emergency, call 911 or go to your nearest emergency room." Form still submitted for follow-up.
- Clinical urgent + side effect → Page on-call provider
- Billing → Support queue (SLA: 24 hours)

---

## 16. Cancellation / Pause Request

| Field | Type | Required |
|-------|------|----------|
| action | radio | Yes — Pause subscription, Cancel subscription |
| pauseDuration | select | Conditional — 1 month, 2 months, 3 months |
| reason | multi-select | Yes — Cost, Side effects, Not seeing results, Found another provider, No longer need treatment, Moving, Other |
| feedback | textarea | No |
| wouldReconsider | radio | No — "Would you reconsider with a different treatment plan or adjusted pricing?" Yes/No/Maybe |

**Automation:**
- If reason includes "Side effects" → Route to provider for clinical review
- If reason includes "Cost" → Offer pause or discounted rate (one-time retention offer)
- If reason includes "Not seeing results" → Offer provider review of protocol
- If action = "Cancel" → Confirmation email + retain data per retention policy
- All cancellation reasons logged for product improvement

**UX notes:** No friction traps. Make it easy to cancel. One click to confirm. This builds trust and reduces chargebacks.
