import React, { useEffect } from 'react';
import  { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './view/Login';
import Home from './view/Home';
import Detail from './view/Detail';
import Splash from './view/Splash';

import './app.scss';

function ProtectedRoute({children, ...rest}) {
  const auth = useAuth();
  console.log(auth);

  return(
    <Route 
      {...rest}
      render={
        ({location}) =>
        auth.authState.isAuthenticated
        ? children
        : <Redirect to={{pathname: "/login", state: {from: location}}} />
      }
    />
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
          <Switch>
            <Route exact path="/"><Splash /></Route>
            <ProtectedRoute path="/items"><Home /></ProtectedRoute>
            <ProtectedRoute path="/item/:itemID"><Detail /></ProtectedRoute>
            <Route path="/login"><Login /></Route>
          </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
