import { useState } from 'react'
import './contact.css'
import Header1 from '../Components/Header.jsx'
import Footer from '../Components/Footer.jsx'

function Contact() {
    const [name , setName] = useState('')
    const [showTooltip, setTooltip] = useState(false)

    return (
        <>
            <Header1 />

            <div>
                <label for="inptText">Enter your name:</label>
                <input id="inptText" type='text' placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            
            <h3>Name entered = {name || 'Enter your name'}</h3>

            <button id="tooltipBtn" onClick={() => setTooltip(!showTooltip)}>Toggle Tooltip</button>
            {showTooltip && <div id="tooltip">This is a simple tooltip!</div>}
            <Footer />
        </>
    )
}

export default Contact