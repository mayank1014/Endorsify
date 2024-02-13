import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import '../css/StudentRegistration.css';

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    universityId: '',
    email: '',
    name: '',
    Gender: '', 
    profilePhoto: null,
    transcriptPhoto: null,
    passingYear: '',
    branch: '',
    collegeID: '',
    university: '',
    teachers: [],
  });

  const profilePhotoInputRef = useRef(null);
  const transcriptPhotoInputRef = useRef(null);

  const handleFileInputChange = (event, fieldName) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setFormData({
        ...formData,
        [fieldName]: event.target.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const handleChange = (event, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value,
    });
  };

  const handleFileInputClick = (inputRef) => {
    inputRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataObject = new FormData();
    for (const key in formData) {
      formDataObject.append(key, formData[key]);
    }

    try {
      const response = await axios.post("http://localhost:8000/submitStudentProfile", formDataObject);
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='StudentBox'>
      <div className='Student'>
        <form className="student-profile-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className='header'>Student Profile</div>

          <div className="form-row">
            <div className="column">
              <label htmlFor="profilePhoto">Profile Photo:</label>
              <br />
              <input
                type="file"
                name="profilePhoto"
                style={{ display: 'none' }}
                onChange={(e) => handleFileInputChange(e, 'profilePhoto')}
                ref={profilePhotoInputRef}
              />
              <div className='circle' onClick={() => handleFileInputClick(profilePhotoInputRef)}>
                {formData.profilePhoto ? (
                  <img src={formData.profilePhoto} alt="Profile Photo" />
                ) : (
                  <span>Add Profile Photo</span>
                )}
              </div>
            </div>

            <div className="column">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => handleChange(e, 'name')}
              />
              <label htmlFor="passingYear">Passing Year:</label>
              <input
                type="number"
                name="passingYear"
                value={formData.passingYear}
                onChange={(e) => handleChange(e, 'passingYear')}
              />
              <label htmlFor="university">University:</label>
              <input
                type="text"
                name="university"
                value={formData.university}
                onChange={(e) => handleChange(e, 'university')}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="column">
              <label htmlFor="collegeID">College ID:</label>
              <input
                type="text"
                name="collegeID"
                value={formData.collegeID}
                onChange={(e) => handleChange(e, 'collegeID')}
              />
              <label htmlFor="branch">Branch:</label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={(e) => handleChange(e, 'branch')}
              />
              <label htmlFor="Gender">Gender:</label>
              <select
                name="Gender"
                value={formData.Gender}
                onChange={(e) => handleChange(e, 'Gender')}
              >
                <option value="">Select</option>
                <option value="He">He</option>
                <option value="She">She</option>
                <option value="They">They</option>
              </select>
            </div>
            <div className="column">
              <label htmlFor="transcriptPhoto">Transcript Photo:</label>
              <br />
              <input
                type="file"
                name="transcriptPhoto"
                style={{ display: 'none' }}
                onChange={(e) => handleFileInputChange(e, 'transcriptPhoto')}
                ref={transcriptPhotoInputRef}
              />
              <div className='square-box' onClick={() => handleFileInputClick(transcriptPhotoInputRef)}>
                {formData.transcriptPhoto ? (
                  <img src={formData.transcriptPhoto} alt="Transcript Photo" />
                ) : (
                  <span>Add Transcript Photo</span>
                )}
              </div>
            </div>
          </div>

          <button className='submitbtn' type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default StudentRegistration;
