import { afterAll, afterEach, beforeAll, beforeEach, describe, it } from 'vitest'
import { api, server } from './test/server.ts'

// Given (do not change): the mock API starts once, is fresh for every test, and fails on unanswered requests
beforeAll(() => server.listen({ onUnhandledFrame: 'error' }))
beforeEach(() => api.reset())
afterEach(() => {
  server.resetHandlers()
  server.events.removeAllListeners()
})
afterAll(() => server.close())

// Task 1: a renderForm() helper (userEvent.setup() BEFORE render, then render
// <SignUpForm apiUrl={API_URL} eventId="e08" />) and the tests that click, type and wait.
describe('SignUpForm', () => {
  it('TODO 1: the spots, a sign-up, the keyboard', () => {
    throw new Error('TODO 1: write the tests that type, click and wait (TASKS.md, Task 1)')
  })
})

// Task 2: what must happen, and what must NOT, when something is wrong.
describe('SignUpForm when something is wrong', () => {
  it('TODO 2: no name, a full cleanup, a failing server', () => {
    throw new Error('TODO 2: write the tests for the three problems (TASKS.md, Task 2)')
  })
})
