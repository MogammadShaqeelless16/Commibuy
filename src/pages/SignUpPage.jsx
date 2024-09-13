import React from 'react';

function SignUpPage() {
  return (
    <div className="sign-up-page">
      <h1>Sign Up</h1>
      <form>
        <label>Name:
          <input type="text" />
        </label>
        <label>Email:
          <input type="email" />
        </label>
        <label>Password:
          <input type="password" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpPage;
