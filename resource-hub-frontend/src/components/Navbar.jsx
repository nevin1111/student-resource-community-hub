import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm sticky-top">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold" style={{ cursor: 'pointer' }} onClick={() => navigate('/home')}>
          📘 Study Resource Hub
        </span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <button className="btn btn-outline-light me-2" onClick={() => navigate(-1)}>
                <i className="bi bi-arrow-left-circle-fill"></i> Back
              </button>
            </li>

            <li className="nav-item">
              <button className="btn btn-outline-light me-2" onClick={() => navigate('/home')}>
                <i className="bi bi-house-door-fill"></i> Home
              </button>
            </li>

            <li className="nav-item">
              <button className="btn btn-outline-light me-2" onClick={() => navigate('/upload')}>
                <i className="bi bi-upload"></i> Upload Note
              </button>
            </li>

            <li className="nav-item">
              <button className="btn btn-light text-primary fw-bold" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right"></i> Logout
              </button>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
