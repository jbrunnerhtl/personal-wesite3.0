## Why

The Skills section is a static four-column text grid with uneven columns (Data has 3 items, Languages has 8). It is the least lively part of an otherwise motion-driven site. A scroll-reactive logo marquee per group makes the section feel alive while keeping the grouping readable.

## What Changes

- Replace the Skills grid with one horizontally scrolling marquee row per group (Languages, Frameworks, Data, Tooling). Each row has its group label, and the rows run in alternating directions.
- Couple marquee speed to scroll velocity (Lenis): scrolling speeds the rows up, and scrolling up reverses their direction.
- Show a monochrome logo before each skill name. Logos come from Simple Icons (paths copied locally, like `GithubIcon`). Skills without a usable logo (C#, SQL, PL/SQL, H2, JavaFX, Avalonia, Crow) get a monogram tile in the same style. Java uses the OpenJDK icon. Shell uses GNU Bash.
- Reduced motion: show static, wrapping rows with no animation and no duplicated items.
- Accessibility: each group is one real list with an accessible name, the duplicated loop copy is hidden from assistive tech and not focusable, and logos are decorative.
- Add a logo credits notice with the license attributions that the Rust, Git, OpenJDK, GNU Bash and Apache Maven icons require.
- No pause control (deliberate decision, see design.md).

## Capabilities

### New Capabilities
- `third-party-attribution`: Credits and license notices for third-party brand icons shown on the site.

### Modified Capabilities
- `project-showcase`: "Skills Overview" changes from grouped column lists to grouped, scroll-reactive logo marquees with a reduced-motion fallback.

## Impact

- `src/components/sections/SkillsSection.tsx`: rewritten.
- New: a skill-logo module (local SVG paths + monogram fallback) and a marquee component.
- `src/data/portfolioData.ts`: skill items gain a logo key or a monogram.
- `src/lib/motionStore.ts` / `SmoothScrollProvider.tsx`: read-only consumer of `scrollVelocity` and scroll direction (no new writes expected).
- `src/components/sections/ContactSection.tsx` footer: credits link or notice. EN/DE dictionaries get new strings.
- No new runtime dependency (`simple-icons` is only the source for copied paths).
