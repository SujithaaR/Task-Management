import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import ProjectDetails from './components/ProjectDetails';


const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/projects/:id" element={<ProjectDetails />} /> {/* Define route for ProjectDetails */}
               
            </Routes>
        </Router>
    );
};

export default App;

