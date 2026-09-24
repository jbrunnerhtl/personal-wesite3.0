## Why

The Skills section is a static four-column text grid with uneven columns (Data has 3 items, Languages has 8). It is the least lively part of an otherwise motion-driven site. A constantly running text marquee per group makes the section feel alive while keeping the grouping readable.

## What Changes

- Replace the Skills grid with one horizontally scrolling marquee row per group (Languages, Frameworks, Data, Tooling). Each row has its group label, and the rows run in alternating directions.
- Skills are shown as text only (no logos), in large type with subtle separators.
- Rows run at one constant speed, with no reaction to scrolling, hover or the cursor.
- Reduced motion: show static, wrapping rows with no animation and no duplicated items.
- Accessibility: each group is one real list with an accessible name, and the duplicated loop copy is hidden from assistive tech and not focusable.
- No pause control (deliberate decision, see design.md).

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `project-showcase`: "Skills Overview" changes from grouped column lists to grouped, constant-speed text marquees with a reduced-motion fallback.

## Impact

- `src/components/sections/SkillsSection.tsx`: rewritten.
- New: a marquee row component.
- No data model change: `PORTFOLIO_DATA.skills` stays as `string[]` per group. No new dependency.
- Cleanup: remove `src/components/icons/skillIcons.ts`, left over from the dropped logo approach.
