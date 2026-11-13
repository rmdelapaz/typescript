// Shared steps for the end-to-end tests: they run in Node and drive a real browser
import AxeBuilder from '@axe-core/playwright'
import { expect, type APIRequestContext, type Page } from '@playwright/test'

/** Where shoreline-api listens while the end-to-end tests run */
export const API_URL = 'http://localhost:4000'

/** Put the API's sample data back, so every test starts on the same beach */
export async function resetApi(request: APIRequestContext): Promise<void> {
  const response = await request.post(`${API_URL}/api/_reset`)
  expect(response.ok()).toBe(true)
}

/** Sign in through the real form, the way an organizer does */
export async function signIn(page: Page, email = 'maya.okafor@example.com'): Promise<void> {
  await page.goto('/sign-in')
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Password').fill('shoreline-demo')
  await page.getByRole('button', { name: 'Sign in' }).click()
  await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible()
}

/** Run axe on the page as it is now and fail with one readable line per problem */
export async function expectNoAxeViolations(page: Page): Promise<void> {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze()
  const problems = results.violations.map(
    (violation) => `${violation.id}: ${violation.help} (${violation.nodes.length})`,
  )
  expect(problems).toEqual([])
}
