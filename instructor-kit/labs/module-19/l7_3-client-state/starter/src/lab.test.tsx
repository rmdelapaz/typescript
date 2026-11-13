// Tests (do not edit): npm test
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Profiler } from 'react'
import { afterEach, expect, test } from 'vitest'
import { PinButton } from './PinButton.tsx'
import { usePinStore } from './pinStore.ts'
import { siteIds } from './sites.ts'

// The store lives in a module, outside React: put it back the way the app starts after every test
afterEach(() => {
  usePinStore.setState(usePinStore.getInitialState())
  localStorage.clear()
})

test('Task 1: togglePin adds at the end and takes out again', () => {
  const { togglePin } = usePinStore.getState()
  togglePin('north-jetty')
  togglePin('pelican-point')
  expect(usePinStore.getState().pinned).toEqual(['north-jetty', 'pelican-point'])
  togglePin('north-jetty')
  expect(usePinStore.getState().pinned).toEqual(['pelican-point'])
})

test('Task 1: the old array is never changed', () => {
  const before = usePinStore.getState().pinned
  usePinStore.getState().togglePin('otter-creek')
  expect(before).toEqual([])
  expect(usePinStore.getState().pinned).not.toBe(before)
})

test('Task 2: pins are saved in localStorage under shoreline-pins', () => {
  usePinStore.getState().togglePin('long-strand')
  expect(localStorage.getItem('shoreline-pins')).toBe('{"state":{"pinned":["long-strand"]},"version":0}')
})

test('Task 2: what comes back is checked: real site ids, once each', async () => {
  localStorage.setItem('shoreline-pins', '{"state":{"pinned":["north-jetty","seal-rock",42,"north-jetty"]},"version":0}')
  await usePinStore.persist.rehydrate()
  expect(usePinStore.getState().pinned).toEqual(['north-jetty'])
})

test('Task 2: nonsense in localStorage falls back to no pins', async () => {
  localStorage.setItem('shoreline-pins', '{"state":{"pinned":"all of them"},"version":0}')
  await usePinStore.persist.rehydrate()
  expect(usePinStore.getState().pinned).toEqual([])
})

test('Task 3: aria-pressed follows the store', async () => {
  const user = userEvent.setup()
  render(<PinButton siteId="north-jetty" />)
  const button = screen.getByRole('button', { name: 'Pin North Jetty' })
  expect(button).toHaveAttribute('aria-pressed', 'false')
  await user.click(button)
  expect(button).toHaveAttribute('aria-pressed', 'true')
})

test('Task 3: one pin re-renders one button, not six', async () => {
  const user = userEvent.setup()
  const updates: Record<string, number> = {}
  render(
    <>
      {siteIds.map((id) => (
        <Profiler key={id} id={id} onRender={(name, phase) => {
          if (phase === 'update') updates[name] = (updates[name] ?? 0) + 1
        }}>
          <PinButton siteId={id} />
        </Profiler>
      ))}
    </>,
  )
  await user.click(screen.getByRole('button', { name: 'Pin North Jetty' }))
  expect(updates).toEqual({ 'north-jetty': 1 })
})
