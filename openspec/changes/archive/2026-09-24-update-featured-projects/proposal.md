## Why

Online Shop and Fitness & Health are small, older projects and no longer show what Jan builds. Flashcards (JavaFX desktop app) and Driving Planner (Vue + Express full-stack app with Docker) are larger, more recent and closer to his current work. Both are team projects in school GitHub organizations, which the site cannot link to today.

## What Changes

- Replace **Online Shop** and **Fitness & Health** in the featured projects with **Flashcards** and **Driving Planner**.
- Remove Online Shop from the site entirely. Move Fitness & Health to the "More repositories" list, with a short EN/DE note.
- Projects can live outside `github.com/jbrunnerhtl`: a featured project can set its full repository URL and a short display name for the repository.
- Team projects show a "Team · N" badge on their card (Flashcards: 4, Driving Planner: 3). Solo projects show none.
- EN/DE titles and descriptions for the two new projects, verified against their repositories. "Live" links to their GitHub Pages sites.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `project-showcase`: "Real Project Data and Verified Links" changes the featured set and allows repositories outside the profile. "Project Cards" gains the team badge.

## Impact

- `src/data/portfolioData.ts`: `projects` (two entries replaced, new optional `repoUrl`, `repoLabel` and `teamSize` fields) and `moreRepos` (+ Project-Fitness-and-Health).
- `src/components/sections/ProjectsSection.tsx`: link resolution, repo label, team badge.
- `src/i18n/dictionaries/en.ts`, `de.ts`: project items, the repo note for Fitness & Health, the team badge label, and the intro text if it references the count.
- `LANG_COLOR` already covers Java and TypeScript, so no change is needed there.
