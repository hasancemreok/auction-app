import React from 'react';
import { useAuth } from '../context/AuthContext'

import brandLogo from '../assets/auction.png'

function Home() {
  const {state, logout} = useAuth();
  console.log(state)

  const handleLogout = () => {
    logout();
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
    
      <div className="contentize">
        
      </div>
    </div>
  );
}

export default Home;