# E-Signature Provider Options — Post-Launch Decision

## Current Implementation
In-app signature pad capturing signature as base64 PNG. Stored encrypted in Supabase. Content hash (SHA-256) of consent document stored for integrity verification.

## Option 1: DocuSign HIPAA
- **Cost**: ~$40/mo (Standard plan with BAA)
- **BAA**: Available on Standard+ plans
- **Integration**: REST API, well-documented
- **Pros**: Industry standard, strong legal standing, audit trail, HIPAA BAA included
- **Cons**: Monthly cost, API complexity, external dependency
- **Timeline**: 1-2 weeks integration

## Option 2: SignNow with BAA
- **Cost**: ~$25/mo (Business plan)
- **BAA**: Available on request
- **Integration**: REST API
- **Pros**: Lower cost than DocuSign, BAA available
- **Cons**: Less brand recognition than DocuSign, may require negotiation for BAA
- **Timeline**: 1-2 weeks integration

## Option 3: In-House with Audit Certificate (Current)
- **Cost**: $0 (already built)
- **Legal posture**: Adequate for telehealth consent if combined with: timestamp, IP address, content hash, encrypted signature storage, audit trail
- **Pros**: No external dependency, no monthly cost, full control
- **Cons**: No third-party verification, may be questioned in dispute
- **Recommendation**: Acceptable for launch. Upgrade to DocuSign if patient volume exceeds 100/month or if legal counsel recommends.

## Recommendation
**Launch with Option 3 (in-house)**. Evaluate DocuSign at 3-month mark based on patient volume and legal feedback.
