import { useState } from 'react'

import type { CVData } from '../App'
import { useI18n } from '../i18n-context'

interface PersonalSectionProps {
  personal: CVData['personal']
  onUpdate: (field: 'phone' | 'email', value: string) => void
}

const PersonalSection = ({ personal, onUpdate }: PersonalSectionProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const { t } = useI18n()

  return (
    <>
      <h2>{t('personal')}</h2>
      {isEditing ? (
        <section className="personal-edit">
          <div className="edit-group">
            <label htmlFor="personal-phone">{t('phone')}</label>
            <input
              id="personal-phone"
              type="text"
              value={personal.phone}
              onChange={(event) => onUpdate('phone', event.target.value)}
              placeholder={t('phoneNumber')}
            />
          </div>
          <div className="edit-group">
            <label htmlFor="personal-email">{t('email')}</label>
            <input
              id="personal-email"
              type="email"
              value={personal.email}
              onChange={(event) => onUpdate('email', event.target.value)}
              placeholder={t('emailAddress')}
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
          className="personal-display"
          aria-label={t('editPersonal')}
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