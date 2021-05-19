import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Progress from './Progress';
import Bid from './Bid';
import Item from './Item';
import dateParser from '../utils/dateParser'
import { useAuth } from '../context/AuthContext';
import brandLogo from '../assets/auction.png'

function ItemDetail(props) {

  const [item, setItem] = useState(null);
  const [bids, setBids] = useState([]);

  const [isItemLoading, setIsItemLoading] = useState(true);
  const [isBidsLoading, setIsBidsLoading] = useState(true);
  const [lastBidOwned, setLastBidOwned] = useState(false);
  const [bidMaking, setBidMaking] = useState(false);
  const [autoBidEnabled, setAutoBidEnabled] = useState(false);

  const authState = useAuth();

  const getItemDetail = async () => {
    const resp = await fetch("http://localhost:3001/items/" + props.itemID, {
      method: 'POST',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await resp.json();
    setItem(data)

    setTimeout(() => setIsItemLoading(false), 1000);
  }

  const getItemBids = async () => {
    const resp = await fetch("http://localhost:3001/items/" + props.itemID + "/bids", {
      method: 'POST',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await resp.json();

    const newBids = [...data]
    setBids(newBids)

    const lastBidObj = data[0];
    setLastBidOwned(lastBidObj && lastBidObj.userID == authState.authState.user.id);

    setTimeout(() => setIsBidsLoading(false), 1000);
  }

  const makeBid = async (isAuto) => {
    setBidMaking(true);

    let _bid = {
      itemID: props.itemID,
      userID: authState.authState.user.id,
      price: (item.lastBid + item.pricePerBid),
      isAutoBid: isAuto
    }

    const resp = await fetch("http://localhost:3001/bids", {
      method: 'POST',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(_bid)
    })
    
    if(resp.status == 200) {
      const data = await resp.json();
      if(isAuto) authState.decreaseBidAmount();

      getItemDetail();
      getItemBids();
    } else {
      console.log(resp);
    }

    setBidMaking(false);
  }

  useEffect(() => {
    getItemDetail();
    getItemBids();

    let updateTimer = setInterval(() => { 
      getItemDetail();
      getItemBids();
    }, 10000);
    return() => clearInterval(updateTimer);
  }, []);

  let autoBidTimer = null;

  useEffect(() => {
    console.log(autoBidEnabled + " - " + authState.authState.user.maxAutoBidAmount + " - " + lastBidOwned);

    if(autoBidEnabled) {
      if(autoBidTimer != null) clearInterval(autoBidTimer);
      
      autoBidTimer = setInterval(() => {
        if(lastBidOwned) return;
        if(authState.authState.user.maxAutoBidAmount <= 0) return;  

        makeBid(true);
      }, 10000);

    } else {
      
      clearInterval(autoBidTimer);
      autoBidTimer = null;
      console.log('interval cleared');
    }

    //return () => clearInterval(autoBidTimer);
  }, [autoBidEnabled])

  return(
    <>
      <div className="action-container">
        <Link to="/items" className="back-button">&larr; Back to Items</Link>
        { lastBidOwned ? <p className="success">Last bid is yours</p> : '' }
        <input type="checkbox" id="auto-bidding" disabled={lastBidOwned || authState.authState.user.maxAutoBidAmount == 0} onClick={() => setAutoBidEnabled(!autoBidEnabled)} />
        <label for="auto-bidding">Auto Bidding ({authState.authState.user.maxAutoBidAmount}) </label>
        <button onClick={() => makeBid(false) } class="small primary-action" disabled={isItemLoading || lastBidOwned || bidMaking}>
          { isItemLoading ? 'Loading...' : 'Bid Now $' + (item.lastBid + item.pricePerBid)}
        </button>
      </div>
      <div className="contentize">
        {
          isItemLoading || isBidsLoading
          ? <Progress loadingText="Item details loading" />
          : <Item data={item} isLarge="large" bids={bids.length} />
        }
      </div>
      <div className="contentize">
        <p>Recent bids for this item</p>
        {
          isItemLoading || isBidsLoading
          ? <Progress loadingText="Bids loading" />
          : <div className="bids">
              <div class="header">
                <div class="index">#</div>
                <div class="price">PRICE</div>
                <div class="bidTime">TIME</div>
                <div class="user">USER</div>
              </div>
            {
              bids.map((bid, index) => <Bid key={'bid-'+index} index={index} data={bid} />)
            }
          </div>
        }
      </div>
    </>
  );
}

export default ItemDetail;