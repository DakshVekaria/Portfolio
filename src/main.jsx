import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header1 from './Header.jsx'
import About from './About.jsx'
import Skill from './Skill.jsx'
import Footer from './Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header1 />
    <About />
    <Skill skillList={['JavaScript', 'React', 'CSS']} />
    <Footer />
  </StrictMode>,
)
