# Bloom Metabolics — Compliance & Document Control

**Classification:** INTERNAL — CLINICAL & OPERATIONAL USE ONLY

---

## Purpose

This directory contains the governing documents for Bloom Metabolics' clinical and operational practice. It houses all Standard Operating Procedures (SOPs), templates, build tools, and audit materials that together constitute the company's compliance infrastructure.

The SOP system ensures that every clinical and operational process is documented, reviewed by appropriate authority, version-controlled, and auditable. It exists to serve three audiences:

1. **Internal personnel** — Clear, unambiguous procedures for daily work
2. **Covering physician** — Documented governance demonstrating standard-of-care adherence
3. **External auditors** — Producible evidence of compliance (LegitScript, Medical Board, DEA, OCR, malpractice carriers)

---

## Draft Status Disclaimer

> The documents in this directory are first-draft governance artifacts produced by Bloom Metabolics for the purpose of establishing a clinical and operational SOP system. They have NOT yet been reviewed by legal counsel, compliance counsel, or the covering physician, and are NOT operative until the review and signature workflow defined in SOP-001 has been completed. No clinical or operational decision shall be made on the basis of these documents in their current draft state.

---

## Directory Map

| Directory | Contents |
| --- | --- |
| `templates/` | Master SOP template, signature page template, revision history template — the starting point for all new SOPs |
| `sops/` | Individual SOP directories, each containing the SOP source file, attachments, and signed documents |
| `sops/_archive/` | Retired and superseded SOPs (permanent audit record; never deleted) |
| `build/` | Node.js scripts for converting Markdown SOPs to DOCX and HTML |
| `audits/` | Compliance audit reports and discovery documents |
| `integrations/` | Integration-specific compliance documentation |

---

## Finding a Specific SOP

Consult the [Master Index](master-index.md) for a complete registry of all SOPs — active, draft, planned, and archived — with their current status, version, and file location.

---

## Proposing a Change

Changes to any active SOP follow the Change Request workflow defined in [SOP-001 Section 5.13](sops/SOP-001-document-control/SOP-001-document-control.md):

1. Create a git branch from the current active version of the SOP
2. Make the proposed changes
3. Open a pull request with a clear description of the change and rationale
4. The document owner triages within 5 business days

---

## Building Documents

The `build/` directory contains scripts for generating distributable formats:

```bash
# Generate DOCX from a Markdown SOP (requires pandoc)
node compliance/build/build-docx.mjs compliance/sops/SOP-001-document-control/SOP-001-document-control.md

# Generate HTML library from all SOPs
node compliance/build/build-html.mjs
```

See `build/` directory for prerequisites and configuration.

---

## Contact

- **Document Owner:** Brian (Owner / Registered Nurse)
- **Covering Physician:** TBD (pending Doctors for Providers retainer assignment)
- **Questions about this system:** Contact Brian directly

---

## Confidentiality Notice

INTERNAL — CLINICAL & OPERATIONAL USE ONLY. Not for distribution outside Bloom Metabolics personnel and authorized agents. Unauthorized reproduction, distribution, or disclosure of the contents of this directory is prohibited. If you have received access to this directory in error, notify Brian immediately and delete all copies.

---

*Bloom Metabolics — Confidential*
