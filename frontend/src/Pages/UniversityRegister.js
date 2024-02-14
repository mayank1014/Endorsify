import React, { useState } from 'react';
import defaultLogo from '../img/default-logo.jpg';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from 'antd';


const UniversityForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    uniId: '',
    email: '',
    docxFile: null,
    name: '',
    location: {
      city: '',
      state: '',
      postalCode: ''
    },
    logo: defaultLogo,
    websiteURL: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        [name]: value
      }
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setFormData({
        ...formData,
        [name]: base64String
      });
    };
    reader.readAsDataURL(file);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result;
        setFormData({
          ...formData,
          logo: base64String,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = {};
    if (!formData.uniId.trim()) {
      errors.uniId = 'University ID is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    }
    if (!formData.docxFile) {
      errors.docxFile = 'Document file is required';
    }
    if (!formData.name.trim()) {
      errors.name = 'University name is required';
    }
    if (!formData.location.city.trim()) {
      errors.location = 'City is required';
    }
    if (!formData.location.postalCode.trim()) {
      errors.location = 'Postalcode is required';
    }
    if (!formData.location.state.trim()) {
      errors.location = 'State is required';
    }

    if (!formData.logo) {
      errors.logo = 'Logo image is required';
    }
    if (!formData.websiteURL.trim()) {
      errors.websiteURL = 'Website URL is required';
    }
    try {
      const user = {
        email : location.state.email,
        password : location.state.password,
        confirmpassword : location.state.password,
        role : "university",
      };
      formData.email = location.state.email;

      const uniLogo = formData.logo.split(",")[1];
      const docx = formData.docxFile.split(",")[1];
      
      const formDataWithBase64 = {
        ...formData,
        logo : uniLogo,
        docxFile : docx,
      }

      await axios.post("http://localhost:8000/api/users/register", user)
      
      try{
        const response = await axios.post("http://localhost:8000/api/universities/register", formDataWithBase64);
        console.log("111");
        if(response.data.error === 1){
          await axios.post("http://localhost:8000/api/users/deleteuser",user);

          message.error("University with same University Id already exists");

          setTimeout(() => {
            window.location.href = "/register/university";
          }, 500);
        }
        else if(response.data.error === 0){
          message.success("Registration Successful");
          
          setTimeout(() => {
            window.location.href = "/university/home";
          }, 500);
        }
      }catch(error){
        await axios.post("http://localhost:8000/api/users/deleteuser",user);
        message.error("Something went wrong, Please try again");

        setTimeout(() => {
          // window.location.href = "/register/university";
        }, 500);
      }
      setFormData({
        uniId: '',
        email: '',
        docxFile: null,
        name: '',
        location: {
          city: '',
          state: '',
          postalCode: ''
        },
        logo: defaultLogo,
        websiteURL: ''
      });
      setFormErrors({});
    }catch(error){
      message.error("Something went wrong");
      console.log(error);
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">University Details Form</h2>
              {submissionMessage && <div className="alert alert-success">{submissionMessage}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="uniId">University ID:</label>
                  <input type="text" className="form-control" id="uniId" name="uniId" value={formData.uniId} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="name">University Name:</label>
                  <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label htmlFor="city">City:</label>
                    <input type="text" className="form-control" id="city" name="city" value={formData.location.city} onChange={handleLocationChange} required />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="state">State:</label>
                    <input type="text" className="form-control" id="state" name="state" value={formData.location.state} onChange={handleLocationChange} required />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="postalCode">Postal Code:</label>
                    <input type="text" className="form-control" id="postalCode" name="postalCode" value={formData.location.postalCode} onChange={handleLocationChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="websiteURL">Website URL:</label>
                  <input type="url" className="form-control" id="websiteURL" name="websiteURL" value={formData.websiteURL} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="docxFile">Document File (.docx):</label>
                  <input type="file" className="form-control-file" id="docxFile" name="docxFile" onChange={handleFileChange} accept=".docx" required />
                </div>
                <div className="form-group">
                  <label htmlFor="logo">University Logo:</label>
                  <input type="file" className="form-control-file" id="logo" name="logo" onChange={handleLogoChange} accept="image/*" />
                  {formData.logo && <img src={formData.logo} alt="University Logo" className="img-fluid mt-2" />}
                  {!formData.logo && <img src={defaultLogo} alt="Default Logo" className="img-fluid mt-2" />}
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UniversityForm;
