import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './Navbar';

const Home = () => {
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:4000/departments')
            .then((res) => setDepartments(res.data))
            .catch((err) => console.error('Failed to fetch departments:', err));
    }, []);

    const handleClick = (dept) => {
        navigate('/semesters', { state: { code: dept.code } });
    };

    return (
        <div className="vh-100 d-flex flex-column">
            <NavBar />
            <div className="container-fluid mt-4">
                <h2 className="text-center mb-4">Select Department</h2>
                <div className="row">
                    {departments.map((dept, index) => (
                        <div
                            key={index}
                            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                        >
                            <div
                                className="card text-bg-success h-100"
                                style={{
                                    cursor: 'pointer',
                                    minHeight: '140px',
                                    transition: 'transform 0.2s',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center'
                                }}
                                onClick={() => handleClick(dept)}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                            >
                                <div className="card-body" style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center'
                                }}>
                                    <h5 className="card-title">{dept.code}</h5>
                                    <p className="card-text">{dept.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
