import React from 'react';
import  { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './view/Login';
import Home from './view/Home';
import Detail from './view/Detail';

import './app.scss';

function AppBody () {
  const {state, isAuthenticated} = useAuth();

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => {
          return(
            isAuthenticated
            ? <Redirect to="/items" />
            : <Redirect to="/login" />
          )
        }} />
        <Route path="/items"><Home /></Route>
        <Route path="/item/:itemId"><Detail /></Route>
        <Route path="/login"><Login /></Route>
      </Switch>
    </Router>
  );
}

function App() {

  return (
    <AuthProvider>
      <AppBody />
    </AuthProvider>
  );
}

export default App;
