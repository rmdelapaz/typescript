import { expect, test } from '@playwright/test'

test('a visitor finds a beach by searching', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1, name: 'Beach sites' })).toBeVisible()
  await expect(page.getByRole('status')).toHaveText('Found 6 sites.')

  await page.getByLabel('Search sites').fill('cove')
  // A web-first assertion keeps checking through the search's 300 ms pause
  await expect(page.getByRole('status')).toHaveText('Found 2 sites.')
  await expect(page.getByRole('listitem')).toHaveText([/^Driftwood Cove/, /^Seal Rock Cove/])
  await expect(page).toHaveURL(/\?q=cove$/)
})

test('the search survives a reload', async ({ page }) => {
  await page.goto('/?q=harbor')
  await expect(page.getByLabel('Search sites')).toHaveValue('harbor')
  await expect(page.getByRole('status')).toHaveText('Found 2 sites.')
  await page.reload()
  await expect(page.getByRole('listitem')).toHaveCount(2)
})

test('Clear the search shows every site and puts the focus back', async ({ page }) => {
  await page.goto('/?q=jetty')
  const clear = page.getByRole('button', { name: 'Clear the search' })
  await expect(clear).toBeVisible()
  await clear.click()
  await expect(page.getByRole('status')).toHaveText('Found 6 sites.')
  await expect(page.getByLabel('Search sites')).toBeFocused()
})
