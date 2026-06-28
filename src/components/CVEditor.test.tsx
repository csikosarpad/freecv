import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'

import CVEditor from './CVEditor'

describe('CVEditor', () => {
  it('renders base CV content', () => {
    render(<CVEditor />)

    expect(screen.getByRole('heading', { name: /arpad csikos/i })).toBeInTheDocument()
    expect(screen.getByText(/personal/i)).toBeInTheDocument()
    expect(screen.getByText(/skills/i)).toBeInTheDocument()
    expect(screen.getByDisplayValue('Summary')).toBeInTheDocument()
  })

  it('reorders sections with drag and drop', () => {
    render(<CVEditor />)

    const sourceCard = screen.getByTestId('section-card-projects')
    const targetZone = screen.getByTestId('dropzone-summary')

    fireEvent.dragStart(sourceCard)
    fireEvent.dragOver(targetZone)
    fireEvent.drop(targetZone)

    const column = screen.getByRole('region', { name: /cv sections/i })
    const sectionCards = within(column).getAllByTestId(/section-card-/)
    const firstTitle = within(sectionCards[0]).getByDisplayValue(/projects/i)

    expect(firstTitle).toBeInTheDocument()
  })
})
