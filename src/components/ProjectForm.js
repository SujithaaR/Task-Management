import React, { useState, useEffect } from 'react';
import userService from '../services/userService';

const ProjectForm = ({ onSubmit, onClose }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [owner, setOwner] = useState('');
    const [teamLeads, setTeamLeads] = useState([]); // State to hold team leads
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchTeamLeads = async () => {
            try {
                const response = await userService.getTeamLeads();
                setTeamLeads(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching team leads:', error);
                setLoading(false);
            }
        };

        fetchTeamLeads();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, description, owner });
    };

    return (
        <div className="modal show d-block" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Project</h5>
                        <button type="button" className="close" onClick={onClose}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Project Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="owner">TeamLead</label>
                                <select
                                    id="owner"
                                    className="form-control"
                                    value={owner}
                                    onChange={(e) => setOwner(e.target.value)}
                                    required
                                >
                                    <option value="">Select Team Lead</option>
                                    {loading ? (
                                        <option>Loading...</option>
                                    ) : (
                                        teamLeads.map((lead) => (
                                            <option key={lead._id} value={lead._id}>
                                                {lead.username} ({lead.role})
                                            </option>
                                        ))
                                    )}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Add Project</button>
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectForm;
