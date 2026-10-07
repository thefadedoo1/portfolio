# Nitin Kaundal — Developer Portfolio

A complete single-page portfolio built with React, TypeScript, Vite, Tailwind CSS v4, Framer Motion and Lucide. Includes dark/light themes, responsive navigation, project interface concepts, accessible forms, editable content, and a downloadable resume.

## Run locally

Requires Node.js 20.19+ (Node 22 LTS recommended) and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

```bash
npm test        # interaction and semantic-accessibility tests
npm run check   # strict TypeScript validation
npm run build   # production build in dist/
npm run preview # preview the production build locally
```

## Structure

```text
public/
  favicon.svg
  Nitin_Kaundal_Resume.pdf
src/
  components/     # navigation, project cards, previews, shared UI, form, footer
  sections/       # hero, projects, about, achievements, experience, skills,
                  # education/certifications, contact
  data/           # profile, projects, experience, skills, achievements, certifications
  hooks/          # persisted theme preference
  App.tsx
  main.tsx
  styles.css      # design tokens, component styles, responsive rules
scripts/
tests/            # interaction and accessibility regression checks
index.html        # page metadata and flash-free initial theme
vite.config.ts    # React/Tailwind plugins, SEO generation, motion chunk
```

Tailwind v4 uses the Vite plugin and `@import "tailwindcss"`; no legacy Tailwind configuration is required. Custom CSS handles the distinctive layout and shared design tokens.

## Content updates

Edit files under `src/data/` to update personal information, experience, skills, achievements, academic records and certifications. UI labels and section introductions live in the respective section components.

Each project accepts optional `repoUrl`, `liveUrl` and `image` properties. No repository or demo URL has been invented. Missing links are omitted, with an email inquiry action available instead. For a real screenshot, add the asset to `public/projects/`, set `image: '/projects/example.webp'`, and supply an optimized image near 800 × 560 pixels. Images are lazy-loaded with explicit dimensions. Without an image, an illustrative React/CSS interface is displayed and labeled as a concept.

Certificates support optional `url`, `credentialId`, `date` and `logo` fields. No missing credential details are fabricated.

Replace `public/Nitin_Kaundal_Resume.pdf` to update the resume. The included one-page PDF was converted from the supplied Word resume with small layout adjustments and unchanged content. Its original contact details remain in the PDF.

## Contact form

No backend or private key is needed. By default the form validates the fields and opens a prefilled draft in the visitor's email application. It clearly says **Continue in email** and never claims the message was sent.

To enable direct delivery:

1. Create a form at https://formspree.io and verify the receiving email as `nitinkoundal2005@gmail.com`.
2. Copy `.env.example` to `.env`.
3. Set `VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID` to the real public form endpoint.
4. Enable Formspree's spam protection / allowed-domain controls as appropriate for your plan.
5. Rebuild or redeploy. Confirm a real delivery from the deployed domain.

The form includes required fields, email validation, whitespace checks, length limits, a hidden honeypot, disabled/loading state, 15-second timeout, failure feedback, and provider-confirmed success. A failed request preserves entered values. Tests mock provider responses and do not send real messages. Formspree owns delivery, filtering and any provider-level quotas.

`VITE_` settings are public build-time values. Never put a secret API key or SMTP password in them. `.env` is ignored by Git.

## Deploy to Vercel

1. Import this directory/repository as a Vite project.
2. Install command: `npm install`; build command: `npm run build`; output: `dist`.
3. Add `VITE_SITE_URL` with your real production origin (for example your assigned Vercel domain). Optionally set `VITE_FORMSPREE_ENDPOINT`.
4. Deploy and verify the resume download, email delivery and social links.
5. If the domain changes, update `VITE_SITE_URL` and redeploy.

`vercel.json` supplies the build settings and basic response security headers. No server rewrites are needed for this single-page, hash-navigation site.

## Deploy to Netlify

1. Import the repository. `netlify.toml` specifies the build command and `dist` output.
2. Add the same environment variables in the deployment settings.
3. Deploy. A drag-and-drop deployment of a locally built `dist` folder also works; configure variables before that local build.

## SEO

Set `VITE_SITE_URL` before production builds. The build injects the canonical link and Open Graph URL, and generates `robots.txt` and an absolute-URL `sitemap.xml`. Without an origin, the canonical is deliberately omitted and the sitemap has no URL entries, avoiding a fabricated domain. Page title, description, Open Graph text, Twitter summary metadata and the NK favicon are supplied. No fabricated social image is referenced.

Private review: https://nitin-kaundal-engineering.jeewanakumari1981.chatgpt.site

The private review deployment is not a public recruiter link. Deploy to Vercel/Netlify or change sharing when you are ready for public access.

## Design and accessibility

- Dark default with a separately designed light palette; preference stored locally when available.
- Self-hosted Inter fonts; no font CDN, stock photos, trackers, video or WebGL.
- Semantic landmarks, skip link, visible focus rings, labeled controls and external-link safety attributes.
- Mobile navigation supports Escape, focus return, close-on-selection and desktop-resize reset.
- Reduced-motion preferences disable CSS movement, smooth scrolling and Framer Motion translations.
- Four accurate project/internship/academic stats animate only once in view.
- Contact copy-email action includes success/failure feedback.
- Project concepts are noninteractive illustrations; no fake live dashboards are presented.

## Verification and limitations

`npm test` covers rendering, internal anchor targets, theme persistence, mobile-menu behavior, email copying, missing project links, required form fields, simulated contact success/failure and axe semantic checks. Color contrast is checked separately for the core palette; jsdom cannot validate layout or render colors.

TypeScript and production builds are validated. Browser-based visual QA, actual mobile overflow checks, animation appearance and Lighthouse scores were **not measured** in the build environment. No Lighthouse score is claimed. External GitHub/LinkedIn URLs exactly match the supplied resume, but remote availability checks were blocked in the environment. Verify them in a normal browser.

Before public launch, check 320/375/430/768/1024/1440px viewports, both themes, 200% zoom, keyboard-only use, reduced motion, loading/error contact states, and a real form delivery. Run Lighthouse against the public production URL.
