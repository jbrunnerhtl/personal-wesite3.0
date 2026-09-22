## Why

Jan Brunner needs a personal portfolio (personal-website3.0) that presents his work as a Software Development student at HTL Leonding, replacing personal-website2.0. The first iteration of this change ("Liquid Chrome & Iridescent Luxury") looked ambitious but ran poorly (CPU-side mesh deformation, re-renders on every scroll event, backdrop blur over an animated canvas) and showed content that did not match his GitHub (invented metrics, a placeholder email, a contact form that sent nothing). This change delivers a smooth, readable, bilingual portfolio whose content is sourced from github.com/jbrunnerhtl.

## What Changes

- Next.js App Router site with Tailwind CSS v4, React Three Fiber / drei, Framer Motion and Lenis.
- A liquid chrome 3D orb as a fixed background layer: GPU-side distortion, procedural studio lighting (no HDR download), scroll/pointer choreography per layout, on-demand rendering, deferred loading, and a static gradient where 3D would cost more than it adds.
- A calm editorial design system with dark / light / system color modes, WCAG AA text contrast, and responsive layouts from 320px to 2560px.
- English and German content at `/en` and `/de`, with a proxy that redirects `/` by saved choice or browser language, and an in-place language switch.
- Hero, About, Projects, Skills and Contact sections with facts verified against Jan's public repositories; live GitHub stats; count-up numbers.
- Contact via visible email (mailto + copy) and GitHub; a localized, themed 404 page; the GitHub avatar as browser icon.
- Removed from the first iteration: custom cursor, 3D tilt cards, glassmorphism surfaces, orb dragging, confetti and the non-functional contact form. The Prolog project and Prolog are intentionally not featured.

## Capabilities

### New Capabilities
- `canvas-3d-experience`: The background orb, its scroll/pointer choreography, on-demand rendering and deferred/conditional loading.
- `portfolio-ui`: Design system and color modes, contrast, smooth scrolling, responsive navigation, bilingual content, hero entrance and count-ups, contact options, 404 page, browser icon.
- `project-showcase`: Featured projects with verified data, more repositories, skills overview and live GitHub statistics.

### Modified Capabilities

None (new greenfield project).

## Impact

- **Codebase**: Next.js 16 app under `src/app/[lang]` (root layout per locale), `src/proxy.ts` for locale redirects, `src/i18n` dictionaries, `src/app/global-not-found.tsx` (requires `experimental.globalNotFound` in `next.config.ts`).
- **Dependencies**: `three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion`, `lenis`, `lucide-react`; `canvas-confetti` removed.
- **Performance**: Initial JavaScript no longer includes three.js (~201 KB instead of ~457 KB in headless measurement); the idle page no longer renders the canvas.
- **Data**: Profile, projects and skills live in `src/data/portfolioData.ts` (facts) and `src/i18n/dictionaries` (copy); stats are fetched from the GitHub API with hourly revalidation and static fallbacks.
