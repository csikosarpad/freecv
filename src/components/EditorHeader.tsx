import { useState } from 'react'

import type { CVData } from '../App'

interface EditorHeaderProps {
  header: CVData['header']
  onUpdate: (field: 'name' | 'title', value: string) => void
}

const EditorHeader = ({ header, onUpdate }: EditorHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <header>
      {isEditing ? (
        <section className="header-edit">
          <div className="edit-group">
            <label htmlFor="header-name">Name</label>
            <input
              id="header-name"
              type="text"
              value={header.name}
              onChange={(event) => onUpdate('name', event.target.value)}
              placeholder="Full Name"
            />
          </div>
          <div className="edit-group">
            <label htmlFor="header-title">Title</label>
            <input
              id="header-title"
              type="text"
              value={header.title}
              onChange={(event) => onUpdate('title', event.target.value)}
              placeholder="Job Title"
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
          className="header-display"
          aria-label="Click to edit header information"
        >
          <h2>{header.name}</h2>
          <h3>{header.title}</h3>
        </button>
      )}
    </header>
  )
}

export default EditorHeader