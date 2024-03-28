// import React from 'react';
// import { useLocation, useNavigate } from "react-router-dom";
// import '../css/Register.css'; 

// const Register = () => {

//     const location = useLocation();
//     const navigate = useNavigate();

//     const handleChange = (arg) => {
//         if(arg === 'student') {
//           console.log(location.state);
//             navigate('/register/student', { state : location.state })
//         }
//         else if(arg === 'professor') {
//           console.log(location.state);
//             navigate('/register/professor', { state : location.state })
//         }
//         else if(arg === 'university') {
//           console.log(location.state);
//             navigate('/register/university', { state : location.state })
//         }
//     }

//   return (
//     <div className="home-page">
//       <div className="welcome-section">
//         <h1>Welcome to Endorsify</h1>
//         <p className='p1'>Endorsify is an online platform for issuing and managing Letters of Recommendation.</p>
//       </div>
//       <div className="registration-options">
//         <div className="registration-option">
//           <h2>Register as a Student</h2>
//           <p>Join as a student to request Letters of Recommendation from your professors.</p>
//           <button className="register-button" onClick={ () => {handleChange("student")}}>Register</button>
//         </div>
//         <div className="registration-option">
//           <h2>Register as a Professor</h2>
//           <p>Join as a professor to provide valuable recommendations to your students.</p>
//           <button className="register-button" onClick={ () => {handleChange("professor")}}>Register</button>
//         </div>
//         <div className="registration-option">
//           <h2>Register as a University</h2>
//           <p>Join as a university to provide online Letter of Recommendation facilities for both students and professors.</p>
//           <button className="register-button" onClick={ () => {handleChange("university")}}>Register</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import '../css/Register.css'; 

const Register = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleChange = (arg) => {
        const searchParams = new URLSearchParams(location.search);
        const email = searchParams.get('email');
        console.log(email);
        if(arg === 'student') {
          navigate('/register/student', { state: { email } });
        }
        else if(arg === 'professor') {
          navigate('/register/professor', { state: { email } });
        }
        else if(arg === 'university') {
          navigate('/register/university', { state: { email } });
        }
    }

  return (
    <div className="home-page">
      <div className="welcome-section">
        <h1>Welcome to Endorsify</h1>
        <p className='p1'>Endorsify is an online platform for issuing and managing Letters of Recommendation.</p>
      </div>
      <div className="registration-options">
        <div className="registration-option">
          <h2>Register as a Student</h2>
          <p>Join as a student to request Letters of Recommendation from your professors.</p>
          <button className="register-button" onClick={ () => {handleChange("student")}}>Register</button>
        </div>
        <div className="registration-option">
          <h2>Register as a Professor</h2>
          <p>Join as a professor to provide valuable recommendations to your students.</p>
          <button className="register-button" onClick={ () => {handleChange("professor")}}>Register</button>
        </div>
        <div className="registration-option">
          <h2>Register as a University</h2>
          <p>Join as a university to provide online Letter of Recommendation facilities for both students and professors.</p>
          <button className="register-button" onClick={ () => {handleChange("university")}}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
