// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, Row, Col, Tag, Button } from "antd";
// import { useParams, Link } from "react-router-dom";
// import DefaultLayout from "../components/DefaultLayout";
// import Spinner from "../components/Spinner";
// import { useNavigate } from "react-router-dom";

// const ProfessorHomeStudentProfile = () => {
//   const { id } = useParams();
//   const [student, setStudent] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8000/api/students/getstudent/${id}`)
//       .then((response) => {
//         setStudent(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching student: ", error);
//       });
//   }, [id]);

//   const convertBase64ToImage = (base64String) => {
//     return `data:image/jpeg;base64,${base64String}`;
//   };

//   const handleChange = () => {
//     navigate("/student/apply", { state: student });
//   };

//   const styles = {
//     studentProfile: {
//       padding: "20px",
//       marginTop: "60px", // Adjust margin-top based on navbar height
//     },
//     studentCard: {
//       width: "100%",
//       borderRadius: "8px",
//       boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//       transition: "box-shadow 0.3s ease",
//     },
//     profilePic: {
//       width: "150px", // Adjust the size of the profile picture here
//       height: "150px", // Adjust the size of the profile picture here
//       borderRadius: "50%", // Make the profile picture rounded
//       margin: "0 auto", // Center the profile picture
//       display: "block", // Ensure the profile picture is displayed as a block element
//       marginTop: "20px",
//     },
//     descriptionTitle: {
//       fontWeight: "bold",
//       marginBottom: "4px",
//     },
//     descriptionText: {
//       marginBottom: "12px",
//     },
//     applyButton: {
//       marginTop: "20px",
//       textAlign: "center",
//     },
//   };

//   return (
//     <DefaultLayout>
//       <div style={styles.studentProfile}>
//         {!student && <Spinner />}
//         {student && (
//           <Row justify="center" align="middle">
//             <Col xs={24} sm={20} md={16} lg={12}>
//               <Card
//                 style={styles.studentCard}
//                 hoverable
//                 cover={<img alt="profile" src={convertBase64ToImage(student.profilePhoto)} style={styles.profilePic} />}
//                 className="student-card"
//               >
//                 <div style={{ padding: "16px" }}>
//                   <h2 style={{ marginBottom: "20px" }}>{student.name}</h2>
//                   <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>Email : </strong> {student.email}</p>
//                   <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>Branch : </strong> {student.branch}</p>
//                   <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>College ID : </strong> {student.collegeID}</p>
//                   <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>Passing Year : </strong> {student.passingYear}</p>
//                   <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>University : </strong> {student.university}</p>
//                   <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>Gender : </strong> {student.gender}</p>
//                   <p style={styles.descriptionText}><strong style={styles.descriptionTitle}>Transcript :</strong> <img src={convertBase64ToImage(student.transcriptPhoto)} alt="transcript" /></p>
//                 </div>
//               </Card>
//             </Col>
//           </Row>
//         )}

//         <div style={styles.applyButton}>
//             <Button type="primary" onClick={handleChange}>Apply for LOR</Button>
//         </div>
//       </div>
//     </DefaultLayout>
//   );
// };

// export default ProfessorHomeStudentProfile;

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
    navigate(`/professor/student/${studentId}`, { state: { professorId: location.state.professorId } });
  };

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

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Row, Col } from "antd";
// import Spinner from "../components/Spinner";
// import { Navbar, Button } from "react-bootstrap";
// import { Link, useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// const ProfessorHomeStudentProfile = () => {
//   const user = localStorage.getItem("user");
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [professor, setProfessor] = useState();
//   const [allStudents, setAllStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8000/api/professors/getprofessors/${JSON.parse(user).email}`)
//       .then((professorResponse) => {
//         const professorObj = professorResponse.data;
//         setProfessor(professorObj);
//         console.log(location.state.lorStatus);
//         const filteredStudents = professorObj.students.filter(student => student.lorStatus === location.state.lorStatus);
//         setFilteredStudents(filteredStudents);
//         //console.log(filteredStudents);
//     //     const professorId = professorResponse.data._id;
//          const professorStudents = professorResponse.data.students.map(student => student.studentId);
//         axios
//           .get(`http://localhost:8000/api/professors/getStudentsByProfessor/${professorObj._id}/${location.state.lorStatus}`)
//           .then((studentsResponse) => {
//             setAllStudents(studentsResponse.data);
//             console.log(allStudents)
//           })
//           .catch((error) => {
//             console.error("Error fetching students: ", error);
//           });
//       })

//       .catch((error) => {
//         console.error("Error fetching professor: ", error);
//       });
//   }, [user]);

//   const handleStudentClick = (studentId) => {
//     navigate(`/professor/student/${studentId}`);
//   };

//   const handleHomeClick = () => {
//     navigate("/professor/home");
//   };

//   const handleEditProfileClick = () => {
//     navigate("/professor/edit");
//   };

//   const handleChangePasswordClick = () => {
//     navigate("/changepassword");
//   };

//   const handleLogoutClick = () => {
//     localStorage.removeItem("user");
//     navigate("/", { replace: true });
//   };

//   return (
//     <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", marginTop: "60px" }}>
//       <Navbar expand="lg" fixed="top" style={{ backgroundColor: "#DCDCDA" }}>
//         <Navbar.Brand>
//           <Link to="/" style={{ color: "#343a40", fontWeight: "bold", fontSize: "2vw", textDecoration: "none", marginLeft: "4vw" }}>
//             Endorsify
//           </Link>
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end px-5">
//           <Button
//             variant="primary"
//             onClick={handleHomeClick}
//             style={{
//               marginRight: "10px",
//               backgroundColor: "transparent",
//               color: "#007bff",
//               border: "1px solid #007bff",
//               transition: "background-color 0.3s, color 0.3s",
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.backgroundColor = "#007bff";
//               e.target.style.color = "#ffffff";
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.backgroundColor = "transparent";
//               e.target.style.color = "#007bff";
//             }}
//           >
//             Home
//           </Button>
//           <Button
//             variant="primary"
//             onClick={handleEditProfileClick}
//             style={{
//               marginRight: "10px",
//               backgroundColor: "transparent",
//               color: "#007bff",
//               border: "1px solid #007bff",
//               transition: "background-color 0.3s, color 0.3s",
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.backgroundColor = "#007bff";
//               e.target.style.color = "#ffffff";
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.backgroundColor = "transparent";
//               e.target.style.color = "#007bff";
//             }}
//           >
//             Edit Profile
//           </Button>
//           <Button
//             variant="primary"
//             onClick={handleChangePasswordClick}
//             style={{
//               marginRight: "10px",
//               backgroundColor: "transparent",
//               color: "#007bff",
//               border: "1px solid #007bff",
//               transition: "background-color 0.3s, color 0.3s",
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.backgroundColor = "#007bff";
//               e.target.style.color = "#ffffff";
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.backgroundColor = "transparent";
//               e.target.style.color = "#007bff";
//             }}
//           >
//             Change Password
//           </Button>
//           <Button
//             variant="primary"
//             onClick={handleLogoutClick}
//             style={{
//               backgroundColor: "transparent",
//               color: "#007bff",
//               border: "1px solid #007bff",
//               transition: "background-color 0.3s, color 0.3s",
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.backgroundColor = "#007bff";
//               e.target.style.color = "#ffffff";
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.backgroundColor = "transparent";
//               e.target.style.color = "#007bff";
//             }}
//           >
//             Logout
//           </Button>
//         </Navbar.Collapse>
//       </Navbar>
//       <div className="content" style={{ padding: "20px", flex: "1" }}>
//         <div style={{ padding: "20px" }}>
//           <Row justify="center" gutter={[16, 16]}>
//             {filteredStudents.length === 0 && <Spinner />}
//             {filteredStudents.length > 0 &&
//               filteredStudents.map((student) => (
//                 <Col lg={5} sm={12} xs={24} key={student.id}>
//                   <div
//                     style={{
//                       backgroundColor: "#f9f9f9",
//                       border: "1px solid #ddd",
//                       borderRadius: "10px",
//                       padding: "20px",
//                       textAlign: "center",
//                       boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                       marginBottom: "20px",
//                       cursor: "pointer",
//                     }}
//                     onClick={() => handleStudentClick(student._id)}
//                   >
//                     <img
//                       src={allStudents.profilePhoto}
//                       alt="Student Profile"
//                       style={{
//                         width: "120px",
//                         height: "120px",
//                         borderRadius: "50%",
//                         objectFit: "cover",
//                         marginBottom: "15px",
//                       }}
//                     />
//                     <p style={{ fontSize: "18px", fontWeight: "bold", margin: "0" }}>
//                       {allStudents.name}
//                     </p>
//                   </div>
//                 </Col>
//               ))}
//           </Row>
//         </div>
//       </div>
//       <footer className="footer text-center" style={{ backgroundColor: "#DCDCDA", color: "#343a40", padding: "10px", position: "fixed", bottom: "0", width: "100%" }}>
//         <p>&copy; {new Date().getFullYear()} Endorsify. All Rights Reserved.</p>
//         <Link to="/terms-and-conditions" style={{ color: "#343a40" }}>Terms and Conditions</Link>
//       </footer>
//     </div>
//   );
// };

// export default ProfessorHomeStudentProfile;


