import React from 'react';
import './SignUpPage.css'; // Make sure to create this CSS file

function SignUpPage() {
  return (
    <div className="sign-up-page">
      <div className="sign-up-container">
        <h1>Sign Up</h1>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input id="name" type="text" placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input id="password" type="password" placeholder="Enter your password" />
          </div>
          <button type="submit" className="sign-up-button">Sign Up</button>
        </form>
        <div className="links">
          <span>Already have an account? <a href="/login">Login</a></span>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
