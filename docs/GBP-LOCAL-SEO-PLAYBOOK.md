# Bloom Metabolics — Google Business Profile + Local SEO Playbook
**Owner:** Brian DeGuzman
**Last updated:** 2026-06-06
**Goal:** Rank for high-intent local search ("TRT clinic Orange County," "GLP-1 clinic Irvine," "medical weight loss Orange County," "hormone optimization near me," "peptide therapy Orange County") and convert those visitors into waitlist signups.

This file is the operating manual. Work it top-to-bottom in the first 90 days, then move to maintenance cadence.

---

## What's already shipped (codebase)

The site now has the on-page foundation a local SEO play needs. You don't need to touch code for any of this — it's live:

- **Landing pages (15 new URLs):**
  - `/orange-county` — OC hub
  - `/orange-county/trt`, `/orange-county/glp1`, `/orange-county/medical-weight-loss`, `/orange-county/hormone-optimization`, `/orange-county/peptide-therapy`
  - `/irvine`, `/irvine/trt`, `/irvine/glp1`, `/irvine/hormone-optimization`
  - `/newport-beach`, `/newport-beach/trt`, `/newport-beach/glp1`
  - `/costa-mesa`, `/costa-mesa/trt`, `/costa-mesa/glp1`
  - `/anaheim`, `/anaheim/trt`
  - `/huntington-beach`, `/huntington-beach/glp1`
- **Schema:** `MedicalBusiness` (root) + per-page `MedicalClinic` with `areaServed`, `FAQPage`, `BreadcrumbList`, `WebSite` with SearchAction.
- **Sitemap:** all new pages included with priorities.
- **Internal linking:** "Service Areas" column added to global footer (every page on the site now links to OC + 5 city pages — biggest single internal-linking signal you can ship in a day).
- **Performance:** AVIF/WebP, long-cache headers for static assets, `optimizePackageImports` for `lucide-react` and `framer-motion`, server-rendered location pages with no framer-motion (884 B page size, ~97 kB First Load JS — Squarespace-tier).
- **Vanity SEO redirects:** `/trt-clinic-orange-county`, `/glp1-irvine`, etc. → canonical city/service pages.

---

## Section 1 — Google Business Profile (do this today)

GBP is non-negotiable for "near me" rankings. Even though Bloom is telehealth-only, the profile establishes a verifiable California-licensed practice with an Orange County service area. Without it, you cannot rank in the local pack.

### 1.1 Create / claim the profile
1. Go to `business.google.com` and sign in with your business Google account (use `brian@bloommetabolics.com` if it's a Workspace account — otherwise create one).
2. **Business name:** `Bloom Metabolics`. Do not append keywords ("Bloom Metabolics — TRT Clinic Orange County") — Google will suspend you for keyword stuffing.
3. **Business category (primary):** `Medical Clinic` (closest match — `Telehealth Service` is not yet a primary category in GBP).
4. **Additional categories (add all that apply):**
   - `Weight Loss Service`
   - `Hormone Replacement Therapy Clinic` (if available in your region)
   - `Men's Health Physician`
   - `Endocrinologist` (only if you have a board-certified endocrinologist on staff)
5. **Location:** Choose "**No, I serve customers at their location**" (this is the telehealth path). This hides a street address from search results but still lets you rank in the service area.
6. **Service area:** Add each city we have a landing page for, in this order:
   - Orange County
   - Irvine, CA
   - Newport Beach, CA
   - Costa Mesa, CA
   - Anaheim, CA
   - Huntington Beach, CA
   - Santa Ana, CA
   - Tustin, CA
   - Mission Viejo, CA
   - Laguna Beach, CA
   - Yorba Linda, CA
   - Fullerton, CA
   - Aliso Viejo, CA
   - Lake Forest, CA
7. **Contact:**
   - **Phone:** Get a local Orange County area code number (714, 949, or 657). Forward to your real line. Burner numbers and toll-free 800s suppress your rank in local pack — local-area-code numbers do not.
   - **Website:** `https://bloommetabolics.com/orange-county` (point GBP to the OC hub, not the homepage — this passes the relevance signal to the hub page).
   - **Appointment link:** `https://bloommetabolics.com/join`
8. **Hours:** Set actual operating hours. Telehealth practices commonly run 9 a.m.–7 p.m. weekdays, 10 a.m.–4 p.m. Saturday. Closed Sundays. Be honest — Google penalizes "always open" claims that don't match reality.
9. **From the business (description):** 750 chars max. Use this:

> Bloom Metabolics is a physician-managed telehealth practice serving Orange County and all of California. We provide testosterone replacement therapy (TRT), GLP-1 weight loss programs (semaglutide, tirzepatide), hormone optimization, and peptide therapy through secure video consultations with licensed physicians. Patients across Irvine, Newport Beach, Costa Mesa, Anaheim, Huntington Beach, and surrounding cities complete labs at local Quest and LabCorp draw sites — no clinic visits required. Cash-pay membership starting at $149/mo. Founded by Brian DeGuzman, RN. Three-tier membership: Essentials, Core, Signature.

### 1.2 Verification

GBP verification for service-area businesses is typically video. Be prepared to:
- Walk Google through your physical operating location (this can be a home office for a service-area business — that's fine).
- Show your business license and any state telehealth registration documents.
- Show your branded sign / logo on a laptop or door.
- Avoid postcard verification — it adds 1–2 weeks. Push for video.

### 1.3 Profile completeness (do all 8 — these are direct ranking factors)

- [ ] Logo uploaded (square, 250×250 minimum)
- [ ] Cover photo (1080×608, brand-aligned)
- [ ] 10+ interior photos (workspace, lab kits, branded supplies, founder portrait) — even for telehealth, photos kill objections and signal an active business
- [ ] Short video introduction (≤30 seconds, founder on camera)
- [ ] Services added (one per service, see section 1.4)
- [ ] Products added (membership tiers as products, see section 1.5)
- [ ] Q&A pre-seeded with 5 questions (see section 1.6)
- [ ] First post published (see section 1.7)

### 1.4 Services to add (copy-paste into GBP "Services")

For each service, add the name + a 300-char description + your landing-page URL.

1. **Testosterone Replacement Therapy (TRT)**
   - Description: Physician-managed TRT for men in Orange County. Comprehensive labs, individualized protocols, ongoing care. Telehealth visits with California-licensed physicians. No clinic visits required. Cash-pay membership from $149/mo plus $199/mo TRT add-on.
   - URL: `https://bloommetabolics.com/orange-county/trt`

2. **GLP-1 Weight Loss (Semaglutide, Tirzepatide)**
   - Description: Physician-supervised GLP-1 therapy for Orange County. Semaglutide and tirzepatide programs. Comprehensive labs. Dose management. Compounded options sourced from licensed pharmacies. Telehealth, no clinic visits.
   - URL: `https://bloommetabolics.com/orange-county/glp1`

3. **Medical Weight Loss**
   - Description: Physician-led medical weight loss program for Orange County residents. GLP-1 therapy when indicated. Comprehensive metabolic labs. Body composition tracking. Cash-pay membership, HSA/FSA accepted.
   - URL: `https://bloommetabolics.com/orange-county/medical-weight-loss`

4. **Hormone Optimization**
   - Description: Comprehensive hormone panels and individualized protocols. TRT, thyroid optimization, cortisol management. Physician oversight. Built around your labs, not a template.
   - URL: `https://bloommetabolics.com/orange-county/hormone-optimization`

5. **Peptide Therapy**
   - Description: Physician-supervised peptide protocols for recovery, longevity, and metabolic support. Sourced from licensed compounding pharmacies. Telehealth visits with California-licensed physicians.
   - URL: `https://bloommetabolics.com/orange-county/peptide-therapy`

### 1.5 Products to add (membership tiers)

- **Bloom Essentials** — $149/mo. Entry-tier membership with care team messaging and basic lab review.
- **Bloom Core** — $299/mo. Flagship tier with clinician visits, comprehensive labs, priority response.
- **Bloom Signature** — $599/mo. Concierge tier with direct provider access, labs included, in-home phlebotomy.

### 1.6 Pre-seeded Q&A (post these to your own profile, then answer)

This seeds the SERP-facing FAQ panel. Post a question, then answer it from your business account. Do this on day 1.

1. **Q:** Do you serve patients in Irvine? **A:** Yes — Bloom Metabolics serves patients throughout Irvine and all of Orange County. Our telehealth model means no commute to UCI or Hoag — your physician meets you by secure video, and labs are completed at any Quest or LabCorp in Irvine.
2. **Q:** Are you a real TRT clinic, or just a tele-prescribing site? **A:** We're a physician-managed practice — California-licensed physicians review every patient. We require comprehensive labs (total and free testosterone, CBC, CMP, lipid panel, PSA when indicated) before prescribing. We do follow-up labs every 8–12 weeks.
3. **Q:** Do you accept insurance? **A:** Bloom Metabolics is a cash-pay membership practice. We don't bill insurance, which keeps pricing transparent and avoids coverage delays. Most patients use HSA or FSA dollars.
4. **Q:** How fast can I start TRT? **A:** Most patients complete intake the same day, book a video consult within 48 hours, complete labs within a week, and start protocol within 10–14 days of joining.
5. **Q:** Do you do compounded semaglutide? **A:** When clinically indicated and a patient meets eligibility, we work with licensed 503A and 503B compounding pharmacies. Brand-name GLP-1s are also available. Your physician will recommend the right option.

### 1.7 GBP posts (publish weekly — Google ranks active profiles higher)

A "GBP post" is essentially a status update visible in your knowledge panel. Post 1 per week minimum.

**Week 1 (this week):** "Now serving Orange County" announcement + photo + CTA to /orange-county
**Week 2:** "How TRT telehealth works in Orange County" + link to /orange-county/trt
**Week 3:** "GLP-1 weight loss for Irvine patients" + link to /irvine/glp1
**Week 4:** "What's included in your Core membership" + link to /pricing
**Week 5:** Patient story or testimonial (if available — must include "Individual results vary" disclosure)
**Week 6:** "Newport Beach patients: how labs work" + link to /newport-beach/trt
**Week 7:** Education post — one TRT myth busted
**Week 8:** Peptide therapy primer + link to /orange-county/peptide-therapy

Post template (paste into GBP Posts → What's New):
> [Headline ~60 chars]
> [Body 250–300 chars: include city name + service + value prop. End with a CTA.]
> [CTA button text]: "Learn more" or "Book a consult"
> [Link]: the relevant landing page

---

## Section 2 — Reviews (the second-biggest local ranking factor)

Reviews are the second-largest GBP ranking signal after profile relevance/proximity. You need a review acquisition system, not a one-time push.

### 2.1 Goal cadence
- **Month 1:** 10 reviews (from beta patients, friends-of-business who actually consulted, founding members)
- **Month 2:** +10 (20 total)
- **Month 3:** +10 (30 total)
- **Steady state from Month 4:** ~4 new reviews per week

30+ reviews with a 4.7+ avg is the threshold to consistently appear in the OC local pack for hormone/weight-loss terms.

### 2.2 The review request system

After every consult or 30-day milestone:
1. Send an automated email + SMS at the 7-day-post-consult mark.
2. Use a direct review link: `https://search.google.com/local/writereview?placeid=[YOUR_PLACE_ID]`. Get this from your GBP dashboard after verification.
3. Template:

> Hey [first name],
>
> It's Brian from Bloom. Quick ask: if you've had a good experience so far, would you mind leaving us a Google review? It's the single biggest thing that helps other Orange County patients find us.
>
> One link, one minute: [direct review URL]
>
> If anything's been less than great, hit reply — I want to hear it directly.
>
> Thanks,
> Brian

### 2.3 Responding to reviews

Reply to every single review — positive and negative. Google ranks profiles with high response rates higher. Include the city name in at least 1/3 of your replies (natural keyword reinforcement).

**Positive reply template:**
> Thanks for the review, [first name]. Glad the [Irvine / Newport Beach / OC] team has been able to support your [TRT / GLP-1] program. — Brian

**Negative reply template:**
> Thanks for flagging this, [first name]. I'd like to fix it — please email me directly at brian@bloommetabolics.com. — Brian

### 2.4 What NOT to do (HIPAA-safe)

- Never confirm someone is a patient in a public reply
- Never reference specific conditions, medications, dosing, or outcomes
- Never use auto-generated AI responses that reveal patient details
- Disable "Auto-Reply" in GBP — every reply should be reviewed by a human

---

## Section 3 — Citations + NAP consistency

You need consistent **N**ame / **A**ddress / **P**hone across the web. Inconsistency tanks local rankings.

### 3.1 The canonical NAP

- **Name:** `Bloom Metabolics`
- **Address:** Service-area only (do not list a physical address publicly until you have a clinic). On GBP, this is the "I serve customers at their location" path.
- **Phone:** [Get a 714/949/657 local number]
- **Website:** `https://bloommetabolics.com`

### 3.2 Citation push (do in this order, week-by-week)

**Week 1 (priority):**
- [ ] Google Business Profile
- [ ] Apple Business Connect (`businessconnect.apple.com`)
- [ ] Bing Places (`bingplaces.com`)
- [ ] Facebook Business Page

**Week 2 (medical-specific):**
- [ ] Healthgrades
- [ ] Vitals
- [ ] WebMD provider directory
- [ ] Zocdoc (optional — they take a cut; only worth it if you want their lead flow)

**Week 3 (general):**
- [ ] Yelp (yes, even for telehealth — Yelp drives "near me" intent searches)
- [ ] Yellow Pages
- [ ] BBB (Better Business Bureau)
- [ ] Nextdoor Business (huge for OC neighborhoods specifically)

**Week 4 (long tail):**
- [ ] LinkedIn Company Page
- [ ] Chamber of Commerce (Irvine, Newport Beach — local chamber memberships often include directory listings)
- [ ] Local Orange County business directories: OC Register Business Directory, OC Chamber of Commerce

### 3.3 Verify consistency

Every 90 days, search `"Bloom Metabolics"` + `"714-XXX-XXXX"` (your phone) on Google. Every result should show the same NAP. If you find old or mismatched data, fix it immediately.

---

## Section 4 — On-page SEO maintenance (monthly)

The pages are shipped. Keeping them ranking takes light, regular work.

### 4.1 First 30 days
- [ ] Submit the sitemap (`https://bloommetabolics.com/sitemap.xml`) to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Add Google Analytics 4 conversion goals: waitlist signup, intake start, intake complete, consult booked
- [ ] Verify all 15 city/service landing pages are indexed (Search Console → URL Inspection)
- [ ] Run PageSpeed Insights on `/orange-county/trt` and confirm Core Web Vitals are green (LCP <2.5s, CLS <0.1, INP <200ms)

### 4.2 Monthly content cadence
- 1 new blog post per week (existing `/blog` route) — long-form, locally relevant, links into the city pages
- 1 GBP post per week
- 1 set of 10 review replies per week
- Refresh photo gallery monthly (new images signal an active business)

### 4.3 Local content ideas (write these for the blog → link to city pages)

- "TRT in Orange County: cost, process, and what to expect" → link to `/orange-county/trt`
- "GLP-1 clinics near Irvine: telehealth vs. in-person — what's right for you" → link to `/irvine/glp1`
- "Hormone optimization in Newport Beach: a 2026 guide" → link to `/newport-beach/trt`
- "Medical weight loss in Orange County: how it works in 2026" → link to `/orange-county/medical-weight-loss`
- "Where to get labs in Costa Mesa for a telehealth TRT program" → link to `/costa-mesa/trt`

Each post: 1500–2500 words, exact-match H1, internal links to city page + service page, one external authoritative source (NIH, Mayo, Endocrine Society), patient persona structure.

---

## Section 5 — Tracking (set this up day 1 — without it you're blind)

### 5.1 Google Search Console
- [ ] Verify ownership of `https://bloommetabolics.com`
- [ ] Submit sitemap
- [ ] Create the saved filter: `query contains "orange county" OR "irvine" OR "newport" OR "costa mesa" OR "anaheim" OR "huntington"` — this is your weekly local-keyword scorecard

### 5.2 GA4 events to wire
- `waitlist_signup` (existing)
- `intake_started`
- `intake_completed`
- `consult_booked`
- `city_page_view` — set as a custom event filtered by URL path `/orange-county`, `/irvine`, etc. This lets you see which city pages convert.

### 5.3 GBP Insights (weekly)
- Searches that found you (queries column) — this is your real-time keyword research goldmine
- Profile views, direction requests, call requests, website clicks
- Most-viewed photos

### 5.4 Weekly dashboard (15 min review every Monday)
- Total new GBP queries (target: 200+ in first month)
- Total impressions in Search Console for local queries
- New reviews (count + avg rating)
- Calls + waitlist signups attributed to GBP/local

---

## Section 6 — The 90-day execution calendar

### Week 1 (this week)
- [ ] Create + claim GBP. Complete profile to 100%.
- [ ] Submit sitemap to Search Console + Bing.
- [ ] Get OC local phone number (714/949/657).
- [ ] Citations: Apple, Bing, Facebook.
- [ ] First 5 review requests sent.
- [ ] First GBP post published.

### Week 2
- [ ] GBP verification completed.
- [ ] Citations: Healthgrades, Vitals, WebMD.
- [ ] Second 5 review requests.
- [ ] Second GBP post.
- [ ] First blog post published (TRT in OC — long form, internal link to /orange-county/trt).

### Week 3
- [ ] Citations: Yelp, BBB, Nextdoor.
- [ ] Third batch of review requests.
- [ ] Third GBP post.
- [ ] Second blog post.

### Week 4
- [ ] Citations: LinkedIn, OC Chamber, local directories.
- [ ] Reach 10 reviews.
- [ ] Fourth GBP post.
- [ ] Third blog post.
- [ ] Run PageSpeed Insights on all 15 landing pages. Document any LCP/CLS issues.

### Weeks 5–8 — Acquisition mode
- 4 new reviews per week (cumulative target by end of week 8: 25)
- 1 GBP post per week
- 1 blog post per week (with internal link to a city/service page)
- A/B test review request templates (track conversion rate)
- Audit your top 3 OC competitors weekly (their GBP posts, their reviews, their new pages) — copy what's working

### Weeks 9–12 — Optimization mode
- Expand landing pages: add Santa Ana, Tustin, Mission Viejo if data shows demand
- Add testimonial proof to each city page (compliant — "Individual results vary")
- Build city-specific lead magnets (e.g., "TRT cost calculator: Irvine vs. Newport") → email capture → nurture sequence
- First Google Ads campaign: bid on city + service exact-match (low-volume, high-intent — "TRT clinic Irvine," "GLP-1 clinic Newport Beach")

---

## Section 7 — Compliance reminders (do not skip)

This is healthcare. The cost of an FTC/FDA violation dwarfs any SEO gain.

- All testimonials must include "Individual results vary."
- No "lose 30 lbs in 30 days" promises. Use "may support" and "many patients report."
- GLP-1: include the FDA April 1 2026 compounded disclosure on every GLP-1 page (already wired into `<GLP1ComplianceDisclosure />`).
- TRT: must include "Eligibility determined by a licensed provider. Not everyone qualifies." (already in the template)
- Never list specific patient outcomes without HIPAA-cleared consent
- GBP replies: never confirm someone is a patient publicly

The compliance language already exists in `app/compliance/` and `components/GLP1ComplianceDisclosure.tsx`. Use it.

---

## Section 8 — Quick reference: target queries → landing pages

| Search query | Target page |
| --- | --- |
| TRT clinic Orange County | `/orange-county/trt` |
| GLP-1 clinic Orange County | `/orange-county/glp1` |
| Medical weight loss Orange County | `/orange-county/medical-weight-loss` |
| Hormone optimization Orange County | `/orange-county/hormone-optimization` |
| Hormone optimization near me | `/orange-county/hormone-optimization` |
| Peptide therapy Orange County | `/orange-county/peptide-therapy` |
| TRT clinic Irvine | `/irvine/trt` |
| GLP-1 clinic Irvine | `/irvine/glp1` |
| TRT Newport Beach | `/newport-beach/trt` |
| GLP-1 Newport Beach | `/newport-beach/glp1` |
| TRT Costa Mesa | `/costa-mesa/trt` |
| GLP-1 Costa Mesa | `/costa-mesa/glp1` |
| TRT Anaheim | `/anaheim/trt` |
| GLP-1 Huntington Beach | `/huntington-beach/glp1` |

---

## Owner notes

If you read only one section: **Section 1 (GBP setup) + Section 2 (reviews) are 80% of the local SEO result**. The on-page work is already done. The thing that wins or loses is whether you actually create the GBP this week and start collecting reviews.

Do not pay an SEO agency $2,500/mo to do what this document tells you to do. The agency will charge you $2,500/mo to do roughly Sections 1–5 with delays. If you have 6 hours per week and this doc, you can run it yourself for the first 6 months.

Build the GBP today. Reply to every review. Publish one blog post a week. Ship one GBP post a week. In 90 days you'll be in the OC local pack for at least 3 of the 5 target queries.

— End —
