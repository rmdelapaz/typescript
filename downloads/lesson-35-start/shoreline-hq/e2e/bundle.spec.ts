import { expect, test } from '@playwright/test'
import { resetApi } from './helpers.ts'

test.beforeEach(async ({ request }) => {
  await resetApi(request)
})

test('a guest browsing the public pages stays within the JavaScript budget', async ({ page }) => {
  // Every JavaScript file the HQ sends during this test, with its size in bytes
  const scripts: Promise<{ file: string; bytes: number }>[] = []
  page.on('response', (response) => {
    const file = new URL(response.url()).pathname
    if (file.startsWith('/assets/') && file.endsWith('.js')) {
      scripts.push(response.body().then((body) => ({ file, bytes: body.length })))
    }
  })

  await page.goto('/')
  const nav = page.getByRole('navigation', { name: 'Main' })
  for (const [link, heading] of [
    ['Events', 'Cleanup events'],
    ['Sites', 'Beach sites'],
    ['Impact', 'Our impact'],
  ]) {
    await nav.getByRole('link', { name: link }).click()
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible()
  }

  const downloaded = await Promise.all(scripts)
  // Zod and React Hook Form (the "forms" chunk) are for organizers only
  expect(downloaded.filter((script) => script.file.startsWith('/assets/forms-'))).toEqual([])
  // The budget: about 423 kB when this test was written, so a big new import shows up here
  const total = downloaded.reduce((sum, script) => sum + script.bytes, 0)
  expect(total).toBeLessThan(440_000)
})
