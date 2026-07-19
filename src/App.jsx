import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Projects from './Pages/projects.jsx'
import Contact from './Pages/contact.jsx'
import AboutPage from './Pages/about.jsx'
import Home from './Pages/home.jsx'

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  )
}

export default App
