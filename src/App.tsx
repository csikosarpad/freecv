import './App.css'

import { useState } from 'react'
import SideBar from './components/SideBar.tsx'
import CVEditor from './components/CVEditor.tsx'
import { useLocalStorage, removeFromLocalStorage } from './hooks/useLocalStorage.ts'

export type CVHeaderData = {
  name: string
  title: string
}

export type CVPersonalData = {
  phone: string
  email: string
}

export type CVSkill = {
  id: string
  name: string
  progress: number
}

export type CVSection = {
  id: string
  title: string
  body: string
  locked?: boolean
}

export type CVData = {
  header: CVHeaderData
  personal: CVPersonalData
  skills: CVSkill[]
  sections: CVSection[]
}

const initialCVData: CVData = {
  header: {
    name: 'Arpad Csikos',
    title: 'Senior UI Developer',
  },
  personal: {
    phone: '+36302807143',
    email: 'arpad.csikos@gmail.com',
  },
  skills: [
    { id: 'react', name: 'React.js', progress: 80 },
    { id: 'js', name: 'JavaScript, Ecmascript', progress: 80 },
    { id: 'ts', name: 'TypeScript', progress: 80 },
    { id: 'css', name: 'CSS, Sass', progress: 80 },
  ],
  sections: [
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
  ],
}

function App() {
  const [cvData, setCVData, isSaving] = useLocalStorage<CVData>('cv-data', initialCVData)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const handleReset = () => {
    removeFromLocalStorage('cv-data')
    setCVData(initialCVData)
    setShowResetConfirm(false)
  }

  return (
    <div className="main-container">
      <SideBar
        isSaving={isSaving}
        onReset={() => setShowResetConfirm(true)}
      />
      {showResetConfirm && (
        <div className="reset-confirm-modal" role="alertdialog" aria-modal="true">
          <div className="modal-content">
            <h2>Reset All Data?</h2>
            <p>This will delete all your CV data. This action cannot be undone.</p>
            <div className="modal-actions">
              <button onClick={() => setShowResetConfirm(false)}>Cancel</button>
              <button onClick={handleReset} className="button-destructive">
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
      <CVEditor cvData={cvData} setCVData={setCVData} isSaving={isSaving} />
    </div>
  )
}

export default App
