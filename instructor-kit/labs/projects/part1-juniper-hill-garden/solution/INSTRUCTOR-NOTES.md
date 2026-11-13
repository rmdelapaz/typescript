# Instructor notes: Juniper Hill Community Garden, the Plot Board (Part 1 project)

Never hand out this folder before scoring. It is the model solution: `npm ci`, `npm test` (12 passed),
`npm run typecheck`, `npm run lint` (0 warnings and 0 errors, jsx-a11y on) and `npm run build` all pass, as
`python3 labs/check_labs.py projects/part1-juniper-hill-garden` proves.

- **Sizing.** The kickoff (65 minutes in Session 8) gets everyone through setup and TODO A, and most through TODO B. The rest is three to four hours at home before the Session 9 check-in, plus polish before the hand-in a week later. TODO E is Lesson 3.5's project with other names: learners who finished that lesson move fastest there.
- **Why local data.** Part 1 ends before fetching (Lesson 4.1). Everything runs offline: `npm install` once, then no network and no API. Learners who know `fetch` already may not add it: the rubric scores what Part 1 teaches.
- **Where it lives.** A folder next to the course app (`shoreline/juniper-hill/`), never inside `shoreline-hq/`. It has its own `package.json`, its own tests and its own dev server: two dev servers at once get two ports (Vite prints the second one).
- **The `@ts-expect-error` test (TODO A).** While `PlotStatus` is still `string`, tsc reports `TS2578 Unused '@ts-expect-error' directive` in the test file: the test passes only when the union is exact. Explain it once in the kickoff; otherwise learners edit the test file.
- **The space in the button name (TODO C).** Browsers name the button `Show details for Plot 3` either way; jsdom (Testing Library) drops a space that sits at the start of the hidden text. `Show details{' '}<VisuallyHidden>for Plot 3</VisuallyHidden>` works in both, and Shoreline Crew HQ's tests in Module 9 use the same form.
- **A harmless warning.** jsdom prints `The tag <search> is unrecognized in this browser` when a test renders the filters: the course app uses `<search>` too (Lesson 3.4), browsers support it, the tests still pass.
- **Most common problems, and the nudge.** `gardener` not optional (tsc on `plots.ts`: "Property 'gardener' is missing"); the visible list or the count in `useState` (ask: can you work it out from the filters?); a select whose `onChange` passes `event.target.value` straight into state (TS2345: narrow it with `isBedKind` / a status guard); keys from the index; the form's messages in an `alert()` or the console; `className="card"` strings left after styling (search for `className="`); the checkbox's `FormData` value is `null` when it is not ticked (that is why `readText` returns `''`).
- **Scoring.** Run the four commands yourself on the hand-in (`npm ci` first). Then a two-minute keyboard pass (Tab through the filters, a card's button, the form; submit it empty) and a look at 390 px. Score each row from the evidence; write one sentence per row that is not "strong".
- **Pairs.** Allowed if both can explain every line in the demo; score each learner's row 6 separately.
- **Resubmission.** A row at 0 gets a written next step and one resubmission within two weeks. The Part 1 result is recorded when both the project and the assessment are met.
