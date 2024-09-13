import React from 'react';

function ForgotPasswordPage() {
  return (
    <div className="forgot-password-page">
      <h1>Forgot Password</h1>
      <form>
        <label>Email:
          <input type="email" />
        </label>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ForgotPasswordPage;
