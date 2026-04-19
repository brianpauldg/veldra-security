# 14-Day Sprint to First Patient

---

## Day 1: Foundation

| Task | Owner | Deliverable |
|------|-------|-------------|
| Register bloommetabolics.com + .health domains | Founder | Domains secured |
| Register social handles (@bloommetabolics) | Founder | Instagram, X, LinkedIn, TikTok, Facebook |
| Create Stripe products (Consultation, TRT Std, TRT Prem, GLP-1 Core, GLP-1 Complete, Peptide, Bundle) | Founder | Stripe product IDs |
| Begin brand rename: package.json, .env, tailwind.config.ts (foundation files) | Dev | Foundation renamed |
| Draft provider job posting (MD/DO or NP with DEA, multi-state licenses) | Founder | Job post ready |
| Set up Trustpilot business page | Founder | Trustpilot profile live |

**Blocked if:** Registrar access unavailable, Stripe dashboard access unavailable

---

## Day 2: Brand + Legal

| Task | Owner | Deliverable |
|------|-------|-------------|
| Complete codebase rename: lib/ files, components, API routes | Dev | Core files renamed |
| Research and contact healthcare attorney | Founder | Attorney engaged or scheduled |
| Research compounding pharmacy partners (Empower, Hallandale, Precision) | Founder | Top 3 contacted |
| Research lab partners (Quest, Labcorp direct accounts) | Founder | Application started |
| Contact OpenLoop/Wheel for provider network (backup to direct recruitment) | Founder | Call scheduled |

**Blocked if:** Attorney not found, pharmacy partners unresponsive

---

## Day 3: Provider + Tech

| Task | Owner | Deliverable |
|------|-------|-------------|
| Post provider job on: LinkedIn, Indeed, PracticeMatch, medical job boards | Founder | Jobs live |
| Reach out to 5-10 providers directly (LinkedIn, medical networks) | Founder | Outreach sent |
| Complete codebase rename: all app/ pages, platform/ code | Dev | Pages renamed |
| Configure SendGrid email templates (welcome, confirmation, intake reminder) | Dev | 5 templates live |
| Update .env.local with Stripe product IDs | Dev | Checkout functional |
| Deploy website to Vercel with new branding | Dev | Site live at temp URL |

**Blocked if:** No provider responses, Vercel deployment issues

---

## Day 4: Integrations

| Task | Owner | Deliverable |
|------|-------|-------------|
| Connect Stripe webhooks (subscription events) | Dev | Webhooks functional |
| Test end-to-end booking flow: form → Stripe → success page → Calendly | Dev | Flow working |
| Configure SMS templates in Twilio/GHL (booking confirm, reminders) | Dev | 3 SMS templates |
| Complete .agents/ rename + update product-marketing-context.md | Dev | Marketing skills updated |
| Connect domain: bloommetabolics.com → Vercel deployment | Founder | Domain connected |
| Follow up on pharmacy partner outreach | Founder | 1+ pharmacy in discussion |

---

## Day 5: Integrations + Content

| Task | Owner | Deliverable |
|------|-------|-------------|
| Set up Google Ads account | Founder | Account created |
| Install Google Analytics + Meta Pixel on site | Dev | Tracking live |
| Create Google Ads campaigns (TRT keywords, GLP-1 keywords) — paused | Founder | Campaigns ready |
| Configure retargeting audiences (quiz completers, page visitors) | Dev | Audiences created |
| Test lead capture → GHL → Qualifier Agent pipeline | Dev | Pipeline working |
| Follow up on lab partner applications | Founder | 1+ lab partner confirmed |

---

## Day 6: Content + Marketing

| Task | Owner | Deliverable |
|------|-------|-------------|
| Deploy email nurture sequences in GHL/SendGrid (welcome, post-booking) | Dev | Sequences live |
| Create social media profiles with branding, bio, link | Founder | Profiles live |
| Write + publish 2 blog posts (SEO foundation) | Founder + AI | Posts published |
| Create "Testosterone Optimization Guide" PDF lead magnet | Founder + AI | PDF ready |
| Follow up on provider recruitment | Founder | Interviews scheduled |

---

## Day 7: Marketing + Legal

| Task | Owner | Deliverable |
|------|-------|-------------|
| Attorney delivers first drafts: telehealth consent, terms, privacy policy | Attorney | Drafts for review |
| Review and provide feedback on legal documents | Founder | Feedback sent |
| Write + publish 1 more blog post | Founder + AI | Post published |
| Complete rename of all documentation files | Dev | Full rename complete |
| Create partner outreach list (20 local gyms, medspas, wellness centers) | Founder | List ready |

**Blocked if:** Attorney behind schedule

---

## Day 8: Clinical Readiness

| Task | Owner | Deliverable |
|------|-------|-------------|
| Provider signed (contract + credentialing docs) | Founder + Provider | Provider on board |
| Verify provider licenses in target states (TX, FL, CA, AZ, CO) | Founder | License verification complete |
| Select and sign up for EHR (Cerbo recommended) | Founder + Provider | EHR account created |
| Begin EHR configuration (intake forms, lab panels, Rx templates) | Provider + Dev | Configuration started |
| Request BAA from Supabase (upgrade to Pro plan) | Dev | BAA requested |

**Blocked if:** No provider signed — escalate to OpenLoop/Wheel for interim coverage

---

## Day 9: Clinical Configuration

| Task | Owner | Deliverable |
|------|-------|-------------|
| Complete EHR configuration (protocols, templates, workflows) | Provider + Dev | EHR ready for patients |
| Finalize consent documents (attorney-approved) | Attorney + Founder | Consents finalized |
| Configure pharmacy ordering process (manual or integrated) | Provider + Ops | Pharmacy process documented |
| Configure lab ordering process (Quest/Labcorp requisitions) | Provider + Ops | Lab process documented |
| Document clinical protocols (TRT, GLP-1) — provider-approved | Provider | Protocols documented |

---

## Day 10: Full Testing

| Task | Owner | Deliverable |
|------|-------|-------------|
| End-to-end test: lead capture → booking → payment → intake forms → provider review | All | Full flow verified |
| Test email sequences (welcome, booking, intake reminder) | Dev | Emails verified |
| Test SMS notifications (booking confirm, reminders) | Dev | SMS verified |
| Test dashboard functionality (alerts, tasks, patient views) | Dev + Provider | Dashboard functional |
| Fix any bugs found during testing | Dev | Bugs fixed |

---

## Day 11: Polish + Prep

| Task | Owner | Deliverable |
|------|-------|-------------|
| Fix remaining bugs and UX issues | Dev | Site polished |
| Review all copy for compliance (qualified claims, disclaimers) | Founder + Attorney | Copy approved |
| Prepare "founding patient" offer (10-20% discount for first 10 patients) | Founder | Offer ready |
| Draft personal outreach messages for warm network | Founder | Messages drafted |
| Enable Google Ads campaigns (test with $25/day) | Founder | Ads running |

---

## Day 12: Soft Launch — Warm Network

| Task | Owner | Deliverable |
|------|-------|-------------|
| Send personal outreach to 20-30 warm contacts | Founder | Messages sent |
| Post on personal LinkedIn about launch | Founder | Post published |
| Offer founding patient rate to first 5-10 | Founder | Offers sent |
| Monitor all systems for errors | Dev | Systems stable |
| First consultation booked (target) | All | 🎯 First booking |

---

## Day 13: First Consultations

| Task | Owner | Deliverable |
|------|-------|-------------|
| Conduct first 2-5 consultations | Provider | Consults completed |
| Order first lab panels | Provider | Labs ordered |
| Collect feedback from first patients | Founder | Feedback documented |
| Iterate on any process friction points | All | Improvements made |
| Begin partner outreach (5 emails to gyms/medspas) | Founder | Outreach started |

---

## Day 14: Public Launch 🚀

| Task | Owner | Deliverable |
|------|-------|-------------|
| Increase Google Ads budget to $50-100/day | Founder | Ads scaled |
| Social media launch announcement | Founder | Posts published |
| Send launch email to full lead list | Dev | Email sent |
| First prescription sent to pharmacy (target) | Provider | 🎯 First prescription |
| Monitor conversion funnel metrics | All | Dashboard checked |
| Celebrate first paying patient | All | 🎯🎯🎯 |

---

## Critical Path (What MUST Happen)

```
Day 1: Domain + Stripe → Day 3: Deploy site → Day 5: Test booking flow
                                                        ↓
Day 1-3: Provider recruitment ──→ Day 8: Provider signed → Day 9: EHR configured
                                                                    ↓
Day 2: Attorney engaged ──→ Day 7: Consent drafts ──→ Day 9: Consents finalized
                                                                    ↓
Day 2: Pharmacy outreach ──→ Day 5: Pharmacy confirmed → Day 9: Process documented
                                                                    ↓
Day 2: Lab outreach ──→ Day 5: Lab confirmed ──→ Day 9: Process documented
                                                                    ↓
                                                    Day 10: Full testing
                                                                    ↓
                                                    Day 12: Soft launch
                                                                    ↓
                                                    Day 14: FIRST PATIENT
```
