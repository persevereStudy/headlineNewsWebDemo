import React from 'react';
import { connect } from 'dva';
import PcIndex from '../componentsThree/pc_index';
import MediaQuery from 'react-responsive';
import MobileIndex from '../componentsThree/mobile_index';


function Root() {

  return (

    <div>
      <MediaQuery query='(min-device-width:1224px)'><PcIndex/></MediaQuery>
      <MediaQuery query='(max-device-width:1224px)'><MobileIndex/></MediaQuery>
    </div>
  );
}

Root.propTypes = {
};

export default connect()(Root);
