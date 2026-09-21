import './task.css'
import { useState, useEffect } from 'react'
import Header1 from '../Components/Header.jsx'
import Footer from '../Components/Footer.jsx'
import { getTask, createTask, deleteTask } from '../api.jsx'

function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const fetchTasks = () => {
        getTask()
            .then(res => {console.log('API response:', res.data); 
                if (Array.isArray(res.data)) {
                setTasks(res.data);
            } })
            .catch(error => console.error('Error fetching tasks:', error));
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        setSubmitting(true);
        try {
            const res = await createTask({ title, description });
            // Option A: append the new task returned by the server
            setTasks(prev => [...prev, res.data]);
            // Option B (safer if server transforms data): re-fetch instead
            // fetchTasks();

            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error creating task:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        try{
            await deleteTask(id);
            setTasks(prev => prev.filter(task => task._id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    return (
        <>
            <Header1 />
            <main>
                <div className='task-header'> 
                    <h1>Task Manager</h1>
                    <p>Welcome to the Task Manager!</p>
                </div>

                <div className='hero-divider'></div>

                <div className='create-task-form'>
                    <h2>Create Task</h2>

                    <form onSubmit={handleSubmit} className='task-form'>
                        <input className='task-input'
                            type='text'
                            placeholder='Task title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input className='task-input'
                            type='text'
                            placeholder='Task description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <button className='task-btn' type='submit' disabled={submitting}>
                            {submitting ? 'Adding...' : 'Add Task'}
                        </button>
                    </form>
                </div>

                <div className='hero-divider'></div>

                <ul className='task-list'>
                    { tasks.map(task => (
                        <li key={task._id}>
                            <div className='task-card'>
                                <div>
                                    <h3>{task.title}</h3>
                                    <p style={{ fontSize: '0.9rem' }}>{task.description}</p>
                                </div>
                                <div>
                                    <button className='task-btn' onClick={() => handleDelete(task._id)}>Delete</button>
                                </div>
                            </div>
                        </li>
                    )) }
                </ul>
            </main>
            <Footer />
        </>
    )
}

export default TaskManager