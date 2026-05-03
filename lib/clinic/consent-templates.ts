/**
 * Bloom Metabolics — Informed Consent Templates
 * Versioned clinical consent documents for TRT, GLP-1, and telehealth.
 */

export interface ConsentTemplate {
  id: string
  version: string
  title: string
  body: string
  required_fields: string[]
  esignature_required: boolean
  effective_date: string
}

const templates: ConsentTemplate[] = [
  {
    id: 'trt-informed-consent',
    version: '1.0',
    title: 'Testosterone Replacement Therapy — Informed Consent',
    effective_date: '2026-04-28',
    esignature_required: true,
    required_fields: ['patient_name', 'date_of_birth', 'signature', 'date'],
    body: `# Informed Consent for Testosterone Replacement Therapy

## Purpose
This document describes the risks, benefits, and alternatives to testosterone replacement therapy (TRT) prescribed through Bloom Metabolics via telehealth.

## Diagnosis
Hypogonadism is diagnosed when two separate morning total testosterone levels are below the laboratory reference range AND clinical symptoms are present.

## Treatment
Testosterone cypionate or enanthate administered via intramuscular or subcutaneous injection. Ancillary medications may include HCG (human chorionic gonadotropin) and anastrozole for estrogen management.

## Benefits
- Improved energy and reduced fatigue
- Improved libido and sexual function
- Improved mood, motivation, and mental clarity
- Improved body composition (lean mass, reduced fat)
- Enhanced exercise performance and recovery
- Improved bone mineral density

Individual results vary. Benefits are not guaranteed.

## Risks and Side Effects
- **Polycythemia**: Elevated red blood cells (hematocrit). Requires regular CBC monitoring. If hematocrit exceeds 54%, dose reduction or hold. If >55%, therapeutic phlebotomy may be required.
- **Cardiovascular risk**: Ongoing research regarding cardiovascular events. Your physician will assess individual risk factors.
- **Fertility impact**: Exogenous testosterone suppresses sperm production and may reduce fertility. This effect is often reversible upon discontinuation but is not guaranteed. Patients desiring future fertility should discuss alternatives (clomiphene, HCG monotherapy) with their physician.
- **Prostate considerations**: PSA monitoring required. TRT is contraindicated in patients with active prostate cancer. Patients with BPH should be monitored closely.
- **Sleep apnea**: May worsen existing obstructive sleep apnea.
- **Mood and behavioral changes**: May include mood swings, increased irritability, or aggression.
- **Skin reactions**: Acne, oily skin, or injection site reactions.
- **Testicular atrophy**: Natural testosterone production may decrease.
- **Fluid retention**: Edema possible, especially at higher doses.
- **Drug interactions**: Inform your provider of all current medications.

## Monitoring Schedule
- Baseline labs before treatment
- Follow-up labs at 6-8 weeks, then every 90 days
- CBC, total/free testosterone, estradiol, PSA, metabolic panel, lipids

## Stopping Treatment
If treatment is discontinued, testosterone levels will return to pre-treatment baseline over weeks to months. Temporary worsening of symptoms (hypogonadism rebound) may occur.

## Schedule III Controlled Substance
Testosterone is a Schedule III controlled substance under federal law. It is prescribed for legitimate medical use only. Misuse or distribution is illegal.

## Telehealth Limitations
This treatment is prescribed via telehealth. Telehealth has limitations compared to in-person care, including inability to perform physical examination. Emergency situations require in-person evaluation — call 911.

<!-- REQUIRES CLINICAL REVIEW: Physician partner should review all risk language -->

## Acknowledgment
By signing below, I confirm that I have read and understand the above information, have had the opportunity to ask questions, and consent to testosterone replacement therapy as prescribed by my physician.`,
  },
  {
    id: 'glp1-informed-consent',
    version: '1.0',
    title: 'GLP-1 / GIP Receptor Agonist Therapy — Informed Consent',
    effective_date: '2026-04-28',
    esignature_required: true,
    required_fields: ['patient_name', 'date_of_birth', 'signature', 'date'],
    body: `# Informed Consent for GLP-1 / GIP Receptor Agonist Therapy

## Purpose
This document describes the risks, benefits, and alternatives to GLP-1 receptor agonist therapy prescribed through Bloom Metabolics via telehealth.

## Medication
Compounded semaglutide, compounded tirzepatide, or other GLP-1/GIP receptor agonists as prescribed by your physician.

**IMPORTANT: Compounded medications are NOT FDA-approved drugs.** They are prepared by licensed compounding pharmacies under the oversight of state boards of pharmacy. Your physician has determined that a compounded medication is appropriate for your individual clinical situation.

## Benefits
- Significant weight reduction (patients commonly report 15-20% of body weight)
- Improved glycemic control and A1C reduction
- Reduced cardiovascular risk factors
- Lower blood pressure and improved cholesterol levels
- Reduced appetite and food cravings
- Improved insulin sensitivity
- Potential improvement in non-alcoholic fatty liver disease (NAFLD)

Individual results vary significantly. Benefits are not guaranteed. Not all patients respond to GLP-1 therapy.

## Risks and Side Effects

### Common Side Effects
- Nausea, vomiting, diarrhea, constipation (especially during dose titration)
- Injection site reactions (redness, swelling, itching)
- Decreased appetite (intended therapeutic effect)

### Serious Risks
- **Thyroid C-cell tumors (BOXED WARNING)**: GLP-1 receptor agonists have caused thyroid C-cell tumors in animal studies. It is unknown whether this occurs in humans. **CONTRAINDICATED in patients with personal or family history of medullary thyroid carcinoma (MTC) or Multiple Endocrine Neoplasia syndrome type 2 (MEN2).**
- **Pancreatitis**: Rare but serious. Seek immediate medical attention for severe, persistent abdominal pain.
- **Gallbladder disease**: Increased risk of gallstones, especially with rapid weight loss.
- **Hypoglycemia**: Risk increased if combined with insulin or sulfonylureas.
- **Gastroparesis**: Delayed gastric emptying may occur.
- **Renal impairment**: Dehydration from GI side effects may affect kidney function.
- **Lean muscle loss**: Adequate protein intake and resistance exercise are important during treatment.

### Pregnancy
GLP-1 receptor agonists are **contraindicated during pregnancy**. Women of reproductive age must use reliable contraception during treatment and for at least 2 months after discontinuation.

## Stopping Treatment
Weight regain is common after discontinuing GLP-1 therapy. Your physician will discuss a transition plan if treatment is discontinued.

## Results Vary
Weight loss outcomes depend on adherence to medication, lifestyle modifications (diet and exercise), and individual metabolic factors. Not all patients achieve clinically significant weight loss.

## Telehealth Limitations
This treatment is prescribed via telehealth. Emergency situations require in-person evaluation — call 911.

<!-- REQUIRES CLINICAL REVIEW: Physician partner should review all risk language, particularly boxed warning and compounded medication disclosure -->

## Acknowledgment
By signing below, I confirm that I have read and understand the above information, have had the opportunity to ask questions, and consent to GLP-1/GIP receptor agonist therapy as prescribed by my physician.`,
  },
  {
    id: 'telehealth-informed-consent',
    version: '1.0',
    title: 'Telehealth Informed Consent',
    effective_date: '2026-04-28',
    esignature_required: true,
    required_fields: ['patient_name', 'signature', 'date'],
    body: `# Informed Consent for Telehealth Services

## Nature of Telehealth
Telehealth involves the delivery of healthcare services using interactive audio and video technology where the patient and provider are not in the same physical location.

## Benefits
- Convenient access to medical care from your location
- Reduced travel time and wait times
- Access to specialized providers regardless of geography

## Limitations
- The provider cannot perform a physical examination
- Technical difficulties may interrupt or delay your consultation
- Not all medical conditions are appropriate for telehealth evaluation
- In some cases, an in-person visit may be recommended

## Technology Requirements
- Reliable internet connection
- Device with camera and microphone
- Private location for the consultation

## Emergency Instructions
Bloom Metabolics telehealth services are NOT designed for medical emergencies. If you are experiencing a medical emergency, hang up and call 911 or go to your nearest emergency room immediately.

## Recording Policy
Telehealth sessions are not recorded by Bloom Metabolics unless you provide separate written consent.

## Privacy and Security
Your telehealth session is conducted over a secure, encrypted connection. Your health information is protected under HIPAA and applicable state privacy laws. See our Notice of Privacy Practices for details.

## Acknowledgment
By signing below, I consent to receiving medical care via telehealth and understand the benefits and limitations described above.`,
  },
]

export function getConsentTemplate(id: string, version?: string): ConsentTemplate | null {
  if (version) {
    return templates.find(t => t.id === id && t.version === version) || null
  }
  return templates.find(t => t.id === id) || null
}

export function getCurrentConsentTemplates(): ConsentTemplate[] {
  return [...templates]
}
