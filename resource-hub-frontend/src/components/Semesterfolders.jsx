import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './Navbar';

const SemesterFolders = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [semesters, setSemesters] = useState([]);
    const [departmentCode, setDepartmentCode] = useState('');

    useEffect(() => {
        if (location.state && location.state.code) {
            const deptCode = location.state.code;
            setDepartmentCode(deptCode);

            // Fetch total semesters for this department
            axios.get('http://localhost:4000/departments')
                .then(res => {
                    const dept = res.data.find(d => d.code === deptCode);
                    if (dept) {
                        const total = dept.totalSemesters;
                        const semArray = [];
                        for (let i = 1; i <= total; i++) {
                            semArray.push(`Semester ${i}`);
                        }
                        setSemesters(semArray);
                    }
                })
                .catch(err => {
                    console.error('Error fetching semesters:', err);
                });
        }
    }, [location.state]);

    const handleClick = (semesterLabel) => {
        const semesterNumber = semesterLabel.split(' ')[1]; // "Semester 1" → "1"
        navigate(`/subjects/${semesterNumber}`, {
            state: { code: departmentCode, semester: semesterNumber }
        });
    };

    const mid = Math.ceil(semesters.length / 2);
    const leftSemesters = semesters.slice(0, mid);
    const rightSemesters = semesters.slice(mid);

    return (
        <div className="vh-100 d-flex flex-column">
            <NavBar />
            <div className="container-fluid mt-4">
                <h2 className="text-center mb-4">Select Semester</h2>
                <div className="row">
                    <div className="col-md-6 d-flex flex-column align-items-center">
                        {leftSemesters.map((sem, index) => (
                            <div
                                key={index}
                                className="card text-bg-success mb-4"
                                style={{
                                    width: '300px',
                                    height: '120px',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center'
                                }}
                                onClick={() => handleClick(sem)}
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
                                    <h5 className="card-title">{sem}</h5>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="col-md-6 d-flex flex-column align-items-center">
                        {rightSemesters.map((sem, index) => (
                            <div
                                key={index}
                                className="card text-bg-success mb-4"
                                style={{
                                    width: '300px',
                                    height: '120px',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center'
                                }}
                                onClick={() => handleClick(sem)}
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
                                    <h5 className="card-title">{sem}</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SemesterFolders;
