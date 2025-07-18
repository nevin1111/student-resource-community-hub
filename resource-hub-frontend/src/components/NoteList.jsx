import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import NavBar from './Navbar';

const NoteList = () => {
  const location = useLocation();
  const { departmentCode, semester, subjectName } = location.state || {};

  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (departmentCode && semester && subjectName) {
      axios.get('http://localhost:4000/viewnotes', {
        params: { departmentCode, semester, subjectName }
      })
        .then(res => {
          if (res.data && res.data.length > 0) {
            setNotes(res.data);
          } else {
            setMessage('No notes found for this subject.');
          }
        })
        .catch(() => setMessage('Error fetching notes.'));
    }
  }, [departmentCode, semester, subjectName]);

  const handleDownload = (fileUrl) => {
    window.open(`http://localhost:4000/${fileUrl}`, '_blank');
  };

  const handleUpvote = (noteId) => {
    axios.post(`http://localhost:4000/upvote/${noteId}`)
      .then(() => {
        const updatedNotes = notes.map(note => {
          if (note._id === noteId) {
            return { ...note, upvotes: note.upvotes + 1 };
          }
          return note;
        });
        setNotes(updatedNotes);
      })
      .catch(() => alert('Failed to upvote.'));
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <h3 className="mb-4 text-center">
          Notes for {subjectName} - Sem {semester}, {departmentCode}
        </h3>

        {message && <div className="alert alert-info text-center">{message}</div>}

        <div className="row">
          {notes.map(note => (
            <div className="col-md-4 mb-4" key={note._id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{note.title}</h5>
                  <p className="card-text">
                    <strong>Uploaded By:</strong> {note.uploadedBy} <br />
                    <strong>Uploaded On:</strong> {new Date(note.uploadDate).toLocaleDateString()}
                  </p>
                  <p className="card-text">
                    <strong>Upvotes:</strong> {note.upvotes} <br />
                    <strong>Downloads:</strong> {note.downloadCount}
                  </p>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-sm btn-primary" onClick={() => handleDownload(note.fileUrl)}>
                      Download
                    </button>
                    <button className="btn btn-sm btn-outline-success" onClick={() => handleUpvote(note._id)}>
                      👍 Upvote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteList;
