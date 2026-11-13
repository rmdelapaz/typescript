# Lab 1.2: running is not checking

New practice on Lesson 1.2's central idea, on a small file instead of the course app: one tool RUNS the code
(`npm test`, like the dev server), one CHECKS the types (`npm run check` = `tsc --noEmit`, like the first half of
`npm run build`), one looks for suspicious code (`npm run lint` = oxlint, like the course app's lint).

**Setup (once):** a terminal in `labs/module-01/l1_2-your-workspace/starter`, then `npm install`.

## Task 1: the crash, and who saw it first

Run `npm test`. A test fails with a `TypeError`: the code crashed while running, like the blank page in the lesson.
Now run `npm run check`: the same mistake, named before anything runs, with a suggestion. Fix it (in VS Code: click
the underlined word, Ctrl+. or Cmd+.). Done when both tests pass.

## Task 2: it runs, but is it right?

The tests pass now, yet `npm run check` still reports two errors. Read them: one says a value has the wrong type for
its annotation, one says something is never used. Fix the annotation so that it tells the truth (do not change the
value). Then predict: will the tests notice? Why not?

## Task 3: the linter's view

Run `npm run lint`. oxlint reports the same unused constant as a warning, with a code frame. Decide: use it or remove
it (the tests say what `banner()` must return). Done when `npm test` ends with `ℹ fail 0`, `npm run check` prints
nothing after its two `>` lines and `npm run lint` says `Found 0 warnings and 0 errors.`

**Stretch: the debug handout.** With the API running (`node server.ts` in `shoreline-api`), run
`node debug_count_events.ts http://localhost:4000` in this lab's folder. It has two bugs; the second only shows once
the first is fixed. Then copy your fixed file into `starter/` as `count_events.ts` and run `npm run check` there:
would tsc have caught the second bug before you ran anything?
