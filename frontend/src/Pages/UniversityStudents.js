import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import Spinner from "../components/Spinner";

const UniversityStudents = () => {
    const [students, setStudents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState("");
  
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
  
      if (user) {
        const universityEmail = user.email;
        axios
          .get(
            `http://localhost:8000/api/universities/getuniversity/${universityEmail}`
          )
          .then((response) => {
            const fetchedUniid = response.data._id;
            axios
              .get(
                `http://localhost:8000/api/students/getallstudents/${fetchedUniid}`
              )
              .then((response1) => {
                setStudents(response1.data);
              })
              .catch((error) => console.error("Error fetching students:", error));
          })
          .catch((error) => console.error("Error fetching university:", error));
      }
    }, []);
  
    const openModal = (imageUrl) => {
      setModalImageUrl(imageUrl);
      setShowModal(true);
    };
  
    const closeModal = () => {
      setShowModal(false);
    };
  
    return (
      <>
        {students.length==0 && <Spinner />}
        {students.length>0 && <>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Passing Year</th>
              <th>Branch</th>
              <th>College ID</th>
              <th>View Profile</th>
              <th>View Transcript</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.gender}</td>
                <td>{student.passingYear}</td>
                <td>{student.branch}</td>
                <td>{student.collegeID}</td>
                <td>
                  <Button variant="secondary" onClick={() => openModal(student.profilePhoto)}>
                    View Profile
                  </Button>
                </td>
                <td>
                  <Button variant="secondary" onClick={() => openModal(student.transcriptPhoto)}>
                    View Transcript
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Body>
            {modalImageUrl && (
              <img
                src={modalImageUrl}
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
        </>
        }
      </>
    );
  };
  
  export default UniversityStudents;
  