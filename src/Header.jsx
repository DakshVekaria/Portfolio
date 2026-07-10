import './Header.css'

function Header(){
    return (
        <>
            <div id='navBar'>
                <div>
                    <h2 id='logo'>Portfolio</h2>
                </div>
                <div id='navLinks'>
                    <a href="javascript:void(0)" className='navBtn'>Contact</a>
                    <a href="javascript:void(0)" className='navBtn'>About</a>
                    <a href="javascript:void(0)" className='navBtn'>Projects</a>
                </div>
            </div>
        </>
    )
}

export default Header