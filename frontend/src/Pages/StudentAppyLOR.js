import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const StudentApplyLOR = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = localStorage.getItem("user");

  const [student, setStudent] = useState({});

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
        console.error("Error fetching professor : ", error);
      });
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    purposeOfTheLetter: "",
    targetedInstitution: "",
    classAttended: "",
    schoolYearAttended: "",
    highSchoolYearAttended: "",
    accomplishments: "",
    positivePersonalityTraits: [],
    academicSkills: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTraitChange = (e) => {
    const { name, checked } = e.target;
    let updatedTraits = [...formData.positivePersonalityTraits];
    if (checked && updatedTraits.length < 6 && !updatedTraits.includes(name)) {
      updatedTraits.push(name);
    } else if (!checked && updatedTraits.includes(name)) {
      updatedTraits = updatedTraits.filter((trait) => trait !== name);
    }
    setFormData({
      ...formData,
      positivePersonalityTraits: updatedTraits,
    });
  };

  const handleAcademicSkillChange = (e) => {
    const { name, checked } = e.target;
    let updatedSkills = [...formData.academicSkills];
    if (checked && updatedSkills.length < 6 && !updatedSkills.includes(name)) {
      updatedSkills.push(name);
    } else if (!checked && updatedSkills.includes(name)) {
      updatedSkills = updatedSkills.filter((skill) => skill !== name);
    }
    setFormData({
      ...formData,
      academicSkills: updatedSkills,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.positivePersonalityTraits.length < 3) {
      message.error("Please select at least 3 Positive Personality Traits.");
      return;
    } else if (formData.positivePersonalityTraits.length > 6) {
      message.error("You can select maximum 6 personality traits.");
      return;
    }

    if (formData.academicSkills.length < 3) {
      message.error("Please select at least 3 Academic Skills.");
      return;
    } else if (formData.academicSkills.length > 6) {
      message.error("You can select maximum 6 Academic Skills.");
      return;
    }

    try {
      formData["studentId"] = student._id;
      formData["professorId"] = location.state._id;
      formData["pronoun"] = student.gender;
      formData["teachersName"] = location.state.name;
      formData["professorEmail"] = location.state.email;
      formData["workingAs"] = location.state.workingAs;
      formData["signature"] = location.state.signPhoto;
      formData["uniId"] = location.state.universityId;

      axios.post(
        "http://localhost:8000/api/professors/studentrequest",
        formData
      );

      setTimeout(() => {
        message.success("Your request for LOR has been sent successfully");
            navigate("/student/home");
      }, 500);
    } catch (error) {
      message.success("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div
            className="card p-4"
            style={{ marginTop: "60px", marginBottom: "60px" }}
          >
            <form onSubmit={handleSubmit}>
              <h2 className="mb-4 pb-3">Apply for LOR</h2>
              <div className="form-row mb-4">
                <div className="form-group col-md-4">
                  <label htmlFor="firstName" className="mb-2">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter First Name"
                    required
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="middleName" className="mb-2">
                    Middle Name
                  </label>
                  <input
                    id="middleName"
                    name="middleName"
                    type="text"
                    className="form-control"
                    value={formData.middleName}
                    onChange={handleInputChange}
                    placeholder="Enter Middle Name"
                    required
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="lastName" className="mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter Last Name"
                    required
                  />
                </div>
              </div>
              <div className="form-group mb-4">
                <label htmlFor="purposeOfTheLetter" className="mb-2">
                  Select Purpose of Letter
                </label>
                <select
                  id="purposeOfTheLetter"
                  name="purposeOfTheLetter"
                  className="form-control"
                  value={formData.purposeOfTheLetter}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Summer Program">Summer Program</option>
                  <option value="College">College</option>
                  <option value="University">University</option>
                  <option value="Scholarship Program">
                    Scholarship Program
                  </option>
                </select>
              </div>
              <div className="form-group mb-4">
                <label htmlFor="targetedInstitution" className="mb-2">
                  Targeted Institution
                </label>
                <input
                  id="targetedInstitution"
                  name="targetedInstitution"
                  type="text"
                  className="form-control"
                  value={formData.targetedInstitution}
                  onChange={handleInputChange}
                  placeholder="Enter Targeted Institution"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="classAttended" className="mb-2">
                  Subject Studied under Professor
                </label>
                <input
                  id="classAttended"
                  name="classAttended"
                  type="text"
                  className="form-control"
                  value={formData.classAttended}
                  onChange={handleInputChange}
                  placeholder="Enter Subject (e.g. Operating Systems)"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="schoolYearAttended" className="mb-2">
                  School Year Attended
                </label>
                <input
                  id="schoolYearAttended"
                  name="schoolYearAttended"
                  type="text"
                  className="form-control"
                  value={formData.schoolYearAttended}
                  onChange={handleInputChange}
                  placeholder="Enter School Year Attended (e.g. 2023/2024)"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="highSchoolYearAttended" className="mb-2">
                  High School Year Attended
                </label>
                <input
                  id="highSchoolYearAttended"
                  name="highSchoolYearAttended"
                  type="text"
                  className="form-control"
                  value={formData.highSchoolYearAttended}
                  onChange={handleInputChange}
                  placeholder="Enter High School Year Attended (e.g. Sophomore)"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="accomplishments" className="mb-2">
                  Select Accomplishments
                </label>
                <select
                  id="accomplishments"
                  name="accomplishments"
                  className="form-control"
                  value={formData.accomplishments}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Student of the year">
                    Student of the year
                  </option>
                  <option value="One of the best student">
                    One of the best student
                  </option>
                  <option value="None">None</option>
                </select>
              </div>
              <div className="form-group mb-4">
                <label className="mb-2">
                  Select Positive Personality Traits (Select 3 to 6)
                </label>
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Altruistic"
                        name="Altruistic"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "Altruistic"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Altruistic" className="form-check-label">
                        Altruistic
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Assertive"
                        name="Assertive"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "Assertive"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Assertive" className="form-check-label">
                        Assertive
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Amiable"
                        name="Amiable"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes("Amiable")}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Amiable" className="form-check-label">
                        Amiable
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Articulate"
                        name="Articulate"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "Articulate"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Articulate" className="form-check-label">
                        Articulate
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Brilliant"
                        name="Brilliant"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "Brilliant"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Brilliant" className="form-check-label">
                        Brilliant
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Bright"
                        name="Bright"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes("Bright")}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Bright" className="form-check-label">
                        Bright
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Disciplined"
                        name="Disciplined"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "Disciplined"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Disciplined" className="form-check-label">
                        Disciplined
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Dependable"
                        name="Dependable"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "Dependable"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Dependable" className="form-check-label">
                        Dependable
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Determined"
                        name="Determined"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "Determined"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Determined" className="form-check-label">
                        Determined
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Enthusiastic"
                        name="Enthusiastic"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "Enthusiastic"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label
                        htmlFor="Enthusiastic"
                        className="form-check-label"
                      >
                        Enthusiastic
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Flexible"
                        name="Flexible"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "Flexible"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Flexible" className="form-check-label">
                        Flexible
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Focused"
                        name="Focused"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes("Focused")}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Focused" className="form-check-label">
                        Focused
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Generous"
                        name="Generous"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "Generous"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Generous" className="form-check-label">
                        Generous
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Honest"
                        name="Honest"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes("Honest")}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Honest" className="form-check-label">
                        Honest
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Helpful"
                        name="Helpful"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes("Helpful")}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Helpful" className="form-check-label">
                        Helpful
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Intuitive"
                        name="Intuitive"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "Intuitive"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Intuitive" className="form-check-label">
                        Intuitive
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Kind"
                        name="Kind"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes("Kind")}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Kind" className="form-check-label">
                        Kind
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Logical"
                        name="Logical"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes("Logical")}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Logical" className="form-check-label">
                        Logical
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Mature"
                        name="Mature"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes("Mature")}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Mature" className="form-check-label">
                        Mature
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Meticulous"
                        name="Meticulous"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "Meticulous"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Meticulous" className="form-check-label">
                        Meticulous
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Outspoken"
                        name="Outspoken"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "Outspoken"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Outspoken" className="form-check-label">
                        Outspoken
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Open"
                        name="Open"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes("Open")}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Open" className="form-check-label">
                        Open
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Resourceful"
                        name="Resourceful"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "Resourceful"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Resourceful" className="form-check-label">
                        Resourceful
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Respectful"
                        name="Respectful"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "Respectful"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Respectful" className="form-check-label">
                        Respectful
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Positive"
                        name="Positive"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "Positive"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Positive" className="form-check-label">
                        Positive
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Self aware"
                        name="Self aware"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "Self aware"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Self aware" className="form-check-label">
                        Self aware
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Succinct"
                        name="Succinct"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes("Succinct")}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Succinct" className="form-check-label">
                        Succinct
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Secure"
                        name="Secure"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes("Secure")}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Secure" className="form-check-label">
                        Secure
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Sympathetic"
                        name="Sympathetic"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "Sympathetic"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Sympathetic" className="form-check-label">
                        Sympathetic
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Spontaneous"
                        name="Spontaneous"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "Spontaneous"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Spontaneous" className="form-check-label">
                        Spontaneous
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Sweet"
                        name="Sweet"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes("Sweet")}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Sweet" className="form-check-label">
                        Sweet
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Thorough"
                        name="Thorough"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "Thorough"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="Thorough" className="form-check-label">
                        Thorough
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group mb-4">
                <label className="mb-2">
                  Select Academic Skills (Select 3 to 6)
                </label>
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Academic Integrity"
                        name="Academic Integrity"
                        className="form-check-input"
                        checked={formData.academicSkills.includes(
                          "Academic Integrity"
                        )}
                        onChange={handleAcademicSkillChange}
                      />
                      <label
                        htmlFor="Academic Integrity"
                        className="form-check-label"
                      >
                        Academic Integrity
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Academic Brilliant"
                        name="Academic Brilliant"
                        className="form-check-input"
                        checked={formData.academicSkills.includes(
                          "Academic Brilliant"
                        )}
                        onChange={handleAcademicSkillChange}
                      />
                      <label
                        htmlFor="Academic Brilliant"
                        className="form-check-label"
                      >
                        Academic Brilliant
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Disciplined Work Habits"
                        name="Disciplined Work Habits"
                        className="form-check-input"
                        checked={formData.academicSkills.includes(
                          "Disciplined Work Habits"
                        )}
                        onChange={handleAcademicSkillChange}
                      />
                      <label
                        htmlFor="Disciplined Work Habits"
                        className="form-check-label"
                      >
                        Disciplined Work Habits
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Participation"
                        name="Participation"
                        className="form-check-input"
                        checked={formData.academicSkills.includes(
                          "Participation"
                        )}
                        onChange={handleAcademicSkillChange}
                      />
                      <label
                        htmlFor="Participation"
                        className="form-check-label"
                      >
                        Participation
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Problem Solving Skills"
                        name="Problem Solving Skills"
                        className="form-check-input"
                        checked={formData.academicSkills.includes(
                          "Problem Solving Skills"
                        )}
                        onChange={handleAcademicSkillChange}
                      />
                      <label
                        htmlFor="Problem Solving Skills"
                        className="form-check-label"
                      >
                        Problem Solving Skills
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Self Motivated"
                        name="Self Motivated"
                        className="form-check-input"
                        checked={formData.academicSkills.includes(
                          "Self Motivated"
                        )}
                        onChange={handleAcademicSkillChange}
                      />
                      <label
                        htmlFor="Self Motivated"
                        className="form-check-label"
                      >
                        Self Motivated
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Teamwork"
                        name="Teamwork"
                        className="form-check-input"
                        checked={formData.academicSkills.includes("Teamwork")}
                        onChange={handleAcademicSkillChange}
                      />
                      <label htmlFor="Teamwork" className="form-check-label">
                        Teamwork
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Leadership Skills"
                        name="Leadership Skills"
                        className="form-check-input"
                        checked={formData.academicSkills.includes(
                          "Leadership Skills"
                        )}
                        onChange={handleAcademicSkillChange}
                      />
                      <label
                        htmlFor="Leadership Skills"
                        className="form-check-label"
                      >
                        Leadership Skills
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Hard Working"
                        name="Hard Working"
                        className="form-check-input"
                        checked={formData.academicSkills.includes(
                          "Hard Working"
                        )}
                        onChange={handleAcademicSkillChange}
                      />
                      <label
                        htmlFor="Hard Working"
                        className="form-check-label"
                      >
                        Hard Working
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Adaptability to new Environment"
                        name="Adaptability to new Environment"
                        className="form-check-input"
                        checked={formData.academicSkills.includes(
                          "Adaptability to new Environment"
                        )}
                        onChange={handleAcademicSkillChange}
                      />
                      <label
                        htmlFor="Adaptability to new Environment"
                        className="form-check-label"
                      >
                        Adaptability to new Environment
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Creative"
                        name="Creative"
                        className="form-check-input"
                        checked={formData.academicSkills.includes("Creative")}
                        onChange={handleAcademicSkillChange}
                      />
                      <label htmlFor="Creative" className="form-check-label">
                        Creative
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Logical Thinking"
                        name="Logical Thinking"
                        className="form-check-input"
                        checked={formData.academicSkills.includes(
                          "Logical Thinking"
                        )}
                        onChange={handleAcademicSkillChange}
                      />
                      <label
                        htmlFor="Logical Thinking"
                        className="form-check-label"
                      >
                        Logical Thinking
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="Great Presentation Skills"
                        name="Great Presentation Skills"
                        className="form-check-input"
                        checked={formData.academicSkills.includes(
                          "Great Presentation Skills"
                        )}
                        onChange={handleAcademicSkillChange}
                      />
                      <label
                        htmlFor="Great Presentation Skills"
                        className="form-check-label"
                      >
                        Great Presentation Skills
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="High Achiever"
                        name="High Achiever"
                        className="form-check-input"
                        checked={formData.academicSkills.includes(
                          "High Achiever"
                        )}
                        onChange={handleAcademicSkillChange}
                      />
                      <label
                        htmlFor="High Achiever"
                        className="form-check-label"
                      >
                        High Achiever
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentApplyLOR;
