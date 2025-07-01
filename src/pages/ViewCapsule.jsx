import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ViewCapsule.css';

const ViewCapsule = () => {
  const { id } = useParams();
  const [capsule, setCapsule] = useState(null);
  const [isUnlockable, setIsUnlockable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCapsule = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/capsules/${id}`, {
          headers: { Authorization: token },
        });

        if (!res.data.isUnlockable) {
          alert('This capsule is locked!');
          navigate('/capsules');
        } else {
          setCapsule(res.data.capsule);
          setIsUnlockable(true);
        }
      } catch (err) {
        console.error(err);
        alert('Capsule not found or unauthorized');
        navigate('/capsules');
      }
    };

    fetchCapsule();
  }, [id, navigate]);

  if (!capsule) return <div>Loading capsule...</div>;

  return (
    <div className="view-capsule-container">
      <div className="view-capsule-box">
        <h2>{capsule.title}</h2>
        <p><strong>Message:</strong></p>
        <p className="capsule-message">{capsule.message}</p>

        <p><strong>Unlocked On:</strong> {new Date(capsule.unlockDate).toLocaleDateString()}</p>

        {capsule.file && (
          <div className="capsule-file">
            {capsule.file.endsWith('.mp4') ? (
              <video width="100%" controls>
                <source src={`http://localhost:5000/uploads/${capsule.file}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={`http://localhost:5000/uploads/${capsule.file}`}
                alt="Capsule"
                style={{ maxWidth: '100%', borderRadius: '10px' }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCapsule;
