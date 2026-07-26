import { NavLink } from 'react-router-dom'
import './Header.css'

function Header(){
    return (
        <>
            <div id='navBar'>
                <NavLink to="/home" id='logo'>
                    Portfolio
                </NavLink>
                <div id='navLinks'>
                    <NavLink to="/home"     className={({isActive}) => 'navBtn' + (isActive ? ' active' : '')}><span>Home</span></NavLink>
                    <NavLink to="/about"    className={({isActive}) => 'navBtn' + (isActive ? ' active' : '')}><span>About</span></NavLink>
                    <NavLink to="/projects" className={({isActive}) => 'navBtn' + (isActive ? ' active' : '')}><span>Projects</span></NavLink>
                    <NavLink to="/contact"  className={({isActive}) => 'navBtn' + (isActive ? ' active' : '')}><span>Contact</span></NavLink>
                </div>
            </div>
        </>
    )
}

export default Header