import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col, Tag, Button } from "antd";
import { useParams, Link } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const ProfessorHomeStudentProfile = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/students/getstudent/${id}`)
      .then((response) => {
        setStudent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student: ", error);
      });
  }, [id]);

  const convertBase64ToImage = (base64String) => {
    return `data:image/jpeg;base64,${base64String}`;
  };

  const handleChange = () => {
    navigate("/student/apply", { state: student });
  };

  const styles = {
    studentProfile: {
      padding: "20px",
      marginTop: "60px", // Adjust margin-top based on navbar height
    },
    studentCard: {
      width: "100%",
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
    descriptionTitle: {
      fontWeight: "bold",
      marginBottom: "4px",
    },
    descriptionText: {
      marginBottom: "12px",
    },
    applyButton: {
      marginTop: "20px",
      textAlign: "center",
    },
  };

  return (
    <DefaultLayout>
      <div style={styles.studentProfile}>
        {!student && <Spinner />}
        {student && (
          <Row justify="center" align="middle">
            <Col xs={24} sm={20} md={16} lg={12}>
              <Card
                style={styles.studentCard}
                hoverable
                cover={<img alt="profile" src={convertBase64ToImage(student.profilePhoto)} style={styles.profilePic} />}
                className="student-card"
              >
                <div style={{ padding: "16px" }}>
                  <h2 style={{ marginBottom: "20px" }}>{student.name}</h2>
                  <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>Email : </strong> {student.email}</p>
                  <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>Branch : </strong> {student.branch}</p>
                  <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>College ID : </strong> {student.collegeID}</p>
                  <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>Passing Year : </strong> {student.passingYear}</p>
                  <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>University : </strong> {student.university}</p>
                  <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>Gender : </strong> {student.gender}</p>
                  <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>Transcript :</strong> <img src={convertBase64ToImage(student.transcriptPhoto)} alt="transcript" /></p>
                </div>
              </Card>
            </Col>
          </Row>
        )}

        <div style={styles.applyButton}>
            <Button type="primary" onClick={handleChange}>Apply for LOR</Button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProfessorHomeStudentProfile;
