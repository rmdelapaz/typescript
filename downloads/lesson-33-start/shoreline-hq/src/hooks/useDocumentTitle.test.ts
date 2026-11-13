import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useDocumentTitle } from './useDocumentTitle.ts'

describe('useDocumentTitle', () => {
  it('names the tab while the component is shown, then puts the old name back', () => {
    document.title = 'Shoreline Crew HQ'
    // renderHook calls the Hook inside a small test component; props can change later
    const { rerender, unmount } = renderHook(({ title }) => useDocumentTitle(title), {
      initialProps: { title: 'Beach sites' },
    })
    expect(document.title).toBe('Beach sites · Shoreline Crew HQ')

    rerender({ title: 'Cleanup events' })
    expect(document.title).toBe('Cleanup events · Shoreline Crew HQ')

    unmount()
    expect(document.title).toBe('Shoreline Crew HQ')
  })
})
