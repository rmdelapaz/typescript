import { test } from '@playwright/test'

// Task 2: one axe test per theme: a loop over ['light', 'dark'] as const, test.describe + test.use({ colorScheme }),
// wait for the results ('Found 2 sites.' for /?q=cove), then expectNoAxeViolations(page) from ./helpers.ts.
test('TODO 2: axe in light and dark', async () => {
  throw new Error('TODO 2: write the accessibility scans (TASKS.md, Task 2)')
})
