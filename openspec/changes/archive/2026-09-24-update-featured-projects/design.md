## Context

Featured projects are defined in `PORTFOLIO_DATA.projects` (language-independent facts) plus `t.projects.items[id]` (EN/DE copy). Links are built with `repoUrl(repo)` = `https://github.com/jbrunnerhtl/<repo>`, and the card footer shows `p.repo`. The two new projects live in school organizations:

| Project | Repository | Live site | Team | Stack (verified) |
|---|---|---|---|---|
| Flashcards | `2526-3bhif-syp/2526-3bhif-syp-project-flashcards` | https://2526-3bhif-syp.github.io/2526-3bhif-syp-project-flashcards/ (docs) | Brunner, Yagci, Mostbauer, Parzer (Jan: top contributor) | Java, JavaFX, Jackson, JUnit, Mockito, Maven |
| Driving Planner | `2526-wmc-3bhif-classroom-org/sommerprojekt-wmc-summer-project-brunner-mostbauer-maric` | https://2526-wmc-3bhif-classroom-org.github.io/sommerprojekt-wmc-summer-project-brunner-mostbauer-maric/ | Brunner, Mostbauer, Maric | Vue 3, TypeScript, PrimeVue, Pinia, Express, better-sqlite3, JWT, Jest, Vitest, Docker Compose |

Both repositories are public. Activity: Flashcards Dec 2025 – Jun 2026, Driving Planner Jan – Jun 2026, so the year is 2026 for both.

## Goals / Non-Goals

**Goals:**
- Featured cards link correctly to repositories outside the profile.
- Long organization repository names do not dominate the card.
- Team work is labeled honestly.

**Non-Goals:**
- Counting organization repositories in the hero's "top languages" or repo count (both stay profile-only).
- Listing teammates by name on the card.
- Changing the Skills list (adding Vue is a separate decision).

## Decisions

### 1. Optional `repoUrl` + `repoLabel` on `ProjectItem`
- **Choice**: `repoUrl?: string` overrides `repoUrl(repo)`. `repoLabel?: string` overrides the footer text (e.g. `2526-3bhif-syp/…-flashcards` → `project-flashcards`, Driving Planner → `brunner-mostbauer-maric`). Existing projects stay unchanged.
- **Alternatives**: Store `owner/repo` for all projects (touches every entry for no gain), or rely on truncation only (the org prefix alone fills the footer).

### 2. `teamSize?: number` → badge
- **Choice**: If `teamSize` is set, show a small pill "Team · N" (DE: "Team · N"), styled like the stack tags but placed in the top row next to the year. The label is localized via a `{n}` template.
- **Rationale**: Honest, compact, and it doesn't compete with the title.

### 3. Fitness & Health → more repos
- **Choice**: Add `{ name: "Project-Fitness-and-Health", language: "HTML" }` (GitHub's current primary language) with a note, e.g. EN "Team website with workout plans & shop", DE "Team-Website mit Trainingsplänen & Shop". Its `demoUrl` is dropped, since the list shows no live links.
- Online Shop is removed from data and dictionaries.

### 4. Card order
- Newest and strongest first: Driving Planner, Flashcards, FruitAuth, Crow Demo Backend, DrivingTracker, RPN Calculator. This keeps the 2-column grid at 3 rows.

## Risks / Trade-offs

- [The Driving Planner Pages site may be the frontend only, without the backend, so it would show errors] → Check it before adding the "Live" link. If it isn't usable, omit `demoUrl`.
- [Classroom org repos can be archived or made private by teachers] → Links would 404. Accepted. Re-check periodically (the daily build won't detect it).
- [Nav/intro copy says "six repositories"] → The count is unchanged (still six), so only the wording is checked.
