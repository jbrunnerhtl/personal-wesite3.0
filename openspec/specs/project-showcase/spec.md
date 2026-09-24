# project-showcase Specification

## Purpose
How Jan Brunner's GitHub work is presented: featured project cards with verified data, further repositories, the skills overview and live GitHub statistics.
## Requirements
### Requirement: Real Project Data and Verified Links
The system SHALL feature six of Jan Brunner's public GitHub projects (Driving Planner, Flashcards, FruitAuth, Crow Demo Backend, DrivingTracker, RPN Calculator) with descriptions and tech stacks verified against each repository's source, and SHALL not feature Prolog or the Prolog project. Featured projects MAY live in other GitHub accounts or organizations, in which case the card SHALL link to that repository and show a short repository label.

#### Scenario: User opens a project
- **WHEN** the user clicks a project card
- **THEN** the corresponding GitHub repository opens in a new tab with rel="noopener noreferrer"

#### Scenario: Project lives in an organization
- **WHEN** a featured project is hosted outside the profile, such as Flashcards in `2526-3bhif-syp` or Driving Planner in `2526-wmc-3bhif-classroom-org`
- **THEN** its card links to the full organization repository URL and shows a short repository label instead of the full organization path

#### Scenario: Project has a live site
- **WHEN** a project has a published site or documentation (e.g. DrivingTracker docs, Flashcards docs)
- **THEN** its card shows a separate "Live" link to that site

### Requirement: Project Cards
The system SHALL present featured projects as cards showing language (with GitHub's language color), year, title, description, stack tags and repository name, in a grid that never overflows narrow screens. Team projects SHALL additionally show a localized "Team · N" badge with the number of team members.

#### Scenario: User hovers over a project card
- **WHEN** the pointer hovers a card on a hover-capable device
- **THEN** the card lifts slightly and its border brightens; on touch devices it responds with a subtle press instead of a sticky hover state

#### Scenario: Card shows a long repository name
- **WHEN** a repository name is too long for the card on a narrow screen
- **THEN** it is truncated with an ellipsis instead of widening the card

#### Scenario: Card shows a team project
- **WHEN** a featured project was built by a team, such as Flashcards (4 members) or Driving Planner (3 members)
- **THEN** the card shows a "Team · 4" or "Team · 3" badge in the current language, and solo projects show no badge

### Requirement: More Repositories List
The system SHALL list further public repositories with a short note and language below the featured projects, plus a link to all repositories showing the live repository count.

#### Scenario: User browses more repositories
- **WHEN** the user scrolls past the featured projects
- **THEN** a list of additional repositories (e.g. quarus-db-syp, Rust-Todo-List, Address-Book) links to each repository, followed by an "All N repositories" link to the GitHub profile

### Requirement: Skills Overview
The system SHALL show skills in their groups (Languages including SQL and PL/SQL, Frameworks, Data, Tooling), as text only and without self-rated proficiency levels, as one horizontally looping marquee row per group with a localized group label. Adjacent rows SHALL move in opposite directions. The marquee SHALL be purely decorative motion without hover, cursor or text-selection interaction.

#### Scenario: User views skills
- **WHEN** the Skills section is displayed
- **THEN** each group appears as a labeled row of skill names in the current language, the rows loop continuously in alternating directions with faded edges, and no horizontal page overflow occurs from 320px to 2560px wide

### Requirement: Live GitHub Statistics
The system SHALL show the public repository count, follower count and top languages fetched from the GitHub API, refreshed at most hourly, excluding Shell, HTML and Prolog from the language ranking, and SHALL fall back to static values when the API is unavailable.

#### Scenario: GitHub API is reachable
- **WHEN** the page is rendered or revalidated
- **THEN** the hero and contact sections show the current repository count, follower count and three most used languages

#### Scenario: GitHub API is unreachable or rate-limited
- **WHEN** the GitHub API request fails
- **THEN** the page still renders using the stored fallback values

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

