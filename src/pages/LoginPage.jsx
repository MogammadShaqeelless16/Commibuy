import React from 'react';
import './LoginPage.css'; // Make sure to create this CSS file

function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input id="password" type="password" placeholder="Enter your password" />
          </div>
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
