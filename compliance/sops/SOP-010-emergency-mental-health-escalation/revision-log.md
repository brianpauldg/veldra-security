# SOP-010 Emergency & Mental Health Escalation — Revision Log

**Parent Document:** SOP-010 Emergency & Mental Health Escalation

---

| Version | Date | Author | Approver | Summary of Changes |
| --- | --- | --- | --- | --- |
| 0.1 | 2026-05-24 | Brian DeGuzman, RN (MSO Owner) — operational scaffolding | Dr. Michael Napolitano, MD (signature pending) | Initial draft per MSO Owner instruction. Scope: dual-domain (medical + mental health) with tiered severity frameworks (Medical Tier 1-4, MH Tier 1-4). Clinical content marked `[CLINICAL — PENDING COVERING PHYSICIAN]` (40 markers) for Covering Physician population during review. Operational content marked `[OPERATIONAL — PENDING MSO OWNER]` (20 markers) for MSO Owner determination. Counsel-pending items marked `[PENDING COUNSEL VALIDATION]` (8 markers) for California-specific statutory and structural questions. Pre-enrollment crisis handling addressed in dedicated §5.5; post-enrollment is the primary focus. Pause-and-stabilize protocol established in §5.6; re-entry pathway in §5.11. California-specific legal obligations addressed in §5.7 (Tarasoff Cal. Civ. Code §43.92, 5150 interface Cal. Welf. & Inst. Code §5150, mandated reporting Cal. Penal Code §11164 et seq., Cal. Welf. & Inst. Code §15630, Cal. Penal Code §11160). Four attachments built concurrently: A (Crisis Resource Card — patient-facing), B (Medical Emergency Decision Tree — clinician-facing), C (Mental Health Crisis Decision Tree — clinician-facing with Tarasoff and 5150 branches), D (Telehealth Sync Visit Crisis Protocols — 8 scripted response cards). Cross-references with SOP-002, SOP-003, SOP-005, SOP-007, SOP-008. SOP-008 cross-reference backfill performed in same commit (SOP-008 v0.2 → v0.3): forward-references to "future Emergency & Mental Health Escalation SOP" replaced with concrete SOP-010 references at SOP-008 lines 17, 80, 108, and §10 future-SOPs table row. Master index updated in same commit: SOP-010 row added to Active SOPs, "Emergency & Mental Health Escalation" removed from Planned SOPs, `Last Updated` refreshed to 2026-05-24. |

---

## Author Notes (v0.1)

### Design Decision 1 — Why Dual-Domain (Medical + Mental Health) Rather Than Two Separate SOPs

The compliance audit and prior diagnostic flagged "Emergency & Mental Health Escalation" as a single Planned SOP. Two reasons for keeping it unified rather than splitting:

1. **Crisis events frequently span domains.** A patient who is unresponsive on a sync visit might be experiencing a medical event (syncope, overdose), a mental health event (intentional overdose), or both. The clinician at the moment of recognition cannot reliably distinguish, and the immediate response (911, stay-on-line, location confirmation) is the same. Splitting domains would require two separate SOPs to cover the same operational protocol, which would be redundant and error-prone.

2. **Tarasoff, 5150, and mandated reporting cut across both.** The California legal obligations are not exclusively mental health. Mandated reporting under Cal. Penal Code §11160 covers injuries from assaultive conduct (typically a medical presentation). Tarasoff applies wherever a clinician hears a credible threat to a third party. 5150 hold interface intersects with both medical and mental health emergencies. Splitting domains would force these cross-cutting frameworks to be documented in two places.

The cost of unification is that the SOP is large. The cost of splitting would be cross-reference complexity and duplicated content. Unification is the right tradeoff for v0.1.

### Design Decision 2 — Why Two Parallel Tier Systems (Medical Tier 1-4 and MH Tier 1-4) Rather Than One Unified Tier System

A unified tier system (Tier 1-4 mixed) was considered. Rejected because:

1. **Tier-specific response actions diverge substantially.** Medical Tier 3 typically routes to 911 or ED; MH Tier 3 typically routes to 988 with sync visit + potential welfare check. Unified tiers would mask this divergence and force complex conditional branches that obscure rather than clarify.

2. **Pause-status criteria differ.** MH Tier 3+ automatically triggers pause; Medical Tier 3 is Covering-Physician discretion; Medical Tier 4 automatic. Unified tiers would not capture these differences naturally.

3. **Documentation cascade differs.** Mental health crises during metabolic treatment are documentable per SOP-008 §5.4 SAE-equivalent rigor; medical AEs follow the standard AE framework. Parallel tiers track this distinction transparently.

Parallel tier systems are slightly more complex to learn but produce clearer protocols at the point of use. The decision trees in Attachments B and C make the two systems easy to navigate during a live event.

### Design Decision 3 — Why Pre-Enrollment Is a Subsection (§5.5) Rather Than Its Own SOP

Pre-enrollment crisis disclosures are a small but real category. Two reasons for handling as a subsection:

1. **The response pattern is the same as post-enrollment** — warm handoff to crisis resources, documentation, no clinical engagement. The substantive difference is the "enrollment hold" disposition rather than "pause status" disposition. A single subsection cleanly handles both.

2. **Volume is expected to be low.** Building an entire SOP for pre-enrollment crisis handling would over-invest in a relatively rare scenario. If volume becomes high in operation, §5.5 can be extracted into its own SOP later.

The subsection is positioned in §5.5 (mid-procedure section) rather than embedded in §5.1 (general principles) to keep it discoverable as its own protocol.

### Design Decision 4 — Why Pause-and-Stabilize Is the Default Post-Escalation Status

For MH Tier 3 and Tier 4 events, pause is automatic; for Medical Tier 4, pause is automatic; for Medical Tier 3, pause is Covering Physician discretion with default-yes. The rationale:

1. **Bloom's metabolic care is rarely time-critical to life-saving outcomes in the same way crisis response is.** Pausing a refill of testosterone or a GLP-1 prescription for a few weeks while a patient is in active mental health crisis is unlikely to cause significant clinical harm. Continuing to write prescriptions or schedule sync visits while a patient is in crisis is likely to expose Bloom (and the patient) to risk.

2. **Crisis events often surface previously-unknown information** (a psychiatric diagnosis, an active substance use disorder, a complicated medication regimen) that affects whether Bloom's metabolic care should continue at all. Pause provides time for the Covering Physician to learn the new context before resuming.

3. **The re-entry pathway is structured** to make resumption clear and decision-based, not bureaucratic. Patients who stabilize can return; patients who don't stabilize either remain on pause or the relationship is formally terminated with appropriate referral.

The pause is communicated transparently to the patient, with explicit framing that pause is not termination and re-entry is the expected pathway. This avoids the appearance of abandonment while still protecting both patient and practice.

### Design Decision 5 — Why So Many `[CLINICAL — PENDING COVERING PHYSICIAN]` Markers

40 clinical pending markers across the body. This is substantial. The rationale (per the prompt's Option A — structure now, clinical content during physician review):

1. **Tier criteria are inherently clinical.** "What constitutes Medical Tier 3" is a clinical judgment that should be made by the Covering Physician using their training and experience, not by the MSO Owner attempting to predict the right criteria.

2. **Prescription handling during crisis varies by medication.** Each Bloom service line has its own psychiatric profile, FDA labeling, and considerations during crisis. §5.10 has a marker per service line.

3. **Tarasoff applicability to Bloom's specific model is uncertain.** The structural questions (whether duty rests on PC physician or MSO, how friendly-PC affects allocation) require counsel input that this scaffolding cannot anticipate.

4. **Stabilization confirmation criteria are clinical.** The Covering Physician should define what "stabilized for re-entry" means based on the original event's severity and the patient's specific circumstance.

Each marker includes "suggested elements for calibration" so the Covering Physician has a starting framework rather than a blank field. Calibration during physician review is anticipated.

### Design Decision 6 — Voice and Tone

Voice matches SOP-008: clinical authority, mechanism-first, no marketing language. The SOP states what Bloom does and does not do plainly. The §2.2 explicit enumeration of out-of-scope services (mental health, emergency medicine, primary care, psychiatry, substance abuse, suicide prevention, pediatric, pregnancy, pain, hospice, eating disorder) is unusually direct because the scope boundary is the load-bearing element of this SOP — the entire SOP exists to govern what Bloom does when something outside its scope arises.

### Open Items for Future Revisions

- **v0.2 anticipated changes** after Covering Physician review:
  - Population of all `[CLINICAL — PENDING COVERING PHYSICIAN]` markers
  - Refinement of tier criteria based on Covering Physician's clinical experience
  - Confirmation or modification of pause-status defaults
  - Tarasoff applicability confirmation in consultation with healthcare counsel
- **v0.3 anticipated changes** after MSO Owner determination:
  - Population of all `[OPERATIONAL — PENDING MSO OWNER]` markers
  - OptiMantra workflow specification
  - After-hours coverage model decision
  - Crisis-services provider relationship (ProtoCall or similar) decision
  - Patient communication template language
  - California county-specific crisis-line numbers in Attachment A
- **v0.4+** after counsel validation:
  - Resolution of all `[PENDING COUNSEL VALIDATION]` markers
  - Refinement of California legal procedure (§5.7) per counsel input

---

*Bloom Metabolics — Confidential*
