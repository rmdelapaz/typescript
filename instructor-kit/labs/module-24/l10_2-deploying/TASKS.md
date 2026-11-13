# Lab 10.2: Gear Library, ready to ship

New practice for Lesson 10.2 (Deploying), on a small app that is not shoreline-hq: "Gear Library" lists what the
crew can borrow. Like the HQ it has a DEMO build whose API runs in the visitor's browser (`src/demo/browser.ts`,
MSW's service worker), so the demo works on any static host. Three things stand between it and a host:

**Run:** a terminal in `starter/`: `npm install` once, then build both versions and run the check (given, do not
edit):

```
npx vite build && npx vite build --mode demo --outDir dist-demo && node deploy.check.ts
npx vite preview --outDir dist-demo      # optional: the demo, with no API anywhere
```

As shipped, the check prints `FIX` lines for all three tasks. `npm test` and `npm run typecheck` must stay green.

## Task 1: decide "demo or not" when Vite builds (`src/main.tsx`)

The starter starts the demo API when the hostname ends with `.netlify.app`. Read the normal build's table first:
which file should not be there? Change the condition to `import.meta.env.MODE === 'demo'` and build again.

## Task 2: the host's files, in the folder the host publishes

Netlify reads `_redirects` and `_headers` from the published folder, `dist/`. Every build copies `public/` into it.

1. The starter's `_redirects` sits next to `package.json`, so no build ever ships it. Move it into `public/`.
2. `public/_headers` caches EVERYTHING for a year, `index.html` included: a returning visitor would never see your
   next deploy. Cache only `/assets/*` for a year (`immutable`), and send `X-Content-Type-Options: nosniff`,
   `Referrer-Policy: strict-origin-when-cross-origin` and `X-Frame-Options: DENY` with every response (`/*`).

## Task 3: a workflow you would accept in a review (`.github/workflows/ci.yml`)

Pretend `starter/` is a repository. Its workflow came from an old tutorial: make it run on pushes to `main` AND on
pull requests, with read-only `permissions`, `actions/checkout@v7` and `actions/setup-node@v7` on Node.js 24 with
the npm cache, and these steps: `npm ci` (not install), `npm run typecheck`, `npm test`, `npx vite build` and
`npx vite build --mode demo`. Two spaces per level, never tabs. If you installed actionlint in Lesson 10.2's
Exercise 1, it runs only inside a Git repository: `git init` in a copy of `starter/` first.

Done when the check ends with `All checks pass: ready for a draft deploy`, `npm test` passes and
`npm run typecheck` prints nothing after its two `>` lines. Nothing in this lab deploys anything.

## The launch-readiness check (Session 24, for your own course folder)

`launch_check.mjs` is not a task: it checks YOUR course folder before Lesson 10.2's Steps 6 and 7 (Git, the
repository, the workflow, the host's files, the remote, the Netlify link) and lists what only you can do by hand
(accounts, sign-ins, the network test). From your course folder `shoreline`:

```
node labs/module-24/l10_2-deploying/launch_check.mjs
node labs/module-24/l10_2-deploying/launch_check.mjs --online   # also tries the sites the deploy needs
```
