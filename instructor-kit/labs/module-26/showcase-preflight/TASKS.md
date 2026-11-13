# Showcase pre-flight: the evidence check

Two days before the showcase, your instructor scores what they can open: your worksheet, your repository, your live
link and the review you received. `evidence_check.mjs` reads your project folder and lists what is still missing
from that evidence, with the rubric row each line belongs to. It changes nothing and needs no network.

From your final project's folder (the one with `package.json`), with the course's `labs/` folder next to it or
anywhere you like:

    node path/to/labs/module-26/showcase-preflight/evidence_check.mjs

or from anywhere: `node evidence_check.mjs path/to/your-project`.

## Task 1: no FIX lines

Each FIX line names missing evidence: a starter name still in place, the example `Item` still in `types.ts`, an
empty charter or Milestone 1 without actual hours, no `ci.yml`, a deep-link or header rule missing, a `VITE_`
variable named like a secret, a README without the live link. Fix them, commit, and run the check again until the
verdict is `READY FOR THE SHOWCASE` or `READY WITH NOTES`.

## Task 2: an answer for every CHECK line

CHECK lines are things a person must look at: `any` in your code (be ready to say why, rubric row 2), milestones
without actual hours yet, no screenshot in the README, no file with the review you received. Write one sentence for
each in your worksheet's risks (section 12), or fix it.

## Done when

The last line says `READY FOR THE SHOWCASE` (or `READY WITH NOTES` with an answer for each CHECK line), and the
live checks still pass on your link: Lesson 10.2's live launch checklist, which your peer ran in their review.
The check reads files only: it cannot see your live site, your CI run or your Git history.
