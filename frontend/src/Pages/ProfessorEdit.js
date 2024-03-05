import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const ProfessorEdit = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const [professor, setProfessor] = useState({
    profilePhoto: "", // Set default value for profilePhoto
    signPhoto: "", // Set default value for transcriptPhoto
    expertise: [], // Set default value for expertise
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/professors/getprofessors/${JSON.parse(user).email}`)
      .then((response) => {
        console.log(response.data);
        setProfessor(response.data);
      })
      .catch((error) => {
        console.error("Error fetching professor details:", error);
      })
  }, []);
  const profilePhotoInputRef = useRef(null);
  const signPhotoInputRef = useRef(null);

  // const handleFileInputChange = (event, fieldName) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();

  //   reader.onload = (event) => {
  //     setProfessor({
  //       ...professor,
  //       [fieldName]: event.target.result,
  //     });
  //   };

  //   reader.readAsDataURL(file);
  // };
  const handleFileInputChange = (event, fieldName) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (event) => {
      setProfessor({
        ...professor,
        [fieldName]: event.target.result, // This assumes event.target.result is Base64 string, which might not be always true
      });
    };
  
    // Read the file as Data URL (Base64 encoded string)
    reader.readAsDataURL(file);
  };

  const handleExpertiseChange = (index, event) => {
    const values = [...professor.expertise];
    values[index] = event.target.value;
    setProfessor({
      ...professor,
      expertise: values,
    });
  };

  const handleAddExpertiseField = () => {
    setProfessor({
      ...professor,
      expertise: [...professor.expertise, ""],
    });
  };

  const handleRemoveExpertiseField = (index) => {
    const values = [...professor.expertise];
    values.splice(index, 1);
    setProfessor({
      ...professor,
      expertise: values,
    });
  };

  const handleChange = (event, fieldName) => {
    setProfessor({
      ...professor,
      [fieldName]: event.target.value,
    });
  };

  const handleFileInputClick = (inputRef) => {
    inputRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataObject = {};
    for (const key in professor) {
      formDataObject[key] = professor[key];
    }
    formDataObject["profilePhoto"] = professor.profilePhoto;
    formDataObject["signPhoto"] = professor.signPhoto;
    try {
      const response = await axios.post(
        "http://localhost:8000/api/professors/edit",
        formDataObject
      );

      message.success("Profile updated successfully");

      setTimeout(() => {
        navigate("/professor/home");
      }, 500);
    } catch (error) {
      message.error("Something went wrong");
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
                {professor.profilePhoto ? (
                  <img src={professor.profilePhoto} alt="Profile Photo" />
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
                value={professor.name || ""}
                onChange={(e) => handleChange(e, "name")}
              />
              <label htmlFor="teacherId">Professor ID:</label>
              <input
                type="text"
                name="teacherId"
                value={professor.teacherId || ""}
                disabled
              />
              <label htmlFor="university">University:</label>
              <input
                name="university"
                value={professor.university || ""}
                disabled
              />
            </div>
          </div>

          <div className="form-row">
            <div className="column">
              <label htmlFor="experience">Experience:</label>
              <input
                type="text"
                name="experience"
                value={professor.experience || ""}
                onChange={(e) => handleChange(e, "experience")}
              />
            </div>

            <div className="column">
              <label htmlFor="gender">Gender:</label>
              <input
                name="gender"
                value={professor.gender}
                disabled
              />
            </div>
          </div>

          <div className="form-row">
            <div className="column">
              <label htmlFor="qualification">Qualification:</label>
              <textarea
                name="qualification"
                value={professor.qualification}
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
                value={professor.portfolioURL}
                onChange={(e) => handleChange(e, "portfolioURL")}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="column">
              <label htmlFor="expertise">Subject Expertise:</label>
              <div className="alignment">
                {professor.expertise.map((field, index) => (
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
                {professor.signPhoto ? (
                  <img src={professor.signPhoto} alt="Sign Photo" />
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

export default ProfessorEdit;
