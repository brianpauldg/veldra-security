# Automation Map — All Workflows

---

## Lead Capture Automations

### 1. Form Submission → Lead Processing
**Trigger:** POST `/api/leads` (any form)
**Actions:**
1. Validate and enrich lead data (geo, device, UTM)
2. GHL: Upsert contact with tags
3. n8n: Emit `bloom.lead.captured`
4. Telegram: Alert ops (if high-intent)
5. Email: Lead alert to ops
6. Qualifier Agent: Score 1-100, assign segment
7. GHL: Update pipeline stage based on score
**Tools:** Next.js API, GHL, n8n, Telegram, SendGrid, Qualifier Agent

### 2. Quiz Completion → Personalized Routing
**Trigger:** Quiz submit with score
**Actions:**
1. Score calculation + results page display
2. Lead captured with `variant=quiz` and score
3. If score > 70: Show "You may be a candidate" + booking CTA
4. If score 40-70: Show educational content + gentle booking CTA
5. If score < 40: Show "Talk to your doctor" + resources
6. Email: Tailored sequence based on quiz result
**Tools:** Next.js, GHL, SendGrid

### 3. High-Intent Lead Alert
**Trigger:** Qualifier Agent scores lead ≥ 80
**Actions:**
1. Telegram: Immediate alert with lead details
2. Email: Priority lead notification to ops
3. GHL: Create follow-up task (call within 2 hours)
4. Email to lead: Priority booking CTA
**Tools:** n8n, Telegram, SendGrid, GHL

---

## Booking Automations

### 4. Booking Confirmed
**Trigger:** Calendly event created + Stripe payment confirmed
**Actions:**
1. GHL: Update pipeline → "Booked", add tags
2. Email: Booking confirmation with details
3. SMS: Booking confirmation
4. Email: Intake forms link
5. Schedule: 24hr reminder email + SMS
**Tools:** Calendly webhook, Stripe, GHL, SendGrid, Twilio

### 5. Pre-Appointment Reminder
**Trigger:** 24 hours before appointment
**Actions:**
1. Email: Reminder with video link + prep checklist
2. SMS: "Your consultation is tomorrow at {time}"
3. Check: Intake forms complete? If no → additional reminder
**Tools:** n8n scheduler, SendGrid, Twilio

### 6. No-Show Recovery
**Trigger:** Appointment time + 15 min, patient didn't join
**Actions:**
1. Wait 1 hour
2. Email: "We missed you — reschedule here" with link
3. GHL: Pipeline → "No-Show"
4. GHL: Create ops task: "Follow up with no-show"
5. 24hr later: SMS "Would you like to reschedule?"
**Tools:** n8n, SendGrid, Twilio, GHL

### 7. Abandoned Booking Recovery
**Trigger:** Booking page visited but no payment within 1 hour
**Actions:**
1. 1hr: Email "You're one step away"
2. 24hr: Email "Your assessment results are waiting"
3. 72hr: Email "Last chance" with urgency
**Tools:** n8n (timer), SendGrid, attribution tracking

---

## Intake Automations

### 8. Intake Forms Incomplete Reminder
**Trigger:** Forms sent but not completed > 24 hours
**Actions:**
1. 24hr: Email reminder with direct link
2. 48hr: SMS reminder
3. 72hr: Final email "Complete before your appointment"
**Tools:** n8n scheduler, SendGrid, Twilio

### 9. Red Flag Detection
**Trigger:** Contraindication screening answer = Yes
**Actions:**
1. Alert: Provider notification (email + dashboard alert)
2. Patient message: "A provider will review your intake before we proceed"
3. GHL: Pipeline → "Clinical Review Required"
4. GHL: Create task for provider review
5. Hold: All automated progression paused
**Tools:** n8n, SendGrid, GHL, Dashboard alerts

### 10. Intake Complete
**Trigger:** All forms submitted
**Actions:**
1. Email: "Intake complete — your provider is preparing"
2. GHL: Pipeline → "Provider Review"
3. Dashboard: Add to provider review queue
4. Provider: Email notification with intake summary
**Tools:** n8n, SendGrid, GHL

---

## Clinical Automations

### 11. Provider Approves Treatment
**Trigger:** Provider marks case "Approved" in dashboard/EHR
**Actions:**
1. Patient email: "Your treatment plan is ready"
2. Prescription: Sent to pharmacy via EHR
3. GHL: Pipeline → "Prescription Sent"
4. Stripe: Trigger subscription (if not already active)
**Tools:** EHR, SendGrid, Stripe, GHL

### 12. Labs Ordered Notification
**Trigger:** Provider orders labs in EHR
**Actions:**
1. Patient email: Lab instructions, fasting requirements, locator link
2. Patient SMS: "Labs ordered — visit any Quest/Labcorp"
3. GHL: Update `lab_status` → "ordered"
**Tools:** EHR webhook, SendGrid, Twilio, GHL

### 13. Lab Results Received
**Trigger:** Lab partner returns results to EHR
**Actions:**
1. System: Flag any out-of-range values
2. Provider: Email notification "Lab results ready for review"
3. Dashboard: Add to provider review queue
4. If CRITICAL value: Immediate provider alert (SMS + email)
5. GHL: Update `lab_status` → "results_received"
**Tools:** EHR webhook, n8n, Dashboard, SendGrid, Twilio

### 14. Critical Lab Value Alert
**Trigger:** Lab value outside critical range
**Actions:**
1. Immediate: Provider SMS + email with value details
2. Dashboard: CRITICAL alert created
3. GHL: Create urgent task "Contact patient within 24 hours"
4. Audit: Log critical value alert
**Tools:** n8n, Twilio, SendGrid, Dashboard, GHL

---

## Retention Automations

### 15. Monthly Check-In Due
**Trigger:** 30 days since last check-in (or treatment start)
**Actions:**
1. Email: Check-in form link
2. In-app: Notification
3. If no response in 3 days: SMS reminder
4. If no response in 7 days: Provider-initiated outreach
**Tools:** n8n scheduler, SendGrid, Twilio, GHL

### 16. Refill Processing
**Trigger:** 7 days before estimated supply depletion
**Actions:**
1. Patient email: "Your refill is due — confirm your address"
2. If no side effects reported: Auto-request to pharmacy
3. If side effects reported: Route to provider first
4. Pharmacy ships → tracking notification
5. GHL: Update `refill_due_date`
**Tools:** n8n scheduler, SendGrid, EHR, Pharmacy API, GHL

### 17. Missed Check-In Escalation
**Trigger:** Check-in overdue > 3 days
**Actions:**
1. Day 3: Email reminder
2. Day 7: SMS "We haven't heard from you"
3. Day 14: Phone task created for ops
4. Day 21: Provider outreach email
5. GHL: Increase churn risk score
**Tools:** n8n, SendGrid, Twilio, GHL

### 18. Cancellation Request Flow
**Trigger:** Patient submits cancellation form
**Actions:**
1. If reason = "Side effects": Route to provider, offer protocol review
2. If reason = "Cost": Offer pause or discounted rate (one-time)
3. If reason = "Not seeing results": Offer provider review + protocol adjustment
4. If patient confirms cancel: Process cancellation, exit email
5. 30 days later: Win-back email
**Tools:** n8n, GHL, Stripe, SendGrid

---

## Revenue Automations

### 19. Failed Payment Recovery
**Trigger:** Stripe `invoice.payment_failed` webhook
**Actions:**
1. Immediate: Email "Payment failed — update your card"
2. Day 3: Stripe auto-retry
3. Day 5: SMS "Action needed on your account"
4. Day 7: Final email + account pause warning
5. Day 10: Pause subscription, notify patient
**Tools:** Stripe webhook, n8n, SendGrid, Twilio

### 20. Subscription Renewed
**Trigger:** Stripe `invoice.payment_succeeded` webhook (recurring)
**Actions:**
1. Email: "Thanks for continuing with us" + upcoming check-in reminder
2. If anniversary (3, 6, 12 months): Request Trustpilot review
**Tools:** Stripe webhook, SendGrid
