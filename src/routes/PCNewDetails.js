import React from 'react';
import { connect } from 'dva';
import PcNewDetails from "../componentsThree/pc_news_detail";

const PCNewDetails=({match}) =>(
  <div>
    <PcNewDetails uniquekey={match.params.uniquekey}/>
  </div>
)

PCNewDetails.propTypes = {
};

export default connect()(PCNewDetails);
