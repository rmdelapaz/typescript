# Session 24 labs: Deploying

Copy the whole `labs/` folder into your course folder once (`shoreline/labs/`), if you have not already. Work in
the `starter/` folder; `TASKS.md` says what to do and when you are done. No shoreline-api needed, and nothing here
deploys anything or needs an account.

| Folder | What it is | Needs |
|---|---|---|
| `l10_2-deploying/` | "Gear Library": decide demo-or-not at build time, put the host's files where the host reads them, fix an old workflow; `deploy.check.ts` reads both builds | `npm install` once in `starter/` (Vite, React, MSW) |
| `l10_2-deploying/launch_check.mjs` | the launch-readiness check for YOUR course folder: Git, repository, workflow, host files, remote, Netlify link, and the by-hand list (accounts, sign-ins, network test) | run it from your course folder: `node labs/module-24/l10_2-deploying/launch_check.mjs` |

The lab never runs inside `shoreline-hq`. The launch check only reads your course folder; it changes nothing.
