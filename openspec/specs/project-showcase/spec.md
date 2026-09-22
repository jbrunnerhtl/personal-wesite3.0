# project-showcase Specification

## Purpose
How Jan Brunner's GitHub work is presented: featured project cards with verified data, further repositories, the skills overview and live GitHub statistics.

## Requirements

### Requirement: Real Project Data and Verified Links
The system SHALL feature six of Jan Brunner's public GitHub projects (FruitAuth, Crow Demo Backend, DrivingTracker, RPN Calculator, Online Shop, Fitness & Health) with descriptions and tech stacks verified against each repository's source, and SHALL not feature Prolog or the Prolog project.

#### Scenario: User opens a project
- **WHEN** the user clicks a project card
- **THEN** the corresponding GitHub repository opens in a new tab with rel="noopener noreferrer"

#### Scenario: Project has a live site
- **WHEN** a project has a published site or documentation (e.g. DrivingTracker docs, Fitness & Health)
- **THEN** its card shows a separate "Live" link to that site

### Requirement: Project Cards
The system SHALL present featured projects as cards showing language (with GitHub's language color), year, title, description, stack tags and repository name, in a grid that never overflows narrow screens.

#### Scenario: User hovers over a project card
- **WHEN** the pointer hovers a card on a hover-capable device
- **THEN** the card lifts slightly and its border brightens; on touch devices it responds with a subtle press instead of a sticky hover state

#### Scenario: Card shows a long repository name
- **WHEN** a repository name is too long for the card on a narrow screen
- **THEN** it is truncated with an ellipsis instead of widening the card

### Requirement: More Repositories List
The system SHALL list further public repositories with a short note and language below the featured projects, plus a link to all repositories showing the live repository count.

#### Scenario: User browses more repositories
- **WHEN** the user scrolls past the featured projects
- **THEN** a list of additional repositories (e.g. quarus-db-syp, Rust-Todo-List, Address-Book) links to each repository, followed by an "All N repositories" link to the GitHub profile

### Requirement: Skills Overview
The system SHALL show skills as grouped lists (Languages including SQL and PL/SQL, Frameworks, Data, Tooling) without self-rated proficiency levels.

#### Scenario: User views skills
- **WHEN** the Skills section is displayed
- **THEN** each group is listed in the current language, in a single column on phones and up to four columns on large screens

### Requirement: Live GitHub Statistics
The system SHALL show the public repository count, follower count and top languages fetched from the GitHub API, refreshed at most hourly, excluding Shell, HTML and Prolog from the language ranking, and SHALL fall back to static values when the API is unavailable.

#### Scenario: GitHub API is reachable
- **WHEN** the page is rendered or revalidated
- **THEN** the hero and contact sections show the current repository count, follower count and three most used languages

#### Scenario: GitHub API is unreachable or rate-limited
- **WHEN** the GitHub API request fails
- **THEN** the page still renders using the stored fallback values
