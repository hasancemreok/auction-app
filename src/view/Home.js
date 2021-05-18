import React from 'react';
import { withRouter } from 'react-router-dom'
import MasterPage from '../components/Masterpage'
import ItemList from '../components/ItemList'

function Home() {
  return(
    <MasterPage>
      <ItemList />
    </MasterPage>
  );
}

export default withRouter(Home);