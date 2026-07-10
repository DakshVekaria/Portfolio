import './Skill.css'

function Skill(props){
    return (
        <>
            <div id='skill'>
                <h2>Skills</h2>
                <p>Here are some of my skills:</p>
                <ul>
                    {props.skillList.map((s) => <li>{s}</li>)}
                </ul>
            </div>
        </>
    )
}

export default Skill