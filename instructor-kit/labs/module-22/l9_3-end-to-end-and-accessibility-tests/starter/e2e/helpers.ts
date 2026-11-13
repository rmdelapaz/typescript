import type { Page } from '@playwright/test'

/** Run axe (WCAG 2.0 to 2.2, A and AA) on the page as it is now; fail with one readable line per problem */
export async function expectNoAxeViolations(page: Page): Promise<void> {
  // TODO 2: new AxeBuilder({ page }) from '@axe-core/playwright', .withTags([...]).analyze(), then each
  // violation as 'id: help (number of elements)' and expect that list toEqual([])
  throw new Error(`TODO 2: expectNoAxeViolations is not written yet (${page.url()})`)
}
