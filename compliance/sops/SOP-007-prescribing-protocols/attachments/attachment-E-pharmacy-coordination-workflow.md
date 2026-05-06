# Attachment E -- Pharmacy Coordination Workflow

**Parent Document:** SOP-007 Prescribing Protocols
**Classification:** INTERNAL -- OPERATIONAL
**Ownership:** Operational -- MSO Owner
**Version:** 0.1
**Date:** 2026-05-06

---

## E.1 Strive Pharmacy Relationship

**Account Setup.** Bloom Metabolics maintains a dispensing account with Strive Pharmacy registered under the covering physician's NPI and California DEA number. MSO Owner is responsible for initial credentialing and annual re-verification of account status.

**ePrescribing Integration.** All testosterone cypionate prescriptions (Schedule III) are transmitted via OptiMantra using EPCS-compliant electronic prescribing. No paper, fax, or verbal orders are permitted for controlled substances.

**Direct-Bill Model.** Strive invoices Bloom Metabolics directly. Patients are not billed separately by Strive; prescription costs are incorporated into the patient's bundled service tier price. Patients see a single charge from Bloom Metabolics.

**Fill Confirmation Workflow.**

1. Physician generates prescription in OptiMantra; transmitted electronically to Strive.
2. Strive confirms receipt and begins dispensing.
3. Upon fill completion, Strive notifies OptiMantra of fill status.
4. Strive generates shipment tracking number.
5. Patient receives delivery notification with tracking information.

**Monthly Invoice Reconciliation.** MSO Owner reconciles Strive invoices against OptiMantra prescription records monthly. Discrepancies are flagged and resolved within 10 business days.

**Quarterly Vendor Review.** MSO Owner conducts a quarterly review of Strive performance covering:

- Pricing accuracy against contracted rates
- Fill turnaround time (target and actual)
- Shipping reliability and delivery timelines
- Patient satisfaction indicators (complaints, returns, fill errors)

Findings are documented and retained per SOP-001 document retention requirements.

**Escalation Contacts.** MSO Owner maintains current escalation contact information for Strive, including account manager, pharmacy operations lead, and after-hours contact. Contact list is reviewed quarterly.

---

## E.2 503A/503B Compounding Partner Relationship

**Account Setup.** Bloom Metabolics maintains an account with a licensed 503A compounding partner. Account is credentialed under the covering physician's NPI and DEA. MSO Owner manages credentialing and annual verification.

**OptiMantra Integration.** Prescriptions for compounded medications are transmitted via OptiMantra ePrescribing to the compounding partner.

**503A Patient-Specific Dispensing (Default at Launch).** All compounded prescriptions at launch are dispensed under 503A patient-specific requirements. Each prescription is a patient-specific order tied to an individual patient. The physician's documentation in OptiMantra serves as the patient-specific order.

**503B Capability (Not Active at Launch).** The compounding partner maintains 503B outsourcing facility capability. This pathway is not used at launch. Future use cases -- including stocked products or in-office administration -- require a minor revision to this SOP before activation.

**Fill Workflow.**

1. Physician generates prescription in OptiMantra; transmitted to compounding partner.
2. Compounding partner receives and queues the order.
3. Compounding is completed per patient-specific formulation.
4. Product is shipped to patient.
5. Patient receives delivery notification.

**Certificate of Analysis (COA).** The compounding partner provides a Certificate of Analysis for each compounded batch. MSO Owner maintains a COA file organized by product and batch number, accessible for audit or patient inquiry.

**Compounded GLP-1 Exception.** When a compounded semaglutide prescription is issued under medical-necessity exception, the following documentation flows with the prescription:

- Physician's medical-necessity justification
- Documentation of branded product unavailability or clinical contraindication

The compounding partner retains this documentation in its records for FDA compliance purposes.

**Monthly Invoice Reconciliation.** MSO Owner reconciles compounding partner invoices against OptiMantra prescription records monthly. Discrepancies are flagged and resolved within 10 business days.

**Quarterly Vendor Review.** MSO Owner conducts a quarterly review covering:

- Pricing accuracy against contracted rates
- Compounding turnaround time
- Shipping reliability
- COA completeness and accuracy
- Patient satisfaction indicators

**Escalation Contacts.** MSO Owner maintains current escalation contact information for the compounding partner. Contact list is reviewed quarterly.

---

## E.3 Retail/Mail-Order Pharmacy Routing (FDA-Approved Branded GLP-1, Generic PDE5i)

**Prescription Transmission.** Prescriptions for FDA-approved branded and generic medications are generated in OptiMantra and transmitted via standard ePrescribing (Surescripts or equivalent) to the patient's selected pharmacy.

**Patient Pharmacy Selection.** The patient selects their preferred retail or mail-order pharmacy. Selection is recorded in OptiMantra during intake or at time of prescribing.

**Patient Financial Responsibility.** The patient is responsible for the fill cost at their selected pharmacy, whether paying cash or using personal insurance. Bloom Metabolics does not collect payment for these medications.

**Cost Transparency.** MSO Intake Staff communicates expected cash-pay costs to patients at the time of prescribing:

- Branded GLP-1 (Wegovy, Ozempic, Mounjaro, Zepbound): $1,000--$1,500/month
- Generic tadalafil: $5--$15/month
- Generic sildenafil: $10--$30/month

These figures are estimates provided for planning purposes and may vary by pharmacy.

**Manufacturer Savings Programs.** MSO Intake Staff provides patient-facing reference to applicable manufacturer savings programs, including Novo Nordisk and Eli Lilly savings card programs. Bloom Metabolics does not administer these programs; patients apply directly.

**Insurance Disclaimer.** Bloom Metabolics does not file insurance claims on behalf of patients. Patients may independently submit claims to their insurance carrier for reimbursement.

---

## E.4 Pharmacy Routing Decision Logic

| Medication | FDA Status | Pharmacy | Routing Method |
| --- | --- | --- | --- |
| Testosterone cypionate | FDA-approved (Schedule III) | Strive Pharmacy | OptiMantra EPCS ePrescribing |
| Compounded testosterone | Compounded | 503A/503B partner | OptiMantra ePrescribing |
| Semaglutide (Wegovy/Ozempic) | FDA-approved branded | Patient-chosen retail/mail-order | OptiMantra ePrescribing (Surescripts) |
| Tirzepatide (Mounjaro/Zepbound) | FDA-approved branded | Patient-chosen retail/mail-order | OptiMantra ePrescribing (Surescripts) |
| Compounded semaglutide (exception) | Compounded | 503A/503B partner | OptiMantra ePrescribing + medical necessity documentation |
| Tadalafil (generic) | FDA-approved generic | Patient-chosen retail/mail-order | OptiMantra ePrescribing (Surescripts) |
| Sildenafil (generic) | FDA-approved generic | Patient-chosen retail/mail-order | OptiMantra ePrescribing (Surescripts) |
| PT-141 (bremelanotide) | Compounded | 503A/503B partner | OptiMantra ePrescribing |
| NAD+ (subcutaneous) | Compounded | 503A/503B partner | OptiMantra ePrescribing |
| Glutathione (subcutaneous) | Compounded | 503A/503B partner | OptiMantra ePrescribing |

---

## E.5 Fill Status Tracking

**Tracking System.** The OptiMantra pharmacy module tracks prescription status through the following stages:

- **Submitted** -- Prescription transmitted to pharmacy.
- **Filled** -- Pharmacy confirms dispensing complete.
- **Shipped** -- Product in transit to patient.
- **Dispensed** -- Patient delivery confirmed.

**Daily Monitoring.** MSO Intake Staff monitors fill status daily for all active prescriptions.

**Patient Notification.** Patients are notified when their prescription reaches Shipped status.

**Fill Delay Escalation.**

- Strive Pharmacy or compounding partner: fill delays exceeding 3 business days from submission trigger escalation to MSO Owner.
- Retail/mail-order pharmacy: fill delays exceeding 5 business days from submission trigger escalation to MSO Owner.

**Fill Failure Handling.** The following fill failures trigger MSO Owner notification and physician awareness:

- Insurance denial (branded medications)
- Stockout at pharmacy
- Patient declined fill
- Pharmacy unable to compound (formulation issue, ingredient shortage)

MSO Owner documents the failure in OptiMantra and coordinates resolution.

---

## E.6 Pharmacy Disruption Handling

Per SOP-007 Section 7.7, sustained disruption at Strive Pharmacy or the compounding partner triggers the following sequence:

1. MSO Owner identifies an alternative pharmacy capable of fulfilling affected prescriptions.
2. Covering physician reviews and approves the alternative pharmacy.
3. Patient communications are updated to reflect the temporary change.
4. A minor SOP revision documents the temporary alternative arrangement, including expected duration.
5. MSO Owner pursues long-term resolution with the primary pharmacy partner or permanent transition to the alternative.

Disruption handling is documented in OptiMantra and referenced in the next quarterly vendor review.

---

*Bloom Metabolics -- Confidential*
