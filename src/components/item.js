import React from 'react';
import  { Link } from 'react-router-dom'
import dateParser from '../utils/dateParser'
import brandLogo from '../assets/auction.png'

function Item(props) {
  return(
    <div className="item">
      <div className="imgContainer small">
        <img src={brandLogo} />
      </div>
      <div className="item-info">
        <div className="texts">
          <p class="item-caption">{props.data.caption}</p>
          <span class="item-description">{props.data.description}</span>
        </div>
        <div class="item-actions">
          <div class="item-countdown">
            <div class="countdown">
              <span class="label">AUCTION WILL END</span>
              <span class="value">{dateParser(props.data.auctionEndDate)}</span>
            </div>
            <div class="lastbid">
              <span class="label">LAST BID</span>
              <span class="value">${props.data.lastBid}</span>
            </div>
            <div class="increase">
              <span class="label">INCREASE</span>
              <span class="value">${props.data.pricePerBid}</span>
            </div>
            <div class="bids">
              <span class="label">BIDS</span>
              <span class="value">3</span>
            </div>
          </div>
          <Link className="to-detail" to={'/item/' + props.data._id}>Bid Now &rarr;</Link>
        </div>
      </div>
    </div>
  );
}

export default Item;