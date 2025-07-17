import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SubjectList = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { code: departmentCode, semester } = location.state || {};

  // You can fetch from backend later. For now, example static subjects
  const subjects = [
    'Mathematics',
    'Data Structures',
    'Computer Networks',
    'Operating Systems',
    'Database Management Systems'
  ];

  const handleSubjectClick = (subjectName) => {
    navigate('/notes', {
      state: {
        department: departmentCode,
        semester: semester,
        subject: subjectName
      }
    });
  };

  if (!departmentCode || !semester) {
    return <h5 className="text-center text-danger mt-4">Invalid access — missing department or semester info</h5>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">
        Subjects - {departmentCode}, Semester {semester}
      </h2>
      <div className="row justify-content-center">
        {subjects.map((subject, index) => (
          <div
            key={index}
            className="card text-bg-warning m-3"
            style={{
              maxWidth: '18rem',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
            }}
            onClick={() => handleSubjectClick(subject)}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <div className="card-body text-center">
              <h5 className="card-title">{subject}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectList;
