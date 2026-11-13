import { mutationOptions, QueryClient, queryOptions } from '@tanstack/react-query'
import type { NewShift } from './types.ts'

export const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })

/** C2: one site's shifts. Keys go from general to specific: every list of shifts starts with 'shifts' */
export function shiftsQuery(siteId: string) {
  // TODO C2: the key ['shifts', siteId] and getShifts(siteId) from ./api.ts
  return queryOptions({
    queryKey: ['TODO C2', siteId],
    queryFn: (): Promise<unknown> => Promise.reject(new Error('TODO C2: shiftsQuery is not written yet')),
  })
}

/** C2: add a shift, then mark every list of shifts out of date */
export function addShiftMutation() {
  // TODO C2: send it with postShift(shift); on success, invalidate every query whose key starts with 'shifts'
  return mutationOptions({
    mutationFn: (shift: NewShift) => Promise.reject(new Error(`TODO C2: addShiftMutation (${shift.volunteer})`)),
  })
}
