## Context

`SkillsSection.tsx` renders `PORTFOLIO_DATA.skills` (4 groups, 3–8 text items each) as a hairline grid. The site already has a render-free motion bus (`motionStore`) that Lenis writes `scrollVelocity` into, and the 3D orb reads it inside `useFrame`. Reduced motion is honored everywhere: Lenis is off, counters are final, and the theme transition is instant.

An earlier iteration of this change planned brand logos from Simple Icons. That was dropped in favor of text only (owner decision), which also removes all licensing and trademark concerns. For reference, the check found that PostgreSQL's policy forbids modified logos or showing them next to other logos.

## Goals / Non-Goals

**Goals:**
- One marquee row per group, alternating directions, at one constant speed (owner decision: no interaction of any kind).
- Typography carries the section: large names, quiet separators.
- No React re-renders per frame, and no work while the section is off-screen.
- Reduced motion shows static content. Screen readers hear each skill once.

**Non-Goals:**
- Logos or icons of any kind.
- A pause/play control or pause on hover (see Decisions §4).
- Drag or swipe to scrub the marquee.

## Decisions

### 1. Typography
- Each row: a group label (`eyebrow`) above a track of names in large type (around `clamp(1.5rem, 4vw, 2.75rem)`, semibold, tight tracking, `text-fg`), separated by a `·` in `text-faint` that is `aria-hidden`.
- No hover, cursor or selection interaction (owner decision): the track has `pointer-events: none` and `user-select: none` and simply runs.
- Edges are masked with `mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)`.

### 2. Motion: constant-speed rAF loop writing `transform`
- **Choice**: One small client component per row with a shared `requestAnimationFrame` loop. Each frame computes `offset += SPEED · rowDir · dt` (40 px/s), wraps it at one set width, and writes `translate3d` directly to the track element.
- **History**: A first version coupled speed and direction to scroll velocity (faster while scrolling, reversed when scrolling up). The owner dropped this after trying it. Rows now run constantly.
- **Rationale**: JS instead of a CSS keyframe animation because the copy count and the wrap distance depend on measured widths, and the loop can stop off-screen.
- **Visibility**: An IntersectionObserver starts and stops the loop, and it also stops while `document.hidden` (not visible to the user, it only saves work).

### 3. Reduced motion, SSR and accessibility
- `prefers-reduced-motion: reduce` → no loop and no duplicates. Items render as a static wrapping flex list.
- SSR renders a single-line list (wrapping via CSS under `prefers-reduced-motion: reduce` or `scripting: none`). After hydration, the animated form appends copies (enough to cover a 2560px viewport plus one set, computed from measured widths) and starts translating. No-JS users see all skills.
- Markup: `<ul aria-label="{group}">` with the real items. Copies go in a sibling wrapper with `aria-hidden="true"` and `inert`.

### 4. No pause control (accepted deviation)
- **Choice**: No pause button and no hover pause, as requested by the site owner.
- **Trade-off**: WCAG 2.2.2 (Pause, Stop, Hide, Level A) is not met for users who have not enabled reduced motion. The mitigations are the reduced-motion fallback, a modest base speed, and the fact that the content is non-essential and also readable at rest.

## Risks / Trade-offs

- [Hydration swap from static to animated causes a jump] → Keep the first set at identical positions and only append copies and start translating after mount.
- [Large type makes the Data row (3 items) repeat visibly] → This is intended for a marquee. Copies fill the width.
- [Missing WCAG 2.2.2] → Accepted (see §4).
