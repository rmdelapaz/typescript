import { expect, test } from '@playwright/test'
import { resetApi } from './helpers.ts'

test.beforeEach(async ({ request }) => {
  await resetApi(request)
})

test('a guest finds a cleanup by searching', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Events' }).click()
  await expect(page.getByRole('heading', { level: 1, name: 'Cleanup events' })).toBeVisible()

  await page.getByLabel('Search cleanups').fill('pelican')
  await expect(page.getByText('Found 3 cleanups: 1 coming up, 2 in the log.')).toBeVisible()
  await expect(page).toHaveURL(/\?q=pelican$/)

  await page.getByRole('link', { name: 'Pelican Point Beach Sweep' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Pelican Point Beach Sweep')
  await expect(page.getByRole('heading', { name: 'Where to meet' })).toBeVisible()
})

test('the beach sites show their real pictures', async ({ page }) => {
  await page.goto('/sites')
  const pictures = page.getByRole('main').getByRole('img')
  await expect(pictures).toHaveCount(6)
  // A real browser downloads and decodes each picture: naturalWidth is its real width in pixels
  for (const picture of await pictures.all()) {
    await picture.scrollIntoViewIfNeeded()
    await expect(picture).toHaveJSProperty('naturalWidth', 1200)
  }
})
