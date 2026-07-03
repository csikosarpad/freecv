import type { CVData } from '../App'
import PersonalSection from './PersonalSection'
import SkillsSection from './SkillsSection'

interface SidePanelProps {
  cvData: CVData
  setCVData: (data: CVData | ((prev: CVData) => CVData)) => void
}

const SidePanel = ({ cvData, setCVData }: SidePanelProps) => {
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
      <PersonalSection personal={cvData.personal} onUpdate={updatePersonal} />
      <SkillsSection
        skills={cvData.skills}
        onUpdateName={updateSkillName}
        onUpdateProgress={updateSkillProgress}
        onMoveSkill={moveSkill}
        onCopySkill={copySkill}
        onAddSkill={addSkill}
        onDeleteSkill={deleteSkill}
      />
    </aside>
  )
}

export default SidePanel
