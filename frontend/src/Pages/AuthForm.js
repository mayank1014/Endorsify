import React, { useState } from 'react';
import '../css/AuthForm.css'; 
import Logo from "../img/logo.png"
import axios from "axios";
import { message } from "antd";
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {

  const navigate = useNavigate()

  const [formActive, setFormActive] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSignUp = () => {
    setFormActive(true);
  };

  const handleSignIn = () => {
    setFormActive(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if(formActive) {
      try {
        const response = await axios.post("http://localhost:8000/api/users/checkUser", formData);
        if (response.data.error === 1) {
          message.error("Password and Confirm Password are not same");
        } else if (response.data.error === 2) {
          message.error("User already exist");

          setTimeout(() => {
            window.location.href = "/";
          }, 500);
        } else if (response.data.error === 0){
          navigate('/register', {state : formData})
        }
      } catch (error) {
        message.error("Something went wrong");

        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      }
    }
    else {
      try {
        delete formData.confirmPassword;

        const response = await axios.post("http://localhost:8000/api/users/login", formData);

        // localStorage.setItem("user", JSON.stringify(response.data));

        message.success("Login Successfull");

        setTimeout(() => {
          if (response.data.role === "student") {
            window.location.href = "/student/home";
          }
          else if (response.data.role === "professor") {
            window.location.href = "/professor/home";
          }
          else if (response.data.role === "university") {
            window.location.href = "/university/home";
          }
        }, 500);
      } catch (error) {
        message.error("Invalid username or password");

        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div className="signInUp">
          {/* Sign-in Part */}
          <div className={`box signin ${formActive ? '' : 'active'}`}>
            <h2>Empowering Your Success</h2>
            <p>Endorsify – Your Trusted Companion for Crafting Stellar Letters of Recommendation. Your Gateway to Professional Excellence!</p>
            <h2>Already have an account ?</h2>
            <button className="signinBtn" onClick={handleSignIn}>Sign in</button>
          </div>

          {/* Sign-up Part */}
          <div className={`box signup ${formActive ? 'active' : ''}`}>
            <h2>Empowering Your Success</h2>
            <p>Endorsify – Your Trusted Companion for Crafting Stellar Letters of Recommendation. Your Gateway to Professional Excellence!</p>
            <h2>Don't have an account ?</h2>
            <button className="signupBtn" onClick={handleSignUp}>Sign-up Now</button>
          </div>
        </div>

        {/* Sign-in Form */}
        <div className={`form-box ${formActive ? 'active' : ''}`}>
          <div className="form signinForm">
            <img src={Logo} alt="Logo" />
            <form onSubmit={handleFormSubmit}>
              <a href="#" className="google"><i className="fab fa-google-plus-g"></i>Login with Google</a>
              <input type="text" name="email" placeholder="Please Enter email" onChange={handleChange} required/>
              <input type="password" name="password" placeholder="Please Enter Password" onChange={handleChange} required/>
              <div className='submit-button'>
              <input type="submit" value="Log-in Now"/>
              </div>
              <a href="#" className="forget">Forget Password</a>
            </form>
          </div>

          {/* Sign-up Form */}
          <div className="form signupForm">
            <img src={Logo} alt="Logo" />
            <form onSubmit={handleFormSubmit}>
              <a href="#" className="facebook"><i className="fab fa-facebook-f"></i>SignUp with Google</a>
              <input type="text" name="email" placeholder="Email Address" onChange={handleChange} required/>
              <input type="password" name="password" placeholder="Password" onChange={handleChange} required/>
              <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required/>
              <div className='submit-button'>
                <input type="submit" value="Register Now"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
