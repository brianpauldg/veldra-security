# CRM Pipeline Schema — GoHighLevel

---

## Pipeline 1: Lead Acquisition

| Stage | Trigger | Automation |
|-------|---------|-----------|
| New Lead | Form submission captured | Welcome email, Qualifier Agent scoring |
| Qualified — HOT (80-100) | Qualifier Agent score | Priority email + booking CTA, Telegram alert, ops follow-up task |
| Qualified — WARM (50-79) | Qualifier Agent score | Welcome sequence (5 emails/14 days) |
| Qualified — COLD (0-49) | Qualifier Agent score | Educational nurture sequence |
| Contacted | Ops manual or auto | — |
| Interest Confirmed | Reply or engagement | Booking CTA email |
| Booking Pending | Clicked booking link | Reminder if no booking in 48hr |
| Booked | Calendly event confirmed | Confirmation email + SMS, intake forms link |
| No-Show | Missed appointment | 1hr follow-up email, reschedule link, ops task |
| Lost | Unresponsive > 30 days or explicit decline | Archive, stop sequences |

---

## Pipeline 2: Patient Onboarding

| Stage | Trigger | Automation |
|-------|---------|-----------|
| Consultation Completed | Provider marks consult done | Post-consult email (lab instructions) |
| Intake Forms Pending | Intake link sent | 24hr, 48hr, 72hr reminders |
| Intake Complete | All forms submitted | Provider review queue notification |
| Labs Ordered | Provider orders in EHR | Lab instructions email + SMS |
| Labs Received | Results in EHR | Provider notification, dashboard alert for out-of-range |
| Provider Review | Provider reviewing case | — |
| Approved | Provider approves treatment | Patient notified, subscription selection |
| Prescription Sent | E-prescription to pharmacy | Patient email: "Treatment is being prepared" |
| Medication Shipped | Pharmacy ships | Tracking email + SMS |
| Active Patient | Medication delivered, treatment started | Welcome-to-treatment email, schedule first check-in |

---

## Pipeline 3: Active Treatment

| Stage | Trigger | Automation |
|-------|---------|-----------|
| Active | Treatment ongoing | Monthly check-in email + form |
| Check-In Due | 30 days since last check-in | Email + in-app notification |
| Check-In Complete | Patient submits check-in form | Provider review if flags, otherwise auto-acknowledge |
| Refill Due | 7 days before supply runs out | Auto-request + patient confirmation |
| Refill Processed | Pharmacy confirms | Tracking email |
| Labs Due | Per protocol schedule | Lab reminder email + instructions |
| Labs Complete | Results received | Provider review notification |
| Protocol Adjustment | Provider modifies protocol | Patient notified of changes |

---

## Pipeline 4: Retention

| Stage | Trigger | Automation |
|-------|---------|-----------|
| At Risk | Churn score > 60, missed check-ins, payment failure | Provider outreach, retention offer |
| Contacted | Retention outreach sent | — |
| Retained | Patient re-engages | Resume active treatment pipeline |
| Paused | Patient requests pause | Pause subscription, schedule resume check-in |
| Cancellation Requested | Patient submits cancel form | Retention workflow: reason-based response |
| Cancelled | Cancellation confirmed | Exit email, data retention per policy |
| Win-Back Attempt | 30 days post-cancel | Win-back email (new content or offer) |
| Won Back | Patient reactivates | Re-enter active treatment pipeline |
| Lost | Unresponsive to win-back | Archive |

---

## Contact Custom Fields

| Field Name | Type | Purpose |
|-----------|------|---------|
| service_interest | Dropdown: TRT, GLP-1, Peptides, General | Which service they're interested in |
| quiz_score | Number (0-100) | Assessment quiz score |
| qualification_segment | Dropdown: HOT, WARM, COLD | Qualifier Agent segment |
| treatment_track | Dropdown: TRT, GLP-1, Both, Peptides | Actual treatment track |
| subscription_plan | Dropdown: consultation, trt_standard, trt_premium, glp1_core, glp1_complete, peptide, bundle | Current plan |
| subscription_status | Dropdown: trial, active, past_due, paused, cancelled | Stripe sync |
| provider_assigned | Text | Provider name |
| lab_status | Dropdown: not_ordered, ordered, pending_results, results_received, reviewed | Current lab status |
| intake_status | Dropdown: not_started, in_progress, complete | Intake progress |
| last_check_in_date | Date | Last monthly check-in |
| next_check_in_date | Date | Next scheduled check-in |
| refill_due_date | Date | Next medication refill |
| churn_risk_score | Number (0-100) | Predictive churn score |
| state | Dropdown: US states | For licensing compliance |
| attribution_source | Text | UTM source |
| attribution_medium | Text | UTM medium |
| attribution_campaign | Text | UTM campaign |
| landing_page | Text | First page visited |
| referrer | Text | Referring URL |
| gclid | Text | Google click ID |
| fbclid | Text | Facebook click ID |
| partner_referral | Text | Referring partner name |

---

## Tag Taxonomy

**Source Tags:**
`website-lead`, `quiz-lead`, `referral`, `partner-[name]`, `ad-google`, `ad-meta`, `organic`, `direct`

**Service Tags:**
`interest-trt`, `interest-glp1`, `interest-peptides`, `interest-general`

**Status Tags:**
`intake-pending`, `intake-complete`, `labs-pending`, `labs-received`, `active-treatment`, `refill-due`, `at-risk`

**Segment Tags:**
`hot-lead`, `warm-lead`, `cold-lead`

**Device Tags:**
`device-mobile`, `device-desktop`, `device-tablet`
