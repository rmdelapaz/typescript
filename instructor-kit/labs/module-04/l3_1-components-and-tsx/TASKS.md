# Lab 3.1: a beach day page from four components

New practice on Lesson 3.1's ideas, outside the course app (your `shoreline-hq` gets its shell in the lesson
project). A small page for a beach day: a header (given), the tide-pool rules, the crew in numbers and a footer.

**Setup (once):** a terminal in `labs/module-04/l3_1-components-and-tsx/starter`, then `npm install` (React,
Vitest and Testing Library: start it early). **Run:** `npm test` (Vitest renders the components the way a user
meets them: by heading, label and landmark) and `npm run typecheck` (`tsc --noEmit`: Vitest does not check types).
As shipped, all three tests fail and the type check reports errors in two files.

## Task 1: from HTML to TSX (`src/TideRules.tsx`)

The comment holds the crew's old HTML handout. Return it as TSX: one parent element, every tag closed,
JavaScript's attribute names, the comment in braces. Keep the empty `alt` (the picture is decorative). The test
fails while React prints any warning, so `class` or `for` that "work" in the browser still fail here. Done when the
Task 1 test passes.

## Task 2: braces hold expressions (`src/CrewNumbers.tsx`)

`npm run typecheck` says one line hands React something it cannot draw. Show the beach and the town instead, then
replace the two TODO lines with text built from `crew` (no number typed by hand; a `? :` for full or open). Done
when the Task 2 test passes.

## Task 3: compose the page (`src/BeachDayPage.tsx`)

`npm run typecheck` names two problems: an import that asks for a default export `PageHeader.tsx` does not have
(TS2613: read its suggestion), and a component whose lowercase name makes TSX treat it as an HTML tag. Fix the
import, move the footer into its own file `src/PageFooter.tsx` with a named export (one component per file, a
capitalized name), and import it. Done when `npm test` says `Tests  3 passed (3)` and `npm run typecheck` prints
nothing after its two `>` lines.

**Stretch:** add the year to the footer (`© 2026` from `new Date().getFullYear()`) WITHOUT calling `new Date()`
inside the component (rendering must be pure: read it once at the top of the file, as the HQ's Footer does).
