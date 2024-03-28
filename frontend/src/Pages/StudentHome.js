import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "antd";
import { useCookies } from 'react-cookie';

const StudentHome = () => {
  const [cookies] = useCookies(['users']);
  const navigate = useNavigate();
  if (!localStorage.getItem("user")) {
    localStorage.setItem("user", JSON.stringify(cookies.users));
  }
  const user = JSON.parse(localStorage.getItem("user") );
  const [student, setStudent] = useState(null);
  const [allProfessors, setAllProfessors] = useState([]);

  useEffect(() => {
    if (user && user.email){
     axios
      .get(`http://localhost:8000/api/students/getstudent/${user.email}`)
      .then((response) => {
        setStudent(response.data);

        axios
          .get(
            `http://localhost:8000/api/professors/getallprofessors/${response.data.universityId}`
          )
          .then((response) => {
            setAllProfessors(response.data);
          })
          .catch((error) => {
            console.error("Error fetching professor : ", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching student : ", error);
      });
  }}, [user]);

  const handleProfessorClick = (professorId) => {
    navigate(`/student/professor/${professorId}`);
  };

  return (
    <div
      className="content"
      style={{
        padding: "20px",
        flex: "1",
        marginTop: "10vh",
        overflowY: "auto",
      }}
    >
      <Row justify="center" gutter={[16, 16]}>
        {allProfessors.length <= 0 && <Spinner />}
        {allProfessors.length > 0 &&
          allProfessors.map((professor) => (
            <Col lg={7} sm={12} xs={24} key={professor.id}>
              <div
                style={{
                  marginLeft: "25px",
                  marginRight: "25px",
                  backgroundColor: "#f9f9f9", // Background color for professor card
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "20px",
                  textAlign: "center",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  marginBottom: "20px", // Add margin bottom here
                  marginTop: "20px",
                  cursor: "pointer",
                }}
                onClick={() => handleProfessorClick(professor._id)}
              >
                <img
                  src={professor.profilePhoto}
                  alt="Professor Profile"
                  style={{
                    width: "9vw",
                    height: "9vw",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: "15px",
                  }}
                />
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    margin: "0",
                  }}
                >
                  {professor.name}
                </p>
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default StudentHome;
