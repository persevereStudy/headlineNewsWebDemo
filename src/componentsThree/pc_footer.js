'use strict'
import 'antd/lib/row/style';
import 'antd/lib/col/style';
import React from 'react';
import { Row, Col} from 'antd';



export default class PcFooter extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {

    return (
      <div>
        <footer>
          <Row>
            <Col span={2}>
            </Col>
            <Col span={20} style={{textAlign:"center"}}>
              &copy;&nbsp;2018 ReactNews. All Right Reserved.
            </Col>
            <Col span={2}>
            </Col>
          </Row>
        </footer>
      </div>
    )
  }
}
const headerStyle = {
  logo: {
    alignItems: 'center',
    display: 'flex',
  },
  logo_img: {
    width: '48px',
    height: '48px'
  },
  logo_span: {
    fontSize: '24px',
    paddingLeft: '5px'
  }
}



