
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import projectService from '../services/projectService';
import taskService from '../services/taskService';
import TaskForm from './TaskForm';

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [showTaskForm, setShowTaskForm] = useState(false);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const projectRes = await projectService.getProjectById(id);
                setProject(projectRes.data);
                
                const taskRes = await taskService.getTasksByProjectId(id);
                setTasks(taskRes.data);
            } catch (error) {
                console.error('Error fetching project details:', error);
            }
        };

        fetchProjectDetails();
    }, [id]);

    const handleAddTask = async (task) => {
        try {
            await taskService.createTask(task.title, task.description, task.project, task.assignedTo, task.deadline);
            const updatedTasks = await taskService.getTasksByProjectId(id);
            setTasks(updatedTasks.data);
            setShowTaskForm(false);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    if (!project) return <div>Loading...</div>;

    return (
        <div>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <p><strong>Owner:</strong> {project.owner.username}</p>
            
            <h3>Tasks</h3>
            {tasks.length === 0 ? (
                <p>No tasks found for this project.</p>
            ) : (
                <ul>
                    {tasks.map(task => (
                        <li key={task._id}>
                            <p><strong>Title:</strong> {task.title}</p>
                            <p><strong>Description:</strong> {task.description}</p>
                            <p><strong>Assigned To:</strong> {task.assignedTo.username}</p>
                            <p><strong>Status:</strong> {task.status}</p>
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={() => setShowTaskForm(true)}>Add Task</button>

            {showTaskForm && (
                <TaskForm 
                    onSubmit={handleAddTask}
                    onClose={() => setShowTaskForm(false)}
                    projectId={id}
                />
            )}
        </div>
    );
};

export default ProjectDetails;




