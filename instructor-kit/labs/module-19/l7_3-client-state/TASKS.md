# Lab 7.3: pinned sites

New practice on Lesson 7.3: organizers want to pin the beach sites they look after, in this browser only. That is
client state (the API never hears about it), it is read in many places, and it should survive a reload: a small
Zustand store. `src/sites.ts` (the six real site ids and names, a type predicate) is given.

**Setup (once):** a terminal in `labs/module-19/l7_3-client-state/starter`, then `npm install`.
**Run:** `npm test` and `npm run typecheck`. As shipped, all 7 tests fail, and the type check stops at the tests'
`usePinStore.persist` (there is no persist yet: Task 2).

## Task 1: an action that makes a new array (`pinStore.ts`)

`togglePin(siteId)` adds the site at the end, or takes it out when it is already pinned. Use `set` with a function
of the state, and build a NEW array (`filter`, or a spread): never `push` into the old one. The second test keeps
the old array and checks that it did not change.

## Task 2: keep the pins, check what comes back

Wrap the creator in `persist` with the name `shoreline-pins` (remember `create<PinState>()(...)`, with the extra
parentheses). Then a `merge`: what localStorage gives back is `unknown` (an old version, someone in DevTools). Keep
only real site ids (`isSiteId`), each once; anything that is not a list falls back to no pins.

## Task 3: re-render only the button that changed (`PinButton.tsx`)

`PinButton` reads the whole store, so pinning one site re-renders all six buttons (the last test counts them with
React's `Profiler`). Give it two selectors: a boolean (`state.pinned.includes(siteId)`) and the action.

Done when `npm test` says `Tests  7 passed (7)` and `npm run typecheck` prints nothing after its two `>` lines.
**Stretch:** a `PinnedCount` component that shows `N pinned`: which selector keeps it from re-rendering when a pin
is moved, and why would `(state) => ({ count: state.pinned.length })` be a mistake in Zustand 5?
