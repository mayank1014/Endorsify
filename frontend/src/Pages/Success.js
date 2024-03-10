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

    const formDataWithCloudinary = new FormData();

    formDataWithCloudinary.append("file", formData.logo);
    formDataWithCloudinary.append("upload_preset", "Endorsify");
    formDataWithCloudinary.append("cloud_name", "djhsk7akn");

    axios
      .post(
        "https://api.cloudinary.com/v1_1/djhsk7akn/image/upload",
        formDataWithCloudinary
      )
      .then((response) => {
        const user = {
          email: formData.email,
          password: formData.password,
          confirmpassword: formData.confirmpassword,
          role: "university",
        };

        const uniLogoUrl = response.data.url;

        const formDataWithCloudinaryUrl = {
          ...formData,
          logo: uniLogoUrl,
        };

        axios
          .post("http://localhost:8000/api/users/register", user)
          .then((response) => {
            axios
              .post(
                "http://localhost:8000/api/universities/registeruni",
                formDataWithCloudinaryUrl
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

                  localStorage.removeItem("university")
                } else if (response.data.error === 0) {
                  message.success("Registration Successful");

                  setTimeout(() => {
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.removeItem("university")
                    navigate("/university/students");
                  }, 500);
                }
              })
              .catch((error) => {
                console.log(error);

                axios.post("http://localhost:8000/api/users/deleteuser", user);

                message.error("Something went wrong, Please try again");
                
                localStorage.removeItem("university")
                
                setTimeout(() => {
                  // window.location.href = '/';
                }, 500);
              });
          })
          .catch((error) => {
            console.log(error);

            message.error("Something went wrong");

            localStorage.removeItem("university")

            setTimeout(() => {
              // window.location.href = '/';
            }, 500);
          });
      })
      .catch((error) => {
        console.log(error);

        message.error("Something went wrong");
        
        localStorage.removeItem("university")

        setTimeout(() => {
          // window.location.href = '/';
        }, 500);
      });
  }

  return (
    <div>
      <Button onClick={() => {save()}}>Click</Button>
      <Spinner />
    </div>
  );
};

export default Success;
