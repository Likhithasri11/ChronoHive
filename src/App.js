import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateCapsule from './pages/CreateCapsule';
import Capsules from './pages/Capsules';
import ViewCapsule from './pages/ViewCapsule.jsx'


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create" element={<CreateCapsule />} />
      <Route path="/capsules" element={<Capsules />} />
      <Route path="/capsules/:id" element={<ViewCapsule />} />



    </Routes>
  );
};

export default App;
