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
      axios
        .get('http://localhost:4000/viewnotes', {
          params: { departmentCode, semester, subjectName },
        })
        .then((res) => {
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
    axios
      .post(`http://localhost:4000/upvote/${noteId}`)
      .then(() => {
        const updatedNotes = notes.map((note) =>
          note._id === noteId ? { ...note, upvotes: note.upvotes + 1 } : note
        );
        setNotes(updatedNotes);
      })
      .catch(() => alert('Failed to upvote.'));
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <h3 className="mb-4 text-center fw-bold text-primary">
          📚 Notes for {subjectName} - (Sem {semester}, {departmentCode})
        </h3>

        {message && <div className="alert alert-info text-center">{message}</div>}

        <div className="row">
          {notes.map((note) => (
            <div className="col-md-6 col-lg-4 mb-4" key={note._id}>
              <div className="card shadow-sm border-primary h-100">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title text-success">{note.title}</h5>
                    <p className="mb-1">
                      <i className="bi bi-person-circle"></i> <strong>By:</strong> {note.uploadedBy}
                    </p>
                    <p className="mb-1">
                      <i className="bi bi-calendar-event"></i> <strong>Date:</strong>{' '}
                      {new Date(note.uploadDate).toLocaleDateString()}
                    </p>
                    <p className="mb-2">
                      <i className="bi bi-bar-chart-line"></i> <strong>Upvotes:</strong> {note.upvotes} |{' '}
                      <strong>Downloads:</strong> {note.downloadCount}
                    </p>
                  </div>

                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleDownload(note.fileUrl)}
                      title="Download Note"
                    >
                      <i className="bi bi-download"></i> Download
                    </button>
                    <button
                      className="btn btn-sm btn-outline-success"
                      onClick={() => handleUpvote(note._id)}
                      title="Upvote Note"
                    >
                      <i className="bi bi-hand-thumbs-up"></i> Upvote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {notes.length > 0 && (
          <p className="text-center text-muted mt-4">
            Showing {notes.length} note{notes.length > 1 ? 's' : ''} for this subject.
          </p>
        )}
      </div>
    </div>
  );
};

export default NoteList;
