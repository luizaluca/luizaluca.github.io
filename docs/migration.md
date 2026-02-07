# Jekyll -> Astro Migration Plan for drluca.dental

## 1) Objective

Migrate the existing Jekyll + Tailwind (CDN) site from `old/` to a modern Astro + Tailwind architecture that is:

- URL-stable (legacy links keep working).
- Easy to scale for future medical blog content.
- Easy for Dr. Luca to maintain.
- Ready for GitHub Pages deployment with custom domain `drluca.dental`.

## 2) Legacy Site Inventory (from `old/`)

### 2.1 Current pages and routes

- `old/index.html` -> `/`
- `old/galeria-zambetelor.html` -> `/galeria-zambetelor/`
- `old/404.html` -> `/404.html`
- `old/_posts/2022-7-1-eapd.md` -> date permalink (Jekyll pretty URL)
- `old/_posts/2022-7-18-abces.md` -> date permalink (Jekyll pretty URL)
- `old/_posts/2022-8-24-autismul.md` -> date permalink (Jekyll pretty URL)
- `old/_posts/2025-2-28-anestezia-generala.md` -> date permalink (Jekyll pretty URL)
- `old/_posts/2025-7-3-sedare-intravenoasa.md` -> date permalink (Jekyll pretty URL)
- `old/_posts/2025-8-16-tratament-de-canal.md` -> date permalink (Jekyll pretty URL)

### 2.2 Shared legacy template behavior that must be preserved

- Top bar + navigation + mobile menu from `old/_layouts/default.html`.
- Footer phone CTA from `old/_layouts/default.html`.
- Post layout from `old/_layouts/post.html`:
  - featured image
  - blog prose styling via `old/assets/css/blog.scss`
  - optional in-article banner (`banner`, `banner_after_paragraph`)
  - author/profile block below article
- SEO and JSON-LD in `old/_includes/head.html`.
- GTM snippet in `old/_includes/gtm.html` with `GTM-KDHH99M`.
- Custom domain exists as `old/CNAME` and must become `public/CNAME`.

### 2.3 Content/asset notes

- Blog markdown content is already substantial and should be migrated as source-of-truth content.
- Several posts contain inline images in markdown (`/assets/img/posts/...`).
- Large media footprint under `old/assets/img/**` must be preserved under identical public URLs when possible.
- Tag pages exist in Jekyll layout files, but all current posts use `tags: []`.

## 3) Foundation Setup Plan (start here)

### 3.1 Create Astro baseline

- Initialize Astro project in repo root (outside `old/`).
- Use static output for GitHub Pages.
- Add Tailwind via Astro integration (no CDN runtime Tailwind in production).
- Add `@astrojs/sitemap`.
- Add `@astrojs/mdx` only if MDX features are needed (optional for phase 1).

Target core config in `astro.config.mjs`:

- `site: "https://drluca.dental"`
- `output: "static"`
- trailing-slash policy aligned with current pretty URLs.

### 3.2 Define scalable project structure

Use this shape:

- `src/layouts/`
- `src/components/site/` (header, footer, nav, contact CTA)
- `src/components/home/` (homepage sections)
- `src/components/blog/` (post hero, prose wrapper, article card, inline banner)
- `src/components/seo/` (meta + structured data)
- `src/content/blog/` (all posts)
- `src/content/config.ts` (schema)
- `src/data/site.ts` (phone, social, organization data)
- `src/pages/` (route files)
- `public/assets/` (migrated static images)
- `public/CNAME`

### 3.3 Move design tokens from ad-hoc to maintainable system

- Convert legacy Tailwind custom colors into `tailwind.config.*` theme extension.
- Keep typography choices explicit in Tailwind/base CSS.
- Port `.blog-content` styles into a scoped prose class (`.article-prose`) in global CSS.

### 3.4 Content model for long-term blog scalability

Create strict schema in `src/content/config.ts` with fields like:

- `title` (string)
- `description` (string, optional but recommended)
- `publishedDate` (date)
- `publishedDateLabel` (string for localized display, optional)
- `image` (string)
- `imageAlt` (string)
- `tags` (string[])
- `banner` (string, optional)
- `bannerAfterParagraph` (number, optional)
- `draft` (boolean, default false)
- `seoTitle`, `seoDescription`, `canonical`, `noindex` (optional)

Why this matters:

- Keeps editorial data explicit.
- Makes rendering deterministic.
- Enables future filters, category pages, and automation.

### 3.5 URL compatibility strategy (hard requirement)

- Preserve existing routes for homepage, gallery, 404.
- Preserve each existing post URL exactly.
- Generate post pages using date + slug pattern matching Jekyll output.
- Add redirect/alias pages for any URL mismatch discovered during QA.

### 3.6 SEO and trust signals baseline

- Global `<head>` component with canonical, OpenGraph, Twitter cards, locale.
- Keep Person JSON-LD with Dr. Elena Luiza Luca profile data.
- Keep XML sitemap.
- Add robots.txt.
- Maintain first-person medical tone in content migration (no marketing rewrite during technical migration).

### 3.7 Analytics and privacy

- Keep GTM ID `GTM-KDHH99M` and load script only in production build.
- Document where GTM is injected so it is auditable.

### 3.8 GitHub Pages deployment setup

- Add/verify workflow: install deps, build Astro, upload artifact, deploy pages.
- Ensure Pages is configured for GitHub Actions deployment.
- Ensure `public/CNAME` contains exactly:
  - `drluca.dental`

## 4) Page-by-Page Migration Plan

## 4.1 Shared components to build first

Build these before page migration:

- `BaseLayout.astro` (head + body shell)
- `SiteHeader.astro`
- `MobileMenu.astro`
- `SiteFooter.astro`
- `SeoHead.astro`
- `PhoneCTA.astro`
- `SectionTitle.astro`
- `ArticleCard.astro`
- `InlineContactBanner.astro`
- `AuthorBioBlock.astro`

## 4.2 Migrate `old/index.html` -> `src/pages/index.astro`

Sections to split into reusable components:

- Hero intro with background overlay and phone CTA button.
- "Draga parinte" reassurance block.
- Services grid (4 cards currently).
- "Cine sunt eu" visual band.
- Doctor profile summary block.
- Blog preview list (latest posts cards).

Components needed:

- `HomeHero.astro`
- `ParentMessage.astro`
- `ServicesGrid.astro`
- `AboutBand.astro`
- `DoctorProfile.astro`
- `HomeBlogFeed.astro`

Data strategy:

- Move repeated text/content into `src/data/site.ts` or section data files so future edits do not require layout edits.

## 4.3 Migrate `old/galeria-zambetelor.html` -> `src/pages/galeria-zambetelor.astro`

Sections to preserve:

- Hero typography block.
- Full-width photo section.
- Benefits + image case blocks.
- Before/after strip.
- Testimonial gradient overlay section.
- Closing image and signature.

Components needed:

- `GalleryHero.astro`
- `GalleryPhotoStrip.astro`
- `GalleryBenefits.astro`
- `BeforeAfterShowcase.astro`
- `TestimonialsSection.astro`
- `GalleryClosing.astro`

Implementation notes:

- Keep same route `/galeria-zambetelor/`.
- Keep media under `/assets/img/galeria/...` to avoid path churn.

## 4.4 Migrate `old/404.html` -> `src/pages/404.astro`

- Keep minimal and clear fallback page.
- Include a strong CTA back to homepage and phone contact.
- Validate that Astro output is exactly `404.html`.

## 4.5 Migrate blog post template (`old/_layouts/post.html`)

Create `src/layouts/BlogPostLayout.astro` with:

- Post title
- Optional featured image
- Styled article body
- Optional banner insertion after paragraph N
- Author block and "Mai multe despre mine" CTA

Core technical requirement:

- Implement deterministic paragraph-based banner insertion for markdown content when `banner` exists.

## 4.6 Migrate each legacy post to `src/content/blog/*.md`

Migration approach for all posts:

- Keep original Romanian content and first-person voice.
- Normalize frontmatter to new schema.
- Keep image references stable (`/assets/img/...`).
- Ensure legacy URL is emitted.

Post mapping list:

- `old/_posts/2022-7-1-eapd.md`
  - slug: `eapd`
  - target route: legacy date route
  - components: `BlogPostLayout`, `AuthorBioBlock`
- `old/_posts/2022-7-18-abces.md`
  - slug: `abces`
  - target route: legacy date route
  - components: `BlogPostLayout`, `AuthorBioBlock`
- `old/_posts/2022-8-24-autismul.md`
  - slug: `autismul`
  - target route: legacy date route
  - components: `BlogPostLayout`, `AuthorBioBlock`
- `old/_posts/2025-2-28-anestezia-generala.md`
  - slug: `anestezia-generala`
  - target route: legacy date route
  - uses in-article banner (`banner`)
  - components: `BlogPostLayout`, `InlineContactBanner`, `AuthorBioBlock`
- `old/_posts/2025-7-3-sedare-intravenoasa.md`
  - slug: `sedare-intravenoasa`
  - target route: legacy date route
  - uses in-article banner (`banner_after_paragraph: 2`)
  - components: `BlogPostLayout`, `InlineContactBanner`, `AuthorBioBlock`
- `old/_posts/2025-8-16-tratament-de-canal.md`
  - slug: `tratament-de-canal`
  - target route: legacy date route
  - uses in-article banner (`banner_after_paragraph: 2`)
  - contains multiple inline images (`/assets/img/posts/tratament_canal/*`)
  - components: `BlogPostLayout`, `InlineContactBanner`, `AuthorBioBlock`

## 4.7 Blog index and discoverability (new, scalable)

Current site surfaces posts only on homepage. For scalability:

- Add `src/pages/blog/index.astro` with searchable/sortable card list.
- Keep homepage feed for "latest" posts.
- Optional phase 2: tag pages only when tags become non-empty.

## 5) Routing and Redirect Plan

### 5.1 Route rules

- Keep these stable:
  - `/`
  - `/galeria-zambetelor/`
  - `/404.html`
  - every current dated post URL

### 5.2 Redirect safety net

- Build a legacy URL manifest (from Jekyll build output or deterministic mapping script).
- Compare against Astro generated routes.
- Generate static redirect pages for mismatches.

## 6) Content and Component Governance for Dr. Luca

### 6.1 Authoring workflow

- New article = create markdown file in `src/content/blog/` with validated frontmatter.
- Featured image path convention:
  - `/assets/img/posts/<slug>.png`
- Inline gallery path convention:
  - `/assets/img/posts/<slug>/<n>.png`

### 6.2 Editorial checklist (lightweight)

Per article before publish:

- Title and meta description are specific and parent-friendly.
- Medical claims are clear and non-sensational.
- Includes concrete "what to do next" guidance for parents.
- Internal links to related articles where relevant.
- Image alt text present.

### 6.3 Technical checklist (lightweight)

Per article before publish:

- Frontmatter passes schema validation.
- Build succeeds.
- Canonical URL correct.
- OpenGraph image resolves.

## 7) Delivery Phases and Milestones

## Phase 0 - Preparation (0.5 day)

- Freeze content in `old/` during migration window.
- Export legacy URL list.
- Confirm domain and Pages settings.

## Phase 1 - Foundation (1 day)

- Astro scaffold + Tailwind + sitemap.
- Base layout, SEO head, global styles.
- Public asset migration and `public/CNAME`.
- GitHub Actions workflow.

## Phase 2 - Shared UI shell (1 day)

- Header, mobile nav, footer, phone CTA.
- Reusable typography and section primitives.

## Phase 3 - Page migration (1-2 days)

- Migrate homepage.
- Migrate gallery page.
- Migrate 404.
- Migrate post layout + all six blog posts.

## Phase 4 - URL/SEO/QA hardening (1 day)

- URL parity checks.
- Metadata, structured data, sitemap, robots checks.
- Mobile responsiveness and accessibility pass.
- Performance pass (image sizing/lazy loading).

## Phase 5 - Launch and stabilization (0.5 day)

- Deploy to GitHub Pages.
- Verify custom domain and SSL.
- Smoke-test core pages and top traffic URLs.

## 8) Acceptance Criteria

Migration is complete when:

- Astro production build succeeds.
- All legacy pages/posts resolve at expected URLs (or redirect cleanly).
- Tailwind styles are compiled locally (no CDN dependence).
- GTM works in production mode only.
- `public/CNAME` is present and correct (`drluca.dental`).
- Homepage, gallery, and all migrated posts render correctly on desktop/mobile.

## 9) Risks and Mitigations

- Risk: legacy post URL mismatch due to date formatting differences.
  - Mitigation: explicit route-generation logic + redirect manifest.
- Risk: image path breakage in markdown.
  - Mitigation: preserve `/assets/img/**` public paths and run link/image audit.
- Risk: regression in banner insertion behavior.
  - Mitigation: snapshot-test banner placement for posts that define banner fields.
- Risk: SEO regression during template rewrite.
  - Mitigation: metadata parity checklist and canonical/OG validation.

## 10) Notes

- Referenced skill docs mentioned `references/dr-luca-positioning.md` and `references/migration-playbook.md`, but these files are not present in this workspace. This plan therefore uses the live legacy content and current repo structure as source-of-truth.
