# Level 6 Harness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the React portfolio project from Level 5 to Level 6 (Harness Engineering) by adding a CI gate that runs automated tests on every push and blocks on failure.

**Architecture:** Three pieces compose the harness: (1) a `CLAUDE.md` context file to prove L3/L4 foundation, (2) a dedicated `ci.yml` GitHub Actions workflow that runs tests + lint on every push and PR, and (3) a deploy workflow that depends on CI passing first. Backpressure is demonstrated by intentionally breaking a test, observing the red CI run, then restoring it to green.

**Tech Stack:** Vitest 4.x, ESLint 9.x, GitHub Actions, Node.js 20

---

## File Map

| Action | File | Purpose |
|--------|------|---------|
| Create | `CLAUDE.md` | L3 context: project rules for agentic workers |
| Create | `.github/workflows/ci.yml` | CI gate: runs tests + lint on every push/PR |
| Modify | `.github/workflows/deploy.yml` | Add `needs: test` so deploy only runs after CI passes |

---

### Task 1: Create new branch

**Files:** none (git operation)

- [ ] **Step 1: Create and switch to the new branch**

```bash
git checkout -b week4-capstone/level-6-harness
```

Expected: `Switched to a new branch 'week4-capstone/level-6-harness'`

---

### Task 2: Create CLAUDE.md (L3 foundation)

**Files:**
- Create: `CLAUDE.md`

- [ ] **Step 1: Write CLAUDE.md**

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add CLAUDE.md as L3 context foundation for Level 6 harness"
```

---

### Task 3: Create CI workflow

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Write the CI workflow**

```yaml
name: CI — Test & Lint

on:
  push:
    branches: ["**"]
  pull_request:
    branches: ["**"]

jobs:
  test:
    name: Run tests and lint
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Run lint
        run: npm run lint
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add CI workflow that runs tests and lint on every push"
```

---

### Task 4: Make deploy depend on CI

**Files:**
- Modify: `.github/workflows/deploy.yml`

- [ ] **Step 1: Add `needs: test` and a separate test job to deploy.yml**

Replace the current `deploy.yml` content with:

```yaml
name: Deploy portfolio to GitHub Pages

on:
  workflow_dispatch:
  push:
    branches:
      - main

jobs:
  test:
    name: Run tests (gate)
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Run lint
        run: npm run lint

  build-deploy:
    name: Build and deploy
    needs: test
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Deploy to GitHub pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: dist
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: make deploy depend on test job — deploy only if tests pass"
```

---

### Task 5: Demonstrate backpressure — break a test

**Files:**
- Modify: `src/utils/searchFilter.test.js` (temporarily)

- [ ] **Step 1: Introduce a deliberate test failure**

In `src/utils/searchFilter.test.js`, change the last assertion to a wrong expectation:

```js
it('returns empty array when nothing matches', () => {
    expect(filterItemsBySearch(ITEMS, 'python')).toHaveLength(1) // WRONG: should be 0
})
```

- [ ] **Step 2: Run tests locally to confirm it fails**

```bash
npm test
```

Expected output: `Tests 7 passed, 1 failed`

- [ ] **Step 3: Commit and push to trigger red CI**

```bash
git add src/utils/searchFilter.test.js
git commit -m "test: intentional failure to demonstrate CI backpressure (REVERT ME)"
git push -u origin week4-capstone/level-6-harness
```

Wait for GitHub Actions to show a red run on the branch.

---

### Task 6: Restore — go from red to green

**Files:**
- Modify: `src/utils/searchFilter.test.js` (restore)

- [ ] **Step 1: Restore the correct assertion**

```js
it('returns empty array when nothing matches', () => {
    expect(filterItemsBySearch(ITEMS, 'python')).toHaveLength(0)
})
```

- [ ] **Step 2: Run tests locally to confirm all pass**

```bash
npm test
```

Expected: `Tests 8 passed (8)`

- [ ] **Step 3: Commit and push to trigger green CI**

```bash
git add src/utils/searchFilter.test.js
git commit -m "test: restore correct assertion — backpressure demo complete"
git push
```

Wait for GitHub Actions to show a green run.

---

## Level 6 Checklist

- [ ] `CLAUDE.md` exists with commands, rules, and architecture (L3 proof)
- [ ] `ci.yml` runs tests + lint on every push and PR to any branch
- [ ] `deploy.yml` has `needs: test` — deploy blocked when tests fail
- [ ] Red CI run captured (broken test)
- [ ] Green CI run captured (restored test)
- [ ] All 8 tests pass locally: `npm test`
