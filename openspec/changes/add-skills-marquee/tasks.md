## 1. Licensing and assets

- [ ] 1.1 Check the brand guidelines of TypeScript, PostgreSQL, Rust and Apache (Maven) for whether monochrome or recolored use is allowed. Switch any that forbid it to a monogram
- [ ] 1.2 Copy the SVG paths from simple-icons 16.32.0 (OpenJDK, TypeScript, C++, Rust, GNU Bash, React, Express, Quarkus, PostgreSQL, SQLite, Git, Docker, Kubernetes, Apache Maven, CMake, Asciidoctor, Linux) into a local `skillIcons` module, recording the source, license and package version for each
- [ ] 1.3 Extend `SkillGroup` items in `portfolioData.ts` with `{ name, icon }` or `{ name, mono }` and fill in all 24 skills

## 2. Marquee component

- [ ] 2.1 Build a `SkillTile` (icon or monogram tile + name, monochrome `currentColor`, chrome on hover on hover-capable devices)
- [ ] 2.2 Build a `MarqueeRow`: an SSR static `<ul aria-label>` list, then after mount append `aria-hidden` + `inert` copies until the track covers the viewport plus one set, with a masked edge fade
- [ ] 2.3 Add a shared rAF loop: base speed × row direction × scroll direction + smoothed/clamped `motionStore.scrollVelocity`, wrap offset, write `translate3d` directly (no React state)
- [ ] 2.4 Implement the direction flip with a velocity threshold, keep the last direction when idle, and ease the speed through zero
- [ ] 2.5 Start and stop the loop via IntersectionObserver and `visibilitychange`
- [ ] 2.6 Reduced motion: skip copies and the loop, render static wrapping rows. Verify there is no layout shift on hydration

## 3. Section and copy

- [ ] 3.1 Rewrite `SkillsSection.tsx` to use four `MarqueeRow`s with alternating directions and localized group labels
- [ ] 3.2 Add the footer "Logo credits" disclosure with the Simple Icons/trademark notice and the Rust, Git, OpenJDK, GNU Bash and Apache Maven attributions (EN + DE dictionary strings)

## 4. Verification

- [ ] 4.1 Check at 320px, 768px, 1440px and 2560px: no horizontal overflow, the loop is seamless with no gaps
- [ ] 4.2 Check scroll down (speed up), scroll up (reverse), idle (keep direction), and touch scrolling on a phone
- [ ] 4.3 Check with reduced motion enabled and with JS disabled: static rows show all skills
- [ ] 4.4 Screen reader check (Orca or VoiceOver): each group is read once, and no duplicates are focusable by Tab
- [ ] 4.5 Check the light and dark modes and the contrast of names and monograms (≥ 4.5:1)
- [ ] 4.6 Run `tsc --noEmit`, `npm run lint` and `npm run build` (static export)
