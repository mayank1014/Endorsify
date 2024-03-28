import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import {
    FaUniversity,
    FaEdit,
    FaKey,
    FaSignOutAlt,
    FaFileSignature, 
    FaUserEdit,
  } from "react-icons/fa";
  import { IoPricetagsSharp } from "react-icons/io5";
  

  const UniversityPage = () => {
    const [cookies] = useCookies(['users']);
  if (!localStorage.getItem("user")) {
    localStorage.setItem("user", JSON.stringify(cookies.users));
  }
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
  
    const [university, setUniversity] = useState(null);
  
    useEffect(() => {
      axios
        .get(`http://localhost:8000/api/universities/getUniversity/${user.email}`)
        .then((response) => {
          setUniversity(response.data);
        })
        .catch((error) => {
          console.error("Error fetching university: ", error);
        });
    }, []);
  
    return (
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Left Sidebar */}
        <div
          style={{
            backgroundColor: "#343a40",
            padding: "20px",
            width: "250px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <h2
              style={{
                color: "#DCDCDA",
                fontWeight: "bold",
                fontSize: "24px",
                textAlign: "center",
              }}
            >
              <Link
                to="/"
                style={{
                  color: "#DCDCDA",
                  textDecoration: "none",
                }}
              >
                Your University
              </Link>
            </h2>
            {university && (
              <div style={{ textAlign: "center", marginTop: "7vh" }}>
                <img
                  src={university.logo}
                  alt="University Logo"
                  style={{
                    width: "8vw",
                    height: "8vw",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: "10px",
                  }}
                />
                <p
                  style={{
                    color: "#DCDCDA",
                    fontSize: "16px",
                    marginBottom: "3px",
                  }}
                >
                  {university.name}
                </p>
                <p
                  style={{
                    color: "#DCDCDA",
                    fontSize: "12px",
                    fontWeight: "lighter",
                  }}
                >
                  {university.email}
                </p>
              </div>
            )}
          </div>
          <Navbar expand="lg">
            <Navbar.Collapse id="basic-navbar-nav">
              <ul className="navbar-nav flex-column">
                {/* Removed Home */}
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
                <li className="nav-item" style={{ marginLeft: "-10px" }}>
                  <Link
                    to="students"
                    className="nav-link"
                    style={{
                      color: "#DCDCDA",
                      textDecoration: "none",
                      padding: "10px 20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FaUniversity size={20} style={{ marginRight: "10px" }} />
                    Students
                  </Link>
                </li>
                <li className="nav-item" style={{ marginLeft: "-10px" }}>
                  <Link
                    to="professors"
                    className="nav-link"
                    style={{
                      color: "#DCDCDA",
                      textDecoration: "none",
                      padding: "10px 20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FaEdit size={20} style={{ marginRight: "10px" }} />
                    Professors
                  </Link>
                </li>
                <li className="nav-item" style={{ marginLeft: "-10px" }}>
                  <Link
                    to="subscription"
                    className="nav-link"
                    style={{
                      color: "#DCDCDA",
                      textDecoration: "none",
                      padding: "10px 20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <IoPricetagsSharp size={20} style={{ marginRight: "10px" }} />
                    Subscription
                  </Link>
                </li>
                <li className="nav-item" style={{ marginLeft: "-10px" }}>
                  <Link
                    to="lor"
                    className="nav-link"
                    style={{
                      color: "#DCDCDA",
                      textDecoration: "none",
                      padding: "10px 20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FaFileSignature size={20} style={{ marginRight: "10px" }} />
                    LOR
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
          <Outlet />
        </div>
      </div>
    );
  };
  
  export default UniversityPage;