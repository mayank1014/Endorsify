import React, { useState } from 'react';
import defaultLogo from '../img/default-logo.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

const UniversityForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    uniId: '',
    email: location.state?.email || '',
    docxFile: null,
    name: '',
    location: {
      locId: '',
      city: '',
      state: '',
      postalCode: '',
    },
    logo: null,
    websiteURL: '',
  });

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

  const handleLogoChange = (event, fieldName) => {
    const file = event.target.files[0];

    // Use FileReader to read the file as data URL
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({
        ...formData,
        logo: reader.result, // Use reader.result as the source of the image
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    formData["password"] = location.state.password;
    formData["confirmpassword"] = location.state.confirmpassword;
    
    navigate("/register/university/subscription", { state: formData });

    // const formDataWithCloudinary = new FormData();
    // formDataWithCloudinary.append('file', formData.logo);
    // formDataWithCloudinary.append('upload_preset', 'Endorsify');
    // formDataWithCloudinary.append('cloud_name', 'djhsk7akn');

    // try {
    //   const cloudinaryResponse = await axios.post(
    //     'https://api.cloudinary.com/v1_1/djhsk7akn/image/upload',
    //     formDataWithCloudinary
    //   );

    //   const user = {
    //     email: formData.email,
    //     password: location.state?.password || '',
    //     confirmpassword: location.state?.confirmpassword || '',
    //     role: 'university',
    //   };

    //   const uniLogoUrl = cloudinaryResponse.data.url;
    //   const formDataWithCloudinaryUrl = {
    //     ...formData,
    //     logo: uniLogoUrl,
    //   };

    //   axios
    //     .post('http://localhost:8000/api/users/register', user)
    //     .then((response) => {
    //       axios
    //         .post(
    //           'http://localhost:8000/api/universities/register',
    //           formDataWithCloudinaryUrl
    //         )
    //         .then((response) => {
    //           console.log(response);

    //           if (response.data.error === 1) {
    //             axios.post('http://localhost:8000/api/users/deleteuser', user);

    //             message.error(
    //               'University with the same University ID already exists'
    //             );

    //             setFormData({
    //               uniId: '',
    //               email: location.state?.email || '',
    //               docxFile: null,
    //               name: '',
    //               location: {
    //                 locId: '',
    //                 city: '',
    //                 state: '',
    //                 postalCode: '',
    //               },
    //               logo: defaultLogo,
    //               websiteURL: '',
    //             });

    //             return;
    //           } else if (response.data.error === 0) {
    //             message.success('Registration Successful');

    //             setTimeout(() => {
    //               localStorage.setItem('user', JSON.stringify(user));
    //               navigate('/university/home');
    //             }, 500);
    //           }
    //         })
    //         .catch((error) => {
    //           console.log(error);

    //           axios.post('http://localhost:8000/api/users/deleteuser', user);

    //           message.error('Something went wrong, Please try again');

    //           setTimeout(() => {
    //             window.location.href = '/register/university';
    //           }, 500);
    //         });
    //     })
    //     .catch((error) => {
    //       console.log(error);

    //       message.error('Something went wrong');

    //       setTimeout(() => {
    //         window.location.href = '/';
    //       }, 500);
    //     });
    // } catch (error) {
    //   message.error('Something went wrong');
    //   console.log(error);
    // }
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
                        required
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