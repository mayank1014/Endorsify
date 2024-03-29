import React, { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import Logo from "../img/logo.png";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'


const AuthForm = () => {
  const navigate = useNavigate();

  const [formActive, setFormActive] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
    console.log(formData);
    if (formActive) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/users/checkUser",
          formData
        );

        if (response.data.error === 1) {
          message.error("Password and Confirm Password are not same");
        } else if (response.data.error === 2) {
          message.error("User already exists");

          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        } else if (response.data.error === 0) {
          navigate("/register", { state: formData });
        }
      } catch (error) {
        message.error("Something went wrong");

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/users/login",
          formData
        );

        localStorage.setItem("user", JSON.stringify(response.data));

        message.success("Login Successful");

        setTimeout(() => {
          if (response.data.role === "student") {
            navigate("/student/home");
          } else if (response.data.role === "professor") {
            navigate("/professor/home");
          } else if (response.data.role === "university") {
            navigate("/university/students");
          }
        }, 750);
      } catch (error) {
        message.error("Invalid email or password");

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    }
  };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [typeConfirmPassword, setTypeConfirmPassword] = useState('password');
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [iconConfirmPassword, setIconConfirmPassword] = useState(eyeOff);
  const handleInputChange = (e) => {
    setPassword(e.target.value);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleInputChangeConfirm = (e) => {
    setConfirmPassword(e.target.value);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleTogglePassword = () => {
    setType(type === 'password' ? 'text' : 'password');
    setIcon(type === 'password' ? eye : eyeOff);
  };
  const handleToggleConfirmPassword = () => {
    setTypeConfirmPassword(typeConfirmPassword === 'password' ? 'text' : 'password');
    setIconConfirmPassword(typeConfirmPassword === 'password' ? eye : eyeOff);
  };

  return (
    <>
      <style>
        {`
          /* YourComponent.css */

          /** Google font **/
          @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600&display=swap");
          
          .auth-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: url("../img/bg.jpg");
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            transition: 0.5s;
          }
          
          .container {
            position: relative;
            width: 800px;
            height: 500px;
            margin: 20px;
          }
          
          .signInUp {
            position: absolute;
            top: 40px;
            width: 100%;
            height: 420px;
            background: rgba(255, 255, 255, 0.671);
            box-shadow: 0 5px 45px rgba(0, 0, 0, 0.15);
            display: flex;
            justify-content: center;
            align-items: center;
          }
          
          .signInUp .box {
            position: relative;
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }
          
          .signInUp .box h1 {
            color: rgb(36, 36, 36);
            font-size: 30px;
            font-weight: 800 !important;
            font-family: sans-serif;
            margin-bottom: 10px;
          }
          
          .form-box .form form input[type="submit"]:hover {
            background-color: white;
            color: black;
          }
          
          .signInUp .box.signin button:hover {
            background: #333;
            color: #fff;
          }
          
          .signInUp .box.signup button:hover {
            background: #333;
            color: #fff;
          }
          
          .signInUp .box p {
            color: rgb(36, 36, 36);
            font-size: 14px;
            font-weight: 500 !important;
            text-align: center;
            padding: 0px 25px;
            margin-bottom: 10px;
          }
          
          .signInUp .box h2 {
            color: rgb(36, 36, 36);
            font-size: 1.2em;
            font-weight: 500;
            margin-bottom: 10px;
          }
          
          .signInUp .box button {
            cursor: pointer;
            padding: 8px 20px;
            background: transparent;
            border: 1px solid #333;
            color: #333;
            font-size: 16px;
            font-weight: 500;
          }
          
          .form-box {
            overflow: hidden;
            position: absolute;
            top: 0;
            left: 0;
            width: 50%;
            height: 100%;
            background: rgb(26, 26, 26);
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 5px 45px rgba(0, 0, 0, 0.25);
            transition: 0.5s ease-in-out;
          }
          
          .form-box .signinForm {
            transition-delay: 0.25s;
          }
          
          .form-box.active .signinForm {
            transition-delay: 0s;
            left: -100%;
          }
          
          .form-box .signupForm {
            left: 100% !important;
            transition-delay: 0s;
          }
          
          .form-box.active .signupForm {
            left: 0 !important;
            transition-delay: 0.25s;
          }
          
          .form-box.active {
            left: 50%;
          }
          
          .form-box .form {
            position: absolute;
            left: 0;
            text-align: center;
            width: 100%;
            padding: 50px;
            transition: 0.5s;
          }
          
          .form-box .form img {
            width: 50%;
            margin-bottom: 15px;
          }
          
          .form-box .form form {
            width: 100%;
            display: flex;
            flex-direction: column;
          }
          
          .form-box .form form h3 {
            font-size: 15px;
            color: #fff;
            font-weight: 500;
          }
          
          .form-box .form form .google {
            color: #fff;
            text-decoration: none;
            width: 100%;
            margin-bottom: 20px;
            padding: 10px;
            outline: none;
            font-size: 16px;
            background: #db4437;
          }
          
          .form-box .form form .facebook {
            color: #fff;
            text-decoration: none;
            width: 100%;
            margin-bottom: 20px;
            padding: 10px;
            outline: none;
            font-size: 16px;
            background: #3b5998;
          }
          
          .form-box .form form i {
            margin-right: 10px;
          }
          
          .form-box .form form input {
            width: 100%;
            margin-bottom: 20px;
            padding: 10px;
            outline: none;
            font-size: 16px;
            border: 1px solid #333;
          }
          
          .form-box .form form input::placeholder {
            text-align: center;
          }
          
          .form-box .form form input[type="submit"] {
            background: transparent;
            border: 1px solid #fff;
            color: #fff;
            max-width: 130px;
            cursor: pointer;
          }
          
          .form-box.active .signupForm input[type="submit"] {
            background: transparent;
            border: 1px solid #fff;
          }
          
          .form-box .form form .forget {
            color: #fff;
          }
          
          /** responsive **/
          @media (max-width: 768px) {
            .container {
              max-width: 400px;
              height: 650px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          
            .container .signInUp {
              top: 0;
              height: 100%;
            }
          
            .form-box {
              width: 100%;
              height: 500px;
              top: 0;
              box-shadow: none;
            }
          
            .signInUp .box h1 {
              font-size: 16px;
              margin-bottom: 5px;
              font-weight: 500;
              margin-top: 40px;
            }
          
            .signInUp .box p {
              font-size: 10px;
              margin-bottom: 5px;
            }
          
            .signInUp .box h2 {
              font-size: 15px;
              margin-bottom: 5px;
            }
          
            .signInUp .box button {
              padding: 5px 20px;
              color: #333;
              font-size: 12px;
              margin-bottom: 30px;
            }
          
            .signInUp .box {
              position: absolute;
              width: 100%;
              height: 180px;
              bottom: 0;
              padding: 10px 0px 40px 0px;
            }
          
            .box.signin {
              top: 0;
            }
          
            .form-box.active {
              left: 0;
              top: 150px;
            }
          }
          
          .ayush:hover {
            background-color: white;
          }          
          .password-input {
            position: relative;
            display: flex;
            align-items: center;
          }
          
          .password-toggle {
            position: absolute;
            right: 10px;
            top:10px;
            cursor: pointer;
          }
        `}
      </style>
      <div className="auth-container">
        <div className="container">
          <div className="signInUp">
            {/* Sign-in Part */}
            <div className={`box signin ${formActive ? "" : "active"}`}>
              <h2>Empowering Your Success</h2>
              <p>
                Endorsify – Your Trusted Companion for Crafting Stellar Letters of
                Recommendation. Your Gateway to Professional Excellence!
              </p>
              <h2>Already have an account ?</h2>
              <button className="signinBtn" onClick={handleSignIn}>
                Sign in
              </button>
            </div>

            {/* Sign-up Part */}
            <div className={`box signup ${formActive ? "active" : ""}`}>
              <h2>Empowering Your Success</h2>
              <p>
                Endorsify – Your Trusted Companion for Crafting Stellar Letters of
                Recommendation. Your Gateway to Professional Excellence!
              </p>
              <h2>Don't have an account ?</h2>
              <button className="signupBtn" onClick={handleSignUp}>
                Sign-up Now
              </button>
            </div>
          </div>

          {/* Sign-in Form */}
          <div className={`form-box ${formActive ? "active" : ""}`}>
            <div className="form signinForm">
              <img src={Logo} alt="Logo" />
              <form onSubmit={handleFormSubmit}>
                <a href="http://localhost:8000/auth/google" className="google">
                  <i className="fab fa-google-plus-g"></i>Login with Google
                </a>

                <input
                  type="email"
                  name="email"
                  placeholder="Please Enter email"
                  onChange={handleChange}
                  required
                />
                <div className="password-input">
                  <input
                    type={type}
                    name="password"
                    placeholder="Please Enter Password"
                    onChange={handleChange}
                    required
                  />
                  <span className="password-toggle" onClick={handleTogglePassword}>
                    <Icon icon={icon} size={20} />
                  </span>
                </div>

                <div className="submit-button">
                  <input type="submit" value="Log-in Now" />
                </div>
                <a href="/forgotpassword" className="forget">
                  Forget Password
                </a>
              </form>
            </div>

            {/* Sign-up Form */}
            <div className="form signupForm">
              <img src={Logo} alt="Logo" />
              <form onSubmit={handleFormSubmit}>
                <a href="http://localhost:8000/auth/google" className="google">
                  <i className="fab fa-google-plus-g"></i>SignUp with Google
                </a>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  required
                />
                <div className="password-input">
                  <input
                    type={type}
                    id="psw"
                    name="password"
                    placeholder="Enter Password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    value={password}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="password-toggle" onClick={handleTogglePassword}>
                    <Icon icon={icon} size={20} />
                  </span>
                </div>
                <div className="password-input">
                  <input
                    type={typeConfirmPassword}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleInputChangeConfirm}
                    required
                  />
                  <span className="password-toggle" onClick={handleToggleConfirmPassword}>
                    <Icon icon={iconConfirmPassword} size={20} />
                  </span>
                </div>
                <div className="submit-button">
                  <input type="submit" value="Register Now" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
