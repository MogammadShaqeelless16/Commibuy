import React, { useState } from 'react';
import { supabase } from '../supabase/supabaseClient'; // Ensure you have this path correctly set
import './LoginPage.css'; // Make sure to create this CSS file

function LoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Attempt to log in either by email or username
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: emailOrUsername.includes('@') ? emailOrUsername : null, // If it's an email
        password: password,
        options: {
          username: !emailOrUsername.includes('@') ? emailOrUsername : null, // If it's a username
        },
      });

      if (signInError) {
        setError('Invalid login credentials.');
      } else {
        // Redirect to dashboard or home page upon success
        window.location.href = '/crm/dashboard';
      }
    } catch (err) {
      setError('Something went wrong, please try again later.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="emailOrUsername">Email or Username:</label>
            <input
              id="emailOrUsername"
              type="text"
              placeholder="Enter your email or username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="links">
          <a href="/forgot-password">Forgot Password?</a>
          <span>Don't have an account? <a href="/signup">Sign Up</a></span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
