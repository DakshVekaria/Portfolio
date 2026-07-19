import { Link } from 'react-router-dom'
import './Header.css'

function Header(){
    return (
        <>
            <div id='navBar'>
                <div>
                    <Link to="/home" id='logo'><h2 id='logo'>Portfolio</h2></Link>
                </div>
                <div id='navLinks'>
                    <Link to="/contact" className='navBtn'>Contact</Link>
                    <Link to="/about" className='navBtn'>About</Link>
                    <Link to="/projects" className='navBtn'>Projects</Link>
                </div>
            </div>
        </>
    )
}

export default Header