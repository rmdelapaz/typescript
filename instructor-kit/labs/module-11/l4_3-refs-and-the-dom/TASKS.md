# Lab 4.3: refs to elements

New practice on Lesson 4.3's ideas, outside the course app (the lesson's own project adds the `/` shortcut, the
focus after Clear filters and the "Cancel this cleanup?" dialog to the HQ). Testing Library clicks and types like a
person, in a browser-like page (jsdom), so the tests can ask where the focus is.

**Setup (once):** a terminal in `labs/module-11/l4_3-refs-and-the-dom/starter`, then `npm install`.
**Run:** `npm test` (as shipped, all four tests fail) and `npm run typecheck` (as shipped, errors for Tasks 2 and 3).

## Task 1: focus and select (`src/CheckInCode.tsx`)

The Select the code button should put the focus in the read-only field with the whole code selected, ready to copy.
That is something you DO to an element (`focus()`, `select()`), so it needs a DOM ref: `useRef<…>(null)` typed for
the element it is attached to, and `?.` because `current` may be `null`. Done when the Task 1 test passes.

## Task 2: a ref as a prop, and focus that does not get lost (`src/SearchField.tsx`)

**2a.** In React 19, `ref` is an ordinary prop: declare `ref?: Ref<HTMLInputElement>` in `SearchField`'s props and
put it on the input (the component decides which element a parent may reach). The test file's last lines pass an
input's ref (must fit) and a div's ref (must NOT fit: `@ts-expect-error`).

**2b.** In `FilterBar`, Clear empties the search and disappears. A focused button that disappears drops the focus
to the page's body: in the click handler, move the focus to the search box (through the ref). Done when both Task 2
tests pass.

## Task 3: callback refs in a Map (`src/CrewChecklist.tsx`)

The starter's `ref={(el) => (boxes.current[i] = el)}` comes from an older tutorial; React 19's types reject it
(read the message: a callback ref may return nothing or a cleanup function). Keep the checkboxes in a
`Map<string, HTMLInputElement>` by name instead: a callback ref with braces that adds the element, and a cleanup that
deletes it. Then `jump()` focuses the first checkbox that is not checked. Done when `npm test` ends with
`Tests  4 passed (4)` and `npm run typecheck` prints nothing after its two `>` lines.

**Stretch:** make Escape inside the search box clear it too, with the same focus rule (an `onKeyDown` prop on the
input, with React's `KeyboardEvent<HTMLInputElement>`: not the browser's `KeyboardEvent`).
