import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Fetch data for Students
    axios.get("http://localhost:8000/api/students/getallstudents")
      .then(response => setStudents(response.data))
      .catch(error => console.error('Error fetching students:', error));

    // Fetch data for Professors
    axios.get("http://localhost:8000/api/universities/getallprofessors")
      .then(response => setProfessors(response.data))
      .catch(error => console.error('Error fetching professors:', error));

    // Fetch data for LORs (Documents)
    // axios.get("http://localhost:8000/api/universities/getAlldocuments")
    //   .then(response => setDocuments(response.data))
    //   .catch(error => console.error('Error fetching documents:', error));
  }, []);

  return (
    <div>
      <h1>University Dashboard</h1>

      <div>
        <h2>Students</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                {/* Add more cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Professors</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {professors.map(professor => (
              <tr key={professor._id}>
                <td>{professor.name}</td>
                <td>{professor.email}</td>
                {/* Add more cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Documents (LORs)</h2>
        <table>
          <thead>
            <tr>
              <th>Filename</th>
              <th>Upload Date</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {documents.map(document => (
              <tr key={document._id}>
                <td>{document.filename}</td>
                <td>{document.uploadDate}</td>
                {/* Add more cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
