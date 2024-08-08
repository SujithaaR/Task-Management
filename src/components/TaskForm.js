import React, { useState, useEffect } from 'react';
import userService from '../services/userService';

const TaskForm = ({ onSubmit, onClose, projectId }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [deadline, setDeadline] = useState('');
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
        onSubmit({ title, description, project: projectId, assignedTo, deadline });
    };

    return (
        <div>
            <h2>Create Task</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                
                <label>Description:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                
                <label>Assigned To:</label>
                <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required>
                    <option value="">Select User</option>
                    {users.map(user => (
                        <option key={user._id} value={user._id}>{user.username}</option>
                    ))}
                </select>

                <label>Deadline:</label>
                <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
                
                <button type="submit">Submit</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default TaskForm;











