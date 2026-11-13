# Lab 6.1: a site guide with a real router

New practice on Lesson 6.1, on a small app of its own instead of the HQ: the six beach sites, a route list in
data mode, links that do not reload, a page that reads its id from the address, an error page that keeps the
header, and the focus after a page change. The tests (`src/lab.test.tsx`, do not edit) put YOUR route list in a
memory router (`createMemoryRouter`), visit an address and look at what renders, the way a browser would.

**Setup (once):** a terminal in `labs/module-15/l6_1-react-router-8/starter`, then `npm install`.
`npm test` runs the tests (7 fail and 1 passes as shipped), `npm run typecheck` runs `tsc --noEmit`,
`npm run lint` runs oxlint. Files you edit: `src/routes.tsx`, `src/SitePages.tsx`, `src/Layout.tsx`.
`src/pages.tsx` and `src/sites.ts` are given.

## Task 1: the route list (`src/routes.tsx`)

As shipped there is a layout route with only the home page, so `/sites` answers with React Router's own error
screen. Keep the layout route and put a route WITHOUT a path inside it: its `errorElement` is `<PageProblem />`
and its children are the pages: the index page, `sites`, `sites/:siteId`, `reports` (a page that crashes on
purpose) and `*` for everything else. Predict before you run: on `/reports`, does the header stay? And with the
`errorElement` on the layout route instead? Done when the three Task 1 tests pass.

## Task 2: links and the address (`src/SitePages.tsx`, `src/Layout.tsx`)

The site list uses plain `<a href>`: in a browser every click would load the app again (in the tests, nothing
happens at all). Make each name a router link to `/sites/<id>`. Then write `SitePage`: read `siteId` with
`useParams<'siteId'>()`, narrow `string | undefined`, and show the site (`findSite`): its name as the `<h1>` and
`town · terrain` under it, or the heading `No site called <id>`. Last, the header: the current section must be
marked with `aria-current="page"` (on `/sites/north-jetty`, Sites is current). Done when the Task 2 tests pass.

## Task 3: where the focus goes (`src/Layout.tsx`)

After a router navigation the focus stays on the link that was clicked. Move it to `<main>` whenever the pathname
changes, but not on the first page (one test checks that the first page leaves the focus alone). `<main>` needs
`tabIndex={-1}` so a script can focus it. Done when `npm test` says `Tests  8 passed (8)`, `npm run typecheck`
prints nothing after its two `>` lines and `npm run lint` says `Found 0 warnings and 0 errors.`

**Stretch: the debug handout.** Copy `debug_outside_router.test.tsx` into `starter/src/` and run
`npx vitest run src/debug_outside_router.test.tsx`. Read the error: where does a `Link` look for its router? Fix the
test, not the page. Then delete the copy (or keep it: it is a real test of the list).
