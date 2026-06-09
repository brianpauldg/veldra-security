# Bloom Metabolics — Blog Authoring Guide

This guide is for anyone (human or AI) writing a new post for `content/blog/`.
It exists so every article ships with the SEO + E-E-A-T posture we want.

## File format

- Extension: `.mdx` (preferred) or `.md`.
- Filename = slug: `kebab-case.mdx` (e.g. `glp1-side-effects.mdx`).
- Start with YAML frontmatter:
  ```yaml
  ---
  title: <H1 title>
  slug: <kebab-case-slug>
  category: TRT | GLP-1 | Peptides | Hormone Health | Longevity
  published_at: YYYY-MM-DD
  description: <≤160 char meta description>
  ---
  ```
- Register the post in `lib/blog/posts.ts` so it appears in the index and
  has SEO metadata wired up.

## Sources are a hard requirement

Every clinical or factual claim that could be challenged must be backed by
a `## Sources` section at the bottom of the article. The Sources section
must:

1. **Appear before the `---` divider that separates the body from the
   Medical Disclaimer.**
2. **Hyperlink every source to its original URL.** No bare text refs.
3. **Cite authoritative primary sources only:**
   - Peer-reviewed journals (NEJM, JAMA, The Lancet, etc.)
   - Federal agencies (FDA, NIH, CDC, NIDA, NIAAA)
   - Professional medical societies (Endocrine Society, AUA, AHA, ADA)
   - Major academic medical centers (Mayo Clinic, Cleveland Clinic, Johns
     Hopkins, Harvard Health)
   - Manufacturer prescribing info for specific brand-name drugs
   - Government databases (ClinicalTrials.gov, PubMed)
4. **Never cite:** content farms, Wikipedia, Reddit, low-trust health
   blogs, affiliate review sites.

### Format

```markdown
## Sources

- [Source Title – Publication or Institution (Year if applicable)](https://full-url)
- [Next Source – Institution](https://full-url)
```

### Inline citations

When a specific study, trial, or guideline is named in the body, hyperlink
the named reference inline AS WELL AS listing it in `## Sources`.

```markdown
The [TRAVERSE trial (2023)](https://www.nejm.org/doi/full/10.1056/NEJMoa2215025)
did not find an increased risk of major adverse cardiovascular events…
```

### Why this matters

- **SEO/E-E-A-T:** Google's quality raters look for outbound links to
  authoritative sources as a signal of trustworthy content. We do **not**
  add `rel="nofollow"` to these — we want the link to count as a trust
  citation in both directions.
- **Compliance:** Telehealth + supplement marketing operates under FDA,
  FTC, and state-board scrutiny. Verifiable sources back every claim
  about drug efficacy, side effects, mechanisms, and trial outcomes.
- **Patient trust:** Readers can verify our claims directly.

## Rendering behavior (already wired)

The custom markdown renderer at `lib/blog/content.ts` automatically:

- Adds `target="_blank" rel="noopener noreferrer"` to every external link
  (anything starting with `https://` or `http://`).
- Leaves internal links (`/blog/...`, `/pricing`, `#anchor`) as same-tab.
- Does **NOT** add `rel="nofollow"` — we want trust signal to flow to the
  cited authorities.

So you only need to write standard markdown `[label](url)` — the renderer
handles the attributes.

## Internal linking

In addition to outbound sources, include 2–4 internal links per post:

- Link to related blog posts: `[label](/blog/other-slug)`
- Link to product pages: `[TRT program](/trt)`, `[GLP-1 program](/glp1)`
- Link to conversion pages: `[book a consultation](/book)`,
  `[join the waitlist](/join)`

Internal links keep visitors on-site, improve topical clustering for SEO,
and route traffic to conversion surfaces.

## Medical disclaimer

Every article ends with the standard disclaimer:

```markdown
---

*Medical Disclaimer: This article is for informational and educational
purposes only. It is not intended as medical advice and does not
establish a patient-provider relationship. … Content reviewed by Dr.
Michael Napolitano, MD.*
```

If the article covers an investigational drug (e.g. retatrutide), add a
sentence noting FDA-approval status.

## Checklist before publishing

- [ ] Frontmatter complete (title, slug, category, published_at, description)
- [ ] Registered in `lib/blog/posts.ts`
- [ ] H1 NOT in the body (the title in frontmatter renders as H1)
- [ ] 2–4 internal links to other blog posts / product pages
- [ ] Inline study/guideline citations are hyperlinked
- [ ] `## Sources` section present, all entries hyperlinked, all URLs verified
- [ ] Medical Disclaimer at the bottom
- [ ] Run `npm run build` — confirms no broken MDX
