import React, { useState } from 'react';
import './CreateCapsule.css';
import axios from 'axios';

const CreateCapsule = () => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    unlockDate: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // assuming it's stored

      const data = new FormData();
      data.append('title', formData.title);
      data.append('message', formData.message);
      data.append('unlockDate', formData.unlockDate);
      if (formData.file) {
        data.append('file', formData.file);
      }

      const res = await axios.post('http://localhost:5000/api/capsules', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      });

      alert('Capsule created successfully!');
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to create capsule');
    }
  };

  return (
    <div className="capsule-container">
      <form className="capsule-form" onSubmit={handleSubmit}>
        <h2>Create New Time Capsule</h2>

        <input
          type="text"
          name="title"
          placeholder="Capsule Title"
          required
          value={formData.title}
          onChange={handleChange}
        />

        <textarea
          name="message"
          placeholder="Write your memory or message..."
          rows="5"
          required
          value={formData.message}
          onChange={handleChange}
        ></textarea>

        <input
          type="date"
          name="unlockDate"
          required
          value={formData.unlockDate}
          onChange={handleChange}
        />

        <input
          type="file"
          name="file"
          accept="image/*,video/*"
          onChange={handleChange}
        />

        <button type="submit">📩 Submit Capsule</button>
      </form>
    </div>
  );
};

export default CreateCapsule;
