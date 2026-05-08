# SOP-004 Existence Diagnostic Report

**Generated:** 2026-05-08
**Repository state:** `sop/physician-named-and-phentermine-removed` @ `009878495bf1186257ae2ead571399577e77c137`
**Working tree:** Uncommitted changes (count: 3 files — all untracked, none in `compliance/`)

## Executive Summary

**SOP-004 EXISTS ON A NON-MAIN BRANCH.** A complete v0.1 draft of SOP-004 (Patient Self-Administration Injection Education) — governing document, 5 protocol attachments in 3 formats (MD/DOCX/PDF), revision log, signed directory, and website build prompt — was committed on 2026-05-04 to branch `sop/SOP-004-injection-education-v0.1` (commit `e9c92bf`). This branch has never been merged into `main` or the current working branch. The master index on the current branch does not contain an SOP-004 row; the master index on the SOP-004 branch does. A companion branch `feature/injection-education-pages` extends SOP-004 with 7 additional commits building web-rendered injection guide pages (Next.js routes). Cross-references to SOP-004 in SOP-001, SOP-005, and SOP-007 on the current branch point to the expected directory path and will resolve once the branch is merged — however, SOP-005 informed consent attachments use a stale directory name (`SOP-004-self-administration-protocols`) that will need correction.

## Authoritative Finding

**SOP-004 EXISTS on branch `sop/SOP-004-injection-education-v0.1`** at path `compliance/sops/SOP-004-injection-education/SOP-004-injection-education.md` with version `0.1`, status `Draft (Provisional pending Covering Physician approval per SOP-001 §5.6)`. Committed 2026-05-04 14:25:24 -0700. 465 lines. Zero `[CLINICAL — PENDING COVERING PHYSICIAN]` markers in the governing document. The file has not been merged into `main` or the current branch.

**Note:** The physician name in the SOP-004 branch is outdated — it still references "Covering Physician (TBD)" since it was built before the physician naming commit (`0098784`) on the current branch. If recovered, the physician name (Dr. Michael Napolitano, MD) will need to be applied.

---

## Detailed Findings

### Standard Location Check

- **File exists on current branch?** No. The directory `compliance/sops/SOP-004-injection-education/` does not exist on the current branch or `main`.
- **File exists on `sop/SOP-004-injection-education-v0.1` branch?** Yes.
  - Path: `compliance/sops/SOP-004-injection-education/SOP-004-injection-education.md`
  - Line count: 465
  - Committed: 2026-05-04 14:25:24 -0700
  - `[CLINICAL — PENDING COVERING PHYSICIAN]` markers: **0** (in the governing document)
- **Frontmatter (verbatim):**
  - `sop_id`: `"SOP-004"`
  - `title`: `"Patient Self-Administration Injection Education"`
  - `version`: `"0.1"`
  - `status`: `"Draft (Provisional pending Covering Physician approval per SOP-001 §5.6)"`
  - `owner`: `"Covering Physician (TBD — pending Doctors for Providers assignment); operational delegation to Brian DeGuzman, MSO Owner per SOP-001 §2.3"`
  - `approver`: `"Covering Physician (clinical SOP per SOP-001 §2.3)"`
- **Revision History (§11):**

| Version | Date | Author | Description of Change | Approver |
| --- | --- | --- | --- | --- |
| 0.1 | 2026-05-03 | Brian DeGuzman, MSO Owner (operational scaffolding) | Initial draft. Provisional pending Covering Physician approval per SOP-001 §5.6. Five protocol attachments drafted using current evidence-based parameters. Three deliverable formats (Markdown, DOCX, PDF) generated from Markdown source. Website rendering deferred to separate Claude Code build prompt. Clinical content authority rests with the Covering Physician (TBD via Doctors for Providers). | Covering Physician (TBD) |

### Alternative Folder Names

No directories matching `SOP-004-*` exist under `compliance/sops/` on the current branch. On branch `sop/SOP-004-injection-education-v0.1`, the single directory is `SOP-004-injection-education/` containing 19 files:

- `SOP-004-injection-education.md` (governing document)
- `revision-log.md`
- `signed/.gitkeep`
- `website-build/claude-code-prompt-website-protocol-pages.md`
- 5 protocol subdirectories under `attachments/`, each with `.md`, `.docx`, and `.pdf`:
  - `protocol-001-trt-intramuscular/`
  - `protocol-002-glp1-gip-subcutaneous/`
  - `protocol-003-hcg-subcutaneous/`
  - `protocol-004-bpc157-subcutaneous-future/`
  - `protocol-005-tb500-subcutaneous-future/`

### Wrong-Directory Search

No file matching `SOP-004*` exists anywhere in the working tree on the current branch. The glob search only returned `.git/` internal refs for the `sop/SOP-004-injection-education-v0.1` branch — confirming the branch exists locally and on remote but has not been merged.

Specific directories checked:
- `compliance/templates/` — no SOP-004 files
- `compliance/build/` — no SOP-004 source files (build scripts `build-protocol-docx.mjs` and `build-protocol-pdf.mjs` exist on the SOP-004 branch only)
- `compliance/drafts/` — does not exist
- `compliance/scratch/` — does not exist
- Repository root — no SOP-004 files
- Non-compliance directories — no SOP-004 files

### Content-Based Search

Matches found on the current branch (all are cross-references, not SOP-004 source material):

| File | Line | Context |
| --- | --- | --- |
| `compliance/sops/SOP-001-document-control/attachments/cover-memo-physician-review-v2.md` | 87 | Section 3.4 describes SOP-004 as "v0.1, Draft Scaffold" in the physician review cover memo |
| `compliance/sops/SOP-001-document-control/attachments/cover-memo-physician-review-v2.md` | 156 | Estimated review time: 1.5 hours, 14-day turnaround |
| `compliance/sops/SOP-001-document-control/attachments/cover-memo-physician-review-v2.md` | 194 | Lists SOP-004 as a clinical SOP requiring physician signature |
| `compliance/sops/SOP-001-document-control/attachments/cover-memo-physician-review-v2.md` | 213 | Package checklist item 4: "SOP-004 v0.1 — Patient Self-Administration Injection Education (with five protocol attachments)" |
| `compliance/sops/SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md` | 65 | Out-of-scope reference: "Injection education... governed by SOP-004" |
| `compliance/sops/SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md` | 87 | Dependencies reference: injection education governed by SOP-004 |
| `compliance/sops/SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md` | 601 | §10 Related Documents: SOP-004 — Injection Education |
| `compliance/sops/SOP-005-synchronous-telehealth-visit/attachments/attachment-D-informed-consent-trt.md` | 27, 115 | Links to `SOP-004-self-administration-protocols` (STALE PATH — see note below) |
| `compliance/sops/SOP-005-synchronous-telehealth-visit/attachments/attachment-E-informed-consent-glp1-gip.md` | 27, 123 | Links to `SOP-004-self-administration-protocols` (STALE PATH) |
| `compliance/sops/SOP-005-synchronous-telehealth-visit/attachments/attachment-F-informed-consent-sexual-health.md` | 36 | Clinical pending marker referencing SOP-004 protocol for PT-141 |
| `compliance/sops/SOP-005-synchronous-telehealth-visit/attachments/attachment-G-informed-consent-longevity.md` | 43 | Clinical pending marker referencing SOP-004 self-administration protocol |
| `compliance/sops/SOP-007-prescribing-protocols/SOP-007-prescribing-protocols.md` | 99 | Out-of-scope: "governed by SOP-004 (Injection Education)" — correct path |
| `compliance/sops/SOP-007-prescribing-protocols/SOP-007-prescribing-protocols.md` | 733 | §10 Related Documents row for SOP-004 — correct path |
| `compliance/sops/SOP-007-prescribing-protocols/attachments/attachment-A-trt-prescribing-protocol.md` | 261 | Education protocol reference: "delivered per SOP-004... Protocol 001" |
| `compliance/sops/SOP-007-prescribing-protocols/attachments/attachment-B-glp1-gip-prescribing-protocol.md` | 396 | Education protocol reference: "delivered per SOP-004... Protocol 002" |
| `compliance/sops/SOP-007-prescribing-protocols/attachments/attachment-C-sexual-health-prescribing-protocol.md` | 211 | Links to `SOP-004-self-injection-training` (STALE PATH) |
| `compliance/sops/SOP-007-prescribing-protocols/attachments/attachment-D-longevity-prescribing-protocol.md` | 196 | Links to `SOP-004-self-injection-training` (STALE PATH) |
| `bloom-lead-aggregator/docs/compliance-notes.md` | 130 | Unrelated: "SOP-004: Deflection Template Review Cadence" — this is a lead-aggregator-internal numbering scheme, not the clinical SOP-004 |
| `Bloom-Metabolics/06_Intake-Forms/intake-forms-spec.md` | 256 | "Injection self-administration consent" — relevant context, not a direct SOP-004 reference |

**STALE PATH ALERT:** Four files under SOP-005 and SOP-007 reference SOP-004 using directory names `SOP-004-self-administration-protocols` or `SOP-004-self-injection-training`. The actual directory name on the SOP-004 branch is `SOP-004-injection-education`. These links will be broken even after merge and require path correction.

### Master Index State

- **Current branch (`sop/physician-named-and-phentermine-removed`):** No row for SOP-004. The master index jumps from SOP-003 to SOP-005.
- **SOP-004 branch (`sop/SOP-004-injection-education-v0.1`):** Contains an SOP-004 row:

```
| SOP-004 | Patient Self-Administration Injection Education | 0.1 | Draft (Provisional pending Covering Physician approval) | TBD | TBD | Covering Physician (TBD); operational delegation to Brian DeGuzman | Covering Physician (TBD) | [SOP-004](sops/SOP-004-injection-education/SOP-004-injection-education.md) |
```

The discrepancy is expected — the SOP-004 branch was never merged, so its master index update never reached the current branch.

### Git History

**a. Commits mentioning SOP-004:**
- `e9c92bf` — `[SOP-004] v0.1 — Patient Self-Administration Injection Education` (2026-05-04, on branch `sop/SOP-004-injection-education-v0.1`)

This is the only commit across all branches with "SOP-004" in the message.

**b. File path history:**
- `e9c92bf` — same commit as above. All 19 SOP-004 files were added in this single commit.

**c. Branch existence:**
- `sop/SOP-004-injection-education-v0.1` (local + remote `origin/sop/SOP-004-injection-education-v0.1`)
- `feature/injection-education-pages` (local + remote `origin/feature/injection-education-pages`) — extends SOP-004 with 7 additional commits adding web-rendered injection guide pages (Next.js `/inject/` routes, navigation, Tailwind brand tokens, peptide cards). This branch includes the SOP-004 commit plus frontend implementation.

**d. Stash check:**
No stash entries mentioning SOP-004 or injection.

### Orphan / Scratch Files

No markdown files on the current branch contain `sop_id: "SOP-004"` in their frontmatter or `SOP-004 — Injection Education` / `SOP-004 - Injection Education` in their title lines.

### Cross-Reference Audit

Cross-references to SOP-004 exist in **3 of the 6 active SOPs** on the current branch:

| SOP | File | Line(s) | Reference Type | Link Path Status |
| --- | --- | --- | --- | --- |
| SOP-001 | `cover-memo-physician-review-v2.md` | 87, 156, 194, 213 | Description, review timeline, signature list, package checklist | N/A (descriptive text, no file links) |
| SOP-005 | `SOP-005-synchronous-telehealth-visit.md` | 65, 87, 601 | Out-of-scope, dependencies, §10 Related Documents | **Correct** (`../SOP-004-injection-education/...`) |
| SOP-005 | `attachment-D-informed-consent-trt.md` | 27, 115 | Inline protocol link | **BROKEN** — uses `SOP-004-self-administration-protocols` |
| SOP-005 | `attachment-E-informed-consent-glp1-gip.md` | 27, 123 | Inline protocol link | **BROKEN** — uses `SOP-004-self-administration-protocols` |
| SOP-005 | `attachment-F-informed-consent-sexual-health.md` | 36 | Clinical pending marker | N/A (pending placeholder) |
| SOP-005 | `attachment-G-informed-consent-longevity.md` | 43 | Clinical pending marker | N/A (pending placeholder) |
| SOP-007 | `SOP-007-prescribing-protocols.md` | 99, 733 | Out-of-scope, §10 Related Documents | **Correct** (`../SOP-004-injection-education/...`) |
| SOP-007 | `attachment-A-trt-prescribing-protocol.md` | 261 | Education protocol reference (inline text) | N/A (text reference, not link) |
| SOP-007 | `attachment-B-glp1-gip-prescribing-protocol.md` | 396 | Education protocol reference (inline text) | N/A (text reference, not link) |
| SOP-007 | `attachment-C-sexual-health-prescribing-protocol.md` | 211 | Inline protocol link | **BROKEN** — uses `SOP-004-self-injection-training` |
| SOP-007 | `attachment-D-longevity-prescribing-protocol.md` | 196 | Inline protocol link | **BROKEN** — uses `SOP-004-self-injection-training` |

**SOPs with no SOP-004 references:** SOP-002, SOP-003, SOP-006 — as expected (these SOPs do not involve injectable medication education).

**4 broken links** will need path correction regardless of recovery approach.

### Attachments-Only Build State

The directory `compliance/sops/SOP-004-injection-education/attachments/` does not exist on the current branch. No partial build state.

### HTML / DOCX Build Output

`compliance/build/output/html/` exists but contains no SOP-004 artifacts. No SOP-004 DOCX or PDF files exist in the build output directory on the current branch. (The DOCX and PDF files live inside the SOP-004 branch's `attachments/` subdirectories alongside their Markdown source.)

---

## Recommendation to MSO Owner

### B. Recover SOP-004 from branch `sop/SOP-004-injection-education-v0.1`.

SOP-004 v0.1 is a **complete, committed artifact** — governing document (465 lines), 5 protocol attachments in 3 formats, revision log, signed directory, and website build prompt. It was built 4 days ago and has never been merged.

**Recovery steps:**

1. **Merge the SOP-004 branch** into the current working branch (or into `main` first, depending on your branch strategy):
   ```
   git merge sop/SOP-004-injection-education-v0.1
   ```
   This will add the `compliance/sops/SOP-004-injection-education/` directory and update `compliance/master-index.md` with the SOP-004 row.

2. **Apply the physician name update.** The SOP-004 branch was created before commit `0098784` (physician name swap to Dr. Michael Napolitano, MD). After merge, update all "Covering Physician (TBD)" references in SOP-004 files to "Dr. Michael Napolitano, MD" — consistent with the naming convention applied to SOP-001 through SOP-007 on the current branch.

3. **Fix the 4 broken cross-reference paths** in SOP-005 and SOP-007 attachments:
   - `SOP-004-self-administration-protocols` → `SOP-004-injection-education` (2 files in SOP-005)
   - `SOP-004-self-injection-training` → `SOP-004-injection-education` (2 files in SOP-007)

4. **Optionally merge `feature/injection-education-pages`** if you want the web-rendered injection guide pages (Next.js `/inject/` routes). This branch extends SOP-004 with frontend implementation. It can be merged separately or deferred.

**No fresh build required.** The artifact is intact and ready for recovery.

---

## Files Inspected

- `compliance/master-index.md` (current branch)
- `compliance/master-index.md` (on `sop/SOP-004-injection-education-v0.1` branch, via `git show`)
- `compliance/sops/SOP-004-injection-education/SOP-004-injection-education.md` (on SOP-004 branch, via `git show`)
- `compliance/sops/SOP-004-injection-education/revision-log.md` (on SOP-004 branch, via `git show`)
- `compliance/sops/SOP-001-document-control/attachments/cover-memo-physician-review-v2.md`
- `compliance/sops/SOP-005-synchronous-telehealth-visit/SOP-005-synchronous-telehealth-visit.md`
- `compliance/sops/SOP-005-synchronous-telehealth-visit/attachments/attachment-D-informed-consent-trt.md`
- `compliance/sops/SOP-005-synchronous-telehealth-visit/attachments/attachment-E-informed-consent-glp1-gip.md`
- `compliance/sops/SOP-005-synchronous-telehealth-visit/attachments/attachment-F-informed-consent-sexual-health.md`
- `compliance/sops/SOP-005-synchronous-telehealth-visit/attachments/attachment-G-informed-consent-longevity.md`
- `compliance/sops/SOP-007-prescribing-protocols/SOP-007-prescribing-protocols.md`
- `compliance/sops/SOP-007-prescribing-protocols/attachments/attachment-A-trt-prescribing-protocol.md`
- `compliance/sops/SOP-007-prescribing-protocols/attachments/attachment-B-glp1-gip-prescribing-protocol.md`
- `compliance/sops/SOP-007-prescribing-protocols/attachments/attachment-C-sexual-health-prescribing-protocol.md`
- `compliance/sops/SOP-007-prescribing-protocols/attachments/attachment-D-longevity-prescribing-protocol.md`
- `bloom-lead-aggregator/docs/compliance-notes.md`
- `Bloom-Metabolics/06_Intake-Forms/intake-forms-spec.md`
- All SOP directories under `compliance/sops/` (via glob and grep)
- Git history across all branches (via `git log --all`)
- `compliance/build/output/html/` directory listing

## Files NOT Inspected (out of scope)

- `node_modules/` — excluded from all searches
- `.git/` internals — only branch refs inspected, not object store
- `compliance/build/output/` rendered artifacts — directory listed but individual HTML files not opened (no SOP-004 matches found in listing)
- Vendor/third-party directories
- Binary files (`.docx`, `.pdf`) — existence confirmed via `git ls-tree` but contents not inspected

---

*Bloom Metabolics — Confidential*
*Diagnostic generated by Claude Code on 2026-05-08*
