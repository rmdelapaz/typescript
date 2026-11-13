import { mutationOptions, QueryClient, queryOptions } from '@tanstack/react-query'
import { getShifts, postShift } from './api.ts'
import type { NewShift } from './types.ts'

export const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })

/** C2: one site's shifts. Keys go from general to specific: every list of shifts starts with 'shifts' */
export function shiftsQuery(siteId: string) {
  return queryOptions({
    queryKey: ['shifts', siteId],
    queryFn: () => getShifts(siteId),
  })
}

/** C2: add a shift, then mark every list of shifts out of date */
export function addShiftMutation() {
  return mutationOptions({
    mutationFn: (shift: NewShift) => postShift(shift),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['shifts'] }),
  })
}
