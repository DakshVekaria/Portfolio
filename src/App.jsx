import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Projects from './Pages/projects.jsx'
import Contact from './Pages/contact.jsx'
import AboutPage from './Pages/about.jsx'
import Home from './Pages/home.jsx'
import TaskManager from './Pages/task.jsx'

function App() {
  return (
    <Routes>
      <Route path='/'         element={<Navigate to='/home' replace />} />
      <Route path='/home'     element={<Home />} />
      <Route path='/projects' element={<Projects />} />
      <Route path='/contact'  element={<Contact />} />
      <Route path='/about'    element={<AboutPage />} />
      <Route path='/task-manager'    element={<TaskManager />} />
      <Route path='*'         element={<Navigate to='/home' replace />} />
    </Routes>
  )
}

export default App
