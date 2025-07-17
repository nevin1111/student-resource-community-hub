import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  const handleClick = (semester) => {
    const formatted = semester.toLowerCase().replace(/\s/g, '');
    navigate(`/subjects/${formatted}`, { state: { code: departmentCode, semester } });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Select Semester</h2>
      <div className="row justify-content-center">
        {semesters.map((sem, index) => (
          <div
            key={index}
            className="card text-bg-success m-3"
            style={{
              maxWidth: '18rem',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
            }}
            onClick={() => handleClick(sem)}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <div className="card-body text-center">
              <h5 className="card-title">{sem}</h5>
              <p className="card-text">View subjects and upload/view notes.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SemesterFolders;
