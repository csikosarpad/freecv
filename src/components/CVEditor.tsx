import { useState } from 'react'
import type { CVData } from '../App'

interface CVEditorProps {
  cvData: CVData
  setCVData: (data: CVData | ((prev: CVData) => CVData)) => void
  isSaving: boolean
}

const CVEditor = ({ cvData, setCVData, isSaving }: CVEditorProps) => {
    const [draggedSectionId, setDraggedSectionId] = useState<string | null>(null)
    const [draggedSkillId, setDraggedSkillId] = useState<string | null>(null)
    const [isHeaderEditing, setIsHeaderEditing] = useState(false)
    const [isPersonalEditing, setIsPersonalEditing] = useState(false)
    const [sectionToDelete, setSectionToDelete] = useState<string | null>(null)

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

    const updateHeader = (field: 'name' | 'title', value: string) => {
        setCVData((prev) => ({
            ...prev,
            header: { ...prev.header, [field]: value },
        }))
    }

    const updatePersonal = (field: 'phone' | 'email', value: string) => {
        setCVData((prev) => ({
            ...prev,
            personal: { ...prev.personal, [field]: value },
        }))
    }

    const updateSkillName = (skillId: string, newName: string) => {
        setCVData((prev) => ({
            ...prev,
            skills: prev.skills.map((skill) =>
                skill.id === skillId ? { ...skill, name: newName.trim() } : skill,
            ),
        }))
    }

    const updateSkillProgress = (skillId: string, newProgress: number) => {
        // Clamp progress value between 0 and 100
        const clampedProgress = Math.max(0, Math.min(100, newProgress))
        setCVData((prev) => ({
            ...prev,
            skills: prev.skills.map((skill) =>
                skill.id === skillId ? { ...skill, progress: clampedProgress } : skill,
            ),
        }))
    }

    const moveSkill = (sourceId: string, targetId: string) => {
        if (sourceId === targetId) {
            return
        }

        const sourceIndex = cvData.skills.findIndex((skill) => skill.id === sourceId)
        const targetIndex = cvData.skills.findIndex((skill) => skill.id === targetId)

        if (sourceIndex < 0 || targetIndex < 0) {
            return
        }

        const nextSkills = [...cvData.skills]
        const [movedSkill] = nextSkills.splice(sourceIndex, 1)
        nextSkills.splice(targetIndex, 0, movedSkill)
        setCVData((prev) => ({ ...prev, skills: nextSkills }))
    }

    const copySkill = (skillId: string) => {
        const skillToCopy = cvData.skills.find((skill) => skill.id === skillId)
        if (!skillToCopy) {
            return
        }

        const newSkillId = `skill-${Date.now()}`
        setCVData((prev) => ({
            ...prev,
            skills: [
                ...prev.skills,
                {
                    id: newSkillId,
                    name: `${skillToCopy.name} (Copy)`,
                    progress: skillToCopy.progress,
                },
            ],
        }))
    }

    const addSkill = () => {
        const newSkillId = `skill-${Date.now()}`
        setCVData((prev) => ({
            ...prev,
            skills: [
                ...prev.skills,
                {
                    id: newSkillId,
                    name: 'New Skill',
                    progress: 50,
                },
            ],
        }))
    }

    const deleteSkill = (skillId: string) => {
        setCVData((prev) => ({
            ...prev,
            skills: prev.skills.filter((skill) => skill.id !== skillId),
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
        <section className="editor-content frame-container" aria-label="CV editor">
            {isSaving && (
                <output className="autosave-indicator">
                    <span className="saving-dot">●</span>
                    {' Saving...'}
                </output>
            )}
            <article className="cv-frame">
                <header>
                    {isHeaderEditing ? (
                        <section className="header-edit">
                            <div className="edit-group">
                                <label htmlFor="header-name">Name</label>
                                <input
                                    id="header-name"
                                    type="text"
                                    value={cvData.header.name}
                                    onChange={(e) => updateHeader('name', e.target.value)}
                                    placeholder="Full Name"
                                />
                            </div>
                            <div className="edit-group">
                                <label htmlFor="header-title">Title</label>
                                <input
                                    id="header-title"
                                    type="text"
                                    value={cvData.header.title}
                                    onChange={(e) => updateHeader('title', e.target.value)}
                                    placeholder="Job Title"
                                />
                            </div>
                            <button onClick={() => setIsHeaderEditing(false)} className="edit-done">
                                Done
                            </button>
                        </section>
                    ) : (
                        <button
                            onClick={() => setIsHeaderEditing(true)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    setIsHeaderEditing(true)
                                }
                            }}
                            className="header-display"
                            aria-label="Click to edit header information"
                        >
                            <h2>{cvData.header.name}</h2>
                            <h3>{cvData.header.title}</h3>
                            <div className="header-edit-hint">Click to edit</div>
                        </button>
                    )}
                </header>

                <div className="cv-content">
                    <aside>
                        <h2>Personal</h2>
                        {isPersonalEditing ? (
                            <section className="personal-edit">
                                <div className="edit-group">
                                    <label htmlFor="personal-phone">Phone</label>
                                    <input
                                        id="personal-phone"
                                        type="text"
                                        value={cvData.personal.phone}
                                        onChange={(e) => updatePersonal('phone', e.target.value)}
                                        placeholder="Phone number"
                                    />
                                </div>
                                <div className="edit-group">
                                    <label htmlFor="personal-email">Email</label>
                                    <input
                                        id="personal-email"
                                        type="email"
                                        value={cvData.personal.email}
                                        onChange={(e) => updatePersonal('email', e.target.value)}
                                        placeholder="Email address"
                                    />
                                </div>
                                <button onClick={() => setIsPersonalEditing(false)} className="edit-done">
                                    Done
                                </button>
                            </section>
                        ) : (
                            <button
                                onClick={() => setIsPersonalEditing(true)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault()
                                        setIsPersonalEditing(true)
                                    }
                                }}
                                className="personal-display"
                                aria-label="Click to edit personal information"
                            >
                                <ul>
                                    <li>{cvData.personal.phone}</li>
                                    <li>{cvData.personal.email}</li>
                                </ul>
                                <div className="personal-edit-hint">Click to edit</div>
                            </button>
                        )}

                        <h2>Skills</h2>
                        <ul className="skills-list">
                            {cvData.skills.map((skill) => (
                                <li 
                                    key={skill.id} 
                                    className={`skill-item ${draggedSkillId === skill.id ? 'dragging' : ''}`}
                                    draggable
                                    onDragStart={() => setDraggedSkillId(skill.id)}
                                    onDragEnd={() => setDraggedSkillId(null)}
                                    onDragOver={(event) => event.preventDefault()}
                                    onDrop={() => {
                                        if (draggedSkillId) {
                                            moveSkill(draggedSkillId, skill.id)
                                            setDraggedSkillId(null)
                                        }
                                    }}
                                >
                                    <div className="skill-drag-handle" title="Drag to reorder">
                                        <span>⋮</span>
                                    </div>
                                    <div className="skill-content">
                                        <input
                                            type="text"
                                            value={skill.name}
                                            onChange={(e) => updateSkillName(skill.id, e.target.value)}
                                            className={`skill-name-input ${skill.name.trim() === '' ? 'invalid' : ''}`}
                                            placeholder="Skill name"
                                            aria-label={`Skill name: ${skill.name}`}
                                        />
                                        <div className="skill-progress-container">
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={skill.progress}
                                                onChange={(e) => updateSkillProgress(skill.id, Number(e.target.value))}
                                                className="skill-progress-slider"
                                                aria-label={`${skill.name} progress`}
                                            />
                                            <span className="skill-progress-value">{skill.progress}%</span>
                                        </div>
                                    </div>
                                    <div className="skill-actions">
                                        <button
                                            onClick={() => copySkill(skill.id)}
                                            className="skill-copy-btn"
                                            title="Duplicate skill"
                                            aria-label={`Duplicate ${skill.name}`}
                                        >
                                            📋
                                        </button>
                                        <button
                                            onClick={() => deleteSkill(skill.id)}
                                            className="skill-delete-btn"
                                            title="Delete skill"
                                            aria-label={`Delete ${skill.name}`}
                                        >
                                            ×
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button onClick={addSkill} className="skill-add-btn">
                            + Add Skill
                        </button>
                    </aside>

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
                                        className="section-body"
                                        value={section.body}
                                        rows={4}
                                        onChange={(event) => {
                                            updateSectionBody(section.id, event.target.value)
                                        }}
                                        disabled={section.locked}
                                    />
                                    </div>

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
                                </article>
                            </section>
                        ))}
                        <button onClick={addSection} className="section-add-btn">
                            + Add Section
                        </button>
                    </section>
                </div>
            </article>

            {sectionToDelete && (
                <div className="delete-confirm-modal">
                    <div className="modal-content">
                        <h3>Delete Section?</h3>
                        <p>Are you sure you want to delete this section? This action cannot be undone.</p>
                        <div className="modal-buttons">
                            <button 
                                onClick={() => setSectionToDelete(null)} 
                                className="modal-cancel-btn"
                            >
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
        </section>
    )
}

export default CVEditor