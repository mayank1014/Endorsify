import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col, Tag, Button } from "antd";
import { useParams, Link } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const UniversityProfessorProfile = () => {
  const { id } = useParams();
  const [professor, setProfessor] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/professors/getprofessor/${id}`)
      .then((response) => {
        setProfessor(response.data);
      })
      .catch((error) => {
        console.error("Error fetching professor : ", error);
      });
  }, [id]);

  const convertBase64ToImage = (base64String) => {
    return `data:image/jpeg;base64,${base64String}`;
  };

  const formatPortfolioURL = (url) => {
    if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
      return url;
    } else {
      return url ? `http://${url}` : ""; // Returning an empty string if url is undefined or null
    }
  };  

  const handleChange = () => {
    navigate("/student/apply", {state: professor})
  }

  const styles = {
    professorProfile: {
      padding: "20px",
    },
    professorCard: {
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
      <div style={styles.professorProfile}>
        {!professor && <Spinner />}
        {professor && (
          <Row justify="center" align="middle">
            <Col xs={24} sm={20} md={16} lg={12}>
              <Card
                style={styles.professorCard}
                hoverable
                cover={<img alt="profile" src={professor.profilePhoto} style={styles.profilePic} />}
                className="professor-card"
              >
                <div style={{ padding: "16px" }}>
                  <h2 style={{ marginBottom: "20px" }}>{professor.name}</h2>
                  <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>Email : </strong> {professor.email}</p>
                  <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>Qualification : </strong> {professor.qualification}</p>
                  <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>Experience : </strong> {professor.experience} years</p>
                  <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>Portfolio URL : </strong> <a href={formatPortfolioURL(professor.portfolioURL)}>{professor.portfolioURL}</a></p>
                  <div>
                    <strong style={{ ...styles.descriptionTitle, marginBottom: "8px" }}>Expertise : </strong>
                    {(professor.expertise ?? []).map((expertise, index) => (
                      <Tag key={index} style={styles.expertiseTag}>{expertise}</Tag>
                    ))}
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default UniversityProfessorProfile;
