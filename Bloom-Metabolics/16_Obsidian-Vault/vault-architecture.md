# Obsidian Vault Architecture — Bloom Metabolics Brain

---

## Vault Folder Structure

```
Bloom-Metabolics-Vault/
├── 00-Command-Center/
│   ├── Dashboard.md
│   ├── Launch-Tracker.md
│   ├── Decision-Log.md
│   ├── Blockers.md
│   └── Meeting-Notes/
├── 01-Brand/
│   ├── Brand-Identity.md
│   ├── Voice-Guide.md
│   ├── Visual-Identity.md
│   ├── Domain-Strategy.md
│   └── Competitor-Positioning.md
├── 02-Strategy/
│   ├── Business-Model.md
│   ├── Offer-Ladder.md
│   ├── Patient-Journey.md
│   ├── Pricing-Strategy.md
│   ├── Competitor-Teardown.md
│   └── Growth-Experiments/
├── 03-Operations/
│   ├── Vendor-Stack.md
│   ├── EHR-Selection.md
│   ├── Pharmacy-Partners.md
│   ├── Lab-Partners.md
│   └── Data-Architecture.md
├── 04-Compliance/          ← RESTRICTED (no agent access)
│   ├── HIPAA-Checklist.md
│   ├── State-Licensing.md
│   ├── Consent-Frameworks.md
│   ├── BAA-Tracker.md
│   └── Prohibited-Patterns.md
├── 05-Clinical/            ← RESTRICTED (no agent access)
│   ├── TRT-Protocol.md
│   ├── GLP1-Protocol.md
│   ├── Peptide-Protocols.md
│   ├── Lab-Reference-Ranges.md
│   └── Adverse-Event-Procedures.md
├── 06-Intake/              ← RESTRICTED (PHI-adjacent)
│   ├── Form-Specs.md
│   ├── Booking-Flow.md
│   └── Branching-Rules.md
├── 07-Website/
│   ├── Sitemap.md
│   ├── Design-System.md
│   ├── Copy-Library.md
│   └── SEO-Foundation.md
├── 08-CRM/
│   ├── Pipeline-Schema.md
│   ├── Contact-Fields.md
│   ├── Tags-Taxonomy.md
│   └── Automation-Map.md
├── 09-Dashboard/
│   ├── Dashboard-Spec.md
│   ├── Agent-Permissions.md
│   └── Metrics-Definitions.md
├── 10-Growth/
│   ├── Acquisition-Channels.md
│   ├── Email-Sequences.md
│   ├── Ad-Campaigns.md
│   ├── Content-Calendar.md
│   └── Experiments/
├── 11-Partnerships/
│   ├── Partner-Pipeline.md
│   ├── Outreach-Templates.md
│   └── Referral-Program.md
├── 12-SOPs/
│   ├── SOP-Index.md
│   ├── Clinical-SOPs/
│   ├── Operations-SOPs/
│   └── Marketing-SOPs/
├── 13-Launch/
│   ├── 14-Day-Sprint.md
│   ├── 30-Day-Roadmap.md
│   ├── 90-Day-Roadmap.md
│   └── Launch-Checklist.md
├── MOCs/
│   ├── MOC-Brand.md
│   ├── MOC-Strategy.md
│   ├── MOC-Operations.md
│   ├── MOC-Compliance.md
│   ├── MOC-Clinical.md
│   ├── MOC-Growth.md
│   └── MOC-Launch.md
└── Templates/
    ├── Daily-Note.md
    ├── Weekly-Review.md
    ├── Decision-Record.md
    ├── SOP-Template.md
    ├── Experiment-Log.md
    ├── Meeting-Note.md
    └── Partner-Profile.md
```

---

## Naming Conventions

- PascalCase-With-Hyphens for note names (e.g., `Brand-Identity.md`)
- MOC prefix for Maps of Content (e.g., `MOC-Brand.md`)
- Dates in YYYY-MM-DD format
- No spaces in filenames
- Folders numbered for sort order (00-13)

---

## Tag Taxonomy

```
#status/active    #status/blocked    #status/complete    #status/review
#priority/critical    #priority/high    #priority/medium    #priority/low
#area/brand    #area/clinical    #area/compliance    #area/growth    #area/ops    #area/tech
#type/sop    #type/decision    #type/meeting    #type/experiment    #type/vendor    #type/reference
#phi/none    #phi/restricted
```

---

## Frontmatter Template

```yaml
---
title: Note Title
created: 2026-04-15
updated: 2026-04-15
status: active
priority: high
area: brand
type: reference
phi: none
tags: [status/active, area/brand, type/reference, phi/none]
---
```

---

## MCP Access Model

| Folder | Agent Access | Reason |
|--------|-------------|--------|
| 00-Command-Center | READ + WRITE | Operational coordination |
| 01-Brand | READ + WRITE | Marketing and content generation |
| 02-Strategy | READ + WRITE | Strategic context for agents |
| 03-Operations | READ ONLY | Reference for operational decisions |
| 04-Compliance | ❌ RESTRICTED | Contains compliance-sensitive frameworks |
| 05-Clinical | ❌ RESTRICTED | Contains clinical protocols, PHI-adjacent |
| 06-Intake | ❌ RESTRICTED | Contains PHI-adjacent form specs |
| 07-Website | READ ONLY | Reference for content agents |
| 08-CRM | READ ONLY | Reference for automation agents |
| 09-Dashboard | READ ONLY | Metrics definitions |
| 10-Growth | READ + WRITE | Campaign planning, content creation |
| 11-Partnerships | READ + WRITE | Outreach coordination |
| 12-SOPs | READ ONLY | Process reference |
| 13-Launch | READ ONLY | Timeline reference |
| MOCs | READ ONLY | Navigation reference |
| Templates | READ ONLY | Template reference |

---

## Template: Daily Note

```markdown
---
title: Daily Note — {{date}}
created: {{date}}
type: daily
tags: [type/daily]
---

# {{date}}

## Today's Focus
- [ ] Priority 1:
- [ ] Priority 2:
- [ ] Priority 3:

## Metrics Check
- Active patients:
- MRR:
- New leads today:
- Consults booked:

## Blockers
-

## Decisions Made
-

## Notes
-

## Tomorrow
-
```

---

## Template: Weekly Review

```markdown
---
title: Weekly Review — Week of {{date}}
created: {{date}}
type: weekly
tags: [type/weekly]
---

# Week of {{date}}

## Wins
1.
2.
3.

## Metrics
| Metric | This Week | Last Week | Change |
|--------|-----------|-----------|--------|
| Active patients | | | |
| New patients | | | |
| MRR | | | |
| Churn | | | |
| CAC | | | |
| Trustpilot score | | | |

## Challenges
1.
2.

## Decisions Needed
1.
2.

## Next Week Priorities
1.
2.
3.

## Blockers
-
```

---

## Template: Decision Record

```markdown
---
title: Decision — {{title}}
created: {{date}}
type: decision
status: active
area:
tags: [type/decision, status/active]
---

# Decision: {{title}}

## Context
What situation or question prompted this decision?

## Options Considered
1. **Option A:** Description, pros, cons
2. **Option B:** Description, pros, cons
3. **Option C:** Description, pros, cons

## Decision
What was decided and why?

## Consequences
What are the expected outcomes? What risks are accepted?

## Review Date
When should this decision be revisited?
```

---

## Template: SOP

```markdown
---
title: SOP — {{title}}
created: {{date}}
type: sop
area:
status: active
tags: [type/sop, status/active]
---

# SOP: {{title}}

## Purpose
Why does this procedure exist?

## Trigger
What initiates this procedure?

## Owner
Who is responsible?

## Steps
1.
2.
3.

## Tools Used
-

## Compliance Notes
-

## Escalation Criteria
When should this be escalated, and to whom?

## Review Schedule
How often is this SOP reviewed?
```

---

## MOC Example: MOC-Launch

```markdown
---
title: MOC — Launch
created: 2026-04-15
type: moc
tags: [type/moc, area/launch]
---

# Map of Content: Launch

## Sprint Plan
- [[14-Day-Sprint]]
- [[30-Day-Roadmap]]
- [[90-Day-Roadmap]]
- [[Launch-Checklist]]

## Blocked Dependencies
- [[Blockers]]

## Key Decisions
- [[Decision — Brand Name]]
- [[Decision — EHR Selection]]
- [[Decision — Pharmacy Partner]]

## SOPs for Launch
- [[SOP — New Lead Processing]]
- [[SOP — Consultation Booking]]
- [[SOP — Patient Intake]]
- [[SOP — Lab Order Processing]]
- [[SOP — Provider Review Prescription]]
- [[SOP — Medication Fulfillment]]

## Metrics
- [[Dashboard-Spec]]
- [[Metrics-Definitions]]

## Related MOCs
- [[MOC-Strategy]]
- [[MOC-Operations]]
- [[MOC-Growth]]
- [[MOC-Compliance]]
```
