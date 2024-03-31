import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const UniversityLOR = () => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      const universityEmail = user.email;
      axios
        .get(
          `http://localhost:8000/api/documents/getall/${universityEmail}`
        )
        .then((response) => {
          setDocuments(response.data);
        })
        .catch((error) => console.error("Error fetching documents:", error));
    }
  }, []);

  const downloadDocument = (documentUrl) => {
    // Use anchor tag to trigger download
    const link = document.createElement("a");
    link.href = documentUrl;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const view = (documentUrl) => {
    navigate("/viewdocx", { state: { documentUrl } });
  };

  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Filename</th>
            <th>Upload Date</th>
            <th>Student Email</th>
            <th>Professor Email</th>
            <th>View</th>
            <th>Dowmload</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document) => (
            <tr key={document._id}>
              <td>{document.filename}</td>
              <td>{document.uploadDate}</td>
              <td>{document.studentEmail}</td>
              <td>{document.professorEmail}</td>
              <td><Button onClick={() => view(document.docxFile)}>View</Button></td>
              <td>
                <Button onClick={() => downloadDocument(document.docxFile)}>
                  Download
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UniversityLOR;
