import React, { useState } from 'react';
import axios from 'axios';
import NavBar from './Navbar';

const UploadNote = () => {
  const [title, setTitle] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [semester, setSemester] = useState('');
  const [departmentCode, setDepartmentCode] = useState('');
  const [file, setFile] = useState(null);
  const uploadedBy = localStorage.getItem('userName') || '';
  const [message, setMessage] = useState('');

  const departments = ['MCA', 'CSE', 'ECE', 'ME', 'EEE'];
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !subjectName || !semester || !departmentCode || !file) {
      setMessage('Please fill all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subjectName', subjectName);
    formData.append('semester', semester);
    formData.append('departmentCode', departmentCode); // ✅ Matches backend
    formData.append('uploadedBy', uploadedBy);
    formData.append('file', file);

    axios.post('http://localhost:4000/upload', formData)
      .then(res => {
        if (res.data.status === 'success') {
          setMessage('Note uploaded successfully!');
          setTitle('');
          setSubjectName('');
          setSemester('');
          setDepartmentCode('');
          setFile(null);
        } else {
          setMessage('Upload failed.');
        }
      })
      .catch(() => setMessage('Error uploading note.'));
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <h3 className="mb-4 text-center">Upload a Note</h3>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="border p-4 shadow rounded bg-light">

          <div className="mb-3">
            <label className="form-label">Note Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ex: Unit 1 Notes"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Subject Name</label>
            <input
              type="text"
              className="form-control"
              value={subjectName}
              onChange={e => setSubjectName(e.target.value)}
              placeholder="Ex: Operating Systems"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Semester</label>
            <select
              className="form-select"
              value={semester}
              onChange={e => setSemester(e.target.value)}
              required
            >
              <option value="">-- Select Semester --</option>
              {semesters.map((sem, idx) => (
                <option key={idx} value={sem}>{sem}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Department</label>
            <select
              className="form-select"
              value={departmentCode}
              onChange={e => setDepartmentCode(e.target.value)}
              required
            >
              <option value="">-- Select Department --</option>
              {departments.map((dept, idx) => (
                <option key={idx} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Upload File</label>
            <input
              type="file"
              className="form-control"
              accept="application/pdf,image/*"
              onChange={e => setFile(e.target.files[0])}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Upload Note</button>
        </form>

        {message && (
          <div className="alert alert-info mt-3 text-center">{message}</div>
        )}
      </div>
    </div>
  );
};

export default UploadNote;
