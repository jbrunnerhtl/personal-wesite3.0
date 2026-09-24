## MODIFIED Requirements

### Requirement: Skills Overview
The system SHALL show skills in their groups (Languages including SQL and PL/SQL, Frameworks, Data, Tooling), without self-rated proficiency levels, as one horizontally looping marquee row per group with a localized group label. Adjacent rows SHALL move in opposite directions. Each skill SHALL be shown with a monochrome logo in the current text color, or a monogram tile of the same size when no usable logo exists. Java SHALL use the OpenJDK icon.

#### Scenario: User views skills
- **WHEN** the Skills section is displayed
- **THEN** each group appears as a labeled row in the current language, the rows loop continuously in alternating directions with faded edges, and no horizontal page overflow occurs from 320px to 2560px wide

#### Scenario: Skill without a logo
- **WHEN** a skill such as C#, SQL, PL/SQL, H2, JavaFX, Avalonia or Crow is shown
- **THEN** it has a monogram tile of the same size and style as the logo tiles

## ADDED Requirements

### Requirement: Scroll-Reactive Skills Marquee
The system SHALL speed up the skills marquee in proportion to the page's scroll velocity and SHALL reverse each row's direction while the user scrolls up, keeping the last direction once scrolling stops. The marquee SHALL NOT animate while the Skills section is off-screen or the tab is hidden.

#### Scenario: User scrolls down past the skills
- **WHEN** the user scrolls down while the Skills section is visible
- **THEN** each row moves faster in its own direction and eases back to its base speed when scrolling stops

#### Scenario: User scrolls up
- **WHEN** the user scrolls up while the Skills section is visible
- **THEN** every row reverses direction and keeps that direction after scrolling stops, until the user scrolls down again

#### Scenario: Section is off-screen
- **WHEN** the Skills section is not in the viewport
- **THEN** no animation frames are computed for the marquee

### Requirement: Accessible Skills Marquee
The system SHALL expose each group as a single list with an accessible name, so that assistive technology announces each skill exactly once, and SHALL hide duplicated loop copies and decorative logos from assistive technology and keyboard focus. When the user prefers reduced motion, the system SHALL show the skills as static wrapping rows without animation or duplicates. There SHALL be no pause control (documented exception to WCAG 2.2.2).

#### Scenario: Screen reader user reaches the skills
- **WHEN** a screen reader reads the Skills section
- **THEN** each group is announced as a list with its name, and each skill is read once by name

#### Scenario: Visitor prefers reduced motion
- **WHEN** `prefers-reduced-motion: reduce` is set
- **THEN** the skills are shown as static rows that wrap to fit the viewport, with no movement and no duplicated items

#### Scenario: JavaScript is unavailable
- **WHEN** the page is viewed without JavaScript
- **THEN** all skills are visible as static rows
