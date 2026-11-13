# Bramblekey Visits

A visit book for Bramblekey Piano Service, a one-tuner business: clients book a visit for their piano, the tuner
plans the days (three visits at most), records extras and follows each visit from requested to paid.

**Live demo:** https://bramblekey.example.com (a demo build: its sample data lives in your browser tab and resets
when you reload, as the banner says)

![The week's visits at phone width, with the demo banner](docs/visits-390.png)

## Run it

Node.js 24 or newer:

    npm ci
    npm run dev:demo

Checks: `npx tsc -b`, `npm run lint`, `npx vitest run`, `npm run test:e2e`.

## Decisions

- A demo build with a mock API in the browser: the tuner has no server, and the demo shows every rule.
- Money in whole cents, the total computed from the fee and the extras, never stored.
- The day limit is a server rule (409), tested on both sides.
