# Compliance-Aware Operating Checklist

**DISCLAIMER:** This is NOT legal advice. This is a practical checklist for operational planning. All items marked "ATTORNEY REVIEW" must be reviewed by a licensed healthcare attorney before implementation.

---

## LIKELY REQUIRED (Before First Patient)

### Privacy & Data Protection

| Item | Description | Owner | Est. Cost | Risk if Skipped |
|------|-------------|-------|-----------|----------------|
| HIPAA Privacy Policy | Public-facing policy describing data collection, use, sharing, retention | Attorney + Ops | $1,000-3,000 | SEVERE — Required by law |
| HIPAA Notice of Privacy Practices (NPP) | Patient-facing notice of their rights and your obligations | Attorney | Included above | SEVERE |
| Terms of Service | Website usage terms, subscription terms, liability limitations | Attorney | $1,000-2,000 | HIGH |
| HIPAA Security Risk Assessment | Document technical, administrative, physical safeguards | Ops + Tech | $2,000-5,000 (or self-conduct) | SEVERE — Required annually |

### Patient Consent

| Item | Description | Owner | Est. Cost | Risk if Skipped |
|------|-------------|-------|-----------|----------------|
| Telehealth Informed Consent | Nature of telehealth, benefits, limitations, privacy, right to refuse | Attorney + Clinical | $500-1,500 | SEVERE — Required in most states |
| Financial Consent | Subscription terms, billing, cancellation, refund policy | Attorney + Ops | Included in ToS | HIGH |
| Communication Consent | Email, SMS, phone consent per CAN-SPAM, TCPA | Attorney + Ops | $500-1,000 | HIGH — TCPA violations are $500-$1,500 per message |
| Lab Consent | Authorization for blood work, release of results | Clinical | $500 | MEDIUM |
| Medication Acknowledgement | Compounded medication status, side effects, reporting | Clinical + Attorney | $500-1,000 | HIGH |

### Business Associate Agreements (BAAs)

| Vendor | BAA Status | Priority | Process |
|--------|-----------|----------|---------|
| Supabase | Available on Pro plan ($25/mo) | CRITICAL | Upgrade plan, sign BAA |
| Stripe | Standard BAA available | HIGH | Request via Stripe dashboard |
| SendGrid | BAA available on Pro+ plans | HIGH | Request via support |
| Twilio | BAA available | HIGH | Request via account settings |
| GoHighLevel | BAA available on HIPAA plan | HIGH | Upgrade to HIPAA plan |
| n8n | Check availability | HIGH | Contact sales |
| Vercel | Enterprise BAA available | MEDIUM | Contact sales |
| EHR vendor | Standard with healthcare EHRs | CRITICAL | Part of EHR contract |
| Pharmacy partner | Standard with pharmacies | CRITICAL | Part of pharmacy agreement |
| Lab partner | Standard with Quest/Labcorp | CRITICAL | Part of lab agreement |
| Calendly | Check HIPAA compliance | MEDIUM | May need to switch to HIPAA-compliant scheduler |

### Licensing & Prescribing

| Item | Description | Owner | Risk if Skipped |
|------|-------------|-------|----------------|
| Provider state licensing | Provider must hold active license in patient's state | Clinical + Ops | SEVERE — Practicing without license is criminal |
| DEA registration | Required for prescribing testosterone (Schedule III) | Provider | SEVERE — Cannot prescribe controlled substances |
| State telehealth registration | Some states require separate telehealth registration | Attorney + Provider | HIGH — Varies by state |
| Collaborative practice agreement | Required in some states for NP prescribing | Attorney + Provider | HIGH — State-dependent |
| E-prescribing for controlled substances (EPCS) | Federal requirement for electronic prescribing of Schedule II-V | Provider + EHR | HIGH — Required since 2021 |

---

## RECOMMENDED (Before Scale)

| Item | Description | Owner | Priority |
|------|-------------|-------|----------|
| Employee HIPAA training | Document that all team members completed HIPAA training | Ops | HIGH — Do before hiring |
| Incident response plan | Documented procedures for data breaches, security incidents | Ops + Tech | HIGH |
| Data backup & recovery | Automated backups, tested recovery procedures | Tech | HIGH |
| Business continuity plan | What happens if key systems go down | Ops | MEDIUM |
| Patient grievance procedure | Formal process for patient complaints | Ops + Clinical | MEDIUM |
| Quality assurance program | Clinical protocol review, outcome tracking | Clinical | MEDIUM |
| Provider credentialing | Formal verification of provider licenses, education, malpractice history | Ops + Attorney | HIGH |
| Clinical protocol documentation | Evidence-based protocols for TRT, GLP-1, peptides | Clinical + Provider | HIGH — Before first prescription |
| Adverse event reporting | Procedures for reporting side effects, medication errors | Clinical | HIGH |
| Critical value notification policy | Procedures for urgent lab result communication | Clinical | HIGH |
| Role-based access audit | Quarterly review of who has access to what | Tech + Ops | MEDIUM |
| Medical records retention | Policy for how long records are kept (state requirements vary, typically 7-10 years) | Attorney + Ops | HIGH |

---

## ATTORNEY/COMPLIANCE REVIEW REQUIRED

These items require licensed legal counsel. Do not attempt to self-implement.

| Item | Why Attorney Needed | Priority |
|------|-------------------|----------|
| State-by-state telehealth prescribing rules | Testosterone is Schedule III; rules vary significantly by state | CRITICAL |
| Corporate practice of medicine doctrine | Some states prohibit non-physician ownership of medical practices | CRITICAL |
| Collaborative practice agreement requirements | NP prescribing authority varies by state | HIGH (if using NPs) |
| Professional liability insurance | Coverage requirements and recommendations | HIGH |
| Patient abandonment avoidance | Legal requirements for continuity of care | MEDIUM |
| Compounded medication regulatory compliance | 503A vs 503B pharmacy requirements, FDA oversight | HIGH |
| FTC advertising compliance | Health claims, testimonials, endorsements | HIGH |
| State consumer protection (subscriptions) | Auto-renewal laws, cancellation requirements by state | MEDIUM |
| ADA/WCAG website accessibility | Increasing litigation risk for non-accessible healthcare sites | MEDIUM |
| Breach notification procedures | HIPAA requires notification within 60 days; state laws may be stricter | HIGH |

---

## PROHIBITED / HIGH-RISK (Never Do These)

| Pattern | Risk | Why |
|---------|------|-----|
| Implying compounded meds are FDA-approved | FDA Warning Letter + FTC action | MEDVi, Henry Meds, 30+ companies cited in Q1 2026 |
| AI-generated fake physician personas | FTC deceptive advertising + state medical board action | MEDVi national scandal |
| Uncontrolled affiliate marketing | FTC action, class action, brand damage | MEDVi class action filed March 2026 |
| Auto-renewal dark patterns | FTC "Click to Cancel" rule + state laws | Cancellation must be as easy as signup |
| Specific weight loss guarantees | FTC health claims enforcement | "Lose 20 lbs" is a claim that requires clinical evidence |
| AI making medical decisions | State medical board action + malpractice liability | AI assists, provider decides. Always. |
| Prescribing without provider-patient relationship | State medical board action + criminal liability | Video or synchronous consult required in most states |
| Cross-state practice without licensing | Criminal liability | Provider must be licensed in patient's state |
| Storing unencrypted PHI | HIPAA violation — fines up to $1.5M per violation category | Always encrypt at rest and in transit |
| Sharing PHI without authorization or BAA | HIPAA violation | Every vendor touching PHI needs a BAA |
| Guaranteeing outcomes | FTC enforcement + malpractice exposure | "Individual results vary" on everything |
| Practicing medicine without a license | Criminal offense | Only licensed providers make clinical decisions |

---

## Compliance Budget Estimate

| Category | Estimated Cost | Timeline |
|----------|---------------|----------|
| Healthcare attorney (initial setup) | $5,000-15,000 | Month 1 |
| Ongoing legal counsel | $1,000-3,000/mo | Ongoing |
| HIPAA Security Risk Assessment | $2,000-5,000 | Month 1 |
| Professional liability insurance | $3,000-10,000/yr | Month 1 |
| General liability insurance | $1,000-3,000/yr | Month 1 |
| BAA execution (vendor time, not attorney) | $0 (included in vendor contracts) | Month 1 |
| Trademark filing | $350-1,000 | Month 1 |
| **Total Year 1 Estimate** | **$15,000-40,000** | — |

---

## State Licensing Priority

Start with states that have favorable telehealth laws and large populations:

| Priority | States | Notes |
|----------|--------|-------|
| 1 (Launch) | TX, FL, CA, AZ, CO | Large populations, telehealth-friendly |
| 2 (Month 1) | GA, NC, OH, PA, IL | Expand coverage |
| 3 (Month 2-3) | Remaining states | Provider-by-provider as licensed |
| Avoid initially | NY, NJ, MA | Complex telehealth prescribing requirements |

**Note:** Provider must hold active license in each state where patients reside. Some states require separate telehealth registration.
