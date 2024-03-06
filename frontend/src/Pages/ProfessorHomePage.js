// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Row, Col } from "antd";
// import Spinner from "../components/Spinner";
// import { Navbar, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// const ProfessorHomePage = () => {
//   const user = localStorage.getItem("user");
//   const navigate = useNavigate();

//   const [professor, setProfessor] = useState();
//   const [allstudents, setAllStudents] = useState([]);

// //   useEffect(() => {
// //     axios
// //       .get(`http://localhost:8000/api/professors/getprofessors/${JSON.parse(user).email}`)
// //       .then((professorResponse) => {
// //         const professorId = professorResponse.data._id;
// //         axios
// //           .get(`http://localhost:8000/api/professors/getStudentsByProfessor/${professorId}`)
// //           .then((studentsResponse) => {
// //             setProfessor(professorResponse.data);
// //             setAllStudents(studentsResponse.data);
// //           })
// //           .catch((error) => {
// //             console.error("Error fetching students: ", error);
// //           });
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching professor: ", error);
// //       });

// //   }, []);
// useEffect(() => {
//     axios
//       .get(`http://localhost:8000/api/professors/getprofessors/${JSON.parse(user).email}`)
//       .then((professorResponse) => {
//         const professorId = professorResponse.data._id;
//         const professorStudents = professorResponse.data.students.map(student => student.studentId);
//         axios
//           .get(`http://localhost:8000/api/professors/getStudentsByProfessor/${professorId}`, {
//             params: {
//               studentIds: professorStudents.join(',') // Comma-separated list of student ids
//             }
//           })
//           .then((studentsResponse) => {
//             setProfessor(professorResponse.data);
//             setAllStudents(studentsResponse.data);
//             console.log(studentsResponse.data);
//           })
//           .catch((error) => {
//             console.error("Error fetching students: ", error);
//           });
//       })
//       .catch((error) => {
//         console.error("Error fetching professor: ", error);
//       });
//   }, []);

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
//             {allstudents.length <= 0 && <Spinner />}
//             {allstudents.length > 0 &&
//               allstudents.map((student) => (
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
                      
//                       src={student.profilePhoto}
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
//                       {student.name}
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

// export default ProfessorHomePage;

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

    // useEffect(() => {
    //     axios
    //         .get(`http://localhost:8000/api/professors/getprofessors/${JSON.parse(user).email}`)
    //         .then((professorResponse) => {
    //             const professorName = professorResponse.data.name;
    //             console.log(professorName);
    //             setProfessor(professorName);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching professor details:", error);
    //         });
    // }, [user]); // Add user to the dependency array

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
    // if (professor === null) {
    //     return <Spinner />;
    // }
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
                    <h1>Welcome </h1>
                    <p className='p1'>Endorsify is an online platform for issuing and managing Letters of Recommendation.</p>
                </div>
                <div className="registration-options">
                    <div className="registration-option">
                        <h2>Pending Requests</h2>
                        <p>View and manage pending requests for letters of recommendation.</p>
                        <button className="register-button" stats="pending" onClick={() => navigate("/professor/home/student" ,{ state: { lorStatus: "pending" } })}>Click Here</button>
                    </div>
                    <div className="registration-option">
                        <h2>Approved Requests</h2>
                        <p>View approved requests for letters of recommendation.</p>
                        <button className="register-button" stats="accepted" onClick={() => navigate("/professor/home/student",{ state: { lorStatus: "accepted" } })}>Click Here</button>
                    </div>
                    <div className="registration-option">
                        <h2>Rejected Requests</h2>
                        <p>View rejected requests for letters of recommendation.</p>
                        <button className="register-button" stats="rejected" onClick={() => navigate("/professor/home/student",{ state: { lorStatus: "rejected" } })}>Click Here</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfessorHomePage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Navbar, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import ProfessorHomeStudentProfile from "./ProfessorHomeStudentProfile";
// import Spinner from "../components/Spinner";

// const ProfessorHomePage = () => {
//     const user = localStorage.getItem("user");
//     const [professor, setProfessor] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         axios
//             .get(`http://localhost:8000/api/professors/getprofessors/${JSON.parse(user).email}`)
//             .then((professorResponse) => {
//                 const professorName = professorResponse.data.name;
//                 setProfessor(professorName);
//             })
//             .catch((error) => {
//                 console.error("Error fetching professor details:", error);
//             })
//     }, [user]);

//     const handleHomeClick = () => {
//         navigate("/professor/home");
//     };

//     const handleEditProfileClick = () => {
//         navigate("/professor/edit");
//     };

//     const handleChangePasswordClick = () => {
//         navigate("/changepassword");
//     };

//     const handleLogoutClick = () => {
//         localStorage.removeItem("user");
//         navigate("/", { replace: true });
//     };

//     if (professor === null) {
//         return <Spinner />;
//     }
//     return (
//         <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", marginTop: "60px" }}>
//               <Navbar expand="lg" fixed="top" style={{ backgroundColor: "#DCDCDA" }}>
//                 <Navbar.Brand>
//                     <Link to="/" style={{ color: "#343a40", fontWeight: "bold", fontSize: "2vw", textDecoration: "none", marginLeft: "4vw" }}>
//                         Endorsify
//                     </Link>
//                 </Navbar.Brand>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end px-5">
//                     <Button
//                         variant="primary"
//                         onClick={handleHomeClick}
//                         style={{
//                             marginRight: "10px",
//                             backgroundColor: "transparent",
//                             color: "#007bff",
//                             border: "1px solid #007bff",
//                             transition: "background-color 0.3s, color 0.3s",
//                         }}
//                         onMouseEnter={(e) => {
//                             e.target.style.backgroundColor = "#007bff";
//                             e.target.style.color = "#ffffff";
//                         }}
//                         onMouseLeave={(e) => {
//                             e.target.style.backgroundColor = "transparent";
//                             e.target.style.color = "#007bff";
//                         }}
//                     >
//                         Home
//                     </Button>
//                     <Button
//                         variant="primary"
//                         onClick={handleEditProfileClick}
//                         style={{
//                             marginRight: "10px",
//                             backgroundColor: "transparent",
//                             color: "#007bff",
//                             border: "1px solid #007bff",
//                             transition: "background-color 0.3s, color 0.3s",
//                         }}
//                         onMouseEnter={(e) => {
//                             e.target.style.backgroundColor = "#007bff";
//                             e.target.style.color = "#ffffff";
//                         }}
//                         onMouseLeave={(e) => {
//                             e.target.style.backgroundColor = "transparent";
//                             e.target.style.color = "#007bff";
//                         }}
//                     >
//                         Edit Profile
//                     </Button>
//                     <Button
//                         variant="primary"
//                         onClick={handleChangePasswordClick}
//                         style={{
//                             marginRight: "10px",
//                             backgroundColor: "transparent",
//                             color: "#007bff",
//                             border: "1px solid #007bff",
//                             transition: "background-color 0.3s, color 0.3s",
//                         }}
//                         onMouseEnter={(e) => {
//                             e.target.style.backgroundColor = "#007bff";
//                             e.target.style.color = "#ffffff";
//                         }}
//                         onMouseLeave={(e) => {
//                             e.target.style.backgroundColor = "transparent";
//                             e.target.style.color = "#007bff";
//                         }}
//                     >
//                         Change Password
//                     </Button>
//                     <Button
//                         variant="primary"
//                         onClick={handleLogoutClick}
//                         style={{
//                             backgroundColor: "transparent",
//                             color: "#007bff",
//                             border: "1px solid #007bff",
//                             transition: "background-color 0.3s, color 0.3s",
//                         }}
//                         onMouseEnter={(e) => {
//                             e.target.style.backgroundColor = "#007bff";
//                             e.target.style.color = "#ffffff";
//                         }}
//                         onMouseLeave={(e) => {
//                             e.target.style.backgroundColor = "transparent";
//                             e.target.style.color = "#007bff";
//                         }}
//                     >
//                         Logout
//                     </Button>
//                 </Navbar.Collapse>
//             </Navbar>
//                 <div className="home-page">
//                     <div className="welcome-section">
//                         <h1>Welcome {professor}</h1>
//                         <p className='p1'>Endorsify is an online platform for issuing and managing Letters of Recommendation.</p>
//                     </div>
//                     <div className="registration-options">
//                         <div className="registration-option">
//                             <h2>Pending Requests</h2>
//                             <p>View and manage pending requests for letters of recommendation.</p>
//                             <button className="register-button" onClick={() => navigate("/professor/home/student")}>Click Here</button>
//                         </div>
//                         <div className="registration-option">
//                             <h2>Approved Requests</h2>
//                             <p>View approved requests for letters of recommendation.</p>
//                             <button className="register-button" onClick={() => navigate("/professor/home/student")}>Click Here</button>
//                         </div>
//                         <div className="registration-option">
//                             <h2>Rejected Requests</h2>
//                             <p>View rejected requests for letters of recommendation.</p>
//                             <button className="register-button" onClick={() => navigate("/professor/home/student")}>Click Here</button>
//                         </div>
//                     </div>
//                 </div>
            

//             {/* Pass the LOR status as prop to ProfessorHomeStudentProfile */}
//             {<ProfessorHomeStudentProfile lorStatus="accepted" />}
//         </div>
//     );
// };

// export default ProfessorHomePage;
