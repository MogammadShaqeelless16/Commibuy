import React, { useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
import './LoginPage.css';
import ArtBackground from '../components/ArtBackground';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and sign up
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Sign up states
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: emailOrUsername.includes('@') ? emailOrUsername : null,
        password: password,
        options: {
          username: !emailOrUsername.includes('@') ? emailOrUsername : null,
        },
      });

      if (signInError) {
        setError('Invalid login credentials.');
      } else {
        window.location.href = '/crm/dashboard';
      }
    } catch (err) {
      setError('Something went wrong, please try again later.');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: emailOrUsername,
        password,
      });

      if (signUpError) throw signUpError;

      const user = signUpData.user;
      if (!user) {
        throw new Error('Sign-up successful, but user data is not available');
      }

      const { error: insertError } = await supabase
        .from('users')
        .insert([{ username, display_name: displayName, phone_number: phoneNumber, id_number: idNumber }]);

      if (insertError) throw insertError;

      setSuccess('Sign-up successful! Please check your email to verify your account.');

    } catch (error) {
      setError(error.message || 'Error signing up');
    }
  };

  return (
    <div className="login-page">
        <div className="auth-container">
          <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <form onSubmit={isLogin ? handleLogin : handleSignUp}>
            {!isLogin && (
              <>
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
              </>
            )}
            <div className="form-group">
              <label htmlFor="emailOrUsername">Email or Username:</label>
              <input
                id="emailOrUsername"
                type="text"
                placeholder="Enter your email or username"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                required
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
                required
              />
            </div>
            <button type="submit" className="auth-button">{isLogin ? 'Login' : 'Sign Up'}</button>
          </form>
          <div className="links">
            {isLogin ? (
              <>
                <span>Don't have an account? <button onClick={() => setIsLogin(false)}>Sign Up</button></span>
                <a href="/forgot-password">Forgot Password?</a>
              </>
            ) : (
              <span>Already have an account? <button onClick={() => setIsLogin(true)}>Login</button></span>
            )}
          </div>
        </div>
    </div>
  );
}

export default AuthPage;
