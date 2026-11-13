Shoreline Crew code for React + TypeScript: Build a Modern Web App
https://rays-typescript.netlify.app/

Each folder is one project:
  .github: the GitHub Actions workflow (Lesson 10.2)
  shoreline-api: the mock back end; no install needed: node server.ts  (Node 24 or newer)
  shoreline-hq: copy .env.example to .env.local; then npm ci   (installs the exact versions in package-lock.json); then npm run dev; then npm test  (runs the tests); then npx playwright install chromium (once), then npm run test:e2e  (start shoreline-api first)
  ts-lab: the TypeScript workbench (Module 2): npm ci; then npm run check  (no API needed)
