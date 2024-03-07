import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import PricingComponent from "./Pricing.js";
import DocxEditor from "./docxEditor.js";

const Dashboard = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("students");
  const [students, setStudents] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [university, setUniversity] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [docxContent, setDocxContent] = useState("");

  useEffect(() => {
    const universityEmail = location.state.user.email;

    if (1) {
      axios
        .get(
          `http://localhost:8000/api/universities/getuniversity/${universityEmail}`
        )
        .then((response) => {
          setUniversity(response.data);
          const base64Content = response.data.docxFile;   
          const decodedContent = atob(base64Content);
          console.log(base64Content);
          setDocxContent(decodedContent);

          const fetchedUniid = response.data._id;
          axios
            .get(
              `http://localhost:8000/api/students/getallstudents/${fetchedUniid}`
            )
            .then((response1) => {
              setStudents(response1.data);
            })
            .catch((error) => console.error("Error fetching students:", error));

          // Fetch data for Professors based on uniid
          axios
            .get(
              `http://localhost:8000/api/professors/getallprofessors/${fetchedUniid}`
            )
            .then((response2) => {
              setProfessors(response2.data);
            })
            .catch((error) =>
              console.error("Error fetching professors:", error)
            );
        })
        .catch((error) => console.error("Error fetching uniid:", error));
    }
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const openModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={3} className="bg-light">
          <div className="d-flex flex-column align-items-center p-4">
            <h2 className="mb-4">Dashboard</h2>
            <button
              className={`btn btn-light mb-3 ${
                activeSection === "students" && "active"
              }`}
              onClick={() => handleSectionChange("students")}
            >
              Students
            </button>
            <button
              className={`btn btn-light mb-3 ${
                activeSection === "professors" && "active"
              }`}
              onClick={() => handleSectionChange("professors")}
            >
              Professors
            </button>

            <button
              className={`btn btn-light mb-3 ${
                activeSection === "lors" && "active"
              }`}
              onClick={() => handleSectionChange("lors")}
            >
              LORs
            </button>

            <button
              className={`btn btn-light mb-3 ${
                activeSection === "profile" && "active"
              }`}
              onClick={() => handleSectionChange("profile")}
            >
              Profile
            </button>

            <button
              className={`btn btn-light mb-3 ${
                activeSection === "pricing" && "active"
              }`}
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
                    <th>Gender</th>
                    <th>View Profile</th>
                    <th>View Transcript</th>
                    <th>Passing Year</th>
                    <th>Branch</th>
                    <th>College ID</th>
                    {/* Add more columns as needed */}
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.gender}</td>
                      <td>
                        <Button
                          variant="link"
                          onClick={() => openModal(student.profilePhoto)}
                        >
                          View Profile
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="link"
                          onClick={() => openModal(student.transcriptPhoto)}
                        >
                          View Transcript
                        </Button>
                      </td>
                      <td>{student.passingYear}</td>
                      <td>{student.branch}</td>
                      <td>{student.collegeID}</td>
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
                    <th>Gender</th>
                    <th>Teacher ID</th>
                    <th>Qualification</th>
                    <th>Expertise</th>
                    <th>Experience</th>
                    <th>Portfolio URL</th>
                    {/* Add more columns as needed */}
                    <th>View Profile</th>
                    <th>Sign Photo</th>
                  </tr>
                </thead>
                <tbody>
                  {professors.map((professor) => (
                    <tr key={professor._id}>
                      <td>{professor.name}</td>
                      <td>{professor.email}</td>
                      <td>{professor.gender}</td>
                      <td>{professor.teacherId}</td>
                      <td>{professor.qualification}</td>
                      <td>{professor.expertise.join(", ")}</td>
                      <td>{professor.experience}</td>
                      <td>{professor.portfolioURL}</td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => openModal(professor.profilePhoto)}
                        >
                          View Profile
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => openModal(professor.signPhoto)}
                        >
                          View Sign
                        </Button>
                      </td>
                      {/* Add more cells as needed */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Profile Section */}
          {activeSection === "profile" && university && (
            <div className="mb-4">
              <h2>University Profile</h2>
              <p>Email: {university.email}</p>
              <p>Name: {university.name}</p>
              {university.location && (
                <p>
                  Location: {university.location.city},{" "}
                  {university.location.state} {university.location.postalCode}
                </p>
              )}
              <p>Website URL: {university.websiteURL}</p>
              <p>Logo:</p>
              {university.logo && (
                <img
                  src={`data:image/jpeg;base64,${university.logo}`}
                  alt="University Logo"
                  style={{ width: "100px" }}
                />
              )}

            <p>Edit Docx File Content:</p>
              <DocxEditor docxContent={docxContent} />
                {/* Add more details as needed */}
            </div>
          )}

          {activeSection === "pricing" && (
            <div className="mb-4">
              <PricingComponent />
            </div>
          )}

          <Modal show={showModal} onHide={closeModal}>
            <Modal.Body>
              {modalImageUrl && (
                <img
                  src={`data:image/jpeg;base64,${modalImageUrl}`}
                  alt="Preview"
                  style={{ width: "100%" }}
                />
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
