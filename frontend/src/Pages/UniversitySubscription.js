import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "antd";
import { Navbar } from "react-bootstrap";

const UniversitySubscription = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [university, setUniversity] = useState(null);
  const [subscriptionHistory, setSubscriptionHistory] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/universities/getUniversity/${user.email}`)
      .then((response) => {
        setUniversity(response.data);
        setSubscriptionHistory(response.data.payment);
      })
      .catch((error) => {
        console.error("Error fetching university: ", error);
      });
  }, []);

  // Function to format date to display only date part
  const formatDate = (dateString) => {
    if (!dateString) return ""; // Check if dateString is null or undefined
    return dateString.split('T')[0];
  };

  return (
    <>
      
      <Row>
        <Col span={24}>
          <h1 style={{ textAlign: 'center', color: '#666', fontFamily: 'Arial, sans-serif' }}>Subscription History</h1>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Payment Start Date</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>End Date</th>
              </tr>
            </thead>
            <tbody>
              {/* Render current subscription */}
              {university && (
                <tr style={{ backgroundColor: '#fff', color: '#333' }}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{formatDate(university.payment.startDate)}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{formatDate(university.payment.endDate)}</td>
                </tr>
              )}
              {/* Render subscription history */}
              {subscriptionHistory.map((subscription, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#fff', color: '#333' }}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{formatDate(subscription.startDate)}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{formatDate(subscription.endDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </>
  );
};

export default UniversitySubscription;
