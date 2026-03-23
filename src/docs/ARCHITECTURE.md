# ErgoFresco — Architecture Document

**Version:** 1.0  
**Last updated:** 2025  
**Maintainer:** [@pepzarate](https://github.com/pepzarate)

---

## 1. Project Overview

ErgoFresco (`ergofresco.com`) is an English-language affiliate blog targeting remote workers in warm climates. The site provides ergonomics and cooling product recommendations, monetized primarily through Amazon Associates and direct brand affiliate programs.

### Business goals

- Generate passive income via affiliate commissions ($100–200 USD/month target at 6–12 months)
- Capture organic search traffic through evergreen SEO content
- Scale content and monetization without proportional increase in operational cost

### Target audience

- Remote workers, freelancers, and developers working from home
- Age 20–45, English-speaking markets (US, AU, UK)
- Pain points: heat discomfort, poor ergonomics, reduced productivity

---

## 2. Tech Stack

| Layer | Technology | Version | Rationale |
| :--- | :--- | :--- | :--- |
| Framework | [Astro](https://astro.build) | 5.x | Static output, zero JS by default, excellent SEO performance |
| Styles | [Tailwind CSS](https://tailwindcss.com) | 4.x | Utility-first, integrated via `@tailwindcss/vite` (no config file) |
| Language | TypeScript | strict mode | Type safety across all components and utilities |
| Content | MDX via Astro Content Collections | — | Schema validation, type-safe frontmatter |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com) | — | Free tier, unlimited bandwidth, global CDN, integrated DNS |
| DNS | Cloudflare | — | Same account as hosting, automatic SSL |
| Analytics | Google Analytics 4 | — | Traffic and conversion tracking |
| Email | Brevo | Free tier | Newsletter and automated email sequences |
| CI/CD | Cloudflare Pages (auto-deploy) | — | Every push to `main` triggers a production build |

### Key architectural decision: Astro over Next.js

Astro was chosen over Next.js because ErgoFresco is a **content site, not a web application**. Astro generates fully static HTML with zero client-side JavaScript by default, which directly benefits Core Web Vitals and SEO rankings — the primary growth channel. Next.js adds unnecessary runtime complexity for this use case.

### Key architectural decision: Cloudflare Pages over Vercel

Both are viable. Cloudflare Pages was chosen because the domain (`ergofresco.com`) is managed through Cloudflare, consolidating DNS, SSL, and hosting in a single dashboard. This simplifies operations for a small team.

---

## 3. Repository Structure

```text
ergofresco/
├── docs/
│   └── ARCHITECTURE.md        # This document
├── public/
│   ├── fonts/                 # Self-hosted .woff files (Atkinson)
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── images/
│   │       ├── blog/          # Article cover images (processed by Astro Image)
│   │       └── products/      # Affiliate product images
│   │
│   ├── components/
│   │   ├── common/            # Domain-agnostic, reusable across any page
│   │   │   ├── BaseHead.astro     # <head> with SEO meta tags, OG, Twitter Card
│   │   │   ├── Header.astro       # Site navigation
│   │   │   ├── Footer.astro       # Site footer with affiliate disclaimer link
│   │   │   ├── FormattedDate.astro
│   │   │   └── HeaderLink.astro
│   │   │
│   │   ├── blog/              # Components specific to article pages
│   │   │   ├── PostCard.astro       # Article preview card for grids/lists
│   │   │   ├── PostGrid.astro       # Responsive grid of PostCards
│   │   │   └── TableOfContents.astro
│   │   │
│   │   └── affiliate/         # Monetization components
│   │       ├── ProductCard.astro      # Single product with affiliate CTA
│   │       ├── ComparisonTable.astro  # Side-by-side product comparison
│   │       └── AffiliateDisclaimer.astro  # FTC-required disclosure
│   │
│   ├── content/
│   │   └── blog/              # MDX articles (see Content Model section)
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro   # Root layout: BaseHead + Header + Footer + slot
│   │   └── BlogPost.astro     # Article layout: extends BaseLayout
│   │
│   ├── lib/
│   │   └── utils.ts           # Pure utility functions (date formatting, slugs, etc.)
│   │
│   ├── pages/
│   │   ├── index.astro            # Home page
│   │   ├── about.astro            # About ErgoFresco
│   │   ├── blog/
│   │   │   ├── index.astro        # Blog listing page
│   │   │   └── [...slug].astro    # Dynamic article route
│   │   └── rss.xml.ts             # RSS feed endpoint
│   │
│   ├── styles/
│   │   └── global.css         # Tailwind v4 import + global base styles
│   │
│   ├── types/
│   │   └── index.ts           # Shared domain types: Product, PostMeta, AffiliateLink
│   │
│   └── consts.ts              # Site-wide constants: SITE_TITLE, SITE_DESCRIPTION, etc.
│
├── astro.config.mjs           # Astro config: integrations, site URL, Vite plugins
├── tailwind.config.mjs        # Not used in v4 — config lives in global.css via @theme
├── tsconfig.json              # Extends astro/tsconfigs/strict
├── package.json
└── README.md
```

---

## 4. Content Model

Articles are stored as `.mdx` files in `src/content/blog/` and validated against a schema defined in `src/content.config.ts`.

### Frontmatter schema

```ts
// src/content.config.ts
{
  title: z.string(),
  description: z.string().max(160),   // SEO meta description limit
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),    // Relative path to src/assets/images/blog/
}
```

### Article naming convention

Files should use kebab-case and include the primary keyword:

```
src/content/blog/best-desk-fans-home-office.mdx
src/content/blog/how-to-stay-cool-working-from-home.mdx
src/content/blog/ergonomic-chairs-mesh-back-review.mdx
```

### Content categories

| Category | Purpose | Target length |
| :--- | :--- | :--- |
| Informational | How-to guides, tips | 1,200–2,000 words |
| Product reviews | Single product deep-dive | 1,500–2,500 words |
| Comparisons | Best-of lists, head-to-head | 2,000–3,500 words |

---

## 5. Routing

Astro uses file-based routing. All routes are statically generated at build time.

| URL | File | Description |
| :--- | :--- | :--- |
| `/` | `src/pages/index.astro` | Home page |
| `/about` | `src/pages/about.astro` | About page |
| `/blog` | `src/pages/blog/index.astro` | Blog listing |
| `/blog/[slug]` | `src/pages/blog/[...slug].astro` | Article page |
| `/rss.xml` | `src/pages/rss.xml.ts` | RSS feed |
| `/sitemap-index.xml` | Auto-generated by `@astrojs/sitemap` | Sitemap |

---

## 6. Monetization Architecture

Affiliate links are the primary revenue source. The following rules apply across the codebase:

1. **Every page with affiliate links** must render `<AffiliateDisclaimer />` at the top of the article body — required by Amazon Associates TOS and FTC guidelines.
2. **Affiliate links** must use `rel="nofollow sponsored"` and `target="_blank"` attributes.
3. **Click tracking** is implemented via GA4 custom events on all affiliate link clicks.
4. **Amazon Associates tracking ID** is stored in `src/consts.ts` as `AMAZON_TRACKING_ID` — never hardcoded in individual components.

### Affiliate programs (in priority order)

| Program | Commission | Use case |
| :--- | :--- | :--- |
| Amazon Associates US | 3–10% | Default for all products |
| Flexispot Affiliate | 8–10% | Standing desks |
| Autonomous Affiliate | 8–12% | Ergonomic chairs and desks |
| ShareASale / Impact | Varies | Brand-specific programs |

---

## 7. SEO Strategy

SEO is the primary traffic acquisition channel. The following technical SEO measures are implemented:

- **Canonical URLs** — set in `BaseHead.astro` via `Astro.url.pathname`
- **Open Graph + Twitter Card** — meta tags in `BaseHead.astro`, image optional
- **Sitemap** — auto-generated by `@astrojs/sitemap`, submitted to Google Search Console
- **RSS feed** — available at `/rss.xml`
- **Structured data** — to be implemented per article (Article, Product, Review schemas)
- **Image optimization** — all images processed through Astro's built-in `<Image />` component
- **Core Web Vitals** — zero runtime JS by default, fonts preloaded in `BaseHead.astro`

### Target keyword strategy

Focus on **long-tail commercial intent** keywords with low competition:

- `best [product] for [use case]`
- `[product] review [year]`
- `how to [solve heat/ergonomics problem]`

---

## 8. Development Workflow

### Prerequisites

- Node.js v18 or higher (v22 LTS recommended)
- npm v10+
- Git

### Local setup

```bash
git clone https://github.com/pepzarate/ergofresco.git
cd ergofresco
npm install
npm run dev
```

Dev server runs at `http://localhost:4321`.

### Before every commit

```bash
npx astro check   # Must return 0 errors, 0 warnings
```

### Branch strategy

| Branch | Purpose |
| :--- | :--- |
| `main` | Production — auto-deploys to ergofresco.com |
| `feat/*` | New features or components |
| `content/*` | New articles or content updates |
| `fix/*` | Bug fixes |

### Commit convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add ProductCard component
fix: correct affiliate link rel attributes
content: add best-desk-fans article
docs: update ARCHITECTURE.md
style: adjust hero section spacing
```

---

## 9. Environment & Configuration

All site-wide constants live in `src/consts.ts`. No `.env` file is required for local development. If environment variables are added in the future (e.g., for API keys), they must be prefixed with `PUBLIC_` to be accessible in Astro components.

```ts
// src/consts.ts
export const SITE_TITLE = 'ErgoFresco';
export const SITE_DESCRIPTION = 'Stay cool. Work better.';
export const AMAZON_TRACKING_ID = 'ergofresco-20'; // placeholder
```

---

## 10. Performance Targets

| Metric | Target |
| :--- | :--- |
| Lighthouse Performance | 95+ |
| Lighthouse SEO | 100 |
| Lighthouse Accessibility | 95+ |
| First Contentful Paint | < 1.2s |
| Cumulative Layout Shift | < 0.1 |

Run a local Lighthouse audit with:

```bash
npm run build && npm run preview
# Then audit http://localhost:4321 in Chrome DevTools
```
