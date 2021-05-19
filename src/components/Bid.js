import React from 'react';
import dateParser from '../utils/dateParser';
import getUser from '../utils/getUser'

function Bid(props) {
  return(
    <div className="bid">
      <div>{props.index + 1}</div>
      <div>${props.data.price}</div>
      <div>{dateParser(props.data.bidTime, 1)}</div>
      <div>{getUser(props.data.userID)}  {props.data.isAutoBid ? '(via AutoBid Bot)' : ''}</div>
    </div>
  );
}

export default Bid;
