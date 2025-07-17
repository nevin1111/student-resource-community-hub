import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            alert("Both fields are required");
            return;
        }

        axios.post('http://localhost:4000/login', formData)
            .then(res => {
                if (res.data.status === 'success') {
                    alert('Login successful!');
                    navigate('/home');
                } else {
                    alert('Invalid email or password');
                }
            })
            .catch(() => {
                alert('Error occurred during login');
            });
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ width: '400px', borderRadius: '20px' }}>
                <h2 className="text-center mb-4 text-success">Login</h2>
                <form onSubmit={handleSubmit}>

                    <div className="input-group mb-3">
                        <span className="input-group-text bg-success text-white">
                            <i className="bi bi-envelope-fill"></i>
                        </span>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            required
                        />
                    </div>

                    <div className="input-group mb-4">
                        <span className="input-group-text bg-success text-white">
                            <i className="bi bi-lock-fill"></i>
                        </span>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-success w-100 mb-2">
                        Login
                    </button>

                    <p className="text-center small">
                        Don’t have an account? <Link to="/">Register here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
