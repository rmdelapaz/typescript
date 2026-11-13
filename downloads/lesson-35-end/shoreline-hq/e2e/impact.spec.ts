import { readFile } from 'node:fs/promises'
import { expect, test } from '@playwright/test'
import { resetApi, signIn } from './helpers.ts'

test.beforeEach(async ({ request }) => {
  await resetApi(request)
})

test('an organizer reports today\'s impact with a photo and sees the new totals', async ({ page }) => {
  await signIn(page)
  await page.goto('/impact')
  await expect(page.getByRole('definition').filter({ hasText: 'kg' })).toHaveText('176.2 kg')

  await page.goto('/events/e17')
  await page.getByRole('link', { name: 'Report the impact' }).click()
  await page.getByLabel('Volunteers who came').fill('11')
  await page.getByLabel('Bags filled').fill('6')
  await page.getByLabel('Weight (kg)').fill('18.5')
  await page.getByLabel('Pieces, row 1').fill('40')

  // A real file from disk, sent to the real API as multipart form data
  await page.getByLabel(/^Add a photo/).setInputFiles('e2e/files/bags-at-the-stairs.jpg')
  const preview = page.getByRole('listitem').filter({ hasText: 'bags-at-the-stairs.jpg' }).locator('img')
  // The API stored the bytes and serves them back: the browser decodes an 800 x 600 picture
  await expect(preview).toHaveJSProperty('naturalWidth', 800)

  await page.getByRole('button', { name: 'Save the report' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Tide Pool Morning Cleanup')
  await page.getByRole('tab', { name: 'Impact' }).click()
  await expect(page.getByText('Volunteers: 11. Bags: 6. Weight: 18.5 kg.')).toBeVisible()
  await expect(page.getByText('Photos uploaded with the report: 1.')).toBeVisible()

  await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Impact' }).click()
  await expect(page.getByRole('definition').filter({ hasText: 'kg' })).toHaveText('194.7 kg')
})

test('the impact page hands out its monthly totals as a CSV file', async ({ page }) => {
  await page.goto('/impact')
  const downloading = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Download as CSV' }).click()
  const download = await downloading
  expect(download.suggestedFilename()).toBe('shoreline-impact-by-month.csv')

  // Playwright saved the file: read it like a spreadsheet would
  const [heading, ...months] = (await readFile(await download.path(), 'utf8')).trimEnd().split('\r\n')
  expect(heading).toBe('Month,Cleanups,Weight (kg)')
  expect(months.length).toBeGreaterThan(0)
  for (const month of months) expect(month).toMatch(/^\d{4}-\d{2},\d+,[\d.]+$/)
})
