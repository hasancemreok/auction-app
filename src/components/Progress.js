import React from 'react';
import brandLogo from '../assets/auction.png'

function Progress(props) {
  return(
    <div className="progress-container">
      <div className="progress">
        <img className="brand" src={brandLogo} />
        <span>{props.loadingText}</span>
      </div>
    </div>
  );
}

export default Progress;