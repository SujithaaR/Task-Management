import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import taskService from '../services/taskService';
import ProjectService from '../services/projectService';
import TaskForm from './TaskForm';

const TaskManagement = () => {
    const { projectId } = useParams(); // Get project ID from URL
    const [tasks, setTasks] = useState([]);
    const [showTaskForm, setShowTaskForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const taskRes = await taskService.getTasksByProject(projectId);
                if (taskRes && taskRes.data) {
                    setTasks(taskRes.data);
                } else {
                    setTasks([]);
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
                setTasks([]);
            }
        };

        fetchTasks();
    }, [projectId]);

    const handleAddTask = async (task) => {
        try {
            await taskService.createTask(task.title, task.description, projectId, task.assignedTo, task.deadline);
            const updatedTasks = await taskService.getTasksByProject(projectId);
            if (updatedTasks && updatedTasks.data) {
                setTasks(updatedTasks.data);
            }
            setShowTaskForm(false);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Task Management</h2>

            <div className="text-center mb-4">
                <button className="btn btn-primary" onClick={() => setShowTaskForm(true)}>+ Add Task</button>
            </div>

            <div className="row">
                {tasks.length === 0 ? (
                    <p className="text-center">No tasks found.</p>
                ) : (
                    tasks.map(task => (
                        <div key={task._id} className="col-md-4 mb-4">
                            <div className="card shadow-sm border-light">
                                <div className="card-body">
                                    <h5 className="card-title">Title: {task.title}</h5>
                                    <p className="card-text">Description: {task.description}</p>
                                    <p className="card-text"><strong>Assigned To: </strong>{task.assignedTo.username}</p>
                                    <p className="card-text"><strong>Deadline: </strong>{new Date(task.deadline).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {showTaskForm && (
                <TaskForm 
                    onSubmit={handleAddTask}
                    onClose={() => setShowTaskForm(false)}
                    projectId={projectId}
                />
            )}
        </div>
    );
};

export default TaskManagement;
