import React, { useState } from 'react';
import '../css/AuthForm.css'; // Import your custom CSS file
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
    }
    else {
        navigate('/register', {state : {
          email : email, 
          password : password
        }})
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>{'Sign Up'}</h2>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

      {error && <div className="error-message">{error}</div>}

      <button type="submit">{'Sign Up'}</button>
    </form>
  );
};

export default AuthForm;
