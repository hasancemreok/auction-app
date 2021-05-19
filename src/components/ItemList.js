import React, { useState, useEffect } from 'react';
import Item from './Item'
import Progress from './Progress';

function ItemDetail(props) {

  const [isLoading, setIsLoading] = useState(true);
  const [auctionItems, setAuctionItems] = useState([]);
  const [queryState, setQueryState] = useState({
    search: "",
    sortBy: "0",
    sortType: "0",
    page: 0
  });
  
  useEffect(() => {
    getItems();

    let updateTimer = setInterval(() => getItems(), 10000);
    return() => clearInterval(updateTimer);
  }, []);

  useEffect(() => {
    getItems();
  }, [queryState]);

  const getItems = async () => {
    const resp = await fetch("http://localhost:3001/items", {
      method: 'POST',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(queryState)
    })
    const data = await resp.json();

    const newArray = [...data]
    setAuctionItems(newArray)

    setTimeout(() => setIsLoading(false), 1000);
  }

  const changePage = (_page) => {
    setQueryState(prevState => ({...prevState, page: _page }))
  }

  return(
    <div className="contentize">
      <div class="filters">
        <input type="search" className="search-input" placeholder="Search..." value={queryState.search}
          onInput={e => setQueryState(prevState => ({...prevState, search: e.target.value }))} />
        <select value={queryState.sortBy}  onChange={e => setQueryState(prevState => ({...prevState, sortBy: e.target.value })) }>
          <option value="0" selected>Sort by date</option>
          <option value="1">Sort by last bid</option>
          <option value="2">Sort by starting price</option>
        </select>
        <select value={queryState.sortType} onChange={e => setQueryState(prevState => ({...prevState, sortType: e.target.value })) }>
          <option value="0" selected>ascending</option>
          <option value="1">descending</option>
        </select>
      </div>
      <div class="items">
      {
        isLoading 
        ? <Progress loadingText="Loading items" />
        : auctionItems.map((item, index) => <Item key={'item'+index} data={item} />)
      }
      </div>
      <div className="pages">
      {
        Array.from({length: 3}).map((m, i) => {
          <button className="page-link button" onClick={() => changePage(i)}>{i+1}</button>
        })
      }
      </div>
    </div>
  );
}

export default ItemDetail;