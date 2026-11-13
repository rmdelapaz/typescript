# Lab 3.6: Styling and accessible components

Three small components from a beach-day screen, each with one thing Lesson 3.6 is about. Work in `starter/`:
`npm install` once, then after each change:

```
npm test             the three tests in src/lab.test.tsx (do not edit it)
npm run typecheck    tsc: Vitest runs the code without checking the types
npm run lint         oxlint, with the accessibility rules (jsx-a11y) switched on as in Shoreline Crew HQ
```

As handed out, all three tests fail, tsc reports two errors and the linter three warnings.

## Task 1: a badge from a CSS Module (`src/TideBadge.tsx`)

`TideBadge.module.css` is given: `.badge`, and one class per tide level (`.low`, `.rising`, `.high`). The
component still uses the old global class names, so nothing matches. Import the module, combine the two classes
with a template literal (`styles.badge`, then the level's class), and make `level` a union of the three words the
module has a class for. Done when Task 1 passes and the test file's `@ts-expect-error` line stops being reported.

## Task 2: a real button with a real name (`src/GearRow.tsx`)

A row in the gear list: an icon, the item's name and "Remove". It works with a mouse; run `npm run lint` and read
what it says. Make Remove a real `<button>`, decide what the icon's `alt` should be (the name is right next to
it), and give the button a name that makes sense out of context, `Remove gloves`, with `VisuallyHidden` (given).
Put the space outside the hidden text: `Remove{' '}<VisuallyHidden>...`. Done when Task 2 passes and
`npm run lint` says `Found 0 warnings and 0 errors.`

## Task 3: a width from data (`src/FillBar.tsx`)

The bar should be as wide as the share of spots taken (15 of 20 = `75%`). tsc already complains about the style
object: read the message, fix the property name, then compute the width. Done when Task 3 passes and
`npm run typecheck` prints nothing after its two `>` lines.

**Stretch:** add a `label` that screen readers read for the bar itself (is the text next to it enough?), and a
fourth level, `storm`, to the badge: what does tsc say until the CSS has a class for it? (Nothing: why not?)
