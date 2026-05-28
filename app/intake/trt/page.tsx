'use client'

import { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AlertTriangle } from 'lucide-react'
import StateGate from '@/components/StateGate'
import TCPAConsent, { type ConsentState, isConsentValid } from '@/components/TCPAConsent'
import { CURRENT_CONSENT_VERSION } from '@/lib/consent-text'
import IntakeWizard, {
  Field, TextInput, TextArea, Select, RadioGroup, CheckboxGroup, ScaleSelector, Checkbox,
  type StepConfig,
} from '@/components/intake/IntakeWizard'

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia',
  'Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland',
  'Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey',
  'New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina',
  'South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming',
].map((s) => ({ value: s, label: s }))

const symptomScale = ['None', 'Mild', 'Moderate', 'Severe']

const trtSteps: StepConfig[] = [
  // Step 1 — Personal Info
  {
    title: 'Personal Information',
    subtitle: 'Basic information for your medical evaluation.',
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

        <Field label="Phone Number" error={errors.phone}>
          <TextInput type="tel" value={data.phone as string} onChange={(v) => update('phone', v)} placeholder="(555) 555-1234" />
        </Field>

        <TCPAConsent
          formId="intake_trt"
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

  // Step 2 — Symptom Assessment
  {
    title: 'Symptom Assessment',
    subtitle: 'Rate each symptom over the past 3 months. This helps your physician understand your baseline.',
    requiredFields: ['fatigue', 'libido', 'moodChanges', 'sleepIssues', 'bodyComposition', 'brainFog', 'recoveryTime', 'morningErections'],
    content: ({ data, update }) => (
      <div className="space-y-6">
        {[
          { key: 'fatigue', label: 'Fatigue / Low Energy' },
          { key: 'libido', label: 'Decreased Libido / Sexual Function' },
          { key: 'moodChanges', label: 'Mood Changes / Irritability' },
          { key: 'sleepIssues', label: 'Sleep Difficulties' },
          { key: 'bodyComposition', label: 'Body Composition Changes (fat gain, muscle loss)' },
          { key: 'brainFog', label: 'Brain Fog / Poor Concentration' },
          { key: 'recoveryTime', label: 'Slow Recovery from Exercise' },
          { key: 'morningErections', label: 'Reduced Morning Erections' },
        ].map((symptom) => (
          <Field key={symptom.key} label={symptom.label}>
            <ScaleSelector value={data[symptom.key] as string} onChange={(v) => update(symptom.key, v)} labels={symptomScale} />
          </Field>
        ))}
      </div>
    ),
  },

  // Step 3 — Medical History
  {
    title: 'Medical History',
    subtitle: 'Current medications, allergies, and prior diagnoses.',
    requiredFields: ['currentMedications', 'allergies'],
    content: ({ data, update }) => (
      <div>
        <Field label="Current Medications (list all, including supplements)">
          <TextArea value={data.currentMedications as string} onChange={(v) => update('currentMedications', v)} placeholder="e.g., Lisinopril 10mg, Vitamin D 5000 IU, Fish Oil..." />
        </Field>
        <Field label="Known Allergies">
          <TextArea value={data.allergies as string} onChange={(v) => update('allergies', v)} placeholder="e.g., Penicillin, Sulfa drugs, or None" rows={2} />
        </Field>
        <Field label="Have you been diagnosed with any of the following?">
          <CheckboxGroup values={data.priorDiagnoses as string[]} onChange={(v) => update('priorDiagnoses', v)} options={[
            { value: 'diabetes', label: 'Diabetes (Type 1 or 2)' },
            { value: 'heart_disease', label: 'Heart Disease / Cardiovascular Issues' },
            { value: 'sleep_apnea', label: 'Sleep Apnea' },
            { value: 'blood_clotting', label: 'Blood Clotting Disorders' },
            { value: 'liver_kidney', label: 'Liver or Kidney Disease' },
            { value: 'prostate', label: 'Prostate Issues (BPH, elevated PSA)' },
            { value: 'depression_anxiety', label: 'Depression or Anxiety' },
            { value: 'cancer', label: 'Cancer (any type)' },
            { value: 'none', label: 'None of the above' },
          ]} />
        </Field>
        <Field label="Prior Surgeries">
          <TextArea value={data.priorSurgeries as string} onChange={(v) => update('priorSurgeries', v)} placeholder="List any prior surgeries and approximate dates, or None" rows={2} />
        </Field>
      </div>
    ),
  },

  // Step 4 — Hormone History & Labs
  {
    title: 'Hormone History & Labs',
    subtitle: 'Prior testosterone use and recent bloodwork.',
    requiredFields: ['priorTRTUse', 'recentBloodwork'],
    content: ({ data, update }) => (
      <div>
        <Field label="Have you previously used testosterone or any hormone therapy?">
          <RadioGroup value={data.priorTRTUse as string} onChange={(v) => update('priorTRTUse', v)} options={[
            { value: 'no', label: 'No, never' },
            { value: 'current', label: 'Yes, I am currently on TRT' },
            { value: 'past', label: 'Yes, in the past' },
          ]} />
        </Field>
        {(data.priorTRTUse === 'current' || data.priorTRTUse === 'past') && (
          <Field label="Please describe (medication, dose, duration, reason for stopping if applicable)">
            <TextArea value={data.priorTRTDetails as string} onChange={(v) => update('priorTRTDetails', v)} placeholder="e.g., Testosterone Cypionate 200mg/week for 6 months..." />
          </Field>
        )}
        <Field label="Do you have recent bloodwork (within the past 6 months)?">
          <RadioGroup value={data.recentBloodwork as string} onChange={(v) => update('recentBloodwork', v)} options={[
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'unsure', label: 'Not sure' },
          ]} />
        </Field>
        {data.recentBloodwork === 'yes' && (
          <>
            <Field label="Total Testosterone Level (ng/dL, if known)">
              <TextInput value={data.knownTestosteroneLevel as string} onChange={(v) => update('knownTestosteroneLevel', v)} placeholder="e.g., 320" />
            </Field>
            <Field label="Approximate Date of Last Labs">
              <TextInput type="date" value={data.lastLabDate as string} onChange={(v) => update('lastLabDate', v)} />
            </Field>
          </>
        )}
      </div>
    ),
  },

  // Step 5 — Lifestyle
  {
    title: 'Lifestyle',
    subtitle: 'Exercise, sleep, and daily habits.',
    requiredFields: ['exerciseFrequency', 'sleepHours', 'sleepQuality', 'alcoholUse', 'tobaccoUse', 'dietDescription'],
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
            { value: 'good', label: 'Good, I feel rested' },
            { value: 'fair', label: 'Fair, occasional issues' },
            { value: 'poor', label: 'Poor, frequently disrupted' },
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
        <Field label="Diet">
          <RadioGroup value={data.dietDescription as string} onChange={(v) => update('dietDescription', v)} options={[
            { value: 'standard', label: 'Standard American diet' },
            { value: 'clean', label: 'Clean / whole foods focused' },
            { value: 'keto', label: 'Keto / low-carb / paleo' },
            { value: 'vegetarian', label: 'Vegetarian / vegan' },
            { value: 'other', label: 'Other' },
          ]} />
        </Field>
      </div>
    ),
  },

  // Step 6 — Goals
  {
    title: 'Goals & Expectations',
    subtitle: 'What are you hoping to achieve with testosterone therapy?',
    requiredFields: ['primaryGoals', 'timelineExpectation'],
    content: ({ data, update }) => (
      <div>
        <Field label="Primary Goals (select all that apply)">
          <CheckboxGroup values={data.primaryGoals as string[]} onChange={(v) => update('primaryGoals', v)} options={[
            { value: 'energy', label: 'Increased energy and vitality' },
            { value: 'libido', label: 'Improved libido and sexual function' },
            { value: 'muscle', label: 'Muscle growth and strength' },
            { value: 'fat_loss', label: 'Fat loss and body composition' },
            { value: 'mood', label: 'Better mood and motivation' },
            { value: 'sleep', label: 'Improved sleep quality' },
            { value: 'cognitive', label: 'Mental clarity and focus' },
            { value: 'recovery', label: 'Faster recovery from exercise' },
          ]} />
        </Field>
        <Field label="Anything else your physician should know about your goals?">
          <TextArea value={data.expectations as string} onChange={(v) => update('expectations', v)} placeholder="Optional, describe your goals or expectations..." rows={3} />
        </Field>
        <Field label="What is your timeline expectation for results?">
          <RadioGroup value={data.timelineExpectation as string} onChange={(v) => update('timelineExpectation', v)} options={[
            { value: 'weeks', label: 'I expect changes within weeks' },
            { value: '1-3months', label: 'I understand it may take 1–3 months' },
            { value: '3-6months', label: 'I understand full optimization takes 3–6 months' },
            { value: 'patient', label: 'I am patient and trust the process' },
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
          <h3 className="text-[14px] text-white font-semibold mb-4">Potential Risks of Testosterone Therapy</h3>
          <ul className="space-y-2 text-[13px] text-[#d8cfbe] leading-relaxed">
            {[
              'Polycythemia (elevated red blood cells), requires regular CBC monitoring',
              'Sleep apnea, may worsen existing obstructive sleep apnea',
              'Fertility impact, exogenous testosterone may suppress sperm production',
              'Prostate considerations, PSA monitoring required; contraindicated with prostate cancer',
              'Cardiovascular risk, ongoing research; your physician will assess individual risk',
              'Mood and behavioral changes, may include mood swings or increased irritability',
              'Skin reactions, acne, oily skin, or injection site reactions',
              'Testicular atrophy, natural testosterone production may decrease',
              'Fluid retention, edema possible, especially at higher doses',
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
              'Increased energy and reduced fatigue',
              'Improved libido and sexual function',
              'Better mood, motivation, and mental clarity',
              'Improved body composition (lean mass, reduced fat)',
              'Enhanced exercise performance and recovery',
              'Improved bone mineral density',
            ].map((benefit) => (
              <li key={benefit} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8a8268] mt-1.5 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-[12px] text-[#8a8268] mb-6 leading-relaxed">
          Individual results vary. Your physician will discuss specific risks and benefits based on your medical history and lab results during your consultation. Not all patients qualify for treatment.
        </p>

        <div className="space-y-4 mb-8">
          <Checkbox
            checked={data.risksAcknowledged === true}
            onChange={(v) => update('risksAcknowledged', v)}
            label="I have read and understand the potential risks and benefits of testosterone replacement therapy listed above."
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

function TRTIntakeContent() {
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
            TRT Intake Form
          </span>
          <h1 className="text-display text-white mb-3" style={{ fontFamily: 'Fraunces, serif', fontWeight: 300 }}>
            Testosterone Therapy Intake
          </h1>
          <p className="text-[15px] text-[#8a8268] font-light">
            Complete this form before your consultation. Your physician will review your responses.
          </p>
        </div>
      </section>

      <section className="bg-[#020202] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <StateGate source="intake_trt">
            <IntakeWizard
              intakeType="trt"
              steps={trtSteps}
              sessionId={sessionId}
              onComplete={handleComplete}
            />
          </StateGate>
        </div>
      </section>
    </>
  )
}

export default function TRTIntakePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020202]" />}>
      <TRTIntakeContent />
    </Suspense>
  )
}
