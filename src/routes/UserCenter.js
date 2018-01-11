import React from 'react';
import { connect } from 'dva';
import PCUserCenter from '../componentsThree/pc_usercenter';
const UserCenter=({match}) =>(
  <div>
    <PCUserCenter />
  </div>
)

UserCenter.propTypes = {
};

export default connect()(UserCenter);
