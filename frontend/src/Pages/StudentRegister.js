import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/StudentRegistration.css";
// import Spinner from '../components/Spinner.js'

const StudentRegistration = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    universityId: "",
    email: "",
    name: "",
    gender: "",
    profilePhoto: null,
    transcriptPhoto: null,
    passingYear: "",
    branch: "",
    collegeID: "",
    university: "",
    teachers: [],
  });

  const [allUniversities, setAllUniversities] = useState([]);

  const profilePhotoInputRef = useRef(null);
  const transcriptInputRef = useRef(null);

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

  const handleFileInputChange = (event, fieldName) => {
    const file = event.target.files[0];

    // Use FileReader to read the file as data URL
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({
        ...formData,
        [fieldName]: reader.result, // Use reader.result as the source of the image
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

    const profilePhoto = new FormData();
    const transcriptPhoto = new FormData();

    profilePhoto.append("file", formData["profilePhoto"]);
    profilePhoto.append("upload_preset", "Endorsify");
    profilePhoto.append("cloud_name", "djhsk7akn");

    transcriptPhoto.append("file", formData["transcriptPhoto"]);
    transcriptPhoto.append("upload_preset", "Endorsify");
    transcriptPhoto.append("cloud_name", "djhsk7akn");

    axios
      .post(
        "https://api.cloudinary.com/v1_1/djhsk7akn/image/upload",
        profilePhoto
      )
      .then((response) => {
        formData["profilePhoto"] = response.data.url;

        axios
          .post(
            "https://api.cloudinary.com/v1_1/djhsk7akn/image/upload",
            transcriptPhoto
          )
          .then((response) => {
            formData["transcriptPhoto"] = response.data.url;

            // const user = {
            //   email: location.state.email,
            //   password: location.state.password,
            //   confirmPassword: location.state.confirmPassword,
            //   role: "student",
            // };
            const user = {};
            if (typeof location.state === "string") {
              console.log(location.state);
              // If location.state is a string (presumably an email ID)
              user.email = location.state;
              user.role = "student";
            } else if (typeof location.state === "object") {
              // If location.state is an object
              user.email = location.state.email;
              user.password = location.state.password;
              user.confirmPassword = location.state.confirmPassword;
              user.role = "student";
            }

            formData.email = user.email;

            for (var i = 0; i < allUniversities.length; i++) {
              if (allUniversities[i].name === formData.university) {
                formData.universityId = allUniversities[i]._id;
                break;
              }
            }

            axios
              .post("http://localhost:8000/api/users/register", user)
              .then((response) => {
                axios
                  .post("http://localhost:8000/api/students/register", formData)
                  .then((response) => {
                    console.log(response);

                    if (response.data.error === 1) {
                      axios.post(
                        "http://localhost:8000/api/users/deleteuser",
                        user
                      );

                      message.error(
                        "User with the same College ID already exists"
                      );

                      setTimeout(() => {
                        window.location.href = "/register/student";
                      }, 500);
                    } else if (response.data.error === 0) {
                      message.success("Registration Successful");

                      setTimeout(() => {
                        localStorage.setItem("user", JSON.stringify(user));

                        navigate("/student/home");
                      }, 500);
                    }
                  })
                  .catch((error) => {
                    console.log(error);

                    axios.post(
                      "http://localhost:8000/api/users/deleteuser",
                      user
                    );

                    message.error("Something went wrong, Please try again");

                    setTimeout(() => {
                      window.location.href = "/register/student";
                    }, 500);
                  });
              })
              .catch((error) => {
                console.log(error);

                message.error("Something went wrong");

                setTimeout(() => {
                  window.location.href = "/";
                }, 500);
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
    <div className="StudentBox">
      <div className="Student">
        <form
          className="student-profile-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="header">Student Profile</div>

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
              <label htmlFor="passingYear">Passing Year:</label>
              <input
                type="number"
                name="passingYear"
                value={formData.passingYear}
                onChange={(e) => handleChange(e, "passingYear")}
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
                onChange={(e) => handleChange(e, "collegeID")}
              />
              <label htmlFor="branch">Branch:</label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={(e) => handleChange(e, "branch")}
              />
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
            <div className="column">
              <label htmlFor="transcriptPhoto">Transcript:</label>
              <br />
              <input
                type="file"
                name="transcriptPhoto"
                style={{ display: "none" }}
                onChange={(e) => handleFileInputChange(e, "transcriptPhoto")}
                ref={transcriptInputRef}
              />
              <div
                className="square-box"
                onClick={() => handleFileInputClick(transcriptInputRef)}
              >
                {formData.transcriptPhoto ? (
                  <img src={formData.transcriptPhoto} alt="Transcript" />
                ) : (
                  <span>Add Transcript</span>
                )}
              </div>
            </div>
          </div>

          <button className="submitbtn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistration;
