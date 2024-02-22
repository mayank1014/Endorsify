import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import PricingComponent from "./Pricing.js"

const Dashboard = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("students");
  const [students, setStudents] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [university, setUniversity] = useState([])
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Fetch uniid from university email
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      const universityEmail = user.email;
      axios
        .get(`http://localhost:8000/api/universities/getuniversity/${universityEmail}`)
        .then((response) => {
          setUniversity(response.data)
          const fetchedUniid = response.data._id;
          // Fetch data for Students based on uniid
          axios
            .get(`http://localhost:8000/api/students/getallstudents/${fetchedUniid}`)
            .then((response1) => {
              setStudents(response1.data);
            })
            .catch((error) => console.error("Error fetching students:", error));

          // Fetch data for Professors based on uniid
          axios
            .get(`http://localhost:8000/api/professors/getallprofessors/${fetchedUniid}`)
            .then((response2) => {
              setProfessors(response2.data);
            })
            .catch((error) => console.error("Error fetching professors:", error));
        })
        .catch((error) => console.error("Error fetching uniid:", error));
    }
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={3} className="bg-light">
          <div className="d-flex flex-column align-items-center p-4">
            <h2 className="mb-4">Dashboard</h2>
            <button
              className={`btn btn-light mb-3 ${activeSection === "students" && "active"}`}
              onClick={() => handleSectionChange("students")}
            >
              Students
            </button>
            <button
              className={`btn btn-light mb-3 ${activeSection === "professors" && "active"}`}
              onClick={() => handleSectionChange("professors")}
            >
              Professors
            </button>

            <button
              className={`btn btn-light mb-3 ${activeSection === "lors" && "active"}`}
              onClick={() => handleSectionChange("lors")}
            >
              LORs
            </button>

            <button
              className={`btn btn-light mb-3 ${activeSection === "profile" && "active"}`}
              onClick={() => handleSectionChange("profile")}
            >
              Profile
            </button>

            <button
              className={`btn btn-light mb-3 ${activeSection === "pricing" && "active"}`}
              onClick={() => handleSectionChange("pricing")}
            >
              Subscription
            </button>

            
            {/* Add more buttons for additional sections */}
          </div>
        </Col>

        {/* Main Content */}
        <Col md={9} className="p-4">
          <h1 className="mb-4">University Dashboard</h1>

          {/* Students Section */}
          {activeSection === "students" && (
            <div className="mb-4">
              <h2>Students</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    {/* Add more columns as needed */}
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      {/* Add more cells as needed */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Professors Section */}
          {activeSection === "professors" && (
            <div className="mb-4">
              <h2>Professors</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    {/* Add more columns as needed */}
                  </tr>
                </thead>
                <tbody>
                  {professors.map((professor) => (
                    <tr key={professor._id}>
                      <td>{professor.name}</td>
                      <td>{professor.email}</td>
                      {/* Add more cells as needed */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeSection === "profile" && university && (
            <div className="mb-4">
              <h2>University Profile</h2>
              <p>Email: {university.email}</p>
              <p>Name: {university.name}</p>
              <p>Location: {university.location.city}, {university.location.state} {university.location.postalCode}</p>
              <p>Website URL: {university.websiteURL}</p>
              {/* Add more details as needed */}
            </div>
          )}

          {activeSection === "pricing" && (
            <div className="mb-4">
              <PricingComponent/>
            </div>
          )}

        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;