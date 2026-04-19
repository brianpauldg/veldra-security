# Inbound + Outbound Acquisition System

---

## INBOUND CHANNELS

### 1. Website Funnel (Day 1)
**Flow:** Landing Page → Quiz → Results → Book → Pay → Intake
**Conversion targets:** Landing → Quiz: 30%, Quiz → Results: 80%, Results → Book: 15%, Book → Pay: 60%
**Optimization:** A/B test headlines, CTA copy, quiz length. Reduce form fields. Show pricing early.

### 2. SEO Foundation (Day 1-7, ongoing)
**Immediate actions:**
- Title tags and meta descriptions for all 19 pages
- Schema markup (already have SchemaMarkup.tsx — update for Bloom Metabolics)
- Sitemap.xml and robots.txt (already exist at `/app/sitemap.ts`, `/app/robots.ts`)
- Google Search Console setup
- Target keywords: "TRT online," "testosterone therapy telehealth," "GLP-1 weight loss," "semaglutide online," "online TRT clinic"
- Long-tail: "best online TRT clinic for men over 40," "GLP-1 telehealth near me"

**Content plan (Month 1):**
- 5 blog posts targeting high-intent keywords
- City-specific landing pages (future — programmatic SEO)
- "TRT vs [alternative]" comparison content

### 3. Google Ads (Day 3-5)
**Budget:** $50-100/day to start
**Campaign structure:**
- Campaign 1: TRT keywords (exact + phrase match)
  - "online TRT," "testosterone therapy online," "TRT telehealth," "low testosterone treatment"
  - Landing page: `/trt` with quiz CTA
- Campaign 2: GLP-1 keywords
  - "semaglutide online," "GLP-1 weight loss," "weight loss telehealth"
  - Landing page: `/glp1` with quiz CTA
- Campaign 3: Brand (once brand is established)
  - "Bloom Metabolics," brand misspellings

**Ad copy framework:**
- Headline 1: [Service] + [Benefit] (e.g., "TRT Online — Feel Like Yourself Again")
- Headline 2: [Price] + [Trust Signal] (e.g., "$149/mo — Licensed Physicians")
- Headline 3: [CTA] (e.g., "Free Assessment — Start Today")
- Description: Include "Comprehensive Labs," "Cancel Anytime," "Medication Delivered"

**Compliance:** No health outcome claims in ads. Use "may support," "physician-managed." Include disclaimers where required by Google Health Ads policy.

### 4. Lead Magnets (Day 5-10)
- **Free TRT Assessment** (existing quiz — primary magnet)
- **Free GLP-1 Eligibility Check** (existing quiz)
- **"Testosterone Optimization Guide" PDF** — Email gate, educational content, positions brand as authority
- **"Understanding Your Lab Results" Guide** — Educational, builds trust in our lab-first approach

### 5. Retargeting (Day 7+)
- **Meta Pixel:** Install on all pages, fire on quiz completion, booking, and checkout
- **Google Remarketing:** Tag quiz completers who didn't book
- **Retargeting ads:** "Still thinking about it?" with social proof + offer
- **Budget:** $20-30/day

### 6. Email Nurture (Day 3-7)
See `/12_Growth/email-sequences.md` for full sequences.
- Welcome sequence: 5 emails over 14 days
- Post-booking sequence: 3 emails
- Reengagement sequence: 3 emails for leads gone cold

### 7. SMS Nurture (Day 5-10)
- Appointment reminders (24hr, 1hr)
- Intake form completion reminders
- Lab instructions and reminders
- Refill notifications
- All messages < 160 characters, include opt-out

### 8. Missed Booking Recovery (Day 5)
- 1 hour after abandoned booking: Email "You're one step away"
- 24 hours: Email "Your assessment results are waiting"
- 72 hours: Email "Last chance" with limited-time context
- Track: Which step they dropped off (quiz, booking form, payment)

### 9. Abandoned Intake Recovery (Day 7)
- 24 hours after incomplete intake: Email "Complete your intake to schedule your consultation"
- 48 hours: SMS reminder
- 72 hours: Final email with support contact

---

## OUTBOUND CHANNELS

### 1. Referral Partner Strategy (Day 5-14)
**Target partners:**
- Gyms and CrossFit boxes (men 30-55 who already invest in fitness)
- Wellness centers and medspas (clients interested in optimization)
- Chiropractors (see patients with fatigue, recovery issues)
- Functional medicine practitioners (aligned philosophy, may not prescribe hormones)
- Personal trainers (direct access to target demographic)
- Nutritionists/dietitians (GLP-1 referrals)

**Value proposition for partners:**
- Referral fee: $75-100 per converted patient
- Co-branded landing page with partner tracking
- Monthly referral reports
- Partner-exclusive patient pricing (optional)

**Outreach cadence:**
- Day 1: Personalized email (why we're reaching out, value prop, low-ask CTA)
- Day 3: Follow-up email (case study or specific benefit)
- Day 7: Phone call or LinkedIn message
- Day 14: Final email (direct ask or let it rest)

### 2. Physician/Provider Partnerships (Day 10+)
**Target:** PCPs who see patients with low-T or weight management needs but don't specialize in hormone therapy
**Value prop:** "Refer your patients who need hormone or weight management expertise. We handle the specialty care and keep you in the loop."
**Model:** Structured referral with shared care updates (with patient consent)

### 3. Direct/Warm Network (Day 1-3) ← HIGHEST PRIORITY
**This is the fastest path to first patient.**
- Personal outreach to friends, family, colleagues in target demo
- LinkedIn post announcing the launch
- Ask existing network for referrals
- Offer founding patient rate (10-20% discount for first 10 patients)

---

## PRIORITY RANKING (First 14 Days)

| Priority | Channel | Days | Expected Result | Cost |
|----------|---------|------|-----------------|------|
| 1 | Direct/warm network | 1-3 | First 3-5 patients | $0 |
| 2 | Google Ads (TRT + GLP-1) | 3-5 | 10-20 leads/week | $50-100/day |
| 3 | Quiz funnel optimization | 1-2 | 15-30% quiz→book conversion | $0 (dev time) |
| 4 | Email nurture sequences | 3-7 | 10-20% lead→book conversion | $0 (SendGrid free tier) |
| 5 | Local partner outreach | 5-14 | 1-2 partners signed | $0 (time) |
| 6 | Retargeting | 7+ | 5-10% recovery of quiz dropoffs | $20-30/day |
| 7 | SEO/content | Ongoing | Long-term organic traffic | $0 (time) |
| 8 | Social media | Ongoing | Brand awareness, trust | $0 (time) |

---

## Funnel Metrics to Track

| Metric | Target | Tool |
|--------|--------|------|
| Website visitors | 500+/week (paid + organic) | Google Analytics |
| Quiz starts | 20%+ of visitors | Custom event |
| Quiz completions | 80%+ of starts | Custom event |
| Quiz → Book | 15%+ | Custom event |
| Book → Pay | 60%+ | Stripe |
| Pay → Intake complete | 90%+ | Supabase |
| Intake → Active patient | 85%+ | EHR/Supabase |
| Cost per lead | <$30 | Google Ads |
| Cost per acquisition | <$200 | Blended |
| Email open rate | 40%+ | SendGrid |
| Email click rate | 5%+ | SendGrid |
