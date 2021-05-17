import React from 'react';
import dateParser from '../utils/dateParser'

function Item(props) {
  return(
    <div className="item">
      <img />
      <div className="item-info">
        <p class="item-caption">{props.data.caption}</p>
        <div class="item-description">{props.data.description}</div>
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
          <button className="small">Bid Now &rarr;</button>
        </div>
      </div>
    </div>
  );
}

export default Item;