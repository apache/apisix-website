# SEO Guidelines for Apache APISIX Website Contributors

This document provides SEO best practices for anyone contributing content to the Apache APISIX website, documentation, or blog. Following these guidelines ensures that our content ranks well in both traditional search engines and AI-powered search (Google AI Overviews, ChatGPT, Perplexity).

## Frontmatter Requirements

Every Markdown page (blog post, doc page, learning center article) **must** include:

```yaml
---
title: "Human-Readable Title - Primary Keyword | Apache APISIX"
description: "120-160 character description that accurately summarizes the page content and includes the primary keyword naturally."
---
```

### Title Rules

- **Length**: 50-60 characters (Google truncates longer titles in SERPs)
- **Format**: `Primary Topic - Modifier | Apache APISIX`
- **Keyword placement**: Put the primary keyword near the front
- **Human-readable**: Write for humans, not bots. No keyword stuffing.
- **Plugin pages**: Use the human-readable name, not just the code identifier
  - Good: `Rate Limiting Plugin (limit-req) | Apache APISIX`
  - Bad: `limit-req | Apache APISIX`

### Description Rules

- **Length**: 120-160 characters
- **Content**: Describe the page honestly and include the main topic naturally
- **Action-oriented**: Start with a verb when possible ("Learn how to...", "Configure...", "Compare...")

## Content Structure

### Answer-First Writing

Place the primary answer or definition in the **first 40-60 words** of the page. AI search engines preferentially extract opening paragraphs.

```markdown
## What is an API Gateway?

An API gateway is a server that sits between clients and backend
services, acting as the single entry point for all API traffic.
It handles authentication, rate limiting, and routing so that
individual services don't need to implement these concerns.

[Rest of the detailed content follows...]
```

### Heading Hierarchy

- **One H1 per page** (the `title` in frontmatter)
- Use H2 for major sections, H3 for subsections
- Headings should match developer search queries when possible
  - Good: `## How to Configure Rate Limiting in APISIX`
  - Bad: `## Configuration`
- Never skip heading levels (H1 → H3 without H2)

### Statistics and Data

Include **at least one statistic or data point every 150-200 words**. Concrete numbers make content more authoritative and more likely to be cited by AI engines.

Examples:

- "Apache APISIX processes 18,000 requests per second per core with 0.2ms latency"
- "Over 147,000 deployments across 5,200+ companies"
- "100+ built-in plugins covering authentication, security, and traffic control"

Always cite the source when referencing external statistics.

### Internal Linking

- Every page should include **at least 2 internal links** to related content
- Use descriptive anchor text, not "click here" or "learn more"
  - Good: `[rate limiting plugin documentation](/docs/apisix/plugins/limit-req/)`
  - Bad: `[click here](/docs/apisix/plugins/limit-req/)`
- Link from new pages to relevant existing content
- Use relative paths for internal links

### FAQ Sections

For Learning Center articles, include a FAQ section at the end with 3-5 questions:

```markdown
## Frequently Asked Questions

### What is the difference between an API gateway and a load balancer?

[Concise, direct answer in 2-3 sentences]

### Do I need an API gateway for microservices?

[Concise, direct answer]
```

FAQ content is highly valued by AI search engines and can appear as rich results in Google SERPs.

## Images

- **Alt text is mandatory**: Every image must have descriptive alt text
  - Good: `alt="Apache APISIX architecture diagram showing request flow from client through gateway to upstream services"`
  - Bad: `alt="diagram"` or `alt=""`
- Include explicit `width` and `height` attributes
- Use `loading="lazy"` for below-the-fold images
- Use WebP or AVIF formats when possible

## Blog Posts

### Evergreen Content

- Avoid time-relative phrases like "recently" or "last month"
- Use absolute dates: "In March 2026" instead of "last quarter"
- Update posts when information becomes outdated (and update the `date` in frontmatter)

### Blog Post Metadata

```yaml
---
title: "Descriptive Title With Primary Keyword"
authors:
  - name: Author Name
description: "120-160 character description"
tags: [relevant, tags]
image: /path/to/og-image.png  # Required for social sharing
---
```

## Technical SEO Checklist

Before submitting a PR that adds or modifies content pages:

- [ ] Title tag is 50-60 characters with primary keyword near the front
- [ ] Meta description is 120-160 characters and accurately describes the page
- [ ] Only one H1 per page
- [ ] Heading hierarchy is logical (H1 > H2 > H3, no skipped levels)
- [ ] At least 2 internal links to related content
- [ ] All images have descriptive alt text
- [ ] Opening paragraph directly answers the page topic (answer-first)
- [ ] At least 1 statistic or data point per 200 words
- [ ] No duplicate content with existing pages
- [ ] Blog posts have an `image` field for social sharing
