import axios from 'axios';

const API_URL = 'http://localhost:5000/api/projects';

// Get projects created by the logged-in admin
const getProjectsByAdmin = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    const response = await axios.get(`${API_URL}`, {
        headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type":"application/json",
        },
    });
    return response;
};

// Get projects assigned to the logged-in team lead
const getProjectsByTeamLead = async () => {

   const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.get(`${API_URL}/teamlead/projects`, {
        headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type":"application/json",
        },
    });
    return response;
};
// Create a new project (Admin only)
const createProject = async (name, description, owner) => {
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : '';
    console.log(token);
    
    
    try {
        const response = await axios.post(API_URL, { name, description, owner }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("res" + response.data);
        return response;
    } catch (error) {
        console.error('Error creating project:', error.response?.data || error.message);
        throw error;
    }
};

// Export functions
export default {
    getProjectsByAdmin,
    getProjectsByTeamLead,
    createProject, 
};

