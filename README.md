# ErgoFresco 🧊

> Stay cool. Work better.

Affiliate blog focused on ergonomics and cooling solutions for remote workers in warm climates. Built with Astro and deployed on Cloudflare Pages.

**Live site:** [ergofresco.com](https://ergofresco.com)

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| Framework | [Astro 5](https://astro.build) |
| Styles | Custom CSS with CSS variables (light/dark theme) |
| Content | MDX via Astro Content Collections |
| Language | TypeScript (strict mode) |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com) — static output |
| Analytics | Google Analytics 4 (production only) |
| Email | [Brevo](https://brevo.com) — newsletter form |

---

## 📁 Project Structure

```text
src/
├── assets/
│   └── images/
│       ├── blog/              # Article cover images (co-located with MDX)
│       └── products/          # Affiliate product images
│
├── components/
│   ├── common/                # Domain-agnostic, reusable across any page
│   │   ├── BaseHead.astro     # <head> — SEO, OG tags, JSON-LD, GA4
│   │   ├── Header.astro       # Site navigation with theme toggle
│   │   ├── Footer.astro       # Footer with affiliate disclaimer link
│   │   ├── FormattedDate.astro
│   │   ├── HeaderLink.astro
│   │   ├── NewsletterForm.astro
│   │   ├── ScrollToTop.astro  # Floating scroll-to-top button
│   │   └── ThemeToggle.astro  # Light/dark mode toggle
│   │
│   ├── blog/                  # Blog-specific components
│   │   ├── Breadcrumb.astro
│   │   ├── CtaAffiliate.astro # Non-aggressive end-of-article CTA
│   │   ├── CtaNewsletter.astro
│   │   ├── PostCard.astro     # Article preview card
│   │   ├── PostGrid.astro     # Responsive grid of PostCards
│   │   ├── RelatedArticles.astro
│   │   └── TableOfContents.astro  # Collapsible TOC (H2 + H3)
│   │
│   └── affiliate/             # Monetization components
│       ├── AffiliateDisclaimer.astro
│       ├── ComparisonTable.astro   # Side-by-side product comparison
│       └── ProductCard.astro       # Single product with affiliate CTA
│
├── content/
│   └── blog/                  # MDX articles + co-located images
│
├── layouts/
│   ├── BaseLayout.astro       # Root layout: BaseHead + Header + Footer
│   └── BlogPost.astro         # Article layout: TOC, breadcrumb, reading time
│
├── lib/
│   └── utils.ts               # formatDate, toSlug, truncate, absoluteUrl
│
├── pages/
│   ├── index.astro            # Home page
│   ├── about.astro            # About + affiliate disclosure
│   ├── blog/
│   │   ├── index.astro        # Blog listing with PostGrid
│   │   └── [...slug].astro    # Dynamic article route
│   └── rss.xml.ts             # RSS feed
│
├── styles/
│   └── global.css             # CSS variables, base styles, light/dark theme
│
├── types/
│   └── index.ts               # Domain types: Post, Product, AffiliateLink, Category
│
└── consts.ts                  # SITE_TITLE, SITE_DESCRIPTION, GA_MEASUREMENT_ID
```

---

## 🧞 Commands

All commands are run from the root of the project:

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npx astro check` | TypeScript type-check — must return 0 errors, 0 warnings |

---

## ✍️ Adding Content

Articles live in `src/content/blog/` as `.mdx` files. Images are co-located in the same folder as the article.

### Frontmatter schema

```mdx
---
title: 'Best Desk Fans for Home Office (2026)'
description: 'Keyword-rich description under 160 characters.'
pubDate: 2026-04-01
updatedDate: 2026-04-15        # optional — shows "Updated" date in article
heroImage: './desk-fans.jpg'   # co-located with the MDX file
category: 'cooling'            # 'cooling' | 'ergonomics' | 'reviews'
featured: false                # true = shown as featured card in home
affiliate: true                # true = shows affiliate disclaimer
---
```

### Available components in MDX

```mdx
import ProductCard from '../../components/affiliate/ProductCard.astro';
import ComparisonTable from '../../components/affiliate/ComparisonTable.astro';
import CtaAffiliate from '../../components/blog/CtaAffiliate.astro';
```

### ProductCard usage

```mdx
<ProductCard product={{
  name: "Product Name",
  description: "Short description.",
  price: "$99.99",
  affiliateUrl: "https://amazon.com/...",
  rating: 4.5,
  badge: "Best Overall",
  pros: ["Pro one", "Pro two"],
  cons: ["Con one"]
}} />
```

### CtaAffiliate usage

```mdx
<CtaAffiliate
  title="Ready to upgrade your home office?"
  description="Browse our top picks for warm climate home offices."
  linkText="See all articles"
  linkUrl="/blog"
/>
```

Content schema is defined and validated in `src/content.config.ts`.

---

## 💰 Affiliate Links

All affiliate links must use `rel="nofollow sponsored noopener"` and `target="_blank"`. This is handled automatically by `ProductCard` and `ComparisonTable`.

The `AffiliateDisclaimer` is included automatically in `BlogPost.astro` for all articles with `affiliate: true` in their frontmatter.

### Affiliate programs

| Program | Commission | Status |
| :--- | :--- | :--- |
| Amazon Associates US | 3–10% | Pending application |
| Flexispot | 8–10% | Pending application |
| Autonomous | 8–12% | Pending application |

---

## 🎨 Theme system

The site supports light and dark mode via a `.dark` class on `<html>`. Theme preference is persisted in `localStorage` and applied before first paint (no FOUC).

CSS variables are defined in `src/styles/global.css`:

```css
:root {
  --bg, --bg-subtle, --bg-card, --border,
  --text, --text-muted, --accent, --accent-dark, --accent-soft
}
.dark {
  /* dark mode overrides */
}
```

---

## 🔍 SEO

Every page includes:
- Canonical URL
- Open Graph + Twitter Card meta tags
- `WebSite` JSON-LD schema
- Auto-generated sitemap via `@astrojs/sitemap`

Every article additionally includes:
- `Article` JSON-LD schema with `datePublished`, `dateModified`, `author`, `publisher`
- `BreadcrumbList` JSON-LD schema
- Reading time calculated from word count
- Collapsible Table of Contents (H2 + H3)

---

## 🚀 Deployment

Pushes to `main` trigger automatic deploys on Cloudflare Pages.

| Branch | Environment | URL |
| :--- | :--- | :--- |
| `main` | Production | ergofresco.com |

Build configuration:
- Framework preset: `Astro`
- Build command: `npm run build`
- Output directory: `dist`
- Output mode: `static`

---

## 🔷 TypeScript

Strict mode via `astro/tsconfigs/strict`. Before every commit:

```bash
npx astro check
# Expected: 0 errors, 0 warnings, 0 hints
```

---

## 📚 Documentation

| Document | Description |
| :--- | :--- |
| `docs/ARCHITECTURE.md` | System design, tech decisions, routing, SEO strategy |
| `docs/TECHNICAL_DEBT.md` | Known tech debt with priority and status |