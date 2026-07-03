import { useState } from 'react'

import type { CVData } from '../App'
import { useI18n } from '../i18n-context'

interface EditorHeaderProps {
  header: CVData['header']
  onUpdate: (field: 'name' | 'title', value: string) => void
}

const EditorHeader = ({ header, onUpdate }: EditorHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const { t } = useI18n()

  return (
    <header>
      {isEditing ? (
        <section className="header-edit">
          <div className="edit-group">
            <label htmlFor="header-name">{t('name')}</label>
            <input
              id="header-name"
              type="text"
              value={header.name}
              onChange={(event) => onUpdate('name', event.target.value)}
              placeholder={t('fullName')}
            />
          </div>
          <div className="edit-group">
            <label htmlFor="header-title">{t('title')}</label>
            <input
              id="header-title"
              type="text"
              value={header.title}
              onChange={(event) => onUpdate('title', event.target.value)}
              placeholder={t('jobTitle')}
            />
          </div>
          <button onClick={() => setIsEditing(false)} className="edit-done">
            {t('done')}
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
          aria-label={t('editHeader')}
        >
          <h2>{header.name}</h2>
          <h3>{header.title}</h3>
        </button>
      )}
    </header>
  )
}

export default EditorHeader