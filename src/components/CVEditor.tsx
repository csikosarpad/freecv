import { useState } from 'react'
import type { CVData } from '../App'
import SidePanel from './SidePanel'
import SectionsPanel from './SectionsPanel'

interface CVEditorProps {
  cvData: CVData
  setCVData: (data: CVData | ((prev: CVData) => CVData)) => void
  isSaving: boolean
}

const CVEditor = ({ cvData, setCVData, isSaving }: CVEditorProps) => {
    const [isHeaderEditing, setIsHeaderEditing] = useState(false)

    const updateHeader = (field: 'name' | 'title', value: string) => {
        setCVData((prev) => ({
            ...prev,
            header: { ...prev.header, [field]: value },
        }))
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
                    <SidePanel cvData={cvData} setCVData={setCVData} />
                    <SectionsPanel cvData={cvData} setCVData={setCVData} />
                </div>
            </article>
        </section>
    )
}

export default CVEditor