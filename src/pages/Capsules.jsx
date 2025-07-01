import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Capsules.css'; // style as needed
import { useNavigate } from 'react-router-dom';



const Capsules = () => {
  const [capsules, setCapsules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/capsules', {
          headers: { Authorization: token },
        });
        setCapsules(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCapsules();
  }, []);

  const handleView = async (capsuleId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/capsules/${capsuleId}`, {
        headers: { Authorization: token },
      });

      if (res.data.isUnlockable) {
        navigate(`/capsules/${capsuleId}`); // You’ll build this page later
      } else {
        alert('This capsule is locked until: ' + new Date(res.data.capsule.unlockDate).toLocaleDateString());
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = async (capsuleId) => {
  if (!window.confirm('Are you sure you want to delete this capsule?')) return;

  try {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/api/capsules/${capsuleId}`, {
      headers: { Authorization: token },
    });

    setCapsules((prev) => prev.filter((c) => c._id !== capsuleId));
    alert('Capsule deleted!');
  } catch (err) {
    console.error(err);
    alert('Failed to delete capsule');
  }
};
 

  return (
    <div className="capsule-list">
      <h2>Your Capsules</h2>
      {capsules.length === 0 ? (
        <p>No capsules found.</p>
      ) : (
        <div className="capsule-grid">
          {capsules.map((capsule) => {
            const now = new Date();
            const unlockDate = new Date(capsule.unlockDate);
            const isUnlocked = now >= unlockDate;

            return (
              <div className="capsule-card" key={capsule._id}>
                <h3>{capsule.title}</h3>
                <p className={isUnlocked ? '' : 'blurred'}>
                  {capsule.message.slice(0, 100)}...
                </p>
                <p>Unlock Date: {unlockDate.toLocaleDateString()}</p>

                <button onClick={() => handleView(capsule._id)}>
                  View Capsule
                </button>

                <button onClick={() => handleDelete(capsule._id)} style={{ marginLeft: '10px' }}>
                        Delete Capsule
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Capsules;
