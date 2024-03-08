import { useLocation, useNavigate } from "react-router-dom";
import '../css/Register.css'; 
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "antd";
import Spinner from "../components/Spinner";
import { Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProfessorHomePage = () => {
    const user = localStorage.getItem("user");
    const [professor, setProfessor] = useState(null); // Initialize professor state with null
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/professors/getprofessors/${JSON.parse(user).email}`)
            .then((professorResponse) => {
                // const professorName = professorResponse.data.name;
                // console.log(professorName);
                setProfessor(professorResponse.data);
            })
            .catch((error) => {
                console.error("Error fetching professor details:", error);
            });
    }, [user]); // Add user to the dependency array

    // const handleChange = (arg) => {
    //     if(arg === 'accepted') {
    //         navigate('/professor/accepted', { state : location.state })
    //     }
    //     else if(arg === 'pending') {
    //         navigate('/professor/pending', { state : location.state })
    //     }
    //     else if(arg === 'rejected') {
    //         navigate('/professor/rejected', { state : location.state })
    //     }
    // }
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

    // Render spinner until professor data is fetched
    if (professor === null) {
        return <Spinner />;
    }
    var stats;
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", marginTop: "60px" }}>
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

            <div className="home-page">
                <div className="welcome-section">
                    <h1>Welcome {professor.name}</h1>
                    <p className='p1'>Endorsify is an online platform for issuing and managing Letters of Recommendation.</p>
                </div>
                <div className="registration-options">
                    <div className="registration-option">
                        <h2>Pending Requests</h2>
                        <p>View and manage pending requests for letters of recommendation.</p>
                        <button className="register-button" onClick={() => navigate("/professor/home/student" ,{ state: { lorStatus: "pending", professorId: professor._id } })}>Click Here</button>
                    </div>
                    <div className="registration-option">
                        <h2>Approved Requests</h2>
                        <p>View approved requests for letters of recommendation.</p>
                        <button className="register-button" onClick={() => navigate("/professor/home/student", { state: { lorStatus: "accepted", professorId: professor._id } })}>Click Here</button>
                    </div>
                    <div className="registration-option">
                        <h2>Rejected Requests</h2>
                        <p>View rejected requests for letters of recommendation.</p>
                        <button className="register-button" onClick={() => navigate("/professor/home/student",{ state: { lorStatus: "rejected", professorId: professor._id } })}>Click Here</button>
                    </div>
                </div>
            </div>
            </div>
    );
};

export default ProfessorHomePage;