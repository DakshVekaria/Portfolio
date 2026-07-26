import './Spinner.css'

function Spinner() {
    return (
        <div className="spinner-wrapper">
            <div className="spinner-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <p className="spinner-text">Fetching projects…</p>
        </div>
    )
}

export default Spinner
