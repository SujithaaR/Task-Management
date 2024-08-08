
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/projects/';

const getProjects = () => {
    return axios.get(API_URL);
};

const getProjectById = (id) => {
    return axios.get(`${API_URL}${id}`);
};

const createProject = (name, description, owner) => {
    return axios.post(API_URL, { name, description, owner });
};

const projectService = {
    getProjects,
    getProjectById,
    createProject,
};

export default projectService;



