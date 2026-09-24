## Context

`SkillsSection.tsx` renders `PORTFOLIO_DATA.skills` (4 groups, 3–8 text items each) as a hairline grid. The site already has a render-free motion bus (`motionStore`) that Lenis writes `scrollVelocity` into, and the 3D orb reads it inside `useFrame`. Reduced motion is honored everywhere: Lenis is off, counters are final, and the theme transition is instant. There are no brand icons yet. `GithubIcon.tsx` shows the house style: a 24×24 Simple Icons path with `fill="currentColor"`.

Icon availability and licenses were checked against simple-icons 16.32.0:

| Skill | Icon | License / notes |
|---|---|---|
| Java | OpenJDK (Duke mascot) | BSD-3-Clause → notice required |
| TypeScript | TypeScript | no license data; brand guidelines linked |
| C++ | C++ | no license data |
| Rust | Rust | CC-BY-SA-4.0 → attribution; recolored version is CC-BY-SA |
| Shell | GNU Bash | MIT → notice required |
| React, Express, Quarkus, SQLite, Docker, Kubernetes, CMake, Asciidoctor (AsciiDoc), Linux | yes | no license data |
| PostgreSQL | yes | no license data; trademark policy linked |
| Git | Git | CC-BY-3.0 → attribution (Jason Long) |
| Maven | Apache Maven | Apache-2.0 → notice; Apache marks policy |
| C#, SQL, PL/SQL, H2, JavaFX, Avalonia, Crow | none | monogram |

## Goals / Non-Goals

**Goals:**
- One marquee row per group, alternating directions, driven by a smooth base speed plus the scroll velocity. Scrolling up reverses direction.
- A consistent monochrome visual. Logo and monogram tiles look alike.
- No React re-renders per frame, and no work while the section is off-screen.
- Reduced motion shows static content. Screen readers hear each skill once.
- License obligations for the shown icons are met.

**Non-Goals:**
- Colored brand logos.
- A pause/play control or pause on hover (see Decisions §6).
- Drag or swipe to scrub the marquee.
- Adding the `simple-icons` package as a runtime dependency.

## Decisions

### 1. Logos: local path map, not the npm package
- **Choice**: Copy the ~17 needed SVG paths into one local module (`skillIcons.ts`), keyed by slug, and record each icon's source and license next to it.
- **Rationale**: This matches `GithubIcon`, adds no dependency, and the bundle stays tiny. Keeping the license beside each path keeps the credits auditable.
- **Alternatives**: `simple-icons` npm package (tree-shakable, but large to install and it adds a version drift question); `react-icons` (a heavier abstraction for 17 paths).

### 2. Monogram fallback
- **Choice**: Skills without an icon render a tile of the same size as the icons, containing a 1–3 character label in `--font-mono` (e.g. `C#`, `SQL`, `PL`, `H2`, `FX`, `AV`, `CR`). Data carries either `icon: slug` or `mono: "…"`.
- **Rationale**: A consistent rhythm in the row. It reads as intentional, not missing.

### 3. Motion: rAF loop writing `transform`, fed by `motionStore`
- **Choice**: One small client component per row with a shared `requestAnimationFrame` loop. Each frame computes `offset += (base + |v|·k) · rowDir · scrollDir · dt`, wraps it at half the track width (the track contains the item set twice), and writes `translate3d` directly to the track element. `v` is `motionStore.scrollVelocity`, smoothed with a lerp and clamped. `scrollDir` flips to −1 while velocity < 0 and keeps the last direction when scrolling stops.
- **Rationale**: This follows the existing "motion outside React state" pattern. A CSS keyframe marquee cannot react to velocity without restarts.
- **Visibility**: An IntersectionObserver starts and stops the loop, so nothing runs off-screen. The loop also stops while `document.hidden`.
- **Alternatives**: framer-motion `useAnimationFrame` + `useVelocity(useScroll)` (viable, but it duplicates the velocity source Lenis already provides).

### 4. Layout and edges
- Each row: a group label (`eyebrow`) above a track that is masked with `mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)`.
- Item: an icon or monogram tile plus the name in `text-fg`. On hover-capable devices the icon takes the `--chrome` gradient on hover (via an SVG gradient or `background-clip` on a wrapper).
- The track is duplicated enough times to cover the widest viewport (2560px). The number of copies is computed from the measured widths, not hard-coded.

### 5. Reduced motion and accessibility
- `prefers-reduced-motion: reduce` → no loop and no duplicates. Items render as a static wrapping flex list. SSR renders this static form, and the animated form is enhanced after hydration, so there is no layout shift for reduced-motion users and no-JS users see all skills.
- Markup: `<ul aria-label="{group}">` with the real items. Duplicate copies are in a sibling wrapper with `aria-hidden="true"` and `inert`. Icons are `aria-hidden`, and the visible name is the accessible text.

### 6. No pause control (accepted deviation)
- **Choice**: No pause button and no hover pause, as requested by the site owner.
- **Trade-off**: WCAG 2.2.2 (Pause, Stop, Hide, Level A) is not met for users who have not enabled reduced motion. The mitigations are the reduced-motion fallback, a modest base speed, and the fact that the content is non-essential and also readable at rest.

### 7. Credits
- **Choice**: A small "Logo credits" link in the footer opens a `<details>`/disclosure (or anchors to a short list) with: "Brand icons via Simple Icons (CC0). Trademarks belong to their owners; use does not imply endorsement." plus per-icon notices for Rust (CC BY-SA 4.0, Rust Foundation), Git (Git Logo by Jason Long, CC BY 3.0), OpenJDK (BSD-3-Clause), GNU Bash (MIT) and Apache Maven (Apache-2.0).
- **Rationale**: This covers the attribution and notice requirements without adding a new route, and it stays static-export friendly.

## Risks / Trade-offs

- [Brand guidelines may forbid recoloring] → Before shipping, check the TypeScript, PostgreSQL, Rust and Apache guidelines. If one forbids monochrome, use a monogram for that item.
- [Lenis velocity on touch devices may be ~0 (native touch scroll)] → The base speed still runs. Optionally fall back to the `scrollPx` delta per frame when Lenis is inactive.
- [Direction flip feels jittery with small scroll jiggles] → Flip only past a velocity threshold, and smooth the speed through zero instead of snapping.
- [Hydration swap from static to animated causes a jump] → Keep the first copy at identical positions and only append copies and start translating after mount.
- [Missing WCAG 2.2.2] → Accepted (see §6). Revisit if accessibility requirements change.
- [License data in Simple Icons may be outdated] → Record the version (16.32.0) with the copied paths, so a re-check is possible.
