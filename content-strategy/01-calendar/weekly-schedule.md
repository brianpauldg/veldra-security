# Weekly Execution Schedule

**Cadence:** 2 articles per week (Tuesday + Thursday publish)
**Content Lead:** Brian DeGuzman, RN
**Medical Reviewer:** Dr. Michael Napolitano, MD

---

## Production Workflow

### Monday: Outline + Research Session

**Owner:** Brian DeGuzman
**Time commitment:** 30 minutes
**Deliverable:** Annotated brief with founder observations

Process:
1. Pull the content brief for both articles scheduled this week (briefs live in `content-strategy/02-briefs/`)
2. Review the primary keyword and competitive SERP for each article
3. Identify 2-3 clinical observations from Brian's practice to anchor each piece
4. Note any recent patient conversations, lab patterns, or protocol adjustments relevant to the topic
5. Flag any regulatory updates that affect the article's claims or framing
6. Record observations directly in the brief file under `## Founder Notes` or as a voice memo (see Tuesday)

**Quality gate:** Each brief must have at least two specific clinical observations before proceeding. Generic articles without founder perspective do not publish.

---

### Tuesday: Voice Memo or Rough Draft

**Owner:** Brian DeGuzman
**Time commitment:** 20-45 minutes (varies by topic complexity)
**Deliverable:** Voice memo file or rough written draft

Process:
1. For clinical mechanism topics (TRT, GLP-1 protocols): Record a voice memo walking through the clinical angle. Talk as if explaining to a patient who already did some research. Do not polish. The goal is capturing Brian's natural clinical voice and specific observations.
2. For regulatory or comparison topics (peptides, compounding): Write rough bullet points with specific regulatory references, dates, and positions. These topics require precision over voice.
3. Save voice memos to `content-strategy/04-voice-memos/` with naming convention: `{ARTICLE_ID}-voice-{DATE}.m4a`
4. Save rough drafts to the brief file under `## Rough Draft Notes`

**Quality gate:** Voice memo must contain at least one contrarian observation or clinical nuance that would not appear in a generic competitor article.

---

### Wednesday: AI Draft Processing

**Owner:** Claude Code (automated with human staging)
**Time commitment:** 15 minutes human setup, automated drafting
**Deliverable:** Full article draft in markdown

Process:
1. Feed the article brief + voice memo transcript + any rough notes into the article-draft-prompt (`content-strategy/03-prompts/article-draft-prompt.md`)
2. Include `{{RECENT_CLINICAL_OBSERVATIONS}}` from Brian's Tuesday notes
3. Run the draft through the article-review-prompt (`content-strategy/03-prompts/article-review-prompt.md`)
4. If Voice Score < 7 or Differentiation Score < 6, regenerate with additional voice calibration samples
5. Save draft to `content-strategy/05-drafts/{ARTICLE_ID}-draft-v1.md`
6. Save review output to `content-strategy/05-drafts/{ARTICLE_ID}-review-v1.md`

**Quality gate:** Draft must score Publish Readiness of "Ready" or "Needs Revision" (not "Needs Rewrite") before advancing.

---

### Thursday: Brian Final-Edit Pass

**Owner:** Brian DeGuzman
**Time commitment:** 20-40 minutes per article
**Deliverable:** Publication-ready draft with compliance annotations

Process:
1. Read the full draft aloud (or silently, but slowly). Mark any sentence that sounds like a different person wrote it.
2. Voice check: Does this sound like something Brian would say to a patient at 9:30 AM on a Tuesday? If not, rewrite the sentence.
3. Compliance scan: Review every sentence flagged with `[COMPLIANCE FLAG]`. Decide: soften, cite, or remove.
4. Clinical nuance pass: Add one specific clinical observation that only someone treating patients would know. This is the moat.
5. Check internal links: Verify every linked article actually exists and is published (or scheduled before this piece).
6. Update draft file to `-v2.md` with edits applied.

**Quality gate:** Brian must affirmatively approve the article. Silence is not approval. The article does not advance without a written "approved" or specific revision requests.

---

### Friday: Medical Reviewer Signoff

**Owner:** Dr. Michael Napolitano, MD
**Time commitment:** 10-20 minutes per article
**Deliverable:** Signed-off article or revision requests

Process:
1. Dr. Napolitano receives the `-v2.md` draft with all `[COMPLIANCE FLAG]` annotations still visible
2. Review scope: medical accuracy, claim safety, appropriate hedging language, citation validity
3. For each flagged sentence: approve, request revision, or request removal
4. Add reviewer attribution block at top of article (this publishes with the piece):
   ```
   Medically reviewed by Dr. Michael Napolitano, MD
   Last reviewed: {DATE}
   ```
5. Return approved draft or revision notes

**Quality gate:** No article publishes without Dr. Napolitano's explicit signoff. If he requests revisions, the article cycles back to Thursday's process and publishes the following week instead.

---

### Following Monday: Publish + Cross-Post

**Owner:** Brian DeGuzman (or delegated)
**Time commitment:** 30 minutes

Process:
1. Publish article to Bloom Metabolics blog
2. Verify meta description, title tag, schema markup, and OG image are correctly set
3. Create Instagram carousel summary (5-7 slides, key points from the article, slide 1 = clinical question from the article opening)
4. Draft email newsletter mention (2-3 sentences + link, scheduled for weekly digest)
5. Submit URL to Google Search Console for indexing
6. Add article to internal linking tracker and update any previously published articles that should now link to this new piece

---

## Cadence Targets

| Metric | Target | Minimum Acceptable |
|--------|--------|--------------------|
| Articles published per week | 2 | 1 |
| Voice memos recorded per week | 2 | 1 |
| Medical reviewer turnaround | 24 hours | 48 hours |
| Time from brief to publish | 7 days | 14 days |
| Articles in draft backlog | 2-4 | 1 |

---

## When Brian Is Unavailable

Short absence (1-2 weeks):
- Pre-record voice memos for upcoming articles before leaving
- Pre-approve drafts that are already in the pipeline
- Dr. Napolitano can approve articles that Brian has already done a voice-check pass on
- Publish only articles Brian has seen in at least draft form. Do not publish AI-generated drafts without Brian's voice-check.

Extended absence (3+ weeks):
- Reduce cadence to 1 article per week
- Publish only articles from the buffer queue that Brian pre-approved
- Pause peptide content entirely (highest compliance sensitivity, requires Brian's regulatory judgment)
- Shift to republishing/updating existing articles with new data rather than generating new pieces
- Dr. Napolitano reviews all content but does not substitute for Brian's voice-check

No-notice absence:
- If Brian misses Monday + Tuesday without communication, Wednesday draft processing pauses
- Publish nothing new until Brian re-engages
- Use the week to update internal links, refresh meta descriptions, and audit existing content

---

## Handling Time-Sensitive Regulatory Content

Trigger events: FDA announcement affecting compounding, DEA scheduling change, state-level telehealth regulation, peptide category reclassification.

**Response protocol:**

1. **Within 24 hours of announcement:**
   - Brian drafts a 200-word "What This Means" summary in plain language
   - Identify which existing articles are affected and need updates
   - If PEP-001 (regulation) or PEP-005 (legal peptides) are already published, add an editor's note at the top with the date and a brief summary of the change

2. **Within 48 hours:**
   - Update all affected articles with corrected information and `[Updated: {DATE} — {reason}]` notation
   - If the announcement warrants a standalone article, bump the next scheduled article by one slot and insert the regulatory piece
   - Dr. Napolitano reviews all regulatory updates before they publish, even editor's notes

3. **Within 1 week:**
   - Publish a full analysis article if the announcement is significant enough (e.g., FDA changes compounding guidance)
   - This article takes priority over the scheduled sequence and does not count toward the 2/week cadence minimum

**Compliance note on regulatory content:** State facts about regulatory positions. Do not speculate on future regulatory outcomes. Do not frame regulatory changes as threats or opportunities for patients. Report what happened, explain what it means, cite the primary source (Federal Register, FDA guidance document, etc.).

---

## Monthly Review

First Monday of each month, Brian reviews:
- Which articles drove the most organic traffic
- Which articles have the highest time-on-page (proxy for quality/voice match)
- Whether the publishing sequence needs reordering based on search trend shifts
- Any new clinical observations that warrant a new brief or article update
- Backlink acquisition and internal linking health
- Dr. Napolitano's feedback on recurring compliance patterns
