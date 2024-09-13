import React from 'react';

function LoginPage() {
  return (
    <div className="login-page">
      <h1>Login</h1>
      <form>
        <label>Email:
          <input type="email" />
        </label>
        <label>Password:
          <input type="password" />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
