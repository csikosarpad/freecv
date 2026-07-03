import type { CVSection } from '../App'
import { useI18n } from '../i18n-context'

interface SectionCardProps {
  section: CVSection
  isDragging: boolean
  onDragStart: () => void
  onDragEnd: () => void
  onTitleChange: (newTitle: string) => void
  onBodyChange: (newBody: string, textarea: HTMLTextAreaElement) => void
  onToggleLock: () => void
  onDelete: () => void
  setTextareaRef: (element: HTMLTextAreaElement | null) => void
}

const SectionCard = ({
  section,
  isDragging,
  onDragStart,
  onDragEnd,
  onTitleChange,
  onBodyChange,
  onToggleLock,
  onDelete,
  setTextareaRef,
}: SectionCardProps) => {
  const { t } = useI18n()

  return (
    <article
      draggable
      data-testid={`section-card-${section.id}`}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`section-card${isDragging ? ' dragging' : ''}${section.locked ? ' locked-section' : ''}`}
    >
      <div className="section-grab-handle" title={t('dragToReorder')}>
        <span className="grab-icon">⋮⋮</span>
      </div>

      <div className="section-content">
        <label htmlFor={`title-${section.id}`} className="sr-only">
          {t('sectionTitle')}
        </label>
        <input
          id={`title-${section.id}`}
          className="section-title"
          value={section.title}
          onChange={(event) => onTitleChange(event.target.value)}
          disabled={section.locked}
        />

        <label htmlFor={`body-${section.id}`} className="sr-only">
          {t('sectionBody')}
        </label>
        <textarea
          id={`body-${section.id}`}
          ref={setTextareaRef}
          className="section-body"
          value={section.body}
          onChange={(event) => onBodyChange(event.target.value, event.currentTarget)}
          disabled={section.locked}
        />
      </div>

      <div className="section-actions">
        <button
          onClick={onToggleLock}
          className={`section-lock-btn ${section.locked ? 'locked' : 'unlocked'}`}
          title={section.locked ? t('unlockSection') : t('lockSection')}
          aria-label={section.locked ? t('unlock') : t('lock')}
        >
          {section.locked ? '🔒' : '🔓'}
        </button>
        <button
          onClick={onDelete}
          className="section-delete-btn"
          title={t('delete')}
          aria-label={t('deleteSection', { name: section.title })}
        >
          ×
        </button>
      </div>
    </article>
  )
}

export default SectionCard