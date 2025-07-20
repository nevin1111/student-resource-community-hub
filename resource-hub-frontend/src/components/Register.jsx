import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    admissionNumber: '',
    joinYear: '',
    endYear: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      name,
      email,
      password,
      confirmPassword,
      admissionNumber,
      joinYear,
      endYear,
    } = formData;

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !admissionNumber ||
      !joinYear ||
      !endYear
    ) {
      alert('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (parseInt(endYear) <= parseInt(joinYear)) {
      alert('End year must be after join year');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email format');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    axios
      .post('http://localhost:4000/register', formData)
      .then((res) => {
        if (res.data.status === 'success') {
          alert('Registration successful!');
          navigate('/login');
        } else {
          alert('Registration failed');
        }
      })
      .catch(() => {
        alert('Error occurred during registration');
      });
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: '450px', borderRadius: '20px' }}>
        <h2 className="text-center mb-4 text-success">Sign Up</h2>
        <form onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="input-group mb-3">
            <span className="input-group-text bg-success text-white">
              <i className="bi bi-person-fill"></i>
            </span>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </div>

          {/* Email */}
          <div className="input-group mb-3">
            <span className="input-group-text bg-success text-white">
              <i className="bi bi-envelope-fill"></i>
            </span>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />
          </div>

          {/* Admission Number */}
          <div className="input-group mb-3">
            <span className="input-group-text bg-success text-white">
              <i className="bi bi-123"></i>
            </span>
            <input
              type="text"
              className="form-control"
              name="admissionNumber"
              value={formData.admissionNumber}
              onChange={handleChange}
              placeholder="Admission Number"
              required
            />
          </div>

          {/* Password */}
          <div className="input-group mb-3">
            <span className="input-group-text bg-success text-white">
              <i className="bi bi-lock-fill"></i>
            </span>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="input-group mb-3">
            <span className="input-group-text bg-success text-white">
              <i className="bi bi-shield-lock-fill"></i>
            </span>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
          </div>

          {/* Join Year and End Year in same row */}
          <div className="row mb-3">
            <div className="col">
              <div className="input-group">
                <span className="input-group-text bg-success text-white">
                  <i className="bi bi-calendar-event-fill"></i>
                </span>
                <select
                  className="form-select"
                  name="joinYear"
                  value={formData.joinYear}
                  onChange={handleChange}
                  required
                >
                  <option value="">Join Year</option>
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = currentYear - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="col">
              <div className="input-group">
                <span className="input-group-text bg-success text-white">
                  <i className="bi bi-calendar-check-fill"></i>
                </span>
                <select
                  className="form-select"
                  name="endYear"
                  value={formData.endYear}
                  onChange={handleChange}
                  required
                >
                  <option value="">End Year</option>
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = currentYear + i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-success w-100 mb-2">
            Create Account
          </button>

          <p className="text-center small">
            Already have an account? <Link to="/Login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
