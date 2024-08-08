import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

const register = (username, email, password, role) => {
    return axios.post(API_URL + 'register', { username, email, password, role });
};

const login = async (email, password) => {
    const response = await axios.post(`${API_URL}login`, { email, password });
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
   
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.user) {
        console.log('User Role:', user.user.role); // Access role correctly
    } else {
        console.error('User data is not in expected format.');
    }
    return user;
};

const authService = { register, login, logout,getCurrentUser };
export default authService;
