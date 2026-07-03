import './App.css'

import { useEffect, useState } from 'react'
import SideBar from './components/SideBar.tsx'
import CVEditor from './components/CVEditor.tsx'
import { useLocalStorage, removeFromLocalStorage } from './hooks/useLocalStorage.ts'
import { useHistoryState } from './hooks/useHistoryState.ts'
import { I18nProvider } from './i18n.tsx'
import { getTranslations, type Locale } from './i18n-data'

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

type Theme = 'light' | 'dark'

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
  const [storedCvData, setStoredCvData, isSaving] = useLocalStorage<CVData>('cv-data', initialCVData)
  const [theme, setTheme] = useLocalStorage<Theme>('cv-theme', 'light')
  const [locale, setLocale] = useLocalStorage<Locale>('cv-locale', 'en')
  const {
    value: cvData,
    setValue: setCVData,
    undo,
    redo,
    clearHistory,
    canUndo,
    canRedo,
  } = useHistoryState(storedCvData, setStoredCvData)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const messages = getTranslations(locale)

  useEffect(() => {
    document.body.dataset.theme = theme

    return () => {
      delete document.body.dataset.theme
    }
  }, [theme])

  const handleReset = () => {
    removeFromLocalStorage('cv-data')
    setCVData(initialCVData)
    clearHistory()
    setShowResetConfirm(false)
  }

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <I18nProvider locale={locale}>
      <div className="main-container">
        <SideBar
          isSaving={isSaving}
          canUndo={canUndo}
          canRedo={canRedo}
          theme={theme}
          locale={locale}
          onUndo={undo}
          onRedo={redo}
          onToggleTheme={toggleTheme}
          onLocaleChange={setLocale}
          onReset={() => setShowResetConfirm(true)}
        />
        {showResetConfirm && (
          <div className="reset-confirm-modal" role="alertdialog" aria-modal="true">
            <div className="modal-content">
              <h2>{messages.resetAllTitle}</h2>
              <p>{messages.resetAllDescription}</p>
              <div className="modal-actions">
                <button onClick={() => setShowResetConfirm(false)}>{messages.cancel}</button>
                <button onClick={handleReset} className="button-destructive">
                  {messages.resetAll}
                </button>
              </div>
            </div>
          </div>
        )}
        <CVEditor cvData={cvData} setCVData={setCVData} isSaving={isSaving} />
      </div>
    </I18nProvider>
  )
}

export default App
