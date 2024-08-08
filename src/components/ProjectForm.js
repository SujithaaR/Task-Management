import React, { useState, useEffect } from 'react';
import userService from '../services/userService';

const ProjectForm = ({ onSubmit, onClose }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [owner, setOwner] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await userService.getUsers();
                setUsers(res.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, description, owner });
    };

    return (
        <div>
            <h2>Create Project</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                
                <label>Description:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                
                <label>Owner:</label>
                <select value={owner} onChange={(e) => setOwner(e.target.value)} required>
                    <option value="">Select Owner</option>
                    {users.map(user => (
                        <option key={user._id} value={user._id}>{user.username}</option>
                    ))}
                </select>
                
                <button type="submit" onClick={handleSubmit}>Submit</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default ProjectForm;




