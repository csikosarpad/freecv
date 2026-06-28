import { useState } from 'react'
import type { CVData } from '../App'

interface SidePanelProps {
  cvData: CVData
  setCVData: (data: CVData | ((prev: CVData) => CVData)) => void
}

const SidePanel = ({ cvData, setCVData }: SidePanelProps) => {
  const [isPersonalEditing, setIsPersonalEditing] = useState(false)
  const [draggedSkillId, setDraggedSkillId] = useState<string | null>(null)

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

  return (
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
  )
}

export default SidePanel
