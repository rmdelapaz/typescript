import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ErrorSummary } from './ErrorSummary.tsx'

const twoProblems = [
  { id: 'bags', message: 'Bags must be a whole number from 0 to 500.' },
  { id: 'items.1.count', message: 'Row 2: Count must be a whole number from 0 to 100000.' },
]

describe('ErrorSummary', () => {
  it('names the number of problems and takes the focus', () => {
    render(<ErrorSummary errors={twoProblems} />)

    const summary = screen.getByRole('region', { name: 'Fix these 2 before saving' })
    expect(summary).toHaveFocus()
  })

  it('links each problem to its field', () => {
    render(<ErrorSummary errors={twoProblems} />)

    const link = screen.getByRole('link', { name: 'Row 2: Count must be a whole number from 0 to 100000.' })
    expect(link).toHaveAttribute('href', '#items.1.count')
    expect(screen.getAllByRole('link')).toHaveLength(2)
  })

  it('says "this" for a single problem', () => {
    render(<ErrorSummary errors={twoProblems.slice(0, 1)} />)

    expect(screen.getByRole('heading', { name: 'Fix this before saving' })).toBeInTheDocument()
  })

  it('shows nothing when there is nothing to fix', () => {
    const { container } = render(<ErrorSummary errors={[]} />)

    expect(container).toBeEmptyDOMElement()
    expect(screen.queryByRole('region')).not.toBeInTheDocument()
  })
})
