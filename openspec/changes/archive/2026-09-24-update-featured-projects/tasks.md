## 1. Data

- [x] 1.1 Extend `ProjectItem` with optional `repoUrl`, `repoLabel` and `teamSize`
- [x] 1.2 Remove the `online-shop` and `fitness` projects. Add `driving-planner` and `flashcards` (language, verified stack, year 2026, `repoUrl`, `repoLabel`, `teamSize`, `demoUrl`) in the order from design §4
- [x] 1.3 Add `Project-Fitness-and-Health` (HTML) to `moreRepos`

## 2. Copy (EN + DE)

- [x] 2.1 Write titles and descriptions for Driving Planner and Flashcards, verified against each repo's README, specs and source
- [x] 2.2 Remove the Online Shop and Fitness items. Add the `repoNotes` entry for Project-Fitness-and-Health
- [x] 2.3 Add the team badge template (`Team · {n}`), and check that the intro text still fits

## 3. Card

- [x] 3.1 Use `p.repoUrl ?? repoUrl(p.repo)` for the card link and `p.repoLabel ?? p.repo` for the footer label
- [x] 3.2 Render the team badge in the card's top row when `teamSize` is set

## 4. Verification

- [x] 4.1 Open the Driving Planner Pages site. Keep its `demoUrl` only if it is usable without a backend (result: the frontend loads, but its Railway backend is gone ("Application not found"), so there is no Live link)
- [x] 4.2 Click every featured link and live link (EN + DE). Nothing 404s, all open in a new tab
- [x] 4.3 Check the card layout at 320px and 1440px in light and dark mode: badge, truncated label, no overflow
- [x] 4.4 Run `tsc --noEmit`, `npm run lint` and `npm run build`
