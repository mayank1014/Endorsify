import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import '../css/StudentRegistration.css';

const StudentRegistration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    universityId: '',
    email: '',
    name: '',
    gender: '', 
    profilePhoto: null,
    transcriptPhoto: null, 
    passingYear: '',
    branch: '',
    collegeID: '',
    university: '',
    teachers: [],
  });
  const [allUniversities, setAllUniversities] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/universities/getAllUniversities")
      .then((response) => {
        setAllUniversities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching universities:", error);
      });
  }, []);

  const profilePhotoInputRef = useRef(null);
  const transcriptInputRef = useRef(null); // Changed from transcriptPhotoInputRef

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
      const user = {
        email: location.state.email,
        password: location.state.password,
        confirmPassword: location.state.confirmPassword,
        role: "student",
      };

      formData.email = location.state.email;

      for (var i = 0; i < allUniversities.length; i++) {
        if (allUniversities[i].name === formData.university) {
          formData.universityId = allUniversities[i]._id;
          break;
        }
      }

      // No need to split base64 strings for profile photo and transcript

      await axios.post("http://localhost:8000/api/users/register", user);
      try {
        const response = await axios.post("http://localhost:8000/api/students/register", formData);
        if (response.data.error === 1) {
          await axios.post("http://localhost:8000/api/users/deleteuser", user);

          message.error("User with the same College ID already exists");

          setTimeout(() => {
            window.location.href = "/register/student";
          }, 500);
        } else if (response.data.error === 0) {
          message.success("Registration Successful");

          setTimeout(() => {
            navigate("/professor/home");
          }, 500);
        }
      } catch (error) {
        await axios.post("http://localhost:8000/api/users/deleteuser", user);
        console.log(1)
        message.error("Something went wrong, Please try again");

        setTimeout(() => {
          window.location.href = "/register/student";
        }, 500);
      }
    } catch (error) {
      console.log(2)
      message.error("Something went wrong");
      console.log(error);

      setTimeout(() => {
        window.location.href = "/";
      }, 500);
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
          <select
            name="university"
            value={formData.university}
            onChange={(e) => handleChange(e, "university")}
          >
            <option value="">Select University</option>
            {allUniversities.map((university) => (
              <option key={university._id} value={university.name}>
                {university.name}
              </option>
            ))}
          </select>
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
          <label htmlFor="gender">Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={(e) => handleChange(e, 'gender')}
          >
            <option value="">Select</option>
            <option value="He">He</option>
            <option value="She">She</option>
            <option value="They">They</option>
          </select>
        </div>
        <div className="column">
          <label htmlFor="transcriptPhoto">Transcript:</label>
          <br />
          <input
            type="file"
            name="transcriptPhoto"
            style={{ display: 'none' }}
            onChange={(e) => handleFileInputChange(e, 'transcriptPhoto')}
            ref={transcriptInputRef}
          />
          <div className='square-box' onClick={() => handleFileInputClick(transcriptInputRef)}>
            {formData.transcriptPhoto ? (
              <img src={formData.transcriptPhoto} alt="Transcript" />
            ) : (
              <span>Add Transcript</span>
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
