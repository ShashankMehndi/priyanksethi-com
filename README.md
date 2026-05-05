# priyanksethi-com

Dr. Priyank Sethi's personal portfolio site — Next.js 16 + React 19 + Tailwind v4. **A doctor portfolio, not a clinic site.** Stunning Dentistry is the brand he founded; transactional flows live there.

Built fresh (not forked from `stunningdentistry-au`) so the IA can be portfolio-shaped (case studies, press, publications, speaking) instead of commercial (book/buy treatments).

## Stack

- **Framework:** Next.js 16.1.6 with App Router + React Compiler + Turbopack
- **Styling:** Tailwind CSS v4 (postcss-only)
- **Type:** TypeScript (strict)
- **Forms:** Server Actions + nodemailer for `/api/enquiry`
- **Analytics:** GA4 (gated on `NEXT_PUBLIC_GA_ID`) + `@vercel/analytics`
- **Content:** Markdown + YAML frontmatter, parsed at server-render via `src/lib/content-loader.ts`

## Repo layout

```text
priyanksethi-com/
├── src/
│   ├── app/                       # 28 routes (App Router)
│   │   ├── page.tsx               # Homepage (DoctorHero + composed sections)
│   │   ├── layout.tsx             # Root layout (Header, Footer, GA, fonts)
│   │   ├── globals.css            # Tailwind import + brand CSS variables
│   │   ├── about/, credentials/, awards/, memberships/, philosophy/,
│   │   │   global-practice/, stunning-dentistry/  # markdown-driven simple pages
│   │   ├── case-studies/                          # hub
│   │   │   ├── page.tsx                            # /case-studies
│   │   │   ├── celebrity/page.tsx                  # /case-studies/celebrity
│   │   │   └── case/[slug]/page.tsx                # /case-studies/case/<slug>
│   │   ├── press/                                  # hub + [slug]
│   │   ├── publications/, speaking/                # markdown scaffolds
│   │   ├── testimonials/{,written,video}/          # 3 testimonials routes
│   │   ├── clinics/{,[slug]}/                      # hub + 2 clinic pages
│   │   ├── e-consult/, contact/, blog/             # forms / leads / scaffold
│   │   ├── privacy/, terms/                        # legal scaffolds
│   │   ├── api/enquiry/route.ts                    # form handler (nodemailer)
│   │   ├── sitemap.ts, robots.ts, not-found.tsx
│   ├── components/
│   │   ├── layout/{Header,Footer,PageHero,MarkdownPage}.tsx
│   │   ├── sections/                                # portfolio-specific sections
│   │   │   ├── DoctorHero.tsx                       # name + portrait + credentials
│   │   │   ├── CredentialsList.tsx                  # numbered card grid
│   │   │   ├── CaseStudyGrid.tsx + ClinicCard.tsx
│   │   │   ├── PressStrip.tsx                       # press logos in a row
│   │   │   ├── GlobalReachStat.tsx                  # 1,000+ patients / 30+ countries
│   │   │   ├── ReviewsWall.tsx                      # 19 verified Google reviews
│   │   │   ├── VideoTestimonialsGrid.tsx            # YouTube embed grid
│   │   │   ├── EConsultForm.tsx                     # client form posting /api/enquiry
│   │   │   └── CtaRail.tsx                          # bottom CTA (E-Consult + WhatsApp)
│   │   ├── ui/{Container,Section,Button}.tsx        # primitives
│   │   └── seo/PersonSchema.tsx                     # JSON-LD Person+Dentist
│   ├── lib/
│   │   ├── content-loader.ts        # walks Doctor Priyank Sethi Content/India/, parses YAML frontmatter
│   │   ├── markdown.tsx             # tight Markdown→React renderer (no react-markdown dep)
│   │   ├── seo.ts                   # buildMetadata helper (single canonical, no hreflang)
│   │   └── brand-tokens.ts          # palette + typography tokens (mirror of globals.css :root)
│   └── config/
│       └── doctor.ts                # SINGLE SOURCE OF TRUTH for brand, contact, social, clinics
├── Doctor Priyank Sethi Content/India/   # 35 markdown files (from Round 2 extraction)
├── public/images/                         # 134 assets copied from legacy site
├── package.json, tsconfig.json, tailwind.config.ts, postcss.config.mjs,
│   next.config.ts, eslint.config.mjs, .env.example
└── README.md (this file)
```

## Key visual rules

The portfolio reuses the engine's design language (Inter + Playfair Display, warm-cream section bands, gold accent) but with a **different palette** to differentiate from Stunning Dentistry:

- **Gold** `#FFB301` (primary brand), `#FFD15C` soft, `#A87400` deep
- **Ink** `#222222` (primary text / surfaces), `#4A4A4A` soft
- **Accent** `#DE3926`
- **Section bands**: `--section-surface` `#FFFAF0`, `--section-surface-alt` `#F5EFE0`

Tokens live in `src/lib/brand-tokens.ts` and are mirrored as CSS custom properties in `src/app/globals.css`. Tailwind exposes them via `bg-brand-gold`, `text-brand-ink`, `bg-section-warm`, etc.

## Content contract

Every markdown file in `Doctor Priyank Sethi Content/India/` has YAML frontmatter:

```yaml
---
title: "..."
description: "..."
url: /path                # routes the file
h1: "..."
ogImage: /images/...
schema: Person | Organization | DentalClinic | ImageGallery | ...
# (optional rich data, e.g. for the case-studies hub)
cases:
  - { name, slug, image, href, celebrity }
reviews:
  - { name, date, rating, quote, avatar }
videos:
  - { youtubeId, title }
---

# H1
body markdown ...
```

Parsed by `src/lib/content-loader.ts` into a `ContentPage` and looked up by `getPage(url)`. The body is rendered via `src/lib/markdown.tsx` (a small handwritten renderer — no `react-markdown` dependency).

## Develop

```bash
npm install
npm run dev          # turbopack dev server on http://localhost:3000
npm run build        # static-rendered for all 35 content pages
npm run start        # serve the built output
npm run lint
```

## Environment

Copy `.env.example` to `.env.local`. The relevant variables:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_GA_ID` | GA4 Measurement ID. Gate the analytics tag in `app/layout.tsx`. |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Reserved — not yet wired into the form. |
| `ENQUIRY_EMAIL` | Where E-Consult and contact submissions are sent. Defaults to `enquiry@stunningdentistry.com`. |
| `ENQUIRY_FROM_EMAIL` | From-address used by nodemailer. Use a verified domain. |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | nodemailer transport. If unset, the API logs payloads but does not deliver. |

## Deployment notes

- Vercel project: target the **`sd-hub`** team (not the personal account that owns `stunningdentistry-com`).
- Domain: `priyanksethi.com`. Add the CNAME at the registrar; lower TTL 48h before cutover.
- Cutover plan + DNS steps are in `/Users/hope_rebirth/.claude/plans/its-our-old-folmat-velvet-eagle.md`.
- **No hreflang** to the SD network — this is a different brand. Canonical is always `https://priyanksethi.com${pathname}`.

## What's still scaffolded

The structure is wired; certain pages need Dr. Sethi's voice or factual data before launch:

- **Case studies** (6 files): treatment summary, story, outcome per case
- **Press features** (5 files): publication name, date, headline, source URL
- **`/philosophy`**: 300–500 words in Dr. Sethi's voice
- **`/stunning-dentistry`**: founding story (~400 words)
- **`/global-practice`**: anonymised stories per region; map visual
- **`/awards`, `/memberships`**: specific entries with year + awarding body
- **`/publications`**: paper list with DOIs
- **`/speaking`**: talk list with venue + date
- **`/blog`**: scaffold only — no posts yet
- **`/privacy`, `/terms`**: legal review by counsel familiar with India DPDP + GDPR
- **`public/og.png`**: 1200×630 OG composite
- **GA4 + reCAPTCHA keys** (env)

See `Round 2/priyanksethi.com/_extracted/README.md` for the full hand-off list.

## Why a fresh build, not a fork of stunningdentistry-au

The engine's 25+ section components (HeroSection, AngelPatientProgram, TransparentPricingSection, AsiasTopDentistsSection, etc.) and 10-region machinery (region configs, hreflang generator, master-prices, currency switcher) are tuned for a multi-region commercial clinic site. Forking and stripping them to land at a single-tenant doctor portfolio would leave more dead code than working code. The fresh build inherits the engine's **visual language** (typography, section rhythm, gold/cream palette, button shapes) while keeping the IA portfolio-shaped.
