import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import ItemList from '../components/ItemList'

import brandLogo from '../assets/auction.png'

function MasterPage({history, children}) {
  const {state, logout} = useAuth();

  const handleLogout = () => {
    logout();
    history.push('/')
  }

  return(
    <div className="container">
      <div className="app-header">
        <div className="brand">
          <img src={brandLogo} />
          AuctionApp
        </div>
        <div className="user">
          <span>Welcome {state.user.name}</span>
          <button className="link" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      {children}
    </div>
  );
}

export default MasterPage;