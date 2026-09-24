## MODIFIED Requirements

### Requirement: Skills Overview
The system SHALL show skills in their groups (Languages including SQL and PL/SQL, Frameworks, Data, Tooling), as text only and without self-rated proficiency levels, as one horizontally looping marquee row per group with a localized group label. Adjacent rows SHALL move in opposite directions. The marquee SHALL be purely decorative motion without hover, cursor or text-selection interaction.

#### Scenario: User views skills
- **WHEN** the Skills section is displayed
- **THEN** each group appears as a labeled row of skill names in the current language, the rows loop continuously in alternating directions with faded edges, and no horizontal page overflow occurs from 320px to 2560px wide

## ADDED Requirements

### Requirement: Constant-Speed Skills Marquee
The system SHALL move every skills marquee row at a constant speed in its fixed direction, independent of scrolling, pointer or any other user input. The marquee SHALL NOT animate while the Skills section is off-screen or the tab is hidden.

#### Scenario: User scrolls past the skills
- **WHEN** the user scrolls up or down while the Skills section is visible
- **THEN** each row keeps moving at the same constant speed and in the same direction

#### Scenario: Section is off-screen
- **WHEN** the Skills section is not in the viewport
- **THEN** no animation frames are computed for the marquee

### Requirement: Accessible Skills Marquee
The system SHALL expose each group as a single list with an accessible name, so that assistive technology announces each skill exactly once, and SHALL hide duplicated loop copies and separators from assistive technology and keyboard focus. When the user prefers reduced motion, the system SHALL show the skills as static wrapping rows without animation or duplicates. There SHALL be no pause control (documented exception to WCAG 2.2.2).

#### Scenario: Screen reader user reaches the skills
- **WHEN** a screen reader reads the Skills section
- **THEN** each group is announced as a list with its name, and each skill is read once by name

#### Scenario: Visitor prefers reduced motion
- **WHEN** `prefers-reduced-motion: reduce` is set
- **THEN** the skills are shown as static rows that wrap to fit the viewport, with no movement and no duplicated items

#### Scenario: JavaScript is unavailable
- **WHEN** the page is viewed without JavaScript
- **THEN** all skills are visible as static rows
