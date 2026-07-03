import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import App from './App'

describe('App reset flow', () => {
  it('removes only the app cv-data entry from localStorage', async () => {
    const user = userEvent.setup()

    localStorage.clear()

    localStorage.setItem(
      'cv-data',
      JSON.stringify({
        header: { name: 'Changed Name', title: 'Changed Title' },
        personal: { phone: '111', email: 'changed@example.com' },
        skills: [],
        sections: [],
      }),
    )
    localStorage.setItem('unrelated-key', 'keep-me')

    render(<App />)

    expect(screen.getByRole('heading', { name: /changed name/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /reset all/i }))

    const dialog = screen.getByRole('alertdialog')
    await user.click(within(dialog).getByRole('button', { name: /reset all/i }))

    expect(screen.getByRole('heading', { name: /arpad csikos/i })).toBeInTheDocument()
    expect(localStorage.getItem('cv-data')).toBeNull()
    expect(localStorage.getItem('unrelated-key')).toBe('keep-me')
  })

  it('undoes and redoes CV edits from the sidebar controls', async () => {
    const user = userEvent.setup()

    localStorage.clear()

    render(<App />)

    await user.click(screen.getByRole('button', { name: /click to edit header information/i }))

    const nameInput = screen.getByLabelText(/^name$/i)
    await user.clear(nameInput)
    await user.type(nameInput, 'Updated Name')

    expect(screen.getByDisplayValue('Updated Name')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /done/i }))
    await user.click(screen.getByRole('button', { name: /undo/i }))

    expect(screen.getByRole('heading', { name: /arpad csikos/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /redo/i }))

    expect(screen.getByRole('heading', { name: /updated name/i })).toBeInTheDocument()
  })

  it('persists theme and locale preferences from the sidebar', async () => {
    const user = userEvent.setup()

    localStorage.clear()

    render(<App />)

    await user.click(screen.getByRole('button', { name: /dark mode/i }))
    expect(document.body.dataset.theme).toBe('dark')

    await user.selectOptions(screen.getByRole('combobox'), 'hu')

    expect(screen.getByRole('button', { name: /vissza/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /összes törlése/i })).toBeInTheDocument()
    await waitFor(() => {
      expect(localStorage.getItem('cv-theme')).toContain('dark')
      expect(localStorage.getItem('cv-locale')).toContain('hu')
    })
  })
})