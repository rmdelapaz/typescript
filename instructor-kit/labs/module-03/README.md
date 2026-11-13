# Session 3 labs: Functions, Generics and Typing Real Data

Your `labs/` folder sits in your course folder (`shoreline/labs/`). Work in the `starter/` folders; `TASKS.md` in
each lab says what to do and when you are done. Open a terminal in the lab's `starter/` folder.

| Folder | What it is | Needs |
|---|---|---|
| `l2_3-functions-and-generics/` | type the crew's shift helpers: parameters, defaults, an options object, function types, generics | `npm install` once in `starter/` |
| `l2_4-typing-real-data/` | check the crew's impact numbers at the door: `import type`, type guards, utility types | `npm install` once in `starter/` |

Both labs work like your `ts-lab`: `npm test` runs the code and the tests, `npm run check` (`tsc --noEmit`) checks
the types. Neither needs the API: Lab 2.4's `fixtures/` hold the real answers of `GET /api/impact` and
`GET /api/meta`, saved from the course API.
