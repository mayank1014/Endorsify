// import React, { useState } from 'react';
// import '../css/UniversityRegister.css';

// const UniversityRegister = () => {
//   const [formData, setFormData] = useState({
//     universityId: '',
//     name: '',
//     email: '',
//     location: '',
//     website: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);  
//   };

//   return (
//     <div className="university-form-container">
//       <h2>University Registration</h2>
//       <form className="university-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="universityId">University ID:</label>
//           <input type="text" id="universityId" name="universityId" value={formData.universityId} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="name">Name:</label>
//           <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email:</label>
//           <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="location">Location:</label>
//           <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="website">Website URL:</label>
//           <input type="url" id="website" name="website" value={formData.website} onChange={handleChange} />
//         </div>
//         <button type="submit" className="submit-button">Register</button>
//       </form>
//     </div>
//   );
// };

// export default UniversityRegister;
import React, { useState } from 'react';
import axios from 'axios';
import '../css/UniversityRegistration.css';

const UniversityRegistration = () => {
  const [formData, setFormData] = useState({
    uniId: '',
    email: '',
    name: '',
    location: '',
    websiteURL: '',
  });

  const handleInputChange = (event, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(formData)
    try {
      const response = await axios.post("http://localhost:8000/api/universities/register", formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='UniversityBox'>
      <div className='University'>
        <form className="university-profile-form" onSubmit={handleSubmit}>
          <div className='header'>University Registration</div>

          <div className="form-row">
            
            <label htmlFor="universityId">University ID:</label>
            <input
              type="text"
              name="uniId"
              value={formData.uniId}
              onChange={(e) => handleInputChange(e, 'uniId')}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleInputChange(e, 'email')}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => handleInputChange(e, 'name')}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={(e) => handleInputChange(e, 'location')}
            />
          </div>

          <div className="form-row">
            <label htmlFor="websiteURL">Website URL:</label>
            <input
              type="text"
              name="websiteURL"
              value={formData.websiteURL}
              onChange={(e) => handleInputChange(e, 'websiteURL')}
            />
          </div>

          <button className='submitbtn' type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default UniversityRegistration;
