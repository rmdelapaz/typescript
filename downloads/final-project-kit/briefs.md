# Final Project Client Briefs

React + TypeScript: Build a Modern Web App, Lesson 11.1. Every client, person and business here is
fictional; use `example.com` addresses in your sample data. Each brief is sized for the course's stack:
one React + TypeScript single-page app built from the starter, a mock API that runs in the browser for
the demo (or a real API you can describe and cost honestly), and about 25 hours of work. Read the
"Notes" before you choose: they point at the decisions that make each brief interesting, and most of
them are type decisions.

## 1. Cobalt Cycle Repairs (bike workshop)

**Client:** a two-mechanic bike repair shop. Bikes come in at the counter, wait on a rack, and go home
when they are fixed. Today it all lives on paper tags and a whiteboard.

**People who use it:** the counter (takes a bike in, tells customers when it will be ready); the
mechanics (work through the rack, add parts and labor); the owner (wants to know what is overdue).

**Must-haves**
- Take a bike in: the customer, the bike (kind and description) and the problem in their words
- A ticket moves through received, diagnosed, waiting for parts, ready and collected, one step at a time
- A ticket's parts list (part, quantity, price) and labor, with the total worked out from them
- The rack: tickets by status, searchable by customer name, kept in the address so the counter can
  bookmark "ready to collect"
- "Overdue" when a promised day has passed and the bike isn't ready

**They already have:** about 30 open and recent tickets, 20 customers, a price list of common parts.

**Notes:** money in cents (`Cents = number`), never dollars with decimals. The status order is a rule
the server must enforce (a skipped step is a `409`), and a `Record<TicketStatus, …>` table keeps the
labels and the allowed next steps complete. The parts list is a field array (Lesson 8.2). "Overdue" and
the total are computed, never stored. This is the worked example in the lesson.

**Out of scope:** text messages to customers, payments, stock control for parts.

## 2. Larkspur Tool Library (community lending)

**Client:** a volunteer-run library that lends drills, ladders, tile cutters and garden tools to
members of one neighborhood.

**People who use it:** members (find a tool, ask to borrow it for some days); librarians (hand tools out,
take them back, note their condition).

**Must-haves**
- The catalog: tools with category, condition (good, worn, needs repair) and a picture with alt text
- Search and filter by category and "available now", kept in the address
- A borrow request: pickup day and return day, at most 7 days, return after pickup
- Librarians check tools out and in, and record the condition on return
- A member's loans, with "due back" and overdue ones first

**They already have:** about 60 tools with photos, 40 members, a paper loan book.

**Notes:** "available" is derived from the loans, never a stored flag that can disagree with them. The
date rules belong in the schema, so the form and the mock API check the same thing; two requests for
the same tool on overlapping days is a rule only the server can see (`409`). Two roles: the HQ's
sign-in pattern (Lessons 5.2 and 6.3) with sample accounts in the demo banner.

**Out of scope:** deposits and fines with real money, reminders by email.

## 3. Quillmark Studio Board (project board)

**Client:** a six-person design studio that wants one board for its client projects instead of three
spreadsheets.

**People who use it:** designers (see their tasks, move them along); the studio lead (plans projects,
assigns tasks, watches deadlines).

**Must-haves**
- Projects, each with a board of columns: to do, in progress, in review, done
- Tasks with an assignee, a due day and a priority (low, normal, urgent)
- Move a task between columns with buttons that work from the keyboard (drag and drop is optional and
  never the only way)
- Filter a board by assignee and priority in the address ("my urgent tasks")
- A project page with progress worked out from its tasks

**They already have:** 5 projects, about 80 tasks, 6 people.

**Notes:** moving a task should feel instant: an optimistic update with a rollback when the API refuses
(Lesson 7.2), and a message that says what happened. Is the order of tasks in a column client state or
server data? Write the answer in the state placement table. A `useReducer` with a union of actions fits
the task editor (Lesson 5.1).

**Out of scope:** live updates while two people edit at once, file attachments, comments.

## 4. Brightleaf Community Pantry (food bank)

**Client:** a food pantry run from a community hall two days a week, with a small team of coordinators
and a rota of volunteers.

**People who use it:** volunteers at the intake table (log donations); coordinators (watch stock and
best-before dates, open pickup slots); households (book a pickup slot).

**Must-haves**
- Stock: items with category, quantity, unit (cans, kg, packs) and best-before date
- An intake form for one donation with several lines (item, quantity, unit, best-before)
- "Use soon" for items within 7 days of their date, worked out when the page is shown
- Pickup slots with a capacity; households book one with a name and a phone number
- The coordinators' view of today's slots and who booked them

**They already have:** about 120 stock items, a weekly slot plan, 15 volunteers.

**Notes:** the intake form is a field array, and a long one: one page or steps? Lesson 8.2's table
decides, and your worksheet says why. A full slot is a server-only rule (`409`). Households' phone
numbers are personal data: the demo uses obviously fake ones, and the worksheet says who may see them.

**Out of scope:** household eligibility checks, deliveries, printing labels.

## 5. Kestrel Sailing Club (conditions dashboard)

**Client:** a small sailing club with its own weather station on the pier. Members check the conditions
before they rig a boat, and race officers decide whether racing goes ahead.

**People who use it:** members (is it worth coming down?); race officers (post the race calendar and the
"racing on / off" decision).

**Must-haves**
- The latest reading: wind speed, gusts, direction, air temperature, and when it was measured
- A chart of the last 24 hours (lazy-loaded, Lesson 10.1)
- Units each member prefers (knots or mph, °C or °F), remembered in their browser
- "Racing allowed?" worked out from the club's wind limits, with the reason
- The race calendar, and a sign-up form for a race

**They already have:** the station exports a reading every 10 minutes as JSON; a year of race calendars.

**Notes:** the readings come from outside your code: `unknown` until a guard or a schema has checked them
(Lesson 2.4), and a reading can be old, so show its age. Units are client state (Zustand with
`persist`, Lesson 7.3), not server data. If you'd rather use a public weather API, choose one that needs
no key, read its terms (many free plans are for non-commercial use only) and never put a key in a
`VITE_` variable: anything there is public.

**Out of scope:** forecasts you compute yourself, push alerts, live wind on a map.

## 6. Saltmarsh Bakery (weekly preorders)

**Client:** a neighborhood bakery that bakes to order on Saturdays and wants customers to preorder during
the week instead of phoning.

**People who use it:** customers (pick from this week's menu, choose a pickup time); bakers (see the
orders per pickup slot and mark them baked and collected).

**Must-haves**
- This week's menu: items with price, allergens, and "sold out" when the day's batch is gone
- A basket that survives a reload, with quantities and a total
- Checkout: a name, a phone number and a pickup slot (each slot has a capacity); pay at pickup
- The bakers' view: orders per slot, each new, baked or collected
- An order page the customer can bookmark to see its status

**They already have:** a menu of about 25 items, 6 pickup slots per Saturday.

**Notes:** the basket is client state (persisted, Lesson 7.3) until checkout; the order is server data
after it. The total in the basket is only a preview: the API works out the real price and refuses an
order whose items sold out meanwhile (`409`), so the form must show that clearly. Money in cents.

**Out of scope:** online payment, accounts, delivery.

## 7. Marigold Reading Circle (reading challenge)

**Client:** a public library's adult reading club that runs a yearly challenge: read twelve books, log
each one, and see the circle's progress.

**People who use it:** members (log a book, rate it, write a few lines); the club host (adds featured
books, can hide a review that breaks the rules).

**Must-haves**
- Books with title, author, genre and page count; search and filter by genre in the address
- A reading log: book, finished day, rating 1 to 5, a short review (optional)
- Each member's progress toward 12 books, and the circle's total pages
- A book page with its average rating and the visible reviews
- The host can hide or show a review

**They already have:** a list of about 200 books, 35 members, last year's paper logs.

**Notes:** progress, totals and averages are derived: compute them, don't store them (Lesson 3.4). A
rating is a union `1 | 2 | 3 | 4 | 5`, not a number any form could send. A hidden review must not reach
members at all: the mock API leaves it out for them, so it is not just hidden by the page.

**Out of scope:** comments and replies, following other members, book covers from a third-party service.

## 8. Your own idea

Welcome, with the same size rules:

- 2 to 4 domain types (one main kind of thing and at least one related to it), including at least one
  union of literal types (a status, a category, a role)
- 5 to 9 routes, including a detail page with a parameter, a not-found page and at least one list whose
  search or filter lives in the address
- at least one form with a schema and a rule only the server can check, and at least one change saved
  through a mutation
- shown to the world as a demo build with its mock API on a free static host, or with a real API whose
  hosting and monthly cost you have written down; no secret ever in a `VITE_` variable
- no real payments, no passwords you store yourself, no live chat or notifications: cut those features,
  they need systems beyond this course. Demo sign-in with sample accounts, as in the HQ, is fine.
- a realistic client, written as a brief like the ones above: who it is for, who uses it, the
  must-haves, what data exists, and what is out of scope
