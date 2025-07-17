import React from 'react';
import { useNavigate } from 'react-router-dom';

const departments = [
    { code: 'CSE', name: 'Computer Science & Engineering' },
    { code: 'ECE', name: 'Electronics & Communication' },
    { code: 'ME', name: 'Mechanical Engineering' },
    { code: 'CE', name: 'Civil Engineering' },
    { code: 'EEE', name: 'Electrical & Electronics' },
    { code: 'IT', name: 'Information Technology' }
];

const Home = () => {
    const navigate = useNavigate();

    const handleClick = (deptCode) => {
        navigate(`/semesters/${deptCode}`);
    };

    return (
         <div className="container mt-5">
      <h3 className="text-center mb-4">Select Your Department</h3>
      <div className="row justify-content-center">
        {departments.map((dept, index) => (
          <div className="col-md-4 mb-4 d-flex justify-content-center" key={index}>
            <div
              className="card text-bg-success shadow"
              style={{
                width: '250px',
                height: '170px',
                cursor: 'pointer',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              onClick={() => handleClick(dept.code)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              }}
            >
              <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
                <h5 className="card-title">{dept.name}</h5>
                <p className="card-text">Code: {dept.code}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
};

export default Home;
