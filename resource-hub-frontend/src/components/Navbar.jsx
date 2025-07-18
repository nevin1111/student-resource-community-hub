import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optional: clear local storage or session info
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container-fluid">
        <span
          className="navbar-brand"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/home')}
        >
          Study Resource Hub
        </span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <span
                className="nav-link"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/home')}
              >
                Home
              </span>
            </li>
            <li className="nav-item">
              <span
                className="nav-link"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/upload')}
              >
                Upload Note
              </span>
            </li>
            <li className="nav-item">
              <span
                className="nav-link text-danger"
                style={{ cursor: 'pointer' }}
                onClick={handleLogout}
              >
                Logout
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
