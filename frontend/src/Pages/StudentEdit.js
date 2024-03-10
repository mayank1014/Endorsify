import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

function StudentEdit() {
  const navigate = useNavigate();

  const user = localStorage.getItem("user");

  const [student, setStudent] = useState({
    name: "",
    passingYear: "",
    university: "",
    collegeID: "",
    branch: "",
    gender: "",
    profilePhoto: "",
    transcriptPhoto: "",
  });

  const profilePhotoInputRef = useRef(null);
  const transcriptPhotoInputRef = useRef(null);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/students/getstudent/${
          JSON.parse(user).email
        }`
      )
      .then((response) => {
        setStudent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student : ", error);
      });
  }, []);

  const handleFileInputChange = (event, fieldName) => {
    const file = event.target.files[0];

    // Use FileReader to read the file as data URL
    const reader = new FileReader();
    reader.onload = () => {
      setStudent({
        ...student,
        [fieldName]: reader.result, // Use reader.result as the source of the image
      });
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (event, fieldName) => {
    setStudent({
      ...student,
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
    //     "http://localhost:8000/api/students/edit",
    //     student
    //   );

    //   message.success("Profile updated successfully");

    //   setTimeout(() => {
    //     navigate("/student/home");
    //   }, 500);
    // } catch (error) {
    //   message.error("Something went wrong");
    // }

    const profilePhoto = new FormData();
    const transcriptPhoto = new FormData();

    profilePhoto.append("file", student["profilePhoto"]);
    profilePhoto.append("upload_preset", "Endorsify");
    profilePhoto.append("cloud_name", "djhsk7akn");

    transcriptPhoto.append("file", student["transcriptPhoto"]);
    transcriptPhoto.append("upload_preset", "Endorsify");
    transcriptPhoto.append("cloud_name", "djhsk7akn");

    axios
      .post(
        "https://api.cloudinary.com/v1_1/djhsk7akn/image/upload",
        profilePhoto
      )
      .then((response) => {
        student["profilePhoto"] = response.data.url;

        axios
          .post(
            "https://api.cloudinary.com/v1_1/djhsk7akn/image/upload",
            transcriptPhoto
          )
          .then((response) => {
            student["transcriptPhoto"] = response.data.url;

            axios
              .post("http://localhost:8000/api/students/edit", student)
              .then((response) => {
                message.success("Profile updated successfully");

                setTimeout(() => {
                  window.location.href='/student'
                  window.location.href='/student/home'
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
                {student.profilePhoto ? (
                  <img
                    src={student.profilePhoto}
                    alt="Profile Photo"
                  />
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
                value={student.name || ""}
                onChange={(e) => handleChange(e, "name")}
                required
              />
              <label htmlFor="passingYear">Passing Year:</label>
              <input
                type="number"
                name="passingYear"
                value={student.passingYear || ""}
                onChange={(e) => handleChange(e, "passingYear")}
                required
              />
              <label htmlFor="university">University:</label>
              <input
                type="text"
                name="university"
                value={student.university || ""}
                disabled
              />
            </div>
          </div>

          <div className="form-row">
            <div className="column">
              <label htmlFor="collegeID">College ID:</label>
              <input
                type="text"
                name="collegeID"
                value={student.collegeID || ""}
                onChange={(e) => handleChange(e, "collegeID")}
                required
              />
              <label htmlFor="branch">Branch:</label>
              <input
                type="text"
                name="branch"
                value={student.branch || ""}
                onChange={(e) => handleChange(e, "branch")}
                required
              />
              <label htmlFor="gender">Gender:</label>
              <select
                name="gender"
                value={student.gender || ""}
                onChange={(e) => handleChange(e, "gender")}
                required
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
                style={{ display: "none" }}
                onChange={(e) => handleFileInputChange(e, "transcriptPhoto")}
                ref={transcriptPhotoInputRef}
              />
              <div
                className="square-box"
                onClick={() => handleFileInputClick(transcriptPhotoInputRef)}
              >
                {student.transcriptPhoto ? (
                  <img
                    src={student.transcriptPhoto}
                    alt="Transcript Photo"
                  />
                ) : (
                  <span>Add Transcript Photo</span>
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
}

export default StudentEdit;
