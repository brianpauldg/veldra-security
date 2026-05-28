import type {
  User, Patient, LabResult, Vital, Medication, Encounter,
  SymptomAssessment, Alert, Task, RefillRequest, AgentInsight,
  ProtocolType,
} from './types'
import type { Notification } from './mcp-adapter'

// ── Helper Utilities ─────────────────────────────────────────

function id(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`
}

function daysAgo(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().split('T')[0]
}

function daysFromNow(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d.toISOString().split('T')[0]
}

function randomBetween(min: number, max: number, decimals = 0): number {
  const val = Math.random() * (max - min) + min
  return Number(val.toFixed(decimals))
}

// ── Users ────────────────────────────────────────────────────

export const SEED_USERS: User[] = [
  {
    id: 'usr_admin_001',
    email: 'brian@bloommetabolics.com',
    firstName: 'Brian',
    lastName: 'DeGuzman',
    role: 'super_admin',
    isActive: true,
    createdAt: '2024-01-15',
    lastLoginAt: daysAgo(0),
  },
  {
    id: 'usr_doc_001',
    email: 'dr.test@bloommetabolics.com',
    firstName: 'Dr. Test',
    lastName: 'Physician (SEED DATA)',
    role: 'physician',
    isActive: true,
    createdAt: '2024-02-01',
    lastLoginAt: daysAgo(0),
  },
  {
    id: 'usr_clin_001',
    email: 'sarah.chen@bloommetabolics.com',
    firstName: 'Sarah',
    lastName: 'Chen',
    role: 'clinician',
    isActive: true,
    createdAt: '2024-03-01',
    lastLoginAt: daysAgo(1),
  },
  {
    id: 'usr_rn_001',
    email: 'mike.johnson@bloommetabolics.com',
    firstName: 'Mike',
    lastName: 'Johnson',
    role: 'rn_ma',
    isActive: true,
    createdAt: '2024-03-15',
    lastLoginAt: daysAgo(0),
  },
  {
    id: 'usr_ops_001',
    email: 'lisa.park@bloommetabolics.com',
    firstName: 'Lisa',
    lastName: 'Park',
    role: 'admin_ops',
    isActive: true,
    createdAt: '2024-04-01',
    lastLoginAt: daysAgo(2),
  },
]

// ── Patients ─────────────────────────────────────────────────

const patientData: Omit<Patient, 'id' | 'mrn'>[] = [
  { firstName: 'James', lastName: 'Mitchell', email: 'j.mitchell@email.com', phone: '(512) 555-0101', dateOfBirth: '1985-03-15', gender: 'male', state: 'TX', status: 'active', primaryProtocol: 'trt_standard', adherence: 'excellent', riskScore: 12, assignedPhysicianId: 'usr_doc_001', assignedPhysician: 'Dr. Test (SEED)', enrollmentDate: '2024-06-01', lastVisitDate: daysAgo(14), nextFollowUpDate: daysFromNow(16), lastLabDate: daysAgo(21), nextLabDueDate: daysFromNow(69), activeAlertCount: 0, pendingRefills: 0, tags: ['trt', 'stable'] },
  { firstName: 'Robert', lastName: 'Thompson', email: 'r.thompson@email.com', phone: '(214) 555-0102', dateOfBirth: '1978-07-22', gender: 'male', state: 'TX', status: 'active', primaryProtocol: 'trt_hcg', adherence: 'good', riskScore: 35, assignedPhysicianId: 'usr_doc_001', assignedPhysician: 'Dr. Test (SEED)', enrollmentDate: '2024-04-15', lastVisitDate: daysAgo(45), nextFollowUpDate: daysAgo(5), lastLabDate: daysAgo(60), nextLabDueDate: daysAgo(10), activeAlertCount: 2, pendingRefills: 1, tags: ['trt', 'hcg', 'overdue-labs'] },
  { firstName: 'Michael', lastName: 'Chen', email: 'm.chen@email.com', phone: '(415) 555-0103', dateOfBirth: '1990-11-08', gender: 'male', state: 'CA', status: 'active', primaryProtocol: 'trt_standard', adherence: 'excellent', riskScore: 8, assignedPhysicianId: 'usr_doc_001', assignedPhysician: 'Dr. Test (SEED)', enrollmentDate: '2024-08-01', lastVisitDate: daysAgo(7), nextFollowUpDate: daysFromNow(83), lastLabDate: daysAgo(7), nextLabDueDate: daysFromNow(83), activeAlertCount: 0, pendingRefills: 0, tags: ['trt', 'new-start', 'responding-well'] },
  { firstName: 'David', lastName: 'Williams', email: 'd.williams@email.com', phone: '(305) 555-0104', dateOfBirth: '1972-02-28', gender: 'male', state: 'FL', status: 'active', primaryProtocol: 'trt_standard', adherence: 'fair', riskScore: 62, assignedPhysicianId: 'usr_doc_001', assignedPhysician: 'Dr. Test (SEED)', enrollmentDate: '2024-01-20', lastVisitDate: daysAgo(90), nextFollowUpDate: daysAgo(30), lastLabDate: daysAgo(120), nextLabDueDate: daysAgo(30), activeAlertCount: 4, pendingRefills: 2, tags: ['trt', 'high-risk', 'elevated-hct', 'overdue-followup'] },
  { firstName: 'Christopher', lastName: 'Garcia', email: 'c.garcia@email.com', phone: '(602) 555-0105', dateOfBirth: '1988-09-14', gender: 'male', state: 'AZ', status: 'active', primaryProtocol: 'trt_enclomiphene', adherence: 'good', riskScore: 22, assignedPhysicianId: 'usr_doc_001', assignedPhysician: 'Dr. Test (SEED)', enrollmentDate: '2024-07-01', lastVisitDate: daysAgo(30), nextFollowUpDate: daysFromNow(60), lastLabDate: daysAgo(30), nextLabDueDate: daysFromNow(60), activeAlertCount: 1, pendingRefills: 0, tags: ['trt', 'enclomiphene', 'fertility-concern'] },
  { firstName: 'Andrew', lastName: 'Johnson', email: 'a.johnson@email.com', phone: '(720) 555-0106', dateOfBirth: '1982-05-03', gender: 'male', state: 'CO', status: 'active', primaryProtocol: 'glp1_semaglutide', adherence: 'excellent', riskScore: 15, assignedPhysicianId: 'usr_doc_001', assignedPhysician: 'Dr. Test (SEED)', enrollmentDate: '2024-09-01', lastVisitDate: daysAgo(14), nextFollowUpDate: daysFromNow(14), lastLabDate: daysAgo(30), nextLabDueDate: daysFromNow(60), activeAlertCount: 0, pendingRefills: 0, tags: ['glp1', 'weight-loss', 'good-progress'] },
  { firstName: 'Daniel', lastName: 'Martinez', email: 'd.martinez@email.com', phone: '(469) 555-0107', dateOfBirth: '1975-12-19', gender: 'male', state: 'TX', status: 'active', primaryProtocol: 'trt_standard', adherence: 'poor', riskScore: 78, assignedPhysicianId: 'usr_doc_001', assignedPhysician: 'Dr. Test (SEED)', enrollmentDate: '2024-03-01', lastVisitDate: daysAgo(120), nextFollowUpDate: daysAgo(60), lastLabDate: daysAgo(150), nextLabDueDate: daysAgo(60), activeAlertCount: 5, pendingRefills: 3, tags: ['trt', 'high-risk', 'non-compliant', 'needs-outreach'] },
  { firstName: 'Matthew', lastName: 'Anderson', email: 'm.anderson@email.com', phone: '(312) 555-0108', dateOfBirth: '1993-04-25', gender: 'male', state: 'IL', status: 'active', primaryProtocol: 'trt_standard', adherence: 'excellent', riskScore: 5, assignedPhysicianId: 'usr_doc_001', assignedPhysician: 'Dr. Test (SEED)', enrollmentDate: '2024-05-01', lastVisitDate: daysAgo(10), nextFollowUpDate: daysFromNow(80), lastLabDate: daysAgo(10), nextLabDueDate: daysFromNow(80), activeAlertCount: 0, pendingRefills: 0, tags: ['trt', 'optimal', 'young'] },
  { firstName: 'Kevin', lastName: 'Brown', email: 'k.brown@email.com', phone: '(404) 555-0109', dateOfBirth: '1980-08-11', gender: 'male', state: 'GA', status: 'active', primaryProtocol: 'glp1_tirzepatide', adherence: 'good', riskScore: 28, assignedPhysicianId: 'usr_doc_001', assignedPhysician: 'Dr. Test (SEED)', enrollmentDate: '2024-08-15', lastVisitDate: daysAgo(21), nextFollowUpDate: daysFromNow(7), lastLabDate: daysAgo(45), nextLabDueDate: daysFromNow(45), activeAlertCount: 1, pendingRefills: 1, tags: ['glp1', 'tirzepatide', 'nausea-monitoring'] },
  { firstName: 'Steven', lastName: 'Taylor', email: 's.taylor@email.com', phone: '(615) 555-0110', dateOfBirth: '1970-01-30', gender: 'male', state: 'TN', status: 'active', primaryProtocol: 'trt_standard', adherence: 'good', riskScore: 45, assignedPhysicianId: 'usr_doc_001', assignedPhysician: 'Dr. Test (SEED)', enrollmentDate: '2024-02-15', lastVisitDate: daysAgo(35), nextFollowUpDate: daysAgo(5), lastLabDate: daysAgo(50), nextLabDueDate: daysAgo(10), activeAlertCount: 2, pendingRefills: 0, tags: ['trt', 'psa-watch', 'age-50+'] },
  { firstName: 'Jason', lastName: 'Lee', email: 'j.lee@email.com', phone: '(206) 555-0111', dateOfBirth: '1987-06-07', gender: 'male', state: 'WA', status: 'active', primaryProtocol: 'peptide_bpc157', adherence: 'excellent', riskScore: 10, assignedPhysicianId: 'usr_doc_001', assignedPhysician: 'Dr. Test (SEED)', enrollmentDate: '2024-10-01', lastVisitDate: daysAgo(7), nextFollowUpDate: daysFromNow(21), lastLabDate: daysAgo(14), nextLabDueDate: daysFromNow(76), activeAlertCount: 0, pendingRefills: 0, tags: ['peptide', 'bpc157', 'injury-recovery'] },
  { firstName: 'Brian', lastName: 'Clark', email: 'b.clark@email.com', phone: '(702) 555-0112', dateOfBirth: '1983-10-02', gender: 'male', state: 'NV', status: 'active', primaryProtocol: 'trt_standard', adherence: 'good', riskScore: 30, assignedPhysicianId: 'usr_doc_001', assignedPhysician: 'Dr. Test (SEED)', enrollmentDate: '2024-05-15', lastVisitDate: daysAgo(28), nextFollowUpDate: daysFromNow(2), lastLabDate: daysAgo(40), nextLabDueDate: daysFromNow(50), activeAlertCount: 1, pendingRefills: 1, tags: ['trt', 'e2-management'] },
  { firstName: 'Eric', lastName: 'Rodriguez', email: 'e.rodriguez@email.com', phone: '(480) 555-0113', dateOfBirth: '1991-03-18', gender: 'male', state: 'AZ', status: 'onboarding', primaryProtocol: 'trt_standard', adherence: 'unknown', riskScore: 0, assignedPhysicianId: 'usr_doc_001', assignedPhysician: 'Dr. Test (SEED)', enrollmentDate: daysAgo(3), lastVisitDate: daysAgo(3), nextFollowUpDate: daysFromNow(11), lastLabDate: daysAgo(3), nextLabDueDate: daysFromNow(87), activeAlertCount: 0, pendingRefills: 0, tags: ['onboarding', 'trt'] },
  { firstName: 'Mark', lastName: 'Harris', email: 'm.harris@email.com', phone: '(919) 555-0114', dateOfBirth: '1976-11-25', gender: 'male', state: 'NC', status: 'active', primaryProtocol: 'trt_hcg', adherence: 'fair', riskScore: 50, assignedPhysicianId: 'usr_doc_001', assignedPhysician: 'Dr. Test (SEED)', enrollmentDate: '2024-04-01', lastVisitDate: daysAgo(60), nextFollowUpDate: daysAgo(20), lastLabDate: daysAgo(75), nextLabDueDate: daysAgo(15), activeAlertCount: 3, pendingRefills: 1, tags: ['trt', 'hcg', 'bp-watch', 'overdue'] },
  { firstName: 'Ryan', lastName: 'Jackson', email: 'r.jackson@email.com', phone: '(503) 555-0115', dateOfBirth: '1995-07-12', gender: 'male', state: 'OR', status: 'active', primaryProtocol: 'peptide_cjc_ipamorelin', adherence: 'excellent', riskScore: 7, assignedPhysicianId: 'usr_doc_001', assignedPhysician: 'Dr. Test (SEED)', enrollmentDate: '2024-09-15', lastVisitDate: daysAgo(14), nextFollowUpDate: daysFromNow(76), lastLabDate: daysAgo(14), nextLabDueDate: daysFromNow(76), activeAlertCount: 0, pendingRefills: 0, tags: ['peptide', 'growth-hormone', 'athletic'] },
  { firstName: 'Thomas', lastName: 'White', email: 't.white@email.com', phone: '(813) 555-0116', dateOfBirth: '1968-04-09', gender: 'male', state: 'FL', status: 'active', primaryProtocol: 'trt_standard', adherence: 'good', riskScore: 55, assignedPhysicianId: 'usr_doc_001', assignedPhysician: 'Dr. Test (SEED)', enrollmentDate: '2024-01-10', lastVisitDate: daysAgo(40), nextFollowUpDate: daysAgo(10), lastLabDate: daysAgo(55), nextLabDueDate: daysAgo(5), activeAlertCount: 2, pendingRefills: 0, tags: ['trt', 'psa-elevated', 'age-55+'] },
  { firstName: 'Anthony', lastName: 'Moore', email: 'a.moore@email.com', phone: '(704) 555-0117', dateOfBirth: '1986-09-30', gender: 'male', state: 'NC', status: 'paused', primaryProtocol: 'trt_standard', adherence: 'fair', riskScore: 40, assignedPhysicianId: 'usr_doc_001', assignedPhysician: 'Dr. Test (SEED)', enrollmentDate: '2024-03-15', lastVisitDate: daysAgo(90), nextFollowUpDate: daysAgo(45), lastLabDate: daysAgo(100), nextLabDueDate: daysAgo(30), activeAlertCount: 1, pendingRefills: 0, tags: ['trt', 'paused', 'personal-reasons'] },
  { firstName: 'Joshua', lastName: 'Davis', email: 'j.davis@email.com', phone: '(512) 555-0118', dateOfBirth: '1992-01-14', gender: 'male', state: 'TX', status: 'active', primaryProtocol: 'glp1_semaglutide', adherence: 'good', riskScore: 20, assignedPhysicianId: 'usr_doc_001', assignedPhysician: 'Dr. Test (SEED)', enrollmentDate: '2024-07-15', lastVisitDate: daysAgo(21), nextFollowUpDate: daysFromNow(7), lastLabDate: daysAgo(30), nextLabDueDate: daysFromNow(60), activeAlertCount: 0, pendingRefills: 0, tags: ['glp1', 'metabolic', 'good-progress'] },
  { firstName: 'William', lastName: 'Wilson', email: 'w.wilson@email.com', phone: '(972) 555-0119', dateOfBirth: '1979-08-05', gender: 'male', state: 'TX', status: 'active', primaryProtocol: 'trt_standard', adherence: 'excellent', riskScore: 18, assignedPhysicianId: 'usr_doc_001', assignedPhysician: 'Dr. Test (SEED)', enrollmentDate: '2024-06-15', lastVisitDate: daysAgo(20), nextFollowUpDate: daysFromNow(70), lastLabDate: daysAgo(20), nextLabDueDate: daysFromNow(70), activeAlertCount: 0, pendingRefills: 0, tags: ['trt', 'stable', 'long-term'] },
  { firstName: 'Tyler', lastName: 'Kim', email: 't.kim@email.com', phone: '(310) 555-0120', dateOfBirth: '1994-12-22', gender: 'male', state: 'CA', status: 'active', primaryProtocol: 'trt_enclomiphene', adherence: 'good', riskScore: 25, assignedPhysicianId: 'usr_doc_001', assignedPhysician: 'Dr. Test (SEED)', enrollmentDate: '2024-08-01', lastVisitDate: daysAgo(18), nextFollowUpDate: daysFromNow(12), lastLabDate: daysAgo(18), nextLabDueDate: daysFromNow(72), activeAlertCount: 0, pendingRefills: 0, tags: ['trt', 'enclomiphene', 'young', 'fertility-preservation'] },
  { firstName: 'Nathan', lastName: 'Patel', email: 'n.patel@email.com', phone: '(713) 555-0121', dateOfBirth: '1981-06-17', gender: 'male', state: 'TX', status: 'active', primaryProtocol: 'trt_standard', adherence: 'good', riskScore: 32, assignedPhysicianId: 'usr_doc_001', assignedPhysician: 'Dr. Test (SEED)', enrollmentDate: '2024-05-01', lastVisitDate: daysAgo(25), nextFollowUpDate: daysFromNow(5), lastLabDate: daysAgo(35), nextLabDueDate: daysFromNow(55), activeAlertCount: 1, pendingRefills: 0, tags: ['trt', 'lipid-watch'] },
  { firstName: 'Carlos', lastName: 'Reyes', email: 'c.reyes@email.com', phone: '(210) 555-0122', dateOfBirth: '1989-02-08', gender: 'male', state: 'TX', status: 'active', primaryProtocol: 'trt_standard', adherence: 'excellent', riskScore: 10, assignedPhysicianId: 'usr_doc_001', assignedPhysician: 'Dr. Test (SEED)', enrollmentDate: '2024-07-01', lastVisitDate: daysAgo(12), nextFollowUpDate: daysFromNow(78), lastLabDate: daysAgo(12), nextLabDueDate: daysFromNow(78), activeAlertCount: 0, pendingRefills: 0, tags: ['trt', 'stable', 'athletic'] },
]

export const SEED_PATIENTS: Patient[] = patientData.map((p, i) => ({
  ...p,
  id: `pat_${String(i + 1).padStart(3, '0')}`,
  mrn: `NH-${String(10000 + i + 1)}`,
}))

// ── Lab Results ──────────────────────────────────────────────

function generateLabHistory(patientId: string, protocol: ProtocolType): LabResult[] {
  const labs: LabResult[] = []
  const isTRT = protocol.startsWith('trt')
  const isGLP1 = protocol.startsWith('glp1')
  const timepoints = [daysAgo(180), daysAgo(120), daysAgo(90), daysAgo(60), daysAgo(30), daysAgo(14)]

  for (const date of timepoints) {
    const base: Partial<LabResult> = { patientId, collectedAt: date, reportedAt: date }

    if (isTRT) {
      const tIdx = timepoints.indexOf(date)
      const tProgression = Math.min(tIdx / (timepoints.length - 1), 1) // 0 to 1 over time
      labs.push(
        { ...base, id: id('lab'), marker: 'total_testosterone', value: randomBetween(250 + tProgression * 500, 350 + tProgression * 600), unit: 'ng/dL', referenceMin: 300, referenceMax: 1000, isAbnormal: false } as LabResult,
        { ...base, id: id('lab'), marker: 'free_testosterone', value: randomBetween(6 + tProgression * 12, 8 + tProgression * 18, 1), unit: 'pg/mL', referenceMin: 9, referenceMax: 30, isAbnormal: false } as LabResult,
        { ...base, id: id('lab'), marker: 'estradiol', value: randomBetween(15, 45), unit: 'pg/mL', referenceMin: 10, referenceMax: 40, isAbnormal: false } as LabResult,
        { ...base, id: id('lab'), marker: 'shbg', value: randomBetween(15, 55), unit: 'nmol/L', referenceMin: 10, referenceMax: 57, isAbnormal: false } as LabResult,
        { ...base, id: id('lab'), marker: 'hematocrit', value: randomBetween(42, 53, 1), unit: '%', referenceMin: 38, referenceMax: 52, isAbnormal: false } as LabResult,
        { ...base, id: id('lab'), marker: 'hemoglobin', value: randomBetween(14, 17.5, 1), unit: 'g/dL', referenceMin: 13, referenceMax: 17.5, isAbnormal: false } as LabResult,
        { ...base, id: id('lab'), marker: 'psa', value: randomBetween(0.5, 3.5, 2), unit: 'ng/mL', referenceMin: 0, referenceMax: 4, isAbnormal: false } as LabResult,
        { ...base, id: id('lab'), marker: 'lh', value: randomBetween(0.2, 6, 1), unit: 'mIU/mL', referenceMin: 1.8, referenceMax: 8.6, isAbnormal: false } as LabResult,
        { ...base, id: id('lab'), marker: 'fsh', value: randomBetween(0.5, 8, 1), unit: 'mIU/mL', referenceMin: 1.5, referenceMax: 12.4, isAbnormal: false } as LabResult,
      )
    }

    // Common labs for all
    labs.push(
      { ...base, id: id('lab'), marker: 'alt', value: randomBetween(15, 55), unit: 'U/L', referenceMin: 7, referenceMax: 56, isAbnormal: false } as LabResult,
      { ...base, id: id('lab'), marker: 'ast', value: randomBetween(12, 38), unit: 'U/L', referenceMin: 10, referenceMax: 40, isAbnormal: false } as LabResult,
      { ...base, id: id('lab'), marker: 'total_cholesterol', value: randomBetween(150, 240), unit: 'mg/dL', referenceMin: 0, referenceMax: 200, isAbnormal: false } as LabResult,
      { ...base, id: id('lab'), marker: 'ldl', value: randomBetween(60, 140), unit: 'mg/dL', referenceMin: 0, referenceMax: 100, isAbnormal: false } as LabResult,
      { ...base, id: id('lab'), marker: 'hdl', value: randomBetween(35, 65), unit: 'mg/dL', referenceMin: 40, referenceMax: 100, isAbnormal: false } as LabResult,
      { ...base, id: id('lab'), marker: 'a1c', value: randomBetween(4.5, 6.2, 1), unit: '%', referenceMin: 4.0, referenceMax: 5.6, isAbnormal: false } as LabResult,
      { ...base, id: id('lab'), marker: 'creatinine', value: randomBetween(0.8, 1.2, 2), unit: 'mg/dL', referenceMin: 0.7, referenceMax: 1.3, isAbnormal: false } as LabResult,
      { ...base, id: id('lab'), marker: 'tsh', value: randomBetween(0.8, 3.5, 2), unit: 'mIU/L', referenceMin: 0.4, referenceMax: 4.0, isAbnormal: false } as LabResult,
    )

    if (isGLP1) {
      labs.push(
        { ...base, id: id('lab'), marker: 'fasting_glucose', value: randomBetween(75, 115), unit: 'mg/dL', referenceMin: 70, referenceMax: 100, isAbnormal: false } as LabResult,
        { ...base, id: id('lab'), marker: 'fasting_insulin', value: randomBetween(5, 25, 1), unit: 'uIU/mL', referenceMin: 2.6, referenceMax: 24.9, isAbnormal: false } as LabResult,
        { ...base, id: id('lab'), marker: 'triglycerides', value: randomBetween(80, 200), unit: 'mg/dL', referenceMin: 0, referenceMax: 150, isAbnormal: false } as LabResult,
      )
    }
  }

  // Mark abnormals
  for (const lab of labs) {
    lab.isAbnormal = lab.value < lab.referenceMin || lab.value > lab.referenceMax
  }

  return labs
}

// ── Vitals ───────────────────────────────────────────────────

function generateVitals(patientId: string): Vital[] {
  const vitals: Vital[] = []
  const dates = [daysAgo(180), daysAgo(150), daysAgo(120), daysAgo(90), daysAgo(60), daysAgo(30), daysAgo(14), daysAgo(7)]

  for (const date of dates) {
    vitals.push(
      { id: id('vit'), patientId, type: 'bp_systolic', value: randomBetween(115, 145), unit: 'mmHg', recordedAt: date, source: 'clinic' },
      { id: id('vit'), patientId, type: 'bp_diastolic', value: randomBetween(70, 95), unit: 'mmHg', recordedAt: date, source: 'clinic' },
      { id: id('vit'), patientId, type: 'heart_rate', value: randomBetween(58, 85), unit: 'bpm', recordedAt: date, source: 'clinic' },
      { id: id('vit'), patientId, type: 'weight', value: randomBetween(165, 230), unit: 'lbs', recordedAt: date, source: 'patient' },
      { id: id('vit'), patientId, type: 'body_fat_pct', value: randomBetween(12, 28, 1), unit: '%', recordedAt: date, source: 'patient' },
    )
  }

  return vitals
}

// ── Build all data ───────────────────────────────────────────

export const SEED_LABS: LabResult[] = SEED_PATIENTS.flatMap(p => generateLabHistory(p.id, p.primaryProtocol))
export const SEED_VITALS: Vital[] = SEED_PATIENTS.flatMap(p => generateVitals(p.id))

// ── Alerts ───────────────────────────────────────────────────

export const SEED_ALERTS: Alert[] = [
  { id: 'alert_001', patientId: 'pat_004', patientName: 'David Williams', category: 'elevated_hematocrit', severity: 'critical', status: 'active', title: 'Hematocrit 54.2%', description: 'Hematocrit elevated above 52% threshold. Last value: 54.2%.', rationale: 'Elevated hematocrit on TRT increases thrombotic risk. Therapeutic phlebotomy recommended.', triggerValue: '54.2%', triggerThreshold: '52%', createdAt: daysAgo(5) },
  { id: 'alert_002', patientId: 'pat_004', patientName: 'David Williams', category: 'missed_followup', severity: 'high', status: 'active', title: 'Follow-up 30 days overdue', description: 'Scheduled follow-up was 30 days ago. Patient has not been seen.', rationale: 'Regular follow-ups are required for safe TRT monitoring.', createdAt: daysAgo(30) },
  { id: 'alert_003', patientId: 'pat_004', patientName: 'David Williams', category: 'overdue_labs', severity: 'high', status: 'active', title: 'Labs 30 days overdue', description: 'Labs were due 30 days ago. No recent results on file.', rationale: 'Lab monitoring is essential for ongoing TRT safety.', createdAt: daysAgo(30) },
  { id: 'alert_004', patientId: 'pat_004', patientName: 'David Williams', category: 'adherence_concern', severity: 'medium', status: 'active', title: 'Fair adherence, declining', description: 'Patient self-reported adherence has declined from good to fair.', rationale: 'Declining adherence may indicate side effects or dissatisfaction.', createdAt: daysAgo(15) },
  { id: 'alert_005', patientId: 'pat_002', patientName: 'Robert Thompson', category: 'overdue_labs', severity: 'medium', status: 'active', title: 'Labs 10 days overdue', description: 'Routine labs were due 10 days ago.', rationale: 'HCG protocol requires consistent monitoring.', createdAt: daysAgo(10) },
  { id: 'alert_006', patientId: 'pat_002', patientName: 'Robert Thompson', category: 'missed_followup', severity: 'medium', status: 'active', title: 'Follow-up 5 days overdue', description: 'Scheduled follow-up was 5 days ago.', rationale: 'Follow-up needed for protocol adjustment assessment.', createdAt: daysAgo(5) },
  { id: 'alert_007', patientId: 'pat_007', patientName: 'Daniel Martinez', category: 'adherence_concern', severity: 'high', status: 'active', title: 'Poor adherence, no contact', description: 'Patient has poor adherence and has not responded to outreach.', rationale: 'Non-adherent patients on TRT should be escalated for provider review.', createdAt: daysAgo(20) },
  { id: 'alert_008', patientId: 'pat_007', patientName: 'Daniel Martinez', category: 'missed_followup', severity: 'high', status: 'active', title: 'Follow-up 60 days overdue', description: 'Last visit was 120 days ago. Follow-up severely overdue.', rationale: 'Extended lapse in care requires immediate outreach.', createdAt: daysAgo(60) },
  { id: 'alert_009', patientId: 'pat_007', patientName: 'Daniel Martinez', category: 'overdue_labs', severity: 'high', status: 'active', title: 'Labs 60 days overdue', description: 'No labs on file for 150 days.', rationale: 'Cannot safely continue protocol without lab monitoring.', createdAt: daysAgo(60) },
  { id: 'alert_010', patientId: 'pat_010', patientName: 'Steven Taylor', category: 'rising_psa', severity: 'high', status: 'active', title: 'PSA trending up: 3.8 ng/mL', description: 'PSA has risen from 2.1 to 3.8 over 6 months.', rationale: 'PSA velocity warrants urology referral consideration for patient aged 54.', triggerValue: '3.8 ng/mL', triggerThreshold: '> 1.0 ng/mL/year velocity', createdAt: daysAgo(10) },
  { id: 'alert_011', patientId: 'pat_010', patientName: 'Steven Taylor', category: 'missed_followup', severity: 'medium', status: 'active', title: 'Follow-up 5 days overdue', description: 'Follow-up scheduled but not completed.', rationale: 'PSA concern requires timely follow-up.', createdAt: daysAgo(5) },
  { id: 'alert_012', patientId: 'pat_005', patientName: 'Christopher Garcia', category: 'estradiol_out_of_range', severity: 'high', status: 'active', title: 'Estradiol high: 48 pg/mL', description: 'Estradiol above reference range at 48 pg/mL.', rationale: 'Elevated E2 on enclomiphene may indicate need for dose adjustment.', triggerValue: '48 pg/mL', triggerThreshold: '10-40 pg/mL', createdAt: daysAgo(8) },
  { id: 'alert_013', patientId: 'pat_009', patientName: 'Kevin Brown', category: 'elevated_bp', severity: 'medium', status: 'active', title: 'BP 142/88', description: 'Blood pressure mildly elevated at last check.', rationale: 'GLP-1 patients with elevated BP should be monitored closely.', triggerValue: '142/88', triggerThreshold: '140/90', createdAt: daysAgo(3) },
  { id: 'alert_014', patientId: 'pat_012', patientName: 'Brian Clark', category: 'estradiol_out_of_range', severity: 'medium', status: 'active', title: 'Estradiol high: 44 pg/mL', description: 'E2 slightly above range.', rationale: 'May benefit from AI adjustment. Monitor symptoms.', triggerValue: '44 pg/mL', triggerThreshold: '10-40 pg/mL', createdAt: daysAgo(12) },
  { id: 'alert_015', patientId: 'pat_014', patientName: 'Mark Harris', category: 'elevated_bp', severity: 'high', status: 'active', title: 'BP 152/96', description: 'Hypertensive reading at last visit.', rationale: 'Stage 2 hypertension requires intervention and possible cardiology referral.', triggerValue: '152/96', triggerThreshold: '140/90', createdAt: daysAgo(15) },
  { id: 'alert_016', patientId: 'pat_014', patientName: 'Mark Harris', category: 'overdue_labs', severity: 'medium', status: 'active', title: 'Labs 15 days overdue', description: 'Routine labs overdue.', rationale: 'HCG protocol requires consistent monitoring.', createdAt: daysAgo(15) },
  { id: 'alert_017', patientId: 'pat_014', patientName: 'Mark Harris', category: 'missed_followup', severity: 'high', status: 'active', title: 'Follow-up 20 days overdue', description: 'Severely overdue for follow-up given BP concerns.', rationale: 'Hypertensive patient must be seen promptly.', createdAt: daysAgo(20) },
  { id: 'alert_018', patientId: 'pat_016', patientName: 'Thomas White', category: 'rising_psa', severity: 'high', status: 'active', title: 'PSA 4.2 ng/mL', description: 'PSA above 4.0 threshold.', rationale: 'Patient aged 57 with elevated PSA, urology referral indicated.', triggerValue: '4.2 ng/mL', triggerThreshold: '4.0 ng/mL', createdAt: daysAgo(8) },
  { id: 'alert_019', patientId: 'pat_016', patientName: 'Thomas White', category: 'missed_followup', severity: 'medium', status: 'active', title: 'Follow-up 10 days overdue', description: 'Follow-up needed for PSA discussion.', rationale: 'Elevated PSA requires timely provider review.', createdAt: daysAgo(10) },
  { id: 'alert_020', patientId: 'pat_021', patientName: 'Nathan Patel', category: 'elevated_bp', severity: 'medium', status: 'acknowledged', title: 'LDL 128 mg/dL', description: 'LDL cholesterol above optimal range.', rationale: 'Lipid management should be addressed in next follow-up.', triggerValue: '128 mg/dL', triggerThreshold: '100 mg/dL', createdAt: daysAgo(20), acknowledgedAt: daysAgo(18), ownerName: 'Dr. Test (SEED)' },
]

// ── Tasks ────────────────────────────────────────────────────

export const SEED_TASKS: Task[] = [
  { id: 'task_001', patientId: 'pat_004', patientName: 'David Williams', type: 'followup_review', title: 'Urgent follow-up: elevated hematocrit', description: 'Schedule and complete follow-up for hematocrit 54.2%. Consider phlebotomy referral.', status: 'pending', priority: 'urgent', assigneeId: 'usr_doc_001', assigneeName: 'Dr. Test (SEED)', dueDate: daysFromNow(2), createdAt: daysAgo(5), createdBy: 'system' },
  { id: 'task_002', patientId: 'pat_007', patientName: 'Daniel Martinez', type: 'patient_outreach', title: 'Re-engagement outreach', description: 'Patient non-responsive for 120 days. Attempt phone call and SMS. Consider letter.', status: 'in_progress', priority: 'high', assigneeId: 'usr_rn_001', assigneeName: 'Mike Johnson', dueDate: daysFromNow(1), createdAt: daysAgo(10), createdBy: 'usr_clin_001' },
  { id: 'task_003', patientId: 'pat_002', patientName: 'Robert Thompson', type: 'lab_review', title: 'Review overdue labs', description: 'Labs 10 days overdue. Send lab order and follow up.', status: 'pending', priority: 'high', assigneeId: 'usr_clin_001', assigneeName: 'Sarah Chen', dueDate: daysFromNow(3), createdAt: daysAgo(3), createdBy: 'system' },
  { id: 'task_004', patientId: 'pat_010', patientName: 'Steven Taylor', type: 'protocol_review', title: 'PSA review, urology referral', description: 'PSA trending up. Review labs and consider urology referral.', status: 'pending', priority: 'high', assigneeId: 'usr_doc_001', assigneeName: 'Dr. Test (SEED)', dueDate: daysFromNow(3), createdAt: daysAgo(5), createdBy: 'system' },
  { id: 'task_005', patientId: 'pat_014', patientName: 'Mark Harris', type: 'followup_review', title: 'BP follow-up, hypertension management', description: 'BP 152/96 at last visit. Needs follow-up, possible cardiology referral.', status: 'pending', priority: 'urgent', assigneeId: 'usr_doc_001', assigneeName: 'Dr. Test (SEED)', dueDate: daysFromNow(1), createdAt: daysAgo(10), createdBy: 'system' },
  { id: 'task_006', patientId: 'pat_012', patientName: 'Brian Clark', type: 'refill_review', title: 'Refill request: Anastrozole', description: 'Patient requesting anastrozole refill. E2 slightly elevated, review before approving.', status: 'pending', priority: 'normal', assigneeId: 'usr_doc_001', assigneeName: 'Dr. Test (SEED)', dueDate: daysFromNow(5), createdAt: daysAgo(2), createdBy: 'usr_ops_001' },
  { id: 'task_007', patientId: 'pat_016', patientName: 'Thomas White', type: 'protocol_review', title: 'PSA elevated, review protocol', description: 'PSA 4.2. Review TRT dose, consider urology referral.', status: 'pending', priority: 'high', assigneeId: 'usr_doc_001', assigneeName: 'Dr. Test (SEED)', dueDate: daysFromNow(3), createdAt: daysAgo(5), createdBy: 'system' },
  { id: 'task_008', type: 'admin_ops', title: 'Q1 compliance review', description: 'Complete quarterly compliance documentation review.', status: 'pending', priority: 'normal', assigneeId: 'usr_ops_001', assigneeName: 'Lisa Park', dueDate: daysFromNow(14), createdAt: daysAgo(7), createdBy: 'usr_admin_001' },
  { id: 'task_009', patientId: 'pat_009', patientName: 'Kevin Brown', type: 'refill_review', title: 'Refill request: Tirzepatide', description: 'Monthly refill for GLP-1 protocol. Review adherence and side effects.', status: 'pending', priority: 'normal', assigneeId: 'usr_clin_001', assigneeName: 'Sarah Chen', dueDate: daysFromNow(4), createdAt: daysAgo(1), createdBy: 'usr_ops_001' },
  { id: 'task_010', patientId: 'pat_005', patientName: 'Christopher Garcia', type: 'lab_review', title: 'Review E2, above range', description: 'Estradiol 48 pg/mL. Review and consider dose adjustment.', status: 'pending', priority: 'normal', assigneeId: 'usr_doc_001', assigneeName: 'Dr. Test (SEED)', dueDate: daysFromNow(5), createdAt: daysAgo(3), createdBy: 'system' },
]

// ── Refill Requests ──────────────────────────────────────────

export const SEED_REFILLS: RefillRequest[] = [
  { id: 'ref_001', patientId: 'pat_004', patientName: 'David Williams', medicationName: 'Testosterone Cypionate 200mg/mL', status: 'pending', requestedAt: daysAgo(5) },
  { id: 'ref_002', patientId: 'pat_004', patientName: 'David Williams', medicationName: 'Anastrozole 0.5mg', status: 'pending', requestedAt: daysAgo(3) },
  { id: 'ref_003', patientId: 'pat_002', patientName: 'Robert Thompson', medicationName: 'HCG 5000IU', status: 'pending', requestedAt: daysAgo(7) },
  { id: 'ref_004', patientId: 'pat_007', patientName: 'Daniel Martinez', medicationName: 'Testosterone Cypionate 200mg/mL', status: 'pending', requestedAt: daysAgo(14) },
  { id: 'ref_005', patientId: 'pat_007', patientName: 'Daniel Martinez', medicationName: 'Anastrozole 0.5mg', status: 'pending', requestedAt: daysAgo(14) },
  { id: 'ref_006', patientId: 'pat_007', patientName: 'Daniel Martinez', medicationName: 'HCG 5000IU', status: 'pending', requestedAt: daysAgo(10) },
  { id: 'ref_007', patientId: 'pat_012', patientName: 'Brian Clark', medicationName: 'Anastrozole 0.5mg', status: 'pending', requestedAt: daysAgo(2) },
  { id: 'ref_008', patientId: 'pat_009', patientName: 'Kevin Brown', medicationName: 'Tirzepatide 5mg', status: 'pending', requestedAt: daysAgo(1) },
  { id: 'ref_009', patientId: 'pat_014', patientName: 'Mark Harris', medicationName: 'Testosterone Cypionate 200mg/mL', status: 'pending', requestedAt: daysAgo(8) },
]

// ── AI Insights ──────────────────────────────────────────────

export const SEED_INSIGHTS: AgentInsight[] = [
  {
    id: 'ins_001', patientId: 'pat_004', type: 'risk_flag',
    title: 'High-risk patient, multiple overdue items',
    content: 'David Williams has elevated hematocrit (54.2%), overdue labs (30d), overdue follow-up (30d), and declining adherence. Recommend immediate outreach and phlebotomy referral. Consider dose reduction if hematocrit does not normalize after phlebotomy.',
    confidence: 0.92, generatedAt: daysAgo(2),
  },
  {
    id: 'ins_002', patientId: 'pat_007', type: 'summary',
    title: 'Non-adherent patient, escalation needed',
    content: 'Daniel Martinez has not been seen in 120 days, has poor adherence, and 3 pending refills. Multiple outreach attempts unsuccessful. Recommend provider review for potential discharge or alternative outreach strategy.',
    confidence: 0.88, generatedAt: daysAgo(5),
  },
  {
    id: 'ins_003', patientId: 'pat_001', type: '90_day_review',
    title: '90-day review, stable and optimized',
    content: 'James Mitchell is well-optimized on standard TRT. Total T 780, free T 22, E2 28, HCT 47. No alerts. Excellent adherence. Recommend continuing current protocol with next labs at 90-day mark.',
    confidence: 0.95, generatedAt: daysAgo(7),
  },
  {
    id: 'ins_004', patientId: 'pat_010', type: 'risk_flag',
    title: 'PSA velocity concern',
    content: 'Steven Taylor PSA rose from 2.1 to 3.8 over 6 months (velocity ~3.4 ng/mL/yr). While below absolute threshold of 4.0, velocity is concerning for patient aged 54. Recommend urology referral and consider TRT dose adjustment.',
    confidence: 0.85, generatedAt: daysAgo(3),
  },
]

// ── Notifications (pre-seeded for demo) ──────────────────────

export const SEED_NOTIFICATIONS: Notification[] = [
  { id: 'notif_001', recipientId: 'usr_admin_001', type: 'alert', title: 'Critical: Elevated Hematocrit', message: 'David Williams hematocrit at 54.2%, phlebotomy recommended.', patientId: 'pat_004', severity: 'critical', actionUrl: '/clinic/patients/pat_004', isRead: false, createdAt: daysAgo(1) },
  { id: 'notif_002', recipientId: 'usr_admin_001', type: 'alert', title: 'PSA Elevated: Thomas White', message: 'PSA 4.2 ng/mL, urology referral indicated.', patientId: 'pat_016', severity: 'high', actionUrl: '/clinic/patients/pat_016', isRead: false, createdAt: daysAgo(2) },
  { id: 'notif_003', recipientId: 'usr_admin_001', type: 'task', title: '5 urgent tasks pending', message: 'You have 5 tasks requiring attention including 2 urgent follow-ups.', severity: 'high', actionUrl: '/clinic/tasks', isRead: false, createdAt: daysAgo(0) },
  { id: 'notif_004', recipientId: 'usr_admin_001', type: 'agent_action', title: 'AI: Risk assessment completed', message: 'Agent completed risk assessment for 22 active patients. 4 flagged high-risk.', severity: 'info', actionUrl: '/clinic/alerts', isRead: true, createdAt: daysAgo(3) },
  { id: 'notif_005', recipientId: 'usr_admin_001', type: 'refill', title: '9 pending refill requests', message: 'Review pending refill requests, oldest is 14 days old.', severity: 'medium', actionUrl: '/clinic/tasks', isRead: false, createdAt: daysAgo(0) },
]

// ── Encounters (sample) ──────────────────────────────────────

export const SEED_ENCOUNTERS: Encounter[] = [
  { id: 'enc_001', patientId: 'pat_001', type: 'follow_up', date: daysAgo(14), providerId: 'usr_doc_001', providerName: 'Dr. Test (SEED)', assessment: 'Patient well-optimized on TRT. Labs excellent. No side effects.', plan: 'Continue current protocol. Next labs in 90 days.', followUpDate: daysFromNow(76) },
  { id: 'enc_002', patientId: 'pat_004', type: 'follow_up', date: daysAgo(90), providerId: 'usr_doc_001', providerName: 'Dr. Test (SEED)', assessment: 'Hematocrit trending up. Adherence declining. Patient reports fatigue despite adequate T levels.', plan: 'Order stat CBC. Discuss phlebotomy if HCT >52. Explore adherence barriers.', followUpDate: daysAgo(30) },
  { id: 'enc_003', patientId: 'pat_003', type: 'follow_up', date: daysAgo(7), providerId: 'usr_doc_001', providerName: 'Dr. Test (SEED)', assessment: 'New start TRT responding well. T 620 at 8 weeks. No side effects. Mood and energy improving.', plan: 'Continue. Recheck at 12 weeks.', followUpDate: daysFromNow(83) },
  { id: 'enc_004', patientId: 'pat_006', type: 'follow_up', date: daysAgo(14), providerId: 'usr_doc_001', providerName: 'Dr. Test (SEED)', assessment: 'Semaglutide 1.0mg weekly. Down 18 lbs in 10 weeks. Mild nausea first 2 weeks, resolved.', plan: 'Continue current dose. Recheck A1c and metabolic panel at 12 weeks.', followUpDate: daysFromNow(14) },
  { id: 'enc_005', patientId: 'pat_013', type: 'initial_consult', date: daysAgo(3), providerId: 'usr_doc_001', providerName: 'Dr. Test (SEED)', chiefComplaint: 'Low energy, decreased libido, difficulty with body composition', assessment: 'Baseline labs: Total T 245, Free T 6.2. Symptomatic hypogonadism. Candidate for TRT.', plan: 'Start Testosterone Cypionate 150mg/wk. Baseline CBC, PSA, lipids, CMP ordered. Follow-up in 6 weeks.', followUpDate: daysFromNow(39) },
]

// ── Symptom Assessments ──────────────────────────────────────

export const SEED_SYMPTOMS: SymptomAssessment[] = [
  { id: 'sym_001', patientId: 'pat_001', date: daysAgo(14), energyLevel: 8, libido: 8, mood: 9, sleepQuality: 7, mentalClarity: 8, physicalPerformance: 8, sideEffects: [] },
  { id: 'sym_002', patientId: 'pat_004', date: daysAgo(90), energyLevel: 5, libido: 4, mood: 5, sleepQuality: 4, mentalClarity: 5, physicalPerformance: 4, sideEffects: ['fatigue', 'headaches', 'facial flushing'] },
  { id: 'sym_003', patientId: 'pat_003', date: daysAgo(7), energyLevel: 7, libido: 7, mood: 8, sleepQuality: 7, mentalClarity: 7, physicalPerformance: 6, sideEffects: [] },
  { id: 'sym_004', patientId: 'pat_007', date: daysAgo(120), energyLevel: 3, libido: 3, mood: 4, sleepQuality: 3, mentalClarity: 4, physicalPerformance: 3, sideEffects: ['mood swings', 'irritability'] },
  { id: 'sym_005', patientId: 'pat_006', date: daysAgo(14), energyLevel: 7, libido: 6, mood: 8, sleepQuality: 7, mentalClarity: 7, physicalPerformance: 6, sideEffects: [] },
]

// ── Medications ──────────────────────────────────────────────

export const SEED_MEDICATIONS: Medication[] = [
  { id: 'med_001', patientId: 'pat_001', name: 'Testosterone Cypionate', dosage: '160mg', frequency: 'Weekly (split 2x)', route: 'IM injection', startDate: '2024-06-01', isActive: true, prescriberId: 'usr_doc_001' },
  { id: 'med_002', patientId: 'pat_002', name: 'Testosterone Cypionate', dosage: '140mg', frequency: 'Weekly (split 2x)', route: 'IM injection', startDate: '2024-04-15', isActive: true, prescriberId: 'usr_doc_001' },
  { id: 'med_003', patientId: 'pat_002', name: 'HCG', dosage: '500IU', frequency: '3x/week', route: 'SubQ injection', startDate: '2024-04-15', isActive: true, prescriberId: 'usr_doc_001' },
  { id: 'med_004', patientId: 'pat_004', name: 'Testosterone Cypionate', dosage: '200mg', frequency: 'Weekly', route: 'IM injection', startDate: '2024-01-20', isActive: true, prescriberId: 'usr_doc_001' },
  { id: 'med_005', patientId: 'pat_004', name: 'Anastrozole', dosage: '0.5mg', frequency: '2x/week', route: 'Oral', startDate: '2024-03-01', isActive: true, prescriberId: 'usr_doc_001' },
  { id: 'med_006', patientId: 'pat_005', name: 'Enclomiphene', dosage: '25mg', frequency: 'Daily', route: 'Oral', startDate: '2024-07-01', isActive: true, prescriberId: 'usr_doc_001' },
  { id: 'med_007', patientId: 'pat_006', name: 'Semaglutide', dosage: '1.0mg', frequency: 'Weekly', route: 'SubQ injection', startDate: '2024-09-01', isActive: true, prescriberId: 'usr_doc_001' },
  { id: 'med_008', patientId: 'pat_009', name: 'Tirzepatide', dosage: '5mg', frequency: 'Weekly', route: 'SubQ injection', startDate: '2024-08-15', isActive: true, prescriberId: 'usr_doc_001' },
  { id: 'med_009', patientId: 'pat_011', name: 'BPC-157', dosage: '500mcg', frequency: 'Daily', route: 'SubQ injection', startDate: '2024-10-01', isActive: true, prescriberId: 'usr_doc_001' },
  { id: 'med_010', patientId: 'pat_012', name: 'Testosterone Cypionate', dosage: '150mg', frequency: 'Weekly (split 2x)', route: 'IM injection', startDate: '2024-05-15', isActive: true, prescriberId: 'usr_doc_001' },
  { id: 'med_011', patientId: 'pat_012', name: 'Anastrozole', dosage: '0.25mg', frequency: '2x/week', route: 'Oral', startDate: '2024-06-01', isActive: true, prescriberId: 'usr_doc_001' },
  { id: 'med_012', patientId: 'pat_015', name: 'CJC-1295/Ipamorelin', dosage: '300mcg/300mcg', frequency: 'Daily (before bed)', route: 'SubQ injection', startDate: '2024-09-15', isActive: true, prescriberId: 'usr_doc_001' },
]

export type { Notification } from './mcp-adapter'
