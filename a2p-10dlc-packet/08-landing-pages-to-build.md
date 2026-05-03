# A2P 10DLC — Landing Pages to Build Before Submission

## Overview

A2P carrier reviewers click every URL in every sample message during campaign review. Any link that returns a 404, a login wall, a generic placeholder, or a page without matching brand identity triggers **automatic rejection**. All pages listed below must be live, publicly accessible (no authentication required to view), and branded with "Bloom Metabolics" before the campaign is submitted.

Requirements for every page:

- Returns HTTP 200 from any IP, any browser, including incognito
- Displays "Bloom Metabolics" branding (logo, brand colors, header)
- Is indexable (no `noindex` meta tag, no `X-Robots-Tag: noindex` header)
- Loads correctly on mobile (carriers test mobile rendering)
- Deployed to production — not a staging or preview URL

---

## Required Pages

### 1. `/portal` — Patient Portal Landing Page

**URL:** `https://bloommetabolics.com/portal`

**Purpose:** Generic patient portal entry point. Any patient (pre- or post-onboarding) clicking a portal link in an appointment confirmation SMS lands here. The page explains that the clinical portal is hosted on OptiMantra and provides a login button.

**Required content elements:**

- **Header:** Bloom Metabolics brand header with logo and navigation back to homepage
- **Headline:** "Patient Portal Access"
- **Body copy:** "Your patient portal is hosted securely on OptiMantra, our clinical platform. Log in to view appointments, messages, lab orders, and care documents."
- **Primary CTA:** Button labeled "Log in to OptiMantra" linking to the OptiMantra login URL
- **Support fallback:** "Having trouble accessing your portal? Contact us at [SUPPORT EMAIL] or [SUPPORT PHONE]."
- **Footer:** Standard footer with links to `/privacy` and `/terms`

**A2P review concern addressed:** Sample Message #1 (Appointment Confirmation) links to this page. Reviewers verify the link resolves to a branded page on the declared domain — not a third-party login screen.

**Expected behavior:** Static page. No authentication required to view. The OptiMantra button is the only element that leads to an authenticated experience.

---

### 2. `/portal/labs` — Lab Order Access Page

**URL:** `https://bloommetabolics.com/portal/labs`

**Purpose:** Patients with active lab orders click this link from the lab reminder SMS. The page explains how to access their lab order in OptiMantra and what to do next.

**Required content elements:**

- **Header:** Bloom Metabolics brand header with logo and navigation
- **Headline:** "Your Lab Order"
- **Body copy:** "Your provider has placed a lab order for you. You can view the details and any preparation instructions in your patient portal. Bring your lab order to any participating lab location at your convenience."
- **Primary CTA:** Button labeled "View Lab Order in OptiMantra" linking to the OptiMantra login URL
- **Secondary info:** "If you have questions about your lab order or need help finding a lab location, contact our care team at [SUPPORT EMAIL] or [SUPPORT PHONE]."
- **Footer:** Standard footer with links to `/privacy` and `/terms`

**A2P review concern addressed:** Sample Message #4 (Lab Reminder) links to this page. Reviewers verify it's a care-related destination, not a marketing page, and that it matches the declared domain.

**Expected behavior:** Static page. No authentication required to view. No specific lab vendor named on the page.

---

### 3. `/portal/messages` — Care Team Messaging Page

**URL:** `https://bloommetabolics.com/portal/messages`

**Purpose:** Patients clicking the post-consultation check-in SMS land here. The page explains how to reach their care team via secure messaging in OptiMantra.

**Required content elements:**

- **Header:** Bloom Metabolics brand header with logo and navigation
- **Headline:** "Message Your Care Team"
- **Body copy:** "Secure messaging with your care team is available in your patient portal. Log in to send a message, ask questions about your care plan, or request a follow-up."
- **Primary CTA:** Button labeled "Log in to OptiMantra" linking to the OptiMantra login URL
- **Secondary contact option:** A simple contact form (name, email, message) or plain-text contact info for patients who haven't yet been onboarded to OptiMantra. Label: "Not yet set up in the portal? Reach us directly."
- **Footer:** Standard footer with links to `/privacy` and `/terms`

**A2P review concern addressed:** Sample Message #5 (Post-Consult Check-In) links to this page. Reviewers verify the link points to a legitimate care communication channel on the declared domain.

**Expected behavior:** Static page with optional contact form. No authentication required to view the page itself.

---

### 4. `/intake/continue` — Intake Form Continuation Page

**URL:** `https://bloommetabolics.com/intake/continue`

**Purpose:** Leads who started but didn't complete the web intake form click this link from the qualification follow-up SMS. The page lets them resume or restart their intake.

**Required content elements:**

- **Header:** Bloom Metabolics brand header with logo and navigation
- **Headline:** "Finish Your Intake"
- **Body copy:** "You're almost done. Complete your intake form so we can confirm your consultation appointment."
- **Primary content:** The intake form itself (embedded or linked), or a button labeled "Continue Your Intake" that resumes the form. If the form platform supports resume-by-link, use that. If not, a fresh form with pre-population is acceptable.
- **What happens next:** Brief note — "After you submit your intake form, our team will review your information and confirm your consultation appointment."
- **Footer:** Standard footer with links to `/privacy` and `/terms`

**A2P review concern addressed:** Sample Message #3 (Qualification Follow-Up) links to this page. This is the highest-scrutiny sample message. Reviewers verify the page matches the described action ("finish your intake form"), is on the declared domain, and is not a marketing funnel.

**Expected behavior:** Functional form page. No authentication required. The form should work end-to-end.

---

### 5. `/prepare` — Pre-Consultation Preparation Page

**URL:** `https://bloommetabolics.com/prepare`

**Purpose:** Patients with confirmed consultations click this link from the T-24h appointment reminder SMS. The page tells them what to have ready for their telehealth visit.

**Required content elements:**

- **Header:** Bloom Metabolics brand header with logo and navigation
- **Headline:** "Preparing for Your Consultation"
- **Body copy — what to have ready:**
  - Government-issued photo ID
  - List of current medications and supplements
  - Recent lab results (if available)
  - List of symptoms or health concerns you'd like to discuss
- **Body copy — video call tips:**
  - Use a quiet, private space with good lighting
  - Test your camera and microphone before the appointment
  - Use a stable internet connection (Wi-Fi preferred over cellular)
  - Have your device charged or plugged in
- **Rescheduling info:** "Need to reschedule? Contact us at [SUPPORT EMAIL] or [SUPPORT PHONE] as soon as possible."
- **Footer:** Standard footer with links to `/privacy` and `/terms`

**A2P review concern addressed:** Sample Message #2 (Appointment Reminder) links to this page. Reviewers verify it's a legitimate care-preparation resource on the declared domain.

**Expected behavior:** Static page. No authentication required.

---

### 6. `/contact` — Support / Contact Page

**URL:** `https://bloommetabolics.com/contact`

**Purpose:** Linked from HELP keyword auto-responses and general support inquiries. Provides multiple ways to reach the practice.

**Required content elements:**

- **Header:** Bloom Metabolics brand header with logo and navigation
- **Headline:** "Contact Us"
- **Contact form:** Name, email, phone (optional), message — functional and delivering to monitored inbox
- **Support email:** [SUPPORT EMAIL]
- **Support phone:** [SUPPORT PHONE]
- **Business address:** Full mailing address
- **Hours of operation:** Business hours for support responses
- **Footer:** Standard footer with links to `/privacy` and `/terms`

**A2P review concern addressed:** The HELP keyword response (File 02) links to this page. Reviewers verify the support URL is live and provides real contact information.

**Expected behavior:** Functional form page. No authentication required.

**NOTE:** Brian — confirm whether `/contact` already exists on bloommetabolics.com. If it does, verify it meets the requirements above. If it's already live and functional, no rebuild needed.

---

### 7. `/privacy` and `/terms` — Privacy Policy and Terms of Service

**URLs:** `https://bloommetabolics.com/privacy` and `https://bloommetabolics.com/terms`

**Purpose:** Linked from the web form consent checkbox (File 04), HELP keyword responses, and the footer of every other landing page. Required by TCPA and carrier policy.

**Required content elements:**

- `/privacy` — Full privacy policy, including the SMS/text messaging section from `05-privacy-policy-sms-section.md` integrated under its own heading. Must include the HIPAA Compliance paragraph.
- `/terms` — Full terms of service covering telehealth services, SMS communications, and website use.

**A2P review concern addressed:** Carrier reviewers click privacy and terms links in the opt-in consent text. Both must resolve to live pages with substantive legal content — not placeholder pages.

**Expected behavior:** Static pages. No authentication required.

**NOTE:** Brian — confirm whether `/privacy` and `/terms` already exist. If they do, verify:
- `/privacy` includes the SMS section from File 05 (the full "SMS/Text Messaging Communications" section)
- `/privacy` includes the HIPAA Compliance paragraph
- Both pages are publicly accessible without login

---

## Build Checklist

Run through every item before A2P submission. Every box must be checked.

- [ ] `/portal` returns HTTP 200 in incognito browser
- [ ] `/portal/labs` returns HTTP 200 in incognito browser
- [ ] `/portal/messages` returns HTTP 200 in incognito browser
- [ ] `/intake/continue` returns HTTP 200 in incognito browser
- [ ] `/prepare` returns HTTP 200 in incognito browser
- [ ] `/contact` returns HTTP 200 in incognito browser
- [ ] `/privacy` returns HTTP 200 in incognito browser AND contains the SMS section from File 05
- [ ] `/terms` returns HTTP 200 in incognito browser
- [ ] All pages display "Bloom Metabolics" branding (logo, brand name, brand colors)
- [ ] All pages load correctly on mobile (carriers test mobile rendering)
- [ ] No page requires login or authentication to view
- [ ] No page returns a soft-404 (page loads but displays "not found" or empty content)
- [ ] All OptiMantra deep-links from these pages work end-to-end (login page loads)

---

## Implementation Notes

- **Keep it simple.** These can be straightforward static pages — no complex interactivity needed. But they must look like a real telehealth practice: brand header, brand colors, logo, professional layout, footer.
- **Use the existing design system.** Match the Bloom Metabolics site template so reviewers see consistent branding across the main site and these pages.
- **Header navigation** on every page should link back to the homepage.
- **Footer** on every page should include links to `/privacy` and `/terms`.
- **Deploy to production.** Pages must be on the live production domain (`bloommetabolics.com`), not a staging environment, preview deployment, or localhost. Carrier reviewers will visit these URLs during review.
- **If using Vercel:** Ensure pages are not behind preview-deployment authentication or branch-specific URLs. They must be accessible at the canonical `bloommetabolics.com` domain.
- **Test from outside your network.** Use an incognito window on a different network (phone hotspot, VPN) to confirm there's no geo-restriction, IP allowlist, or CDN issue blocking access.
- **No `noindex` tags.** Carrier review bots may respect robots directives. All pages should be indexable.
