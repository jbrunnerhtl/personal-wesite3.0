## Why

The deploy workflow runs `npm ci` and `npm run build` in the same job that holds a `contents: write` token. `actions/checkout` also persists that token in `.git/config`, and the token is exported as `GITHUB_TOKEN` during the build. A compromised npm dependency (install script or build-time code) could therefore push to `main` and alter the site or its source. Actions are pinned by mutable tags.

## What Changes

- Switch from "force-push `out/` to `gh-pages`" to the official GitHub Pages artifact flow (`actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`). **BREAKING** (repo setting): Pages source changes from "Deploy from a branch" to "GitHub Actions". The `gh-pages` branch is no longer updated and can be deleted afterwards.
- Split into a `build` job with `contents: read` only and `persist-credentials: false`, and a `deploy` job with only `pages: write` + `id-token: write` that runs no project code.
- Set workflow-level `permissions: {}` and grant per job.
- Pin every third-party action to a full commit SHA (with a version comment).
- The build still receives a read-only `GITHUB_TOKEN` for the GitHub API stats. Daily cron and `workflow_dispatch` stay.
- Optionally add Dependabot for `github-actions` and `npm` to keep the SHAs and dependencies current.

## Capabilities

### New Capabilities
- `site-deployment`: How the static site is built and published to GitHub Pages, including least-privilege CI permissions and supply-chain safeguards.

### Modified Capabilities
<!-- none -->

## Impact

- `.github/workflows/deploy.yml`: rewritten.
- New `.github/dependabot.yml` (optional).
- GitHub repo settings: Pages source → "GitHub Actions". The `github-pages` environment is created automatically.
- `next.config.ts` comment referencing the deploy branch.
- No application code changes. The base-path logic stays the same.
