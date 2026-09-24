## 1. Cleanup

- [x] 1.1 Delete `src/components/icons/skillIcons.ts` (left over from the dropped logo approach)

## 2. Marquee component

- [x] 2.1 Build a `MarqueeRow`: an SSR static `<ul aria-label>` with large-type names and `aria-hidden` `·` separators, then after mount append `aria-hidden` + `inert` copies until the track covers the viewport plus one set, with a masked edge fade
- [x] 2.2 Add a shared rAF loop: constant speed × row direction, wrap offset, write `translate3d` directly (no React state)
- [x] 2.3 ~~Scroll-coupled speed and direction flip~~ (built, then removed at the owner's request: constant speed only)
- [x] 2.4 Start and stop the loop via IntersectionObserver and `visibilitychange`
- [x] 2.5 Reduced motion: skip copies and the loop, render static wrapping rows. Verify there is no layout shift on hydration
- [x] 2.6 No hover, cursor or selection interaction on the marquee (`pointer-events: none`, `user-select: none`)

## 3. Section

- [x] 3.1 Rewrite `SkillsSection.tsx` to use four `MarqueeRow`s with alternating directions and localized group labels

## 4. Verification

- [x] 4.1 Check at 320px, 768px, 1440px and 2560px: no horizontal overflow, the loop is seamless with no gaps
- [x] 4.2 Check that the rows move at a constant speed in their fixed direction while idle and while scrolling up or down (desktop and touch emulation)
- [x] 4.3 Check with reduced motion enabled and with JS disabled: static rows show all skills
- [x] 4.4 Screen reader check (Orca or VoiceOver): each group is read once, and no duplicates are focusable by Tab
- [x] 4.5 Check the light and dark modes, and the contrast of names and separators
- [x] 4.6 Run `tsc --noEmit`, `npm run lint` and `npm run build` (static export)
