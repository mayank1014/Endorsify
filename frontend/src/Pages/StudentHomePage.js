import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "antd";
import Spinner from "../components/Spinner";
// import DefaultLayout from "../components/DefaultLayout";
import { Navbar, Button } from "react-bootstrap"; // Changed Dropdown to Button
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const StudentHomePage = () => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  const [student, setStudent] = useState();
  const [allProfessors, setAllProfessors] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/student/getstudent/${JSON.parse(user).email}`
      )
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
  }, []);

  const handleProfessorClick = (professorId) => {
    navigate(`/student/professor/${professorId}`);
  };

  const handleHomeClick = () => {
    navigate('/student/home');
  };

  const handleEditProfileClick = () => {
    navigate('/student/edit');
  };

  const handleChangePasswordClick = () => {
    navigate('/changepassword');
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", marginTop: "60px" }}>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar expand="lg" fixed="top" style={{ backgroundColor: "#DCDCDA" }}>
          <Navbar.Brand>
            <Link to="/" style={{ color: "#343a40", fontWeight: "bold", fontSize: "2vw", textDecoration: "none", marginLeft: "4vw" }}>
              Endorsify
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end px-5">
            <Button
              variant="primary"
              onClick={handleHomeClick}
              style={{
                marginRight: "10px",
                backgroundColor: "transparent",
                color: "#007bff",
                border: "1px solid #007bff",
                transition: "background-color 0.3s, color 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#007bff";
                e.target.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#007bff";
              }}
            >
              Home
            </Button>
            <Button
              variant="primary"
              onClick={handleEditProfileClick}
              style={{
                marginRight: "10px",
                backgroundColor: "transparent",
                color: "#007bff",
                border: "1px solid #007bff",
                transition: "background-color 0.3s, color 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#007bff";
                e.target.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#007bff";
              }}
            >
              Edit Profile
            </Button>
            <Button
              variant="primary"
              onClick={handleChangePasswordClick}
              style={{
                marginRight: "10px",
                backgroundColor: "transparent",
                color: "#007bff",
                border: "1px solid #007bff",
                transition: "background-color 0.3s, color 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#007bff";
                e.target.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#007bff";
              }}
            >
              Change Password
            </Button>
            <Button
              variant="primary"
              onClick={handleLogoutClick}
              style={{
                backgroundColor: "transparent",
                color: "#007bff",
                border: "1px solid #007bff",
                transition: "background-color 0.3s, color 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#007bff";
                e.target.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#007bff";
              }}
            >
              Logout
            </Button>
          </Navbar.Collapse>
        </Navbar>
        <div className="content" style={{ padding: "20px", flex: "1" }}>
          <div style={{ padding: "20px" }}>
            <Row justify="center" gutter={[16, 16]}>
              {allProfessors.length <= 0 && <Spinner />}
              {allProfessors.length > 0 &&
                allProfessors.map((professor) => (
                  <Col lg={5} sm={12} xs={24} key={professor.id}>
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
                      onClick={() => handleProfessorClick(professor._id)}
                    >
                      <img
                        src={`data:image/jpeg;base64,${professor.profilePhoto}`}
                        alt="Professor Profile"
                        style={{
                          width: "120px",
                          height: "120px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          marginBottom: "15px",
                        }}
                      />
                      <p style={{ fontSize: "18px", fontWeight: "bold", margin: "0" }}>
                        {professor.name}
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
    </div>
  );
};

export default StudentHomePage;
