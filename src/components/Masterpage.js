import React from 'react';
import { useAuth } from '../context/AuthContext'
import brandLogo from '../assets/auction.png'

function MasterPage({history, children}) {
  const auth = useAuth();
  const handleLogout = () => {
    auth.logout();
  }

  return(
    <div className="container">
      <div className="app-header">
        <div className="brand">
          <img src={brandLogo} />
          AuctionApp
        </div>
        <div className="user">
          <span>Welcome {auth.authState.user.name}</span>
          <button className="link" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      {children}
    </div>
  );
}

export default MasterPage;