import React, { useState, useEffect } from "react";
import defaultLogo from "../img/default-logo.jpg";
import axios from "axios";
import { message } from "antd";

const UniversityForm = () => {

  const user = localStorage.getItem("user");

  const [formData, setFormData] = useState({
    uniId: "",
    email: "",
    docxFile: null,
    name: "",
    location: {
      locId: "",
      city: "",
      state: "",
      postalCode: "",
    },
    logo: defaultLogo,
    websiteURL: "",
  });

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/universities/getuniversity/${
          JSON.parse(user).email
        }`
      )
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching university: ", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        [name]: value,
      },
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setFormData((prevData) => ({
        ...prevData,
        [name]: base64String,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result;
        setFormData((prevData) => ({
          ...prevData,
          logo: base64String,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
            const formDataWithCloudinaryUrl2 = {
              ...formDataWithCloudinaryUrl1,
              logo: response.data.url,
            };

            axios
              .post(
                "http://localhost:8000/api/universities/edit",
                formDataWithCloudinaryUrl2
              )
              .then((response) => {
                message.success("Profile updated successfully");

                setTimeout(() => {
                  window.location.href = "/university";
                  window.location.href = "/university/students";
                }, 500);
              })
              .catch((error) => {
                message.error("Something went wrong");
              });
          })
          .catch((error) => {
            console.log(error);
            message.error("Something went wrong");
          });
      })
      .catch((error) => {
        console.log(error);
        message.error("Something went wrong");
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">University Details Form</h2>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="uniId">University ID:</label>
                      <input
                        disabled
                        type="text"
                        className="form-control"
                        id="uniId"
                        name="uniId"
                        value={formData.uniId}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">University Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="websiteURL">Website URL:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="websiteURL"
                        name="websiteURL"
                        value={formData.websiteURL}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-row">
                        <div className="form-group col-md-4">
                          <label htmlFor="state">State:</label>
                          <input
                            type="text"
                            className="form-control"
                            id="state"
                            name="state"
                            value={formData.location.state}
                            onChange={handleLocationChange}
                            required
                          />
                        </div>
                        <div className="form-group col-md-4">
                          <label htmlFor="postalCode">Postal Code:</label>
                          <input
                            type="text"
                            className="form-control"
                            id="postalCode"
                            name="postalCode"
                            value={formData.location.postalCode}
                            onChange={handleLocationChange}
                            required
                          />
                        </div>
                        <div className="form-group col-md-4">
                          <label htmlFor="city">City:</label>
                          <input
                            type="text"
                            className="form-control"
                            id="city"
                            name="city"
                            value={formData.location.city}
                            onChange={handleLocationChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="docxFile">Document File (.docx):</label>
                      <input
                        type="file"
                        className="form-control-file"
                        id="docxFile"
                        name="docxFile"
                        onChange={handleFileChange}
                        accept=".docx"
                      />
                      <label htmlFor="logo">University Logo:</label>
                      <input
                        type="file"
                        className="form-control-file"
                        id="logo"
                        name="logo"
                        onChange={handleLogoChange}
                        accept="image/*"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      {formData.logo && (
                        <img
                          src={formData.logo}
                          alt="University Logo"
                          className="img-fluid mt-2"
                        />
                      )}
                      {!formData.logo && (
                        <img
                          src={defaultLogo}
                          alt="Default Logo"
                          className="img-fluid mt-2"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityForm;
