import './Skill.css'

function Skill(props){
    return (
        <>
            <div id='skill'>
                <div className='skill-label'>Technical Skills</div>
                <h2>My Skill Set</h2>
                <p>Here are some of the technologies I work with:</p>
                <div id='skillList'>
                    {props.skillList.map((s, index) => (
                        <span className='skill-tag' key={index}>{s}</span>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Skill