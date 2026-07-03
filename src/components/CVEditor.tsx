import type { CVData } from '../App'
import EditorHeader from './EditorHeader'
import SidePanel from './SidePanel'
import SectionsPanel from './SectionsPanel'

interface CVEditorProps {
  cvData: CVData
  setCVData: (data: CVData | ((prev: CVData) => CVData)) => void
  isSaving: boolean
}

const CVEditor = ({ cvData, setCVData, isSaving }: CVEditorProps) => {
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
                <EditorHeader header={cvData.header} onUpdate={updateHeader} />

                <div className="cv-content">
                    <SidePanel cvData={cvData} setCVData={setCVData} />
                    <SectionsPanel cvData={cvData} setCVData={setCVData} />
                </div>
            </article>
        </section>
    )
}

export default CVEditor