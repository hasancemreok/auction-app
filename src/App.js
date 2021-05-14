import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './view/Login';

import './app.scss';

function Home() { return <p>Home screen</p> }

function AppBody () {
  const {authState, isAuthenticated} = useAuth();
  return isAuthenticated ? <Home /> : <Login /> 
}

function App() {

  return (
    <AuthProvider>
      <AppBody />
    </AuthProvider>
  );
}

export default App;
