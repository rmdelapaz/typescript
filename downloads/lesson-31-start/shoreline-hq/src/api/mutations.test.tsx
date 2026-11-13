import { QueryClientProvider, useMutation } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import type { ReactNode } from 'react'
import { describe, expect, it } from 'vitest'
import { organizer } from '../test/factories.ts'
import { API_URL, server } from '../test/server.ts'
import { saveSession } from './client.ts'
import { markMutation } from './mutations.ts'
import { eventsQuery, queryClient, rosterQuery } from './queries.ts'
import type { ApiErrorBody } from './types.ts'

// renderHook renders a Hook inside a tiny test component; the wrapper gives it the cache
function withCache({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

// Today's check-in desk at the Tide Pool Morning Cleanup, as Maya sees it
const roster = rosterQuery('e17', 'v01')

/** The status of one sign-up in the cached roster */
function cachedStatus(signupId: string) {
  return queryClient.getQueryData(roster.queryKey)?.find((entry) => entry.id === signupId)?.status
}

async function deskWithRoster() {
  saveSession(organizer)
  // Fill the cache the way the page's query would: a real request to the mock API
  const entries = await queryClient.query(roster)
  const first = entries.find((entry) => entry.status === 'confirmed')
  if (first === undefined) throw new Error('The sample data has no confirmed sign-up for e17')
  const { result } = renderHook(() => useMutation(markMutation('e17', 'v01')), { wrapper: withCache })
  return { result, signupId: first.id }
}

describe('markMutation', () => {
  it('saves a check-in and marks the lists as out of date', async () => {
    const { result, signupId } = await deskWithRoster()
    // A list of cleanups someone looked at earlier
    const { queryKey: listKey } = eventsQuery('perPage=50', 'v01')
    queryClient.setQueryData(listKey, {
      items: [],
      page: { page: 1, perPage: 50, total: 0, totalPages: 0 },
    })

    result.current.mutate({ signupId, mark: 'attended' })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(cachedStatus(signupId)).toBe('attended')
    // ['events'] was invalidated: the next time a list is shown, it is fetched again
    expect(queryClient.getQueryState(listKey)?.isInvalidated).toBe(true)
  })

  it('shows the mark at once, and takes it back when the API says no', async () => {
    const { result, signupId } = await deskWithRoster()
    // What the cache said while the request was on its way to the API
    let statusDuringRequest: string | undefined
    server.use(
      http.patch(`${API_URL}/api/signups/:signupId`, () => {
        statusDuringRequest = cachedStatus(signupId)
        const body: ApiErrorBody = { error: 'server_error', message: 'Something went wrong.' }
        return HttpResponse.json(body, { status: 500 })
      }),
    )

    result.current.mutate({ signupId, mark: 'attended' })

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(statusDuringRequest).toBe('attended')
    expect(cachedStatus(signupId)).toBe('confirmed')
  })
})
