'use client'

import { Suspense, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AlertTriangle } from 'lucide-react'
import StateGate from '@/components/StateGate'
import TCPAConsent, { type ConsentState, isConsentValid } from '@/components/TCPAConsent'
import { CURRENT_CONSENT_VERSION } from '@/lib/consent-text'
import IntakeWizard, {
  Field, TextInput, TextArea, Select, RadioGroup, CheckboxGroup, Checkbox,
  type StepConfig,
} from '@/components/intake/IntakeWizard'

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia',
  'Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland',
  'Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey',
  'New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina',
  'South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming',
].map((s) => ({ value: s, label: s }))

function BMIDisplay({ heightFeet, heightInches, weight }: { heightFeet: string; heightInches: string; weight: string }) {
  const bmi = useMemo(() => {
    const ft = parseInt(heightFeet || '0')
    const inches = parseInt(heightInches || '0')
    const lbs = parseFloat(weight || '0')
    if (!ft || !lbs) return null
    const totalInches = ft * 12 + inches
    return ((lbs / (totalInches * totalInches)) * 703).toFixed(1)
  }, [heightFeet, heightInches, weight])

  if (!bmi || isNaN(parseFloat(bmi))) return null

  const num = parseFloat(bmi)
  const category = num < 18.5 ? 'Underweight' : num < 25 ? 'Normal' : num < 30 ? 'Overweight' : 'Obese'
  const color = num >= 27 ? 'text-[#d8cfbe]' : 'text-[#8a8268]'

  return (
    <div className="rounded-xl border border-[#1a1814] bg-[#0d0c0a] p-4 mt-4">
      <span className="text-[12px] text-[#8a8268] uppercase tracking-wider">Calculated BMI</span>
      <div className="flex items-baseline gap-2 mt-1">
        <span className={`text-[24px] font-light ${color}`} style={{ fontFamily: 'Fraunces, serif' }}>{bmi}</span>
        <span className="text-[13px] text-[#8a8268]">({category})</span>
      </div>
      {num >= 27 && (
        <p className="text-[11px] text-[#8a8268] mt-1">BMI of 27+ with comorbidities or 30+ may qualify for GLP-1 therapy.</p>
      )}
    </div>
  )
}

const glp1Steps: StepConfig[] = [
  // Step 1 — Personal Info + BMI
  {
    title: 'Personal Information',
    subtitle: 'Basic information and BMI calculation for your evaluation.',
    requiredFields: ['dateOfBirth', 'state', 'biologicalSex', 'heightFeet', 'heightInches', 'weight', 'phone', 'smsConsent'],
    content: ({ data, update, errors }) => (
      <div>
        <Field label="Date of Birth">
          <TextInput type="date" value={data.dateOfBirth as string} onChange={(v) => update('dateOfBirth', v)} />
        </Field>
        <Field label="State of Residence">
          <Select value={data.state as string} onChange={(v) => update('state', v)} options={US_STATES} placeholder="Select your state" />
        </Field>
        <Field label="Biological Sex">
          <RadioGroup value={data.biologicalSex as string} onChange={(v) => update('biologicalSex', v)} options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ]} />
        </Field>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Height (ft)">
            <Select value={data.heightFeet as string} onChange={(v) => update('heightFeet', v)} options={
              ['4','5','6','7'].map((v) => ({ value: v, label: `${v}'` }))
            } placeholder="Ft" />
          </Field>
          <Field label="Height (in)">
            <Select value={data.heightInches as string} onChange={(v) => update('heightInches', v)} options={
              Array.from({ length: 12 }, (_, i) => ({ value: String(i), label: `${i}"` }))
            } placeholder="In" />
          </Field>
          <Field label="Weight (lbs)">
            <TextInput type="number" value={data.weight as string} onChange={(v) => update('weight', v)} placeholder="lbs" />
          </Field>
        </div>
        <BMIDisplay heightFeet={data.heightFeet as string} heightInches={data.heightInches as string} weight={data.weight as string} />

        <Field label="Phone Number" error={errors.phone}>
          <TextInput type="tel" value={data.phone as string} onChange={(v) => update('phone', v)} placeholder="(555) 555-1234" />
        </Field>

        <TCPAConsent
          formId="intake_glp1"
          requiresSMS
          requiresEmail
          onChange={(consent: ConsentState) => {
            update('_consentState', consent)
            update('smsConsent', consent.sms)
            update('emailConsent', consent.email)
            update('consentVersion', consent.version)
          }}
        />
        {errors.smsConsent && (
          <p className="text-[12px] text-red-400 mt-1">{errors.smsConsent}</p>
        )}
      </div>
    ),
  },

  // Step 2 — Weight History
  {
    title: 'Weight History',
    subtitle: 'Your weight journey and prior weight loss efforts.',
    requiredFields: ['currentWeight', 'goalWeight', 'highestWeight', 'durationAtCurrentWeight'],
    content: ({ data, update }) => (
      <div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Current Weight (lbs)">
            <TextInput type="number" value={data.currentWeight as string} onChange={(v) => update('currentWeight', v)} placeholder="lbs" />
          </Field>
          <Field label="Goal Weight (lbs)">
            <TextInput type="number" value={data.goalWeight as string} onChange={(v) => update('goalWeight', v)} placeholder="lbs" />
          </Field>
        </div>
        <Field label="Highest Adult Weight (lbs)">
          <TextInput type="number" value={data.highestWeight as string} onChange={(v) => update('highestWeight', v)} placeholder="lbs" />
        </Field>
        <Field label="How long have you been at or near your current weight?">
          <RadioGroup value={data.durationAtCurrentWeight as string} onChange={(v) => update('durationAtCurrentWeight', v)} options={[
            { value: '<6months', label: 'Less than 6 months' },
            { value: '6-12months', label: '6–12 months' },
            { value: '1-3years', label: '1–3 years' },
            { value: '3+years', label: '3+ years' },
          ]} />
        </Field>
        <Field label="Prior Weight Loss Attempts (select all that apply)">
          <CheckboxGroup values={data.priorWeightLossAttempts as string[]} onChange={(v) => update('priorWeightLossAttempts', v)} options={[
            { value: 'diet', label: 'Diet alone (calorie restriction, meal plans)' },
            { value: 'exercise', label: 'Exercise programs' },
            { value: 'rx_meds', label: 'Prescription weight loss medications' },
            { value: 'otc', label: 'OTC supplements or diet pills' },
            { value: 'surgical', label: 'Bariatric surgery' },
            { value: 'coaching', label: 'Nutrition coaching or programs (Noom, WW, etc.)' },
            { value: 'none', label: 'No significant prior attempts' },
          ]} />
        </Field>
        {(data.priorWeightLossAttempts as string[] || []).length > 0 && !(data.priorWeightLossAttempts as string[]).includes('none') && (
          <Field label="Briefly describe what you tried and why it didn't work">
            <TextArea value={data.priorAttemptDetails as string} onChange={(v) => update('priorAttemptDetails', v)} placeholder="e.g., Lost 20 lbs on keto but regained it within a year..." />
          </Field>
        )}
      </div>
    ),
  },

  // Step 3 — Medical History (GLP-1 specific)
  {
    title: 'Medical History',
    subtitle: 'Conditions relevant to GLP-1 / GIP eligibility and safety.',
    requiredFields: ['diabetesStatus', 'thyroidConditions', 'cardiovascularHistory', 'gallbladderIssues', 'pancreatitisHistory', 'eatingDisorders', 'kidneyDisease', 'familyThyroidCancer', 'familyMEN2'],
    content: ({ data, update }) => (
      <div>
        <Field label="Diabetes Status">
          <RadioGroup value={data.diabetesStatus as string} onChange={(v) => update('diabetesStatus', v)} options={[
            { value: 'none', label: 'No diabetes or pre-diabetes' },
            { value: 'prediabetes', label: 'Pre-diabetes' },
            { value: 'type2', label: 'Type 2 Diabetes' },
            { value: 'type1', label: 'Type 1 Diabetes' },
          ]} />
        </Field>
        <Field label="Thyroid Conditions">
          <RadioGroup value={data.thyroidConditions as string} onChange={(v) => update('thyroidConditions', v)} options={[
            { value: 'none', label: 'No thyroid conditions' },
            { value: 'hypothyroid', label: 'Hypothyroidism' },
            { value: 'hyperthyroid', label: 'Hyperthyroidism' },
            { value: 'thyroid_nodules', label: 'Thyroid nodules or goiter' },
            { value: 'thyroid_cancer', label: 'History of thyroid cancer' },
          ]} />
        </Field>
        <Field label="Cardiovascular History">
          <RadioGroup value={data.cardiovascularHistory as string} onChange={(v) => update('cardiovascularHistory', v)} options={[
            { value: 'none', label: 'No cardiovascular issues' },
            { value: 'hypertension', label: 'High blood pressure (controlled)' },
            { value: 'heart_disease', label: 'Heart disease or prior cardiac event' },
            { value: 'other', label: 'Other cardiovascular condition' },
          ]} />
        </Field>
        <Field label="History of Gallbladder Problems">
          <RadioGroup value={data.gallbladderIssues as string} onChange={(v) => update('gallbladderIssues', v)} options={[
            { value: 'no', label: 'No' },
            { value: 'gallstones', label: 'Yes — gallstones' },
            { value: 'removed', label: 'Gallbladder removed' },
          ]} />
        </Field>
        <Field label="History of Pancreatitis">
          <RadioGroup value={data.pancreatitisHistory as string} onChange={(v) => update('pancreatitisHistory', v)} options={[
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ]} />
        </Field>
        <Field label="History of Eating Disorders">
          <RadioGroup value={data.eatingDisorders as string} onChange={(v) => update('eatingDisorders', v)} options={[
            { value: 'no', label: 'No' },
            { value: 'past', label: 'Yes, in the past' },
            { value: 'current', label: 'Yes, currently managing' },
          ]} />
        </Field>
        <Field label="Kidney Disease">
          <RadioGroup value={data.kidneyDisease as string} onChange={(v) => update('kidneyDisease', v)} options={[
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
          ]} />
        </Field>
        <Field label="Family History of Medullary Thyroid Cancer">
          <RadioGroup value={data.familyThyroidCancer as string} onChange={(v) => update('familyThyroidCancer', v)} options={[
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
            { value: 'unsure', label: 'Not sure' },
          ]} />
        </Field>
        {data.familyThyroidCancer === 'yes' && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 mb-5">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-[13px] text-red-300 leading-relaxed">
                GLP-1 receptor agonists carry an FDA boxed warning regarding thyroid C-cell tumors. A family history of medullary thyroid carcinoma may be a contraindication. Your physician will discuss this with you during your consultation.
              </p>
            </div>
          </div>
        )}
        <Field label="Family History of MEN2 Syndrome (Multiple Endocrine Neoplasia Type 2)">
          <RadioGroup value={data.familyMEN2 as string} onChange={(v) => update('familyMEN2', v)} options={[
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' },
            { value: 'unsure', label: 'Not sure' },
          ]} />
        </Field>
        {data.familyMEN2 === 'yes' && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 mb-5">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-[13px] text-red-300 leading-relaxed">
                MEN2 syndrome is a contraindication for GLP-1 receptor agonist therapy. Your physician will review this during your consultation and determine if alternative treatments are appropriate.
              </p>
            </div>
          </div>
        )}
      </div>
    ),
  },

  // Step 4 — Medications & Prior GLP-1 Use
  {
    title: 'Medications & Prior GLP-1 Use',
    subtitle: 'Current medications and any prior experience with GLP-1 or weight loss medications.',
    requiredFields: ['currentMedications', 'priorGLP1Use'],
    content: ({ data, update }) => (
      <div>
        <Field label="Current Medications (list all, including supplements)">
          <TextArea value={data.currentMedications as string} onChange={(v) => update('currentMedications', v)} placeholder="e.g., Metformin 500mg, Lisinopril 10mg, Vitamin D..." />
        </Field>
        <Field label="Diabetes Medications or Insulin (if applicable)">
          <TextArea value={data.diabetesMedications as string} onChange={(v) => update('diabetesMedications', v)} placeholder="List any diabetes medications, insulin types, and doses — or type None" rows={2} />
        </Field>
        <Field label="Have you previously used a GLP-1 or GIP medication?">
          <RadioGroup value={data.priorGLP1Use as string} onChange={(v) => update('priorGLP1Use', v)} options={[
            { value: 'no', label: 'No, never' },
            { value: 'current', label: 'Yes, I am currently on one' },
            { value: 'past', label: 'Yes, in the past' },
          ]} />
        </Field>
        {(data.priorGLP1Use === 'current' || data.priorGLP1Use === 'past') && (
          <>
            <Field label="Which medication?">
              <CheckboxGroup values={data.priorGLP1Which as string[] || []} onChange={(v) => update('priorGLP1Which', v)} options={[
                { value: 'semaglutide', label: 'Semaglutide (Ozempic / Wegovy)' },
                { value: 'tirzepatide', label: 'Tirzepatide (Mounjaro / Zepbound)' },
                { value: 'liraglutide', label: 'Liraglutide (Saxenda / Victoza)' },
                { value: 'compounded', label: 'Compounded semaglutide or tirzepatide' },
                { value: 'other', label: 'Other' },
              ]} />
            </Field>
            <Field label="Highest Dose Reached">
              <TextInput value={data.priorGLP1Dosage as string} onChange={(v) => update('priorGLP1Dosage', v)} placeholder="e.g., 1.0mg semaglutide" />
            </Field>
            <Field label="Duration of Use">
              <TextInput value={data.priorGLP1Duration as string} onChange={(v) => update('priorGLP1Duration', v)} placeholder="e.g., 6 months" />
            </Field>
            {data.priorGLP1Use === 'past' && (
              <Field label="Reason for Stopping">
                <TextArea value={data.priorGLP1StopReason as string} onChange={(v) => update('priorGLP1StopReason', v)} placeholder="e.g., Side effects, cost, lost access..." rows={2} />
              </Field>
            )}
            <Field label="Side Effects Experienced">
              <TextArea value={data.priorGLP1SideEffects as string} onChange={(v) => update('priorGLP1SideEffects', v)} placeholder="e.g., Nausea for the first 2 weeks, or None" rows={2} />
            </Field>
          </>
        )}
      </div>
    ),
  },

  // Step 5 — Lifestyle
  {
    title: 'Lifestyle',
    subtitle: 'Exercise, diet, and daily habits.',
    requiredFields: ['exerciseFrequency', 'sleepHours', 'sleepQuality', 'dietDescription', 'alcoholUse', 'tobaccoUse'],
    content: ({ data, update }) => (
      <div>
        <Field label="Exercise Frequency">
          <RadioGroup value={data.exerciseFrequency as string} onChange={(v) => update('exerciseFrequency', v)} options={[
            { value: '0', label: 'No regular exercise' },
            { value: '1-2', label: '1–2 days per week' },
            { value: '3-4', label: '3–4 days per week' },
            { value: '5+', label: '5+ days per week' },
          ]} />
        </Field>
        <Field label="Average Hours of Sleep Per Night">
          <Select value={data.sleepHours as string} onChange={(v) => update('sleepHours', v)} options={[
            { value: '<5', label: 'Less than 5 hours' },
            { value: '5-6', label: '5–6 hours' },
            { value: '7-8', label: '7–8 hours' },
            { value: '9+', label: '9+ hours' },
          ]} placeholder="Select" />
        </Field>
        <Field label="Sleep Quality">
          <RadioGroup value={data.sleepQuality as string} onChange={(v) => update('sleepQuality', v)} options={[
            { value: 'good', label: 'Good — I feel rested' },
            { value: 'fair', label: 'Fair — occasional issues' },
            { value: 'poor', label: 'Poor — frequently disrupted' },
          ]} />
        </Field>
        <Field label="Describe Your Typical Diet">
          <RadioGroup value={data.dietDescription as string} onChange={(v) => update('dietDescription', v)} options={[
            { value: 'standard', label: 'Standard diet — no specific plan' },
            { value: 'clean', label: 'Clean eating / whole foods focused' },
            { value: 'calorie_counting', label: 'Calorie counting / macro tracking' },
            { value: 'keto', label: 'Keto / low-carb' },
            { value: 'other', label: 'Other' },
          ]} />
        </Field>
        <Field label="Alcohol Consumption">
          <RadioGroup value={data.alcoholUse as string} onChange={(v) => update('alcoholUse', v)} options={[
            { value: 'none', label: 'None' },
            { value: 'occasional', label: 'Occasional (1–3 drinks/week)' },
            { value: 'moderate', label: 'Moderate (4–7 drinks/week)' },
            { value: 'heavy', label: 'Heavy (8+ drinks/week)' },
          ]} />
        </Field>
        <Field label="Tobacco / Nicotine Use">
          <RadioGroup value={data.tobaccoUse as string} onChange={(v) => update('tobaccoUse', v)} options={[
            { value: 'no', label: 'No' },
            { value: 'former', label: 'Former user' },
            { value: 'current', label: 'Current user' },
          ]} />
        </Field>
      </div>
    ),
  },

  // Step 6 — Goals
  {
    title: 'Goals & Expectations',
    subtitle: 'What are you hoping to achieve with GLP-1 / GIP therapy?',
    requiredFields: ['primaryGoals', 'timelineExpectation'],
    content: ({ data, update }) => (
      <div>
        <Field label="Target Weight (lbs)">
          <TextInput type="number" value={data.targetWeight as string} onChange={(v) => update('targetWeight', v)} placeholder="lbs" />
        </Field>
        <Field label="Primary Motivations (select all that apply)">
          <CheckboxGroup values={data.primaryGoals as string[]} onChange={(v) => update('primaryGoals', v)} options={[
            { value: 'health', label: 'Improve overall health markers (A1C, blood pressure, cholesterol)' },
            { value: 'mobility', label: 'Improve mobility and reduce joint pain' },
            { value: 'confidence', label: 'Confidence and quality of life' },
            { value: 'medical', label: 'Manage or reverse a medical condition (pre-diabetes, metabolic syndrome)' },
            { value: 'energy', label: 'More energy and vitality' },
            { value: 'longevity', label: 'Long-term health and longevity' },
            { value: 'fitness', label: 'Support fitness and athletic goals' },
          ]} />
        </Field>
        <Field label="Anything else your physician should know about your goals?">
          <TextArea value={data.expectations as string} onChange={(v) => update('expectations', v)} placeholder="Optional — describe your weight loss goals or expectations..." rows={3} />
        </Field>
        <Field label="What is your timeline expectation for results?">
          <RadioGroup value={data.timelineExpectation as string} onChange={(v) => update('timelineExpectation', v)} options={[
            { value: 'weeks', label: 'I expect changes within weeks' },
            { value: '1-3months', label: 'I understand meaningful loss takes 1–3 months' },
            { value: '6-12months', label: 'I understand reaching my goal may take 6–12 months' },
            { value: 'patient', label: 'I am patient and committed to the process' },
          ]} />
        </Field>
      </div>
    ),
  },

  // Step 7 — Risks, Consent & Signature
  {
    title: 'Risks, Benefits & Consent',
    subtitle: 'Please review the following information carefully before signing.',
    requiredFields: ['risksAcknowledged', 'treatmentConsent', 'teleheathConsent', 'signatureName', 'signatureDate'],
    content: ({ data, update }) => (
      <div>
        <div className="rounded-xl border border-[#1a1814] bg-[#0d0c0a] p-6 mb-6">
          <h3 className="text-[14px] text-white font-semibold mb-4">Potential Risks of GLP-1 / GIP Therapy</h3>
          <ul className="space-y-2 text-[13px] text-[#d8cfbe] leading-relaxed">
            {[
              'Gastrointestinal effects — nausea, vomiting, diarrhea, and constipation are common, especially during dose titration',
              'Pancreatitis risk — rare but serious; seek immediate care for severe abdominal pain',
              'Gallbladder complications — increased risk of gallstones, especially with rapid weight loss',
              'Thyroid C-cell tumors (boxed warning) — observed in animal studies; contraindicated with personal or family history of medullary thyroid carcinoma or MEN2',
              'Injection site reactions — redness, swelling, or itching at the injection site',
              'Hypoglycemia risk — especially if combined with insulin or sulfonylureas',
              'Potential for lean muscle loss — protein intake and exercise are important during treatment',
              'Gastroparesis — delayed gastric emptying may occur',
              'Renal impairment — dehydration from GI side effects may affect kidney function',
            ].map((risk) => (
              <li key={risk} className="flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-[#8a8268] mt-0.5 flex-shrink-0" />
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-[#1a1814] bg-[#0d0c0a] p-6 mb-6">
          <h3 className="text-[14px] text-white font-semibold mb-4">Potential Benefits</h3>
          <ul className="space-y-2 text-[13px] text-[#d8cfbe] leading-relaxed">
            {[
              'Significant weight reduction — patients commonly report 15–20% body weight loss',
              'Improved glycemic control and A1C reduction',
              'Reduced cardiovascular risk factors',
              'Lower blood pressure and improved cholesterol levels',
              'Reduced appetite and food cravings',
              'Improved insulin sensitivity',
              'Potential improvement in non-alcoholic fatty liver disease (NAFLD)',
            ].map((benefit) => (
              <li key={benefit} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8a8268] mt-1.5 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-[12px] text-[#8a8268] mb-6 leading-relaxed">
          Individual results vary. Your physician will discuss specific risks and benefits based on your medical history, current medications, and lab results during your consultation. Not all patients qualify for treatment.
        </p>

        <div className="space-y-4 mb-8">
          <Checkbox
            checked={data.risksAcknowledged === true}
            onChange={(v) => update('risksAcknowledged', v)}
            label="I have read and understand the potential risks and benefits of GLP-1 / GIP receptor agonist therapy listed above."
          />
          <Checkbox
            checked={data.treatmentConsent === true}
            onChange={(v) => update('treatmentConsent', v)}
            label="I consent to evaluation by a licensed physician and understand that treatment eligibility is determined solely by the physician."
          />
          <Checkbox
            checked={data.teleheathConsent === true}
            onChange={(v) => update('teleheathConsent', v)}
            label="I consent to receiving medical care via telehealth and understand the limitations of telemedicine."
          />
        </div>

        <Field label="Full Legal Name (e-signature)">
          <TextInput value={data.signatureName as string} onChange={(v) => update('signatureName', v)} placeholder="Type your full legal name" />
        </Field>
        <Field label="Today's Date">
          <TextInput type="date" value={data.signatureDate as string} onChange={(v) => update('signatureDate', v)} />
        </Field>
      </div>
    ),
  },
]

function GLP1IntakeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session') || 'demo'

  async function handleComplete(data: Record<string, unknown>) {
    await fetch('/api/intake/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sessionId,
        signature_name: data.signatureName,
        signature_date: data.signatureDate,
      }),
    })
    router.push(`/booking?session=${sessionId}`)
  }

  return (
    <>
      <section className="bg-[#020202] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="font-mono text-[10px] text-[#8a8268] tracking-[0.2em] uppercase mb-3 block">
            GLP-1 / GIP Intake Form
          </span>
          <h1 className="text-display text-white mb-3" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300 }}>
            GLP-1 Weight Management Intake
          </h1>
          <p className="text-[15px] text-[#8a8268] font-light">
            Complete this form before your consultation. Your physician will review your responses.
          </p>
        </div>
      </section>

      <section className="bg-[#020202] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <StateGate source="intake_glp1">
            <IntakeWizard
              intakeType="glp1"
              steps={glp1Steps}
              sessionId={sessionId}
              onComplete={handleComplete}
            />
          </StateGate>
        </div>
      </section>
    </>
  )
}

export default function GLP1IntakePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020202]" />}>
      <GLP1IntakeContent />
    </Suspense>
  )
}
