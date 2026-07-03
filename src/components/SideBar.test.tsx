import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import SideBar from './SideBar'

describe('SideBar', () => {
  it('renders heading and action items', () => {
    render(
      <SideBar
        isSaving={false}
        canUndo={false}
        canRedo={false}
        theme="light"
        locale="en"
        onUndo={() => {}}
        onRedo={() => {}}
        onToggleTheme={() => {}}
        onLocaleChange={() => {}}
        onReset={() => {}}
      />,
    )

    expect(
      screen.getByRole('heading', { name: /free cv editor/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /undo/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /redo/i })).toBeDisabled()
    // expect(screen.getByText(/edit sections/i)).toBeInTheDocument()
    // expect(screen.getByText(/reorder blocks/i)).toBeInTheDocument()
    // expect(screen.getByText(/print cv/i)).toBeInTheDocument()
  })
})
