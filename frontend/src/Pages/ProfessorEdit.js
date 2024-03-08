import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import NavDefaultLayout from "../components/NavDefaultLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const ProfessorEdit = () => {
  const navigate = useNavigate();

  const user = localStorage.getItem("user");

  const [professor, setProfessor] = useState({
    university: "",
    email: "",
    teacherId: "",
    gender: "",
    name: "",
    profilePhoto: null,
    signPhoto: null,
    qualification: "",
    expertise: [""], 
    experience: "",
    portfolioURL: "",
    students: [],
  });

  const profilePhotoInputRef = useRef(null);
  const signPhotoInputRef = useRef(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/professors/getprofessors/${JSON.parse(user).email}`)
      .then((response) => {
<<<<<<< Updated upstream
        //console.log(response.data);
=======
>>>>>>> Stashed changes
        setProfessor(response.data);
      })
      .catch((error) => {
        console.error("Error fetching professor details:", error);
      })
  }, []);
<<<<<<< Updated upstream
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
=======
  
  const handleFileInputChange = (event, fieldName) => {
    const file = event.target.files[0];

    // Use FileReader to read the file as data URL
    const reader = new FileReader();
    reader.onload = () => {
      setProfessor({
        ...professor,
        [fieldName]: reader.result, // Use reader.result as the source of the image
      });
    };
>>>>>>> Stashed changes
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

    // try {
    //   const response = await axios.post(
    //     "http://localhost:8000/api/professors/edit",
    //     formDataObject
    //   );

    //   message.success("Profile updated successfully");

    //   setTimeout(() => {
    //     navigate("/professor/home");
    //   }, 500);
    // } catch (error) {
    //   message.error("Something went wrong");
    // }

    const profilePhoto = new FormData();
    const signPhoto = new FormData();

    profilePhoto.append("file", professor["profilePhoto"]);
    profilePhoto.append("upload_preset", "Endorsify");
    profilePhoto.append("cloud_name", "djhsk7akn");

    signPhoto.append("file", professor["signPhoto"]);
    signPhoto.append("upload_preset", "Endorsify");
    signPhoto.append("cloud_name", "djhsk7akn");

    axios
      .post(
        "https://api.cloudinary.com/v1_1/djhsk7akn/image/upload",
        profilePhoto
      )
      .then((response) => {
        professor["profilePhoto"] = response.data.url;

        axios
          .post(
            "https://api.cloudinary.com/v1_1/djhsk7akn/image/upload",
            signPhoto
          )
          .then((response) => {
            professor["signPhoto"] = response.data.url;

            axios
              .post("http://localhost:8000/api/professors/edit", professor)
              .then((response) => {
                message.success("Profile updated successfully");

                setTimeout(() => {
                  window.location.href='/professor'
                  window.location.href='/professor/home'
                }, 500);
              })
              .catch((error) => {
                message.error("Something went wrong");
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <NavDefaultLayout>
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
                      style={{ width: '170px' }} // Adjust the width as needed
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
    </NavDefaultLayout>
  );
};

export default ProfessorEdit;
