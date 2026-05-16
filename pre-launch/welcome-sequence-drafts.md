# Bloom Metabolics — Pre-Launch Waitlist Email Sequence
**Status:** Implementation-ready · **Date:** 2026-05-16
**Purpose:** Convert waitlist signups into founding members on launch day.
**Why this is the highest-ROI move:** A cold waitlist converts at ~3%; a nurtured one at 15–25%. On a 1,000-person list that is ~30 vs. ~180–250 founding members — roughly **$12K vs. $72–100K in month-one recurring revenue**. This is a one-time build that multiplies launch revenue 5–8×.

---

## Setup Checklist (do this first)

- [ ] Pick an ESP with tags + automations: **Kit (ConvertKit)**, Customer.io, or Klaviyo.
- [ ] Connect the website's **Free Assessment** form and **Join Waitlist** form → ESP.
- [ ] Set the sending identity to a **real human**: `Brian — Bloom Metabolics <brian@bloommetabolics.com>`. Not "no-reply." Replies should reach Brian's inbox.
- [ ] Create one automation triggered by **opt-in** (assessment completion OR waitlist signup).
- [ ] Create merge fields: `{{first_name}}`, `{{assessment_result}}`, `{{primary_interest}}` (TRT / GLP-1 / peptides / multiple).
- [ ] Create tags: `interest-trt`, `interest-glp1`, `interest-peptides`, `engaged` (opened/clicked ≥2), `cold` (no engagement by Email 5).
- [ ] Fill the remaining bracketed placeholders before going live: `[specialty]` and `[X] years` (Dr. Napolitano's credentials), plus `[X] spots` in Email 7 (the live remaining-count, set at send time).
- [ ] Confirm peptides appear in the live tier system before Email 6 (see note in COMPETITOR-REPORT.md).
- [ ] Test-send the full sequence to yourself with accelerated timing.

---

## Cadence

| Email | Send timing | Segment | Goal |
|-------|-------------|---------|------|
| 0 | Immediately on opt-in | All | Deliver instant value, set expectations |
| 1 | +1 day | All | Founder story + founding-member promise |
| 2 | +4 days | All | Problem: "normal" ≠ "optimized" |
| 3 | +8 days | All | The Bloom process — "Medicine, not marketing" |
| 4 | +12 days | All | Proof — physician credibility |
| 5 | +16 days | All | Objection handling — price/value |
| 6 | Launch day — June 15, 2026 | All | Launch + founding-member offer |
| 7 | Launch +3 days — June 18, 2026 | Non-converters | Last call / urgency |
| RE | Launch +6 days — June 21, 2026 | `cold` tag only | Re-engage or sunset |

> Launch: **June 15, 2026**. Founding pricing closes **July 1, 2026**.

> If launch is sooner than ~20 days out, compress Emails 2–5 to every 2 days. One CTA per email. Plain-text feel.

---

## EMAIL 0 — Instant value
**Send:** immediately on opt-in · **Segment:** all
**Subject:** Your Bloom assessment results inside
**Preview:** Here's what your answers tell us — and what to do next.

```
Hi {{first_name}},

You just did something most men never do: you stopped guessing.

Based on your assessment, here's your read:
{{assessment_result}}

This isn't a diagnosis — it's a starting point. Real answers come from
real bloodwork, reviewed by a physician. That's exactly what Bloom is
built to do.

You're now on the founding-member waitlist. Over the next couple of
weeks I'll send you a short series on what optimization actually looks
like when it's done right — and a founding-member offer you won't see
again.

— Brian
Founder, Bloom Metabolics

[ See how Bloom works → ]
```

---

## EMAIL 1 — Founder story + founding-member promise
**Send:** +1 day · **Segment:** all
**Subject:** Why I built Bloom Metabolics
**Preview:** And what being a founding member gets you.

```
Hi {{first_name}},

Most men's health care falls into two camps.

One: a $99 website that mails you testosterone and never speaks to you
again. Two: a doctor who runs one panel, says "you're in the normal
range," and sends you home still tired.

I built Bloom because there was nothing in the middle — physician-led,
lab-driven, genuinely personal — without the waiting room.

As a founding member you lock in:
 • Founding pricing — for life. Your rate never goes up.
 • Priority onboarding at launch.
 • A direct line to me while we're still small.

And three things Bloom will never do: prescribe before we test, hide
what it costs, or sell you something you don't need.

— Brian

[ See the membership tiers → ]
```

---

## EMAIL 2 — The problem: "normal" is not "optimized"
**Send:** +4 days · **Segment:** all
**Subject:** "Your labs are normal" is not the answer
**Preview:** The gap between normal and optimal is where you live.

```
Hi {{first_name}},

If you've been told your testosterone is "normal," ask one question:
normal compared to whom?

Standard reference ranges lump a fit 35-year-old in with an unwell
75-year-old. "Not flagged" is not the same as "optimized for how you
want to feel, train, and perform."

Optimization starts with measuring the RIGHT markers — total and free
testosterone, estradiol, SHBG, plus metabolic and inflammatory markers
— and then reading them against your symptoms and your goals, not a
population average.

That's the whole idea behind Bloom: stop guessing, start measuring.

— Brian

[ What Bloom measures, and why → ]
```

---

## EMAIL 3 — The Bloom process
**Send:** +8 days · **Segment:** all
**Subject:** Medicine, not marketing
**Preview:** How Bloom actually works — in four steps.

```
Hi {{first_name}},

Here's exactly how Bloom works, start to finish:

1. Assess & intake — a short digital health history (you've started this).
2. Physician consultation — a real video visit with a board-certified
   physician.
3. Comprehensive labs — a full panel at a Quest or LabCorp near you.
4. Your protocol — physician-designed, medication shipped from a
   licensed pharmacy, then reviewed and adjusted every 90 days.

No cookie-cutter dosing. No "set it and forget it." A protocol measured
to you — and then re-measured.

— Brian

[ See the full process → ]
```

---

## EMAIL 4 — Proof & physician credibility
**Send:** +12 days · **Segment:** all
**Subject:** Who's actually behind your protocol
**Preview:** Meet the physician leading Bloom's medical team.

```
Hi {{first_name}},

A protocol is only as good as the physician who signs it.

Bloom's medical team is led by Dr. Michael Napolitano, MD —
board-certified in [specialty], with [X] years in hormone and metabolic
medicine. Every protocol is reviewed and signed by a licensed U.S.
physician. Every member's labs are read by a human, not an algorithm.

[Once founding members complete their first 90 days, add 1–2 short
outcome quotes here.]

This is the part the $99 platforms can't show you — because there's
no one there.

— Brian

[ Meet the Bloom care team → ]
```

---

## EMAIL 5 — Objection handling: price & value
**Send:** +16 days · **Segment:** all
**Subject:** Let's talk about price — honestly
**Preview:** What's included, and what it would cost you anywhere else.

```
Hi {{first_name}},

Bloom isn't the cheapest option. It's the complete one.

Your membership includes the physician, the comprehensive labs, ongoing
90-day monitoring, and care coordination. Add TRT for $199/mo —
medication included. Most members' all-in cost lands between $348 and
$498/mo.

Piece that together yourself — a concierge physician, full lab panels,
a pharmacy, follow-up labs — and you'd pay more, coordinate all of it,
and still be driving to appointments.

One transparent number. No surprise fees. No contracts. That's Radical
Transparency — one of our four founding values.

— Brian

[ See full pricing and what's included → ]
```

---

## EMAIL 6 — Launch + founding-member offer
**Send:** launch day — June 15, 2026 · **Segment:** all
**Subject:** Bloom is open — your founding spot is ready
**Preview:** Founding pricing, locked for life. Limited spots.

```
Hi {{first_name}},

The wait is over. Bloom Metabolics is officially open — and as a
waitlist member, you're first in.

Your founding-member benefits:
 • Founding pricing locked for life — your rate never goes up.
 • $49 Optimization Consultation fully credited toward month one.
 • Priority onboarding — first labs and physician visit this week.

We're capping the founding cohort at 100 members so our physicians can
onboard every one properly. When the spots are gone, founding pricing
closes for good.

— Brian

[ Claim my founding-member spot → ]
```

---

## EMAIL 7 — Last call / urgency
**Send:** launch +3 days — June 18, 2026 · **Segment:** non-converters (exclude anyone who joined)
**Subject:** Founding pricing closes July 1
**Preview:** A few founding spots left — then this rate is gone.

```
Hi {{first_name}},

Quick one: founding-member pricing closes July 1, and we're down
to the last [X] spots.

After that, Bloom moves to standard pricing — and the founding rate, the
lifetime price lock, and the credited consultation all go away.

If you've read this far through the series, you already know whether
"stop guessing, start measuring" is what you want. The only question is
whether you do it at the founding rate, or pay more later.

— Brian

(Reply to this email directly — it comes straight to me.)

[ Claim my spot before July 1 → ]
```

---

## EMAIL RE — Re-engage or sunset
**Send:** launch +6 days — June 21, 2026 · **Segment:** `cold` tag only (no opens/clicks)
**Subject:** Should I close your Bloom waitlist spot?
**Preview:** No hard feelings — just keeping the list honest.

```
Hi {{first_name}},

You joined the Bloom waitlist a while back and I haven't heard from you.
Totally fine — timing is everything with health.

If you're still in, grab your founding spot below before pricing
changes. If not, no action needed — I'll stop emailing.

Either way: when you're ready to stop guessing, we'll be here.

— Brian

[ Grab my founding spot → ]
```

---

## Optional: interest-based personalization

Swap one line per email based on the `{{primary_interest}}` tag:

| Tag | Swap line for Emails 2–5 |
|-----|--------------------------|
| `interest-trt` | Emphasize energy, drive, body composition, mental clarity. |
| `interest-glp1` | Emphasize sustained, physician-supervised, monitored fat loss. |
| `interest-peptides` | Emphasize recovery, repair, longevity — and that peptides are a full pillar at Bloom. |
| multiple | Use the "complete optimization" framing — all three pillars under one membership. |

---

## Metrics to watch

| Metric | Target |
|--------|--------|
| Email open rate | 35–50% (warm, opted-in list) |
| Click rate | 4–8% |
| Email 6 (launch) → membership | 15–25% of the list |
| $49 consult → membership | 60–75% |
| Unsubscribe rate | < 0.5% per send |

Tag anyone who opens/clicks ≥2 emails as `engaged`; anyone with zero engagement by Email 5 as `cold` (routes them to Email RE instead of 7).

*Generated by AI Marketing Suite — companion to FUNNEL-ANALYSIS.md*
