import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
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
    targettedInstitution: "",
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
      formData["pronoum"] = student.gender;
      formData["teachersName"] = location.state.name;

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
                  <option value="summer_program">Summer Program</option>
                  <option value="college">College</option>
                  <option value="university">University</option>
                  <option value="scholarship_program">
                    Scholarship Program
                  </option>
                </select>
              </div>
              <div className="form-group mb-4">
                <label htmlFor="targettedInstitution" className="mb-2">
                  Targeted Institution
                </label>
                <input
                  id="targettedInstitution"
                  name="targettedInstitution"
                  type="text"
                  className="form-control"
                  value={formData.targettedInstitution}
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
                  <option value="student_of_the_year">
                    Student of the year
                  </option>
                  <option value="one_of_the_best_student">
                    One of the best student
                  </option>
                  <option value="none">None</option>
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
                        id="altruistic"
                        name="altruistic"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "altruistic"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="altruistic" className="form-check-label">
                        Altruistic
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="assertive"
                        name="assertive"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "assertive"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="assertive" className="form-check-label">
                        Assertive
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="amiable"
                        name="amiable"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes("amiable")}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="amiable" className="form-check-label">
                        Amiable
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="articulate"
                        name="articulate"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "articulate"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="articulate" className="form-check-label">
                        Articulate
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="brilliant"
                        name="brilliant"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "brilliant"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="brilliant" className="form-check-label">
                        Brilliant
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="bright"
                        name="bright"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes("bright")}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="bright" className="form-check-label">
                        Bright
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="disciplined"
                        name="disciplined"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "disciplined"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="disciplined" className="form-check-label">
                        Disciplined
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="dependable"
                        name="dependable"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "dependable"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="dependable" className="form-check-label">
                        Dependable
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="determined"
                        name="determined"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "determined"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="determined" className="form-check-label">
                        Determined
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="enthusiastic"
                        name="enthusiastic"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "enthusiastic"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label
                        htmlFor="enthusiastic"
                        className="form-check-label"
                      >
                        Enthusiastic
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="flexible"
                        name="flexible"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "flexible"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="flexible" className="form-check-label">
                        Flexible
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="focused"
                        name="focused"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes("focused")}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="focused" className="form-check-label">
                        Focused
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="generous"
                        name="generous"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "generous"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="generous" className="form-check-label">
                        Generous
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="honest"
                        name="honest"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes("honest")}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="honest" className="form-check-label">
                        Honest
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="helpful"
                        name="helpful"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes("helpful")}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="helpful" className="form-check-label">
                        Helpful
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="intuitive"
                        name="intuitive"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "intuitive"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="intuitive" className="form-check-label">
                        Intuitive
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="kind"
                        name="kind"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes("kind")}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="kind" className="form-check-label">
                        Kind
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="logical"
                        name="logical"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes("logical")}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="logical" className="form-check-label">
                        Logical
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="mature"
                        name="mature"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes("mature")}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="mature" className="form-check-label">
                        Mature
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="meticulous"
                        name="meticulous"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "meticulous"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="meticulous" className="form-check-label">
                        Meticulous
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="outspoken"
                        name="outspoken"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "outspoken"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="outspoken" className="form-check-label">
                        Outspoken
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="open"
                        name="open"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes("open")}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="open" className="form-check-label">
                        Open
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="resourceful"
                        name="resourceful"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "resourceful"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="resourceful" className="form-check-label">
                        Resourceful
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="respectful"
                        name="respectful"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "respectful"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="respectful" className="form-check-label">
                        Respectful
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="positive"
                        name="positive"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "positive"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="positive" className="form-check-label">
                        Positive
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="self_aware"
                        name="self_aware"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "self_aware"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="self_aware" className="form-check-label">
                        Self aware
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="sucint"
                        name="sucint"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes("sucint")}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="sucint" className="form-check-label">
                        Sucint
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="secure"
                        name="secure"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes("secure")}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="secure" className="form-check-label">
                        Secure
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="sympathetic"
                        name="sympathetic"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "sympathetic"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="sympathetic" className="form-check-label">
                        Sympathetic
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="spontaneous"
                        name="spontaneous"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "spontaneous"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="spontaneous" className="form-check-label">
                        Spontaneous
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="sweet"
                        name="sweet"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes("sweet")}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="sweet" className="form-check-label">
                        Sweet
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="thorough"
                        name="thorough"
                        className="form-check-input"
                        checked={formData.positivePersonalityTraits.includes(
                          "thorough"
                        )}
                        onChange={handleTraitChange}
                      />
                      <label htmlFor="thorough" className="form-check-label">
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
                        id="academic_integrity"
                        name="academic_integrity"
                        className="form-check-input"
                        checked={formData.academicSkills.includes(
                          "academic_integrity"
                        )}
                        onChange={handleAcademicSkillChange}
                      />
                      <label
                        htmlFor="academic_integrity"
                        className="form-check-label"
                      >
                        Academic Integrity
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="academic_brilliant"
                        name="academic_brilliant"
                        className="form-check-input"
                        checked={formData.academicSkills.includes(
                          "academic_brilliant"
                        )}
                        onChange={handleAcademicSkillChange}
                      />
                      <label
                        htmlFor="academic_brilliant"
                        className="form-check-label"
                      >
                        Academic Brilliant
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="disciplined_work_habits"
                        name="disciplined_work_habits"
                        className="form-check-input"
                        checked={formData.academicSkills.includes(
                          "disciplined_work_habits"
                        )}
                        onChange={handleAcademicSkillChange}
                      />
                      <label
                        htmlFor="disciplined_work_habits"
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
                        id="participation"
                        name="participation"
                        className="form-check-input"
                        checked={formData.academicSkills.includes(
                          "participation"
                        )}
                        onChange={handleAcademicSkillChange}
                      />
                      <label
                        htmlFor="participation"
                        className="form-check-label"
                      >
                        Participation
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="problem_solving_skills"
                        name="problem_solving_skills"
                        className="form-check-input"
                        checked={formData.academicSkills.includes(
                          "problem_solving_skills"
                        )}
                        onChange={handleAcademicSkillChange}
                      />
                      <label
                        htmlFor="problem_solving_skills"
                        className="form-check-label"
                      >
                        Problem Solving Skills
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="self_motivated"
                        name="self_motivated"
                        className="form-check-input"
                        checked={formData.academicSkills.includes(
                          "self_motivated"
                        )}
                        onChange={handleAcademicSkillChange}
                      />
                      <label
                        htmlFor="self_motivated"
                        className="form-check-label"
                      >
                        Self Motivated
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="teamwork"
                        name="teamwork"
                        className="form-check-input"
                        checked={formData.academicSkills.includes("teamwork")}
                        onChange={handleAcademicSkillChange}
                      />
                      <label htmlFor="teamwork" className="form-check-label">
                        Teamwork
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="leadership_skills"
                        name="leadership_skills"
                        className="form-check-input"
                        checked={formData.academicSkills.includes(
                          "leadership_skills"
                        )}
                        onChange={handleAcademicSkillChange}
                      />
                      <label
                        htmlFor="leadership_skills"
                        className="form-check-label"
                      >
                        Leadership Skills
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="hard_working"
                        name="hard_working"
                        className="form-check-input"
                        checked={formData.academicSkills.includes(
                          "hard_working"
                        )}
                        onChange={handleAcademicSkillChange}
                      />
                      <label
                        htmlFor="hard_working"
                        className="form-check-label"
                      >
                        Hard Working
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="adaptability_to_new_environment"
                        name="adaptability_to_new_environment"
                        className="form-check-input"
                        checked={formData.academicSkills.includes(
                          "adaptability_to_new_environment"
                        )}
                        onChange={handleAcademicSkillChange}
                      />
                      <label
                        htmlFor="adaptability_to_new_environment"
                        className="form-check-label"
                      >
                        Adaptability to new Environment
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="creative"
                        name="creative"
                        className="form-check-input"
                        checked={formData.academicSkills.includes("creative")}
                        onChange={handleAcademicSkillChange}
                      />
                      <label htmlFor="creative" className="form-check-label">
                        Creative
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="logical_thinking"
                        name="logical_thinking"
                        className="form-check-input"
                        checked={formData.academicSkills.includes(
                          "logical_thinking"
                        )}
                        onChange={handleAcademicSkillChange}
                      />
                      <label
                        htmlFor="logical_thinking"
                        className="form-check-label"
                      >
                        Logical Thinking
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="great_personality_skills"
                        name="great_personality_skills"
                        className="form-check-input"
                        checked={formData.academicSkills.includes(
                          "great_personality_skills"
                        )}
                        onChange={handleAcademicSkillChange}
                      />
                      <label
                        htmlFor="great_personality_skills"
                        className="form-check-label"
                      >
                        Great Personality Skills
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="high_achiever"
                        name="high_achiever"
                        className="form-check-input"
                        checked={formData.academicSkills.includes(
                          "high_achiever"
                        )}
                        onChange={handleAcademicSkillChange}
                      />
                      <label
                        htmlFor="high_achiever"
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
