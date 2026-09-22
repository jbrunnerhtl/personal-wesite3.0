## Context

`personal-website3.0` replaces `personal-website2.0` as Jan Brunner's portfolio. A first iteration built a "Liquid Chrome & Iridescent Luxury" site that stuttered and contained unverified content. The redesign keeps the chrome orb as a signature element but prioritizes smoothness, readability and accurate data from github.com/jbrunnerhtl, and adds color modes, English/German content and responsive layouts.

## Goals / Non-Goals

**Goals:**
- Smooth scrolling and animation on ordinary hardware; no layout shift from animations.
- Content that matches Jan's public GitHub (projects, stacks, stats), in English and German.
- Readable in dark and light mode (text contrast ≥ 4.5:1), usable from 320px to 2560px wide.
- Graceful degradation: reduced motion, data saver, weak devices and missing WebGL all get a static background.

**Non-Goals:**
- CMS, database or visitor accounts.
- A contact form (no backend to deliver messages; email and GitHub are offered instead).
- Heavy 3D assets (GLTF/HDR downloads); geometry and lighting stay procedural.

## Decisions

### 1. Framework: Next.js App Router with a `[lang]` root layout
- **Choice**: `app/[lang]/layout.tsx` as root layout with `generateStaticParams` for `en`/`de` and `dynamicParams = false`; `src/proxy.ts` redirects unprefixed paths (cookie → Accept-Language → `en`).
- **Rationale**: Both languages are prerendered, get correct `<html lang>` and metadata, and are shareable URLs; this is the pattern from Next's i18n guide.

### 2. In-place language switching
- **Choice**: Both dictionaries (small) ship to the client; the switcher swaps the dictionary in React state, updates `history`, `lang`, title and cookie, and cross-fades via the View Transitions API.
- **Rationale**: Navigating between `/en` and `/de` remounts the `[lang]` layout, which recreated the WebGL canvas and reset the scene. Swapping in place keeps scroll position and the 3D scene intact; hard loads still come server-rendered in the right language.
- **Alternatives considered**: Moving the background above `[lang]` (not possible: the root layout must own `<html lang>`).

### 3. 3D rendering: GPU distortion, on-demand frame loop
- **Choice**: drei `MeshDistortMaterial` on an icosahedron (detail 32 desktop / 20 mobile), procedural `Environment` with `Lightformer`s re-baked per color mode, `frameloop="demand"` driven by a small rAF loop (full rate in the hero, half rate past it while scrolling/pointer input plus a 1.6 s settle, otherwise no frames). A pausable scene clock overrides drei's clock-based time so resuming never jumps.
- **Rationale**: The first iteration deformed ~2,300 vertices and recomputed normals on the CPU each frame. Measured in headless Firefox, the always-on canvas halved the page frame rate mid-page (30 vs 60 fps); on-demand rendering restores 60 fps while idle.

### 4. Render-free motion state
- **Choice**: A mutable `motionStore` (scroll progress/px/velocity, pointer, scene time) written by Lenis and a pointer listener, read inside `useFrame`.
- **Rationale**: Scroll never triggers React re-renders; the first iteration re-rendered the whole canvas tree on every scroll event.

### 5. Deferred and conditional 3D loading
- **Choice**: `Background` loads the 3D chunk via `requestIdleCallback` after first render; it skips 3D for reduced motion, Save-Data, ≤ 2 GB device memory or ≤ 2 cores. DPR capped at 1.5.
- **Rationale**: three.js was ~257 KB gz competing with hydration; initial JS dropped from ~457 KB to ~201 KB.

### 6. Styling: tokens, color modes, no blur over the canvas
- **Choice**: Tailwind v4 `@theme inline` tokens backed by CSS variables per `[data-theme]`; the mode is applied by an inline head script before paint and synced to React via `useSyncExternalStore` on the `<html>` attributes. Solid translucent cards instead of `backdrop-filter` (only the navbar blurs, once scrolled).
- **Rationale**: Backdrop blur over an animating canvas was a major jank source; attributes on `<html>` give a single source of truth without a flash of the wrong theme.

### 7. Hero reveal in CSS, counters via Framer
- **Choice**: The name's word reveal is a CSS keyframe animation with the gradient class on the moving element; counters render final values on the server, reset to 0 on mount and animate with Framer motion values once in view, with tabular numerals and reserved width.
- **Rationale**: The Framer-based reveal waited for hydration and put `background-clip: text` on a parent of transformed children, which made "Brunner." disappear or render misplaced.

### 8. 404 via `global-not-found.tsx`
- **Choice**: `app/global-not-found.tsx` (experimental `globalNotFound` flag) with its own `<html>`, fonts, styles and theme script; the proxy passes the locale in an `x-locale` request header.
- **Rationale**: With the root layout under `[lang]`, a catch-all calling `notFound()` escaped the `[lang]/not-found.tsx` boundary and produced Next's unstyled error shell; the docs recommend `global-not-found` for exactly this layout.

## Risks / Trade-offs

- **[Risk] `globalNotFound` is experimental** → **Mitigation**: Isolated to one file and one config flag; revisit on Next upgrades.
- **[Risk] Unauthenticated GitHub API rate limits on shared hosting IPs** → **Mitigation**: Hourly revalidation and static fallbacks; a `GITHUB_TOKEN` can be added later.
- **[Risk] Only verified in Firefox (headless, software WebGL)** → **Mitigation**: Relative before/after measurements; Chrome, Safari/iOS and real Android devices still need a manual check.
- **[Trade-off] Email shown in plain HTML** → Easy to use and copy, but harvestable by spam bots.

## Migration Plan

1. Replace the first iteration's components (cursor, glass cards, tilt, confetti, contact form) with the redesigned sections.
2. Move routes under `app/[lang]`, add the proxy and dictionaries.
3. Enable `experimental.globalNotFound` and add `app/global-not-found.tsx`.
4. Build and start with `next build && next start`; `/` redirects to `/en` or `/de`.
5. When the domain is known: add `metadataBase`, canonical and `hreflang` alternates, and an Open Graph image.
