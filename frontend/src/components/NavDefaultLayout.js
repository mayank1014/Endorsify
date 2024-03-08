import React from "react";
import { Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function DefaultLayout(props) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleHomeClick = () => {
    navigate("/professor/home");
  };

  const handleEditProfileClick = () => {
    navigate("/professor/edit");
  };

  const handleChangePasswordClick = () => {
    navigate("/changepassword");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* <Navbar expand="lg" fixed="top" style={{ backgroundColor: "#DCDCDA" }}>
        <Navbar.Brand>
          <Link to="/" style={{ color: "#343a40", fontWeight: "bold", fontSize: "2vw", textDecoration: "none", marginLeft: "4vw" }}>
            Endorsify
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end px-5">
          {/* Dropdown button with user options */}
          {/* <Dropdown>
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
        </Navbar.Collapse> */}
      {/* </Navbar> */} 
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
        {props.children}
      </div>
      {/* <footer
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
      </footer> */}
    </div>
  );
}

export default DefaultLayout;
