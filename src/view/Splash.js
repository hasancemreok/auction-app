import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import brandLogo from '../assets/auction.png'

function Splash({history}) {
  var auth = useAuth();

  useEffect(() => {
    let path = "";
    if(auth.authState.isAuthenticated) path= "/items"
    else path = "/login";

    setTimeout(() => history.push(path), 1000);
  }, []);

  return(
    <div className="splash">
      <img className="brand" src={brandLogo} />
      <p>Welcome to AuctionApp</p>
      <span>Application loading... please wait a moment</span>
    </div>
  );
}

export default withRouter(Splash);
