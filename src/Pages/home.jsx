import './home.css'
import { Link } from 'react-router-dom'
import Header1 from '../Components/Header.jsx'
import Footer from '../Components/Footer.jsx'

function Home() {
    return (
        <>
            <Header1 />

            <section className='hero-section'>
                <div className='hero-badge'>Welcome to my Portfolio</div>

                <h1 className='hero-title'>
                    <span className='accent-word'>Daksh Vekaria</span>
                </h1>

                <p className='hero-sub'>
                    I'm a passionate developer who loves crafting elegant, modern web experiences — from pixel-perfect UIs to scalable backend systems.
                </p>

                <div className='hero-actions'>
                    <Link to='/projects' className='hero-btn-primary'>
                        View Projects →
                    </Link>
                    <Link to='/contact' className='hero-btn-outline'>
                        Contact Me
                    </Link>
                </div>

                <div className='hero-divider'></div>

            </section>

            <Footer />
        </>
    )
}

export default Home