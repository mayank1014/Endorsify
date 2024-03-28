import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { message } from "antd";

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [stage, setStage] = useState(1);
    const [messages, setMessages] = useState('');
    const [verifyOtp, setVerifyOtp]= useState('');
    var count = 0;
    const navigate = useNavigate();

    const handleSendOtp = (event) => {
        event.preventDefault();
        const randomString= (Math.floor(1000 + Math.random() * 9000)).toString();
        setVerifyOtp(randomString);
        console.log(randomString);
        axios
            .get(`http://localhost:8000/api/users/getuser/${email}/${randomString}`)
            .then((response) => {
                console.log(response.data.msg);
                if(response.data.msg==="User does not exist"){
                    message.error("User Does not Exist");
                }
                else{
                    setStage(2); // Move to stage 2: Enter OTP
                }
            }).catch((error) => {
                console.error('Error fetching user data:', error);
                // Handle error, e.g., display error message to the user
            });
    };

    const handleVerifyOtp = (event) => {
        event.preventDefault();
        console.log(otp);
        console.log("random: "+verifyOtp)
        if (otp === verifyOtp) {
            setStage(3); // Move to stage 3: Enter new password
        }
        else {
            count += 1;
            if (count === 3) {
                message.error("Multiple Incorrect attempts.");
                navigate("/");
            }
            else {
                message.error("Enter Correct Otp");
            }
        }
    };

    const handleConfirmPassword = (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            message.error("Password and ConfirmPassword does not match");
        }
        else {
            axios.get(`http://localhost:8000/api/users/forgotpassword/changepassword/${email}/${newPassword}`)
                .then((response) => {
                    setTimeout(() => {
                        message.success("Password updated successfully");
                        navigate("/");
        }, 500);
                }).catch((error) => {
                    console.error("Something went wrong: ", error);
                });
        }

    };

   
    const renderStage = () => {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <div style={{ width: '600px', backgroundColor: '#f0f0f0', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', display: 'inline-block' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                    <p onClick={() => navigate("/")} style={{ cursor:'pointer',textAlign:'left', color: '#007bff', marginBottom: '20px' }}>
                            <span>&#8592; Back to Login</span>
                        </p>
                        <h2>Forgot Password</h2>
                    </div>
                    {stage === 1 && (
                        <div>
                            <div style={{ marginTop: '20px' }}>
                                <label>Email:   <span style={{ color: 'red' }}>  *</span></label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={{ marginBottom: '10px', width: '70%', marginBottom:'20px',marginTop:'20px' }}
                                />
                                <br />
                                <button onClick={handleSendOtp} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Send OTP</button>
                            </div>
                        </div>
                    )}
                    {stage === 2 && (
                        <div>
                            <div style={{ marginTop: '20px' }}>
                                <label>Email:  <span style={{ color: 'red' }}>  *</span></label>
                                <input
                                    type="email"
                                    value={email}
                                    disabled
                                    style={{ marginBottom: '10px', width: '70%', marginBottom:'20px',marginTop:'20px' }}
                                />
                                <label>OTP:  <span style={{ color: 'red' }}>  *</span></label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                    style={{ marginBottom: '10px', width: '50%', marginBottom:'20px',marginTop:'20px' }}
                                />
                                <br />
                                <button onClick={handleVerifyOtp} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Verify OTP</button>
                            </div>
                        </div>
                    )}
                    {stage === 3 && (
                        <div>
                            <div style={{ marginTop: '20px' }}>
                                <label>Email:  <span style={{ color: 'red' }}>  *</span></label>
                                <input
                                    type="email"
                                    value={email}
                                    disabled
                                    style={{ marginBottom: '10px', width: '70%', marginBottom:'20px',marginTop:'20px' }}
                                />
                                <label>New Password:  <span style={{ color: 'red' }}>  *</span></label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    style={{ marginBottom: '10px', width: '70%', marginBottom:'20px',marginTop:'20px' }}
                                />
                                <br />
                                <label>Confirm Password:  <span style={{ color: 'red' }}> *</span></label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    style={{ marginBottom: '10px', width: '70%', marginBottom:'20px',marginTop:'20px' }}
                                />
                                <br />
                                <button onClick={handleConfirmPassword} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Confirm</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div>
            {renderStage()}
            <p>{messages}</p>
        </div>
    );
}

export default ForgotPassword;
