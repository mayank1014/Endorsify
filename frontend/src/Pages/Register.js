import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import '../css/Register.css'; 

const Register = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const handleChange = (arg) => {
        if(arg === 'student') {
            navigate('/register/student', { state : location.state })
        }
        else if(arg === 'professor') {
            navigate('/register/professor', { state : location.state })
        }
        else if(arg === 'university') {
            navigate('/register/university', { state : location.state })
        }
    }
    
    return (
        <div>
            <div className="register-container">
                <h2 className="register-heading">Select User Type:</h2>
                <button className="register-button" onClick={ () => {handleChange("student")}}>Student</button>
                <button className="register-button" onClick={ () => {handleChange("professor")}}>Professor</button>
                <button className="register-button" onClick={ () => {handleChange("university")}}>University</button>
            </div>
            <div>
                <h3>{ location.state.email }</h3>
                <h3>{ location.state.password }</h3>
                <h3>{ location.state.confirmPassword }</h3>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Register;

// import React from 'react';
// import '../css/Register.css'; 

// const Register = () => {
//   return (
//     <div className="home-page">
//       <div className="welcome-section">
//         <h1>Welcome to Endorsify</h1>
//         <p className='p1'>Endorsify is an online platform for issuing and managing letters of recommendation.</p>
//       </div>
//       <div className="registration-options">
//         <div className="registration-option">
//           <h2>Register as a Student</h2>
//           <p>Join as a student to explore courses and programs offered by universities.</p>
//           <button className="register-button">Register</button>
//         </div>
//         <div className="registration-option">
//           <h2>Register as a Professor</h2>
//           <p>Join as a professor to share your knowledge and expertise with students.</p>
//           <button className="register-button">Register</button>
//         </div>
//         <div className="registration-option">
//           <h2>Register as a University</h2>
//           <p>Register your university to showcase your courses and attract students and professors.</p>
//           <button className="register-button">Register</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

