import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import App from './App'

describe('App reset flow', () => {
  it('removes only the app cv-data entry from localStorage', async () => {
    const user = userEvent.setup()

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
})