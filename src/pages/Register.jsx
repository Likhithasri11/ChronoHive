import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/register', // 🔁 Replace with deployed URL in prod
        formData
      );

      console.log('✅ Registered successfully:', res.data);
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      console.error('❌ Registration failed:', err.response?.data || err.message);
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create Your ChronoHive Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={handleChange}
        />

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

        <button type="submit">Register</button>

        {error && <p className="error">{error}</p>}

        <p className="login-link" onClick={() => navigate('/login')}>
          Already have an account? Login
        </p>
      </form>
    </div>
  );
};

export default Register;
