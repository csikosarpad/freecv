import { useState } from 'react'

type CVSection = {
    id: string
    title: string
    body: string
}

const initialSections: CVSection[] = [
    {
        id: 'summary',
        title: 'Summary',
        body:
            'Web UI developer with over 15 years of experience, passionate about creating intuitive, user-friendly websites and applications.',
    },
    {
        id: 'experience',
        title: 'Experience',
        body:
            'Senior UI Developer delivering React and TypeScript solutions, collaborating in agile teams, and improving product quality through maintainable frontend architecture.',
    },
    {
        id: 'projects',
        title: 'Projects',
        body:
            'Built admin dashboards, design system components, and internal tooling with a focus on performance and accessibility.',
    },
]

const CVEditor = () => {
    const [sections, setSections] = useState<CVSection[]>(initialSections)
    const [draggedSectionId, setDraggedSectionId] = useState<string | null>(null)

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
        setSections(nextSections)
    }

    return (
        <section className="editor-content frame-container" aria-label="CV editor">
            <article className="cv-frame">
                <header>
                    <section>
                        <h2>Arpad Csikos</h2>
                        <h3>Senior UI Developer</h3>
                    </section>
                </header>

                <div className="cv-content">
                    <aside>
                        <h2>Personal</h2>
                        <ul>
                            <li>+36302807143</li>
                            <li>arpad.csikos@gmail.com</li>
                        </ul>

                        <h2>Skills</h2>
                        <ul>
                            <li>
                                React.js
                                <progress value="80" max="100" aria-label="React.js skill level" />
                            </li>
                            <li>
                                JavaScript, Ecmascript
                                <progress value="80" max="100" aria-label="JavaScript skill level" />
                            </li>
                            <li>
                                TypeScript
                                <progress value="80" max="100" aria-label="TypeScript skill level" />
                            </li>
                            <li>
                                CSS, Sass
                                <progress value="80" max="100" aria-label="CSS skill level" />
                            </li>
                        </ul>
                    </aside>

                    <section className="sections-column" aria-label="CV sections">
                        {sections.map((section) => (
                            <div
                                key={section.id}
                                className="dropzone"
                                data-testid={`dropzone-${section.id}`}
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
                                >
                                    <label htmlFor={`title-${section.id}`} className="sr-only">
                                        Section title
                                    </label>
                                    <input
                                        id={`title-${section.id}`}
                                        className="section-title"
                                        value={section.title}
                                        onChange={(event) => {
                                            const nextTitle = event.target.value
                                            setSections((previous) =>
                                                previous.map((item) =>
                                                    item.id === section.id ? { ...item, title: nextTitle } : item,
                                                ),
                                            )
                                        }}
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
                                            const nextBody = event.target.value
                                            setSections((previous) =>
                                                previous.map((item) =>
                                                    item.id === section.id ? { ...item, body: nextBody } : item,
                                                ),
                                            )
                                        }}
                                    />
                                </article>
                            </div>
                        ))}
                    </section>
                </div>
            </article>
        </section>
    )
}

export default CVEditor