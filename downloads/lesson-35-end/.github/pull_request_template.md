## What this changes

One or two sentences: what an organizer or a teammate will notice.

## How to check it

The page, the sample account and what should happen (for example: sign in as Maya, open /events/e17, mark Theo as a no-show).

## Checklist

- [ ] `npx tsc -b`, `npm run lint` and `npx vitest run` pass on my computer, and CI is green
- [ ] New or changed behavior has a test (Vitest, or Playwright for a whole journey)
- [ ] Keyboard, labels, focus and alt text checked on the changed screens
- [ ] Loading, error and empty states still say something helpful
- [ ] No secrets in the code or in a `VITE_` variable
- [ ] Changed `shoreline-api/core/types.ts`? The copies in `shoreline-hq/src/api/types.ts` and `shoreline-hq/src/mocks/core/` match it
