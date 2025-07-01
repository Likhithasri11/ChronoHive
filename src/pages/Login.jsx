import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, formData);
    localStorage.setItem('token', res.data.token);
    navigate('/dashboard');
  } catch (err) {
    console.error(err.response?.data || err.message);
    setError(err.response?.data?.msg || 'Login failed');
  }
};

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };



  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login to ChronoHive</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>

        {error && <p className="error">{error}</p>}

        <p className="register-link" onClick={() => navigate('/register')}>
          Don't have an account? Register
        </p>
      </form>
    </div>
  );
};

export default Login;
