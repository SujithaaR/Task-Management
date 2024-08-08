import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/';

const getUsers = () => {
    return axios.get(API_URL);
};
// Fetch team leads
const getTeamLeads = async () => {
    try {
        const response = await axios.get(`${API_URL}teamleads`);
        return response;
    } catch (error) {
        console.error('Error fetching team leads:', error);
        throw error;
    }
};

const userService = { getUsers ,getTeamLeads};
export default userService;
