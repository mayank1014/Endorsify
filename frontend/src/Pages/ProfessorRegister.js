import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import '../css/ProfessorRegistration.css';
const Professor = () => {
  const [formData, setFormData] = useState({
    universityId: '',
    email: '',
    teacherId: '',
    name: '',
    signPhoto: null,
    profilePhoto: null,
    qualification: '',
    subjectFields: [{ value: '' }],
    experience: '',
    portfolioURL: '',
    students: [],
  });

  const signPhotoInputRef = useRef(null);
  const profilePhotoInputRef = useRef(null);

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

  const handleSubjectChange = (index, event) => {
    const values = [...formData.subjectFields];
    values[index].value = event.target.value;
    setFormData({
      ...formData,
      subjectFields: values,
    });
  };

  const handleAddSubjectField = () => {
    setFormData({
      ...formData,
      subjectFields: [...formData.subjectFields, { value: '' }],
    });
  };

  const handleRemoveSubjectField = (index) => {
    const values = [...formData.subjectFields];
    values.splice(index, 1);
    setFormData({
      ...formData,
      subjectFields: values,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataObject = new FormData();
    for (const key in formData) {
      if (key === 'subjectFields') {
        formData[key].forEach((field, index) => {
          formDataObject.append(`subjectFields[${index}]`, field.value);
        });
      } else {
        formDataObject.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post("http://localhost:8000/submitProfessorProfile", formDataObject);
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='ProfessorBox'>
      <div className='Professor'>
        <form className="professor-profile-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className='header'>Professor Profile</div>

          <div className="form-row">
            <div className="column">
              <label htmlFor="profilePhoto">Profile Photo:</label>
              <br></br>
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
              <label htmlFor="experience">Experience:</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={(e) => handleChange(e, 'experience')}
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
              <label htmlFor="qualification">Qualification:</label>
              <textarea
                name="qualification"
                value={formData.qualification}
                onChange={(e) => handleChange(e, 'qualification')}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="column">
              <label htmlFor="portfolioURL">Portfolio URL:</label>
              <input
                type="text"
                name="portfolioURL"
                value={formData.portfolioURL}
                onChange={(e) => handleChange(e, 'portfolioURL')}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="column">
              <label htmlFor="subjectFields">Subject Expertise:</label>
              <div className="alignment">
                {formData.subjectFields.map((field, index) => (
                  <div key={index} className="form-demo">
                    <input
                      type="text"
                      name={`subjectFields[${index}]`}
                      value={field.value}
                      onChange={(e) => handleSubjectChange(index, e)}
                      required
                    />
                    {index > 0 && (
                      <button className='btn3' onClick={() => handleRemoveSubjectField(index)}>
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button className='btn3' onClick={handleAddSubjectField}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <div className='form-row'>
              <div className='column'>
                <label htmlFor='signPhoto'>Sign Photo:</label>
                <br />
                <input
                  type='file'
                  name='signPhoto'
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileInputChange(e, 'signPhoto')}
                  ref={signPhotoInputRef}
                />
                <div className='square-box' onClick={() => handleFileInputClick(signPhotoInputRef)}>
                  {formData.signPhoto ? (
                    <img src={formData.signPhoto} alt='Sign Photo' />
                  ) : (
                    <span>Add Sign Photo</span>
                  )}
                </div>
              </div>
            </div>


          </div>

          <button className='psubmitbtn' type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Professor;
