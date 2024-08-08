// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import authService from '../services/authService';

// const Signup = () => {
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         try {
//             await authService.register(username, email, password);
//             setSuccess('User registered successfully. You can now log in.');
//             setError('');
//         } catch (err) {
//             setError('Failed to register. Please try again.');
//             setSuccess('');
//         }
//     };

   
//     return (
//         <div className="container">
//             <div className="row justify-content-center">
//                 <div className="col-md-6 col-lg-4">
//                     <div className="card mt-5">
//                         <div className="card-body">
//                             <h2 className="card-title text-center mb-4">Signup</h2>
//                             {error && <p className="text-danger text-center mb-3">{error}</p>}
//                             {success && <p className="text-success text-center mb-3">{success}</p>}
//                             <form onSubmit={handleSignup}>
//                                 <div className="form-group mb-1">
//                                     <label htmlFor="username">Username</label>
//                                     <input
//                                         type="text"
//                                         id="username"
//                                         className="form-control mt-1.5"
//                                         placeholder="Enter your username"
//                                         value={username}
//                                         onChange={(e) => setUsername(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="form-group mb-1">
//                                     <label htmlFor="email">Email</label>
//                                     <input
//                                         type="email"
//                                         id="email"
//                                         className="form-control mt-1.5"
//                                         placeholder="Enter your email"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="form-group mb-1">
//                                     <label htmlFor="password">Password</label>
//                                     <input
//                                         type="password"
//                                         id="password"
//                                         className="form-control mt-1.5"
//                                         placeholder="Enter your password"
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 <button type="submit" className="btn btn-primary btn-block mt-3">Signup</button>
//                             </form>
//                             <p className="text-center mt-3">
//                                 Already have an account? <Link to="/">Log in here</Link>
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Signup;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await authService.register(username, email, password, role);
            setSuccess('User registered successfully. You can now log in.');
            setError('');
        } catch (err) {
            setError('Failed to register. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Signup</h2>
                            {error && <p className="text-danger text-center mb-3">{error}</p>}
                            {success && <p className="text-success text-center mb-3">{success}</p>}
                            <form onSubmit={handleSignup}>
                                <div className="form-group mb-1">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        className="form-control mt-1.5"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-1">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control mt-1.5"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-1">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control mt-1.5"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-1">
                                    <label htmlFor="role">Role</label>
                                    <select
                                        id="role"
                                        className="form-control mt-1.5"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        required
                                    >
                                        <option value="user">User</option>
                                        <option value="teamlead">Team Lead</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-3">Signup</button>
                            </form>
                            <p className="text-center mt-3">
                                Already have an account? <Link to="/">Log in here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
