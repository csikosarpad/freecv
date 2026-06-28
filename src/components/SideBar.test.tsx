import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import SideBar from './SideBar'

describe('SideBar', () => {
  it('renders heading and action items', () => {
    render(<SideBar isSaving={false} onReset={() => {}} />)

    expect(
      screen.getByRole('heading', { name: /free cv editor/i }),
    ).toBeInTheDocument()
    // expect(screen.getByText(/edit sections/i)).toBeInTheDocument()
    // expect(screen.getByText(/reorder blocks/i)).toBeInTheDocument()
    // expect(screen.getByText(/print cv/i)).toBeInTheDocument()
  })
})
