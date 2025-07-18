import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './Navbar';

const SubjectList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);

  const departmentCode = location.state?.code;
  const semester = location.state?.semester;

  useEffect(() => {
    if (departmentCode && semester) {
      axios.get(`http://localhost:4000/subjects/${departmentCode}/${semester}`)
        .then(res => setSubjects(res.data))
        .catch(err => console.error('Error fetching subjects:', err));
    }
  }, [departmentCode, semester]);

  const handleClick = (subjectName) => {
    navigate(`/notes`, {
      state: {
        departmentCode,
        semester,
        subjectName,
      }
    });
  };

  return (
    <div>
        <NavBar/>
    <div className="container mt-4">
      <h2 className="text-center mb-4">Select Subject</h2>
      <div className="row justify-content-center">
        {subjects.map((sub, index) => (
          <div
            key={index}
            className="card text-bg-success m-3"
            style={{ maxWidth: '18rem', cursor: 'pointer' }}
            onClick={() => handleClick(sub.subjectName)}
          >
            <div className="card-body text-center">
              <h5 className="card-title">{sub.subjectName}</h5>
              <p className="card-text">View & upload notes</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default SubjectList;
