# Session 2 labs: Types, Inference and Shaping Data

Your `labs/` folder sits in your course folder (`shoreline/labs/`, next to `shoreline-api/`, `shoreline-hq/` and,
from today, `ts-lab/`). Work in the `starter/` folders; `TASKS.md` in each lab says what to do and when you are done.
Open a terminal in the lab's `starter/` folder (VS Code: right-click the folder > Open in Integrated Terminal).

| Folder | What it is | Needs |
|---|---|---|
| `l2_1-types-and-inference/` | annotate only where TypeScript cannot guess, check outside data, handle "maybe nothing" | `npm install` once in `starter/` |
| `l2_2-shaping-data/` | describe the supply shed's gear with an interface and unions, handle every case | `npm install` once in `starter/` |

Both labs work like your `ts-lab`: Node runs the `.ts` files (`npm test` runs the tests), and `npm run check`
(`tsc --noEmit`) checks the types. Neither needs the API or the dev server. The two labs share one set of packages
(TypeScript and Node's types), so the second `npm install` is quick.
