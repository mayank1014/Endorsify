import { useNavigate } from "react-router-dom";
import '../css/Register.css'; 
import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

const ProfessorHomePage = () => {
  const [cookies] = useCookies(['users']);
  const navigate = useNavigate();
  if (!localStorage.getItem("user")) {
    localStorage.setItem("user", JSON.stringify(cookies.users));
  }
  const user = JSON.parse(localStorage.getItem("user") );
    const [professor, setProfessor] = useState(null); 

    useEffect(() => {
        if (user && user.email){
            axios
             .get(`http://localhost:8000/api/professors/getprofessors/${user.email}`)
            .then((professorResponse) => {
                setProfessor(professorResponse.data);
            })
            .catch((error) => {
                console.error("Error fetching professor details:", error);
            });
        }
    }, [user]);

    // Render spinner until professor data is fetched
    if (professor === null) {
        return <Spinner />;
    }

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", marginTop: "60px" }}>

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