// Debug handout (deliberately broken). Copy it into starter/src/ and run:
//   npx vitest run src/debug_outside_router.test.tsx
// Read the error from the top. Why does a list of links need a router? Fix the TEST (not SitesPage): render the
// page inside a memory router, like renderAt() in lab.test.tsx, with a route for /sites.
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { SitesPage } from './SitePages.tsx'

test('the sites page lists six links', () => {
  render(<SitesPage />)
  expect(screen.getAllByRole('link')).toHaveLength(6)
})
