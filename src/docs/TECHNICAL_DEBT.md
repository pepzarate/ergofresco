# Technical Debt

## TD-002 — Footer: replace Astro template with ErgoFresco branding

**Status:** ✅ Resolved — 2026-03-24
**Priority:** Medium  
**Created:** 2026-03-23

### Context
The footer still renders the default Astro blog template content. It needs
to reflect the ErgoFresco brand before the site receives real traffic.

### Scope
- `src/components/common/Footer.astro` — full replacement
- Add: brand name, affiliate disclaimer link, basic navigation, copyright

### Acceptance criteria
- Footer shows ErgoFresco branding
- Links to /about#affiliate for the affiliate disclosure
- `npx astro check` returns 0 errors, 0 warnings, 0 hints

---

## TD-003 — Populate lib/utils.ts

**Status:** Pending  
**Priority:** Low  
**Created:** 2026-03-23

### Context
`src/lib/utils.ts` was created in the project structure but is empty.
Utility functions are currently duplicated inline across components.

### Scope
- Date formatting function (currently duplicated across pages)
- Slug generation utility
- Reading time estimator

---

## TD-004 — Populate types/index.ts

**Status:** Pending  
**Priority:** Low  
**Created:** 2026-03-23

### Context
`src/types/index.ts` was created but has no content. Domain types are
undefined, which means no type safety on affiliate and product data.

### Scope
- `Product` type
- `AffiliateLink` type  
- `PostMeta` type

---

## TD-005 — Reading time via remark plugin

**Status:** Pending  
**Priority:** Low  
**Created:** 2026-03-23

### Context
Article layout has a placeholder for reading time that was never implemented.
Improves UX and signals content depth to readers.

### Scope
- Install `remark-reading-time` or implement custom remark plugin
- Expose reading time in article frontmatter
- Display in `BlogPost.astro` article header

---

## TD-006 — Structured data JSON-LD

**Status:** Pending  
**Priority:** Medium  
**Created:** 2026-03-23

### Context
No structured data is currently implemented. JSON-LD schemas for Article
and Product improve search result appearance (rich snippets) and are a
direct SEO ranking signal.

### Scope
- `Article` schema on all blog posts
- `Product` schema on product review articles
- `BreadcrumbList` schema on all pages
- Implement in `BaseHead.astro` or `BlogPost.astro`