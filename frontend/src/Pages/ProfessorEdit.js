import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import SignatureCanvas from "react-signature-canvas";

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
    workingAs: "",
  });

  const profilePhotoInputRef = useRef(null);
  const signatureCanvas = useRef(null);
  const [isSignatureEmpty, setIsSignatureEmpty] = useState(true);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/professors/getprofessors/${
          JSON.parse(user).email
        }`
      )
      .then((response) => {
        setProfessor(response.data);
      })
      .catch((error) => {
        console.error("Error fetching professor details:", error);
      });
  }, []);

  const handleFileInputChange = (event, fieldName) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      setProfessor({
        ...professor,
        [fieldName]: reader.result,
      });
    };
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

    if (
      professor.expertise.length === 0 ||
      professor.expertise.some((field) => field.trim() === "")
    ) {
      message.error("Please fill at least one expertise field");
      return;
    }

    if (!professor.workingAs.trim()) {
      message.error("Please enter your working designation");
      return;
    }

    const signatureDataUrl = signatureCanvas.current
      .getTrimmedCanvas()
      .toDataURL("image/png");

    const profilePhoto = new FormData();
    const signPhoto = new FormData();

    profilePhoto.append("file", professor["profilePhoto"]);
    profilePhoto.append("upload_preset", "Endorsify");
    profilePhoto.append("cloud_name", "djhsk7akn");

    signPhoto.append("file", signatureDataUrl);
    signPhoto.append("upload_preset", "Endorsify");
    signPhoto.append("cloud_name", "djhsk7akn");

    console.log(isSignatureEmpty)

    if(!isSignatureEmpty)
    {
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
                    window.location.href = "/professor";
                    window.location.href = "/professor/home";
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
      }
      else 
      {
        axios
        .post(
          "https://api.cloudinary.com/v1_1/djhsk7akn/image/upload",
          profilePhoto
        )
        .then((response) => {
          professor["profilePhoto"] = response.data.url;

          axios
            .post("http://localhost:8000/api/professors/edit", professor)
            .then((response) => {
              message.success("Profile updated successfully");

              setTimeout(() => {
                window.location.href = "/professor";
                window.location.href = "/professor/home";
              }, 500);
            })
            .catch((error) => {
              message.error("Something went wrong");
            });
        })
        .catch((error) => {
          console.log(error);
        });
      }
  };

  const clearSignature = () => {
    signatureCanvas.current.clear();
    setIsSignatureEmpty(true);
  };

  const handleBeginDrawing = () => {
    setIsSignatureEmpty(false);
  };

  return (
    <NavDefaultLayout>
      <div className="ProfessorBox">
        <div className="Professor">
          <div className="professor-profile-form">
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
                <input name="gender" value={professor.gender} disabled />
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

            <div className="column">
              <label htmlFor="signPhoto">Digital Signature</label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    maxWidth: "400px",
                    marginRight: "20px",
                  }}
                >
                  <SignatureCanvas
                    ref={signatureCanvas}
                    penColor="black"
                    canvasProps={{
                      width: 400,
                      height: 200,
                      className: "signature-canvas",
                      onMouseDown: handleBeginDrawing,
                    }}
                  />
                  <button onClick={clearSignature}>Clear Signature</button>
                </div>
                {/* Display the signature image */}
                {professor.signPhoto && (
                  <img
                    src={professor.signPhoto}
                    alt="Digital Signature"
                    style={{ marginLeft: "20px", maxWidth: "100%", height: "auto" }}
                  />
                )}
              </div>
            </div>

            <br />
            <br />
            <button onClick={handleSubmit} className="psubmitbtn">
              Submit
            </button>
          </div>
        </div>
      </div>
    </NavDefaultLayout>
  );
};

export default ProfessorEdit;
