import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import '../css/Register.css'; 

const Register = () => {

    // const location = useLocation();
    // const navigate = useNavigate();

    const handleChange = (arg) => {
        // if(arg === 'student') {
        //     navigate('/register/student', { state : location.state })
        // }
        // else if(arg === 'professor') {
        //     navigate('/register/professor', { state : location.state })
        // }
        // else if(arg === 'university') {
        //     navigate('/register/university', { state : location.state })
        // }
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
                {/* <h3>{ location.state.email }</h3>
                <h3>{ location.state.password }</h3> */}
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Register;
