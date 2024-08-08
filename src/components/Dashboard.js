import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import projectService from '../services/projectService';
import authService from '../services/authService';
import taskService from '../services/taskService';
import ProjectForm from './ProjectForm';
import TaskForm from './TaskForm';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
     const [showTaskForm, setShowTaskForm] = useState(false);
    const [userRole, setUserRole] = useState('user'); // Default to 'user'
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const user = authService.getCurrentUser();
                if (user && user.user) {
                    const userRole = user.user.role;
                    setUserRole(userRole); // Set user role
                    
                    let projectRes;
                    if (userRole === 'admin') {
                        projectRes = await projectService.getProjectsByAdmin();
                    } else if (userRole === 'teamlead') {
                        projectRes = await projectService.getProjectsByTeamLead();
                    }
               
                    if (projectRes && projectRes.data) {
                        setProjects(projectRes.data);
                    } else {
                        console.error('No data found in response');
                        setProjects([]);
                    }
                } else {
                    navigate('/login'); // Redirect if no user found
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
                setProjects([]); // Set to empty array on error
            }
        };

        fetchProjects();

    }, []);
    

    

    const handleProjectFormSubmit = async (newProject) => {
        try {
            const response = await projectService.createProject(newProject.name, newProject.description, newProject.owner);
            console.log('Project created:', response.data);
    
            const updatedProjects = await projectService.getProjectsByAdmin();
            if (updatedProjects && updatedProjects.data) {
                setProjects(updatedProjects.data);
            }
            console.log(projects);
            setShowProjectForm(false);
        } catch (error) {
            console.error('Error creating project:', error.response ? error.response.data : error.message);
        }
    };
    

    const handleAddTask = async (task) => {
        try {
            await taskService.createTask(task.title, task.description, task.project, task.assignedTo, task.deadline);
            const updatedProjects = await projectService.getProjectsByTeamLead();
            if (updatedProjects && updatedProjects.data) {
                setProjects(updatedProjects.data);
            }
            setShowTaskForm(false);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleShowTasks = (project) => {
        setSelectedProject(project);
        setShowTaskForm(true);
    };
    // const handleShowTasks = (project) => {
    //     navigate(`/tasks/${project._id}`); // Navigate to the Task Management Page with project ID
    // };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Dashboard</h2>

            {userRole === 'admin' && (
                <div className="text-center mb-4">
                    <button className="btn btn-primary" onClick={() => setShowProjectForm(true)}>+ Add Project</button>
                </div>
            )}

            <div className="row">
                {projects.length === 0 ? (
                    <p className="text-center">No projects found.</p>
                ) : (
                    projects.map(project => (
                        <div key={project._id} className="col-md-4 mb-4">
                            <div className="card shadow-sm border-light">
                                <div className="card-body">
                                    <h5 className="card-title">Title: {project.name}</h5>
                                    <p className="card-text">Description: {project.description}</p>
                                    <p className="card-text">TeamLead: {project.owner.username}</p>
                                    {userRole !== 'user' && (
                                        <button 
                                            className="btn btn-outline-primary"
                                            onClick={() => handleShowTasks(project)}
                                        >
                                            view Tasks
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {showProjectForm && (
                <ProjectForm 
                    onSubmit={handleProjectFormSubmit}
                    onClose={() => setShowProjectForm(false)}
                />
            )}

            {showTaskForm && selectedProject && (
                <TaskForm 
                    onSubmit={handleAddTask}
                    onClose={() => setShowTaskForm(false)}
                    projectId={selectedProject._id}
                />
            )}
        </div>
    );
};

export default Dashboard;



