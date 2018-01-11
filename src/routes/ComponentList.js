import React from 'react';
import {connect} from 'dva';

import ListHeader from "../componentsTwo/listHeader";

//
// function ComponentList() {
//
//   return (
//
//     <div>
//       <ListHeader id={this.props.params.id}/>
//     </div>
//   );
// }

const ComponentList = ({match}) => (

  <div>
    <ListHeader id={match.params.id} name = {match.params.name}/>
  </div>
)

ComponentList.propTypes = {};

export default connect()(ComponentList);

