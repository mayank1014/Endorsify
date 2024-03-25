import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {loadStripe} from "@stripe/stripe-js" 
import { message } from "antd";
import axios from "axios";

const Subscription = () => {
  const location = useLocation();
  const [subscriptionType, setSubscriptionType] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const handleSubmit = async (type, price) => {
    try {
        var formData = location.state;
        formData["amount"] = price;

        const stripe = await loadStripe("pk_test_51O1CutSGqPg6c6luAjxcMCJeCHMgxKCrwsRItYCKmCwUokiFES57JDrwCu0IVsEo8wXQgILpGwotTknuHeb0Fi1Q00VXid84E0")
        
        const response = await fetch("http://localhost:8000/api/universities/register", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            mode : "cors",
            body:JSON.stringify({
                items : [formData]
            })
        })

        const session = await response.json()

        formData["payment"] = {
            transactionId: session.id
        }

        localStorage.setItem("university", JSON.stringify(location.state))

        const res = stripe.redirectToCheckout({
            sessionId : session.id
        })
    } catch (error) {
        console.log(error);
        message.error('Something went wrong, Please try again later')
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Subscribe to Our University</h2>
      <p style={styles.description}>
        Choose a subscription plan to unlock premium features and content.
      </p>
      <div style={styles.cards}>
        <div style={styles.card}>
          <h3>3 Months</h3>
          <p>Price: Rs.4000</p>
          <button
            style={styles.button}
            onClick={() => handleSubmit("3_months", 4000)}
          >
            Subscribe
          </button>
        </div>
        <div style={styles.card}>
          <h3>1 Year</h3>
          <p>Price: Rs.10000</p>
          <button
            style={styles.button}
            onClick={() => handleSubmit("1_year", 10000)}
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
    color: "#333",
  },
  description: {
    marginBottom: "20px",
    fontSize: "16px",
    color: "#666",
  },
  cards: {
    display: "flex",
    justifyContent: "center",
  },
  card: {
    flex: "1",
    maxWidth: "300px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    transition: "all 0.3s ease",
    margin: "0 10px",
    cursor: "pointer",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
    transition: "all 0.3s ease",
  },
  //   button:hover: {
  //     backgroundColor: '#0056b3',
  //   },
};

export default Subscription;
