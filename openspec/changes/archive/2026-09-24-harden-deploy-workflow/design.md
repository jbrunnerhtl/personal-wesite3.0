## Context

`.github/workflows/deploy.yml` currently has a single job with `permissions: contents: write`. It checks out (persisting credentials), runs `npm ci` (executing dependency lifecycle scripts), typechecks/lints, builds with `GITHUB_TOKEN` in the environment, and force-pushes `out/` as an orphan commit to `gh-pages`. Every step, including third-party code, can use a token that can write to any branch. The site itself is static (no backend, no user input), so CI is the most valuable target.

```
today                                   target
┌─────────────── deploy (contents: write) ┐   ┌── build (contents: read) ──┐   ┌── deploy (pages, id-token) ─┐
│ checkout (token persisted)              │   │ checkout, no creds persisted│   │ deploy-pages                │
│ npm ci   ← 3rd-party scripts + token    │   │ npm ci / lint / build       │──▶│ (no checkout, no npm)       │
│ build    ← token in env                 │   │ upload-pages-artifact       │   └─────────────────────────────┘
│ git push --force gh-pages               │   └─────────────────────────────┘
└─────────────────────────────────────────┘
```

## Goals / Non-Goals

**Goals:**
- No job that runs third-party code holds a token that can write to the repository.
- Deployment behavior stays the same: on push to `main`, daily at 04:17 UTC, and manually. The base path is computed the same way.
- Action versions are immutable (SHA-pinned).

**Non-Goals:**
- Content-Security-Policy / security headers (GitHub Pages cannot set headers. A meta CSP is low value for a static site without user input and would be a separate change).
- Custom domain, caching, or moving off GitHub Pages.
- Hiding the public contact email.

## Decisions

### 1. Official Pages artifact deployment
- **Choice**: build → `actions/upload-pages-artifact` (path `out`) in the build job. `actions/deploy-pages` in a separate job with `environment: github-pages`. `actions/configure-pages` is omitted: its only use here would be the base path, which the existing repo-name rule already computes, and it would need an extra `pages: read` grant in the job that runs third-party code.
- **Rationale**: The deploy step authenticates via OIDC (`id-token: write`) with a `pages: write` scope that cannot touch git refs. There is no branch to force-push, and `.nojekyll` is unnecessary (artifacts are served as-is).
- **Alternatives**: Keep `gh-pages` but split jobs, with only the push job holding `contents: write` (works, but still a repo-write token plus a manual git dance).

### 2. Least-privilege permissions
- Workflow level: `permissions: {}`.
- `build`: `contents: read`. `actions/checkout` with `persist-credentials: false`.
- `deploy`: `pages: write`, `id-token: write`. It has no checkout and runs no npm.
- The build step still gets `GITHUB_TOKEN` for API rate limits. With `contents: read` it can only read public data, which is acceptable.

### 3. SHA pinning + Dependabot
- **Choice**: Pin `actions/checkout`, `actions/setup-node`, `actions/upload-pages-artifact` and `actions/deploy-pages` to full commit SHAs with `# vX.Y.Z` comments. Add `.github/dependabot.yml` for `github-actions` (weekly) and `npm` (weekly), so pins don't rot.
- **Rationale**: Tags can be moved. SHAs cannot.

### 4. Install scripts
- **Choice**: `npm ci --ignore-scripts`. Verified: the only package with an install script is `unrs-resolver` (dev, eslint resolver), and typegen, tsc, lint and the static export all pass without it.
- **Rationale**: After Decision 2, a malicious install script can only read the repo (already public), so it is a defense-in-depth measure, not a requirement.

### 5. Concurrency
- Keep `concurrency: group: pages`, but set `cancel-in-progress: false` for the deploy job, so a running deployment is never cut off halfway (GitHub's recommendation for Pages).

## Risks / Trade-offs

- [Pages source must be switched manually in repo settings] → A migration step. Until it is switched, `deploy-pages` fails loudly and the old `gh-pages` content keeps serving.
- [The `github-pages` environment may restrict branches] → The default allows `main`. Verify after the first run.
- [SHA pins can be outdated] → Dependabot.
- [`--ignore-scripts` breaks native deps] → Only adopt it if the build passes (Decision 4).

## Migration Plan

1. Merge the new workflow.
2. Repo → Settings → Pages → Source: **GitHub Actions**.
3. Run `workflow_dispatch` and verify the site at the Pages URL (base path, `/en/`, `/de/`, 404).
4. After a successful deploy, delete the `gh-pages` branch.
5. Rollback: switch the Pages source back to "Deploy from a branch → gh-pages" (the old content is still there until step 4) and revert the workflow.

## Open Questions

- Should the lint/typecheck also run on pull requests in a separate read-only workflow? (Nice to have, out of scope unless wanted.)
