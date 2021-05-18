import React, {useState} from 'react';
import { withRouter } from 'react-router-dom'
import {useAuth} from '../context/AuthContext'

function Login({history}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginResult, setLoginResult] = useState('');
  const [buttonState, setButtonState] = useState(false);

  const auth = useAuth();
  const users = [
    { username: "user", password: "pass", name: "Auction User", role: "regular" },
    { username: "admin", password: "pass", name: "Admin", role: "admin" }
  ]

  const handleLogin = () => {
    setLoginResult('');
    setButtonState(true);

    setTimeout(() => {
      let foundUser = users.find(u => u.username === username && u.password === password);

      if(foundUser) {
        auth.login({
          isAuthenticated: true,
          user: {
            name: foundUser.name
          }
        });

        history.push('/items')
      } else {
        setButtonState(false);
        setLoginResult('error');
        setUsername('')
        setPassword('')
      }
    }, 300);
  }

  return(
    <>
    <div className="login-form-container">
      <div className="login-form">
        <label for="username">Username</label>
        <input value={username} onInput={e => setUsername(e.target.value)} id="username" name="username" type="" placeholder="username" autoComplete="off" required/>
        <div className="spacer"/>
        <label for="password">Password</label>
        <input value={password} onInput={e => setPassword(e.target.value)} id="password" name="password" type="password" placeholder="password" autoComplete="off" required/>
        <div className="spacer"/>
        <button disabled={buttonState} autoFocus className="block" onClick={handleLogin}>Login</button>
      </div>
    </div>
    {
      loginResult == "error"
      ? <div className="login-result">Incorrect id or password</div>
      : ''
    }
    </>
  );
}

export default withRouter(Login);