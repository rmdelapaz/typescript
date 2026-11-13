import AxeBuilder from '@axe-core/playwright'
import { expect, type Page } from '@playwright/test'

/** Run axe (WCAG 2.0 to 2.2, A and AA) on the page as it is now; fail with one readable line per problem */
export async function expectNoAxeViolations(page: Page): Promise<void> {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze()
  const problems = results.violations.map(
    (violation) => `${violation.id}: ${violation.help} (${violation.nodes.length})`,
  )
  expect(problems).toEqual([])
}
