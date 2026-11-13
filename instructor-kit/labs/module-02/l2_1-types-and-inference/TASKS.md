# Lab 2.1: annotate the edges, check the outside

New practice on Lesson 2.1's ideas, in a small folder of its own (your `ts-lab` keeps the lesson's `types.ts`).
Node runs the `.ts` files and the tests without checking them; `npm run check` (`tsc --noEmit`) checks them.

**Setup (once):** a terminal in `labs/module-02/l2_1-types-and-inference/starter`, then `npm install`.
**Run:** `npm test` and `npm run check`. As shipped, four tests fail (two with a `TODO 2` message, two with a
`TypeError`), and the check reports errors in all three files: read the first line of each.

## Task 1: types only where they are needed (`numbers.ts`)

The tests for Task 1 already pass: Node runs the file happily. The check does not: TypeScript cannot guess the
two functions' parameters (TS7006), what goes into an array that starts empty, or a variable that gets its value
later. Add an annotation in exactly those places and nowhere else (hover over the functions afterwards: their return
types are inferred). Done when `npm run check` reports nothing in `numbers.ts`, and the two `@ts-expect-error` lines
at the end of `lab.test.ts` are accepted (they EXPECT an error: a weigh-in is a number, `bags` is a number).

## Task 2: a value from outside (`outside.ts`, `capacityFrom`)

A saved form comes back as JSON text. Return the number when the JSON holds a number and `null` for anything else.
Type what `JSON.parse` gives you as `unknown`, then narrow it with `typeof`. Before you write it, try the tempting
one-liner in the comment and run `npm test`: which test catches what `any` let through? Done when the two Task 2
tests pass.

## Task 3: maybe nothing (`outside.ts`, `welcome` and `firstOver`)

`npm run check` asks two questions here: TS18047 (`savedName` is possibly `null`) and TS18048 (`heavy` is possibly
`undefined`). Answer each one in code with an `if`, so that a first visit says `Welcome, new volunteer` and a list
without a heavy bag says `No bag over 20 kg` (the tests show the exact sentences). Done when `npm test` ends with
`ℹ fail 0` and `npm run check` prints nothing after its two `>` lines.

**Stretch:** what does `capacityFrom('18.5')` return, and is that what a form for "how many volunteers" should
accept? Make it return `null` for numbers that are not whole (`Number.isInteger`), and add a line to the test
file to prove it.
