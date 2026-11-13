# Checkpoint 1: Module 2 (TypeScript), 30 minutes, alone

Three small tasks that use all of Module 2 (Lessons 2.1 to 2.4) on something new: a tide-pool survey, where a
volunteer counts one kind of animal in one zone of a site's tide pools. The lesson pages and your own `ts-lab` are
allowed (that is how developers work); a neighbor's code is not. It is not a grade: it tells you and your instructor
what to revisit before Module 3 goes deeper into React.

**Setup:** a terminal in `labs/module-04/checkpoint-1/starter`, `npm install` (start it at the break), then
`npm test` and `npm run check`. As shipped, all five tests fail with `TODO` and the check reports errors. You are
done when `npm test` ends with `ℹ fail 0` and `npm run check` prints nothing after its two `>` lines. Work task by
task and run both commands after each change.

## Task 1 (Lessons 2.1 and 2.2, about 8 minutes): the types and one line

Write `Zone` (exactly three words) and the `Survey` interface (read the sample surveys at the top of
`lab.test.ts`: which property is sometimes missing, which one may be `null`?). Then `surveyLine`: the two example
lines are in the comment. Handle the missing note and the `null` without `!`.

## Task 2 (Lesson 2.3, about 10 minutes): a function type and a generic

`SurveyFormatter` is a function type (a survey in, text out); `formatAll` applies it to every survey, with
`surveyLine` as the default. `maxBy` returns the item with the largest value for ANY kind of list, and `undefined`
for an empty one: give it a type parameter, a function type for `valueOf` and an honest return type.

## Task 3 (Lesson 2.4, about 10 minutes): data from outside

`isSurvey` becomes a type guard that checks every property a `Survey` promises (an unknown zone, a count sent as
text or a missing `verifiedBy` are not surveys). `readSurveys` parses the JSON as `unknown` and returns the surveys
only if it is an array of surveys; otherwise it throws `Unexpected survey data`. `SurveyEdit` is "any property except
the id, all optional", written with utility types.
