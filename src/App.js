import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './view/Login';
import Home from './view/Home';

import './app.scss';


function AppBody () {
  const {state, isAuthenticated} = useAuth();
  console.log(state);
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
