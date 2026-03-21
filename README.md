# ErgoFresco 🧊

> Stay cool. Work better.

Affiliate blog focused on ergonomics and cooling solutions for remote workers in warm climates. Built with Astro, Tailwind CSS v4, and deployed on Cloudflare Pages.

**Live site:** [ergofresco.com](https://ergofresco.com)

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| Framework | [Astro 5](https://astro.build) |
| Styles | [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite` |
| Content | Markdown / MDX via Astro Content Collections |
| Language | TypeScript (strict mode) |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com) |
| Analytics | Google Analytics 4 |

---

## 📁 Project Structure

```text
src/
├── assets/
│   └── images/
│       ├── blog/          # Article cover images
│       └── products/      # Affiliate product images
├── components/
│   ├── common/            # Global reusable components
│   │   ├── BaseHead.astro
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── FormattedDate.astro
│   ├── blog/              # Blog-specific components
│   │   ├── PostCard.astro
│   │   ├── PostGrid.astro
│   │   └── TableOfContents.astro
│   └── affiliate/         # Monetization components
│       ├── ProductCard.astro
│       ├── ComparisonTable.astro
│       └── AffiliateDisclaimer.astro
├── content/
│   └── blog/              # MDX articles
├── layouts/
│   ├── BaseLayout.astro   # Root layout with Header/Footer
│   └── BlogPost.astro     # Article layout
├── lib/
│   └── utils.ts           # Shared utility functions
├── pages/
│   ├── index.astro
│   ├── about.astro
│   ├── blog/
│   │   ├── index.astro
│   │   └── [...slug].astro
│   └── rss.xml.ts
├── styles/
│   └── global.css         # Tailwind v4 + global styles
├── types/
│   └── index.ts           # Domain types (Product, PostMeta, etc.)
└── consts.ts              # Site-wide constants
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
| `npx astro check` | TypeScript type-check all `.astro` files |
| `npx astro add [integration]` | Add an Astro integration |

---

## ✍️ Adding Content

Articles live in `src/content/blog/` as `.mdx` files. Each file requires the following frontmatter:

```mdx
---
title: 'Best Desk Fans for Home Office (2025)'
description: 'A short, keyword-rich description under 160 characters.'
pubDate: 2025-06-01
updatedDate: 2025-06-15   # optional
heroImage: '../../assets/images/blog/best-desk-fans.jpg'
---
```

Content schema is defined and validated in `src/content.config.ts`.

---

## 💰 Affiliate Links

All pages containing affiliate links must include the `AffiliateDisclaimer` component at the top of the article body. This is required by Amazon Associates TOS and FTC guidelines.

```astro
import AffiliateDisclaimer from '../../components/affiliate/AffiliateDisclaimer.astro';

<AffiliateDisclaimer />
```

---

## 🚀 Deployment

The project deploys automatically to Cloudflare Pages on every push to `main`.

| Branch | Environment | URL |
| :--- | :--- | :--- |
| `main` | Production | ergofresco.com |

To trigger a manual deploy, push any commit to `main` or trigger a build from the Cloudflare Pages dashboard.

---

## 🔷 TypeScript

This project runs TypeScript in strict mode via `astro/tsconfigs/strict`. Before pushing, always validate:

```bash
npx astro check
```

Expected output: `0 errors, 0 warnings, 0 hints`