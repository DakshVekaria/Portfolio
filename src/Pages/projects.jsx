import { useState } from 'react'
import Header1 from '../Components/Header.jsx'
import Footer from '../Components/Footer.jsx'
import Skill from '../Components/Skill.jsx'

function Projects(){
    return (
        <>
            <Header1 />
            <Skill skillList={['JavaScript', 'HTML/CSS', 'Java', 'React']} />
            <Footer />
        </>
    )
}

export default Projects