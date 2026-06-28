import './App.css'

import SideBar from './components/SideBar.tsx'
import CVEditor from './components/CVEditor.tsx'

function App() {
  return (
    <div className="main-container">
      <SideBar />
      <CVEditor />
    </div>
  )
}

export default App
