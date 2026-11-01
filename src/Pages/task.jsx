import './task.css'
import { useState, useEffect, useRef } from 'react'
import Header1 from '../Components/Header.jsx'
import Footer from '../Components/Footer.jsx'
import { getTask, createTask, deleteTask, generateDescription } from '../api.jsx'

// ── helpers ──────────────────────────────────────────────────────────────────

function friendlyError(err) {
    const data = err?.response?.data;
    if (!data) {
        // network / unreachable
        return { text: 'Could not reach the AI service. You can still write the description yourself.', type: 'error' };
    }
    if (data.invalidTitle) {
        return { text: 'That doesn\'t look like a task. Try a title like "Prepare viva presentation".', type: 'error' };
    }
    if (data.rateLimited) {
        const secs = data.retryAfter ?? 60;
        return { text: `Please wait ${secs}s before asking again for this task.`, type: 'error' };
    }
    if (data.fallback !== undefined) {
        const msg = data.temporarilyUnavailable
            ? 'The AI service is busy — try again shortly.'
            : 'AI suggestion is unavailable right now. You can still write the description yourself.';
        return { text: msg, type: 'error' };
    }
    if (data.error) {
        return { text: data.error, type: 'error' };
    }
    return { text: 'Could not reach the AI service. You can still write the description yourself.', type: 'error' };
}

// ── component ─────────────────────────────────────────────────────────────────

function TaskManager() {
    // ── task form state ───────────────────────────────────────────────────────
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // ── AI chat state ─────────────────────────────────────────────────────────
    const [messages, setMessages] = useState([]);           // { id, role:'user'|'ai'|'error', text }
    const [aiLoading, setAiLoading] = useState(false);
    const [suggestion, setSuggestion] = useState('');       // editable textarea value
    const [suggestionVisible, setSuggestionVisible] = useState(false);

    const chatEndRef = useRef(null);
    const msgId = useRef(0);
    const nextId = () => ++msgId.current;

    // ── auto-scroll ───────────────────────────────────────────────────────────
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, aiLoading]);

    // ── task CRUD ─────────────────────────────────────────────────────────────
    const fetchTasks = () => {
        getTask()
            .then(res => {
                console.log('API response:', res.data);
                if (Array.isArray(res.data)) setTasks(res.data);
            })
            .catch(error => console.error('Error fetching tasks:', error));
    };

    useEffect(() => { fetchTasks(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        setSubmitting(true);
        try {
            const res = await createTask({ title, description });
            setTasks(prev => [...prev, res.data]);
            setTitle('');
            setDescription('');
            // clear AI suggestion after successful task creation
            setSuggestion('');
            setSuggestionVisible(false);
        } catch (error) {
            console.error('Error creating task:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            setTasks(prev => prev.filter(task => task._id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    // ── AI generate ───────────────────────────────────────────────────────────
    const handleGenerate = async () => {
        if (!title.trim() || aiLoading) return;

        // push user bubble
        const userMsg = { id: nextId(), role: 'user', text: title.trim() };
        setMessages(prev => [...prev, userMsg]);
        setAiLoading(true);
        setSuggestionVisible(false);
        setSuggestion('');

        try {
            const data = await generateDescription(title.trim());
            const desc = data.description ?? '';

            if (!desc) {
                // success response but empty description (fallback)
                const msg = data.temporarilyUnavailable
                    ? 'The AI service is busy — try again shortly.'
                    : 'AI suggestion is unavailable right now. You can still write the description yourself.';
                setMessages(prev => [...prev, { id: nextId(), role: 'error', text: msg }]);
            } else {
                setMessages(prev => [...prev, { id: nextId(), role: 'ai', text: desc }]);
                setSuggestion(desc);
                setSuggestionVisible(true);
            }
        } catch (err) {
            const { text } = friendlyError(err);
            setMessages(prev => [...prev, { id: nextId(), role: 'error', text }]);
        } finally {
            setAiLoading(false);
        }
    };

    const handleUseDescription = () => {
        setDescription(suggestion);
        setSuggestionVisible(false);
    };

    const handleDismiss = () => {
        setSuggestionVisible(false);
    };

    // ── render ────────────────────────────────────────────────────────────────
    return (
        <>
            <Header1 />
            <main>
                <div className='task-header'>
                    <h1>Task Manager</h1>
                    <p>Welcome to the Task Manager!</p>
                </div>

                <div className='hero-divider'></div>

                {/* ── Create Task Form ── */}
                <div className='create-task-form'>
                    <div className='form-card'>
                        <h2 className='form-card__heading'>Create Task</h2>

                        <form onSubmit={handleSubmit} className='task-form'>
                            <div className='form-field'>
                                <label className='form-label' htmlFor='task-title'>Title</label>
                                <input
                                    id='task-title'
                                    className='form-input'
                                    type='text'
                                    placeholder='e.g. Prepare viva presentation'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className='form-field'>
                                <label className='form-label' htmlFor='task-description'>Description</label>
                                {/* textarea so multi-line AI suggestions paste correctly */}
                                <textarea
                                    id='task-description'
                                    className='form-input form-textarea'
                                    rows={5}
                                    placeholder='What needs to be done?'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className='form-actions'>
                                <button className='form-submit-btn' type='submit' disabled={submitting}>
                                    {submitting ? 'Adding…' : 'Add Task'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className='hero-divider'></div>

                {/* ── AI Assistant Section ── */}
                <section className='ai-section' aria-label='AI Assistant'>
                    <div className='ai-section-header'>
                        <span className='ai-badge'>✦ AI</span>
                        <h2 className='ai-title'>AI Assistant</h2>
                    </div>

                    {/* Chat area – suggestion card is OUTSIDE this scroll region */}
                    <div className='ai-chat-area' role='log' aria-live='polite'>
                        {messages.length === 0 && !aiLoading && (
                            <p className='ai-empty-state'>No messages yet.</p>
                        )}

                        {messages.map(msg => (
                            <div key={msg.id} className={`ai-bubble ai-bubble--${msg.role}`}>
                                {msg.text}
                            </div>
                        ))}

                        {aiLoading && (
                            <div className='ai-bubble ai-bubble--ai ai-bubble--thinking'>
                                AI is thinking&hellip;
                            </div>
                        )}

                        {/* sentinel for auto-scroll – stays inside the scroll region */}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Editable suggestion card – OUTSIDE the scroll area so it is never clipped */}
                    {suggestionVisible && (
                        <div className='ai-suggestion-card'>
                            <label className='ai-suggestion-label' htmlFor='ai-suggestion-textarea'>
                                Edit suggestion before using:
                            </label>
                            <textarea
                                id='ai-suggestion-textarea'
                                className='ai-suggestion-textarea'
                                rows={6}
                                value={suggestion}
                                onChange={(e) => setSuggestion(e.target.value)}
                            />
                            <div className='ai-suggestion-actions'>
                                <button
                                    className='ai-btn ai-btn--primary'
                                    onClick={handleUseDescription}
                                >
                                    Use this description
                                </button>
                                <button
                                    className='ai-btn ai-btn--secondary'
                                    onClick={handleDismiss}
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Controls */}
                    <div className='ai-controls'>
                        <button
                            className='ai-btn ai-btn--generate'
                            onClick={handleGenerate}
                            disabled={!title.trim() || aiLoading}
                            aria-busy={aiLoading}
                        >
                            {aiLoading ? 'Generating…' : '✦ Generate description'}
                        </button>
                        <p className='ai-disclaimer'>
                            AI-generated content may be inaccurate. Please review before saving.
                        </p>
                    </div>
                </section>

                <div className='hero-divider'></div>

                {/* ── Task List ── */}
                <section className='tasklist-section' aria-label='Your tasks'>
                    {/* Section header */}
                    <div className='tasklist-header'>
                        <div className='tasklist-header__left'>
                            <h2 className='tasklist-heading'>Your Tasks</h2>
                            <span className='tasklist-count-badge'>
                                {tasks.length === 1 ? '1 task' : `${tasks.length} tasks`}
                            </span>
                        </div>
                    </div>
                    <p className='tasklist-subtitle'>Manage and track everything you need to do.</p>

                    {/* Empty state */}
                    {tasks.length === 0 ? (
                        <div className='tasklist-empty'>
                            <span className='tasklist-empty__icon'>📋</span>
                            <p className='tasklist-empty__text'>No tasks yet. Create your first task above.</p>
                        </div>
                    ) : (
                        <ul className='task-list'>
                            {tasks.map(task => (
                                <li key={task._id}>
                                    <div className='task-card'>
                                        {/* Purple accent bar */}
                                        <div className='task-card__accent' aria-hidden='true' />

                                        <div className='task-card__body'>
                                            <h3 className='task-card__title'>{task.title}</h3>
                                            {task.description ? (
                                                <p className='task-card__description'>{task.description}</p>
                                            ) : null}
                                        </div>

                                        <button
                                            className='task-card__delete-btn'
                                            onClick={() => handleDelete(task._id)}
                                            aria-label={`Delete task: ${task.title}`}
                                        >
                                            {/* Inline SVG trash icon */}
                                            <svg className='task-card__delete-icon' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                                                <path fillRule='evenodd' d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z' clipRule='evenodd' />
                                            </svg>
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </main>
            <Footer />
        </>
    )
}

export default TaskManager