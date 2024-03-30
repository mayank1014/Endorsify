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
            setProff_Student(sturesponse.data.studentData);
          })
          .catch((error) => {
            console.error("Error fetching Student : ", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching professor : ", error);
      });
  }, [id]);

  const handleChange = (status) => {
    if (status === "accepted") {
      navigate(`/professor/student/${location.state.professorId}/edit`, { state: ({studentId: id, professorId: location.state.professorId }) })
    }
    else {
      axios
        .get(`http://localhost:8000/api/professors/updatestatus/${location.state.professorId}/${id}/${status}`)
        .then(() => {
          navigate("/professor/home");
        })
        .catch((error) => {
          console.error("Something went wrong : ", error);
        });
    }
  };

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
                          <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>Purpose of the Letter: </strong> {proff_student.purposeOfTheLetter} </p>
                          <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>Targeted Institution : </strong> {proff_student && proff_student.targetedInstitution} </p>
                          <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>Subject : </strong> {proff_student && proff_student.classAttended} </p>
                          <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>University Year Attended : </strong> {proff_student && proff_student.schoolYearAttended} </p>
                          <div>
                            <strong style={{ ...styles.descriptionTitle, marginBottom: "8px" }}>Personality Traits : </strong>
                            {((proff_student && proff_student.positivePersonalityTraits) ?? []).map((expertise, index) => (
                              <Tag key={index} style={styles.expertiseTag}>{expertise}</Tag>
                            ))}
                          </div>
                          <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>Accomplishments: </strong> {proff_student && proff_student.accomplishments} </p>
                          <div>
                            <strong style={{ ...styles.descriptionTitle, marginBottom: "8px" }}>Academic Skills : </strong>
                            {((proff_student && proff_student.academicSkills) ?? []).map((expertise, index) => (
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

            <div style={{ marginTop: "20px", marginLeft: "570px" }}>
              <Button type="primary" style={{ marginRight: '10px' }} onClick={() => handleChange("accepted")}>Accept</Button>
              <Button type="primary" onClick={() => handleChange("rejected")}>Reject</Button>

            </div>
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
