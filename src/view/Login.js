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
    { username: "user1", password: "pass", name: "Auction User 1", id: 1, role: "regular", maxAutoBidAmount: 2 },
    { username: "user2", password: "pass", name: "Auction User 2", id: 2, role: "regular", maxAutoBidAmount: 2 },
    { username: "admin", password: "pass", name: "Admin", id: 3, role: "admin", maxAutoBidAmount: 2 }
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
            name: foundUser.name,
            id: foundUser.id,
            maxAutoBidAmount: foundUser.maxAutoBidAmount
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
        <input value={username} onInput={e => setUsername(e.target.value)} id="username" name="username" type="text" placeholder="username" autoComplete="off" required/>
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