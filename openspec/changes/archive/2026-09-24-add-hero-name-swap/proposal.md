## Why

The hero shows only the real name, while the GitHub handle `JBrunnerhtl` is what people find on GitHub. Alternating between both in the hero connects the two and adds a signature motion moment to the first screen.

## What Changes

- After the existing CSS entrance, the hero heading alternates between "Jan Brunner." and "JBrunnerhtl" about every 3.5 s.
- Transition: the letters of the current name leave upwards through a mask, staggered left to right, while the next name rises in behind them (a wave, about 1.1 s).
- The handle keeps the name's styling: "J" in the text color, "Brunnerhtl" in the chrome gradient, continuous across the word.
- There is no layout shift, the accessible name stays "Jan Brunner", it stays static with reduced motion, and it pauses off-screen or in a hidden tab.
- Also in this change: the "Previous website" link was removed from the footer (no spec impact).

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `portfolio-ui`: "Hero Entrance and Count-Up Stats" gains the alternating name after the entrance.

## Impact

- New `src/components/ui/NameSwap.tsx`. `src/components/sections/HeroSection.tsx` uses it with the existing `RevealText` entrance as intro.
- `src/app/globals.css`: `name-in` / `name-out` keyframes.
- Footer (`ContactSection.tsx`), dictionaries and `portfolioData.ts`: previous-website link and strings removed.
