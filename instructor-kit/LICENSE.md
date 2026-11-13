# Instructor Kit License (Summary / Template)

**Kit:** React + TypeScript: Build a Modern Web App, an instructor kit for the course of the same name
(<https://rays-typescript.netlify.app/>)
**Author & licensor:** Ray de la Paz

> This is a plain-language template. Replace the bracketed terms at point of sale
> and have final wording reviewed by a lawyer before commercial distribution.

## Licensed materials
"The kit" means everything in the `instructor-kit/` folder and the course data it is taught with:

- the facilitator guides, participant workbooks and answer keys (per session and combined), the slide decks,
  the labs (task sheets, starters and solutions, fixtures, debug handouts, the environment check and the
  diagnostic, the Part 2 and Part 3 catch-up checks, the checkpoints, the Part 1 assessment's practical, the
  launch-readiness check, the final project's evidence check, the Part 1 and Part 2 projects with their model
  solutions, and the checker `check_labs.py`), the setup guide and quick setup, `final-assessment.html` (and the
  fragments in `_parts/` it is assembled from) and the sell sheet;
- the course's **practice data**: the fictional Shoreline Crew (its sites, cleanups, volunteers, organizers, sample
  accounts and email addresses, and the site pictures), the fictional clients of the Part 1 and Part 2 projects and
  assessments (Juniper Hill Community Garden, Basalt Peak Climbing Gym) and of the final-project briefs, and the
  course downloads (`shoreline-api`, the `lesson-NN-start` and `lesson-NN-end` code and the final-project kit with
  its starter). These are original works, written and drawn by the author for the course.

The kit has three parts: **Part 1, TypeScript and React Foundations** (Sessions 1 to 9), **Part 2, Data, State
and Routing** (Sessions 10 to 17) and **Part 3, Production React** (Sessions 18 to 26). A part license covers that
part's sessions and their materials (for Part 1 and Part 2, the matching sections of `final-assessment.html`; for
Part 3, the final project section); a two-part license covers two consecutive parts; a full license covers all 26
sessions.

## Grant
You (the "Instructor") are granted a **non-exclusive, non-transferable license** to use the kit to **teach the
course to your own students**, according to the tier and scope you purchased:

| Tier | Who may teach | Rebranding |
|------|---------------|------------|
| **Solo** | One named instructor | No |
| **Organization** | Multiple instructors at one org | No |
| **White-label** | Multiple instructors at one org | Yes — edit & add your brand |

| Scope | Solo | Organization | White-label | Updates add-on |
|-------|------|--------------|-------------|----------------|
| **Full program** (26 sessions) | [$1,597] one-time | [$4,797] one-time | [$9,597] one-time | [$319 / yr] |
| **Two consecutive parts** (Parts 1–2 or 2–3) | [$1,097] one-time | [$3,297] one-time | [$6,597] one-time | [$219 / yr] |
| **Part 1 only** (Sessions 1–9) | [$647] one-time | [$1,947] one-time | [$3,897] one-time | [$129 / yr] |
| **Part 2 only** (Sessions 10–17) | [$597] one-time | [$1,797] one-time | [$3,597] one-time | [$119 / yr] |
| **Part 3 only** (Sessions 18–26) | [$647] one-time | [$1,947] one-time | [$3,897] one-time | [$129 / yr] |

A part or two-part license can be upgraded to a larger scope for the difference in price [at point of sale].

## You MAY
- Teach the course to an unlimited number of your own students under your tier and scope.
- Print and distribute the **participant workbook**, the **setup guide**, the **quick setup**, the lab **task
  sheets**, **starter** folders and **fixtures**, the environment check and the catch-up and launch-readiness
  checks to enrolled students.
- Point enrolled students to the free course site and its downloads.
- Hand out lab **solutions** to enrolled students after the lab has been completed in class.
- Adapt timing, examples, and pacing to your audience.
- (White-label only) Edit the materials and add your own branding.

## You MAY NOT
- Resell, sublicense, or redistribute the kit itself to other instructors.
- Distribute the **facilitator guide**, the **answer key** or the **final assessment** (the part-project and
  assessment rubrics, model solutions and scoring notes, the final-project scoring guidance, the written final
  assessment and its key, and instructor notes), or the checkpoint, part-project and assessment solution folders,
  to students. These are **confidential** instructor materials. (The final project's own rubric is part of Lesson
  11.1's public kit on the course site.)
- Publish the materials publicly (e.g., a public website, repository or file share), including republishing
  the practice data as your own.
- Remove author credit (except under the white-label tier).

## Third-party software and data
**No third-party software is shipped with the kit.** Everything below is downloaded and installed by each
learner and the instructor, from its usual source, under its own license:

- **Node.js** (24 LTS; 26 also tested; **MIT License**) with **npm** (**Artistic License 2.0**), installed by
  each learner from nodejs.org or a version manager.
- **npm packages** installed by the lessons and labs from the npm registry, under their own licenses: TypeScript
  (**Apache-2.0**); React and React DOM, Vite and `@vitejs/plugin-react`, oxlint, React Router, TanStack Query,
  Zustand, React Hook Form, Zod and `@hookform/resolvers`, Babel, `babel-plugin-react-compiler` and
  `@rolldown/plugin-babel`, Vitest, jsdom, Testing Library, MSW and `rollup-plugin-visualizer` (**MIT**);
  Playwright (**Apache-2.0**); axe-core and `@axe-core/playwright` (**MPL-2.0**); and their dependencies. Tools run
  with `npx` (create-vite, the Netlify CLI) are downloaded the same way, as is the Chromium build Playwright
  installs. Packages land in each learner's own `node_modules/` folder; the kit and the course downloads ship only
  the `package.json` and `package-lock.json` files that name them, never `node_modules`. `shoreline-api` itself has
  no dependencies.
- **Fonts:** Shoreline Crew HQ uses **Outfit**, self-hosted through the `@fontsource-variable/outfit` package,
  licensed under the **SIL Open Font License 1.1**. The kit's own documents load Archivo, Source Sans 3 and
  JetBrains Mono from Google Fonts (**SIL Open Font License 1.1**); no font file is shipped with the kit.
- **Services and apps** mentioned or used as tools (VS Code and its extensions, the TypeScript Playground, GitHub
  and GitHub Actions, Netlify, and hosts compared in Lesson 10.2 such as Vercel and GitHub Pages) are not shipped
  with the kit and are used under their providers' own terms. The course needs only their free plans; Lesson 10.2
  teaches learners to read those terms (for example, a production deploy uses credits from Netlify Free's monthly
  allowance, and Vercel's free Hobby plan is for non-commercial use).

TypeScript and VS Code are trademarks of Microsoft Corporation; React is a trademark of Meta Platforms, Inc.;
Node.js is a trademark of the OpenJS Foundation; Netlify and GitHub are trademarks of their owners. The kit is not
affiliated with or endorsed by any of them.

**All data in the kit is the author's own and fictional:** every organization, site, cleanup, volunteer, organizer,
account, client and email address in Shoreline Crew, the part projects and assessments and the final-project
briefs is invented (email addresses use `example.com`). The sample accounts' shared password (`shoreline-demo`)
and the API's development tokens are public practice values for the local mock API and the demo build only.

## The public course site
The lessons at <https://rays-typescript.netlify.app/>, the course downloads in its `downloads/` folder and the
public syllabus remain freely available to anyone. This license covers the instructor kit and its use for
teaching; it does not restrict anyone's use of the free lessons and downloads. Learners keep the code they write,
including final projects built on the course's starter.

## Ownership
All materials remain the intellectual property of the licensor. This license may be revoked for breach of these
terms.

---
© 2026 Ray de la Paz. All rights reserved.
