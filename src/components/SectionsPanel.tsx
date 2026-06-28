import { useState, useRef, useEffect } from 'react'
import type { CVData } from '../App'

interface SectionsPanelProps {
  cvData: CVData
  setCVData: (data: CVData | ((prev: CVData) => CVData)) => void
}

const SectionsPanel = ({ cvData, setCVData }: SectionsPanelProps) => {
  const [draggedSectionId, setDraggedSectionId] = useState<string | null>(null)
  const [sectionToDelete, setSectionToDelete] = useState<string | null>(null)
  const textareaRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({})

  const autoResizeTextarea = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  useEffect(() => {
    const sections = cvData.sections || []
    sections.forEach((section) => {
      const textarea = textareaRefs.current[section.id]
      if (textarea) {
        autoResizeTextarea(textarea)
      }
    })
  }, [cvData.sections])

  const sections = cvData.sections || []

  const moveSection = (sourceId: string, targetId: string) => {
    if (sourceId === targetId) {
      return
    }

    const sourceIndex = sections.findIndex((section) => section.id === sourceId)
    const targetIndex = sections.findIndex((section) => section.id === targetId)

    if (sourceIndex < 0 || targetIndex < 0) {
      return
    }

    const nextSections = [...sections]
    const [movedSection] = nextSections.splice(sourceIndex, 1)
    nextSections.splice(targetIndex, 0, movedSection)
    setCVData((prev) => ({ ...prev, sections: nextSections }))
  }

  const updateSectionTitle = (sectionId: string, newTitle: string) => {
    setCVData((prev) => ({
      ...prev,
      sections: (prev.sections || []).map((item) =>
        item.id === sectionId ? { ...item, title: newTitle } : item,
      ),
    }))
  }

  const updateSectionBody = (sectionId: string, newBody: string) => {
    setCVData((prev) => ({
      ...prev,
      sections: (prev.sections || []).map((item) =>
        item.id === sectionId ? { ...item, body: newBody } : item,
      ),
    }))
  }

  const toggleSectionLock = (sectionId: string) => {
    setCVData((prev) => ({
      ...prev,
      sections: (prev.sections || []).map((section) =>
        section.id === sectionId ? { ...section, locked: !section.locked } : section,
      ),
    }))
  }

  const addSection = () => {
    const newSectionId = `section-${Date.now()}`
    setCVData((prev) => ({
      ...prev,
      sections: [
        ...(prev.sections || []),
        {
          id: newSectionId,
          title: 'New Section',
          body: 'Add your content here...',
          locked: false,
        },
      ],
    }))
  }

  const deleteSection = (sectionId: string) => {
    setCVData((prev) => ({
      ...prev,
      sections: (prev.sections || []).filter((section) => section.id !== sectionId),
    }))
    setSectionToDelete(null)
  }

  return (
    <>
      <section className="sections-column" aria-label="CV sections">
        {sections.map((section) => (
          <section
            key={section.id}
            className="dropzone"
            data-testid={`dropzone-${section.id}`}
            aria-label={`Drop zone for ${section.title} section`}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => {
              if (draggedSectionId) {
                moveSection(draggedSectionId, section.id)
                setDraggedSectionId(null)
              }
            }}
          >
            <article
              draggable
              data-testid={`section-card-${section.id}`}
              onDragStart={() => setDraggedSectionId(section.id)}
              onDragEnd={() => setDraggedSectionId(null)}
              className={`${draggedSectionId === section.id ? 'dragging' : ''} ${section.locked ? 'locked-section' : ''}`}
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
                  onChange={(event) => {
                    updateSectionTitle(section.id, event.target.value)
                  }}
                  disabled={section.locked}
                />

                <label htmlFor={`body-${section.id}`} className="sr-only">
                  Section body
                </label>
                <textarea
                  id={`body-${section.id}`}
                  ref={(el) => {
                    if (el) textareaRefs.current[section.id] = el
                  }}
                  className="section-body"
                  value={section.body}
                  onChange={(event) => {
                    const textarea = event.currentTarget
                    updateSectionBody(section.id, event.target.value)
                    autoResizeTextarea(textarea)
                  }}
                  disabled={section.locked}
                />
              </div>

              <div className="section-actions">
              <button
                onClick={() => toggleSectionLock(section.id)}
                className={`section-lock-btn ${section.locked ? 'locked' : 'unlocked'}`}
                title={section.locked ? 'Unlock section to edit' : 'Lock section to prevent edits'}
                aria-label={section.locked ? 'Unlock' : 'Lock'}
              >
                {section.locked ? '🔒' : '🔓'}
              </button>
              <button
                onClick={() => setSectionToDelete(section.id)}
                className="section-delete-btn"
                title="Delete section"
                aria-label={`Delete ${section.title} section`}
              >
                ×
              </button>
                </div>
            </article>
          </section>
        ))}
        <button onClick={addSection} className="section-add-btn">
          + Add Section
        </button>
      </section>

      {sectionToDelete && (
        <div className="delete-confirm-modal">
          <div className="modal-content">
            <h3>Delete Section?</h3>
            <p>Are you sure you want to delete this section? This action cannot be undone.</p>
            <div className="modal-buttons">
              <button onClick={() => setSectionToDelete(null)} className="modal-cancel-btn">
                Cancel
              </button>
              <button
                onClick={() => deleteSection(sectionToDelete)}
                className="modal-delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SectionsPanel
