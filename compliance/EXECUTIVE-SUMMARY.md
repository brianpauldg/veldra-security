# Compliance Remediation — Executive Summary

**Platform:** Bloom Metabolics (bloommetabolics.com)
**Audit Date:** April 28, 2026
**Auditor:** Claude Code (automated codebase audit)

---

## Bottom Line

The Bloom Metabolics codebase is **approximately 60% functional but NOT safe for patient data in its current state.** Three critical security gaps must be closed before any real patient information enters the system:

1. **Three clinic API routes have ZERO authentication** — the full patient roster, billing operations, and EHR sync are accessible to any HTTP client on the public internet.
2. **A complete encryption library exists but is never called** — PHI (intake form data, lab values, vitals, prescriptions) is stored as plaintext in Supabase.
3. **The middleware protects routes that don't exist** — it guards old Nova Health paths while leaving all `/clinic/*` and `/api/clinic/*` routes unprotected.

## What Works Well

- Marketing pages are generally compliant (proper disclaimers, qualified health claims)
- GLP-1 intake form is exemplary (contraindication screening, boxed warnings, compounded med separation)
- Disclaimer page properly addresses compounded medication and FDA status
- Stripe payment flow is functional end-to-end
- Intake forms have required field validation and consent capture
- Billing workflow has proper verbal confirmation gate

## What Must Be Fixed Before Launch

| Priority | Issue | Effort |
|----------|-------|--------|
| **BLOCKING** | Add auth to /api/clinic/* routes | 1 day |
| **BLOCKING** | Fix middleware to protect /clinic/* routes | Hours |
| **BLOCKING** | Encrypt intake form PHI data | 1 day |
| **BLOCKING** | Remove PHI from console.log + URLs | Hours |
| **BLOCKING** | Remove secrets from .mcp.json | Hours |
| **HIGH** | GLP-1 pages: add compounded medication disclosure | 1 day |
| **HIGH** | Competitor pages: fix FTC issues (unsubstantiated claims) | 1 day |
| **HIGH** | Add TCPA consent to all lead capture forms | 1 day |
| **HIGH** | Fill medical director credentials | Hours |
| **HIGH** | CA-only state gating on intake forms | Hours |

## What Can Wait Until Post-Launch

- Payment processor abstraction (Stripe works; Corepay migration is planned, not urgent)
- OptiMantra integration (prescriber accesses OptiMantra directly; adapter can come later)
- Email/SMS infrastructure (contact form saves to DB; email delivery can be wired later)
- Patient portal (OptiMantra provides patient-facing portal)
- Full CI/CD pipeline
- Penetration testing

## 18 Issues — Classification Summary

| Classification | Count | Issues |
|----------------|-------|--------|
| EXISTS — patch only | 5 | #1, #11, #12, #13 (partial), C1-C5 |
| PARTIAL — patch + add | 8 | #2, #3, #5, #6, #7, #8, #9, #17, #18 |
| NET-NEW — full build | 5 | #4, #10, #14, #15, #16 |

## Estimated Remediation

- **Groups 1-3 (launch blockers):** 5-7 days focused work
- **Groups 4-6 (post-launch hardening):** 6-8 days
- **Total:** 8-13 days, ~$0 additional infrastructure cost
- **Approach:** Minimal-diff remediation. No rewrites. Patch existing code, add missing gates.

## Files Created in This Audit

```
compliance/
  EXECUTIVE-SUMMARY.md          ← this file
  PLAN.md                       ← remediation plan (18 issues, 6 groups)
  patient-portal-scope.md       ← portal scope decision
  audits/
    00-repository-inventory.md  ← full inventory (30 pages, 16 routes, 15 components)
    01-issue-mapping.md         ← issue-by-issue classification
    02-architecture.md          ← auth, middleware, SSOT table, Mermaid workflow
    03-conflicts-and-risks.md   ← 5 critical, 8 high, 6 medium findings
```

---

**STOP.** No code changes have been made. Awaiting approval before proceeding with Group 1 (Security & PHI Hardening).
