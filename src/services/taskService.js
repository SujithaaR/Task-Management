import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks/';

const getTasks = () => axios.get(API_URL);
const getTasksByProjectId = (projectId) => axios.get(`${API_URL}?project=${projectId}`);
const createTask = (title, description, project, assignedTo, deadline) => axios.post(API_URL, { title, description, project, assignedTo, deadline });

export default {
    getTasks,
    getTasksByProjectId,
    createTask,
};


