import React from 'react';
import { withRouter, useParams } from 'react-router-dom'
import MasterPage from '../components/Masterpage'
import ItemDetail from '../components/ItemDetail';

function Detail() {
  let { itemID } = useParams();

  return(
    <MasterPage>
      <ItemDetail itemID={itemID} />
    </MasterPage>
  );
}

export default withRouter(Detail);