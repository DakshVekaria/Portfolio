import './App.css'
import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './Pages/home.jsx'
import AboutPage from './Pages/about.jsx'
import TaskManager from './Pages/task.jsx'

// const Projects = lazy(() => import('./Pages/projects.jsx'))
const Projects = lazy(() =>
  new Promise(resolve => {
    setTimeout(() => resolve(import('./Pages/projects.jsx')), 2000);
  })
);
const Contact = lazy(() => import('./Pages/contact.jsx'))

function App() {
  return (
    <Suspense fallback={<h2>Loading page...</h2>}>
      <Routes>
        <Route path='/' element={<Navigate to='/home' replace />} />
        <Route path='/home' element={<Home />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/task-manager' element={<TaskManager />} />
        <Route path='*' element={<Navigate to='/home' replace />} />
      </Routes>
    </Suspense>
  )
}

export default App
