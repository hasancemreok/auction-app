import React from 'react';

function Item(props) {
  return(
    <div className="item">
      <img />
      <div className="item-info">
        <p class="item-caption">{props.data.caption}</p>
        <div class="item-description">{props.data.description}</div>
        <div class="item-actions">
          <div class="item-countdown">
            <div class="countdown">Ends Saturday</div>
            <div class="lastbid">$25</div>
          </div>
          <button className="small">Bid Now &rarr;</button>
        </div>
      </div>
    </div>
  );
}

export default Item;