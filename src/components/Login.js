// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import authService from '../services/authService';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             await authService.login(email, password);
//             window.location.href = '/dashboard'; // Redirect to dashboard on successful login
//         } catch (err) {
//             setError('Failed to login. Please check your credentials.');
//         }
//     };

//     return (
//         <div className="container">
//             <div className="row justify-content-center">
//                 <div className="col-md-6 col-lg-4">
//                     <div className="card mt-5">
//                         <div className="card-body">
//                             <h2 className="card-title text-center mb-4">Login</h2>
//                             {error && <p className="text-danger text-center mb-3">{error}</p>}
//                             <form onSubmit={handleLogin}>
//                                 <div className="form-group">
//                                     <label htmlFor="email">Email</label>
//                                     <input
//                                         type="email"
//                                         id="email"
//                                         className="form-control"
//                                         placeholder="Enter your email"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="password">Password</label>
//                                     <input
//                                         type="password"
//                                         id="password"
//                                         className="form-control"
//                                         placeholder="Enter your password"
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 <button type="submit" className="btn btn-primary btn-block mt-3">Login</button>
//                             </form>
//                             <p className="text-center mt-3">
//                                 Don't have an account? <Link to="/signup">Sign up here</Link>
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.login(email, password);
            if (response.token) {
                navigate('/dashboard'); // Redirect to dashboard on successful login
            } else {
                setError('Failed to login. Please check your credentials.');
            }
        } catch (err) {
            setError('Failed to login. Please check your credentials.');
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Login</h2>
                            {error && <p className="text-danger text-center mb-3">{error}</p>}
                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-3">Login</button>
                            </form>
                            <p className="text-center mt-3">
                                Don't have an account? <Link to="/signup">Sign up here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;



