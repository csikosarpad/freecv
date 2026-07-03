import { useState } from 'react'

import type { CVSkill } from '../App'
import { useI18n } from '../i18n-context'

interface SkillsSectionProps {
  skills: CVSkill[]
  onUpdateName: (skillId: string, newName: string) => void
  onUpdateProgress: (skillId: string, newProgress: number) => void
  onMoveSkill: (sourceId: string, targetId: string) => void
  onCopySkill: (skillId: string) => void
  onAddSkill: () => void
  onDeleteSkill: (skillId: string) => void
}

const SkillsSection = ({
  skills,
  onUpdateName,
  onUpdateProgress,
  onMoveSkill,
  onCopySkill,
  onAddSkill,
  onDeleteSkill,
}: SkillsSectionProps) => {
  const [draggedSkillId, setDraggedSkillId] = useState<string | null>(null)
  const [dropTargetSkillId, setDropTargetSkillId] = useState<string | null>(null)
  const { t } = useI18n()

  return (
    <>
      <h2>{t('skills')}</h2>
      <ul className="skills-list">
        {skills.map((skill) => (
          <li
            key={skill.id}
            className={`skill-item ${draggedSkillId === skill.id ? 'dragging' : ''} ${dropTargetSkillId === skill.id ? 'drop-target' : ''}`}
            draggable
            data-drop-label={t('dropHere')}
            onDragStart={() => {
              setDraggedSkillId(skill.id)
              setDropTargetSkillId(null)
            }}
            onDragEnd={() => {
              setDraggedSkillId(null)
              setDropTargetSkillId(null)
            }}
            onDragOver={(event) => {
              event.preventDefault()

              if (draggedSkillId && draggedSkillId !== skill.id) {
                setDropTargetSkillId(skill.id)
              }
            }}
            onDragLeave={() => {
              if (dropTargetSkillId === skill.id) {
                setDropTargetSkillId(null)
              }
            }}
            onDrop={() => {
              if (draggedSkillId) {
                onMoveSkill(draggedSkillId, skill.id)
                setDraggedSkillId(null)
                setDropTargetSkillId(null)
              }
            }}
          >
            <div className="skill-drag-handle" title={t('dragToReorder')}>
              <span>⋮</span>
            </div>
            <div className="skill-content">
              <input
                type="text"
                value={skill.name}
                onChange={(event) => onUpdateName(skill.id, event.target.value)}
                className={`skill-name-input ${skill.name.trim() === '' ? 'invalid' : ''}`}
                placeholder={t('skillName')}
                aria-label={t('skillNameAria', { name: skill.name })}
              />
              <div className="skill-progress-container">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={skill.progress}
                  onChange={(event) => onUpdateProgress(skill.id, Number(event.target.value))}
                  className="skill-progress-slider"
                  aria-label={t('skillProgress', { name: skill.name })}
                />
                <progress value={skill.progress} max="100" className="skill-progress-bar" />
                <span className="skill-progress-value">{skill.progress}%</span>
              </div>
            </div>
            <div className="skill-actions">
              <button
                onClick={() => onCopySkill(skill.id)}
                className="skill-copy-btn skill-action-btn"
                title={t('copyLabel')}
                aria-label={`${t('copyLabel')} ${skill.name}`}
              >
                📋
              </button>
              <button
                onClick={() => onDeleteSkill(skill.id)}
                className="skill-delete-btn skill-action-btn"
                title={t('delete')}
                aria-label={t('deleteSkill', { name: skill.name })}
              >
                ×
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={onAddSkill} className="skill-add-btn">
        {t('addSkill')}
      </button>
    </>
  )
}

export default SkillsSection