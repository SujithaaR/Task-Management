
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import projectService from '../services/projectService';
import taskService from '../services/taskService';
import ProjectForm from './ProjectForm';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectRes = await projectService.getProjects();
                setProjects(projectRes.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    const handleProjectFormSubmit = async (newProject) => {
        try {
            await projectService.createProject(newProject.name, newProject.description, newProject.owner);
            const updatedProjects = await projectService.getProjects();
            setProjects(updatedProjects.data);
            setShowProjectForm(false);
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <div>
                <button onClick={() => setShowProjectForm(true)}>+ Add Project</button>
            </div>
            <div>
                <h3>Projects</h3>
                {projects.map((project) => (
                    <div key={project._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                        <h4>{project.name}</h4>
                        <p>{project.description}</p>
                        <p><strong>Owner:</strong> {project.owner.username}</p>
                        <Link to={`/projects/${project._id}`}>View Tasks</Link>
                    </div>
                ))}
            </div>
            {showProjectForm && <ProjectForm onSubmit={handleProjectFormSubmit} onClose={() => setShowProjectForm(false)} />}
        </div>
    );
};

export default Dashboard;


