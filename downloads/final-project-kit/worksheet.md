# Final Project Planning Worksheet

React + TypeScript: Build a Modern Web App, Lesson 11.1. Copy this file into your project folder (next
to `package.json`) and fill it in. Every section names the lessons whose "your own project" notes feed
it: open your course journal next to this file and start from what you already wrote. Keep it in Git
with the code; it is the first thing a peer reviewer reads.

Project name:
Brief (one of the lesson's briefs, or your own idea):
Your name:
Peer reviewer:

---

## 0. Charter (journal: 1.1, 1.2, today)

| Question | Your answer |
|---|---|
| Who is the client, in one sentence? | |
| Who uses the app, and what do they come to do? (two or three kinds of people) | |
| What must work on day one? (the must-haves, at most six) | |
| What would be nice later? (not in this project) | |
| What is out of scope, on purpose, and why? | |
| The sentence you wrote in Lesson 1.1 ("I built…", "I can…"): does this project prove it? | |
| How will the client know it works? (one sign you can check) | |

## 1. Domain types first (journal: 2.1, 2.2, 2.3, 2.4, 3.2, 3.3)

Write these in `src/api/types.ts` before any component. They are the contract between your pages,
your API and your tests.

Main types (interfaces):

| Type | Properties (name: type) | Optional (`?`) or `null`, and why | Example record |
|---|---|---|---|
| | | | |

Unions of literal types (statuses, categories, roles) and their `Record` tables:

| Union | Values | Label table | Other `Record` tables keyed by it (next steps, colors…) |
|---|---|---|---|
| | | | |

Request types made with utility types (Lesson 2.4: `Pick`, `Omit`, `Partial`):

| Type | Built as | Used by |
|---|---|---|
| `NewThing` | `Pick<Thing, …>` | the create form, `POST` |
| `ThingChanges` | `Partial<Pick<Thing, …>>` | the edit form, `PATCH` |

Values that are computed, never stored (totals, "overdue", "available", progress):

| Value | Computed from | Where (helper function name and type) |
|---|---|---|
| | | |

Data that arrives from outside your code (`unknown` until checked): API answers, storage, the address,
files. The guard or schema that checks each one:

| Data | Comes from | Checked by |
|---|---|---|
| | | |

Helper functions, written as function types first (Lesson 2.3; mark the generic ones):

| Helper | Type |
|---|---|
| | `(thing: Thing) => string` |

## 2. Routes and screens (journal: 4.1, 4.4, 6.1, 6.2, 6.3)

| Path | Page component | Who may open it | Data it needs first | Loading / error / empty text | Lazy? |
|---|---|---|---|---|---|
| `/` | | everyone | | | no |
| | | | | | |
| `*` | `NotFoundPage` | everyone | none | n/a | no |

Views people will want to share or bookmark, and their addresses (paths vs search params):

Shared layout (header, navigation, footer) and its component tree:

```
AppLayout
  ...
```

Where a part of a screen can fail without taking the rest down (error boundaries, Lesson 4.4):

## 3. Data layer (journal: 2.4, 4.1, 7.1, 7.2, 10.2)

Where the data comes from (tick one, and write why):

- [ ] The mock API in `src/mocks`, running in the browser for the demo (most briefs)
- [ ] A public API that needs no key (name it, link its terms, note its limits)
- [ ] A real API of your own (where it runs, what it costs per month, how CI starts it)

Endpoints (what your mock API answers, as a real one would):

| Method and path | Answers | Errors (status: when) | Rule only the server can check |
|---|---|---|---|
| `GET /api/…` | | | |

Query keys (general to specific, everything the answer depends on, Lesson 7.1):

| Kind of data | Query key | staleTime | Fetched by (loader, `useQuery`, `useSuspenseQuery`) |
|---|---|---|---|
| | `['things', 'list', search]` | | |

Changes (Lesson 7.2):

| Change | Request | Keys it makes out of date | Wait for the server, or optimistic? Why |
|---|---|---|---|
| | | | |

## 4. State placement (journal: 3.4, 5.1, 5.2, 6.2, 7.3)

Every piece of state you expect, and its home. If the last kind has more than three or four rows, look
at each one again.

| Value | Home: derived, local `useState`, `useReducer`, address (URL), server (Query), context, app-wide store | One reason |
|---|---|---|
| | | |

State with rules (several values changing together, undo): its actions as a union (Lesson 5.1):

```ts
type Action =
  | { type: '…' }
```

App-wide values (sign-in, preferences): a sensible default, or `| undefined` in the context type?

## 5. Forms (journal: 3.5, 8.1, 8.2)

| Form | Fields: input type → output type | Rules the schema checks | Rules only the server checks | One page or steps? |
|---|---|---|---|---|
| | | | | |

Line items (field arrays): what one row holds, and any rule about the whole list:

Files: types, largest size, where they are stored:

Three messages that say how to fix a problem without blaming anyone:

1.
2.
3.

## 6. Components, design and hooks (journal: 3.1, 3.2, 3.6, 4.2, 5.4)

The repeated card: its props, which may be missing, and what it shows then:

General-purpose components (Card, Badge, Button, DataList…) and where each is used:

Custom hooks to extract (name, parameters, return type):

Patterns, or "none needed" (tabs, a generic list, a polymorphic link):

Design tokens (check every text/background pair reaches 4.5:1, in light and dark):

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--brand` | | | |
| `--page` | | | |
| `--text` | | | |
| `--link` | | | |
| `--focus` | | | |

## 7. Accessibility (journal: 3.6, 4.3, 9.3)

Your five-line checklist from Lesson 3.6:

1.
2.
3.
4.
5.

Focus: "When…, the focus goes to…" (Lesson 4.3), one line per case:

- After a page change: `<main>` (the starter does this)
- After a form error:
- After a dialog closes:

Checks:

- axe: 0 violations on every page type, at 1280 and 390 px, light and dark (the starter's e2e test
  shows how)
- A keyboard-only walk through every must-have: skip link, focus always visible, no traps
- One screen reader check before launch (which reader, which page):

## 8. Performance budget (journal: 5.3, 10.1)

| Question | Your answer |
|---|---|
| Who visits, and which screens only some of them use? (those are your lazy routes) | |
| The visitor who uses the fewest screens, and the JavaScript budget for their first page | ___ kB |
| The longest list or busiest typing on any screen, and what you will measure there | |
| Measured after the build (`npm run build` table, `npm run analyze`) | |

## 9. Tests by level (journal: 9.1, 9.2, 9.3)

The "would hate to break" list, as test names that start with a verb:

| Test name | Level: unit, component, end-to-end | Sample data it needs |
|---|---|---|
| | | |

The rule that would hurt most if it broke silently, in three lines:

- What the person does:
- What they should see:
- What must NOT happen (a request, a save, a page):

Three end-to-end journeys, and the one thing only a real browser can prove for each:

1.
2.
3.

## 10. Environments, secrets and launch (journal: 2.4, 10.2)

| Environment | Started with | Where the data comes from |
|---|---|---|
| Development | `npm run dev:demo` (or `npm run dev` with a real API) | |
| Unit tests | `npx vitest run` | the mock API through MSW |
| End-to-end tests | `npm run test:e2e` | |
| Deployed | `npm run build:demo` on Netlify (or your choice) | |

Settings in `.env` files, each marked public (fine in a `VITE_` variable) or secret (never in the front
end):

| Setting | Public or secret | Lives in |
|---|---|---|
| | | |

Is a demo build the honest way to show this app? What does the demo banner say?

| Host | Plan | What it allows / counts (quote the current terms, with the link) | Monthly cost |
|---|---|---|---|
| | | | |

Deploy routine (start from Lesson 10.2's): checks green on GitHub, `npm run build:demo`, a draft deploy,
a look, then `--prod`, then the live launch checklist.

## 11. Milestones and time log

The lesson's printed time covers this worksheet and Milestone 1. The whole project is about 25 more
hours (usually 20 to 30), best spread over three to five weeks. Log the real hours: comparing them with
your estimate is the most useful estimating practice there is. When a milestone runs 50 % over, stop and
re-plan: cut a nice-to-have before you cut a check.

| # | Milestone | Done when | Typical (h) | Estimate (h) | Actual (h) | Date done |
|---|---|---|---|---|---|---|
| 1 | Types first | your types in `types.ts` (next to the example `Item`), label `Record`s, 6 to 12 sample records per type (one awkward), your mock API's routes and rules with tests; `tsc -b`, lint and Vitest green; first commit pushed and CI green | 2–3 | | | |
| 2 | Walking skeleton | routes and layout, one list and one detail page from your types, loading, error, empty and not-found states; the example `Item` deleted; a draft deploy of the demo | 3–5 | | | |
| 3 | Features | every must-have works: forms with schemas and server errors, changes through mutations, address state, client state where the table says | 6–9 | | | |
| 4 | Accessibility and performance | axe 0 at both widths and themes, keyboard walk, focus cases, lazy routes, a budget measured (or a budget test) | 2–3 | | | |
| 5 | Tests and CI | the tests in section 9 pass; lint at 0 warnings; both CI jobs green | 3–4 | | | |
| 6 | Launch | production deploy, live launch checklist ticked, README with the link, a screenshot and how to run it | 1–2 | | | |
| 7 | Peer review | your review given, theirs received, every point fixed or answered | 2–3 | | | |

## 12. Risks and questions for the client

| Risk or open question | What you will do about it |
|---|---|
| | |
