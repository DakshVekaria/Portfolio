import './Skill.css'

function Skill(props){
    return (
        <>
            <div id='skill'>
                <h2>Skills</h2>
                <div id='skillList'>
                    <p>Here are some of my skills:</p>
                    <div>
                        <ul style={{margin: 0}}>
                            {props.skillList.map((s, index) => <li key={index}>{s}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Skill