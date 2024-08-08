import React, { useState, useEffect } from 'react';
import userService from '../services/userService';

const TaskForm = ({ onSubmit, onClose, projectId, task }) => {
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

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setAssignedTo(task.assignedTo);
            setDeadline(task.deadline ? new Date(task.deadline).toISOString().substring(0, 10) : '');
        } else {
            setTitle('');
            setDescription('');
            setAssignedTo('');
            setDeadline('');
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ _id: task ? task._id : undefined, title, description, project: projectId, assignedTo, deadline });
    };

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ display: 'block', opacity: 1 }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{task ? 'Edit Task' : 'Create Task'}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Title:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Assigned To:</label>
                                <select
                                    className="form-select"
                                    value={assignedTo}
                                    onChange={(e) => setAssignedTo(e.target.value)}
                                    required
                                >
                                    <option value="">Select User</option>
                                    {users.map(user => (
                                        <option key={user._id} value={user._id}>{user.username}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Deadline:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskForm;












