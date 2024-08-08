import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/';

const getUsers = () => {
    return axios.get(API_URL);
};

const userService = { getUsers };
export default userService;
