import React, { useState } from 'react';
import '../css/UniversityRegister.css';

const UniversityRegister = () => {
  const [formData, setFormData] = useState({
    universityId: '',
    name: '',
    email: '',
    location: '',
    website: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);  
  };

  return (
    <div className="university-form-container">
      <h2>University Registration</h2>
      <form className="university-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="universityId">University ID:</label>
          <input type="text" id="universityId" name="universityId" value={formData.universityId} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="website">Website URL:</label>
          <input type="url" id="website" name="website" value={formData.website} onChange={handleChange} />
        </div>
        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
};

export default UniversityRegister;
