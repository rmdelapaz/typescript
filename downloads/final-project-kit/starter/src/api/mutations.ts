// Changes (Lesson 7.2): one mutationOptions factory per change, with the keys it makes out of date.
import { mutationOptions } from '@tanstack/react-query'
import { postItem } from './client.ts'
import { queryClient } from './queries.ts'
import type { NewItem } from './types.ts'

/** Create an item, then refresh every list that may show it */
export function createItemMutation() {
  return mutationOptions({
    mutationFn: (item: NewItem) => postItem(item),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['items'] }),
  })
}
