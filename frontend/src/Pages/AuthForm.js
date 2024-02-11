// import React, { useState } from 'react';
// import '../css/AuthForm.css'; // Import your custom CSS file
// import { useNavigate } from 'react-router-dom';

// const AuthForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate()

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//         setError('Passwords do not match.');
//         return;
//     }
//     else {
//         navigate('/register', {state : {
//           email : email, 
//           password : password
//         }})
//     }
//   };

//   return (
//     <form className="auth-form" onSubmit={handleSubmit}>
//       <h2>{'Sign Up'}</h2>

//       <div className="form-group">
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </div>

//         <div className="form-group">
//           <label htmlFor="confirm-password">Confirm Password:</label>
//           <input
//             type="password"
//             id="confirm-password"
//             name="confirm-password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>

//       {error && <div className="error-message">{error}</div>}

//       <button type="submit">{'Sign Up'}</button>
//     </form>
//   );
// };

// export default AuthForm;
// Import React and any other necessary dependencies

// Import React and any other necessary dependencies
import React, { useState } from 'react';
import '../css/AuthForm.css'; // Make sure to import your CSS file
import Logo from "../img/logo.png"
// Create the React component
const AuthForm = (props) => {
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

    if (formActive && formData.password !== formData.confirmPassword) {
      console.error('Password and Confirm Password must match');
      // You may want to handle the password mismatch error here
      return;
    }

    const url = formActive ? 'http://localhost:5000/register' : 'http://localhost:5000/login';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.log("Hello")
        const errorData = await response.json();
        console.error(`Server error: ${response.status} - ${errorData.message}`);
        // You may want to handle authentication failure here (e.g., show an error message)
        return;
      }

      const data = await response.json();
  
      window.location.href="/home"
      console.log('Authentication successful:', data);
      // You may want to handle successful authentication here (e.g., redirect the user)
    } catch (error) {
      console.error('Error during authentication:', error.message);
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
              <input type="text" name="email" placeholder="Please Enter email" onChange={handleChange} />
              <input type="password" name="password" placeholder="Please Enter Password" onChange={handleChange} />
              <div className='submit-button'>
                  <input type="submit" value="Log-in Now" />
              </div>
              <a href="#" className="forget">Forget Password</a>
            </form>
          </div>

          {/* Sign-up Form */}
          <div className="form signupForm">
            <img src={Logo} alt="Logo" />
            <form onSubmit={handleFormSubmit}>
              <a href="#" className="facebook"><i className="fab fa-facebook-f"></i>SignUp with Google</a>
              <input type="text" name="email" placeholder="Email Address" onChange={handleChange} />
              <input type="password" name="password" placeholder="Password" onChange={handleChange} />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
              <div className='submit-button'>
                <input type="submit" value="Register Now" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
