# SOP-009 Vendor & Contractor Management (1099 Operations) -- Revision Log

**Parent Document:** SOP-009 Vendor & Contractor Management (1099 Operations)

---

| Version | Date | Author | Approver | Summary of Changes |
| --- | --- | --- | --- | --- |
| 0.1 | 2026-05-11 | Brian DeGuzman (MSO Owner) | Brian DeGuzman (MSO Owner) | Initial draft. MSO-only operational SOP per SOP-001 §2.3. Approval path: MSO Owner sign-off (no Covering Physician review burden). All 10 sections and 6 attachments fully drafted. No `[CLINICAL — PENDING]` markers (MSO-only SOP). |
| 0.2 | 2026-05-11 | Brian DeGuzman (MSO Owner) | Brian DeGuzman (MSO Owner) | Minor revision per SOP-001 §5.11.1. Status remains Draft (approval pending MSO Owner signature). Substantive fixes: §12 acknowledgment table populated with MSO Owner and Bookkeeper rows; §5.6 step 7 California state filing language corrected to reference CF/SF Program participation; §5.4.3 and §5.2 BAA scope language clarified with defensive PHI posture; §5.2 step 1 legal review trigger restructured (template-deviation primary trigger, $10K dollar threshold secondary trigger, replacing prior $5K threshold). Minor fixes: §5.5 step 4 $500 flag recharacterized as secondary backstop; §9 backup withholding statutory reference (26 U.S.C. § 3406) added; all cross-reference paths verified. No scope expansion; no attachments modified. |
| 0.2.1 | 2026-05-24 | Brian DeGuzman (MSO Owner) | Brian DeGuzman (MSO Owner) | Minor revision per SOP-001 §5.11.1 (cross-reference correction; no scope or operational content change). Trigger: numbering collision detected during 2026-05-24 state-of-build diagnostic — the parallel session that drafted SOP-009 assumed SOP-008 would be "Provider Credentialing, Insurance & Coverage"; actual SOP-008 is "Adverse Event & Incident Reporting" (drafted in main work track 2026-05-11). Changes: (1) all 14 references to "SOP-008 (Provider Credentialing, Insurance & Coverage)" in the SOP-009 body replaced with generic forward-references per SOP-001 §5.1 (no pre-assigned IDs); (2) §5.8 heading renamed "Boundary with SOP-008 (Clinical Provider Credentialing)" → "Boundary with Future Provider Credentialing SOP"; (3) §5.8 body prose updated to use "the future Provider Credentialing SOP" framing throughout; (4) frontmatter `related_documents` entry updated; (5) §10 Related Documents entry updated; (6) Attachment A lines 11, 23, 224 updated per same pattern; (7) Author Notes (v0.2) Issue 7 entry updated from "BROKEN (expected)" to "RESOLVED via Path A". Master index updated separately in same commit: SOP-009 row bumped 0.1 → 0.2; `Last Updated` refreshed to 2026-05-24; "Provider Credentialing, Insurance & Coverage" added to Planned SOPs (High priority, no ID per SOP-001 §5.1). No procedural, scope, operational content, attachment data, or classification logic changes — vendor classification logic, decision trees, contract requirements, payment workflow, 1099 issuance procedure, and operational responsibilities are unchanged. |

---

## Author Notes (v0.2)

### Cross-Reference Verification (Issue 7)

All relative Markdown links in §10 Related Documents and throughout the primary document were verified against the repo filesystem:

- `../SOP-001-document-control/SOP-001-document-control.md` — **RESOLVED.** File exists at `compliance/sops/SOP-001-document-control/SOP-001-document-control.md`.
- `../SOP-008-provider-credentialing/SOP-008-provider-credentialing.md` — **RESOLVED via Path A (2026-05-24).** The phantom reference to "SOP-008 (Provider Credentialing, Insurance & Coverage)" assumed a parallel-session numbering that did not match the actual SOP-008 (Adverse Event & Incident Reporting, drafted concurrently in the main work track on 2026-05-11). All references replaced with generic forward-references per SOP-001 §5.1 (numbers assigned at draft time, not pre-assigned). The Provider Credentialing SOP is now listed in the master-index Planned SOPs table without a pre-assigned ID. See v0.2.1 revision entry above for full change manifest.
- `../SOP-006-lab-ordering-and-review/SOP-006-lab-ordering-and-review.md` — **RESOLVED.** File exists at `compliance/sops/SOP-006-lab-ordering-and-review/SOP-006-lab-ordering-and-review.md`. Title "Lab Ordering & Review" matches the link text. No correction needed.
- All 6 attachment links (`attachments/attachment-A-*` through `attachments/attachment-F-*`) — **RESOLVED.** All files exist at the referenced paths.

---

## Author Notes (v0.1)

The following items are flagged for operational follow-up. These are not SOP deficiencies — they represent operational artifacts that must be built, executed, or confirmed outside this document.

### Templates Requiring Build or Legal Review

1. **Standard Independent Contractor Agreement template** — referenced in §5.2 as the template for vendor agreements. Status: `[OPERATIONAL — TO BE BUILT OR LEGAL-REVIEWED]`. Recommendation: engage legal counsel to draft a California-compliant IC agreement template that includes scope of work, compensation, IC classification acknowledgment, IP assignment, confidentiality, indemnification, and termination provisions.

2. **Standard HIPAA Business Associate Agreement template** — referenced in §5.2 as the template for BAA execution with PHI-touching vendors. Status: `[OPERATIONAL — TO BE BUILT OR LEGAL-REVIEWED, COORDINATE WITH FUTURE HIPAA SOP]`. Recommendation: coordinate BAA template creation with the future HIPAA Compliance SOP. The BAA template should comply with 45 CFR § 164.504(e) and include all required provisions.

### Operational Items Requiring Confirmation

3. **Bookkeeping Services Engagement Letter** — referenced in §5.4.1. Status: `[OPERATIONAL — TO BE EXECUTED IF NOT ALREADY]`. If a written engagement letter is not currently in place with the bookkeeper, one should be drafted and executed. The engagement letter formalizes the existing arrangement and provides documentation required by this SOP.

4. **IRS TIN Matching Service registration** — referenced in Attachment B. The IRS TIN Matching Service allows authorized payers to verify that a vendor's name/TIN combination matches IRS records before issuing a 1099. Registration is recommended for any business issuing 1099s. Status: confirm whether the MSO Owner has registered at https://www.irs.gov/tax-professionals/taxpayer-identification-number-tin-matching.

5. **Secure document return method** — referenced in Attachment C email templates as `[OPERATIONAL — TO BE CONFIGURED]`. A secure file upload link or document portal should be configured for vendors to return W-9s, signed agreements, and other sensitive documents. Options include a Google Drive shared folder with restricted access, a dedicated secure form (e.g., JotForm with encryption), or a document management portal.

### Items Requiring CPA or Legal Counsel Review

6. **California AB 5 / ABC test references** — the classification framework in §5.3 and Attachment A references California Labor Code § 2775 (AB 5) and §§ 2776–2787 (AB 2257 exemptions). These references are accurate as of the build date (2026-05-11) but should be verified by legal counsel, as AB 5 and its exemptions are subject to ongoing legislative amendments and judicial interpretation.

7. **1099-NEC corporate exemption and medical/legal exception** — the exemption and exception framework in §5.6, §5.7, and Attachment E reflects current IRS 1099-NEC instructions. CPA should confirm these rules annually during tax preparation, as thresholds, exemptions, and exceptions may change.

8. **California state 1099 filing** — §5.6 Step 7 notes that California conforms to federal 1099 filing requirements. CPA should confirm California-specific filing requirements annually, particularly regarding combined federal/state filing through 1099 services.

---

*Bloom Metabolics -- Confidential*
