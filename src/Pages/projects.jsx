import { useEffect, useState } from 'react'
import Header from '../Components/Header.jsx'
import Footer from '../Components/Footer.jsx'
import Spinner from '../Components/Spinner.jsx'
import ErrorMessage from '../Components/ErrorMessage.jsx'
import './projects.css'

const GITHUB_USERNAME = 'DakshVekaria'

/* ── Single project card ── */
function ProjectCard({ repo }) {
    return (
        <article className="project-card">
            <div className="pc-top-row">
                <div className="pc-repo-icon">
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z"/>
                    </svg>
                </div>
                {repo.language && (
                    <span className="pc-lang-tag">{repo.language}</span>
                )}
            </div>

            <h3 className="pc-title">{repo.name}</h3>

            <p className="pc-desc">
                {repo.description
                    ? repo.description.length > 90
                        ? repo.description.slice(0, 90) + '…'
                        : repo.description
                    : 'No description provided.'}
            </p>

            <div className="pc-footer">
                <span className="pc-stars">
                    ★ {repo.stargazers_count}
                </span>
                <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pc-btn"
                >
                    View Project ↗
                </a>
            </div>
        </article>
    )
}

/* ── Projects page ── */
function Projects() {
    const [repos,   setRepos]   = useState([])
    const [loading, setLoading] = useState(true)
    const [error,   setError]   = useState(null)

    const fetchRepos = async () => {
        setLoading(true)
        setError(null)
        try {
            await new Promise((resolve) => setTimeout(resolve, 5000));

            const res = await fetch(
                `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
            )
            if (!res.ok) throw new Error(`GitHub API responded with status ${res.status}`)
            const data = await res.json()
            setRepos(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchRepos()
    }, [])

    return (
        <>
            <Header />

            <main className="projects-page">
                <header className="projects-hero">
                    <span className="section-label">GitHub Repos</span>
                    <h1>My <span className="gradient-text">Projects</span></h1>
                    <p className="projects-subtitle">
                        A collection of real-world projects — fetched live from GitHub.
                    </p>
                </header>

                {loading && <Spinner />}
                {error   && <ErrorMessage message={error} onRetry={fetchRepos} />}

                {!loading && !error && (
                    <div className="projects-grid">
                        {repos.map(repo => (
                            <ProjectCard key={repo.id} repo={repo} />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </>
    )
}

export default Projects