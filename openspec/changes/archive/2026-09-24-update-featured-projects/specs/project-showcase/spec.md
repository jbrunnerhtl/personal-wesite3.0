## MODIFIED Requirements

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
