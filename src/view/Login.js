import React from 'react';

function Login() {
  return(
    <div className="login-form-container">
      <div className="login-form">
        <label for="username">Username</label>
        <input id="username" name="username" type="" placeholder="username" autoComplete="off" required/>
        <div className="spacer"/>
        <label for="password">Password</label>
        <input id="password" name="password" type="password" placeholder="password" autoComplete="off" required/>
        <div className="spacer"/>
        <button>Login</button>
      </div>
    </div>
  );
}

export default Login;