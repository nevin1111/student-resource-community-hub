import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <div className="container mt-4">
      <h2 className="text-center mb-4">Select Department</h2>
      <div className="row justify-content-center">
        {departments.map((dept, index) => (
          <div
            key={index}
            className="card text-bg-success m-3"
            style={{
              maxWidth: '18rem',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
            }}
            onClick={() => handleClick(dept)}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <div className="card-body text-center">
              <h5 className="card-title">{dept.name}</h5>
              <p className="card-text">{dept.code} Department</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
