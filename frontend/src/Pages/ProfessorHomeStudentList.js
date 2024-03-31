import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "antd";
import Spinner from "../components/Spinner";
import { Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

const ProfessorHomeStudentList = () => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const location = useLocation();

  const [allstudents, setAllStudents] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/professors/getStudentsByProfessor/${location.state.professorId}/${location.state.lorStatus}`, {
      })
      .then((studentsResponse) => {
        setAllStudents(studentsResponse.data);
      })
      .catch((error) => {
        console.error("Error fetching students: ", error);
      });
  }, []);
  const handleStudentClick = (studentId) => {
    navigate(`/professor/student/${studentId}`, { state: { professorId: location.state.professorId, lorStatus : location.state.lorStatus } });
  };


  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", marginTop: "60px" }}>
      <div className="content" style={{ padding: "20px", flex: "1" }}>
        <div style={{ padding: "20px" }}>
          <Row justify="center" gutter={[16, 16]}>
            {allstudents.length <= 0 && <Spinner />}
            {allstudents.length > 0 &&
              allstudents.map((student) => (
                <Col lg={5} sm={12} xs={24} key={student.id}>
                  <div
                    style={{
                      backgroundColor: "#f9f9f9",
                      border: "1px solid #ddd",
                      borderRadius: "10px",
                      padding: "20px",
                      textAlign: "center",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      marginBottom: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleStudentClick(student._id)}
                  >
                    <img

                      src={student.profilePhoto}
                      alt="Student Profile"
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginBottom: "15px",
                      }}
                    />
                    <p style={{ fontSize: "18px", fontWeight: "bold", margin: "0" }}>
                      {student.name}
                    </p>
                  </div>
                </Col>
              ))}
          </Row>
        </div>
      </div>
      <footer className="footer text-center" style={{ backgroundColor: "#DCDCDA", color: "#343a40", padding: "10px", position: "fixed", bottom: "0", width: "100%" }}>
        <p>&copy; {new Date().getFullYear()} Endorsify. All Rights Reserved.</p>
        <Link to="/terms-and-conditions" style={{ color: "#343a40" }}>Terms and Conditions</Link>
      </footer>
    </div>
  );
};

export default ProfessorHomeStudentList;

