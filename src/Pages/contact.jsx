import { useState } from 'react'
import './contact.css'
import Header1 from '../Components/Header.jsx'
import Footer from '../Components/Footer.jsx'

function Contact() {
    const [name, setName] = useState('')
    const [showTooltip, setTooltip] = useState(false)

    return (
        <>
            <Header1 />

            <div className='contact-wrapper'>
                <div className='contact-label'>Get In Touch</div>
                <h2>Contact Me</h2>
                <p>Have a question or want to work together? Leave your name below.</p>

                <div className='form-group'>
                    <label htmlFor='inptText'>Your Name</label>
                    <input
                        id='inptText'
                        type='text'
                        placeholder='Enter your name…'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className='name-preview'>
                    <span className='preview-icon'>👤</span>
                    Name entered: <strong>{name || 'Enter your name'}</strong>
                </div>

                <button id='tooltipBtn' onClick={() => setTooltip(!showTooltip)}>
                    {showTooltip ? '✕ Hide Tooltip' : '💡 Toggle Tooltip'}
                </button>

                {showTooltip && (
                    <div id='tooltip'>This is a simple tooltip! You can put any helpful info here.</div>
                )}
            </div>

            <Footer />
        </>
    )
}

export default Contact