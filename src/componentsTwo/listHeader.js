import React from 'react';
import {Link} from 'dva/router';
export default class ListHeader extends React.Component{
  componentDidMount() {
    console.log(this.props)
  }
  render(){
    return(
      <div>
        <Link to="/">
          <h1>回到首页 Id:{this.props.id} 名字：{this.props.name}</h1>
        </Link>
      </div>
    )
  }
}
