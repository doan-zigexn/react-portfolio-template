# React Portfolio — Claude Code Context

## Project
React + Vite portfolio site with a client-side portfolio search feature.
Branch model: feature branches → PR → main → auto-deploy to GitHub Pages.

## Commands
- `npm run dev` — local dev server (Vite, port 5173)
- `npm test` — run Vitest unit tests (must pass before every commit)
- `npm run lint` — ESLint check
- `npm run build` — production build

## Rules for agentic workers
1. Run `npm test` before committing. Never commit with failing tests.
2. Run `npm run lint` and fix all errors before committing.
3. Keep `src/utils/searchFilter.js` pure (no DOM, no React imports).
4. All search logic changes must be covered by tests in `src/utils/searchFilter.test.js`.
5. Never push directly to `main` — always open a PR.

## Architecture
- `src/utils/searchFilter.js` — pure filter utility (framework-free)
- `src/utils/searchFilter.test.js` — Vitest unit tests for the filter
- `public/data/` — JSON data files loaded at runtime
- `src/hooks/` — React hooks for data fetching and layout
- `.github/workflows/ci.yml` — CI gate (tests + lint, runs on every push)
- `.github/workflows/deploy.yml` — deploys to GitHub Pages only after CI passes

## Level 6 Harness
This project has automated backpressure:
- Every push triggers `.github/workflows/ci.yml`
- CI runs `npm test` and `npm run lint`
- The deploy workflow has `needs: test` — it only runs if CI passes
- A failing test blocks both CI and deployment automatically
