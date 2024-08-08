import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

// Create a new task (Team Leads only)
const createTask = async (title, description, project, assignedTo, deadline) => {
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : '';
    console.log(token);
    try{
        const response = await axios.post(API_URL, { title, description, project, assignedTo, deadline },{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("res" + response.data);
        return response;
    }
    catch (error) {
        console.error('Error creating tasks:', error.response?.data || error.message);
        throw error;
    }
}
   

// Get all tasks by project ID
const getTasksByProjectId = async (projectId) => {
    const response = await axios.get(`${API_URL}/project/${projectId}`);
    return response;
};

// Update a task (Users can update tasks assigned to them; Admins can update any task)
const updateTask = async (taskId, updates) => {
    const response = await axios.put(`${API_URL}/${taskId}`, updates);
    return response;
};

// Delete a task (Admin only)
const deleteTask = async (taskId) => {
    const response = await axios.delete(`${API_URL}/${taskId}`);
    return response;
};

// Export functions
export default {
    createTask,
    getTasksByProjectId,
    updateTask,
    deleteTask
};



