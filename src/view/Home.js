import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'

import Item from '../components/item'

import brandLogo from '../assets/auction.png'

function Home() {
  const {state, logout} = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [auctionItems, setAuctionItems] = useState([]);
  
  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    console.log('---- auction items ----');
    console.log(auctionItems);
    console.log('---- end auction items ----');
  }, [auctionItems])

  const handleLogout = () => {
    logout();
  }

  const getItems = async () => {
    const resp = await fetch("http://localhost:3001/items")
    const data = await resp.json();

    const newArray = [...data]
    setAuctionItems(newArray)

    setTimeout(() => setIsLoading(false), 1000);
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
        <div class="items">
        {
          isLoading 
          ? <p>Loading...</p>
          //: <p>{auctionItems.length}</p>
          : auctionItems.map((item, index) => <Item data={item} />)
        }
        </div>
      </div>
    </div>
  );
}

export default Home;