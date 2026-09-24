## 1. Workflow rewrite

- [x] 1.1 Set workflow-level `permissions: {}` and keep the triggers (push `main`, cron `17 4 * * *`, `workflow_dispatch`)
- [x] 1.2 Add a `build` job with `contents: read`, checkout with `persist-credentials: false`, setup-node 22 + npm cache, `npm ci`, typegen/tsc/lint, base-path computation, and `npm run build` with a read-only `GITHUB_TOKEN`
- [x] 1.3 In `build`, add `actions/upload-pages-artifact` with `path: out`, and drop the `.nojekyll`/git push steps (`configure-pages` omitted, see design §1)
- [x] 1.4 Add a `deploy` job (`needs: build`, `environment: github-pages` with `url` output, `pages: write` + `id-token: write`) that only runs `actions/deploy-pages`
- [x] 1.5 Set concurrency `group: pages`, `cancel-in-progress: false`
- [x] 1.6 Pin all actions to full commit SHAs with `# vX.Y.Z` comments
- [x] 1.7 Try `npm ci --ignore-scripts`. Keep it only if lint and build still pass

## 2. Supply-chain upkeep

- [x] 2.1 Add `.github/dependabot.yml` for `github-actions` and `npm` (weekly)
- [x] 2.2 Update the deploy-branch comment in `next.config.ts` to reference the Pages artifact flow

## 3. Migration and verification

- [x] 3.1 Document the manual step: Settings → Pages → Source "GitHub Actions" (commit message or README)
- [x] 3.2 Trigger `workflow_dispatch` and confirm that the build job has no write token (check the "GITHUB_TOKEN Permissions" section of the log) (the new workflow deployed successfully on push of cdac162; the token permissions in the log were not checked by Claude, since gh is not logged in)
- [x] 3.3 Verify the deployed site: `/`, `/en/`, `/de/`, the 404 page, assets under the base path, and the GitHub stats (checked live: /, /en/, /de/ → 200; /fr/, /en/missing/ → 404; CSS under the base path → 200; new content present)
- [x] 3.4 After a successful deploy, delete the `gh-pages` branch (done by the owner: the branch no longer exists on origin)
