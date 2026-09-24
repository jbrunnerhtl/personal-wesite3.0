## MODIFIED Requirements

### Requirement: Hero Entrance and Count-Up Stats
The system SHALL reveal the name in the hero with a CSS-only word animation that starts on first paint, SHALL afterwards alternate the hero name between "Jan Brunner." and the GitHub handle "JBrunnerhtl" at a regular interval with a staggered per-letter rise-out/rise-in transition, and SHALL count the hero stats and other displayed counts up from zero once visible.

#### Scenario: Page loads
- **WHEN** the home page is first painted
- **THEN** the words of the name rise into view without waiting for JavaScript, with gradient text moving together with its glyphs and no clipped letters

#### Scenario: Name alternates with the handle
- **WHEN** the entrance has finished and the hero is visible
- **THEN** about every 3.5 seconds the letters of the shown name leave upwards one after another while the other name rises in from below, the handle is styled like the name ("J" in the text color, "Brunnerhtl" in a continuous chrome gradient), and the heading does not change size

#### Scenario: Name alternation and assistive technology
- **WHEN** a screen reader reads the hero heading, or the visitor prefers reduced motion
- **THEN** the heading's accessible name is always "Jan Brunner", and with reduced motion the name stays "Jan Brunner." without alternating

#### Scenario: Hero is off-screen
- **WHEN** the hero heading is scrolled out of view or the tab is hidden
- **THEN** no name swaps are started until it is visible again

#### Scenario: Stats come into view
- **WHEN** the hero stats fade in, or the follower and repository counts scroll into view
- **THEN** each number counts up to its value without shifting the layout, the server-rendered HTML contains the final values, and the final values are shown immediately when reduced motion is preferred
