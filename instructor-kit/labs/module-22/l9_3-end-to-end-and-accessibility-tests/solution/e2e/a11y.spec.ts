import { expect, test } from '@playwright/test'
import { expectNoAxeViolations } from './helpers.ts'

for (const colorScheme of ['light', 'dark'] as const) {
  test.describe(`${colorScheme} theme`, () => {
    test.use({ colorScheme })

    test('the beach sites page has no axe violations', async ({ page }) => {
      await page.goto('/?q=cove')
      // Scan the page with its results, not before the script has run
      await expect(page.getByRole('status')).toHaveText('Found 2 sites.')
      await expectNoAxeViolations(page)
    })
  })
}
