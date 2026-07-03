import { useState } from 'react'

import type { CVData } from '../App'

interface PersonalSectionProps {
  personal: CVData['personal']
  onUpdate: (field: 'phone' | 'email', value: string) => void
}

const PersonalSection = ({ personal, onUpdate }: PersonalSectionProps) => {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <>
      <h2>Personal</h2>
      {isEditing ? (
        <section className="personal-edit">
          <div className="edit-group">
            <label htmlFor="personal-phone">Phone</label>
            <input
              id="personal-phone"
              type="text"
              value={personal.phone}
              onChange={(event) => onUpdate('phone', event.target.value)}
              placeholder="Phone number"
            />
          </div>
          <div className="edit-group">
            <label htmlFor="personal-email">Email</label>
            <input
              id="personal-email"
              type="email"
              value={personal.email}
              onChange={(event) => onUpdate('email', event.target.value)}
              placeholder="Email address"
            />
          </div>
          <button onClick={() => setIsEditing(false)} className="edit-done">
            Done
          </button>
        </section>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              setIsEditing(true)
            }
          }}
          className="personal-display"
          aria-label="Click to edit personal information"
        >
          <ul>
            <li>{personal.phone}</li>
            <li>{personal.email}</li>
          </ul>
        </button>
      )}
    </>
  )
}

export default PersonalSection