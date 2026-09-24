## 1. Implementation

- [x] 1.1 Add `name-in` / `name-out` keyframes to `globals.css`
- [x] 1.2 Build `NameSwap`: an intro until the first swap, invisible size layers, per-letter masks, a staggered out/in wave, and a keyed remount per swap
- [x] 1.3 Align the per-letter gradient to the word width (after each swap and on resize)
- [x] 1.4 Add a `sr-only` label, `aria-hidden` visuals, no cycle under reduced motion, and pause off-screen or in a hidden tab
- [x] 1.5 Use `NameSwap` in `HeroSection.tsx` with the "Jan Brunner." / "JBrunnerhtl" segments
- [x] 1.6 Remove the footer "Previous website" link, its strings and `websiteV2`

## 2. Verification

- [x] 2.1 The swap cadence is about 3.5 s, measured in the page
- [x] 2.2 The per-letter wave was traced numerically: out left→right, in behind it, done after about 1.1 s
- [x] 2.3 The `<h1>` height is constant at 1440px and 320px, with no horizontal overflow
- [x] 2.4 The accessible name is "Jan Brunner". Reduced motion gives no swaps
- [x] 2.5 `tsc --noEmit`, `npm run lint` and `npm run build` pass
