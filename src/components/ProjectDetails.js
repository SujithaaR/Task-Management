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
    const [editingTask, setEditingTask] = useState(null);

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

    const handleUpdateTask = async (task) => {
        try {
            await taskService.updateTask(task._id, task);
            const updatedTasks = await taskService.getTasksByProjectId(id);
            setTasks(updatedTasks.data);
            setEditingTask(null);
            setShowTaskForm(false);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await taskService.deleteTask(taskId);
            const updatedTasks = await taskService.getTasksByProjectId(id);
            setTasks(updatedTasks.data);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    if (!project) return <div className="text-center">Loading...</div>;

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">{project.name}</h2>
            <p className="text-center mb-4">{project.description}</p>
            <p className="text-center mb-4"><strong>Owner:</strong> {project.owner.username}</p>
            
            <div className="text-center mb-4">
                <button className="btn btn-primary" onClick={() => { setEditingTask(null); setShowTaskForm(true); }}>+ Add Task</button>
            </div>

            <div className="row">
                {tasks.length === 0 ? (
                    <p className="text-center">No tasks found for this project.</p>
                ) : (
                    tasks.map(task => (
                        <div key={task._id} className="col-md-4 mb-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{task.title}</h5>
                                    <p className="card-text">{task.description}</p>
                                    <p className="card-text"><strong>Assigned To:</strong> {task.assignedTo.username}</p>
                                    <p className="card-text"><strong>Status:</strong> {task.status}</p>
                                    <button className="btn btn-warning me-2" onClick={() => { setEditingTask(task); setShowTaskForm(true); }}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDeleteTask(task._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {showTaskForm && (
                <TaskForm 
                    onSubmit={editingTask ? handleUpdateTask : handleAddTask}
                    onClose={() => setShowTaskForm(false)}
                    projectId={id}
                    task={editingTask}  // Pass the task being edited to TaskForm
                />
            )}
        </div>
    );
};

export default ProjectDetails;

