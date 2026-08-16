
const BASE_URL = 'http://localhost:3000';

export const getTask = () => fetch(`${BASE_URL}/tasks`).then(res => res.json());

export const createTask = (taskData) =>
  fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  }).then(res => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  });

export const deleteTask = (taskId) => 
  fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: 'DELETE',
  }).then(res => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  });
