import './ErrorMessage.css'

function ErrorMessage({ message, onRetry }) {
    return (
        <div className="error-wrapper">
            <div className="error-icon-wrap">
                <span className="error-icon">⚠</span>
            </div>
            <h3 className="error-title">Something went wrong</h3>
            <p className="error-body">{message}</p>
            <button className="btn-primary error-retry-btn" onClick={onRetry}>
                <span>↻</span> Try Again
            </button>
        </div>
    )
}

export default ErrorMessage
