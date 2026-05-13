# Technical SEO Checklist — Bloom Metabolics

---

## Overview

This document defines the technical SEO standards for all Bloom Metabolics content published under the /learn/ subdirectory and related pages. Every article must conform to these specifications before publication. These are not recommendations — they are requirements.

---

## 1. Schema Markup Requirements

Every content page must include structured data in JSON-LD format. Place all JSON-LD blocks in the `<head>` element of the page. Do not use microdata or RDFa.

### MedicalWebPage Schema

Use on every article in the /learn/ subdirectory:

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Article Title Here",
  "headline": "Article Title Here",
  "description": "Meta description here — 150-160 characters.",
  "url": "https://bloommetabolics.com/learn/pillar/article-slug",
  "datePublished": "2026-05-12",
  "dateModified": "2026-05-12",
  "lastReviewed": "2026-05-12",
  "medicalAudience": {
    "@type": "MedicalAudience",
    "audienceType": "Patient"
  },
  "about": {
    "@type": "MedicalCondition",
    "name": "Condition or topic name"
  },
  "author": {
    "@type": "Person",
    "name": "Brian DeGuzman, RN",
    "url": "https://bloommetabolics.com/about/brian-deguzman",
    "jobTitle": "Founder, Registered Nurse",
    "worksFor": {
      "@type": "Organization",
      "name": "Bloom Metabolics"
    }
  },
  "reviewedBy": {
    "@type": "Person",
    "name": "Dr. Michael Napolitano, MD",
    "url": "https://bloommetabolics.com/about/dr-napolitano",
    "jobTitle": "Medical Director",
    "medicalSpecialty": {
      "@type": "MedicalSpecialty",
      "name": "Internal Medicine"
    }
  },
  "publisher": {
    "@type": "Organization",
    "name": "Bloom Metabolics",
    "url": "https://bloommetabolics.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://bloommetabolics.com/images/bloom-logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://bloommetabolics.com/learn/pillar/article-slug"
  }
}
```

### Article Schema

Use as a supplementary schema alongside MedicalWebPage for articles with substantial editorial content:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title Here",
  "description": "Meta description here.",
  "image": "https://bloommetabolics.com/images/learn/article-slug-hero.webp",
  "author": {
    "@type": "Person",
    "name": "Brian DeGuzman, RN",
    "url": "https://bloommetabolics.com/about/brian-deguzman"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Bloom Metabolics",
    "logo": {
      "@type": "ImageObject",
      "url": "https://bloommetabolics.com/images/bloom-logo.png"
    }
  },
  "datePublished": "2026-05-12",
  "dateModified": "2026-05-12"
}
```

### FAQPage Schema

Use on articles that include an FAQ section (structured as question-answer pairs):

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the question?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The answer to the question, written as plain text or minimal HTML."
      }
    },
    {
      "@type": "Question",
      "name": "Second question?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Second answer."
      }
    }
  ]
}
```

### BreadcrumbList Schema

Use on every page. Must match the visible breadcrumb navigation:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://bloommetabolics.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Learn",
      "item": "https://bloommetabolics.com/learn"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Testosterone Optimization",
      "item": "https://bloommetabolics.com/learn/testosterone-optimization"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Article Title Here",
      "item": "https://bloommetabolics.com/learn/testosterone-optimization/article-slug"
    }
  ]
}
```

### Organization Schema

Use once, on the homepage or a sitewide include:

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "Bloom Metabolics",
  "url": "https://bloommetabolics.com",
  "logo": "https://bloommetabolics.com/images/bloom-logo.png",
  "description": "Clinician-led telehealth practice specializing in testosterone optimization, GLP-1 metabolic therapy, and longevity medicine.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Irvine",
    "addressRegion": "CA",
    "addressCountry": "US"
  },
  "founder": {
    "@type": "Person",
    "name": "Brian DeGuzman, RN",
    "jobTitle": "Founder"
  },
  "medicalSpecialty": [
    {
      "@type": "MedicalSpecialty",
      "name": "Endocrinology"
    },
    {
      "@type": "MedicalSpecialty",
      "name": "Preventive Medicine"
    }
  ],
  "sameAs": [
    "https://www.instagram.com/bloommetabolics",
    "https://www.linkedin.com/company/bloommetabolics"
  ]
}
```

---

## 2. Core Web Vitals Targets

| Metric | Target | Threshold (Poor) | Notes |
|---|---|---|---|
| Largest Contentful Paint (LCP) | Under 2.5 seconds | Above 4.0 seconds | Measured on mobile. Primary driver: hero image load time and server response time. Use WebP, lazy-load below-fold images, ensure CDN caching. |
| First Input Delay (FID) / Interaction to Next Paint (INP) | Under 100ms (FID) / Under 200ms (INP) | Above 300ms (FID) / Above 500ms (INP) | INP replaces FID as of March 2024. Minimize main-thread JavaScript. Defer non-critical scripts. |
| Cumulative Layout Shift (CLS) | Under 0.1 | Above 0.25 | Set explicit width and height on all images and embeds. Avoid dynamically injected content above the fold. Preload web fonts. |

**Measurement tools:**
- Google PageSpeed Insights (lab and field data)
- Chrome User Experience Report (CrUX) for field data once traffic is sufficient
- Lighthouse in Chrome DevTools for development testing
- Web Vitals Chrome Extension for real-time monitoring during QA

**Article-specific considerations:**
- Hero images must be preloaded (`<link rel="preload">`) to prevent LCP delays
- Schema JSON-LD in `<head>` does not affect CWV but must not be rendered as visible content
- Embedded charts or tables must have fixed dimensions to prevent CLS

---

## 3. URL Structure Rules

### /learn/ Subdirectory

All educational content lives under `/learn/`. The URL hierarchy mirrors the hub-and-spoke architecture:

```
/learn/                                          ← Master hub
/learn/testosterone-optimization/                ← Pillar hub (TRT)
/learn/testosterone-optimization/[article-slug]  ← Spoke article
/learn/metabolic-health/                         ← Pillar hub (GLP-1)
/learn/metabolic-health/[article-slug]           ← Spoke article
/learn/peptide-science/                          ← Pillar hub (Peptides)
/learn/peptide-science/[article-slug]            ← Spoke article
```

### URL Slug Rules

- Lowercase only
- Hyphens between words (no underscores, no spaces, no camelCase)
- No dates in URLs (dates belong in schema markup and visible content, not URLs)
- No stop words (a, an, the, is, and, or, but) unless removal makes the slug unreadable
- Maximum 5-6 words in the slug
- Must include the primary keyword or a close variant
- No trailing slashes in canonical URLs (enforce one version)

**Examples:**
- Good: `/learn/testosterone-optimization/free-vs-total-testosterone`
- Good: `/learn/metabolic-health/tirzepatide-vs-semaglutide`
- Bad: `/learn/testosterone-optimization/2026/05/the-difference-between-free-and-total-testosterone-explained`
- Bad: `/learn/metabolic-health/glp1_muscle_loss`

### /blog/ Path (If Used)

If Bloom publishes time-sensitive commentary, news analysis, or opinion content that does not fit the evergreen /learn/ structure:

```
/blog/[article-slug]
```

Blog posts do not follow the hub-and-spoke architecture. They may link into /learn/ articles but are not pillar-spoke nodes. Blog content should be rare — most content belongs in /learn/.

---

## 4. Heading Hierarchy Rules

- **One H1 per page.** The H1 is the article title. It appears once, at the top. It should include the primary keyword or a close natural variant.

- **H2 for major sections.** Each major section of the article uses an H2. H2s should be descriptive and, where natural, include secondary keywords.

- **H3 for subsections.** H3s nest under H2s. They are used for sub-points within a section.

- **H4 for tertiary divisions.** H4s nest under H3s. They should be rare — if the content requires H4-level nesting, consider whether the section structure is too deep.

- **No skipped levels.** Never go from H2 to H4 without an H3 in between. Never use headings out of hierarchical order.

- **No heading-only sections.** Every heading must be followed by paragraph content. A heading followed immediately by another heading (with no content between) is a structural error.

- **Heading text is not a sentence.** Headings do not end with periods. They are labels, not prose. They should be concise but descriptive.

**Example structure:**

```
H1: Free Testosterone vs Total Testosterone: Why One Number Isn't Enough
  H2: What Total Testosterone Measures
    [paragraph content]
  H2: Why Free Testosterone Matters More Clinically
    H3: SHBG Binding and Bioavailability
      [paragraph content]
    H3: When Free Testosterone Diverges from Total
      [paragraph content]
  H2: How to Interpret Your Lab Results
    H3: Reference Ranges and Their Limitations
      [paragraph content]
    H3: What to Ask Your Provider
      [paragraph content]
  H2: Frequently Asked Questions
    [FAQ content with FAQPage schema]
```

---

## 5. Internal Linking Rules

1. **3-5 internal links per spoke article.** Every article links to 3-5 other pages within the Bloom Metabolics site.

2. **Always link to the parent pillar hub.** Every spoke article includes at least one in-content link to its pillar hub page (in addition to the breadcrumb navigation link).

3. **Lateral spoke-to-spoke links.** Related articles within the same pillar should link to each other. (TRT-006 on fertility links to TRT-007 on HCG. GLP1-003 on muscle loss links to GLP1-007 on resistance training.)

4. **Cross-pillar links when relevant.** If a GLP-1 article discusses body composition and testosterone's role in lean mass, link to the relevant TRT article. Do not force cross-pillar links where the connection is not natural.

5. **Anchor text variation.** Do not use the same anchor text for the same destination across multiple articles. Use natural language anchors that match the surrounding sentence context.
   - Good: "the relationship between testosterone and fertility" (linking to TRT-006)
   - Good: "how TRT may affect reproductive function" (linking to TRT-006 from a different article)
   - Bad: "TRT and fertility" used as anchor text in five different articles

6. **Service page CTA links.** Each TRT and GLP-1 spoke article includes one contextual link to the relevant service page. This link should feel like a natural recommendation, not an advertisement. Peptide articles never link to service pages.

7. **No orphan pages.** Every published page must be reachable from at least one other page via an internal link (excluding direct URL access and sitemap-only discovery).

---

## 6. Image Optimization

### Format

- **WebP** is the primary format for all content images. Provide JPEG or PNG fallback via `<picture>` element for browsers without WebP support.
- **SVG** for icons, logos, and simple graphics.
- **Avoid PNG** for photographic content (file size is unnecessarily large).

### Dimensions

- Hero images: maximum 1200px wide, 2x for retina (serve 1200px to standard displays, 2400px source for retina via srcset)
- In-content images: maximum 800px wide
- Thumbnail images: maximum 400px wide
- All images must have explicit `width` and `height` attributes in the HTML to prevent CLS

### Alt Text

- Every image must have an alt attribute. No exceptions.
- Alt text should describe the image content and, where natural, include a relevant keyword.
- Do not keyword-stuff alt text. Write it as you would describe the image to someone who cannot see it.
- Decorative images (e.g., section dividers, background textures) use `alt=""` (empty alt, not missing alt).

**Examples:**
- Good: `alt="Chart showing average testosterone levels by age from 20 to 80 years, with reference ranges from Quest Diagnostics and LabCorp"`
- Good: `alt="Diagram comparing GLP-1 single receptor agonism of semaglutide with dual GLP-1/GIP agonism of tirzepatide"`
- Bad: `alt="testosterone chart"`
- Bad: `alt="image1"`
- Bad: (no alt attribute)

### Lazy Loading

- Images below the fold must use `loading="lazy"`.
- The hero image (above the fold) must NOT use lazy loading — it should be preloaded.
- Use `fetchpriority="high"` on the hero image.

### File Naming

- Use descriptive, hyphenated filenames: `testosterone-levels-by-age-chart.webp`
- Do not use sequential numbers: `img001.webp`
- Do not use spaces or special characters in filenames

---

## 7. Mobile-First Checklist

- [ ] **Viewport meta tag present.** `<meta name="viewport" content="width=device-width, initial-scale=1">` in the `<head>`.
- [ ] **No horizontal scroll.** Content does not overflow the viewport on any screen width from 320px to 768px.
- [ ] **Text readable without zoom.** Body text is at least 16px. Line height is at least 1.5. Paragraph width does not exceed ~70 characters.
- [ ] **Tap targets adequately sized.** All interactive elements (links, buttons) have a minimum tap target of 44x44 CSS pixels with adequate spacing between adjacent targets.
- [ ] **Tables are responsive.** Data tables scroll horizontally within a container or reformat for mobile (stacked layout). Tables do not break the page layout.
- [ ] **Images scale correctly.** All images use `max-width: 100%` and `height: auto`. No images overflow their container.
- [ ] **Navigation accessible.** Mobile navigation menu is functional, accessible via keyboard, and does not obscure content when open.
- [ ] **Forms are usable.** Any forms (contact, consultation booking) have adequately sized input fields, appropriate input types (email, tel), and visible labels.
- [ ] **No intrusive interstitials.** No pop-ups or overlays that cover the primary content on mobile page load. Google penalizes intrusive interstitials on mobile.
- [ ] **Font loading does not cause layout shift.** Web fonts use `font-display: swap` or `font-display: optional`. Fallback fonts have similar metrics to prevent visible layout shift on font load.

---

## 8. Google Search Console Setup Checklist

- [ ] **Property verified.** bloommetabolics.com verified in Google Search Console (DNS verification preferred for domain-level property).
- [ ] **Both www and non-www properties added.** (Or domain-level property which covers both.)
- [ ] **Preferred domain set.** Ensure 301 redirects from www to non-www (or vice versa, choose one and enforce).
- [ ] **XML sitemap submitted.** Submit `/sitemap.xml` to Search Console. Verify it is being crawled without errors.
- [ ] **Robots.txt reviewed.** Ensure `/robots.txt` does not block /learn/ pages or critical resources (CSS, JS, images).
- [ ] **Index coverage reviewed.** After initial content launch, review the Index Coverage report for errors, excluded pages, and crawl anomalies.
- [ ] **Core Web Vitals report enabled.** Monitor CWV performance as traffic accumulates. Field data requires sufficient traffic volume — lab data from PageSpeed Insights is used until then.
- [ ] **Manual actions checked.** Verify no manual actions are present (should be clean for a new site).
- [ ] **URL inspection tool tested.** Inspect a published /learn/ article URL. Verify Googlebot can render the page, the schema is detected, and the page is indexable.
- [ ] **Search appearance settings reviewed.** Check Enhancements reports for FAQPage, BreadcrumbList, and other structured data validation.

---

## 9. XML Sitemap Structure

### Sitemap Location

Primary sitemap: `https://bloommetabolics.com/sitemap.xml`

If the site grows beyond 50,000 URLs (unlikely in the near term), use a sitemap index file pointing to individual sitemaps.

### /learn/ Sitemap Entries

Every published page in the /learn/ subdirectory must appear in the sitemap. Entries include:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://bloommetabolics.com/learn/</loc>
    <lastmod>2026-05-12</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://bloommetabolics.com/learn/testosterone-optimization/</loc>
    <lastmod>2026-05-12</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://bloommetabolics.com/learn/testosterone-optimization/free-vs-total-testosterone</loc>
    <lastmod>2026-05-12</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <!-- Additional spoke articles -->
</urlset>
```

### Priority Hierarchy

| Page Type | Priority | Change Frequency |
|---|---|---|
| Homepage | 1.0 | weekly |
| Service pages | 0.9 | monthly |
| /learn/ master hub | 0.9 | weekly |
| Pillar hubs | 0.8 | weekly |
| Spoke articles | 0.7 | monthly |
| /blog/ posts | 0.5 | monthly |

### Maintenance

- Update `<lastmod>` when an article is substantively revised (not for typo fixes)
- Remove URLs for any unpublished or redirected pages
- Resubmit the sitemap to Search Console after adding new content
- Next.js can generate sitemaps automatically — ensure the build process includes /learn/ pages

---

## 10. Canonical Tag Rules

- **Every page must have a self-referencing canonical tag.**
  ```html
  <link rel="canonical" href="https://bloommetabolics.com/learn/testosterone-optimization/free-vs-total-testosterone" />
  ```

- **Canonical URL format:** Use the exact URL (no trailing slash if the site convention is no trailing slash). Must match the URL in the sitemap and the `url` field in schema markup.

- **No conflicting canonicals.** If a page has both a canonical tag and a canonical specified via HTTP header, they must point to the same URL.

- **Cross-domain canonical.** If content is syndicated to another platform (unlikely in early stages), use the canonical tag on the syndicated version pointing back to the Bloom original. Do not syndicate content without canonical attribution.

- **Parameter handling.** If the site uses URL parameters (e.g., UTM tracking), the canonical tag must point to the clean URL without parameters. Configure this in Next.js to strip parameters from canonicals automatically.

- **Pagination.** If pillar hub pages are paginated (unlikely given the architecture), use `rel="next"` and `rel="prev"` in addition to canonical tags. Each paginated page canonicalizes to itself — do not point paginated pages to page 1.

---

## 11. Open Graph and Twitter Card Specifications

### Open Graph Meta Tags

Include on every page:

```html
<meta property="og:title" content="Free Testosterone vs Total Testosterone: Why One Number Isn't Enough" />
<meta property="og:description" content="Total testosterone alone misses the clinical picture. Understanding free testosterone, SHBG binding, and bioavailability changes how you interpret your lab results." />
<meta property="og:type" content="article" />
<meta property="og:url" content="https://bloommetabolics.com/learn/testosterone-optimization/free-vs-total-testosterone" />
<meta property="og:image" content="https://bloommetabolics.com/images/learn/free-vs-total-testosterone-og.webp" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Diagram showing the difference between free and total testosterone measurement" />
<meta property="og:site_name" content="Bloom Metabolics" />
<meta property="og:locale" content="en_US" />
<meta property="article:published_time" content="2026-05-12T00:00:00Z" />
<meta property="article:modified_time" content="2026-05-12T00:00:00Z" />
<meta property="article:author" content="https://bloommetabolics.com/about/brian-deguzman" />
```

### Twitter Card Meta Tags

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@bloommetabolics" />
<meta name="twitter:title" content="Free Testosterone vs Total Testosterone: Why One Number Isn't Enough" />
<meta name="twitter:description" content="Total testosterone alone misses the clinical picture. Understanding free testosterone, SHBG binding, and bioavailability changes how you interpret your lab results." />
<meta name="twitter:image" content="https://bloommetabolics.com/images/learn/free-vs-total-testosterone-og.webp" />
<meta name="twitter:image:alt" content="Diagram showing the difference between free and total testosterone measurement" />
```

### OG Image Specifications

- Dimensions: 1200 x 630 pixels (1.91:1 aspect ratio)
- Format: WebP preferred, PNG or JPEG acceptable (platform compatibility varies)
- File size: Under 300KB
- Include the article title text on the image for visual clarity in social feeds
- Use Bloom brand colors and typography
- Every article must have a unique OG image — do not reuse the same image across articles

### Validation

Before publishing, validate social sharing preview with:
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

Scrape the URL after publication to ensure the platform caches the correct metadata.
