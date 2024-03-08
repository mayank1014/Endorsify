import React from "react";
import { Navbar, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function StudentNavigation(props) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar expand="lg" fixed="top" style={{ backgroundColor: "#DCDCDA" }}>
        <Navbar.Brand>
          <Link to="/" style={{ color: "#343a40", fontWeight: "bold", fontSize: "2vw", textDecoration: "none", marginLeft: "4vw" }}>
            Endorsify
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end px-5">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {user.email}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/student/home">Home</Dropdown.Item>
              <Dropdown.Item href="/student/edit">Edit Profile</Dropdown.Item>
              <Dropdown.Item href="/changepassword">Change Password</Dropdown.Item>
              <Dropdown.Item onClick={() => {
                localStorage.removeItem("user");
                navigate("/", { replace: true });
              }}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Navbar>
      <div className="content" style={{ padding: "20px", flex: "1" }}>
        {props.children}
      </div>
      <footer
        className="footer text-center"
        style={{
          backgroundColor: "#DCDCDA",
          color: "#343a40",
          padding: "5px",
          position: "fixed", // Fixed position to stick it at the bottom
          bottom: "0", // Stick it at the bottom of the viewport
          width: "100%", // Ensure it spans the entire width
        }}
      >
        <p>&copy; {new Date().getFullYear()} Endorsify. All Rights Reserved.</p>
        <Link to="/terms-and-conditions" style={{ color: "#343a40" }}>
          Terms and Conditions
        </Link>
      </footer>
    </div>
  );
}

export default StudentNavigation;
