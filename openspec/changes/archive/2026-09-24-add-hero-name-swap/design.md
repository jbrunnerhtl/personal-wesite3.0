## Context

The hero `<h1>` renders "Jan Brunner." with `RevealText`: a CSS-only word rise that starts on first paint, where "Brunner." uses the `.text-chrome` gradient. The owner wanted the name to alternate with the GitHub handle "with a cool effect". A scramble/decode effect was built first and then replaced by a rise in/out effect at the owner's request.

## Goals / Non-Goals

**Goals:**
- Keep the server-rendered, CSS-only entrance for the first paint.
- A per-letter, staggered "out up, in from below" swap with a continuous gradient.
- No layout shift, a stable accessible name, and respect for reduced motion.

**Non-Goals:**
- Swapping the name in the navbar (hero only, owner decision).
- More than two names, or user control over the cycle.

## Decisions

### 1. Intro first, then swap
- `NameSwap` renders `intro` (the existing `RevealText` words) until the first swap at 3.5 s, then renders letter layers. The server HTML is unchanged.

### 2. Stacked layers in one grid cell
- Every name is rendered invisibly in the same grid cell (`[grid-area:1/1]`) to reserve the maximum size. The outgoing and incoming layers sit on top of each other. The heading never changes height (verified at 320px and 1440px).

### 3. Per-letter masks + CSS keyframes
- Each letter sits in an `overflow-hidden` inline-block mask with 0.12em vertical padding (as in `RevealText`). `name-out` (0 → −115%, 0.55s ease-in) and `name-in` (115% → 0, 0.8s expo-out). The stagger is 30ms per letter, and the incoming name starts 0.35s later, so the swap reads as a left-to-right wave. React only re-renders once per swap, with keyed layers restarting the animations.

### 4. Continuous gradient across animated letters
- `background-clip: text` restarts the gradient per letter box. After each swap (and on resize), each letter's `background-size` is set to its word width and its `background-position` to minus its offset in the word, so the gradient spans the word as before.

### 5. Accessibility and pausing
- The `<h1>` holds an `sr-only` "Jan Brunner". All visual layers are `aria-hidden`. With `prefers-reduced-motion: reduce` no timer starts. The cycle skips swaps while the heading is off-screen (IntersectionObserver) or the tab is hidden.

## Risks / Trade-offs

- [Per-letter inline-blocks lose kerning pairs] → Barely visible at this weight and tracking. Accepted for the per-letter motion.
- [Continuous motion in the hero without a pause control] → It is decorative, pauses off-screen, and is disabled for reduced motion. The accessible name is unaffected.
- [Smoothness could not be judged in headless Chromium (software rendering with the 3D scene)] → The timing was verified numerically in the page. A visual check in a real browser is left to the owner.
