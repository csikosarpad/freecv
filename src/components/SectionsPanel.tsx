import { useState, useRef, useEffect } from 'react'
import type { CVData } from '../App'
import { useI18n } from '../i18n-context'
import SectionCard from './SectionCard'
import SectionDeleteDialog from './SectionDeleteDialog'

interface SectionsPanelProps {
  cvData: CVData
  setCVData: (data: CVData | ((prev: CVData) => CVData)) => void
}

const SectionsPanel = ({ cvData, setCVData }: SectionsPanelProps) => {
  const [draggedSectionId, setDraggedSectionId] = useState<string | null>(null)
  const [dropTargetSectionId, setDropTargetSectionId] = useState<string | null>(null)
  const [sectionToDelete, setSectionToDelete] = useState<string | null>(null)
  const textareaRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({})
  const { t } = useI18n()

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
          title: t('newSection'),
          body: t('newSectionBody'),
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
      <section className="sections-column" aria-label={t('cvSections')}>
        {sections.map((section) => (
          <section
            key={section.id}
            className={`dropzone ${dropTargetSectionId === section.id ? 'drop-target' : ''}`}
            data-testid={`dropzone-${section.id}`}
            data-drop-label={t('dropSectionHere')}
            aria-label={t('dropZoneForSection', { name: section.title })}
            onDragOver={(event) => {
              event.preventDefault()

              if (draggedSectionId && draggedSectionId !== section.id) {
                setDropTargetSectionId(section.id)
              }
            }}
            onDragLeave={() => {
              if (dropTargetSectionId === section.id) {
                setDropTargetSectionId(null)
              }
            }}
            onDrop={() => {
              if (draggedSectionId) {
                moveSection(draggedSectionId, section.id)
                setDraggedSectionId(null)
                setDropTargetSectionId(null)
              }
            }}
          >
            <SectionCard
              section={section}
              isDragging={draggedSectionId === section.id}
              onDragStart={() => {
                setDraggedSectionId(section.id)
                setDropTargetSectionId(null)
              }}
              onDragEnd={() => {
                setDraggedSectionId(null)
                setDropTargetSectionId(null)
              }}
              onTitleChange={(newTitle) => updateSectionTitle(section.id, newTitle)}
              onBodyChange={(newBody, textarea) => {
                updateSectionBody(section.id, newBody)
                autoResizeTextarea(textarea)
              }}
              onToggleLock={() => toggleSectionLock(section.id)}
              onDelete={() => setSectionToDelete(section.id)}
              setTextareaRef={(element) => {
                if (element) {
                  textareaRefs.current[section.id] = element
                }
              }}
            />
          </section>
        ))}
        <button onClick={addSection} className="section-add-btn">
          {t('addSection')}
        </button>
      </section>

      {sectionToDelete && (
        <SectionDeleteDialog
          onCancel={() => setSectionToDelete(null)}
          onConfirm={() => deleteSection(sectionToDelete)}
        />
      )}
    </>
  )
}

export default SectionsPanel
