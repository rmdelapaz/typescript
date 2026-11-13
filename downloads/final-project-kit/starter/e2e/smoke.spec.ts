// Your three "would hate to break" journeys go here (Lesson 9.3). These prove the starter works.
import { expect, test } from '@playwright/test'
import { expectNoAxeViolations } from './helpers.ts'

test('a visitor adds an item and finds it again', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: 'First example item' })).toBeVisible()
  await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'New item' }).click()
  await page.getByLabel('Name').fill('Sunday market stall')
  await page.getByRole('button', { name: 'Save item' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Sunday market stall')
  await page.getByRole('link', { name: '← All items' }).click()
  await expect(page.getByRole('link', { name: 'Sunday market stall' })).toBeVisible()
})

test('a deep link works, and an unknown address says so', async ({ page }) => {
  await page.goto('/items/i3')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('An awkward one')
  await page.goto('/no-such-page')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found')
})

for (const colorScheme of ['light', 'dark'] as const) {
  test(`the list and the form pass axe (${colorScheme})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme })
    await page.goto('/')
    await expect(page.getByRole('link', { name: 'First example item' })).toBeVisible()
    await expectNoAxeViolations(page)
    await page.goto('/items/new')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('New item')
    await expectNoAxeViolations(page)
  })
}
