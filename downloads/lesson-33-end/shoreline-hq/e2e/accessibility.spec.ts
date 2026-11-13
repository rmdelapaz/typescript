import { expect, test } from '@playwright/test'
import { expectNoAxeViolations, resetApi, signIn } from './helpers.ts'

/** Pages anyone can open, and the heading that says each one has loaded */
const publicPages = [
  { path: '/', heading: 'Shoreline Crew HQ' },
  { path: '/events', heading: 'Cleanup events' },
  { path: '/events/e17', heading: 'Tide Pool Morning Cleanup' },
  { path: '/sites', heading: 'Beach sites' },
  { path: '/impact', heading: 'Our impact' },
  { path: '/sign-in', heading: 'Sign in' },
]

for (const colorScheme of ['light', 'dark'] as const) {
  test.describe(`${colorScheme} theme`, () => {
    test.use({ colorScheme })

    test.beforeEach(async ({ request }) => {
      await resetApi(request)
    })

    for (const { path, heading } of publicPages) {
      test(`${path} has no axe violations`, async ({ page }) => {
        await page.goto(path)
        // Scan the page with its data, not the loading message
        await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible()
        await expectNoAxeViolations(page)
      })
    }

    test('the impact report form with its error summary has no axe violations', async ({ page }) => {
      await signIn(page)
      await page.goto('/events/e17/impact')
      await page.getByLabel('Pieces, row 1').clear()
      await page.getByRole('button', { name: 'Save the report' }).click()
      await expect(page.getByRole('region', { name: /^Fix these/ })).toBeFocused()
      await expectNoAxeViolations(page)
    })
  })
}
