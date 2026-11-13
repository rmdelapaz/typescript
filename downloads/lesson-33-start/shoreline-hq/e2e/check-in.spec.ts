import { expect, test } from '@playwright/test'
import { resetApi, signIn } from './helpers.ts'

test.beforeEach(async ({ request }) => {
  await resetApi(request)
})

test('an organizer checks a volunteer in, and the mark survives a reload', async ({ page }) => {
  await signIn(page)
  await page.goto('/events/e17')
  // Today's cleanup opens on the check-in desk
  await expect(page.getByRole('tab', { name: 'Check-in desk' })).toHaveAttribute('aria-selected', 'true')

  const checkIn = page.getByRole('button', { name: 'Check in for Diego Herrera' })
  await checkIn.click()
  await expect(checkIn).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByText('Checked in: 1 of 7.')).toBeVisible()

  // A reload throws away everything the browser remembered: what comes back, the API saved
  await page.reload()
  await expect(page.getByRole('button', { name: 'Check in for Diego Herrera' })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  await expect(page.getByText('Checked in: 1 of 7.')).toBeVisible()
})
