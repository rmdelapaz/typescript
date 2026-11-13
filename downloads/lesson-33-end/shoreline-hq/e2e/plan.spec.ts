import { expect, test } from '@playwright/test'
import { resetApi, signIn } from './helpers.ts'

test.beforeEach(async ({ request }) => {
  await resetApi(request)
})

/** A date four weeks from now as YYYY-MM-DD: far enough ahead that time zones never matter */
function fourWeeksFromNow(): string {
  return new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
}

test('an organizer plans a cleanup and finds it in the list', async ({ page }) => {
  await signIn(page)
  await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Events' }).click()
  await page.getByRole('link', { name: 'Plan a cleanup' }).click()

  await page.getByLabel('Title (5 to 80 characters)').fill('Dune Grass Cleanup')
  await page.getByLabel('Beach site').selectOption({ label: 'Long Strand Beach' })
  await page.getByLabel('Date').fill(fourWeeksFromNow())
  await page.getByLabel('Starts').fill('09:00')
  await page.getByLabel('Ends').fill('11:30')
  await page.getByLabel('Volunteers needed (1 to 200)').fill('12')
  await page.getByLabel('Meeting point').fill('North end of the boardwalk')
  await page.getByRole('button', { name: 'Publish' }).click()

  // The app moves on to the new cleanup's own page
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Dune Grass Cleanup')
  await expect(page).toHaveTitle('Dune Grass Cleanup · Shoreline Crew HQ')
  await expect(page.getByText('North end of the boardwalk')).toBeVisible()

  // ...and the real API kept it: the list now has 18 cleanups
  await page.getByRole('link', { name: '← All cleanups' }).click()
  await expect(page.getByText(/^Found 18 cleanups/)).toBeVisible()
  await expect(page.getByRole('link', { name: 'Dune Grass Cleanup' })).toBeVisible()
})
