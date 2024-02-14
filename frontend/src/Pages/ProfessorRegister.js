import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "../css/ProfessorRegistration.css";

const ProfessorRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    university: "",
    email: "",
    teacherId: "",
    gender: "",
    name: "",
    profilePhoto: "",
    signPhoto: "",
    qualification: "",
    expertise: [""], // At least one expertise field is mandatory
    experience: "",
    portfolioURL: "",
    students: [],
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

  const signPhotoInputRef = useRef(null);
  const profilePhotoInputRef = useRef(null);

  const handleFileInputChange = (event, fieldName) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const base64String = event.target.result;
      setFormData({
        ...formData,
        [fieldName]: base64String,
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

  const handleExpertiseChange = (index, event) => {
    const values = [...formData.expertise];
    values[index] = event.target.value;
    setFormData({
      ...formData,
      expertise: values,
    });
  };

  const handleAddExpertiseField = () => {
    setFormData({
      ...formData,
      expertise: [...formData.expertise, ""],
    });
  };

  const handleRemoveExpertiseField = (index) => {
    const values = [...formData.expertise];
    values.splice(index, 1);
    setFormData({
      ...formData,
      expertise: values,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if at least one expertise field is filled
    if (formData.expertise.length === 0 || formData.expertise.some(field => field.trim() === "")) {
      message.error("Please fill at least one expertise field");
      return;
    }

    try {
      const user = {
        email: location.state.email,
        password: location.state.password,
        confirmPassword: location.state.confirmPassword,
        role: "professor",
      };

      formData.email = location.state.email;

      for (var i = 0; i < allUniversities.length; i++) {
        if (allUniversities[i].name === formData.university) {
          formData.universityId = allUniversities[i]._id;
          break;
        }
      }

      const profilePhotoBase64 = formData.profilePhoto.split(",")[1];
      const signPhotoBase64 = formData.signPhoto.split(",")[1];

      const formDataWithBase64 = {
        ...formData,
        profilePhoto: profilePhotoBase64,
        signPhoto: signPhotoBase64,
      };

      await axios.post("http://localhost:8000/api/users/register", user);

      try {
        const response = await axios.post("http://localhost:8000/api/professors/register", formDataWithBase64);

        // localStorage.setItem("user", JSON.stringify(response.data.user));

        if (response.data.error == 1) {
          await axios.post("http://localhost:8000/api/users/deleteuser", user);

          message.error("User with same College Id already exists");

          setTimeout(() => {
            window.location.href = "/register/professor";
          }, 500);
        } else if (response.data.error == 0) {
          // localStorage.setItem("user", JSON.stringify(response.data.user));

          message.success("Registration Successful");

          setTimeout(() => {
            // navigate("/professor/home");
          }, 500);
        }
      } catch (error) {
        await axios.post("http://localhost:8000/api/users/deleteuser", user);
        console.log(1)
        message.error("Something went wrong, Please try again");

        setTimeout(() => {
          window.location.href = "/register/professor";
        }, 500);
      }
    } catch (error) {
      console.log(2)
      message.error("Something went wrong");

      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    }
  };

  return (
    <div className="ProfessorBox">
      <div className="Professor">
        <form
          className="professor-profile-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="header">Professor Profile</div>
          <div className="form-row">
            <div className="column">
              <label htmlFor="profilePhoto">Profile Photo:</label>
              <br />
              <input
                type="file"
                name="profilePhoto"
                style={{ display: "none" }}
                onChange={(e) => handleFileInputChange(e, "profilePhoto")}
                ref={profilePhotoInputRef}
              />
              <div
                className="circle"
                onClick={() => handleFileInputClick(profilePhotoInputRef)}
              >
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
                onChange={(e) => handleChange(e, "name")}
              />
              <label htmlFor="teacherId">Professor ID:</label>
              <input
                type="text"
                name="teacherId"
                value={formData.teacherId}
                onChange={(e) => handleChange(e, "teacherId")}
              />
              <label htmlFor="university">University:</label>
              <select
                name="university"
                value={formData.university}
                onChange={(e) => handleChange(e, "university")}
              >
                <option value="">Select University</option>
                {allUniversities.map((university) => (
                  <option key={university.id} value={university.name}>
                    {university.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="column">
              <label htmlFor="experience">Experience:</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={(e) => handleChange(e, "experience")}
              />
            </div>

            <div className="column">
              <label htmlFor="gender">Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={(e) => handleChange(e, "gender")}
              >
                <option value="">Select</option>
                <option value="He">He</option>
                <option value="She">She</option>
                <option value="They">They</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="column">
              <label htmlFor="qualification">Qualification:</label>
              <textarea
                name="qualification"
                value={formData.qualification}
                onChange={(e) => handleChange(e, "qualification")}
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
                onChange={(e) => handleChange(e, "portfolioURL")}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="column">
              <label htmlFor="expertise">Subject Expertise:</label>
              <div className="alignment">
                {formData.expertise.map((field, index) => (
                  <div key={index} className="form-demo">
                    <input
                      type="text"
                      name={`expertise[${index}]`}
                      value={field}
                      onChange={(e) => handleExpertiseChange(index, e)}
                      required
                    />
                    {index > 0 && (
                      <button
                        className="btn3"
                        onClick={() => handleRemoveExpertiseField(index)}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button className="btn3" onClick={handleAddExpertiseField}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>

            <div className="column">
              <label htmlFor="signPhoto">Sign Photo:</label>
              <br />
              <input
                type="file"
                name="signPhoto"
                style={{ display: "none" }}
                onChange={(e) => handleFileInputChange(e, "signPhoto")}
                ref={signPhotoInputRef}
              />
              <div className="square-box" onClick={() => handleFileInputClick(signPhotoInputRef)}>
                {formData.signPhoto ? (
                  <img src={formData.signPhoto} alt="Sign Photo" />
                ) : (
                  <span>Add Sign Photo</span>
                )}
              </div>
            </div>
          </div>

          <button className="psubmitbtn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfessorRegister;
