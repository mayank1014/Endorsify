import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "antd";
import Spinner from "../components/Spinner";
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHome, FaUserEdit, FaKey, FaSignOutAlt, FaFileAlt } from "react-icons/fa"; // Import the necessary icons

const Professor = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [professor, setProfessor] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/professors/getprofessors/${user.email}`)
      .then((response) => {
        setProfessor(response.data);
      })
      .catch((error) => {
        console.error("Error fetching professor : ", error);
      });
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Sidebar */}
      <div
        style={{
          backgroundColor: "#343a40",
          padding: "20px",
          width: "250px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ color: "#DCDCDA", fontWeight: "bold", fontSize: "24px", textAlign: "center" }}>
            <Link style={{ color: "#DCDCDA", textDecoration: "none" }}>Endorsify</Link>
          </h2>
          {professor && (
            <div style={{ textAlign: "center", marginTop: "7vh" }}>
              <img
                src={professor.profilePhoto}
                alt="professor Profile"
                style={{
                  width: "8vw",
                  height: "8vw",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />
              <p style={{ color: "#DCDCDA", fontSize: "16px", marginBottom: "3px" }}>{professor.name}</p>
              <p style={{ color: "#DCDCDA", fontSize: "12px", fontWeight: "lighter" }}>{professor.email}</p>
            </div>
          )}
        </div>
        <Navbar expand="lg">
          <Navbar.Collapse id="basic-navbar-nav">
            <ul className="navbar-nav flex-column">
              <li className="nav-item" style={{ marginLeft: "-10px" }}>
                <Link
                  to="home"
                  className="nav-link"
                  style={{
                    color: "#DCDCDA",
                    textDecoration: "none",
                    padding: "10px 20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FaHome size={20} style={{ marginRight: "10px" }} />
                  Home
                </Link>
              </li>
              <li className="nav-item" style={{ marginLeft: "-10px" }}>
                <Link
                  to="edit"
                  className="nav-link"
                  style={{
                    color: "#DCDCDA",
                    textDecoration: "none",
                    padding: "10px 20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FaUserEdit size={20} style={{ marginRight: "10px" }} />
                  Edit Profile
                </Link>
              </li>
              <li className="nav-item" style={{ marginLeft: "-10px" }}>
                <Link
                  to="changepassword"
                  className="nav-link"
                  style={{
                    color: "#DCDCDA",
                    textDecoration: "none",
                    padding: "10px 20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FaKey size={20} style={{ marginRight: "10px" }} />
                  Change Password
                </Link>
              </li>
            </ul>
          </Navbar.Collapse>
        </Navbar>
        <div style={{ marginTop: "auto" }}>
          <Link
            to="/"
            className="nav-link"
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/", { replace: true });
            }}
            style={{
              color: "#DCDCDA",
              textDecoration: "none",
              padding: "10px 20px",
              display: "flex",
              alignItems: "center",
              transition: "background-color 0.3s",
              borderTop: "1px solid #DCDCDA",
              marginTop: "auto",
            }}
          >
            <FaSignOutAlt size={20} style={{ marginRight: "10px" }} />
            Logout
          </Link>
        </div>
      </div>

      <div
        className="content"
        style={{
          padding: "20px",
          flex: "1",
          overflowY: "auto",
        }}
      >
        {/* Content Area */}
        <Outlet />
      </div>
    </div>
  );
};

export default Professor;
