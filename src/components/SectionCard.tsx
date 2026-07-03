import type { CVSection } from '../App'

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
  return (
    <article
      draggable
      data-testid={`section-card-${section.id}`}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`section-card${isDragging ? ' dragging' : ''}${section.locked ? ' locked-section' : ''}`}
    >
      <div className="section-grab-handle" title="Drag to reorder">
        <span className="grab-icon">⋮⋮</span>
      </div>

      <div className="section-content">
        <label htmlFor={`title-${section.id}`} className="sr-only">
          Section title
        </label>
        <input
          id={`title-${section.id}`}
          className="section-title"
          value={section.title}
          onChange={(event) => onTitleChange(event.target.value)}
          disabled={section.locked}
        />

        <label htmlFor={`body-${section.id}`} className="sr-only">
          Section body
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
          title={section.locked ? 'Unlock section to edit' : 'Lock section to prevent edits'}
          aria-label={section.locked ? 'Unlock' : 'Lock'}
        >
          {section.locked ? '🔒' : '🔓'}
        </button>
        <button
          onClick={onDelete}
          className="section-delete-btn"
          title="Delete section"
          aria-label={`Delete ${section.title} section`}
        >
          ×
        </button>
      </div>
    </article>
  )
}

export default SectionCard