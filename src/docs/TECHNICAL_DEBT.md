# Technical Debt

## TD-001 — Migrate existing components to Tailwind CSS

**Status:** Pending  
**Priority:** Low  
**Created:** 2026-03-22

### Context
Tailwind CSS v4 is installed and configured in the project. However, all components
built during Phase 1 use scoped `<style>` blocks with CSS custom properties instead
of Tailwind utility classes. This was a conscious decision to ship faster.

### Scope
Files to migrate:
- `src/styles/global.css` — keep CSS variables, remove manual base styles covered by Tailwind
- `src/components/common/Header.astro`
- `src/components/common/Footer.astro`
- `src/layouts/BaseLayout.astro`
- `src/layouts/BlogPost.astro`
- `src/pages/index.astro`
- `src/pages/about.astro`
- `src/pages/blog/index.astro`

### Acceptance criteria
- All scoped `<style>` blocks replaced with Tailwind utility classes
- CSS variables for theming (`--bg`, `--text`, `--accent`, etc.) preserved in `global.css`
- Dark mode continues working via `.dark` class on `<html>`
- `npx astro check` returns 0 errors, 0 warnings, 0 hints
- Visual regression: no visible difference before and after migration