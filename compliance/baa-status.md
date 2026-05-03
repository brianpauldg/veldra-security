# Business Associate Agreement (BAA) Status

All vendors handling PHI require executed BAAs under HIPAA. Status below is UNCONFIRMED until Brian provides written confirmation.

| Vendor | Service | PHI Exposure | BAA Status | How to Obtain |
|--------|---------|-------------|------------|---------------|
| **Supabase** | Database (patient records, intake forms, audit logs) | YES — stores all clinical data | UNCONFIRMED | Upgrade to Pro plan ($25/mo); BAA available on Pro+ |
| **Stripe** | Payments (customer email, name, treatment metadata) | YES — name, email, service interest in metadata | UNCONFIRMED | Contact Stripe Support → request BAA |
| **Vercel** | Hosting (server-side routes handle PHI in memory) | YES — PHI passes through server functions | UNCONFIRMED | Vercel Enterprise plan includes BAA; verify current plan |
| **Anthropic** | AI agents (patient data accessed via /api/clinic/agents) | YES — agents query full patient records | UNCONFIRMED | Contact Anthropic sales → request BAA |
| **GoHighLevel** | CRM (lead name, email, phone, service interest) | PARTIAL — marketing leads with health interest signals | UNCONFIRMED | Contact GHL support → request BAA |
| **Calendly** | Scheduling (patient name, email via embed) | MINIMAL — scheduling data only | UNCONFIRMED | Calendly Teams plan includes BAA |
| **OptiMantra** | EHR (full clinical records — system of record) | YES — all clinical data | UNCONFIRMED | OptiMantra is HIPAA-compliant; BAA included with subscription |

## Notes
- BAAs are legally binding agreements, not software features
- Without executed BAAs, disclosing PHI to these vendors violates HIPAA
- Supabase Pro plan BAA is the highest priority since it stores all patient data
