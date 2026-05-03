import { z } from 'zod'

// ── Shared schemas ──────────────────────────────────────────

export const personalInfoSchema = z.object({
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  state: z.string().min(1, 'State is required'),
  biologicalSex: z.enum(['male', 'female'], { required_error: 'Required' }),
  heightFeet: z.string().min(1, 'Required'),
  heightInches: z.string().min(1, 'Required'),
  weight: z.string().min(1, 'Weight is required'),
})

export const lifestyleSchema = z.object({
  exerciseFrequency: z.string().min(1, 'Required'),
  sleepHours: z.string().min(1, 'Required'),
  sleepQuality: z.string().min(1, 'Required'),
  alcoholUse: z.string().min(1, 'Required'),
  tobaccoUse: z.string().min(1, 'Required'),
  dietDescription: z.string().min(1, 'Required'),
})

export const goalsSchema = z.object({
  primaryGoals: z.array(z.string()).min(1, 'Select at least one goal'),
  expectations: z.string().optional(),
  timelineExpectation: z.string().min(1, 'Required'),
})

export const consentSchema = z.object({
  risksAcknowledged: z.literal(true, { errorMap: () => ({ message: 'You must acknowledge the risks' }) }),
  treatmentConsent: z.literal(true, { errorMap: () => ({ message: 'Consent is required' }) }),
  teleheathConsent: z.literal(true, { errorMap: () => ({ message: 'Consent is required' }) }),
  signatureName: z.string().min(2, 'Full legal name is required'),
  signatureDate: z.string().min(1, 'Date is required'),
})

// ── TRT-specific schemas ────────────────────────────────────

export const trtSymptomSchema = z.object({
  fatigue: z.string().min(1, 'Required'),
  libido: z.string().min(1, 'Required'),
  moodChanges: z.string().min(1, 'Required'),
  sleepIssues: z.string().min(1, 'Required'),
  bodyComposition: z.string().min(1, 'Required'),
  brainFog: z.string().min(1, 'Required'),
  recoveryTime: z.string().min(1, 'Required'),
  morningErections: z.string().min(1, 'Required'),
})

export const trtMedicalHistorySchema = z.object({
  currentMedications: z.string(),
  allergies: z.string(),
  priorDiagnoses: z.array(z.string()),
  otherDiagnosis: z.string().optional(),
  priorSurgeries: z.string(),
})

export const trtHormoneHistorySchema = z.object({
  priorTRTUse: z.string().min(1, 'Required'),
  priorTRTDetails: z.string().optional(),
  recentBloodwork: z.string().min(1, 'Required'),
  knownTestosteroneLevel: z.string().optional(),
  lastLabDate: z.string().optional(),
})

// ── GLP-1-specific schemas ──────────────────────────────────

export const glp1WeightHistorySchema = z.object({
  currentWeight: z.string().min(1, 'Required'),
  goalWeight: z.string().min(1, 'Required'),
  highestWeight: z.string().min(1, 'Required'),
  durationAtCurrentWeight: z.string().min(1, 'Required'),
  priorWeightLossAttempts: z.array(z.string()),
  priorAttemptDetails: z.string().optional(),
})

export const glp1MedicalSchema = z.object({
  diabetesStatus: z.string().min(1, 'Required'),
  diabetesType: z.string().optional(),
  thyroidConditions: z.string().min(1, 'Required'),
  cardiovascularHistory: z.string().min(1, 'Required'),
  gallbladderIssues: z.string().min(1, 'Required'),
  pancreatitisHistory: z.string().min(1, 'Required'),
  eatingDisorders: z.string().min(1, 'Required'),
  kidneyDisease: z.string().min(1, 'Required'),
  familyThyroidCancer: z.string().min(1, 'Required'),
  familyMEN2: z.string().min(1, 'Required'),
})

export const glp1MedicationSchema = z.object({
  currentMedications: z.string(),
  diabetesMedications: z.string(),
  priorGLP1Use: z.string().min(1, 'Required'),
  priorGLP1Which: z.string().optional(),
  priorGLP1Dosage: z.string().optional(),
  priorGLP1Duration: z.string().optional(),
  priorGLP1StopReason: z.string().optional(),
  priorGLP1SideEffects: z.string().optional(),
})

// ── Step validation maps ────────────────────────────────────

export const TRT_STEP_SCHEMAS = [
  personalInfoSchema,
  trtSymptomSchema,
  trtMedicalHistorySchema,
  trtHormoneHistorySchema,
  lifestyleSchema,
  goalsSchema,
  consentSchema,
]

export const GLP1_STEP_SCHEMAS = [
  personalInfoSchema,
  glp1WeightHistorySchema,
  glp1MedicalSchema,
  glp1MedicationSchema,
  lifestyleSchema,
  goalsSchema,
  consentSchema,
]
