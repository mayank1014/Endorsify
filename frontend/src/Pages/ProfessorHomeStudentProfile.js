import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col, Tag, Button, Modal } from "antd";
import { useParams, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useNavigate, useLocation } from "react-router-dom";

const ProfessorHomeStudentProfile = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const [proff_student, setProff_Student] = useState({});
  const [showTranscriptModal, setShowTranscriptModal] = useState(false);
  const [transcriptImage, setTranscriptImage] = useState("");
  const [text, setText] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [textArea, setTextArea] = useState(false);
  const[studentReason,setStudentReason]=useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/students/getstudentbyid/${id}`)
      .then((response) => {
        setStudent(response.data);
        axios
          .get(`http://localhost:8000/api/professors/getstudentbyID/${location.state.professorId}/${id}`)
          .then((sturesponse) => {
            setProff_Student(sturesponse.data);
          })
          .catch((error) => {
            console.error("Error fetching Student : ", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching professor : ", error);
      });
  }, [id]);
  console.log("In main" + textArea);
  const handleChange = (status) => {
    navigate(`/professor/student/${location.state.professorId}/edit`, { state: ({ studentId: id, professorId: location.state.professorId }) });
    setTextArea(false);
    console.log("In accepted" + textArea);
  };

  const handleRejectChange = () => {
    console.log("In rejected" + textArea);
    setTextArea(true);
  };
  const handleFeedBack = (status) => {
    axios
      .get(`http://localhost:8000/api/professors/updatestatus/${location.state.professorId}/${id}/rejected/${text}`)
      .then(() => {
        navigate("/professor/home");
      })
      .catch((error) => {
        console.error("Something went wrong : ", error);
      });
  };
  const handleTextChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 1000) {
      setText(inputValue);
      setCharCount(inputValue.length);
    }
  };
  const view = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/professors/getlor/${location.state.professorId}/${id}`);
      const documentUrl = response.data;
      navigate('/viewdocx', { state: { documentUrl } });
    } catch (error) {
      console.error("Error fetching document URL:", error);
      // Handle error if needed
    }
  }

  const handleTranscriptClick = () => {
    setShowTranscriptModal(true);
    setTranscriptImage(student.transcriptPhoto);
  };

  const handleModalClose = () => {
    setShowTranscriptModal(false);
    setTranscriptImage("");
  };
  const styles = {
    professorProfile: {
      padding: "20px",
      marginTop: "60px", // Adjust margin-top based on navbar height
      marginRight: "300px",
    },
    professorCard: {
      width: "200%",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      transition: "box-shadow 0.3s ease",
    },
    profilePic: {
      width: "150px", // Adjust the size of the profile picture here
      height: "150px", // Adjust the size of the profile picture here
      borderRadius: "50%", // Make the profile picture rounded
      margin: "0 auto", // Center the profile picture
      display: "block", // Ensure the profile picture is displayed as a block element
      marginTop: "20px",
    },
    transcriptPic: {
      width: "250px", // Adjust the size of the profile picture here
      height: "250px", // Adjust the size of the profile picture here
      margin: "0 auto", // Center the profile picture
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      display: "block", // Ensure the profile picture is displayed as a block element
      marginTop: "50px",
      cursor: "pointer",
    },
    descriptionTitle: {
      fontWeight: "bold",
      marginBottom: "4px",
    },
    descriptionText: {
      marginBottom: "12px",
    },
    expertiseTag: {
      marginBottom: "8px",
    },
    applyButton: {
      marginTop: "20px",
      textAlign: "center",
    },
  };
  return (
    <div>
      {!showTranscriptModal && (
        <div style={styles.professorProfile}>
          {!student && <Spinner />}
          {student && (
            <Row justify="center">
              <Col xs={24} sm={20} md={16} lg={12}>
                <Card style={styles.professorCard}>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                      <img alt="profile" src={student.profilePhoto} style={styles.profilePic} />
                      {student.transcriptPhoto && <img alt="transcript" src={student.transcriptPhoto} style={styles.transcriptPic} onClick={handleTranscriptClick} />}
                    </Col>
                    <Col xs={24} sm={12}>
                      <div style={{ padding: "16px" }}>
                        <h2 style={{ marginBottom: "20px" }}>{student.name}</h2>
                        <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>Email : </strong> {student.email}</p>
                        <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>Branch : </strong> {student.branch}</p>
                        <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>College ID : </strong> {student.collegeID} </p>
                        <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>Passing Year : </strong> {student.passingYear} </p>
                        <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>Purpose of the Letter: </strong> {proff_student.studentData && proff_student.studentData.purposeOfTheLetter} </p>
                        <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>Targeted Institution : </strong> {proff_student.studentData && proff_student.studentData.targetedInstitution} </p>
                        <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>Subject : </strong> {proff_student.studentData && proff_student.studentData.classAttended} </p>
                        <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>University Year Attended : </strong> {proff_student.studentData && proff_student.studentData.schoolYearAttended} </p>
                        <div>
                          <strong style={{ ...styles.descriptionTitle, marginBottom: "8px" }}>Personality Traits : </strong>
                          {((proff_student.studentData && proff_student.studentData.positivePersonalityTraits) ?? []).map((expertise, index) => (
                            <Tag key={index} style={styles.expertiseTag}>{expertise}</Tag>
                          ))}
                        </div>
                        <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>Accomplishments: </strong> {proff_student.studentData && proff_student.studentData.accomplishments} </p>
                        <div>
                          <strong style={{ ...styles.descriptionTitle, marginBottom: "8px" }}>Academic Skills : </strong>
                          {((proff_student.studentData && proff_student.studentData.academicSkills) ?? []).map((expertise, index) => (
                            <Tag key={index} style={styles.expertiseTag}>{expertise}</Tag>
                          ))}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          )}

          {location.state.lorStatus === "pending" && (
            <div style={{ marginTop: "20px", marginLeft: "570px" }}>
              <Button type="primary" style={{ marginRight: '10px' }} onClick={() => handleChange("accepted")}>Accept</Button>
              <Button type="primary" onClick={() => handleRejectChange("rejected")}>Reject</Button>
            </div>
          )}

          {location.state.lorStatus === "accepted" && (
            <div style={{ marginTop: "20px", marginLeft: "570px" }}>
              <Button type="primary" onClick={() => view()}>View LOR</Button>
            </div>
          )}

          {textArea && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <textarea
                value={text}
                onChange={handleTextChange}
                rows={10} // Adjust rows as needed
                cols={50} // Adjust cols as needed
                maxLength={1000} // Adjust maximum character count
                style={{
                  width: "70%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  boxSizing: "border-box",
                  marginTop: "10px",
                  marginLeft: "350px"
                }}

              />
              <p style={{ marginTop: "10px", marginLeft: "450px" }}>Character Count: {charCount} / 1000</p>
              <button
                onClick={handleFeedBack}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "12px 20px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginTop: "10px",
                  marginLeft: "460px"
                }}
              >
                Submit Feedback
              </button>
            </div>

          )}
        </div>
      )}

      {location.state.lorStatus === "rejected" && (
        <div style={{ marginTop: "20px" }}>
          <textarea
            value={proff_student.rejectReason}
            disabled
            rows={10} // Adjust rows as needed
            cols={30} // Adjust cols as needed
            maxLength={1000} // Adjust maximum character count
            style={{
              width: "50%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              //boxSizing: "border-box",
              marginTop: "10px",
              marginLeft: "300px"
            }}

          />
        </div>

      )}

      {/* Transcript Modal */}
      <Modal
        title="Transcript"
        visible={showTranscriptModal}
        onCancel={handleModalClose}
        footer={null}
        width={800}
      >
        <img src={transcriptImage} alt="Transcript" style={{ width: "100%" }} />
      </Modal>
    </div>

  );
};

export default ProfessorHomeStudentProfile;
