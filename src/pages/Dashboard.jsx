import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <button className="logout-button-top" onClick={handleLogout}>🚪 Logout</button>

      <div className="dashboard-card">
        <h2 className="dashboard-title">Welcome back to ChronoHive!</h2>
        <p className="dashboard-subtitle">Preserve your moments, unlock them in the future.</p>

        <div className="dashboard-sections">
          <div className="dashboard-actions">
            <button onClick={() => navigate('/create')}>➕ Create Capsule</button>
            <button onClick={() => navigate('/capsules')}>📦 View Capsules</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
