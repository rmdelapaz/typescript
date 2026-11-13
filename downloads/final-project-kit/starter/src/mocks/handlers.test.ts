// The mock API keeps its rules: the app's tests and the demo rely on them (Milestone 1)
import { describe, expect, it } from 'vitest'
import { API_URL } from '../test/server.ts'

function post(body: unknown) {
  return fetch(`${API_URL}/api/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('the mock API', () => {
  it('lists the sample items', async () => {
    const response = await fetch(`${API_URL}/api/items`)
    expect(response.status).toBe(200)
    expect(await response.json()).toHaveLength(3)
  })

  it('answers 404 for an item that does not exist', async () => {
    const response = await fetch(`${API_URL}/api/items/no-such-item`)
    expect(response.status).toBe(404)
  })

  it('refuses a new item without a name, field by field', async () => {
    const response = await post({ name: '', notes: null })
    expect(response.status).toBe(400)
    expect(await response.json()).toMatchObject({
      error: 'validation_failed',
      fieldErrors: { name: ['Give it a name of at least 3 characters.'] },
    })
  })

  it('refuses a name that is already taken', async () => {
    const response = await post({ name: 'first example item', notes: null })
    expect(response.status).toBe(400)
    expect(await response.json()).toMatchObject({
      fieldErrors: { name: ['An item with this name already exists.'] },
    })
  })

  it('saves a new item and lists it', async () => {
    const response = await post({ name: 'A brand new item', notes: null })
    expect(response.status).toBe(201)
    expect(await response.json()).toMatchObject({ name: 'A brand new item', notes: null, status: 'open' })
    const list = await fetch(`${API_URL}/api/items`)
    expect(await list.json()).toHaveLength(4)
  })
})
