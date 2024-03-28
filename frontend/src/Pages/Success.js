import React, { useEffect } from "react";
import axios from "axios";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const Success = () => {
  const navigate = useNavigate();

  const save = () => {
    const formData = JSON.parse(localStorage.getItem("university"));

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 90);
    formData.payment["startDate"] = startDate;
    formData.payment["endDate"] = endDate;
    formData["status"] = "Active";

    const universityLogo = new FormData();
    const universityTemplate = new FormData();

    universityLogo.append("file", formData.logo);
    universityLogo.append("upload_preset", "Endorsify");
    universityLogo.append("cloud_name", "djhsk7akn");

    universityTemplate.append("file", formData.docxFile);
    universityTemplate.append("upload_preset", "Endorsify");
    universityTemplate.append("cloud_name", "djhsk7akn");

    axios
      .post(
        "https://api.cloudinary.com/v1_1/djhsk7akn/raw/upload",
        universityTemplate
      )
      .then((response) => {

        const formDataWithCloudinaryUrl1 = {
          ...formData,
          docxFile: response.data.url,
        };
        
        axios
          .post(
            "https://api.cloudinary.com/v1_1/djhsk7akn/image/upload",
            universityLogo
          )
          .then((response) => {
            const user = {
              email: formData.email,
              password: formData.password,
              confirmpassword: formData.confirmpassword,
              role: "university",
            };

            const formDataWithCloudinaryUrl2 = {
              ...formDataWithCloudinaryUrl1,
              logo: response.data.url,
            };

            axios
              .post("http://localhost:8000/api/users/register", user)
              .then((response) => {
                axios
                  .post(
                    "http://localhost:8000/api/universities/registeruni",
                    formDataWithCloudinaryUrl2
                  )
                  .then((response) => {
                    if (response.data.error === 1) {
                      axios.post(
                        "http://localhost:8000/api/users/deleteuser",
                        user
                      );

                      message.error(
                        "University with the same University ID already exists"
                      );

                      localStorage.removeItem("university");
                    } else if (response.data.error === 0) {
                      message.success("Registration Successful");

                      setTimeout(() => {
                        localStorage.setItem("user", JSON.stringify(user));
                        localStorage.removeItem("university");
                        navigate("/university/students");
                      }, 500);
                    }
                  })
                  .catch((error) => {
                    console.log(error);

                    axios.post(
                      "http://localhost:8000/api/users/deleteuser",
                      user
                    );

                    message.error("Something went wrong, Please try again");

                    localStorage.removeItem("university");

                    setTimeout(() => {
                      // window.location.href = '/';
                    }, 500);
                  });
              })
              .catch((error) => {
                console.log(error);

                message.error("Something went wrong");

                localStorage.removeItem("university");

                setTimeout(() => {
                  // window.location.href = '/';
                }, 500);
              });
          })
          .catch((error) => {
            console.log(error);

            message.error("Something went wrong");

            localStorage.removeItem("university");

            setTimeout(() => {
              // window.location.href = '/';
            }, 500);
          });
      })
      .catch((error) => {
        console.log(error);

        message.error("Something went wrong");

        localStorage.removeItem("university");

        setTimeout(() => {
          // window.location.href = '/';
        }, 500);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "48px", color: "#4caf50" }}>&#10004;</div>
        <h2>Payment Successful</h2>
        <button
          style={{
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            padding: "10px 20px",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "16px",
            marginTop: "10px",
            cursor: "pointer",
          }}
          onClick={() => {
            save();
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Success;
