import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentRequests = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/students/getallrequests/${user.email}`)
            .then(response => {
                setRequests(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className="request-list" style={{ display: "flex", flexDirection: "column" }}>
            {requests.length > 0 && requests.map((request, index) => (
                <div className="request-item" key={index} style={{ display: "flex", marginBottom: "20px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", borderRadius: "8px", padding: "20px" }}>
                    <img src={request.professorData.profilePhoto} alt="Professor" className="profile-pic" style={{ width: "100px", height: "100px", borderRadius: "50%", marginRight: "20px" }} />
                    <div className="details" style={{ flex: 1 }}>
                        <p style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>{request.professorData.name}</p>
                        <p style={{ fontSize: "16px", marginBottom: "5px" }}>Email: {request.professorData.email}</p>
                        <p style={{ fontSize: "16px", marginBottom: "0" }}>Status: {request.lorStatus}</p>
                        {request.status === 'accepted' && (
                            <button className="view-lor-btn" style={{ marginTop: "10px" }}>View LOR</button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StudentRequests;
