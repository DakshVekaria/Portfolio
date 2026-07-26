import './About.css'

function About(){
    return(
        <>
            <div id='about'>
                <div className='about-label'>About Me</div>
                <h2>Passionate Developer & <br/>Problem Solver</h2>
                <p>I am a passionate developer with experience in creating modern web applications. I love building things that live on the internet — from elegant UI experiences to scalable backend systems.</p>
                <div className='about-badges'>
                    <span className='about-badge'><span>🚀</span> Full Stack Dev</span>
                    <span className='about-badge'><span>🎨</span> UI / UX Enthusiast</span>
                    <span className='about-badge'><span>⚡</span> Fast Learner</span>
                    <span className='about-badge'><span>🤝</span> Team Player</span>
                </div>
            </div>
        </>
    )
}

export default About