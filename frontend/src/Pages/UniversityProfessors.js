import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const UniversityProfessors = () => {
  const [professors, setProfessors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");

  useEffect(() => {
    // Fetch uniid from university email
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
              `http://localhost:8000/api/professors/getallprofessors/${fetchedUniid}`
            )
            .then((response1) => {
              setProfessors(response1.data);
            })
            .catch((error) => console.error("Error fetching professors:", error));
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
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Teacher ID</th>
            <th>View Profile</th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>
          {professors.map((professor) => (
            <tr key={professor._id}>
              <td>{professor.name}</td>
              <td>{professor.email}</td>
              <td>{professor.gender}</td>
              <td>{professor.teacherId}</td>
              <td>
                <Link to={`${professor._id}`}>
                  View Full Profile
                </Link>
              </td>
              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UniversityProfessors;
