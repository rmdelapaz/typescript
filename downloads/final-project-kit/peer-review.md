# Peer Review Checklist

React + TypeScript: Build a Modern Web App, Lesson 11.1. You review a classmate's (or a friend's) final
project; they review yours. Plan about 90 minutes for one review. You need: their live link, read
access to their repository (public, or add you as a collaborator) and their `worksheet.md`. You never
need their passwords, accounts or `.env.local`: if you do, that is a finding.

Project:                          Live link:
Author:                           Reviewer:

## 1. Read the plan first (15 min)

- [ ] The charter says who the app is for, what must work, and what is out of scope (with a reason)
- [ ] The domain types fit the brief: statuses are unions, money is not a decimal number, computed values are not stored
- [ ] The state placement table has reasons, and the app-wide store (if any) is short
- [ ] The launch decision (demo build or real API) has a reason, and the host's terms are quoted

## 2. The live launch checklist, against their link (20 min)

Run Lesson 10.2's checklist exactly, with their address:

- [ ] Phone, on mobile data: the banner (if it is a demo), the main list, the pictures
- [ ] Deep links: open a detail page, reload; paste it into a new tab; `/no-such-page` shows their "Page not found"
- [ ] The main journey works: create or change something; reload a demo and see it reset (as its banner says)
- [ ] `curl -I` on the link shows `X-Content-Type-Options`, `Referrer-Policy` and `X-Frame-Options`, and a
  `cache-control` that makes browsers check again; one file from `/assets/` is `immutable`
- [ ] `http://` redirects to `https://`
- [ ] The browser's console shows no errors on the pages you visited

## 3. Use it like the people in the brief (20 min)

- [ ] Each must-have from their charter works (write down any that don't, with steps to reproduce)
- [ ] Keyboard only: the skip link, the navigation, every control, every form; focus always visible
- [ ] Lighthouse's accessibility audit or axe DevTools on two page types, light and dark: note any violations
- [ ] Empty and error states: a search with no results says so in words; a form with mistakes says how to fix them
- [ ] At 390 px wide nothing scrolls sideways and nothing is cut off

## 4. Read and run the code (25 min)

- [ ] The latest commit has a green tick; open the run and read one job's steps
- [ ] No `.env.local`, `node_modules`, `dist` or `playwright-report` in the repository; `.env.example` lists every variable, with no secret in it
- [ ] Clone it and run `npm ci`, `npx tsc -b`, `npm run lint` and `npx vitest run`: all green on your computer too
- [ ] `src/api/types.ts` reads like the brief; search the code for `any` and ` as ` and ask about each one
- [ ] API answers are checked before use (guards or schemas); forms use one schema for rules and types
- [ ] The tests cover the rule from worksheet section 9 that "must not happen"

## 5. Write the feedback (10 min)

Kind, specific, useful. For each point: what you saw, where (address or file and line), how to reproduce it.

- Two things that work well, and why:
  1.
  2.
- Two things to improve, most important first:
  1.
  2.
- One question you would ask as their client:

Then score the project with `rubric.md` and send both to the author. Author: answer every point,
either with a fix (and the commit) or with a sentence on why you are leaving it.
