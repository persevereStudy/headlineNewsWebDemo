'use strict'
import React from 'react';
import styles from '../css/style.css';
import {Link} from 'dva/router';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      miniHeader: false,
  }
  }

  switchHeader() {
    this.setState({
      miniHeader: !this.state.miniHeader
    })
  }

  render() {
    const style = {
      header: {
        color: "#FFFFFF",
        paddingTop: this.state.miniHeader?"0px":"15px",
        paddingBottom: this.state.miniHeader&&this.state.miniHeader?"0px":"15px"
      }
    }
    return (
      <header style={style.header} className={styles.smallFontSize} onClick={this.switchHeader.bind(this)}>
        <h1 style={{textAlign: 'center'}}>这里是头部</h1>
        <ul>
          <li>
            <Link to={'/'}><h1>首页</h1></Link>
          </li><li>
            <Link to={'/list/1234&JunKing'}><h1>列表页</h1></Link>
          </li>
        </ul>
      </header>
    )
  }
}



