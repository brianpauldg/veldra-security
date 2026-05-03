# Patient Portal Scope Decision

## Recommendation: Do NOT build /portal/* for launch

OptiMantra provides a built-in patient portal covering appointments, lab results, messaging, and prescriptions. Building a Bloom patient portal would create a confusing dual-portal experience.

## Current Patient Touchpoints (No Auth Required)
- /book — booking + Stripe payment
- /intake/trt or /intake/glp1 — intake form (session-gated)
- /booking — Calendly scheduling
- Email — receipts from Stripe, direct communication via brian@bloommetabolics.com

## Post-Launch Consideration (If Needed)
- /portal/consents — view/sign informed consents
- /portal/preferences — communication preferences (email, SMS opt-in/out)
- /portal/documents — download intake form copies, consent copies

## Boundary
OptiMantra = clinical patient portal (charts, labs, appointments, messaging, prescriptions)
Bloom = operational layer (intake, billing, compliance documentation)
Patients should NOT need to log into Bloom for clinical information.
