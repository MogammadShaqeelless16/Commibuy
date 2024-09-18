import React, { useState } from 'react';
import './SignUpPage.css'; // Ensure the CSS file exists
import { supabase } from '../supabase/supabaseClient'; // Import Supabase client

function SignUpPage() {
  // State hooks for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Create user in Supabase Auth
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      const userId = signUpData.user.id;

      // Insert additional user details into the custom users table
      const { error: insertError } = await supabase
        .from('users')
        .insert([
          {
            uuid: userId,
            email,
            username,
            display_name: displayName,
            phone_number: phoneNumber,
            id_number: idNumber,
          },
        ]);

      if (insertError) throw insertError;

      setSuccess('Sign-up successful! You can now log in.');
    } catch (error) {
      setError(error.message || 'Error signing up');
    }
  };

  return (
    <div className="sign-up-page">
      <div className="sign-up-container">
        <h1>Sign Up</h1>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="displayName">Display Name:</label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your display name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              id="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="idNumber">ID Number:</label>
            <input
              id="idNumber"
              type="text"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              placeholder="Enter your ID number"
              required
            />
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
